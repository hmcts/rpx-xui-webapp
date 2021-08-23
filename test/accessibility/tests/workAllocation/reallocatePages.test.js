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

const  workAllocationWorkflow = require('../../appLocators/workAllocationWorkFlow');
const primaryNavLocators = require('../../appLocators/primaryNavHeader');


describe('Work Allocation: Reallocate', function () {

    before(async function (done) {
        MockApp.init();
        done();
    });
    after(async function (done) {
        await MockApp.stopServer();
        done();
    });


    it('Reallocate : choose role ', async function () {
        userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
        
        await pa11ytest(this, actions, conf.baseUrl + '/role-access/allocate-role?userType=judicial');

    });

    it('Reallocate : Choose how to allocate', async function () {
        userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.chooseRole.option_1))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseHowToAllocate.container))

        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseDuration.container))
        await pa11ytest(this, actions, conf.baseUrl + '/role-access/allocate-role?userType=judicial');
    });


    it('Reallocate : Choose duration', async function () {
        userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.chooseRole.option_1))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseHowToAllocate.container))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.chooseHowToAllocate.reserverToMe))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))

        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseDuration.container))
        await pa11ytest(this, actions, conf.baseUrl + '/role-access/allocate-role?userType=judicial');
    });


    it('Reallocate : Allocate check answers ', async function () {
        userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.chooseRole.option_1))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseHowToAllocate.container))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.chooseHowToAllocate.reserverToMe))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))

        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseDuration.container))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.chooseDuration.indefinite))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))

        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.allocateCheckAnswers))

        await pa11ytest(this, actions, conf.baseUrl + '/role-access/allocate-role?userType=judicial');

    });


});


