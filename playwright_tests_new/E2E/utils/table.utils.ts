/**
 * Table row helpers for common table validation patterns
 */

/**
 * Check if a table row represents an "empty" or "no data" state
 * Common patterns:
 * - Empty values across all columns
 * - Messages like "No flags", "No active flags", "No case flags", "None"
 *
 * @param row - Table row object with column name keys
 * @returns true if the row represents an empty state
 */
export function isEmptyTableRow(row: Record<string, string>): boolean {
  const text = Object.values(row).join(' ').replaceAll(/\s+/g, ' ').trim();
  return !text || /no flags|no active flags|no case flags|no data|no items|no results|\bnone\b/i.test(text);
}

/**
 * Filter out empty state rows from a table
 * @param table - Array of table row objects
 * @returns Filtered array containing only rows with actual data
 */
export function filterEmptyRows(table: Record<string, string>[]): Record<string, string>[] {
  return table.filter((row) => !isEmptyTableRow(row));
}

/**
 * Check if a flags table row is empty
 * Alias for isEmptyTableRow for backwards compatibility
 * @deprecated Use isEmptyTableRow instead
 */
export const isEmptyFlagsRow = isEmptyTableRow;
