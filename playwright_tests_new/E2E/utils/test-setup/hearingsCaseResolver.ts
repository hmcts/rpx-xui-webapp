import type { Page } from '@playwright/test';
import { acceptAccessCookiesIfPresent } from '../../../common/sessionCapture';
import { caseDetailsUrl } from '../../../integration/helpers/hearingJourneySetup.helper';
import { EXUI_TIMEOUTS } from '../../page-objects/pages/exui/exui-timeouts';
import { createPrlHearingsCaseIfEnabled } from './prlHearingsCaseSetup';

type HearingCaseRoute = {
  jurisdictionId: string;
  caseTypeId: string;
  caseReference?: string;
  caseReferencePattern: string;
  preferredStates: string[];
};

type GlobalSearchResult = {
  caseReference?: string;
  stateId?: string;
};

type GlobalSearchResponse = {
  results?: GlobalSearchResult[];
};

type CaseDetailsProbeStatus = 'usable' | 'challenged-access' | 'unusable';

const CASE_REFERENCE_REGEX = /^\d{16}$/;
const CASE_PROBE_TIMEOUT_MS = EXUI_TIMEOUTS.CASE_DETAILS_VISIBLE;
const MAX_CASE_PROBES = 10;

function normalize(value: string): string {
  return value.toLowerCase().replaceAll(/[\s_-]/g, '');
}

function stateMatchesPreference(stateId: string | undefined, preferredStates: string[]): boolean {
  if (!stateId || preferredStates.length === 0) {
    return preferredStates.length === 0;
  }

  const normalizedState = normalize(stateId);
  return preferredStates.some((preferredState) => normalizedState.includes(normalize(preferredState)));
}

async function resolveCandidateCaseReferences(page: Page, route: HearingCaseRoute): Promise<string[]> {
  const response = await page.request.post('/api/globalsearch/results', {
    data: {
      searchCriteria: {
        CCDCaseTypeIds: [route.caseTypeId],
        CCDJurisdictionIds: [route.jurisdictionId],
        caseManagementBaseLocationIds: null,
        caseManagementRegionIds: null,
        caseReferences: [route.caseReferencePattern],
        otherReferences: null,
        parties: [],
        stateIds: null,
      },
      sortCriteria: null,
      maxReturnRecordCount: 50,
      startRecordNumber: 1,
    },
    failOnStatusCode: false,
  });

  if (response.status() !== 200) {
    throw new Error(`Global search returned ${response.status()} while resolving a PRL hearings case.`);
  }

  const payload = (await response.json()) as GlobalSearchResponse;
  const results = Array.isArray(payload.results) ? payload.results : [];
  const preferredResults = results.filter((result) => stateMatchesPreference(result.stateId, route.preferredStates));
  const orderedResults = preferredResults.length > 0 ? preferredResults : results;

  return Array.from(
    new Set(
      orderedResults
        .map((result) => result.caseReference)
        .filter((caseReference): caseReference is string => Boolean(caseReference && CASE_REFERENCE_REGEX.test(caseReference)))
    )
  ).slice(0, MAX_CASE_PROBES);
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
  if (route.caseReference) {
    await openCaseDetailsProbe(page, route, route.caseReference);
    const probeStatus = await getCaseDetailsProbeStatus(page);
    if (probeStatus === 'usable') {
      return route.caseReference;
    }
    const accessHint =
      probeStatus === 'challenged-access'
        ? ' It opened the challenged-access screen, so the hearing manager cannot use it without an access request.'
        : '';
    throw new Error(
      `Configured PRL_HEARINGS_CASE_REFERENCE ${route.caseReference} did not open a usable case-details tab list for ${route.jurisdictionId}/${route.caseTypeId}.${accessHint} Use a case that this hearing manager can access without challenged access.`
    );
  }

  const createdCaseReference = await createPrlHearingsCaseIfEnabled();
  if (createdCaseReference) {
    await openCaseDetailsProbe(page, route, createdCaseReference);
    const probeStatus = await getCaseDetailsProbeStatus(page);
    if (probeStatus === 'usable') {
      return createdCaseReference;
    }
    const accessHint =
      probeStatus === 'challenged-access'
        ? ' It opened the challenged-access screen, so check the created case court location against the hearing manager work area.'
        : '';
    throw new Error(
      `PRL hearings setup created case ${createdCaseReference}, but it did not open a usable case-details tab list for ${route.jurisdictionId}/${route.caseTypeId}.${accessHint} The resolver validates access in the signed-in hearing manager session, so check the setup user's location and the hearing manager access model before falling back to shared cases.`
    );
  }

  // const candidateCaseReferences = await resolveCandidateCaseReferences(page, route);
  // let challengedAccessCandidates = 0;
  //
  // for (const caseReference of candidateCaseReferences) {
  //   await openCaseDetailsProbe(page, route, caseReference);
  //
  //   const probeStatus = await getCaseDetailsProbeStatus(page);
  //   if (probeStatus === 'usable') {
  //     return caseReference;
  //   }
  //   if (probeStatus === 'challenged-access') {
  //     challengedAccessCandidates += 1;
  //   }
  // }
  //
  // throw new Error(
  //   `Global search returned ${candidateCaseReferences.length} ${route.jurisdictionId}/${route.caseTypeId} candidate(s), but none opened a usable case-details tab list. ${challengedAccessCandidates} candidate(s) opened the challenged-access screen for this hearing manager. Set PRL_HEARINGS_CASE_REFERENCE to a known accessible PRL hearings case or enable PRL_HEARINGS_CASE_SETUP and prove the created case opens for this hearing manager.`
  // );
}
