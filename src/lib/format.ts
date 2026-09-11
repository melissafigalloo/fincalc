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

const compactFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatCurrency(value: number): string {
  return usdFormatter.format(value);
}

export function formatCompactCurrency(value: number): string {
  return compactFormatter.format(value);
}

export function formatRatio(value: number): string {
  return ratioFormatter.format(Math.min(1, Math.max(0, value)));
}
