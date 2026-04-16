import { Page } from '@playwright/test';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { ResolveCaseReferenceOptions } from '../../../E2E/utils/case-reference.utils';
import { EXUI_TIMEOUTS } from '../../page-objects/pages/exui/exui-timeouts';

export const PUBLIC_LAW_CASE_REFERENCE_OPTIONS: ResolveCaseReferenceOptions = {
  jurisdictionIds: ['PUBLICLAW'],
  preferredStates: ['Case management', 'Submitted', 'Gatekeeping', 'Closed'],
};

export async function openHomeWithCapturedSession(page: Page, userIdentifier: string): Promise<void> {
  await ensureAuthenticatedPage(page, userIdentifier, {
    waitForSelector: 'exui-header',
    timeoutMs: EXUI_TIMEOUTS.SEARCH_FIELD_VISIBLE,
  });
}
