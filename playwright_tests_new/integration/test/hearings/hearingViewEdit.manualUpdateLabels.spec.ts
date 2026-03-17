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

      const editSummary = page.locator('exui-hearing-edit-summary');
      await expect(editSummary).toBeVisible();

      const additionalInstructionsRow = editSummary
        .locator('.govuk-summary-list__row')
        .filter({ hasText: 'Enter any additional instructions for the hearing' })
        .first();
      await additionalInstructionsRow.getByRole('button', { name: /change/i }).click();
      await expect(page.getByRole('heading', { name: /enter any additional instructions for the hearing/i })).toBeVisible();
      await page.locator('#additionalInstructionsTextarea').fill('Playwright manual label verification');
      await page.getByRole('button', { name: /^continue$/i }).click();

      await expect(editSummary).toBeVisible();
      const updatedAdditionalInstructionsRow = editSummary
        .locator('.govuk-summary-list__row')
        .filter({ hasText: 'Enter any additional instructions for the hearing' })
        .first();
      await expect(updatedAdditionalInstructionsRow.getByText('AMENDED')).toBeVisible();
    });

    test('marks language requirements section as amended after Welsh flag update', async ({
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
      await hearingViewSummaryPage.waitForReady();
      await hearingViewSummaryPage.editHearingButton.click();

      const editSummary = page.locator('exui-hearing-edit-summary');
      await expect(editSummary).toBeVisible();

      const languageRequirementsRow = editSummary
        .locator('.govuk-summary-list__row')
        .filter({ hasText: 'Does this hearing need to be in Welsh?' })
        .first();
      await languageRequirementsRow.getByRole('button', { name: /change/i }).click();
      await expect(page.getByRole('heading', { name: /does this hearing need to be in welsh/i })).toBeVisible();
      await page.locator('#welsh_hearing_yes').check();
      await page.getByRole('button', { name: /^continue$/i }).click();

      await expect(editSummary).toBeVisible();
      const updatedLanguageRequirementsRow = editSummary
        .locator('.govuk-summary-list__row')
        .filter({ hasText: 'Does this hearing need to be in Welsh?' })
        .first();
      await expect(updatedLanguageRequirementsRow.getByText('AMENDED')).toBeVisible();
    });
  }
);
