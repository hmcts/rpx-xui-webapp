import { expect, test } from '@playwright/test';
import { expectStatus, withRetry } from './apiTestUtils';

test.describe('apiTestUtils helpers', () => {
  test('expectStatus passes for allowed status', () => {
    expect(() => expectStatus(200, [200, 201])).not.toThrow();
  });

  test('withRetry retries on retryable status', async () => {
    let attempts = 0;
    const result = await withRetry(
      async () => {
        attempts += 1;
        if (attempts < 2) {
          return { status: 502 as number };
        }
        return { status: 200 as number };
      },
      { retries: 2, retryStatuses: [502] }
    );
    expect(result.status).toBe(200);
    expect(attempts).toBe(2);
  });

  test('withRetry throws after exhausting retries on error', async () => {
    let attempts = 0;
    await expect(
      withRetry(async () => {
        attempts += 1;
        throw new Error('boom');
      }, { retries: 1 })
    ).rejects.toThrow('boom');
    expect(attempts).toBe(2);
  });
});
