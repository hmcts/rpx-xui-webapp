;

const AppActions = require('../helpers/applicationActions');
const PallyActions = require('../helpers/pallyActions');

const assert = require('assert');
const { pa11ytest, getResults, initBrowser } = require('../helpers/pa11yUtil');
const { conf } = require('../config/config');;

const divorceCaseActions = require('../caseCreationActions/divorce');
const MockApp = require('../../nodeMock/app');


describe('Pa11y Accessibility tests', function () {
    // before(async function (done) {
      
    //     done();
    // });
    // after(async function (done) {
      
    //     done();
    // });
    
    it('Accessibility Page', async function () {
        const actions = [];
        await initBrowser()
        await pa11ytest(this, actions, conf.baseUrl + 'accessibility');

    });

    it('Cookies Page', async function () {
        const actions = [];
        await initBrowser()
        await pa11ytest(this, actions, conf.baseUrl + 'cookies');

    });

    it('privacy-policy Page', async function () {
        const actions = [];
        await initBrowser()
        await pa11ytest(this, actions, conf.baseUrl + 'privacy-policy');

    });

    it('get-help Page', async function () {
        const actions = [];
        await initBrowser()
        await pa11ytest(this, actions, conf.baseUrl + 'get-help');

    });

});


