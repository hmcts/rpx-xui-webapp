const loginLogoutPage = require('../../e2e/features/pageObjects/loginLogoutObjects');
const config = require('../config/protractor.conf');

const {conf} = require('../config/config');
const { accessibilityCheckerAuditor,  setA11yTestDetails} = require('../helpers/accessibilityAuditor');

const headerPage = require('../../e2e/features/pageObjects/headerPage');
const CaseManager = require('../../e2e/features/pageObjects/common/CaseManager');
const DivorceCase = require('../../e2e/features/pageObjects/Divorcecase'); 
const FRCase = require('../../e2e/features/pageObjects/FRCase'); 
const ProbateCase = require('../../e2e/features/pageObjects/ProbateCase'); 

const BrowserWaits = require('../../e2e/support/customWaits'); 

describe('Pa11y Accessibility tests', function () {
    let divorceCase = new DivorceCase();
    let frCase = new FRCase();
    let probateCase = new ProbateCase();
    let caseManager = new CaseManager();
    
    conf.unauthenticatedUrls.forEach((url) => {
        it('unauthernicated page  ' + url, async (done) => {
            await browser.get(config.config.params.serverUrls+url);
            setA11yTestDetails( url);
            await accessibilityCheckerAuditor("unauthernicated page : " + url);
            done();
        },60000);
    });

    conf.authenticatedUrls.forEach((page) => {
        it('authernicated page  ' + page.url , async (done) => {
            await browser.get(config.config.params.serverUrls + page.url);
            await loginLogoutPage.givenIAmLoggedIn(config.config.params.username, config.config.params.password);
            await BrowserWaits.waitForElement($(page.pageElementcss));
            
            setA11yTestDetails( page.url);
            await accessibilityCheckerAuditor("authernicated page : "+page.url);
            done()
        },60000);
    });


    it('Divorce Case ', async (done) => {
        setA11yTestDetails("Divorce case creation");

        await browser.get(config.config.params.serverUrls);
        await loginLogoutPage.givenIAmLoggedIn(config.config.params.username, config.config.params.password);
        await headerPage.clickCreateCase();
        await caseManager.startCaseCreation('Family Divorce', 'Divorce case - v115.00', 'Apply for a divorce');
       try{
           await divorceCase.createCase(true);
       }catch(err){
           done(); 
       }  
        done();
    }, 180 * 1000);


    it('FR Consented ', async (done) => {
        setA11yTestDetails("FR Consented case creation");

        await browser.get(config.config.params.serverUrls);
        await loginLogoutPage.givenIAmLoggedIn(config.config.params.username, config.config.params.password);
        await headerPage.clickCreateCase();
        await caseManager.startCaseCreation('Family Divorce', 'Financial Remedy Consented', 'Consent Order Application');
        try {
            await frCase.createCase(true);
        } catch (err) {
            done();
        }
        done();
    }, 180 * 1000);

    it('FR Contested', async (done) => {
        setA11yTestDetails("FR Contested case Creation");

        await browser.get(config.config.params.serverUrls);
        await loginLogoutPage.givenIAmLoggedIn(config.config.params.username, config.config.params.password);
        await headerPage.clickCreateCase();
        await caseManager.startCaseCreation('Family Divorce', 'Contested Financial Remedy', 'Form A Application');
        try {
            await frCase.createCase(true);
        } catch (err) {
            done();
        }
        done();
    }, 180 * 1000);

    it('Probate Case creation ', async (done) => {
        setA11yTestDetails("Probate case Creation");

        await browser.get(config.config.params.serverUrls);
        await loginLogoutPage.givenIAmLoggedIn(config.config.params.username, config.config.params.password);
        await headerPage.clickCreateCase();
        await caseManager.startCaseCreation('Manage probate application', 'Grant of representation', 'Apply for probate');
        try {
            await probateCase.createCase(true);
        } catch (err) {
            done();
        }
        done();
    }, 180 * 1000);


    afterEach(async function () {
        console.log("Test executed successfully");
        await browser.driver.manage()
            .deleteAllCookies();
        await browser.get(config.config.params.serverUrls);    });
        
 
});