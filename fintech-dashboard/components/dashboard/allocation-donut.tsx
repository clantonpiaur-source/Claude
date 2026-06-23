"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allocation } from "@/lib/data";

// ≤5 slices → donut is appropriate (chart DB: no pie/donut overuse).
const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

function DonutTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-lg border border-border bg-card/95 px-3 py-1.5 text-sm shadow-md backdrop-blur">
      <span className="text-muted-foreground">{p.name}</span>
      <span className="tabular ml-2 font-medium text-foreground">{p.value}%</span>
    </div>
  );
}

export function AllocationDonut() {
  const largest = allocation.reduce((a, b) => (b.value > a.value ? b : a), allocation[0]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocation}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={3}
                cornerRadius={6}
                stroke="var(--color-card)"
                strokeWidth={2}
              >
                {allocation.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<DonutTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="tabular text-2xl font-semibold text-foreground">{largest.value}%</span>
            <span className="text-xs text-muted-foreground">{largest.name}</span>
          </div>
        </div>

        {/* Legend with values — color paired with label text, never color alone */}
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {allocation.map((entry, i) => (
            <li key={entry.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
                aria-hidden
              />
              <span className="truncate text-muted-foreground">{entry.name}</span>
              <span className="tabular ml-auto font-medium text-foreground">{entry.value}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
