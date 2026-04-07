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
      hearingViewEditSummaryPage,
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

      await hearingViewEditSummaryPage.waitForReady();
      await hearingViewEditSummaryPage.submitUpdatedRequestButton.click();
      await expect(hearingViewEditSummaryPage.noChangeWarning).toBeVisible();
    });

    test('shows backend error when submitting updated request fails', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
      hearingViewEditSummaryPage,
      hearingViewSummaryPage,
    }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_ON_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [LISTED_HEARING_SCENARIO],
          summaryHearing: LISTED_HEARING_SCENARIO,
          hearingsApiOverrides: {
            updateHearingRequest: {
              status: 500,
              body: { message: 'update-hearing-request-failed' },
            },
          },
        },
      });

      await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID);
      await hearingsTabPage.openViewDetails(HEARINGS_LISTED_HEARING_ID);
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-view-summary$/);
      await hearingViewSummaryPage.waitForReady();
      await hearingViewSummaryPage.editHearingButton.click();

      await hearingViewEditSummaryPage.waitForReady();
      await hearingViewEditSummaryPage.rowChangeButton('Enter any additional instructions for the hearing').click();
      await expect(page.getByRole('heading', { name: /enter any additional instructions for the hearing/i })).toBeVisible();
      await page.locator('#additionalInstructionsTextarea').fill('Playwright update-request failure coverage');
      await page.getByRole('button', { name: /^continue$/i }).click();

      await hearingViewEditSummaryPage.waitForReady();
      await hearingViewEditSummaryPage.submitUpdatedRequestButton.click();
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-change-reason$/);
      await hearingViewEditSummaryPage.waitForChangeReasonReady();
      await hearingViewEditSummaryPage.changeReasonCheckboxes.first().check();
      const failedUpdateResponse = page.waitForResponse(
        (response) =>
          response.url().includes('/api/hearings/updateHearingRequest') &&
          response.request().method() === 'PUT' &&
          response.status() === 500
      );
      await hearingViewEditSummaryPage.submitChangeRequestButton.click();
      await failedUpdateResponse;

      await expect(page).toHaveURL(/\/hearings\/request\/hearing-change-reason$/);
      await expect(hearingViewEditSummaryPage.errorSummaryHeading).toBeVisible();
      await expect(hearingViewEditSummaryPage.systemErrorMessage).toBeVisible();
    });
  }
);
