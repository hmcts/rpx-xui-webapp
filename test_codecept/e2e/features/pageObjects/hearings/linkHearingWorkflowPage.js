const { $, elementByXpath, selectOption } = require('../../../../helpers/globals');

class LinkHearingWorkflowPage{
  get pages() {
    return {
      'Which hearings should be linked?': $('exui-linked-hearings-with-case'),
      'How should these linked hearings be heard?': $('exui-linked-hearings-how-to-heard'),
      'Check your answers': $('exui-linked-hearings exui-check-your-answers')
    };
  }

  get continueButton()  { return elementByXpath('//button[contains(text(),"Continue")]'); }
  get linkHearingsBtn() { return elementByXpath('//button[contains(text(),"Link hearings")]'); }

  get confirmationBanner() { return $('exui-linked-hearings-final-confirmation exui-hearing-confirmation'); }

  async isCaseTableDisplayed(caseId){
    return await elementByXpath(`//th[contains(text(),'${caseId}')]`).isVisible();
  }

  async selectCaseHearing(caseRef, hearing){
    await elementByXpath(`//th[contains(text(),'${caseRef}')]/../../..//td[contains(text(),'${hearing}')]/..//input`).click();
  }

  async selectRadioOptionHowLinked(option){
    await elementByXpath(`//label[contains(text(),'${option}')]/../input`).click();
  }

  async selectHearingOrder(caseId, order){
    const selectElement = elementByXpath(`//caption/..//td/a[contains(text(),'${caseId}')]/../../td/select`);
    await selectOption(selectElement, order);
  }
}

module.exports = new LinkHearingWorkflowPage();
