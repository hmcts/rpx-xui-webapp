import type { Page } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookiesAndExtractUserId } from '../../helpers';
import { buildCaseDetailsTasksFromParams, type TaskDetailsParams } from '../../mocks/caseDetailsTasks.builder';
import { buildAsylumCaseMock } from '../../mocks/cases/asylumCase.mock';

const userIdentifier = 'STAFF_ADMIN';
const caseId = '1234567812345678';
const jurisdiction = 'IA';
const caseType = 'Asylum';
const eventId = 'text';
const eventName = 'Test event';
const tasksTabUrl = `/cases/case-details/${jurisdiction}/${caseType}/${caseId}/tasks`;
const completableTasksEndpointPath = `/workallocation/case/tasks/${caseId}/event/${eventId}/caseType/${caseType}/jurisdiction/${jurisdiction}`;
const completableTasksRoute = `**${completableTasksEndpointPath}*`;
const caseTaskListRoute = `**/workallocation/case/task/${caseId}*`;
const tasksTabHrefPattern = new RegExp(`/cases/case-details/${jurisdiction}/${caseType}/${caseId}/tasks$`);

const legacyTaskEventRoles = [
  'caseworker-ia',
  'caseworker-ia-caseofficer',
  'caseworker-ia-admofficer',
  'task-supervisor',
  'case-allocator',
];

type TaskEventScenario = {
  name: string;
  completableTasks: TaskDetailsParams[];
  expectedRoute: 'no-tasks-available' | 'task-unassigned';
  summaryMessage: string;
  detailsHeading: string;
  detailsMessage: RegExp;
  returnLinkText: RegExp;
  expectedUrlPattern: RegExp;
};

const baseCaseTaskRows = (currentUserId: string): TaskDetailsParams[] => [
  {
    id: '08a3d216-task-4e92-a7e3-ca3661e6be87',
    title: 'Task 1',
    state: 'assigned',
    assignee: currentUserId,
    createdDate: '2030-05-01T10:00:00.000Z',
    dueDate: '2030-05-10T10:00:00.000Z',
    priorityDate: '2030-05-10T10:00:00.000Z',
    jurisdiction,
    caseTypeId: caseType,
    caseId,
    caseName: 'Test user case',
    locationName: 'Taylor House',
    location: '765324',
    description: 'First active task on the case details Tasks tab.',
    permissions: ['Unassign', 'Assign', 'Own', 'Cancel'],
  },
  {
    id: '18a3d216-task-4e92-a7e3-ca3661e6be87',
    title: 'Task 2',
    state: 'assigned',
    assignee: currentUserId,
    createdDate: '2030-05-02T10:00:00.000Z',
    dueDate: '2030-05-11T10:00:00.000Z',
    priorityDate: '2030-05-11T10:00:00.000Z',
    jurisdiction,
    caseTypeId: caseType,
    caseId,
    caseName: 'Test user case',
    locationName: 'Taylor House',
    location: '765324',
    description: 'Second active task on the case details Tasks tab.',
    permissions: ['Unassign', 'Assign', 'Own', 'Cancel'],
  },
];

const buildCompletableTask = (taskId: string): TaskDetailsParams => ({
  id: taskId,
  title: `Completable task ${taskId}`,
  state: 'unassigned',
  assignee: '',
  createdDate: '2030-05-03T10:00:00.000Z',
  dueDate: '2030-05-12T10:00:00.000Z',
  priorityDate: '2030-05-12T10:00:00.000Z',
  jurisdiction,
  caseTypeId: caseType,
  caseId,
  caseName: 'Test user case',
  locationName: 'Taylor House',
  location: '765324',
  description: 'Completable task required for the case event.',
  permissions: ['Unassign', 'Assign', 'Own', 'Cancel'],
});

const taskEventScenarios: TaskEventScenario[] = [
  {
    name: 'shows the no-task-available validation page when no completable task exists for the event',
    completableTasks: [],
    expectedRoute: 'no-tasks-available',
    summaryMessage: 'No task available',
    detailsHeading: 'No task available',
    detailsMessage: /You should have an assigned task for this event, but something has gone wrong\.?/i,
    returnLinkText: /^Return to tasks tab$/i,
    expectedUrlPattern: new RegExp(`/cases/case-details/${jurisdiction}/${caseType}/${caseId}/no-tasks-available(?:\\?.*)?$`),
  },
  {
    name: 'shows the task-assignment-required validation page when the only completable task is unassigned',
    completableTasks: [buildCompletableTask('2f3d4a5b-8d51-11eb-a9a4-06d032acc761')],
    expectedRoute: 'task-unassigned',
    summaryMessage: 'Task assignment required',
    detailsHeading: 'Task assignment required',
    // The toolkit text changed after the legacy Codecept feature was written; either copy still proves the same guard path.
    detailsMessage:
      /(?:You must assign it to yourself to continue\.?|You must assign one of the available tasks from the task tab to continue with your work\.)/i,
    returnLinkText: /^Return to tasks tab(?: to assign a task)?$/i,
    expectedUrlPattern: new RegExp(`/cases/case-details/${jurisdiction}/${caseType}/${caseId}/task-unassigned(?:\\?.*)?$`),
  },
  {
    name: 'shows the task-assignment-required validation page when multiple completable tasks are unassigned',
    completableTasks: [
      buildCompletableTask('2f3d4a5b-8d51-11eb-a9a4-06d032acc762'),
      buildCompletableTask('2f3d4a5b-8d51-11eb-a9a4-06d032acc763'),
    ],
    expectedRoute: 'task-unassigned',
    summaryMessage: 'Task assignment required',
    detailsHeading: 'Task assignment required',
    detailsMessage:
      /(?:You must assign it to yourself to continue\.?|You must assign one of the available tasks from the task tab to continue with your work\.)/i,
    returnLinkText: /^Return to tasks tab(?: to assign a task)?$/i,
    expectedUrlPattern: new RegExp(`/cases/case-details/${jurisdiction}/${caseType}/${caseId}/task-unassigned(?:\\?.*)?$`),
  },
];

const buildEventTriggerMock = () => ({
  id: eventId,
  name: eventName,
  description: 'Task event completion parity mock',
  case_fields: [],
  wizard_pages: [],
  _links: {
    self: {
      href: `/data/internal/cases/${caseId}/event-triggers/${eventId}?ignore-warning=false`,
    },
  },
});

async function setupTaskEventCompletionRoutes(page: Page, currentUserId: string, scenario: TaskEventScenario) {
  const caseDetailsMock = buildAsylumCaseMock({
    caseId,
    triggers: [{ id: eventId, name: eventName }],
  });
  const activeCaseTasks = buildCaseDetailsTasksFromParams({
    caseId,
    tasks: baseCaseTaskRows(currentUserId),
  });
  const completableTasks = buildCaseDetailsTasksFromParams({
    caseId,
    tasks: scenario.completableTasks,
  });
  const eventTriggerMock = buildEventTriggerMock();
  const caseworkerLookupResponse = [
    {
      email: 'task.event.caseworker@example.com',
      firstName: 'Task',
      idamId: currentUserId,
      lastName: 'Event',
      location: {
        id: 227101,
        locationName: 'Taylor House',
      },
      roleCategory: 'LEGAL_OPERATIONS',
      service: 'IA',
    },
  ];
  let eventTaskRequestCount = 0;

  await page.route(`**/data/internal/cases/${caseId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(caseDetailsMock),
    });
  });

  await page.route(caseTaskListRoute, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(activeCaseTasks),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(caseworkerLookupResponse),
    });
  });

  await page.route(completableTasksRoute, async (route) => {
    eventTaskRequestCount += 1;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        task_required_for_event: true,
        tasks: completableTasks,
      }),
    });
  });

  await page.route(`**/data/internal/cases/${caseId}/event-triggers/${eventId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(eventTriggerMock),
    });
  });

  await page.route(`**/data/internal/case-types/${caseType}/event-triggers/${eventId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(eventTriggerMock),
    });
  });

  return {
    getEventTaskRequestCount: () => eventTaskRequestCount,
  };
}

test.describe(
  `Task event completion negative scenarios as ${userIdentifier}`,
  { tag: ['@integration', '@integration-manage-tasks'] },
  () => {
    for (const scenario of taskEventScenarios) {
      test(scenario.name, async ({ caseDetailsPage, page }) => {
        const currentUserId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
        const routeState = await setupTaskEventCompletionRoutes(page, currentUserId, scenario);

        await test.step('Open the case details Tasks tab and confirm the case action is available', async () => {
          await page.goto(tasksTabUrl, { waitUntil: 'domcontentloaded' });
          await caseDetailsPage.taskListContainer.waitFor();
          await caseDetailsPage.exuiSpinnerComponent.wait();
          await caseDetailsPage.caseActionsDropdown.waitFor({ state: 'visible' });
          await expect(page.getByRole('heading', { name: 'Active tasks' })).toBeVisible();
        });

        await test.step('Start the event from the case details dropdown and verify the guarded completable-task path is used', async () => {
          const firstEventTasksResponse = page.waitForResponse(
            (response) => response.request().method() === 'GET' && response.url().includes(completableTasksEndpointPath)
          );

          await caseDetailsPage.selectCaseAction(eventName);
          await firstEventTasksResponse;

          await expect(page).toHaveURL(scenario.expectedUrlPattern);
          expect(page.url()).not.toContain('/undefined/');
          await expect
            .poll(() => routeState.getEventTaskRequestCount(), {
              message: 'expected the event-start flow to request completable tasks before routing to the validation page',
            })
            .toBeGreaterThanOrEqual(1);
        });

        await test.step('Verify the validation summary, details, and return-to-tasks link', async () => {
          await expect(caseDetailsPage.generalProblemHeading).toBeVisible();
          await expect(page.locator('.govuk-error-summary__body')).toContainText(scenario.summaryMessage);
          await expect(page.getByRole('heading', { level: 2, name: scenario.detailsHeading })).toBeVisible();
          await expect(page.getByText(scenario.detailsMessage)).toBeVisible();

          const returnToTasksLink = page.getByRole('link', { name: scenario.returnLinkText });
          await expect(returnToTasksLink).toBeVisible();
          await expect(returnToTasksLink).toHaveAttribute('href', tasksTabHrefPattern);
        });
      });
    }
  }
);
