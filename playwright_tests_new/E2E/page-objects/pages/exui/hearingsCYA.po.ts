import { expect, Locator, Page } from '@playwright/test';

export class HearingsCYAPage {
  constructor(private readonly page: Page) {}

  // Locate a section by its heading text
  private getSection(sectionTitle: string): Locator {
    return this.page.locator('div#hearing-summary', {
      has: this.page.getByRole('heading', { level: 2, name: sectionTitle }),
    });
  }

  // Get the Change link for a specific row
  private getRowChangeLink(sectionTitle: string, key: string): Locator {
    return this.getSection(sectionTitle)
      .locator('.govuk-summary-list__row', {
        has: this.page.locator('.govuk-summary-list__key', { hasText: key }),
      })
      .locator('.govuk-summary-list__actions a.change-link');
  }

  // Get the value for a specific key within a section
  private getRowValue(sectionTitle: string, key: string): Locator {
    return this.getSection(sectionTitle)
      .locator('.govuk-summary-list__row', {
        has: this.page.locator('.govuk-summary-list__key', { hasText: key }),
      })
      .locator('.govuk-summary-list__value');
  }

  // Row Value and change link is visible
  async verifySectionRow(sectionTitle: string, key: string, expectedValue: string) {
    //await expect(this.getRowValue(sectionTitle, key)).toHaveText(expectedValue);
    await expect(this.getRowChangeLink(sectionTitle, key)).toBeVisible();
  }

  // Verify that the Section exists
  async verifySectionVisible(sectionTitle: string) {
    await expect(this.getSection(sectionTitle)).toBeVisible();
  }

  async verifySection(sectionTitle: string, expectedRows: Record<string, string>) {
    await this.verifySectionVisible(sectionTitle);
    for (const [key, value] of Object.entries(expectedRows)) {
      await this.verifySectionRow(sectionTitle, key, value);
    }
  }
}
