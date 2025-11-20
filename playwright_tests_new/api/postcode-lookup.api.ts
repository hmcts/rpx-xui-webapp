import { test, expect } from './fixtures';
import { getStoredCookie } from './auth';

test.describe('Postcode lookup', () => {
  test('returns address data for postcode E1', async ({ apiClient }) => {
    const xsrf = await getStoredCookie('solicitor', 'XSRF-TOKEN');
    const headers = xsrf ? { 'X-XSRF-TOKEN': xsrf } : {};
    const response = await apiClient.get<{ results: unknown; header: unknown }>('api/addresses?postcode=E1', {
      headers,
      throwOnError: false
    });

    expect([200, 401]).toContain(response.status);
    if (response.status !== 200) {
      return;
    }

    expect(response.data).toHaveProperty('results');
    expect(response.data).toHaveProperty('header');
    expect(Array.isArray(response.data.results)).toBe(true);
    if (response.data.results.length > 0) {
      const dpa = response.data.results[0]?.DPA;
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
