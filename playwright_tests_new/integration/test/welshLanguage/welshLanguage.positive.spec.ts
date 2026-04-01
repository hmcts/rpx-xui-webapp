import { welshTranslationsSmall } from 'playwright_tests_new/integration/mocks/welshLanguage';
import { expect, test } from '../../../E2E/fixtures';
import { applyWelshLanguageSessionCookies } from '../../helpers';
const TRANSLATIONS_TIMEOUT = 20_000;

function getWelshTranslationChecks(createCasePage, caseListPage) {
  return [
    {
      locator: caseListPage.exuiHeader.appHeaderLink,
      welsh: welshTranslationsSmall.translations['Manage Cases'].translation,
      english: 'Manage Cases',
    },
    {
      locator: caseListPage.exuiHeader.languageToggle,
      welsh: 'English',
      english: 'Cymraeg',
    },
    {
      locator: caseListPage.exuiHeader.signOutLink,
      welsh: welshTranslationsSmall.translations['Sign out'].translation,
      english: 'Sign out',
    },
    {
      locator: createCasePage.createCaseButton,
      welsh: welshTranslationsSmall.translations['Create case'].translation,
      english: 'Create case',
    },
    {
      locator: caseListPage.exuiFooter.copyrightLink,
      welsh: welshTranslationsSmall.translations['© Crown copyright'].translation,
      english: '© Crown copyright',
    },
    {
      locator: caseListPage.caseListHeading,
      welsh: welshTranslationsSmall.translations['Case list'].translation,
      english: 'Case list',
    },
  ] as const;
}

function getEnglishTranslationChecks(createCasePage, caseListPage) {
  return [
    {
      locator: caseListPage.exuiHeader.appHeaderLink,
      expected: 'Manage Cases',
    },
    {
      locator: caseListPage.exuiHeader.languageToggle,
      expected: 'Cymraeg',
    },
    {
      locator: caseListPage.exuiHeader.signOutLink,
      expected: 'Sign out',
    },
    {
      locator: createCasePage.createCaseButton,
      expected: 'Create case',
    },
    {
      locator: caseListPage.caseListHeading,
      expected: 'Case list',
    },
  ] as const;
}

async function expectLanguageChecks(checks) {
  for (const { locator, expected } of checks) {
    await expect(locator).toContainText(expected, { timeout: TRANSLATIONS_TIMEOUT });
  }
}

test.describe('Verify users can switch the language', { tag: ['@integration', '@integration-welsh-language'] }, () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await applyWelshLanguageSessionCookies(page, testInfo);
    await page.route('**api/translation/cy*', async (route) => {
      const body = JSON.stringify(welshTranslationsSmall);
      await route.fulfill({ status: 200, contentType: 'application/json', body });
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
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
      await caseListPage.exuiSpinnerComponent.wait();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Check the translation are shown, and the language toggle switches to English', async () => {
      await expect(caseListPage.exuiHeader.notificationBanner).toBeVisible();
      await expect(caseListPage.exuiHeader.notificationBannerTitle).toContainText('Pwysig');
      await expectLanguageChecks(
        welshChecks.map(({ locator, welsh }) => ({
          locator,
          expected: welsh,
        }))
      );
    });

    await test.step('Check the language can be switched back to English and the correct translations are shown', async () => {
      await caseListPage.exuiHeader.switchLanguage('English');
      await page.reload({ waitUntil: 'domcontentloaded' });
      await caseListPage.exuiSpinnerComponent.wait();
      await page.waitForLoadState('domcontentloaded');
      await expectLanguageChecks(englishChecks);
      await expect(caseListPage.exuiHeader.notificationBanner).not.toBeVisible({ timeout: TRANSLATIONS_TIMEOUT });
    });
  });
});
