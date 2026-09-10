import type { Metadata } from "next";
import { Info, PiggyBank } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CompoundInterestCalculator } from "@/components/compound-interest-calculator";

export const metadata: Metadata = {
  title: "Compound Interest Calculator",
  description:
    "See how your savings and investments grow over time with daily, monthly or yearly compounding and recurring contributions. Free, instant, no sign-up required.",
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
          Compound interest calculator
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          Enter your initial amount, monthly contributions and interest rate to
          see how your savings can grow over time.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-16 sm:px-16">
        <CompoundInterestCalculator />
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-10 sm:px-16">
        <Alert variant="default">
          <Info />
          <AlertTitle>Planning figures only</AlertTitle>
          <AlertDescription>
            This calculator provides estimates to help you plan. Investment
            returns vary and are not guaranteed, so always confirm your options
            with a qualified financial adviser.
          </AlertDescription>
        </Alert>
      </section>
    </div>
  );
}
