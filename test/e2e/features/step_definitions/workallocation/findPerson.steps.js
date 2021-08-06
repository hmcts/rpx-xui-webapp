var { defineSupportCode } = require('cucumber');
const reportLogger = require('../../../support/reportLogger');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');

const caseDetailsPage = require("../../pageObjects/caseDetailsPage");
const caseRolesAndAccessPage = require("../../pageObjects/workAllocation/caseRolesAccessPage");

const ArrayUtil = require('../../../utils/ArrayUtil');

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



});