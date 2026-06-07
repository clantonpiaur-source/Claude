import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { AllocationDonut } from "@/components/dashboard/allocation-donut";
import { KpiTargets } from "@/components/dashboard/kpi-targets";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { kpis } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        {/* pb-24 on mobile keeps content clear of the fixed bottom nav */}
        <main className="flex-1 space-y-4 p-4 pb-24 sm:p-6 lg:pb-6">
          <div>
            <h1 className="font-mono text-xl font-semibold text-foreground sm:text-2xl">Overview</h1>
            <p className="text-sm text-muted-foreground">Your financial snapshot for the last 6 months.</p>
          </div>

          {/* Row 1 — KPI cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Key metrics">
            {kpis.map((k) => (
              <KpiCard key={k.label} {...k} />
            ))}
          </section>

          {/* Row 2 — Revenue trend (2/3) + Allocation donut (1/3) */}
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <AllocationDonut />
          </section>

          {/* Row 3 — Goals vs target */}
          <section>
            <KpiTargets />
          </section>

          {/* Row 4 — Transactions table */}
          <section>
            <TransactionsTable />
          </section>
        </main>
      </div>
    </div>
  );
}
