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
 * Formats an ISO date string to match the Booking UI summary date format.
 * @param iso ISO8601 date string
 * @returns formatted date string or empty string
 */
export function formatBookingUiDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const month = d.toLocaleString('en-GB', { month: 'long' });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}
