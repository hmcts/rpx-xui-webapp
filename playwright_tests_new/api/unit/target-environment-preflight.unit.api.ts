import { expect, test, type FullConfig } from '@playwright/test';

import {
  assertTargetEnvironmentAvailable,
  isTargetPreflightEnabled,
  resolveTargetBaseUrl,
  runTargetEnvironmentPreflight,
  type TargetPreflightDeps,
} from '../../common/targetEnvironmentPreflight.js';

const PREVIEW_URL = 'https://xui-webapp-pr-123.preview.platform.hmcts.net';
const PREVIEW_HOST = 'xui-webapp-pr-123.preview.platform.hmcts.net';

function codedError(code: string, message = code): Error {
  return Object.assign(new Error(message), { code });
}

function fakeDeps(overrides: Partial<TargetPreflightDeps> = {}) {
  const calls = { lookups: [] as string[], gets: [] as string[] };
  const deps: TargetPreflightDeps = {
    lookupHost: async (hostname) => {
      calls.lookups.push(hostname);
      return { address: '10.0.0.1', family: 4 };
    },
    httpGet: async (url) => {
      calls.gets.push(url);
      return { status: 302 };
    },
    sleep: async () => undefined,
    ...overrides,
  };
  return { deps, calls };
}

test.describe('target environment preflight', { tag: '@svc-internal' }, () => {
  test('passes when the host resolves and /auth/login answers with a redirect', async () => {
    const { deps, calls } = fakeDeps();

    await assertTargetEnvironmentAvailable(`${PREVIEW_URL}/cases?token=secret`, deps);

    expect(calls.lookups).toEqual([PREVIEW_HOST]);
    expect(calls.gets).toEqual([`${PREVIEW_URL}/auth/login`]);
  });

  test('reports an unresolved host with its DNS error code and skips the HTTP probe', async () => {
    const { deps, calls } = fakeDeps({
      lookupHost: async () => {
        throw codedError('ENOTFOUND', `getaddrinfo ENOTFOUND ${PREVIEW_HOST}`);
      },
    });

    await expect(assertTargetEnvironmentAvailable(PREVIEW_URL, deps)).rejects.toThrow(
      `Target environment unavailable: ${PREVIEW_HOST} did not resolve (ENOTFOUND)`
    );
    expect(calls.gets).toEqual([]);
  });

  test('reports a DNS lookup that never settles as a bounded timeout', async () => {
    const { deps } = fakeDeps({ lookupHost: () => new Promise(() => undefined) });

    await expect(assertTargetEnvironmentAvailable(PREVIEW_URL, deps, 20)).rejects.toThrow(
      `Target environment unavailable: ${PREVIEW_HOST} did not resolve (DNS lookup timed out after 20ms)`
    );
  });

  for (const status of [404, 502, 503]) {
    test(`reports HTTP ${status} from /auth/login`, async () => {
      const { deps } = fakeDeps({ httpGet: async () => ({ status }) });

      await expect(assertTargetEnvironmentAvailable(PREVIEW_URL, deps)).rejects.toThrow(
        `Target environment unavailable: ${PREVIEW_HOST} responded HTTP ${status} on /auth/login`
      );
    });
  }

  for (const status of [200, 401, 403]) {
    test(`accepts HTTP ${status} as an answering application`, async () => {
      const { deps } = fakeDeps({ httpGet: async () => ({ status }) });

      await expect(assertTargetEnvironmentAvailable(PREVIEW_URL, deps)).resolves.toBeUndefined();
    });
  }

  test('reports an HTTP probe that never answers as a bounded timeout', async () => {
    const { deps } = fakeDeps({ httpGet: () => new Promise(() => undefined) });

    await expect(assertTargetEnvironmentAvailable(PREVIEW_URL, deps, 20)).rejects.toThrow(
      `Target environment unavailable: ${PREVIEW_HOST} did not respond on /auth/login within 20ms`
    );
  });

  test('reports a fetch-level abort timeout from the HTTP client', async () => {
    const abort = Object.assign(new Error('The operation was aborted due to timeout'), { name: 'TimeoutError' });
    const { deps } = fakeDeps({
      httpGet: async () => {
        throw abort;
      },
    });

    await expect(assertTargetEnvironmentAvailable(PREVIEW_URL, deps, 50)).rejects.toThrow(
      `Target environment unavailable: ${PREVIEW_HOST} did not respond on /auth/login within 50ms`
    );
  });

  test('reports a connection failure with the underlying cause code', async () => {
    const { deps } = fakeDeps({
      httpGet: async () => {
        throw Object.assign(new TypeError('fetch failed'), { cause: codedError('ECONNREFUSED') });
      },
    });

    await expect(assertTargetEnvironmentAvailable(PREVIEW_URL, deps)).rejects.toThrow(
      `Target environment unavailable: ${PREVIEW_HOST} request to /auth/login failed (ECONNREFUSED)`
    );
  });

  test('retries a transient 5xx and passes once the deployment answers', async () => {
    const statuses = [503, 502, 302];
    const sleeps: number[] = [];
    const { deps, calls } = fakeDeps({
      httpGet: async (url) => {
        calls.gets.push(url);
        return { status: statuses.shift() ?? 302 };
      },
      sleep: async (ms) => {
        sleeps.push(ms);
      },
    });

    await expect(assertTargetEnvironmentAvailable(PREVIEW_URL, deps)).resolves.toBeUndefined();
    expect(calls.gets).toHaveLength(3);
    expect(sleeps).toEqual([5_000, 10_000]);
  });

  test('gives up on a persistent 5xx after the bounded attempts', async () => {
    const { deps, calls } = fakeDeps({
      httpGet: async (url) => {
        calls.gets.push(url);
        return { status: 503 };
      },
    });

    await expect(assertTargetEnvironmentAvailable(PREVIEW_URL, deps)).rejects.toThrow(
      `Target environment unavailable: ${PREVIEW_HOST} responded HTTP 503 on /auth/login (after 3 attempts)`
    );
    expect(calls.gets).toHaveLength(3);
  });

  test('does not retry a 404, which means no application is deployed', async () => {
    const { deps, calls } = fakeDeps({
      httpGet: async (url) => {
        calls.gets.push(url);
        return { status: 404 };
      },
    });

    await expect(assertTargetEnvironmentAvailable(PREVIEW_URL, deps)).rejects.toThrow(/responded HTTP 404 on \/auth\/login$/);
    expect(calls.gets).toHaveLength(1);
  });

  test('is opt-in and does no I/O unless PW_TARGET_PREFLIGHT=true', async () => {
    const { deps, calls } = fakeDeps();

    expect(isTargetPreflightEnabled({})).toBe(false);
    expect(isTargetPreflightEnabled({ PW_TARGET_PREFLIGHT: 'false' })).toBe(false);
    expect(isTargetPreflightEnabled({ PW_TARGET_PREFLIGHT: 'TRUE' })).toBe(true);

    await runTargetEnvironmentPreflight(undefined, { TEST_URL: PREVIEW_URL }, deps);
    expect(calls.lookups).toEqual([]);

    await runTargetEnvironmentPreflight(undefined, { TEST_URL: PREVIEW_URL, PW_TARGET_PREFLIGHT: 'true' }, deps);
    expect(calls.lookups).toEqual([PREVIEW_HOST]);
  });

  test('prefers the project baseURL over TEST_URL and fails clearly when neither is set', async () => {
    const fullConfig = { projects: [{ use: {} }, { use: { baseURL: PREVIEW_URL } }] } as unknown as FullConfig;

    expect(resolveTargetBaseUrl(fullConfig, { TEST_URL: 'https://other.example.test' })).toBe(PREVIEW_URL);
    expect(resolveTargetBaseUrl(undefined, { TEST_URL: ' https://other.example.test ' })).toBe('https://other.example.test');
    await expect(runTargetEnvironmentPreflight(undefined, { PW_TARGET_PREFLIGHT: 'true' }, fakeDeps().deps)).rejects.toThrow(
      'Target environment unavailable: PW_TARGET_PREFLIGHT=true but no baseURL or TEST_URL is configured'
    );
  });
});
