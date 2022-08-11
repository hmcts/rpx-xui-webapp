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

const allWorkLocators = require('../../appLocators/allWork');
const primaryNavLocators = require('../../appLocators/primaryNavHeader');


describe('Work Allocation: ', function () {

    before(async function (done) {
        MockApp.init();
        done();
    });
    after(async function (done) {
        await MockApp.stopServer();
        done();
    });


    it('All work:  Tasks', async function () {
        const userDetails = userDetailsMock.withIACJudicialUser('IAC_Judge_WA_R2');
        userDetails.userInfo.roles.push('case-allocator');
        userDetails.userInfo.roles.push('task-supervisor');
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(primaryNavLocators.header))
        actions.push(...PallyActions.clickElement(primaryNavLocators.allWork))
        actions.push(...PallyActions.clickElement(allWorkLocators.tasks))

        await pa11ytest(this, actions, conf.baseUrl + '/');

    });


});


