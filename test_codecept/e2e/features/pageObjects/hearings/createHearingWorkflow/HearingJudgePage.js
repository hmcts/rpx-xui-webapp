const { $, elementByXpath } = require('../../../../../helpers/globals');

class HearingJudgePage {

  get pageContainer() {
    return $('exui-hearing-judge');
  }

  get specificJudgeRadio()   { return $('#specificJudgeName'); }
  get noSpecificJudgeRadio() { return $('#noSpecificJudge');   }

  get excludeJudgeSearchInput() { return $('#inputSelectPersonExclude'); }

  get excludeJdgeBtn() {
    return elementByXpath(
      "//div[contains(@class,'govuk-button')][contains(text(),'Exclude judge')]"
    );
  }

  get searchJudicialUserContainer() {
    return elementByXpath(
      "//div[contains(@class,'govuk-radios__conditional')]//h1[contains(text(),'Name of the judge')]/../../xuilib-search-judicials"
    );
  }

  get searchJudicialUserInput() {
    return elementByXpath(
      "//div[contains(@class,'govuk-radios__conditional')]//h1[contains(text(),'Name of the judge')]/../../xuilib-search-judicials//input"
    );
  }

  get judgeTypesContainer() {
    return elementByXpath(
      "//div[contains(@class,'govuk-radios__conditional')]//h1[contains(text(),'Select all judge types that apply')]"
    );
  }

  get fieldmapping() {
    return {
      'Do you want a specific judge?':           $('#specific-judge-selection'),
      'Exclude a judge':                         elementByXpath(
        "//div[contains(text(),'Exclude a judge')]"
      ),
      'Name of the judge':                       elementByXpath(
        "//h1[contains(text(),'Name of the judge')]"
      ),
      'Select all judge types that apply':       elementByXpath(
        "//h1[contains(text(),'Select all judge types that apply')]"
      )
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Do you want a specific judge?':
        if (value.toLowerCase().includes('yes')) {
          await this.specificJudgeRadio.click();
        } else {
          await this.noSpecificJudgeRadio.click();
        }
        break;
      case 'Exclude a judge':
        const valueMap = value.split(',');
        await this.excludeJudgeSearchInput.type(valueMap[0].trim(), { delay: 75 });
        await this.selectJudgeUserToExclude(valueMap[1].trim());
        await this.excludeJdgeBtn.click();
        break;
      case 'Name of the judge':
        const judgeName = value.split(',');
        await this.searchJudicialUserInput.type(judgeName[0].trim(), { delay: 75 });
        await this.selectJudge(judgeName[1].trim());
        break;
      case 'Select all judge types that apply':
        const judgeTypes = value.split(',');
        for (const val of judgeTypes) {
          await this.selectJudgeType(val.trim());
        }
        break;
      default:
        throw new Error(`${field} is not recognised`);
    }
  }

  async selectIsSpecificJudgeRequired(boolVal) {
    if (boolVal) {
      await this.specificJudgeRadio.click();
    } else {
      await this.noSpecificJudgeRadio.click();
    }
  }

  async selectJudgeType(judgeType) {
    const ele = elementByXpath(`//div[contains(@class, 'govuk-radios__conditional')]//h1[contains(text(),'Select all judge types that apply')]/../../div[@id ='judgeTypes']//label[contains(text(),'${judgeType}')]/../input`);
    await ele.click();
  }

  async selectJudgeUserToExclude(value) {
    const ele = elementByXpath(`//div[contains(@class,'mat-autocomplete-panel')]//mat-option//span[contains(text(),'${value}')]`);
    await ele.click();
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }

  async selectJudge(judge) {
    const ele = elementByXpath(`//div[contains(@class,'mat-autocomplete-panel')]//mat-option//span[contains(text(),'${judge}')]`);
    await ele.click();
  }
}

module.exports = HearingJudgePage;
