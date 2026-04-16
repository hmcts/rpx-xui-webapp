import { expect, test } from '../../../E2E/fixtures';
import {
  expectLanguageChecks,
  getEnglishTranslationChecks,
  getWelshTranslationChecks,
  setupWelshLanguageSession,
  type WelshLanguageSessionLease,
} from '../../helpers';
import { welshTranslationsSmall } from '../../mocks/welshLanguage';

test.describe('Verify users can switch the language', { tag: ['@integration', '@integration-welsh-language'] }, () => {
  let welshSessionLease: WelshLanguageSessionLease | undefined;

  test.beforeEach(async ({ page }, testInfo) => {
    welshSessionLease = await setupWelshLanguageSession(page, testInfo);
    await page.route('**api/translation/cy*', async (route) => {
      const body = JSON.stringify(welshTranslationsSmall);
      await route.fulfill({ status: 200, contentType: 'application/json', body });
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test.afterEach(async () => {
    if (welshSessionLease) {
      await welshSessionLease.release();
      welshSessionLease = undefined;
    }
  });

  test('Verify translations are shown when the user selects to view the site in Welsh', async ({
    createCasePage,
    caseListPage,
    page,
  }) => {
    const welshChecks = getWelshTranslationChecks(createCasePage, caseListPage);
    const englishChecks = getEnglishTranslationChecks(createCasePage, caseListPage);

    await test.step('Change the language to Welsh', async () => {
      await caseListPage.exuiHeader.switchLanguage('Cymraeg');
      await caseListPage.exuiHeader.waitForRenderedLanguageState('Cymraeg');
      await caseListPage.exuiSpinnerComponent.wait();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Check the translation are shown, and the language toggle switches to English', async () => {
      await expect(caseListPage.exuiHeader.notificationBanner).toBeVisible();
      await expect(caseListPage.exuiHeader.notificationBannerTitle).toContainText('Pwysig');
      await expectLanguageChecks(welshChecks);
    });

    await test.step('Check the language can be switched back to English and the correct translations are shown', async () => {
      await caseListPage.exuiHeader.switchLanguage('English');
      await caseListPage.exuiHeader.waitForRenderedLanguageState('English');
      await caseListPage.exuiSpinnerComponent.wait();
      await page.waitForLoadState('domcontentloaded');
      await expectLanguageChecks(englishChecks);
      await expect(caseListPage.exuiHeader.notificationBanner).not.toBeVisible({ timeout: 20_000 });
    });
  });
});
