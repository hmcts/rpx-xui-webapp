import { expect, test } from '../../helpers/migrationTest.fixture';
import { captureMigrationState } from '../../helpers/migrationStateEvidence.helper';
import { mockMigrationRequest, setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';
import {
  buildMigrationRefundHistoryMock,
  buildMigrationRefundsMock,
  MIGRATION_REFUND_REFERENCE,
} from '../../mocks/migrationRefunds.mock';
import { MIGRATION_PAYMENT_REFERENCE } from '../../mocks/govukMigration.mock';

for (const role of ['payments-refund', 'payments-refund-approver']) {
  const mayApprove = role === 'payments-refund-approver';
  test(
    `Refund list renders the queues allowed for ${role}`,
    { tag: ['@integration', '@integration-govuk-migration'] },
    async ({ page, migrationOrigin }, testInfo) => {
      await setupMigrationVisualRoutes(page, ['caseworker-cmc', role]);
      await page.context().addCookies([{ name: 'XSRF-TOKEN', value: 'synthetic-refunds', url: migrationOrigin }]);
      const statuses: string[] = [];
      await mockMigrationRequest(page, migrationOrigin, 'GET', '/api/refund', (route) => {
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
      const approvalQueue = component.getByRole('heading', { name: 'Refunds to be approved' });
      if (mayApprove) {
        await expect(approvalQueue).toBeVisible();
      } else {
        await expect(approvalQueue).toHaveCount(0);
      }
      const queues = component.locator('ccpay-table');
      const expectedQueueCount = mayApprove ? 2 : 1;
      await expect(queues).toHaveCount(expectedQueueCount);
      for (let index = 0; index < expectedQueueCount; index++) {
        await expect(queues.nth(index).getByText('No records to display', { exact: true })).toBeVisible();
      }
      await expect(component.getByRole('alert')).toHaveCount(0);
      await expect
        .poll(() => [...statuses].sort())
        .toEqual(mayApprove ? ['Sent for approval', 'Update required'] : ['Update required']);
      const state = await captureMigrationState(page, testInfo, 'refund-queues');
      expect.soft(state.documentWidth, 'Refund queues should fit the viewport').toBeLessThanOrEqual(state.viewportWidth + 1);
      expect.soft(state.violations).toEqual([]);
    }
  );
}

test(
  'populated returned refund opens the selected refund details',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page, migrationOrigin }, testInfo) => {
    await setupMigrationVisualRoutes(page, ['caseworker-cmc', 'payments-refund']);
    await page.context().addCookies([{ name: 'XSRF-TOKEN', value: 'synthetic-migration-token', url: migrationOrigin }]);
    await mockMigrationRequest(page, migrationOrigin, 'GET', '/api/refund', (route) =>
      route.fulfill({ json: buildMigrationRefundsMock() })
    );
    const historyPath = `/api/refund/${MIGRATION_REFUND_REFERENCE}/status-history`;
    await mockMigrationRequest(page, migrationOrigin, 'GET', historyPath, (route) =>
      route.fulfill({ json: buildMigrationRefundHistoryMock() })
    );
    await mockMigrationRequest(page, migrationOrigin, 'GET', `/api/notification/${MIGRATION_REFUND_REFERENCE}`, (route) =>
      route.fulfill({ json: { notifications: [] } })
    );

    await page.goto('/cases');
    await page.getByRole('link', { name: 'Refunds', exact: true }).click();
    await expect(page).toHaveURL(/\/refunds$/);
    const component = page.locator('ccpay-refund-list');
    const refund = component.getByRole('row').filter({ hasText: MIGRATION_REFUND_REFERENCE });
    await expect(refund).toHaveCount(1);
    await expect(refund).toContainText('Synthetic Caseworker');
    await expect(refund.getByRole('link', { name: 'Review refund', exact: true })).toBeVisible();
    await expect(component.getByText('No records to display', { exact: true })).toHaveCount(0);
    await expect(component.getByRole('alert')).toHaveCount(0);
    const listState = await captureMigrationState(page, testInfo, 'refund-populated');
    expect.soft(listState.documentWidth, 'Refund queue should fit the viewport').toBeLessThanOrEqual(listState.viewportWidth + 1);
    expect.soft(listState.violations).toEqual([]);

    const historyResponse = page.waitForResponse(
      (response) => response.url() === migrationOrigin + historyPath && response.request().method() === 'GET'
    );
    await refund.getByRole('link', { name: 'Review refund', exact: true }).click();
    expect((await historyResponse).status()).toBe(200);
    const details = page.locator('ccpay-refund-status');
    await expect(details.getByRole('heading', { name: 'Refund details', exact: true })).toBeVisible();
    await expect(details.getByRole('row', { name: `Refund reference ${MIGRATION_REFUND_REFERENCE}`, exact: true })).toBeVisible();
    await expect(
      details.getByRole('row', { name: `Payment to be refunded ${MIGRATION_PAYMENT_REFERENCE}`, exact: true })
    ).toBeVisible();
    await expect(details.getByRole('row', { name: 'Amount refunded £21.50', exact: true })).toBeVisible();
    await expect(
      details.getByRole('row', { name: /Update required.*Synthetic Approver.*Confirm the duplicate payment/ })
    ).toBeVisible();
    await expect(details.getByRole('alert')).toHaveCount(0);
    const reviewState = await captureMigrationState(page, testInfo, 'refund-review');
    expect
      .soft(reviewState.documentWidth, 'Refund details should fit the viewport')
      .toBeLessThanOrEqual(reviewState.viewportWidth + 1);
    expect.soft(reviewState.violations).toEqual([]);
  }
);
