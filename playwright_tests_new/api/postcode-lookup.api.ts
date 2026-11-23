import { test, expect } from './fixtures';
import { withXsrf, withRetry, expectStatus, StatusSets } from './utils/apiTestUtils';
import type { AddressLookupResponse } from './utils/types';
import { expectAddressLookupShape } from './utils/assertions';
import { shouldAssertAddress } from './utils/postcodeLookupUtils';

const ADDRESS_LOOKUP_REQUEST_TIMEOUT_MS = 60_000;
const ADDRESS_LOOKUP_TEST_TIMEOUT_MS = ADDRESS_LOOKUP_REQUEST_TIMEOUT_MS * 2 + 30_000;

test.describe('Postcode lookup', { tag: '@svc-postcode-lookup' }, () => {
  test.describe.configure({ timeout: ADDRESS_LOOKUP_TEST_TIMEOUT_MS });
  test('returns address data for postcode E1', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      // Allow the gateway-backed lookup a full minute per attempt, plus test-level setup and assertion time.
      const response = await withRetry(
        () =>
          apiClient.get<AddressLookupResponse>(`api/addresses?${new URLSearchParams({ postcode: 'E1' })}`, {
            headers,
            timeoutMs: ADDRESS_LOOKUP_REQUEST_TIMEOUT_MS,
            throwOnError: false,
          }),
        { retries: 1, retryStatuses: [502, 504], baseDelayMs: 500 }
      );

      expectStatus(
        response.status,
        StatusSets.guardedBasic.filter((s) => s !== 403)
      );
      if (!shouldAssertAddress(response.status)) {
        return;
      }

      expectAddressLookupShape(response.data);
    });
  });
});

test.describe('Postcode lookup helper coverage', { tag: '@svc-postcode-lookup' }, () => {
  test('shouldAssertAddress handles guarded status', () => {
    expect(shouldAssertAddress(200)).toBe(true);
    expect(shouldAssertAddress(500)).toBe(false);
  });
});
