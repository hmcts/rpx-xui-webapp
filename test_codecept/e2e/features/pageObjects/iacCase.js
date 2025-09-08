const { $, elementByXpath } = require('../../../helpers/globals');
const BrowserWaits = require('../../support/customWaits');
const CaseManager = require('./common/CaseManager');
const CcdFields = require('./common/ccdFields');

class IACCase {
  get caseManager() { return new CaseManager(); }
  get ccdField() { return new CcdFields(); }

  get continueBtn() { return elementByXpath("//button[contains(text(),'Continue')]"); }
  get validationError() { return $('.validation-error'); }
  get addNewBtn() { return elementByXpath("//button[contains(text(),'Add new')]"); }
  get docUploadField() { return $('#uploadTheNoticeOfDecisionDocs_0_document'); }
  get findAddressBtn() { return elementByXpath("//button[contains(text(),'Find address')]"); }
  get firstOption() { return elementByXpath("//option[@value='1: Object']"); }

  get clientDetentionCheckbox() { return $('#checklist_checklist2-isNotDetained'); }
  get clientEUDecisionCheckbox() { return $('#checklist_checklist7-isNotEUDecision'); }

  get yesAppellantUK() { return elementByXpath("//input[@id='appellantInUk_Yes']"); }

  get HORefferenceField() { return $('#homeOfficeReferenceNumber'); }
  get dayField() { return $('#homeOfficeDecisionDate-day'); }
  get monthField() { return $('#homeOfficeDecisionDate-month'); }
  get yearField() { return $('#homeOfficeDecisionDate-year'); }

  get appelantTitle() { return $('#appellantTitle'); }
  get appelantFirstName() { return $('#appellantGivenNames'); }
  get appelantLastName() { return $('#appellantFamilyName'); }
  get dayOfBirth() { return $('#appellantDateOfBirth-day'); }
  get monthOfBirth() { return $('#appellantDateOfBirth-month'); }
  get yearOfBirth() { return $('#appellantDateOfBirth-year'); }

  get isStateless() { return $('#appellantStateless-isStateless'); }

  get contacEmail() { return elementByXpath("//input[@id='contactPreference-wantsEmail']"); }
  get emailField() { return $('#email'); }

  get appealType() { return $('#appealType-revocationOfProtection'); }
  get appealGrounds() { return $('#appealGroundsRevocation_values-revocationRefugeeConvention'); }

  get noDeportation() { return $('#deportationOrderOptions_No'); }
  get noNewMatters() { return $('#hasNewMatters_No'); }
  get otherAppeals() { return $('#hasOtherAppeals'); }

  get legalRepName() { return $('#legalRepName'); }
  get legalRepRef() { return $('#legalRepReferenceNumber'); }

  get yesFixedAddress() { return $('#appellantHasFixedAddress_Yes'); }

  async createCase(isAccessibilityTest) {
    const caseData = {
      'Home Office Reference/Case ID': '012345678',
      'Appeal number[0].': 'IA123451234',
      'Other appeals': 'No',
      'Has your client appealed against any other UK immigration decisions?': 'No'

    };

    await this.caseManager.createCase(caseData, isAccessibilityTest);
  }

  async getErrorMessageMandatoryField() {
    await this.continueBtn.click();
    await BrowserWaits.waitForElement(this.validationError);
    return this.validationError.textContent();
  }

  async tellUsAboutYourClientPage() {
    await this.clientDetentionCheckbox.click();
    await this.clientEUDecisionCheckbox.click();
    await BrowserWaits.waitForSeconds(3);
    await this.continueBtn.click();
  }

  async locationPage() {
    await BrowserWaits.waitForPresenceOfElement(this.yesAppellantUK);
    await this.yesAppellantUK.click();
    await this.continueBtn.click();
  }

  async homeOfficeDetailsPage() {
    await BrowserWaits.waitForPresenceOfElement(this.HORefferenceField);
    await this.HORefferenceField.fill('012345678');
    await this.dayField.fill('01');
    await this.monthField.fill('01');
    await this.yearField.fill('2021');
    await this.continueBtn.click();
  }

  async noticeOfDecisionPage() {
    await BrowserWaits.waitForPresenceOfElement(this.addNewBtn);
    await this.addNewBtn.click();
    await this.ccdField.docUpload();
    await this.ccdField.docDescriptionField();
    await BrowserWaits.waitForSeconds(3);
    await this.continueBtn.click();
  }

  async basicDetailsPage() {
    await BrowserWaits.waitForPresenceOfElement(this.appelantTitle);
    await this.appelantTitle.fill('Miss');
    await this.appelantFirstName.fill('Jane');
    await this.appelantLastName.fill('Doe');
    await this.dayOfBirth.fill('1');
    await this.monthOfBirth.fill('1');
    await this.yearOfBirth.fill('1990');
    await this.continueBtn.click();
  }

  async nationalityPage() {
    await BrowserWaits.waitForPresenceOfElement(this.isStateless);
    await this.isStateless.click();
    await this.continueBtn.click();
  }

  async addressPage() {
    await BrowserWaits.waitForPresenceOfElement(this.yesFixedAddress);
    await this.yesFixedAddress.click();
    await this.ccdField.postcodeLookup();
    await BrowserWaits.waitForSeconds(3);
    await BrowserWaits.waitForElementClickable(this.continueBtn);
    await this.continueBtn.click();
  }

  async contactPage() {
    await BrowserWaits.waitForPresenceOfElement(this.contacEmail);
    await this.contacEmail.click();
    await BrowserWaits.waitForSeconds(3);
    await BrowserWaits.waitForPresenceOfElement(this.emailField);
    await this.emailField.fill('test@test.com');
    await this.continueBtn.click();
  }

  async appealTypePage() {
    await BrowserWaits.waitForPresenceOfElement(this.appealType);
    await this.appealType.click();
    await BrowserWaits.waitForSeconds(3);
    await this.continueBtn.click();
  }

  async appealGroundsPage() {
    await BrowserWaits.waitForPresenceOfElement(this.appealGrounds);
    await this.appealGrounds.click();
    await BrowserWaits.waitForElementClickable(this.continueBtn);
    await this.continueBtn.click();
  }

  async deportationOrderPage() {
    await BrowserWaits.waitForPresenceOfElement(this.noDeportation);
    await this.noDeportation.click();
    await this.continueBtn.click();
  }

  async newMattersPage() {
    await BrowserWaits.waitForPresenceOfElement(this.noNewMatters);
    await this.noNewMatters.click();
    await this.continueBtn.click();
  }

  async appealAgainstOtherDecisionsPage() {
    await BrowserWaits.waitForPresenceOfElement(this.otherAppeals);
    await this.otherAppeals.click();
    await elementByXpath('//option[contains(text(),\'No\')]').click();
    await this.continueBtn.click();
  }

  async legalRepDetailsPage() {
    await BrowserWaits.waitForPresenceOfElement(this.legalRepName);
    await this.legalRepName.fill('John Doe');
    await this.legalRepRef.fill('101010');
    await this.continueBtn.click();
    await BrowserWaits.waitForSeconds(3);
  }
}

module.exports = IACCase;
