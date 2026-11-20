import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

import { resolveCaseReferenceFromGlobalSearch, resolveNonExistentCaseReference } from '../../E2E/utils/case-reference.utils.js';

type Outcome = { status: number; results?: Array<{ caseReference?: string; stateId?: string }> } | 'timeout' | Error;

const realDateNow = Date.now;
let clockMs = 0;

function createFakePage(postOutcomes: Outcome[]) {
  const posts: Array<{ url: string; timeout?: number; data: unknown }> = [];
  const waits: number[] = [];
  const page = {
    request: {
      post: async (url: string, options: { timeout?: number; data: unknown }) => {
        posts.push({ url, timeout: options.timeout, data: options.data });
        const outcome = postOutcomes.shift();
        if (!outcome) throw new Error('Unexpected extra global search request');
        if (outcome === 'timeout') {
          clockMs += options.timeout ?? 0;
          const error = new Error(`apiRequestContext.post: Timeout ${options.timeout}ms exceeded.`);
          error.name = 'TimeoutError';
          throw error;
        }
        if (outcome instanceof Error) throw outcome;
        return { status: () => outcome.status, json: async () => ({ results: outcome.results }) };
      },
      get: async () => {
        throw new Error('HTML application shell is not a case-data source');
      },
    },
    waitForTimeout: async (duration: number) => {
      waits.push(duration);
      clockMs += duration;
    },
  } as unknown as Page;
  return { page, posts, waits };
}

test.describe('Global search case reference resolution', { tag: '@svc-internal' }, () => {
  test.beforeEach(() => {
    clockMs = 1_000_000;
  });
  test.beforeEach(() => {
    Date.now = () => clockMs;
  });
  test.afterEach(() => {
    Date.now = realDateNow;
  });

  test('sends requested jurisdiction and search pattern to the global search contract', async () => {
    const fake = createFakePage([{ status: 200, results: [{ caseReference: '1111222233334444' }] }]);
    await expect(
      resolveCaseReferenceFromGlobalSearch(fake.page, {
        jurisdictionIds: ['PUBLICLAW'],
        caseReferencePattern: '1111*',
        maxReturnRecordCount: 25,
      })
    ).resolves.toBe('1111222233334444');
    expect(fake.posts).toHaveLength(1);
    expect(fake.posts[0].url).toBe('/api/globalsearch/results');
    expect(fake.posts[0].data).toMatchObject({
      searchCriteria: { CCDJurisdictionIds: ['PUBLICLAW'], caseReferences: ['1111*'] },
      maxReturnRecordCount: 25,
    });
  });

  test('retries a request timeout and returns a valid case', async () => {
    const fake = createFakePage(['timeout', { status: 200, results: [{ caseReference: '1111222233334444' }] }]);
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page)).resolves.toBe('1111222233334444');
    expect(fake.posts.map((post) => post.timeout)).toEqual([30_000, 30_000]);
    expect(fake.waits).toEqual([1000]);
  });

  test('fails with the API timeout after the shared budget without requesting an HTML shell', async () => {
    const startedAt = clockMs;
    const fake = createFakePage(['timeout', 'timeout', 'timeout']);
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page)).rejects.toThrow(
      'Global search API returned status request timeout when resolving case reference after 3/3 attempts within 90000ms'
    );
    expect(fake.posts.map((post) => post.timeout)).toEqual([30_000, 30_000, 27_000]);
    expect(fake.waits).toEqual([1000, 2000]);
    expect(clockMs - startedAt).toBe(90_000);
  });

  test('retries a transient status and selects a preferred state before other valid cases', async () => {
    const fake = createFakePage([
      { status: 503 },
      {
        status: 200,
        results: [
          { caseReference: '1111222233334444', stateId: 'Closed' },
          { caseReference: '5555666677778888', stateId: 'Case management' },
        ],
      },
    ]);
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page, { preferredStates: ['case-management'] })).resolves.toBe(
      '5555666677778888'
    );
    expect(fake.posts).toHaveLength(2);
  });

  test('returns a hyphenated API reference as 16 digits', async () => {
    const fake = createFakePage([{ status: 200, results: [{ caseReference: '8771-7857-4127-5065', stateId: 'Submitted' }] }]);
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page, { preferredStates: ['Submitted'] })).resolves.toBe(
      '8771785741275065'
    );
  });

  test('uses another valid result when no preferred state matches', async () => {
    const fake = createFakePage([
      {
        status: 200,
        results: [
          { caseReference: 'invalid', stateId: 'Submitted' },
          { caseReference: '5555666677778888', stateId: 'Closed' },
        ],
      },
    ]);
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page, { preferredStates: ['Submitted'] })).resolves.toBe(
      '5555666677778888'
    );
  });

  test('fails for an empty or invalid result rather than scraping the application shell', async () => {
    for (const results of [[], [{ caseReference: '1234' }]]) {
      const fake = createFakePage([{ status: 200, results }]);
      await expect(resolveCaseReferenceFromGlobalSearch(fake.page)).rejects.toThrow(
        'No 16-digit case references returned by global search API'
      );
    }
  });

  test('does not retry a non-timeout request error', async () => {
    const fake = createFakePage([new Error('socket hang up')]);
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page)).rejects.toThrow('socket hang up');
    expect(fake.posts).toHaveLength(1);
  });

  test('fails without retrying a non-transient status', async () => {
    const fake = createFakePage([{ status: 500 }]);
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page)).rejects.toThrow('returned status 500');
    expect(fake.posts).toHaveLength(1);
  });
});

test.describe('Non-existent case reference verification', { tag: '@svc-internal' }, () => {
  test('returns a candidate only after a valid empty search result', async () => {
    const fake = createFakePage([{ status: 200, results: [] }]);
    const candidate = await resolveNonExistentCaseReference(fake.page);
    expect(candidate).toMatch(/^9\d{15}$/);
    expect(fake.posts[0].data).toMatchObject({ searchCriteria: { caseReferences: [candidate] } });
  });

  test('rejects a successful response with no results array', async () => {
    const fake = createFakePage([{ status: 200 }]);
    await expect(resolveNonExistentCaseReference(fake.page)).rejects.toThrow(
      'Global search response must contain a results array'
    );
  });

  test('rejects malformed case entries rather than certifying a candidate as absent', async () => {
    for (const result of [null, {}, { caseReference: '1234' }]) {
      const fake = createFakePage([{ status: 200, results: [result] as never }]);
      await expect(resolveNonExistentCaseReference(fake.page)).rejects.toThrow(
        'Global search results must contain valid case references'
      );
    }
  });

  test('treats a formatted exact match as an existing case', async () => {
    const originalRandom = Math.random;
    let calls = 0;
    Math.random = () => (calls++ < 15 ? 0 : 0.1);
    try {
      const fake = createFakePage([
        { status: 200, results: [{ caseReference: '9000-0000-0000-0000' }] },
        { status: 200, results: [] },
      ]);
      await expect(resolveNonExistentCaseReference(fake.page)).resolves.toBe('9111111111111111');
      expect(fake.posts).toHaveLength(2);
    } finally {
      Math.random = originalRandom;
    }
  });

  test('generates a different candidate after an exact match', async () => {
    const originalRandom = Math.random;
    let calls = 0;
    Math.random = () => (calls++ < 15 ? 0 : 0.1);
    try {
      const fake = createFakePage([
        { status: 200, results: [{ caseReference: '9000000000000000' }] },
        { status: 200, results: [] },
      ]);
      await expect(resolveNonExistentCaseReference(fake.page)).resolves.toBe('9111111111111111');
      expect(fake.posts).toHaveLength(2);
    } finally {
      Math.random = originalRandom;
    }
  });
});
