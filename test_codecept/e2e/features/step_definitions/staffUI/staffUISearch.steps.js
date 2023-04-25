
const reportLogger = require('../../../../codeceptCommon/reportLogger');

const BrowserWaits = require("../../../support/customWaits");
const staffSearchPage = require("../../pageObjects/staffUI/staffUISearchPage");
const staffUserDetailsPage = require('../../pageObjects/staffUI/staffUIUserDetailsPage')
const addNewUserPage = require('../../pageObjects/staffUI/adduserPage')
const addUserCheckYourAnswersPage = require('../../pageObjects/staffUI/addUserCheckYourAnswersPage')

const testDataManager = require('../../../utils/testDataManager/index')

When('I click Advanced search link in Staff UI', async function (tabLabel, boolString) {
    await staffSearchPage.clickAdvancedSearchLink();
});


Then('I click Hide advanced search link in Staff UI', async function (tabLabel, boolString) {
    await staffSearchPage.clickHideAdvancedSearchLink();
});


Then('I see basic search displayed in staff UI', async function (tabLabel, boolString) {
    await staffSearchPage.pageContainer.wait();
    await staffSearchPage.validateBasicSearchPage();
});




Then('I validate basic search in Staff UI', async function (tabLabel, boolString) {
    await staffSearchPage.performBasicSearch('xui');
});




Then('I validate advanced search in Staff UI', async function (tabLabel, boolString) {
    const inputs = {
        "Services":['Damages'],
        "Locations":['Bir'],
        "User type":'Legal',
        "Job title": 'Legal',
        "Skill":'',
        "Roles":['Case Allocator']
    }
    await staffSearchPage.performAdvancedSearch(inputs);
});


Then('I validate staff UI search results displayed', async function (tabLabel, boolString) {
    expect(await staffSearchPage.isStaffUserListContainerDisplayed()).to.be.true;
    await staffSearchPage.validateListValuesNotEmpty();
});


Then('I validate staff user details display', async function(){
    const username = await staffSearchPage.staffUsersList.clickUserNameAtRow(0);
    reportLogger.AddMessage(`Selected user ${username}`)

   expect (await staffUserDetailsPage.isDisplayed()).to.be.true;
    const userDetails = await staffUserDetailsPage.getUserDetails();
    expect(userDetails['Name']).to.equal(username);

    const rows = Object.keys(userDetails);
    [
        'Email address',
        'Region',
        'Service',
        'Primary location',
        // 'Additional locations',
        'User type',
        'Role',
        'Job title',
        'Skills',
        'Status'
    ].forEach(row => {
        expect(rows, `missing ${row}`, `${row} is missing ${JSON.stringify(rows)}`).to.includes(row)
    })
    
    expect(userDetails['Email address'] !== '', `missing value for 'Email address'`).to.be.true;
    expect(userDetails['User type'] !== '', `missing value for 'User type'`).to.be.true;
    expect(userDetails['Status'] !== '', `missing value for 'Status'`).to.be.true;
    // expect(userDetails['Job title'] !== '', `missing value for 'Job title'`).to.be.true;



});



When('I add new staff user details', async function (datatable) {
    reportLogger.reportDatatable(datatable)
    const inputdata = datatable.parse().rowsHash();
    await staffSearchPage.clickAddNewUser();
    expect(await addNewUserPage.getPageTitle()).to.includes('Add user')
    // const newIdamUser = await testDataManager.createAndGetIdamUser();
    // reportLogger.AddMessage(`TEST_DATA: idam user created ${newIdamUser.email}`)
    const details = {
    }

    const datatableInputKeys = Object.keys(inputdata)
    for (const inputKey of datatableInputKeys){
        switch (inputKey){
            case 'Email':
                details[inputKey] = inputdata[inputKey] + `${Date.now()}@justice.gov.uk`;
                break;
            case 'Services':
            case 'Roles':
            case 'Job title':
                details[inputKey] = inputdata[inputKey].split(',');
                break;
            default:
                details[inputKey] = inputdata[inputKey]
        }
    }

    await addNewUserPage.enterDetails(details);
    await addNewUserPage.clickContinue();

    await addUserCheckYourAnswersPage.container.wait();
    expect(await addUserCheckYourAnswersPage.isDisplayed()).to.be.true;

    const checkAnswers = await addUserCheckYourAnswersPage.getUserDetails();

    expect(checkAnswers['Name']).to.includes(`${details['First name']} ${details['Last name']}`)
    expect(checkAnswers['Email address']).to.includes(`${details['Email']}`)
    for (const service of details['Services']){
        expect(checkAnswers['Service']).to.includes(service)

    }

    await addUserCheckYourAnswersPage.submitButton.click();

    await staffSearchPage.basicSearch.wait();
    expect(await staffSearchPage.amOnPage()).to.be.true

    await BrowserWaits.retryWithActionCallback(async () => {
        await staffSearchPage.validateSuccessMessageBanner('You have added a new user')
    });
    

})


Then('I validate add new staff user work flow controls', async function(){
  
    const details = {
        'First name': 'tes',
        'Last name': 'last name',
        'Email': 'test@justice.gov.uk',
        'Region': 'Region 1',
        'Services': ['Damages'],
        'Primary location': 'Bir',
        'User type': 'Legal office',
        'Roles': ['Case Allocator'],
        'Job title': ['Legal Caseworker']
    }

    reportLogger.AddMessage("*********** validation: Cancel on new user page")
    await staffSearchPage.clickAddNewUser();
    await addNewUserPage.clickCancel();
    await staffSearchPage.pageContainer.wait();
    await staffSearchPage.validateBasicSearchPage();

    reportLogger.AddMessage("*********** validation: Cancel from check your answers")
    await staffSearchPage.clickAddNewUser();
    await addNewUserPage.enterDetails(details);
    await addNewUserPage.clickContinue();
    await addUserCheckYourAnswersPage.container.wait();
    expect(await addUserCheckYourAnswersPage.isDisplayed()).to.be.true;
    await addUserCheckYourAnswersPage.cancelButton.click();
    await staffSearchPage.pageContainer.wait();
    await staffSearchPage.validateBasicSearchPage();


    reportLogger.AddMessage("*********** validation: back link from check your answers")
    await staffSearchPage.clickAddNewUser();
    await addNewUserPage.enterDetails(details);
    await addNewUserPage.clickContinue();
    await addUserCheckYourAnswersPage.container.wait();
    expect(await addUserCheckYourAnswersPage.isDisplayed()).to.be.true;
    await addUserCheckYourAnswersPage.backLink.click();
    await addNewUserPage.container.wait();
    expect(await addNewUserPage.isDisplayed()).to.be.true


    await addNewUserPage.clickContinue();
    await addUserCheckYourAnswersPage.container.wait();
    expect(await addUserCheckYourAnswersPage.isDisplayed()).to.be.true;
    
    const checkYourAnswersFields = ['Name', 'Email address'];
    for (const field of checkYourAnswersFields){
        reportLogger.AddMessage(`*********** validation: change link for field ${field} from check your answers`)

        await addUserCheckYourAnswersPage.clickChangeLinkFor(field)
        await addNewUserPage.container.wait();
        expect(await addNewUserPage.isDisplayed()).to.be.true
        await addNewUserPage.clickContinue();

    }

    Then('I validate user profile update in staff UI', async function(){
        await staffSearchPage.performBasicSearch('xui');
        const username = await staffSearchPage.staffUsersList.clickUserNameAtRow(0);
        await staffUserDetailsPage.container.wait();
        const userDetails = await staffUserDetailsPage.getUserDetails();

        await staffUserDetailsPage.updateButton.click();
        await addNewUserPage.container.wait();
        expect(await addNewUserPage.isDisplayed()).to.be.true
        expect(await addNewUserPage.getPageTitle()).to.includes('Edit user')

        await addNewUserPage.enterDetails({ 'Last name' : 'xui auto updated'});

        await addNewUserPage.clickSaveChanges();

        await addUserCheckYourAnswersPage.container.wait();
        expect(await addUserCheckYourAnswersPage.isDisplayed()).to.be.true;
        const checkAnswers = await addUserCheckYourAnswersPage.getUserDetails();
        expect(checkAnswers['Name']).to.includes(`xui auto updated`)
        await addUserCheckYourAnswersPage.submitButton.click();

        await staffSearchPage.pageContainer.wait();
        expect(await staffSearchPage.amOnPage()).to.be.true
        expect(await staffSearchPage.validateSuccessMessageBanner('User updated')).to.be.true

    })
   
    Then('I validate user profile copy in staff UI', async function () {
        await staffSearchPage.performBasicSearch('xui');
        const username = await staffSearchPage.staffUsersList.clickUserNameAtRow(0);
        await staffUserDetailsPage.container.wait();
        const userDetails = await staffUserDetailsPage.getUserDetails();

        await staffUserDetailsPage.copyButton.click();
        await addNewUserPage.container.wait();
        expect(await addNewUserPage.isDisplayed()).to.be.true
        expect(await addNewUserPage.getPageTitle()).to.includes('Add a new user')


        const newIdamUser = await testDataManager.createAndGetIdamUser();
        await addNewUserPage.enterDetails({
            'First name':'xui auto test copy', 
            'Last name': 'xui auto copied',
            'Email': newIdamUser.email
        });

        await addNewUserPage.clickContinue();

        await addUserCheckYourAnswersPage.container.wait();
        expect(await addUserCheckYourAnswersPage.isDisplayed()).to.be.true;
        const checkAnswers = await addUserCheckYourAnswersPage.getUserDetails();
        expect(checkAnswers['Name']).to.includes(`xui auto test copy`)
        expect(checkAnswers['Name']).to.includes(`'xui auto copied`)
        expect(checkAnswers['Email']).to.includes(newIdamUser.email)

        await addUserCheckYourAnswersPage.submitButton.click();

        await staffSearchPage.pageContainer.wait();
        expect(await staffSearchPage.amOnPage()).to.be.true
        expect(await staffSearchPage.validateSuccessMessageBanner('User updated')).to.be.true
    })


})


