import { expect, test } from '../../helpers/migrationTest.fixture';
import { measureControlFit } from '../../helpers/migrationVisualChecks.helper';
import { mockMigrationRequest, setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';
import { NOTICE_OF_CHANGE_SOLICITOR_ROLES } from '../../mocks/noticeOfChange.mock';
import { welshTranslationsForPhrases } from '../../mocks/welshLanguage';

test.describe('Migration shell keyboard and feature flags', { tag: ['@integration', '@integration-govuk-migration'] }, () => {
  test('the Welsh footer switch updates the navigation and can restore English at 320 px', async ({ page, migrationOrigin }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await setupMigrationVisualRoutes(page, ['caseworker-cmc'], { 'welsh-language': { value: true, version: 1 } });
    await mockMigrationRequest(page, migrationOrigin, 'POST', '/api/translation/cy', (route) =>
      route.fulfill({ json: welshTranslationsForPhrases(route.request().postDataJSON().phrases) })
    );
    await page.goto('/cases');
    const footer = page.getByRole('contentinfo');
    const navigation = page.getByRole('navigation', { name: /^Primary navigation\b/ });
    const welshSwitch = footer.getByRole('button', { name: 'Cymraeg', exact: true });
    await expect(navigation.getByRole('link', { name: 'Case list', exact: true })).toBeVisible();
    await expect(welshSwitch).toBeVisible();
    const fit = await measureControlFit(welshSwitch);
    expect.soft(fit.fits, `The footer language switch should fit horizontally: ${JSON.stringify(fit)}`).toBe(true);
    await welshSwitch.press('Enter');
    const englishSwitch = footer.getByRole('button', { name: 'English', exact: true });
    await expect(englishSwitch).toBeEnabled();
    await expect(navigation.getByRole('link', { name: 'Rhestr achosion', exact: true })).toBeVisible();
    await expect(footer.getByText('© Hawlfraint y Goron', { exact: true })).toBeVisible();
    await englishSwitch.press('Enter');
    await expect(welshSwitch).toBeEnabled();
    await expect(navigation.getByRole('link', { name: 'Case list', exact: true })).toBeVisible();
    await expect(footer.getByText('© Crown copyright', { exact: true })).toBeVisible();
  });

  test('the disabled Welsh flag removes the language switch and leaves English navigation usable', async ({ page }) => {
    await setupMigrationVisualRoutes(page, ['caseworker-cmc']);
    await page.goto('/cases');
    const footer = page.getByRole('contentinfo');
    await expect(footer.getByText('© Crown copyright', { exact: true })).toBeVisible();
    await expect(footer.getByRole('button', { name: /^(Cymraeg|English)$/ })).toHaveCount(0);
    await expect(
      page.getByRole('navigation', { name: 'Primary navigation', exact: true }).getByRole('link', {
        name: 'Case list',
        exact: true,
      })
    ).toBeVisible();
  });

  test('skip to main content preserves a Notice of Change deep link and moves keyboard focus into main content', async ({
    page,
  }) => {
    await setupMigrationVisualRoutes(page, NOTICE_OF_CHANGE_SOLICITOR_ROLES);
    await page.goto('/noc?migration=skip-link#caseRef');
    const form = page.getByRole('main');
    const reference = form.getByLabel('Online case reference number', { exact: true });
    await expect(reference).toBeVisible();
    const skip = page.getByRole('link', { name: 'Skip to main content', exact: true });
    await skip.press('Enter');
    await expect(page).toHaveURL(
      (url) => url.pathname === '/noc' && url.search === '?migration=skip-link' && url.hash === '#content'
    );
    await page.keyboard.press('Tab');
    const focus = await page.evaluate(() => document.activeElement?.outerHTML.split('>')[0]);
    await expect(form.locator(':focus'), `Focus after Tab: ${focus}`).toBeAttached({ timeout: 1000 });
  });
});
