import { expect, test } from '../../fixtures';
import { ensureSession } from '../../../common/sessionCapture';
import { HearingJourneyModel } from '../../utils/hearing-model';
//import { resolveCaseReferenceFromGlobalSearch, resolveNonExistentCaseReference } from '../../../E2E/utils/case-reference.utils';
import { openHomeWithCapturedSession } from '../searchCase/searchCase.setup';
import { caseDetailsUrl, continueHearingsFlow } from '../../../integration/helpers/hearingJourneySetup.helper.ts';
continueHearingsFlow;

const userIdentfier = 'PRL_HEARINGS';
const hearingJourneyModel = new HearingJourneyModel();

const hearingRouteConfig = {
  jurisdictionId: 'PRIVATELAW',
  caseTypeId: 'PRLAPPS',
  caseReference: '',
};

test.describe('PRL User Hearings Journey E2E', { tag: ['@e2e', '@e2e-prl-hearings'] }, () => {
  let availableCaseReference: string;
  test.beforeAll(async () => {
    await ensureSession(userIdentfier);
    setUpHearingJourneyData();
  });

  test.beforeEach(async ({ page }) => {
    await openHomeWithCapturedSession(page, userIdentfier);
  });

  test('Verify that the hearings Tab is present and start the journey ', async ({
    caseDetailsPage,
    //searchCasePage,
    hearingsTabPage,
    hearingsJourneyPage,
    page,
  }) => {
    hearingRouteConfig.caseReference = '1775575928056201'; // hardcoding for now.

    await test.step('Navigate to Hearings Page and click on the hearings tab', async () => {
      await page.goto(
        caseDetailsUrl(hearingRouteConfig.jurisdictionId, hearingRouteConfig.caseTypeId, hearingRouteConfig.caseReference),
        { waitUntil: 'domcontentloaded' }
      );
      await caseDetailsPage.selectCaseDetailsTab('Hearings');
      await expect(page).toHaveURL(/\/cases\/case-details\/.*#Hearings$/);
    });

    await test.step('Check Hearing page controls and start journey', async () => {
      await expect(hearingsTabPage.currentAndUpcomingHeading('Current and upcoming')).toBeVisible();
      await expect(hearingsTabPage.pastOrCancelledHeading('Past or cancelled')).toBeVisible();
      await hearingsTabPage.openRequestHearing();
    });

    await test.step('Hearing Requirements and additional facilities', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-requirements$/);
      await expect(page.getByRole('heading', { name: /hearing requirements/i })).toBeVisible();

      await continueHearingsFlow(page);
      await expect(page.getByRole('heading', { name: /do you require any additional facilities\?/i })).toBeVisible();

      await hearingsJourneyPage.additionalSecurityAndFacilities(hearingJourneyModel, page);
      await continueHearingsFlow(page);
    });

    await test.step('Hearing Stage Radio select ', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-stage$/);
      await expect(page.getByRole('heading', { name: /What stage is this hearing at?/i })).toBeVisible();
      await hearingsJourneyPage.setHearingStage(hearingJourneyModel, page);
      await continueHearingsFlow(page);
    });

    await test.step('Select Hearing Attendence Details  ', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-attendance$/);

      await continueHearingsFlow(page);
      await page.waitForTimeout(6000);
    });
  });

  // TODO Data SetUp - move to helper once done
  function setUpHearingJourneyData() {
    hearingJourneyModel.set('hearingFacilities', 'additionalSecurity', 'Yes');
    hearingJourneyModel.set('hearingFacilities', 'additionalFacilities', ['Custody Cell', 'Laptop', 'Projector', 'Witness Room']);
    hearingJourneyModel.set('hearingStage', 'stage', 'Allocation'); // Radio button for HearingStage
  }
});
