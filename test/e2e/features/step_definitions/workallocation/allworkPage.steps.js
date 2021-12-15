var { defineSupportCode } = require('cucumber');
const reportLogger = require('../../../support/reportLogger');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');

const allWorkPage = require('../../pageObjects/workAllocation/allWorkPage');

const ArrayUtil = require('../../../utils/ArrayUtil');


defineSupportCode(function ({ And, But, Given, Then, When }) {
    Then('I see filter {string} is displayed in all work page', async function(filterItem){
        expect(await allWorkPage.isFilterItemDisplayed(filterItem) ).to.be.true
   });

    Then('I see filter {string} is not displayed in all work page', async function (filterItem) {
        expect(await allWorkPage.isFilterItemDisplayed(filterItem)).to.be.false
    });

    Then('I see filter {string} is enabled in all work page', async function (filterItem) {
        expect(await allWorkPage.isFilterItemEnbled(filterItem)).to.be.true
    });

    Then('I see filter {string} is disabled in all work page', async function (filterItem) {
        expect(await allWorkPage.isFilterItemEnbled(filterItem)).to.be.false
    });

    Then('I validate filter item {string} select or radio options present in all work page', async function (filterItem, datatable){
        const actualOption = await allWorkPage.getFilterSelectOrRadioOptions(filterItem);

        const hashes = datatable.hashes();
        for (const hash of hashes){
            expect(actualOption).to.includes(hash.option) 
        }

    });

    When('I select filter item {string} select or radio option {string} in all work page', async function (filterItem, option) {
        await allWorkPage.setFilterSelectOrRadioOptions(filterItem, option);

    });

    When('I input filter item {string} input text {string} in all work page', async function (filterItem, inputText) {
        await allWorkPage.inputFilterItem(filterItem, inputText);

    });

    When('I click Apply filter button in all work page', async function(){
        await allWorkPage.filterApplyBtn.click();
   });

    Then('I validate Apply filter button in enabled in all work page', async function () {
        expect(await allWorkPage.filterApplyBtn.isEnabled()).to.be.true;
    });

    Then('I validate Apply filter button in disabled in all work page', async function () {
        expect(await allWorkPage.filterApplyBtn.isEnabled()).to.be.false;
    });

    When('I click Reset filter button in all work page', async function () {
        await allWorkPage.filterResetBtn.click();
    });
});

