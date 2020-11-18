;

const AppActions = require('../helpers/applicationActions');
const PallyActions = require('../helpers/pallyActions');

const assert = require('assert');
const { pa11ytest, getResults } = require('../helpers/pa11yUtil');
const { conf } = require('../config/config');;

const divorceCaseActions = require('../caseCreationActions/divorce');
const MockApp = require('../../nodeMock/app');

const ccdApi = require('../../nodeMock/ccd/ccdApi');

describe('Pa11y Accessibility tests', function () {

    beforeEach(async function (done) {
        MockApp.init()
        done();
    });
    afterEach(async function (done) {
        await MockApp.stopServer();
        done();
    });

    it('Case List Page', async function () {
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('ccd-workbasket-filters .heading-h2'))
        await pa11ytest(this, actions, conf.baseUrl + 'cases');

    });

    it('Case Search Page', async function () {
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('.search-block'))
        await pa11ytest(this, actions, conf.baseUrl + 'cases/case-search');

    });


    it('Share Case page', async function () {
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share #title-selected-cases'));
        actions.push(...PallyActions.waitForPageWithCssLocator('#accordion-with-summary-sections .govuk-accordion__open-all span'));

        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections .govuk-accordion__open-all'));

        actions.push(...PallyActions.inputField('xuilib-user-select input', '@'));
        actions.push(...PallyActions.clickElement('.mat-autocomplete-visible mat-option span'));
        actions.push(...PallyActions.clickElement('xuilib-share-case #btn-add-user'));
        await pa11ytest(this, actions, conf.baseUrl + 'cases/case-share?init=true');
    });

    it('Confirm Share a case page', async function () {
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share #title-selected-cases'));
        actions.push(...PallyActions.waitForPageWithCssLocator('#accordion-with-summary-sections .govuk-accordion__open-all span'));
        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections .govuk-accordion__open-all'));

        actions.push(...searchAndAddUserSteps());
        // actions.push(...PallyActions.clickElement('#accordion-with-summary-sections xuilib-selected-case  .govuk-accordion__section-content a'));
        actions.push(...PallyActions.clickElement('#share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share-confirm #summarySections'));
        await pa11ytest(this, actions, conf.baseUrl + 'cases/case-share?init=true');
    });

    it('Share Case Submission success', async function () {
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share #title-selected-cases'));
        actions.push(...PallyActions.waitForPageWithCssLocator('#accordion-with-summary-sections .govuk-accordion__open-all span'));
        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections .govuk-accordion__open-all'));

        actions.push(...searchAndAddUserSteps());
        // actions.push(...PallyActions.clickElement('#accordion-with-summary-sections xuilib-selected-case  .govuk-accordion__section-content a'));
        actions.push(...PallyActions.clickElement('#share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share-confirm #summarySections'));
        actions.push(...PallyActions.clickElement('xuilib-share-case-confirm #share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('.govuk-panel--confirmation'));
        await pa11ytest(this, actions, conf.baseUrl + 'cases/case-share?init=true');
    });

    it('Share Case Submission partial success', async function () {
        MockApp.onPost('/api/caseshare/case-assignments', (req, res) => {
            res.send(req.body.sharedCases);
        });
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share #title-selected-cases'));
        actions.push(...PallyActions.waitForPageWithCssLocator('#accordion-with-summary-sections .govuk-accordion__open-all span'));
        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections .govuk-accordion__open-all'));

        actions.push(...searchAndAddUserSteps());
        // actions.push(...PallyActions.clickElement('#accordion-with-summary-sections xuilib-selected-case  .govuk-accordion__section-content a'));
        actions.push(...PallyActions.clickElement('#share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share-confirm #summarySections'));
        actions.push(...PallyActions.clickElement('xuilib-share-case-confirm #share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share-complete'));
        await pa11ytest(this, actions, conf.baseUrl + 'cases/case-share?init=true');
    });


    it('Share Case Submission error page', async function () {
        MockApp.onPost('/api/caseshare/case-assignments', (req, res) => {
            res.status(500).send();
        });
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share #title-selected-cases'));
        actions.push(...PallyActions.waitForPageWithCssLocator('#accordion-with-summary-sections .govuk-accordion__open-all span'));
        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections .govuk-accordion__open-all'));

        actions.push(...searchAndAddUserSteps());
        // actions.push(...PallyActions.clickElement('#accordion-with-summary-sections xuilib-selected-case  .govuk-accordion__section-content a'));
        actions.push(...PallyActions.clickElement('#share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share-confirm #summarySections'));
        actions.push(...PallyActions.clickElement('xuilib-share-case-confirm #share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('exui-service-down'));
        await pa11ytest(this, actions, conf.baseUrl + 'cases/case-share?init=true');
    });


    function searchAndAddUserSteps() {

        const actions = [];
        actions.push(...PallyActions.inputField('xuilib-user-select input', 'james'));
        actions.push(...PallyActions.clickElement('xuilib-user-select input'));
        actions.push(...PallyActions.waitForPageWithCssLocator('.mat-autocomplete-visible mat-option .mat-option-text'));
        actions.push(...PallyActions.clickElement('.mat-autocomplete-visible mat-option .mat-option-text'));
        actions.push(...PallyActions.clickElement('#btn-add-user'));
        actions.push(...PallyActions.waitForPageWithCssLocator('span.hmcts-badge'));

        return actions;

    }


});


