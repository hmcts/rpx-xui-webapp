import { expect, test } from '../../helpers/migrationTest.fixture';
import { HearingViewSummaryPage } from '../../../E2E/page-objects/pages/exui/hearingViewSummary.po';
import { openMigrationHearings } from '../../helpers/hearingMigrationJourney.helper';
import { captureMigrationState } from '../../helpers/migrationStateEvidence.helper';
import {
  DWP_HEARINGS_CONFIG,
  DWP_LISTED_HEARING,
  DWP_SECOND_LISTED_HEARING,
  DWP_NON_LISTED_HEARINGS,
} from '../../mocks/dwpHearings.mock';
import { HEARINGS_CASE_REFERENCE } from '../../mocks/hearings.mock';

test(
  'listed hearing viewer sees distinct permitted rows and usable view controls',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page }, testInfo) => {
    const hearings = await openMigrationHearings(page, {
      ...DWP_HEARINGS_CONFIG,
      hearings: [...DWP_NON_LISTED_HEARINGS, DWP_LISTED_HEARING, DWP_SECOND_LISTED_HEARING],
    });
    await expect(hearings.container).toBeVisible();
    await expect(hearings.currentAndUpcomingHeading('Current and upcoming')).toBeVisible();
    await expect(hearings.viewDetailsButtons).toHaveCount(2);
    for (const hearing of [DWP_LISTED_HEARING, DWP_SECOND_LISTED_HEARING]) {
      await expect(hearings.hearingIdCell(hearing.hearingId)).toBeVisible();
      await expect(hearings.hearingRow(hearing.hearingId)).toContainText('LISTED');
      await expect(hearings.viewDetailsButton(hearing.hearingId)).toBeVisible();
      await expect(hearings.viewDetailsButton(hearing.hearingId)).toBeEnabled();
      await expect(hearings.viewOrEditButton(hearing.hearingId)).toHaveCount(0);
      await expect(hearings.cancelButton(hearing.hearingId)).toHaveCount(0);
    }
    for (const hearing of DWP_NON_LISTED_HEARINGS) {
      await expect(hearings.hearingIdCell(hearing.hearingId)).toHaveCount(0);
    }
    await expect(hearings.requestHearingButton).toHaveCount(0);
    await expect(hearings.reloadButton).toHaveCount(0);
    const state = await captureMigrationState(page, testInfo);
    expect.soft(state.violations, 'The reached state must have no serious or critical axe violations').toEqual([]);
    expect(state.documentWidth).toBeLessThanOrEqual(state.viewportWidth);
  }
);

test(
  'listed hearing viewer gets a usable empty list when no hearings are LISTED',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page }, testInfo) => {
    const hearings = await openMigrationHearings(page, {
      ...DWP_HEARINGS_CONFIG,
      hearings: DWP_NON_LISTED_HEARINGS,
    });
    await expect(hearings.container).toBeVisible();
    await expect(hearings.currentAndUpcomingHeading('Current and upcoming')).toBeVisible();
    await expect(hearings.emptyState).toBeVisible();
    await expect(hearings.pastOrCancelledHeading()).toHaveCount(0);
    await expect(hearings.reloadButton).toHaveCount(0);
    await expect(hearings.viewDetailsButtons).toHaveCount(0);
    await expect(hearings.requestHearingButton).toHaveCount(0);
    for (const hearing of DWP_NON_LISTED_HEARINGS) {
      await expect(hearings.hearingIdCell(hearing.hearingId)).toHaveCount(0);
    }
    const state = await captureMigrationState(page, testInfo);
    expect.soft(state.violations, 'The reached state must have no serious or critical axe violations').toEqual([]);
    expect(state.documentWidth).toBeLessThanOrEqual(state.viewportWidth);
  }
);

test(
  'selected hearing opens its own read-only details and date',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page }, testInfo) => {
    const hearings = await openMigrationHearings(page, {
      ...DWP_HEARINGS_CONFIG,
      hearings: [DWP_LISTED_HEARING, DWP_SECOND_LISTED_HEARING],
      summaryHearing: DWP_SECOND_LISTED_HEARING,
    });
    await expect(hearings.viewDetailsButton(DWP_SECOND_LISTED_HEARING.hearingId)).toBeVisible();
    const responsePromise = page.waitForResponse((response) => new URL(response.url()).pathname === '/api/hearings/getHearing');
    await hearings.openViewDetails(DWP_SECOND_LISTED_HEARING.hearingId);
    const response = await responsePromise;
    const requestUrl = new URL(response.url());
    expect(requestUrl.searchParams.get('hearingId')).toBe(DWP_SECOND_LISTED_HEARING.hearingId);
    expect(requestUrl.searchParams.get('caseRef')).toBe(HEARINGS_CASE_REFERENCE);
    expect(response.status()).toBe(200);
    await expect(page).toHaveURL(/\/hearings\/view\/hearing-view-summary$/);
    const summary = new HearingViewSummaryPage(page);
    await expect(summary.container).toBeVisible();
    await expect(summary.heading).toHaveText(/hearing details|view hearing/i);
    await expect(summary.summaryRow('Status')).toContainText('LISTED');
    await expect(summary.sectionHeading('Listing information summary')).toBeVisible();
    await expect(summary.summaryRow('Hearing date')).toContainText('14 March 2024');
    await expect(summary.summaryRow('Hearing date')).not.toContainText('13 February 2024');
    await expect(summary.editHearingButton).toHaveCount(0);
    const state = await captureMigrationState(page, testInfo);
    expect.soft(state.violations, 'The reached state must have no serious or critical axe violations').toEqual([]);
    expect(state.documentWidth).toBeLessThanOrEqual(state.viewportWidth);
  }
);
