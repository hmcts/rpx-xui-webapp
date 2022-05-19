var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');

const browserUtil = require('../../util/browserUtil');
const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../e2e/support/reportLogger');
const dummyCaseDetails = require('../../../nodeMock/ccd/caseDetails_data');
const bookingsMockData = require('../../../nodeMock/workAllocation/bookingsData');

const headerpage = require('../../../e2e/features/pageObjects/headerPage');

const { getTestJurisdiction, getMockJurisdictionWorkbaseketConfig, getMockJurisdictionSearchInputConfig } = require('../../mockData/ccdCaseMock');
const getEventConfig = require('../../mockData/ccdMockEventConfigs');


defineSupportCode(function ({ And, But, Given, Then, When }) {

    Given('I set mock for existing bookings', async function (bookingDatatAble) {
        const bookingsTestData = bookingDatatAble.hashes(); 
        bookingsMockData.setUpBookings(bookingsTestData);
    });

});
