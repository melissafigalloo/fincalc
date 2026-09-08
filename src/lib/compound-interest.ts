import { formatCurrency, formatRatio } from "@/lib/format";

export { formatCurrency, formatRatio };

export type CompoundFrequency = "daily" | "monthly" | "yearly";

export type CompoundInterestParams = {
  principal: number;
  monthlyContribution: number;
  annualRate: number;
  frequency: CompoundFrequency;
  years: number;
};

export type CompoundInterestResults = {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  contributionsRatio: number;
  interestRatio: number;
  months: number;
};

function effectiveMonthlyRate(
  annualRate: number,
  frequency: CompoundFrequency,
): number {
  const rate = annualRate / 100;

  if (rate <= 0) {
    return 0;
  }

  if (frequency === "daily") {
    return Math.pow(1 + rate / 365, 365 / 12) - 1;
  }

  if (frequency === "yearly") {
    return 0;
  }

  return rate / 12;
}

export function calculateCompoundInterest({
  principal,
  monthlyContribution,
  annualRate,
  frequency,
  years,
}: CompoundInterestParams): CompoundInterestResults {
  const safePrincipal = Math.max(0, principal);
  const safeContribution = Math.max(0, monthlyContribution);
  const safeRate = Math.max(0, annualRate);
  const safeYears = Math.max(0, years);

  const months = Math.round(safeYears * 12);

  if (
    !Number.isFinite(safePrincipal) ||
    !Number.isFinite(safeContribution) ||
    !Number.isFinite(safeRate) ||
    !Number.isFinite(safeYears) ||
    months <= 0
  ) {
    return {
      finalBalance: 0,
      totalContributions: 0,
      totalInterest: 0,
      contributionsRatio: 1,
      interestRatio: 0,
      months: 0,
    };
  }

  const monthlyRate = effectiveMonthlyRate(safeRate, frequency);
  const yearlyRate = safeRate / 100;

  let balance = safePrincipal;

  for (let month = 1; month <= months; month += 1) {
    balance += safeContribution;

    if (frequency === "yearly") {
      if (month % 12 === 0) {
        balance *= 1 + yearlyRate;
      }
    } else if (monthlyRate > 0) {
      balance *= 1 + monthlyRate;
    }
  }

  const totalContributions = safePrincipal + safeContribution * months;
  const totalInterest = Math.max(0, balance - totalContributions);
  const contributionsRatio = balance > 0 ? totalContributions / balance : 1;

  return {
    finalBalance: balance,
    totalContributions,
    totalInterest,
    contributionsRatio,
    interestRatio: 1 - contributionsRatio,
    months,
  };
}
