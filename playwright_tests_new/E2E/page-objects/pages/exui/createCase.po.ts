import { Page } from '@playwright/test';
import { Base } from '../../base';
import { faker } from '@faker-js/faker';

export class CreateCasePage extends Base {
  readonly container = this.page.locator('exui-case-home');
  readonly createCaseButton = this.page.getByRole('link', { name: 'Create case' });
  readonly jurisdictionSelect = this.page.locator('#cc-jurisdiction');
  readonly caseTypeSelect = this.page.locator('#cc-case-type');
  readonly eventTypeSelect = this.page.locator('#cc-event');
  readonly startButton = this.page.getByRole('button', { name: 'Start' });
  readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
  readonly continueButton = this.page.getByRole('button', { name: 'Continue' });

  // Locators for the Divorce - XUI Case flags V2
  readonly legalRepParty1Block = this.page.locator('#LegalRepParty1Flags_LegalRepParty1Flags');
  readonly legalRepParty2Block = this.page.locator('#LegalRepParty2Flags_LegalRepParty2Flags');
  readonly party1RoleOnCase = this.page.locator('#LegalRepParty1Flags_roleOnCase');
  readonly party1Name = this.page.locator('#LegalRepParty1Flags_partyName');
  readonly party1GroupId = this.page.locator('#LegalRepParty1Flags_groupId');
  readonly party1Visibility = this.page.locator('#LegalRepParty1Flags_visibility');
  readonly party2RoleOnCase = this.page.locator('#LegalRepParty2Flags_roleOnCase');
  readonly party2Name = this.page.locator('#LegalRepParty2Flags_partyName');
  readonly party2GroupId = this.page.locator('#LegalRepParty2Flags_groupId');
  readonly party2Visibility = this.page.locator('#LegalRepParty2Flags_visibility');

  // Locators for the Divorce - XUI Case PoC
  readonly person1Title = this.page.locator('#Person1_Title');
  readonly firstNameInput = this.page
    .getByRole('group', { name: 'Person 1 - retained (Optional)' })
    .getByLabel('First Name (Optional)');
  readonly lastNameInput = this.page
    .getByRole('group', { name: 'Person 1 - retained (Optional)' })
    .getByLabel('Last Name (Optional)');
  readonly genderSelect = this.page
    .getByRole('group', { name: 'Person 1 - retained (Optional)' })
    .getByLabel('Gender (Optional)');
  readonly jobTitleInput = this.page.getByRole('group', { name: 'Job (Optional)' }).getByLabel('Title (Optional)');
  readonly jobDescriptionInput = this.page.getByRole('textbox', { name: 'Description (Optional)' });
  readonly textField0Input = this.page.getByLabel('Text Field 0');
  readonly textField1Input = this.page.getByLabel('Text Field 1 (Optional)');
  readonly textField2Input = this.page.getByLabel('Text Field 2 (Optional)');
  readonly textField3Input = this.page.getByLabel('Text Field 3 (Optional)');
  readonly checkYourAnswersHeading = this.page.getByRole('heading', { name: 'Check your answers' });
  readonly testSubmitButton = this.page.getByRole('button', { name: 'Test submit' });

  // Employment case locators
  readonly receiptDayInput = this.page.locator('#receiptDate-day');
  readonly receiptMonthInput = this.page.locator('#receiptDate-month');
  readonly receiptYearInput = this.page.locator('#receiptDate-year');
  readonly tribunalOfficeSelect = this.page.locator('#managingOffice');
  readonly claimantIndividualRadio = this.page.locator('#claimant_TypeOfClaimant-Individual');
  readonly claimantCompanyRadio = this.page.locator('#claimant_TypeOfClaimant-Company');
  readonly claimantOrganisationNameInput = this.page.locator('#claimant_Company');
  readonly claimantIndividualFirstNameInput = this.page.locator('#claimantIndType_claimant_first_names');
  readonly claimantIndividualLastNameInput = this.page.locator('#claimantIndType_claimant_last_name');
  readonly addRespondentButton = this.page.locator('#respondentCollection button');
  readonly respondentOneNameInput = this.page.locator('#respondentCollection_0_respondent_name');
  readonly respondentOrganisation = this.page.locator('#respondentCollection_0_respondentType-Organisation');
  readonly respondentCompanyNameInput = this.page.locator('#respondentCollection_0_respondentOrganisation');
  readonly respondentAcasCertifcateSelectYes = this.page.locator('#respondentCollection_0_respondent_ACAS_question_Yes');
  readonly respondentAcasCertificateNumberInput = this.page.locator('#respondentCollection_0_respondent_ACAS');
  readonly respondentAddressLine1Input = this.page.locator('#respondentCollection_0_respondent_address__detailAddressLine1');
  readonly sameAsClaimantWorkAddressYes = this.page.locator('#claimantWorkAddressQuestion_Yes');
  readonly claimantRepresentedNo = this.page.locator('#claimantRepresentedQuestion_No');

  readonly hearingPreferenceVideo = this.page.locator('#claimantHearingPreference_hearing_preferences-Video');

  // Address lookup locators
  readonly manualEntryLink = this.page.locator('.manual-link');
  readonly claimantAddressLine1Input = this.page.locator('#claimantType_claimant_addressUK__detailAddressLine1');
  readonly postCodeSearchInput = this.page.locator('.postcodeLookup input');
  readonly postCodeSearchButton = this.page.locator('.postcodeLookup').getByRole('button');
  readonly addressSelect = this.page.locator('.postcodeLookup select');

  // Warning modal
  readonly refreshModal = this.page.locator('.refresh-modal');
  readonly refreshModalConfirmButton = this.refreshModal.getByRole('button', { name: 'Ok' });
  readonly errorMessage = this.page.locator('.error-message');

  constructor(page: Page) {
    super(page);
  }

  async createCase(jurisdiction: string, caseType: string, eventType: string | undefined) {
    await this.createCaseButton.click();
    await this.jurisdictionSelect.selectOption(jurisdiction);
    await this.caseTypeSelect.selectOption(caseType);
    if (eventType) {
      await this.eventTypeSelect.click();
      await this.eventTypeSelect.selectOption({ label: eventType });
    }
    await this.startButton.click();
  }

  async addressLookup(postCode: string, addressOption: string) {
    await this.postCodeSearchInput.fill(postCode);
    await this.postCodeSearchButton.click();
    await this.addressSelect.selectOption(addressOption);
  }

  async createCaseEmployment(jurisdiction: string, caseType: string, textField0: string) {
    await this.createCase(jurisdiction, caseType, 'Create Case');
    const today = new Date();
    await this.receiptDayInput.fill(today.getDate().toString());
    await this.receiptMonthInput.fill((today.getMonth() + 1).toString());
    await this.receiptYearInput.fill((today.getFullYear() - 1).toString());
    await this.tribunalOfficeSelect.selectOption('Leeds');

    await this.continueButton.click({ force: true });
    await this.continueButton.click({ force: true });

    await this.claimantIndividualRadio.check();
    await this.claimantIndividualFirstNameInput.fill('Test ');
    await this.claimantIndividualLastNameInput.fill('Person');

    await this.manualEntryLink.click();
    await this.claimantAddressLine1Input.fill('1 Test Street');

    await this.continueButton.click();

    await this.addRespondentButton.click();
    await this.respondentOneNameInput.fill('Respondent One');
    await this.respondentOrganisation.click();
    await this.respondentAcasCertifcateSelectYes.click();
    await this.respondentAcasCertificateNumberInput.fill('ACAS123456');
    await this.respondentCompanyNameInput.fill('Respondent Company');
    await this.manualEntryLink.click();
    await this.respondentAddressLine1Input.fill('1 Respondent Street');

    await this.continueButton.click();

    await this.sameAsClaimantWorkAddressYes.click();
    await this.continueButton.click();

    await this.continueButton.click();

    await this.claimantRepresentedNo.click();

    await this.continueButton.click();

    await this.hearingPreferenceVideo.click();

    await this.submitButton.click();
    await this.exuiSpinnerComponent.wait();
  }

  async createCaseFlagDivorceCase(testData: string, jurisdiction: string = 'DIVORCE', caseType: string = 'XUI Case flags V2.1') {
    await this.createCase(jurisdiction, caseType, '');

    await this.party1RoleOnCase.fill(testData);
    await this.party1Name.fill(testData);

    await this.party2RoleOnCase.fill(`${testData}2`);
    await this.party2Name.fill(`${testData}2`);

    await this.continueButton.click();
    await this.exuiSpinnerComponent.wait();
    await this.testSubmitButton.click();
    await this.exuiSpinnerComponent.wait();
  }

  async createDivorceCase(jurisdiction: string, caseType: string, textField0: string) {
    const gender = faker.helpers.arrayElement(['Male', 'Female', 'Not given']);
    await this.createCase(jurisdiction, caseType, undefined);

    await this.page.getByLabel(gender, { exact: true }).check();
    await this.person1Title.click();
    await this.person1Title.fill(faker.person.prefix());
    await this.person1Title.press('Tab');
    await this.firstNameInput.fill(faker.person.firstName());
    await this.firstNameInput.press('Tab');
    await this.lastNameInput.fill(faker.person.lastName());
    await this.lastNameInput.press('Tab');
    await this.genderSelect.selectOption(gender);
    await this.jobTitleInput.click();
    await this.jobTitleInput.fill(faker.person.jobTitle());
    await this.jobDescriptionInput.click();
    await this.jobDescriptionInput.fill(faker.lorem.sentence());
    await this.continueButton.click();
    await this.textField0Input.click();
    await this.textField0Input.fill(textField0);
    await this.textField0Input.press('Tab');
    await this.textField3Input.fill(faker.lorem.word());
    await this.textField3Input.press('Tab');
    await this.textField1Input.fill(faker.lorem.word());
    await this.textField1Input.press('Tab');
    await this.textField2Input.fill(faker.lorem.word());
    await this.continueButton.click();
    await this.testSubmitButton.click();
    await this.exuiSpinnerComponent.wait();
  }
}
