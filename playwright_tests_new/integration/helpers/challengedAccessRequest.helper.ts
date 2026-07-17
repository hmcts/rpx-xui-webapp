import { expect } from '@playwright/test';
import type { AccessRequestPage } from '../../E2E/page-objects/pages/exui/accessRequest.po';

export type ChallengedAccessReasonDetails = Record<string, unknown>;
type ChallengedAccessPayload = {
  requestedRoles?: Array<{
    attributes?: {
      accessReason?: string;
    };
  }>;
};

export type ChallengedAccessConditionalFields = {
  caseReferenceVisible: boolean;
  otherReasonVisible: boolean;
};

export function getChallengedAccessReasonDetails(payload: ChallengedAccessPayload): ChallengedAccessReasonDetails {
  return JSON.parse(payload.requestedRoles?.[0]?.attributes?.accessReason ?? '{}') as ChallengedAccessReasonDetails;
}

export async function expectChallengedAccessConditionalFields(
  accessRequestPage: AccessRequestPage,
  options: ChallengedAccessConditionalFields
): Promise<void> {
  if (options.caseReferenceVisible) {
    await expect(accessRequestPage.challengedCaseReferenceInput).toBeVisible();
  } else {
    await expect(accessRequestPage.challengedCaseReferenceInput).toHaveCount(0);
  }

  if (options.otherReasonVisible) {
    await expect(accessRequestPage.challengedOtherReasonInput).toBeVisible();
  } else {
    await expect(accessRequestPage.challengedOtherReasonInput).toHaveCount(0);
  }
}
