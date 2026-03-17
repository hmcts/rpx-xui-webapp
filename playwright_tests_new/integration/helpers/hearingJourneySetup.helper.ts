import type { Page } from '@playwright/test';
import type { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { applySessionCookies } from '../../common/sessionCapture';
import { setupHearingsMockRoutes, type HearingsMockRoutesConfig } from './hearingsMockRoutes.helper';
import { HEARINGS_CASE_JURISDICTION, HEARINGS_CASE_REFERENCE, HEARINGS_CASE_TYPE } from '../mocks/hearings.mock';

export const HEARING_MANAGER_CR84_ON_USER = 'HEARING_MANAGER_CR84_ON';
export const HEARING_MANAGER_CR84_OFF_USER = 'HEARING_MANAGER_CR84_OFF';

export const hearingManagerRoles = [
  'caseworker-privatelaw',
  'caseworker-privatelaw-courtadmin',
  'hearing-centre-admin',
  'case-allocator',
  'hearing-manager',
];

export const caseDetailsUrl = (
  jurisdictionId = HEARINGS_CASE_JURISDICTION,
  caseTypeId = HEARINGS_CASE_TYPE,
  caseReference = HEARINGS_CASE_REFERENCE
) => `/cases/case-details/${jurisdictionId}/${caseTypeId}/${caseReference}`;

export async function openHearingsTab(
  page: Page,
  caseDetailsPage: CaseDetailsPage,
  options: {
    userIdentifier?: string;
    routeConfig: HearingsMockRoutesConfig;
    jurisdictionId?: string;
    caseTypeId?: string;
    caseReference?: string;
  }
): Promise<void> {
  await applySessionCookies(page, options.userIdentifier ?? HEARING_MANAGER_CR84_ON_USER);
  await setupHearingsMockRoutes(page, options.routeConfig);
  await page.goto(caseDetailsUrl(options.jurisdictionId, options.caseTypeId, options.caseReference), {
    waitUntil: 'domcontentloaded',
  });
  await caseDetailsPage.selectCaseDetailsTab('Hearings');
}
