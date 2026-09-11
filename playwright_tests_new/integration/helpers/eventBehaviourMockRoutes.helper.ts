import type { Page, Route } from '@playwright/test';
import type { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { applySessionCookies } from '../../common/sessionCapture';
import { setupCaseworkerJurisdictionsRoute } from './caseworkerJurisdictionMockRoutes.helper';
import { setupXuiAppShellBaseRoutes } from './xuiAppShellMockRoutes.helper';
import {
  buildEventBehaviourCaseDetails,
  buildEventBehaviourTrigger,
  EVENT_BEHAVIOUR_CASE_REFERENCE,
  EVENT_BEHAVIOUR_CASE_TYPE,
  EVENT_BEHAVIOUR_JURISDICTION,
  EVENT_BEHAVIOUR_TRIGGER_ID,
} from '../mocks/eventBehaviour.mock';

type RouteAbortCode = Parameters<Route['abort']>[0];

export type EventBehaviourSubmitOverride = {
  status?: number;
  body?: unknown;
  abortErrorCode?: RouteAbortCode;
};

export type EventBehaviourMockConfig = {
  trigger?: ReturnType<typeof buildEventBehaviourTrigger>;
  richTextReadValue?: string;
  eventReturnedByCaseView?: boolean;
  submit?: EventBehaviourSubmitOverride;
  midEventValidation?: {
    status: number;
    body: unknown;
  };
};

function resolveBody(body: unknown): string {
  return typeof body === 'string' ? body : JSON.stringify(body);
}

async function fulfil(route: Route, status: number, body: unknown, abortErrorCode?: RouteAbortCode): Promise<void> {
  if (abortErrorCode) {
    await route.abort(abortErrorCode);
    return;
  }

  await route.fulfill({ status, contentType: 'application/json', body: resolveBody(body) });
}

function buildValidationResponse(route: Route) {
  const payload = route.request().postDataJSON() as { data?: Record<string, unknown> } | null;
  const pageId = new URL(route.request().url()).searchParams.get('pageId') ?? '';

  return {
    data: payload?.data ?? {},
    errors: [],
    _links: { self: { href: `/data/case-types/${EVENT_BEHAVIOUR_CASE_TYPE}/validate?pageId=${pageId}` } },
  };
}

export async function setupEventBehaviourMockRoutes(page: Page, config: EventBehaviourMockConfig = {}): Promise<void> {
  const userDetails = {
    userId: 'event-behaviour-user',
    forename: 'Event',
    surname: 'Tester',
    email: 'event.behaviour@justice.gov.uk',
    roleCategory: 'LEGAL_OPERATIONS',
    roles: ['caseworker-event-behaviour'],
  };
  await setupXuiAppShellBaseRoutes(page, {
    userDetails,
  });
  await setupCaseworkerJurisdictionsRoute(page, [EVENT_BEHAVIOUR_JURISDICTION]);

  await page.route('**/auth/isAuthenticated*', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(true) });
  });
  await page.route(/\/api\/configuration\?configurationKey=termsAndConditionsEnabled(?:&|$)/, async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(false) });
  });
  await page.route('**/api/monitoring-tools*', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
  });
  await page.route('**/data/internal/profile*', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(userDetails) });
  });

  let eventRecorded = false;
  const trigger = config.trigger ?? buildEventBehaviourTrigger();

  await page.route(`**/data/internal/cases/${EVENT_BEHAVIOUR_CASE_REFERENCE}*`, async (route) => {
    await fulfil(
      route,
      200,
      buildEventBehaviourCaseDetails({
        eventRecorded,
        eventReturnedByCaseView: config.eventReturnedByCaseView !== false,
        richTextReadValue: config.richTextReadValue,
      })
    );
  });

  await page.route(
    `**/data/internal/cases/${EVENT_BEHAVIOUR_CASE_REFERENCE}/event-triggers/${EVENT_BEHAVIOUR_TRIGGER_ID}/validate*`,
    async (route) => {
      await fulfil(route, 200, trigger);
    }
  );

  await page.route(
    `**/data/internal/cases/${EVENT_BEHAVIOUR_CASE_REFERENCE}/event-triggers/${EVENT_BEHAVIOUR_TRIGGER_ID}*`,
    async (route) => {
      await fulfil(route, 200, trigger);
    }
  );

  await page.route(`**/data/case-types/${EVENT_BEHAVIOUR_CASE_TYPE}/validate*`, async (route) => {
    const pageId = new URL(route.request().url()).searchParams.get('pageId');
    if (config.midEventValidation && pageId === 'recordOutcomePage1') {
      await fulfil(route, config.midEventValidation.status, config.midEventValidation.body);
      return;
    }
    await fulfil(route, 200, buildValidationResponse(route));
  });

  await page.route(`**/data/cases/${EVENT_BEHAVIOUR_CASE_REFERENCE}/events*`, async (route) => {
    const submit = config.submit;
    const status = submit?.status ?? 201;

    if (!submit?.abortErrorCode && status >= 200 && status < 300) {
      eventRecorded = true;
    }

    await fulfil(
      route,
      status,
      submit?.body ??
        buildEventBehaviourCaseDetails({
          eventRecorded,
          eventReturnedByCaseView: config.eventReturnedByCaseView !== false,
          richTextReadValue: config.richTextReadValue,
        }),
      submit?.abortErrorCode
    );
  });
}

export async function openEventBehaviourJourney(
  page: Page,
  caseDetailsPage: CaseDetailsPage,
  config: EventBehaviourMockConfig = {}
): Promise<void> {
  const targetUrl = process.env.EXUI_BASE_URL ?? process.env.TEST_URL;
  const targetHostname = targetUrl ? new URL(targetUrl).hostname : '';
  if (targetHostname !== 'localhost' && targetHostname !== '127.0.0.1') {
    await applySessionCookies(page, 'STAFF_ADMIN');
  }
  await setupEventBehaviourMockRoutes(page, config);
  await caseDetailsPage.openCaseDetails(EVENT_BEHAVIOUR_JURISDICTION, EVENT_BEHAVIOUR_CASE_TYPE, EVENT_BEHAVIOUR_CASE_REFERENCE);
  if (config.eventReturnedByCaseView === false) {
    await caseDetailsPage.waitForCaseDetailsReady();
  } else {
    await caseDetailsPage.caseActionsDropdown.waitFor({ state: 'visible' });
  }
}
