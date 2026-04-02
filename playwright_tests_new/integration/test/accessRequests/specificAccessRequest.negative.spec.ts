import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupSpecificAccessRequestMockRoutes, SPECIFIC_ACCESS_PATH } from '../../helpers';

const userIdentifier = 'STAFF_ADMIN';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(
  `Specific Access Request negative paths as ${userIdentifier}`,
  { tag: ['@integration', '@integration-access-requests'] },
  () => {
    test('User cannot submit a specific access request without a reason', async ({ page }) => {
      await setupSpecificAccessRequestMockRoutes(page);
      await page.goto(SPECIFIC_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

      await page.getByRole('button', { name: 'Submit' }).click();

      await expect(page.locator('.govuk-error-message').filter({ hasText: 'Enter a reason' })).toBeVisible();
      await expect(page.locator('#specific-reason')).toBeVisible();
    });

    test('Specific access request submit failures keep the user on the request form', async ({ page }) => {
      await setupSpecificAccessRequestMockRoutes(page, {
        specificAccessStatus: 500,
        specificAccessBody: { message: 'specific access request failed' },
      });
      await page.goto(SPECIFIC_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

      await page.locator('#specific-reason').fill('Urgent linked hearing preparation required.');

      const failureResponse = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes('/api/specific-access-request') &&
          response.status() === 500
      );

      await page.getByRole('button', { name: 'Submit' }).click();

      await failureResponse;
      await expect(page).toHaveURL(new RegExp(`${SPECIFIC_ACCESS_PATH}$`));
      await expect(page.locator('ccd-case-specific-access-request')).toBeVisible();
    });
  }
);
