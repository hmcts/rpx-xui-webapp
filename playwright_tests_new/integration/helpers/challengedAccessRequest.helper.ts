import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export type ChallengedAccessReasonDetails = Record<string, any>;

export type ChallengedAccessConditionalFields = {
  caseReferenceVisible: boolean;
  otherReasonVisible: boolean;
};

export function getChallengedAccessReasonDetails(payload: Record<string, any>): ChallengedAccessReasonDetails {
  return JSON.parse(payload.requestedRoles?.[0]?.attributes?.accessReason ?? '{}') as ChallengedAccessReasonDetails;
}

export async function expectChallengedAccessConditionalFields(
  page: Page,
  options: ChallengedAccessConditionalFields
): Promise<void> {
  const caseReference = page.locator('#case-reference');
  const otherReason = page.locator('#other-reason');

  if (options.caseReferenceVisible) {
    await expect(caseReference).toBeVisible();
  } else {
    await expect(caseReference).toHaveCount(0);
  }

  if (options.otherReasonVisible) {
    await expect(otherReason).toBeVisible();
  } else {
    await expect(otherReason).toHaveCount(0);
  }
}
