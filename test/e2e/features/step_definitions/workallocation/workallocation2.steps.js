
var { defineSupportCode } = require('cucumber');

const headerPage = require('../../pageObjects/headerPage');
const myWorkPage = require('../../pageObjects/workAllocation/myWorkPage');
const BrowserWaits = require('../../../support/customWaits');
const allWorkPage = require("../../pageObjects/workAllocation/allWorkPage");

const findPersonPage = require("../../pageObjects/workAllocation/findPersonPage");
const SoftAssert = require('../../../../ngIntegration/util/softAssert');
const taskCheckYourChangesPage = require('../../pageObjects/workAllocation/taskCheckYourChangesPage');

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

    When('I click My work sub navigation tab {string}', async function(subNavTab){
        await myWorkPage.clickSubNavigationTab(subNavTab);
    });

    Then('I validate I am on My work page', async function(){
        expect(await myWorkPage.amOnPage()).to.be.true
    });

    Then('I see work filter button displayed', async function () {
        await BrowserWaits.retryWithActionCallback(async () => {
            expect(await myWorkPage.showHideWorkFilterBtn.isDisplayed()).to.be.true
        }); 
    });

    Then('I validate work filter button text is {string}', async function (btntext) {
        expect(await myWorkPage.showHideWorkFilterBtn.getText()).to.contains(btntext);
    });

    When('I click work filter button', async function () {
        await BrowserWaits.retryWithActionCallback(async () => await myWorkPage.showHideWorkFilterBtn.click() );
    });

    Then('I validate location filter is displayed', async function () {
        await BrowserWaits.retryWithActionCallback(async () => {
            expect(await myWorkPage.genericFilterContainer.isPresent()).to.be.true;;
        }); 
    });

    Then('I validate location filter is not displayed', async function () {
        await BrowserWaits.retryWithActionCallback(async () => {
            expect(await myWorkPage.genericFilterContainer.isPresent(),'location filter is still displayed').to.be.false;;
        });
        
    });

    Then('I validate My work filter locations displayed', async function () {
        await myWorkPage.waitForWorkFilterToDisplay();
        expect(await myWorkPage.getWorkFilterLocationsCount() > 0,'No location inputs displayed').to.be.true;;
    });

    Then('I validate work locations selected count is {int}', async function (selectedLocationsCount) {
        await myWorkPage.waitForWorkFilterToDisplay();
        const selectedLocs = await myWorkPage.getListOfSelectedLocations();
        expect(selectedLocs.length,'selected locations count not matching').to.equal(selectedLocationsCount);

    });

    When('I click work location filter with label {string}', async function(workLocationLabel){
        await myWorkPage.waitForWorkFilterToDisplay();
        await myWorkPage.clickWorkFilterLoctionInputWithLabel(workLocationLabel);
    });

    Then('I validate following work location selected', async function(locationsDatatable){
        const selectedLocations = await myWorkPage.getListOfSelectedLocations();
        const locationNameHashes = locationsDatatable.hashes();
        const locationNamesArr = [];
        for (let i = 0; i < locationNameHashes.length; i++){
            locationNamesArr.push(locationNameHashes[i].locationName);
        }
        expect(selectedLocations, 'actual missing expected locations').to.have.same.members(locationNamesArr);
        //expect(locationNamesArr,'actual has more locations selected').to.include.all.members(selectedLocations);
        

    });

    When('I click work location filter Apply button', async function(){
        await myWorkPage.waitForWorkFilterToDisplay();
        await myWorkPage.workFilterApplyBtn.click();
    });

    When('I click work location filter Reset button', async function(){
        await myWorkPage.waitForWorkFilterToDisplay();
        await myWorkPage.workFilterRestBtn.click();
    });

    Then('I validate work location filter batch and hint labels are displayed', async function(){
        expect(await myWorkPage.showHideFilterBadge.isPresent()).to.be.true;
        expect(await myWorkPage.showHideFilterHint.isPresent()).to.be.true;
    });

    Then('I validate work location filter batch and hint labels are not displayed', async function () {
        expect(await myWorkPage.showHideFilterBadge.isPresent()).to.be.false;
        expect(await myWorkPage.showHideFilterHint.isPresent()).to.be.false;
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

    Then('I see find person page displayed with caption {string}', async function(findPersonCaption){ 
        expect(await findPersonPage.amOnPage()).to.be.true;
        expect(await findPersonPage.getHeaderCaption()).to.contains(findPersonCaption);
    });

    When('I enter search term {string} in find person input text', async function(searchterm){
        await findPersonPage.inputSearchTerm(searchterm);
    });

    Then('I see following options available in find person results', async function(findPersonResultsDatatable){

        await findPersonPage.isSearchResultSelectionContainerDisplayed()

        const resultHashes = findPersonResultsDatatable.hashes();
        const softAssert = new SoftAssert();
        for (let i = 0; i < resultHashes.length;i++){
            softAssert.setScenario(`Is result "${resultHashes[i].value}" displayed`);
            await softAssert.assert(async () => expect(await findPersonPage.isPersonDisplayed(resultHashes[i].value)).to.be.true);     
        }
        softAssert.finally();

    });

    When('I select find person result {string}', async function(person){
        await findPersonPage.selectPerson(person);
    });
    
    Then('I see find person is selected with {string}', async function(person){
       expect(await findPersonPage.isPersonSelected(person),`${person} is not selected`).to.be.true;
    });

    When('I click continue in find person page', async function(){
        await findPersonPage.clickContinueButton();
    });

    When('I click cancel in find person page', async function () {
        await findPersonPage.clickCancelLink();
    });

    When('I click cancel in check your changes of work allocation', async function () {
        await findPersonPage.clickCancelLink();
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