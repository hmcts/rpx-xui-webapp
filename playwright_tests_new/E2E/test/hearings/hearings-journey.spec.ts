import { expect, test } from '../../fixtures';
import { ensureSession } from '../../../common/sessionCapture';
import { AdditionalFacility, TypeOfJudges } from '../../utils/hearing-model';
import { openHomeWithCapturedSession } from '../searchCase/searchCase.setup';
import { continueHearingsFlow } from '../../../integration/helpers/hearingJourneySetup.helper.ts';
import { resolveHearingManagerUserIdentifier } from '../../../integration/helpers/hearingManagerUserPool.helper';
import { openEligibleHearingsCase } from '../../utils/test-setup/hearingsCaseResolver';
import {
  createHearingJourneyModel,
  HEARING_REQUEST_EXPECTED_STATUS,
  HEARINGS_USER_IDENTIFIER,
  prlHearingHappyPathScenario,
} from '../../testData/hearings/hearingJourneyScenarios';

test.describe('PRL User Hearings Journey E2E', { tag: ['@e2e', '@e2e-hearings'] }, () => {
  const hearingsUserIdentifier = resolveHearingManagerUserIdentifier(HEARINGS_USER_IDENTIFIER);

  test.beforeAll(async () => {
    await ensureSession(hearingsUserIdentifier);
  });

  test.beforeEach(async ({ page }) => {
    await openHomeWithCapturedSession(page, hearingsUserIdentifier);
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
    let selectedVenue = '';

    await test.step('Navigate to Hearings Page and click on the hearings tab', async () => {
      await openEligibleHearingsCase(page, scenario.route);
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

      await hearingsJourneyPage.setParticipantAttendance(hearingJourneyModel);
      await continueHearingsFlow(page);
    });

    await test.step('Complete Hearing Venue Section', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-venue$/);
      await expect(page.getByRole('heading', { name: /What are the hearing venue details?/i })).toBeVisible();

      selectedVenue = await hearingsJourneyPage.setHearingVenue(hearingJourneyModel);
      await expect(hearingsJourneyPage.removeLocationLink(selectedVenue)).toBeVisible();
      await continueHearingsFlow(page);
    });

    await test.step('Specific Judge Selection', async () => {
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-judge$/);
      await expect(page.getByRole('heading', { name: /Do you want a specific judge?/i })).toBeVisible();

      await hearingsJourneyPage.setJudgeOptions(hearingJourneyModel);
      await expect(hearingsJourneyPage.selectAllJudgesThatApply).toHaveText('Select all judge types that apply');
      await continueHearingsFlow(page);
    });

    await test.step('Complete Welsh Hearing Section when present', async () => {
      if (!/\/hearings\/request\/hearing-welsh$/.test(page.url())) {
        await expect(page).toHaveURL(/\/hearings\/request\/hearing-timing$/);
        return;
      }

      await expect(page.getByRole('heading', { name: /Does this hearing need to be in Welsh?/i })).toBeVisible();
      await hearingsJourneyPage.isWelshHearing(hearingJourneyModel);
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

      const additionalFacilitiesValue = hearingJourneyModel.get(
        'hearingFacilities',
        'additionalFacilities'
      ) as AdditionalFacility[];

      await expect(hearingsCYAPage.sectionRows('Additional facilities')).toHaveCount(2);
      await expect(hearingsCYAPage.rowValue('Additional facilities', 'Will additional security be required?')).toHaveText('Yes');
      await expect(hearingsCYAPage.rowListItems('Additional facilities', 'Select any additional facilities required')).toHaveText(
        additionalFacilitiesValue
      );

      await expect(hearingsCYAPage.sectionRows('Stage')).toHaveCount(1);
      await expect(hearingsCYAPage.rowValue('Stage', 'What stage is this hearing at?')).toHaveText('Allocation');

      const participantHearingMethod = hearingJourneyModel.get('hearingAttendance', 'hearingMethod');
      const participantAttendHearingHow = hearingJourneyModel.get('hearingAttendance', 'attendHearingHow');

      await expect(hearingsCYAPage.sectionRows('Participant attendance')).toHaveCount(4);
      await expect(hearingsCYAPage.rowValue('Participant attendance', 'Will this be a paper hearing?')).toHaveText('No');
      const participantHearingMethodText = await hearingsCYAPage
        .rowListItems('Participant attendance', 'What will be the methods of attendance for this hearing?')
        .allTextContents();
      expect(participantHearingMethodText.sort()).toEqual([...(participantHearingMethod ?? [])].sort());
      const participantAttendanceText = await hearingsCYAPage
        .rowListItems('Participant attendance', 'How will each participant attend the hearing?')
        .allTextContents();
      for (const attendanceMethod of participantAttendHearingHow ?? []) {
        expect(participantAttendanceText.some((text) => text.includes(attendanceMethod))).toBe(true);
      }
      await expect(
        hearingsCYAPage.rowValue('Participant attendance', 'How many people will attend the hearing in person?')
      ).toHaveText('2');

      await expect(hearingsCYAPage.sectionRows('Hearing Venue')).toHaveCount(1);
      await expect(hearingsCYAPage.rowValue('Hearing Venue', 'What are the hearing venue details?')).toContainText(selectedVenue);

      const allJudges = hearingJourneyModel.get('hearingDetails', 'judgeType');

      await expect(hearingsCYAPage.sectionRows('Judge details')).toHaveCount(2);
      await expect(hearingsCYAPage.rowValue('Judge details', 'Do you want a specific judge?')).toHaveText('No');
      const judgeTypesText = await hearingsCYAPage.rowValue('Judge details', 'Select all judge types that apply').textContent();
      for (const judgeType of allJudges as TypeOfJudges[]) {
        expect(judgeTypesText).toContain(judgeType);
      }

      await expect(hearingsCYAPage.sectionRows('Length, date and priority level of hearing')).toHaveCount(3);
      await expect(hearingsCYAPage.rowValue('Length, date and priority level of hearing', 'Length of hearing')).toHaveText(
        '1 Hour 30 Minutes'
      );
      await expect(
        hearingsCYAPage.rowValue(
          'Length, date and priority level of hearing',
          'Does the hearing need to take place on a specific date?'
        )
      ).toHaveText('No');
      await expect(
        hearingsCYAPage.rowValue('Length, date and priority level of hearing', 'What is the priority of this hearing?')
      ).toHaveText('Standard');

      await expect(hearingsCYAPage.sectionRows('Linked hearings')).toHaveCount(1);
      await expect(
        hearingsCYAPage.rowValue('Linked hearings', 'Will this hearing need to be linked to other hearings?')
      ).toHaveText('No');

      await expect(hearingsCYAPage.sectionRows('Additional instructions')).toHaveCount(1);
      await expect(
        hearingsCYAPage.rowValue('Additional instructions', 'Enter any additional instructions for the hearing')
      ).toHaveText(scenario.additionalInstructions);
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
          console.error(`Failure seen on Hearings Submit CYA Page. Status: ${status}. Check sanitized service logs.`);
        } else {
          console.error(
            `Failure seen on Hearings Submit CYA Page (no response captured): ${error instanceof Error ? error.message : String(error)}`
          );
        }
        throw error;
      }

      await expect(hearingsJourneyPage.hearingPanelBody, 'Hearing Confirmation Panel should be visible').toBeVisible();
      await expect(hearingsJourneyPage.hearingPanelTitle, 'Hearing Confirmation').toHaveText('Hearing request submitted');
      await expect(hearingsJourneyPage.hearingPanelBody, 'Hearing Processing Message').toHaveText(
        'Your hearing request will now be processed'
      );

      await expect(hearingsJourneyPage.hearingsTabStatusLink(), 'Hearings tab link should be visible').toBeVisible();
      await hearingsJourneyPage.clickLinkToViewHearings();

      await expect(page).toHaveURL(/\/cases\/case-details\/.*#Hearings$/);
      await expect(hearingsTabPage.currentAndUpcomingHeading('Current and upcoming')).toBeVisible();

      const hearingId = String(apiResponseHearingId);
      await expect(hearingsTabPage.pastOrCancelledHeading('Past or cancelled')).toBeVisible();

      const hearingRow = hearingsTabPage.hearingRow(hearingId, 'view-or-edit');

      await expect(hearingRow).toContainText(HEARING_REQUEST_EXPECTED_STATUS);
      await expect(hearingsTabPage.viewOrEditButton(hearingId)).toBeVisible();
    });
  });
});
