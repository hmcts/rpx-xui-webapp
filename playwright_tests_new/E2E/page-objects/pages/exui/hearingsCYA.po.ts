import { expect, Locator, Page } from '@playwright/test';
import { howWillParticipantAttend, HearingAttendenceData } from '../../../utils/hearing-model';

type RowMatch = 'exact' | 'contains';

interface ExpectedRow {
  key: string;
  value: string | string[];
  match?: RowMatch; // defaults to 'exact'
}

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
    //expectedRows: Array<{ key: string; value: string | string[] }>
    expectedRows: ExpectedRow[]
  ): Promise<void> {
    // Find the section whose <h2> matches the title.
    // Note: id="hearing-summary" is duplicated across sections, so we locate by heading.
    const section: Locator = page.locator('exui-hearing-summary #hearing-summary').filter({
      has: page.locator('h2.govuk-heading-m', { hasText: new RegExp(`^\\s*${this.escapeRegex(sectionTitle)}\\s*$`) }),
    });

    await expect(section, `${sectionTitle}" should be visible`).toBeVisible();

    const rows = section.locator('.govuk-summary-list__row');
    await expect(rows, `Row count for "${this.escapeRegex(sectionTitle)}"`).toHaveCount(expectedRows.length);

    //const { key, value, match = 'exact ' } = expectedRows[i];

    for (let i = 0; i < expectedRows.length; i++) {
      const { key, value, match = 'exact ' } = expectedRows[i];

      const row = rows.nth(i);

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

        if (match === 'contains') {
          // Assert each expected item appears in at least one rendered <li>,
          // without enforcing count or order.
          const renderedItems = (await listItems.allTextContents()).map((t) => t.trim());

          for (const expected of value) {
            const found = renderedItems.some((rendered) => rendered.includes(expected.trim()));
            expect(
              found,
              `Row ${i} in "${sectionTitle}": expected an item containing "${expected}", got ${JSON.stringify(renderedItems)}`
            ).toBe(true);
          }
        } else if (liCount > 0) {
          await expect(listItems, `Row ${i} list item count in "${sectionTitle}"`).toHaveCount(value.length);
          const renderedItems = (await listItems.allTextContents()).map((t) => t.trim()).sort();
          const expectedItems = value.map((v) => v.trim()).sort();
          expect(renderedItems, `Row ${i} list items in "${sectionTitle}" (order-independent)`).toEqual(expectedItems);
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
        if (match === 'contains') {
          await expect(valueCell, `Row ${i} value in "${sectionTitle}"`).toContainText(value);
        } else {
          await expect(valueCell, `Row ${i} value in "${sectionTitle}"`).toHaveText(
            new RegExp(`\\s*${this.escapeRegex(value)}\\s*`)
          );
        }
      }

      // Action — exactly one "Change" link present and  the link is 'clickable'
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

  public async verifyParticipantAttendanceSection(page: Page, hearingJourneyModel) {
    const paperHearingYesNo = hearingJourneyModel.get('hearingAttendence', 'paperHearing') as string;
    const numberOfPeopleAttendingHearing = hearingJourneyModel.get(
      'hearingAttendence',
      'numberOfPeopleAttendingHearing'
    ) as string;

    const participantHearingMethod = hearingJourneyModel.get('hearingAttendence', 'hearingMethod');
    const participantAttendHearingHow = hearingJourneyModel.get('hearingAttendence', 'attendHearingHow');

    if (!Array.isArray(participantHearingMethod)) {
      throw new Error(
        `participantHearingMethod must be an array, got ${typeof participantHearingMethod}: ${JSON.stringify(participantHearingMethod)}`
      );
    }

    if (!Array.isArray(participantAttendHearingHow)) {
      throw new Error(
        `participantAttendHearingHow must be an array, got ${typeof participantAttendHearingHow}: ${JSON.stringify(participantAttendHearingHow)}`
      );
    }

    const expectedRows: Array<{ key: string; value: string | string[]; match?: 'exact' | 'contains' }> = [
      { key: 'Will this be a paper hearing?', value: paperHearingYesNo },
    ];

    expectedRows.push(
      {
        key: 'What will be the methods of attendance for this hearing?',
        value: participantHearingMethod,
      },
      {
        // we match by 'contains' as each participant's name is prefixed to their preferred option of attending hearing
        key: 'How will each participant attend the hearing?',
        value: participantAttendHearingHow,
        match: 'contains',
      }
    );

    expectedRows.push({
      key: 'How many people will attend the hearing in person?',
      value: numberOfPeopleAttendingHearing,
    });

    await this.verifyHearingSummarySection(this.page, 'Participant attendance', expectedRows);
  }

  public async verifyHearingVenueSection(page: Page, hearingJourneyModel) {
    const hearingVenue = hearingJourneyModel.get('hearingVenue', 'name') as string[];

    if (!Array.isArray(hearingVenue)) {
      throw new Error(`hearingVenue must be an array, got ${typeof hearingVenue}: ${JSON.stringify(hearingVenue)}`);
    }

    // hearingVenue should contain the value we have selected as part of the Hearing Journey
    // There could be pre-selected venues as well which are part of the CaseCreation flow which we may or may not control
    // Hence it will be apt to do a 'contains' check here vis-a-vis a 'exact' match.

    const expectedRows: Array<{ key: string; value: string | string[]; match?: 'exact' | 'contains' }> = [
      { key: 'What are the hearing venue details?', value: hearingVenue, match: 'contains' },
    ];
    await this.verifyHearingSummarySection(this.page, 'Hearing Venue', expectedRows);
  }

  public async verifyHearingLocation(page: Page, hearingJourneyModel) {
    const paperHearingYesNo = hearingJourneyModel.get('hearingAttendence', 'paperHearing') as string;

    const numberOfPeopleAttendingHearing = hearingJourneyModel.get(
      'hearingAttendence',
      'numberOfPeopleAttendingHearing'
    ) as string;

    const participantHearingMethod = hearingJourneyModel.get('hearingAttendence', 'hearingMethod');
    const participantAttendHearingHow = hearingJourneyModel.get('hearingAttendence', 'attendHearingHow');

    if (!Array.isArray(participantHearingMethod)) {
      throw new Error(
        `participantHearingMethod must be an array, got ${typeof participantHearingMethod}: ${JSON.stringify(participantHearingMethod)}`
      );
    }

    if (!Array.isArray(participantAttendHearingHow)) {
      throw new Error(
        `participantAttendHearingHow must be an array, got ${typeof participantAttendHearingHow}: ${JSON.stringify(participantAttendHearingHow)}`
      );
    }

    const expectedRows: Array<{ key: string; value: string | string[]; match?: 'exact' | 'contains' }> = [
      { key: 'Will this be a paper hearing?', value: paperHearingYesNo },
    ];

    expectedRows.push(
      {
        key: 'What will be the methods of attendance for this hearing?',
        value: participantHearingMethod,
      },
      {
        key: 'How will each participant attend the hearing?',
        value: participantAttendHearingHow,
        match: 'contains',
      }
    );

    expectedRows.push({
      key: 'How many people will attend the hearing in person?',
      value: numberOfPeopleAttendingHearing,
    });

    await this.verifyHearingSummarySection(this.page, 'Participant attendance', expectedRows);
  }
}
