import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

import { resolveCaseReferenceFromGlobalSearch } from '../../E2E/utils/case-reference.utils.js';

type Outcome =
  { status: number; results?: Array<{ caseReference?: string; stateId?: string }>; html?: string } | 'timeout' | Error;

const realDateNow = Date.now;
let clockMs = 0;

function timeoutError(method: string, timeout: number): Error {
  const error = new Error(`apiRequestContext.${method}: Timeout ${timeout}ms exceeded.`);
  error.name = 'TimeoutError';
  return error;
}

// Timed-out requests and backoff waits advance a fake clock, so the shared deadline is exercised without waiting.
function createFakePage(postOutcomes: Outcome[], getOutcomes: Record<string, Outcome> = {}) {
  const posts: Array<{ url: string; timeout?: number }> = [];
  const gets: Array<{ path: string; timeout?: number }> = [];
  const waits: number[] = [];
  const settle = (method: string, outcome: Outcome | undefined, timeout = 0) => {
    if (!outcome) return { status: () => 404, json: async () => ({}), text: async () => '' };
    if (outcome === 'timeout') {
      clockMs += timeout;
      throw timeoutError(method, timeout);
    }
    if (outcome instanceof Error) throw outcome;
    return {
      status: () => outcome.status,
      json: async () => ({ results: outcome.results ?? [] }),
      text: async () => outcome.html ?? '',
    };
  };
  const page = {
    request: {
      post: async (url: string, options: { timeout?: number }) => {
        posts.push({ url, timeout: options.timeout });
        const outcome = postOutcomes.shift();
        if (!outcome) throw new Error('Unexpected extra global search request');
        return settle('post', outcome, options.timeout);
      },
      get: async (path: string, options: { timeout?: number }) => {
        gets.push({ path, timeout: options.timeout });
        return settle('get', getOutcomes[path], options.timeout);
      },
    },
    waitForTimeout: async (duration: number) => {
      waits.push(duration);
      clockMs += duration;
    },
  } as unknown as Page;
  return { page, posts, gets, waits };
}

test.describe('Global search case reference resolution', { tag: '@svc-internal' }, () => {
  test.beforeEach(() => {
    clockMs = 1_000_000;
    Date.now = () => clockMs;
  });
  test.afterEach(() => {
    Date.now = realDateNow;
  });

  test('retries a request timeout within the bounded loop and passes an explicit timeout', async () => {
    const fake = createFakePage(['timeout', { status: 200, results: [{ caseReference: '1111222233334444' }] }]);
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page, { jurisdictionIds: ['DIVORCE'] })).resolves.toBe(
      '1111222233334444'
    );
    expect(fake.posts).toEqual([
      { url: '/api/globalsearch/results', timeout: 30_000 },
      { url: '/api/globalsearch/results', timeout: 29_000 },
    ]);
    expect(fake.waits).toEqual([1000]);
    expect(fake.gets).toEqual([]);
  });

  test('bounds API attempts and the HTML fallback by one shared deadline and reports a clear error', async () => {
    const startedAt = clockMs;
    const fake = createFakePage(['timeout', 'timeout', 'timeout'], {
      '/work/my-work/list': 'timeout',
      '/work/all-work/tasks': 'timeout',
      '/cases': 'timeout',
    });
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page)).rejects.toThrow(
      'Global search API returned status request timeout when resolving case reference after 2/3 attempts within 90000ms; HTML fallback found no case reference'
    );
    // Leave 30 seconds of the shared deadline for the HTML fallback.
    expect(fake.posts.map((post) => post.timeout)).toEqual([30_000, 29_000]);
    expect(fake.waits).toEqual([1000]);
    expect(fake.gets).toEqual([
      { path: '/work/my-work/list', timeout: 10_000 },
      { path: '/work/all-work/tasks', timeout: 10_000 },
      { path: '/cases', timeout: 10_000 },
    ]);
    expect(clockMs - startedAt).toBe(90_000);
  });

  test('finds a case through HTML after API requests exhaust their budget', async () => {
    const fake = createFakePage(['timeout', 'timeout'], {
      '/work/my-work/list': {
        status: 200,
        html: '<a href="/cases/case-details/DIVORCE/xuiTestJurisdiction/5555666677778888">case</a>',
      },
    });
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page)).resolves.toBe('5555666677778888');
    expect(fake.posts).toHaveLength(2);
    expect(fake.gets).toEqual([{ path: '/work/my-work/list', timeout: 10_000 }]);
  });

  test('finds a later HTML case when the first page times out after API budget exhaustion', async () => {
    const fake = createFakePage(['timeout', 'timeout'], {
      '/work/my-work/list': 'timeout',
      '/work/all-work/tasks': {
        status: 200,
        html: '<a href="/cases/case-details/DIVORCE/xuiTestJurisdiction/5555666677778888">case</a>',
      },
    });
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page)).resolves.toBe('5555666677778888');
    expect(fake.gets).toEqual([
      { path: '/work/my-work/list', timeout: 10_000 },
      { path: '/work/all-work/tasks', timeout: 10_000 },
    ]);
  });

  test('gives the HTML fallback only the remaining budget and tolerates a fallback timeout', async () => {
    const fake = createFakePage([{ status: 503 }, { status: 503 }, { status: 503 }], {
      '/work/my-work/list': 'timeout',
      '/cases': { status: 200, html: '<a href="/cases/case-details/DIVORCE/xuiTestJurisdiction/5555666677778888">case</a>' },
    });
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page)).resolves.toBe('5555666677778888');
    expect(fake.posts).toHaveLength(3);
    // Divide the remaining budget across the candidate pages.
    expect(fake.gets).toEqual([
      { path: '/work/my-work/list', timeout: 29_000 },
      { path: '/work/all-work/tasks', timeout: 29_000 },
      { path: '/cases', timeout: 30_000 },
    ]);
  });

  test('does not retry a non-timeout request error', async () => {
    const fake = createFakePage([new Error('socket hang up')]);
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page)).rejects.toThrow('socket hang up');
    expect(fake.posts).toHaveLength(1);
  });

  test('does not retry a non-transient status and reports it after the fallback', async () => {
    const fake = createFakePage([{ status: 500 }]);
    await expect(resolveCaseReferenceFromGlobalSearch(fake.page)).rejects.toThrow('returned status 500');
    expect(fake.posts).toHaveLength(1);
    expect(fake.gets.map((get) => get.path)).toEqual(['/work/my-work/list', '/work/all-work/tasks', '/cases']);
  });
});
