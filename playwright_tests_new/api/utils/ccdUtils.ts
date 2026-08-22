import type { ApiClient as PlaywrightApiClient } from '@hmcts/playwright-common';
import { expect } from '@playwright/test';

import { expectStatus, guardedRequest, isRouteUnavailableStatus } from './apiTestUtils';

type JurisdictionResponse = {
  name?: string;
  [key: string]: unknown;
};

type Jurisdiction = {
  name?: string;
  description?: string;
  id?: string;
  caseTypes?: unknown[];
  [key: string]: unknown;
};

export async function assertJurisdictionsForUser(
  apiClient: PlaywrightApiClient,
  expectedNames: string[]
): Promise<'verified' | 'unavailable'> {
  const user = await guardedRequest(() => apiClient.get('api/user/details', { timeoutMs: 20_000, throwOnError: false }));
  if (isRouteUnavailableStatus(user.status)) {
    return 'unavailable';
  }
  expectStatus(user.status, [200]);
  const uid = resolveUserId(user.data as { userInfo?: { uid?: string; id?: string } });
  expect(typeof uid).toBe('string');

  const response = await guardedRequest(() =>
    apiClient.get(`aggregated/caseworkers/${uid}/jurisdictions?access=read`, {
      timeoutMs: 20_000,
      throwOnError: false,
    })
  );
  if (isRouteUnavailableStatus(response.status)) {
    return 'unavailable';
  }
  expectStatus(response.status, [200, 404]);
  expect(Array.isArray(response.data)).toBe(true);

  if (response.status === 404) {
    expect(response.data).toHaveLength(0);
    expect(expectedNames).toHaveLength(0);
    return 'verified';
  }

  const actualNames = (response.data as JurisdictionResponse[]).map((entry) => entry?.name).filter(Boolean);
  expect(actualNames.length).toBeGreaterThan(0);
  if (expectedNames.length > 0) {
    expect(actualNames.some((name) => expectedNames.includes(name))).toBe(true);
  }

  (response.data as Jurisdiction[]).forEach((jurisdiction) => {
    expect(jurisdiction).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
      })
    );
  });
  return 'verified';
}

function resolveUserId(data: { userInfo?: { uid?: string; id?: string } } | undefined): string | undefined {
  return data?.userInfo?.uid ?? data?.userInfo?.id;
}
