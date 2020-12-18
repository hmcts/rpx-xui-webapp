;


const assert = require('assert');

const MockApp = require('../../nodeMock/app');
const { browser } = require('protractor');
const BrowserUtil = require('../util/browserUtil');
const BrowserWaits = require('../../e2e/support/customWaits');

const headerPage = require('../../e2e/features/pageObjects/headerPage');

describe('Header  Tabs', function () {

    beforeEach(async function (done) {
        await browser.manage().deleteAllCookies();
        MockApp.init();
        done();
    });
    afterEach(async function (done) {
        await MockApp.stopServer();
        done();
    });

    it('Case list tab present', async function () {
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);   

        await headerPage.waitForPrimaryNavDisplay() 
        await BrowserUtil.waitForLD();

        expect(await headerPage.isTabPresent('Case list'), 'Case list tab not present, displayed tabs : ').to.be.true

    });

    it('Create Case tab present', async function () {
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"])

        await headerPage.waitForPrimaryNavDisplay() 
        await BrowserUtil.waitForLD();

        expect(await headerPage.isTabPresent('Create case'), 'Create case tab not present, displayed tabs : ').to.be.true

    });

    it.skip('Work allocation Tabs not present without roles "caseworker-ia-admofficer" and "caseworker-ia-caseofficer"', async function () {
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-divorce-financialremedy-solicitor"]);

        await headerPage.waitForPrimaryNavDisplay();
        await BrowserUtil.waitForLD();
        expect(await headerPage.isTabPresent('Task list'), 'Task list tab not present, displayed tabs : ' + await headerPage.primaryNavBar.getText()).to.be.false
        expect(await headerPage.isTabPresent('Task manager'), 'Task manager tab present, displayed tabs : ' + await headerPage.primaryNavBar.getText()).to.be.false

    });

    it('Work allocation Tabs "Task list" and "Task manager" for role "caseworker-ia-admofficer"', async function () {
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-admofficer"]);

        await headerPage.waitForPrimaryNavDisplay();
        await BrowserUtil.waitForLD();
        expect(await headerPage.isTabPresent('Task list'), 'Task list tab not present, displayed tabs : ' + await headerPage.primaryNavBar.getText()).to.be.true
        expect(await headerPage.isTabPresent('Task manager'), 'Task manager tab present, displayed tabs : ' + await headerPage.primaryNavBar.getText()).to.be.false
 
    });

  
    it('Work allocation Tabs "Task list" and "Task manager" for role "caseworker-ia-caseofficer"', async function () {
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer"]);

        await headerPage.waitForPrimaryNavDisplay();
        await BrowserUtil.waitForLD();
        expect(await headerPage.isTabPresent('Task manager'), 'Task manager tab not present, displayed tabs : ' + await headerPage.primaryNavBar.getText()).to.be.true
        expect(await headerPage.isTabPresent('Task list'), 'Task list tab not present, displayed tabs : ' + await headerPage.primaryNavBar.getText()).to.be.true

    });


    it('Work allocation Tabs for role "caseworker-ia-caseofficer", "caseworker-ia-admofficer"', async function () {
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);

        await headerPage.waitForPrimaryNavDisplay();
        await BrowserUtil.waitForLD();
        expect(await headerPage.isTabPresent('Task manager'), 'Task manager tab not present, displayed tabs : ' + await headerPage.primaryNavBar.getText()).to.be.true
        expect(await headerPage.isTabPresent('Task list'), 'Task list tab not present' + await headerPage.primaryNavBar.getText()).to.be.true

    });
        
});


