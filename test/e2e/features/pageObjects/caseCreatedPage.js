BasePage = require('./basePage');
class CaseCreatedPage extends BasePage{

  constructor() {
    super();
    this.header = '.govuk-width-container > exui-case-details > h1';

  }

  async getPageHeader(){
    return await $(this.header).getText();
  }

  async amOnPage(){
    let header = await this.getPageHeader();

    return header === 'Case Details Page';
  }
}

module.exports = CaseCreatedPage;
