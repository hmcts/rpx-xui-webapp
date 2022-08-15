
const BrowserWaits = require('../../support/customWaits');
const TaskMessageBanner = require("./messageBanner");
const RuntimeTestData = require('../../support/runtimeTestData');
const CucumberReportLogger = require('../../support/reportLogger');
const { Select, GovUKRadios } = require("../../utils/domElements");

class CaseFlagsPages {

    constructor() {

        this.caseEditPageHeader = $('.govuk-form-group h1');
        this.nextButton = element(by.xpath("//button[text() = 'Next']"));
        this.submitButton = element(by.xpath("//button[text() = 'Submit']"));
        this.commentsTextField = $('#flagComments');
        this.notificationBanner = $('ccd-notification-banner');

        this.caselistComponent = $('.case-list-component');

        this.jurisdictionSelectElement = $("#wb-jurisdiction");
        this.caseTypeSelectElement = $("#wb-case-type");
        this.stateSelectElement = $("#wb-case-state");

        this.searchApplyBtn = $("ccd-workbasket-filters form button:not(.button-secondary)");
        this.searchReset = $("ccd-workbasket-filters form button.button-secondary");

        this.searchFilterContainer = $("ccd-workbasket-filters form");

        this.searchResultsTopPagination = $("ccd-search-result .pagination-top");
        this.noResultsNotification = $("ccd-search-result .notification");

        this.ccdCaseSearchResult = $('ccd-search-result');
        this.caseListRows = $$("ccd-search-result>table>tbody>tr");

        //case list pagination navigation
        this.paginationInfotext = $(".pagination-top span");

        this.paginationControlsContainer = $(".ngx-pagination");
        this.previousPageLink = $(".ngx-pagination .pagination-previous a");
        this.nextPageLink = $(".ngx-pagination .pagination-next a");

        this.sortColumnsIconLinks = $$(".search-result-column-sort a.sort-widget");

        //Case list selection feature elements
        this.tableHeaderSelectAllInput = $("ccd-search-result #select-all");
        this.caseSelectionCheckboxes = $$("td .govuk-checkboxes__input");
        this.shareCaseButton = $("#btn-share-button");
        this.resetCaseSelectionLink = $("a.search-result-reset-link");

        //ccd-case-viewer
        this.ccdCaseViewer = $("ccd-case-viewer");

        this.loadingSpinner = $(".loading-spinner-in-action");

        this.taskInfoMessageBanner = new TaskMessageBanner(".case-list-component");

    }

    async amOnCreateACaseFlagPage(caseFlagsPageHeader) {
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