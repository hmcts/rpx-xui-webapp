
const BrowserWaits = require('../../support/customWaits');
const TaskMessageBanner = require("./messageBanner");
const RuntimeTestData = require('../../support/runtimeTestData');
const CucumberReportLogger = require('../../support/reportLogger');
const { Select, GovUKRadios } = require("../../utils/domElements");
const config = require('../../config/functional.conf');

class CaseFlagsPages {

    activeFlagsCount = -1;
    totalFlagsCount = -1;
    constructor() {

        this.caseFlagId = '1660859139477705';
        this.caseFlagsCountInfo = {};
        this.totalFlagsCount = -1;
        this.caseEditPageHeader = $('.govuk-form-group h1');
        this.nextButton = element(by.xpath("//button[text() = 'Next']"));
        this.submitButton = element(by.xpath("//button[text() = 'Submit']"));
        this.commentsTextField = $('#flagComments');
        this.notificationBanner = $('ccd-notification-banner');
        this.caseFlagFields = {
            heading: $('ccd-case-flag-table  tr:nth-child(1) td:nth-child(1)'),
            comment: $('ccd-case-flag-table  tr:nth-child(1) td:nth-child(2)'),
            creationDate: $('ccd-case-flag-table  tr:nth-child(1) td:nth-child(3)'),
            lastModifiedDate: $('ccd-case-flag-table  tr:nth-child(1) td:nth-child(4)')
        };
        this.caseFlagStatus = $$('ccd-case-flag-table  tr td:nth-child(5)  strong');
        this.optionsList = $$('#conditional-radios-list div:nth-child(2)');

        //case flag case creation
        this.caseCreationData = {
            case_level_cf_type: $('#caseFlags_roleOnCase'),
            case_level_cf_partyname: $('#caseFlags_partyName'),
            party_level_cf_type: $('#CaseFlag3_roleOnCase'),
            party_level_cf_partyname: $('#CaseFlag3_partyName'),
            continue: $('button[type=submit]'),
            submit: $('button[type=submit]'),
            return: $('button[type=submit]')
        }
    }

    async getCaseFlagOptions(){
        let optionsDomElement = new GovUKRadios('css', '#conditional-radios-list');
        let optionsList = await optionsDomElement.getOptions();
        return optionsList;
    }

    async createCaseLevelCaseFlags(datatable){
        console.log(datatable);
        const caseFlagsDataTable = datatable.hashes();
        caseFlagsDataTable.forEach( async row =>  {
            await this.caseCreationData[ row ['field']].sendKeys(row ['value']);
        });
        await BrowserWaits.waitForElementClickable(this.caseCreationData.continue);
        await this.caseCreationData.continue.click();
        await BrowserWaits.waitForElementClickable(this.caseCreationData.submit);
        await this.caseCreationData.submit.click();
        await BrowserWaits.waitForElementClickable(this.caseCreationData.return);
        await this.caseCreationData.return.click();
        await browser.sleep(5000);
        let caseUrl = await browser.getCurrentUrl();
        console.log(caseUrl);
        this.caseFlagId = caseUrl.match(/\d{16}/)[0];
    }

    async navigateToCreatedCaseFlagsPage(){
        await browser.get(config.config.baseUrl + '/cases/case-details/' + this.caseFlagId);
        await browser.sleep(5000);
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