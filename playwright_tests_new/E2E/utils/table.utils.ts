import { Locator, Page } from '@playwright/test';

/**
 * Utility class for parsing different types of EXUI tables
 * Handles CCD key-value tables, data tables, and work allocation tables
 */
export class ExuiTableUtils {
  
  /**
   * Parse CCD key-value table (2-column: label | value)
   * Used for case details tabs showing field labels and values
   * 
   * @param selector - CSS selector string or Playwright Locator
   * @param page - Page instance (required if selector is a string)
   * @returns Object with key-value pairs from the table
   */
  async parseKeyValueTable(
    selector: string | Locator, 
    page?: Page
  ): Promise<Record<string, string>> {
    return this._evaluateTable(selector, page, (rows: Element[]) => {
      // Inline helper: filter visible rows
      const filterVisibleRows = (rows: Element[]): Element[] => {
        return rows.filter(row => {
          const el = row as HTMLElement;
          if (el.hidden || el.hasAttribute('hidden')) return false;
          const style = window.getComputedStyle(el);
          if (!style || style.display === 'none' || style.visibility === 'hidden') return false;
          return el.getClientRects().length > 0;
        });
      };
      
      // Inline helper: extract text with layout awareness
      const extractText = (el: HTMLElement): string => {
        const text = (el.innerText || '').replace(/[▲▼⇧⇩⯅⯆↑↓]/g, '').trim();
        if (!text && el.isConnected && el.offsetParent !== null) {
          throw new Error(`Failed to extract text from visible element: ${el.tagName}.${el.className}`);
        }
        return text;
      };
      
      const result: Record<string, string> = {};
      const visibleRows = filterVisibleRows(rows);
      
      for (const row of visibleRows) {
        const cells = Array.from(row.querySelectorAll('th, td')) as HTMLElement[];
        if (cells.length < 2) continue;
        
        const key = extractText(cells[0]);
        if (!key) continue;
        
        const values = cells.slice(1).map(c => extractText(c)).filter(Boolean);
        result[key] = values.join(' ').replace(/\s+/g, ' ').trim();
      }
      return result;
    });
  }

  /**
   * Parse data table with headers (collections, documents, flags, etc.)
   * Returns array of row objects where keys are column headers
   * 
   * @param selector - CSS selector string or Playwright Locator
   * @param page - Page instance (required if selector is a string)
   * @returns Array of objects, one per visible data row
   */
  async parseDataTable(
    selector: string | Locator,
    page?: Page
  ): Promise<Array<Record<string, string>>> {
    return this._evaluateTable(selector, page, (rows: Element[]) => {
      // Inline helper: clean text and normalize arrows
      const cleanText = (text: string): string => {
        return text.replace(/[▲▼⇧⇩⯅⯆↑↓]/g, '').trim().replace(/\s+/g, ' ');
      };
      
      // Inline helper: filter visible rows
      const filterVisibleRows = (rows: Element[]): Element[] => {
        return rows.filter(row => {
          const el = row as HTMLElement;
          if (el.hidden || el.hasAttribute('hidden')) return false;
          const style = window.getComputedStyle(el);
          if (!style || style.display === 'none' || style.visibility === 'hidden') return false;
          return el.getClientRects().length > 0;
        });
      };
      
      if (!rows || rows.length === 0) return [];
      
      // Try to find headers in thead first
      const table = rows[0].closest('table');
      let headers: string[] = [];
      
      if (table) {
        const thead = table.querySelector('thead');
        if (thead) {
          const headerCells = Array.from(thead.querySelectorAll('th, td'));
          headers = headerCells.map(h => cleanText((h as HTMLElement).innerText || ''));
        }
      }
      
      // Fallback: use first row as headers if thead not found
      if (headers.length === 0) {
        const headerRow = rows[0];
        headers = Array.from(headerRow.querySelectorAll('th, td'))
          .map(h => cleanText((h as HTMLElement).innerText || ''));
      }
      
      // Process data rows (skip header row if it was used, filter hidden)
      const startIndex = table && table.querySelector('thead') ? 0 : 1;
      const dataRows = filterVisibleRows(Array.from(rows).slice(startIndex));
      const result: Array<Record<string, string>> = [];
      
      for (const row of dataRows) {
        const cells = Array.from(row.querySelectorAll('th, td')) as HTMLElement[];
        if (cells.length === 0) continue;
        
        const rowData: Record<string, string> = {};
        for (let i = 0; i < cells.length; i++) {
          const key = headers[i] || `column_${i + 1}`;
          rowData[key] = cleanText(cells[i].innerText || '');
        }
        result.push(rowData);
      }
      return result;
    });
  }

  /**
   * Parse work allocation table (with sortable headers)
   * Handles buttons in headers and links in cells
   * 
   * @param tableLocator - Playwright Locator for the table element
   * @returns Array of row objects with header-value pairs
   */
  async parseWorkAllocationTable(
    tableLocator: Locator
  ): Promise<Array<Record<string, string>>> {
    // Get headers (from buttons if present)
    const headerLocators = await tableLocator.locator('thead th').elementHandles();
    const headers: string[] = [];
    
    for (const th of headerLocators) {
      const button = await th.$('button');
      headers.push(button 
        ? (await button.textContent())?.trim() || ''
        : (await th.textContent())?.trim() || ''
      );
    }

    // Get rows
    const rowLocators = tableLocator.locator('tbody tr');
    const rowCount = await rowLocators.count();
    const result: Array<Record<string, string>> = [];

    for (let i = 0; i < rowCount; i++) {
      const row = rowLocators.nth(i);
      if (await row.getAttribute('aria-hidden') === 'true') continue;
      
      const cells = await row.locator('td').elementHandles();
      const rowData: Record<string, string> = {};
      
      for (let j = 0; j < headers.length; j++) {
        const cell = cells[j];
        if (!cell) continue;
        
        // Extract from link if present (e.g., case names)
        const link = await cell.$('a');
        rowData[headers[j]] = link
          ? (await link.textContent())?.trim() || ''
          : (await cell.textContent())?.trim() || '';
      }
      result.push(rowData);
    }
    return result;
  }

  /**
   * Private helper to evaluate table rows in browser context
   * Handles both Locator and string selector types
   */
  private async _evaluateTable<T>(
    selector: string | Locator,
    page: Page | undefined,
    fn: (rows: Element[]) => T
  ): Promise<T> {
    try {
      if (typeof selector !== 'string') {
        return await (selector as Locator).locator('tr').evaluateAll(fn as any);
      }
      if (!page) {
        throw new Error('Page instance required for string selectors');
      }
      return await page.$$eval(`${selector} tr`, fn as any);
    } catch (error) {
      // If page crashed or element is stale, throw descriptive error
      const errorMsg = (error as Error).message;
      if (errorMsg.includes('Target closed') || errorMsg.includes('Execution context')) {
        throw new Error(`Table evaluation failed - page may have crashed or navigated away: ${errorMsg}`);
      }
      throw error;
    }
  }
}
