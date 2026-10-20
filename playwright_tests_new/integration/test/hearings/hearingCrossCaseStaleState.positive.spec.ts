import { expect, test } from '../../../E2E/fixtures';
import {
  HEARING_MANAGER_CR84_ON_USER,
  hearingManagerRoles,
  openHearingsTab,
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
    test('keeps Case B identity and update payload when its list response is late after completed A (EXUI-5434)', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
      hearingViewEditSummaryPage,
      hearingViewSummaryPage,
    }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_ON_USER,
        routeConfig: {
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
        },
      });
      await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID);

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

      let releaseCaseBResponse!: () => void;
      const caseBResponseGate = new Promise<void>((resolve) => {
        releaseCaseBResponse = resolve;
      });
      await page.route('**/api/hearings/getHearings*', async (route) => {
        if (new URL(route.request().url()).searchParams.get('caseId') !== caseBReference) {
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

      const caseBValuesRequest = page.waitForRequest(
        (request) =>
          request.url().includes('/api/hearings/loadServiceHearingValues') &&
          (request.postDataJSON() as { caseReference?: string })?.caseReference === caseBReference
      );
      const caseBListRequest = page.waitForRequest(
        (request) =>
          request.url().includes('/api/hearings/getHearings') &&
          new URL(request.url()).searchParams.get('caseId') === caseBReference
      );

      try {
        await page.locator('#exuiCaseReferenceSearch').fill(caseBReference);
        await page.locator('form:has(#exuiCaseReferenceSearch)').getByRole('button', { name: 'Find', exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`/cases/case-details/(?:CIVIL/CIVIL/)?${caseBReference}(?:[?#]|$)`));
        await expect
          .poll(async () => (await caseDetailsPage.ccdCaseReference.textContent())?.replace(/\D/g, ''))
          .toBe(caseBReference);

        // The case-details helper waits for the load spinner, so click the tab directly while B's list is held.
        await page
          .getByRole('tab', { name: /hearings/i })
          .first()
          .click();
        await caseBListRequest;
        await expect(hearingsTabPage.container).toBeVisible();
        await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toBeHidden();
        await expect(hearingsTabPage.viewDetailsButton(caseBHearing.hearingId)).toBeHidden();
      } finally {
        releaseCaseBResponse();
      }

      const valuesRequest = await caseBValuesRequest;
      expect(valuesRequest.postDataJSON()).toEqual({ caseReference: caseBReference });
      await hearingsTabPage.waitForReady(caseBHearing.hearingId);
      await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toBeHidden();
      await expect(page.locator('[id^="link-view-details-"]')).toHaveCount(1);

      await hearingsTabPage.openViewDetails(caseBHearing.hearingId);
      await hearingViewSummaryPage.waitForReady();
      await expect(hearingViewSummaryPage.container.locator('exui-hearing-case-name')).toHaveText(caseBInternalName);
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
