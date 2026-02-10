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
