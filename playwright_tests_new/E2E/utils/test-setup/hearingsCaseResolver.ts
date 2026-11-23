import type { Page } from '@playwright/test';
import { acceptAccessCookiesIfPresent, ensureAuthenticatedPage, ensureSession } from '../../../common/sessionCapture';
import { caseDetailsUrl } from '../../../integration/helpers/hearingJourneySetup.helper';
import { EXUI_TIMEOUTS } from '../../page-objects/pages/exui/exui-timeouts';
import { FrameworkError } from '../frameworkError';
import { resolveRuntimeUserCredentialsForIdentifier } from '../runtimeUserCredentials';
import type { HearingManagerUserIdentifier } from '../../../integration/helpers/hearingManagerUserPool.helper';
import { createPrlHearingsCaseIfEnabled } from './prlHearingsCaseSetup';
import type { PrlHearingsCaseSetupResult } from './prlHearingsCaseSetup';

type HearingCaseRoute = {
  jurisdictionId: string;
  caseTypeId: string;
};

type SetupUserCredentials = {
  username: string;
  password: string;
};

type UserDetailsResponse = {
  userInfo?: {
    roles?: string[];
  };
  roleAssignmentInfo?: Array<{
    jurisdiction?: string;
    roleName?: string;
    primaryLocation?: string;
    region?: string;
    substantive?: string;
  }>;
};

type CaseViewAccessResponse = {
  metadataFields?: Array<{ id?: string; value?: unknown }>;
};

export type CaseViewAccess = {
  standard: boolean;
  accessGranted?: string;
  accessProcess?: string;
};

type CaseAccessProbe = { status: number; body?: CaseViewAccessResponse };

type CaseDetailsProbeStatus = 'usable' | 'challenged-access' | 'unusable';

const CASE_PROBE_TIMEOUT_MS = EXUI_TIMEOUTS.CASE_DETAILS_VISIBLE;
export const PRL_HEARINGS_CASE_ACCESS_DENIED_CODE = 'PRL_HEARINGS_CASE_ACCESS_DENIED';
const CASE_VIEW_ACCEPT_HEADER = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-case-view.v2+json;charset=UTF-8';
const ACCESS_PROCESS_FIELD_ID = '[ACCESS_PROCESS]';
const ACCESS_GRANTED_FIELD_ID = '[ACCESS_GRANTED]';
const BASIC_ACCESS_GRANT = 'BASIC';
const NON_STANDARD_ACCESS_PROCESSES = ['CHALLENGED', 'SPECIFIC'];
const CASE_ACCESS_DENIED_STATUSES = new Set([403, 404]);
const REQUIRED_PRL_COURT_ADMIN_ROLE = 'caseworker-privatelaw-courtadmin';
const REQUIRED_PRL_LOCATION_ROLES = [
  'hearing-centre-admin',
  'hearing-centre-team-leader',
  'case-allocator',
  'task-supervisor',
  'specific-access-approver-admin',
] as const;

function resolveHearingManagerPrimaryLocation(userDetails: UserDetailsResponse, jurisdictionId: string): string {
  const roles = Array.isArray(userDetails.userInfo?.roles) ? userDetails.userInfo.roles : [];
  if (!roles.includes(REQUIRED_PRL_COURT_ADMIN_ROLE)) {
    throw new Error(`PRL hearings setup requires the signed-in user to have the ${REQUIRED_PRL_COURT_ADMIN_ROLE} IDAM role.`);
  }

  const assignments = userDetails.roleAssignmentInfo ?? [];
  const hearingManagerLocations = Array.from(
    new Set(
      assignments
        .filter((assignment) => assignment.jurisdiction === jurisdictionId && assignment.roleName === 'hearing-manager')
        .map((assignment) => assignment.primaryLocation?.trim())
        .filter((location): location is string => Boolean(location))
    )
  );

  if (hearingManagerLocations.length !== 1) {
    throw new Error(
      `PRL hearings setup expected exactly one ${jurisdictionId} hearing-manager primary location, found ${hearingManagerLocations.length}.`
    );
  }

  const prlAccessLocations = Array.from(
    new Set(
      assignments
        .filter(
          (assignment) =>
            assignment.jurisdiction === jurisdictionId &&
            REQUIRED_PRL_LOCATION_ROLES.includes(assignment.roleName as (typeof REQUIRED_PRL_LOCATION_ROLES)[number]) &&
            assignment.substantive === 'Y'
        )
        .map((assignment) => assignment.primaryLocation?.trim())
        .filter((location): location is string => Boolean(location))
    )
  );

  if (prlAccessLocations.length !== 1 || prlAccessLocations[0] !== hearingManagerLocations[0]) {
    throw new Error(
      `PRL hearings setup expected one unambiguous substantive ${jurisdictionId} access location matching the hearing-manager location, found ${prlAccessLocations.length}.`
    );
  }

  return hearingManagerLocations[0];
}

function listPrlAccessRoleRegions(userDetails: UserDetailsResponse, jurisdictionId: string): string[] {
  return Array.from(
    new Set(
      (userDetails.roleAssignmentInfo ?? [])
        .filter(
          (assignment) =>
            assignment.jurisdiction === jurisdictionId &&
            REQUIRED_PRL_LOCATION_ROLES.includes(assignment.roleName as (typeof REQUIRED_PRL_LOCATION_ROLES)[number]) &&
            assignment.substantive === 'Y'
        )
        .map((assignment) => assignment.region?.trim())
        .filter((region): region is string => Boolean(region))
    )
  );
}

async function readSignedInUserDetails(page: Page): Promise<UserDetailsResponse> {
  const response = await page.request.get('/api/user/details?refreshRoleAssignments=true', { failOnStatusCode: false });
  if (response.status() !== 200) {
    throw new Error(`PRL hearings setup could not read the signed-in user details (HTTP ${response.status()}).`);
  }
  return (await response.json()) as UserDetailsResponse;
}

async function getHearingManagerPrimaryLocation(page: Page, jurisdictionId: string): Promise<string> {
  return resolveHearingManagerPrimaryLocation(await readSignedInUserDetails(page), jurisdictionId);
}

/** Mirrors ccd-case-ui-toolkit CaseViewerComponent.hasStandardAccess(): a BASIC grant with CHALLENGED/SPECIFIC process shows an access-request screen. */
function resolveCaseViewAccess(caseView: CaseViewAccessResponse): CaseViewAccess {
  const fields = Array.isArray(caseView.metadataFields) ? caseView.metadataFields : [];
  const readField = (id: string) => {
    const field = fields.find((entry) => entry.id === id);
    return field?.value === undefined || field.value === null ? undefined : String(field.value);
  };
  const accessGranted = readField(ACCESS_GRANTED_FIELD_ID);
  const accessProcess = readField(ACCESS_PROCESS_FIELD_ID);
  const hasNonBasicGrant = accessGranted !== undefined && accessGranted !== BASIC_ACCESS_GRANT;
  const standard = hasNonBasicGrant || !NON_STANDARD_ACCESS_PROCESSES.includes(accessProcess ?? '');
  return { standard, accessGranted, accessProcess };
}

type CaseAccessContext = {
  userLabel: string;
  createdCase: PrlHearingsCaseSetupResult;
  userAccessRegions: string[];
};

function describeCaseAccessGap(context: CaseAccessContext): string {
  const location = context.createdCase.caseManagementLocation;
  const caseRegion = location?.region ?? 'unknown';
  const userRegions = context.userAccessRegions.length > 0 ? context.userAccessRegions.join(', ') : 'none';
  return (
    `case baseLocation ${location?.baseLocation ?? 'unknown'}, case region ${caseRegion}; ` +
    `user substantive PRL access-role regions: ${userRegions}`
  );
}

/**
 * Fails fast, before any UI navigation, when the signed-in session cannot read the created case with standard access.
 * Uses the same CCD internal case view (through the EXUI proxy) that decides whether the UI renders the challenged-access screen.
 */
function assertStandardCaseAccess(probe: CaseAccessProbe, context: CaseAccessContext): CaseViewAccess {
  const { caseReference } = context.createdCase;
  if (CASE_ACCESS_DENIED_STATUSES.has(probe.status)) {
    throw new FrameworkError(
      PRL_HEARINGS_CASE_ACCESS_DENIED_CODE,
      'setup',
      `PRL hearings setup user ${context.userLabel} cannot read created case ${caseReference} ` +
        `(CCD case view HTTP ${probe.status}; ${describeCaseAccessGap(context)}). ` +
        `Fix the user's PRIVATELAW role assignments; this is not a transient failure.`
    );
  }
  if (probe.status !== 200 || !probe.body) {
    throw new Error(
      `PRL hearings setup could not verify access to created case ${caseReference} for ${context.userLabel} ` +
        `(CCD case view HTTP ${probe.status}).`
    );
  }
  const access = resolveCaseViewAccess(probe.body);
  if (!access.standard) {
    throw new FrameworkError(
      PRL_HEARINGS_CASE_ACCESS_DENIED_CODE,
      'setup',
      `PRL hearings setup user ${context.userLabel} has only ${access.accessGranted ?? 'no'} access to created case ` +
        `${caseReference} (access process ${access.accessProcess ?? 'missing'}; ${describeCaseAccessGap(context)}), ` +
        `so EXUI would open the challenged-access screen. Fix the user's substantive PRIVATELAW org role ` +
        `location/region to cover the case; this is not a transient failure.`
    );
  }
  return access;
}

async function probeCaseAccess(page: Page, caseReference: string): Promise<CaseAccessProbe> {
  const response = await page.request.get(`/data/internal/cases/${caseReference}`, {
    headers: { experimental: 'true', Accept: CASE_VIEW_ACCEPT_HEADER },
    failOnStatusCode: false,
  });
  const status = response.status();
  return status === 200 ? { status, body: (await response.json()) as CaseViewAccessResponse } : { status };
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

export async function openEligibleHearingsCase(
  page: Page,
  route: HearingCaseRoute,
  setupUserCredentials?: SetupUserCredentials,
  userLabel = 'signed-in hearing manager'
) {
  const userDetails = await readSignedInUserDetails(page);
  const primaryLocation = resolveHearingManagerPrimaryLocation(userDetails, route.jurisdictionId);
  const createdCase = await createPrlHearingsCaseIfEnabled(primaryLocation, setupUserCredentials);
  if (!createdCase) {
    throw new Error(
      'PRL hearings setup must be enabled so the journey can create a fresh case for the selected hearing manager.'
    );
  }

  assertStandardCaseAccess(await probeCaseAccess(page, createdCase.caseReference), {
    userLabel,
    createdCase,
    userAccessRegions: listPrlAccessRoleRegions(userDetails, route.jurisdictionId),
  });

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

export async function openEligibleHearingsCaseForUser(
  page: Page,
  route: HearingCaseRoute,
  userIdentifier: HearingManagerUserIdentifier
): Promise<void> {
  await ensureSession(userIdentifier);
  await ensureAuthenticatedPage(page, userIdentifier, {
    waitForSelector: 'exui-header',
    timeoutMs: EXUI_TIMEOUTS.SEARCH_FIELD_VISIBLE,
  });

  const setupCredentials = resolveRuntimeUserCredentialsForIdentifier(userIdentifier);
  if (!setupCredentials) {
    throw new Error(`PRL hearings setup could not resolve runtime credentials for ${userIdentifier}.`);
  }

  await openEligibleHearingsCase(
    page,
    route,
    {
      username: setupCredentials.email,
      password: setupCredentials.password,
    },
    userIdentifier
  );
}

export const __test__ = {
  resolveHearingManagerPrimaryLocation,
  getHearingManagerPrimaryLocation,
  resolveCaseViewAccess,
  assertStandardCaseAccess,
  listPrlAccessRoleRegions,
};
