const BrowserWaits = require('../../../e2e/support/customWaits');
const reportLogger = require('../../../e2e/support/reportLogger');
const ccdApi = require('../../../nodeMock/ccd/ccdApi');

class CaseListPage{

    pageContainer = $('exui-case-list');
    dynamicFiltersContainer = $('#dynamicFilters');
    applyBtnWorkbasketFilters = $('ccd-workbasket-filters button:not(.button-secondary)');
    resetBtnWorkbasketFilters = $('ccd-workbasket-filters button.button-secondary]');
    caseListTableHead = $("ccd-search-result>table>thead tr th");
    caseListTableTr = $$("ccd-search-result>table>tbody>tr");
    caseResultsPagination = $('ccd-search-result .pagination-top');

    async amOnPage(){
        try{
            await BrowserWaits.waitForElement(this.pageContainer); 
            return true;
        }catch(error){
            reportLogger.AddMessage("Error waiting for case list page "+error);
            return false;
        }
    }

    async isWorkbasketFilterDisplayed(fieldConfig){
        // await this.amOnPage(); 
        return await this.dynamicFiltersContainer.$(`#dynamicFilters .form-group #${fieldConfig.field.id}`).isDisplayed(); 
    }

    async validateDynamicFields(dynamicfield){

        if (dynamicfield.field.field_type.type.includes("List")) {
            const fieldConfigList = dynamicfield.field.field_type.fixed_list_items;
            console.log("fieldConfigList:::",JSON.stringify(fieldConfigList));
            const listValuesRendered = await this.getFieldListValues(dynamicfield);
            console.log("listValuesRendered:::",JSON.stringify(listValuesRendered));
            expect(listValuesRendered.length, JSON.stringify(listValuesRendered) + " " + JSON.stringify(fieldConfigList)).to.equal(fieldConfigList.length)
            fieldConfigList.forEach(listItem => {
                expect(listValuesRendered.includes(listItem.code)).to.be.true
            });

        } else if (dynamicfield.field.field_type.type.includes("YesOrNo")) {
            const listValuesRendered = await this.getFieldListValues(dynamicfield);
            expect(listValuesRendered.length).to.equal(2);
            ["Yes", "No"].forEach(item => {
                expect(listValuesRendered.includes(item)).to.be.true
            });
        }

    }

    async getFieldListValues(fieldConfig){
        const type = fieldConfig.field.field_type.type;
        if (type === "YesOrNo" || type === "FixedRadioList" ){
            const radioInputs = this.dynamicFiltersContainer.$$(`#${fieldConfig.field.id} input[type=radio]`);
            const radiosCount = await radioInputs.count();
            const radioValues = [];
            for (let radioCounter = 0; radioCounter < radiosCount; radioCounter++){
                radioValues.push(await radioInputs.get(radioCounter).getAttribute("ng-reflect-value")); 
            } 
            return radioValues; 
        }
         if(type === "FixedList"){
             const selectOptions = this.dynamicFiltersContainer.$$(`#${fieldConfig.field.id} option[ng-reflect-ng-value]`);
             const selectOptionsCount = await selectOptions.count();
             const optionValues = [];
             for (let optionCounter = 0; optionCounter < selectOptionsCount; optionCounter++) {
                 optionValues.push(await selectOptions.get(optionCounter).getAttribute("ng-reflect-ng-value"));
             }
             return optionValues;
         }

        if (type === "MultiSelectList") {
            const checkBoxes = this.dynamicFiltersContainer.$$(`#${fieldConfig.field.id} input[type=checkbox]`);
            const checkBoxesCount = await checkBoxes.count();
            const checkBoxValues = [];
            for (let checkboxCounter = 0; checkboxCounter < checkBoxesCount; checkboxCounter++) {
                checkBoxValues.push(await checkBoxes.get(checkboxCounter).getAttribute("value"));
            }
            return checkBoxValues;
        }
        return null;
    }

    async inputWorkbasketFilter(fieldConfig,input){
        let inputValue = null;
        if (await this.isWorkbasketFilterDisplayed(fieldConfig)){
            const type = fieldConfig.field.field_type.type; 
            switch(type){
                case "Text":
                    const inputText = input ? input : fieldConfig.label+" test" 
                    await this.dynamicFiltersContainer.$(`.form-group #${fieldConfig.field.id}`).sendKeys(inputText);
                    inputValue = inputText; 
                    break;
                case "FixedRadioList":
                    const inputRadio = input ? input : fieldConfig.field.field_type.fixed_list_items[0].code ;
                    await this.dynamicFiltersContainer.$(`.form-group #${fieldConfig.field.id} input#${fieldConfig.field.id}-${inputRadio}`).click();
                    inputValue = inputRadio;
                    break;
                case "YesOrNo":
                    let inputYesNo = input ? input : "Yes";
                    inputYesNo = fieldConfig.field.id + "-" + inputYesNo; 
                    await this.dynamicFiltersContainer.$(`.form-group #${fieldConfig.field.id} input#${inputYesNo}`).click();
                    inputValue = inputYesNo.includes("Yes") ? "Yes": "No";
                    break;
                case "FixedList":
                    inputValue = input ? input : fieldConfig.field.field_type.fixed_list_items[0].code;
                    await this.dynamicFiltersContainer.$(`.form-group #${fieldConfig.field.id} option[ng-reflect-ng-value=${inputValue}]`).click(); 
                    break;
                case "MultiSelectList":
                    inputValue = input ? input : fieldConfig.field.field_type.fixed_list_items.map(item => item.code);
                    for (const selectInput of inputValue){
                        await this.dynamicFiltersContainer.$(`.form-group #${fieldConfig.field.id} input#${fieldConfig.field.id}-${selectInput}`).click(); 
                    }

                    break;
            }
        }
        return inputValue;
    }

    async clickApplyWorkbasketFilters(){
        await this.amOnPage();
        await browser.executeScript('arguments[0].scrollIntoView()', this.applyBtnWorkbasketFilters);
        await this.applyBtnWorkbasketFilters.click(); 
    }


    async caseDataValidation(){

        let caseFields = await this.validateCaseFields();
        let cases = ccdApi.getWorkbasketCases();
        console.log("caseFields::",JSON.stringify(caseFields));
        for (const caseObj in cases.columns){
            console.log("cases.columns[caseObj].label::",cases.columns[caseObj].label);
            expect(caseFields).to.be.contain(cases.columns[caseObj].label);
        }

        let caseValues = await this.validateCaseValues();

        for (const casevalue in caseValues){
            let thObj = cases.columns.find(caseObj=>caseObj.label == caseFields[casevalue]);
            let thKey = thObj.case_field_id;

            let value = cases.results[0].case_fields[thKey] ? cases.results[0].case_fields[thKey] : "";

            expect(caseValues).to.be.contain(value.toString());

        }

    }
    async validateCaseFields(){

        await BrowserWaits.waitForElement(this.caseResultsPagination);
        let thLable = $$("ccd-search-result>table>thead tr th");
        await BrowserWaits.waitForElement(this.caseListTableHead);
        let count = await thLable.count();
        console.log("count::",count);
        let caseResultsThTitle = [];
        if (count) {
            for (let i = 1; i < count; i++) {
                let thText = thLable.get(i).$$(".search-result-column-label");
                let text = await thText.getText();
                caseResultsThTitle.push(`${text}`);
            }
            return await caseResultsThTitle;
        }
    }

    async validateCaseValues() {
        await BrowserWaits.waitForElement(this.caseResultsPagination);
        let caseListTd = element.all(by.xpath(`//table/tbody/tr[1]/td`));
        let tdCount = await caseListTd.count();
        // let caseListTd = element.all(by.xpath(`//table/tbody/tr[1]/td`));
        await BrowserWaits.waitForElement(this.caseListTableHead);
        console.log("tdCount",tdCount);
        let caseData = [];
        for (let i = 1; i < tdCount; i++) {
            let thText = caseListTd.get(i).$$("ccd-field-read-label");
            let text = await thText.getText();
            let updatedText =await text.toString().replace(/-/g, "");
            caseData.push(`${updatedText}`);
        }
        return await caseData;
    }

    async getCasesCount(){
        await BrowserWaits.waitForElement(this.caseResultsPagination);
       return await this.caseListTableTr.count();
    }
    

}

module.exports = new CaseListPage();
