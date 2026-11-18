import { expect, test } from '../../../E2E/fixtures';
import {
  HEARING_MANAGER_CR84_ON_USER,
  applyHearingManagerSessionCookies,
  caseDetailsUrl,
  gotoCaseDetailsWithRetry,
  hearingManagerRoles,
  setupHearingsMockRoutes,
  submitAdditionalInstructionsUpdate,
} from '../../helpers';
import {
  HEARINGS_CASE_REFERENCE,
  HEARINGS_LISTED_HEARING_ID,
  LISTED_HEARING_SCENARIO,
  buildHearingRequestMock,
  buildHearingsCaseDetailsMock,
  buildHearingsListMock,
  buildServiceHearingValuesMock,
  type HearingScenario,
  type HearingsCaseConfig,
} from '../../mocks/hearings.mock';

const caseB: HearingsCaseConfig = { caseReference: '9988776655443322' };
const caseAInternalName = 'Case A hearing identity';
const caseBInternalName = 'Case B hearing identity';
const caseBPublicName = 'Case B public identity';
const caseBHearing: HearingScenario = {
  ...LISTED_HEARING_SCENARIO,
  hearingId: '1705614528200',
  hearingType: 'ABA5-CASE-B',
};

test.describe(
  `Hearings cross-case stale state as ${HEARING_MANAGER_CR84_ON_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('keeps Case B identity and update payload when Case A responds after the switch (EXUI-5434)', async ({
      page,
      searchCasePage,
      hearingsTabPage,
      hearingViewEditSummaryPage,
      hearingViewSummaryPage,
    }) => {
      await applyHearingManagerSessionCookies(page, HEARING_MANAGER_CR84_ON_USER);
      await setupHearingsMockRoutes(page, {
        userRoles: hearingManagerRoles,
        hearings: [LISTED_HEARING_SCENARIO],
        hearingsApiOverrides: {
          loadServiceHearingValues: {
            body: {
              ...buildServiceHearingValuesMock(),
              caseId: HEARINGS_CASE_REFERENCE,
              hmctsInternalCaseName: caseAInternalName,
            },
          },
        },
      });
      await gotoCaseDetailsWithRetry(page, caseDetailsUrl('CIVIL', 'CIVIL', HEARINGS_CASE_REFERENCE));

      const caseBReference = caseB.caseReference!;
      const caseBHearingRequest = buildHearingRequestMock(caseBHearing, caseB);
      const caseBHearingRequestDetails = caseBHearingRequest.caseDetails as Record<string, unknown>;
      caseBHearingRequestDetails.hmctsInternalCaseName = caseBInternalName;
      caseBHearingRequestDetails.publicCaseName = caseBPublicName;
      await page.route(`**/data/internal/cases/${caseBReference}*`, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(buildHearingsCaseDetailsMock(caseB)),
        });
      });
      await page.route('**/api/hearings/loadServiceHearingValues*', async (route) => {
        if ((route.request().postDataJSON() as { caseReference?: string })?.caseReference !== caseBReference) {
          await route.fallback();
          return;
        }
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            ...buildServiceHearingValuesMock(caseB, caseBHearing),
            caseId: caseBReference,
            hmctsInternalCaseName: caseBInternalName,
            publicCaseName: caseBPublicName,
          }),
        });
      });
      await page.route('**/api/hearings/getHearing*', async (route) => {
        if (new URL(route.request().url()).searchParams.get('hearingId') !== caseBHearing.hearingId) {
          await route.fallback();
          return;
        }
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(caseBHearingRequest),
        });
      });

      let releaseCaseAResponse!: () => void;
      let caseAResponseReleased = false;
      const caseAResponseGate = new Promise<void>((resolve) => {
        releaseCaseAResponse = () => {
          if (caseAResponseReleased) {
            return;
          }
          caseAResponseReleased = true;
          resolve();
        };
      });
      let resolveCaseAResponseFulfilled!: () => void;
      let rejectCaseAResponseFulfilled!: (error: unknown) => void;
      const caseAResponseFulfilled = new Promise<void>((resolve, reject) => {
        resolveCaseAResponseFulfilled = resolve;
        rejectCaseAResponseFulfilled = reject;
      });
      let releaseCaseBResponse!: () => void;
      let caseBResponseReleased = false;
      const caseBResponseGate = new Promise<void>((resolve) => {
        releaseCaseBResponse = () => {
          if (caseBResponseReleased) {
            return;
          }
          caseBResponseReleased = true;
          resolve();
        };
      });
      await page.route('**/api/hearings/getHearings*', async (route) => {
        const requestedCaseReference = new URL(route.request().url()).searchParams.get('caseId');
        if (requestedCaseReference === HEARINGS_CASE_REFERENCE) {
          await caseAResponseGate;
          try {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(buildHearingsListMock([LISTED_HEARING_SCENARIO])),
            });
            resolveCaseAResponseFulfilled();
          } catch (error) {
            rejectCaseAResponseFulfilled(error);
            throw error;
          }
          return;
        }
        if (requestedCaseReference !== caseBReference) {
          await route.fallback();
          return;
        }
        await caseBResponseGate;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(buildHearingsListMock([caseBHearing], caseB)),
        });
      });

      const caseAListRequest = page.waitForRequest(
        (request) =>
          request.url().includes('/api/hearings/getHearings') &&
          new URL(request.url()).searchParams.get('caseId') === HEARINGS_CASE_REFERENCE
      );
      let caseBValuesRequest!: ReturnType<typeof page.waitForRequest>;
      let caseBListRequest!: ReturnType<typeof page.waitForRequest>;
      let caseBListResponse!: ReturnType<typeof page.waitForResponse>;

      try {
        await page
          .getByRole('tab', { name: /hearings/i })
          .first()
          .click();
        await caseAListRequest;
        await searchCasePage.caseIdTextBox.fill(caseBReference);
        await searchCasePage.searchCaseFindButton.click();
        await expect(page).toHaveURL(new RegExp(`/cases/case-details/(?:CIVIL/CIVIL/)?${caseBReference}(?:[/?#]|$)`));

        caseBValuesRequest = page.waitForRequest(
          (request) =>
            request.url().includes('/api/hearings/loadServiceHearingValues') &&
            (request.postDataJSON() as { caseReference?: string })?.caseReference === caseBReference
        );
        caseBListRequest = page.waitForRequest(
          (request) =>
            request.url().includes('/api/hearings/getHearings') &&
            new URL(request.url()).searchParams.get('caseId') === caseBReference
        );
        caseBListResponse = page.waitForResponse(
          (response) =>
            response.url().includes('/api/hearings/getHearings') &&
            new URL(response.url()).searchParams.get('caseId') === caseBReference &&
            response.status() === 200
        );

        await page
          .getByRole('tab', { name: /hearings/i })
          .first()
          .click();
        await caseBListRequest;
        // Keep B's list request pending while the stale A response completes.
        releaseCaseAResponse();
        await caseAResponseFulfilled;
        releaseCaseBResponse();
        await caseBListResponse;
        await expect(hearingsTabPage.container).toBeVisible();
        await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toBeHidden();
        await expect(hearingsTabPage.viewDetailsButton(caseBHearing.hearingId)).toBeVisible();
      } finally {
        releaseCaseAResponse();
        releaseCaseBResponse();
        await caseAResponseFulfilled;
      }

      const valuesRequest = await caseBValuesRequest;
      expect(valuesRequest.postDataJSON()).toEqual({ caseReference: caseBReference });
      await hearingsTabPage.waitForReady(caseBHearing.hearingId);
      await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toBeHidden();
      await expect(page.locator('[id^="link-view-details-"]')).toHaveCount(1);

      await hearingsTabPage.openViewDetails(caseBHearing.hearingId);
      await hearingViewSummaryPage.waitForReady();
      await expect(hearingViewSummaryPage.summaryRow('Case internal name')).toContainText(caseBInternalName);
      const updateRequest = await submitAdditionalInstructionsUpdate(
        page,
        hearingViewSummaryPage,
        hearingViewEditSummaryPage,
        'Case B stale-state verification'
      );
      const updatePayload = updateRequest.postDataJSON();
      expect(updatePayload).toEqual(
        expect.objectContaining({
          caseDetails: expect.objectContaining({
            caseRef: caseBReference,
            hmctsInternalCaseName: caseBInternalName,
            publicCaseName: caseBPublicName,
          }),
          hearingDetails: expect.objectContaining({ hearingType: caseBHearing.hearingType }),
        })
      );
      expect(JSON.stringify(updatePayload)).not.toContain(HEARINGS_CASE_REFERENCE);
      expect(JSON.stringify(updatePayload)).not.toContain(caseAInternalName);
    });
  }
);
