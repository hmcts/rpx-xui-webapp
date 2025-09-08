const { $, $$ } = require('../../../helpers/globals');
const BrowserWaits = require('../../../e2e/support/customWaits');
const reportLogger = require('../../../codeceptCommon/reportLogger');
const ccdApi = require('../../mockData/ccd/ccdApi');

class CaseListPage {
  get pageContainer() {
    return $('exui-case-list');
  }
  get dynamicFiltersContainer() {
    return $('#dynamicFilters');
  }
  get applyBtnWorkbasketFilters() {
    return $('ccd-workbasket-filters button:not(.button-secondary)');
  }
  get resetBtnWorkbasketFilters() {
    return $('ccd-workbasket-filters button.button-secondary');
  }
  get caseListTableHead() {
    return $('ccd-search-result>table>thead tr th');
  }
  get caseListTableTr() {
    return $$('ccd-search-result>table>tbody>tr');
  }
  get caseResultsPagination() {
    return $('ccd-search-result .pagination-top');
  }

  async amOnPage() {
    try {
      await BrowserWaits.waitForElement(this.pageContainer);
      return true;
    } catch (error) {
      reportLogger.AddMessage('Error waiting for case list page ' + error);
      return false;
    }
  }

  async isDynamicFilterDisplayed() {
    try {
      await BrowserWaits.waitForElement(this.dynamicFiltersContainer);
      return true;
    } catch (err) {
      return false;
    }
  }

  async isWorkbasketFilterDisplayed(fieldConfig) {
    await BrowserWaits.waitForElement(this.dynamicFiltersContainer);
    return await this.dynamicFiltersContainer.locator(`#dynamicFilters .form-group #${fieldConfig.field.id}`).isVisible();
  }

  async validateDynamicFields(dynamicfield) {
    const listValuesRendered = await this.getFieldListValues(dynamicfield);
    const expectedItems = dynamicfield.field.field_type.fixed_list_items || ['Yes', 'No'];
    expect(listValuesRendered.length).to.equal(expectedItems.length);
    expectedItems.forEach((item) => {
      const code = typeof item === 'string' ? item : item.code;
      expect(listValuesRendered.includes(code)).to.be.true;
    });
  }

  async getFieldListValues(fieldConfig) {
    const type = fieldConfig.field.field_type.type;
    const id = fieldConfig.field.id;
    let elements;

    if (type === 'YesOrNo' || type === 'FixedRadioList') {
      elements = this.dynamicFiltersContainer.locator(`#${id} input[type=radio]`);
    } else if (type === 'FixedList') {
      elements = this.dynamicFiltersContainer.locator(`#${id} option[ng-reflect-ng-value]`);
    } else if (type === 'MultiSelectList') {
      elements = this.dynamicFiltersContainer.locator(`#${id} input[type=checkbox]`);
    } else {
      return null;
    }

    const count = await elements.count();
    const values = [];
    for (let i = 0; i < count; i++) {
      values.push(await elements.nth(i).getAttribute(type === 'FixedList' ? 'ng-reflect-ng-value' : 'value'));
    }
    return values;
  }

  async inputWorkbasketFilter(fieldConfig, input) {
    const type = fieldConfig.field.field_type.type;
    const id = fieldConfig.field.id;
    let inputValue = input;

    if (!await this.isWorkbasketFilterDisplayed(fieldConfig)) return null;

    if (type === 'Text') {
      inputValue = inputValue || `${fieldConfig.label} test`;
      await this.dynamicFiltersContainer.locator(`.form-group #${id}`).type(inputValue);
    } else if (type === 'FixedRadioList') {
      inputValue = inputValue || fieldConfig.field.field_type.fixed_list_items[0].code;
      await this.dynamicFiltersContainer.locator(`#${id}-${inputValue}`).click();
    } else if (type === 'YesOrNo') {
      inputValue = `${id}_${inputValue || 'Yes'}`;
      await this.dynamicFiltersContainer.locator(`#${inputValue}`).click();
      inputValue = inputValue.includes('Yes') ? 'Yes' : 'No';
    } else if (type === 'FixedList') {
      inputValue = inputValue || fieldConfig.field.field_type.fixed_list_items[0].code;
      await this.dynamicFiltersContainer.locator(`option[ng-reflect-ng-value=${inputValue}]`).click();
    } else if (type === 'MultiSelectList') {
      inputValue = inputValue || fieldConfig.field.field_type.fixed_list_items.map((item) => item.code);
      for (const code of inputValue) {
        await this.dynamicFiltersContainer.locator(`#${id}-${code}`).click();
      }
    }

    return inputValue;
  }

  async clickApplyWorkbasketFilters() {
    await this.amOnPage();
    await this.applyBtnWorkbasketFilters.scrollIntoViewIfNeeded();
    await this.applyBtnWorkbasketFilters.click();
  }

  async caseDataValidation() {
    const caseFields = await this.validateCaseFields();
    const cases = ccdApi.getWorkbasketCases();
    for (const col of cases.columns) {
      expect(caseFields).to.include(col.label);
    }

    const caseValues = await this.validateCaseValues();
    for (const val of caseValues) {
      if (caseFields.includes(val)) {
        const col = cases.columns.find(c => c.label === val);
        const key = col.case_field_id;
        const expectedValue = cases.results[0].case_fields[key] || '';
        expect(caseValues).to.include(expectedValue.toString());
      }
    }
  }

  async validateCaseFields() {
    await BrowserWaits.waitForElement(this.caseResultsPagination);
    await BrowserWaits.waitForElement(this.caseListTableHead);
    const headers = $$('ccd-search-result>table>thead tr th');
    const count = await headers.count();
    const titles = [];
    for (let i = 0; i < count; i++) {
      const text = await headers.nth(i).locator('.search-result-column-label').textContent();
      titles.push(text.trim());
    }
    return titles;
  }

  async validateCaseValues() {
    await BrowserWaits.waitForElement(this.caseResultsPagination);
    await BrowserWaits.waitForElement(this.caseListTableHead);
    const tds = $$('table tbody tr:nth-of-type(1) td');
    const count = await tds.count();
    const values = [];
    for (let i = 0; i < count; i++) {
      const text = await tds.nth(i).locator('ccd-field-read-label').textContent();
      values.push(text.replace(/-/g, ''));
    }
    return values;
  }

  async getCasesCount() {
    await BrowserWaits.waitForElement(this.caseResultsPagination);
    return await this.caseListTableTr.count();
  }
}

module.exports = new CaseListPage();
