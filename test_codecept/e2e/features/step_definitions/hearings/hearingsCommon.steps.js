
const createHearingWorkflow = require('../../pageObjects/hearings/createHearingWorkflow/createhearingWorkflow')
const reportLogger = require('../../../../codeceptCommon/reportLogger')

const browserWaits = require('../../../support/customWaits')


function getPageObject(page) {
    const pageObj = createHearingWorkflow.pages[page];
    if (pageObj === null || pageObj === undefined) {
        throw Error(`page object for page not configured or miss spelled: ${page} ${Object.keys(createHearingWorkflow.pages)}`)
    }
    return pageObj;
}


Then('I am on hearings workflow page {string}', async function (page) {
    await browserWaits.retryWithActionCallback(async () => {
        expect(await getPageObject(page).isDisplayed(), `${page} not displayed`).to.be.true
    })
})


Then('In hearings requirements page, I see case flags displayed for parties', async function (partiesDatatable) {
    const expectedPartyNames = partiesDatatable.parse().hashes();
    const hearingRequirementPage = getPageObject("Hearing requirements");
    const parties = await hearingRequirementPage.getPartiesWithCaseFlagsDisplayed()

    reportLogger.AddMessage(`Parties with case flags ${JSON.stringify(parties)}`)
    for (const party of expectedPartyNames){
        expect(parties).to.includes(party.partyName)
    }

})

Then('In hearings Participant attendance page, I see parties', async function (partiesDatatable){
    const expectedPartyNames = partiesDatatable.parse().hashes();
    const participantsPage = getPageObject("Participant attendance");
    const parties = await participantsPage.getPartiesDisplayed()

    reportLogger.AddMessage(`Parties  ${JSON.stringify(parties)}`)
    for (const party of expectedPartyNames) {
        expect(parties).to.includes(party.partyName)
    }

})

Then('In additional facilities page, I see case flags displayed for parties', async function (partiesDatatable){
    const expectedPartyNames = partiesDatatable.parse().hashes();
    const additionalFacilitiesPage = getPageObject("Do you require any additional facilities?");
    const parties = await additionalFacilitiesPage.getPartiesWithCaseFlagsDisplayed()

    reportLogger.AddMessage(`Parties with case flags ${JSON.stringify(parties)}`)
    for (const party of expectedPartyNames) {
        expect(parties).to.includes(party.partyName)
    }
})

