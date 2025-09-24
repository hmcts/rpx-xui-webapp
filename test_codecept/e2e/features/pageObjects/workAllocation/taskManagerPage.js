const { $ } = require('../../../../helpers/globals');
const BrowserWaits = require('../../../support/customWaits');
const TaskMessageBanner = require('../messageBanner');
const TaskList = require('./taskListTable');

class TaskManagerPage extends TaskList{
  constructor(){
    super();
    this.taskInfoMessageBanner = new TaskMessageBanner();
  }

  get taskManagerList() {
    return $('exui-task-manager-list');
  }

  get taskManagerFilter() {
    return $('.exui-task-manager-filter');
  }

  get caseWorkerFilter() {
    return $('exui-task-manager-filter select#task_assignment_caseworker');
  }

  get locationFilter() {
    return $('exui-task-manager-filter select#task_assignment_location');
  }

  async amOnPage(){
    try {
      await BrowserWaits.waitForSpinnerToDissappear();
      await BrowserWaits.waitForElement(this.taskManagerlist);
      return true;
    } catch (err){
      console.log('Task manager page not displayed : '+err);
      return false;
    }
  }

  async getCaseworkerFilterOptions(){
    expect(await this.amOnPage(), 'Not on Task manager page ').to.be.true;
    return this.getFilterOptionsFromSelect(this.caseWorkerFilter);
  }

  async getLocationFilterOptions() {
    expect(await this.amOnPage(), 'Not on Task manager page ').to.be.true;
    return this.getFilterOptionsFromSelect(this.locationFilter);
  }

  async getFilterOptionsFromSelect(selectElement){
    expect(await this.amOnPage(), 'Not on Task manager page ').to.be.true;
    const optionValues = [];
    const optionsCount = await selectElement.locator('option').count();
    for (let i = 0; i < optionsCount; i++) {
      optionValues.push(await selectElement.locator('option').nth(i).textContent());
    }
    return optionValues;
  }

  async selectCaseworkerFilter(optionDisplayText){
    expect(await this.amOnPage(), 'Not on Task manager page ').to.be.true;
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForSpinnerToDissappear();
      await this.caseWorkerFilter.locator(`//option[text() = '${optionDisplayText}']`).click();
    });
  }

  async selectLocationFilter(optionDisplayText) {
    expect(await this.amOnPage(), 'Not on Task manager page ').to.be.true;
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForSpinnerToDissappear();

      await this.locationFilter.locator(`//option[text() = '${optionDisplayText}']`).click();
    });
  }

  async isBannerMessageDisplayed() {
    expect(await this.amOnPage(), 'Not on Task manager page ').to.be.true;

    return this.taskInfoMessageBanner.isBannerMessageDisplayed();
  }

  async getBannerMessagesDisplayed() {
    expect(await this.amOnPage(), 'Not on Task manager page ').to.be.true;

    return this.taskInfoMessageBanner.getBannerMessagesDisplayed();
  }
}

module.exports = new TaskManagerPage();
