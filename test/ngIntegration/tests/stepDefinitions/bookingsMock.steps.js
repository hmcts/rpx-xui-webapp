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

const workAllocationDateUtil = require("../../../e2e/features/pageObjects/workAllocation/common/workAllocationDateUtil");
const { LOG_LEVELS } = require('../../../e2e/support/constants');

defineSupportCode(function ({ And, But, Given, Then, When }) {

    Given('I set mock for existing bookings', async function (bookingDatatAble) {
        const bookingsTestData = bookingDatatAble.hashes();
        for (const booking of bookingsTestData){
            if ( "beginTime" in  booking ){
                booking["beginTime"] = workAllocationDateUtil.getDateInDays(booking["beginTime"])
            }
            if ("endTime" in booking) {
                booking["endTime"] = workAllocationDateUtil.getDateInDays(booking["endTime"])
            }
        }
        CucumberReporter.AddJson(bookingsTestData, LOG_LEVELS.Debug); 
        bookingsMockData.setUpBookings(bookingsTestData);
    });

    Given('I set mock locations for bookings', async function (bookinglocations) {
        const locationsHashes = bookinglocations.hashes();
      
        bookingsMockData.setupLocations(locationsHashes);
    });

});
