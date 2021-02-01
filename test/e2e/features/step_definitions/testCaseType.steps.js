var CaseManager = require('../pageObjects/common/CaseManager');
const BrowserWaits = require("../../support/customWaits");
const CucumberReportLogger = require('../../support/reportLogger');
var TcPage = require('../pageObjects/tcPage');


var { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ And, But, Given, Then, When }) {
    let tcPage = new TcPage();
    let caseManager = new CaseManager();

    Then('Validate workbasket inputs against the API response', async function () {
        await tcPage.validateWorkbasketInputs();
    })

    Then('Validate workbasket inputs complex values against the API response', async function () {
        await tcPage.validateWorkbasketInputsComplexValues();
    })

    Then('validating the case list header against the api response', { timeout: 120 * 1000 }, async function () {
        let reqPath = `data/internal/searchCases?ctid=xuiTestCaseType&use_case=WORKBASKET&view=WORKBASKET&state=caseAdded&page=1`
        let expectedList = await tcPage.caseResultsThTitleApiRes(reqPath);
        if (expectedList) {
            let e = element(by.xpath(`//*[@id = 'content']//table//h2[contains(text(),'Case List')]`));
            await BrowserWaits.waitForElement(e);
            await BrowserWaits.waitForElementTime($('ccd-search-result .pagination-top'), 120000);
            let actualList = await tcPage.workBasketHeaders(1);
            expect(actualList).to.eql(expectedList);
        }
    });

    Then('Validate search inputs against the API response', async function () {
        await tcPage.validateSearchInputs();
    })

    Then('Validating the search inputs case list headers against api response', { timeout: 120 * 1000 }, async function () {
        let reqPath = `data/internal/searchCases?ctid=xuiTestCaseType&use_case=SEARCH&view=SEARCH&page=1`
        let expectedList = await tcPage.caseResultsThTitleApiRes(reqPath);
        if (expectedList) {
            let e = element(by.xpath(`//*[@id = 'content']//table//h2[contains(text(),'Case List')]`));
            await BrowserWaits.waitForElement(e);
            await BrowserWaits.waitForElementTime($('ccd-search-result .pagination-top'), 120000);
            let actualList = await tcPage.workBasketHeaders(0);
            expect(actualList).to.eql(expectedList);
        }
    });

    Then('I should be able to see tabs in case details page', async function () {
        await tcPage.seeCaseDetailsPageTabs();
    });

    Then('I should be validate tab details in case details page', async function () {
        await tcPage.caseDetailsCheck();
    });

    Then('Validate Case event next step trigger actions', async function () {
        let expectedList = await tcPage.nextStepTriggerApiRes();
        let apiRes = await tcPage.nextStepTriggerActions();
        expect(apiRes).to.eql(expectedList);
    });

    Then('Validate Case event update populating form page', async function () {
        await tcPage.clickNextStepTriggerActions();
    });

    Then('Validate create case form pages fields against the api response', async function () {
        var caseData = {
            "Reference": "1610530239070028",
            "Appicant Postcode": "SW19 8JW"
        };
        await caseManager.createCase(caseData, false, true);
    });
    
    Then('I should be able to fill the form pages', async function () {
        var caseData = {
            "Reference": "1610530239070028",
            "Appicant Postcode": "SW19 8JW"
        };
        await caseManager.createCase(caseData, false);
    });

    Then('Should be able to see check your answers summary page links', async function () {
        await tcPage.validateSummeryPageLinks();
    });

    Then('Validate check your answer summery page', async function () {
        let data = await caseManager._appendFormPageValues("", "", "tcPage");
        await tcPage.validateCheckYouranswerPage(data);
    });

    Then('Validate mandatory fields functionality', async function(){
        await tcPage.validateMandatoryFields();
    });

    Then('Validate event pages display show condition logic', async function(){
        await tcPage.eventPageDisplayShowCondition();
    });
    
})