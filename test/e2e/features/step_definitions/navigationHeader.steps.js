const headerPage = require('../pageObjects/headerPage');
const browserWaits = require('../../support/customWaits');
var { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ And, But, Given, Then, When }) {

    Then('I see header tab Task list', async function () {
        expect(await headerPage.isTabPresent("Task list"), "Task list tab is not present").to.be.true;
    });

    Then('I see header tab Task manager', async function () {
        expect(await headerPage.isTabPresent("Task manager"), "Task manager tab is not present").to.be.true;
    });

    When('I click on primary navigation header {string}', async function (headerTabLabel) {
        await browserWaits.retryWithActionCallback(async () => {
            await headerPage.clickTabWithText(headerTabLabel);
        }, 'Click header tab with text ' + headerTabLabel);
       
    });

    When('I click on header tab Task list', async function () {
        await headerPage.clickTaskList();

    });

    When('I click on header tab Task manager', async function () {
        await headerPage.clickTaskManager();

    });

    Then('I see primary navigation tab {string} in header', async function (headerlabel) {
        try{
            await browserWaits.waitForConditionAsync(async () => {
                return await headerPage.isTabPresent(headerlabel);
            });
        }catch(err){

        }
       
        expect(await headerPage.isTabPresent(headerlabel), headerlabel + " tab is not present in " + await headerPage.getPrimaryTabsDisplayed()).to.be.true;
    })

    Then('I do not see primary navigation tab {string} in header', async function (headerlabel) {
        try{
            await browserWaits.waitForConditionAsync(async () => {
                return !(await headerPage.isTabPresent(headerlabel));
            });
        }catch(err){

        }
        
        expect(await headerPage.isTabPresent(headerlabel), headerlabel + " tab is not expected to present " + await headerPage.getPrimaryTabsDisplayed() ).to.be.false;
    })

    When('I click on primary navigation header tab {string}', async function(headerTab){
    // step definition code here
        await headerPage.clickTabWithText(headerTab);
    });

    When('I click on primary navigation header tab for release {string}', async function (release,datatable) {
        const releaseTabMaping = datatable.hashes()[0];
        await headerPage.clickTabWithText(releaseTabMaping[release]);
    });

});
