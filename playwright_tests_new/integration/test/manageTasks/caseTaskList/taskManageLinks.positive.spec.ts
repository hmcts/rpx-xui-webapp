import type { Page } from '@playwright/test';
import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';
import { buildCaseDetailsTasksFromParams, type TaskDetailsParams } from '../../../mocks/caseDetailsTasks.builder';
import { buildAsylumCaseMock } from '../../../mocks/cases/asylumCase.mock';
import { setupTaskActionEndpointMocks } from '../../../helpers/taskActionApiMocks.helper';

const userIdentifier = 'STAFF_ADMIN';
const caseId = '1617708245335311';
const claimTaskId = 'f782bde3-8d51-11eb-a9a4-06d032acc761';
const managedTaskId = 'f782bde3-8d51-11eb-a9a4-06d032acc762';
const claimTaskTitle = 'Assign to me from case details';
const managedTaskTitle = 'Reassign and unassign from case details';
const taskDueDate = '2030-05-20T12:00:00.000Z';
const caseMockResponse = buildAsylumCaseMock({ caseId });
const baseLocation = {
  id: 231596,
  locationName: 'Taylor House',
  services: ['IA'],
};

type CaseworkerLookupPerson = {
  email: string;
  firstName: string;
  idamId: string;
  lastName: string;
  location: typeof baseLocation;
  roleCategory: 'LEGAL_OPERATIONS';
  service: 'IA';
};

type CaseTaskState = {
  claimTaskAssigneeId?: string;
  managedTaskAssigneeId?: string;
};

const buildCaseworkers = (
  currentUserId: string
): {
  currentUser: CaseworkerLookupPerson;
  existingAssignee: CaseworkerLookupPerson;
  replacementAssignee: CaseworkerLookupPerson;
  all: CaseworkerLookupPerson[];
} => {
  const currentUser = {
    email: 'current.caseworker@example.com',
    firstName: 'Current',
    idamId: currentUserId,
    lastName: 'Caseworker',
    location: baseLocation,
    roleCategory: 'LEGAL_OPERATIONS' as const,
    service: 'IA' as const,
  };

  const existingAssignee = {
    email: 'existing.caseworker@example.com',
    firstName: 'Existing',
    idamId: 'existing-caseworker-1',
    lastName: 'Caseworker',
    location: baseLocation,
    roleCategory: 'LEGAL_OPERATIONS' as const,
    service: 'IA' as const,
  };

  const replacementAssignee = {
    email: 'replacement.caseworker@example.com',
    firstName: 'Replacement',
    idamId: 'replacement-caseworker-1',
    lastName: 'Caseworker',
    location: baseLocation,
    roleCategory: 'LEGAL_OPERATIONS' as const,
    service: 'IA' as const,
  };

  return {
    currentUser,
    existingAssignee,
    replacementAssignee,
    all: [replacementAssignee, currentUser, existingAssignee],
  };
};

const buildCaseTaskRows = (state: CaseTaskState): TaskDetailsParams[] => {
  const claimTaskActions = state.claimTaskAssigneeId
    ? [{ id: 'unclaim', title: 'Unassign task' }]
    : [{ id: 'claim', title: 'Assign to me' }];
  const managedTaskActions = state.managedTaskAssigneeId
    ? [
        { id: 'reassign', title: 'Reassign task' },
        { id: 'unclaim', title: 'Unassign task' },
      ]
    : [{ id: 'claim', title: 'Assign to me' }];

  return [
    {
      id: claimTaskId,
      title: claimTaskTitle,
      state: state.claimTaskAssigneeId ? 'assigned' : 'unassigned',
      dueDate: taskDueDate,
      priorityDate: taskDueDate,
      locationName: 'Taylor House',
      location: '765324',
      jurisdiction: 'IA',
      caseTypeId: 'Asylum',
      caseId,
      caseCategory: 'Protection',
      caseName: 'Bob Smith',
      description: 'Claim this task to continue processing the case.',
      assignee: state.claimTaskAssigneeId ?? '',
      actions: claimTaskActions,
    },
    {
      id: managedTaskId,
      title: managedTaskTitle,
      state: state.managedTaskAssigneeId ? 'assigned' : 'unassigned',
      dueDate: taskDueDate,
      priorityDate: taskDueDate,
      locationName: 'Taylor House',
      location: '765324',
      jurisdiction: 'IA',
      caseTypeId: 'Asylum',
      caseId,
      caseCategory: 'Protection',
      caseName: 'Bob Smith',
      description: 'Manage this task from the case details Tasks tab.',
      assignee: state.managedTaskAssigneeId ?? '',
      actions: managedTaskActions,
    },
  ];
};

const buildCaseTasksResponse = (state: CaseTaskState) =>
  buildCaseDetailsTasksFromParams({ caseId, tasks: buildCaseTaskRows(state) });

const getTaskRecordByTitle = (rows: Record<string, string>[], title: string) => {
  return rows.find((row) => row['Title']?.includes(title));
};

async function openCaseDetailsTasksTab(
  page: Page,
  caseDetailsPage: {
    selectCaseDetailsTab: (tabName: string) => Promise<void>;
    taskListContainer: { waitFor: () => Promise<void> };
  }
) {
  await page.goto(`/cases/case-details/IA/Asylum/${caseId}`);
  await caseDetailsPage.selectCaseDetailsTab('Tasks');
  await caseDetailsPage.taskListContainer.waitFor();
}

async function setupCaseDetailsTaskRoutes(page: Page, state: CaseTaskState, caseworkers: CaseworkerLookupPerson[]) {
  await page.route(`**/data/internal/cases/${caseId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(caseMockResponse),
    });
  });

  await page.route(`**/workallocation/case/task/${caseId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(buildCaseTasksResponse(state)),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(caseworkers),
    });
  });
}

test.describe(
  `Case details task manage links as ${userIdentifier}`,
  { tag: ['@integration', '@integration-manage-tasks'] },
  () => {
    test('assigns an unassigned case task to the current user and refreshes the task card', async ({ caseDetailsPage, page }) => {
      const currentUserId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
      const people = buildCaseworkers(currentUserId);
      const taskState: CaseTaskState = {
        managedTaskAssigneeId: people.existingAssignee.idamId,
      };
      let claimRequestBody: unknown;

      await test.step('Setup case details task routes with a claimable task', async () => {
        await setupCaseDetailsTaskRoutes(page, taskState, people.all);

        await page.route(`**/workallocation/task/${claimTaskId}/claim*`, async (route) => {
          const request = route.request();
          if (request.method() !== 'POST') {
            await route.continue();
            return;
          }

          claimRequestBody = request.postDataJSON();
          taskState.claimTaskAssigneeId = currentUserId;

          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({}),
          });
        });
      });

      await test.step('Open the case tasks tab and verify the claim link is shown', async () => {
        await openCaseDetailsTasksTab(page, caseDetailsPage);
        await expect(page.getByRole('heading', { name: 'Active tasks' })).toBeVisible();

        const claimTaskCard = caseDetailsPage.taskItem.filter({ hasText: claimTaskTitle }).first();
        await expect(claimTaskCard.locator('#action_claim')).toBeVisible();
      });

      await test.step('Claim the task and verify the refreshed task row plus success banner', async () => {
        const claimRequestPromise = page.waitForRequest(
          (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${claimTaskId}/claim`)
        );

        await caseDetailsPage.taskItem.filter({ hasText: claimTaskTitle }).first().locator('#action_claim').click();
        await claimRequestPromise;

        expect(claimRequestBody).toEqual({});
        await expect(caseDetailsPage.caseAlertSuccessMessage).toContainText("You've assigned yourself a task.");

        const rows = await caseDetailsPage.getTaskKeyValueRows();
        const claimedTask = getTaskRecordByTitle(rows, claimTaskTitle);

        expect(claimedTask).toEqual(
          expect.objectContaining({
            'Assigned to': `${people.currentUser.firstName} ${people.currentUser.lastName}`,
          })
        );
        expect(claimedTask?.Manage).not.toContain('Assign to me');
      });
    });

    test('reassigns a case task from the Tasks tab and returns with the updated assignee', async ({
      caseDetailsPage,
      taskListPage,
      page,
    }) => {
      const currentUserId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
      const people = buildCaseworkers(currentUserId);
      const taskState: CaseTaskState = {
        managedTaskAssigneeId: people.existingAssignee.idamId,
      };
      let reassignRequestBody: unknown;

      await test.step('Setup case details task routes and task-action resolvers', async () => {
        await setupCaseDetailsTaskRoutes(page, taskState, people.all);

        await setupTaskActionEndpointMocks(page, 'reassign', {
          taskId: managedTaskId,
          task_name: managedTaskTitle,
          due_date: taskDueDate,
          dueDate: taskDueDate,
          priority_date: taskDueDate,
          caseId,
          jurisdiction: 'IA',
          caseTypeId: 'Asylum',
          assigneeId: people.existingAssignee.idamId,
          newAssigneeId: people.replacementAssignee.idamId,
          includeSubmitActionMock: false,
        });

        await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(people.all),
          });
        });

        await page.route(`**/workallocation/task/${managedTaskId}/assign*`, async (route) => {
          const request = route.request();
          if (request.method() !== 'POST') {
            await route.continue();
            return;
          }

          reassignRequestBody = request.postDataJSON();
          taskState.managedTaskAssigneeId = people.replacementAssignee.idamId;

          await route.fulfill({
            status: 204,
            contentType: 'application/json',
            body: JSON.stringify({}),
          });
        });
      });

      await test.step('Open the reassign flow from the case details Tasks tab', async () => {
        await openCaseDetailsTasksTab(page, caseDetailsPage);

        await caseDetailsPage.taskItem.filter({ hasText: managedTaskTitle }).first().locator('#action_reassign').click();

        await expect(page).toHaveURL(new RegExp(`/work/${managedTaskId}/reassign\\?service=IA$`));
        await expect(page.locator('main')).toContainText('Choose a role type');
        await expect(page.locator('main')).toContainText('Reassign task');
      });

      await test.step('Complete the role and person selection steps', async () => {
        await page.getByRole('radio', { name: 'Legal Ops' }).check({ force: true });
        await taskListPage.continueButton.click();

        await expect(page.locator('main')).toContainText('Find the person');
        await taskListPage.reassignUserSearchInput.fill('Replacement');
        await taskListPage.selectFirstReassignUserOption();
        await taskListPage.continueButton.click();
      });

      await test.step('Verify the check-your-changes screen and submit the reassign action', async () => {
        await expect(page.locator('main')).toContainText('Check your answers');
        await expect(page.locator('main')).toContainText('Bob Smith');
        await expect(page.locator('main')).toContainText('Protection');
        await expect(page.locator('main')).toContainText('Taylor House');
        await expect(page.locator('main')).toContainText(
          `${people.replacementAssignee.firstName} ${people.replacementAssignee.lastName}`
        );

        const reassignRequestPromise = page.waitForRequest(
          (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${managedTaskId}/assign`)
        );

        await taskListPage.reassignButton.click();
        await reassignRequestPromise;

        expect(reassignRequestBody).toEqual({ userId: people.replacementAssignee.idamId });
      });

      await test.step('Verify the case details page returns and the task row shows the updated assignee', async () => {
        await expect(page).toHaveURL(new RegExp(`/cases/case-details/IA/Asylum/${caseId}(?:#Overview|#Tasks)?$`));
        await caseDetailsPage.selectCaseDetailsTab('Tasks');

        const rows = await caseDetailsPage.getTaskKeyValueRows();
        const managedTask = getTaskRecordByTitle(rows, managedTaskTitle);

        expect(managedTask).toEqual(
          expect.objectContaining({
            'Assigned to': `${people.replacementAssignee.firstName} ${people.replacementAssignee.lastName}`,
          })
        );
      });
    });

    test('unassigns a case task from the Tasks tab and returns it to an unassigned state', async ({ caseDetailsPage, page }) => {
      const currentUserId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
      const people = buildCaseworkers(currentUserId);
      const taskState: CaseTaskState = {
        managedTaskAssigneeId: people.existingAssignee.idamId,
      };
      let unassignRequestBody: unknown;

      await test.step('Setup case details task routes and unassign action resolvers', async () => {
        await setupCaseDetailsTaskRoutes(page, taskState, people.all);

        await setupTaskActionEndpointMocks(page, 'unassign', {
          taskId: managedTaskId,
          task_name: managedTaskTitle,
          due_date: taskDueDate,
          dueDate: taskDueDate,
          priority_date: taskDueDate,
          caseId,
          jurisdiction: 'IA',
          caseTypeId: 'Asylum',
          assigneeId: people.existingAssignee.idamId,
          unassignMode: 'assign-null',
          includeSubmitActionMock: false,
        });

        await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(people.all),
          });
        });

        await page.route(`**/workallocation/task/${managedTaskId}/assign*`, async (route) => {
          const request = route.request();
          if (request.method() !== 'POST') {
            await route.continue();
            return;
          }

          unassignRequestBody = request.postDataJSON();
          taskState.managedTaskAssigneeId = undefined;

          await route.fulfill({
            status: 204,
            contentType: 'application/json',
            body: JSON.stringify({}),
          });
        });
      });

      await test.step('Open the unassign flow from the case details Tasks tab', async () => {
        await openCaseDetailsTasksTab(page, caseDetailsPage);

        await caseDetailsPage.taskItem.filter({ hasText: managedTaskTitle }).first().locator('#action_unclaim').click();

        await expect(page).toHaveURL(new RegExp(`/work/${managedTaskId}/unclaim\\?service=IA$`));
        await expect(page.locator('main')).toContainText('Unassign task');
        await expect(page.locator('main')).toContainText(
          'Unassign this task. This will send it back to the available task list for someone to pick up.'
        );
        await expect(page.locator('main')).toContainText('Case name');
        await expect(page.locator('main')).toContainText('Case category');
        await expect(page.locator('main')).toContainText('Location');
        await expect(page.locator('main')).toContainText('Task');
      });

      await test.step('Submit the unassign action and verify the returned task row is unassigned', async () => {
        const unassignRequestPromise = page.waitForRequest(
          (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${managedTaskId}/assign`)
        );

        await page.getByRole('button', { name: 'Unassign' }).click();
        await unassignRequestPromise;

        expect(unassignRequestBody).toEqual({ userId: null });
        await expect(page).toHaveURL(new RegExp(`/cases/case-details/IA/Asylum/${caseId}(?:#Overview|#Tasks)?$`));
        await caseDetailsPage.selectCaseDetailsTab('Tasks');

        const rows = await caseDetailsPage.getTaskKeyValueRows();
        const managedTask = getTaskRecordByTitle(rows, managedTaskTitle);

        expect(managedTask).toEqual(
          expect.objectContaining({
            'Assigned to': 'Unassigned',
          })
        );
      });
    });
  }
);
