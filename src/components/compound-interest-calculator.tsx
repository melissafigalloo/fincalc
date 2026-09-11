"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formatCompactCurrency } from "@/lib/format";
import {
  buildCompoundInterestSchedule,
  calculateCompoundInterest,
  formatCurrency,
  type CompoundFrequency,
} from "@/lib/compound-interest";

const DEFAULT_INITIAL_AMOUNT = "10000";
const DEFAULT_MONTHLY_CONTRIBUTION = "200";
const DEFAULT_INTEREST_RATE = "7";
const DEFAULT_YEARS = "10";

const FREQUENCY_LABELS: Record<CompoundFrequency, string> = {
  daily: "Daily",
  monthly: "Monthly",
  yearly: "Yearly",
};

const chartConfig = {
  balance: {
    label: "Balance",
    color: "var(--primary)",
  },
} as const;

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

  const params = useMemo(() => {
    const principal = parseNumber(initialAmount);
    const contribution = parseNumber(monthlyContribution);
    const annualRate = parseNumber(interestRate);
    const termYears = parseNumber(years);

    return {
      principal: Number.isFinite(principal) ? principal : 0,
      monthlyContribution: Number.isFinite(contribution) ? contribution : 0,
      annualRate: Number.isFinite(annualRate) ? annualRate : 0,
      frequency,
      years: Number.isFinite(termYears) ? termYears : 0,
    };
  }, [initialAmount, monthlyContribution, interestRate, years, frequency]);

  const result = useMemo(() => calculateCompoundInterest(params), [params]);

  const schedule = useMemo(
    () => buildCompoundInterestSchedule(params),
    [params],
  );

  const chartData = useMemo(
    () =>
      schedule.map((row) => ({
        period: `Year ${row.period}`,
        balance: row.balance,
      })),
    [schedule],
  );

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

  const resultStats = [
    {
      label: "Total Contributions",
      value: formatCurrency(result.totalContributions),
    },
    {
      label: "Total Interest Earned",
      value: formatCurrency(result.totalInterest),
    },
    {
      label: "Compounding",
      value: FREQUENCY_LABELS[frequency],
    },
    {
      label: "Investment Period",
      value: displayTerm,
    },
  ];

  const scheduleTotals = useMemo(
    () =>
      schedule.reduce(
        (acc, row) => ({
          contributions: acc.contributions + row.contributions,
          interest: acc.interest + row.interest,
        }),
        { contributions: 0, interest: 0 },
      ),
    [schedule],
  );

  const endingBalance = schedule[schedule.length - 1]?.balance ?? 0;

  return (
    <Tabs defaultValue="calculator">
      <TabsList>
        <TabsTrigger value="calculator">Calculator</TabsTrigger>
        <TabsTrigger value="schedule">Growth Schedule</TabsTrigger>
        <TabsTrigger value="chart">Growth Chart</TabsTrigger>
      </TabsList>

      <TabsContent value="calculator">
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
              <CardDescription>
                Enter your deposit and contribution details to calculate growth.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="initial-amount">
                    Initial Deposit
                  </FieldLabel>
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
                    Monthly Contribution
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
                  <FieldLabel htmlFor="compounding-frequency">
                    Compounding Frequency
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
                  <FieldLabel htmlFor="time-period">Time Period</FieldLabel>
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

          <Card>
            <CardHeader>
              <CardTitle>Your Results</CardTitle>
              <CardDescription>
                Projected growth of your investments over time.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-lg bg-primary p-5 text-primary-foreground">
                <p className="text-sm font-medium text-primary-foreground/70">
                  Final Balance
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
                  {formatCurrency(result.finalBalance)}
                </p>
                <p className="mt-2 text-sm text-primary-foreground/70">
                  after {displayTerm}
                </p>
              </div>
              <dl className="flex flex-col">
                {resultStats.map((item) => (
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
        <Card className="gap-0">
          <CardHeader>
            <CardTitle>Growth Schedule</CardTitle>
            <CardDescription>
              Year-by-year breakdown of your investment growth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {schedule.length === 0 ? (
              <p className="text-sm leading-6 text-muted-foreground">
                Enter a valid time period to see the growth schedule.
              </p>
            ) : (
              <div className="max-h-96 overflow-y-auto rounded-md border">
                <Table>
                  <TableHeader className="sticky top-0 z-10 bg-background">
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Period</TableHead>
                      <TableHead className="text-right">
                        Contributions
                      </TableHead>
                      <TableHead className="text-right">Interest</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedule.map((row) => (
                      <TableRow key={row.period}>
                        <TableCell className="font-medium">
                          Year {row.period}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(row.contributions)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(row.interest)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(row.balance)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow className="hover:bg-transparent">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(scheduleTotals.contributions)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(scheduleTotals.interest)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(endingBalance)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="chart">
        <Card>
          <CardHeader>
            <CardTitle>Growth Chart</CardTitle>
            <CardDescription>
              How your investment balance grows over time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length === 0 ? (
              <p className="text-sm leading-6 text-muted-foreground">
                Enter a valid time period to see the growth chart.
              </p>
            ) : (
              <ChartContainer config={chartConfig} className="aspect-video">
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="period"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={56}
                    tickFormatter={(value) =>
                      formatCompactCurrency(Number(value))
                    }
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                    }
                  />
                  <Line
                    dataKey="balance"
                    type="monotone"
                    stroke="var(--color-balance)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
