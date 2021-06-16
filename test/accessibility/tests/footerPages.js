;

const AppActions = require('../helpers/applicationActions');
const PallyActions = require('../helpers/pallyActions');

const assert = require('assert');
const { pa11ytest, getResults, initBrowser } = require('../helpers/pa11yUtil');
const { conf } = require('../config/config');;

const divorceCaseActions = require('../caseCreationActions/divorce');
const MockApp = require('../../nodeMock/app');

const ccdApi = require('../../nodeMock/ccd/ccdApi');

describe('Pa11y Accessibility tests', function () {

    beforeEach(async function () {
        await initBrowser(this);

    });

    it('Accessibility Page', async function () {
        const actions = [];
        await pa11ytest(this, actions, conf.baseUrl + 'accessibility');

    });

    it('Cookies Page', async function () {
        const actions = [];
        await pa11ytest(this, actions, conf.baseUrl + 'cookies');

    });

    it('privacy-policy Page', async function () {
        const actions = [];
        await pa11ytest(this, actions, conf.baseUrl + 'privacy-policy');

    });

    it('get-help Page', async function () {
        const actions = [];
        await pa11ytest(this, actions, conf.baseUrl + 'get-help');

    });

});


