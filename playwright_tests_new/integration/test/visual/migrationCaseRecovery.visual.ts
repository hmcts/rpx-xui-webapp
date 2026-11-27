import { expect, test } from '@playwright/test';
import { CaseListPage } from '../../../E2E/page-objects/pages/exui/caseList.po';
import { setupMigrationCaseRecovery } from '../../helpers/migrationJourneyRoutes.helper';
import { setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';
import { CASE_VIEWER_CASE_REFERENCE, CASE_VIEWER_CASE_TYPE, CASE_VIEWER_JURISDICTION } from '../../mocks/caseViewer.mock';

test('case-details failure returns a usable case list and the recovered case opens', async ({ page }, testInfo) => {
  await setupMigrationVisualRoutes(page, ['caseworker-sscs', 'hmcts-staff']);
  const state = await setupMigrationCaseRecovery(page);
  const list = new CaseListPage(page);
  await page.goto(`/cases/case-details/${CASE_VIEWER_JURISDICTION}/${CASE_VIEWER_CASE_TYPE}/${CASE_VIEWER_CASE_REFERENCE}`);

  await expect(page).toHaveURL(/\/cases$/);
  expect(state.responses).toContain(500);
  await expect(list.caseListHeading).toHaveText('Case list');
  await page.getByRole('combobox', { name: 'Jurisdiction', exact: true }).selectOption({ label: CASE_VIEWER_JURISDICTION });
  await page.getByRole('combobox', { name: 'Case type', exact: true }).selectOption({ label: CASE_VIEWER_CASE_TYPE });
  await page.getByRole('button', { name: 'Apply filter' }).click();
  const recoveryRow = list.caseResultsTable.getByRole('row', { name: /Migration recovery case/ });
  await expect(recoveryRow).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await testInfo.attach('migration-case-details-error-return', {
    body: await page.locator('main').screenshot(),
    contentType: 'image/png',
  });

  state.restoreCaseDetails();
  // The case-reference link is the first navigation link in the uniquely named row.
  await recoveryRow.getByRole('link').first().click();
  await expect(page).toHaveURL(
    new RegExp(`/case-details/${CASE_VIEWER_JURISDICTION}/${CASE_VIEWER_CASE_TYPE}/${CASE_VIEWER_CASE_REFERENCE}`)
  );
  await expect(page.getByRole('tab', { name: /^Case summary(?:,|$)/ })).toBeVisible();
  const summary = page.getByRole('tabpanel', { name: /^Case summary(?:,|$)/ });
  await expect(summary.getByRole('row', { name: /Case reference/ })).toContainText(CASE_VIEWER_CASE_REFERENCE);
  expect(state.responses.at(-1)).toBe(200);
  await expect(page.getByRole('heading', { name: /something went wrong/i })).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  await testInfo.attach('migration-case-details-recovered-summary', {
    body: await summary.screenshot(),
    contentType: 'image/png',
  });
});
