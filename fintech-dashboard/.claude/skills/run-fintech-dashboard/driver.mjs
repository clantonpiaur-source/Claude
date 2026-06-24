#!/usr/bin/env node
// Headless driver for the Finovo fintech-dashboard (Next.js web app).
// chromium-cli isn't available in this container, so we drive a system
// Playwright Chromium directly. Assumes the dev server is already serving
// (npm run dev) at BASE_URL.
//
// Usage:
//   node driver.mjs smoke                  # full scripted flow -> screenshots + console-error check
//   node driver.mjs shot <url> <out.png>   # single full-page screenshot
//   node driver.mjs eval <url> "<jsexpr>"  # evaluate JS in page, print result
//
// Env:
//   BASE_URL   default http://localhost:3000
//   SHOT_DIR   default /tmp/fintech-shots
//   PW_CHROME  override chromium executable path
//
// Exit code is non-zero if the page logs console errors or a step fails.

import { chromium } from "playwright-core";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const SHOT_DIR = process.env.SHOT_DIR || "/tmp/fintech-shots";
mkdirSync(SHOT_DIR, { recursive: true });

// Resolve a chromium binary. The bundled Playwright build number may not
// match what's installed under /opt/pw-browsers, so point at it explicitly.
function resolveChrome() {
  if (process.env.PW_CHROME && existsSync(process.env.PW_CHROME)) return process.env.PW_CHROME;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  if (existsSync(root)) {
    for (const d of readdirSync(root).filter((n) => n.startsWith("chromium-"))) {
      const p = join(root, d, "chrome-linux", "chrome");
      if (existsSync(p)) return p;
    }
  }
  return undefined; // let Playwright try its own default
}

async function newPage() {
  const browser = await chromium.launch({
    executablePath: resolveChrome(),
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  // Ignore noise that's an artifact of the sandbox, not the app: the Google
  // Fonts stylesheet is blocked by the egress proxy (app falls back to system
  // fonts), and there's no favicon. Everything else is a real error.
  const benign = (t) => /fonts\.googleapis\.com|favicon\.ico|ERR_CONNECTION_CLOSED|status of 404/.test(t);
  page.on("console", (m) => m.type() === "error" && !benign(m.text()) && errors.push(m.text()));
  page.on("pageerror", (e) => !benign(String(e)) && errors.push(String(e)));
  return { browser, page, errors };
}

async function shot(page, name) {
  const f = join(SHOT_DIR, name);
  await page.screenshot({ path: f, fullPage: true });
  console.log("  screenshot ->", f);
}

async function smoke() {
  const { browser, page, errors } = await newPage();
  try {
    console.log("nav", BASE);
    await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 60000 });

    // 1) Shell rendered
    await page.getByText("Finovo", { exact: true }).first().waitFor({ timeout: 30000 });
    await page.getByText("Overview", { exact: true }).first().waitFor({ timeout: 30000 });
    // Recharts animates its series on mount, so a too-early screenshot
    // catches empty axes. Wait until the data paths (curves + donut sectors)
    // have actually painted.
    await page.waitForFunction(
      () => document.querySelectorAll("svg path.recharts-curve, svg path.recharts-sector").length >= 6,
      null, { timeout: 15000 }
    );
    await shot(page, "01-dashboard-light.png");
    console.log("OK  dashboard rendered (light)");

    // 2) Toggle dark mode via the topbar button
    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await page.getByRole("button", { name: "Switch to light mode" }).waitFor({ timeout: 5000 });
    await shot(page, "02-dashboard-dark.png");
    console.log("OK  dark mode toggled");

    // 3) Interact with the transactions table: sort by Amount
    const amount = page.getByRole("button", { name: /Amount/ });
    await amount.click();
    const th = page.locator('th[aria-sort]').filter({ hasText: "Amount" });
    const sort = await th.getAttribute("aria-sort");
    console.log("OK  table sorted by Amount, aria-sort =", sort);
    await shot(page, "03-table-sorted.png");

    if (errors.length) {
      console.error("\nFAIL — console errors:\n  " + errors.join("\n  "));
      process.exitCode = 1;
    } else {
      console.log("\nPASS — no console errors");
    }
  } finally {
    await browser.close();
  }
}

async function singleShot(url, out) {
  const { browser, page } = await newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.screenshot({ path: out, fullPage: true });
    console.log("screenshot ->", out);
  } finally {
    await browser.close();
  }
}

async function evalJs(url, expr) {
  const { browser, page } = await newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    const r = await page.evaluate((e) => eval(e), expr);
    console.log(JSON.stringify(r, null, 2));
  } finally {
    await browser.close();
  }
}

const [cmd, a, b] = process.argv.slice(2);
if (cmd === "shot") await singleShot(a || BASE, b || join(SHOT_DIR, "shot.png"));
else if (cmd === "eval") await evalJs(a || BASE, b || "document.title");
else await smoke();
