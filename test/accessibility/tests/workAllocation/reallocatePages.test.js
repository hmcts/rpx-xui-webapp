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


const assignmentId = 'cc311b32-5aea-4cd1-8b72-911fb47c8a2e';
const caseId = '1546883526751282';
const actorId = '38eb0c5e-29c7-453e-b92d-f2029aaed6c3';
const userName = 'Judge%20Beech';
const typeOfRole = 'Lead%20judge';

const route = `role-access/allocate-role/allocate?caseId=${caseId}&roleCategory=JUDICIAL&assignmentId=${assignmentId}&actorId=${actorId}&userName=${userName}&typeOfRole=${typeOfRole}`

describe('Work Allocation: Allocate', function () {

    before(async function (done) {
        MockApp.init();
        done();
    });
    after(async function (done) {
        await MockApp.stopServer();
        done();
    });


    it('choose role ', async function () {
        userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))

        await pa11ytest(this, actions, conf.baseUrl + route);

    });

    it('Choose how to allocate', async function () {
        userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.navigateTourl(conf.baseUrl + route))

        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
        actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseRole.option_1))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))


        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
        actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseRole.option_1))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseHowToAllocate.container))

        await pa11ytest(this, actions, conf.baseUrl);
    });


    it('Choose duration', async function () {
        userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
        actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseRole.option_1))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))


        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
        actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseRole.option_1))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseHowToAllocate.container))
        actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseHowToAllocate.reserverToMe))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))

        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseDuration.container))
        await pa11ytest(this, actions, conf.baseUrl + route);
    });


    it('Allocate check answers ', async function () {
        userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
        actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseRole.option_1))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))



        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
        actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseRole.option_1))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseHowToAllocate.container))
        actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseHowToAllocate.reserverToMe))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))

        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseDuration.container))
        actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseDuration.indefinite))
        actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))

        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.allocateCheckAnswers))

        await pa11ytest(this, actions, conf.baseUrl + route);

    });


});


