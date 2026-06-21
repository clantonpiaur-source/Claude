import { Star } from "lucide-react";

export function Testimonial() {
  return (
    <section aria-label="Customer testimonial" className="bg-card/50">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <div className="flex items-center justify-center gap-1 text-accent" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-current" />
          ))}
        </div>
        <blockquote className="mt-6 font-mono text-2xl font-medium leading-snug text-foreground sm:text-3xl">
          &ldquo;We replaced four tools and a spreadsheet with Meridian. Month-end
          close went from nine days to one, and we finally trust our numbers in
          real time.&rdquo;
        </blockquote>
        <figcaption className="mt-6 flex items-center justify-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-primary font-mono font-semibold text-primary-foreground">
            MR
          </span>
          <div className="text-left">
            <div className="text-sm font-semibold text-foreground">Maya Rodriguez</div>
            <div className="text-sm text-muted-foreground">VP Finance, Globex</div>
          </div>
        </figcaption>
      </div>
    </section>
  );
}
