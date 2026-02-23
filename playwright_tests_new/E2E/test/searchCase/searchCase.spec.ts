import { expect, test } from '../../fixtures';
import { ensureSession } from '../../../common/sessionCapture';
import { resolveCaseReferenceFromGlobalSearch, resolveNonExistentCaseReference } from '../../../E2E/utils/case-reference.utils';
import { openHomeWithCapturedSession, PUBLIC_LAW_CASE_REFERENCE_OPTIONS } from './searchCase.setup';

test.describe('IDAM login to trigger For 16 digit Case Search', () => {
  let availableCaseReference = '';
  test.beforeAll(async () => {
    await ensureSession('FPL_GLOBAL_SEARCH');
  });

  test.beforeEach(async ({ page }) => {
    await openHomeWithCapturedSession(page, 'FPL_GLOBAL_SEARCH');
    availableCaseReference = await resolveCaseReferenceFromGlobalSearch(page, PUBLIC_LAW_CASE_REFERENCE_OPTIONS);
  });

  test('Search by 16-digit case reference', async ({ caseDetailsPage, searchCasePage, page }) => {
    const caseNumber = availableCaseReference;

    await test.step('Search using 16-digit case reference', async () => {
      await searchCasePage.searchWith16DigitCaseId(caseNumber);
    });
    await expect(page).toHaveURL(/\/cases\/case-details\//);
    const caseNumberFromUrl = await caseDetailsPage.getCaseNumberFromUrl();
    expect.soft(caseNumberFromUrl).toContain(caseNumber);
    await expect(caseDetailsPage.caseActionsDropdown).toBeVisible();

    await test.step('Verify optional case details notifications and progress panel', async () => {
      // These elements are conditionally rendered based on case state and configuration
      // Notification banner appears when case has active flags
      if (await caseDetailsPage.caseNotificationBannerTitle.isVisible()) {
        await expect.soft(caseDetailsPage.caseNotificationBannerTitle).toContainText('Important');
      }
      if (await caseDetailsPage.caseNotificationBannerBody.isVisible()) {
        await expect.soft(caseDetailsPage.caseNotificationBannerBody).toContainText('active flags on this case');
      }
      // Progress panel displays when case has timeline tracking enabled
      if (await searchCasePage.caseProgressPanel.isVisible()) {
        await expect.soft(caseDetailsPage.caseProgressMessage).toContainText('Current progress of the case');
      }
    });
  });

  test('Search invalid 16-digit case reference shows no results', async ({ searchCasePage, page }) => {
    const invalidCaseReference = await resolveNonExistentCaseReference(page, { jurisdictionIds: ['PUBLICLAW'] });

    await test.step('Submit a non-existent 16 digit case reference', async () => {
      await searchCasePage.searchWith16DigitCaseId(invalidCaseReference);
    });

    await test.step('Search results not found content is shown', async () => {
      await expect(searchCasePage.noResultsHeading).toBeVisible();
      await expect(searchCasePage.backLink).toBeVisible();
    });
  });
});
