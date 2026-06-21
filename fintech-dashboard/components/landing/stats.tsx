const stats = [
  { value: "$48B+", label: "Processed annually" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "4,000+", label: "Companies onboard" },
  { value: "120", label: "Countries covered" },
];

export function Stats() {
  return (
    <section aria-label="Key numbers">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#0b2a6b] px-6 py-10 sm:px-10">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="tabular font-mono text-3xl font-semibold text-white sm:text-4xl">
                  {s.value}
                </dd>
                <p className="mt-1 text-sm text-white/70">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
