
const BrowserWaits = require('../../support/customWaits');
const TaskMessageBanner = require("./messageBanner");
const RuntimeTestData = require('../../support/runtimeTestData');
const CucumberReportLogger = require('../../support/reportLogger');
const { Select, GovUKRadios } = require("../../utils/domElements");

class CaseFlagsPages {

    activeFlagsCount = -1;
    totalFlagsCount = -1;
    constructor() {

        this.caseFlagsCountInfo = {};
        this.totalFlagsCount = -1;
        this.caseEditPageHeader = $('.govuk-form-group h1');
        this.nextButton = element(by.xpath("//button[text() = 'Next']"));
        this.submitButton = element(by.xpath("//button[text() = 'Submit']"));
        this.commentsTextField = $('#flagComments');
        this.notificationBanner = $('ccd-notification-banner');
        this.caseFlagStatus = $$('ccd-case-flag-table  tr td:nth-child(5)  strong');
        this.optionsList = $$('#conditional-radios-list div:nth-child(2)');
    }

    static async setTotalFlagsCountInfo(){
        let flagStatusCounts = {};
        let caseFlagsStatus = await $$('ccd-case-flag-table  tr td:nth-child(5)  strong').getText();
        flagStatusCounts['TOTAL'] = caseFlagsStatus.length;
        caseFlagsStatus.forEach(function (x) { flagStatusCounts[x] = (flagStatusCounts[x] || 0) + 1; });
        console.log(flagStatusCounts);
        this.caseFlagsCountInfo = flagStatusCounts;
    }

    static getTotalFlagsCountInfo(){
        return this.caseFlagsCountInfo;
    }

    async amOnPage(){
        await CaseFlagsPages.setTotalFlagsCountInfo();
        let notificationBannerText = await $('ccd-notification-banner').getText();
        let activeFlagsCount = notificationBannerText.match(/\d+/)[0];
        console.log(activeFlagsCount);
        console.log(CaseFlagsPages.getTotalFlagsCountInfo());
        return Number(activeFlagsCount) === CaseFlagsPages.getTotalFlagsCountInfo()['ACTIVE'];
    }

    async amOnCreateACaseFlagPage(caseFlagsPageHeader) {
        await BrowserWaits.waitForElement(this.caseEditPageHeader);
        let headerText = await this.caseEditPageHeader.getText();
        return headerText.includes(caseFlagsPageHeader);
    }

    async amOnManageCaseFlagsPage(caseFlagsPageHeader) {
        await BrowserWaits.waitForElement(this.caseEditPageHeader);
        let headerText = await this.caseEditPageHeader.getText();
        return headerText.includes(caseFlagsPageHeader);
    }

    async selectCaseFlagOption(optionText) {
        await browser.sleep(10000);
        let optionToSelect = new GovUKRadios('css', '#conditional-radios-list');
        await optionToSelect.selectOption(optionText);
        await this.nextButton.click();
    }

    async selectCaseFlagOptionNumber(count) {
        await browser.sleep(10000);
        let optionToSelect = new GovUKRadios('css', '#conditional-radios-list');
        await optionToSelect.selectOptionNumber(count - 1);
        //await this.optionsList.get(count).click();
        await this.nextButton.click();
    }

    async enterTextFieldValue(text) {
        await this.commentsTextField.sendKeys(text);
        await this.nextButton.click();
    }

    async submit() {
        await browser.sleep(10000);
        await BrowserWaits.waitForElementClickable(this.caseEditPageHeader);
        await this.submitButton.click();
    }

    async getBannerText() {
        await browser.sleep(20000);
        return await this.notificationBanner.getText();
    }

    async manageFlagStatus(statusBefore, statusAfter, comment) {

    }

}

module.exports = CaseFlagsPages;