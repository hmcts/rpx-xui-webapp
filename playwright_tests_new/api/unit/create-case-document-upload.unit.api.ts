import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

import { CreateCasePage } from '../../E2E/page-objects/pages/exui/createCase.po.js';

function uploadPage(
  outcomes: Array<number | Error | { status: number; headers?: Record<string, string> }>,
  retryDelays: number[] = []
) {
  return {
    isClosed: () => false,
    waitForTimeout: async (delayMs: number) => {
      retryDelays.push(delayMs);
    },
    waitForResponse: async () => {
      const outcome = outcomes.shift() ?? 200;
      if (outcome instanceof Error) {
        throw outcome;
      }
      return {
        status: () => (typeof outcome === 'number' ? outcome : outcome.status),
        headers: () => (typeof outcome === 'number' ? {} : (outcome.headers ?? {})),
      };
    },
  } as unknown as Page;
}

test.describe('Create case document upload helper', { tag: '@svc-internal' }, () => {
  test('does not replay an upload after a non-rate-limit response', async () => {
    let uploads = 0;
    const page = uploadPage([500]);
    const createCasePage = Object.assign(Object.create(CreateCasePage.prototype), {
      page,
      fileUploadStatusLabel: { waitFor: async () => undefined },
      getRecommendedTimeoutMs: () => 1,
    });
    const input = { setInputFiles: async () => (uploads += 1) } as unknown as Locator;

    await expect(
      CreateCasePage.prototype.uploadFile.call(createCasePage, 'test.pdf', 'application/pdf', 'test', input)
    ).rejects.toThrow('Document file input upload failed: server returned status 500');
    expect(uploads).toBe(1);
  });

  test('replays an upload when a transient response timeout is observed', async () => {
    let uploads = 0;
    const retryDelays: number[] = [];
    const page = uploadPage([new Error('Timeout 1ms exceeded'), 200], retryDelays);
    const createCasePage = Object.assign(Object.create(CreateCasePage.prototype), {
      page,
      fileUploadStatusLabel: { waitFor: async () => undefined },
      getRecommendedTimeoutMs: () => 1,
    });
    const input = { setInputFiles: async () => (uploads += 1) } as unknown as Locator;

    await CreateCasePage.prototype.uploadFile.call(createCasePage, 'test.pdf', 'application/pdf', 'test', input);
    expect(uploads).toBe(2);
    expect(retryDelays).toEqual([2_000]);
  });

  test('replays a rate-limited upload and honours Retry-After', async () => {
    let uploads = 0;
    const retryDelays: number[] = [];
    const page = uploadPage([{ status: 429, headers: { 'retry-after': '0.001' } }, 200], retryDelays);
    const createCasePage = Object.assign(Object.create(CreateCasePage.prototype), {
      page,
      fileUploadStatusLabel: { waitFor: async () => undefined },
      getRecommendedTimeoutMs: () => 1,
    });
    const input = { setInputFiles: async () => (uploads += 1) } as unknown as Locator;

    await CreateCasePage.prototype.uploadFile.call(createCasePage, 'test.pdf', 'application/pdf', 'test', input);
    expect(uploads).toBe(2);
    expect(retryDelays).toEqual([2_000]);
  });

  test('caps an excessive Retry-After delay', async () => {
    const retryDelays: number[] = [];
    const page = uploadPage([{ status: 429, headers: { 'retry-after': '999999' } }, 200], retryDelays);
    const createCasePage = Object.assign(Object.create(CreateCasePage.prototype), {
      page,
      fileUploadStatusLabel: { waitFor: async () => undefined },
      getRecommendedTimeoutMs: () => 1,
    });
    const input = { setInputFiles: async () => undefined } as unknown as Locator;

    await CreateCasePage.prototype.uploadFile.call(createCasePage, 'test.pdf', 'application/pdf', 'test', input);
    expect(retryDelays).toEqual([10_000]);
  });

  test('fails after bounded rate-limit retries', async () => {
    let uploads = 0;
    const page = uploadPage([429, 429, 429]);
    const createCasePage = Object.assign(Object.create(CreateCasePage.prototype), {
      page,
      fileUploadStatusLabel: { waitFor: async () => undefined },
      getRecommendedTimeoutMs: () => 1,
    });
    const input = { setInputFiles: async () => (uploads += 1) } as unknown as Locator;

    await expect(
      CreateCasePage.prototype.uploadFile.call(createCasePage, 'test.pdf', 'application/pdf', 'test', input)
    ).rejects.toThrow('Document file input upload failed: server returned status 429');
    expect(uploads).toBe(3);
  });
});
