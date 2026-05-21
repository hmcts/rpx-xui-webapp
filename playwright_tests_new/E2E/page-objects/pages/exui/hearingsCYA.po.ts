import { expect, Locator, Page } from '@playwright/test';

export class HearingsCYAPage {
  constructor(private readonly page: Page) {}

  // Locate a section by its heading text
  private getSection(sectionTitle: string): Locator {
    console.log(`~~~~~~~~~   section Title is : ${sectionTitle}`);
    return this.page.locator('div#hearing-summary', {
      has: this.page.getByRole('heading', { name: sectionTitle }),
    });
  }

  // Get the Change link for a specific row
  private getRowChangeLink(sectionTitle: string, key: string): Locator {
    const section = this.getSection(sectionTitle);
    console.log(` ~~~~~~~~~ section count: ${section.count()}`);

    const row = section.locator('.govuk-summary-list__row', {
      has: this.page.locator('.govuk-summary-list__key', { hasText: key }),
    });
    console.log(`~~~~~~~~~   row count: ${row.count()}`);

    const value = row.locator('.govuk-summary-list__value');
    console.log(`~~~~~~~~~ value count: ${value.count()}`);

    return this.getSection(sectionTitle)
      .locator('.govuk-summary-list__row', {
        has: this.page.locator('.govuk-summary-list__key', { hasText: new RegExp(`^\\s*${key}\\s*$`) }),
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
    await expect(this.getRowValue(sectionTitle, key)).toHaveText(expectedValue);
    //*[contains(@class, 'govuk-summary-list__row')]//*[contains(@class, 'govuk-summary-list__key') and contains(text(), 'What will be the methods of attendance for this hearing?')]
    await expect(this.getRowChangeLink(sectionTitle, key)).toBeVisible();
  }

  // Verify that the Section exists
  async verifySectionVisible(sectionTitle: string) {
    await expect(this.getSection(sectionTitle)).toBeVisible();
  }

  async verifySection(sectionTitle: string, expectedRows: Record<string, string>) {
    await this.verifySectionVisible(sectionTitle);

    // //*[contains(@class, 'govuk-summary-list__row')]//*[contains(@class, 'govuk-summary-list__key') and contains(text(), 'What will be the methods of attendance for this hearing?')]
    for (const [key, value] of Object.entries(expectedRows)) {
      await this.verifySectionRow(sectionTitle, key, value);
    }
  }
}
