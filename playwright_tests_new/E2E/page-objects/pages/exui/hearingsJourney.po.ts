import { expect, Locator, Page } from '@playwright/test';
import {
  AdditionalFacility,
  HearingJourneyModel,
  HearingMethod,
  howWillParticipantAttend,
  LengthOfHearing,
  TypeOfJudges,
} from '../../../utils/hearing-model.ts';

type HearingAction = 'view-details' | 'view-or-edit' | 'cancel' | 'add-or-edit';

export class HearingsJourneyPage {
  constructor(private readonly page: Page) {}

  readonly container = this.page.locator('exui-case-hearings-ce');
  readonly additionalSecurityYes = this.page.locator('#addition-security-confirmation #additionalSecurityYes');
  readonly additionalSecurityNo = this.page.locator('#addition-security-confirmation #additionalSecurityNo');
  readonly facilitiesCheckbox = (facility: string) =>
    this.page.locator(`#facilitiesList .govuk-checkboxes__input[value="${facility}"]`);

  readonly locationAutocomplete = this.page.locator('.mat-autocomplete-trigger');

  readonly hearingStageRadioButton = this.page.locator('#hearing-stage .govuk-radios__item');
  readonly paperHearingYes = this.page.locator('#addition-security-confirmation  .govuk-radios__item #paperHearingYes');
  readonly paperHearingNo = this.page.locator('#addition-security-confirmation  .govuk-radios__item #paperHearingNo');

  // #methodsOfAttendence
  readonly hearingInPerson = this.page.locator('#hearingLevelChannelList #INTER');
  readonly hearingOnTelephone = this.page.locator('#hearingLevelChannelList #TEL');
  readonly hearingViaVideo = this.page.locator('#hearingLevelChannelList #VID');

  // how will each participatn attend the wedding
  readonly firstParty = this.page.locator('#partyChannel0');
  readonly secondParty = this.page.locator('#partyChannel1');

  // How Many attending
  // attendance-number
  readonly numberAttendingHearing = this.page.locator('#attendance-number');
  readonly hearingVenue = this.page.locator('#searchVenueLocation');

  readonly hearingInWelshNo = this.page.locator('#welsh_hearing_no');
  readonly hearingInWelshYes = this.page.locator('#welsh_hearing_yes');

  #noSpecificJudge;
  readonly noSpecificJudgeRadio = this.page.locator('#noSpecificJudge');
  readonly specificJudgeRadio = this.page.locator('#specificJudgeName');

  readonly hearingPriority = this.page.locator('#hearingPriority');

  readonly textField0FallbackInput = this.page.locator('input[id*="no"]').first();

  readonly additionalInstructions = this.page.locator('#additionalInstructionsTextarea');

  readonly selectAllJudgesThatApply = this.page.locator('.govuk-fieldset .govuk-fieldset__legend').nth(1);

  // lengthOfHearing
  readonly durationDays = this.page.locator('#durationdays');
  readonly durationHours = this.page.locator('#durationhours');
  readonly durationMinutes = this.page.locator('#durationmins');

  readonly dateRangeDay = this.page.locator('#earliestHearingDate-day');
  readonly dateRangeMonth = this.page.locator('#earliestHearingDate-month');
  readonly dateRangeYear = this.page.locator('#earliestHearingDate-year');

  readonly latestHearingDay = this.page.locator('#latestHearingDate-day');
  readonly latestHearingMonth = this.page.locator('#latestHearingDate-month');
  readonly latestHearingYear = this.page.locator('#latestHearingDate-year');

  readonly specificDateNo: Locator = this.page.locator('#noSpecificDate');
  readonly specificDateYes: Locator = this.page.locator('#hearingSingleDate');
  readonly specificDateRange: Locator = this.page.locator('#hearingDateRange');

  readonly selectedHearingPriority: Locator = this.page.locator('#hearing-priority .govuk-radios');
  readonly hearingLinkInformation = this.page.locator('.govuk-inset-text').first();
  readonly submitRequestButton = this.page.getByRole('button', { name: 'Submit request' });

  readonly hearingPriorityStandard: Locator = this.page.locator('#hearing-priority .govuk-radios #Standard');
  readonly hearingPriorityUrgent: Locator = this.page.locator('#hearing-priority .govuk-radios #Urgent');

  readonly linkedToOtherHearings = this.page.locator('#linkedToOtherHearings');

  readonly overlayLocationPanel = this.page
    .locator('.cdk-overlay-container .cdk-overlay-pane')
    // .filter({ has: this.page.getByRole('listbox') });
    .filter({ has: this.page.locator('.mat-autocomplete-panel[role="listbox"]') });

  readonly addLocationsButton = this.page.locator('.search-location').getByRole('link', { name: ' Add location ' });

  //const submitButton =
  readonly submitButton = this.page.locator('button.govuk-button', { hasText: 'Submit request' });

  // hearingsTable
  readonly hearingsTable = this.page.locator('exui-case-hearings-ce exui-case-hearings-list table.govuk-table');
  readonly hearingsTableHeader = this.page.locator('th.govuk-table__header');

  // hearingConfirmationPAge
  readonly hearingPanel = this.page.locator('.govuk-panel.govuk-panel--confirmation');

  // hearing hearingPanelTitle & hearingPanelBody
  readonly hearingPanelTitle = this.hearingPanel.locator('.govuk-panel__title');
  readonly hearingPanelBody = this.hearingPanel.locator('.govuk-panel__body');

  async additionalSecurityAndFacilities(model: HearingJourneyModel, page: Page): Promise<void> {
    const value = model.get('hearingFacilities', 'additionalSecurity');

    await (value === 'Yes' ? this.additionalSecurityYes : this.additionalSecurityNo).click();

    const getHearingFacilities = model.get('hearingFacilities', 'additionalSecurity');
    console.log('~~~~~~~~~~~GET VALUE for hearingFacilities ===', getHearingFacilities);

    // additional facilities
    const facilities: AdditionalFacility[] = model.get('hearingFacilities', 'additionalFacilities') ?? [];
    expect(facilities.length).toBeGreaterThan(0);

    for (const facility of facilities) {
      await this.facilitiesCheckbox(facility).check();
    }
    //const getAdditionalFacilities = model.get('hearingFacilities', 'additionalFacilities');
  }

  async setHearingStage(model: HearingJourneyModel): Promise<void> {
    const hearingStage = model.get('hearingStage', 'stage');
    await this.hearingStageRadioButton.first().getByLabel(`${hearingStage}`).check();
  }

  async setParticipantAttendence(model: HearingJourneyModel): Promise<void> {
    const paperHearingYesNo = model.get('hearingAttendence', 'paperHearing');
    const hearingMethod = model.get('hearingAttendence', 'hearingMethod') ?? [];
    const attendHearingHow = model.get('hearingAttendence', 'attendHearingHow');
    const noOfPeopleAttending = model.get('hearingAttendence', 'numberOfPeopleAttendingHearing');

    // Paper Hearing ?
    await (paperHearingYesNo === 'Yes' ? this.paperHearingYes : this.paperHearingNo).click();

    // hearingMethod
    const hearingMethodAndLocatorMap: Record<HearingMethod, Locator> = {
      'In Person': this.hearingInPerson,
      Telephone: this.hearingOnTelephone,
      Video: this.hearingViaVideo,
    };

    for (const method of hearingMethod ?? []) {
      const locator = hearingMethodAndLocatorMap[method];
      await locator.click({ force: true });
    }

    // How will Participant Attend ?
    const participantAttendingLocatorMap: Record<howWillParticipantAttend, Locator> = {
      'In Person': this.hearingInPerson,
      Telephone: this.hearingOnTelephone,
      Video: this.hearingViaVideo,
      'Not in Attendence': this.hearingInPerson,
    };
    const party1Select = this.firstParty;
    party1Select.selectOption('Video');

    const party2Select = this.secondParty;
    party2Select.selectOption('Telephone');

    // how many will Attend.
    this.numberAttendingHearing.fill('2');
  }

  async setHearingVenue(model: HearingJourneyModel): Promise<void> {
    const hearingVenue = model.get('hearingVenue', 'name') as string;

    //await this.removeAllSelectedLocations();
    //await this.removeLocationLink('Swansea Civil And Family Justice Centre').click();
    await this.hearingVenue.pressSequentially(hearingVenue, { delay: 1000 });
    //await this.page.waitForTimeout(2000);
    //await this.locationAutocomplete.waitFor({ state: 'visible' });
    await this.locationAutocomplete.waitFor({ state: 'visible' });
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');

    await this.addLocationsButton.click();
  }

  async isWelshHearing(model: HearingJourneyModel): Promise<void> {
    // WelshHearing
    const welshHearing = model.get('hearingDetails', 'hearingInWelsh') as string;
    await this.hearingInWelshYes.waitFor({ state: 'visible' });
    //    await this.hearingInWelshYes.click();
    await (welshHearing === 'Yes' ? this.hearingInWelshYes : this.hearingInWelshNo).click();
  }

  async setJudgeOptions(model: HearingJourneyModel): Promise<void> {
    // Judge options
    await this.noSpecificJudgeRadio.waitFor({ state: 'visible' });
    await this.specificJudgeRadio.waitFor({ state: 'visible' });

    await this.noSpecificJudgeRadio.click();
    await expect(this.selectAllJudgesThatApply).toHaveText('Select all judge types that apply');

    const judgeTypes = model.get('hearingDetails', 'judgeType') as TypeOfJudges[];
    await this.selectJudgeTypes(judgeTypes);
  }

  async setHearingDurationAndPriority(model: HearingJourneyModel): Promise<void> {
    const specificDate = model.get('hearingDetails', 'hearingSpecificDate') as string;
    const hearingPriority = model.get('hearingDetails', 'hearingPriority') as string;

    const days = model.get('hearingDuration', 'days') as number;
    const hours = model.get('hearingDuration', 'hours') as number;
    const minutes = model.get('hearingDuration', 'minutes') as number;

    if (days != null) {
      await this.durationDays.fill(days.toString());
    }
    if (hours != null) {
      await this.durationHours.fill(hours.toString());
    }
    if (minutes != null) {
      await this.durationMinutes.fill(minutes.toString());
    }

    await this.specificDateNo.waitFor({ state: 'visible' });
    await this.specificDateYes.waitFor({ state: 'visible' });
    await this.specificDateRange.waitFor({ state: 'visible' });

    switch (specificDate) {
      case 'No':
        await this.specificDateNo.click();
        break;
      case 'Yes':
        await this.specificDateYes.click();
        break;
      default:
        await this.specificDateRange.click();
        break;
    }
    this.setHearingPriority(hearingPriority);
  }

  async linkedHearingsCheck(model: HearingJourneyModel): Promise<void> {}

  // helper methods
  async selectJudgeTypes(judgeTypes: TypeOfJudges[]): Promise<void> {
    const fieldset = this.page.locator('#judgeTypes .govuk-fieldset');
    for (const judgeType of judgeTypes) {
      await fieldset.getByLabel(judgeType).check();
    }
  }

  async setHearingPriority(priority: string): Promise<void> {
    priority === 'Standard' ? await this.hearingPriorityStandard.check() : await this.hearingPriorityStandard.check();
  }

  removeLocationLink(locationName: string): Locator {
    return this.page.locator('.hmcts-filter-tags a.hmcts-filter__tag').filter({ hasText: locationName });
  }

  async clickLinkToViewHearings(page: Page): Promise<void> {
    const hearingsTabLink = this.page.getByRole('link', {
      name: 'view the status of this hearing in the hearings tab',
    });

    await expect(hearingsTabLink, 'Hearings tab link should be visible').toBeVisible();
    await hearingsTabLink.click();
  }

  async checkHearingConfirmationPage(page: Page): Promise<void> {
    const hearingPanel = this.hearingPanelBody;
    await expect(hearingPanel, 'Hearing Confirmation Panel should be visible').toBeVisible();
    // Panel title
    await expect(this.hearingPanelTitle, 'Hearing Confirmation').toHaveText('Hearing request submitted');
    // Panel body
    await expect(this.hearingPanelBody, 'Hearing Processing Message').toHaveText('Your hearing request will now be processed');
  }

  /**
   * Returns the Hearing Id of the most recently created hearing from the "Current and upcoming" section.
   * The table is sorted with the latest hearing in the first data row, so we read the Hearing Id cell (2nd column)
   * of the first row.
   */

  async getMostRecentHearingId(): Promise<string> {
    // Scope to the "Current and upcoming" table only — there's a second
    const currentTable: Locator = this.hearingsTable.filter({
      has: this.hearingsTableHeader.filter({ hasText: 'Current and upcoming' }),
    });

    await expect(currentTable, '"Current and upcoming" hearings table should be visible').toBeVisible();

    const firstDataRow = currentTable.locator('tbody tr.govuk-table__row').first();
    await expect(firstDataRow, 'At least one hearing row should be present').toBeVisible();

    // Column layout: [Stage, Hearing Id, Hearing date, Status, Actions]
    // Hearing Id is the 2nd cell (index 1).
    const hearingIdCell = firstDataRow.locator('td').nth(1);
    const hearingId = (await hearingIdCell.textContent())?.trim() ?? '';

    if (!/^\d+$/.test(hearingId)) {
      throw new Error(`Expected a numeric Hearing Id, got: "${hearingId}"`);
    }

    return hearingId;
  }
}
