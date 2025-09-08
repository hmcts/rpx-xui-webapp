const { $, elementByXpath } = require('../../../../helpers/globals');

class UpdateFlagPage {
  constructor(flagType) {
    this.flagType = flagType;
  }

  get container() {
    return elementByXpath(
      `//ccd-update-flag//label[contains(text(),"${this.flagType}")]`
    );
  }

  /* ───────── static elements ───────── */
  get flagStatusContainer() {
    return elementByXpath('//div[contains(@id,"flag-status-container")]');
  }

  get describeReasonTextarea() {
    return $('#flagStatusReasonChange');
  }

  get translationCheckbox() {
    return elementByXpath(
      '//label[contains(text(),"I need to add a translation")]/..//input'
    );
  }

  get inactiveButton() {
    return elementByXpath(
      '//div[contains(@id,"flag-status-container-v1")]//button'
    );
  }

  get commentsLabel() {
    return elementByXpath(
      `//ccd-update-flag//label[contains(text(),"${this.flagType} comments")]`
    );
  }

  get statusHeading() {
    return elementByXpath(
      `//ccd-update-flag//h1[contains(@id,"update-flag-status-heading") and contains(text(),"${this.flagType} status")]`
    );
  }

  byName(name) {
    switch (name) {
      case 'Flag status': return this.flagStatusContainer;
      case 'Describe reason for status change': return this.describeReasonTextarea;
      case 'I need to add a translation': return this.translationCheckbox;
      case `${this.flagType} comments`: return this.commentsLabel;
      case `${this.flagType} status`: return this.statusHeading;
      default:
        throw new Error(`Unknown field mapping: "${name}"`);
    }
  }

  async inputValue(field, value) {
    switch (field) {
      case `${this.updateFlagFor} comments`:
        const commentsEle = elementByXpath(`//ccd-update-flag//label[contains(text(),'${field}')]/../textarea`);
        await commentsEle.fill(value);
        break;
      case `${this.updateFlagFor} status`:
        const statusEle = elementByXpath(`//ccd-update-flag//h1[contains(@id,'update-flag-status-heading')]/../..//label[contains(text(),'${value}')]/..//input`);
        await statusEle.click();
        break;
      case 'Describe reason for status change':
        await this.fieldMapping[field].fill(value);
        break;
      case 'I need to add a translation':
        await this.fieldMapping[field].click();
        break;
      case 'Flag status':
        await this.flagStatusInactiveButton.click();
        break;
      default:
        throw new Error(`${field} not confired in test page object`);
    }
  }
}
module.exports = UpdateFlagPage;

