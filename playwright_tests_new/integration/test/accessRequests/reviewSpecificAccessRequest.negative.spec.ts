import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, ACCESS_REQUEST_REVIEW_PATH, setupReviewSpecificAccessMockRoutes } from '../../helpers';

const userIdentifier = 'STAFF_ADMIN';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(
  `Review Specific Access Request negative paths as ${userIdentifier}`,
  { tag: ['@integration', '@integration-access-requests'] },
  () => {
    test('User cannot continue review flow without selecting an action', async ({ accessRequestPage, page }) => {
      await setupReviewSpecificAccessMockRoutes(page);
      await page.goto(ACCESS_REQUEST_REVIEW_PATH, { waitUntil: 'domcontentloaded' });

      await accessRequestPage.continueButton.click();

      await expect(accessRequestPage.errorMessage('Please select an option')).toBeVisible();
      await expect(accessRequestPage.reviewSpecificHeading).toBeVisible();
    });

    test('Review flow shows the service down page when task data cannot be loaded', async ({ page }) => {
      await setupReviewSpecificAccessMockRoutes(page, { taskStatus: 500, taskBody: { message: 'task load failed' } });

      await page.goto(ACCESS_REQUEST_REVIEW_PATH, { waitUntil: 'domcontentloaded' });

      await page.waitForURL(/\/service-down$/);
    });

    test('Approve submit failures show the service down page', async ({ accessRequestPage, page }) => {
      await setupReviewSpecificAccessMockRoutes(page, { approvalStatus: 500, approvalBody: { message: 'approval failed' } });
      await page.goto(ACCESS_REQUEST_REVIEW_PATH, { waitUntil: 'domcontentloaded' });

      await accessRequestPage.approveRequestRadio.check();
      await accessRequestPage.continueButton.click();
      await accessRequestPage.sevenDaysRadio.check();
      await accessRequestPage.submitButton.click();

      await page.waitForURL(/\/service-down$/);
    });

    test('Request more information submit failures show the service down page', async ({ accessRequestPage, page }) => {
      await setupReviewSpecificAccessMockRoutes(page, {
        requestMoreInformationStatus: 500,
        requestMoreInformationBody: { message: 'request more info failed' },
      });
      await page.goto(ACCESS_REQUEST_REVIEW_PATH, { waitUntil: 'domcontentloaded' });

      await accessRequestPage.requestMoreInformationRadio.check();
      await accessRequestPage.continueButton.click();
      await accessRequestPage.reviewMoreDetailInput.fill('Need more evidence for the request.');
      await accessRequestPage.continueButton.click();

      await page.waitForURL(/\/service-down$/);
    });
  }
);
