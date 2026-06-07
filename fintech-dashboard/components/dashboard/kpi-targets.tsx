import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { targets } from "@/lib/data";

function fmt(value: number, unit: string) {
  if (unit === "$") return `$${(value / 1000).toFixed(0)}k`;
  return `${value.toLocaleString("en-US")}${unit}`;
}

// Bullet chart (chart DB: performance vs target, AAA). Values always shown
// as text; not hover-only. Pure CSS — no canvas needed for a few KPIs.
export function KpiTargets() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Goals vs Target</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {targets.map((t) => {
          const pct = Math.min(100, Math.round((t.current / t.target) * 100));
          const onTrack = pct >= 90;
          return (
            <div key={t.label}>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="font-medium text-foreground">{t.label}</span>
                <span className="tabular text-muted-foreground">
                  {fmt(t.current, t.unit)} / {fmt(t.target, t.unit)}
                </span>
              </div>
              <div
                className="relative h-2.5 w-full rounded-full bg-muted"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${t.label}: ${pct}% of target`}
              >
                <div
                  className="h-full rounded-full transition-[width] duration-300"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: onTrack ? "var(--color-success)" : "var(--color-warning)",
                  }}
                />
                {/* Target marker */}
                <span
                  className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 bg-foreground"
                  style={{ left: "100%" }}
                  aria-hidden
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
