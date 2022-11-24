;

const AppActions = require('../../helpers/applicationActions');
const PallyActions = require('../../helpers/pallyActions');

const assert = require('assert');
const { pa11ytest, getResults, initBrowser } = require('../../helpers/pa11yUtil');
const { conf } = require('../../config/config');;

const divorceCaseActions = require('../../caseCreationActions/divorce');
const MockApp = require('../../../nodeMock/app');

const ccdApi = require('../../../nodeMock/ccd/ccdApi');

const userDetailsMock = require('../../mockUtil/userDetails');

const myWorkLocators = require('../../appLocators/myWork');

xdescribe('Work Allocation: ', function () {

    before(async function (done) {
        MockApp.init();
        done();
    });
    after(async function (done) {
        await MockApp.stopServer();
        done();
    });


    it('My work: My tasks', async function () {
        userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.clickElement(myWorkLocators.workFilterButton))
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.workFilters))
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.myTasks))
        await pa11ytest(this, actions, conf.baseUrl + '/');

    });


    it.skip('My work: Available tasks', async function () {
        userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.myTasks))
        actions.push(...PallyActions.clickElement(myWorkLocators.subNavihationLinks.availableTasks))
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.availableTasks))
        await pa11ytest(this, actions, conf.baseUrl + '/');

    });

    it('My work: My cases', async function () {
        userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.myTasks))
        actions.push(...PallyActions.clickElement(myWorkLocators.subNavihationLinks.myCases))
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.myCases))
        await pa11ytest(this, actions, conf.baseUrl + '/');

    });

    it.skip('My work: Work filters', async function () {
        userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.myTasks))
        actions.push(...PallyActions.clickElement(myWorkLocators.workFilterButton))
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.workFilters))
        await pa11ytest(this, actions, conf.baseUrl + '/');

    });

});


