import { expect, test } from '@playwright/test';
import {
  isGlobalSearchServiceError,
  runGlobalSearchWithOneServiceRetry,
} from '../../E2E/page-objects/pages/exui/globalSearchRetry.js';

test.describe('global search transient retry', { tag: '@svc-internal' }, () => {
  test('retries the classified service error once', async () => {
    let attempts = 0;

    await runGlobalSearchWithOneServiceRetry(async () => {
      attempts += 1;
      if (attempts === 1) {
        throw new Error('Global search returned "Something went wrong" while searching for 1234.');
      }
    });

    expect(attempts).toBe(2);
  });

  test('surfaces the second classified service failure', async () => {
    let attempts = 0;

    await expect(
      runGlobalSearchWithOneServiceRetry(async () => {
        attempts += 1;
        throw new Error('Global search returned "Something went wrong" while searching for 1234.');
      })
    ).rejects.toThrow('Something went wrong');
    expect(attempts).toBe(2);
  });

  test('does not retry unrelated failures', async () => {
    let attempts = 0;

    await expect(
      runGlobalSearchWithOneServiceRetry(async () => {
        attempts += 1;
        throw new Error('Expected search result row was missing.');
      })
    ).rejects.toThrow('Expected search result row was missing.');
    expect(attempts).toBe(1);
    expect(isGlobalSearchServiceError(new Error('Expected search result row was missing.'))).toBe(false);
  });
});
