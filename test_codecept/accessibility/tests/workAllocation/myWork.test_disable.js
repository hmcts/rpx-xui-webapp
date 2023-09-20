;

const AppActions = require('../../helpers/applicationActions');
const PallyActions = require('../../helpers/pallyActions');

const assert = require('assert');
const { pa11ytest, getResults, initBrowser } = require('../../helpers/pa11yUtil');
const { conf } = require('../../config/config');;

const divorceCaseActions = require('../../caseCreationActions/divorce');
const MockApp = require('../../../nodeMock/app');


const userDetailsMock = require('../../mockUtil/userDetails');

const myWorkLocators = require('../../appLocators/myWork');

describe('Work Allocation: ', function () {

    // before(async function (done) {
    //     done();
    // });
    // after(async function (done) {
    //     done();
    // });


    it('My work: My tasks', async function () {
        const actions = []
        actions.push(...PallyActions.clickElement(myWorkLocators.workFilterButton))
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.workFilters))
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.myTasks))

        await initBrowser()
        await userDetailsMock.withIACJudicialUser();

        await pa11ytest(this, actions, conf.baseUrl + '/');

    });


    it.skip('My work: Available tasks', async function () {
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.myTasks))
        actions.push(...PallyActions.clickElement(myWorkLocators.subNavihationLinks.availableTasks))
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.availableTasks))

        await initBrowser()
        await userDetailsMock.withIACJudicialUser();
        await pa11ytest(this, actions, conf.baseUrl + '/');

    });

    it.skip('My work: My cases', async function () {
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.myTasks))
        actions.push(...PallyActions.clickElement(myWorkLocators.subNavihationLinks.myCases))
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.myCases))


        await initBrowser()
        await userDetailsMock.withIACJudicialUser()
        await pa11ytest(this, actions, conf.baseUrl + '/');

    });

    it.skip('My work: Work filters', async function () {
      
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.myTasks))
        actions.push(...PallyActions.clickElement(myWorkLocators.workFilterButton))
        actions.push(...PallyActions.waitForPageWithCssLocator(myWorkLocators.workFilters))


        await initBrowser()
        await userDetailsMock.withIACJudicialUser();
        await pa11ytest(this, actions, conf.baseUrl + '/');

    });

});


