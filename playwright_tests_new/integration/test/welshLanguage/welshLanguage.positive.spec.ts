import { welshTranslationsSmall } from 'playwright_tests_new/integration/mocks/welshLanguage';
import { expect, test } from '../../../E2E/fixtures';
import { ensureSessionCookies } from '../../../common/sessionCapture';
let sessionCookies: any[] = [];
const TRANSLATIONS_TIMEOUT = 10_000;

test.describe('Verify users can switch the language', () => {
  test.beforeEach(async ({ page }) => {
    const { cookies } = await ensureSessionCookies('SOLICITOR');
    sessionCookies = cookies;
    if (sessionCookies.length) {
      await page.context().addCookies(sessionCookies);
    }
    await page.goto('/');
    await page.route('**api/translation/cy*', async (route) => {
      const body = JSON.stringify(welshTranslationsSmall);
      await route.fulfill({ status: 200, contentType: 'application/json', body });
    });
  });

  test('Verify translations are shown when the user selects to view the site in Welsh', async ({
    createCasePage,
    caseListPage,
    page,
  }) => {
    await test.step('Change the language to Welsh', async () => {
      await caseListPage.exuiHeader.switchLanguage('Cymraeg');
      await caseListPage.exuiSpinnerComponent.wait();
      await page.waitForLoadState('domcontentloaded');
      await caseListPage.exuiHeader.appHeaderLink.waitFor({ state: 'attached' });
    });

    await test.step('Check the translation are shown, and the language toggle switches to English', async () => {
      await expect(caseListPage.exuiHeader.notificationBanner).toBeVisible();
      await expect(caseListPage.exuiHeader.notificationBannerTitle).toContainText('Pwysig');

      await page.waitForTimeout(10_000);

      const checks = [
        {
          locator: caseListPage.exuiHeader.headerAppLink,
          expected: welshTranslationsSmall.translations['Manage Cases'].translation,
        },
        {
          locator: caseListPage.exuiHeader.languageToggle,
          expected: 'English',
        },
        {
          locator: caseListPage.exuiHeader.signOutLink,
          expected: welshTranslationsSmall.translations['Sign out'].translation,
        },
        {
          locator: createCasePage.createCaseButton,
          expected: welshTranslationsSmall.translations['Create case'].translation,
        },
        {
          locator: caseListPage.exuiFooter.copyrightLink,
          expected: welshTranslationsSmall.translations['© Crown copyright'].translation,
        },
        {
          locator: caseListPage.caseListHeading,
          expected: welshTranslationsSmall.translations['Case list'].translation,
        },
      ];

      for (const { locator, expected } of checks) {
        await expect(locator).toContainText(expected, { timeout: TRANSLATIONS_TIMEOUT });
      }
    });

    await test.step('Check the language can be switched back to English and the correct translations are shown', async () => {
      await caseListPage.exuiHeader.switchLanguage('English');
      await caseListPage.exuiSpinnerComponent.wait();

      const checks = [
        { locator: caseListPage.exuiHeader.headerAppLink, expected: 'Manage Cases' },
        { locator: caseListPage.exuiHeader.languageToggle, expected: 'Cymraeg' },
        { locator: caseListPage.exuiHeader.signOutLink, expected: 'Sign out' },
      ];

      for (const { locator, expected } of checks) {
        await expect(locator).not.toContainText('[Translation in progress]', { timeout: TRANSLATIONS_TIMEOUT });
        await expect(locator).toContainText(expected, { timeout: TRANSLATIONS_TIMEOUT });
      }

      await expect.soft(caseListPage.exuiHeader.notificationBanner).not.toBeVisible();
    });
  });
});
