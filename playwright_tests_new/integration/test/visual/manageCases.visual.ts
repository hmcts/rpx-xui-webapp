import { expect, test } from '@playwright/test';
import { CaseListPage } from '../../../E2E/page-objects/pages/exui/caseList.po';
import { openDynamicFieldConfigJourney } from '../../helpers/dynamicFieldConfigMockRoutes.helper';
import { setupVisualManageCasesRoutes } from '../../helpers/visualManageCasesRoutes.helper';
import { buildVisualCaseListMock } from '../../mocks/visualManageCases.mock';

test('navigation and case list summary/table', async ({ page }) => {
  await setupVisualManageCasesRoutes(page, ['caseworker-cmc']);
  const mock = buildVisualCaseListMock();
  await page.route('**/data/internal/searchCases*', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mock) })
  );

  const caseList = new CaseListPage(page);
  await caseList.navigateTo();
  await expect(caseList.exuiHeader.header).toBeVisible();
  await expect(caseList.caseListResultsAmount).toHaveText('Showing 1 to 2 of 2 results');
  await expect(caseList.caseResultsTable.getByRole('row')).toHaveCount(3);
  await expect(caseList.caseResultsTable).toContainText('Visual case alpha');
  await page.evaluate(() => document.fonts.ready);
  await expect(caseList.exuiHeader.header).toHaveScreenshot('manage-cases-navigation.png');
  await expect(page.locator('main')).toHaveScreenshot('manage-cases-case-list.png');
});

test('create-case form with conditional field', async ({ page }) => {
  await setupVisualManageCasesRoutes(page, ['caseworker-divorce', 'caseworker-divorce-solicitor']);
  await openDynamicFieldConfigJourney(page, { skipSessionCookies: true });
  await expect(page.getByLabel('Case title')).toHaveValue('Default case title');
  await page.getByLabel('Case type').selectOption({ label: 'Urgent' });
  await expect(page.getByLabel('Reason for urgent handling')).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('main')).toHaveScreenshot('manage-cases-conditional-form.png');
});
