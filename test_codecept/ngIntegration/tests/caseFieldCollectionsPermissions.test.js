;


const assert = require('assert');

const MockApp = require('../../nodeMock/app');
const { browser } = require('protractor');
const BrowserUtil = require('../util/browserUtil');
const BrowserWaits = require('../../e2e/support/customWaits');

const headerPage = require('../../e2e/features/pageObjects/headerPage');
const exuiTestCaseType = require('../../nodeMock/ccd/solicitorCreate/exuiTestCaseType');
const config = require('../config/protractor.conf');

describe('CCD-CASE-UI-TOOLKIT collection field permissions', function () {

    beforeEach(async function (done) {
        MockApp.init();
        done();
    });
    afterEach(async function (done) {
        await MockApp.stopServer();
        // await BrowserUtil.addScreenshot(this, browser); 

        done();
    });

    const addNewButton = element(by.xpath("//div[@id = 'textCollection']//button[text() = 'Add new']"));
    const removeButton = element(by.xpath("//div[@id = 'textCollection']//button[text() = 'Remove']"));
    

    it('display_context_parameter null', async function () {
        setUpcaseConfig(null); 

        await MockApp.startServer();
        await BrowserUtil.gotoHomePage();
        await headerPage.isTabPresent('Case list');
        await browser.get(`cases/case-create/exui/casetype_1/submitDraft/page1`);

        await BrowserWaits.waitForElement(addNewButton);
        expect(await addNewButton.isEnabled()).to.be.false
        expect(await removeButton.isEnabled()).to.be.false

    });

    it('display_context_parameter with collection(allowInsert,allowDelete)', async function () {
        setUpcaseConfig("#COLLECTION(allowInsert,allowDelete)"); 

        await MockApp.startServer();
        await BrowserUtil.gotoHomePage();

        await headerPage.isTabPresent('Case list');
        await browser.get(`cases/case-create/exui/casetype_1/submitDraft/page1`);

        await BrowserWaits.waitForElement(addNewButton);
        expect(await addNewButton.isEnabled()).to.be.true
        expect(await removeButton.isEnabled()).to.be.true

    });

    it('display_context_parameter with collection(allowInsert)', async function () {
        setUpcaseConfig("#COLLECTION(allowInsert)"); 

        await MockApp.startServer();
        await BrowserUtil.gotoHomePage();
        await headerPage.isTabPresent('Case list');
        await browser.get(`cases/case-create/exui/casetype_1/submitDraft/page1`);

        await BrowserWaits.waitForElement(addNewButton);
        expect(await addNewButton.isEnabled()).to.be.true
        expect(await removeButton.isEnabled()).to.be.false

    });

    it('display_context_parameter with collection(allowDelete)', async function () {
        setUpcaseConfig("#COLLECTION(allowDelete)"); 

        await MockApp.startServer();
        await BrowserUtil.gotoHomePage();
        await headerPage.isTabPresent('Case list');
        await browser.get(`cases/case-create/exui/casetype_1/submitDraft/page1`);

        await BrowserWaits.waitForElement(addNewButton);
        expect(await addNewButton.isEnabled()).to.be.false
        expect(await removeButton.isEnabled()).to.be.true

    });

    it('display_context_parameter combination of conditions' , async function () {
        setUpcaseConfig("#TABLE(AddressLine1,AddressLine2),#COLLECTION(allowInsert,allowDelete)"); 

        await MockApp.startServer();
        await BrowserUtil.gotoHomePage();
        await headerPage.isTabPresent('Case list');
        await browser.get(`cases/case-create/exui/casetype_1/submitDraft/page1`);

        await BrowserWaits.waitForElement(addNewButton);
        expect(await addNewButton.isEnabled()).to.be.true
        expect(await removeButton.isEnabled()).to.be.true
    });

    it('display_context_parameter with no permission in collection ', async function () {
        setUpcaseConfig("#COLLECTION()"); 
        await MockApp.startServer();

        await BrowserUtil.gotoHomePage();
        await headerPage.isTabPresent('Case list');
        await browser.get(`cases/case-create/exui/casetype_1/submitDraft/page1`);

        await BrowserWaits.waitForElement(addNewButton);
        expect(await addNewButton.isEnabled()).to.be.false
        expect(await removeButton.isEnabled()).to.be.false
    });

    function setUpcaseConfig(displaContextparameter){
        const caseConfig = Object.assign({}, exuiTestCaseType);
        caseConfig.case_fields[1].display_context_parameter = displaContextparameter;

        MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => {
            res.send(caseConfig);
        });
    }

});


