import type { Page, Route } from '@playwright/test';
import type { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { QueryManagementPage } from '../../E2E/page-objects/pages/exui/queryManagement.po';
import { applySessionCookies } from '../../common/sessionCapture';
import { TEST_USERS } from '../testData';
import {
  buildQueryManagementCaseDetailsMock,
  buildQueryManagementCreateEventResponse,
  buildQueryManagementRaiseQueryEventTriggerMock,
  buildQueryManagementValidationResponse,
  QUERY_MANAGEMENT_CASE_REFERENCE,
  QUERY_MANAGEMENT_CASE_TYPE,
  QUERY_MANAGEMENT_JURISDICTION,
  QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID,
  QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME,
} from '../mocks/queryManagement.mock';
import { setupCaseworkerJurisdictionsRoute } from './caseworkerJurisdictionMockRoutes.helper';
import { setupXuiAppShellBaseRoutes } from './xuiAppShellMockRoutes.helper';

type QueryManagementSubmittedEvent = {
  data?: Record<string, unknown>;
  event?: { id?: string; summary?: string; description?: string };
  event_token?: string;
  ignore_warning?: boolean;
};

export type QueryManagementSubmissionCapture = {
  submittedEvents: QueryManagementSubmittedEvent[];
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

export async function setupQueryManagementMockRoutes(page: Page): Promise<QueryManagementSubmissionCapture> {
  const caseDetails = buildQueryManagementCaseDetailsMock();
  const eventTrigger = buildQueryManagementRaiseQueryEventTriggerMock();
  const capture: QueryManagementSubmissionCapture = {
    submittedEvents: [],
  };

  await setupXuiAppShellBaseRoutes(page, {
    userDetails: {
      userId: 'query-management-solicitor-user',
      forename: 'Query',
      surname: 'Solicitor',
      email: 'query.management.solicitor@example.com',
      roleCategory: 'PROFESSIONAL',
      roles: ['caseworker', 'pui-case-manager', 'caseworker-civil-solicitor'],
    },
    clientContextFeatureFlags: QUERY_MANAGEMENT_FEATURE_FLAGS,
  });

  await setupQueryManagementLaunchDarklyRoute(page);
  await setupCaseworkerJurisdictionsRoute(page, [QUERY_MANAGEMENT_JURISDICTION]);

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
    await fulfillJson(route, caseDetails);
  });

  await page.route(
    `**/data/internal/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}/event-triggers/${QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID}/validate*`,
    async (route) => {
      await fulfillJson(route, eventTrigger);
    }
  );

  await page.route(
    `**/data/internal/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}/event-triggers/${QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID}*`,
    async (route) => {
      await fulfillJson(route, eventTrigger);
    }
  );

  await page.route(`**/data/case-types/${QUERY_MANAGEMENT_CASE_TYPE}/validate*`, async (route) => {
    await fulfillJson(route, buildQueryManagementValidationResponse(route));
  });

  await page.route(`**/data/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}/events*`, async (route) => {
    const submittedEvent = route.request().postDataJSON?.() as QueryManagementSubmittedEvent;
    capture.submittedEvents.push(submittedEvent);
    await fulfillJson(route, buildQueryManagementCreateEventResponse(route, caseDetails));
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
