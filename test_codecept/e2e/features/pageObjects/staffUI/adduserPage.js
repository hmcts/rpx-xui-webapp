const { $, $$, elementByXpath, getText } = require('../../../../helpers/globals');

const BrowserWaits = require('../../../support/customWaits');

class AddUserPage{
  get container() {
    return $('exui-staff-add-edit-user-form');
  }

  get headerTitle() {
    return $('exui-staff-add-edit-user-form .govuk-heading-xl');
  }

  get firstName() {
    return $('input#first_name');
  }

  get lastName() {
    return $('input#last_name');
  }

  get email() {
    return $('input#email_id');
  }

  get region() {
    return $('#region_id');
  }

  get services() {
    return $('#services');
  }

  get primaryLocation() {
    return $('#base_locations_primary  exui-staff-select-location #location-primary');
  }

  get primaryLocationAddBtn() {
    return $('#base_locations_primary  exui-staff-select-location a');
  }

  get additionalLocations() {
    return $('#base_locations_additional  exui-staff-select-location #location-primary');
  }

  get additionalLocationAddBtn() {
    return $('#base_locations_additional  exui-staff-select-location a');
  }

  get userType() {
    return $('#user_type');
  }

  get roles() {
    return $('#roles');
  }

  get jobTitles() {
    return $('#checkbox_job_title');
  }

  get continue() {
    return elementByXpath('//button[contains(text(),"Continue")]');
  }

  get saveChanges() {
    return elementByXpath('//button[contains(text(),"Save changes")]');
  }

  get cancel() {
    return elementByXpath('//button[contains(text(),"Cancel")]');
  }

  async getPageTitle(){
    return await getText(this.headerTitle);
  }

  async isDisplayed(){
    return await this.container.isVisible();
  }

  async clickContinue(){
    await this.continue.click();
  }

  async clickSaveChanges() {
    await this.continue.click();
  }

  async clickCancel() {
    await this.cancel.click();
  }

  async enterDetails(userDetails){
    const keys = Object.keys(userDetails);

    for (const key of keys){
      const inputVal = userDetails[key];
      switch (key){
        case 'First name':
          await this.firstName.fill(inputVal);
          break;
        case 'Last name':
          await this.lastName.fill(inputVal);
          break;
        case 'Email':
          await this.email.fill(inputVal);
          break;
        case 'Region':
          await this.region.selectOptionAtIndex(1);
          break;
        case 'Services':
          const checkBoxElements = await checkBoxes(this.services);
          const labels = Object.keys(checkBoxElements);
          for (const service of inputVal) {
            if (!labels.includes(service)){
              throw new Error(`input ${service} not in the services list`);
            } else {
              await checkBoxElements[service].click();
            }
          }
          break;
        case 'Primary location':
          await this.primaryLocation.scrollIntoView();
          await this.primaryLocation.fill(inputVal);
          const searchResults = $$('.mat-option-text');

          let e = null;
          await BrowserWaits.retryWithActionCallback(async () => {
            await BrowserWaits.waitForSeconds(2);
            e = await searchResults.getItemWithText(inputVal);
            if (e === null){
              throw new Error('locations not found, retry waiting');
            }
          });
          await e.click();
          await this.primaryLocationAddBtn.click();
          break;
        case 'Additional locations':
          inputVal.forEach(async(loc) => {
            await this.additionalLocations.fill(loc);
            const additionaLocationResults = $$('.mat-option-text');
            let ale = null;
            await BrowserWaits.retryWithActionCallback(async () => {
              await BrowserWaits.waitForSeconds(2);
              ale = additionaLocationResults.getItemWithText(loc);
              if (ale === null) {
                throw new Error('locations not found, retry waiting');
              }
            });
            await ale.click();
            await this.additionalLocationAddBtn.click();
          });

          break;
        case 'User type':
          await this.userType.selectOptionWithLabel(inputVal);
          break;
        case 'roles':
          const rolesCheckBoxElements = await checkBoxes(this.roles);
          const roleLabels = Object.keys(rolesCheckBoxElements);
          for (const role of inputVal) {
            if (!roleLabels.includes(role)) {
              throw new Error(`input ${role} not in the roles list`);
            } else {
              await rolesCheckBoxElements[role].click();
            }
          }
          break;
        case 'Job title':

          const jobTitleCheckBoxElements = await checkBoxes(this.jobTitles);
          const jobTitleLabels = Object.keys(jobTitleCheckBoxElements);
          for (const title of inputVal) {
            if (!jobTitleLabels.includes(title)) {
              throw new Error(`input ${title} not in the roles list`);
            } else {
              await jobTitleCheckBoxElements[title].click();
            }
          }
          break;
      }
    }
  }
}

async function checkBoxes(parent){
  const checkBoxes = {};
  const elements = parent.locator('.govuk-checkboxes__item');
  const count = await elements.count();
  for (let i = 0; i< count; i++){
    const e = elements.nth(i);
    const label = await getText(e.locator('label'));
    checkBoxes[label] = e.locator('input');
  }
  return checkBoxes;
}

module.exports = new AddUserPage();
