import { Page } from "@playwright/test";
import { Base } from "../../base";
import { faker, th } from '@faker-js/faker';

export class CreateCasePage extends Base {

  readonly container = this.page.locator("exui-case-home");
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


  // Locators for the Divorce - xuiTestCaseType
  readonly textFieldInput = this.page.locator('#TextField');
  readonly emailFieldInput = this.page.locator('#EmailField');
  readonly phoneNumberFieldInput = this.page.locator('#PhoneUKField');
  readonly dateFieldDayInput = this.page.locator('#DateField-day');
  readonly dateFieldMonthInput = this.page.locator('#DateField-month');
  readonly dateFieldYearInput = this.page.locator('#DateField-year');
  readonly dateTimeFieldDayInput = this.page.locator('#DateTimeField-day');
  readonly dateTimeFieldMonthInput = this.page.locator('#DateTimeField-month');
  readonly dateTimeFieldYearInput = this.page.locator('#DateTimeField-year');
  readonly dateTimeFieldHourInput = this.page.locator('#DateTimeField-hour');
  readonly dateTimeFieldMinuteInput = this.page.locator('#DateTimeField-minute');
  readonly dateTimeFieldSecondInput = this.page.locator('#DateTimeField-second');
  readonly currenyFieldInput = this.page.locator('#AmountInGBPField');

  readonly yesNoRadioButtons = this.page.locator('#YesOrNoField');
  readonly applicantPostcode = this.page.locator('#AppicantPostcodeField');
  readonly complexType1JudgeIsRightRadios = this.page.locator('#ComplexType_1_judgeLevelRadio');
  readonly complexType1LevelOfJudgeRadioButtons = this.page.locator('#ComplexType_1_proposal');
  readonly complexType1LevelOfJudgeDetailsInput = this.page.locator('#ComplexType_1_proposalReason');
  readonly complexType1LevelOfJudgeKeyInput = this.page.locator('#ComplexType_1_TextField');
  readonly complexType2AddressLine1Input = this.page.locator('#ComplexType_2_address__detailAddressLine1');
  readonly complexType2EmailInput = this.page.locator('#ComplexType_2_email');
  readonly complexType3ComplianceButton = this.page.locator('#ComplexType_3_responses button');
  readonly complexType3ComplianceInput = this.page.locator('#ComplexType_3_responses input');
  readonly complexType3DateOfBirthDay = this.page.locator('#dateOfBirth-day');
  readonly complexType3DateOfBirthMonth = this.page.locator('#dateOfBirth-month');
  readonly complexType3DateOfBirthYear = this.page.locator('#dateOfBirth-year');
  readonly complexType3FileUploadInput = this.page.locator('#ComplexType_3_document');
  readonly complexType3DateOfHearingDay = this.page.locator('#dateTimeUploaded-day');
  readonly complexType3DateOfHearingMonth = this.page.locator('#dateTimeUploaded-month');
  readonly complexType3DateOfHearingYear = this.page.locator('#dateTimeUploaded-year');
  readonly complexType3DateOfHearingHour = this.page.locator('#dateTimeUploaded-hour');
  readonly complexType3DateOfHearingMinute = this.page.locator('#dateTimeUploaded-minute');
  readonly complexType3DateOfHearingSecond = this.page.locator('#dateTimeUploaded-second');
  readonly complexType4AmountInput = this.page.locator('#ComplexType_4_amount');
  readonly complexType4FirstTickBox = this.page.locator('#ComplexType_4_selectedCategories-item_1');
  readonly complexType4SelectList = this.page.locator('#ComplexType_4_FixedListField');

  // Locators for the Divorce - XUI Case PoC
  readonly person1Title = this.page.locator('#Person1_Title');
  readonly firstNameInput = this.page.locator('#Person1_FirstName');
  readonly lastNameInput = this.page.locator('#Person1_LastName');
  readonly genderSelect = this.page.locator('#Person1_PersonGender');
  readonly jobTitleInput = this.page.locator('#Person1_PersonJob_Title');
  readonly jobDescriptionInput = this.page.locator('#Person1_PersonJob_Description');
  readonly fileUploadInput = this.page.locator('#DocumentUrl');
  readonly fileUploadStatusLabel = this.page.locator('ccd-write-document-field .error-message');
  readonly textField0Input = this.page.locator('#TextField0');
  readonly textField1Input = this.page.locator('#TextField1');
  readonly textField2Input = this.page.locator('#TextField2');
  readonly textField3Input = this.page.locator('#TextField3');
  readonly checkYourAnswersHeading = this.page.locator('.check-your-answers h2');
  readonly testSubmitButton = this.page.locator('.check-your-answers [type="submit"]');

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


  async uploadEmploymentFile(fileName: string, mimeType: string, fileContent: string) {
    await this.page.locator('#documentCollection button').click();
    await this.uploadFile(fileName, mimeType, fileContent);
    await this.page.locator('#documentCollection_0_topLevelDocuments').selectOption('Misc')
    await this.page.locator('#documentCollection_0_miscDocuments').selectOption('Other');
    await this.submitButton.click();
  
  }

  async uploadFile(fileName: string, mimeType: string, fileContent: string) {
    const maxRetries = 3;
    const baseDelayMs = 3000; // initial backoff

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      // set the file directly on the input element (no filechooser needed)
      await this.page.setInputFiles('input[type="file"]', {
        name: fileName,
        mimeType,
        buffer: Buffer.from(fileContent),
      });

      // wait for the upload response (same predicate you already use)
      const res = await this.page.waitForResponse(
        r => r.url().includes('/document') && r.request().method() === 'POST',
        { timeout: 5000 }
      ).catch(() => null);

      if (!res) {
        // no response within timeout — treat as failure or retry depending on policy
        if (attempt < maxRetries) {
          await this.page.waitForTimeout(baseDelayMs * Math.pow(2, attempt - 1));
          continue;
        } else {
          throw new Error('Upload timed out after retries');
        }
      }

      if (res.status() === 429) {
        if (attempt < maxRetries) {
          // exponential backoff before retrying
          await this.page.waitForTimeout(baseDelayMs * Math.pow(2, attempt - 1));
          continue;
        } else {
          throw new Error('Upload failed: server returned 429 after retries');
        }
      }

      // any non-429 response: consider it done (success or other failure)
      break;
    }
    await this.fileUploadStatusLabel.waitFor({ state: 'hidden' });
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
    await this.respondentOrganisation.click()
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

  async createDivorceCase(jurisdiction: string, caseType: string, testInput: string) {
    switch (caseType) {
      case 'xuiCaseFlagsV1':
        return this.createDivorceCaseFlag(jurisdiction, caseType, testInput);
      case 'XUI Case PoC':
        return this.createDivorceCasePoC(jurisdiction, caseType, testInput);
      case 'xuiTestCaseType':
        return this.createDivorceCaseTest(jurisdiction, caseType, testInput);
      default:
        throw new Error(`createDivorceCase does not support case type: ${caseType}`);
    }
  }
  async createDivorceCaseTest(jurisdiction: string = 'DIVORCE', caseType: string = 'xuiTestCaseType', testData: string) {

    const today = new Date();
    await this.createCase(jurisdiction, caseType, '');

    await this.textFieldInput.fill(testData);
    await this.continueButton.click();

    await this.emailFieldInput.fill(faker.internet.email({ provider: 'example.com' }));
    await this.phoneNumberFieldInput.fill('07123456789');
    await this.dateFieldDayInput.fill(today.getDate().toString());
    await this.dateFieldMonthInput.fill((today.getMonth() + 1).toString());
    await this.dateFieldYearInput.fill((today.getFullYear() - 20).toString());
    await this.dateTimeFieldDayInput.fill(today.getDate().toString());
    await this.dateTimeFieldMonthInput.fill((today.getMonth() + 1).toString());
    await this.dateTimeFieldYearInput.fill(today.getFullYear().toString());
    await this.dateTimeFieldHourInput.fill('10');
    await this.dateTimeFieldMinuteInput.fill('30');
    await this.dateTimeFieldSecondInput.fill('15');
    await this.currenyFieldInput.fill('1000');
    await this.continueButton.click();

    await this.yesNoRadioButtons.getByLabel('Yes').check();
    await this.applicantPostcode.fill('SW1A 1AA');
    await this.complexType1JudgeIsRightRadios.getByLabel('No').check();
    await this.complexType1LevelOfJudgeRadioButtons.getByLabel('Item 1').check();
    await this.complexType1LevelOfJudgeDetailsInput.fill('Details about why this level of judge is needed.');
    await this.complexType1LevelOfJudgeKeyInput.fill('Key information');
    await this.manualEntryLink.click();
    await this.complexType2AddressLine1Input.fill('10 Test Street');
    await this.complexType2EmailInput.fill(faker.internet.email({ provider: 'example.com' }));
    await this.uploadFile('sample.pdf', 'application/pdf', '%PDF-1.4\n%test\n%%EOF');
    await this.complexType3ComplianceButton.click();
    await this.complexType3ComplianceInput.fill('Compliant response');
    await this.complexType3DateOfBirthDay.fill('15');
    await this.complexType3DateOfBirthMonth.fill('06');
    await this.complexType3DateOfBirthYear.fill('1990');
    await this.complexType3DateOfHearingDay.fill(today.getDate().toString());
    await this.complexType3DateOfHearingMonth.fill((today.getMonth() + 1).toString());
    await this.complexType3DateOfHearingYear.fill(today.getFullYear().toString());
    await this.complexType3DateOfHearingHour.fill('14');
    await this.complexType3DateOfHearingMinute.fill('45');
    await this.complexType3DateOfHearingSecond.fill('30');
    await this.complexType4AmountInput.fill('500');
    await this.complexType4FirstTickBox.check();
    await this.complexType4SelectList.selectOption('Item 1');
    await this.continueButton.click();
    await this.submitButton.click();
    await this.exuiSpinnerComponent.wait();
  }

  async createDivorceCaseFlag(testData: string, jurisdiction: string = 'DIVORCE', caseType: string = 'xuiCaseFlagsV1') {
    await this.createCase(jurisdiction, caseType, '');

    await this.party1RoleOnCase.fill(testData);
    await this.party1Name.fill(testData);

    await this.party2RoleOnCase.fill(`${testData}2`);
    await this.party2Name.fill(`${testData}2`);

    await this.continueButton.click();
    await this.exuiSpinnerComponent.wait()
    await this.testSubmitButton.click();
    await this.exuiSpinnerComponent.wait()
  }

  async createDivorceCasePoC(jurisdiction: string, caseType: string, textField0: string) {
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
    await this.exuiSpinnerComponent.wait()
  };
}
