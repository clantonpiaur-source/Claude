import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { targets } from "@/lib/data";
import { cn } from "@/lib/utils";

function fmt(value: number, unit: string) {
  if (unit === "$") return `$${(value / 1000).toFixed(0)}k`;
  return `${value.toLocaleString("en-US")}${unit}`;
}

// Bullet chart (chart DB: performance vs target, AAA). Values always shown as
// text; not hover-only. Pure CSS — no canvas needed for a few KPIs.
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
              <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-foreground">{t.label}</span>
                <span className="tabular text-muted-foreground">
                  {fmt(t.current, t.unit)} <span className="text-muted-foreground/60">/ {fmt(t.target, t.unit)}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="relative h-2.5 w-full overflow-visible rounded-full bg-muted"
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${t.label}: ${pct}% of target`}
                >
                  <div
                    className={cn(
                      "h-full rounded-full transition-[width] duration-500",
                      onTrack
                        ? "bg-[linear-gradient(90deg,var(--color-success),color-mix(in_srgb,var(--color-success)_70%,white))]"
                        : "bg-[linear-gradient(90deg,var(--color-warning),color-mix(in_srgb,var(--color-warning)_70%,white))]"
                    )}
                    style={{ width: `${pct}%` }}
                  />
                  {/* Target marker */}
                  <span
                    className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 rounded bg-foreground/70"
                    style={{ left: "100%" }}
                    aria-hidden
                  />
                </div>
                <span
                  className={cn(
                    "tabular w-10 shrink-0 text-right text-xs font-semibold",
                    onTrack ? "text-success" : "text-warning"
                  )}
                >
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
