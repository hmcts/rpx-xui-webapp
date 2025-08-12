const { $, $$, elementByXpath } = require('../../../../helpers/globals');
const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');
const cucumberReporter = require('../../../../codeceptCommon/reportLogger');
const { LOG_LEVELS } = require('../../../support/constants');

class TaskAssignmentPage extends TaskList {
  get taskAssignmentContainer() {
    return $('exui-task-container-assignment');
  }
  get pageHeaderTitle() {
    return $('exui-task-container-assignment #main-content h1');
  }
  get actionDescription() {
    return $('#main-content>div>div>p');
  }
  get caseWorkerSelect() {
    return $('exui-task-assignment select#task_assignment_caseworker');
  }
  get locationSelect() {
    return $('exui-task-assignment select#task_assignment_location');
  }
  get reassignBtn() {
    return elementByXpath('//exui-task-container-assignment//button[contains(text(),"Reassign")]');
  }
  get unassignBtn() {
    return elementByXpath('//exui-task-container-assignment//button[contains(text(),"Unassign")]');
  }
  get cancelBtn() {
    return elementByXpath('//exui-task-container-assignment//button[contains(text(),"Cancel")]');
  }
  get bannerMessageContainer() {
    return $('exui-info-message');
  }
  get infoMessages() {
    return $$('exui-info-message .hmcts-banner__message');
  }
  get taskDetailsRow() {
    return $('exui-task-container-assignment exui-task-list table tbody tr');
  }
  get taskColumnHeader() {
    return $('exui-task-container-assignment exui-task-list table thead th button');
  }
  get chooseColleageHeader() {
    return elementByXpath('//exui-task-container-assignment//h2[contains(text(),"Choose a colleague")]');
  }

  async amOnPage() {
    try {
      await BrowserWaits.waitForElement(this.taskAssignmentContainer);
      return true;
    } catch (err) {
      console.log('Task assignment page not displayed: ' + err);
      return false;
    }
  }

  async isManageLinkPresent() {
    const task = await this.getTableRowAt(1);
    return await task.locator('button[id^="manage_"]').isVisible();
  }

  async getPageHeader() {
    await BrowserWaits.waitForElement(this.pageHeaderTitle);
    return await this.pageHeaderTitle.textContent();
  }

  async getCaseworkerOptions() {
    expect(await this.amOnPage(), 'Not on Task assignment page ').to.be.true;
    return this.getOptionsFromSelect(this.caseWorkerSelect);
  }

  async getLocationOptions() {
    expect(await this.amOnPage(), 'Not on Task assignment page ').to.be.true;
    return this.getOptionsFromSelect(this.locationSelect);
  }

  async getOptionsFromSelect(selectElement) {
    const options = selectElement.locator('option');
    const count = await options.count();
    const values = [];
    for (let i = 0; i < count; i++) {
      values.push(await options.nth(i).textContent());
    }
    return values;
  }

  async selectCaseworker(optionDisplayText) {
    expect(await this.amOnPage(), 'Not on Task assignment page ').to.be.true;
    await this.caseWorkerSelect.locator(`xpath=./option[text() = '${optionDisplayText}']`).click();
  }

  async selectLocation(optionDisplayText) {
    expect(await this.amOnPage(), 'Not on Task assignment page ').to.be.true;
    await this.locationSelect.locator(`xpath=./option[text() = '${optionDisplayText}']`).click();
  }

  async selectLocationAtpos(pos) {
    await $(`#task_assignment_location option:nth-of-type(${pos})`).click();
  }

  async selectcaseworkerAtpos(pos) {
    await $(`#task_assignment_caseworker option:nth-of-type(${pos})`).click();
  }

  async clickReassignBtn() {
    expect(await this.amOnPage(), 'Not on task assignment page').to.be.true;
    await this.reassignBtn.click();
  }

  async clickUnassignBtn() {
    expect(await this.amOnPage(), 'Not on task assignment page').to.be.true;
    await this.unassignBtn.click();
  }

  async clickCancelBtn() {
    expect(await this.amOnPage(), 'Not on task assignment page').to.be.true;
    await this.cancelBtn.click();
  }

  async clickSubmitBtn(action) {
    const verb = this.getSubmitBtnText(action);
    expect(await this.amOnPage(), 'Not on task assignment page').to.be.true;
    const submitBtn = elementByXpath(`//exui-task-container-assignment//button[contains(text(),"${verb}")]`);
    await submitBtn.click();
  }

  async isBannerMessageDisplayed() {
    try {
      await BrowserWaits.waitForElement(this.bannerMessageContainer);
      return true;
    } catch (err) {
      cucumberReporter.AddMessage('message banner not displayed: ' + err, LOG_LEVELS.Error);
      return false;
    }
  }

  async getBannerMessagesDisplayed() {
    expect(await this.isBannerMessageDisplayed(), 'Message banner not displayed').to.be.true;
    const count = await this.infoMessages.count();
    const messages = [];
    for (let i = 0; i < count; i++) {
      const message = await this.infoMessages.nth(i).textContent();
      messages.push(...message.split('\n'));
    }
    return messages;
  }

  async isBannermessageWithTextDisplayed(messageText) {
    const messages = await this.getBannerMessagesDisplayed();
    return messages.some(message => message.includes(messageText));
  }

  async isTaskDisplayed() {
    try {
      await BrowserWaits.waitForElement(this.taskDetailsRow);
      return true;
    } catch (err) {
      console.log('Task assignment row not displayed: ' + err);
      return false;
    }
  }

  async isColumnWithHeaderDisplayed() {
    expect(await this.isTaskDisplayed(), 'Task details row not displayed').to.be.true;
    return this.taskColumnHeader.isVisible();
  }

  async validatePageContentForAction(action, softAssert) {
    const verb = this.getSubmitBtnText(action);
    const submitBtn = elementByXpath(`//exui-task-container-assignment//button[contains(text(),"${verb}")]`);

    await BrowserWaits.waitForElement(this.caseWorkerSelect);
    if (softAssert) {
      await softAssert.assert(async () => expect(await this.chooseColleageHeader.isVisible()).to.be.true);
      await softAssert.assert(async () => expect(await this.caseWorkerSelect.isVisible()).to.be.true);
      await softAssert.assert(async () => expect(await this.locationSelect.isVisible()).to.be.true);
      await softAssert.assert(async () => expect(await submitBtn.isVisible()).to.be.true);
      await softAssert.assert(async () => expect(await this.cancelBtn.isVisible()).to.be.true);
    } else {
      expect(await this.chooseColleageHeader.isVisible()).to.be.true;
      expect(await this.caseWorkerSelect.isVisible()).to.be.true;
      expect(await this.locationSelect.isVisible()).to.be.true;
      expect(await submitBtn.isVisible()).to.be.true;
      expect(await this.cancelBtn.isVisible()).to.be.true;
    }
  }

  getSubmitBtnText(action) {
    switch (action) {
      case 'Reassign task':
        return 'Reassign';
      case 'Unassign task':
        return 'Unassign';
      case 'Mark as done':
      case 'Cancel task':
        return action;
      default:
        return '';
    }
  }
}

module.exports = new TaskAssignmentPage();