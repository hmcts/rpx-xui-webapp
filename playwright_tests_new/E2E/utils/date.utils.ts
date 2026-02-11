/**
 * Date matching utilities for test assertions
 */

/**
 * Normalize a long date format (e.g., "1 Jan 2024" or "01 Jan 2024") to padded format
 * @param value - The date string to normalize
 * @returns Normalized date string with padded day
 */
export function normalizeLongDate(value: string): string {
  const regex = /(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})/;
  const match = regex.exec(value);
  if (!match) {
    return value;
  }
  const [, day, month, year] = match;
  const paddedDay = day.padStart(2, '0');
  return `${paddedDay} ${month} ${year}`;
}

/**
 * Extract date portion (without time) from a date string
 * Supports both long format (e.g., "01 Jan 2024 10:30:45") and numeric format (e.g., "01/01/2024 10:30")
 * @param dateString - The full date string possibly including time
 * @returns Just the date portion
 */
export function extractDateOnly(dateString: string): string {
  const longDateRegex = /\d{1,2}\s+[A-Za-z]{3}\s+\d{4}/;
  const numericDateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;
  const longDateMatch = longDateRegex.exec(dateString);
  const numericDateMatch = numericDateRegex.exec(dateString);
  return longDateMatch?.[0] ?? numericDateMatch?.[0] ?? dateString;
}

/**
 * Check if a date string matches today's date in any supported format
 * Supports:
 * - Long format: "01 Jan 2024" or "1 Jan 2024"
 * - Numeric format: "01/01/2024" or "1/1/2024"
 * - Partial matches (date contained within longer string)
 *
 * @param dateString - The date string to check
 * @param expectedLongDate - Expected date in long format (e.g., "01 Jan 2024")
 * @param expectedNumericDate - Expected date in numeric format (e.g., "01/01/2024")
 * @returns true if the date matches today
 */
export function matchesToday(dateString: string, expectedLongDate: string, expectedNumericDate: string): boolean {
  const dateOnly = extractDateOnly(dateString);
  const normalized = normalizeLongDate(dateOnly);

  return normalized === expectedLongDate || dateOnly === expectedNumericDate || dateString.includes(expectedLongDate);
}

/**
 * Get today's date in common test formats
 * @returns Object with long format (e.g., "01 Jan 2024") and numeric format (e.g., "01/01/2024")
 */
export function getTodayFormats(): { longFormat: string; numericFormat: string } {
  const today = new Date();
  const longFormat = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const numericFormat = today.toLocaleDateString('en-GB');

  return { longFormat, numericFormat };
}
