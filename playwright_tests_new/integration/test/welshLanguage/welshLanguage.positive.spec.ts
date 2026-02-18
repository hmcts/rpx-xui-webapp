import { welshTranslationsSmall } from 'playwright_tests_new/integration/mocks/welshLanguage';
import { expect, test } from '../../../E2E/fixtures';
import { ensureSessionCookies } from '../../../common/sessionCapture';
import { createCase } from 'playwright_tests/E2E/steps/create-xui-case-poc-steps';
let sessionCookies: any[] = [];

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
      await caseListPage.exuiHeader.headerAppLink.waitFor({ state: 'attached' });
    });

    await test.step('Check the translation are shown, and the language toggle switches to English', async () => {
      expect.soft(await caseListPage.exuiHeader.languageToggle.innerText()).toContain('English');
      await expect.soft(caseListPage.exuiHeader.notificationBanner).toBeVisible();
      await expect.soft(caseListPage.exuiHeader.notificationBannerTitle).toContainText('Pwysig');
      await expect
        .soft(caseListPage.exuiHeader.headerAppLink)
        .toContainText(welshTranslationsSmall.translations['Manage Cases'].translation);
      await expect
        .soft(caseListPage.exuiHeader.signOutLink)
        .toContainText(welshTranslationsSmall.translations['Sign out'].translation);
      await expect.soft(caseListPage.caseListHeading).toContainText(welshTranslationsSmall.translations['Case list'].translation);
      await expect
        .soft(createCasePage.createCaseButton)
        .toContainText(welshTranslationsSmall.translations['Create case'].translation);
      await expect
        .soft(caseListPage.exuiFooter.copyrightLink)
        .toContainText(welshTranslationsSmall.translations['© Crown copyright'].translation);
    });

    await test.step('Check the language can be switched back to English and the correct translations are shown', async () => {
      await caseListPage.exuiHeader.switchLanguage('English');
      await caseListPage.exuiSpinnerComponent.wait();
      expect.soft(await caseListPage.exuiHeader.header.isVisible()).toBe(true);
      expect.soft(await caseListPage.exuiHeader.headerAppLink.innerText()).toContain('Manage Cases');
      expect.soft(await caseListPage.exuiHeader.languageToggle.innerText()).toContain('Cymraeg');
      expect.soft(await caseListPage.exuiHeader.signOutLink.innerText()).toContain('Sign out');
    });
  });
});
