;

const AppActions = require('../helpers/applicationActions');
const PallyActions = require('../helpers/pallyActions');

const assert = require('assert');
const { pa11ytest, getResults } = require('../helpers/pa11yUtil');
const { conf } = require('../config/config');;

const divorceCaseActions = require('../caseCreationActions/divorce');
const MockApp = require('../../nodeMock/app');

const ccdApi = require('../../nodeMock/ccd/ccdApi');

describe.only('Work Allocation: ', function () {

    beforeEach(async function (done) {
        MockApp.init()
        done();
    });
    afterEach(async function (done) {
        await MockApp.stopServer();
        done();
    });

    it('Tasks Page', async function () {
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-task-home exui-task-list'))
        await pa11ytest(this, actions, conf.baseUrl + 'tasks');

    });

    it('Reassign task page', async function () {
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-task-container-assignment h1'))
        await pa11ytest(this, actions, conf.baseUrl + 'tasks/reassign/123456');
    });



});


