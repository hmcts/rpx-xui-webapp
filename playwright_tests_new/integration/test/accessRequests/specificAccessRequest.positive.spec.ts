import { expect, test } from '../../../E2E/fixtures';
import {
  ACCESS_REQUEST_CASE_DETAILS_PATH,
  ACCESS_REQUEST_CASE_ID,
  ACCESS_REQUEST_SERVICE_NAME,
  applySessionCookies,
  summaryRow,
  setupSpecificAccessRequestMockRoutes,
  SPECIFIC_ACCESS_PATH,
} from '../../helpers';

const userIdentifier = 'STAFF_ADMIN';
const specificAccessReason = 'Urgent linked case review required.';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`Specific Access Request as ${userIdentifier}`, { tag: ['@integration', '@integration-access-requests'] }, () => {
  test('User can open Specific Access Request from case details', async ({ page }) => {
    await setupSpecificAccessRequestMockRoutes(page);

    await page.goto(ACCESS_REQUEST_CASE_DETAILS_PATH, { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('Authorisation is needed to access this case')).toBeVisible();
    await expect(summaryRow(page, 'Service')).toContainText(ACCESS_REQUEST_SERVICE_NAME);
    await expect(summaryRow(page, 'Access')).toContainText('Specific');
    await expect(page.getByRole('button', { name: 'Request access' })).toBeVisible();

    await page.getByRole('button', { name: 'Request access' }).click();

    await expect(page).toHaveURL(new RegExp(`${SPECIFIC_ACCESS_PATH}$`));
    await expect(page.locator('ccd-case-specific-access-request')).toBeVisible();
    await expect(page.locator('#specific-reason')).toBeVisible();
  });

  test('User can submit a specific access request and reach the success page', async ({ page }) => {
    await setupSpecificAccessRequestMockRoutes(page);
    await page.goto(SPECIFIC_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

    await page.locator('#specific-reason').fill(specificAccessReason);

    const requestPromise = page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().match(/\/api\/specific-access-request(?:\?|$)/) !== null
    );

    await page.getByRole('button', { name: 'Submit' }).click();

    const payload = (await requestPromise).postDataJSON() as Record<string, any>;

    await expect(page.locator('ccd-case-specific-access-success')).toBeVisible();
    await expect(page.getByText(ACCESS_REQUEST_CASE_ID)).toBeVisible();
    expect(payload.roleRequest?.process).toBe('specific-access');
    expect(payload.requestedRoles?.[0]?.roleName).toBe('specific-access-requested');
    expect(payload.requestedRoles?.[0]?.attributes?.caseId).toBe(ACCESS_REQUEST_CASE_ID);
    expect(payload.requestedRoles?.[0]?.notes?.[0]?.comment).toContain(specificAccessReason);
  });
});
