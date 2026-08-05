import nodeAppDataModels from '../../api/data/nodeAppDataModels';
import { setupTaskListBootstrapRoutes } from './taskListMockRoutes.helper';
import { setupXuiAppShellBaseRoutes } from './xuiAppShellMockRoutes.helper';
import { buildAsylumCaseMock } from '../mocks/cases/asylumCase.mock';
import type { BrowserContext, Page, Route } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import type { Cookie } from 'playwright-core';

export const caseDetailsEventErrorsUserIdentifier = 'hearing-link-local';
export const caseDetailsEventErrorsCaseId = '1784198964550349';
export const caseDetailsEventErrorsJurisdictionId = 'IA';
export const caseDetailsEventErrorsCaseTypeId = 'Asylum';
export const caseDetailsEventErrorsEventName = 'Record remission decision';
export const caseDetailsEventErrorsErrorMessage = 'Record remission decision is not valid for the appeal type.';
export const caseDetailsEventErrorsEventId = 'recordRemissionDecision';

const storageStatePath = path.resolve(process.cwd(), '.sessions/hearing-link-local.storage.json');
const targetOrigin = resolveTargetOrigin();

const userDetails = {
  userId: caseDetailsEventErrorsUserIdentifier,
  email: 'hearing-link-local@example.com',
  roles: ['caseworker-ia-caseofficer', 'caseworker-ia-admofficer'],
  roleCategory: 'LEGAL_OPERATIONS',
};

const profileDetails = (() => {
  const details = nodeAppDataModels.getUserDetails_oauth();
  details.userInfo.id = userDetails.userId;
  details.userInfo.uid = userDetails.userId;
  details.userInfo.roles = userDetails.roles;
  details.userInfo.roleCategories = [userDetails.roleCategory];
  details.roleAssignmentInfo = [
    {
      jurisdiction: caseDetailsEventErrorsJurisdictionId,
      isCaseAllocator: true,
      substantive: true,
      roleType: 'ORGANISATION',
    },
  ];
  return details;
})();

const caseMockResponse = buildAsylumCaseMock({
  caseId: caseDetailsEventErrorsCaseId,
  triggers: [{ id: caseDetailsEventErrorsEventId, name: caseDetailsEventErrorsEventName }],
});

type AddCookie = Parameters<BrowserContext['addCookies']>[0][number];
type BenignRule = { method: string; status: number; urlPattern: RegExp };

async function fulfillJson(route: Route, body: unknown, status = 200): Promise<void> {
  await route.fulfill({
    status,
    contentType: 'application/json',
    body: JSON.stringify(body),
  });
}

function resolveTargetOrigin(): string {
  const targetUrl = process.env.TEST_URL ?? process.env.EXUI_BASE_URL ?? 'https://manage-case.aat.platform.hmcts.net';
  return new URL(targetUrl).origin;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function loadStorageStateCookies(filePath: string): Cookie[] {
  const state = JSON.parse(fs.readFileSync(filePath, 'utf8')) as { cookies?: Cookie[] };
  return Array.isArray(state.cookies) ? state.cookies : [];
}

function rebaseStorageStateCookies(cookies: Cookie[]): AddCookie[] {
  const idamOrigin = 'https://idam-web-public.aat.platform.hmcts.net';

  return cookies.map((cookie) => {
    const { domain: _domain, path: _path, ...rest } = cookie;
    const url = cookie.domain?.includes('idam-web-public') ? idamOrigin : targetOrigin;
    return {
      ...rest,
      url,
    };
  });
}

export function registerCaseDetailsEventErrorsBenignRule(
  registerBenignApiErrorRule: (rule: BenignRule) => () => void
): () => void {
  return registerBenignApiErrorRule({
    method: 'GET',
    status: 400,
    urlPattern: new RegExp(
      `\\/data\\/internal\\/cases\\/${escapeRegExp(caseDetailsEventErrorsCaseId)}\\/event-triggers\\/${escapeRegExp(caseDetailsEventErrorsEventId)}$`
    ),
  });
}

export async function seedCaseDetailsEventErrorsSession(page: Page): Promise<void> {
  await setupXuiAppShellBaseRoutes(page, {
    userDetails,
    environmentConfig: {
      ccdGatewayUrl: targetOrigin,
    },
  });

  await setupTaskListBootstrapRoutes(
    page,
    [caseDetailsEventErrorsJurisdictionId],
    [{ serviceId: caseDetailsEventErrorsJurisdictionId, serviceName: 'Immigration and Asylum' }],
    {
      userId: userDetails.userId,
      roleCategory: userDetails.roleCategory,
      roles: userDetails.roles,
      replaceRoleAssignments: true,
    }
  );

  await page.route('**/auth/isAuthenticated*', async (route) => fulfillJson(route, true));
  await page.route(`**/data/internal/cases/${caseDetailsEventErrorsCaseId}*`, async (route) =>
    fulfillJson(route, caseMockResponse)
  );
  await page.route(`**/workallocation/case/task/${caseDetailsEventErrorsCaseId}*`, async (route) => fulfillJson(route, []));
  await page.route(
    `**/workallocation/case/tasks/${caseDetailsEventErrorsCaseId}/event/${caseDetailsEventErrorsEventId}/caseType/${caseDetailsEventErrorsCaseTypeId}/jurisdiction/${caseDetailsEventErrorsJurisdictionId}*`,
    async (route) => fulfillJson(route, { task_required_for_event: false, tasks: [] })
  );
  await page.route(
    `**/data/internal/cases/${caseDetailsEventErrorsCaseId}/event-triggers/${caseDetailsEventErrorsEventId}*`,
    async (route) => fulfillJson(route, { message: caseDetailsEventErrorsErrorMessage }, 400)
  );
  await page.route('**/data/internal/profile*', async (route) => fulfillJson(route, profileDetails));
  await page.route('**/api/organisation*', async (route) =>
    fulfillJson(route, {
      name: 'Playwright Organisation',
      organisationIdentifier: 'PLAYWRIGHT_ORG',
      status: 'ACTIVE',
      contactInformation: [],
      paymentAccount: [],
    })
  );

  await page.context().addCookies(rebaseStorageStateCookies(loadStorageStateCookies(storageStatePath)));
}
