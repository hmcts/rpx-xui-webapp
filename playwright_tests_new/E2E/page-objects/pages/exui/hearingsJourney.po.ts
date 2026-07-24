import { Locator, Page } from '@playwright/test';
import { AdditionalFacility, HearingJourneyModel, HearingMethod, TypeOfJudges } from '../../../utils/hearing-model.ts';

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

  // #methodsOfAttendance
  readonly hearingInPerson = this.page.locator('#hearingLevelChannelList #INTER');
  readonly hearingOnTelephone = this.page.locator('#hearingLevelChannelList #TEL');
  readonly hearingViaVideo = this.page.locator('#hearingLevelChannelList #VID');

  // How will each Participant attend the wedding?
  readonly firstParty = this.page.locator('#partyChannel0');
  readonly secondParty = this.page.locator('#partyChannel1');
  readonly participantAttendanceSelects = this.page.locator('select[id^="partyChannel"]');

  // How Many attending
  // attendance-number
  readonly numberAttendingHearing = this.page.locator('#attendance-number');
  readonly hearingVenue = this.page.locator('#searchVenueLocation');

  readonly hearingInWelshNo = this.page.locator('#welsh_hearing_no');
  readonly hearingInWelshYes = this.page.locator('#welsh_hearing_yes');

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

  readonly specificDateNo: Locator = this.page.locator('#noSpecificDate');
  readonly specificDateYes: Locator = this.page.locator('#hearingSingleDate');
  readonly specificDateRange: Locator = this.page.locator('#hearingDateRange');

  readonly hearingLinkInformation = this.page.locator('.govuk-inset-text').first();
  readonly submitRequestButton = this.page.getByRole('button', { name: 'Submit request' });

  readonly hearingPriorityStandard: Locator = this.page.locator('#hearing-priority .govuk-radios #Standard');
  readonly hearingPriorityUrgent: Locator = this.page.locator('#hearing-priority .govuk-radios #Urgent');

  readonly linkedToOtherHearings = this.page.locator('#linkedToOtherHearings');

  readonly overlayLocationPanel = this.page
    .locator('.cdk-overlay-container .cdk-overlay-pane')
    .filter({ has: this.page.locator('.mat-autocomplete-panel[role="listbox"]') });

  readonly addLocationsButton = this.page.locator('.search-location').getByRole('link', { name: ' Add location ' });
  readonly selectedVenueTags = this.page.getByRole('link', { name: /^Click to remove:/ });

  // hearingConfirmationPAge
  readonly hearingPanel = this.page.locator('.govuk-panel.govuk-panel--confirmation');

  // hearing hearingPanelTitle & hearingPanelBody
  readonly hearingPanelTitle = this.hearingPanel.locator('.govuk-panel__title');
  readonly hearingPanelBody = this.hearingPanel.locator('.govuk-panel__body');

  async additionalSecurityAndFacilities(model: HearingJourneyModel): Promise<void> {
    const value = model.get('hearingFacilities', 'additionalSecurity');

    await (value === 'Yes' ? this.additionalSecurityYes : this.additionalSecurityNo).click();

    const facilities: AdditionalFacility[] = model.get('hearingFacilities', 'additionalFacilities') ?? [];
    if (facilities.length === 0) {
      throw new Error('Expected at least one additional facility to select.');
    }

    for (const facility of facilities) {
      await this.facilitiesCheckbox(facility).check();
    }
  }

  async setHearingStage(model: HearingJourneyModel): Promise<void> {
    const hearingStage = model.get('hearingStage', 'stage');
    await this.hearingStageRadioButton.first().getByLabel(`${hearingStage}`).check();
  }

  async setParticipantAttendance(model: HearingJourneyModel): Promise<void> {
    const paperHearingYesNo = model.get('hearingAttendance', 'paperHearing');
    const hearingMethod = model.get('hearingAttendance', 'hearingMethod') ?? [];

    await (paperHearingYesNo === 'Yes' ? this.paperHearingYes : this.paperHearingNo).click();

    const hearingMethodAndLocatorMap: Record<HearingMethod, Locator> = {
      'In Person': this.hearingInPerson,
      Telephone: this.hearingOnTelephone,
      Video: this.hearingViaVideo,
    };

    for (const method of hearingMethod ?? []) {
      const locator = hearingMethodAndLocatorMap[method];
      await locator.waitFor({ state: 'visible' });
      await locator.check();
    }

    const howIsHearingAttended = model.get('hearingAttendance', 'attendHearingHow') as string[];
    await this.participantAttendanceSelects.first().waitFor({ state: 'visible' });

    const participantCount = await this.participantAttendanceSelects.count();
    for (let index = 0; index < participantCount; index += 1) {
      await this.participantAttendanceSelects.nth(index).selectOption(howIsHearingAttended[index] ?? 'Not in Attendance');
    }

    const noOfPeopleAttending = model.get('hearingAttendance', 'numberOfPeopleAttendingHearing') as string;
    await this.numberAttendingHearing.fill(noOfPeopleAttending);
  }

  async setHearingVenue(model: HearingJourneyModel): Promise<string> {
    const hearingVenue = model.get('hearingVenue', 'name') as string[];
    const venueSearchTerm = hearingVenue?.[0];

    if (!venueSearchTerm) {
      throw new Error(`Expected a hearing venue search term, got: ${JSON.stringify(hearingVenue)}`);
    }

    await this.hearingVenue.pressSequentially(venueSearchTerm);
    const venueOption = this.page.getByRole('option').filter({ hasText: venueSearchTerm }).first();
    await venueOption.waitFor({ state: 'visible', timeout: 30_000 });

    const newSelectedVenue = (await venueOption.textContent())?.replace(/\s+/g, ' ').trim();

    if (!newSelectedVenue) {
      throw new Error(`Venue option matching "${venueSearchTerm}" did not expose visible text.`);
    }
    await venueOption.click();
    await this.addLocationsButton.click();
    return newSelectedVenue;
  }

  async isWelshHearing(model: HearingJourneyModel): Promise<void> {
    const welshHearing = model.get('hearingDetails', 'hearingInWelsh') as string;
    await this.hearingInWelshYes.waitFor({ state: 'visible' });
    await (welshHearing === 'Yes' ? this.hearingInWelshYes : this.hearingInWelshNo).click();
  }

  async setJudgeOptions(model: HearingJourneyModel): Promise<void> {
    await this.noSpecificJudgeRadio.waitFor({ state: 'visible' });
    await this.specificJudgeRadio.waitFor({ state: 'visible' });

    await this.noSpecificJudgeRadio.click();

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
    await this.setHearingPriority(hearingPriority);
  }

  async selectJudgeTypes(judgeTypes: TypeOfJudges[]): Promise<void> {
    const fieldset = this.page.locator('#judgeTypes .govuk-fieldset');
    for (const judgeType of judgeTypes) {
      await fieldset.getByLabel(judgeType).check();
    }
  }

  async setHearingPriority(priority: string): Promise<void> {
    const option = priority === 'Urgent' ? this.hearingPriorityUrgent : this.hearingPriorityStandard;
    await option.check();
  }

  removeLocationLink(locationName: string): Locator {
    return this.page.locator('.hmcts-filter-tags a.hmcts-filter__tag').filter({ hasText: locationName });
  }

  hearingsTabStatusLink(): Locator {
    return this.page.getByRole('link', {
      name: 'view the status of this hearing in the hearings tab',
    });
  }

  async clickLinkToViewHearings(): Promise<void> {
    await this.hearingsTabStatusLink().click();
  }
}
