/**
 * Currency — single source of truth for deal-value formatting.
 * Only Indian Rupee (INR) is supported.
 */

/** App-wide fallback when no account/deal currency is available. */
export const DEFAULT_CURRENCY = "INR";

export interface CurrencyOption {
  /** ISO-4217 code, e.g. "INR". Stored verbatim in the DB. */
  code: string;
  /** Human label for the dropdown, e.g. "Indian Rupee". */
  label: string;
  /** Symbol for compact display, e.g. "₹". */
  symbol: string;
}

/**
 * The currencies offered in pickers. Only INR is supported.
 */
export const CURRENCIES: CurrencyOption[] = [
  { code: "INR", label: "Indian Rupee", symbol: "₹" },
];

/**
 * Format a deal value as a currency string. Whole-number output
 * (no minor units) — deal values are tracked to the dollar across
 * the app. Defaults to INR.
 */
export function formatCurrency(
  value: number,
  currency: string = DEFAULT_CURRENCY,
): string {
  const code = (currency || DEFAULT_CURRENCY).trim();
  const amount = Number(value) || 0;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${code} ${new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 0,
    }).format(amount)}`;
  }
}

/**
 * Compact currency for tight spaces (donut center, legend rows):
 * "₹1.2M" / "₹34.5k" / "₹900".
 */
export function formatCurrencyShort(
  value: number,
  currency: string = DEFAULT_CURRENCY,
): string {
  const code = currency || DEFAULT_CURRENCY;
  const symbol = CURRENCIES.find((c) => c.code === code)?.symbol ?? `${code} `;
  const v = Number(value || 0);
  if (v >= 1_000_000) return `${symbol}${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${symbol}${(v / 1_000).toFixed(1)}k`;
  return `${symbol}${v.toFixed(0)}`;
}
