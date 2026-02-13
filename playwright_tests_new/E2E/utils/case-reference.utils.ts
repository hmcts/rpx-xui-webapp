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

function randomDigitString(length: number): string {
  let value = '';
  for (let index = 0; index < length; index += 1) {
    value += Math.floor(Math.random() * 10).toString();
  }
  return value;
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
 * - Multiple fallback strategies require sequential evaluation
 * - Alternative (extracting 5+ tiny helpers) would obscure error handling flow
 * - Similar pattern to approved createCase.po.ts methods (agents.md Section 6.2.10)
 *
 * **Resolution Strategy:**
 * 1. Query /api/globalsearch/results with jurisdiction/state filters
 * 2. Retry on transient failures (429 rate limit, 502-504 gateway timeouts) with exponential backoff
 * 3. Prefer results matching preferredStates, fallback to any valid result
 * 4. Final fallback to HTML page scraping if API unavailable
 *
 * **Known AAT Environment Issues Handled:**
 * - Transient 429 rate limiting during parallel test execution
 * - Gateway timeouts (502-504) during infrastructure deployments
 * - API unavailability requiring HTML scraping fallback
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
 * @throws Error if no valid case found after all retries and fallback strategies
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
  let lastStatus = 0;
  let attempts = 0;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    attempts = attempt;
    const response = await executeGlobalSearchRequest(page, caseReferencePattern, jurisdictionIds ?? null, maxReturnRecordCount);

    lastStatus = response.status();
    if (lastStatus === 200) {
      const payload = (await response.json()) as GlobalSearchResponse;
      results = Array.isArray(payload.results) ? payload.results : [];
      break;
    }

    if (TRANSIENT_GLOBAL_SEARCH_STATUSES.has(lastStatus) && attempt < maxAttempts) {
      await page.waitForTimeout(attempt * 1000);
      continue;
    }

    break;
  }

  if (lastStatus !== 200) {
    const htmlFallbackCaseReference = await resolveCaseReferenceFromHtmlPages(page);
    if (htmlFallbackCaseReference) {
      return htmlFallbackCaseReference;
    }
    throw new Error(
      `Global search API returned status ${lastStatus} when resolving case reference after ${attempts}/${maxAttempts} attempts`
    );
  }

  const eligibleResults =
    preferredStates.length > 0
      ? results.filter((result) => result.stateId && stateMatchesPreference(result.stateId, preferredStates))
      : results;

  const selectedResult = eligibleResults.find(
    (result) => result.caseReference && CASE_REFERENCE_REGEX.test(result.caseReference)
  );
  if (selectedResult?.caseReference) {
    return selectedResult.caseReference;
  }

  const fallbackResult = results.find((result) => result.caseReference && CASE_REFERENCE_REGEX.test(result.caseReference));
  if (fallbackResult?.caseReference) {
    return fallbackResult.caseReference;
  }

  const htmlFallbackCaseReference = await resolveCaseReferenceFromHtmlPages(page);
  if (htmlFallbackCaseReference) {
    return htmlFallbackCaseReference;
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
 * await expect(searchPage.noResultsHeading).toBeVisible();
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

    const results = Array.isArray(responsePayload.results) ? responsePayload.results : [];
    const exactMatchFound = results.some((result) => result.caseReference === candidateReference);
    if (!exactMatchFound) {
      return candidateReference;
    }
  }

  throw new Error(`Unable to generate a non-existent 16-digit case reference after ${maxAttempts} attempts`);
}

async function resolveCaseReferenceFromHtmlPages(page: Page): Promise<string | null> {
  const candidatePaths = ['/work/my-work/list', '/work/all-work/tasks', '/cases'];
  const references = new Set<string>();

  for (const path of candidatePaths) {
    const response = await page.request.get(path, { failOnStatusCode: false });
    if (response.status() !== 200) {
      continue;
    }

    const html = await response.text();
    const caseReferenceRegex = /\/cases\/case-details\/[^/\s]+\/[^/\s]+\/(\d{16})/g;
    let match = caseReferenceRegex.exec(html);
    while (match) {
      references.add(match[1]);
      match = caseReferenceRegex.exec(html);
    }
  }

  const [firstReference] = Array.from(references);
  return firstReference ?? null;
}
