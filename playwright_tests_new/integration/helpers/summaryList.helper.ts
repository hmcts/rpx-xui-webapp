import type { Page } from '@playwright/test';

export function summaryRow(page: Page, label: string) {
  return page.locator('.govuk-summary-list__row').filter({
    has: page.locator('.govuk-summary-list__key', { hasText: label }),
  });
}
