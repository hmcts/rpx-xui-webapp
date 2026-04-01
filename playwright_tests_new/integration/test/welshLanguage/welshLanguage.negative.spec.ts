import { welshTranslationsSmall } from 'playwright_tests_new/integration/mocks/welshLanguage';
import { expect, test } from '../../../E2E/fixtures';
import { applyWelshLanguageSessionCookies } from '../../helpers';

test.describe('Verify users can switch the language', { tag: ['@integration', '@integration-welsh-language'] }, () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await applyWelshLanguageSessionCookies(page, testInfo);
    await page.route('**api/translation/cy*', async (route) => {
      await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('Verify translations are not shown when the translation endpoint returns an error', async ({
    createCasePage,
    caseListPage,
    page,
  }) => {
    await test.step('Change the language to Welsh', async () => {
      await Promise.all([
        page.waitForResponse((response) => response.url().includes('/api/translation/cy') && response.status() === 500),
        caseListPage.exuiHeader.switchLanguage('Cymraeg'),
      ]);
      await caseListPage.exuiSpinnerComponent.wait();
      await page.waitForLoadState('domcontentloaded');
      await caseListPage.exuiHeader.appHeaderLink.waitFor({ state: 'attached' });
    });

    await test.step('Check the translations are not shown, but the translated banner still is', async () => {
      expect.soft(await caseListPage.exuiHeader.languageToggle.innerText()).toContain('English');
      await expect.soft(caseListPage.exuiHeader.notificationBanner).toBeVisible();
      await expect.soft(caseListPage.exuiHeader.notificationBannerTitle).toContainText('Pwysig');
      await expect
        .soft(caseListPage.exuiHeader.appHeaderLink)
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
