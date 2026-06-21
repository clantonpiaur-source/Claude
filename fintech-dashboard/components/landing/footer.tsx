import Link from "next/link";
import { Logo } from "@/components/landing/logo";

const groups = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Security", "Integrations", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API reference", "Status", "Community", "Support"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Compliance", "Licenses", "Cookies"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The financial operating system for modern teams. Move money, watch
              the numbers, stay in control.
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="text-sm font-semibold text-foreground">{g.title}</h3>
              <ul className="mt-3 space-y-2">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Meridian, Inc. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Meridian is a financial technology company, not a bank. Banking
            services provided by partner banks, Members FDIC.
          </p>
          <Link
            href="/dashboard"
            className="text-xs font-medium text-secondary hover:underline"
          >
            Launch dashboard →
          </Link>
        </div>
      </div>
    </footer>
  );
}
