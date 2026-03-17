import { expect, test } from '../../../E2E/fixtures';
import { HEARINGS_LISTED_HEARING_ID, LISTED_HEARING_SCENARIO } from '../../mocks/hearings.mock';
import { HEARING_MANAGER_CR84_ON_USER, hearingManagerRoles, openHearingsTab } from '../../helpers';

test.describe(
  `Hearings summary validations as ${HEARING_MANAGER_CR84_ON_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('shows no-change validation when submitting updated request without edits', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
      hearingViewSummaryPage,
    }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_ON_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [LISTED_HEARING_SCENARIO],
          summaryHearing: LISTED_HEARING_SCENARIO,
        },
      });

      await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID);
      await hearingsTabPage.openViewDetails(HEARINGS_LISTED_HEARING_ID);

      await expect(page).toHaveURL(/\/hearings\/request\/hearing-view-summary$/);
      await hearingViewSummaryPage.waitForReady();
      await hearingViewSummaryPage.editHearingButton.click();

      await expect(page.locator('exui-hearing-edit-summary')).toBeVisible();
      await page.getByRole('button', { name: /submit updated request/i }).click();
      await expect(
        page.getByText('The request has not been updated as there is no change in hearing requirements')
      ).toBeVisible();
    });
  }
);
