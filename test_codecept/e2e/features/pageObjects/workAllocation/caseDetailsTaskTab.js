const { $, $$, getText } = require('../../../../helpers/globals');
const browserUtil = require('../../../../ngIntegration/util/browserUtil');

class CaseDetailsTaskTab {
  get container() { return $('exui-tasks-container'); }
  get alertBanner() { return $('exui-tasks-container exui-task-alert-banner'); }
  get alertBannerHeading() { return $('.task-alert-banner h2'); }
  get alertBannerMessage() { return $('.task-alert-banner .govuk-warning-text'); }

  get activeTasksContainer() { return $('exui-tasks-container .active-tasks-container'); }
  get activeTasksHeading() { return $('exui-tasks-container .active-tasks-container h2'); }

  get tasks() { return $$('exui-tasks-container .active-tasks-container exui-case-task'); }

  get taskNameLocator() { return 'p strong'; }

  async getTaskContainerAtPosition(pos) {
    const taskCount = await this.tasks.count();
    if (taskCount < pos) {
      throw new Error(`Total Tasks displayed are ${taskCount}. Cannot get task at position ${pos}`);
    }
    return await this.tasks.nth(pos - 1);
  }

  async getTaskNameForTaskAtPosition(pos) {
    const taskContainer = await this.getTaskContainerAtPosition(pos);
    await browserUtil.scrollToElement(taskContainer);
    const taskName = await getText(taskContainer.locator(this.taskNameLocator));
    return taskName;
  }

  async getTaskContainerWithName(name) {
    const taskCount = await this.tasks.count();
    let returnVal = null;

    const tasksInPage = [];
    for (let i = 0; i < taskCount; i++) {
      const task = await this.tasks.nth(i);
      const taskName = await getText(task.locator(this.taskNameLocator));
      tasksInPage.push(taskName);
      if (taskName.includes(name)) {
        returnVal = task;
        break;
      }
    }
    if (returnVal === null) {
      throw new Error(`Task with name ${name} not found. ${tasksInPage.join(',')}`);
    }
    return returnVal;
  }

  async isAttributeDisplayedForTaskAtPos(pos, attributeName) {
    const taskAttributes = await this.getAttributeElementssDisplayedForTaskAtPos(pos);
    return Object.keys(taskAttributes).includes(attributeName);
  }

  async isAttributeDisplayedForTaskWithName(name, attributeName) {
    const taskAttributes = await this.getAttributesDisplayedForTaskWithName(name);
    return Object.keys(taskAttributes).includes(attributeName);
  }

  async getAttributeValueForAtPos(pos, attributeName) {
    const taskAttributes = await this.getAttributeElementssDisplayedForTaskAtPos(pos);
    return await getText(taskAttributes[attributeName]);
  }

  async getAttributeValueForTaskWithName(name, attributeName) {
    const taskAttributes = await this.getAttributesDisplayedForTaskWithName(name);
    return await getText(taskAttributes[attributeName]);
  }

  async clickLinkFromTaskAttribute(taskAttributes, attributeName, linktext) {
    const attribuetLink = await this.getAttributeLink(taskAttributes, attributeName, linktext);
    if (attribuetLink === null) {
      throw new Error(`Attribute link ${linktext} not is present`);
    }
    await attribuetLink.click();
  }

  async getAttributeLink(taskAttributes, attributeName, linktext) {
    const manageLinks = taskAttributes[attributeName].locator('a');
    const linksCount = await manageLinks.count();
    let linkElementToClick = null;
    let linksdisplayed = ';';
    for (let i = 0; i < linksCount; i++) {
      const linkElement = await manageLinks.nth(i);
      const linkElementText = await getText(linkElement);
      linksdisplayed = `${linksdisplayed}, ${linkElementText}`;
      if (linkElementText.includes(linktext)) {
        linkElementToClick = linkElement;
        break;
      }
    }

    return linkElementToClick;
  }

  async getAttributesDisplayedForTaskWithName(taskName) {
    const taskContainer = await this.getTaskContainerWithName(taskName);
    return await this.getTaskAttributeElementsFromTaskContainer(taskContainer);
  }

  async getAttributeElementssDisplayedForTaskAtPos(pos) {
    const taskContainer = await this.getTaskContainerAtPosition(pos);
    return await this.getTaskAttributeElementsFromTaskContainer(taskContainer);
  }

  async getTaskAttributeElementsFromTaskContainer(taskContainer) {
    const taskDetailsRows = taskContainer.locator('.govuk-summary-list__row');
    const rowsCount = await taskDetailsRows.count();
    const attributeElements = {};
    for (let i = 0; i < rowsCount; i++) {
      const row = taskDetailsRows.nth(i);
      const rowName = await getText(row.locator('.govuk-summary-list__key'));
      attributeElements[rowName] = row.locator('.govuk-summary-list__value');
    }

    return attributeElements;
  }

  async clickTaskNextStepLink(taskName, linkText) {
    const attributes = await this.getAttributesDisplayedForTaskWithName(taskName);
    const link = await this.getAttributeLink(attributes, 'Next steps', linkText);
    await link.click();
  }
}

module.exports = new CaseDetailsTaskTab();
