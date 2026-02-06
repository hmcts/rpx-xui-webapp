import { expect, test } from '../../../E2E/fixtures';
import { loadSessionCookies } from '../../../common/sessionCapture';
let sessionCookies: any[] = [];

test.describe('Verify users can switch the language', () => {
  test.beforeEach(async ({ page }) => {
    const { cookies } = loadSessionCookies('SOLICITOR');
    sessionCookies = cookies;
    if (sessionCookies.length) {
      await page.context().addCookies(sessionCookies);
    }
    await page.goto('/');

    await page.route('**api/translation/cy*', async (route) => {
      const body = JSON.stringify({
        translations: {
          'Manage Cases': {
            translation: 'Rhestr achosion',
          },
          'Sign out': {
            translation: 'Allgofnodi',
          },
        },
      });
      await route.fulfill({ status: 200, contentType: 'application/json', body });
    });
  });

  test('Verify translations are shown when the user selects to view the site in Welsh', async ({ caseListPage, page }) => {
    await test.step('Change the language to Welsh', async () => {
      await caseListPage.exuiHeader.switchLanguage('Cymraeg');
      await caseListPage.exuiSpinnerComponent.wait();
      await page.waitForLoadState('domcontentloaded');
      await caseListPage.exuiHeader.appHeaderLink.waitFor({ state: 'attached' });
    });

    await test.step('Check the translation for Manage Cases is shown and the language toggle switches to English', async () => {
      expect.soft(await caseListPage.exuiHeader.languageToggle.innerText()).toContain('English');
      await expect(caseListPage.exuiHeader.appHeaderLink).toContainText('Rhestr achosion');
    });

    await test.step('Check the language can be switched back to English and the correct translations are shown', async () => {
      await caseListPage.exuiHeader.switchLanguage('English');
      await caseListPage.exuiSpinnerComponent.wait();
      await caseListPage.exuiHeader.checkIsVisible();
      expect.soft(await caseListPage.exuiHeader.appHeaderLink.innerText()).toContain('Manage Cases');
      expect.soft(await caseListPage.exuiHeader.languageToggle.innerText()).toContain('Cymraeg');
    });
  });
});
