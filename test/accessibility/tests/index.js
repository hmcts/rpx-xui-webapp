;

const AppActions = require('../helpers/applicationActions');
const PallyActions = require('../helpers/pallyActions');

const assert = require('assert');
const { pa11ytest, getResults } = require('../helpers/pa11yUtil');
const {conf} = require('../config/config');

describe('Pa11y Accessibility tests', function () {

    conf.authenticatedUrls.forEach( page => {
        it('Authenticated page url: ' + page.url, async function () {
            const actions = [];
            actions.push(...AppActions.idamLogin(conf.params.username, conf.params.password));
            actions.push(...PallyActions.navigateTourl(conf.baseUrl + page.url,));
            actions.push(...PallyActions.waitForPageWithCssLocator(page.pageElementcss));
            await pa11ytest(this, actions);

        }).timeout(60000);
        
    });

    conf.unauthenticatedUrls.forEach(url => {
        it('Unauthenticated page url: ' + url, async function () {
            const actions = [];
            actions.push(...PallyActions.navigateTourl(conf.baseUrl + url));
            await pa11ytest(this, actions);

        }).timeout(60000);

    });

   


});


