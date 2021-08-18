var { defineSupportCode } = require('cucumber');
const reportLogger = require('../../../support/reportLogger');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');

const caseDetailsPage = require("../../pageObjects/caseDetailsPage");
const caseRolesAndAccessPage = require("../../pageObjects/workAllocation/caseRolesAccessPage");

const ArrayUtil = require('../../../utils/ArrayUtil');
const workflowUtil = require('../../pageObjects/common/workflowUtil');

const exclusionWorkFlow = require("../../pageObjects/workAllocation/exclusionRolesWorkFlow");

defineSupportCode(function ({ And, But, Given, Then, When }) {

    When('I search with text {string} in Find the person page', async function (searchText) {
        await findPersonPage.inputSearchTerm(searchText);
    });

    Then('I see following options returned to Select in Find person search result', async function (resultsDatatable) {
        const dataTablehashes = resultsDatatable.hashes();
        let retryCounter = 0;
        await BrowserWaits.retryWithActionCallback(async () => {
            await BrowserWaits.waitForSeconds(retryCounter * 2);
            retryCounter++;
            for (let i = 0; i < dataTablehashes.length; i++) {
                const expectedPerson = dataTablehashes[i]['Person'];
                const personExpectedIsReturned = await findPersonPage.isPersonReturned(expectedPerson);
                expect(personExpectedIsReturned, `${expectedPerson} is expected to retun in find person search is not retuned.`).to.be.true;
            }
        });

    });

    When('I select Person {string} from Find person search result', async function (selectPerson) {
        await findPersonPage.selectPerson(selectPerson);
    });


    Then('In workflow, I see find person page displayed with caption {string}', async function (findPersonCaption) {
        expect(global.scenarioData['workflow'], 'Workflow is undefined, add validation of work flow page step before actions on workflow page ').to.be.not.equal(undefined)
        const workFlowPage = workflowUtil.getWorlflowPageObject(global.scenarioData['workflow']);
        expect(await workFlowPage.findPersonPage.amOnPage()).to.be.true;
        expect(await workFlowPage.findPersonPage.getHeaderCaption()).to.contains(findPersonCaption);
    });

    When('In workflow, I enter search term {string} in find person input text', async function (searchterm) {
        const workFlowPage = workflowUtil.getWorlflowPageObject(global.scenarioData['workflow']);
        await workFlowPage.findPersonPage.inputSearchTerm(searchterm);
    });

    Then('In workflow, I see following options available in find person results', async function (findPersonResultsDatatable) {
        const workFlowPage = workflowUtil.getWorlflowPageObject(global.scenarioData['workflow']);

        await workFlowPage.findPersonPage.isSearchResultSelectionContainerDisplayed()

        const resultHashes = findPersonResultsDatatable.hashes();
        const softAssert = new SoftAssert();
        for (let i = 0; i < resultHashes.length; i++) {
            softAssert.setScenario(`Is result "${resultHashes[i].value}" displayed`);
            await softAssert.assert(async () => expect(await workFlowPage.findPersonPage.isPersonReturned(resultHashes[i].value)).to.be.true);
        }
        softAssert.finally();

    });

    When('In workflow, I select find person result {string}', async function (person) {
        const workFlowPage = workflowUtil.getWorlflowPageObject(global.scenarioData['workflow']);
        await workFlowPage.findPersonPage.selectPerson(person);
    });

    Then('In workflow, I see find person is selected with {string}', async function (person) {
        const workFlowPage = workflowUtil.getWorlflowPageObject(global.scenarioData['workflow']);
        expect(await workFlowPage.findPersonPage.isPersonSelected(person), `${person} is not selected`).to.be.true;
    });


});