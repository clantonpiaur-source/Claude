import { Download } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { AllocationDonut } from "@/components/dashboard/allocation-donut";
import { KpiTargets } from "@/components/dashboard/kpi-targets";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { Button } from "@/components/ui/button";
import { kpis } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        {/* pb-24 on mobile keeps content clear of the fixed bottom nav */}
        <main className="flex-1 space-y-5 p-4 pb-24 sm:p-6 lg:pb-6">
          <div className="animate-in flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="display text-2xl font-semibold text-foreground sm:text-3xl">Overview</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Your financial snapshot for the last 6 months.
              </p>
            </div>
            <Button variant="primary" size="sm" className="self-end">
              <Download className="h-4 w-4" aria-hidden />
              Export report
            </Button>
          </div>

          {/* Row 1 — KPI cards */}
          <section
            className="animate-in grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            style={{ animationDelay: "60ms" }}
            aria-label="Key metrics"
          >
            {kpis.map((k) => (
              <KpiCard key={k.label} {...k} />
            ))}
          </section>

          {/* Row 2 — Revenue trend (2/3) + Allocation donut (1/3) */}
          <section
            className="animate-in grid grid-cols-1 gap-4 lg:grid-cols-3"
            style={{ animationDelay: "120ms" }}
          >
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <AllocationDonut />
          </section>

          {/* Row 3 — Goals vs target */}
          <section className="animate-in" style={{ animationDelay: "180ms" }}>
            <KpiTargets />
          </section>

          {/* Row 4 — Transactions table */}
          <section className="animate-in" style={{ animationDelay: "240ms" }}>
            <TransactionsTable />
          </section>
        </main>
      </div>
    </div>
  );
}
