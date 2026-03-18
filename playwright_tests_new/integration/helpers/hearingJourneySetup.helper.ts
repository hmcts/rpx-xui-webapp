import { expect, type Page, type Response } from '@playwright/test';
import type { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import type { HearingsTabPage } from '../../E2E/page-objects/pages/exui/hearingsTab.po';
import { applySessionCookies } from '../../common/sessionCapture';
import { setupHearingsMockRoutes, type HearingsMockRoutesConfig } from './hearingsMockRoutes.helper';
import {
  HEARINGS_CASE_JURISDICTION,
  HEARINGS_CASE_REFERENCE,
  HEARINGS_CASE_TYPE,
  LISTED_HEARING_SCENARIO,
  type HearingScenario,
} from '../mocks/hearings.mock';

export const HEARING_MANAGER_CR84_ON_USER = 'HEARING_MANAGER_CR84_ON';
export const HEARING_MANAGER_CR84_OFF_USER = 'HEARING_MANAGER_CR84_OFF';
export const HEARINGS_TERMINAL_STATE_TIMEOUT_MS = 15_000;
export const HEARINGS_ROWS_HIDDEN_TIMEOUT_MS = 10_000;
export const HEARINGS_SLOW_RESPONSE_DELAY_MS = 4_000;

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

export function resolveHearingsCaseRoute(options: {
  routeConfig: HearingsMockRoutesConfig;
  jurisdictionId?: string;
  caseTypeId?: string;
  caseReference?: string;
}): { jurisdictionId: string; caseTypeId: string; caseReference: string } {
  const caseConfig = options.routeConfig.caseConfig;

  return {
    jurisdictionId: options.jurisdictionId ?? caseConfig?.jurisdictionId ?? HEARINGS_CASE_JURISDICTION,
    caseTypeId: options.caseTypeId ?? caseConfig?.caseTypeId ?? HEARINGS_CASE_TYPE,
    caseReference: options.caseReference ?? caseConfig?.caseReference ?? HEARINGS_CASE_REFERENCE,
  };
}

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
  const route = resolveHearingsCaseRoute(options);
  await page.goto(caseDetailsUrl(route.jurisdictionId, route.caseTypeId, route.caseReference), {
    waitUntil: 'domcontentloaded',
  });
  await caseDetailsPage.selectCaseDetailsTab('Hearings');
}

export async function openHearingsTabForScenario(
  page: Page,
  caseDetailsPage: CaseDetailsPage,
  config: HearingsMockRoutesConfig,
  options?: {
    userIdentifier?: string;
    waitForGetHearingsResponse?: boolean;
  }
): Promise<Response | null> {
  await applySessionCookies(page, options?.userIdentifier ?? HEARING_MANAGER_CR84_ON_USER);
  await setupHearingsMockRoutes(page, config);
  const route = resolveHearingsCaseRoute({ routeConfig: config });
  await page.goto(caseDetailsUrl(route.jurisdictionId, route.caseTypeId, route.caseReference), {
    waitUntil: 'domcontentloaded',
  });

  if (options?.waitForGetHearingsResponse === false) {
    await caseDetailsPage.selectCaseDetailsTab('Hearings');
    return null;
  }

  const getHearingsResponse = page.waitForResponse((response) => response.url().includes('/api/hearings/getHearings'));
  await caseDetailsPage.selectCaseDetailsTab('Hearings');
  return getHearingsResponse;
}

export function buildLargeListedHearings(total: number): HearingScenario[] {
  return Array.from({ length: total }, (_value, index) => ({
    ...LISTED_HEARING_SCENARIO,
    hearingId: String(1705615000000 + index),
    hearingType: `ABA5-LISTED-${index + 1}`,
  }));
}

export async function waitForHearingsTerminalState(page: Page, hearingsTabPage: HearingsTabPage): Promise<void> {
  await expect
    .poll(
      async () => {
        if (await hearingsTabPage.reloadButton.isVisible()) {
          return 'reload';
        }
        if (await page.getByText('No current and upcoming hearings found').isVisible()) {
          return 'empty';
        }
        return 'pending';
      },
      { timeout: HEARINGS_TERMINAL_STATE_TIMEOUT_MS }
    )
    .not.toBe('pending');
}

export async function expectHearingsRowsHiddenBeforeResponse(page: Page): Promise<void> {
  await expect(page.locator('[id^="link-view-details-"]')).toHaveCount(0, {
    timeout: HEARINGS_ROWS_HIDDEN_TIMEOUT_MS,
  });
}

export async function continueHearingsFlow(page: Page): Promise<void> {
  await page.getByRole('button', { name: /^continue$/i }).click();
}

export async function goBackInHearingsFlow(page: Page): Promise<void> {
  await page.getByRole('link', { name: /^back$/i }).click();
}

export async function selectOrderedLinkedHearings(page: Page): Promise<void> {
  await page.locator('#linked-form input[type="radio"]').first().check();
  await continueHearingsFlow(page);
  await page.locator('#particularOrder').check();

  const orderSelects = page.locator('select[id^="hearingsOrder"]');
  const orderCount = await orderSelects.count();
  for (let index = 0; index < orderCount; index += 1) {
    await orderSelects.nth(index).selectOption(String(index + 1));
  }
}
