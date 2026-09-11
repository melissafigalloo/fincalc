import type { Metadata } from "next";
import { House } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MortgageCalculator } from "@/components/mortgage-calculator";

export const metadata: Metadata = {
  title: "Mortgage Repayments Calculator",
  description:
    "Calculate your monthly mortgage payments and see the full amortisation schedule.",
};

export default function MortgageRepaymentsCalculatorPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative isolate flex flex-col items-center px-6 pt-16 pb-12 text-center sm:px-16 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_0%,color-mix(in_oklch,var(--primary)_7%,transparent),transparent)]"
        />
        <Badge variant="secondary">
          <House data-icon="inline-start" />
          Mortgage
        </Badge>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-[1.08]">
          Mortgage Repayments Calculator
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          Calculate your monthly mortgage payments and see the full amortisation
          schedule.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-16 sm:px-16">
        <MortgageCalculator />
      </section>
    </div>
  );
}
