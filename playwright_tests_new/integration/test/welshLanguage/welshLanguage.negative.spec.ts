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
      await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
    });
  });

  test('Verify translations are not shown when the translation endpoint returns an error', async ({
    createCasePage,
    caseListPage,
    page,
  }) => {
    await test.step('Change the language to Welsh', async () => {
      await caseListPage.exuiHeader.switchLanguage('Cymraeg');
      await caseListPage.exuiSpinnerComponent.wait();
      await page.waitForLoadState('domcontentloaded');
      await caseListPage.exuiHeader.headerAppLink.waitFor({ state: 'attached' });
      await page.waitForResponse((r) => r.url().includes('/cy') && r.status() === 500, { timeout: 5_000 });
    });

    await test.step('Check the translations are not shown, but the translated banner still is', async () => {
      expect.soft(await caseListPage.exuiHeader.languageToggle.innerText()).toContain('English');
      await expect.soft(caseListPage.exuiHeader.notificationBanner).toBeVisible();
      await expect.soft(caseListPage.exuiHeader.notificationBannerTitle).toContainText('Pwysig');
      await expect
        .soft(caseListPage.exuiHeader.headerAppLink)
        .not.toContainText(welshTranslationsSmall.translations['Manage Cases'].translation);
      await expect
        .soft(caseListPage.exuiHeader.signOutLink)
        .not.toContainText(welshTranslationsSmall.translations['Sign out'].translation);
      await expect
        .soft(caseListPage.caseListHeading)
        .not.toContainText(welshTranslationsSmall.translations['Case list'].translation);
      await expect
        .soft(createCasePage.createCaseButton)
        .not.toContainText(welshTranslationsSmall.translations['Create case'].translation);
      await expect
        .soft(caseListPage.exuiFooter.copyrightLink)
        .not.toContainText(welshTranslationsSmall.translations['© Crown copyright'].translation);
    });
  });
});
