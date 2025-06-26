const { $, $$, elementByXpath } = require('../../../helpers/globals');
const BrowserWaits = require('../../../e2e/support/customWaits');
const reportLogger = require('../../../codeceptCommon/reportLogger');
const SoftAssert = require('../../util/softAssert');
const date = require('moment');

class CaseEdit {
  get checkYourAnswersPageElement() {
    return $('.check-your-answers');
  }
  get continueBtn() {
    return $('ccd-case-edit .form > .form-group button[type="submit"]');
  }
  get previousBtnInEditPage() {
    return $('ccd-case-edit .form > .form-group button.button-secondary');
  }
  get cancelLinkInEditPage() {
    return $('ccd-case-edit .form .cancel a');
  }
  get submitBtn() {
    return $('ccd-case-edit-submit form > .form-group button[type="submit"]');
  }
  get previousBtnInSubmitPage() {
    return $('ccd-case-edit-submit form > .form-group button.button-secondary');
  }
  get cancelLinkInSubmitPage() {
    return $('ccd-case-edit-submit form .cancel a');
  }
  get checkYourAnswersHeading() {
    return $('.check-your-answers>.heading-h2');
  }
  get checkYourAnswersHeadingDescription() {
    return $('.check-your-answers>span');
  }
  get checkYourAnswersSummaryRows() {
    return $$('.check-your-answers .form-table tr');
  }
  get validationAlertSummaryContainer() {
    return $('.govuk-error-summary[role="alert"]');
  }
  get callbackErrorSummaryContainer() {
    return $('.error-summary[role="status"]');
  }

  async waitForPage() {
    await BrowserWaits.waitForElement($('ccd-case-edit-page'));
  }

  async amOnPage() {
    try {
      await this.waitForPage();
      return true;
    } catch (error) {
      reportLogger.AddMessage('Error waiting for case edit page :' + error);
      return false;
    }
  }

  async isValidationAlertSummaryDisplayed() {
    try {
      await BrowserWaits.waitForElement(this.validationAlertSummaryContainer);
      return true;
    } catch (error) {
      reportLogger.AddMessage('Validation error not displayed' + error);
      return false;
    }
  }

  async isValidationAlertMessageDisplayed(errorMessage) {
    expect(await this.isValidationAlertSummaryDisplayed(), 'Error summary not displayed').to.be.true;
    const errorSummaryText = await this.validationAlertSummaryContainer.textContent();
    return errorSummaryText.includes(errorMessage);
  }

  async getValidationAlertMessageDisplayed() {
    expect(await this.isValidationAlertSummaryDisplayed(), 'Error summary not displayed').to.be.true;
    return await this.validationAlertSummaryContainer.textContent();
  }

  async isCallbackErrorSummaryDisplayed() {
    try {
      await BrowserWaits.waitForElement(this.callbackErrorSummaryContainer);
      return true;
    } catch (error) {
      reportLogger.AddMessage('Error waiting for error summary banner :' + error);
      return false;
    }
  }

  async isCallbackErrorMessageDisplayed(errorMessage) {
    expect(await this.isValidationAlertSummaryDisplayed(), 'Callback Error summary not displayed').to.be.true;
    const errorSummaryText = await this.callbackErrorSummaryContainer.textContent();
    return errorSummaryText.includes(errorMessage);
  }

  async isFieldLevelValidationErrorDisplayed(fieldId) {
    const validationLocator = elementByXpath(`//*[contains(@id,'${fieldId}')]/ancestor::*[contains(@class,"form-group-error")] | //*[contains(@id,'${fieldId}')]//span[contains(@class,'error-message')]`);
    return await validationLocator.isVisible();
  }

  async getPageTitle() {
    return await $('ccd-case-edit-page h1').textContent();
  }

  async waitForField(caseFieldId) {
    await BrowserWaits.waitForElement($('#' + caseFieldId));
  }

  async isFieldDisplayed(fieldConfig) {
    const fieldId = fieldConfig.field_type.type === 'Complex'
      ? `${fieldConfig.id}_${fieldConfig.id}`
      : fieldConfig.id;
    const fieldLocator = $('#' + fieldId);
    const isPresent = await fieldLocator.isVisible();
    return isPresent;
  }

  async isFieldPresent(fieldConfig) {
    const fieldId = fieldConfig.field_type.type === 'Complex'
      ? `${fieldConfig.id}_${fieldConfig.id}`
      : fieldConfig.id;
    return await $(`#${fieldId}`).isVisible();
  }

  async getFieldLabel(caseFieldId) {
    let current = elementByXpath(`//*[@id="${caseFieldId}"]`);
    let tagName = '';
    while (tagName !== 'ccd-field-write') {
      current = current.locator('xpath=..');
      tagName = await current.evaluate(node => node.tagName.toLowerCase());
    }
    const label = current.locator('xpath=.//*[contains(@class, "form-label")]');
    return await label.textContent();
  }

  getFieldId(fieldId, parentId) {
    return parentId ? `${parentId}_${fieldId}` : fieldId;
  }

  getComplexFieldId(fieldId, parentId) {
    return parentId ? `${parentId}_${fieldId}_${fieldId}` : `${fieldId}_${fieldId}`;
  }

  async inputTextField(fieldConfig, inputtext, parentId) {
    const value = inputtext || `${fieldConfig.label || fieldConfig.id} Test`;
    const locator = $(`#${this.getFieldId(fieldConfig.id, parentId)}`);
    await locator.fill('');
    await locator.type(value);
    return value;
  }

  async inputPostCode(fieldConfig, value, parentId) {
    const inputValue = value || 'SW20 9DJ';
    const locator = $(`#${this.getFieldId(fieldConfig.id, parentId)}`);
    await locator.fill('');
    await locator.type(inputValue);
    return inputValue;
  }

  async inputNumberField(fieldConfig, inputNumber, parentId) {
    const inputValue = inputNumber || 12345;
    await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).type(inputValue.toString());
    return inputValue.toString();
  }

  async inputYesOrNoField(fieldConfig, inputOption, parentId) {
    let optionId = `${fieldConfig.id}_${inputOption || 'Yes'}`;
    if (parentId) {
      optionId = `${parentId}_${optionId}`;
    }
    await $(`#${optionId}`).click();
    return 'Yes';
  }

    async inputFixedRadioListField(fieldConfig, inputOption, parentId) {
    const selectedVal = inputOption || fieldConfig.field_type.fixed_list_items[0];
    await $(`#${this.getFieldId(fieldConfig.id, parentId)}-${selectedVal.code}`).click();
    return selectedVal;
  }

  async inputFixedListField(fieldConfig, inputOption, parentId) {
    const selectedVal = inputOption || fieldConfig.field_type.fixed_list_items[0];
    await $(`#${this.getFieldId(fieldConfig.id, parentId)} option[ng-reflect-ng-value="${selectedVal.code}"]`).click();
    return selectedVal;
  }

  async inputMultiSelectListField(fieldConfig, inputOptions, parentId) {
    const selectedVal = inputOptions || fieldConfig.field_type.fixed_list_items;
    for (const option of selectedVal) {
      const locator = $(`#${this.getFieldId(fieldConfig.id, parentId)} #${this.getFieldId(fieldConfig.id, parentId)}-${option.code}`);
      await locator.click();
    }
    return selectedVal;
  }

  async inputEmailField(fieldConfig, email, parentId) {
    const inputEmail = email || 'test@test.com';
    await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).type(inputEmail);
    return inputEmail;
  }

  async inputComplexField(fieldConfig, value, parentId) {
    if (['AddressGlobalUK', 'AddressUK'].includes(fieldConfig.field_type.id)) {
      return await this.inputaddressGlobalUK(fieldConfig, value, parentId);
    }

    if (fieldConfig.field_type.id === 'Organisation') {
      return await this.inputOrganisationField(fieldConfig, value, parentId);
    }

    const fieldValue = {};
    const thisFieldId = parentId ? `${parentId}_${fieldConfig.id}` : fieldConfig.id;

    for (const complexFieldConfig of fieldConfig.field_type.complex_fields) {
      fieldValue[complexFieldConfig.id] = await this.inputCaseField(
        complexFieldConfig,
        value ? value[complexFieldConfig.id] : null,
        thisFieldId
      );
    }

    return fieldValue;
  }

  async inputaddressGlobalUK(fieldConfig, value, parentId) {
    const fieldValue = {};
    const complexId = parentId
      ? `${parentId}_${fieldConfig.id}_${fieldConfig.id}`
      : `${fieldConfig.id}_${fieldConfig.id}`;

    const postCodeInput = $(`#${complexId}_postcodeLookup input`);
    const postCodeFindAddressBtn = $(`#${complexId}_postcodeLookup button`);
    const postCodeAddressSelect = $(`#${complexId}_addressList`);
    const postCodeAddressSelectOption = $(`#${complexId}_addressList option:nth-of-type(2)`);

    await postCodeInput.type('sw1');
    await postCodeFindAddressBtn.click();
    await BrowserWaits.waitForElement(postCodeAddressSelect);
    await BrowserWaits.waitForElement(postCodeAddressSelectOption);
    await postCodeAddressSelectOption.click();
    await BrowserWaits.waitForSeconds(2);

    for (const complexFieldConfig of fieldConfig.field_type.complex_fields) {
      const prefix = parentId
        ? `${parentId}_${fieldConfig.id}__detail`
        : `${fieldConfig.id}__detail`;
      const val = await $(`#${prefix}${complexFieldConfig.id}`).getAttribute('value');
      fieldValue[complexFieldConfig.id] = val;
    }

    return fieldValue;
  }

    async inputOrganisationField(fieldConfig, value, parentId) {
    const baseId = `${fieldConfig.id}_${fieldConfig.id}`;
    const searchOrgInputText = $(`#${baseId} #search-org-text`);
    const orgResults = $$(`#${baseId} .scroll-container .td-select`);
    const organisationId = $(`#${baseId} ccd-write-organisation-complex-field input[name='organisationID']`);
    const organisationName = $(`#${baseId} ccd-write-organisation-complex-field input[name='organisationName']`);

    await searchOrgInputText.type('test');
    await BrowserWaits.waitForElement(orgResults);
    await orgResults.nth(1).click();

    return {
      organisationID: await organisationId.getAttribute('value'),
      organisationName: await organisationName.getAttribute('value')
    };
  }

  async inputPhoneUKField(fieldConfig, inputPhone, parentId) {
    const value = inputPhone || '07123456789';
    await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).type(value);
    return value.toString();
  }

  async inputMoneyGBP(fieldConfig, moneyVal, parentId) {
    const value = moneyVal || 10000;
    await $(`#${this.getFieldId(fieldConfig.id, parentId)}`).type(value.toString());
    return (value * 100).toString();
  }

  async inputDate(fieldConfig, dateVal, parentId) {
    const inputDate = dateVal || date().format('YYYY-MM-DD');
    const parent = parentId ? `#${parentId}_${parentId}` : '';
    const [year, month, day] = inputDate.split('-');

    reportLogger.AddMessage(`Date field locator ${parent} #${fieldConfig.id}-day`);

    await $(`${parent} #${fieldConfig.id}-day`).type(day);
    await $(`${parent} #${fieldConfig.id}-month`).type(month);
    await $(`${parent} #${fieldConfig.id}-year`).type(year);
    return inputDate;
  }

  async inputDateTime(fieldConfig, dateVal, parentId) {
    const inputDate = dateVal || date().format('YYYY-MM-DD');
    const [year, month, day] = inputDate.split('-');
    const parent = parentId ? `#${parentId}_${parentId}` : '';

    await $(`${parent} #${fieldConfig.id}-day`).type(day);
    await $(`${parent} #${fieldConfig.id}-month`).type(month);
    await $(`${parent} #${fieldConfig.id}-year`).type(year);

    await $(`${parent} #${fieldConfig.id}-hour`).type('02');
    await $(`${parent} #${fieldConfig.id}-minute`).type('30');
    await $(`${parent} #${fieldConfig.id}-second`).type('45');

    return `${inputDate}T02:30:45.000`;
  }

  async getSummaryPageDisplayElements() {
    await this.waitForChecYourAnswersPage();
    const isHeadingPresent = await this.checkYourAnswersHeading.isVisible();
    const isHeadingDescPresent = await this.checkYourAnswersHeadingDescription.isVisible();
    const summaryRowsCount = await this.checkYourAnswersSummaryRows.count();
    return { header: isHeadingPresent, headerDescription: isHeadingDescPresent, rows: summaryRowsCount };
  }

  async isCancelLinkInEditpageDisplayed() {
    await this.waitForPage();
    await this.cancelLinkInEditPage.scrollIntoViewIfNeeded();
    return await this.cancelLinkInEditPage.isVisible();
  }

  async clickCancelLinkInEditPage() {
    expect(await this.amOnPage(), 'Not in case edit page').to.be.true;
    return await this.cancelLinkInEditPage.click();
  }

  async isCancelLinkInSubmitPageDisplayed() {
    await this.waitForPage();
    return await this.cancelLinkInSubmitPage.isVisible();
  }

  async clickCancelLinkInSubmitPage() {
    await this.waitForPage();
    return await this.cancelLinkInSubmitPage.click();
  }

  async isPreviousBtnInEditpageDisplayed() {
    await this.waitForPage();
    return await this.previousBtnInEditPage.isVisible();
  }

  async clickPreviousBtnInEditPage() {
    await this.waitForPage();
    return await this.previousBtnInEditPage.click();
  }

  async isPreviousBtnInSubmitPageDisplayed() {
    await this.waitForPage();
    return await this.previousBtnInSubmitPage.isVisible();
  }

  async clickPreviousBtnLinkInSubmitPage() {
    await this.waitForPage();
    return await this.previousBtnInSubmitPage.click();
  }

  getSubmitButton() {
    return this.submitBtn;
  }

  async clickSubmit() {
    await BrowserWaits.waitForElement(this.submitBtn);
    await this.submitBtn.scrollIntoViewIfNeeded();
    await this.submitBtn.click();
  }

  async selectRadioYesOrNo(fieldId, value) {
    const option = value ? 'Yes' : 'No';
    const input = $(`#${fieldId} input[id$='${option}']`);
    await input.click();
  }

    async clickContinue() {
    const continueButton = $('button[type="submit"]');
    await continueButton.scrollIntoViewIfNeeded();
    await BrowserWaits.waitForElement(continueButton);
    await BrowserWaits.waitForElementClickable(continueButton);
    const currentUrl = await page.url();
    console.log('Submitting : ' + currentUrl);
    await continueButton.click();
  }

  async waitForChecYourAnswersPage() {
    await BrowserWaits.waitForElement(this.checkYourAnswersPageElement);
  }

  async isCheckYourAnswersPagePresent() {
    return await this.checkYourAnswersPageElement.isVisible();
  }

  async inputCaseField(fieldConfig, value, parentId) {
    let fieldValue = null;
    switch (fieldConfig.field_type.type) {
      case 'Text':
      case 'TextArea':
        fieldValue = await this.inputTextField(fieldConfig, value, parentId);
        break;
      case 'Postcode':
        fieldValue = await this.inputPostCode(fieldConfig, value, parentId);
        break;
      case 'Number':
        fieldValue = await this.inputNumberField(fieldConfig, value, parentId);
        break;
      case 'YesOrNo':
        fieldValue = await this.inputYesOrNoField(fieldConfig, value, parentId);
        break;
      case 'Email':
        fieldValue = await this.inputEmailField(fieldConfig, value, parentId);
        break;
      case 'Complex':
        fieldValue = await this.inputComplexField(fieldConfig, value, parentId);
        break;
      case 'FixedRadioList':
        fieldValue = await this.inputFixedRadioListField(fieldConfig, value, parentId);
        fieldValue = fieldValue.code;
        break;
      case 'FixedList':
        fieldValue = await this.inputFixedListField(fieldConfig, value, parentId);
        fieldValue = fieldValue.code;
        break;
      case 'MultiSelectList':
        const multiSelectVal = await this.inputMultiSelectListField(fieldConfig, value, parentId);
        fieldValue = multiSelectVal.map(val => val.code);
        break;
      case 'PhoneUK':
        fieldValue = await this.inputPhoneUKField(fieldConfig, value, parentId);
        break;
      case 'MoneyGBP':
        fieldValue = await this.inputMoneyGBP(fieldConfig, value, parentId);
        break;
      case 'Date':
        fieldValue = await this.inputDate(fieldConfig, value, parentId);
        break;
      case 'DateTime':
        fieldValue = await this.inputDateTime(fieldConfig, value, parentId);
        break;
    }
    reportLogger.AddMessage('Field set value for ' + fieldConfig.field_type.type);
    reportLogger.AddJson(JSON.stringify(fieldValue));
    return fieldValue;
  }

  async validateCheckYourAnswersPage(eventConfig) {
    const softAssert = new SoftAssert();
    softAssert.setScenario('Check your answers page content');
    await softAssert.assert(async () =>
      expect(await this.isCheckYourAnswersPagePresent(), 'Not on check your answers page').to.be.true
    );

    const isHeadingPresent = await this.checkYourAnswersHeading.isVisible();
    const isHeadingDescPresent = await this.checkYourAnswersHeadingDescription.isVisible();
    const summaryRowsCount = await this.checkYourAnswersSummaryRows.count();

    if (eventConfig.show_summary) {
      await softAssert.assert(async () => expect(isHeadingPresent, 'Check your answers header not displayed').to.be.true);
      await softAssert.assert(async () => expect(isHeadingDescPresent, 'Check your answers header description not displayed').to.be.true);
      await softAssert.assert(async () => expect(summaryRowsCount, 'Summary rows count is 0').to.be.above(0));
    } else {
      await softAssert.assert(async () => expect(isHeadingPresent, 'Header should not be visible').to.be.false);
      await softAssert.assert(async () => expect(isHeadingDescPresent, 'Description should not be visible').to.be.false);
      await softAssert.assert(async () => expect(summaryRowsCount, 'Summary rows should be 0').to.equal(0));
    }

    for (const caseField of eventConfig.case_fields) {
      softAssert.setScenario(`Field "${caseField.label}" summary display condition: ${caseField.show_summary_change_option}`);
      const fieldHeader = elementByXpath(`//ccd-case-edit-submit//*[contains(@class, "form-table")]//tr//th//span[text() = "${caseField.label}"]`);
      const shouldDisplay = Boolean(caseField.show_summary_change_option);
      const message = `Field ${caseField.label} expected display: ${shouldDisplay}`;
      await softAssert.assert(async () => expect(await fieldHeader.isVisible(), message).to.equal(shouldDisplay));
    }

    softAssert.finally();
  }
}

module.exports = new CaseEdit();
