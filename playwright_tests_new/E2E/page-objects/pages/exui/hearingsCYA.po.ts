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

      // Value — This can be either a Array of <ul> > <li> items OR
      // a <ul> rendered with one or more nested <li> items OR
      // just a plain piece of text String or

      const valueCell = row.locator('.govuk-summary-list__value');
      console.log(`~~~~~ valueCell: ${valueCell}`);
      if (Array.isArray(value)) {
        const listItems = valueCell.locator('ul > li');
        const liCount = await listItems.count();
        console.log(`~~~~~ array rendered as <ul><li> (${liCount} items)`);

        if (liCount > 0) {
          console.log(`~~~~~ inside the if block ... liCount (${liCount} items)`);
          await expect(listItems, `Row ${i} list item count in "${sectionTitle}"`).toHaveCount(value.length);

          for (let j = 0; j < value.length; j++) {
            await expect(listItems.nth(j)).toHaveText(new RegExp(`\\s*${this.escapeRegex(value[j])}\\s*`));
          }
        } else {
          const renderedText = (await valueCell.textContent()) ?? '';
          const actualValues = renderedText
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
            .sort();

          const expectedValues = value
            .map((v) => v.trim())
            .filter((s) => s.length > 0)
            .sort();

          expect(actualValues, `Row ${i} CSV tokens in "${sectionTitle}" (order-independent)`).toEqual(expectedValues);
        }
      } else {
        console.log(`~~~~~  row is of type String`);
        await expect(valueCell, `Row ${i} value in "${sectionTitle}"`).toHaveText(
          new RegExp(`\\s*${this.escapeRegex(value)}\\s*`)
        );
      }

      // Action — exactly one "Change" link to be present and ensure these are hyperlinks that are 'clickable'
      const changeLink = row.locator('.govuk-summary-list__actions a.change-link');
      await expect(changeLink, `Row ${i} should have exactly one Change link in "${sectionTitle}"`).toHaveCount(1);
      await expect(changeLink).toHaveText('Change');
      await changeLink.click({ trial: true });
    }
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  public strArrayToCsvString(input: string[]): string {
    const csv = input?.join(', ');

    const output = csv
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    return output.join(',');
  }
}
