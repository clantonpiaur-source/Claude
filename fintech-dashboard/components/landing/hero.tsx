import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroPreview } from "@/components/landing/hero-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            New — real-time treasury insights
          </span>

          <h1 className="mt-5 font-mono text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Banking that moves at the speed of your business
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Meridian brings your accounts, payments, and analytics into one
            dashboard. Track every dollar in real time, automate payouts, and
            close the books in minutes — not days.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard">
              <Button variant="accent" size="default" className="h-11 w-full px-6 text-base sm:w-auto">
                Open your dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="default" className="h-11 w-full px-6 text-base sm:w-auto">
                See how it works
              </Button>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              Bank-grade encryption
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              No setup fees
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              Free 30-day trial
            </span>
          </div>
        </div>

        <div className="lg:pl-6">
          <HeroPreview />
        </div>
      </div>
    </section>
  );
}
