import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section aria-label="Get started">
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary to-[#0b2a6b] px-6 py-14 text-center sm:px-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
          <h2 className="relative font-mono text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Put your finances on autopilot
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/80">
            Join thousands of teams running their money on Meridian. Set up in
            minutes — free for 30 days, no card required.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/dashboard">
              <Button variant="accent" className="h-11 w-full px-6 text-base sm:w-auto">
                Open your dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="h-11 w-full border-white/30 bg-white/10 px-6 text-base text-white hover:bg-white/20 sm:w-auto"
              >
                Talk to sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
