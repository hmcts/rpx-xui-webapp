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
    When('I click on header tab Task list', async function () {
        await headerPage.clickTaskList();

    });

    When('I click on header tab Task manager', async function () {
        await headerPage.clickTaskManager();

    });

    When('I click on primary navigation header tab {string}', async function (headerTabLabel) {
        await headerPage.clickPrimaryNavigationWithLabel(headerTabLabel);

    });


    Then('I see primary navigation tab {string} in header', async function (headerlabel) {
        try{
            await browserWaits.waitForConditionAsync(async () => {
                return await headerPage.isTabPresent(headerlabel);
            });
        }catch(err){

        }
       
        expect(await headerPage.isTabPresent(headerlabel), headerlabel + " tab is not present in " + await headerPage.getPrimaryNavigations()).to.be.true;
    })

    Then('I do not see primary navigation tab {string} in header', async function (headerlabel) {
        try{
            await browserWaits.waitForConditionAsync(async () => {
                return !(await headerPage.isTabPresent(headerlabel));
            });
        }catch(err){

        }
        
        expect(await headerPage.isTabPresent(headerlabel), headerlabel + " tab is not expected to present " + await headerPage.getPrimaryNavigations() ).to.be.false;
    })


});
