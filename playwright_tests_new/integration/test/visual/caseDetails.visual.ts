import { expect, test } from '@playwright/test';
import { openMigrationCase } from '../../helpers/govukMigrationMockRoutes.helper';
import { CASE_VIEWER_CASE_REFERENCE } from '../../mocks/caseViewer.mock';
import { MIGRATION_PAYMENT_REFERENCE } from '../../mocks/govukMigration.mock';

test.beforeEach(async ({ page, baseURL }) => {
  if (!baseURL) throw new Error('The Case Details visual tests require a base URL');
  await openMigrationCase(page, baseURL);
});

test('payments component renders a populated payment and its review control', async ({ page }, testInfo) => {
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
  await page.evaluate(() => document.fonts.ready);
  await testInfo.attach('payments-panel', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});

test('shows the eligible Payments empty state without a Review control', async ({ page }) => {
  await page.route(`**/cases/${CASE_VIEWER_CASE_REFERENCE}/paymentgroups*`, (route) =>
    route.fulfill({ json: { payment_groups: [] } })
  );
  await page.getByRole('tab', { name: 'Payment history', exact: true }).click();
  const paymentLibrary = page.locator('ccpay-payment-lib');
  await expect(paymentLibrary.getByText(/no payments recorded/i)).toBeVisible();
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
