import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import {
  buildLargeListedHearings,
  caseDetailsUrl,
  expectHearingsRowsHiddenBeforeResponse,
  HEARING_MANAGER_CR84_ON_USER,
  HEARINGS_SLOW_RESPONSE_DELAY_MS,
  openHearingsTabForScenario,
  setupHearingsMockRoutes,
  waitForHearingsTerminalState,
} from '../../helpers';
import {
  HEARINGS_CASE_REFERENCE,
  HEARINGS_LISTED_HEARING_ID,
  LISTED_HEARING_SCENARIO,
  buildHearingsListMock,
} from '../../mocks/hearings.mock';

const userIdentifier = HEARING_MANAGER_CR84_ON_USER;

const hearingManagerRoles = ['caseworker-privatelaw', 'caseworker-privatelaw-courtadmin', 'case-allocator', 'hearing-manager'];
const hearingViewerRoles = ['caseworker-privatelaw', 'caseworker-privatelaw-courtadmin', 'case-allocator', 'hearing-viewer'];
const errorStatusCodes = [400, 401, 403, 404, 500, 503];

test.describe(`Hearings resilience integration as ${userIdentifier}`, { tag: ['@integration', '@integration-hearings'] }, () => {
  test('Hearings - manager can start the request hearing journey from the Hearings tab', async ({ page, caseDetailsPage }) => {
    const response = await openHearingsTabForScenario(page, caseDetailsPage, {
      userRoles: hearingManagerRoles,
      hearings: [LISTED_HEARING_SCENARIO],
    });

    expect(response?.status()).toBe(200);
    await expect(page.getByRole('button', { name: /request a hearing/i })).toBeVisible();
    await page.getByRole('button', { name: /request a hearing/i }).click();
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
    await expect(page.getByText('ABA5-LISTED-1', { exact: true })).toBeVisible();
    await expect(page.getByText('ABA5-LISTED-35', { exact: true })).toBeVisible();
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

    await waitForHearingsTerminalState(page, hearingsTabPage);
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

  test('Hearings - slow response does not render tab rows before the hearings response resolves', async ({
    page,
    hearingsTabPage,
  }) => {
    await applySessionCookies(page, userIdentifier);
    await setupHearingsMockRoutes(page, {
      userRoles: hearingViewerRoles,
      hearings: [LISTED_HEARING_SCENARIO],
      hearingsApiOverrides: {
        getHearings: {
          delayMs: HEARINGS_SLOW_RESPONSE_DELAY_MS,
        },
      },
    });

    await page.goto(caseDetailsUrl(), { waitUntil: 'domcontentloaded' });
    const hearingsTab = page.getByRole('tab', { name: /hearings/i }).first();
    const getHearingsResponse = page.waitForResponse((response) => response.url().includes('/api/hearings/getHearings'));
    await hearingsTab.click();

    await expectHearingsRowsHiddenBeforeResponse(page);

    await getHearingsResponse;
    await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID);
    await expect(page.locator('[id^="link-view-details-"]')).toHaveCount(1);
    await expect(page.locator('xuilib-loading-spinner')).toBeHidden();
  });
});
