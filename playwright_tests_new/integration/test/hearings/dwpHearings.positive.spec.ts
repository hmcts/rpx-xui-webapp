import { expect, test } from '../../../E2E/fixtures';
import { openHearingsTabForScenario } from '../../helpers';
import { DWP_HEARINGS_CONFIG, DWP_LISTED_HEARING, DWP_NON_LISTED_HEARINGS } from '../../mocks/dwpHearings.mock';
import { HEARINGS_CASE_REFERENCE } from '../../mocks/hearings.mock';

test.describe('SSCS DWP hearings', { tag: ['@integration', '@integration-hearings'] }, () => {
  test('shows only the LISTED hearing and opens its read-only details for the DWP role set', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
    hearingViewSummaryPage,
  }) => {
    await openHearingsTabForScenario(page, caseDetailsPage, {
      ...DWP_HEARINGS_CONFIG,
      hearings: [...DWP_NON_LISTED_HEARINGS, DWP_LISTED_HEARING],
      summaryHearing: DWP_LISTED_HEARING,
    });

    await expect(page).toHaveURL(new RegExp(`/cases/case-details/SSCS/Benefit/${HEARINGS_CASE_REFERENCE}#Hearings$`));
    await expect(hearingsTabPage.container).toBeVisible();
    await expect(hearingsTabPage.hearingIdCell(DWP_LISTED_HEARING.hearingId)).toBeVisible();
    await expect(hearingsTabPage.hearingRow(DWP_LISTED_HEARING.hearingId)).toContainText('LISTED');
    await expect(hearingsTabPage.viewDetailsButtons).toHaveCount(1);
    await expect(hearingsTabPage.requestHearingButton).toHaveCount(0);
    await expect(hearingsTabPage.viewOrEditButton(DWP_LISTED_HEARING.hearingId)).toHaveCount(0);
    await expect(hearingsTabPage.cancelButton(DWP_LISTED_HEARING.hearingId)).toHaveCount(0);
    await expect(hearingsTabPage.addOrEditButton(DWP_LISTED_HEARING.hearingId)).toHaveCount(0);
    for (const hearing of DWP_NON_LISTED_HEARINGS) {
      await expect(hearingsTabPage.hearingIdCell(hearing.hearingId)).toHaveCount(0);
      await expect(hearingsTabPage.viewDetailsButton(hearing.hearingId)).toHaveCount(0);
    }

    const hearingResponse = page.waitForResponse((response) => new URL(response.url()).pathname === '/api/hearings/getHearing');
    await hearingsTabPage.openViewDetails(DWP_LISTED_HEARING.hearingId);
    const response = await hearingResponse;
    const requestedHearing = new URL(response.url());
    expect(requestedHearing.searchParams.get('hearingId')).toBe(DWP_LISTED_HEARING.hearingId);
    expect(requestedHearing.searchParams.get('caseRef')).toBe(HEARINGS_CASE_REFERENCE);
    expect(response.status()).toBe(200);
    await expect(page).toHaveURL(/\/hearings\/view\/hearing-view-summary$/);
    await expect(hearingViewSummaryPage.container).toBeVisible();
    await expect(hearingViewSummaryPage.heading).toHaveText(/hearing details|view hearing/i);
    await expect(hearingViewSummaryPage.summaryRow('Status')).toContainText('LISTED');
    await expect(hearingViewSummaryPage.sectionHeading('Listing information summary')).toBeVisible();
    await expect(hearingViewSummaryPage.editHearingButton).toHaveCount(0);
  });
});
