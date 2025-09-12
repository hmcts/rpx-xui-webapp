const { $ } = require('../../../../../helpers/globals');

class HearingLinkPage{
  get pageContainer()   { return $('exui-hearing-link'); }

  get hearingLink_yes() { return $('.govuk-form-group input[name="hearingLink"][value="yes"]'); }
  get hearingLink_no()  { return $('.govuk-form-group input[name="hearingLink"][value="no"]'); }

  get fieldMapping() {
    return {
      'Will this hearing need to be linked to other hearings?':
        $('.govuk-form-group input[name="hearingLink"]')
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Will this hearing need to be linked to other hearings?':
        if (value.toLowerCase().includes('yes')){
          await this.hearingLink_yes.click();
        } else {
          await this.hearingLink_no.click();
        }
        break;
      default:
        throw new Error(`${field} is not recognised`);
    }
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }
}

module.exports = HearingLinkPage;
