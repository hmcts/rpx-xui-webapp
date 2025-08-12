const { $, elementByXpath, selectOption } = require('../../../../helpers/globals');

class EditHearingStageAndResultPage{
  get container() {
    return $('exui-hearing-stage-result');
  }

  get hearingStageSelect() {
    return $('#hearing-stage');
  }

  get hearingResultRadios() {
    return elementByXpath('//h1[contains(text(),"Hearing result")]/../../div[contains(@class,"govuk-radios")]');
  }

  get saveAndContinueButton() {
    return elementByXpath('//button[contains(text(),\'Save and continue\')]');
  }

  async selectHearingStage(stage){
    await selectOption(this.hearingStageSelect, { label: stage });
  }

  async selectHearingResult(result){
    const e = elementByXpath(`//h1[contains(text(),'Hearing result')]/../..//label[contains(text(),'${result}')]/../input`);
    await e.click();
  }
}

module.exports = new EditHearingStageAndResultPage();
