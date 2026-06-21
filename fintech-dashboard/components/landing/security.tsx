import { Lock, FileCheck, Eye, KeyRound } from "lucide-react";

const items = [
  {
    icon: Lock,
    title: "256-bit encryption",
    body: "Data is encrypted in transit and at rest with AES-256.",
  },
  {
    icon: FileCheck,
    title: "SOC 2 Type II",
    body: "Independently audited controls, renewed annually.",
  },
  {
    icon: KeyRound,
    title: "SSO & MFA",
    body: "Enforce SAML SSO and multi-factor across your org.",
  },
  {
    icon: Eye,
    title: "Full audit trail",
    body: "Every action is logged, exportable, and tamper-evident.",
  },
];

export function Security() {
  return (
    <section id="security" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Lock className="h-3.5 w-3.5 text-success" />
            Security &amp; compliance
          </span>
          <h2 className="mt-5 font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Trusted with the money that matters
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Meridian is built to the standards regulators and CFOs expect. Your
            funds are held with FDIC-insured partner banks, and your data never
            leaves our compliant infrastructure.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              PCI-DSS Level 1 certified
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              GDPR &amp; CCPA compliant
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Funds held at FDIC-insured partner banks
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-success/10 text-success">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-3 font-mono text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
