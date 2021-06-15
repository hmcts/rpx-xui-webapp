;

const AppActions = require('../helpers/applicationActions');
const PallyActions = require('../helpers/pallyActions');

const assert = require('assert');
const { pa11ytest, getResults } = require('../helpers/pa11yUtil');
const {conf} = require('../config/config');;

const divorceCaseActions = require('../caseCreationActions/divorce'); 
const MockApp = require('../../nodeMock/app');

const ccdApi = require('../../nodeMock/ccd/ccdApi');

const { getTestJurisdiction} = require('../../ngIntegration/mockData/ccdCaseMock');

describe('Pa11y Accessibility tests', function () {
    let fieldstested = []; 
    beforeEach(async function () {
        await initBrowser(this);

    });
  
    it('Create Case Page', async function () {
        // //await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-ccd-connector'))
        await pa11ytest(this, actions, conf.baseUrl + 'cases/case-filter');
    });

   

    const mockCaseType = getTestJurisdiction().getCase();
    mockCaseType.wizard_pages.forEach(page => {
        if (!page.show_condition){
            it('Mock case type Case Page ' + page.id, async function () {
                // //await MockApp.startServer();
                const actions = [];
                actions.push(...PallyActions.waitForPageWithCssLocator('ccd-case-edit-page h1'))
                await pa11ytest(this, actions, conf.baseUrl + 'cases/case-create/test/casetype_1/solicitorCreate/' + page.id);

            });
         }
    });


});


