import { expect, Locator, Page } from '@playwright/test';
import {
  AdditionalFacility,
  HearingJourneyModel,
  HearingMethod,
  howWillParticipantAttend,
} from '../../../utils/hearing-model.ts';

type HearingAction = 'view-details' | 'view-or-edit' | 'cancel' | 'add-or-edit';

export class HearingsJourneyPage {
  constructor(private readonly page: Page) {}

  readonly container = this.page.locator('exui-case-hearings-ce');
  readonly requestHearingButton = this.page.getByRole('button', { name: /request a hearing/i });
  readonly additionalSecurityYes = this.page.locator('#addition-security-confirmation #additionalSecurityYes');
  readonly additionalSecurityNo = this.page.locator('#addition-security-confirmation #additionalSecurityNo');
  readonly facilitiesCheckbox = (facility: string) =>
    this.page.locator(`#facilitiesList .govuk-checkboxes__input[value="${facility}"]`);

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
  readonly addLocationButton = this.page.getByRole('link', { name: 'Add location' });
  readonly addLocationButtonCss = this.page.locator('a.govuk-button:has-text("Add location")');

  readonly reassignUserAutocompleteOverlay = this.page.locator('.cdk-overlay-pane');
  readonly reassignUserAutocompleteFirstOption = this.page.getByRole('option').first();

  readonly overlayLocationPanel = this.page
    .locator('.cdk-overlay-container .cdk-overlay-pane')
    // .filter({ has: this.page.getByRole('listbox') });
    .filter({ has: this.page.locator('.mat-autocomplete-panel[role="listbox"]') });

  readonly firstVenueOption = this.overlayLocationPanel.getByRole('option').first();

  readonly addLocationsButton = this.page.locator('.search-location').getByRole('link', { name: 'Add location' });

  readonly courtNameForVenue = this.page.getByRole('link', { name: 'Swansea Civil And Family Justice Centre', exact: true });

  readonly govInsetTex = this.page.locator('exui-hearing-venue .govuk-inset-text');
  readonly participantAttendingInPerson = this.page.locator('#hearingLevelChannelList #INTER');
  readonly participantAttendingInVideo = this.page.locator('#hearingLevelChannelList #TEL');
  readonly participantAttendingNotInAttendance = this.page.locator('#hearingLevelChannelList #VID');
  readonly participantAttendingTelephone = this.page.locator('#hearingLevelChannelList #VID');

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
    //await this.hearingVenue.fill(hearingVenue);
    //await this.chooseFirstVenueWithFilter.click();

    // await this.overlayLocationPanel.waitFor({ state: 'visible', timeout: 8_000 });
    //await this.firstVenueOption.click();
    // await this.page
    //   .locator('.cdk-overlay-container .cdk-overlay-pane')
    //   .filter({ has: this.page.getByRole('listbox') })
    //   .click();
    //await this.locationPanel.waitFor({ state: 'visible', timeout: 8_000 });
    // await this.chooseFirstVenueWithFilter.click();

    //await this.addLocationsButton.click();
  }

  async removeAllSelectedLocations() {
    const removeLinks = this.page.locator('.hmcts-filter-tags a.hmcts-filter__tag');
    while ((await removeLinks.count()) > 0) {
      await removeLinks.first().click();
    }
  }

  removeLocationLink(locationName: string): Locator {
    return this.page.locator('.hmcts-filter-tags a.hmcts-filter__tag').filter({ hasText: locationName });
  }
}
