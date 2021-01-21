var CaseManager = require('../pageObjects/common/CaseManager');
const BrowserWaits = require("../../support/customWaits");
const CucumberReportLogger = require('../../support/reportLogger');
var TcPage = require('../pageObjects/tcPage');


var { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ And, But, Given, Then, When }) {
    let tcPage = new TcPage();

    Then('Validate workbasket inputs against the API response', async function(){
        await tcPage.validateWorkbasketInputs();
    })

    Then('Validate workbasket inputs complex values against the API response', async function(){
        await tcPage.validateWorkbasketInputsComplexValues();
    })

    Then('validating the case list header against the api response', {timeout : 120*1000} ,async function(){
        let reqPath = `data/internal/searchCases?ctid=xuiTestCaseType&use_case=WORKBASKET&view=WORKBASKET&state=caseAdded&page=1`
        let expectedList = await tcPage.caseResultsThTitleApiRes(reqPath);
        if(expectedList){
            let e = element(by.xpath(`//*[@id = 'content']//table//h2[contains(text(),'Case List')]`));
            await BrowserWaits.waitForElement(e);
            await BrowserWaits.waitForElementTime($('ccd-search-result .pagination-top'), 120000);
            let actualList = await tcPage.workBasketHeaders(1);
            expect(actualList).to.eql(expectedList);
        }
    });
    
    Then('Validate search inputs against the API response', async function(){
        await tcPage.validateSearchInputs();
    })

    Then('Validating the search inputs case list headers against api response', {timeout : 120*1000} ,async function(){
        let reqPath = `data/internal/searchCases?ctid=xuiTestCaseType&use_case=SEARCH&view=SEARCH&page=1`
        let expectedList = await tcPage.caseResultsThTitleApiRes(reqPath);
        if(expectedList){
            let e = element(by.xpath(`//*[@id = 'content']//table//h2[contains(text(),'Case List')]`));
            await BrowserWaits.waitForElement(e);
            await BrowserWaits.waitForElementTime($('ccd-search-result .pagination-top'), 120000);
            let actualList = await tcPage.workBasketHeaders(0);
            expect(actualList).to.eql(expectedList);
        }
    });

})