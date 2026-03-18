import type { Page, Response } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import type { CaseDetailsPage } from '../../../E2E/page-objects/pages/exui/caseDetails.po';
import type { HearingsTabPage } from '../../../E2E/page-objects/pages/exui/hearingsTab.po';
import { applySessionCookies } from '../../../common/sessionCapture';
import { type HearingsMockRoutesConfig, setupHearingsMockRoutes } from '../../helpers';
import {
  HEARINGS_CASE_JURISDICTION,
  HEARINGS_CASE_REFERENCE,
  HEARINGS_CASE_TYPE,
  HEARINGS_LISTED_HEARING_ID,
  LISTED_HEARING_SCENARIO,
  buildHearingsListMock,
  type HearingScenario,
} from '../../mocks/hearings.mock';

const userIdentifier = 'HEARING_MANAGER_CR84_ON';
const caseDetailsUrl = (jurisdictionId = HEARINGS_CASE_JURISDICTION, caseTypeId = HEARINGS_CASE_TYPE) =>
  `/cases/case-details/${jurisdictionId}/${caseTypeId}/${HEARINGS_CASE_REFERENCE}`;

const hearingManagerRoles = ['caseworker-privatelaw', 'caseworker-privatelaw-courtadmin', 'case-allocator', 'hearing-manager'];
const hearingViewerRoles = ['caseworker-privatelaw', 'caseworker-privatelaw-courtadmin', 'case-allocator', 'hearing-viewer'];
const errorStatusCodes = [400, 401, 403, 404, 500, 503];

async function openHearingsTabForScenario(
  page: Page,
  caseDetailsPage: CaseDetailsPage,
  config: HearingsMockRoutesConfig,
  options?: { waitForGetHearingsResponse?: boolean }
): Promise<Response | null> {
  await applySessionCookies(page, userIdentifier);
  await setupHearingsMockRoutes(page, config);
  await page.goto(caseDetailsUrl(config.caseConfig?.jurisdictionId, config.caseConfig?.caseTypeId), {
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

function buildLargeListedHearings(total: number): HearingScenario[] {
  return Array.from({ length: total }, (_value, index) => ({
    ...LISTED_HEARING_SCENARIO,
    hearingId: String(1705615000000 + index),
    hearingType: `ABA5-LISTED-${index + 1}`,
  }));
}

async function expectReloadOrEmptyState(page: Page, hearingsTabPage: HearingsTabPage): Promise<void> {
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
      { timeout: 15_000 }
    )
    .not.toBe('pending');
}

async function expectLoadingPhaseBeforeRowsRender(page: Page): Promise<void> {
  const hearingRows = page.locator('[id^="link-view-details-"]');
  const spinnerSeenPromise = page.evaluate(() => {
    if (document.querySelector('xuilib-loading-spinner')) {
      return true;
    }

    return new Promise<boolean>((resolve) => {
      const observer = new MutationObserver(() => {
        if (document.querySelector('xuilib-loading-spinner')) {
          observer.disconnect();
          resolve(true);
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
      window.setTimeout(() => {
        observer.disconnect();
        resolve(false);
      }, 10_000);
    });
  });

  await expect(hearingRows).toHaveCount(0, { timeout: 10_000 });
  expect(await spinnerSeenPromise).toBe(true);
}

test.describe(`Hearings resilience integration as ${userIdentifier}`, { tag: ['@integration', '@integration-hearings'] }, () => {
  test('Hearings - manager can start the request hearing journey from the Hearings tab', async ({ page, caseDetailsPage }) => {
    const response = await openHearingsTabForScenario(page, caseDetailsPage, {
      userRoles: hearingManagerRoles,
      hearings: [LISTED_HEARING_SCENARIO],
    });

    expect(response?.status()).toBe(200);
    const requestHearingButton = page.getByRole('button', { name: /request a hearing/i });
    await expect(requestHearingButton).toBeVisible();

    await requestHearingButton.click();
    await expect(page).toHaveURL(/\/hearings\/request\/hearing-requirements$/);
  });

  test('Hearings - large dataset renders all hearing rows without crashing', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
  }) => {
    const largeDataset = buildLargeListedHearings(35);
    await openHearingsTabForScenario(page, caseDetailsPage, {
      userRoles: hearingViewerRoles,
      hearings: largeDataset,
    });

    await hearingsTabPage.waitForReady(largeDataset[0].hearingId);
    const renderedViewDetailsButtons = await page.locator('[id^="link-view-details-"]').count();
    expect(renderedViewDetailsButtons).toBe(largeDataset.length);
  });

  test('Hearings - valid payload with optional or null fields still renders without UI failure', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
  }) => {
    const nullablePayload = buildHearingsListMock([LISTED_HEARING_SCENARIO]) as { caseHearings?: Array<Record<string, unknown>> };
    const firstHearing = nullablePayload.caseHearings?.[0];
    if (firstHearing) {
      firstHearing.hearingType = null;
      firstHearing.earliestHearingStartDateTime = null;
      firstHearing.hearingDaySchedule = null;
      firstHearing.hearingGroupRequestId = null;
    }

    await openHearingsTabForScenario(page, caseDetailsPage, {
      userRoles: hearingViewerRoles,
      hearingsApiOverrides: {
        getHearings: {
          body: nullablePayload,
        },
      },
    });

    await expect(hearingsTabPage.container).toBeVisible();
    await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toBeVisible();
    await expect(page.getByText('Invalid Date', { exact: false })).toHaveCount(0);
  });

  test('Hearings - empty state is rendered when the hearings list is empty', async ({ page, caseDetailsPage }) => {
    await openHearingsTabForScenario(page, caseDetailsPage, {
      userRoles: hearingViewerRoles,
      hearings: [],
    });

    await expect(page.getByText('No current and upcoming hearings found')).toBeVisible();
  });

  for (const statusCode of errorStatusCodes) {
    test(`Hearings - ${statusCode} getHearings response shows controlled error state with reload option`, async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
    }) => {
      const response = await openHearingsTabForScenario(page, caseDetailsPage, {
        userRoles: hearingViewerRoles,
        hearingsApiOverrides: {
          getHearings: {
            status: statusCode,
            body: {},
          },
        },
      });

      expect(response?.status()).toBe(statusCode);
      await expect(hearingsTabPage.reloadButton).toBeVisible();
      await expect(page.locator('.govuk-main-wrapper p.govuk-body')).toBeVisible();
      await expect(page).toHaveURL(/\/cases\/case-details\/.*#Hearings$/);
    });
  }

  test('Hearings - malformed JSON response is handled without UI crash', async ({ page, caseDetailsPage, hearingsTabPage }) => {
    await openHearingsTabForScenario(page, caseDetailsPage, {
      userRoles: hearingViewerRoles,
      hearingsApiOverrides: {
        getHearings: {
          body: '{"invalidJson":',
          contentType: 'application/json',
        },
      },
    });

    await expect(hearingsTabPage.reloadButton).toBeVisible();
    await expect(page.locator('.govuk-main-wrapper p.govuk-body')).toBeVisible();
    await expect(page).toHaveURL(/\/cases\/case-details\/.*#Hearings$/);
  });

  test('Hearings - unexpected response schema is handled with controlled error UI', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
  }) => {
    await openHearingsTabForScenario(page, caseDetailsPage, {
      userRoles: hearingViewerRoles,
      hearingsApiOverrides: {
        getHearings: {
          body: {
            caseRef: HEARINGS_CASE_REFERENCE,
            caseHearings: null,
            unexpected: 'shape',
          },
        },
      },
    });

    await expectReloadOrEmptyState(page, hearingsTabPage);
    await expect(page).toHaveURL(/\/cases\/case-details\/.*#Hearings$/);
  });

  test('Hearings - timeout or network failure returns a controlled reload state', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
  }) => {
    await openHearingsTabForScenario(
      page,
      caseDetailsPage,
      {
        userRoles: hearingViewerRoles,
        hearingsApiOverrides: {
          getHearings: {
            abortErrorCode: 'timedout',
          },
        },
      },
      { waitForGetHearingsResponse: false }
    );

    await expect(hearingsTabPage.reloadButton).toBeVisible();
    await expect(page.locator('.govuk-main-wrapper p.govuk-body')).toBeVisible();
    await expect(page).toHaveURL(/\/cases\/case-details\/.*#Hearings$/);
  });

  test('Hearings - slow response shows loading indicator before tab rows are rendered', async ({ page, hearingsTabPage }) => {
    await applySessionCookies(page, userIdentifier);
    await setupHearingsMockRoutes(page, {
      userRoles: hearingViewerRoles,
      hearings: [LISTED_HEARING_SCENARIO],
      hearingsApiOverrides: {
        getHearings: {
          delayMs: 4_000,
        },
      },
    });

    await page.goto(caseDetailsUrl(), { waitUntil: 'domcontentloaded' });
    const hearingsTab = page.getByRole('tab', { name: /hearings/i }).first();
    const getHearingsResponse = page.waitForResponse((response) => response.url().includes('/api/hearings/getHearings'));
    await hearingsTab.click();

    await expectLoadingPhaseBeforeRowsRender(page);

    await getHearingsResponse;
    await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID);
    await expect(page.locator('[id^="link-view-details-"]')).toHaveCount(1);
    await expect(page.locator('xuilib-loading-spinner')).toBeHidden();
  });
});
