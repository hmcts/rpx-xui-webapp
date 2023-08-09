
const CucumberReportLogger = require('../../../codeceptCommon/reportLogger');

const BrowserWaits = require("../../support/customWaits");
const SoftAssert = require('../../../ngIntegration/util/softAssert');
const browserUtil = require('../../../ngIntegration/util/browserUtil');

const { DataTableArgument } = require('codeceptjs');


const hearingTabPage = require('../pageObjects/hearings/hearingsTabPage')
const createHearingWorkflow = require('../pageObjects/hearings/createhearingWorkflow')

Then('I see hearings tab displayed', async function () {
    await BrowserWaits.retryWithActionCallback(async () => {
        expect(await hearingTabPage.isHearingsTabDisplayed()).to.be.true
    })
});

When('I click Request a hearing button', async function(){
    await hearingTabPage.clickRequestHearingButton()
});

Then('I see create hearing workflow container', async function () {
    await BrowserWaits.retryWithActionCallback(async () => {
        expect(await createHearingWorkflow.isCreateHearingWorkflowDIsplayed()).to.be.true
    })
});
