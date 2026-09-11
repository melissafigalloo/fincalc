"use client";

import { useMemo, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AmortizationSchedule } from "@/components/amortization-schedule";
import { calculateMortgage, formatCurrency } from "@/lib/mortgage";

const DEFAULT_LOAN_AMOUNT = "400000";
const DEFAULT_DOWN_PAYMENT = "100000";
const DEFAULT_INTEREST_RATE = "6.5";
const DEFAULT_TERM = "30";

function parseNumber(value: string): number {
  if (value.trim() === "") {
    return NaN;
  }
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : NaN;
}

export function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(DEFAULT_LOAN_AMOUNT);
  const [downPayment, setDownPayment] = useState(DEFAULT_DOWN_PAYMENT);
  const [interestRate, setInterestRate] = useState(DEFAULT_INTEREST_RATE);
  const [termYears, setTermYears] = useState(DEFAULT_TERM);

  const result = useMemo(() => {
    const loan = parseNumber(loanAmount);
    const down = parseNumber(downPayment);
    const principal = Math.max(0, Number.isFinite(loan) ? loan : 0);
    const annualRate = parseNumber(interestRate);
    const term = parseNumber(termYears);

    return calculateMortgage({
      principal: principal - Math.max(0, Number.isFinite(down) ? down : 0),
      annualRate: Number.isFinite(annualRate) ? annualRate : 0,
      termYears: Number.isFinite(term) ? term : 0,
      frequency: "monthly",
    });
  }, [loanAmount, downPayment, interestRate, termYears]);

  const repayments = [
    {
      label: "Total Payment",
      value: formatCurrency(result.totalPayment),
    },
    {
      label: "Total Interest",
      value: formatCurrency(result.totalInterest),
    },
    {
      label: "Principal Amount",
      value: formatCurrency(result.principal),
    },
    {
      label: "Number of Payments",
      value: result.periods.toLocaleString("en-US"),
    },
  ];

  return (
    <Tabs defaultValue="calculator">
      <TabsList>
        <TabsTrigger value="calculator">Calculator</TabsTrigger>
        <TabsTrigger value="schedule">Amortisation Schedule</TabsTrigger>
      </TabsList>

      <TabsContent value="calculator">
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>
                Enter your loan information to calculate repayments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="loan-amount">Loan Amount</FieldLabel>
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
                    The total amount you plan to borrow.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="down-payment">Down Payment</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>$</InputGroupAddon>
                    <InputGroupInput
                      id="down-payment"
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      value={downPayment}
                      onChange={(event) => setDownPayment(event.target.value)}
                    />
                  </InputGroup>
                  <FieldDescription>
                    Your down payment reduces the loan. You borrow{" "}
                    {formatCurrency(result.principal)} in total.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="interest-rate">
                    Annual Interest Rate
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
                  <FieldLabel htmlFor="loan-term">Loan Term (years)</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="loan-term"
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      value={termYears}
                      onChange={(event) => setTermYears(event.target.value)}
                    />
                    <InputGroupAddon align="inline-end">years</InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    How long you plan to take to pay the loan off.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Repayments</CardTitle>
              <CardDescription>
                Estimated monthly and total costs.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-lg bg-primary p-5 text-primary-foreground">
                <p className="text-sm font-medium text-primary-foreground/70">
                  Monthly Payment
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
                  {formatCurrency(result.payment)}
                </p>
              </div>
              <dl className="flex flex-col">
                {repayments.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-2 border-b py-2.5 last:border-b-0"
                  >
                    <dt className="text-sm text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="text-base font-semibold tabular-nums">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="schedule">
        <AmortizationSchedule
          schedule={result.schedule}
          periodType={result.periodType}
        />
      </TabsContent>
    </Tabs>
  );
}
