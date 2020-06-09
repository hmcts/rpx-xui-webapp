;

const AppActions = require('../helpers/applicationActions');
const PallyActions = require('../helpers/pallyActions');

const assert = require('assert');
const { pa11ytest, getResults } = require('../helpers/pa11yUtil');
const {conf} = require('../config/config');;

const divorceCaseActions = require('../caseCreationActions/divorce'); 


describe('Pa11y Accessibility tests', function () {


    conf.authenticatedUrls.forEach( page => {
        it('Authenticated page url: ' + page.url, async  function () {
            const actions = [];
            actions.push(...AppActions.idamLogin(conf.params.username, conf.params.password));
            actions.push(...PallyActions.navigateTourl(conf.baseUrl + page.url));

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

    describe('test', async function(){
        let pageActiosn = divorceCaseActions();
        // console.log(JSON.stringify(pageActiosn));

        pageActiosn.forEach(page => {
            it('divoece case creation page ', async function(){
                const actions = [];
                actions.push(...AppActions.idamLogin(conf.params.username, conf.params.password));
                actions.push(...PallyActions.navigateTourl(conf.baseUrl +"cases/case-create/DIVORCE/DIVORCE/solicitorCreate/solicitorCreateSolAboutTheSolicitor" ));
                actions.push(...page.steps);

                await pa11ytest(this, actions);

            }).timeout(120000);
        });
    });





});


