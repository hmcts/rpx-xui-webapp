import { expect, test } from '../../../E2E/fixtures';
import { applyPrewarmedSessionCookies, ACCESS_REQUEST_REVIEW_PATH, setupReviewSpecificAccessMockRoutes } from '../../helpers';

const userIdentifier = 'STAFF_ADMIN';

test.beforeEach(async ({ page }) => {
  await applyPrewarmedSessionCookies(page, userIdentifier);
});

test.describe(
  `Review Specific Access Request negative paths as ${userIdentifier}`,
  { tag: ['@integration', '@integration-access-requests'] },
  () => {
    test('User cannot continue review flow without selecting an action', async ({ page }) => {
      await setupReviewSpecificAccessMockRoutes(page);
      await page.goto(ACCESS_REQUEST_REVIEW_PATH, { waitUntil: 'domcontentloaded' });

      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('.govuk-error-message').filter({ hasText: 'Please select an option' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Review specific access request' })).toBeVisible();
    });

    test('Review flow shows the service down page when task data cannot be loaded', async ({ page }) => {
      await setupReviewSpecificAccessMockRoutes(page, { taskStatus: 500, taskBody: { message: 'task load failed' } });

      await page.goto(ACCESS_REQUEST_REVIEW_PATH, { waitUntil: 'domcontentloaded' });

      await page.waitForURL(/\/service-down$/);
    });

    test('Approve submit failures show the service down page', async ({ page }) => {
      await setupReviewSpecificAccessMockRoutes(page, { approvalStatus: 500, approvalBody: { message: 'approval failed' } });
      await page.goto(ACCESS_REQUEST_REVIEW_PATH, { waitUntil: 'domcontentloaded' });

      await page.getByLabel('Approve request').check();
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.getByLabel('7 days').check();
      await page.getByRole('button', { name: 'Submit' }).click();

      await page.waitForURL(/\/service-down$/);
    });

    test('Request more information submit failures show the service down page', async ({ page }) => {
      await setupReviewSpecificAccessMockRoutes(page, {
        requestMoreInformationStatus: 500,
        requestMoreInformationBody: { message: 'request more info failed' },
      });
      await page.goto(ACCESS_REQUEST_REVIEW_PATH, { waitUntil: 'domcontentloaded' });

      await page.getByLabel('Request more information').check();
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.locator('#more-detail').fill('Need more evidence for the request.');
      await page.getByRole('button', { name: 'Continue' }).click();

      await page.waitForURL(/\/service-down$/);
    });
  }
);
