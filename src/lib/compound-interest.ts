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

export type CompoundInterestScheduleRow = {
  period: number;
  contributions: number;
  interest: number;
  balance: number;
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

function compoundBalances(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  frequency: CompoundFrequency,
  months: number,
  onYearEnd: (period: number, contributions: number, balance: number) => void,
): number {
  const monthlyRate = effectiveMonthlyRate(annualRate, frequency);
  const yearlyRate = annualRate / 100;

  let balance = principal;
  let contributions = principal;

  for (let month = 1; month <= months; month += 1) {
    balance += monthlyContribution;
    contributions += monthlyContribution;

    if (frequency === "yearly") {
      if (month % 12 === 0) {
        balance *= 1 + yearlyRate;
      }
    } else if (monthlyRate > 0) {
      balance *= 1 + monthlyRate;
    }

    if (month % 12 === 0) {
      onYearEnd(month / 12, contributions, balance);
    }
  }

  return balance;
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

  const finalBalance = compoundBalances(
    safePrincipal,
    safeContribution,
    safeRate,
    frequency,
    months,
    () => {},
  );

  const totalContributions = safePrincipal + safeContribution * months;
  const totalInterest = Math.max(0, finalBalance - totalContributions);
  const contributionsRatio =
    finalBalance > 0 ? totalContributions / finalBalance : 1;

  return {
    finalBalance,
    totalContributions,
    totalInterest,
    contributionsRatio,
    interestRatio: 1 - contributionsRatio,
    months,
  };
}

export function buildCompoundInterestSchedule({
  principal,
  monthlyContribution,
  annualRate,
  frequency,
  years,
}: CompoundInterestParams): CompoundInterestScheduleRow[] {
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
    return [];
  }

  const rows: CompoundInterestScheduleRow[] = [];

  compoundBalances(
    safePrincipal,
    safeContribution,
    safeRate,
    frequency,
    months,
    (period, contributions, balance) => {
      rows.push({
        period,
        contributions,
        interest: Math.max(0, balance - contributions),
        balance,
      });
    },
  );

  return rows;
}
