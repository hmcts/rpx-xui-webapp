
var { defineSupportCode } = require('cucumber');

const headerPage = require('../../pageObjects/headerPage');
const myWorkPage = require('../../pageObjects/workAllocation/myWorkPage');
const BrowserWaits = require('../../../support/customWaits');
const allWorkPage = require("../../pageObjects/workAllocation/allWorkPage");

const SoftAssert = require('../../../../ngIntegration/util/softAssert');
const taskCheckYourChangesPage = require('../../pageObjects/workAllocation/taskCheckYourChangesPage');

const workflowUtil = require('../../pageObjects/common/workflowUtil');



defineSupportCode(function ({ And, But, Given, Then, When }) {


    When('I navigate to My work sub navigation tab {string}', async function (secondaryNavTab) {
        await headerPage.clickPrimaryNavigationWithLabel('My work');
        await myWorkPage.clickSubNavigationTab(secondaryNavTab);
       
    });

    Then('I validate My work sub navigations displayed', async function(datatable){
        const tabshashes = datatable.hashes();
        for(let i = 0; i < tabshashes.length;i++){
            expect(await myWorkPage.isSubNavigationTabPresent(tabshashes[i]['Tab'])).to.be.true
        }
    });

    Then('I validate I am on My work page', async function(){
        expect(await myWorkPage.amOnPage()).to.be.true
    });

    When('I click My work sub navigation tab {string}', async function(subNavTabLabel){
        await myWorkPage.clickSubNavigationTab(subNavTabLabel);
    });


    When('I select all work tasks filter {string} with value {string}', async function (filterType, filterValue) {
        let filterTypeLowerCase = filterType.toLowerCase();
        if (filterTypeLowerCase.includes("location")){
            allWorkPage.selectLocationFilter(filterValue);

        } else if (filterTypeLowerCase.includes("person")){
            allWorkPage.selectPersonFilter(filterValue);
        }else{
            throw new Error(`Test implementation error.filterType ${filterType} is not yet implemented in test `);
        }
       
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

    Then('I validate column {string} value is set to {string} in task check your changes page', async function(headerName, val){
        let actualVal = await taskCheckYourChangesPage.getColumnValue(headerName);
        expect(actualVal).to.contains(val)
    });

    When('I click submit button {string} in task check your changes page', async function(buttonLabel){
        expect(await taskCheckYourChangesPage.submitButton.getText()).to.contains(buttonLabel);
        await taskCheckYourChangesPage.submitButton.click();
    });

    Then('I validate task details displayed in check your changes page', async function(taskDetailsDatatable){
        const taskDetails = taskDetailsDatatable.hashes()[0];
        const softAssert = new SoftAssert();

        const taskColumns = Object.keys(taskDetails);
        for (let i = 0; i < taskColumns.length; i++){
            let columnName = taskColumns[i];
            let expectColValue = taskDetails[columnName]
            softAssert.setScenario(`Validate column ${columnName} value is ${expectColValue}`);
            const columnActalValue = await taskCheckYourChangesPage.getColumnValue(columnName);
            await softAssert.assert(async () => expect(columnActalValue).to.contains(expectColValue));
        }
        softAssert.finally();
        
    });

});