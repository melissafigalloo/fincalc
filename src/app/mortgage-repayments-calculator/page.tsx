import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calculator, Info, House } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MortgageCalculator } from "@/components/mortgage-calculator";

export const metadata: Metadata = {
  title: "Mortgage Repayment Calculator",
  description:
    "Estimate your monthly mortgage repayments, total interest paid, and the total cost of your loan. Free, instant, no sign-up required.",
};

export default function MortgageRepaymentsCalculatorPage() {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex flex-1 flex-col">
        <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 pt-6 sm:px-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-foreground"
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calculator className="size-4" aria-hidden="true" />
            </span>
            FinCalc
          </Link>
          <Button variant="ghost" size="sm" render={<Link href="/" />}>
            <ArrowLeft data-icon="inline-start" />
            All calculators
          </Button>
        </header>

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
              and fees vary, so always confirm the exact figures with your
              lender before committing.
            </AlertDescription>
          </Alert>
        </section>

        <footer className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 pb-10 sm:px-16">
          <Separator />
          <div className="flex flex-col items-center gap-1.5 text-sm text-muted-foreground sm:flex-row sm:justify-between">
            <span>© {year} FinCalc</span>
            <span>Simple financial calculators, built for clarity.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
