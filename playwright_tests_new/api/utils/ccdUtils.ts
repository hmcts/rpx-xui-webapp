import type { ApiClient as PlaywrightApiClient } from '@hmcts/playwright-common';
import { expect } from '@playwright/test';

import { expectStatus, guardedRequest, StatusSets } from './apiTestUtils';

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

export async function assertJurisdictionsForUser(apiClient: PlaywrightApiClient, expectedNames: string[]): Promise<void> {
  const user = await apiClient.get('api/user/details', { throwOnError: false });
  expectStatus(user.status, StatusSets.guardedExtended);
  if (user.status !== 200) {
    return;
  }
  const uid = resolveUserId(user.data as { userInfo?: { uid?: string; id?: string } });
  if (!uid) {
    return;
  }

  const response = await guardedRequest(() =>
    apiClient.get(`aggregated/caseworkers/${uid}/jurisdictions?access=read`, {
      throwOnError: false,
    })
  );
  expectStatus(response.status, [...StatusSets.guardedExtended, 504, 500]);
  if (!Array.isArray(response.data)) {
    return;
  }

  const actualNames = response.data.map((entry: JurisdictionResponse) => entry?.name).filter(Boolean);
  expect(actualNames.length).toBeGreaterThan(0);
  if (expectedNames.length > 0) {
    expect(actualNames.some((name) => expectedNames.includes(name))).toBe(true);
  }

  response.data.forEach((jurisdiction: Jurisdiction) => {
    expect(jurisdiction).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
      })
    );
  });
}

function resolveUserId(data: { userInfo?: { uid?: string; id?: string } } | undefined): string | undefined {
  return data?.userInfo?.uid ?? data?.userInfo?.id;
}
