;


const assert = require('assert');

const MockApp = require('../../nodeMock/app');
const { browser } = require('protractor');
const BrowserUtil = require('../util/browserUtil');

const headerPage = require('../../e2e/features/pageObjects/headerPage');

describe('Header  Tabs', function () {

    beforeEach(async function (done) {
        MockApp.init();
        done();
    });
    afterEach(async function (done) {
        await MockApp.stopServer();
        done();
    });

    it('Case list tab present', async function () {
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth();       
        await headerPage.isTabPresent('Case list');
    });

    it('Create Case tab present', async function () {
        await MockApp.startServer();
        await BrowserUtil.browserInitWithAuth();
        await headerPage.isTabPresent('Create case');
    });


});


