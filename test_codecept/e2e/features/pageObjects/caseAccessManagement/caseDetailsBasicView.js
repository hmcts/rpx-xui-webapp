const { $, elementByXpath, isPresent } = require('../../../../helpers/globals');

class CaseDetailsBasicView {
  constructor() {}

  get container() {
    return $('ccd-case-basic-access-view');
  }

  get bannerMessageContainer() {
    return $('ccd-case-basic-access-view .hmcts-banner__message');
  }

  get requestAccessButton() {
    return $('ccd-case-basic-access-view button');
  }

  async isRowDisplayedWithAttribute(key) {
    const e = elementByXpath(`//div[contains(@class,'govuk-summary-list__row')]/dt[contains(text(),'${key}')]`);
    return await isPresent(e);
  }

  async getAttributeValues(key) {
    const e = elementByXpath(`//div[contains(@class,'govuk-summary-list__row')]/dt[contains(text(),'${key}')]/../dd`);
    return await e.textContent();
  }
}

module.exports = new CaseDetailsBasicView();
