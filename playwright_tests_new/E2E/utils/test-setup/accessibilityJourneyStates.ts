import type { Page, TestInfo } from '@playwright/test';
import type { QueryManagementPage } from '../../page-objects/pages/exui/queryManagement.po';
import { setupCaseListMocks, setupWelshLanguageSession } from '../../../integration/helpers';
import { welshTranslationsSmall } from '../../../integration/mocks/welshLanguage';
import { QUERY_MANAGEMENT_QUERY_DETAIL, QUERY_MANAGEMENT_QUERY_SUBJECT } from '../../../integration/mocks/queryManagement.mock';

export type QueryAccessibilityState =
  'options' | 'option validation' | 'details' | 'details validation' | 'review' | 'confirmation';

export async function reachQueryAccessibilityState(query: QueryManagementPage, state: QueryAccessibilityState): Promise<void> {
  if (state === 'options') return;
  if (state === 'option validation') {
    await query.continueButton.click();
    return;
  }
  await query.chooseRaiseAQueryJourney();
  if (state === 'details') return;
  if (state === 'details validation') {
    await query.continueButton.click();
    return;
  }
  await query.enterQueryDetailsAndContinue(QUERY_MANAGEMENT_QUERY_SUBJECT, QUERY_MANAGEMENT_QUERY_DETAIL);
  if (state === 'confirmation') await query.submitQuery();
}

export async function setupAccessibilityHeader(page: Page, testInfo: TestInfo) {
  const lease = await setupWelshLanguageSession(page, testInfo);
  try {
    await page.route('**api/translation/cy*', async (route) => {
      await route.fulfill({ json: welshTranslationsSmall });
    });
    await setupCaseListMocks(page, {});
    return lease;
  } catch (error) {
    await lease.release();
    throw error;
  }
}
