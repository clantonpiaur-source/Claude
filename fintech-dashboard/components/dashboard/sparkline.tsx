type Props = {
  data: number[];
  /** Stroke + gradient color (any CSS color, defaults to currentColor). */
  color?: string;
  className?: string;
};

/**
 * Tiny, dependency-free trend sparkline. Decorative (aria-hidden) — the exact
 * delta is always shown as text on the KPI card, so this never carries
 * meaning by line alone.
 */
export function Sparkline({ data, color = "currentColor", className }: Props) {
  const w = 100;
  const h = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);

  const pts = data.map((d, i) => {
    const x = i * step;
    const y = h - ((d - min) / range) * (h - 4) - 2;
    return [x, y] as const;
  });

  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  const id = `spark-${Math.round(min)}-${Math.round(max)}-${data.length}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
      style={{ color }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0.22} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} stroke="none" />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
