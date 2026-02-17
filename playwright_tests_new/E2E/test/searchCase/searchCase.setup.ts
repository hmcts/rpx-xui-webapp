import { Page } from '@playwright/test';
import { loadSessionCookies } from '../../../common/sessionCapture';
import { ResolveCaseReferenceOptions } from '../../../E2E/utils/case-reference.utils';

export const PUBLIC_LAW_CASE_REFERENCE_OPTIONS: ResolveCaseReferenceOptions = {
  jurisdictionIds: ['PUBLICLAW'],
  preferredStates: ['Case management', 'Submitted', 'Gatekeeping', 'Closed'],
};

export async function openHomeWithCapturedSession(page: Page, userIdentifier: string): Promise<void> {
  const { cookies } = loadSessionCookies(userIdentifier);
  if (cookies.length) {
    await page.context().addCookies(cookies);
  }
  await page.goto('/');
}
