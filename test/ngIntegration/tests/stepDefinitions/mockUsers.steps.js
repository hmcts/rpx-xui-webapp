var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');

const caseEditPage = require('../pageObjects/ccdCaseEditPages');

const browserUtil = require('../../util/browserUtil');
const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../e2e/support/reportLogger');
const dummyCaseDetails = require('../../../nodeMock/ccd/caseDetails_data');

const headerpage = require('../../../e2e/features/pageObjects/headerPage');
const workAlloctionMockData = require('../../../nodeMock/workAllocation/mockData');

const { getTestJurisdiction, getMockJurisdictionWorkbaseketConfig, getMockJurisdictionSearchInputConfig } = require('../../mockData/ccdCaseMock');
const getEventConfig = require('../../mockData/ccdMockEventConfigs');


defineSupportCode(function ({ And, But, Given, Then, When }) {
    Given('I set MOCK case workers', async function(datatable){
        const dtHashes = datatable.hashes();
        let i = 0;
        for (const hash of dtHashes){
            for(const key of Object.keys(hash)){
                workAlloctionMockData.caseWorkersList[i][key] = hash[key];
            } 
            i++;
            
        }
    });
});
