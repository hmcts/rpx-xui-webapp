const BrowserWaits = require('../../../e2e/support/customWaits');
const reportLogger = require('../../../e2e/support/reportLogger');

class CaseListPage{

    pageContainer = $('exui-case-list');
    dynamicFiltersContainer = $('#dynamicFilters');
    applyBtnWorkbasketFilters = $('ccd-workbasket-filters button:not(.button-secondary)');
    resetBtnWorkbasketFilters = $('ccd-workbasket-filters button.button-secondary]');


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
        await this.amOnPage(); 
        return await this.dynamicFiltersContainer.$(`#dynamicFilters .form-group #${fieldConfig.field.id}`).isDisplayed(); 
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

}

module.exports = new CaseListPage();
