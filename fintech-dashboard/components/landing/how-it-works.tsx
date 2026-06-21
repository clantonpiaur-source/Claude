const steps = [
  {
    step: "01",
    title: "Connect your accounts",
    body: "Securely link your banks, cards, and payment processors in minutes with read-only, revocable access.",
  },
  {
    step: "02",
    title: "See everything in one place",
    body: "Balances, revenue, and transactions flow into a single live dashboard the moment they happen.",
  },
  {
    step: "03",
    title: "Automate and scale",
    body: "Set rules for payouts, approvals, and reconciliation — then let Meridian run the busywork for you.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Live in three steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No migrations, no consultants. Most teams are up and running the same
            afternoon they sign up.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.step} className="relative">
              {/* Connector line on desktop */}
              {i < steps.length - 1 && (
                <span
                  className="absolute left-12 top-5 hidden h-px w-[calc(100%-2rem)] bg-border md:block"
                  aria-hidden
                />
              )}
              <div className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-background font-mono text-sm font-semibold text-primary">
                {s.step}
              </div>
              <h3 className="mt-4 font-mono text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
