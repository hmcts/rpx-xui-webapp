
const CucumberReportLogger = require('../../../codeceptCommon/reportLogger');

const BrowserWaits = require("../../support/customWaits");
const SoftAssert = require('../../../ngIntegration/util/softAssert');
const browserUtil = require('../../../ngIntegration/util/browserUtil');

const { DataTableArgument } = require('codeceptjs');


const hearingTabPage = require('../pageObjects/hearings/hearingsTabPage')

Then('I see hearings tab displayed', async function () {
    await BrowserWaits.retryWithActionCallback(async () => {
        expect(await hearingTabPage.isHearingsTabDisplayed()).to.be.true
    })
});
