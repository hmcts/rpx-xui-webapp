
const MockApp = require('../../nodeMock/app');
const { browser } = require('protractor');
const BrowserUtil = require('../util/browserUtil');
const BrowserWaits = require('../../e2e/support/customWaits');
const addContext = require('mochawesome/addContext');

const headerPage = require('../../e2e/features/pageObjects/headerPage');

const CCDCaseEditPage = require('../util/ccdCaseEditPages');
const CCDCaseConfig = require('../../nodeMock/ccd/ccdCaseConfig/caseCreateConfigGenerator');

describe('CCD casefields, retain_hidden_field setting', function () {
    before(async function(){
        await headerPage.isTabPresent('Case list');
    });

    beforeEach(async function (done) {
        caseEventConfigOfTest = null;
        caseValidationRequestBody = null;
        caseEventSubmitRequestBody = null;
        MockApp.init();

        done();
    });
    afterEach(async function (done) {
        console.log(this.test.ctx.currentTest.title + " : " + this.test.ctx.currentTest.state);
        await MockApp.stopServer();
        if (this.test.ctx.currentTest.state === 'failed'){
            addContext(this, { title: 'Case Event create/edit config', value: caseEventConfigOfTest });
            addContext(this, { title: 'Case Event submit request body', value: caseEventSubmitRequestBody });

        }
        done();
    });

    let caseEventConfigOfTest = null;
    let caseValidationRequestBody = null;
    let caseEventSubmitRequestBody = null;

    [
        { showField: false, retainHiddenField: true },
        { showField: false, retainHiddenField: false },
        { showField: false, retainHiddenField: null },
        { showField: true, retainHiddenField: false }
    ].forEach(scenario => {
        it(`Text Field : retain_hidden_field "${scenario.retainHiddenField}" and field is Displayed ${scenario.showField}`, async function () {
            // CCD case config setup start 
            const caseConfig = new CCDCaseConfig('TEST_CaseType', 'Test case type hidden field retain value', 'test description');
            const page1 = caseConfig.addWizardPage('HiddenFieldPage_1', 'Hidden field retain value test page');

            let testFieldShowYesNo = caseConfig.addCCDFieldToPage(page1, "YesOrNo", "showTestField", "Show Test Field?");
            testFieldShowYesNo.value = true;

            let textField = caseConfig.addCCDFieldToPage(page1, "Text", "simpleTextField", "Test old value");
            textField.value = "Test old value";
            textField.retain_hidden_value = scenario.retainHiddenField;
            textField.show_condition = `${testFieldShowYesNo.id}=\"Yes\"`;

            setUpcaseConfig(caseConfig.caseConfigTemplate)
            // CCD case config setup end 

            await MockApp.startServer();
            await BrowserUtil.gotoHomePage();
            await browser.get(`cases/case-details/1604309496714935/trigger/casetype_1/HiddenFieldPage_1`);

            const showFieldYesNoElement = $(`#${testFieldShowYesNo.id}`);
            await BrowserWaits.waitForElement(showFieldYesNoElement);
            await CCDCaseEditPage.selectRadioYesOrNo(testFieldShowYesNo.id, scenario.showField);
            await CCDCaseEditPage.clickContinue();
            await BrowserWaits.waitForCondition(async () => {
                return !(await showFieldYesNoElement.isPresent());
            });

            await CCDCaseEditPage.waitForChecYourAnswersPage();
            await CCDCaseEditPage.clickSubmit();
            await BrowserWaits.waitForCondition(async () => {
                return !(await CCDCaseEditPage.isCheckYourAnswersPagePresent());
            });

            if (!scenario.showField && scenario.retainHiddenField === "yes") {
                expect(caseEventSubmitRequestBody.data).to.not.have.property(textField.id);
            }

            if (!scenario.showField && scenario.retainHiddenField === "No") {
                expect(caseEventSubmitRequestBody.data).to.have.property(textField.id);
                expect(caseEventSubmitRequestBody.data[textField.id]).to.equal(null);

            }

            if (!scenario.showField && !scenario.retainHiddenField) {
                expect(caseEventSubmitRequestBody.data).to.have.property(textField.id);
                expect(caseEventSubmitRequestBody.data[textField.id]).to.equal(null);
            }

            if (scenario.showField && scenario.retainHiddenField === "No") {
                expect(caseEventSubmitRequestBody.data).to.have.property(textField.id);
                expect(caseEventSubmitRequestBody.data[textField.id]).to.equal('Test old value');
            }
        });

    });

    [
        { fieldType: "AddressUK", showField: false, retainHiddenField: true },
        { fieldType: "AddressUK", showField: false, retainHiddenField: false },
        { fieldType: "AddressUK", showField: false, retainHiddenField: null },
        { fieldType: "AddressUK", showField: true, retainHiddenField: false },

        { fieldType: "AddressGlobalUK", showField: false, retainHiddenField: true },
        { fieldType: "AddressGlobalUK", showField: false, retainHiddenField: false },
        { fieldType: "AddressGlobalUK", showField: false, retainHiddenField: null },
        { fieldType: "AddressGlobalUK", showField: true, retainHiddenField: false }, 

        { fieldType: "CaseLink", showField: false, retainHiddenField: true },
        { fieldType: "CaseLink", showField: false, retainHiddenField: false },
        { fieldType: "CaseLink", showField: false, retainHiddenField: null },
        { fieldType: "CaseLink", showField: true, retainHiddenField: false } ,

        { fieldType: "Organisation", showField: false, retainHiddenField: true },
        { fieldType: "Organisation", showField: false, retainHiddenField: false },
        { fieldType: "Organisation", showField: false, retainHiddenField: null },
        { fieldType: "Organisation", showField: true, retainHiddenField: false } ,

        { fieldType: "Document", showField: false, retainHiddenField: true },
        { fieldType: "Document", showField: false, retainHiddenField: false },
        { fieldType: "Document", showField: false, retainHiddenField: null },
        { fieldType: "Document", showField: true, retainHiddenField: false },

    ].forEach(scenario => {
        it(`field ${scenario.fieldType} : retain_hidden_field "${scenario.retainHiddenField}" and field is Displayed ${scenario.showField}`, async function () {
            // CCD case config setup start 
            const caseConfig = new CCDCaseConfig('TEST_CaseType', 'Test case type hidden field retain value', 'test description');
            const page1 = caseConfig.addWizardPage('HiddenFieldPage_1', 'Hidden field retain value test page');
           
            let testFieldShowYesNo = caseConfig.addCCDFieldToPage(page1, "YesOrNo", "showTestField", "Show Test Field?");
            testFieldShowYesNo.value = true;

            let complexField = caseConfig.addCCDFieldToPage(page1, scenario.fieldType, "complexField", "Complex field" );
          
            complexField.retain_hidden_value = scenario.retainHiddenField;
            complexField.show_condition = `${testFieldShowYesNo.id}=\"Yes\"`;
            switch(scenario.fieldType){
                case "AddressUK":
                case "AddressGlobalUK":
                    complexField.value = {
                        showTestField: scenario.showField,
                        complexField: {
                            "AddressLine1": "29 AddressLine1 close",
                            "AddressLine2": "AddressLine2 Road",
                            "AddressLine3": "AddressLine3 town",
                            "PostTown": "London",
                            "County": "testcounty",
                            "PostCode": "AB12 3CD",
                            "Country": "United Kingdom"
                        }
                    }; 
                    break;
                case "CaseLink":
                    complexField.value = {
                        showTestField: scenario.showField,
                        complexField: {
                            "CaseReference": "1573742075034100"
                        }
                    };  
                    break;
                case "Organisation":
                    complexField.value = {
                        showTestField: scenario.showField,
                        complexField: {
                            "OrganisationID": "RH3TDV3",
                            "OrganisationName": "AutoTest7q8etj9eqz"
                        }
                    };   
                    break;
                case "Document":
                    complexField.value = {
                            "document_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/a612199d-9972-4b99-b653-5ec7c310e21a",
                            "document_binary_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/a612199d-9972-4b99-b653-5ec7c310e21a/binary",
                            "document_filename": "Redacted-dm-store135044941749889827327305460282199740737.pdf"     
                    }; 
                    break;
                default:
                    throw new Error("Unrecognised comples filed type "+scenario.fieldType);
            }
            setUpcaseConfig(caseConfig.caseConfigTemplate);
            // CCD case config setup end 

            await MockApp.startServer();
            await BrowserUtil.gotoHomePage();
            await browser.get(`cases/case-details/1604309496714935/trigger/casetype_1/HiddenFieldPage_1`);

            const showFieldYesNoElement = $(`#${testFieldShowYesNo.id}`);

            await BrowserWaits.waitForElement(showFieldYesNoElement);
            await CCDCaseEditPage.selectRadioYesOrNo(testFieldShowYesNo.id, scenario.showField);
            await CCDCaseEditPage.clickContinue();
            await BrowserWaits.waitForCondition(async () => {
                return !(await showFieldYesNoElement.isPresent());
            });

            await CCDCaseEditPage.waitForChecYourAnswersPage();
            await CCDCaseEditPage.clickSubmit();
            await BrowserWaits.waitForCondition(async () => {
                return !(await CCDCaseEditPage.isCheckYourAnswersPagePresent());
            });

            if (!scenario.showField && scenario.retainHiddenField === "yes") {
                expect(caseEventSubmitRequestBody.data).to.not.have.property(complexField.id);
            }

            if (!scenario.showField && scenario.retainHiddenField === "No") {
                expect(caseEventSubmitRequestBody.data).to.have.property(complexField.id);
                expect(validateAllValuesNullInObject(caseEventSubmitRequestBody.data[complexField.id]), "object has non null values").to.be.true;
            }

            if (!scenario.showField && !scenario.retainHiddenField) {
                expect(caseEventSubmitRequestBody.data).to.have.property(complexField.id);
                expect(validateAllValuesNullInObject(caseEventSubmitRequestBody.data[complexField.id]), "object has non null values").to.be.true;
            }

            if (scenario.showField && scenario.retainHiddenField === "No") {
                expect(caseEventSubmitRequestBody.data).to.have.property(complexField.id);
                expect(validateAllValuesNullInObject(caseEventSubmitRequestBody.data[complexField.id]), "object has non null values").to.be.true;

            }
        });

    });


    [
        { fieldType: "Collection", showField: false, retainHiddenField: true },
        { fieldType: "Collection", showField: false, retainHiddenField: false },
        { fieldType: "Collection", showField: false, retainHiddenField: null },
        { fieldType: "Collection", showField: true, retainHiddenField: false },

        { fieldType: "FixedList", showField: false, retainHiddenField: true },
        { fieldType: "FixedList", showField: false, retainHiddenField: false },
        { fieldType: "FixedList", showField: false, retainHiddenField: null },
        { fieldType: "FixedList", showField: true, retainHiddenField: false },

        { fieldType: "FixedRadioList", showField: false, retainHiddenField: true },
        { fieldType: "FixedRadioList", showField: false, retainHiddenField: false },
        { fieldType: "FixedRadioList", showField: false, retainHiddenField: null },
        { fieldType: "FixedRadioList", showField: true, retainHiddenField: false },

        { fieldType: "MultiSelectList", showField: false, retainHiddenField: true },
        { fieldType: "MultiSelectList", showField: false, retainHiddenField: false },
        { fieldType: "MultiSelectList", showField: false, retainHiddenField: null },
        { fieldType: "MultiSelectList", showField: true, retainHiddenField: false },
    ].forEach(scenario => {
        it(`field ${scenario.fieldType} : retain_hidden_field "${scenario.retainHiddenField}" and field is Displayed ${scenario.showField}`, async function () {
            // CCD case config setup start 
            const caseConfig = new CCDCaseConfig('TEST_CaseType', 'Test case type hidden field retain value', 'test description');
            const page1 = caseConfig.addWizardPage('HiddenFieldPage_1', 'Hidden field retain value test page');

            let testFieldShowYesNo = caseConfig.addCCDFieldToPage(page1, "YesOrNo", "showTestField", "Show Test Field?");
            testFieldShowYesNo.value = true;

            let complexField = caseConfig.addCCDFieldToPage(page1, scenario.fieldType, scenario.fieldType + "Field", scenario.fieldType + " Field");

            complexField.retain_hidden_value = scenario.retainHiddenField;
            complexField.show_condition = `${testFieldShowYesNo.id}=\"Yes\"`;
          
            switch (scenario.fieldType){
                case "Collection":
                    complexField.acls.push({
                        "role": "caseworker-divorce-financialremedy",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": true
                    });
                    const complexCollectionField = caseConfig.getCCDFieldTemplateCopy("Complex", "ComplexCollectionItems", "Collection Item");
                    const collectionFieldItem = caseConfig.getCCDFieldTemplateCopy("Text", "CollText", "Collection Text");
                    complexCollectionField.field_type.complex_fields = [ collectionFieldItem];
                    complexField.field_type.collection_field_type = complexCollectionField.field_type;
                    complexField.value = [
                        { "id": 12, "value": { "CollText": "test1" } },
                        { "id": 123, "value": { "CollText": "test2" } }
                    ];
                    break;
                case "FixedList":
                case "FixedRadioList":
                    complexField.field_type.fixed_list_items = [
                        { "code": "item1", "label": "Item 1", "order": null },
                        { "code": "item2", "label": "Item 2", "order": null },
                        { "code": "item3", "label": "Item 3", "order": null }
                    ];
                    complexField.value = "item3";
                    break; 
                case "MultiSelectList":
                    complexField.field_type.fixed_list_items = [
                        { "code": "item1", "label": "Item 1", "order": null },
                        { "code": "item2", "label": "Item 2", "order": null },
                        { "code": "item3", "label": "Item 3", "order": null }
                    ];
                    complexField.value = ["item3" , "item2"];
                    break;
                default:
                    throw new Error("Unrecognised list/collection field type provided for test")
            }
            

            setUpcaseConfig(caseConfig.caseConfigTemplate);
            // CCD case config setup end 

            await MockApp.startServer();
            await BrowserUtil.gotoHomePage();
            await browser.get(`cases/case-details/1604309496714935/trigger/casetype_1/HiddenFieldPage_1`);

            const showFieldYesNoElement = $(`#${testFieldShowYesNo.id}`);

            await BrowserWaits.waitForElement(showFieldYesNoElement);
            await CCDCaseEditPage.selectRadioYesOrNo(testFieldShowYesNo.id, scenario.showField);
            await CCDCaseEditPage.clickContinue();
            await BrowserWaits.waitForCondition(async () => {
                return !(await showFieldYesNoElement.isPresent());
            });

            await CCDCaseEditPage.waitForChecYourAnswersPage();
            await CCDCaseEditPage.clickSubmit();
            await BrowserWaits.waitForCondition(async () => {
                return !(await CCDCaseEditPage.isCheckYourAnswersPagePresent());
            });

            console.log(caseEventSubmitRequestBody);
            if (!scenario.showField && scenario.retainHiddenField === "yes") {
                expect(caseEventSubmitRequestBody.data).to.not.have.property(complexField.id);
            }

            if (!scenario.showField && scenario.retainHiddenField === "No") {
                expect(caseEventSubmitRequestBody.data).to.have.property(complexField.id);
                expect(validateAllValuesNullInObject(caseEventSubmitRequestBody.data[complexField.id]), "object has non null values").to.be.true;
            }

            if (!scenario.showField && !scenario.retainHiddenField) {
                expect(caseEventSubmitRequestBody.data).to.have.property(complexField.id);
                expect(validateAllValuesNullInObject(caseEventSubmitRequestBody.data[complexField.id]), "object has non null values").to.be.true;
            }

            if (scenario.showField && scenario.retainHiddenField === "No") {
                expect(caseEventSubmitRequestBody.data).to.have.property(complexField.id);
                expect(validateAllValuesNullInObject(caseEventSubmitRequestBody.data[complexField.id]), "object has non null values").to.be.true;

            }
        });

    });


    [
        {
            testName:           "all fields displayed and have retainValue true",
            parentComplex:      { display: true, retainValue: true },
            childText:          { display: true, retainValue: true },
            childComplex:       { display: true, retainValue: true },
            grandchildText:     { display: true, retainValue: true },
        },
        {
            testName: "parent complex hidden and retain value no",
            parentComplex: { display: false, retainValue: false },
            childText: { display: true, retainValue: true },
            childComplex: { display: true, retainValue: false },
            grandchildText: { display: true, retainValue: true },
        },
        {
            testName: "parent complex hidden and retain value Yes",
            parentComplex: { display: false, retainValue: true },
            childText: { display: true, retainValue: true },
            childComplex: { display: true, retainValue: false },
            grandchildText: { display: true, retainValue: true },
        },
        {
            testName: "child Text hidden and retain value Yes",
            parentComplex: { display: true, retainValue: true },
            childText: { display: false, retainValue: true },
            childComplex: { display: true, retainValue: false },
            grandchildText: { display: true, retainValue: true },
        },
        {
            testName: "child Text hidden and retain value No",
            parentComplex: { display: true, retainValue: true },
            childText: { display: false, retainValue: false },
            childComplex: { display: true, retainValue: false },
            grandchildText: { display: true, retainValue: true },
        },
        {
            testName: "child Complex hidden and retain value No",
            parentComplex: { display: true, retainValue: true },
            childText: { display: true, retainValue: true },
            childComplex: { display: false, retainValue: false },
            grandchildText: { display: true, retainValue: true },
        } ,
        {
            testName: "child Complex hidden and retain value Yes",
            parentComplex: { display: true, retainValue: true },
            childText: { display: true, retainValue: true },
            childComplex: { display: false, retainValue: true },
            grandchildText: { display: true, retainValue: true },
        },
        {
            testName: "Grand child Text hidden and retain value No",
            parentComplex: { display: true, retainValue: true },
            childText: { display: true, retainValue: true },
            childComplex: { display: true, retainValue: true },
            grandchildText: { display: false, retainValue: false },
        },
        {
            testName: "Grand child Text hidden and retain value Yes",
            parentComplex: { display: true, retainValue: true },
            childText: { display: true, retainValue: true },
            childComplex: { display: true, retainValue: true },
            grandchildText: { display: false, retainValue: true },
        } 
    ].forEach(scenario => {
        it(`Deep complex field : ${scenario.testName}`, async function () {
            // CCD case config setup start 

            const caseConfig = new CCDCaseConfig('TEST_CaseType', 'Test case type hidden field retain value', 'test description');
            const page1 = caseConfig.addWizardPage('HiddenFieldPage_1', 'Hidden field retain value test page');

            const parentComplexShowYesNo = caseConfig.addCCDFieldToPage(page1, "YesOrNo", "parentComplexShowYesNo", "Show Parent Complex?");
            parentComplexShowYesNo.value = true;
            const parentComplexField = caseConfig.addCCDFieldToPage(page1, "Complex", "parentComplexField", "Parent Complex Field");

            parentComplexField.retain_hidden_value = scenario.parentComplex.retainValue;
            parentComplexField.show_condition = `${parentComplexShowYesNo.id}=\"Yes\"`;

            //level 1 fields 
            const childTextShowCondition = caseConfig.getCCDFieldTemplateCopy("YesOrNo", "childTextShowCondition", "Show child text?");
            childTextShowCondition.value = true;
            const childText = caseConfig.getCCDFieldTemplateCopy("Text", "childText", "Child Text field");
            childText.retain_hidden_value = scenario.childText.retainValue;
            childText.show_condition = `${childTextShowCondition.id}=\"Yes\"`

            const childComplexShowCondition = caseConfig.getCCDFieldTemplateCopy("YesOrNo", "childComplexShowCondition", "Show Child Complex?");
            childComplexShowCondition.value = true;

            //level 2 fields config
            const childComplex = caseConfig.getCCDFieldTemplateCopy("Complex", "childComplex", "Child Complex field");
            childComplex.retain_hidden_value = scenario.childComplex.retainValue;
            childComplex.show_condition = `${childComplexShowCondition.id}=\"Yes\"`

            const grandchildTextShowCindition = caseConfig.getCCDFieldTemplateCopy("YesOrNo", "grandchildTextShowCindition", "Show Grandchild Text Field?");
            grandchildTextShowCindition.value = true;

            const grandchildText = caseConfig.getCCDFieldTemplateCopy("Text", "grandchildText", "Grandchild Text");
            grandchildText.retain_hidden_value = scenario.grandchildText.retainValue;
            grandchildText.show_condition = `${grandchildTextShowCindition.id}=\"Yes\"`

            childComplex.field_type.complex_fields = [grandchildTextShowCindition, grandchildText];
            //level 2 fields end


            parentComplexField.field_type.complex_fields = [childTextShowCondition, childText, childComplexShowCondition, childComplex];
            //level 1 fields end
            const parentComplexFieldValue = {};
            parentComplexFieldValue[childTextShowCondition.id] = true;
            parentComplexFieldValue[childText.id] = "Child Text value old";
            parentComplexFieldValue[childComplexShowCondition.id] = true;
            parentComplexFieldValue[childComplex.id] = {};
            parentComplexFieldValue[childComplex.id][grandchildTextShowCindition.id] = true;
            parentComplexFieldValue[childComplex.id][grandchildText.id] = "Grand child Text Value old"; 
 
            parentComplexField.value = parentComplexFieldValue;

            setUpcaseConfig(caseConfig.caseConfigTemplate);

            await MockApp.startServer();;
            await BrowserUtil.gotoHomePage();
            await browser.get(`cases/case-details/1604309496714935/trigger/casetype_1/HiddenFieldPage_1`);

            const parentComplexShowYesNoEle = $(`#${parentComplexShowYesNo.id}`);

            await BrowserWaits.waitForElement(parentComplexShowYesNoEle);
            await CCDCaseEditPage.inputCaseField(parentComplexField.id + '_' + childText.id, "Child text value new");
            await CCDCaseEditPage.inputCaseField(parentComplexField.id + '_' + childComplex.id + '_' + grandchildText.id, "Grand Child text value new");

            await CCDCaseEditPage.selectRadioYesOrNo(parentComplexShowYesNo.id, scenario.parentComplex.display);
        
            if (scenario.parentComplex.display){
                await CCDCaseEditPage.selectRadioYesOrNo(parentComplexField.id + '_' + childTextShowCondition.id, scenario.childText.display); 
                await CCDCaseEditPage.selectRadioYesOrNo(parentComplexField.id + '_' +childComplexShowCondition.id, scenario.childComplex.display);

                if (scenario.childComplex.display){
                    await CCDCaseEditPage.selectRadioYesOrNo(parentComplexField.id + '_' +childComplex.id+'_'+grandchildTextShowCindition.id, scenario.grandchildText.display);
                }   
            }
           
            await CCDCaseEditPage.clickContinue();
            await BrowserWaits.waitForCondition(async () => {
                return !(await parentComplexShowYesNoEle.isPresent());
            });

            await CCDCaseEditPage.waitForChecYourAnswersPage();
            // await browser.sleep(200000);
            await browser.executeScript('arguments[0].scrollIntoView()', CCDCaseEditPage.getSubmitButton().getWebElement());
            await CCDCaseEditPage.clickSubmit();
            await BrowserWaits.waitForCondition(async () => {
                return !(await CCDCaseEditPage.isCheckYourAnswersPagePresent());
            });


            expect(caseEventSubmitRequestBody.data).to.have.property(parentComplexField.id);
            expect(caseEventSubmitRequestBody.data[parentComplexField.id]).to.have.property(childText.id);
            expect(caseEventSubmitRequestBody.data[parentComplexField.id]).to.have.property(childComplex.id);
            expect(caseEventSubmitRequestBody.data[parentComplexField.id][childComplex.id]).to.have.property(grandchildText.id);

            if (scenario.parentComplex.display && scenario.childText.display){
                expect(caseEventSubmitRequestBody.data[parentComplexField.id][childText.id], "For field" + childText.id).to.equal("Child text value new");
            } else if (scenario.childText.retainValue) {
                expect(caseEventSubmitRequestBody.data[parentComplexField.id][childText.id], "For field" + childText.id).to.equal("Child text value old");
            } else {
                expect(caseEventSubmitRequestBody.data[parentComplexField.id][childText.id], "For field" + childText.id).to.equal(null);
            }

            if (scenario.parentComplex.display && scenario.childComplex.display && scenario.grandchildText.display) {
                expect(caseEventSubmitRequestBody.data[parentComplexField.id][childComplex.id][grandchildText.id], "For field" + grandchildText.id).to.equal("Grand Child text value new");
            } else if (scenario.childText.retainValue) {
                expect(caseEventSubmitRequestBody.data[parentComplexField.id][childComplex.id][grandchildText.id], "For field" + grandchildText.id).to.equal("Grand Child text value old");
            } else {
                expect(caseEventSubmitRequestBody.data[parentComplexField.id][childComplex.id][grandchildText.id], "For field" + grandchildText.id).to.equal(null);
            }
 
        });
    });

  


    function setUpcaseConfig(caseConfig) {
        MockApp.onGet('/data/internal/cases/:caseid/event-triggers/:eventId', (req, res) => {
            caseEventConfigOfTest = caseConfig; 
            res.send(caseConfig);
        });

        MockApp.onPost('/data/case-types/:caseType/validate', (req, res) => {
            caseValidationRequestBody = req.body;
            const responseBody = {
                data: req.body.data,
                "_links": { "self": { "href": "http://ccd-data-store-api-aat.service.core-compute-demo.internal" + req.path + "?pageId=" + req.query.pageId } }
            }
            res.send(responseBody);
        });

        MockApp.onPost('/data/cases/:caseid/events', (req, res) => {
            caseEventSubmitRequestBody = req.body;
            const responseBody = {
                id: Date.now(),
                data: req.body.data,
                "_links": { "self": { "href": "http://ccd-data-store-api-demo.service.core-compute-demo.internal" + req.path + "?ignore-warning=false" } }
            }
            res.send(responseBody)
        });
    };

    function validateAllValuesNullInObject(obj){
        for (var key in obj) {
            if (obj[key] instanceof Object){
                if (!validateAllValuesNullInObject(obj[key])){
                    return false;
                } 
            } else if (obj[key] !== null && obj[key] != ""){
                return false;
            }
           
        }
        return true;
    }

});
