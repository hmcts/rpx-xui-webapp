import { expect, test } from '../../../E2E/fixtures';
import { applyPrewarmedSessionCookies, CHALLENGED_ACCESS_PATH, setupChallengedAccessMockRoutes } from '../../helpers';

const userIdentifier = 'STAFF_ADMIN';
const linkedCaseReason = 'The cases or parties are linked to the case I am working on';
const otherReason = 'Other reason';

test.beforeEach(async ({ page }) => {
  await applyPrewarmedSessionCookies(page, userIdentifier);
});

test.describe(
  `Challenged Access Request negative paths as ${userIdentifier}`,
  { tag: ['@integration', '@integration-access-requests'] },
  () => {
    test('User cannot submit challenged access request without selecting a reason', async ({ page }) => {
      await setupChallengedAccessMockRoutes(page);
      await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

      await page.getByRole('button', { name: 'Submit' }).click();

      await expect(page.locator('.govuk-error-message').filter({ hasText: 'Select a reason' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Why do you need to access this case?' })).toBeVisible();
    });

    test('User cannot submit challenged access request without a linked case reference', async ({ page }) => {
      await setupChallengedAccessMockRoutes(page);
      await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

      await page.getByLabel(linkedCaseReason).check();
      await page.getByRole('button', { name: 'Submit' }).click();

      await expect(page.locator('.govuk-error-message').filter({ hasText: 'Enter a case reference' })).toBeVisible();
    });

    test('User cannot submit challenged access request without required input for other reason', async ({ page }) => {
      await setupChallengedAccessMockRoutes(page);
      await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

      await page.getByLabel(otherReason).check();
      await page.getByRole('button', { name: 'Submit' }).click();

      await expect(page.locator('.govuk-error-message').filter({ hasText: 'Enter a reason' })).toBeVisible();
    });

    test('Submit failures keep the user on the challenged access form', async ({ page }) => {
      await setupChallengedAccessMockRoutes(page, {
        challengedAccessStatus: 500,
        challengedAccessBody: { message: 'challenged access failed' },
      });
      await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

      await page.getByLabel(otherReason).check();
      await page.locator('#other-reason').fill('Need access for urgent case progression review.');

      const failureResponse = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes('/api/challenged-access-request') &&
          response.status() === 500
      );

      await page.getByRole('button', { name: 'Submit' }).click();

      await failureResponse;
      await expect(page).toHaveURL(new RegExp(`${CHALLENGED_ACCESS_PATH}$`));
      await expect(page.getByRole('heading', { name: 'Why do you need to access this case?' })).toBeVisible();
    });
  }
);
