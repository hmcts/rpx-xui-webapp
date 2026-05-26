import { expect, test } from '../../fixtures';
import { ensureSession } from '../../../common/sessionCapture';
import { AdditionalFacility, HearingJourneyModel, TypeOfJudges } from '../../utils/hearing-model';
import { openHomeWithCapturedSession } from '../searchCase/searchCase.setup';
import { caseDetailsUrl, continueHearingsFlow } from '../../../integration/helpers/hearingJourneySetup.helper.ts';
continueHearingsFlow;

const userIdentfier = 'PRL_HEARINGS';
const hearingJourneyModel = new HearingJourneyModel();
let hearingId: string;

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

  test('Submit a new Hearing - Happy Path journey ', async ({
    caseDetailsPage,
    hearingsTabPage,
    hearingsJourneyPage,
    hearingsCYAPage,
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

    // hearing timings
    await test.step('Hearing Timings etc', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-timing$/);
      await hearingsJourneyPage.setHearingDurationAndPriority(hearingJourneyModel);
      await continueHearingsFlow(page);
    });

    // linked hearings
    await test.step('Hearing Linked etc', async () => {
      const hearingLinkInfo = " If you choose 'No', you will be unable to link this hearing to any others without editing it. ";
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-link$/);
      await expect(page.getByRole('heading', { name: /Will this hearing need to be linked to other hearings?/i })).toBeVisible();
      const linkInfo = await hearingsJourneyPage.hearingLinkInformation.allTextContents();
      expect(linkInfo).toContain(hearingLinkInfo);

      await continueHearingsFlow(page);
    });

    // additional hearings
    await test.step('Additional Instructions', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-additional-instructions$/);
      await expect(page.getByRole('heading', { name: /Enter any additional instructions for the hearing/i })).toBeVisible();
      await hearingsJourneyPage.additionalInstructions.fill('Additional instructions for E2E Playwright test');
      await continueHearingsFlow(page);
    });

    // CYA Page
    await test.step('CYA page Hearings ', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-create-edit-summary$/);
      await expect(hearingsJourneyPage.submitRequestButton).toBeVisible();

      const additionalFacilitiesValue = hearingJourneyModel.get('hearingFacilities', 'additionalFacilities');

      await hearingsCYAPage.verifyHearingSummarySection(page, 'Additional facilities', [
        { key: 'Will additional security be required?', value: 'Yes' },
        { key: 'Select any additional facilities required', value: additionalFacilitiesValue as AdditionalFacility[] }, //pad like 'xxx,yyy'
      ]);

      await hearingsCYAPage.verifyHearingSummarySection(page, 'Stage', [
        { key: 'What stage is this hearing at?', value: 'Allocation' },
      ]);

      // await hearingsCYAPage.verifyHearingSummarySection(page, 'Participant attendance', [
      //   { key: 'Will this be a paper hearing?', value: 'No' },
      //   { key: 'What will be the methods of attendance for this hearing?', value: ['Video'] },
      //   { key: 'How will each participant attend the hearing', value: ['Video', 'Telephone'] },
      //   { key: 'How will each participant attend the hearing?', value: ['Video', 'Telephone'] },
      //   { key: 'How many people will attend the hearing in person?', value: '2' },
      // ]);

      // await hearingsCYAPage.verifyHearingSummarySection(page, 'Hearing venue', [
      //   {
      //     key: 'What are the hearing venue details?',
      //     value: 'Newport (South Wales) County Court And Family CourtSwansea Civil And Family Justice Centre',
      //   },
      // ]);

      const allJudges = hearingJourneyModel.get('hearingDetails', 'judgeType');

      await hearingsCYAPage.verifyHearingSummarySection(page, 'Judge details', [
        { key: 'Do you want a specific judge?', value: 'No' },
        { key: 'Select all judge types that apply', value: allJudges as TypeOfJudges[] },
      ]);

      await hearingsCYAPage.verifyHearingSummarySection(page, 'Length, date and priority level of hearing', [
        { key: 'Length of hearing', value: '1 Hour 30 Minutes' },
        { key: 'Does the hearing need to take place on a specific date?', value: 'No' },
        { key: 'What is the priority of this hearing?', value: 'Standard' },
      ]);

      await hearingsCYAPage.verifyHearingSummarySection(page, 'Linked hearings', [
        { key: 'Will this hearing need to be linked to other hearings?', value: 'No' },
      ]);

      await hearingsCYAPage.verifyHearingSummarySection(page, 'Additional instructions', [
        { key: 'Enter any additional instructions for the hearing', value: 'Additional instructions for E2E Playwright test' },
      ]);

      console.log('~~~~~~~~~~ CYA page Hearings ... assertions done  ');
    });

    // Submit Hearings / Check Confirmation / Return to Hearing Summary page.
    await test.step('Submit Hearing Request And Do Checks on backend calls ', async () => {
      try {
        const submitResponsePromise = page.waitForResponse(
          (response) => response.url().includes('/api/hearings/submitHearingRequest') && response.request().method() === 'POST'
        );
        await hearingsJourneyPage.submitRequestButton.click();
        const submitResponse = await submitResponsePromise;
        expect(submitResponse.status(), 'submitHearingRequest should return 201').toBe(201);
      } catch (error) {
        console.error('Failure seen on  Hearings Submit CYA Page :', error);
      }
      // if all good then reached here on confirmation page./;
      await hearingsJourneyPage.checkHearingConfirmationPage(page);

      await hearingsJourneyPage.clickLinkToViewHearings(page);

      await expect(page).toHaveURL(/\/cases\/case-details\/.*#Hearings$/);
      await expect(hearingsTabPage.currentAndUpcomingHeading('Current and upcoming')).toBeVisible();
      hearingId = await hearingsJourneyPage.getMostRecentHearingId();
      await expect(hearingsTabPage.pastOrCancelledHeading('Past or cancelled')).toBeVisible();
    });

    console.log('~~~~~~~~~~  Created Hearing with ID  === ' + hearingId);
  });

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
    hearingJourneyModel.set('hearingVenue', 'name', 'southampton');

    // Welsh
    hearingJourneyModel.set('hearingDetails', 'hearingInWelsh', 'No');

    // Judge details
    hearingJourneyModel.set('hearingDetails', 'specificJudge', 'No');
    hearingJourneyModel.set('hearingDetails', 'judgeType', ['Deputy High Court Judge', 'Deputy Circuit Judge']);

    // hearingDuration
    hearingJourneyModel.set('hearingDuration', 'days', 0);
    hearingJourneyModel.set('hearingDuration', 'hours', 1);
    hearingJourneyModel.set('hearingDuration', 'minutes', 30);

    // linked Hearings
    hearingJourneyModel.set('hearingDetails', 'linkedHearing', 'No');
  }
});
