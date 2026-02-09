import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { buildMyTaskListMock } from '../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';
import { logTaskCancellationAssertion } from '../../utils/taskCancellationAssertionLogger';

const userIdentifier = 'STAFF_ADMIN';
const taskId = '22222222-2222-2222-2222-222222222222';

const cancellationMatrix = [
  {
    scenario: 'PRIVATELAW / PRLAPPS',
    jurisdiction: 'PRIVATELAW',
    caseTypeId: 'PRLAPPS',
    caseId: '1770285290104655',
    caseName: 'PRL Manual Cancellation Test Case',
  },
  {
    scenario: 'PUBLICLAW / CARE_SUPERVISION_EPO',
    jurisdiction: 'PUBLICLAW',
    caseTypeId: 'CARE_SUPERVISION_EPO',
    caseId: '1770133055796879',
    caseName: 'Public Law Manual Cancellation Test Case',
  },
] as const;

test.describe(`Task cancellation integration as ${userIdentifier}`, () => {
  for (const matrixItem of cancellationMatrix) {
    test(`Cancel task sends expected request for ${matrixItem.scenario}`, async ({ taskListPage, page }, testInfo) => {
      const { cookies } = await applySessionCookies(page, userIdentifier);
      const userId = extractUserIdFromCookies(cookies) || 'test-user-id';

      const taskListMockResponse = buildMyTaskListMock(1, userId);
      const task = {
        ...taskListMockResponse.tasks[0],
        id: taskId,
        case_id: matrixItem.caseId,
        case_name: matrixItem.caseName,
        case_type_id: matrixItem.caseTypeId,
        jurisdiction: matrixItem.jurisdiction,
        task_title: 'Send to gatekeeper',
        assignee: userId,
      };

      const taskSearchPath = /\/workallocation\/task(?:\?.*)?$/;
      let cancelRequestUrl = '';
      let cancelRequestBody: Record<string, unknown> | null = null;

      await page.route(taskSearchPath, async (route) => {
        if (route.request().method() !== 'POST') {
          await route.fallback();
          return;
        }

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ ...taskListMockResponse, tasks: [task], total_records: 1 }),
        });
      });

      await page.route(`**/workallocation/task/${taskId}/roles`, async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
      });

      await page.route(`**/workallocation/task/${taskId}`, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ task }),
        });
      });

      await page.route('**/workallocation/caseworker/getUsersByServiceName', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
      });

      await page.route(`**/workallocation/task/${taskId}/cancel*`, async (route) => {
        cancelRequestUrl = route.request().url();
        cancelRequestBody = route.request().postDataJSON();

        await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
      });

      await test.step('Navigate to My Work and open cancel action', async () => {
        await taskListPage.goto();
        await expect(taskListPage.taskListTable).toBeVisible();
        await taskListPage.exuiSpinnerComponent.wait();

        await expect(taskListPage.taskListTable).toContainText(matrixItem.caseName);

        await taskListPage.manageCaseButtons.first().click();
        await expect(taskListPage.taskActionCancel.first()).toBeVisible();
        await taskListPage.taskActionCancel.first().click();
      });

      await test.step('Confirm cancellation and verify request payload', async () => {
        await page.getByRole('button', { name: 'Cancel task' }).click();

        await expect
          .poll(() => cancelRequestUrl, { timeout: 30000, message: 'Cancel request was not captured' })
          .toContain(`/workallocation/task/${taskId}/cancel`);

        await expect.poll(() => cancelRequestBody).not.toBeNull();

        const parsedUrl = new URL(cancelRequestUrl);
        const expectedPayload = { hasNoAssigneeOnComplete: false };
        const expectedBrowserRequestPath = `/workallocation/task/${taskId}/cancel`;
        const actualBrowserRequestPath = `${parsedUrl.pathname}${parsedUrl.search}`;
        const assertionSummary = logTaskCancellationAssertion({
          scenario: matrixItem.scenario,
          expectedPath: expectedBrowserRequestPath,
          actualPath: actualBrowserRequestPath,
          hasCancellationProcessQuery: parsedUrl.searchParams.has('cancellation_process'),
          hasCompletionProcessQuery: parsedUrl.searchParams.has('completion_process'),
          expectedPayload,
          actualPayload: cancelRequestBody,
        });

        await testInfo.attach('EXUI-3662-browser-request-expected-vs-actual.json', {
          body: JSON.stringify(
            {
              note: 'Browser -> ExUI API request validation for manual cancellation path',
              expectation: {
                path: expectedBrowserRequestPath,
                queryMustInclude: [],
                queryMustExclude: ['cancellation_process', 'completion_process'],
                payload: expectedPayload,
              },
              actual: {
                path: actualBrowserRequestPath,
                hasCancellationProcessQuery: parsedUrl.searchParams.has('cancellation_process'),
                hasCompletionProcessQuery: parsedUrl.searchParams.has('completion_process'),
                payload: cancelRequestBody,
              },
              assertions: assertionSummary,
            },
            null,
            2
          ),
          contentType: 'application/json',
        });

        expect(
          parsedUrl.searchParams.has('cancellation_process'),
          `Expected browser cancel request ${expectedBrowserRequestPath} to omit "cancellation_process"; actual path=${actualBrowserRequestPath}`
        ).toBeFalsy();
        expect(
          parsedUrl.searchParams.has('completion_process'),
          `Expected browser cancel request ${expectedBrowserRequestPath} to omit "completion_process"; actual path=${actualBrowserRequestPath}`
        ).toBeFalsy();
        expect(
          cancelRequestBody,
          `Expected browser cancel payload ${JSON.stringify(expectedPayload)}; actual=${JSON.stringify(cancelRequestBody)}`
        ).toEqual(expectedPayload);
      });
    });
  }
});
