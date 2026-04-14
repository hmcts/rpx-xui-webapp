import { expect, Locator, Page } from '@playwright/test';
import { AdditionalFacility, HearingJourneyModel } from '../../../utils/hearing-model.ts';

type HearingAction = 'view-details' | 'view-or-edit' | 'cancel' | 'add-or-edit';

export class HearingsJourneyPage {
  constructor(private readonly page: Page) {}

  readonly container = this.page.locator('exui-case-hearings-ce');
  readonly requestHearingButton = this.page.getByRole('button', { name: /request a hearing/i });
  readonly additionalSecurityYes = this.page.locator('#addition-security-confirmation #additionalSecurityYes');
  readonly additionalSecurityNo = this.page.locator('#addition-security-confirmation #additionalSecurityNo');
  readonly facilitiesCheckbox = (facility: string) =>
    this.page.locator(`#facilitiesList .govuk-checkboxes__input[value="${facility}"]`);

  readonly commonRadioButtons = this.page.locator('#hearing-stage .govuk-radios__item');

  // readonly hearingStageRadio = (stage: string) => this.page.locator(`#hearing-stage .govuk-radios__input[value="${stage}"]`);
  //readonly hearingStageRadio = this.page.locator(`#hearing-stage .govuk-radios__input`);

  async additionalSecurityAndFacilities(model: HearingJourneyModel, page: Page): Promise<void> {
    const value = model.get('hearingFacilities', 'additionalSecurity');
    console.log('~~~~~~~~~~~VALUE that has been SET for hearingFacilities ===', value);

    if (value === 'Yes') {
      await this.additionalSecurityYes.click();
    } else {
      await this.additionalSecurityNo.click();
    }
    const getHearingFacilities = model.get('hearingFacilities', 'additionalSecurity');
    console.log('~~~~~~~~~~~GET VALUE for hearingFacilities ===', getHearingFacilities);

    // additional facilitiesexp
    const facilities: AdditionalFacility[] = model.get('hearingFacilities', 'additionalFacilities') ?? [];
    expect(facilities.length).toBeGreaterThan(0);

    for (const facility of facilities) {
      //const selectedFacilities = page.locator(`#facilitiesList .govuk-checkboxes__input[value="${facility}"]`);
      await this.facilitiesCheckbox(facility).check();
    }
    const getAdditionalFacilities = model.get('hearingFacilities', 'additionalFacilities');
    console.log('~~~~~~~~~~~GET VALUE for getAdditionalFacilities ===', getAdditionalFacilities);
  }

  async setHearingStage(model: HearingJourneyModel, page: Page): Promise<void> {
    const hearingStage = model.get('hearingStage', 'stage');
    console.log('~~~~~~~~~~~hearingStage that has been SET in Model  ===', hearingStage);
    await this.commonRadioButtons.first().getByLabel(`${hearingStage}`).check();
    //await this.commonRadioButtons.nth(1).getByLabel(`${hearingStage}`).check();
  }

  // async selectRadioByLabel(page, groupSelector, labelText: string) {
  //   // await page
  //   //   .locator(`#hearing-stage .govuk-radios__item`)
  //   //   //.filter({ hasText: labelText })
  //   //   .filter({ has: page.locator('label', { hasText: labelText }) })
  //   //   //.locator('.govuk-radios__input')
  //   //   .check();
  //   //await page.locator('#hearing-stage .govuk-radios__item').filter({ hasText: 'Allocation' }).click();
  // }
}
