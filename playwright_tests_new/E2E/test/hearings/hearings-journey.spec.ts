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

    await test.step('Complete the Hearing Stage Section', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-stage$/);
      await expect(page.getByRole('heading', { name: /What stage is this hearing at?/i })).toBeVisible();
      await hearingsJourneyPage.setHearingStage(hearingJourneyModel);
      await continueHearingsFlow(page);
    });

    await test.step('Complete Hearing Attendance Section', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-attendance$/);
      await expect(page.getByRole('heading', { name: /Participant attendance/i })).toBeVisible();

      await hearingsJourneyPage.setParticipantAttendence(hearingJourneyModel);
      await continueHearingsFlow(page);
    });

    await test.step('Complete Hearing Venue Section', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-venue$/);
      await expect(page.getByRole('heading', { name: /What are the hearing venue details?/i })).toBeVisible();

      await hearingsJourneyPage.setHearingVenue(hearingJourneyModel);
      await continueHearingsFlow(page);
    });

    await test.step('Welsh Hearing and Hearing Details until CYA page', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-welsh$/);
      await expect(page.getByRole('heading', { name: /Does this hearing need to be in Welsh?/i })).toBeVisible();
      await hearingsJourneyPage.isWelshHearing(hearingJourneyModel);
      await continueHearingsFlow(page);
    });

    await test.step('Specific Judge Selection', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-judge$/);
      await expect(page.getByRole('heading', { name: /Do you want a specific judge?/i })).toBeVisible();

      await hearingsJourneyPage.setJudgeOptions(hearingJourneyModel);
      await continueHearingsFlow(page);
    });

    // hearing timing
    await test.step('Hearing Timings etc', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-timing$/);

      await page.waitForTimeout(12000);
    });
  });

  // TODO Data SetUp - move to helper once done
  function setUpHearingJourneyData() {
    // Hearing facilities
    hearingJourneyModel.set('hearingFacilities', 'additionalSecurity', 'Yes');
    hearingJourneyModel.set('hearingFacilities', 'additionalFacilities', ['Custody Cell', 'Laptop', 'Projector', 'Witness Room']);
    hearingJourneyModel.set('hearingStage', 'stage', 'Allocation');

    // hearing attendence
    hearingJourneyModel.set('hearingAttendence', 'paperHearing', 'No');
    hearingJourneyModel.set('hearingAttendence', 'hearingMethod', ['Video', 'Telephone']);
    hearingJourneyModel.set('hearingAttendence', 'attendHearingHow', ['Video', 'Telephone']);
    hearingJourneyModel.set('hearingAttendence', 'numberOfPeopleAttendingHearing', '2');

    //hearingVenue
    hearingJourneyModel.set('hearingVenue', 'name', 'southa');

    // hearingDetails
    hearingJourneyModel.set('hearingDetails', 'hearingInWelsh', 'No');
    hearingJourneyModel.set('hearingDetails', 'specificJudge', 'No');
    hearingJourneyModel.set('hearingDetails', 'judgeType', ['Deputy High Court Judge', 'Deputy Circuit Judge']);
  }
});
