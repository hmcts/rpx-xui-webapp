const browserWaits = require('../../../support/customWaits')
const viewOrEditHearingPage = require('../../pageObjects/hearings/viewOrEditHearingPage')
const reportLogger = require('../../../../codeceptCommon/reportLogger')

Then('I validate view or edit hearing page displayed', async function(){
    await browserWaits.retryWithActionCallback(async () => {
        expect(await viewOrEditHearingPage.container.isDisplayed()).to.be.true
        expect(await viewOrEditHearingPage.headerElement.getText()).to.include('View or edit hearing')
    })
})

Then('I validate Edit hearing page displayed', async function () {
    await browserWaits.retryWithActionCallback(async () => {
        expect(await viewOrEditHearingPage.container.isDisplayed()).to.be.true
        expect(await viewOrEditHearingPage.headerElement.getText()).to.include('Edit hearing')

    })
})


Then('I validate fields displayed in view or edit hearing page', async function (datatable) {
    const fields = datatable.parse().hashes()

    for(const row of fields){
        const field = row.field
        const expectedVal = row.value
        const expectedChangeLinkDisplayed = row.changeLinkDisplay
        const expectedAmendFlagDisplayed = row.amendedFlagDisplay

        reportLogger.AddMessage(`Validating: ${JSON.stringify(row)}`)
        expect(await viewOrEditHearingPage.isKeyFieldDisplayed(field)).to.be.true
        expect(await viewOrEditHearingPage.getKeyFieldValue(field)).to.includes(expectedVal)
        if (expectedChangeLinkDisplayed.includes('true')){
            expect(await viewOrEditHearingPage.isChangeLinkDisplayedForKeyField(field)).to.be.true
        }else{
            expect(await viewOrEditHearingPage.isChangeLinkDisplayedForKeyField(field)).to.be.false
        }

        if (expectedAmendFlagDisplayed.includes('true')) {
            expect(await viewOrEditHearingPage.isAmendedFlagDisplayedForKeyField(field)).to.be.true
        } else {
            expect(await viewOrEditHearingPage.isAmendedFlagDisplayedForKeyField(field)).to.be.false
        }


    }
})

When('In view or edit hearing page, I click change link for field {string}', async function(field){
    await viewOrEditHearingPage.clickChangeLinkForField(field)
})

When('In view or edit hearing page, I click Submit updated request', async function (field) {
    await viewOrEditHearingPage.clickChangeLinkForField(field)
})


