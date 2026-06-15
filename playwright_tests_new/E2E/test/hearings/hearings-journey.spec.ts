import { expect, test } from '../../fixtures';
import { ensureSession } from '../../../common/sessionCapture';
import { AdditionalFacility, TypeOfJudges } from '../../utils/hearing-model';
import { openHomeWithCapturedSession } from '../searchCase/searchCase.setup';
import { caseDetailsUrl, continueHearingsFlow } from '../../../integration/helpers/hearingJourneySetup.helper.ts';
import {
  createHearingJourneyModel,
  HEARING_REQUEST_EXPECTED_STATUS,
  PRL_HEARINGS_USER_IDENTIFIER,
  prlHearingHappyPathScenario,
} from '../../testData/hearings/hearingJourneyScenarios';

test.describe('PRL User Hearings Journey E2E', { tag: ['@e2e', '@e2e-hearings'] }, () => {
  test.beforeAll(async () => {
    await ensureSession(PRL_HEARINGS_USER_IDENTIFIER);
  });

  test.beforeEach(async ({ page }) => {
    await openHomeWithCapturedSession(page, PRL_HEARINGS_USER_IDENTIFIER);
  });

  test('Submit a new Hearing - Happy Path journey ', async ({
    caseDetailsPage,
    hearingsTabPage,
    hearingsJourneyPage,
    hearingsCYAPage,
    page,
  }) => {
    const scenario = prlHearingHappyPathScenario;
    const hearingJourneyModel = createHearingJourneyModel();

    await test.step('Navigate to Hearings Page and click on the hearings tab', async () => {
      await page.goto(caseDetailsUrl(scenario.route.jurisdictionId, scenario.route.caseTypeId, scenario.route.caseReference), {
        waitUntil: 'domcontentloaded',
      });
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

      await hearingsJourneyPage.additionalSecurityAndFacilities(hearingJourneyModel);
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

    await test.step('Hearing Timings etc', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-timing$/);
      await hearingsJourneyPage.setHearingDurationAndPriority(hearingJourneyModel);
      await continueHearingsFlow(page);
    });

    await test.step('Hearing Linked etc', async () => {
      const hearingLinkInfo = " If you choose 'No', you will be unable to link this hearing to any others without editing it. ";
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-link$/);
      await expect(page.getByRole('heading', { name: /Will this hearing need to be linked to other hearings?/i })).toBeVisible();
      const linkInfo = await hearingsJourneyPage.hearingLinkInformation.allTextContents();
      expect(linkInfo).toContain(hearingLinkInfo);

      await continueHearingsFlow(page);
    });

    await test.step('Additional Instructions', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-additional-instructions$/);
      await expect(page.getByRole('heading', { name: /Enter any additional instructions for the hearing/i })).toBeVisible();
      await hearingsJourneyPage.additionalInstructions.fill(scenario.additionalInstructions);
      await continueHearingsFlow(page);
    });

    await test.step('CYA page Hearings ', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-create-edit-summary$/);
      await expect(hearingsJourneyPage.submitRequestButton).toBeVisible();

      const additionalFacilitiesValue = hearingJourneyModel.get('hearingFacilities', 'additionalFacilities');

      await hearingsCYAPage.verifyHearingSummarySection('Additional facilities', [
        { key: 'Will additional security be required?', value: 'Yes' },
        { key: 'Select any additional facilities required', value: additionalFacilitiesValue as AdditionalFacility[] },
      ]);

      await hearingsCYAPage.verifyHearingSummarySection('Stage', [
        { key: 'What stage is this hearing at?', value: 'Allocation' },
      ]);

      await hearingsCYAPage.verifyParticipantAttendanceSection(hearingJourneyModel);

      await hearingsCYAPage.verifyHearingVenueSection(hearingJourneyModel);

      const allJudges = hearingJourneyModel.get('hearingDetails', 'judgeType');

      await hearingsCYAPage.verifyHearingSummarySection('Judge details', [
        { key: 'Do you want a specific judge?', value: 'No' },
        { key: 'Select all judge types that apply', value: allJudges as TypeOfJudges[] },
      ]);

      await hearingsCYAPage.verifyHearingSummarySection('Length, date and priority level of hearing', [
        { key: 'Length of hearing', value: '1 Hour 30 Minutes' },
        { key: 'Does the hearing need to take place on a specific date?', value: 'No' },
        { key: 'What is the priority of this hearing?', value: 'Standard' },
      ]);

      await hearingsCYAPage.verifyHearingSummarySection('Linked hearings', [
        { key: 'Will this hearing need to be linked to other hearings?', value: 'No' },
      ]);

      await hearingsCYAPage.verifyHearingSummarySection('Additional instructions', [
        { key: 'Enter any additional instructions for the hearing', value: scenario.additionalInstructions },
      ]);
    });

    await test.step('Submit Hearing Request And Do Checks on backend calls ', async () => {
      let submitHearingResponse: any;
      let apiResponseHearingId: string;

      try {
        const submitResponsePromise = page.waitForResponse(
          (response) => response.url().includes('/api/hearings/submitHearingRequest') && response.request().method() === 'POST'
        );
        await hearingsJourneyPage.submitRequestButton.click();
        submitHearingResponse = await submitResponsePromise;

        expect(submitHearingResponse.status(), 'submitHearingRequest should return 201').toBe(201);

        const submitBody = await submitHearingResponse.json();
        apiResponseHearingId = submitBody.hearingRequestID;
      } catch (error) {
        if (submitHearingResponse) {
          const status = submitHearingResponse.status();
          let body;
          try {
            body = await submitHearingResponse.text();
          } catch {
            body = `<unable to read response body>`;
          }
          console.error(`Failure seen on Hearings Submit CYA Page. Status: ${status}, Body: ${body}`);
        } else {
          console.error('Failure seen on Hearings Submit CYA Page (no response captured):', error);
        }
        throw error;
      }

      await hearingsJourneyPage.checkHearingConfirmationPage();

      await hearingsJourneyPage.clickLinkToViewHearings();

      await expect(page).toHaveURL(/\/cases\/case-details\/.*#Hearings$/);
      await expect(hearingsTabPage.currentAndUpcomingHeading('Current and upcoming')).toBeVisible();

      const hearingId = await hearingsJourneyPage.getMostRecentHearingId();
      // check  hearingId in API response matches the hearingId on UI
      await expect(hearingId).toEqual(String(apiResponseHearingId));
      await expect(hearingsTabPage.pastOrCancelledHeading('Past or cancelled')).toBeVisible();

      const hearingRow = hearingsTabPage.hearingRow(hearingId, 'view-or-edit');

      await expect(hearingRow).toContainText(HEARING_REQUEST_EXPECTED_STATUS);
      await expect(hearingsTabPage.viewOrEditButton(hearingId)).toBeVisible();
    });
  });
});
