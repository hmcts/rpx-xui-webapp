var Request = require('../../utils/request');
var BrowserWaits = require('../../support/customWaits');
const CucumberReportLogger = require('../../support/reportLogger');

class TcPage {
    constructor() {
        this.userName = 'lukesuperuserxui@mailnesia.com';
        this.password = 'Monday01';
        this.searchResultsTopPagination = $("ccd-search-result .pagination-top");
        this.ccdCaseEdit = $('ccd-case-edit')
        this.caseCreationApiRes;
        this.workBasketInputsAPiRes;
        this.searchInputsAPiRes;
        this.casesApiRes;
    }

    async getCaseCreationpagesApiRes() {
        if (!this.caseCreationApiRes) {
            await Request.withSession(this.userName, this.password);
            let reqPath = `data/internal/case-types/xuiTestCaseType/event-triggers/createCase?ignore-warning=false`;
            const response = await Request.get(reqPath, { experimental: true });
            this.caseCreationApiRes = response.data;
        }
        return this.caseCreationApiRes;
    }

    async getWorkbasketAPIRes() {
        if (!this.workBasketInputsAPiRes) {
            await Request.withSession(this.userName, this.password);
            let reqPath = `data/internal/case-types/xuiTestCaseType/work-basket-inputs`;
            const response = await Request.get(reqPath, { experimental: true });
            this.workBasketInputsAPiRes = response.data;
        }
        return this.workBasketInputsAPiRes;
    }

    async validateWorkbasketInputs() {
        let workBasketFields = this.workBasketInputsAPiRes ? this.workBasketInputsAPiRes : await this.getWorkbasketAPIRes();
        let WBfieldIdPresent;
        if(workBasketFields){
            for (var i = 0; i < workBasketFields.workbasketInputs.length; i++) {
                WBfieldIdPresent = $(`#${workBasketFields.workbasketInputs[i].field.id}`);
                await BrowserWaits.waitForElement(WBfieldIdPresent);
                expect(await WBfieldIdPresent.isPresent(), `Case creation ${WBfieldIdPresent} field should be present`).to.be.true;
            }
        }
    }

    async getSearchInputsAPIRes() {
        if (!this.searchInputsAPiRes) {
            await Request.withSession(this.userName, this.password);
            let reqPath = `data/internal/case-types/xuiTestCaseType/search-inputs`;
            const response = await Request.get(reqPath, { experimental: true });
            this.searchInputsAPiRes = response.data;
        }
        return this.searchInputsAPiRes;
    }

    async validateSearchInputs() {
        let searchInputFields = this.searchInputsAPiRes ? this.searchInputsAPiRes : await this.getSearchInputsAPIRes();
        let SIfieldIdPresent;
        if(searchInputFields){
            for (var i = 0; i < searchInputFields.searchInputs.length; i++) {
                SIfieldIdPresent = $(`#${searchInputFields.searchInputs[i].field.id}`);
                await BrowserWaits.waitForElement(SIfieldIdPresent);
                expect(await SIfieldIdPresent.isPresent(), `Case creation ${SIfieldIdPresent} field should be present`).to.be.true;
            }
        }
    }

    async complexFieldVal(WBField) {
        switch (WBField.field_type.type) {
            case "FixedRadioList":
                await BrowserWaits.waitForElement($(".multiple-choice label"));
                let APIResList = [];
                let webResList = [];
                for (var i = 0; i < WBField.field_type.fixed_list_items.length; i++) {
                    APIResList.push(WBField.field_type.fixed_list_items[i].label)
                }
                var selectionRadioFields = $$(".multiple-choice label");
                var selectionFieldsCount = await selectionRadioFields.count();
                console.log("selectionFieldsCount" + selectionFieldsCount);
                for (let i = 0; i < selectionFieldsCount; i++) {
                    let fixedListValue = await selectionRadioFields.get(i).getText();
                    webResList.push(fixedListValue);
                }
                expect(APIResList).to.eql(webResList);
                break;
            default:
                console.log("Unknown field type : " + WBField);
        }
    }

    async validateWorkbasketInputsComplexValues() {
        let workBasketFields = this.workBasketInputsAPiRes ? this.workBasketInputsAPiRes : await this.getWorkbasketAPIRes();
        if (workBasketFields) {
            for (var i = 0; i < workBasketFields.workbasketInputs.length; i++) {
                await this.complexFieldVal(workBasketFields.workbasketInputs[i].field);
            }
        }
    }

    async wizardPageFormFieldValidations(pageNo) {
        let wizardPage = this.caseCreationApiRes ? this.caseCreationApiRes : await this.getCaseCreationpagesApiRes();
        let wizardPage1 = wizardPage.wizard_pages[pageNo].wizard_page_fields;
        let fieldIdPresent;

        if(wizardPage1){
            for (var i = 1; i < wizardPage1.length; i++) {
                let caseField = await this.caseCreationApiRes.case_fields.find(caseObj => caseObj.id == wizardPage1[i].case_field_id);
                if (wizardPage1[i].case_field_id != "Organisation1") {
                    if (caseField.field_type.type == "Complex") {
                        if (caseField.field_type.complex_fields.length == 1) {
                            if (caseField.field_type.complex_fields[0].field_type == "Text") {
                                fieldIdPresent = $(`#${wizardPage1[i].case_field_id}`);
                            }
                        } else {
                            fieldIdPresent = $(`#${wizardPage1[i].case_field_id}_${wizardPage1[i].case_field_id}`);
                        }
                    } else {
                        fieldIdPresent = $(`#${wizardPage1[i].case_field_id}`);
                    }
                    console.log("Againest api response fields validation::" + await fieldIdPresent);
                    await BrowserWaits.waitForElement(fieldIdPresent);
                    expect(await fieldIdPresent.isPresent(), `Case creation ${fieldIdPresent} field should be present`).to.be.true;
                }
            };
        }
        
    }

    async getCasesApiReq(reqURL) {
        await Request.withSession(this.userName, this.password);
        let reqData = { size: 25 }
        const response = await Request.post(reqURL, reqData, { experimental: true });
        return response.data;
    }

    async workBasketHeaders(index) {
        await BrowserWaits.waitForElement(this.searchResultsTopPagination);
        CucumberReportLogger.AddMessage("starting wait for 2 sec for list to render  : " + new Date().toTimeString());
        await BrowserWaits.waitForSeconds(2);
        CucumberReportLogger.AddMessage("wait complete : " + new Date().toTimeString());
        let thLable = $$("ccd-search-result>table>thead tr th");
        await BrowserWaits.waitForElement($("ccd-search-result>table>thead tr th"));
        let count = await thLable.count();
        console.log("count:" + count+ "index:::"+index);
        let caseResultsThTitle = [];
        if(count){
            console.log("inside if count:" + count+ "index:::"+index);
            for (let i = index; i < count; i++) {
                let thText = thLable.get(i).$$(".search-result-column-label");
                let text = await thText.getText();
                caseResultsThTitle.push(`${text}`);
            }
            return await caseResultsThTitle;
        }
        
    }

    async caseResultsThTitleApiRes(URL) {
        let response = await this.getCasesApiReq(URL);
        return await response.columns.map(data => data.label)
    }

    async getCurrentUrl() {
        let publicUrl;
        const currentUrl = await browser.wait(() => {
            return browser.getCurrentUrl().then((url) => {
                publicUrl = url;
                this.caseId = publicUrl.split('/').slice(5, 6).join('/');
                return this.caseId;
            }).catch((error) => {
                return error;
            });
        });
        return currentUrl;
    }

   
    
}
module.exports = TcPage;
