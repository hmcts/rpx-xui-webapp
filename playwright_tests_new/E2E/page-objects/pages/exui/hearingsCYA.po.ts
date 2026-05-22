import { expect, Locator, Page } from '@playwright/test';

export class HearingsCYAPage {
  constructor(private readonly page: Page) {}

  // Locate a section by its heading text
  private getSection(sectionTitle: string): Locator {
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
    //await expect(this.getRowChangeLink(sectionTitle, key)).toBeVisible();
  }

  // Verify that the Section exists
  async verifySectionVisible(sectionTitle: string) {
    await expect(this.getSection(sectionTitle)).toBeVisible();
  }

  async verifyHearingSummarySection(
    page: Page,
    sectionTitle: string,
    expectedRows: Array<{ key: string; value: string | string[] }>
  ): Promise<void> {
    // Find the section whose <h2> matches the title.
    // Note: id="hearing-summary" is duplicated across sections, so we locate by heading.
    const section: Locator = page.locator('exui-hearing-summary #hearing-summary').filter({
      has: page.locator('h2.govuk-heading-m', { hasText: new RegExp(`^\\s*${this.escapeRegex(sectionTitle)}\\s*$`) }),
    });

    await expect(section, `${sectionTitle}" should be visible`).toBeVisible();

    const rows = section.locator('.govuk-summary-list__row');
    await expect(rows, `Row count for "${this.escapeRegex(sectionTitle)}"`).toHaveCount(expectedRows.length);

    for (let i = 0; i < expectedRows.length; i++) {
      const row = rows.nth(i);
      const { key, value } = expectedRows[i];

      console.log(`~~~~~ LOGGING THE ROW details ..... [Row ${i}]`, { key, value, isArray: Array.isArray(value) });

      // Key (label)
      await expect(row.locator('.govuk-summary-list__key'), `Row ${i} key in "${sectionTitle}"`).toHaveText(
        new RegExp(`\\s*${this.escapeRegex(key)}\\s*`)
      );

      // Value — This can be either a Array of <ul> > <li> items or just a plain piece of text String
      const valueCell = row.locator('.govuk-summary-list__value');
      if (Array.isArray(value)) {
        const listItems = valueCell.locator('ul > li');
        await expect(listItems, `Row ${i} list item count in "${sectionTitle}"`).toHaveCount(value.length);
        for (let j = 0; j < value.length; j++) {
          await expect(listItems.nth(j)).toHaveText(value[j]);
        }
      } else {
        await expect(valueCell, `Row ${i} value in "${sectionTitle}"`).toHaveText(value);
      }

      // Action — exactly one "Change" link to be present and are hyperlinks that are 'clickable'
      const changeLink = row.locator('.govuk-summary-list__actions a.change-link');
      await expect(changeLink, `Row ${i} should have exactly one Change link in "${sectionTitle}"`).toHaveCount(1);
      await expect(changeLink).toHaveText('Change');
      await changeLink.click({ trial: true });
    }
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
