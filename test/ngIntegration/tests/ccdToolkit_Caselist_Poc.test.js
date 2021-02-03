;


const assert = require('assert');

const MockApp = require('../../nodeMock/app');
const { browser } = require('protractor');
const BrowserUtil = require('../util/browserUtil');
const BrowserWaits = require('../../e2e/support/customWaits');

const CaseEditPage = require('../util/ccdCaseEditPages');
const CaseDetailsPage = require('../util/caseDetailsPage');
const CaseListPage = require('../util/caselistPage');


const CCDWorkbasketConfig = require('../../nodeMock/ccd/ccdCaseConfig/workBasketInputGenerator');

const headerPage = require('../../e2e/features/pageObjects/headerPage');

describe('Workbasket and Case list', function () {

    function getWorkBasketConfig(){
        const workBasketConfig = new CCDWorkbasketConfig();
        return workBasketConfig
            .addField({ id:"simpletext", type:"Text",label: "Simple text input"})
            .addField({ id: "radioInput", type: "FixedRadioList", label: "Simple Radio input", list: [{ code: "a", label: "A" }, { code: "b", label: "B" }, { code: "c", label: "C" }]})
            .addField({ id: "radioYesorNo", type: "YesOrNo", label: "Simple Yes or No input"})
            .addField({ id: "fixedListItem", type: "FixedList", label: "fixed listinput", list: [{ code: "a", label: "A" }, { code: "b", label: "B" }, { code: "c", label: "C" }] } )
            .addField({ id: "multiSelectItem", type: "MultiSelectList", label: "Multi select input", list: [{ code: "a", label: "A" }, { code: "b", label: "B" }, { code: "c", label: "C" }] })

        .getConfig();
    }

    let workbasketConfig = null;
    let caseListReq = null;
    beforeEach(async function (done) {
        MockApp.init();
        await browser.manage().deleteAllCookies();
        done();
    });

    afterEach(async function (done) {
        await MockApp.stopServer();
        // await BrowserUtil.addScreenshot(this, browser); 
        done();

    });

    it('Should be able to see all workbasket Filters', async () => {
        MockApp.onGet('/data/internal/case-types/:jurisdiction/work-basket-inputs', (req, res) => {
            workbasketConfig = getWorkBasketConfig();
            res.send(workbasketConfig);
        });
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();

        browser.get('cases');
        await CaseListPage.amOnPage();

        workbasketConfig.workbasketInputs
        for (const dynamicfield of workbasketConfig.workbasketInputs){
            expect(await CaseListPage.isWorkbasketFilterDisplayed(dynamicfield)).to.be.true 
        }

    });


    it('Should be able to see the cases after applying the filters: Validate case search request to contain filters', async () => {
        MockApp.onGet('/data/internal/case-types/:jurisdiction/work-basket-inputs', (req, res) => {
            workbasketConfig = getWorkBasketConfig();
            res.send(workbasketConfig);
        });


        MockApp.addIntercept('/data/internal/searchCases', (req,res,next) => {
            console.log("Add intercpy called");
            caseListReq = req.query;
            next();
        });
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();

        browser.get('cases');
        await CaseListPage.amOnPage();

        const workbasketInputValues = {}
        for (const dynamicfield of workbasketConfig.workbasketInputs) {
            workbasketInputValues[dynamicfield.field.id] = await CaseListPage.inputWorkbasketFilter(dynamicfield);
        }

        caseListReq = null;
        await CaseListPage.clickApplyWorkbasketFilters(); 
        await BrowserWaits.waitForCondition(async () =>  caseListReq !== null   );

        for (const key of Object.keys(workbasketInputValues)){
            if (workbasketInputValues[key]  instanceof Array) {
                workbasketInputValues[key].forEach( (val,index) => {
                    expect(caseListReq["case." + key+"."+index]).to.equal(val);  
                }); 
            } else {
                expect(caseListReq["case." + key]).to.equal(workbasketInputValues[key]); 
            }
        }
    });



    it('Verify workbasket API dropdown data', async () => {
        MockApp.onGet('/data/internal/case-types/:jurisdiction/work-basket-inputs', (req, res) => {
            workbasketConfig = getWorkBasketConfig();
            res.send(workbasketConfig);
        });
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);
        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();

        browser.get('cases');
        await CaseListPage.amOnPage();

        workbasketConfig.workbasketInputs
        for (const dynamicfield of workbasketConfig.workbasketInputs) {
            if (dynamicfield.field.field_type.type.includes("List")){
                const fieldConfigList = dynamicfield.field.field_type.fixed_list_items;
                const listValuesRendered = await CaseListPage.getFieldListValues(dynamicfield);
                expect(listValuesRendered.length, JSON.stringify(listValuesRendered) + " " + JSON.stringify(fieldConfigList)).to.equal(fieldConfigList.length) 
                fieldConfigList.forEach(listItem =>{
                    expect(listValuesRendered.includes(listItem.code)).to.be.true 
                });

            } else if (dynamicfield.field.field_type.type.includes("YesOrNo")){
                const listValuesRendered = await CaseListPage.getFieldListValues(dynamicfield);
                expect(listValuesRendered.length).to.equal(2); 
                ["Yes","No"].forEach(item => {
                    expect(listValuesRendered.includes(item)).to.be.true
                });
            }
            expect(await CaseListPage.isWorkbasketFilterDisplayed(dynamicfield)).to.be.true
        }

    });


});


