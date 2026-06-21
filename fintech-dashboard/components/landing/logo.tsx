import { cn } from "@/lib/utils";

/** Meridian wordmark + glyph. `tone` adapts the wordmark color to dark surfaces. */
export function Logo({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "onDark";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className="grid h-8 w-8 place-items-center rounded-md bg-primary font-mono font-bold text-primary-foreground"
        aria-hidden
      >
        M
      </span>
      <span
        className={cn(
          "font-mono text-lg font-semibold",
          tone === "onDark" ? "text-white" : "text-foreground"
        )}
      >
        Meridian
      </span>
    </span>
  );
}
