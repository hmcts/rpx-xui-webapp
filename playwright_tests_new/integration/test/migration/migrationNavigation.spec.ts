import { expect, test } from '../../helpers/migrationTest.fixture';
import {
  captureMigrationNavigation,
  openMigrationNavigationSource,
  setupMigrationNavigationRoutes,
} from '../../helpers/migrationNavigationRoutes.helper';
import {
  NAVIGATION_CASE_PATH,
  NAVIGATION_CASE_REFERENCE,
  NAVIGATION_RESTRICTED_REFERENCE,
} from '../../mocks/migrationNavigation.mock';

// Keep the complete Back journey runnable when all three header-state checks fail.
const navigationSettleTimeout = 5_000;

for (const source of ['My work', 'Search'] as const) {
  test(
    `${source} stays selected through a case, restricted case and browser Back`,
    { tag: ['@integration', '@integration-govuk-migration'] },
    async ({ page, migrationOrigin }, testInfo) => {
      const caseResponses = await setupMigrationNavigationRoutes(page, migrationOrigin);
      const origin = await openMigrationNavigationSource(page, source);
      const navigation = page.getByRole('navigation', { name: 'Primary navigation', exact: true });
      const currentLinks = navigation.locator('a[aria-current="page"], a[aria-current="true"]');
      await expect(origin.marker).toBeVisible();
      await expect(page).toHaveURL(origin.path);
      await expect(currentLinks).toHaveText([source]);
      await expect(origin.caseLink).toHaveAttribute('href', NAVIGATION_CASE_PATH);
      await origin.caseLink.click();
      await expect(page).toHaveURL(new RegExp(`${NAVIGATION_CASE_PATH}(?:[/?#]|$)`));
      const summary = page.getByRole('tab', { name: /^Case summary(?:,|$)/ });
      await expect(summary).toBeVisible();
      expect(caseResponses).toContainEqual({ caseReference: NAVIGATION_CASE_REFERENCE, status: 200 });
      await captureMigrationNavigation(page, testInfo, 'case-navigation');
      await expect
        .soft(currentLinks, 'The case must retain the originating section')
        .toHaveText([source], { timeout: navigationSettleTimeout });
      if ((await summary.getAttribute('aria-selected')) !== 'true') {
        await summary.click();
      }
      await expect(summary).toHaveAttribute('aria-selected', 'true');
      await expect(page.getByRole('tabpanel', { name: /^Case summary(?:,|$)/ })).toContainText(NAVIGATION_CASE_REFERENCE);

      await page.getByRole('textbox', { name: '16-digit case reference:', exact: true }).fill(NAVIGATION_RESTRICTED_REFERENCE);
      await page.getByRole('button', { name: 'Find', exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${NAVIGATION_RESTRICTED_REFERENCE}$`));
      await expect(
        page.getByText('This case is restricted. The details of the users with access are provided below.', { exact: true })
      ).toBeVisible();
      await expect(page.getByRole('tab', { name: /^Case summary/ })).toHaveCount(0);
      expect(caseResponses).toContainEqual({ caseReference: NAVIGATION_RESTRICTED_REFERENCE, status: 403 });
      await captureMigrationNavigation(page, testInfo, 'restricted-navigation');
      await expect
        .soft(currentLinks, 'The restricted case must retain the originating section')
        .toHaveText([source], { timeout: navigationSettleTimeout });

      await page.goBack();
      await expect(page).toHaveURL(new RegExp(`${NAVIGATION_CASE_PATH}(?:[/?#]|$)`));
      await expect(summary).toBeVisible();
      await captureMigrationNavigation(page, testInfo, 'back-to-case-navigation');
      await expect
        .soft(currentLinks, 'Browser Back to the case must retain the originating section')
        .toHaveText([source], { timeout: navigationSettleTimeout });
      await navigation.getByRole('link', { name: source, exact: true }).click();
      if (source === 'Search') {
        await expect(page).toHaveURL(/\/search$/);
        await expect(page.getByRole('heading', { name: 'Search cases', exact: true })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Search', exact: true })).toBeEnabled();
      } else {
        await expect(page).toHaveURL(origin.path);
        await expect(origin.marker).toBeVisible();
        await expect(origin.caseLink).toBeVisible();
      }
      await expect(currentLinks).toHaveText([source]);
    }
  );
}

test(
  'direct case entry selects Case list without inventing an originating section',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page, migrationOrigin }, testInfo) => {
    await setupMigrationNavigationRoutes(page, migrationOrigin);
    await page.goto(NAVIGATION_CASE_PATH);
    await expect(page.getByRole('tab', { name: /^Case summary(?:,|$)/ })).toBeVisible();
    const navigation = page.getByRole('navigation', { name: 'Primary navigation', exact: true });
    await captureMigrationNavigation(page, testInfo, 'direct-case-navigation');
    await expect(navigation.locator('a[aria-current="page"], a[aria-current="true"]')).toHaveText(['Case list']);
  }
);

test(
  'direct restricted case uses the Back to search fallback',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page, migrationOrigin }) => {
    await setupMigrationNavigationRoutes(page, migrationOrigin);
    await page.goto(`/cases/case-details/IA/Asylum/${NAVIGATION_RESTRICTED_REFERENCE}`);
    await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${NAVIGATION_RESTRICTED_REFERENCE}$`));
    await expect(
      page.getByText('This case is restricted. The details of the users with access are provided below.', { exact: true })
    ).toBeVisible();
    expect(await page.evaluate(() => document.referrer)).toBe('');
    await page.getByRole('link', { name: 'Back to search', exact: true }).click();
    await expect(page).toHaveURL(/\/cases\/case-search$/);
    await expect(page.getByRole('heading', { name: 'Search', exact: true })).toBeVisible();
    await expect(
      page.getByRole('combobox', { name: /^Case type/ }).getByRole('option', { name: 'Asylum', exact: true, selected: true })
    ).toHaveCount(1);
    await expect(page.getByRole('button', { name: 'Apply filter', exact: true })).toBeEnabled();
  }
);
