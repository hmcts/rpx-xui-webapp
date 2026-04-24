import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, CHALLENGED_ACCESS_PATH, setupChallengedAccessMockRoutes } from '../../helpers';

const userIdentifier = 'STAFF_ADMIN';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(
  `Challenged Access Request negative paths as ${userIdentifier}`,
  { tag: ['@integration', '@integration-access-requests'] },
  () => {
    test('User cannot submit challenged access request without selecting a reason', async ({ accessRequestPage, page }) => {
      await setupChallengedAccessMockRoutes(page);
      await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

      await accessRequestPage.submitButton.click();

      await expect(accessRequestPage.errorMessage('Select a reason')).toBeVisible();
      await expect(accessRequestPage.challengedAccessHeading).toBeVisible();
    });

    test('User cannot submit challenged access request without a linked case reference', async ({ accessRequestPage, page }) => {
      await setupChallengedAccessMockRoutes(page);
      await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

      await accessRequestPage.linkedCaseReasonRadio.check();
      await accessRequestPage.submitButton.click();

      await expect(accessRequestPage.errorMessage('Enter a case reference')).toBeVisible();
    });

    test('User cannot submit challenged access request without required input for other reason', async ({
      accessRequestPage,
      page,
    }) => {
      await setupChallengedAccessMockRoutes(page);
      await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

      await accessRequestPage.otherReasonRadio.check();
      await accessRequestPage.submitButton.click();

      await expect(accessRequestPage.errorMessage('Enter a reason')).toBeVisible();
    });

    test('Submit failures keep the user on the challenged access form', async ({ accessRequestPage, page }) => {
      await setupChallengedAccessMockRoutes(page, {
        challengedAccessStatus: 500,
        challengedAccessBody: { message: 'challenged access failed' },
      });
      await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

      await accessRequestPage.otherReasonRadio.check();
      await accessRequestPage.challengedOtherReasonInput.fill('Need access for urgent case progression review.');

      const failureResponse = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes('/api/challenged-access-request') &&
          response.status() === 500
      );

      await accessRequestPage.submitButton.click();

      await failureResponse;
      await expect(page).toHaveURL(new RegExp(`${CHALLENGED_ACCESS_PATH}$`));
      await expect(accessRequestPage.challengedAccessHeading).toBeVisible();
    });
  }
);
