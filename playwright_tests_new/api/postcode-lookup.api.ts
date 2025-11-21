import { test, expect } from './fixtures';
import { withXsrf, expectStatus, StatusSets } from './utils/apiTestUtils';
import type { AddressLookupResponse } from './utils/types';

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

      expect(response.data).toHaveProperty('results');
      expect(response.data).toHaveProperty('header');
      expect(Array.isArray(response.data.results)).toBe(true);
      if ((response.data.results?.length ?? 0) > 0) {
        const dpa = response.data.results![0]?.DPA;
        expect(dpa).toBeTruthy();
        expect(dpa).toEqual(
          expect.objectContaining({
            POSTCODE: expect.any(String),
            ADDRESS: expect.any(String),
            POST_TOWN: expect.any(String)
          })
        );
      }
    });
  });
});
