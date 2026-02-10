import { expect, test } from '../../fixtures';
import { loadSessionCookies } from '../../../common/sessionCapture.ts';

test.describe('IDAM login to trigger For 16 digit Case Search', () => {
  let availableCaseReference = '';
  let sessionCookies: any[] = [];
  test.beforeEach(async ({ page, config, caseListPage }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { cookies } = loadSessionCookies('STAFF_ADMIN');
    sessionCookies = cookies;
    if (sessionCookies.length) {
      await page.context().addCookies(sessionCookies);
    }

    await caseListPage.goto();
    availableCaseReference = await caseListPage.getRandomCaseReferenceFromResults();
    await page.goto('/');
  });

  test('Search by 16-digit case reference', async ({ caseDetailsPage, searchCasePage, validatorUtils }) => {
    const caseNumber = availableCaseReference;

    await test.step('Search using 16-digit case reference', async () => {
      await searchCasePage.searchWith16DigitCaseId(caseNumber);
    });
    await expect(searchCasePage.caseProgressHeading).toBeVisible();

    await test.step('On successful search - Check case details messages are seen', async () => {
      await expect(caseDetailsPage.exuiCaseDetailsComponent.caseHeader).toBeInViewport();
      await expect.soft(caseDetailsPage.ccdCaseReference).toContainText(validatorUtils.formatCaseNumber(caseNumber));
      await expect.soft(caseDetailsPage.caseNotificationBannerTitle).toContainText('Important');
      await expect.soft(caseDetailsPage.caseNotificationBannerBody).toContainText('active flags on this case');
      await expect.soft(caseDetailsPage.caseProgressMessage).toContainText('Current progress of the case');
      await expect.soft(caseDetailsPage.caseProgressMessage).toContainText('The case has been decided');
      await expect.soft(caseDetailsPage.caseProgressMessage).toContainText('Do this next');
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
