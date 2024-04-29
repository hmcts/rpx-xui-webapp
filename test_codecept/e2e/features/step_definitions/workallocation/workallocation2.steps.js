

const headerPage = require('../../pageObjects/headerPage');
const myWorkPage = require('../../pageObjects/workAllocation/myWorkPage');
const BrowserWaits = require('../../../support/customWaits');
const allWorkPage = require("../../pageObjects/workAllocation/allWorkPage");

const SoftAssert = require('../../../../ngIntegration/util/softAssert');
const taskCheckYourChangesPage = require('../../pageObjects/workAllocation/taskCheckYourChangesPage');
const caseAllocateCheckYourAnswersPage = require('../../pageObjects/workAllocation/caseAllocationCheckYourAnswersPage')
const workflowUtil = require('../../pageObjects/common/workflowUtil');


const { DataTableArgument } = require('codeceptjs');




    When('I navigate to My work sub navigation tab {string}', async function (secondaryNavTab) {
        await BrowserWaits.retryWithActionCallback(async () => {
            try{
                await headerPage.clickPrimaryNavigationWithLabel('My work');
                await BrowserWaits.waitForSeconds(2)
                await BrowserWaits.waitForSpinnerToDissappear();
                await myWorkPage.clickSubNavigationTab(secondaryNavTab);
            }catch(err){
                await headerPage.refreshBrowser();
                throw new Error(err); 


            }
           
        });   
       
    });

    When('I navigate to All work sub navigation tab {string}', async function (secondaryNavTab) {
        await headerPage.clickPrimaryNavigationWithLabel('All work');
        
        await BrowserWaits.retryWithActionCallback( async () => {
            await allWorkPage.clickSubNavigationTab(secondaryNavTab);

            if (secondaryNavTab.toLowerCase().includes('task')) {
                await allWorkPage.tasksContainer.isPresent()
            }

            if (secondaryNavTab.toLowerCase().includes('case')) {
                await allWorkPage.casesContainer.isPresent();
            }
        });
        await BrowserWaits.waitForSpinnerToDissappear();
        
    });

    Then('I validate My work sub navigations displayed', async function(datatable){
        const tabshashes = datatable.parse().hashes();
        for(let i = 0; i < tabshashes.length;i++){
            expect(await myWorkPage.isSubNavigationTabPresent(tabshashes[i]['Tab'])).to.be.true
        }
    });

    Then('I validate I am on My work page', async function(){
        await BrowserWaits.retryWithActionCallback(async () => {
            try{
                expect(await myWorkPage.amOnPage()).to.be.true
            }catch(err){
                await browser.get(process.env.TEST_URL);
                throw err;
            }
            
        })
        
    });

    When('I click My work sub navigation tab {string}', async function(subNavTabLabel){
        await myWorkPage.clickSubNavigationTab(subNavTabLabel);
    });


    When('I click cancel in check your changes of work allocation', async function () {
        await taskCheckYourChangesPage.clickCancelLink();
    });

    Then('I see task, check your changes page for action {string} displayed', async function(action){
        expect(await taskCheckYourChangesPage.amOnPage()).to.be.true;
        expect(await taskCheckYourChangesPage.getHeaderCaption()).to.include(action);
    });

    Then('I see task check your changes page for action {string} displayed', async function(taskAction){
        await taskCheckYourChangesPage.validatePage();
        expect(await taskCheckYourChangesPage.getHeaderCaption()).to.contains(taskAction);

    });

    Then('I see case allocation check your changes page for action {string} displayed', async function (taskAction) {
        await caseAllocateCheckYourAnswersPage.validatePage();
        expect(await caseAllocateCheckYourAnswersPage.getHeaderCaption()).to.contains(taskAction);

    });

    Then('I validate column {string} value is set to {string} in task check your changes page', async function(headerName, val){
        let actualVal = await taskCheckYourChangesPage.getColumnValue(headerName);
        expect(actualVal).to.contains(val)
    });

    Then('I validate column {string} value is set to {string} in case allocation check your changes page', async function (headerName, val) {
        let actualVal = await caseAllocateCheckYourAnswersPage.getColumnValue(headerName);
        expect(actualVal).to.contains(val)
    });


    When('I click submit button {string} in task check your changes page', async function(buttonLabel){
        expect(await taskCheckYourChangesPage.submitButton.getText()).to.contains(buttonLabel);
        await taskCheckYourChangesPage.submitButton.click();
    });

When('I click submit button {string} in case allocate check your changes page', async function (buttonLabel) {
    expect(await caseAllocateCheckYourAnswersPage.submitButton.getText()).to.contains(buttonLabel);
    await caseAllocateCheckYourAnswersPage.submitButton.click();
});

    Then('I see All work cases page displayed', async function(){
        await BrowserWaits.retryWithActionCallback(async () => {
            expect(await allWorkPage.isCasesContainerDisplayed()).to.be.true
        });
    });


    Then('I see all work cases not loaded and message displayed as {string}', async (message) => {
        await BrowserWaits.retryWithActionCallback(async () => {
            const isDisplayed = await allWorkPage.isCasesContainerDisplayed()
            expect(isDisplayed).to.be.false
            await await allWorkPage.allworkCasesMessage.wait()
            expect(await allWorkPage.allworkCasesMessage.getText()).to.contains(message)
        });
        
    })

