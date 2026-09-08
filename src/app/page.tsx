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
  Wallet,
  Zap,
  Smartphone,
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
import { Separator } from "@/components/ui/separator";

const calculators = [
  {
    href: "/mortgage-repayments-calculator",
    icon: House,
    title: "Mortgage Repayment Calculator",
    description:
      "Estimate your monthly repayments, total interest paid, and how quickly you will own your home outright.",
    bullets: [
      "Monthly repayment estimate",
      "Principal and interest split",
      "Total cost over the loan term",
    ],
    cta: "Open mortgage calculator",
  },
  {
    href: "/compound-interest--calculator",
    icon: PiggyBank,
    title: "Compound Interest Calculator",
    description:
      "See how your savings and investments grow over time with flexible compounding and recurring contributions.",
    bullets: [
      "Daily, monthly and yearly compounding",
      "Recurring contribution support",
      "Final balance projection",
    ],
    cta: "Open compound interest calculator",
  },
];

const features = [
  {
    icon: Zap,
    title: "Instant results",
    description:
      "Adjust any number and watch the figures update immediately. No reloads, no waiting.",
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
    title: "Easy scenario planning",
    description:
      "Compare different rates and terms to find the plan that fits your budget.",
  },
  {
    icon: Wallet,
    title: "Free forever",
    description:
      "Every calculator is free to use, with no hidden charges or paid tiers.",
  },
  {
    icon: Smartphone,
    title: "Works anywhere",
    description:
      "Beautifully responsive on desktop, tablet and mobile, whenever you need it.",
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
      "Set the amount, interest rate and term. Adjust them at any time.",
  },
  {
    icon: LineChart,
    title: "See results instantly",
    description: "Get clear figures and projections you can act on right away.",
  },
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex flex-1 flex-col">
        <header className="mx-auto flex w-full max-w-5xl items-center px-6 pt-6 sm:px-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-foreground"
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calculator className="size-4" aria-hidden="true" />
            </span>
            FinCalc
          </Link>
        </header>

        <section className="relative isolate flex flex-col items-center px-6 pt-20 pb-16 text-center sm:px-16 sm:pt-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_0%,color-mix(in_oklch,var(--primary)_7%,transparent),transparent)]"
          />
          <Badge variant="secondary">
            <Sparkles data-icon="inline-start" />
            Free, fast, no sign-up required
          </Badge>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.08]">
            Financial calculators that make the numbers simple.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Plan your mortgage or grow your savings with clear, easy-to-read
            results in seconds. No spreadsheets, no guesswork — just the full
            picture before you commit.
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

        <section className="mx-auto w-full max-w-5xl px-6 sm:px-16">
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
              Why FinCalc
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
