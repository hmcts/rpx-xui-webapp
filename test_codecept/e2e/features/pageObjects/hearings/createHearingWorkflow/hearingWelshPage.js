class HearingWelshPage {
  constructor() {
    this.pageContainer = $('exui-hearing-welsh');

    this.fieldMapping = {
      'Does this hearing need to be in Welsh?': element(by.xpath('//exui-hearing-welsh//h1[contains(text(),\'Does this hearing need to be in Welsh?\')]'))
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Does this hearing need to be in Welsh?':
        const div = value === 'Yes' ? 'div[1]' : 'div[2]';
        const ele = element(by.xpath(`//exui-hearing-welsh/div/form/div/fieldset/div[2]/${div}/label[contains(text(),'${value}')]/../input`));
        await ele.click();
        break;
      default:
        throw new Error(`${field} is not recognised`);
    }
  }

  async isDisplayed() {
    return await this.pageContainer.isDisplayed();
  }
}

module.exports = HearingWelshPage;
