class CaseCreatedPage {

  constructor() {
    this.header = element(by.xpath('//h1'));

  }

  async getPageHeader(){
    return await $(this.header).getText();
  }

  async amOnPage(){
    return this.header.isDisplayed();
  }
}

module.exports = CaseCreatedPage;
