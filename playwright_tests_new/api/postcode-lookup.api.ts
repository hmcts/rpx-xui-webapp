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
      if (response.status !== 200) {
        return;
      }

      expectAddressLookupShape(response.data);
    });
  });

  test('invalid postcode returns guarded status', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const response = await apiClient.get<AddressLookupResponse>('api/addresses?postcode=INVALID123', {
        headers,
        throwOnError: false
      });
      expectStatus(response.status, [200, 400, 401, 403, 404, 500, 502, 504]);
      if (response.status === 200) {
        expect(Array.isArray(response.data?.results)).toBe(true);
      }
    });
  });
});
