var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../../nodeMock/app');
const workAllocationMockData = require('../../../mockData/workAllocation/mockData');

const BrowserWaits = require('../../../../e2e/support/customWaits');
const WACasesTable = require('../../../../e2e/features/pageObjects/workAllocation/casesTable');

const caseDetailsPage = require('../../pageObjects/caseDetailsPage');

const SoftAssert = require('../../../util/softAssert');
;
const CucumberReporter = require('../../../../e2e/support/reportLogger');
const browserUtil = require('../../../util/browserUtil');

const waMockData = require('../../../mockData/workAllocation/mockData');

const ArrayUtil = require('../../../../e2e/utils/ArrayUtil');

defineSupportCode(function ({ And, But, Given, Then, When }) {
  const waCasesTable = new WACasesTable();

  Given('I set Mock WA case {string} property values', async function (view, datatable) {
    const datatableHashes = datatable.hashes();

    const cases = waMockData[view];
    for (const wacase of datatableHashes){
      cases.cases[parseInt(wacase.index)][wacase.key] = wacase.value;
    }
  });
});
