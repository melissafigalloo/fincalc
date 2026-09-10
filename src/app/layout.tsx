import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FinCalc — Financial Calculators",
    template: "%s | FinCalc",
  },
  description:
    "Free mortgage repayment and compound interest calculators. Estimate monthly repayments, total interest, and investment growth in seconds — no sign-up required.",
};

const calculators = [
  { href: "/mortgage-repayments-calculator", label: "Mortgage calculator" },
  { href: "/compound-interest--calculator", label: "Compound interest" },
];

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6 sm:px-16">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Calculator className="size-4" aria-hidden="true" />
          </span>
          FinCalc
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {calculators.map((calc) => (
            <Button
              key={calc.href}
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href={calc.href} />}
            >
              {calc.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 pb-10 sm:px-16">
      <Separator />
      <div className="flex flex-col items-center gap-1.5 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <span>© {year} FinCalc</span>
        <span>Simple financial calculators, built for clarity.</span>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
