;

const AppActions = require('../helpers/applicationActions');
const PallyActions = require('../helpers/pallyActions');

const assert = require('assert');
const { pa11ytest, getResults } = require('../helpers/pa11yUtil');
const {conf} = require('../config/config');;

const divorceCaseActions = require('../caseCreationActions/divorce'); 
const MockApp = require('../../nodeMock/app');

const ccdApi = require('../../nodeMock/ccd/ccdApi');

describe('Pa11y Accessibility tests', function () {

    before(async function (done) {
        MockApp.init()
        await MockApp.startServer();
        done();
    });
    after(async function (done) {
        await MockApp.stopServer();
        done();
    });

    it('Case List Page', async function () {
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('ccd-workbasket-filters .heading-h2'))
        await pa11ytest(this, actions, conf.baseUrl + 'cases');

    });

    it('Case Search Page', async function () {
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('.search-block'))
        await pa11ytest(this, actions, conf.baseUrl + 'cases/case-search');

    });

    it('Create Case Page', async function () {
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-ccd-connector'))
        await pa11ytest(this, actions, conf.baseUrl + 'cases/case-filter');
    });

    it('Share Case page', async function () {
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share #title-selected-cases'));
        actions.push(...PallyActions.waitForPageWithCssLocator('#accordion-with-summary-sections .govuk-accordion__open-all span'));

        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections .govuk-accordion__open-all'));

        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections xuilib-selected-case  .govuk-accordion__section-content a'));
        await pa11ytest(this, actions, conf.baseUrl + 'cases/case-share?init=true');
    });

    it('Confirm Share a case page', async function () {
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share #title-selected-cases'));
        actions.push(...PallyActions.waitForPageWithCssLocator('#accordion-with-summary-sections .govuk-accordion__open-all span'));

        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections .govuk-accordion__open-all'));

        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections xuilib-selected-case  .govuk-accordion__section-content a'));
        actions.push(...PallyActions.clickElement('#share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share-confirm #summarySections'));
        await pa11ytest(this, actions, conf.baseUrl + 'cases/case-share?init=true');
    });


    const divorceCreateCaseConfig = ccdApi.getSolicitorCreateCaseConfig('DIVORCE','DIVORCE'); 
    divorceCreateCaseConfig.wizard_pages.forEach(page => {
        it('Divorce Create Case Page '+ page.id, async function () {
            const actions = [];
            actions.push(...PallyActions.waitForPageWithCssLocator('ccd-case-edit-page h1'))
            await pa11ytest(this, actions, conf.baseUrl + 'cases/case-create/DIVORCE/DIVORCE/solicitorCreate/' + page.id);

        });
 
    });

    const fr_ConsentedConfig = ccdApi.getSolicitorCreateCaseConfig('FinancialRemedyMVP2', 'FR_solicitorCreate');
    fr_ConsentedConfig.wizard_pages.forEach(page => {
        it('FR Consented Create Case Page ' + page.id, async function () {
            const actions = [];
            actions.push(...PallyActions.waitForPageWithCssLocator('ccd-case-edit-page h1'))
            await pa11ytest(this, actions, conf.baseUrl + 'cases/case-create/DIVORCE/FinancialRemedyMVP2/FR_solicitorCreate/' + page.id);

        });

    });

    const fr_ContestedConfig = ccdApi.getSolicitorCreateCaseConfig('FinancialRemedyContested', 'FR_solicitorCreate');
    fr_ContestedConfig.wizard_pages.forEach(page => {
        it('FR Contested Create Case Page ' + page.id, async function () {
            const actions = [];
            actions.push(...PallyActions.waitForPageWithCssLocator('ccd-case-edit-page h1'))
            await pa11ytest(this, actions, conf.baseUrl + 'cases/case-create/DIVORCE/FinancialRemedyContested/FR_solicitorCreate/' + page.id);
        });

    });

    const probateGrantOfrepresentation = ccdApi.getSolicitorCreateCaseConfig('GrantOfRepresentation', 'solicitorCreateApplication');
    probateGrantOfrepresentation.wizard_pages.forEach(page => {
        it('Probate Grant Of Representation Create Case Page ' + page.id, async function () {
            const actions = [];
            actions.push(...PallyActions.waitForPageWithCssLocator('ccd-case-edit-page h1'))
            await pa11ytest(this, actions, conf.baseUrl + 'cases/case-create/DIVORCE/GrantOfRepresentation/solicitorCreateApplication/' + page.id);
        });

    });

    const probateCreateCaveat = ccdApi.getSolicitorCreateCaseConfig('Caveat', 'solicitorCreateCaveat');
    probateCreateCaveat.wizard_pages.forEach(page => {
        it('Probate create caveat Create Case Page ' + page.id, async function () {
            const actions = [];
            actions.push(...PallyActions.waitForPageWithCssLocator('ccd-case-edit-page h1'))
            await pa11ytest(this, actions, conf.baseUrl + 'cases/case-create/DIVORCE/Caveat/solicitorCreateCaveat/' + page.id);
        });

    });

    const iaConfig = ccdApi.getSolicitorCreateCaseConfig('Asylum', 'startAppeal');
    iaConfig.wizard_pages.forEach(page => {
        it('IA Create Case Page ' + page.id, async function () {
            const actions = [];
            actions.push(...PallyActions.waitForPageWithCssLocator('ccd-case-edit-page h1'))
            await pa11ytest(this, actions, conf.baseUrl + 'cases/case-create/DIVORCE/Asylum/startAppeal/' + page.id);
        });

    });

});


