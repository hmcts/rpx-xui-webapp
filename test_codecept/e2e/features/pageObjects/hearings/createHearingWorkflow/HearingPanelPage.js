const { $, elementByXpath } = require('../../../../../helpers/globals');

class HearingPanelPage{
  get pageContainer()                { return $('exui-hearing-panel'); }

  get specificPanelSelection()       { return $('#specificPanelSelection'); }
  get noSpecificPanel()              { return $('#noSpecificPanel'); }

  get includePanelMemberSearchInput(){ return elementByXpath("//div[contains(text(),'Include specific panel members')]/..//xuilib-search-judicials//input"); }
  get excludePanelMemberSearchInput(){ return elementByXpath("//div[contains(text(),'Exclude specific panel members')]/..//xuilib-search-judicials//input"); }

  get includePanelMemberBtn()        { return elementByXpath("//div[contains(text(),'Include specific panel members')]/..//div[contains(@class ,'govuk-button--secondary')]"); }
  get excludePanelMemberBtn()        { return elementByXpath("//div[contains(text(),'Exclude specific panel members')]/..//div[contains(@class ,'govuk-button--secondary')]"); }

  get fieldMapping() {
    return {
      'Do you require a panel for this hearing?': elementByXpath("//h1[contains(text(),'Do you require a panel for this hearing?')]"),
      'Include specific panel members'         : elementByXpath("//div[contains(text(),'Include specific panel members')]"),
      'Exclude specific panel members'         : elementByXpath("//div[contains(text(),'Exclude specific panel members')]"),
      'Or select any other panel roles required': $('#panel-role-selector')
    };
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }

  async inputValue(field, value){
    switch (field){
      case 'Do you require a panel for this hearing?':
        if (value.toLowerCase().includes('yes')){
          await this.specificPanelSelection.click();
        } else {
          await this.noSpecificPanel.click();
        }
        break;
      case 'Include specific panel members':
        const includeMembers = value.split(',');
        await this.includePanelMemberSearchInput.fill(includeMembers[0].trim());
        await this.selectPanelMember(includeMembers[1].trim());
        await this.includePanelMemberBtn.click();
        break;
      case 'Exclude specific panel members':
        const excludeMember = value.split(',');
        await this.excludePanelMemberSearchInput.fill(excludeMember[0].trim());
        await this.selectPanelMember(excludeMember[1].trim());
        await this.excludePanelMemberBtn.click();
        break;
      case 'Or select any other panel roles required':
        const values = value.split(',');
        for (const role of values){
          await this.selectPanelRole(role.trim());
        }
        break;
      default:
        throw new Error(`${field} not recognised.`);
    }
  }

  async selectPanelRole(role){
    const ele = elementByXpath(`//*[@id='panel-role-selector']//label[contains(text(),'${role}')]/../input`);
    await ele.click();
  }

  async selectPanelMember(member) {
    const ele = elementByXpath(`//div[contains(@class,'mat-autocomplete-panel')]//mat-option//span[contains(text(),'${member}')]`);
    await ele.click();
  }
}

module.exports = HearingPanelPage;
