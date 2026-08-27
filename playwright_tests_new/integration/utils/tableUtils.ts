/**
 * Formats an ISO date string to 'D MMMM YYYY' for UI comparison.
 * @param iso ISO8601 date string
 * @returns formatted date string or empty string
 */
export function formatUiDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  const day = d.getDate();
  const month = d.toLocaleString('en-GB', { month: 'long' });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Normalizes UI date values by removing leading zeros from day numbers.
 * Example: '01 May 2026 to 09 May 2026' -> '1 May 2026 to 9 May 2026'
 * @param value UI date value
 * @returns normalized date value or empty string
 */
export function normalizeUiDateValue(value: string | null | undefined): string {
  if (!value) return '';
  return value.replace(/\b0([1-9]) ([A-Za-z]+ \d{4})\b/g, '$1 $2');
}
