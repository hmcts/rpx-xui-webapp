import type { Page, Route } from '@playwright/test';
import type { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import {
  buildHearingsAppConfigMock,
  buildHearingsEnvironmentConfigMock,
  buildHearingsUserDetailsMock,
} from '../mocks/hearings.mock';
import { applyPrewarmedSessionCookies } from './prewarmedSession.helper';
import {
  buildCaseLinkingCaseDetailsMock,
  buildCaseLinkingEventTriggerMock,
  buildCaseLinkingReasonCodesMock,
  CASE_LINKING_CASE_REFERENCE,
  CASE_LINKING_CASE_TYPE,
  CASE_LINKING_JURISDICTION,
  CASE_LINKING_REASON_CODE,
  CASE_LINKING_RELATED_CASE_REFERENCE,
  CASE_LINKING_TRIGGER_ID,
  CASE_LINKING_USER,
} from '../mocks/caseLinking.mock';

type RouteAbortCode = Parameters<Route['abort']>[0];

interface CaseLinkingApiOverride {
  status?: number;
  body?: unknown;
  contentType?: string;
  abortErrorCode?: RouteAbortCode;
}

export interface CaseLinkingMockRoutesConfig {
  userRoles: string[];
  submitCaseLinks?: CaseLinkingApiOverride;
}

function resolveRouteBody(override: CaseLinkingApiOverride | undefined, fallbackBody: unknown): string {
  if (!override || override.body === undefined) {
    return JSON.stringify(fallbackBody);
  }

  if (typeof override.body === 'string') {
    return override.body;
  }

  return JSON.stringify(override.body);
}

async function fulfillRoute(
  route: Route,
  override: CaseLinkingApiOverride | undefined,
  fallbackBody: unknown,
  fallbackStatus = 200
): Promise<void> {
  if (override?.abortErrorCode) {
    await route.abort(override.abortErrorCode);
    return;
  }

  await route.fulfill({
    status: override?.status ?? fallbackStatus,
    contentType: override?.contentType ?? 'application/json',
    body: resolveRouteBody(override, fallbackBody),
  });
}

function resolveSubmittedCaseLinkData(route: Route): { linkedCaseReference: string; reasonCode: string } {
  const payload = route.request().postDataJSON() as { data?: Record<string, unknown> } | null;
  const linkedCaseReference =
    typeof payload?.data?.LinkedCaseReference === 'string'
      ? payload.data.LinkedCaseReference
      : CASE_LINKING_RELATED_CASE_REFERENCE;
  const reasonCode =
    typeof payload?.data?.CaseLinkReasonCode === 'string' ? payload.data.CaseLinkReasonCode : CASE_LINKING_REASON_CODE;

  return { linkedCaseReference, reasonCode };
}

export async function setupCaseLinkingMockRoutes(page: Page, config: CaseLinkingMockRoutesConfig): Promise<void> {
  const userDetails = buildHearingsUserDetailsMock(config.userRoles);
  const appConfig = buildHearingsAppConfigMock();
  const environmentConfig = buildHearingsEnvironmentConfigMock();
  const eventTrigger = buildCaseLinkingEventTriggerMock();
  const caseLinkReasonCodes = buildCaseLinkingReasonCodesMock();
  let currentCaseDetails = buildCaseLinkingCaseDetailsMock({ withLinks: false });

  await page.addInitScript((seededUserInfo) => {
    window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
  }, userDetails.userInfo);

  await page.route(`**/data/internal/cases/${CASE_LINKING_CASE_REFERENCE}*`, async (route) => {
    await fulfillRoute(route, undefined, currentCaseDetails);
  });

  await page.route(
    `**/data/internal/cases/${CASE_LINKING_CASE_REFERENCE}/event-triggers/${CASE_LINKING_TRIGGER_ID}/validate*`,
    async (route) => {
      await fulfillRoute(route, undefined, eventTrigger);
    }
  );

  await page.route(
    `**/data/internal/cases/${CASE_LINKING_CASE_REFERENCE}/event-triggers/${CASE_LINKING_TRIGGER_ID}*`,
    async (route) => {
      await fulfillRoute(route, undefined, eventTrigger);
    }
  );

  await page.route(`**/data/cases/${CASE_LINKING_CASE_REFERENCE}/events*`, async (route) => {
    const submitOverride = config.submitCaseLinks;
    const successfulSubmit = !submitOverride?.status || (submitOverride.status >= 200 && submitOverride.status < 300);
    if (successfulSubmit) {
      const submittedCaseLinkData = resolveSubmittedCaseLinkData(route);
      currentCaseDetails = buildCaseLinkingCaseDetailsMock({
        withLinks: true,
        linkedCaseReference: submittedCaseLinkData.linkedCaseReference,
        reasonCode: submittedCaseLinkData.reasonCode,
      });
    }
    await fulfillRoute(route, submitOverride, successfulSubmit ? currentCaseDetails : { message: 'case-link-submit-failed' });
  });

  await page.route('**/api/user/details*', async (route) => {
    await fulfillRoute(route, undefined, userDetails);
  });

  await page.route('**/assets/config/config.json*', async (route) => {
    await fulfillRoute(route, undefined, appConfig);
  });

  await page.route('**/external/config/ui*', async (route) => {
    await fulfillRoute(route, undefined, environmentConfig);
  });

  await page.route('**/refdata/commondata/lov/categories/CaseLinkingReasonCode*', async (route) => {
    await fulfillRoute(route, undefined, caseLinkReasonCodes);
  });

  await page.route('**/api/role-access/roles/manageLabellingRoleAssignment/**', async (route) => {
    await fulfillRoute(route, undefined, {});
  });

  await page.route('**/api/role-access/roles/access-get-by-caseId*', async (route) => {
    await fulfillRoute(route, undefined, []);
  });

  await page.route('**/api/wa-supported-jurisdiction/get*', async (route) => {
    await fulfillRoute(route, undefined, []);
  });
}

export async function openCaseLinkingJourney(
  page: Page,
  caseDetailsPage: CaseDetailsPage,
  config: CaseLinkingMockRoutesConfig,
  userIdentifier = CASE_LINKING_USER
): Promise<void> {
  await applyPrewarmedSessionCookies(page, userIdentifier);
  await setupCaseLinkingMockRoutes(page, config);
  await page.goto(`/cases/case-details/${CASE_LINKING_JURISDICTION}/${CASE_LINKING_CASE_TYPE}/${CASE_LINKING_CASE_REFERENCE}`, {
    waitUntil: 'domcontentloaded',
  });
  await caseDetailsPage.caseActionsDropdown.waitFor({ state: 'visible' });
}
