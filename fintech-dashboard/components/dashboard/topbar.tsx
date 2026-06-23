"use client";

import { useEffect, useState } from "react";
import { Search, Bell, Moon, Sun, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
  // Start as undefined to avoid assuming a theme before we read the DOM/storage
  // (the inline script in layout already applied the right class pre-paint).
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur-md sm:px-6">
      <div className="display font-semibold text-foreground lg:hidden">Finovo</div>

      {/* Search */}
      <div className="relative hidden flex-1 sm:block">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          placeholder="Search transactions, accounts…"
          aria-label="Search"
          className="h-9 w-full max-w-md rounded-lg border border-border bg-card pl-9 pr-12 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground md:inline-flex">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Date range */}
        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
          Last 6 months
          <ChevronDown className="h-4 w-4" aria-hidden />
        </Button>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <Sun className="h-[18px] w-[18px]" aria-hidden /> : <Moon className="h-[18px] w-[18px]" aria-hidden />}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" aria-label="Notifications (3 unread)" className="relative">
          <Bell className="h-[18px] w-[18px]" aria-hidden />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-background" aria-hidden />
        </Button>

        {/* Account */}
        <button className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-muted cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-sm font-semibold text-white ring-2 ring-background">
            AM
          </span>
          <span className="hidden text-sm font-medium text-foreground sm:inline">Alex M.</span>
        </button>
      </div>
    </header>
  );
}
