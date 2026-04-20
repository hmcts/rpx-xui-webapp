import { faker } from '@faker-js/faker';
import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';
import { buildAsylumCaseMock } from '../../../mocks/cases/asylumCase.mock';

const userIdentifier = 'STAFF_ADMIN';
const caseId = faker.number.int({ min: 1000000000, max: 9999999999 }).toString();
let assigneeId: string | null = null;
const caseMockResponse = buildAsylumCaseMock({ caseId });

test.beforeEach(async ({ page }) => {
  assigneeId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
  await page.route(`**data/internal/cases/${caseId}*`, async (route) => {
    const body = JSON.stringify(caseMockResponse);
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });

  await page.route(`**/workallocation/caseworker/getUsersByServiceName*`, async (route) => {
    const body = JSON.stringify([
      {
        email: 'test@example.com',
        firstName: 'Test',
        idamId: assigneeId,
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

test.describe(`User ${userIdentifier} can see assigned tasks on a case`, () => {
  test(`An empty task response shows an empty task list`, async ({ caseDetailsPage, page }) => {
    await test.step('Setup route mock for an empty task details', async () => {
      await page.route(`**workallocation/case/task/${caseId}*`, async (route) => {
        const body = JSON.stringify([]);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Navigate to mocked case task list', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${caseId}/tasks`);
      await caseDetailsPage.taskListContainer.waitFor();
      await caseDetailsPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify the task table shows no results', async () => {
      expect(await caseDetailsPage.taskItem.count()).toBe(0);
    });
  });

  // EXUI-4276 - is currently the reason this test is skipped. The test is still valid and should be re-enabled once the underlying issue is resolved.
  test.skip(`Sending an malformed API response for the task data should render the UI gracefully`, async ({
    caseDetailsPage,
    page,
  }) => {
    const malformedTaskData: unknown = [
      {
        id: 12345,
        case_id: caseMockResponse.case_id,
        task_title: null,
        task_state: { value: 'assigned' },
        type: ['followUpExtendedDirection'],
        description: { markdown: 'This should be a plain string description' },
        due_date: 'not-a-date',
        dueDate: { value: 'tomorrow' },
        assignee: { idamId: assigneeId },
        actions: 'claim',
      },
    ];

    await test.step('Setup route mock for task details', async () => {
      await page.route(`**workallocation/case/task/${caseId}*`, async (route) => {
        const body = JSON.stringify(malformedTaskData);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Navigate to mocked case task list', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${caseId}/tasks`);
      await caseDetailsPage.taskListContainer.waitFor();
      await caseDetailsPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify malformed task data is handled gracefully', async () => {
      await expect(caseDetailsPage.taskListContainer).toBeVisible();
      expect(await caseDetailsPage.taskItem.count()).toBe(0);
    });
  });

  const errorCodes = [400];
  errorCodes.forEach((code) => {
    test(`The UI shows the following when the task API returns ${code}`, async ({ caseDetailsPage, page }) => {
      await test.step('Setup route mock for priority label tasks', async () => {
        await page.route(`**workallocation/case/task/${caseId}*`, async (route) => {
          const body = JSON.stringify({ message: `force error ${code}` });
          await route.fulfill({ status: code, contentType: 'application/json', body });
        });
      });

      await test.step('Navigate to mocked case task list', async () => {
        await page.goto(`/cases/case-details/IA/Asylum/${caseId}/tasks`);
        await caseDetailsPage.taskListContainer.waitFor();
      });

      await test.step('Verify the expected priority labels are shown', async () => {
        expect(await caseDetailsPage.taskItem.count()).toBe(0);
      });
    });
  });
});
