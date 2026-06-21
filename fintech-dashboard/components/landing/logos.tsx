const companies = ["Acme", "Globex", "Initech", "Umbrella", "Soylent", "Hooli"];

export function Logos() {
  return (
    <section className="border-y border-border bg-card/50" aria-label="Trusted by">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by finance teams at 4,000+ companies
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
          {companies.map((c) => (
            <span
              key={c}
              className="font-mono text-lg font-semibold text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
