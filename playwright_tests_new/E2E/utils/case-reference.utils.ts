import { Page } from '@playwright/test';

type GlobalSearchResult = {
  caseReference?: string;
  stateId?: string;
};

type GlobalSearchResponse = {
  results?: GlobalSearchResult[];
};

export type ResolveCaseReferenceOptions = {
  jurisdictionIds?: string[];
  preferredStates?: string[];
  caseReferencePattern?: string;
  maxReturnRecordCount?: number;
};

const CASE_REFERENCE_REGEX = /^\d{16}$/;
const TRANSIENT_GLOBAL_SEARCH_STATUSES = new Set([429, 502, 503, 504]);
const GLOBAL_SEARCH_REQUEST_TIMEOUT_MS = 30_000;
// One budget for API attempts and backoff, so a slow search ends with a clear error well
// inside the caller's test timeout instead of a generic test timeout.
const CASE_REFERENCE_RESOLUTION_BUDGET_MS = 90_000;
// Status recorded when the request itself timed out, so the bounded retry still applies.
const GLOBAL_SEARCH_REQUEST_TIMED_OUT = 'request timeout';

type GlobalSearchRequestBody = {
  searchCriteria: {
    CCDCaseTypeIds: null;
    CCDJurisdictionIds: string[] | null;
    caseManagementBaseLocationIds: null;
    caseManagementRegionIds: null;
    caseReferences: string[];
    otherReferences: null;
    parties: [];
    stateIds: null;
  };
  sortCriteria: null;
  maxReturnRecordCount: number;
  startRecordNumber: 1;
};

function buildGlobalSearchRequestBody(
  caseReferencePattern: string,
  jurisdictionIds: string[] | null,
  maxReturnRecordCount: number
): GlobalSearchRequestBody {
  return {
    searchCriteria: {
      CCDCaseTypeIds: null,
      CCDJurisdictionIds: jurisdictionIds,
      caseManagementBaseLocationIds: null,
      caseManagementRegionIds: null,
      caseReferences: [caseReferencePattern],
      otherReferences: null,
      parties: [],
      stateIds: null,
    },
    sortCriteria: null,
    maxReturnRecordCount,
    startRecordNumber: 1,
  };
}

async function executeGlobalSearchRequest(
  page: Page,
  caseReferencePattern: string,
  jurisdictionIds: string[] | null,
  maxReturnRecordCount = 10,
  timeoutMs = GLOBAL_SEARCH_REQUEST_TIMEOUT_MS
) {
  return page.request.post('/api/globalsearch/results', {
    data: buildGlobalSearchRequestBody(caseReferencePattern, jurisdictionIds, maxReturnRecordCount),
    failOnStatusCode: false,
    timeout: timeoutMs,
  });
}

function remainingRequestTimeout(deadlineMs: number): number {
  return Math.min(GLOBAL_SEARCH_REQUEST_TIMEOUT_MS, deadlineMs - Date.now());
}

function isRequestTimeoutError(error: unknown): boolean {
  return error instanceof Error && (error.name === 'TimeoutError' || /Timeout \d+ms exceeded/.test(error.message));
}

function randomDigitString(length: number): string {
  let value = '';
  for (let index = 0; index < length; index += 1) {
    value += Math.floor(Math.random() * 10).toString();
  }
  return value;
}

function normalizeCaseReference(value: unknown): string | undefined {
  if (typeof value !== 'string' || !/^[\d\s-]+$/.test(value)) return undefined;
  const digits = value.replaceAll(/[\s-]/g, '');
  return CASE_REFERENCE_REGEX.test(digits) ? digits : undefined;
}

function normalize(value: string): string {
  return value.toLowerCase().replaceAll(/[\s_-]/g, '');
}

function stateMatchesPreference(stateId: string, preferredStates: string[]): boolean {
  const normalizedState = normalize(stateId);
  return preferredStates.some((preferredState) => normalizedState.includes(normalize(preferredState)));
}

/**
 * Resolve a valid 16-digit CCD case reference from Global Search API
 *
 * **Cognitive Complexity: 16** (SonarQube limit: 15)
 * Inline complexity is intentional and preferable to method fragmentation.
 *
 * **Why Complexity is Acceptable:**
 * - Self-contained linear retry loop with clear exit conditions
 * - Search, state preference and result selection share the same response
 * - Alternative (extracting 5+ tiny helpers) would obscure error handling flow
 * - Similar pattern to approved createCase.po.ts methods (agents.md Section 6.2.10)
 *
 * **Resolution Strategy:**
 * 1. Query /api/globalsearch/results with jurisdiction/state filters
 * 2. Retry on transient failures (429 rate limit, 502-504 gateway timeouts, request timeouts) with linear backoff
 * 3. Prefer results matching preferredStates, fallback to any valid result
 * 4. API attempts and backoff share one 90s deadline (per request at most 30s)
 *
 * **Known AAT Environment Issues Handled:**
 * - Transient 429 rate limiting during parallel test execution
 * - Gateway timeouts (502-504) during infrastructure deployments
 *
 * See: agents.md Section 6.2.10, docs/DECISIONS.md Decision 001
 *
 * @param page - Playwright Page instance with authenticated session
 * @param options - Search criteria configuration
 * @param options.jurisdictionIds - Filter by CCD jurisdiction IDs (e.g., ['PUBLICLAW'])
 * @param options.preferredStates - Prefer cases in these states (e.g., ['Submitted', 'Case management'])
 * @param options.caseReferencePattern - Search pattern (default: '*' for any case)
 * @param options.maxReturnRecordCount - Maximum results to retrieve (default: 50)
 * @returns 16-digit CCD case reference suitable for test execution
 * @throws Error if no valid case found after the bounded search attempts
 *
 * @example
 * const caseRef = await resolveCaseReferenceFromGlobalSearch(page, {
 *   jurisdictionIds: ['PUBLICLAW'],
 *   preferredStates: ['Submitted', 'Case management']
 * });
 */
// NOSONAR typescript:S3776 - Cognitive Complexity 16 acceptable per agents.md Section 6.2.10
export async function resolveCaseReferenceFromGlobalSearch(
  page: Page,
  options: ResolveCaseReferenceOptions = {}
): Promise<string> {
  const { jurisdictionIds, preferredStates = [], caseReferencePattern = '*', maxReturnRecordCount = 50 } = options;
  const maxAttempts = Number.parseInt(process.env.CASE_REFERENCE_RESOLVE_API_ATTEMPTS || '3', 10);
  let results: GlobalSearchResult[] = [];
  let lastStatus: number | typeof GLOBAL_SEARCH_REQUEST_TIMED_OUT = 0;
  let attempts = 0;
  const deadlineMs = Date.now() + CASE_REFERENCE_RESOLUTION_BUDGET_MS;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const requestTimeoutMs = remainingRequestTimeout(deadlineMs);
    if (requestTimeoutMs <= 0) {
      break;
    }
    attempts = attempt;
    let response: Awaited<ReturnType<typeof executeGlobalSearchRequest>> | undefined;
    try {
      response = await executeGlobalSearchRequest(
        page,
        caseReferencePattern,
        jurisdictionIds ?? null,
        maxReturnRecordCount,
        requestTimeoutMs
      );
    } catch (error) {
      if (!isRequestTimeoutError(error)) {
        throw error;
      }
      lastStatus = GLOBAL_SEARCH_REQUEST_TIMED_OUT;
    }

    if (response) {
      lastStatus = response.status();
      if (lastStatus === 200) {
        const payload = (await response.json()) as GlobalSearchResponse;
        results = Array.isArray(payload.results) ? payload.results : [];
        break;
      }
    }

    const retryable = lastStatus === GLOBAL_SEARCH_REQUEST_TIMED_OUT || TRANSIENT_GLOBAL_SEARCH_STATUSES.has(lastStatus);
    if (!retryable || attempt >= maxAttempts || Date.now() >= deadlineMs) {
      break;
    }
    await page.waitForTimeout(Math.max(0, Math.min(attempt * 1000, deadlineMs - Date.now())));
  }

  if (lastStatus !== 200) {
    throw new Error(
      `Global search API returned status ${lastStatus} when resolving case reference after ${attempts}/${maxAttempts} attempts ` +
        `within ${CASE_REFERENCE_RESOLUTION_BUDGET_MS}ms`
    );
  }

  const eligibleResults =
    preferredStates.length > 0
      ? results.filter((result) => result?.stateId && stateMatchesPreference(result.stateId, preferredStates))
      : results;

  const selectedResult = eligibleResults.find((result) => result && normalizeCaseReference(result.caseReference));
  const fallbackResult = results.find((result) => result && normalizeCaseReference(result.caseReference));
  const resolvedCaseReference = normalizeCaseReference(selectedResult?.caseReference ?? fallbackResult?.caseReference);
  if (resolvedCaseReference) {
    return resolvedCaseReference;
  }

  throw new Error('No 16-digit case references returned by global search API');
}

export async function resolveCaseReferenceWithFallback(
  page: Page,
  fallbackResolver: () => Promise<string>,
  options: ResolveCaseReferenceOptions = {}
): Promise<string> {
  try {
    return await resolveCaseReferenceFromGlobalSearch(page, options);
  } catch {
    return fallbackResolver();
  }
}

/**
 * Generate a verified non-existent 16-digit CCD case reference for negative testing
 *
 * **Cognitive Complexity: 26** (SonarQube limit: 15)
 * High complexity is justified - nested retry loops required for reliability.
 *
 * **Why Complexity is Necessary:**
 * - Outer loop: Generate random candidates (max 12 attempts to find unused reference)
 * - Inner loop: Handle transient API failures with exponential backoff (3 attempts per candidate)
 * - Must verify uniqueness via API call for each candidate to prevent test collisions
 * - Complex error reporting with response body snippets for infrastructure diagnostics
 * - Early termination on multiple success/failure paths requires branching logic
 *
 * **Why Not Extract Helpers:**
 * - Extracting inner loop creates separate state management complexity
 * - Error context (attempt numbers, candidate reference, response snippets) spans both loops
 * - Sequential nature and shared state make extraction counterproductive
 * - Current implementation is more debuggable than fragmented alternatives
 *
 * **Generation Strategy:**
 * 1. Generate random 16-digit reference starting with '9' (avoids real case number ranges)
 * 2. Query Global Search API to verify reference doesn't exist
 * 3. Retry API call on transient failures (429, 502-504) with exponential backoff
 * 4. Return first verified non-existent reference
 * 5. Fail with detailed diagnostic info if all generation attempts exhausted
 *
 * **Alternative Approaches Considered:**
 * - Pre-generate batch: requires synchronization, adds memory overhead
 * - Use timestamp-based: collision risk in parallel execution, not truly random
 * - Skip verification: risks rare test failures on collisions (unacceptable)
 * - Cache known non-existent refs: stale data risk, adds persistence complexity
 *
 * **Known AAT Environment Issues Handled:**
 * - Transient 429 rate limiting during parallel test execution
 * - Gateway timeouts (502-504) during infrastructure deployments
 * - Rare collisions with newly-created cases (outer loop handles retries)
 *
 * See: agents.md Section 6.2.10 for complexity justification guidelines
 * Reference: STAGE-2-COMPLETE.md for rationale on inline vs extraction patterns
 *
 * @param page - Playwright Page instance with authenticated session
 * @param options - Search options configuration
 * @param options.jurisdictionIds - Jurisdiction to check uniqueness against (default: ['PUBLICLAW'])
 * @param maxAttempts - Maximum candidate generation attempts before failure (default: 12)
 * @returns 16-digit non-existent case reference verified via API, suitable for negative tests
 * @throws Error with diagnostic info (status codes, response snippets, attempt counts) if unable to generate
 *
 * @example
 * // For testing "case not found" scenarios
 * const nonExistentRef = await resolveNonExistentCaseReference(page, {
 *   jurisdictionIds: ['PUBLICLAW']
 * });
 * await searchPage.searchWith16DigitCaseId(nonExistentRef);
 * if (await searchPage.noResultsContainer.isVisible()) {
 *   await expect(searchPage.noResultsHeading).toBeVisible();
 * } else {
 *   await expect(caseListPage.caseSearchResultsMessage).toContainText(/No cases found/i);
 * }
 */
// NOSONAR typescript:S3776 - Cognitive Complexity 26 acceptable per agents.md Section 6.2.10
export async function resolveNonExistentCaseReference(
  page: Page,
  options: ResolveCaseReferenceOptions = {},
  maxAttempts = 12
): Promise<string> {
  const { jurisdictionIds = ['PUBLICLAW'] } = options;
  const maxStatusAttempts = Number.parseInt(process.env.CASE_REFERENCE_RESOLVE_API_ATTEMPTS || '3', 10);

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidateReference = `9${randomDigitString(15)}`;
    let response;
    let responsePayload: GlobalSearchResponse | null = null;
    let lastStatus = 0;
    let infraResponseBodySnippet = '';

    for (let statusAttempt = 1; statusAttempt <= maxStatusAttempts; statusAttempt += 1) {
      response = await executeGlobalSearchRequest(page, candidateReference, jurisdictionIds);

      lastStatus = response.status();
      if (lastStatus === 200) {
        responsePayload = (await response.json()) as GlobalSearchResponse;
        break;
      }

      if (statusAttempt === maxStatusAttempts) {
        try {
          infraResponseBodySnippet = (await response.text()).replaceAll(/\s+/g, ' ').trim().slice(0, 200);
        } catch {
          infraResponseBodySnippet = '';
        }
      }

      if (TRANSIENT_GLOBAL_SEARCH_STATUSES.has(lastStatus) && statusAttempt < maxStatusAttempts) {
        await page.waitForTimeout(statusAttempt * 1000);
        continue;
      }

      break;
    }

    if (!responsePayload) {
      const responseSnippet = infraResponseBodySnippet ? ` Response snippet: ${infraResponseBodySnippet}` : '';
      const errorMessage = `Infrastructure error while resolving non-existent case reference: expected 200 from /api/globalsearch/results but received ${lastStatus} after ${maxStatusAttempts} status attempt(s) on candidate attempt ${attempt + 1}/${maxAttempts} for candidate ${candidateReference}.${responseSnippet}`;
      throw new Error(errorMessage);
    }

    if (!Array.isArray(responsePayload.results)) {
      throw new Error('Global search response must contain a results array');
    }
    const results = responsePayload.results;
    if (results.some((result) => !result || !normalizeCaseReference(result.caseReference))) {
      throw new Error('Global search results must contain valid case references');
    }
    const exactMatchFound = results.some((result) => normalizeCaseReference(result.caseReference) === candidateReference);
    if (!exactMatchFound) {
      return candidateReference;
    }
  }

  throw new Error(`Unable to generate a non-existent 16-digit case reference after ${maxAttempts} attempts`);
}
