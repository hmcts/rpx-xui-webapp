import { expect } from '../../helpers/migrationTest.fixture';
import { test } from '../../helpers/paymentInitialization.fixture';
import { openMigrationCase } from '../../helpers/govukMigrationMockRoutes.helper';
import { mockMigrationRequest } from '../../helpers/migrationVisualRoutes.helper';
import { CASE_VIEWER_CASE_REFERENCE } from '../../mocks/caseViewer.mock';
import { buildMigrationCaseMock, MIGRATION_PAYMENT_REFERENCE } from '../../mocks/govukMigration.mock';

const reviewPath = `/payments/payment-groups/fee-pay-apportion/${MIGRATION_PAYMENT_REFERENCE}`;

test.describe('GOV.UK migration: Case Details', { tag: ['@integration', '@integration-govuk-migration'] }, () => {
  test.beforeEach(async ({ page, migrationOrigin }) => {
    await openMigrationCase(page, migrationOrigin);
  });

  test('payments component renders a populated payment and Review opens its details', async ({
    page,
    migrationOrigin,
  }, testInfo) => {
    await page.getByRole('tab', { name: 'Payment history', exact: true }).click();
    const paymentLibrary = page.locator('ccpay-payment-lib');
    const payments = paymentLibrary.getByRole('table').filter({
      has: page.getByRole('row').filter({ hasText: MIGRATION_PAYMENT_REFERENCE }),
    });
    await expect(payments).toHaveCount(1);
    await payments.scrollIntoViewIfNeeded();
    await expect(paymentLibrary.getByText('Payments', { exact: true })).toBeVisible();
    await expect(payments).toBeVisible();
    const payment = payments.getByRole('row').filter({ hasText: MIGRATION_PAYMENT_REFERENCE });
    await expect(payment).toHaveCount(1);
    await expect(payment).toContainText('Success');
    await expect(payment).toContainText('£215.00');
    await expect(payment.getByRole('link', { name: 'Review', exact: true })).toBeVisible();
    await expect(payment.getByRole('link', { name: 'Review', exact: true })).toBeEnabled();

    const reviewResponse = page.waitForResponse(
      (response) => response.url() === migrationOrigin + reviewPath && response.request().method() === 'GET'
    );
    await payment.getByRole('link', { name: 'Review', exact: true }).click();
    expect((await reviewResponse).status()).toBe(200);
    const details = paymentLibrary.locator('ccpay-payment-view');
    await expect(details.getByRole('heading', { name: 'Payment details', exact: true })).toBeVisible();
    await expect(
      details.getByRole('row', { name: `Payment reference ${MIGRATION_PAYMENT_REFERENCE}`, exact: true })
    ).toBeVisible();
    await expect(details.getByRole('row', { name: 'Payment amount £215.00', exact: true })).toBeVisible();
    await expect(details.getByRole('row', { name: 'Payment method payment by account', exact: true })).toBeVisible();
    await expect(details.locator('ccpay-payment-statuses').getByRole('row', { name: /Success.*15 January 2026/ })).toBeVisible();
    await expect(details.getByRole('alert')).toHaveCount(0);
    await page.evaluate(() => document.fonts.ready);
    await testInfo.attach('payments-panel', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
    await details.getByRole('link', { name: 'Back', exact: true }).click();
    await expect(details).toHaveCount(0);
    await expect(payment).toBeVisible();
  });

  test('payment Review exposes a service failure without rendering stale details', async ({
    page,
    migrationOrigin,
  }, testInfo) => {
    await mockMigrationRequest(page, migrationOrigin, 'GET', reviewPath, (route) =>
      route.fulfill({ status: 500, json: { status: 500, message: 'Synthetic payment details failure' } })
    );
    await page.getByRole('tab', { name: 'Payment history', exact: true }).click();
    const paymentLibrary = page.locator('ccpay-payment-lib');
    const payment = paymentLibrary.getByRole('row').filter({ hasText: MIGRATION_PAYMENT_REFERENCE });
    await expect(payment).toHaveCount(1);
    await expect(payment).toContainText('£215.00');
    const reviewResponse = page.waitForResponse(
      (response) => response.url() === migrationOrigin + reviewPath && response.request().method() === 'GET'
    );
    await payment.getByRole('link', { name: 'Review', exact: true }).click();
    expect((await reviewResponse).status()).toBe(500);
    const details = paymentLibrary.locator('ccpay-payment-view');
    await expect(details.getByRole('heading', { name: 'Payment details could not be retrieved', exact: true })).toBeVisible();
    await expect(details.getByRole('heading', { name: 'Payment details', exact: true })).toHaveCount(0);
    await expect(details.getByRole('row', { name: `Payment reference ${MIGRATION_PAYMENT_REFERENCE}`, exact: true })).toHaveCount(
      0
    );
    await testInfo.attach('payment-review-error', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  });

  test('shows the eligible Payments empty state without a Review control', async ({ page, migrationOrigin }) => {
    await mockMigrationRequest(
      page,
      migrationOrigin,
      'GET',
      `/payments/cases/${CASE_VIEWER_CASE_REFERENCE}/paymentgroups`,
      (route) => route.fulfill({ json: { payment_groups: [] } })
    );
    await page.getByRole('tab', { name: 'Payment history', exact: true }).click();
    const paymentLibrary = page.locator('ccpay-payment-lib');
    await expect(paymentLibrary.getByText(/no payments recorded/i)).toBeVisible();
    await expect(paymentLibrary.getByRole('link', { name: 'Review', exact: true })).toHaveCount(0);
  });

  test('switching cases replaces a populated Payments panel with the second case empty state', async ({
    page,
    migrationOrigin,
  }) => {
    const emptyCaseReference = '1652112127295262';
    const emptyPaymentsPath = `/payments/cases/${emptyCaseReference}/paymentgroups`;
    let requestedEmptyPayments = false;
    let releaseEmptyPayments!: () => void;
    const holdEmptyPayments = new Promise<void>((resolve) => {
      releaseEmptyPayments = resolve;
    });
    await mockMigrationRequest(page, migrationOrigin, 'GET', `/data/internal/cases/${emptyCaseReference}`, (route) =>
      route.fulfill({ json: buildMigrationCaseMock(emptyCaseReference) })
    );
    await mockMigrationRequest(page, migrationOrigin, 'GET', emptyPaymentsPath, async (route) => {
      requestedEmptyPayments = true;
      await holdEmptyPayments;
      await route.fulfill({ json: { payment_groups: [] } });
    });
    await mockMigrationRequest(page, migrationOrigin, 'GET', `/pay-bulkscan/cases/${emptyCaseReference}`, (route) =>
      route.fulfill({ json: { payments: [] } })
    );

    const paymentTab = page.getByRole('tab', { name: 'Payment history', exact: true });
    const paymentLibrary = page.locator('ccpay-payment-lib');
    const firstPayment = paymentLibrary.getByRole('row').filter({ hasText: MIGRATION_PAYMENT_REFERENCE });
    await paymentTab.click();
    await expect.soft(firstPayment, 'The first case must render a payment before checking isolation').toBeVisible();

    try {
      const quickFind = page.getByRole('textbox', { name: '16-digit case reference:', exact: true });
      await quickFind.fill(emptyCaseReference);
      await quickFind.press('Enter');
      await expect(page).toHaveURL(new RegExp(`/cases/case-details/(?:[^/]+/)*${emptyCaseReference}(?:[/?#]|$)`));
      await expect(page.getByRole('tabpanel', { name: /^Case summary(?:,|$)/ })).toContainText(emptyCaseReference);
      await paymentTab.click();
      await expect.soft
        .poll(() => requestedEmptyPayments, { message: 'The second case must request its own payment groups', timeout: 5000 })
        .toBe(true);
      expect.soft(await firstPayment.count(), 'The previous payment must not appear while the second case is loading').toBe(0);
    } finally {
      releaseEmptyPayments();
    }
    await expect(
      paymentLibrary.getByText(/no payments recorded/i),
      'The second case must render its own empty state'
    ).toBeVisible();
    await expect(firstPayment).toHaveCount(0);
    await expect(paymentLibrary.getByRole('link', { name: 'Review', exact: true })).toHaveCount(0);
  });

  test('keeps the beta banner to Case record gap within the desktop baseline', async ({ page }, testInfo) => {
    const banner = page.locator('.govuk-phase-banner');
    const heading = page.getByRole('heading', {
      name: 'Case record',
      exact: true,
    });
    await expect(banner).toBeVisible();
    await expect(heading).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const bannerBox = await banner.boundingBox();
    const headingBox = await heading.boundingBox();
    expect(bannerBox).not.toBeNull();
    expect(headingBox).not.toBeNull();
    const metrics = {
      viewport: page.viewportSize(),
      banner: bannerBox,
      heading: headingBox,
      gapPixels: headingBox!.y - (bannerBox!.y + bannerBox!.height),
    };
    await testInfo.attach('case-record-spacing', {
      body: JSON.stringify(metrics, null, 2),
      contentType: 'application/json',
    });
    await testInfo.attach('case-record-layout', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
    // The 1280 × 800 baseline is 47px. Allow subpixel rounding.
    expect(metrics.gapPixels, 'Beta banner to Case record gap should match the desktop baseline').toBeCloseTo(47, 0);
  });
});
