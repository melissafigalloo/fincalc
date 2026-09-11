import type { Metadata } from "next";
import { PiggyBank } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CompoundInterestCalculator } from "@/components/compound-interest-calculator";

export const metadata: Metadata = {
  title: "Compound Interest Calculator",
  description:
    "See how your investments grow over time with compound interest. Project savings, compare frequencies, and plan your financial future.",
};

export default function CompoundInterestCalculatorPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative isolate flex flex-col items-center px-6 pt-16 pb-12 text-center sm:px-16 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_0%,color-mix(in_oklch,var(--primary)_7%,transparent),transparent)]"
        />
        <Badge variant="secondary">
          <PiggyBank data-icon="inline-start" />
          Compound interest
        </Badge>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-[1.08]">
          Compound Interest Calculator
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          See how your investments grow over time with compound interest.
          Project savings, compare frequencies, and plan your financial future.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-16 sm:px-16">
        <CompoundInterestCalculator />
      </section>
    </div>
  );
}
