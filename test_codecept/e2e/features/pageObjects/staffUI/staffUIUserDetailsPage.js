const { $, $$, elementByXpath, getText } = require('../../../../helpers/globals');

class StaffUIUserDEtailsPage {
  get container() { return $('exui-staff-user-details'); }

  get heading() { return $('exui-staff-user-details h2'); }
  get summaryListRows() { return $$('exui-staff-user-details .govuk-summary-list .govuk-summary-list__row'); }

  get copyButton() { return elementByXpath('//div[contains(@class,"govuk-button-group")]//button[contains(text(),"Copy")]'); }
  get updateButton() { return elementByXpath('//div[contains(@class,"govuk-button-group")]//button[contains(text(),"Update")]'); }
  get restoreButton() { return elementByXpath('//div[contains(@class,"govuk-button-group")]//button[contains(text(),"Restore")]'); }

  async isDisplayed() {
    await this.container.wait();
    return await this.container.isVisible();
  }

  async getUserDetails() {
    const userDetails = {};
    const count = await this.summaryListRows.count();

    for (let i = 0; i < count; i++) {
      const row = this.summaryListRows.nth(i);
      const name = await getText(row.locator('.govuk-summary-list__key'));
      const value = await getText(row.locator('.govuk-summary-list__value'));
      userDetails[name] = value;
    }
    return userDetails;
  }
}

module.exports = new StaffUIUserDEtailsPage();
