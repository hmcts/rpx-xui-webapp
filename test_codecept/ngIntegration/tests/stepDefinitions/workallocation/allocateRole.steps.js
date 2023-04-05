var { defineSupportCode } = require('cucumber');

// const MockApp = require('../../../../nodeMock/app');
// const workAllocationMockData = require('../../../mockData/workAllocation/mockData');

const BrowserWaits = require('../../../../e2e/support/customWaits');
const WACasesTable = require('../../../../e2e/features/pageObjects/workAllocation/casesTable');

const caseDetailsPage = require('../../pageObjects/caseDetailsPage');

const SoftAssert = require('../../../util/softAssert');
;
const CucumberReporter = require('../../../../codeceptCommon/reportLogger');
const browserUtil = require('../../../util/browserUtil');

const waMockData = require('../../../mockData/workAllocation/mockData');

// const ArrayUtil = require("../../../../e2e/utils/ArrayUtil");


    const waCasesTable = new WACasesTable();


    Then('I validate find person request body from reference {string}', async function (requesrRef, datatable) {

        try{
            await BrowserWaits.waitForCondition(() => global.scenarioData[requesrRef] !== null);
            const res = global.scenarioData[requesrRef];
            const datatableHashes = datatable.rowsHash();
            for (const key of Object.keys(datatableHashes)) {
                expect(res.searchOptions[key], `${key} value is mismatched`).to.equal(datatableHashes[key]);
            }
        }
        catch(err){
            global.scenarioData[requesrRef] = null;
            throw new Error(err); 
        }

    });
