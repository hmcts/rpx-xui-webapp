

class AddUserCheckYourAnswersPage {

    constructor() {
        this.container = $('exui-staff-user-check-answers')
        this.heading = $('exui-staff-user-details h1')
        this.summaryListRows = $$('exui-staff-user-check-answers .govuk-summary-list__row')


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
}

module.exports = new AddUserCheckYourAnswersPage();
