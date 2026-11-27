import { expect, test } from '@playwright/test';
import { captureMigrationState } from '../../helpers/migrationStateEvidence.helper';
import { setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';

for (const role of ['payments-refund', 'payments-refund-approver']) {
  const mayApprove = role === 'payments-refund-approver';
  test(`Refund list renders the queues allowed for ${role}`, { tag: '@migration-sweep' }, async ({ page, baseURL }, testInfo) => {
    if (!baseURL) throw new Error('The migration visual runner requires a base URL');
    await setupMigrationVisualRoutes(page, ['caseworker-cmc', role]);
    await page.context().addCookies([{ name: 'XSRF-TOKEN', value: 'synthetic-refunds', url: baseURL }]);
    const statuses: string[] = [];
    await page.route('**/api/refund?*', (route) => {
      const status = new URL(route.request().url()).searchParams.get('status');
      if (status) statuses.push(status);
      return route.fulfill({ json: { refund_list: [] } });
    });

    await page.goto('/cases');
    await page.getByRole('link', { name: 'Refunds', exact: true }).click();
    await expect(page).toHaveURL(/\/refunds$/);
    const component = page.locator('ccpay-refund-list');
    await expect(component.getByRole('heading', { name: 'Refund list', exact: true })).toBeVisible();
    await expect(component.getByRole('heading', { name: 'Refunds returned to caseworker' })).toBeVisible();
    await expect(component.getByRole('heading', { name: 'Refunds to be approved' })).toHaveCount(mayApprove ? 1 : 0);
    await expect(component.locator('ccpay-table')).toHaveCount(mayApprove ? 2 : 1);
    expect(statuses.sort()).toEqual(mayApprove ? ['Sent for approval', 'Update required'] : ['Update required']);
    const state = await captureMigrationState(page, testInfo, 'refund-queues');
    expect.soft(state.documentWidth, 'Refund queues should fit the viewport').toBeLessThanOrEqual(state.viewportWidth + 1);
    expect.soft(state.violations).toEqual([]);
  });
}
