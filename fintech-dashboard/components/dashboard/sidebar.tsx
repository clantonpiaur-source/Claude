"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Payments", icon: CreditCard, active: false },
  { label: "Reports", icon: BarChart3, active: false },
  { label: "Accounts", icon: Wallet, active: false },
  { label: "Settings", icon: Settings, active: false },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary-gradient font-mono text-sm font-bold text-primary-foreground shadow-sm">
        F
      </div>
      <span className="display text-lg font-semibold text-gradient">Finovo</span>
    </div>
  );
}

export function Sidebar() {
  const [active, setActive] = useState("Overview");

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Logo />
        </div>

        <nav className="flex-1 space-y-1 p-3" aria-label="Primary">
          <p className="px-3 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Menu
          </p>
          {nav.map(({ label, icon: Icon }) => {
            const isActive = active === label;
            return (
              <button
                key={label}
                onClick={() => setActive(label)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-primary-gradient text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {/* active accent rail */}
                {isActive && (
                  <span className="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" aria-hidden />
                )}
                <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.25 : 1.75} aria-hidden />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Account card */}
        <div className="p-3">
          <div className="rounded-xl border border-border bg-background/60 p-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-sm font-semibold text-white ring-2 ring-card">
                AM
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">Alex Morgan</p>
                <p className="truncate text-xs text-muted-foreground">Finance Lead</p>
              </div>
            </div>
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <LogOut className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav (≤5 items, icon + label) */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border bg-card/90 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
        aria-label="Primary"
      >
        {nav.map(({ label, icon: Icon }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors cursor-pointer",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.25 : 1.75} aria-hidden />
              {label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
