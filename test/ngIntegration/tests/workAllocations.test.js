;


const assert = require('assert');

const MockApp = require('../../nodeMock/app');
const { browser } = require('protractor');
const BrowserUtil = require('../util/browserUtil');
const BrowserWaits = require('../../e2e/support/customWaits');

const headerPage = require('../../e2e/features/pageObjects/headerPage');

describe('EUI-2961 Count of tasks in Task manager', function () {

    beforeEach(async function (done) {
        await browser.manage().deleteAllCookies();
        MockApp.init();
        done();
    });
    afterEach(async function (done) {
        await MockApp.stopServer();
        done();
    });

    it.skip('Display tasks count in Task manager page - showing 1 or more tasks', async function () {
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth(["caseworker-ia-caseofficer", "caseworker-ia-admofficer"]);

        await headerPage.waitForPrimaryNavDisplay()
        await BrowserUtil.waitForLD();
        await browser.get('tasks/task-manager/');


        expect(await headerPage.isTabPresent('Case list'), 'Case list tab not present, displayed tabs : ').to.be.true

    });

   

});


