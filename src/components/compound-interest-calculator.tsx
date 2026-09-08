"use client";

import { useMemo, useState } from "react";
import { TrendingUp, Wallet } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  calculateCompoundInterest,
  formatCurrency,
  formatRatio,
  type CompoundFrequency,
} from "@/lib/compound-interest";

const DEFAULT_INITIAL_AMOUNT = "10000";
const DEFAULT_MONTHLY_CONTRIBUTION = "200";
const DEFAULT_INTEREST_RATE = "7";
const DEFAULT_YEARS = "10";

function parseNumber(value: string): number {
  if (value.trim() === "") {
    return NaN;
  }
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : NaN;
}

export function CompoundInterestCalculator() {
  const [initialAmount, setInitialAmount] = useState(DEFAULT_INITIAL_AMOUNT);
  const [monthlyContribution, setMonthlyContribution] = useState(
    DEFAULT_MONTHLY_CONTRIBUTION,
  );
  const [interestRate, setInterestRate] = useState(DEFAULT_INTEREST_RATE);
  const [years, setYears] = useState(DEFAULT_YEARS);
  const [frequency, setFrequency] = useState<CompoundFrequency>("monthly");

  const result = useMemo(() => {
    const principal = parseNumber(initialAmount);
    const contribution = parseNumber(monthlyContribution);
    const annualRate = parseNumber(interestRate);
    const termYears = parseNumber(years);

    return calculateCompoundInterest({
      principal: Number.isFinite(principal) ? principal : 0,
      monthlyContribution: Number.isFinite(contribution) ? contribution : 0,
      annualRate: Number.isFinite(annualRate) ? annualRate : 0,
      frequency,
      years: Number.isFinite(termYears) ? termYears : 0,
    });
  }, [initialAmount, monthlyContribution, interestRate, years, frequency]);

  const handleFrequencyChange = (value: Array<string | number>) => {
    const next = String(value[0] ?? "");
    if (next !== "daily" && next !== "monthly" && next !== "yearly") {
      return;
    }
    setFrequency(next);
  };

  const displayTerm =
    result.finalBalance > 0
      ? `${years} year${parseNumber(years) === 1 ? "" : "s"}`
      : "0";

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Your details</CardTitle>
          <CardDescription>
            Adjust any figure and the results update instantly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="initial-amount">Initial amount</FieldLabel>
              <InputGroup>
                <InputGroupAddon>$</InputGroupAddon>
                <InputGroupInput
                  id="initial-amount"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={initialAmount}
                  onChange={(event) => setInitialAmount(event.target.value)}
                />
              </InputGroup>
              <FieldDescription>
                The amount you are starting with.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="monthly-contribution">
                Monthly contribution
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>$</InputGroupAddon>
                <InputGroupInput
                  id="monthly-contribution"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={monthlyContribution}
                  onChange={(event) =>
                    setMonthlyContribution(event.target.value)
                  }
                />
              </InputGroup>
              <FieldDescription>
                How much you add to your balance each month.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="interest-rate">
                Annual interest rate
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="interest-rate"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={interestRate}
                  onChange={(event) => setInterestRate(event.target.value)}
                />
                <InputGroupAddon align="inline-end">%</InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="compounding-frequency">
                Compounding frequency
              </FieldLabel>
              <ToggleGroup
                aria-label="Compounding frequency"
                value={[frequency]}
                onValueChange={handleFrequencyChange}
              >
                <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
                <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
                <ToggleGroupItem value="yearly">Yearly</ToggleGroupItem>
              </ToggleGroup>
              <FieldDescription>
                How often interest is added to your balance.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="time-period">Time period</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="time-period"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={years}
                  onChange={(event) => setYears(event.target.value)}
                />
                <InputGroupAddon align="inline-end">years</InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                How long you plan to keep the money invested.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <Card className="gap-0 ring-0 bg-primary text-primary-foreground">
          <CardContent className="py-8">
            <p className="text-sm font-medium text-primary-foreground/70">
              Final balance
            </p>
            <p className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">
              {formatCurrency(result.finalBalance)}
            </p>
            <p className="mt-2 text-sm text-primary-foreground/70">
              after {displayTerm}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5">
                <Wallet
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                You contribute
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">
                {formatCurrency(result.totalContributions)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5">
                <TrendingUp
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                Interest earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">
                {formatCurrency(result.totalInterest)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How your money grows</CardTitle>
            <CardDescription>Split of your ending balance.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span>Money you put in</span>
              <span className="text-muted-foreground tabular-nums">
                {formatRatio(result.contributionsRatio)}
              </span>
            </div>
            <Progress value={result.contributionsRatio * 100} />
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span>Interest</span>
              <span className="text-muted-foreground tabular-nums">
                {formatRatio(result.interestRatio)}
              </span>
            </div>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Of the {formatCurrency(result.finalBalance)} you would have,{" "}
              {formatCurrency(result.totalContributions)} comes from what you
              put in and {formatCurrency(result.totalInterest)} is interest
              earned.
            </p>
          </CardContent>
        </Card>
      </div>

      <Alert variant="default" className="lg:col-span-2">
        <AlertTitle>Planning figures only</AlertTitle>
        <AlertDescription>
          This calculator produces an estimate to help you plan. Investment
          returns vary, so treat these figures as guidance rather than a
          guarantee.
        </AlertDescription>
      </Alert>
    </div>
  );
}
