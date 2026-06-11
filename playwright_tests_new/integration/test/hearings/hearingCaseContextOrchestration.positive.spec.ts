import { expect, test } from '../../../E2E/fixtures';
import {
  HEARINGS_LISTED_HEARING_ID,
  LISTED_HEARING_SCENARIO,
  buildServiceHearingValuesMock,
  type HearingsCaseConfig,
} from '../../mocks/hearings.mock';
import {
  HEARING_MANAGER_CR84_ON_USER,
  hearingManagerRoles,
  openHearingsTab,
  submitAdditionalInstructionsUpdate,
} from '../../helpers';

const nonDefaultCaseConfig: HearingsCaseConfig = {
  caseReference: '9988776655443322',
  jurisdictionId: 'SSCS',
  caseTypeId: 'Benefit',
  serviceId: 'BFA1',
  locationId: '231596',
  locationName: 'Birmingham Civil and Family Justice Centre',
};

test.describe(
  `Hearings case context orchestration as ${HEARING_MANAGER_CR84_ON_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('EXUI-4431/EXUI-4433/EXUI-4434 preserves non-default case context through view-edit-submit orchestration', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
      hearingViewEditSummaryPage,
      hearingViewSummaryPage,
    }) => {
      const loadServiceValuesRequest = page.waitForRequest(
        (request) => request.url().includes('/api/hearings/loadServiceHearingValues') && request.method() === 'POST'
      );
      const caseTypeLovRequest = page.waitForRequest(
        (request) => request.url().includes('/api/prd/lov/getLovRefData') && request.url().includes('caseType')
      );
      const courtLocationRequest = page.waitForRequest((request) => request.url().includes('/api/prd/location/getLocationById'));

      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_ON_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [LISTED_HEARING_SCENARIO],
          summaryHearing: LISTED_HEARING_SCENARIO,
          caseConfig: nonDefaultCaseConfig,
          enabledCaseVariations: [{ jurisdiction: 'SSCS', caseType: 'Benefit' }],
          amendmentCaseVariations: [{ jurisdiction: 'SSCS', caseType: 'Benefit' }],
        },
      });

      await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID);
      await hearingsTabPage.openViewDetails(HEARINGS_LISTED_HEARING_ID);
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-view-summary$/);

      const serviceValuesRequest = await loadServiceValuesRequest;
      expect(new URL(serviceValuesRequest.url()).searchParams.get('jurisdictionId')).toBe(nonDefaultCaseConfig.jurisdictionId);
      expect(serviceValuesRequest.postDataJSON()).toEqual({
        caseReference: nonDefaultCaseConfig.caseReference,
      });

      const additionalInstructions = 'Playwright case context orchestration verification';
      const updateRequest = await submitAdditionalInstructionsUpdate(
        page,
        hearingViewSummaryPage,
        hearingViewEditSummaryPage,
        additionalInstructions
      );
      const updatePayload = updateRequest.postDataJSON();

      expect((await caseTypeLovRequest).url()).toContain('caseType');
      expect((await courtLocationRequest).url()).toContain(nonDefaultCaseConfig.locationId);
      expect(updatePayload).toEqual(
        expect.objectContaining({
          caseDetails: expect.objectContaining({
            caseRef: nonDefaultCaseConfig.caseReference,
            hmctsServiceCode: nonDefaultCaseConfig.serviceId,
            caseManagementLocationCode: nonDefaultCaseConfig.locationId,
          }),
          hearingDetails: expect.objectContaining({
            hearingType: LISTED_HEARING_SCENARIO.hearingType,
            listingComments: additionalInstructions,
            hearingLocations: [expect.objectContaining({ locationId: nonDefaultCaseConfig.locationId })],
          }),
        })
      );
    });

    test('EXUI-4432 keeps edit orchestration usable when service hearing values omit optional case display fields', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
      hearingViewEditSummaryPage,
      hearingViewSummaryPage,
    }) => {
      const partialServiceValues = buildServiceHearingValuesMock(nonDefaultCaseConfig, LISTED_HEARING_SCENARIO) as Record<
        string,
        unknown
      >;
      delete partialServiceValues.caseDeepLink;
      delete partialServiceValues.publicCaseName;
      delete partialServiceValues.hmctsInternalCaseName;

      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_ON_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [LISTED_HEARING_SCENARIO],
          summaryHearing: LISTED_HEARING_SCENARIO,
          caseConfig: nonDefaultCaseConfig,
          enabledCaseVariations: [{ jurisdiction: 'SSCS', caseType: 'Benefit' }],
          amendmentCaseVariations: [{ jurisdiction: 'SSCS', caseType: 'Benefit' }],
          hearingsApiOverrides: {
            loadServiceHearingValues: {
              body: partialServiceValues,
            },
          },
        },
      });

      await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID);
      await hearingsTabPage.openViewDetails(HEARINGS_LISTED_HEARING_ID);
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-view-summary$/);

      await hearingViewSummaryPage.waitForReady();
      await hearingViewSummaryPage.editHearingButton.click();
      await hearingViewEditSummaryPage.waitForReady();
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-edit-summary#?$/);
      await expect(hearingViewEditSummaryPage.rowChangeButton('Enter any additional instructions for the hearing')).toBeVisible();
      await expect(hearingViewEditSummaryPage.errorSummaryHeading).toBeHidden();
    });
  }
);
