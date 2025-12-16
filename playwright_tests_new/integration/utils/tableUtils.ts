import { Locator } from '@playwright/test';

/**
 * Reads the text content of a table, including header names (from buttons if present) and row cell values.
 * Returns an array of objects, each representing a row with header-value pairs.
 *
 * @param {Locator} tableLocator - Playwright Locator for the table element.
 * @returns {Promise<Array<Record<string, string>>>} Array of row objects.
 */
export async function readTaskTable(tableLocator: Locator): Promise<Array<Record<string, string>>> {
  // Get header names from button or th text
  const headerLocators = await tableLocator.locator('thead th').elementHandles();
  const headers: string[] = [];
  for (const th of headerLocators) {
    const button = await th.$('button');
    if (button) {
      headers.push((await button.textContent())?.trim() || '');
    } else {
      headers.push((await th.textContent())?.trim() || '');
    }
  }

  // Get all rows
  const rowLocators = tableLocator.locator('tbody tr');
  const rowCount = await rowLocators.count();
  const tableData: Array<Record<string, string>> = [];
  for (let i = 0; i < rowCount; i++) {
    const row = rowLocators.nth(i);
    // Skip hidden/action rows
    const ariaHidden = await row.getAttribute('aria-hidden');
    if (ariaHidden === 'true') continue;
    const cellLocators = await row.locator('td').elementHandles();
    const rowObj: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      if (headers[j].toLowerCase() === 'case name') {
        const aTag = await cellLocators[j]?.$('a');
        if (aTag) {
          rowObj[headers[j]] = (await aTag.textContent())?.trim() || '';
        } else {
          rowObj[headers[j]] = (await cellLocators[j]?.textContent())?.trim() || '';
        }
      } else {
        rowObj[headers[j]] = (await cellLocators[j]?.textContent())?.trim() || '';
      }
    }
    tableData.push(rowObj);
  }
  return tableData;
}

/**
 * Utility to get all header buttons in a table (for future use).
 * @param {Locator} tableLocator - Playwright Locator for the table element.
 * @returns {Promise<Locator[]>} Array of button Locators.
 */
export function getTableHeaderButtons(tableLocator: Locator): Locator {
  return tableLocator.locator('thead th button');
}

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