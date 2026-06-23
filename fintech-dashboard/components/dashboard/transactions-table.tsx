"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, Inbox, Download, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { transactions, type Transaction } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

type SortKey = "date" | "amount";
const statusVariant = { completed: "success", pending: "warning", failed: "danger" } as const;
const filters = ["all", "completed", "pending", "failed"] as const;

export function TransactionsTable() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [asc, setAsc] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const rows = useMemo(() => {
    let r = transactions.filter((t) => filter === "all" || t.status === filter);
    r = [...r].sort((a, b) => {
      const cmp = sortKey === "amount" ? a.amount - b.amount : a.date.localeCompare(b.date);
      return asc ? cmp : -cmp;
    });
    return r;
  }, [filter, sortKey, asc]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(false);
    }
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
        <CardTitle className="text-base">Recent Transactions</CardTitle>
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by status">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                filter === f
                  ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Bulk action bar */}
        {selected.size > 0 && (
          <div className="mb-3 flex items-center justify-between rounded-lg bg-primary/5 px-3 py-2 text-sm ring-1 ring-inset ring-primary/15">
            <span className="font-medium text-foreground">
              <span className="tabular">{selected.size}</span> selected
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4" aria-hidden />
                Export
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>
                <X className="h-4 w-4" aria-hidden />
                Clear
              </Button>
            </div>
          </div>
        )}

        {/* Horizontal scroll wrapper for mobile (ux: table handling) */}
        <div className="overflow-x-auto">
          {rows.length === 0 ? (
            <EmptyState />
          ) : (
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="w-10 px-3 py-2.5">
                    <input
                      type="checkbox"
                      aria-label="Select all rows"
                      checked={allSelected}
                      onChange={() =>
                        setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)))
                      }
                      className="h-4 w-4 cursor-pointer rounded accent-[var(--color-primary)]"
                    />
                  </th>
                  <th className="px-3 py-2.5 font-medium">ID</th>
                  <SortHeader label="Date" active={sortKey === "date"} asc={asc} onClick={() => toggleSort("date")} />
                  <th className="px-3 py-2.5 font-medium">Merchant</th>
                  <th className="px-3 py-2.5 font-medium">Status</th>
                  <SortHeader label="Amount" align="right" active={sortKey === "amount"} asc={asc} onClick={() => toggleSort("amount")} />
                </tr>
              </thead>
              <tbody>
                {rows.map((t) => (
                  <Row key={t.id} t={t} selected={selected.has(t.id)} onToggle={() => toggleRow(t.id)} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function SortHeader({
  label,
  active,
  asc,
  onClick,
  align = "left",
}: {
  label: string;
  active: boolean;
  asc: boolean;
  onClick: () => void;
  align?: "left" | "right";
}) {
  return (
    <th
      className={cn("px-3 py-2.5 font-medium", align === "right" && "text-right")}
      aria-sort={active ? (asc ? "ascending" : "descending") : "none"}
    >
      <button
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1 rounded transition-colors hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          active && "text-foreground",
          align === "right" && "flex-row-reverse"
        )}
      >
        {label}
        <ArrowUpDown className="h-3.5 w-3.5" aria-hidden />
      </button>
    </th>
  );
}

function Row({ t, selected, onToggle }: { t: Transaction; selected: boolean; onToggle: () => void }) {
  const negative = t.amount < 0;
  return (
    <tr className={cn("border-b border-border transition-colors hover:bg-muted/60", selected && "bg-primary/5")}>
      <td className="px-3 py-3">
        <input
          type="checkbox"
          aria-label={`Select ${t.id}`}
          checked={selected}
          onChange={onToggle}
          className="h-4 w-4 cursor-pointer rounded accent-[var(--color-primary)]"
        />
      </td>
      <td className="tabular px-3 py-3 text-xs text-muted-foreground">{t.id}</td>
      <td className="tabular px-3 py-3 text-muted-foreground">{t.date}</td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2.5">
          <span
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold text-foreground"
            aria-hidden
          >
            {t.merchant.charAt(0)}
          </span>
          <div className="min-w-0">
            <span className="block truncate font-medium text-foreground">{t.merchant}</span>
            <span className="block truncate text-xs text-muted-foreground">{t.category}</span>
          </div>
        </div>
      </td>
      <td className="px-3 py-3">
        <Badge variant={statusVariant[t.status]} dot className="capitalize">
          {t.status}
        </Badge>
      </td>
      <td className={cn("tabular px-3 py-3 text-right font-semibold", negative ? "text-foreground" : "text-success")}>
        {negative ? "" : "+"}
        {formatCurrency(t.amount)}
      </td>
    </tr>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-muted" aria-hidden>
        <Inbox className="h-6 w-6 text-muted-foreground" />
      </span>
      <p className="font-medium text-foreground">No transactions found</p>
      <p className="text-sm text-muted-foreground">Try a different filter or connect an account.</p>
    </div>
  );
}
