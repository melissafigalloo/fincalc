import type { Metadata } from "next";
import { Info, House } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { MortgageCalculator } from "@/components/mortgage-calculator";

export const metadata: Metadata = {
  title: "Mortgage Repayment Calculator",
  description:
    "Estimate your monthly mortgage repayments, total interest paid, and the total cost of your loan. Free, instant, no sign-up required.",
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
          Mortgage repayment calculator
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          Enter your loan amount, interest rate and term to see your monthly
          repayments, total interest and the real cost of the loan.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-16 sm:px-16">
        <MortgageCalculator />
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-10 sm:px-16">
        <Alert variant="default">
          <Info />
          <AlertTitle>Planning figures only</AlertTitle>
          <AlertDescription>
            This calculator provides estimates to help you plan. Rates change
            and fees vary, so always confirm the exact figures with your lender
            before committing.
          </AlertDescription>
        </Alert>
      </section>
    </div>
  );
}
