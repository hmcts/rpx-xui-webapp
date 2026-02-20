import { Page } from '@playwright/test';

type GlobalSearchResult = {
  caseReference?: string;
  stateId?: string;
};

type GlobalSearchResponse = {
  results?: GlobalSearchResult[];
};

type ResolveCaseReferenceOptions = {
  jurisdictionIds?: string[];
  preferredStates?: string[];
  caseReferencePattern?: string;
  maxReturnRecordCount?: number;
};

function randomDigitString(length: number): string {
  let value = '';
  for (let index = 0; index < length; index += 1) {
    value += Math.floor(Math.random() * 10).toString();
  }
  return value;
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[\s_-]/g, '');
}

function stateMatchesPreference(stateId: string, preferredStates: string[]): boolean {
  const normalizedState = normalize(stateId);
  return preferredStates.some((preferredState) => normalizedState.includes(normalize(preferredState)));
}

export async function resolveCaseReferenceFromGlobalSearch(
  page: Page,
  options: ResolveCaseReferenceOptions = {}
): Promise<string> {
  const { jurisdictionIds, preferredStates = [], caseReferencePattern = '*', maxReturnRecordCount = 50 } = options;

  const response = await page.request.post('/api/globalsearch/results', {
    data: {
      searchCriteria: {
        CCDCaseTypeIds: null,
        CCDJurisdictionIds: jurisdictionIds ?? null,
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
    },
    failOnStatusCode: false,
  });

  let results: GlobalSearchResult[] = [];
  if (response.status() === 200) {
    const payload = (await response.json()) as GlobalSearchResponse;
    results = Array.isArray(payload.results) ? payload.results : [];
  } else {
    const htmlFallbackCaseReference = await resolveCaseReferenceFromHtmlPages(page);
    if (htmlFallbackCaseReference) {
      return htmlFallbackCaseReference;
    }
    throw new Error(`Global search API returned status ${response.status()} when resolving case reference`);
  }
  const caseRefRegex = /^\d{16}$/;

  const eligibleResults =
    preferredStates.length > 0
      ? results.filter((result) => result.stateId && stateMatchesPreference(result.stateId, preferredStates))
      : results;

  const selectedResult = eligibleResults.find((result) => result.caseReference && caseRefRegex.test(result.caseReference));
  if (selectedResult?.caseReference) {
    return selectedResult.caseReference;
  }

  const fallbackResult = results.find((result) => result.caseReference && caseRefRegex.test(result.caseReference));
  if (fallbackResult?.caseReference) {
    return fallbackResult.caseReference;
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

export async function resolveNonExistentCaseReference(
  page: Page,
  options: ResolveCaseReferenceOptions = {},
  maxAttempts = 12
): Promise<string> {
  const { jurisdictionIds = ['PUBLICLAW'] } = options;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidateReference = `9${randomDigitString(15)}`;
    const response = await page.request.post('/api/globalsearch/results', {
      data: {
        searchCriteria: {
          CCDCaseTypeIds: null,
          CCDJurisdictionIds: jurisdictionIds,
          caseManagementBaseLocationIds: null,
          caseManagementRegionIds: null,
          caseReferences: [candidateReference],
          otherReferences: null,
          parties: [],
          stateIds: null,
        },
        sortCriteria: null,
        maxReturnRecordCount: 10,
        startRecordNumber: 1,
      },
      failOnStatusCode: false,
    });

    if (response.status() !== 200) {
      let responseBodySnippet = '';
      try {
        responseBodySnippet = (await response.text()).replace(/\s+/g, ' ').trim().slice(0, 200);
      } catch {
        responseBodySnippet = '';
      }

      throw new Error(
        `Infrastructure error while resolving non-existent case reference: expected 200 from /api/globalsearch/results but received ${response.status()} on attempt ${attempt + 1}/${maxAttempts} for candidate ${candidateReference}.${responseBodySnippet ? ` Response snippet: ${responseBodySnippet}` : ''}`
      );
    }

    const payload = (await response.json()) as GlobalSearchResponse;
    const results = Array.isArray(payload.results) ? payload.results : [];
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
