import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calculator, Info, PiggyBank } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CompoundInterestCalculator } from "@/components/compound-interest-calculator";

export const metadata: Metadata = {
  title: "Compound Interest Calculator",
  description:
    "See how your savings and investments grow over time with daily, monthly or yearly compounding and recurring contributions. Free, instant, no sign-up required.",
};

export default function CompoundInterestCalculatorPage() {
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
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/" />}
          >
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
            <PiggyBank data-icon="inline-start" />
            Compound interest
          </Badge>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-[1.08]">
            Compound interest calculator
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Enter your initial amount, monthly contributions and interest rate
            to see how your savings can grow over time.
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
              returns vary and are not guaranteed, so always confirm your
              options with a qualified financial adviser.
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
