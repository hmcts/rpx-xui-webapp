

class StaffUIUserDEtailsPage{

    constructor(){
        this.container = $('exui-staff-user-details')
        this.heading = $('exui-staff-user-details h2')
        this.summaryListRows = $$('exui-staff-user-details .govuk-summary-list .govuk-summary-list__row')


        this.copyButton = element(by.xpath(`//div[contains(@class, 'govuk-button-group')]//button[contains(text(),'Copy')]`))
        this.updateButton = element(by.xpath(`//div[contains(@class, 'govuk-button-group')]//button[contains(text(),'Update')]`))
        this.restoreButton = element(by.xpath(`//div[contains(@class, 'govuk-button-group')]//button[contains(text(),'Restore')]`))
    }

    async isDisplayed(){
        await this.container.wait()
        return await this.container.isDisplayed();
    }

    async getUserDetails(){
        const userDetails = {};
        const count = await this.summaryListRows.count();

        for(let i = 0 ; i < count; i++){
            const row = this.summaryListRows.get(i)
            const name = await row.$('.govuk-summary-list__key').getText()
            const value = await row.$('.govuk-summary-list__value').getText()
            userDetails[name] = value;

        }
        return userDetails;
    }
}

module.exports = new StaffUIUserDEtailsPage();
