const CucumberReportLogger = require('../../../codeceptCommon/reportLogger');
const { $, $$, currentUrl, elementByCss, elementByXpath, elementsByXpath, isPresent } = require('../../../helpers/globals');
const BrowserWaits = require('../../support/customWaits');
const { LOG_LEVELS } = require('../../support/constants');
const RuntimeTestData = require('../../support/runtimeTestData');
const CcdApi = require('../../utils/ccdApi');
const CaseListPage = require('../pageObjects/CaseListPage');
Button = require('./webdriver-components/button.js');

class caseEditPage {
  constructor() {
    this.userName = 'lukesuperuserxui_new@mailnesia.com';
    this.password = 'Monday01';
    this.checkURanswerPageData;

    this.caseListPage = new CaseListPage();

    this.caseEventApiResponse = null;
  }

  get searchResultsTopPagination() { return $('ccd-search-result .pagination-top'); }
  get ccdCaseEdit() { return $('ccd-case-edit'); }
  get continueButton() { return new Button('button[type=submit]'); }
  get validationErrorContainer() { return $('ccd-case-edit-page .govuk-error-summary'); }

  async isValidationErrorDisplayed() {
    return await isPresent(this.validationErrorContainer);
  }

  async getValidationErrorMessageDisplayed() {
    return await this.validationErrorContainer.textContent();
  }

  async validateWorkbasketInputs(reqPath) {
    const workBasketFields = await CcdApi.getWorkbasketAPIRes(reqPath);
    await BrowserWaits.retryWithActionCallback(async () => {
      try {
        let WBfieldIdPresent;
        if (workBasketFields) {
          for (let i = 0; i < workBasketFields.workbasketInputs.length; i++) {
            WBfieldIdPresent = $(`#${workBasketFields.workbasketInputs[i].field.id}`);
            await BrowserWaits.waitForElement(WBfieldIdPresent);
            expect(await isPresent(WBfieldIdPresent), `Case creation ${WBfieldIdPresent} field should be present`).to.be.true;
          }
        }
      } catch (err) {
        const caseTypeToSelect = RuntimeTestData.workbasketInputs.casetype;
        for (const caseType of RuntimeTestData.workbasketInputs.casetypes) {
          if (caseType !== caseTypeToSelect) {
            await this.caseListPage.selectCaseType(caseType);
            break;
          }
        }
        await BrowserWaits.waitForSeconds(2);
        await this.caseListPage.selectCaseType(caseTypeToSelect);
        throw new Error(err);
      }
    });
  }

  async validateSearchInputs(reqPath) {
    const searchInputFields = await CcdApi.getSearchInputsAPIRes(reqPath);
    let SIfieldIdPresent;
    if (searchInputFields) {
      for (let i = 0; i < searchInputFields.searchInputs.length; i++) {
        SIfieldIdPresent = $(`#${searchInputFields.searchInputs[i].field.id}`);
        await BrowserWaits.waitForElement(SIfieldIdPresent);
        expect(await isPresent(SIfieldIdPresent), `Case creation ${SIfieldIdPresent} field should be present`).to.be.true;
      }
    }
  }

  async complexFieldVal(WBField) {
    switch (WBField.field_type.type) {
      case 'FixedRadioList':
        await BrowserWaits.waitForElement($('.multiple-choice label'));
        const APIResList = [];
        const webResList = [];
        for (let i = 0; i < WBField.field_type.fixed_list_items.length; i++) {
          APIResList.push(WBField.field_type.fixed_list_items[i].label);
        }
        var selectionRadioFields = $$('.multiple-choice label');
        var selectionFieldsCount = await selectionRadioFields.count();
        // console.log("selectionFieldsCount" + selectionFieldsCount);
        for (let i = 0; i < selectionFieldsCount; i++) {
          const fixedListValue = await selectionRadioFields.nth(i).textContent();
          webResList.push(fixedListValue);
        }
        expect(APIResList.sort()).to.eql(webResList.sort());
        break;
      default:
        console.log('Unknown field type : ' + WBField);
    }
  }

  async validateWorkbasketInputsComplexValues(reqPath) {
    const workBasketFields = await CcdApi.getWorkbasketAPIRes(reqPath);
    if (workBasketFields) {
      for (let i = 0; i < workBasketFields.workbasketInputs.length; i++) {
        await this.complexFieldVal(workBasketFields.workbasketInputs[i].field);
      }
    }
  }

  async workBasketHeaders(index) {
    await BrowserWaits.waitForElement(this.searchResultsTopPagination);
    CucumberReportLogger.AddMessage('starting wait for 2 sec for list to render  : ' + new Date().toTimeString(), LOG_LEVELS.Debug);
    await BrowserWaits.waitForSeconds(2);
    CucumberReportLogger.AddMessage('wait complete : ' + new Date().toTimeString(), LOG_LEVELS.Debug);
    const thLable = $$('ccd-search-result>table>thead tr th');
    await BrowserWaits.waitForElement($('ccd-search-result>table>thead tr th'));
    const count = await thLable.count();
    const caseResultsThTitle = [];
    if (count) {
      for (let i = index ? index : 0; i < count; i++) {
        const thText = thLable.nth(i).locator('.search-result-column-label');
        const text = await getText(thText);
        if (text.length !== 0) {
          caseResultsThTitle.push(`${text}`);
        }
      }
      return await caseResultsThTitle;
    }
  }

  async caseResultsThTitleApiRes(URL) {
    const response = await CcdApi.getCasesApiReq(URL);
    return await response.columns.map((data) => data.label);
  }

  async seeCaseDetailsPageTabs() {
    const caseDetailsRes = await CcdApi.getCaseResultsResponse();
    const thLable = $$('.mat-tab-list .mat-tab-labels .mat-tab-label');
    await BrowserWaits.waitForElement($('.mat-tab-list .mat-tab-labels .mat-tab-label'));
    const tabsCount = await thLable.count();
    if (caseDetailsRes) {
      for (let i = 0; i < tabsCount; i++) {
        const thText = thLable.nth(i).locator('.mat-tab-label-content');
        const tabText = await thText.textContent();
        const tab = await caseDetailsRes.tabs.find((tab) => tab.label == tabText);
        const tabStatus = tab.label == tabText;
        expect(true, `${tab.label} is not present in the web`).to.eql(tabStatus);
      }
    }
  }

  async caseDetailsCheck() {
    const caseDetailsRes = await CcdApi.getCaseResultsResponse();
    this.caseDetailsTabs = $$('mat-tab-body table tbody>div>tbody');
    const tabHeaders = await $$('mat-tab-header .mat-tab-label');
    const numberOfTabs = await tabHeaders.count();

    for (let tabIndex = 0; tabIndex < numberOfTabs; tabIndex++) {
      const tabHeader = tabHeaders.nth(tabIndex);
      const tabName = await tabHeader.textContent();
      await tabHeader.click();
      await BrowserWaits.waitForSeconds(1);

      const fieldCount = await this.caseDetailsTabs.count();
      const tab = await caseDetailsRes.tabs.find((tab) => tab.label == tabName);
      for (let count = 0; count < fieldCount; count++) {
        const complexFieldTable = await this.caseDetailsTabs.nth(count).locator('./*');
        const thCF = complexFieldTable.locator('tr th');
        const tdCF = complexFieldTable.locator('tr td');
        const webTableLabel = await thCF.textContent();
        const value = await tdCF.textContent();
        const field = await tab.fields.find((tab) => tab.label == webTableLabel);
        if (field.value && value && field.value.length > 0) {
          const resKeyVal = await this._getKeyVal(field);
          const fieldStatus = resKeyVal == value && field.label == webTableLabel;
          expect(true, `${resKeyVal} is not present in the web`).to.eql(fieldStatus);
        } else {
          const fieldLabelStatus = field.label == webTableLabel;
          expect(true, `${field.label} is not present in the web`).to.eql(fieldLabelStatus);
        }
      }
    }
  }

  async nextStepTriggerApiRes() {
    const caseDetailsRes = await CcdApi.getCaseResultsResponse();
    const res = caseDetailsRes.triggers.map((trigger) => trigger.name);
    return res;
  }

  async nextStepTriggerActions() {
    const ccd_event_trigger = $('select#next-step');

    return await ccd_event_trigger.getSelectOptions();
  }

  async clickNextStepTriggerActions() {
    await BrowserWaits.waitForElement(this.ccdCaseEdit);
    expect(isPresent(this.ccdCaseEdit)).to.be.equal;
  }

  _getOptionSelectorWithText(optionText) {
    return elementByXpath('//option[text() = \'' + optionText + '\']');
  }

  async wizardPageFormFieldValidations(pageNo) {
    if (!this.caseEventApiResponse) {
      this.caseEventApiResponse = await CcdApi.getCaseCreationpagesApiRes();
    }
    const wizardPage = this.caseEventApiResponse;
    const wizardPage1 = wizardPage.wizard_pages[pageNo].wizard_page_fields;
    let fieldIdPresent;
    if (wizardPage1) {
      for (var i = 1; i < wizardPage1.length; i++) {
        const caseField = await wizardPage.case_fields.find((caseObj) => caseObj.id == wizardPage1[i].case_field_id);

        if (wizardPage1[i].case_field_id !== 'Organisation1') {
          fieldIdPresent = await this._getFieldId(caseField, wizardPage1[i]);
        }
      }
    }
  }

  async _getFieldId(caseField, wizardPage1) {
    let fieldIdPresent;
    switch (caseField.field_type.type) {
      case 'Complex':
        if (wizardPage1.case_field_id != 'CaseLink1') {
          if (caseField.field_type.complex_fields.length && caseField.field_type.complex_fields.length == 1) {
            if (caseField.field_type.complex_fields[0].field_type == 'Text') {
              fieldIdPresent = $(`#${wizardPage1.case_field_id}`);
            }
          } else {
            fieldIdPresent = $(`#${wizardPage1.case_field_id}_${wizardPage1.case_field_id}`);
          }
        } else {
          fieldIdPresent = $(`#${wizardPage1.case_field_id}`);
        }
        return fieldIdPresent;
      default:
        return $(`#${wizardPage1.case_field_id}`);
    }
  }

  async validateSummeryPageLinks() {
    const checkURanswerPage = elementsByXpath('//table[@class=\'form-table\']/tbody/tr');
    await BrowserWaits.waitForElement($('ccd-case-edit-submit form table tbody tr'));
    const tdCount = await checkURanswerPage.count();
    for (let count = 0; count < tdCount; count++) {
      const trxpath = elementByXpath(`//table[@class='form-table']/tbody/tr[${count + 1}]/td[2]/a`);
      const tagName = await trxpath.getTagName();
      expect(tagName).to.eql('a');
    }
  }

  async validateCheckYouranswerPage(createCaseFormData) {
    this.checkURanswerPageData = this.checkURanswerPageData ? this.checkURanswerPageData : [];
    const checkURanswerPage = elementsByXpath('//table[@class=\'form-table\']/tbody/tr');
    await BrowserWaits.waitForElement($('ccd-case-edit-submit form table tbody tr'));
    const trCount = await checkURanswerPage.count();
    if (trCount >= 0) {
      for (let count = 0; count < trCount; count++) {
        const th = await checkURanswerPage.nth(count).elementByXpath('./*');
        const trxpath = elementByXpath(`//table[@class='form-table']/tbody/tr[${count + 1}]/td`);
        const dl = await isPresent(checkURanswerPage.nth(count).elementByCss('td ccd-field-read dl'));
        const tdInsideTable = await isPresent(checkURanswerPage.nth(count).elementByCss('td ccd-field-read ccd-read-multi-select-list-field table'));
        if (!dl && !tdInsideTable) {
          this.checkURanswerPageData.push({ [await th.textContent()]: await trxpath.textContent() });
        }
        if (dl) {
          await this._dlData(count);
        }
      }
    }
    if (this.checkURanswerPageData && this.checkURanswerPageData.length > 0) {
      for (let i = 0; i < this.checkURanswerPageData.length; i++) {
        if ((Object.keys(this.checkURanswerPageData[i]).toString() == 'Date' || Object.keys(this.checkURanswerPageData[i]).toString() == 'Date and time' || Object.keys(this.checkURanswerPageData[i]).toString() == 'Date Time' || Object.keys(this.checkURanswerPageData[i]).toString() == 'Date of birth') && Object.keys(this.checkURanswerPageData[i]).toString()) {
          const date = new Date(Object.values(this.checkURanswerPageData[i]).toString());
          date.setDate(date.getDate());
          const keyVal = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear();
          this.checkURanswerPageData[i][Object.keys(this.checkURanswerPageData[i]).toString()] = keyVal;
        }
        if (Object.values(this.checkURanswerPageData[i]).toString() && Object.keys(this.checkURanswerPageData[i]).toString() !== 'Compliance' && Object.keys(this.checkURanswerPageData[i]).toString() !== '') {
          expect(createCaseFormData).to.deep.include(this.checkURanswerPageData[i]);
        }
      }
    }
  }

  async _dlData(count) {
    const checkURanswerPage = elementsByXpath('//table[@class=\'form-table\']/tbody/tr');
    const dd = checkURanswerPage.nth(count).locator('td ccd-field-read dl dd');
    const dt = checkURanswerPage.nth(count).locator('td ccd-field-read dl dt');
    for (let dtCount = 0; dtCount < await dt.count(); dtCount++) {
      const isDisplayed = await await dd.nth(dtCount).isVisible();
      if (!isDisplayed) {
        continue;
      }
      const ddValue = await dd.nth(dtCount).textContent();
      const dtLabel = await dt.nth(dtCount).textContent();
      this.checkURanswerPageData.push({ [dtLabel]: ddValue });
    }
  }

  async validateMandatoryFields() {
    const currentPageElement = $('ccd-case-edit-page');
    await BrowserWaits.waitForElement(currentPageElement);

    const buttonEnable = await this.continueButton.isEnabled();
    expect(buttonEnable).to.eql(true);

    // await browser.executeScript('arguments[0].scrollIntoView()',
    //     $('button[type=submit]').getWebElement())
    await this.continueButton.click();
    const e = $('#TextField');
    const errormsg = await $('ccd-write-text-field .error-message').textContent();
    expect(errormsg.trim()).to.eql('Text Field is required');
  }

  async eventPageDisplayShowCondition() {
    const currentPageElement = $('ccd-case-edit-page');
    await BrowserWaits.waitForElement(currentPageElement);
    await $('#TextField').fill('test text value');

    const selectionFields = $('#Gender').locator('.multiple-choice input');
    await selectionFields.nth(0).click();

    const continieElement = elementByXpath('//button[@type= "submit"]');
    // await browser.executeScript('arguments[0].scrollIntoView()',
    //     continieElement.getWebElement())

    await BrowserWaits.waitForElement(continieElement);
    await BrowserWaits.waitForElementClickable(continieElement);
    const thisPageUrl = await currentUrl();
    console.log('Submitting : ' + thisPageUrl);

    await BrowserWaits.retryWithActionCallback(async () => {
      await continieElement.click();
      await BrowserWaits.waitForPageNavigation(thisPageUrl);
      const page3 = await elementByCss('ccd-case-edit-page h1');
      expect(await page3.textContent()).to.contains('Page 3');
    });
  }

  async _getKeyVal(field) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    switch (field.field_type.type) {
      case 'MoneyGBP':
        const priceConvert = field.value.toString().split('').map(Number).slice(0, -2).join('');
        return '£' + parseInt(priceConvert).toFixed(2);
      case 'Date':
        var date = new Date(field.value);
        date.setDate(date.getDate());
        date = date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
        return date;
      case 'DateTime':
        var fieldDate = new Date(field.value).toLocaleString('en-UK', { hour12: true });
        const time = fieldDate.split(', ');
        var date1 = time[0].split('/');
        // date1.setDate(date1.getDate())
        CucumberReportLogger.AddMessage(date1);
        date1 = date1[1] + ' ' + monthNames[parseInt(date1[0]) - 1] + ' ' + date1[2] + ', ' + time[1].toUpperCase();
        return date1;
      default: return field.value;
    }
  }
}
module.exports = caseEditPage;
