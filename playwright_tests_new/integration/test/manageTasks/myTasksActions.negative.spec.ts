import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { buildTaskListMock, myActionsList } from '../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';
import { setupTaskActionEndpointMocks } from '../../helpers/taskActionApiMocks.helper';

const userIdentifier = 'STAFF_ADMIN';
const SERVICE_DOWN_URL_REGEX = /\/service-down/;
const SERVICE_DOWN_HEADING_TEXT = 'Sorry, there is a problem with the service';
let sessionCookies: any[] = [];
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  const userId = extractUserIdFromCookies(sessionCookies);
  taskListMockResponse = buildTaskListMock(160, userId?.toString() || '', myActionsList);
});

test.describe(`My Tasks Actions Negative as ${userIdentifier}`, () => {
  test(`User ${userIdentifier} sees service down when cancel endpoint returns 500`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mocks for list, action dependencies, and cancel 500 response', async () => {
      await page.route(/.*\/workallocation\/task(?:\?.*)?$/, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'cancel', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
      });

      await page.route(`**/workallocation/task/${firstTask.id}/cancel*`, async (route) => {
        if (route.request().method() !== 'POST') {
          await route.continue();
          return;
        }
        await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
      });
    });

    await test.step('Attempt cancel action and verify service down', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await taskListPage.taskActionCancel.click();
      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/cancel`));

      const cancelFailureResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/cancel`) &&
          response.status() === 500
      );

      await taskListPage.submitButton.click();
      const cancelFailureResponse = await cancelFailureResponsePromise;
      expect(cancelFailureResponse.status()).toBe(500);

      await expect(page).toHaveURL(SERVICE_DOWN_URL_REGEX);
      await expect(page.getByRole('heading', { level: 1, name: SERVICE_DOWN_HEADING_TEXT })).toBeVisible();
    });
  });

  test(`User ${userIdentifier} sees service down when complete endpoint returns 500`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mocks for list, action dependencies, and complete 500 response', async () => {
      await page.route(/.*\/workallocation\/task(?:\?.*)?$/, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'complete', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
      });

      await page.route(`**/workallocation/task/${firstTask.id}/complete*`, async (route) => {
        if (route.request().method() !== 'POST') {
          await route.continue();
          return;
        }
        await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
      });
    });

    await test.step('Attempt complete action and verify service down', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await taskListPage.taskActionMarkAsDone.click();
      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/complete`));

      const completeFailureResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/complete`) &&
          response.status() === 500
      );

      await taskListPage.submitButton.click();
      const completeFailureResponse = await completeFailureResponsePromise;
      expect(completeFailureResponse.status()).toBe(500);

      await expect(page).toHaveURL(SERVICE_DOWN_URL_REGEX);
      await expect(page.getByRole('heading', { level: 1, name: SERVICE_DOWN_HEADING_TEXT })).toBeVisible();
    });
  });

  test(`User ${userIdentifier} still reaches case details when go endpoint returns 500`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mocks for list, go dependencies, and case task 500 response', async () => {
      await page.route(/.*\/workallocation\/task(?:\?.*)?$/, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'go', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
      });

      await page.route(`**/workallocation/case/task/${firstTask.case_id}*`, async (route) => {
        if (route.request().method() !== 'POST') {
          await route.continue();
          return;
        }
        await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
      });

      await page.route(`**/data/internal/cases/${firstTask.case_id}*`, async (route) => {
        const body = JSON.stringify({
          case_id: firstTask.case_id,
          case_type: {
            id: firstTask.case_type_id,
            name: firstTask.case_type_id,
            jurisdiction: {
              id: firstTask.jurisdiction,
              name: firstTask.jurisdiction,
            },
          },
          tabs: [],
          triggers: [],
          events: [],
          channels: [],
          metadataFields: [],
          state: {
            id: 'CaseCreated',
            name: 'Case created',
          },
        });
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
        const body = JSON.stringify([
          {
            email: 'test@example.com',
            firstName: 'Test',
            idamId: firstTask.assignee,
            lastName: 'User',
            location: {
              id: 227101,
              locationName: 'Newport (South Wales) Immigration and Asylum Tribunal',
            },
            roleCategory: 'LEGAL_OPERATIONS',
            service: 'IA',
          },
        ]);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Attempt go action and verify service down', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await expect(taskListPage.taskActionGoTo).toBeVisible();

      const goFailureResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/case/task/${firstTask.case_id}`) &&
          response.status() === 500
      );

      await taskListPage.taskActionGoTo.click();
      const goFailureResponse = await goFailureResponsePromise;
      expect(goFailureResponse.status()).toBe(500);

      await expect(page).toHaveURL(/\/cases\/case-details\//);
      await expect(page.getByRole('heading', { name: 'Active tasks' })).toBeVisible();
    });
  });

  test(`User ${userIdentifier} sees service down when reassign resolver endpoint returns 500`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mocks for list, action dependencies, and task details 500 response', async () => {
      await page.route(/.*\/workallocation\/task(?:\?.*)?$/, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'reassign', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
      });

      await page.route(new RegExp(String.raw`/workallocation/task/${firstTask.id}(\?.*)?$`), async (route) => {
        if (route.request().method() !== 'GET') {
          await route.continue();
          return;
        }
        await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
      });
    });

    await test.step('Attempt reassign action and verify service down', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await expect(taskListPage.taskActionReassign).toBeVisible();

      const reassignFailureResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'GET' &&
          response.url().includes(`/workallocation/task/${firstTask.id}`) &&
          !response.url().includes('/roles') &&
          response.status() === 500
      );

      await taskListPage.taskActionReassign.click();
      const reassignFailureResponse = await reassignFailureResponsePromise;
      expect(reassignFailureResponse.status()).toBe(500);

      await expect(page).toHaveURL(SERVICE_DOWN_URL_REGEX);
      await expect(page.getByRole('heading', { level: 1, name: SERVICE_DOWN_HEADING_TEXT })).toBeVisible();
    });
  });

  test(`User ${userIdentifier} sees service down when unassign endpoint returns 500`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mocks for list, action dependencies, and unassign 500 response', async () => {
      await page.route(/.*\/workallocation\/task(?:\?.*)?$/, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'unassign', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
        unassignMode: 'unclaim',
      });

      await page.route(`**/workallocation/task/${firstTask.id}/unclaim*`, async (route) => {
        if (route.request().method() !== 'POST') {
          await route.continue();
          return;
        }
        await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
      });
    });

    await test.step('Attempt unassign action and verify service down', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await taskListPage.taskActionUnassign.click();
      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/unclaim`));

      const unassignFailureResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/unclaim`) &&
          response.status() === 500
      );

      await taskListPage.submitButton.click();
      const unassignFailureResponse = await unassignFailureResponsePromise;
      expect(unassignFailureResponse.status()).toBe(500);

      await expect(page).toHaveURL(SERVICE_DOWN_URL_REGEX);
      await expect(page.getByRole('heading', { level: 1, name: SERVICE_DOWN_HEADING_TEXT })).toBeVisible();
    });
  });
});
