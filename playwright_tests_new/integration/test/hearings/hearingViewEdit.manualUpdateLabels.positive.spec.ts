import { expect, test } from '../../../E2E/fixtures';
import { HEARINGS_LISTED_HEARING_ID, LISTED_HEARING_SCENARIO } from '../../mocks/hearings.mock';
import { HEARING_MANAGER_CR84_ON_USER, hearingManagerRoles, openHearingsTab } from '../../helpers';

test.describe(
  `Hearings manual update labels as ${HEARING_MANAGER_CR84_ON_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('marks additional instructions section as amended after a manual update', async ({
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
      await hearingViewSummaryPage.waitForReady();
      await hearingViewSummaryPage.editHearingButton.click();

      await hearingViewEditSummaryPage.waitForReady();
      await hearingViewEditSummaryPage.rowChangeButton('Enter any additional instructions for the hearing').click();
      await expect(page.getByRole('heading', { name: /enter any additional instructions for the hearing/i })).toBeVisible();
      await page.locator('#additionalInstructionsTextarea').fill('Playwright manual label verification');
      await page.getByRole('button', { name: /^continue$/i }).click();

      await hearingViewEditSummaryPage.waitForReady();
      await expect(hearingViewEditSummaryPage.rowValue('Enter any additional instructions for the hearing')).toContainText(
        'Playwright manual label verification'
      );
      await expect(
        hearingViewEditSummaryPage.rowTag('Enter any additional instructions for the hearing', 'AMENDED')
      ).toBeVisible();

      await hearingViewEditSummaryPage.submitUpdatedRequestButton.click();
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-change-reason$/);
      await hearingViewEditSummaryPage.waitForChangeReasonReady();
      await hearingViewEditSummaryPage.changeReasonCheckboxes.first().check();

      const updateRequest = page.waitForRequest(
        (request) => request.url().includes('/api/hearings/updateHearingRequest') && request.method() === 'PUT'
      );
      await hearingViewEditSummaryPage.submitChangeRequestButton.click();

      expect((await updateRequest).postDataJSON()).toEqual(
        expect.objectContaining({
          hearingDetails: expect.objectContaining({
            listingComments: 'Playwright manual label verification',
          }),
        })
      );
    });

    test('marks language requirements section as amended after Welsh flag update', async ({
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
      await hearingViewSummaryPage.waitForReady();
      await hearingViewSummaryPage.editHearingButton.click();

      await hearingViewEditSummaryPage.waitForReady();
      await hearingViewEditSummaryPage.rowChangeButton('Does this hearing need to be in Welsh?').click();
      await expect(page.getByRole('heading', { name: /does this hearing need to be in welsh/i })).toBeVisible();
      await page.locator('#welsh_hearing_yes').check();
      await page.getByRole('button', { name: /^continue$/i }).click();

      await hearingViewEditSummaryPage.waitForReady();
      await expect(hearingViewEditSummaryPage.rowValue('Does this hearing need to be in Welsh?')).toContainText('Yes');
      await expect(hearingViewEditSummaryPage.rowTag('Does this hearing need to be in Welsh?', 'AMENDED')).toBeVisible();

      await hearingViewEditSummaryPage.submitUpdatedRequestButton.click();
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-change-reason$/);
      await hearingViewEditSummaryPage.waitForChangeReasonReady();
      await hearingViewEditSummaryPage.changeReasonCheckboxes.first().check();

      const updateRequest = page.waitForRequest(
        (request) => request.url().includes('/api/hearings/updateHearingRequest') && request.method() === 'PUT'
      );
      await hearingViewEditSummaryPage.submitChangeRequestButton.click();

      expect((await updateRequest).postDataJSON()).toEqual(
        expect.objectContaining({
          hearingDetails: expect.objectContaining({
            hearingInWelshFlag: true,
          }),
        })
      );
    });
  }
);
