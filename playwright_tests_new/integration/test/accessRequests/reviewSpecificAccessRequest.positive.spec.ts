import { expect, test } from '../../../E2E/fixtures';
import { formatCaseNumberWithDashes } from '../../../E2E/utils/validator.utils';
import {
  ACCESS_REQUEST_CASE_ID,
  ACCESS_REQUEST_CASE_NAME,
  ACCESS_REQUEST_REASON,
  ACCESS_REQUEST_REQUESTER_ID,
  ACCESS_REQUEST_REQUESTED_ROLE,
  ACCESS_REQUEST_REVIEW_PATH,
  ACCESS_REQUEST_TASK_ID,
  applyPrewarmedSessionCookies,
  setupReviewSpecificAccessMockRoutes,
} from '../../helpers';

const userIdentifier = 'STAFF_ADMIN';

test.beforeEach(async ({ page }) => {
  await applyPrewarmedSessionCookies(page, userIdentifier);
});

test.describe(
  `Review Specific Access Request as ${userIdentifier}`,
  { tag: ['@integration', '@integration-access-requests'] },
  () => {
    test('User can open Review Specific Access Request from a task and see request details', async ({ page }) => {
      await setupReviewSpecificAccessMockRoutes(page);

      await page.goto(ACCESS_REQUEST_REVIEW_PATH, { waitUntil: 'domcontentloaded' });

      await expect(page.getByRole('heading', { name: 'Review specific access request' })).toBeVisible();
      await expect(page.getByText(ACCESS_REQUEST_CASE_NAME)).toBeVisible();
      await expect(page.getByText(formatCaseNumberWithDashes(ACCESS_REQUEST_CASE_ID))).toBeVisible();
      await expect(page.getByText('Alice Example')).toBeVisible();
      await expect(page.getByText(ACCESS_REQUEST_REASON)).toBeVisible();
    });

    test('User sees the correct fields for each access duration option', async ({ page }) => {
      await setupReviewSpecificAccessMockRoutes(page);
      await page.goto(ACCESS_REQUEST_REVIEW_PATH, { waitUntil: 'domcontentloaded' });

      await page.getByLabel('Approve request').check();
      await page.getByRole('button', { name: 'Continue' }).click();

      const accessStarts = page.locator('legend', { hasText: 'Access Starts' });
      const accessEnds = page.getByText('Access Ends', { exact: true });

      await expect(page.getByRole('heading', { name: 'How long do you want to give access to this case for?' })).toBeVisible();

      await page.getByLabel('7 days').check();
      await expect(accessStarts).toBeHidden();
      await expect(accessEnds).toBeHidden();

      await page.getByLabel('Indefinite').check();
      await expect(accessStarts).toBeHidden();
      await expect(accessEnds).toBeHidden();

      await page.getByLabel('Another period').check();
      await expect(accessStarts).toBeVisible();
      await expect(accessEnds).toBeVisible();
    });

    test('User can approve a specific access request and reach the success page', async ({ page }) => {
      await setupReviewSpecificAccessMockRoutes(page);
      await page.goto(ACCESS_REQUEST_REVIEW_PATH, { waitUntil: 'domcontentloaded' });

      await page.getByLabel('Approve request').check();
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.getByRole('heading', { name: 'How long do you want to give access to this case for?' })).toBeVisible();
      await page.getByLabel('7 days').check();

      const approvalRequestPromise = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes('/api/am/specific-access-approval')
      );

      await page.getByRole('button', { name: 'Submit' }).click();

      const approvalPayload = approvalRequestPromise.then((request) => request.postDataJSON() as Record<string, any>);
      await expect(page.getByRole('heading', { name: 'Access approved' })).toBeVisible();

      await expect
        .poll(async () => {
          const payload = await approvalPayload;
          return payload.specificAccessStateData.caseId;
        })
        .toBe(ACCESS_REQUEST_CASE_ID);

      const payload = await approvalPayload;
      expect(payload.specificAccessStateData.taskId).toBe(ACCESS_REQUEST_TASK_ID);
      expect(payload.specificAccessStateData.requestId).toBeDefined();
      expect(payload.specificAccessStateData.assigneeId ?? payload.specificAccessStateData.actorId).toBe(
        ACCESS_REQUEST_REQUESTER_ID
      );
      expect(payload.specificAccessStateData.requestedRole).toBe(ACCESS_REQUEST_REQUESTED_ROLE);
      expect(payload.period.startDate).toBeTruthy();
      expect(payload.period.endDate).toBeTruthy();
    });

    test('User can approve a specific access request for another period and submit the selected end date', async ({ page }) => {
      await setupReviewSpecificAccessMockRoutes(page);
      await page.goto(ACCESS_REQUEST_REVIEW_PATH, { waitUntil: 'domcontentloaded' });

      await page.getByLabel('Approve request').check();
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.getByRole('heading', { name: 'How long do you want to give access to this case for?' })).toBeVisible();
      await page.getByLabel('Another period').check();
      await page.locator('#endDate-day').fill('15');
      await page.locator('#endDate-month').fill('7');
      await page.locator('#endDate-year').fill('2035');
      await expect(page.getByText('Invalid End date')).toBeHidden();

      const approvalRequestPromise = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes('/api/am/specific-access-approval')
      );

      await page.getByRole('button', { name: 'Submit' }).click();

      const payload = (await approvalRequestPromise).postDataJSON() as Record<string, any>;
      const startDate = new Date(payload.period.startDate);
      const endDate = new Date(payload.period.endDate);

      await expect(page.getByRole('heading', { name: 'Access approved' })).toBeVisible();
      expect(payload.specificAccessStateData.caseId).toBe(ACCESS_REQUEST_CASE_ID);
      expect(payload.specificAccessStateData.taskId).toBe(ACCESS_REQUEST_TASK_ID);
      expect(payload.specificAccessStateData.requestedRole).toBe(ACCESS_REQUEST_REQUESTED_ROLE);
      expect(Number.isNaN(startDate.getTime())).toBeFalsy();
      expect(Number.isNaN(endDate.getTime())).toBeFalsy();
      expect(endDate.getUTCFullYear()).toBe(2035);
      expect(endDate.getUTCMonth()).toBe(6);
      expect(endDate.getUTCDate()).toBe(15);
      expect(endDate.getTime()).toBeGreaterThan(startDate.getTime());
    });

    test('User can choose Request more information and complete that path', async ({ page }) => {
      await setupReviewSpecificAccessMockRoutes(page);
      await page.goto(ACCESS_REQUEST_REVIEW_PATH, { waitUntil: 'domcontentloaded' });

      await page.getByLabel('Request more information').check();
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.getByRole('heading', { name: 'Request more information' })).toBeVisible();
      await page.locator('#more-detail').fill('Please provide the linked application details.');

      const requestMoreInformationPromise = page.waitForRequest(
        (request) =>
          request.method() === 'POST' && request.url().includes('/api/specific-access-request/request-more-information')
      );

      await page.getByRole('button', { name: 'Continue' }).click();

      const payload = ((await requestMoreInformationPromise).postDataJSON() ?? {}) as Record<string, any>;
      await expect(page.getByRole('heading', { name: 'Request for access denied' })).toBeVisible();
      expect(payload.caseId).toBe(ACCESS_REQUEST_CASE_ID);
      expect(payload.taskId).toBe(ACCESS_REQUEST_TASK_ID);
      expect(payload.specificAccessReason).toBe(ACCESS_REQUEST_REASON);
      expect(payload.comment).toBe('Please provide the linked application details.');
    });
  }
);
