"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revenueSeries } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

function currencyTick(v: number) {
  return `$${(v / 1000).toFixed(0)}k`;
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card/95 px-3 py-2 shadow-md backdrop-blur">
      <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} aria-hidden />
          <span className="text-muted-foreground">{p.name}</span>
          <span className="tabular ml-auto font-medium text-foreground">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function RevenueChart() {
  const latest = revenueSeries[revenueSeries.length - 1];
  const net = latest.revenue - latest.expenses;

  return (
    <Card className="h-full">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle>Revenue vs Expenses</CardTitle>
          <span className="inline-flex items-center gap-0.5 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success ring-1 ring-inset ring-success/20">
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            <span className="tabular">+15.4%</span>
          </span>
        </div>
        <p className="tabular text-2xl font-semibold text-foreground">{formatCurrency(net)}</p>
        <p className="text-xs text-muted-foreground">Net this month · last 6 months</p>
      </CardHeader>
      <CardContent>
        {/* Trend over time → Area chart. Series use distinct color + dashed
            style so they are distinguishable without color alone. */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.16} />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "var(--color-border)" }}
                dy={4}
              />
              <YAxis
                tickFormatter={currencyTick}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={48}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--color-border-strong)", strokeWidth: 1 }} />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                iconType="plainline"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                fill="url(#rev)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--color-card)" }}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="var(--color-accent)"
                strokeWidth={2}
                strokeDasharray="5 4"
                fill="url(#exp)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--color-card)" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
