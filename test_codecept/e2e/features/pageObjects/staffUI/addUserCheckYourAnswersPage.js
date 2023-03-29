

class AddUserCheckYourAnswersPage {

    constructor() {
        this.container = $('exui-staff-user-check-answers')
        this.heading = $('exui-staff-user-details h1')
        this.summaryListRows = $$('exui-staff-user-check-answers .govuk-summary-list__row')

        this.backLink = $('exui-staff-main-container .govuk-back-link')
        this.submitButton = element(by.xpath(`//button[contains(text(),'Submit')]`))
        this.cancelButton = element(by.xpath(`//button[contains(text(),'Cancel')]`))
        
    }

    async isDisplayed() {
        await this.container.wait()
        return await this.container.isDisplayed();
    }

    async getUserDetails() {
        await this.container.wait()
        const userDetails = {};
        const count = await this.summaryListRows.count();

        for (let i = 0; i < count; i++) {
            const row = this.summaryListRows.get(i)
            const name = await row.$('.govuk-summary-list__key').getText()
            const value = await row.$('.govuk-summary-list__value').getText()

            userDetails[name] = value;

        }
        return userDetails;
    }

    async clickChangeLinkFor(fieldName){
        await this.container.wait()
        let link = null;
        const count = await this.summaryListRows.count();

        const fieldsList = []
        for (let i = 0; i < count; i++) {
            const row = this.summaryListRows.get(i)
            const name = await row.$('.govuk-summary-list__key').getText()
            fieldsList.push(name)
            if (name === fieldName){
                link = row.$('a');
                break;
            }
        }
        if (!link) {
            throw new Error(`${fieldName} with change link not found in ${fieldsList}`);
        }
        await link.click();
    }
}

module.exports = new AddUserCheckYourAnswersPage();
