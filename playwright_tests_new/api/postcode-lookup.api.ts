import { test, expect } from './fixtures';
import { withXsrf, expectStatus, StatusSets } from './utils/apiTestUtils';
import type { AddressLookupResponse } from './utils/types';
import { expectAddressLookupShape } from './utils/assertions';

test.describe('Postcode lookup', () => {
  test('returns address data for postcode E1', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const response = await apiClient.get<AddressLookupResponse>('api/addresses?postcode=E1', {
        headers,
        throwOnError: false
      });

      expectStatus(response.status, StatusSets.guardedBasic.filter((s) => s !== 403));
      if (!shouldAssertAddress(response.status)) {
        return;
      }

      expectAddressLookupShape(response.data);
    });
  });
});

test.describe('Postcode lookup helper coverage', () => {
  test('shouldAssertAddress handles guarded status', () => {
    expect(shouldAssertAddress(200)).toBe(true);
    expect(shouldAssertAddress(500)).toBe(false);
  });
});

function shouldAssertAddress(status: number): boolean {
  return status === 200;
}
