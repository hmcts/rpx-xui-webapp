const { $ } = require('../../../../../helpers/globals');
const partyCaseFlags = require('./partyCaseFlagsTable');

class HearingRequirementsPage {
  get pageContainer() {
    return $('exui-hearing-requirements');
  }

  async getPartiesWithCaseFlagsDisplayed() {
    return await partyCaseFlags.getPartiesWithCaseFlagsDisplayed();
  }

  async getCaseFlagsDisplayedForParty(partyName) {
    return await partyCaseFlags.getCaseFlagsDisplayedForParty(partyName);
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }
}

module.exports = HearingRequirementsPage;
