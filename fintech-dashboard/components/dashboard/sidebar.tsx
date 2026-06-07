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

export function Sidebar() {
  const [active, setActive] = useState("Overview");

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border bg-card">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-mono font-bold">
            F
          </div>
          <span className="font-mono text-lg font-semibold text-foreground">Finovo</span>
        </div>
        <nav className="flex-1 space-y-1 p-3" aria-label="Primary">
          {nav.map(({ label, icon: Icon }) => {
            const isActive = active === label;
            return (
              <button
                key={label}
                onClick={() => setActive(label)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                {label}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-border p-3">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <LogOut className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav (≤5 items, icon + label) */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border bg-card pb-[env(safe-area-inset-bottom)] lg:hidden"
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
                "flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium cursor-pointer",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              {label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
