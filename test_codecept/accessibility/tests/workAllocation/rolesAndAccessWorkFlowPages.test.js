;

const AppActions = require('../../helpers/applicationActions');
const PallyActions = require('../../helpers/pallyActions');

const assert = require('assert');
const { pa11ytest, getResults, initBrowser } = require('../../helpers/pa11yUtil');
const { conf } = require('../../config/config');;

const divorceCaseActions = require('../../caseCreationActions/divorce');
const MockApp = require('../../../nodeMock/app');


const userDetailsMock = require('../../mockUtil/userDetails');

const  workAllocationWorkflow = require('../../appLocators/workAllocationWorkFlow');
const primaryNavLocators = require('../../appLocators/primaryNavHeader');


const assignmentId = 'cc311b32-5aea-4cd1-8b72-911fb47c8a2e';
const caseId = '1546883526751282';
const actorId = '38eb0c5e-29c7-453e-b92d-f2029aaed6c3';
const userName = 'Judge%20Beech';
const typeOfRole = 'Lead%20judge';

const route = `role-access/allocate-role/allocate?caseId=${caseId}&roleCategory=JUDICIAL&assignmentId=${assignmentId}&actorId=${actorId}&userName=${userName}&typeOfRole=${typeOfRole}`

const allocateRoleRoute = `role-access/allocate-role/allocate?caseId=1546883526751282&roleCategory=JUDICIAL`

describe('Work Allocation: Allocate', function () {

    before(async function (done) {
        done();
    });
    after(async function (done) {
        done();
    });


    it.skip('choose role ', async function () {
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))


        await initBrowser()
        await userDetailsMock.withIACJudicialUser();
        await pa11ytest(this, actions, conf.baseUrl + allocateRoleRoute);

    });

    // it('Choose how to allocate', async function () {
    //     userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
    //     await MockApp.startServer();
    //     const actions = [];
    //     actions.push(...PallyActions.navigateTourl(conf.baseUrl + allocateRoleRoute))

    //     actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
    //     actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseRole.option_1))
    //     actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))


    //     actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
    //     actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseRole.option_1))
    //     actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))
    //     actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseHowToAllocate.container))

    //     await pa11ytest(this, actions, conf.baseUrl);
    // });


    // it('Choose duration', async function () {
    //     userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
    //     await MockApp.startServer();
    //     const actions = [];
    //     actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
    //     actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseRole.option_1))
    //     actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))


    //     actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
    //     actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseRole.option_1))
    //     actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))
    //     actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseHowToAllocate.container))
    //     actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseHowToAllocate.reserverToMe))
    //     actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))

    //     actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseDuration.container))
    //     await pa11ytest(this, actions, conf.baseUrl + allocateRoleRoute);
    // });


    // it('Allocate check answers ', async function () {
    //     userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
    //     await MockApp.startServer();
    //     const actions = [];
    //     actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
    //     actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseRole.option_1))
    //     actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))



    //     actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseRole.container))
    //     actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseRole.option_1))
    //     actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))
    //     actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseHowToAllocate.container))
    //     actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseHowToAllocate.reserverToMe))
    //     actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))

    //     actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.chooseDuration.container))
    //     actions.push(...PallyActions.checkOption(workAllocationWorkflow.chooseDuration.indefinite))
    //     actions.push(...PallyActions.clickElement(workAllocationWorkflow.continue))

    //     actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.allocateCheckAnswers))

    //     await pa11ytest(this, actions, conf.baseUrl + allocateRoleRoute);

    // });


    it('Delete exclusion ', async function () {
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.deleteExclusionPage))


        await initBrowser()
        await userDetailsMock.withIACJudicialUser();
        await pa11ytest(this, actions, conf.baseUrl + 'role-access/delete-exclusion?caseId=1620409659381330&exclusionId=123');

    });

    it.skip('Remove allocation ', async function () {
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(workAllocationWorkflow.removeAllocation))


        await initBrowser()
        await userDetailsMock.withIACJudicialUser();
        await pa11ytest(this, actions, conf.baseUrl + 'role-access/allocate-role/remove?caseId=1546883526751282&roleCategory=JUDICIAL&assignmentId=c0129361-e8b1-482c-b124-8e5fcbd5db15&actorId=44d5d2c2-7112-4bef-8d05-baaa610bf463&userName=c0129361-e8b1-482c-b124-8e5fcbd5db15&typeOfRole=judge');

    });


});


