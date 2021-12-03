;

const AppActions = require('../helpers/applicationActions');
const PallyActions = require('../helpers/pallyActions');

const assert = require('assert');
const { pa11ytest, getResults, initBrowser } = require('../helpers/pa11yUtil');
const { conf } = require('../config/config');;

const divorceCaseActions = require('../caseCreationActions/divorce');
const MockApp = require('../../nodeMock/app');

const ccdApi = require('../../nodeMock/ccd/ccdApi');
const caseDetailsPageLocators = require('../appLocators/caseDetails');

describe('Case details page', function () {
    const caseDetailsRoute = 'cases/case-details/1547480421733777/'
    before(async function (done) {
        MockApp.init()
        ccdApi.caseDetailsResponse.case_type.id = "Asylum";
        ccdApi.caseDetailsResponse.case_type.name ="Immigration & Asylum"
        ccdApi.caseDetailsResponse.case_type.jurisdiction.id = "IA";
        ccdApi.caseDetailsResponse.case_type.jurisdiction.name = "Immigration & Asylu";
        ccdApi.caseDetailsResponse.case_type.jurisdiction.description = "Immigration & Asylu";
        done();
    });
    after(async function (done) {
        await MockApp.stopServer();
        done();
    });

    it('Tasks tab', async function () {
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(caseDetailsPageLocators.container));
         actions.push(...PallyActions.clickElement(caseDetailsPageLocators.rolesAndAccessTab));
        actions.push(...PallyActions.waitForPageWithCssLocator(caseDetailsPageLocators.rolesAndAccessContainer));
        actions.push(...PallyActions.clickElement(caseDetailsPageLocators.tasksTab));
        actions.push(...PallyActions.waitForPageWithCssLocator(caseDetailsPageLocators.tasksContainer));

        await pa11ytest(this, actions, conf.baseUrl + caseDetailsRoute);

    });

    it('Roles and access tab', async function () {
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator(caseDetailsPageLocators.container));
        actions.push(...PallyActions.clickElement(caseDetailsPageLocators.rolesAndAccessTab));
        actions.push(...PallyActions.waitForPageWithCssLocator(caseDetailsPageLocators.rolesAndAccessContainer));

        await pa11ytest(this, actions, conf.baseUrl + caseDetailsRoute);

    });


});


