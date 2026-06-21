import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Logos } from "@/components/landing/logos";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Stats } from "@/components/landing/stats";
import { Security } from "@/components/landing/security";
import { Testimonial } from "@/components/landing/testimonial";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main>
        <Hero />
        <Logos />
        <Features />
        <HowItWorks />
        <Stats />
        <Security />
        <Testimonial />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
