"use client";

import { useMemo, useState } from "react";
import { Receipt, Wallet } from "lucide-react";
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
import { calculateMortgage, formatCurrency, formatRatio } from "@/lib/mortgage";

const DEFAULT_LOAN_AMOUNT = "300000";
const DEFAULT_INTEREST_RATE = "6.5";
const DEFAULT_TERM = "30";

type TermUnit = "years" | "months";

function parseNumber(value: string): number {
  if (value.trim() === "") {
    return NaN;
  }
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : NaN;
}

export function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(DEFAULT_LOAN_AMOUNT);
  const [interestRate, setInterestRate] = useState(DEFAULT_INTEREST_RATE);
  const [term, setTerm] = useState(DEFAULT_TERM);
  const [termUnit, setTermUnit] = useState<TermUnit>("years");

  const result = useMemo(() => {
    const principal = parseNumber(loanAmount);
    const annualRate = parseNumber(interestRate);
    const termValue = parseNumber(term);
    const termYears =
      termUnit === "months" && Number.isFinite(termValue)
        ? termValue / 12
        : termValue;

    return calculateMortgage({
      principal: Number.isFinite(principal) ? principal : 0,
      annualRate: Number.isFinite(annualRate) ? annualRate : 0,
      termYears: Number.isFinite(termYears) ? termYears : 0,
    });
  }, [loanAmount, interestRate, term, termUnit]);

  const handleTermUnitChange = (value: Array<string | number>) => {
    const next = String(value[0] ?? "");
    if (next !== "years" && next !== "months") {
      return;
    }
    if (next === termUnit) {
      return;
    }

    const current = parseNumber(term);
    if (Number.isFinite(current) && current > 0) {
      if (next === "months") {
        setTerm(String(Math.round(current * 12)));
      } else {
        setTerm(String(Math.round((current / 12) * 100) / 100));
      }
    }

    setTermUnit(next);
  };

  const displayTerm = result.totalPayment > 0 ? `${term} ${termUnit}` : "0";

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
              <FieldLabel htmlFor="loan-amount">Loan amount</FieldLabel>
              <InputGroup>
                <InputGroupAddon>$</InputGroupAddon>
                <InputGroupInput
                  id="loan-amount"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={loanAmount}
                  onChange={(event) => setLoanAmount(event.target.value)}
                />
              </InputGroup>
              <FieldDescription>
                The total amount you are borrowing.
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
              <FieldLabel htmlFor="loan-term">Loan term</FieldLabel>
              <ToggleGroup
                aria-label="Loan term unit"
                value={[termUnit]}
                onValueChange={handleTermUnitChange}
              >
                <ToggleGroupItem value="years">Years</ToggleGroupItem>
                <ToggleGroupItem value="months">Months</ToggleGroupItem>
              </ToggleGroup>
              <InputGroup>
                <InputGroupInput
                  id="loan-term"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                />
                <InputGroupAddon align="inline-end">{termUnit}</InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                How long you plan to take to pay it off.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <Card className="gap-0 ring-0 bg-primary text-primary-foreground">
          <CardContent className="py-8">
            <p className="text-sm font-medium text-primary-foreground/70">
              Monthly repayment
            </p>
            <p className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">
              {formatCurrency(result.monthlyPayment)}
            </p>
            <p className="mt-2 text-sm text-primary-foreground/70">
              per month over {displayTerm}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5">
                <Receipt
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                Total interest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">
                {formatCurrency(result.totalInterest)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5">
                <Wallet
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                Total cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">
                {formatCurrency(result.totalPayment)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Where your money goes</CardTitle>
            <CardDescription>
              Split of total repayments over the full term.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span>Principal</span>
              <span className="text-muted-foreground tabular-nums">
                {formatRatio(result.principalRatio)}
              </span>
            </div>
            <Progress value={result.principalRatio * 100} />
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span>Interest</span>
              <span className="text-muted-foreground tabular-nums">
                {formatRatio(result.interestRatio)}
              </span>
            </div>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Of the {formatCurrency(result.totalPayment)} you repay in total,{" "}
              {formatCurrency(result.principal)} is the amount you borrowed and{" "}
              {formatCurrency(result.totalInterest)} is interest.
            </p>
          </CardContent>
        </Card>
      </div>

      <Alert variant="default" className="lg:col-span-2">
        <AlertTitle>Planning figures only</AlertTitle>
        <AlertDescription>
          This calculator produces an estimate to help you plan. Speak with a
          qualified financial adviser before making big commitments.
        </AlertDescription>
      </Alert>
    </div>
  );
}
