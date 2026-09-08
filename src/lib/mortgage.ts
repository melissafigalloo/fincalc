export type MortgageParams = {
  principal: number;
  annualRate: number;
  termYears: number;
};

export type MortgageResults = {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
  principalRatio: number;
  interestRatio: number;
};

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const ratioFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});

export function formatCurrency(value: number): string {
  return usdFormatter.format(value);
}

export function formatRatio(value: number): string {
  return ratioFormatter.format(Math.min(1, Math.max(0, value)));
}

export function calculateMortgage({
  principal,
  annualRate,
  termYears,
}: MortgageParams): MortgageResults {
  const safePrincipal = Math.max(0, principal);
  const safeRate = Math.max(0, annualRate);
  const safeTerm = Math.max(0, termYears);

  const totalMonths = Math.round(safeTerm * 12);

  if (
    !Number.isFinite(safePrincipal) ||
    !Number.isFinite(safeRate) ||
    !Number.isFinite(safeTerm) ||
    safePrincipal <= 0 ||
    totalMonths <= 0
  ) {
    return {
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
      principal: safePrincipal,
      principalRatio: 1,
      interestRatio: 0,
    };
  }

  const monthlyRate = safeRate / 100 / 12;

  const monthlyPayment =
    monthlyRate === 0
      ? safePrincipal / totalMonths
      : (safePrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = Math.max(0, totalPayment - safePrincipal);
  const principalRatio = totalPayment > 0 ? safePrincipal / totalPayment : 1;

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    principal: safePrincipal,
    principalRatio,
    interestRatio: 1 - principalRatio,
  };
}
