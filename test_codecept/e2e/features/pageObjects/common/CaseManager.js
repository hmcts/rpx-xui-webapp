const date = require('moment');
const path = require('path');
const cucumberReporter = require('../../../../codeceptCommon/reportLogger');
const reportLogger = require('../../../../codeceptCommon/reportLogger');
const { $, currentUrl, elementsByCss, elementByXpath, getTagName, getText, isPresent, navigate, selectOption, waitForElement } = require('../../../../helpers/globals');
const config = require('../../../config/functional.conf');
const BrowserLogs = require('../../../support/browserLogs');
const { LOG_LEVELS } = require('../../../support/constants');
const BrowserWaits = require('../../../support/customWaits');
const CaseEditPage = require('../caseEditPage');
const CreateCaseStartPage = require('../createCaseStartPage');
const App = require('./application');

function headerPage() { return require('../headerPage')(); }

class CaseManager {
  constructor() {
    this.app = new App();
    this.createCaseStartPage = new CreateCaseStartPage();
    this.caseEditPage = new CaseEditPage();
  }

  get manageCasesHeaderLink() { return $('.hmcts-header__link'); }
  get caseListContainer() { return $('exui-case-list'); }
  get caseCreateheaderLink() {
    return elementByXpath('//a[contains(@class,"hmcts-primary-navigation__link")][contains(text(),"Create case")]');
  }
  get continueBtn() { return $('button:has-text("Continue")'); }
  get submitBtn() { return elementByXpath('//button[contains(text(),"Submit")]'); }
  get previousBtn() { return $('form .button-secondary'); }
  get cancelLink() { return $('form .cancel a'); }
  get formFields() { return 'ccd-case-edit-form>div'; }
  get ccdCaseDetails() { return $('ccd-case-viewer'); }
  get ccdCaseEdit() { return $('ccd-case-edit'); }
  get caseDetailsPage() { return $('exui-case-details-home'); }
  get exuiCaseHomeComp() { return $('exui-case-home'); }
  get checkYourAnswers() { return $('.check-your-answers'); }
  get caseNextStepSelect() { return $('select#next-step'); }
  get nextStepGoButton() { return $('.event-trigger button'); }
  get createCaseContainer() { return $('ccd-create-case-filters form'); }
  get eventTimestamp() { return elementByXpath('//tbody/tr[1]/td[2]/div[1]'); }
  get errorsContainer() { return $('.govuk-error-summary'); }

  async cancelCaseCreation() {
    await BrowserWaits.waitForElement(this.ccdCaseEdit);
    const thisPageUrl = await currentUrl();
    await BrowserWaits.waitForElement(this.cancelLink);
    await this.cancelLink.click();
    await BrowserWaits.waitForPageNavigation(thisPageUrl);
  }

  async clickPreviousButton() {
    await BrowserWaits.waitForElement(this.previousBtn);
    const thisPageUrl = await currentUrl();
    await this.previousBtn.click();
    await BrowserWaits.waitForPageNavigation(thisPageUrl);
  }

  async clickSubmit() {
    await this.submitBtn.click();
  }

  async getTimestampDisplayed() {
    await BrowserWaits.waitForElement(this.eventTimestamp);
    return await getText(this.eventTimestamp);
  }

  async _waitForSearchComponent() {
    await BrowserWaits.waitForElement(this.createCaseContainer);
  }

  async startCaseCreation(jurisdiction, caseType, event) {
    await BrowserWaits.retryWithActionCallback(async () => {
      let retryOnJurisdiction = 0;
      await BrowserWaits.retryWithActionCallback(async () => {
        try {
          await BrowserWaits.waitForSpinnerToDissappear();
          await this.createCaseStartPage.selectJurisdiction(jurisdiction);
        } catch (error) {
          await BrowserLogs.printBrowserLogs();
          cucumberReporter.AddMessage('Jurisdiction option not found after 30sec. Retrying again with browser refresh', LOG_LEVELS.Warn);
          retryOnJurisdiction++;
          await headerPage().refreshBrowser();
          throw new Error(error);
        }
      });

      await this.createCaseStartPage.selectCaseType(caseType);
      await this.createCaseStartPage.selectEvent(event);

      const thisPageUrl = await currentUrl();

      let startCasePageRetry = 0;
      await BrowserWaits.retryWithActionCallback(async () => {
        try {
          await BrowserWaits.waitForSpinnerToDissappear();
          await this.createCaseStartPage.clickStartButton();
          const nextPageUrl = await BrowserWaits.waitForPageNavigation(thisPageUrl);
        } catch (err) {
          const nextPageUrl = await BrowserWaits.waitForPageNavigation(thisPageUrl);
          if (nextPageUrl.includes('service-down')) {
            await navigate(config.config.baseUrl + 'cases/case-filter');
            await cucumberReporter.AddScreenshot(global.screenShotUtils);
            cucumberReporter.AddMessage('Service error occured Retrying again ', LOG_LEVELS.Warn);
            throw new Error('Service error occured Retrying again ');
          }
          cucumberReporter.AddMessage('Case start page not displayed in  30sec. Retrying again ' + err, LOG_LEVELS.Error);
          startCasePageRetry++;
          throw new Error(err);
        }
      });
    });
  }

  async createCase(caseData, isAccessibilityTest, tcTypeStatus) {
    this.caseData = caseData;

    let isCheckYourAnswersPage = false;
    let pageCounter = 0;

    const checkYouranswers = $('.check-your-answers');
    isCheckYourAnswersPage = await checkYouranswers.isVisible();
    while (!isCheckYourAnswersPage) {
      const page = tcTypeStatus ? pageCounter : 'null';
      await BrowserWaits.retryWithActionCallback(async () => {
        const isNextPageDisplayed = await this._formFillPage(page);
        if (!isNextPageDisplayed) {
          throw Error('Contnue to next page not success, retrying');
        }
      });

      await BrowserWaits.waitForSeconds(2);
      isCheckYourAnswersPage = await checkYouranswers.isVisible();
      pageCounter++;
    }
    //reset api response to null for next event
    this.caseEditPage.caseEventApiResponse = null;
  }

  async createCaseWithInvalidDate(caseData, isAccessibilityTest, tcTypeStatus) {
    this.caseData = caseData;

    let page = tcTypeStatus ? 0 : 'null';

    for (let i = 0; i < 2; i++) {
      page = tcTypeStatus ? i : 'null';

      await BrowserWaits.retryWithActionCallback(async () => {
        const isNextPageDisplayed = await this._formFillPage(page);
        if (!isNextPageDisplayed) {
          return;
        }
      });

      await BrowserWaits.waitForSeconds(2);
    }

    this.caseEditPage.caseEventApiResponse = null;
  }

  async submitCase(isAccessibilityTest) {
    const checkYouranswers = $('.check-your-answers');
    const isCheckYourAnswersPage = await isPresent(checkYouranswers);
    if (isCheckYourAnswersPage) {
      const submit = elementByXpath('//button[@type= "submit"]');
      await BrowserWaits.waitForElement(submit);
      // await browser.executeScript('arguments[0].scrollIntoView()',
      //     submit.getWebElement());

      const thisPageUrl = await currentUrl();

      await BrowserWaits.retryWithActionCallback(async () => {
        await submit.click();
        await BrowserWaits.waitForPageNavigation(thisPageUrl);
      });
    } else {
      throw new Error('Not in case creation check your answers page');
    }
  }

  async startNextStep(stepName, isAccessibilityTest) {
    await BrowserWaits.waitForElement(this.exuiCaseHomeComp);
    await BrowserWaits.waitForElement(this.caseNextStepSelect);

    const nextStepSelect = elementByXpath('//*[@id=\'next-step\']');
    let nextStepSelectoption = null;
    if (stepName) {
      cucumberReporter.AddMessage('About to select ' + stepName, LOG_LEVELS.Debug);
      await selectOption(nextStepSelect, stepName);
    } else {
      nextStepSelectoption = elementByXpath('//option[text() = \'\' + stepName + \'\']');
      const someStepEventName = await getText(nextStepSelectoption);
      cucumberReporter.AddMessage('Using logic to select ' + someStepEventName, LOG_LEVELS.Debug);
      await selectOption(nextStepSelect, someStepEventName);
    }
    const currentPageUrl = await currentUrl();
    reportLogger.AddMessage(`on page with URL: ${currentPageUrl}`);
    await BrowserWaits.retryWithActionCallback(async () => {
      await this.nextStepGoButton.click();
      // await BrowserWaits.waitForElement($('exui-case-details-home'));
      await BrowserWaits.waitForPageNavigation(currentPageUrl);
    });
  }

  async AmOnCaseDetailsPage() {
    await BrowserWaits.retryWithActionCallback(async () => {
      await waitForElement(this.ccdCaseDetails);
      expect(await isPresent(this.ccdCaseDetails)).to.be.true;
    });
  }

  async AmOnCCDCaseEditPage() {
    await BrowserWaits.retryWithActionCallback(async () => {
      try {
        await BrowserWaits.waitForElement(this.ccdCaseEdit);
        expect(await isPresent(this.ccdCaseEdit)).to.be.true;
      } catch (err) {
        await this.createCaseStartPage.clickStartButton();
        throw new Error(err);
      }
    });
  }

  async AmOnChekYourAnswersPage() {
    await BrowserWaits.retryWithActionCallback(async () => {
      expect(await isPresent(this.checkYourAnswers)).to.be.true;
    });
  }

  async _formFillPage(pageCounter) {
    const currentPageElement = $('ccd-case-edit-page');
    await BrowserWaits.waitForElement(currentPageElement);
    if (pageCounter != 'null') {
      if (pageCounter >= 1) {
        pageCounter++;
      }
      await this.caseEditPage.wizardPageFormFieldValidations(pageCounter);
    }
    const fields = elementsByCss(this.formFields);
    for (let count = 0; count < await fields.count(); count++) {
      const isHiddenElement = await fields.nth(count);

      const isHidden = await isHiddenElement.getAttribute('hidden');
      if (isHidden) {
        continue;
      }

      const fieldElement = await fields.nth(count);
      const field = await fieldElement.elementByXpath('./*');
      const readWriteField = await getTagName(field);

      if (readWriteField.toLowerCase() === 'ccd-field-write') {
        const ccdField = await field.elementByXpath('./div//*');
        await this._writeToField(ccdField);
      }
    }

    const continueElement = elementByXpath('//button[@type= "submit"]');
    // await browser.executeScript('arguments[0].scrollIntoView()',
    //     continueElement.getWebElement())

    await BrowserWaits.waitForElement(continueElement);
    // browser.waitForAngular();
    // await BrowserWaits.waitForElementClickable(continueElement);

    const thisPageUrl = await currentUrl();
    cucumberReporter.AddMessage('Submitting page: ' + thisPageUrl, LOG_LEVELS.Debug);

    const retryCounter = 0;
    let isErrorDisplayed = false;
    await BrowserWaits.retryWithActionCallback(async () => {
      // await browser.handlePopups();
      await continueElement.click();
      await BrowserWaits.waitForSeconds(2);
      isErrorDisplayed = await this.errorsContainer.isVisible();
      // browser.waitForAngular();
      if (!isErrorDisplayed) {
        await BrowserWaits.waitForPageNavigation(thisPageUrl);
      }
    });

    const nextPageUrl = await currentUrl();
    cucumberReporter.AddMessage('Next page: ' + nextPageUrl, LOG_LEVELS.Debug);
    return nextPageUrl !== thisPageUrl;
  }

  async excludeFieldValues(fieldName) {
    const excludedValues = ['Building and Street', 'Address Line 2', 'Address Line 3', 'Town or City', 'County', 'Postcode/Zipcode', 'Country'];
    const found = excludedValues.includes(fieldName);
    return found;
  }

  async _writeToField(ccdField, parentFieldName) {
    const isElementDisplayed = await ccdField.isVisible();
    if (!isElementDisplayed) {
      return;
    }
    let ccdFileTagName = await getTagName(ccdField);
    ccdFileTagName = ccdFileTagName.toLowerCase();
    let fieldName = '';
    let fieldName1 = '';
    try {
      if (ccdFileTagName.includes('ccd-write-collection-field')) {
        console.log('collection field name');
        fieldName = await getText(await ccdField.locator('h2.heading-h2'));
        fieldName = fieldName.trim();
        console.log('collection field name is' + fieldName);
      } else {
        const ele = ccdField.locator('.form-label');
        if (await ele.isVisible()) {
          fieldName = await getText(ele);
        } else {
          fieldName = 'nolabel';
        }
      }
    } catch (err) {
      console.log(err);
    }

    if (parentFieldName) {
      const status = await this.excludeFieldValues(fieldName);
      if (status) {
        return;
      }
    }

    fieldName1 = fieldName;
    fieldName = parentFieldName ? `${parentFieldName}.${fieldName}` : fieldName;
    console.log('===> Case Field : ' + fieldName);
    switch (ccdFileTagName) {
      case 'ccd-write-text-field':
        const e = await ccdField.locator('input.form-control');
        const textvalue = this._fieldValue(fieldName);
        if (textvalue != 'test Enter a UK postcode.Postcode/Zipcode') {
          await e.fill(textvalue !== '' ? textvalue : 'test');
        }
        cucumberReporter.AddMessage(fieldName + ' : ' + textvalue, LOG_LEVELS.Debug);
        this._appendFormPageValues(fieldName1, textvalue);
        break;
      case 'ccd-write-text-area-field':
        const e1 = await ccdField.locator('textarea.form-control');
        const textAreaValue = this._fieldValue(fieldName);
        await e1.fill(textAreaValue);
        cucumberReporter.AddMessage(fieldName + ' : ' + textAreaValue, LOG_LEVELS.Debug);
        this._appendFormPageValues(fieldName1, textAreaValue);
        break;
      case 'ccd-write-money-gbp-field':
        const e2 = await ccdField.locator('input.form-control');
        const gbpvalue = 300;
        await e2.fill(gbpvalue);
        cucumberReporter.AddMessage(fieldName + ' : ' + gbpvalue, LOG_LEVELS.Debug);
        this._appendFormPageValues(fieldName1, gbpvalue);
        break;
      case 'ccd-write-number-field':
        const e3 = await ccdField.locator('input.form-control');
        const numberfield = '1234567';
        await e3.fill(numberfield);
        cucumberReporter.AddMessage(fieldName + ' : ' + numberfield, LOG_LEVELS.Debug);
        this._appendFormPageValues(fieldName1, numberfield);
        break;
      case 'ccd-write-phone-uk-field':
        const e4 = await ccdField.locator('input.form-control');
        const phone_uk = '07889999111';
        await e4.fill(phone_uk);
        cucumberReporter.AddMessage(fieldName + ' : ' + phone_uk, LOG_LEVELS.Debug);
        this._appendFormPageValues(fieldName1, phone_uk);
        break;
      case 'ccd-write-address-field':
        await BrowserWaits.retryWithActionCallback(async () => {
          await ccdField.locator('.form-control').fill('');
          await ccdField.locator('.form-control').fill('SW1');
          await ccdField.locator('button').click();
          const addressSelectionField = ccdField.locator('select.form-control');

          await BrowserWaits.waitForElement(addressSelectionField);
          const addressToSelectOption = addressSelectionField.locator('option:nth-of-type(2)');
          await BrowserWaits.retryWithActionCallback(async () => {
            const addressOptions = await getSelectOptions(addressSelectionField);
            if (addressOptions.length <= 1) {
              throw new Error('');
            }
          });
          await selectOption(addressSelectionField, { index: 1});
          cucumberReporter.AddMessage(fieldName + ' : 2nd option selected', LOG_LEVELS.Debug);
        });

        break;
      case 'ccd-write-email-field':
        await ccdField.locator('input.form-control').fill('test@autotest.com ');
        cucumberReporter.AddMessage(fieldName + ' : test@autotest.com', LOG_LEVELS.Debug);
        this._appendFormPageValues(fieldName1, 'test@autotest.com');
        break;
      case 'ccd-write-yes-no-field':
        await ccdField.locator('.multiple-choice input').click();
        const yesOrNoFieldElement = ccdField.locator('.multiple-choice label');
        const selectionYesorNoValue = await getText(yesOrNoFieldElement.nth(0));
        cucumberReporter.AddMessage(fieldName + ' : ' + selectionYesorNoValue, LOG_LEVELS.Debug);
        this._appendFormPageValues(fieldName1, selectionYesorNoValue);
        break;
      case 'ccd-write-fixed-list-field':
        var selectOption = this._fieldValue(fieldName);
        var selectOptionElement = await ccdField.locator('option:nth-of-type(2)');
        // if (selectOption !== "" && !selectOption.includes(fieldName)) {
        //     selectOptionElement = ccdField.elementByXpath("//option[contains(text() , '" + selectOption+"')]"));

        // }
        const selectFieldId = await ccdField.locator('select');

        await selectOption(selectFieldId, { index: 1 });

        const id = await selectFieldId.getAttribute('id');
        // let selectionOptionValue = await selectOptionElement.getAttribute('value');
        // cucumberReporter.AddMessage(fieldName + " : " + selectionOptionValue, LOG_LEVELS.Debug);
        // this._appendFormPageValues(fieldName1, selectionOptionValue);
        break;
      case 'ccd-write-date-field':
      case 'ccd-write-date-container-field':
        var dateValue = this._fieldValue(fieldName);
        if (dateValue.includes(fieldName) || dateValue === '') {
          dateValue = date().format('DD-MM-YYYY');
        }
        var today = dateValue.split('-');
        await ccdField.locator('.form-group-day input').fill(today[0]);
        await ccdField.locator('.form-group-month input').fill(today[1]);
        await ccdField.locator('.form-group-year input').fill(today[2]);
        cucumberReporter.AddMessage(fieldName + ' : ' + dateValue, LOG_LEVELS.Debug);
        this._appendFormPageValues(fieldName1, dateValue);
        break;

      case 'ccd-write-document-field':
        await BrowserWaits.retryWithActionCallback(async () => {
          const fileToUpload = 'dummy.pdf';
          await (await ccdField.locator('input.form-control')).uploadFile(fileToUpload);
          const statusMessageELement = await ccdField.locator('span.error-message');
          let statusMessage = '';

          await BrowserWaits.waitForCondition(async () => {
            const isStatusDisplayed = await statusMessageELement.isVisible();
            if (isStatusDisplayed) {
              statusMessage = await getText(statusMessageELement);
            }
            console.log(`file upload status : Status message is displayed : ${isStatusDisplayed} : ${statusMessage}`);
            return !isStatusDisplayed || statusMessage.includes('error');
          });

          const isStatusDisplayed = await statusMessageELement.isVisible();
          if (isStatusDisplayed) {
            statusMessage = await getText(statusMessageELement);
          }

          const uploadError = isStatusDisplayed || statusMessage.includes('error');
          if (uploadError) {
            const fileToUpload1 = path.resolve(__dirname, '../../../documents/dummy1.pdf');
            await (await ccdField.locator('input.form-control')).fill(fileToUpload1);

            throw new Error(`file upload error occured : Status message is displayed : ${isStatusDisplayed} : ${statusMessage}`);
          }
          cucumberReporter.AddMessage(fieldName + ' : dummy.pdf', LOG_LEVELS.Debug);
          this._appendFormPageValues(fieldName1, 'dummy.pdf');
          // await browser.sleep(5000);
        });
        break;
      case 'ccd-write-multi-select-list-field':
        var selectionFields = await ccdField.locator('.multiple-choice input');
        var selectionFieldsCount = await selectionFields.count();
        for (var count = 0; count < selectionFieldsCount; count++) {
          const checkBoxElement = await selectionFields.nth(count);
          const isAlreadyChecked = await checkBoxElement.isChecked();
          if (!isAlreadyChecked) {
            await checkBoxElement.click();
          }
        }
        cucumberReporter.AddMessage(fieldName + ' : all options selected', LOG_LEVELS.Debug);
        break;

      case 'ccd-write-fixed-radio-list-field':
        var selectionRadioFields = await ccdField.locator('.multiple-choice input');
        var selectionFieldsCount = await selectionRadioFields.count();
        const radioElement = await selectionRadioFields.nth(0);
        const isChecked = await radioElement.isChecked();
        if (!isChecked) {
          await radioElement.click();
        }
        const multipleChoiceLabels = await ccdField.locator('.multiple-choice label');
        const mcFirstLabel = await multipleChoiceLabels.nth(0);
        cucumberReporter.AddMessage(fieldName + ' : first option selected : ' + await getText(mcFirstLabel), LOG_LEVELS.Debug);
        this._appendFormPageValues(fieldName1, await getText(mcFirstLabel));
        break;
      case 'ccd-write-complex-type-field':
        cucumberReporter.AddMessage(fieldName + ' : complex field values');
        var writeFields = await ccdField.locator('ccd-field-write');
        for (let fieldcounter = 0; fieldcounter < await writeFields.count(); fieldcounter++) {
          const isHidden = await (await writeFields.nth(fieldcounter)).getAttribute('hidden');
          if (isHidden) {
            continue;
          }
          var ccdSubField = await (await writeFields.nth(fieldcounter)).elementByXpath('./div/*');
          await this._writeToField(ccdSubField, fieldName);
        }
        cucumberReporter.AddMessage(fieldName + ' : complex field values', LOG_LEVELS.Debug);
        break;
      case 'ccd-write-collection-field':
        cucumberReporter.AddMessage(fieldName + ' : complex write collection values', LOG_LEVELS.Debug);
        var addNewBtn = await ccdField.locator('.panel button');
        for (let i = 0; i < 3; i++) {
          await addNewBtn.click();
          var writeFields = await ccdField.locator('.panel > .form-group > .form-group>ccd-field-write');
          const writeFieldsCount = await writeFields.count();

          for (var count = 0; count < writeFieldsCount; count++) {
            var ccdSubField = await (await writeFields.nth(count)).elementByXpath('./div/*');
            const subFieldText = await getText(ccdSubField);
            await this._writeToField(ccdSubField, `${fieldName}[0]`);
          }

          cucumberReporter.AddMessage(fieldName + ' : complex write collection values', LOG_LEVELS.Debug);
        }

        break;
      default:
        console.log('Unknown field type : ' + ccdFileTagName);

        cucumberReporter.AddMessage(fieldName + ' : unknown ccd field container ' + ccdFileTagName + '. Please check if container is missing in test config or changed', LOG_LEVELS.Debug);
    }
  }

  _fieldValue(fieldName) {
    let value = 'fieldName';
    console.log('Read field value : ' + fieldName);
    if (this.caseData[fieldName]) {
      value = this.caseData[fieldName];
    } else if (fieldName.includes('Optional')) {
      value = '';
    } else {
      value = 'test ' + fieldName;
    }
    return value;
  }

  async _appendFormPageValues(key, value, page) {
    if (key || value) {
      this.checkURanswerPageVal = this.checkURanswerPageVal ? this.checkURanswerPageVal : [];
      let label;
      let keyVal;
      if (key.includes('Optional')) {
        label = key.split(' (Optional)');
      }
      const objKey = label ? label[0] : key;

      if (typeof (value) === 'number') {
        keyVal = value.toString();
      }
      const objValue = keyVal ? keyVal : value;
      this.checkURanswerPageVal.push({ [objKey]: objValue });
    }
    if (page == 'caseEditPage') {
      return this.checkURanswerPageVal;
    }
  }
}
module.exports = CaseManager;
