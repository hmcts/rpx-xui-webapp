import { expect, test } from '../../fixtures';
import { ensureSession, loadSessionCookies } from '../../../common/sessionCapture.ts';
import { resolveCaseReferenceWithFallback } from '../../../E2E/utils/case-reference.utils.ts';

test.describe('IDAM login to trigger For 16 digit Case Search', () => {
  let availableCaseReference = '';
  test.beforeAll(async () => {
    await ensureSession('FPL_GLOBAL_SEARCH');
  });

  test.beforeEach(async ({ page, caseListPage }) => {
    const { cookies } = loadSessionCookies('FPL_GLOBAL_SEARCH');
    if (cookies.length) {
      await page.context().addCookies(cookies);
    }

    await page.goto('/');
    availableCaseReference = await resolveCaseReferenceWithFallback(
      page,
      async () => {
        await caseListPage.goto();
        const caseReference = await caseListPage.getRandomCaseReferenceFromResults([
          'Case management',
          'Submitted',
          'Gatekeeping',
          'Closed',
        ]);
        await page.goto('/');
        return caseReference;
      },
      {
        jurisdictionIds: ['PUBLICLAW'],
        preferredStates: ['Case management', 'Submitted', 'Gatekeeping', 'Closed'],
      }
    );
  });

  test('Search by 16-digit case reference', async ({ caseDetailsPage, searchCasePage, validatorUtils, page }) => {
    const caseNumber = availableCaseReference;

    await test.step('Search using 16-digit case reference', async () => {
      await searchCasePage.searchWith16DigitCaseId(caseNumber);
    });
    await expect(page).toHaveURL(/\/cases\/case-details\//);
    const caseNumberFromUrl = await caseDetailsPage.getCaseNumberFromUrl();
    await expect.soft(caseNumberFromUrl).toContain(caseNumber);
    await expect(caseDetailsPage.caseActionsDropdown).toBeVisible();

    await test.step('On successful search - Check case details messages are seen', async () => {
      if (await caseDetailsPage.caseNotificationBannerTitle.isVisible()) {
        await expect.soft(caseDetailsPage.caseNotificationBannerTitle).toContainText('Important');
      }
      if (await caseDetailsPage.caseNotificationBannerBody.isVisible()) {
        await expect.soft(caseDetailsPage.caseNotificationBannerBody).toContainText('active flags on this case');
      }
      if (await searchCasePage.caseProgressPanel.isVisible()) {
        await expect.soft(caseDetailsPage.caseProgressMessage).toContainText('Current progress of the case');
      }
    });
  });

  test('Search invalid 16-digit case reference shows no results', async ({ searchCasePage, validatorUtils }) => {
    const invalidCaseReference = validatorUtils.mutateCaseNumber(availableCaseReference);

    await test.step('Submit a non-existent 16 digit case reference', async () => {
      await searchCasePage.searchWith16DigitCaseId(invalidCaseReference);
    });

    await test.step('Search results not found content is shown', async () => {
      await expect(searchCasePage.noResultsHeading).toBeVisible();
      await expect(searchCasePage.backLink).toBeVisible();
    });
  });
});
