import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';

let sessionCookies: any[] = [];

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  const userId = extractUserIdFromCookies(sessionCookies);
});

const errorStates = [400, 401, 403, 404, 500, 502, 503];
const userIdentifier = 'STAFF_ADMIN';
test.describe(`Available Task List as ${userIdentifier}`, () => {
  errorStates.forEach((errorStatus) => {
    test(`User ${userIdentifier} sees the no tasks message if the api returns ${errorStatus}`, async ({ taskListPage, page }) => {
      const emptyMockResponse = {};
      await test.step('Setup route mock for empty task list', async () => {
        await page.route('**/workallocation/task*', async (route) => {
          const body = JSON.stringify(emptyMockResponse);
          await route.fulfill({ status: errorStatus, contentType: 'application/json', body });
        });
      });
      await test.step('Navigate to the my tasks list page', async () => {
        await taskListPage.goto();
        await expect(taskListPage.taskListTable).toBeVisible();
        await taskListPage.exuiSpinnerComponent.wait();
      });
      await test.step('Verify table shows no results for empty mock', async () => {
        expect(await taskListPage.taskListTable.textContent()).toContain('You have no assigned tasks.');
      });
    });
  });
});
