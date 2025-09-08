const { $, $$, getText } = require('../../../../../helpers/globals');
const { LOG_LEVELS } = require('../../../../support/constants');
const BrowserWaits = require('../../../../support/customWaits');
const CucucmberReporter = require('../../../../../codeceptCommon/reportLogger');

class SelectRoleTypePage {
  get container() { return $('exui-task-assignment-choose-role'); }
  get header() { return $('exui-task-assignment-choose-role h1'); }
  get headerCaption() { return $('exui-task-assignment-choose-role h1 span'); }
  get roleSelectQuestion() { return $('exui-task-assignment-choose-role exui-choose-radio-option p'); }

  get rolesRadios() { return $$('exui-task-assignment-choose-role exui-choose-radio-option fieldset div .govuk-radios__item'); }

  async amOnPage() {
    try {
      await BrowserWaits.waitForElement(this.container);
      return true;
    } catch (err) {
      await CucucmberReporter.AddMessage(err, LOG_LEVELS.Error);
      return false;
    }
  }

  async getRoleTypesElements() {
    const countOfRoles = await this.rolesRadios.count();
    const rolesElements = {};
    for (let i = 0; i < countOfRoles; i++) {
      const roleElement = await this.rolesRadios.nth(i);
      let label = await getText(roleElement.locator('label'));
      label = label.trim();
      rolesElements[label] = roleElement.locator('input');
    }
    return rolesElements;
  }

  async getRoleTypes() {
    const rolesTypeElements = await this.getRoleTypesElements();
    return Object.keys(rolesTypeElements);
  }

  async getRoleTypeElement(roleType) {
    const rolesTypeElements = await this.getRoleTypesElements();
    return rolesTypeElements[roleType];
  }

  async selectRoleType(roleType) {
    const roleTypeInput = await this.getRoleTypeElement(roleType);
    await roleTypeInput.click();
  }
}

module.exports = new SelectRoleTypePage();
