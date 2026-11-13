import { expect, test } from '../../../E2E/fixtures';
import { openHearingsTabForScenario } from '../../helpers';
import { DWP_HEARINGS_CONFIG, DWP_NON_LISTED_HEARINGS } from '../../mocks/dwpHearings.mock';
import { HEARINGS_CASE_REFERENCE } from '../../mocks/hearings.mock';

test.describe('SSCS DWP hearings restrictions', { tag: ['@integration', '@integration-hearings'] }, () => {
  test('shows a usable empty list when all hearings are non-LISTED without exposing view or mutation actions', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
  }) => {
    await openHearingsTabForScenario(page, caseDetailsPage, {
      ...DWP_HEARINGS_CONFIG,
      hearings: DWP_NON_LISTED_HEARINGS,
    });

    await expect(page).toHaveURL(new RegExp(`/cases/case-details/SSCS/Benefit/${HEARINGS_CASE_REFERENCE}#Hearings$`));
    await expect(hearingsTabPage.container).toBeVisible();
    await expect(hearingsTabPage.currentAndUpcomingHeading('Current and upcoming')).toBeVisible();
    await expect(hearingsTabPage.emptyState).toBeVisible();
    await expect(hearingsTabPage.reloadButton).toHaveCount(0);
    await expect(hearingsTabPage.viewDetailsButtons).toHaveCount(0);
    await expect(hearingsTabPage.requestHearingButton).toHaveCount(0);
    for (const hearing of DWP_NON_LISTED_HEARINGS) {
      await expect(hearingsTabPage.hearingIdCell(hearing.hearingId)).toHaveCount(0);
      await expect(hearingsTabPage.viewOrEditButton(hearing.hearingId)).toHaveCount(0);
      await expect(hearingsTabPage.cancelButton(hearing.hearingId)).toHaveCount(0);
      await expect(hearingsTabPage.addOrEditButton(hearing.hearingId)).toHaveCount(0);
    }
  });
});
