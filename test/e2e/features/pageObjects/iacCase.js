
var CaseManager = require("./common/CaseManager");
var CcdFields = require("./common/ccdFields");
var BrowserWaits = require('../../support/customWaits');

class IACCase {

    constructor() {
        this.caseManager = new CaseManager();
        this.ccdField = new CcdFields();

        this.continueBtn = element(by.xpath('//button[contains(text(),\'Continue\')]'));
        this.validationError = $(".validation-error");
        this.addNewBtn = element(by.xpath('//button[contains(text(),\'Add new\')]'));
        this.docUploadField = $("#uploadTheNoticeOfDecisionDocs_0_document");
        this.findAddressBtn = element(by.xpath('//button[contains(text(),\'Find address\')]'));
        this.firstOption = element(by.xpath('//option[@value=\'1: Object\']'));

        this.clientDetentionCheckbox = $("#checklist_checklist2-isNotDetained");
        this.clientEUDecisionCheckbox = $("#checklist_checklist7-isNotEUDecision");

        this.yesAppellantUK = element(by.xpath('//input[@id=\'appellantInUk_Yes\']'));

        this.HORefferenceField = $("#homeOfficeReferenceNumber");
        this.dayField = $("#homeOfficeDecisionDate-day");
        this.monthField = $("#homeOfficeDecisionDate-month");
        this.yearField = $("#homeOfficeDecisionDate-year");

        this.appelantTitle = $("#appellantTitle");
        this.appelantFirstName = $("#appellantGivenNames");
        this.appelantLastName = $("#appellantFamilyName");
        this.dayOfBirth = $("#appellantDateOfBirth-day");
        this.monthOfBirth = $("#appellantDateOfBirth-month");
        this.yearOfBirth = $("#appellantDateOfBirth-year");

        this.isStateless = $("#appellantStateless-isStateless");

        this.contacEmail =  element(by.xpath('//input[@id=\'contactPreference-wantsEmail\']'));
        this.emailField = $("#email");

        this.appealType = $("#appealType-revocationOfProtection");

        this.appealGrounds = $("#appealGroundsRevocation_values-revocationRefugeeConvention");

        this.noDeportation = $("#deportationOrderOptions_No");

        this.noNewMatters = $("#hasNewMatters_No");

        this.otherAppeals = $("#hasOtherAppeals");

        this.legalRepName = $("#legalRepName");
        this.legalRepRef = $("#legalRepReferenceNumber");

        this.yesFixedAddress = $("#appellantHasFixedAddress_Yes");
    }

    async createCase(isAccessibilityTest) {
        var caseData = {
            "Home Office Reference/Case ID" : "012345678",
            "Appeal number[0]." : "IA123451234",
            "Other appeals" : "No",
            "Has your client appealed against any other UK immigration decisions?": "No",

        };

        await this.caseManager.createCase(caseData, isAccessibilityTest);
    }

  async getErrorMessageMandatoryField(){
    await this.continueBtn.click();
    await BrowserWaits.waitForElement(this.validationError);
    return this.validationError.getText();
  }

  async tellUsAboutYourClientPage(){
    await this.clientDetentionCheckbox.click();
    await this.clientEUDecisionCheckbox.click();
    await BrowserWaits.waitForSeconds(3);
    await this.continueBtn.click();
  }

  async locationPage(){
    await BrowserWaits.waitForPresenceOfElement(this.yesAppellantUK);
    await this.yesAppellantUK.click();
    await this.continueBtn.click();
  }

  async homeOfficeDetailsPage(){
    await BrowserWaits.waitForPresenceOfElement(this.HORefferenceField);
    await this.HORefferenceField.sendKeys('012345678');
    await this.dayField.sendKeys('01');
    await this.monthField.sendKeys('01');
    await this.yearField.sendKeys('2021');
    await this.continueBtn.click();
  }

  async noticeOfDecisionPage(){
    await BrowserWaits.waitForPresenceOfElement(this.addNewBtn);
    await this.addNewBtn.click();
    await this.ccdField.docUpload();
    await this.ccdField.docDescriptionField();
    await BrowserWaits.waitForSeconds(3);
    await this.continueBtn.click();
  }

  async basicDetailsPage(){
    await BrowserWaits.waitForPresenceOfElement(this.appelantTitle);
    await this.appelantTitle.sendKeys('Miss');
    await this.appelantFirstName.sendKeys('Jane');
    await this.appelantLastName.sendKeys('Doe');
    await this.dayOfBirth.sendKeys('1');
    await this.monthOfBirth.sendKeys('1');
    await this.yearOfBirth.sendKeys('1990');
    await this.continueBtn.click();
  }

  async nationalityPage(){
    await BrowserWaits.waitForPresenceOfElement(this.isStateless);
    await this.isStateless.click();
    await this.continueBtn.click();
  }

  async addressPage(){
    await BrowserWaits.waitForPresenceOfElement(this.yesFixedAddress);
    await this.yesFixedAddress.click();
    await this.ccdField.postcodeLookup();
    await BrowserWaits.waitForSeconds(3);
    await BrowserWaits.waitForElementClickable(this.continueBtn);
    await this.continueBtn.click();
  }

  async contactPage(){
    await BrowserWaits.waitForPresenceOfElement(this.contacEmail);
    await this.contacEmail.click();
    await BrowserWaits.waitForSeconds(3);
    await BrowserWaits.waitForPresenceOfElement(this.emailField);
    await this.emailField.sendKeys('test@test.com')
    await this.continueBtn.click();
  }

  async appealTypePage(){
    await BrowserWaits.waitForPresenceOfElement(this.appealType);
    await this.appealType.click();
    await BrowserWaits.waitForSeconds(3);
    await this.continueBtn.click();
  }

  async appealGroundsPage(){
    await BrowserWaits.waitForPresenceOfElement(this.appealGrounds);
    await this.appealGrounds.click();
    await BrowserWaits.waitForElementClickable(this.continueBtn);
    await this.continueBtn.click();
  }

  async deportationOrderPage(){
    await BrowserWaits.waitForPresenceOfElement(this.noDeportation);
    await this.noDeportation.click();
    await this.continueBtn.click();
  }

  async newMattersPage(){
    await BrowserWaits.waitForPresenceOfElement(this.noNewMatters);
    await this.noNewMatters.click();
    await this.continueBtn.click();
  }

  async appealAgainstOtherDecisionsPage(){
    await BrowserWaits.waitForPresenceOfElement(this.otherAppeals);
    await this.otherAppeals.click();
    await element(by.xpath('//option[contains(text(),\'No\')]')).click();
    await this.continueBtn.click();
  }

  async legalRepDetailsPage(){
    await BrowserWaits.waitForPresenceOfElement(this.legalRepName);
    await this.legalRepName.sendKeys('John Doe');
    await this.legalRepRef.sendKeys('101010');
    await this.continueBtn.click();
    await BrowserWaits.waitForSeconds(3);
  }
}

module.exports = IACCase;
