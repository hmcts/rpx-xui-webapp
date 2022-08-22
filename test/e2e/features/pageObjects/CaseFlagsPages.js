
const BrowserWaits = require('../../support/customWaits');
const { GovUKRadios } = require("../../utils/domElements");
const config = require('../../config/functional.conf');
const caseDetailsPage = require('./caseDetailsPage');

class CaseFlagsPages {

    totalFlagsCount = -1;
    constructor() {
        
        this.caseFlagId = '';
        this.caseCreated = false;
        this.caseFlagsCountInfo = {};
        this.totalFlagsCount = -1;
        this.caseEditPageHeader = $('.govuk-form-group h1');
        this.nextButton = element(by.xpath("//button[text() = 'Next']"));
        this.submitButton = element(by.xpath("//button[text() = 'Submit']"));
        this.previousButton = element(by.xpath("//button[text() = 'Previous']"));
        this.cancelOption = $('ccd-case-edit-submit form p a');
        this.continueButton = element(by.xpath("//button[text() = 'Continue']"));
        this.statusButton = $('.govuk-grid-row div button');
        this.statusField = $('ccd-update-flag .govuk-tag');
        this.commentsTextField = $('#flagComments');
        this.notificationBanner = $('ccd-notification-banner');
        this.caseHomeEventBanner = $('exui-case-home exui-alert');
        this.caseFlagFields = {
            heading: $('ccd-case-flag-table  tr:nth-child(1) td:nth-child(1)'),
            comment: $('ccd-case-flag-table  tr:nth-child(1) td:nth-child(2)'),
            creationDate: $('ccd-case-flag-table  tr:nth-child(1) td:nth-child(3)'),
            lastModifiedDate: $('ccd-case-flag-table  tr:nth-child(1) td:nth-child(4)')
        };
        this.caseFlagStatus = $$('ccd-case-flag-table  tr td:nth-child(5)  strong');
        this.optionsList = $$('#conditional-radios-list div:nth-child(2)');
        this.otherFlagType = $('#other-flag-type-description');
        this.reviewCreateCaseFlagsFields = $$('ccd-case-flag-summary-list dt');
        this.reviewCreatedCaseFlagsValues = $$('ccd-case-flag-summary-list dd');
        this.changeButton = element(by.linkText('Change'));
        this.errorSummaryHeadings = $$('ccd-case-edit .govuk-error-summary');
        this.errorSummaryField = $('ccd-case-edit .govuk-error-message');

        //case flag case creation
        this.caseCreationData = {
            case_level_cf_type: $('#caseFlags_roleOnCase'),
            case_level_cf_partyname: $('#caseFlags_partyName'),
            party_level_cf_type: $('#CaseFlag1_roleOnCase'),
            party_level_cf_partyname: $('#CaseFlag1_partyName'),
            continue: $('button[type=submit]'),
            submit: $('button[type=submit]'),
            return: $('button[type=submit]')
        }
    }

    static async setTotalFlagsCountInfo() {
        let flagStatusCounts = {};
        let caseFlagsStatus = await $$('ccd-case-flag-table  tr td:nth-child(5)  strong').getText();
        flagStatusCounts['TOTAL'] = caseFlagsStatus.length;
        caseFlagsStatus.forEach(function (x) { flagStatusCounts[x] = (flagStatusCounts[x] || 0) + 1; });
        this.caseFlagsCountInfo = flagStatusCounts;
    }

    static getTotalFlagsCountInfo() {
        return this.caseFlagsCountInfo;
    }

    async enterOtherFlagType(text) {
        await this.otherFlagType.sendKeys(text);
    }

    async getCaseFlagOptions() {
        let optionsDomElement = new GovUKRadios('css', '#conditional-radios-list');
        await BrowserWaits.waitForElementClickable(this.optionsList);
        let optionsList = await optionsDomElement.getOptions();
        return optionsList;
    }

    async createCaseLevelCaseFlags(datatable) {
        if (this.caseCreated) {
            return;
        }
        const caseFlagsDataTable = datatable.hashes();
        caseFlagsDataTable.forEach(async row => {
            await BrowserWaits.waitForElement(this.caseCreationData[row['field']]);
            await this.caseCreationData[row['field']].sendKeys(row['value']);
        });
        await BrowserWaits.waitForElementClickable(this.caseCreationData.continue);
        await this.caseCreationData.continue.click();
        await BrowserWaits.waitForElementClickable(this.caseCreationData.submit);
        await this.caseCreationData.submit.click();
        await BrowserWaits.waitForElementClickable(this.caseCreationData.return);
        await this.caseCreationData.return.click();
        await BrowserWaits.waitForElement(this.caseHomeEventBanner);
        let caseUrl = await browser.getCurrentUrl();
        this.caseFlagId = caseUrl.match(/\d{16}/)[0];
        this.caseCreated = true;
    }

    async navigateToCreatedCaseFlagsPage() {
        await browser.get(config.config.baseUrl + '/cases/case-details/' + this.caseFlagId);
        await caseDetailsPage.amOnPage();
    }

    async amOnPage() {
        await CaseFlagsPages.setTotalFlagsCountInfo();
        let notificationBannerText = await this.notificationBanner.getText();
        let activeFlagsCount = notificationBannerText.match(/\d+/)[0];
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
        if (optionText !== 'Other') {
            await this.nextButton.click();
        }
    }

    async enterTextFieldValue(text) {
        await this.commentsTextField.sendKeys(text);
        await this.nextButton.click();
    }

    async submit() {
        await BrowserWaits.waitForElementClickable(this.submitButton);
        await this.submitButton.click();
    }

    async getBannerText() {
        await caseDetailsPage.amOnPage();
        await BrowserWaits.waitForElement(this.notificationBanner);
        return await this.notificationBanner.getText();
    }

    async deactivateFlag() {
        await BrowserWaits.waitForElementClickable(this.statusButton);
        await this.statusButton.click();
    }

    async manageFlagStatus(statusBefore, statusAfter, comment) {

    }

}

module.exports = CaseFlagsPages;
