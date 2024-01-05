const browserWaits = require('../../../support/customWaits')
const viewOrEditHearingPage = require('../../pageObjects/hearings/viewOrEditHearingPage')
const editHearingPage = require('../../pageObjects/hearings/editHearingPage')

const reportLogger = require('../../../../codeceptCommon/reportLogger')

const createHearingWorkflow = require('../../pageObjects/hearings/createHearingWorkflow/createhearingWorkflow')


function getPageObject(page) {
    const pageObj = createHearingWorkflow.pages[page];
    if (pageObj === null || pageObj === undefined) {
        throw Error(`page object for page not configured or miss spelled: ${page} ${Object.keys(createHearingWorkflow.pages)}`)
    }
    return pageObj;
}


Then('I validate view or edit hearing page displayed', async function(){
    await browserWaits.retryWithActionCallback(async () => {
        expect(await viewOrEditHearingPage.container.isDisplayed()).to.be.true
        expect(await viewOrEditHearingPage.headerElement.getText()).to.include('View or edit hearing')
    })
})

Then('I validate Edit hearing page displayed', async function () {
    await browserWaits.retryWithActionCallback(async () => {
        expect(await editHearingPage.container.isDisplayed()).to.be.true
        expect(await editHearingPage.headerElement.getText()).to.include('Edit hearing')

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
        if (expectedChangeLinkDisplayed.includes('true')) {
            expect(await viewOrEditHearingPage.isChangeLinkDisplayedForKeyField(field)).to.be.true
        } else {
            expect(await viewOrEditHearingPage.isChangeLinkDisplayedForKeyField(field)).to.be.false
        }

        const values = await viewOrEditHearingPage.getKeyFieldValue(field);
        const isValueDisplayed = values.filter(v => v.includes(expectedVal))
        const isAmendedLabelDisplayed = values.filter(v => v.includes(expectedVal) && v.includes('AMENDED'))
        if (expectedAmendFlagDisplayed.includes('true')) {
            expect(isAmendedLabelDisplayed.length > 0, `Field:${field} to include label AMENDED actual ${expectedAmendFlagDisplayed}`).to.be.true
        } else {
            expect(isAmendedLabelDisplayed.length === 0, `Field:${field} to not include label AMENDED actual ${expectedAmendFlagDisplayed}`).to.be.true
        }

        expect(isValueDisplayed.length > 0, `Field:${field} to include value ${expectedVal} actual ${values}`).to.be.true

    }
})

Then('I validate edit hearing section heating labels', async function (datatable){
    const fields = datatable.parse().hashes()
    for(const row of fields){
        const heading = row.Heading
        const expectedLabel = row.Label
        const actualLabel = await viewOrEditHearingPage.getSectionHeadingLabel(heading)
        if (expectedLabel === ''){
            expect(actualLabel === null, `${heading} expected no label, actual displayed ${actualLabel}`).to.be.true
        }else{
            expect(actualLabel, `${heading} expected label did not match`).to.includes(expectedLabel)
        }


    }
})

When('In view or edit hearing page, I click change link for field {string}', async function(field){
    await viewOrEditHearingPage.clickChangeLinkForField(field)
})

When('In view or edit hearing page, I click Submit updated request', async function (field) {
    await viewOrEditHearingPage.clickChangeLinkForField(field)
})


Then('I validate edit heating change links and navigation', async function(datatable){
    const validationPages = datatable.parse().hashes()
    for (const validationPage of validationPages){
        const changeLinkFor = validationPage.changeLinkFor
        const navigationPage = validationPage.navigationPage
        const pageHeader = validationPage.pageHeader
        await browserWaits.retryWithActionCallback(async () => {
            reportLogger.AddMessage(`Validation of ${changeLinkFor}, ${navigationPage}`)
            await viewOrEditHearingPage.clickChangeLinkForField(changeLinkFor)

            const navigationPageObject = getPageObject(navigationPage);
            await browserWaits.retryWithActionCallback(async () => {
                expect(await navigationPageObject.isDisplayed(), `For change link ${changeLinkFor}, ${navigationPage} not displayed`).to.be.true
            });

            const actualheaderCaption = await $('span.govuk-caption-l').getText()
            reportLogger.AddMessage(`page header expected ${pageHeader}, actual ${actualheaderCaption}`)
            expect(actualheaderCaption).to.includes(pageHeader)
        })
        await createHearingWorkflow.continueBtn.click();
    }


})


Then('In edit hearing page warning message banner isDisplayed {string}', async function (boolVal) {
    if (boolVal.toLowerCase().includes('true')) {
        expect(await editHearingPage.isWarningTextBannerDisplayed()).to.be.true
    } else {
        expect(await editHearingPage.isWarningTextBannerDisplayed()).to.be.false
    }

})

Then('In edit hearing page warning message banner contains {string}', async function (warning) {
    expect(await editHearingPage.getWarningBanerText()).to.includes(warning)
})


