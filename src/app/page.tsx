import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  Check,
  House,
  Info,
  LineChart,
  Lock,
  MousePointerClick,
  PiggyBank,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const calculators = [
  {
    href: "/mortgage-repayments-calculator",
    icon: House,
    title: "Mortgage repayment calculator",
    description:
      "Work out your monthly repayments and the true cost of borrowing before you commit to a loan.",
    bullets: [
      "Monthly repayment estimate",
      "Principal and interest split",
      "Total cost over the full term",
      "Switch between years and months",
    ],
    cta: "Calculate my repayments",
  },
  {
    href: "/compound-interest--calculator",
    icon: PiggyBank,
    title: "Compound interest calculator",
    description:
      "Project how your savings and investments grow when interest compounds on top of previous interest.",
    bullets: [
      "Daily, monthly or yearly compounding",
      "Monthly contributions included",
      "Final balance and interest earned",
      "Growth breakdown over time",
    ],
    cta: "Project my growth",
  },
];

const features = [
  {
    icon: Zap,
    title: "Instant results",
    description:
      "Adjust any number and the figures update immediately. No reloads, no waiting.",
  },
  {
    icon: Lock,
    title: "No sign-up required",
    description:
      "Start calculating the moment you land. No account, no email, no tracking.",
  },
  {
    icon: BarChart3,
    title: "Clear breakdowns",
    description:
      "Principal, interest and totals presented simply, so nothing is hidden.",
  },
  {
    icon: RefreshCw,
    title: "Simple scenario planning",
    description:
      "Compare different rates, terms and contributions to find what fits your budget.",
  },
  {
    icon: Wallet,
    title: "Free forever",
    description:
      "Every calculator is free to use, with no hidden charges or paid tiers.",
  },
  {
    icon: TrendingUp,
    title: "Built for clarity",
    description:
      "Focused tools that go straight from your numbers to answers you can act on.",
  },
];

const steps = [
  {
    icon: MousePointerClick,
    title: "Pick a calculator",
    description:
      "Choose mortgage repayments or compound interest from the home page.",
  },
  {
    icon: Calculator,
    title: "Enter your numbers",
    description:
      "Set the amount, rate and term. Adjust them any time and results update live.",
  },
  {
    icon: LineChart,
    title: "See the full picture",
    description: "Get clear figures and projections you can act on right away.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative isolate flex flex-col items-center px-6 pt-20 pb-16 text-center sm:px-16 sm:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_0%,color-mix(in_oklch,var(--primary)_7%,transparent),transparent)]"
        />
        <Badge variant="secondary">
          <Sparkles data-icon="inline-start" />
          Mortgage repayments + compound interest, in one place
        </Badge>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.08]">
          Big financial decisions, clear numbers.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          Plan your mortgage repayments or watch your savings compound with two
          free calculators that turn your numbers into instant, easy-to-read
          results. No sign-up, no spreadsheets.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="px-5"
            nativeButton={false}
            render={<Link href="/mortgage-repayments-calculator" />}
          >
            <House data-icon="inline-start" />
            Mortgage calculator
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-5"
            nativeButton={false}
            render={<Link href="/compound-interest--calculator" />}
          >
            <PiggyBank data-icon="inline-start" />
            Compound interest calculator
          </Button>
        </div>
        <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <span>No account needed</span>
          <span aria-hidden="true">·</span>
          <span>Always free</span>
          <span aria-hidden="true">·</span>
          <span>Private by default</span>
        </p>
      </section>

      <section
        id="calculators"
        className="mx-auto w-full max-w-5xl px-6 sm:px-16"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {calculators.map((calc) => (
            <Card key={calc.href} className="relative gap-4">
              <Link
                href={calc.href}
                className="absolute inset-0 z-10 rounded-xl"
                aria-label={calc.cta}
              />
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/card:bg-primary/15">
                  <calc.icon className="size-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg">{calc.title}</CardTitle>
                <CardDescription>{calc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {calc.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5">
                      <Check
                        className="size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pointer-events-none gap-1.5 font-medium text-primary">
                {calc.cta}
                <ArrowRight
                  className="size-4 transition-transform group-hover/card:translate-x-0.5"
                  aria-hidden="true"
                />
              </CardFooter>
            </Card>
          ))}
        </div>
        <Alert variant="default" className="mt-4">
          <Info />
          <AlertTitle>Planning figures only</AlertTitle>
          <AlertDescription>
            These calculators produce estimates to help you plan. Speak with a
            qualified financial adviser before making big commitments.
          </AlertDescription>
        </Alert>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Built to be effortless
          </h2>
          <p className="mt-3 text-muted-foreground">
            Two focused tools, designed to get you from question to clear
            numbers with zero friction.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
                  <feature.icon className="size-4" aria-hidden="true" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-20 sm:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Three steps to clarity
          </h2>
          <p className="mt-3 text-muted-foreground">
            You are never more than a few clicks from useful answers.
          </p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-foreground">
                <step.icon className="size-5" aria-hidden="true" />
              </span>
              <Badge variant="secondary">Step {index + 1}</Badge>
              <h3 className="text-base font-semibold">{step.title}</h3>
              <p className="max-w-xs text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-20 sm:px-16">
        <Card className="gap-0 ring-0 bg-primary text-primary-foreground">
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center sm:py-14">
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Ready to see the numbers?
            </h2>
            <p className="max-w-xl text-primary-foreground/70">
              Pick a calculator and get a clearer picture of your finances in
              seconds.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="secondary"
                nativeButton={false}
                render={<Link href="/mortgage-repayments-calculator" />}
              >
                <House data-icon="inline-start" />
                Mortgage calculator
              </Button>
              <Button
                variant="secondary"
                nativeButton={false}
                render={<Link href="/compound-interest--calculator" />}
              >
                <PiggyBank data-icon="inline-start" />
                Compound interest calculator
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
