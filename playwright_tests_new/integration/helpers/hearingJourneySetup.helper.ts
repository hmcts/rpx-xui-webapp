import { expect, type Page, type Response } from '@playwright/test';
import type { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { HearingsTabPage } from '../../E2E/page-objects/pages/exui/hearingsTab.po';
import { applySessionCookies } from '../../common/sessionCapture';
import {
  HEARING_MANAGER_CR84_OFF_USER,
  HEARING_MANAGER_CR84_ON_USER,
  resolveHearingManagerUserIdentifier,
  type HearingManagerUserIdentifier,
} from './hearingManagerUserPool.helper';
import { setupHearingsMockRoutes, type HearingsMockRoutesConfig } from './hearingsMockRoutes.helper';
import {
  HEARINGS_CASE_JURISDICTION,
  HEARINGS_CASE_REFERENCE,
  HEARINGS_CASE_TYPE,
  LISTED_HEARING_SCENARIO,
  type HearingScenario,
} from '../mocks/hearings.mock';

export const HEARINGS_TERMINAL_STATE_TIMEOUT_MS = 15_000;
export const HEARINGS_ROWS_HIDDEN_TIMEOUT_MS = 10_000;
export const HEARINGS_SLOW_RESPONSE_DELAY_MS = 4_000;
const HEARINGS_NAVIGATION_ATTEMPTS = 3;

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

function isTransientNavigationError(error: unknown): boolean {
  return (
    error instanceof Error &&
    /ERR_SOCKET_NOT_CONNECTED|ERR_ABORTED|net::ERR|Navigation failed|interrupted.*navigation|chrome-error:\/\/chromewebdata|did not reach/i.test(
      error.message
    )
  );
}

export async function gotoCaseDetailsWithRetry(page: Page, targetUrl: string): Promise<void> {
  const targetPath = targetUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const targetPattern = new RegExp(`${targetPath}(?:[/?#]|$)`);

  for (let attempt = 1; attempt <= HEARINGS_NAVIGATION_ATTEMPTS; attempt += 1) {
    try {
      await page.goto(targetUrl, {
        waitUntil: 'domcontentloaded',
      });
      await page.waitForURL(targetPattern, { timeout: 30_000 }).catch(() => undefined);
      if (!targetPattern.test(page.url())) {
        throw new Error(`Hearings case-details navigation did not reach ${targetUrl}; current URL is ${page.url()}`);
      }
      return;
    } catch (error) {
      if (attempt >= HEARINGS_NAVIGATION_ATTEMPTS || !isTransientNavigationError(error)) {
        throw error;
      }
    }
  }
}

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
    userIdentifier?: HearingManagerUserIdentifier;
    routeConfig: HearingsMockRoutesConfig;
    jurisdictionId?: string;
    caseTypeId?: string;
    caseReference?: string;
  }
): Promise<void> {
  await applySessionCookies(page, resolveHearingManagerUserIdentifier(options.userIdentifier ?? HEARING_MANAGER_CR84_ON_USER));
  await setupHearingsMockRoutes(page, options.routeConfig);
  const route = resolveHearingsCaseRoute(options);
  await gotoCaseDetailsWithRetry(page, caseDetailsUrl(route.jurisdictionId, route.caseTypeId, route.caseReference));
  await caseDetailsPage.selectCaseDetailsTab('Hearings');
}

export async function openHearingsTabForScenario(
  page: Page,
  caseDetailsPage: CaseDetailsPage,
  config: HearingsMockRoutesConfig,
  options?: {
    userIdentifier?: HearingManagerUserIdentifier;
    waitForGetHearingsResponse?: boolean;
  }
): Promise<Response | null> {
  await applySessionCookies(page, resolveHearingManagerUserIdentifier(options?.userIdentifier ?? HEARING_MANAGER_CR84_ON_USER));
  await setupHearingsMockRoutes(page, config);
  const route = resolveHearingsCaseRoute({ routeConfig: config });
  const targetUrl = caseDetailsUrl(route.jurisdictionId, route.caseTypeId, route.caseReference);
  await gotoCaseDetailsWithRetry(page, targetUrl);
  await expect(caseDetailsPage.container)
    .toBeVisible({ timeout: 30_000 })
    .catch(async (error: Error) => {
      await gotoCaseDetailsWithRetry(page, targetUrl);
      await expect(caseDetailsPage.container)
        .toBeVisible({ timeout: 30_000 })
        .catch(() => {
          throw error;
        });
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

export async function waitForHearingsTerminalState(hearingsTabPage: HearingsTabPage): Promise<void> {
  await expect
    .poll(
      async () => {
        if (await hearingsTabPage.reloadButton.isVisible()) {
          return 'reload';
        }
        if (await hearingsTabPage.emptyState.isVisible()) {
          return 'empty';
        }
        return 'pending';
      },
      { timeout: HEARINGS_TERMINAL_STATE_TIMEOUT_MS }
    )
    .not.toBe('pending');
}

export async function expectHearingsRowsHiddenBeforeResponse(page: Page): Promise<void> {
  await new HearingsTabPage(page).expectNoViewDetailsButtons(HEARINGS_ROWS_HIDDEN_TIMEOUT_MS);
}

export async function continueHearingsFlow(page: Page): Promise<void> {
  await new HearingsTabPage(page).continueFlow();
}

export async function goBackInHearingsFlow(page: Page): Promise<void> {
  await new HearingsTabPage(page).goBack();
}

export async function selectOrderedLinkedHearings(page: Page): Promise<void> {
  await new HearingsTabPage(page).selectOrderedLinkedHearings();
}
