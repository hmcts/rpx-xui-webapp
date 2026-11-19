import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { capWorkerCountForParallelSuites, resolveApiProjectWorkerCount, resolveWorkerCount } =
  require('../../../playwright-config-utils') as typeof import('../../../playwright-config-utils');

test.describe('parallel-suite worker cap', { tag: '@svc-internal' }, () => {
  test('leaves worker counts unchanged without PW_PARALLEL_SUITES', () => {
    const logs: string[] = [];
    expect(capWorkerCountForParallelSuites(7, {}, 2, (message) => logs.push(message))).toBe(7);
    expect(resolveWorkerCount({}, 2)).toBe(7);
    expect(resolveApiProjectWorkerCount({})).toBe(6);
    expect(resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: '9' }, 2)).toBe(9);
    expect(logs).toEqual([]);
  });

  test('caps the configured count at cpus / suites and logs the cap', () => {
    const logs: string[] = [];
    expect(capWorkerCountForParallelSuites(7, { PW_PARALLEL_SUITES: '4' }, 16, (message) => logs.push(message))).toBe(4);
    expect(logs).toEqual(['[playwright-config] capping workers 7 -> 4 (cpus=16, PW_PARALLEL_SUITES=4)']);
    expect(resolveWorkerCount({ PW_PARALLEL_SUITES: '4', TEST_WORKER_INDEX: '0' }, 16)).toBe(4);
    // node-api runs no browsers, so it is never capped.
    expect(resolveApiProjectWorkerCount({ PW_PARALLEL_SUITES: '4', TEST_WORKER_INDEX: '0' })).toBe(6);
  });

  test('keeps at least four workers on small agents', () => {
    expect(capWorkerCountForParallelSuites(7, { PW_PARALLEL_SUITES: '4' }, 2, () => undefined)).toBe(4);
    expect(capWorkerCountForParallelSuites(7, { PW_PARALLEL_SUITES: '3' }, 8, () => undefined)).toBe(4);
    expect(capWorkerCountForParallelSuites(3, { PW_PARALLEL_SUITES: '3' }, 8, () => undefined)).toBe(3);
  });

  test('keeps the configured count when the cap is above it', () => {
    const logs: string[] = [];
    expect(capWorkerCountForParallelSuites(6, { PW_PARALLEL_SUITES: '4' }, 32, (message) => logs.push(message))).toBe(6);
    expect(resolveWorkerCount({ PW_PARALLEL_SUITES: '4', FUNCTIONAL_TESTS_WORKERS: '3' }, 32)).toBe(3);
    expect(logs).toEqual([]);
  });

  test('suppresses the cap log inside Playwright worker processes', () => {
    const logs: string[] = [];
    expect(
      capWorkerCountForParallelSuites(7, { PW_PARALLEL_SUITES: '2', TEST_WORKER_INDEX: '2' }, 10, (message) => logs.push(message))
    ).toBe(5);
    expect(logs).toEqual([]);
  });

  for (const parallelSuites of ['', '0', '-2', 'four', '   ']) {
    test(`ignores invalid PW_PARALLEL_SUITES=${JSON.stringify(parallelSuites)}`, () => {
      expect(capWorkerCountForParallelSuites(7, { PW_PARALLEL_SUITES: parallelSuites }, 4, () => undefined)).toBe(7);
    });
  }

  test('ignores an unusable cpu count', () => {
    expect(capWorkerCountForParallelSuites(7, { PW_PARALLEL_SUITES: '4' }, 0, () => undefined)).toBe(7);
    expect(capWorkerCountForParallelSuites(7, { PW_PARALLEL_SUITES: '4' }, Number.NaN, () => undefined)).toBe(7);
  });
});
