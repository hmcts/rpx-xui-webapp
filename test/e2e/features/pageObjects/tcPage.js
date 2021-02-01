var Request = require('../../utils/request');
var BrowserWaits = require('../../support/customWaits');
const CucumberReportLogger = require('../../support/reportLogger');
Button = require('./webdriver-components/button.js');

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
        this.continueButton = new Button('button[type=submit]');
        this.checkURanswerPageData;
    }

    async getCaseCreationpagesApiRes() {
        if (!this.caseCreationApiRes) {
            await Request.withSession(this.userName, this.password);
            let reqPath = `data/internal/case-types/xuiTestCaseType/event-triggers/createCase?ignore-warning=false`;
            const response = await Request.get(reqPath, { experimental: true });
            expect(response.status, `${reqPath} ccd api faild status code: ${response.status}`).to.eql(200);
            this.caseCreationApiRes = response.data;
        }
        return this.caseCreationApiRes;
    }

    async getWorkbasketAPIRes() {
        if (!this.workBasketInputsAPiRes) {
            await Request.withSession(this.userName, this.password);
            let reqPath = `data/internal/case-types/xuiTestCaseType/work-basket-inputs`;
            const response = await Request.get(reqPath, { experimental: true });
            expect(response.status, `${reqPath} ccd api faild status code: ${response.status}`).to.eql(200);
            this.workBasketInputsAPiRes = response.data;
        }
        return this.workBasketInputsAPiRes;
    }

    async validateWorkbasketInputs() {
        let workBasketFields = this.workBasketInputsAPiRes ? this.workBasketInputsAPiRes : await this.getWorkbasketAPIRes();
        let WBfieldIdPresent;
        if (workBasketFields) {
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
            expect(response.status, `${reqPath} ccd api faild status code: ${response.status}`).to.eql(200);
            this.searchInputsAPiRes = response.data;
        }
        return this.searchInputsAPiRes;
    }

    async validateSearchInputs() {
        let searchInputFields = this.searchInputsAPiRes ? this.searchInputsAPiRes : await this.getSearchInputsAPIRes();
        let SIfieldIdPresent;
        if (searchInputFields) {
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
        if (wizardPage1) {
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
        expect(response.status, `${reqURL} ccd api faild status code: ${response.status}`).to.eql(200);
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
        console.log("count:" + count + "index:::" + index);
        let caseResultsThTitle = [];
        if (count) {
            console.log("inside if count:" + count + "index:::" + index);
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

    async getCaseResultsResponse() {
        let caseId = this.caseId ? this.caseId : await this.getCurrentUrl();
        await Request.withSession(this.userName, this.password);
        let reqPath = `data/internal/cases/${caseId}`;
        const response = await Request.get(reqPath, { experimental: true });
        expect(response.status, `${reqPath} ccd api faild status code: ${response.status}`).to.eql(200);
        this.caseResponse = response.data;
        return this.caseResponse;
    }

    async seeCaseDetailsPageTabs() {
        let caseDetailsRes = this.caseResponse ? this.caseResponse : await this.getCaseResultsResponse();
        let thLable = $$(".mat-tab-list .mat-tab-labels .mat-tab-label");
        await BrowserWaits.waitForElement($(".mat-tab-list .mat-tab-labels .mat-tab-label"));
        let tabsCount = await thLable.count();
        if (caseDetailsRes) {
            for (let i = 0; i < tabsCount; i++) {
                let thText = thLable.get(i).$$(".mat-tab-label-content");
                let tabText = await thText.getText();
                let tab = await caseDetailsRes.tabs.find(tab => tab.label == tabText);
                let tabStatus = tab.label == tabText;
                expect(true, `${tab.label} is not present in the web`).to.eql(tabStatus);
            }
        }
    }

    async caseDetailsCheck() {
        let caseDetailsRes = this.caseResponse ? this.caseResponse : await this.getCaseResultsResponse();
        this.caseDetailsTabs = $$("mat-tab-body table tbody>div>tbody");
        let fieldCount = await this.caseDetailsTabs.count();
        let tabName = "Tab 2";
        let tab = await caseDetailsRes.tabs.find(tab => tab.label == tabName);

        for (let count = 0; count < fieldCount; count++) {
            let complexFieldTable = await this.caseDetailsTabs.get(count).element(by.xpath('./*'));
            let thCF = complexFieldTable.$$("tr th");
            let tdCF = complexFieldTable.$$("tr td");
            let webTableLabel = await thCF.getText();
            let value = await tdCF.getText();
            let field = await tab.fields.find(tab => tab.label == webTableLabel);
            if (field.value && value && field.value.length > 0) {
                let resKeyVal = await this._getKeyVal(field);
                let fieldStatus = resKeyVal == value && field.label == webTableLabel;
                expect(true, `${resKeyVal} is not present in the web`).to.eql(fieldStatus);
            } else {
                let fieldLabelStatus = field.label == webTableLabel;
                expect(true, `${field.label} is not present in the web`).to.eql(fieldLabelStatus);
            }
        }
    }

    async nextStepTriggerApiRes() {
        let caseDetailsRes = this.caseResponse ? this.caseResponse : await this.getCaseResultsResponse();
        let res = caseDetailsRes.triggers.map(trigger => trigger.name);
        return res;
    }

    async nextStepTriggerActions() {
        let ccd_event_trigger = $$("ccd-event-trigger >form .form-group option");
        let eventCount = await ccd_event_trigger.count();
        let optionValues = [];
        let id = "next-step";
        for (let ecount = 1; ecount <= eventCount; ecount++) {
            let optionText = await element(by.xpath(`//*[@id='${id}']//option[${ecount}]`)).getText()
            optionValues.push(`${optionText}`);
        }
        return optionValues;
    }

    async clickNextStepTriggerActions() {
        let next_step = $("#next-step");
        await BrowserWaits.waitForElement(next_step);
        let thisPageUrl = await browser.getCurrentUrl();
        await $("#next-step").element(this._getOptionSelectorWithText("Update case")).click();
        await BrowserWaits.waitForElement($("ccd-event-trigger >form button"));
        $("ccd-event-trigger >form button").click();
        await BrowserWaits.waitForPageNavigation(thisPageUrl);
        await BrowserWaits.waitForElement(this.ccdCaseEdit);
        expect(this.ccdCaseEdit.isPresent()).to.be.equal;
    }

    _getOptionSelectorWithText(optionText) {
        return by.xpath("//option[text() = '" + optionText + "']");
    }

    async wizardPageFormFieldValidations(pageNo) {
        let wizardPage = this.caseCreationApiRes ? this.caseCreationApiRes : await this.getCaseCreationpagesApiRes();
        let wizardPage1 = wizardPage.wizard_pages[pageNo].wizard_page_fields;
        let fieldIdPresent;
        for (var i = 1; i < wizardPage1.length; i++) {
            let caseField = await this.caseCreationApiRes.case_fields.find(caseObj => caseObj.id == wizardPage1[i].case_field_id);
            // console.log("type:::" + caseField.field_type.type);
            if (wizardPage1[i].case_field_id != "Organisation1") {
                if (caseField.field_type.type == "Complex" && wizardPage1[i].case_field_id != "CaseLink1") {
                    if (caseField.field_type.complex_fields.length == 1) {
                        if (caseField.field_type.complex_fields[0].field_type == "Text") {
                            fieldIdPresent = $(`#${wizardPage1[i].case_field_id}`);
                        }
                    } else {
                        fieldIdPresent = $(`#${wizardPage1[i].case_field_id}_${wizardPage1[i].case_field_id}`);
                    }
                } else {
                    // console.log("wizard page:::" + wizardPage1[i].case_field_id);
                    fieldIdPresent = $(`#${wizardPage1[i].case_field_id}`);
                }
                // console.log("Againest api response field id::" + wizardPage1[i].case_field_id + ":::fieldIdPresent::" + fieldIdPresent);
                await BrowserWaits.waitForElement(fieldIdPresent);
                expect(await fieldIdPresent.isPresent(), `Case creation ${fieldIdPresent} field should be present`).to.be.true;
            }

        };
    }

    async validateSummeryPageLinks() {
        let checkURanswerPage = element.all(by.xpath(`//table[@class='form-table']/tbody/tr`));
        await BrowserWaits.waitForElement($("ccd-case-edit-submit form table tbody tr"));
        let tdCount = await checkURanswerPage.count();
        for (let count = 0; count < tdCount; count++) {
            var trxpath = element(by.xpath(`//table[@class='form-table']/tbody/tr[${count + 1}]/td[2]/a`));
            var tagName = await trxpath.getTagName();
            expect(tagName).to.eql("a");
        }
    }

    async validateCheckYouranswerPage(createCaseFormData) {
        this.checkURanswerPageData = this.checkURanswerPageData ? this.checkURanswerPageData : [];
        let checkURanswerPage = element.all(by.xpath(`//table[@class='form-table']/tbody/tr`));
        await BrowserWaits.waitForElement($("ccd-case-edit-submit form table tbody tr"));
        let trCount = await checkURanswerPage.count();
        if (trCount >= 0) {
            for (let count = 0; count < trCount; count++) {
                let th = await checkURanswerPage.get(count).element(by.xpath('./*'));
                var trxpath = element(by.xpath(`//table[@class='form-table']/tbody/tr[${count + 1}]/td`));
                let dl = await checkURanswerPage.get(count).element(by.css("td ccd-field-read dl")).isPresent();
                let tdInsideTable = await checkURanswerPage.get(count).element(by.css("td ccd-field-read ccd-read-multi-select-list-field table")).isPresent();
                if (!dl && !tdInsideTable) {
                    this.checkURanswerPageData.push({ [await th.getText()]: await trxpath.getText() })
                }
                if (tdInsideTable) {
                    let tableTR = checkURanswerPage.get(count).$$("td ccd-field-read ccd-read-multi-select-list-field table tr");
                }
                if (dl) {
                    await this._dlData(count);
                }
            }
        }
        if (this.checkURanswerPageData && this.checkURanswerPageData.length > 0) {
            for (let i = 0; i < this.checkURanswerPageData.length; i++) {
                if ((Object.keys(this.checkURanswerPageData[i]).toString() == "Date" || Object.keys(this.checkURanswerPageData[i]).toString() == "Date and time" || Object.keys(this.checkURanswerPageData[i]).toString() == "Date Time" || Object.keys(this.checkURanswerPageData[i]).toString() == "Date of birth") && Object.keys(this.checkURanswerPageData[i]).toString()) {
                    let date = new Date(Object.values(this.checkURanswerPageData[i]).toString());
                    date.setDate(date.getDate());
                    let keyVal = String(date.getDate()).padStart(2, '0') + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + date.getFullYear();
                    this.checkURanswerPageData[i][Object.keys(this.checkURanswerPageData[i]).toString()] = keyVal;
                }
                if (Object.values(this.checkURanswerPageData[i]).toString() && Object.keys(this.checkURanswerPageData[i]).toString() != "Compliance") {
                    expect(createCaseFormData).to.deep.include(this.checkURanswerPageData[i]);
                }
            }
        }

    }

    async _dlData(count) {
        let checkURanswerPage = element.all(by.xpath(`//table[@class='form-table']/tbody/tr`));
        let dd = checkURanswerPage.get(count).$$("td ccd-field-read dl dd");
        let dt = checkURanswerPage.get(count).$$("td ccd-field-read dl dt");
        for (let dtCount = 0; dtCount < await dt.count(); dtCount++) {
            let ddValue = await dd.get(dtCount).getText();
            let dtLabel = await dt.get(dtCount).getText();
            this.checkURanswerPageData.push({ [dtLabel]: ddValue });
        }
    }


    async validateMandatoryFields() {
        var currentPageElement = $('ccd-case-edit-page');
        await BrowserWaits.waitForElement(currentPageElement);
        let e = $("#TextField");
        await e.sendKeys(protractor.Key.ENTER);
        await e.sendKeys(protractor.Key.TAB);
        let errormsg = await $("ccd-write-text-field .error-message").getText();
        expect(errormsg).to.eql("This field is required");
        let buttonEnable = await this.continueButton.isEnabled();
        expect(buttonEnable).to.eql(false);
    }

    async eventPageDisplayShowCondition() {
        var currentPageElement = $('ccd-case-edit-page');
        await BrowserWaits.waitForElement(currentPageElement);
        await $("#TextField").sendKeys("test text value");

        let selectionFields = $("#Gender").$$(".multiple-choice input");
        await selectionFields.get(0).click();

        var continieElement = element(by.xpath('//button[@type= "submit"]'));
        await browser.executeScript('arguments[0].scrollIntoView()',
            continieElement.getWebElement())

        await BrowserWaits.waitForElement(continieElement);
        await BrowserWaits.waitForElementClickable(continieElement);
        var thisPageUrl = await browser.getCurrentUrl();
        console.log("Submitting : " + thisPageUrl);
        await continieElement.click();
        await BrowserWaits.waitForPageNavigation(thisPageUrl);
        let page3 = await element(by.css("ccd-case-edit-page h1"));
        expect(await page3.getText()).to.eql("Page 3 - Create a case");
    }

    async _getKeyVal(field) {
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        switch (field.field_type.type) {
            case "MoneyGBP":
                let priceConvert = field.value.toString().split('').map(Number).slice(0, -2).join('');
                return "£" + parseInt(priceConvert).toFixed(2);
            case "Date":
                var date = new Date(field.value);
                date.setDate(date.getDate());
                date = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
                return date;
            case "DateTime":
                var fieldDate = new Date(field.value).toLocaleString('en-UK', { hour12: true });
                let time = fieldDate.split(", ")
                var date1 = new Date(fieldDate);
                date1.setDate(date1.getDate());
                date1 = date1.getDate() + " " + monthNames[date1.getMonth()] + " " + date1.getFullYear() + ", " + time[1];
                return date1;
            default: return field.value;
        }
    }


}
module.exports = TcPage;
