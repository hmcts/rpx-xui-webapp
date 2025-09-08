const { $, $$, elementByXpath } = require('../../../../helpers/globals');
const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');
const cucumberReporter = require('../../../../codeceptCommon/reportLogger');
const { LOG_LEVELS } = require('../../../support/constants');

class TaskActionPage extends TaskList {
  get taskAssignmentContainer() {
    return $('exui-task-action-container');
  }
  get pageHeaderTitle() {
    return $('exui-task-action-container #main-content h1');
  }
  get actionDescription() {
    return $('#main-content>div>div>p');
  }
  get unassignBtn() {
    return elementByXpath('//exui-task-action-container//button[contains(text(),"Unassign")]');
  }
  get cancelBtn() {
    return elementByXpath('//exui-task-action-container//button[contains(text(),"Cancel")]');
  }
  get submitBtn() {
    return $('exui-task-action-container button#submit-button');
  }
  get cancelLink() {
    return elementByXpath('//exui-task-action-container//p/a[contains(text(),"Cancel")]');
  }
  get bannerMessageContainer() {
    return $('exui-info-message');
  }
  get infoMessages() {
    return $$('exui-info-message .hmcts-banner__message');
  }
  get taskDetailsRow() {
    return $('exui-task-action-container exui-task-list table tbody tr');
  }
  get taskColumnHeader() {
    return $('exui-task-action-container exui-task-list table thead th button');
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

  async getActionDescription() {
    await BrowserWaits.waitForElement(this.actionDescription);
    return await this.actionDescription.textContent();
  }

  async clickCancelLink() {
    await BrowserWaits.waitForElement(this.cancelLink);
    await this.cancelLink.click();
  }

  async getSubmitBtnActionLabel() {
    await BrowserWaits.waitForElement(this.submitBtn);
    return await this.submitBtn.textContent();
  }

  async clickSubmit() {
    await BrowserWaits.waitForElement(this.submitBtn);
    await this.submitBtn.click();
  }

  async clickUnassignBtn() {
    expect(await this.amOnPage(), 'Not on task action page').to.be.true;
    await this.unassignBtn.click();
  }

  async clickCancelBtn() {
    expect(await this.amOnPage(), 'Not on task action page').to.be.true;
    await this.cancelBtn.click();
  }

  async clickSubmitBtn(action) {
    const verb = this.getSubmitBtnText(action);
    expect(await this.amOnPage(), 'Not on task action page').to.be.true;
    const submitBtn = elementByXpath(`//exui-task-action-container//button[contains(text(),"${verb}")]`);
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
    return messages.some(msg => msg.includes(messageText));
  }

  async getColumnValue(columnHeader) {
    await this.waitForTable();
    return await this.getColumnValueForTaskAt(columnHeader, 1);
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
    const submitBtn = elementByXpath(`//exui-task-action-container//button[contains(text(),"${verb}")]`);
    await BrowserWaits.waitForElement(this.pageHeaderTitle);

    if (softAssert) {
      await softAssert.assert(async () => expect(await submitBtn.isVisible()).to.be.true);
      await softAssert.assert(async () => expect(await this.cancelBtn.isVisible()).to.be.true);
    } else {
      expect(await submitBtn.isVisible()).to.be.true;
      expect(await this.cancelBtn.isVisible()).to.be.true;
    }
  }

  getSubmitBtnText(action) {
    switch (action) {
      case 'Reassign task': return 'Reassign';
      case 'Unassign task': return 'Unassign';
      case 'Mark as done':
      case 'Cancel task': return action;
      default: return '';
    }
  }
}

module.exports = new TaskActionPage();
