import type { Page } from '@playwright/test';
import { acceptAccessCookiesIfPresent } from '../../../common/sessionCapture';
import { caseDetailsUrl } from '../../../integration/helpers/hearingJourneySetup.helper';
import { EXUI_TIMEOUTS } from '../../page-objects/pages/exui/exui-timeouts';
import { createPrlHearingsCaseIfEnabled } from './prlHearingsCaseSetup';

type HearingCaseRoute = {
  jurisdictionId: string;
  caseTypeId: string;
};

type UserDetailsResponse = {
  userInfo?: {
    roles?: string[];
  };
  roleAssignmentInfo?: Array<{
    jurisdiction?: string;
    roleName?: string;
    primaryLocation?: string;
  }>;
};

type CaseDetailsProbeStatus = 'usable' | 'challenged-access' | 'unusable';

const CASE_PROBE_TIMEOUT_MS = EXUI_TIMEOUTS.CASE_DETAILS_VISIBLE;
const REQUIRED_PRL_COURT_ADMIN_ROLE = 'caseworker-privatelaw-courtadmin';

function resolveHearingManagerPrimaryLocation(userDetails: UserDetailsResponse, jurisdictionId: string): string {
  const roles = Array.isArray(userDetails.userInfo?.roles) ? userDetails.userInfo.roles : [];
  if (!roles.includes(REQUIRED_PRL_COURT_ADMIN_ROLE)) {
    throw new Error(`PRL hearings setup requires the signed-in user to have the ${REQUIRED_PRL_COURT_ADMIN_ROLE} IDAM role.`);
  }

  const locations = Array.from(
    new Set(
      (userDetails.roleAssignmentInfo ?? [])
        .filter((assignment) => assignment.jurisdiction === jurisdictionId && assignment.roleName === 'hearing-manager')
        .map((assignment) => assignment.primaryLocation?.trim())
        .filter((location): location is string => Boolean(location))
    )
  );

  if (locations.length !== 1) {
    throw new Error(
      `PRL hearings setup expected exactly one ${jurisdictionId} hearing-manager primary location, found ${locations.length}.`
    );
  }

  return locations[0];
}

async function getHearingManagerPrimaryLocation(page: Page, jurisdictionId: string): Promise<string> {
  const response = await page.request.get('/api/user/details?refreshRoleAssignments=true', { failOnStatusCode: false });
  if (response.status() !== 200) {
    throw new Error(`PRL hearings setup could not read the signed-in user details (HTTP ${response.status()}).`);
  }

  return resolveHearingManagerPrimaryLocation((await response.json()) as UserDetailsResponse, jurisdictionId);
}

async function getCaseDetailsProbeStatus(page: Page): Promise<CaseDetailsProbeStatus> {
  const isCaseDetailsRoute = await page
    .waitForURL((url) => url.pathname.includes('/cases/case-details/'), { timeout: CASE_PROBE_TIMEOUT_MS })
    .then(
      () => true,
      () => false
    );

  if (!isCaseDetailsRoute) {
    return 'unusable';
  }

  const hearingsTab = page
    .locator('[role="tab"]')
    .filter({ hasText: /^Hearings$/ })
    .first();
  const challengedAccessBanner = page.getByText('This case requires challenged access').first();

  return Promise.race([
    hearingsTab.waitFor({ state: 'visible', timeout: CASE_PROBE_TIMEOUT_MS }).then(() => 'usable' as const),
    challengedAccessBanner.waitFor({ state: 'visible', timeout: CASE_PROBE_TIMEOUT_MS }).then(() => 'challenged-access' as const),
  ]).catch(() => 'unusable' as const);
}

async function openCaseDetailsProbe(page: Page, route: HearingCaseRoute, caseReference: string): Promise<void> {
  const targetUrl = caseDetailsUrl(route.jurisdictionId, route.caseTypeId, caseReference);

  await page.goto(targetUrl, {
    waitUntil: 'domcontentloaded',
  });
  const acceptedCookies = await acceptAccessCookiesIfPresent(page);

  if (acceptedCookies && !page.url().includes(targetUrl)) {
    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
    });
  }
}

export async function openEligibleHearingsCase(page: Page, route: HearingCaseRoute) {
  const primaryLocation = await getHearingManagerPrimaryLocation(page, route.jurisdictionId);
  const createdCase = await createPrlHearingsCaseIfEnabled(primaryLocation);
  if (!createdCase) {
    throw new Error(
      'PRL hearings setup must be enabled so the journey can create a fresh case for the selected hearing manager.'
    );
  }

  await openCaseDetailsProbe(page, route, createdCase.caseReference);
  const probeStatus = await getCaseDetailsProbeStatus(page);
  if (probeStatus === 'usable') {
    return createdCase;
  }
  const accessHint =
    probeStatus === 'challenged-access'
      ? ' It opened the challenged-access screen, so check the created case court location against the hearing manager work area.'
      : '';
  throw new Error(
    `PRL hearings setup created case ${createdCase.caseReference}, but it did not open a usable case-details tab list for ${route.jurisdictionId}/${route.caseTypeId}.${accessHint} The resolver validates access in the signed-in hearing manager session, so check the setup user's role and location access model.`
  );
}

export const __test__ = {
  resolveHearingManagerPrimaryLocation,
  getHearingManagerPrimaryLocation,
};
