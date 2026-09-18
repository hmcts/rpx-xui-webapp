import type { Page, Route } from '@playwright/test';
import type { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { QueryManagementPage } from '../../E2E/page-objects/pages/exui/queryManagement.po';
import { applySessionCookies } from '../../common/sessionCapture';
import { TEST_USERS } from '../testData';
import {
  buildQueryManagementExistingQueryCollection,
  buildQueryManagementCaseDetailsMock,
  buildQueryManagementCreateEventResponse,
  buildQueryManagementRaiseQueryEventTriggerMock,
  buildQueryManagementRespondQueryEventTriggerMock,
  buildQueryManagementValidationResponse,
  type QueryManagementCaseQueriesCollection,
  QUERY_MANAGEMENT_CASE_QUERIES_FIELD_ID,
  QUERY_MANAGEMENT_CASE_REFERENCE,
  QUERY_MANAGEMENT_CASE_TYPE,
  QUERY_MANAGEMENT_EXISTING_QUERY_ID,
  QUERY_MANAGEMENT_JURISDICTION,
  QUERY_MANAGEMENT_QUERY_SUBJECT,
  QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID,
  QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME,
  QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_ID,
  QUERY_MANAGEMENT_RESPOND_TASK_ID,
} from '../mocks/queryManagement.mock';
import { buildCaseDetailsTasksMinimal } from '../mocks/caseDetailsTasks.builder';
import { setupCaseworkerJurisdictionsRoute } from './caseworkerJurisdictionMockRoutes.helper';
import { setupXuiAppShellBaseRoutes } from './xuiAppShellMockRoutes.helper';

export type QueryManagementSubmittedEvent = {
  data?: Record<string, unknown>;
  event?: { id?: string; summary?: string; description?: string };
  event_token?: string;
  ignore_warning?: boolean;
};

export type QueryManagementSubmittedCaseMessage = {
  attachments?: unknown[];
  body?: string;
  hearingDate?: string | null;
  id?: string | null;
  isClosed?: string;
  isHearingRelated?: string;
  isHmctsStaff?: string;
  messageType?: string;
  name?: string;
  parentId?: string;
  subject?: string;
};

export type QueryManagementSubmittedCaseQueriesCollection = {
  partyName?: string;
  roleOnCase?: string;
  caseMessages?: Array<{
    id: string | null;
    value?: QueryManagementSubmittedCaseMessage;
  }>;
};

export type QueryManagementSubmissionCapture = {
  completedTasks: Array<{
    body?: Record<string, unknown>;
    taskId: string;
  }>;
  submittedEvents: QueryManagementSubmittedEvent[];
};

type QueryManagementRouteOverride = {
  body?: unknown;
  status?: number;
};

type QueryManagementRouteUser = 'solicitor' | 'caseworker';

type QueryManagementMockRoutesOptions = {
  caseTasks?: unknown[];
  completableTasks?: unknown[];
  includeQueryTab?: boolean;
  queryCollection?: QueryManagementCaseQueriesCollection;
  raiseQueryEventTrigger?: QueryManagementRouteOverride;
  respondQueryEventTrigger?: QueryManagementRouteOverride;
  submitQueryEvent?: QueryManagementRouteOverride;
  validateQueryEvent?: QueryManagementRouteOverride;
  user?: QueryManagementRouteUser;
};

const QUERY_MANAGEMENT_FEATURE_FLAGS = {
  'qm-qualifying-questions': {},
  'qm-service-messages': {
    attachment: [],
    messages: [],
  },
};

const launchDarklyFlagSet = Object.fromEntries(
  Object.entries(QUERY_MANAGEMENT_FEATURE_FLAGS).map(([flagName, value]) => [flagName, { value, version: 1 }])
);

async function fulfillJson(route: Route, body: unknown, status = 200): Promise<void> {
  await route.fulfill({
    status,
    contentType: 'application/json',
    body: JSON.stringify(body),
  });
}

async function fulfillJsonRoute(
  route: Route,
  override: QueryManagementRouteOverride | undefined,
  fallbackBody: unknown,
  fallbackStatus = 200
): Promise<void> {
  await route.fulfill({
    status: override?.status ?? fallbackStatus,
    contentType: 'application/json',
    body: JSON.stringify(override?.body ?? fallbackBody),
  });
}

async function setupQueryManagementLaunchDarklyRoute(page: Page): Promise<void> {
  await page.route('**/*launchdarkly.com/**', async (route) => {
    const request = route.request();
    const pathname = new URL(request.url()).pathname;

    if (pathname.includes('/sdk/goals')) {
      await fulfillJson(route, []);
      return;
    }

    if (request.method() !== 'GET') {
      await route.fulfill({ status: 202, body: '' });
      return;
    }

    await fulfillJson(route, launchDarklyFlagSet);
  });
}

function buildQueryManagementUserDetails(user: QueryManagementRouteUser) {
  if (user === 'caseworker') {
    return {
      userId: 'query-management-caseworker-user',
      forename: 'Case',
      surname: 'Worker',
      email: 'query.management.caseworker@example.com',
      roleCategory: 'LEGAL_OPERATIONS',
      roles: ['caseworker', 'caseworker-ia', 'caseworker-ia-caseofficer'],
    };
  }

  return {
    userId: 'query-management-solicitor-user',
    forename: 'Query',
    surname: 'Solicitor',
    email: 'query.management.solicitor@example.com',
    roleCategory: 'PROFESSIONAL',
    roles: ['caseworker', 'pui-case-manager', 'caseworker-civil-solicitor'],
  };
}

function buildWorkAllocationCaseworkerResponse() {
  return [
    {
      email: 'query.management.caseworker@example.com',
      firstName: 'Case',
      idamId: 'query-management-caseworker-user',
      lastName: 'Worker',
      location: {
        id: 765324,
        locationName: 'Taylor House',
      },
      roleCategory: 'LEGAL_OPERATIONS',
      service: QUERY_MANAGEMENT_JURISDICTION,
    },
  ];
}

function buildQueryManagementSupportedJurisdictionDetails() {
  return [
    {
      serviceId: QUERY_MANAGEMENT_JURISDICTION,
      serviceName: 'Immigration and Asylum',
    },
  ];
}

function buildRespondToQueryTask() {
  const dueDate = '2026-07-24T12:00:00.000Z';

  return buildCaseDetailsTasksMinimal({
    caseId: QUERY_MANAGEMENT_CASE_REFERENCE,
    id: [QUERY_MANAGEMENT_RESPOND_TASK_ID],
    titles: ['Respond to query'],
    states: ['assigned'],
    types: [QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_ID],
    taskSystems: ['SELF'],
    locations: [{ name: 'Taylor House', id: '765324' }],
    assignees: ['query-management-caseworker-user'],
    descriptions: [
      `Review the query response and continue.\n\n[Respond to query](/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}/3/${QUERY_MANAGEMENT_EXISTING_QUERY_ID})`,
    ],
    priorityDates: [dueDate],
    dueDates: [dueDate],
  });
}

export function getQueryManagementSubmittedQueryCollection(
  submittedEvent: QueryManagementSubmittedEvent
): QueryManagementSubmittedCaseQueriesCollection {
  const queryCollection = submittedEvent.data?.[
    QUERY_MANAGEMENT_CASE_QUERIES_FIELD_ID
  ] as QueryManagementSubmittedCaseQueriesCollection;

  if (!queryCollection) {
    throw new Error(`Submitted event did not include ${QUERY_MANAGEMENT_CASE_QUERIES_FIELD_ID}`);
  }

  return queryCollection;
}

export async function setupQueryManagementMockRoutes(
  page: Page,
  options: QueryManagementMockRoutesOptions = {}
): Promise<QueryManagementSubmissionCapture> {
  const user = options.user ?? 'solicitor';
  let queryCollection = options.queryCollection;
  const buildCaseDetails = () =>
    buildQueryManagementCaseDetailsMock({
      includeQueryTab: options.includeQueryTab || Boolean(queryCollection),
      queryCollection,
    });
  const raiseQueryEventTrigger = buildQueryManagementRaiseQueryEventTriggerMock(
    QUERY_MANAGEMENT_CASE_REFERENCE,
    queryCollection ?? null
  );
  const respondQueryEventTrigger = buildQueryManagementRespondQueryEventTriggerMock(
    QUERY_MANAGEMENT_CASE_REFERENCE,
    queryCollection ?? buildQueryManagementExistingQueryCollection()
  );
  const capture: QueryManagementSubmissionCapture = {
    completedTasks: [],
    submittedEvents: [],
  };

  await setupXuiAppShellBaseRoutes(page, {
    userDetails: buildQueryManagementUserDetails(user),
    clientContextFeatureFlags: QUERY_MANAGEMENT_FEATURE_FLAGS,
  });

  await setupQueryManagementLaunchDarklyRoute(page);
  await setupCaseworkerJurisdictionsRoute(page, [QUERY_MANAGEMENT_JURISDICTION]);

  await page.route('**/api/wa-supported-jurisdiction/get*', async (route) => {
    await fulfillJson(route, [QUERY_MANAGEMENT_JURISDICTION]);
  });

  await page.route('**/api/wa-supported-jurisdiction/detail*', async (route) => {
    await fulfillJson(route, buildQueryManagementSupportedJurisdictionDetails());
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await fulfillJson(route, buildWorkAllocationCaseworkerResponse());
  });

  await page.route('**/api/organisation*', async (route) => {
    await fulfillJson(route, {
      name: 'Playwright Solicitor Organisation',
      organisationIdentifier: 'PLAYWRIGHT_SOLICITOR_ORG',
      status: 'ACTIVE',
      contactInformation: [],
      paymentAccount: [],
    });
  });

  await page.route(`**/data/internal/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}*`, async (route) => {
    await fulfillJson(route, buildCaseDetails());
  });

  if (options.caseTasks) {
    await page.route(`**/workallocation/case/task/${QUERY_MANAGEMENT_CASE_REFERENCE}*`, async (route) => {
      await fulfillJson(route, options.caseTasks);
    });
  }

  if (options.completableTasks) {
    await page.route(
      `**/workallocation/case/tasks/${QUERY_MANAGEMENT_CASE_REFERENCE}/event/${QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_ID}/caseType/${QUERY_MANAGEMENT_CASE_TYPE}/jurisdiction/${QUERY_MANAGEMENT_JURISDICTION}*`,
      async (route) => {
        await fulfillJson(route, {
          task_required_for_event: true,
          tasks: options.completableTasks,
        });
      }
    );
  }

  await page.route('**/workallocation/task/*/complete*', async (route) => {
    const taskId = new URL(route.request().url()).pathname.match(/\/workallocation\/task\/([^/]+)\/complete/)?.[1] ?? '';
    const requestBody = route.request().postDataJSON?.() as Record<string, unknown> | undefined;
    capture.completedTasks.push({ taskId, body: requestBody });
    await fulfillJson(route, {});
  });

  await page.route(
    `**/data/internal/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}/event-triggers/${QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID}/validate*`,
    async (route) => {
      await fulfillJsonRoute(route, options.raiseQueryEventTrigger, raiseQueryEventTrigger);
    }
  );

  await page.route(
    `**/data/internal/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}/event-triggers/${QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID}*`,
    async (route) => {
      await fulfillJsonRoute(route, options.raiseQueryEventTrigger, raiseQueryEventTrigger);
    }
  );

  await page.route(
    `**/data/internal/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}/event-triggers/${QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_ID}/validate*`,
    async (route) => {
      await fulfillJsonRoute(route, options.respondQueryEventTrigger, respondQueryEventTrigger);
    }
  );

  await page.route(
    `**/data/internal/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}/event-triggers/${QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_ID}*`,
    async (route) => {
      await fulfillJsonRoute(route, options.respondQueryEventTrigger, respondQueryEventTrigger);
    }
  );

  await page.route(`**/data/case-types/${QUERY_MANAGEMENT_CASE_TYPE}/validate*`, async (route) => {
    await fulfillJsonRoute(route, options.validateQueryEvent, buildQueryManagementValidationResponse(route));
  });

  await page.route(`**/data/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}/events*`, async (route) => {
    const submittedEvent = route.request().postDataJSON?.() as QueryManagementSubmittedEvent;
    capture.submittedEvents.push(submittedEvent);
    const successfulSubmit =
      !options.submitQueryEvent?.status || (options.submitQueryEvent.status >= 200 && options.submitQueryEvent.status < 300);

    if (successfulSubmit) {
      const submittedQueryCollection = submittedEvent.data?.[QUERY_MANAGEMENT_CASE_QUERIES_FIELD_ID] as
        | QueryManagementCaseQueriesCollection
        | undefined;
      if (submittedQueryCollection) {
        queryCollection = submittedQueryCollection;
      }
    }

    await fulfillJsonRoute(
      route,
      options.submitQueryEvent,
      successfulSubmit ? buildQueryManagementCreateEventResponse(route, buildCaseDetails()) : { message: 'query-submit-failed' }
    );
  });

  return capture;
}

export async function openSolicitorRaiseQueryFromNextStep(
  page: Page,
  caseDetailsPage: CaseDetailsPage,
  queryManagementPage = new QueryManagementPage(page)
): Promise<QueryManagementSubmissionCapture> {
  await applySessionCookies(page, TEST_USERS.SOLICITOR);
  const capture = await setupQueryManagementMockRoutes(page);

  await caseDetailsPage.openCaseDetails(
    QUERY_MANAGEMENT_JURISDICTION,
    QUERY_MANAGEMENT_CASE_TYPE,
    QUERY_MANAGEMENT_CASE_REFERENCE
  );
  await caseDetailsPage.selectCaseAction(QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME, {
    expectedLocator: queryManagementPage.raiseANewQueryHeading,
    expectedPath: new RegExp(`/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}(?:$|[/?#])`),
  });

  return capture;
}

export async function openCaseworkerRespondToQueryFromTasksTab(
  page: Page,
  caseDetailsPage: CaseDetailsPage,
  queryManagementPage = new QueryManagementPage(page)
): Promise<QueryManagementSubmissionCapture> {
  await applySessionCookies(page, 'STAFF_ADMIN');
  const queryCollection = buildQueryManagementExistingQueryCollection();
  const respondTasks = buildRespondToQueryTask();
  const capture = await setupQueryManagementMockRoutes(page, {
    caseTasks: respondTasks,
    completableTasks: respondTasks,
    queryCollection,
    user: 'caseworker',
  });

  await caseDetailsPage.openTasksTab(QUERY_MANAGEMENT_JURISDICTION, QUERY_MANAGEMENT_CASE_TYPE, QUERY_MANAGEMENT_CASE_REFERENCE);
  await queryManagementPage.openRespondToQueryTask();

  return capture;
}

export async function openSolicitorFollowUpQueryFromQueryDetails(
  page: Page,
  caseDetailsPage: CaseDetailsPage,
  queryManagementPage = new QueryManagementPage(page)
): Promise<QueryManagementSubmissionCapture> {
  await applySessionCookies(page, TEST_USERS.SOLICITOR);
  const queryCollection = buildQueryManagementExistingQueryCollection({ includeResponse: true });
  const capture = await setupQueryManagementMockRoutes(page, {
    includeQueryTab: true,
    queryCollection,
    user: 'solicitor',
  });

  await caseDetailsPage.openCaseDetails(
    QUERY_MANAGEMENT_JURISDICTION,
    QUERY_MANAGEMENT_CASE_TYPE,
    QUERY_MANAGEMENT_CASE_REFERENCE
  );
  await caseDetailsPage.selectCaseDetailsTab('Queries');
  await queryManagementPage.openQueryFromQueriesTable(QUERY_MANAGEMENT_QUERY_SUBJECT);
  await queryManagementPage.openFollowUpQuery();

  return capture;
}
