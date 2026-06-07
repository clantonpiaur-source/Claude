"use client";

import { useEffect, useState } from "react";
import { Search, Bell, Moon, Sun, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
      <div className="lg:hidden font-mono font-semibold text-foreground">Finovo</div>

      {/* Search */}
      <div className="relative hidden flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          type="search"
          placeholder="Search transactions, accounts…"
          aria-label="Search"
          className="h-9 w-full max-w-md rounded-md border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
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
          onClick={() => setDark((d) => !d)}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <Sun className="h-[18px] w-[18px]" aria-hidden /> : <Moon className="h-[18px] w-[18px]" aria-hidden />}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" aria-label="Notifications (3 unread)" className="relative">
          <Bell className="h-[18px] w-[18px]" aria-hidden />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" aria-hidden />
        </Button>

        {/* Account */}
        <button className="flex items-center gap-2 rounded-md p-1 pr-2 hover:bg-muted cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-sm font-semibold text-white">
            AM
          </span>
          <span className="hidden text-sm font-medium text-foreground sm:inline">Alex M.</span>
        </button>
      </div>
    </header>
  );
}
