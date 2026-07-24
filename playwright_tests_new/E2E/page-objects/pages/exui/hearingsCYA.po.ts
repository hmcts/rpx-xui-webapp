import { Locator, Page } from '@playwright/test';

export class HearingsCYAPage {
  constructor(private readonly page: Page) {}

  section(sectionTitle: string): Locator {
    return this.page.locator('div#hearing-summary', {
      has: this.page.getByRole('heading', { name: sectionTitle }),
    });
  }

  sectionRows(sectionTitle: string): Locator {
    return this.section(sectionTitle).locator('.govuk-summary-list__row');
  }

  row(sectionTitle: string, key: string): Locator {
    return this.section(sectionTitle).locator('.govuk-summary-list__row', {
      has: this.page.locator('.govuk-summary-list__key', { hasText: key }),
    });
  }

  rowKey(sectionTitle: string, key: string): Locator {
    return this.row(sectionTitle, key).locator('.govuk-summary-list__key');
  }

  rowValue(sectionTitle: string, key: string): Locator {
    return this.row(sectionTitle, key).locator('.govuk-summary-list__value');
  }

  rowListItems(sectionTitle: string, key: string): Locator {
    return this.rowValue(sectionTitle, key).locator('ul > li');
  }

  rowChangeLink(sectionTitle: string, key: string): Locator {
    return this.row(sectionTitle, key).locator('.govuk-summary-list__actions a.change-link');
  }
}
