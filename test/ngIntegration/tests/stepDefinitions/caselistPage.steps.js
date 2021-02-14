var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');

const caseListPage = require('../pageObjects/caselistPage');

const browserUtil = require('../../util/browserUtil');
const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../e2e/support/reportLogger');
const BrowserWaits = require('../../../e2e/support/customWaits');
const headerpage = require('../../../e2e/features/pageObjects/headerPage');

const { getTestJurisdiction } = require('../../mockData/ccdCaseMock');


defineSupportCode(function ({ And, But, Given, Then, When }) {

    Then('I see case list page displayed', async function () {
        expect(await caseListPage.amOnPage(), "Case list page is not displayed").to.be.true;
    });

    Then('I validate workbasket {string} fields displayed', async function(workbasketConfigReference){
        const workbasketConfigurator = global.scenarioData[workbasketConfigReference];
        for (const dynamicfield of workbasketConfigurator.getConfig().workbasketInputs) {
            expect(await caseListPage.isWorkbasketFilterDisplayed(dynamicfield)).to.be.true
        }

    });

    Then('I Validate case search request to contain filters from workbasket {string}', async function(workbasketConfigRef){
        const workbasketConfig = global.scenarioData[workbasketConfigRef].getConfig();
        let caseListReq = null;
        MockApp.addIntercept('/data/internal/searchCases', (req, res, next) => {
            console.log("Add intercpy called");
            caseListReq = req.query;
            next();
        })

        await MockApp.stopServer();
        await MockApp.startServer();

        const workbasketInputValues = {}
        for (const dynamicfield of workbasketConfig.workbasketInputs) {
            workbasketInputValues[dynamicfield.field.id] = await caseListPage.inputWorkbasketFilter(dynamicfield);
        }

        caseListReq = null;
        await caseListPage.clickApplyWorkbasketFilters();
        await BrowserWaits.waitForCondition(async () => caseListReq !== null);

        for (const key of Object.keys(workbasketInputValues)) {
            if (workbasketInputValues[key] instanceof Array) {
                workbasketInputValues[key].forEach((val, index) => {
                    expect(caseListReq["case." + key + "." + index]).to.equal(val);
                });
            } else {
                expect(caseListReq["case." + key]).to.equal(workbasketInputValues[key]);
            }
        }
    });


    Then('I validate workbasket fixed list items for workbasket {string}', async function(workbasketConfigRef){
        const workbasketConfig = global.scenarioData[workbasketConfigRef].getConfig();

        for (const dynamicfield of workbasketConfig.workbasketInputs) {
            if (dynamicfield.field.field_type.type.includes("List")) {
                const fieldConfigList = dynamicfield.field.field_type.fixed_list_items;
                const listValuesRendered = await caseListPage.getFieldListValues(dynamicfield);
                expect(listValuesRendered.length, JSON.stringify(listValuesRendered) + " " + JSON.stringify(fieldConfigList)).to.equal(fieldConfigList.length)
                fieldConfigList.forEach(listItem => {
                    expect(listValuesRendered.includes(listItem.code)).to.be.true
                });

            } else if (dynamicfield.field.field_type.type.includes("YesOrNo")) {
                const listValuesRendered = await caseListPage.getFieldListValues(dynamicfield);
                expect(listValuesRendered.length).to.equal(2);
                ["Yes", "No"].forEach(item => {
                    expect(listValuesRendered.includes(item)).to.be.true
                });
            }
            expect(await caseListPage.isWorkbasketFilterDisplayed(dynamicfield)).to.be.true
        }
    });


});
