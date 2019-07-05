Button = require('./webdriver-components/button.js');

class CreateCaseWizardPage{


    constructor() {
      this.header = '#content h1';
      this.continueButton = new Button('button[type=submit]');
      this.addnewButton=new Button('#appeal_appealReasons_reasons button:nth-child(2)');
      this.cancelButton = new Button('button[type=Cancel]');
      this.caseReference='caseReference';
      this.caseCreatedDay='caseCreated-day';
      this.caseCreatedMonth='caseCreated-month';
      this.caseCreatedYear='caseCreated-year';
      this.region='region';
      this.appealReceivedVia='appeal_receivedVia';
      this.appealMrnDetails='appeal_mrnDetails_dwpIssuingOffice';
      this.appealMrnDetailsDay='appeal_mrnDetails_mrnDate-day';
      this.appealMrnDetailsMonth='appeal_mrnDetails_mrnDate-month';
      this.appealMrnDetailsMonth='appeal_mrnDetails_mrnDate-year';
      this.appealMrnDetailsMrnLateReason='appeal_mrnDetails_mrnLateReason';
      this.appealMrnDetailsMrnMissingReason='appeal_mrnDetails_mrnMissingReason'
      this.appealAppellantNameTitle='appeal_appellant_name_title';
      this.appealAppellantNameFirstName='appeal_appellant_name_firstName';
      this.appealAppellantNameMiddleName='appeal_appellant_name_middleName';
      this.appealAppellantNameLastName='appeal_appellant_name_lastName';
      this.appealAppellantIdentityDobDay='appeal_appellant_identity_dob-day';
      this.appealAppellantIdentityDobMonth='appeal_appellant_identity_dob-month';
      this.appealAppellantIdentityDobYear='appeal_appellant_identity_dob-year';
      this.appealAppellantIdentityNino='appeal_appellant_identity_nino';
      this.appealAppellantAddressLine1='appeal_appellant_address_line1';
      this.appealAppellantAddressLine2='appeal_appellant_address_line2';
      this.appealAppellantAddressLine3='appeal_appellant_address_line3';
      this.appealAppellantAddressTown='appeal_appellant_address_town';
      this.appealAppellantAddressCounty='appeal_appellant_address_county';
      this.appealAppellantAddressPostcode='appeal_appellant_address_postcode';
      this.appealAppellantAddressCountry='appeal_appellant_address_country';
      this.appealAppellantContactPhone='appeal_appellant_contact_phone';
      this.appealAppellantContactMobile='appeal_appellant_contact_mobile';
      this.appealAppellantContactEmail='appeal_appellant_contact_email';
      this.appealAppellantIsAppointeeYes='appeal_appellant_isAppointee-Yes';
      this.appealAppellantIsAppointeeNo='appeal_appellant_isAppointee-No';
      this.appealAppellantAppointeeNameTitle='appeal_appellant_appointee_name_title';
      this.appealAppellantNameAppointeeFirstName='appeal_appellant_appointee_name_firstName';
      this.appealAppellantNameAppointeeMiddleName='appeal_appellant_appointee_name_middleName';
      this.appealAppellantNameAppointeeLastName='appeal_appellant_appointee_name_lastName';
      this.appealAppellantIdentityAppointeeDobDay='appeal_appellant_appointee_identity_dob-day';
      this.appealAppellantIdentityAppointeeDobMonth='appeal_appellant_appointee_identity_dob-month';
      this.appealAppellantIdentityAppointeeDobYear='appeal_appellant_appointee_identity_dob-year';
      this.appealAppellantAppointeeIdentityNino='appeal_appellant_appointee_identity_nino';
      this.appealAppellantAppointeeAddressLine1='appeal_appellant_appointee_address_line1';
      this.appealAppellantAppointeeAddressLine2='appeal_appellant_appointee_address_line2';
      this.appealAppellantAppointeeAddressLine3='appeal_appellant_appointee_address_line3';
      this.appealAppellantAppointeeAddressTown='appeal_appellant_appointee_address_town';
      this.appealAppellantAppointeeAddressCounty='appeal_appellant_appointee_address_county';
      this.appealAppellantAppointeeAddressPostcode='appeal_appellant_appointee_address_postcode';
      this.appealAppellantAppointeeAddressCountry='appeal_appellant_appointee_address_country';
      this.appealAppellantAppointeeContactPhone='appeal_appellant_appointee_contact_phone';
      this.appealAppellantAppointeeContactMobile='appeal_appellant_appointee_contact_mobile';
      this.appealAppellantAppointeeContactEmail='appeal_appellant_appointee_contact_email';
      this.appealAppellantIsAddressSameAsYes='appeal_appellant_isAddressSameAsAppointee-Yes';
      this.appealAppellantIsAddressSameAsNo='appeal_appellant_isAddressSameAsAppointee-No';
      this.appealBenefitTypeCode='appeal_benefitType_code';
      this.appealBenefitTypeDescription='appeal_benefitType_description';
      this.appealHearingType='appeal_hearingType';
      this.appealHearingOptionsWantsToAttendYes='appeal_hearingOptions_wantsToAttend-Yes';
      this.appealHearingOptionsWantsToAttendNo='appeal_hearingOptions_wantsToAttend-No';
      this.appealHearingOptionsLanguageInterpreterYes='appeal_hearingOptions_languageInterpreter-Yes';
      this.appealHearingOptionsLanguageInterpreterNo='appeal_hearingOptions_languageInterpreter-No';
      this.appealHearingOptionsOther='appeal_hearingOptions_other';
      this.appealHearingOptionsSignLanguageType='appeal_hearingOptions_signLanguageType';
      this.appealAppealReasonsReason='appeal_appealReasons_reasons_0_reason';
      this.appealAppealReasonsReasonsDescription='appeal_appealReasons_reasons_0_description';
      this.appealAppealReasonsOtherReasons='appeal_appealReasons_otherReasons';
      this.appealSupporterNameTitle='appeal_supporter_name_title';
      this.appealSupporterNameFirstName='appeal_supporter_name_firstName';
      this.appealSupporterNameMiddleName='appeal_supporter_name_middleName';
      this.appealSupporterNameLastName='appeal_supporter_name_lastName';
      this.appealSupporterContactPhone='appeal_supporter_contact_phone';
      this.appealSupporterContactMobile='appeal_supporter_contact_mobile';
      this.appealSupporterContactEmail='appeal_supporter_contact_email';
      this.appealRepHasRepresentativeYes='appeal_rep_hasRepresentative-Yes';
      this.appealRepHasRepresentativeNo='appeal_rep_hasRepresentative-No';
      this.appealSigner='appeal_signer';
      this.regionalProcessingCenterName='regionalProcessingCenter_name';
      this.regionalProcessingCenterAddress1='regionalProcessingCenter_address1';
      this.regionalProcessingCenterAddress2='regionalProcessingCenter_address2';
      this.regionalProcessingCenterAddress3='regionalProcessingCenter_address3';
      this.regionalProcessingCenterAddress4='regionalProcessingCenter_address4';
      this.regionalProcessingCenterPostcode='regionalProcessingCenter_postcode';
      this.regionalProcessingCenterCity='regionalProcessingCenter_city';
      this.regionalProcessingCenterPhoneNumber='regionalProcessingCenter_phoneNumber';
      this.regionalProcessingCenterFaxNumber='regionalProcessingCenter_faxNumber';
      this.regionalProcessingCenterEmail='regionalProcessingCenter_email';
      this.panelAssignedTo='panel_assignedTo';
      this.panelMedicalMember='panel_medicalMember';
      this.panelDisabilityQualifiedMember='panel_disabilityQualifiedMember';
    }



  /**
   * Enter random text into the Text field
   * @returns EUIStringField Object
   */
  async enterIntoTextField(value){
    await this.caseReference.enterText(value);
  }
  /**
   * Select Event Type from the dropdown
   * @param option to select - case insensitive
   * @returns {Promise<void>}
   */
  async selectEvent(option){
    await this.appealReceivedVia.selectFromDropdownByText(option);
  }

  /**
   * Click Start button to submit options and start a new case
   * @returns {Promise<CreateCaseWizardPage|*>}
   */
  async clickStartButton() {
    await this._submitButton.waitForElementToBeClickable();
    await this._submitButton.click();

    //await $(this._submitButton).click();
    //await browser.waitForAngular;
    //return new CreateCaseWizardPage;
  }

    async clickCollectionAddNewButton(collectionFieldId) {
      let xpathLocator = await this.collectionAddNewElementButtonXPathTemplate.replace('COLLECTION-ID-PLACEHOLDER', collectionFieldId);
      await element(by.xpath(xpathLocator)).click();
    }

  /**
   * Button to progress the case, may be called continue or may be the final
   * Submit button with a different name as it can be dynamic
   * @returns {Promise<void>}
   */
    async clickContinueButton(){
        await this.continueButton.click();
    }

  /**
   * Final button to submit the case/event
   * @returns {Promise<void>}
   */
    async clickSubmitCaseButton(){
        await this.continueButton.click();
        //await new CaseDetailsPage().waitForPageToLoad();
    }

    async getFieldLabels(){
        let labelElements = await $$(this.fieldLabels);
        let labels = [];
        for (const labelElem of labelElements){
            let labelText = await labelElem.getText();
            let label = labelText.replace(' (Optional)', '');
            labels.push(label)
        }

        return labels;
    }

    async getGreyBarFieldLabels(){
      let labelElements = await $$(this.greyBarFieldLabels);
      let labels = [];
      for (const labelElem of labelElements){
        let labelText = await labelElem.getText();
        let label = labelText.replace(' (Optional)', '');
        labels.push(label)
      }

      return labels;
    }

    async getCheckYourAnswersValueByLabel(labelText){
      let label = await labelText.replace(' (Optional)','');
      let xpathLocator = await this.answerValueXpathTemplate.replace('LABEL-TEXT-PLACEHOLDER',label);

      return await element(by.xpath(xpathLocator.toString())).getText();
    }

    async clickChangeLink(labelText){
      let label = await labelText.replace(' (Optional)','');
      let xpathLocator = await this.answerChangeLinkXpathTemplate.replace('LABEL-TEXT-PLACEHOLDER',label);
      await element(by.xpath(xpathLocator)).click();
    }

    async getPageHeader(){
      return await $(this.header).getText();
    }

    async errorSummaryDispalyed() {
      return await this.elementDisplayed($(this.topErrorBox));
    }

    async fieldErrorDispalyed() {
      return await this.elementDisplayed($(this.fieldError));
    }

    async continueButtonEnabled(){
      return await this.continueButton.isEnabled();
    }

    async continueButtonDisplayed(){
      return await this.continueButton.isDisplayed();
    }

    async clickGenericCollectionAddNewButton() {
      await this.CollectionNewButton.click();
    }

  async amOnPage(){
    let header = await this.getPageHeader();
    return header === 'Case Details - Appeal created'
  }

}

module.exports = CreateCaseWizardPage;
