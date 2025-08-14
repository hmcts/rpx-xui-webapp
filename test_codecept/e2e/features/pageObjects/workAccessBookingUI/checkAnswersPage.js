const { $, $$, getText } = require('../../../../helpers/globals');
const browserWaits = require('../../../support/customWaits');

class CheckAnswersPage {
  get pageContainer() { return $('exui-booking-check'); }
  get header() { return $('exui-booking-check h1'); }
  get headerCaption() { return $('exui-booking-check h1 span'); }
  get confirmButton() { return $('exui-booking-check button'); }
  get cancelLink() { return $('exui-booking-check .govuk-button-group a'); }
  get summaryList() { return $$('exui-booking-check .govuk-summary-list .govuk-summary-list__row'); }

  async waitForPage() {
    await browserWaits.waitForElement(this.pageContainer);
  }

  async isKeyDisplayed(key) {
    const summaryist = await this.getSummaryListDetails();

    const keyRow = summaryist.find((summaryItem) => summaryItem.key.includes(key));
    return keyRow !== null;
  }

  async iskeyWithValueDisplayed(key, value) {
    const keyValueRow = summaryist.find((summaryItem) => summaryItem.key.includes(key) && summaryItem.value.includes(value));
    return keyValueRow !== null;
  }

  async clickChangeLinkForRowWithkey(key) {
    const keyRow = summaryist.find((summaryItem) => summaryItem.key.includes(key));

    if (!keyRow) {
      throw new Error(`row with key ${key} is not found`);
    }
    await keyRow.change.click();
  }

  async getSummaryListDetails() {
    const count = await this.summaryList.count();

    const returnValues = [];
    for (let i = 0; i < count; i++) {
      const row = await await this.summaryList.nth(i);
      const key = await getText(row.locator('.govuk-summary-list__key'));
      const value = await getText(row.locator('.govuk-summary-list__value'));
      const changeLink = row.locator('.govuk-summary-list__actions a');

      returnValues.push({
        key: key,
        value: value,
        change: changeLink
      });
    }
    return returnValues;
  }
}

module.exports = new CheckAnswersPage();
