import { expect, test } from '@playwright/test';
import { openDynamicFieldConfigJourney } from '../../helpers/dynamicFieldConfigMockRoutes.helper';
import { captureDocumentWidth, scanMigrationAccessibility, tabToControl } from '../../helpers/migrationVisualChecks.helper';
import { setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';
import { buildVisualCaseListMock } from '../../mocks/visualManageCases.mock';

for (const width of [1280, 768, 320]) {
  test.describe(`Manage Cases layout at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test.beforeEach(() => {
      test.skip(
        width !== 1280 && process.env.MIGRATION_STRICT_REFLOW !== 'true',
        'Set MIGRATION_STRICT_REFLOW=true to validate narrow layouts against the viewport'
      );
    });

    test('case list content and quick search are reachable by keyboard', async ({ page }, testInfo) => {
      await setupMigrationVisualRoutes(page, ['caseworker-cmc']);
      await page.route('**/data/internal/searchCases*', (route) => route.fulfill({ json: buildVisualCaseListMock() }));
      await page.goto('/cases');

      const table = page.locator('#search-result').getByRole('table');
      await expect(table.getByRole('row')).toHaveCount(3);
      await expect(table.getByRole('row', { name: /Visual case alpha/ })).toBeVisible();
      await expect(table.getByRole('row', { name: /Visual case beta/ })).toBeVisible();
      expect.soft(await captureDocumentWidth(page, testInfo), 'The page should fit the viewport').toBeLessThanOrEqual(width + 1);
      if (width !== 768) expect.soft(await scanMigrationAccessibility(page, testInfo)).toEqual([]);

      const input = page.locator('#exuiCaseReferenceSearch');
      await expect(input).toBeVisible();
      await tabToControl(page, input);
      await expect(input).toBeFocused();
      await page.keyboard.type('1234567890123456');
      await expect(input).toHaveValue('1234567890123456');
      await page.keyboard.press('Tab');
      await expect(page.locator('form').filter({ has: input }).getByRole('button', { name: 'Find', exact: true })).toBeFocused();
    });

    test('conditional form adds and removes a field in the keyboard sequence', async ({ page }, testInfo) => {
      await setupMigrationVisualRoutes(page, ['caseworker-cmc']);
      await openDynamicFieldConfigJourney(page, { skipSessionCookies: true });
      await expect(page.getByLabel('Case title')).toHaveValue('Default case title');

      const type = page.getByRole('combobox', { name: 'Case type (Optional)', exact: true });
      await tabToControl(page, type);
      await expect(type).toBeFocused();
      await page.keyboard.press('u');
      await expect(type.locator('option:checked')).toHaveText('Urgent');

      const reason = page.getByLabel('Reason for urgent handling');
      await expect(reason).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(reason).toBeFocused();
      await page.keyboard.type('Synthetic urgent reason');
      await expect(reason).toHaveValue('Synthetic urgent reason');
      expect.soft(await captureDocumentWidth(page, testInfo), 'The page should fit the viewport').toBeLessThanOrEqual(width + 1);
      if (width !== 768) expect.soft(await scanMigrationAccessibility(page, testInfo)).toEqual([]);

      await page.keyboard.press('Shift+Tab');
      await expect(type).toBeFocused();
      await page.keyboard.press('s');
      await expect(type.locator('option:checked')).toHaveText('Standard');
      await expect(reason).toBeHidden();
      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Case reference', { exact: true })).toBeFocused();
    });
  });
}
