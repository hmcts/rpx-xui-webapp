
const CucumberReportLogger = require('../../support/reportLogger');

var { defineSupportCode } = require('cucumber');
const BrowserWaits = require("../../support/customWaits");
const caseDetailsPage = require("../pageObjects/caseDetailsPage");

defineSupportCode(function ({ And, But, Given, Then, When }) {
   
    Then('I see case details tab label {string} is displayed is {string}', async function (tabLabel, boolString) {
        await BrowserWaits.retryWithActionCallback(async () => {
            expect(await caseDetailsPage.isTabWithLabelPresent(tabLabel)).to.equal(boolString.toLowerCase().includes('true'))
        });

    });

    Then('I see case details tab label {string} displayed', async function(tabLabel){
        await BrowserWaits.retryWithActionCallback(async () => {
            expect(await caseDetailsPage.isTabWithLabelPresent(tabLabel)).to.be.true
        });
        
    });

    Then('I see case details tab label {string} not displayed', async function (tabLabel) {
        await BrowserWaits.retryWithActionCallback(async () => {
            expect(await caseDetailsPage.isTabWithLabelPresent(tabLabel)).to.be.false
        });

    });


    Then('I see case details tab with label {string} is selected', async function (tabLabel){
        await BrowserWaits.retryWithActionCallback(async () => {
            expect(await caseDetailsPage.isTabWithLabelSelected(tabLabel)).to.be.true
        });
    });

    Then('I see case details tab with label {string} is not selected', async function (tabLabel) {
        await BrowserWaits.retryWithActionCallback(async () => {
            expect(await caseDetailsPage.isTabWithLabelSelected(tabLabel)).to.be.false
        });
    });

    When('I click tab with label {string} in case details page', async function (tabLabel) {
        await BrowserWaits.retryWithActionCallback(async () => {
            await caseDetailsPage.clickTabWithLabel(tabLabel)    
        });
    });

    Then('I see case details page displayed with tab {string} selected', async function(tabLabel){
        expect(await caseDetailsPage.amOnPage(),'Not on case details page').to.be.true;
        expect(await caseDetailsPage.isTabWithLabelPresent(tabLabel), `Tab with label "${tabLabel}" is not present or displayed`).to.be.true;
        expect(await caseDetailsPage.isTabWithLabelSelected(tabLabel), `Tab with label "${tabLabel}" is not selected`).to.be.true;
    });
});
