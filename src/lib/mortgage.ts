import { formatCurrency, formatRatio } from "@/lib/format";

export { formatCurrency, formatRatio };

export type PaymentFrequency = "weekly" | "fortnightly" | "monthly";

export type FrequencyInfo = {
  value: PaymentFrequency;
  label: string;
  noun: string;
  periodsPerYear: number;
};

export const PAYMENT_FREQUENCIES: FrequencyInfo[] = [
  { value: "weekly", label: "Weekly", noun: "week", periodsPerYear: 52 },
  {
    value: "fortnightly",
    label: "Fortnightly",
    noun: "fortnight",
    periodsPerYear: 26,
  },
  { value: "monthly", label: "Monthly", noun: "month", periodsPerYear: 12 },
];

export type MortgageParams = {
  principal: number;
  annualRate: number;
  termYears: number;
  frequency?: PaymentFrequency;
  interestOnly?: boolean;
  extraPayment?: number;
};

export type ScheduleRow = {
  period: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
};

export type MortgageResults = {
  payment: number;
  actualPayment: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
  balloon: number;
  interestSaved: number;
  periods: number;
  fullPeriods: number;
  principalRatio: number;
  interestRatio: number;
  periodType: string;
  schedule: ScheduleRow[];
};

const ZERO_RESULT: Omit<MortgageResults, "principal" | "balloon"> = {
  payment: 0,
  actualPayment: 0,
  totalPayment: 0,
  totalInterest: 0,
  interestSaved: 0,
  periods: 0,
  fullPeriods: 0,
  principalRatio: 1,
  interestRatio: 0,
  periodType: "month",
  schedule: [],
};

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function frequencyInfo(frequency: PaymentFrequency): FrequencyInfo {
  return (
    PAYMENT_FREQUENCIES.find((item) => item.value === frequency) ??
    PAYMENT_FREQUENCIES[2]
  );
}

function standardPayment(
  principal: number,
  rate: number,
  periods: number,
): number {
  if (rate === 0) {
    return principal / periods;
  }
  const factor = Math.pow(1 + rate, periods);
  return (principal * rate * factor) / (factor - 1);
}

export function calculateMortgage({
  principal,
  annualRate,
  termYears,
  frequency = "monthly",
  interestOnly = false,
  extraPayment = 0,
}: MortgageParams): MortgageResults {
  const safePrincipal = Math.max(0, principal);
  const safeRate = Math.max(0, annualRate);
  const safeTerm = Math.max(0, termYears);
  const safeExtra = Math.max(0, extraPayment);
  const info = frequencyInfo(frequency);

  const fullPeriods = Math.round(safeTerm * info.periodsPerYear);

  if (
    !Number.isFinite(safePrincipal) ||
    !Number.isFinite(safeRate) ||
    !Number.isFinite(safeTerm) ||
    safePrincipal <= 0 ||
    fullPeriods <= 0
  ) {
    return {
      ...ZERO_RESULT,
      periodType: info.noun,
      fullPeriods,
      principal: safePrincipal,
      balloon: safePrincipal,
    };
  }

  const periodicRate = safeRate / 100 / info.periodsPerYear;
  const basePayment = interestOnly
    ? safePrincipal * periodicRate
    : standardPayment(safePrincipal, periodicRate, fullPeriods);

  let balance = safePrincipal;
  const schedule: ScheduleRow[] = [];
  let totalInterest = 0;
  let totalPrincipal = 0;
  let totalPayment = 0;

  for (let period = 1; period <= fullPeriods; period += 1) {
    if (balance <= 0.005) {
      break;
    }

    const interest = balance * periodicRate;
    let principalPaid: number;
    let payment: number;

    if (interestOnly) {
      principalPaid = Math.min(safeExtra, balance);
      payment = interest + principalPaid;
    } else {
      payment = Math.min(basePayment + safeExtra, balance + interest);
      principalPaid = Math.max(0, Math.min(payment - interest, balance));
      payment = interest + principalPaid;
    }

    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;
    totalPrincipal += principalPaid;
    totalPayment += payment;

    schedule.push({
      period,
      payment: round2(payment),
      interest: round2(interest),
      principal: round2(principalPaid),
      balance: round2(balance),
    });
  }

  const periods = schedule.length;
  const balloon = interestOnly ? balance : 0;
  const principalRatio = totalPayment > 0 ? totalPrincipal / totalPayment : 1;

  let interestSaved = 0;
  if (!interestOnly && safeExtra > 0) {
    const baselineTotalInterest =
      standardPayment(safePrincipal, periodicRate, fullPeriods) * fullPeriods -
      safePrincipal;
    interestSaved = Math.max(0, baselineTotalInterest - totalInterest);
  }

  return {
    payment: basePayment,
    actualPayment: basePayment + safeExtra,
    totalPayment,
    totalInterest,
    principal: safePrincipal,
    balloon,
    interestSaved,
    periods,
    fullPeriods,
    principalRatio,
    interestRatio: 1 - principalRatio,
    periodType: info.noun,
    schedule,
  };
}

export function formatTermPeriods(periods: number): string {
  if (!Number.isFinite(periods) || periods <= 0) {
    return "0";
  }
  const years = Math.floor(periods / 12);
  const months = periods % 12;
  if (years > 0 && months > 0) {
    return `${years}y ${months}m`;
  }
  if (years === 1) {
    return "1 year";
  }
  if (years > 1) {
    return `${years} years`;
  }
  if (months === 1) {
    return "1 month";
  }
  return `${months} months`;
}
