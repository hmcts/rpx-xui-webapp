var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../../nodeMock/app');
const nodeAppMock = require('../../../../nodeMock/nodeApp/mockData');
const waMockData = require('../../../mockData/workAllocation/mockData');
;
const headerPage = require('../../../../e2e/features/pageObjects/headerPage');
const SoftAssert = require('../../../util/softAssert');
const CucumberReporter = require('../../../../e2e/support/reportLogger');
const taskListPage = require('../../../../e2e/features/pageObjects/workAllocation/taskListPage');
const TaskListTable = require('../../../../e2e/features/pageObjects/workAllocation/taskListTable');
const BrowserUtil = require('../../../util/browserUtil');
const BrowserWaits = require('../../../../e2e/support/customWaits');

const workallocationMockData = require('../../../mockData/workAllocation/mockData');

const userRolesConfig = require('../../../../e2e/config/userRolesConfig');

const userUtil = require('../../../util/userRole');

defineSupportCode(function ({ And, But, Given, Then, When }) {
  const taskListTable = new TaskListTable();

  const testData = require('../../../../e2e/config/appTestConfig');
  Given('I set MOCK with {string} release user and roles', async function (releaseUer, datatableroles) {
    const testUserIdamId = testData.users[testData.testEnv].filter((testUser) => testUser.release === releaseUer)[0];
    if (!testUserIdamId) {
      throw new Error('Provided release user is not configured in test data. ' + releaseUer);
    }

    const userIdamID = testUserIdamId.idamId;
    await CucumberReporter.AddMessage(`${releaseUer} id ${testUserIdamId.idamId}`);

    const datatablehashes = datatableroles.hashes();
    const roles = datatablehashes.map((roleHash) => roleHash.ROLE);
    const userDetails = nodeAppMock.setUserDetailsWithRolesAndIdamId(roles, userIdamID);
    if (userUtil.getUserRoleType(roles) === 'LEGAL_OPS') {
      workallocationMockData.addCaseworkerWithIdamId(userIdamID, 'IA');
    }
  });

  Given('I set MOCK with {string} release user and roles {string}', async function (releaseUer, roles) {
    const testUserIdamId = testData.users[testData.testEnv].filter((testUser) => testUser.release === releaseUer)[0];
    if (!testUserIdamId) {
      throw new Error('Provided release user is not configured in test data. ' + releaseUer);
    }

    const userIdamID = testUserIdamId.idamId;
    await CucumberReporter.AddMessage(`${releaseUer} id ${testUserIdamId.idamId}`);

    roles = roles.split(',');
    if (userUtil.getUserRoleType(roles) === 'LEGAL_OPS') {
      workallocationMockData.addCaseworkerWithIdamId(userIdamID, 'IA');
    }
    const userDetails = nodeAppMock.setUserDetailsWithRolesAndIdamId(roles, userIdamID);
  });

  Given('I set MOCK locations for release {string}', async function(release, locationsDatatbale){
    const locations = locationsDatatbale.hashes();
    let apiUrl = '/';
    if (release === 'wa_release_1') {
      apiUrl = apiUrl + 'workallocation';
    } else if (release === 'wa_release_2') {
      apiUrl = apiUrl + 'workallocation2';
    }

    MockApp.onGet(apiUrl+'/location', (req, res) => {
      res.send(locations);
    });
  });

  Given('I set MOCK location for person of type {string} in release {string}', async function (userType, release, locationDetailsDataTable) {
    const testUser = testData.users[testData.testEnv].filter((testUser) => testUser.release === release)[0];
    if (!testUser) {
      throw new Error('Provided release user is not configured in test data. ' + release);
    }

    let apiUrl = '/';
    if (release === 'wa_release_1'){
      apiUrl = apiUrl+'workallocation';
    } else if (release === 'wa_release_2') {
      apiUrl = apiUrl + 'workallocation2';
    }

    if (userType === 'caseworker'){
      apiUrl = apiUrl + '/caseworker';
    }else if (userType === 'judge') {
      apiUrl = apiUrl + '/judge';
    }
    const persons = waMockData.getPersonList(80);
    const locationInputDetails = locationDetailsDataTable.hashes()[0];

    persons[0].idamId = testUser.idamId;
    persons[0].location.id = locationInputDetails.id;
    persons[0].location.locationName = locationInputDetails.locationName;
    MockApp.onGet(apiUrl, (req, res) => {
      res.send(persons);
    });
  });

  Given('I set MOCK with user {string} and roles {string} with reference {string}', async function (useridentifier, roles, mockUserRef) {
    nodeAppMock.userDetails = nodeAppMock.getMockLoginUserWithidentifierAndRoles(useridentifier, roles);
    CucumberReporter.AddJson(nodeAppMock.userDetails);
    global.scenarioData[mockUserRef] = nodeAppMock.userDetails;
  });

  Given('I add roleAssignmentInfo to MOCK user with reference {string}', async function(userDetailsRef, roleAssignments){
    const boolAttributes = ['isCaseAllocator', 'bookable'];
    const userDetails = global.scenarioData[userDetailsRef];
    const roleAssignmentArr = [];
    for (let roleAssignment of roleAssignments.hashes()){
      const roleKeys = Object.keys(roleAssignment);

      boolAttributes.forEach((attr) => {
        if (roleKeys.includes(attr)){
          roleAssignment[attr] = roleAssignment[attr] === 'true';
        }
      });

      roleAssignmentArr.push(roleAssignment);
    }
    userDetails.roleAssignmentInfo.push(...roleAssignmentArr);
  });

  Given('I set Mock user with ref {string}, reset role assignments', async function (userDetailsRef){
    const userDetails = global.scenarioData[userDetailsRef];
    userDetails.roleAssignmentInfo =[];
  });

  function addRoleAssignmentsWithOrgRolesForServices(userDetailsRef, services, roleAttributesDataTable){
    const userDetails = global.scenarioData[userDetailsRef];
    const roleAssignmentArr = [];
    const roleAttributes = roleAttributesDataTable.rowsHash();

    for (const service of services.split(',')) {
      const role = {
        'substantive': 'N',
        'primaryLocation': '455174',
        'jurisdiction': service,
        'isCaseAllocator': false,
        'roleType': 'ORGANISATION'
      };

      for (const attr of Object.keys(roleAttributes)) {
        if (roleAttributes[attr] === '') {
          delete role[attr];
        } else {
          role[attr] = roleAttributes[attr];
        }
      }
      roleAssignmentArr.push(role);
    }
    userDetails.roleAssignmentInfo.push(...roleAssignmentArr);
  }

  Given('I set Mock user with ref {string}, ORGANISATION roles for services {string}', async function (userDetailsRef, services, roleAttributesDataTable){
    if (services === ''){
      return;
    }
    addRoleAssignmentsWithOrgRolesForServices(userDetailsRef, services, roleAttributesDataTable);
  });

  Given('I set Mock user with ref {string}, ORGANISATION roles for services {string} allow empty service', async function (userDetailsRef, services, roleAttributesDataTable) {
    addRoleAssignmentsWithOrgRolesForServices(userDetailsRef, services, roleAttributesDataTable);
  });

  Given('I set MOCK user with reference {string} roleAssignmentInfo', async function (userDetailsRef, roleAssignments) {
    const boolAttributes = ['isCaseAllocator'];
    const userDetails = global.scenarioData[userDetailsRef];
    const roleAssignmentArr = [];
    for (let roleAssignment of roleAssignments.hashes()) {
      const roleKeys = Object.keys(roleAssignment);

      boolAttributes.forEach((attr) => {
        if (roleKeys.includes(attr)) {
          roleAssignment[attr] = roleAssignment[attr] === 'true';
        }
      });
      if (roleKeys.includes('bookable')){
        const valueTypeAndValue = roleAssignment['bookable'].split(',');
        if (valueTypeAndValue.length > 0 && valueTypeAndValue[1] && valueTypeAndValue[1].includes('string')){
          roleAssignment['bookable'] = valueTypeAndValue[0];
        }else{
          roleAssignment['bookable'] = roleAssignment['bookable'] === 'true';
        }
      }
      if (roleKeys.includes('roleType')){
        roleAssignment.isCaseAllocator = roleAssignment.roleType === 'ORGANISATION';
      }
      roleAssignment.substantive = 'Y';
      roleAssignmentArr.push(roleAssignment);
    }
    userDetails.roleAssignmentInfo = roleAssignmentArr;
  });

  Given('I set MOCK with user identifer {string} role type {string} and role identifiers {string}', async function (useridentifier, roleType, roleIdentifiers) {
    const roles = [];
    const testUserIdamId = testData.users[testData.testEnv].filter((testUser) => testUser.userIdentifier === useridentifier)[0];
    if (!testUserIdamId) {
      throw new Error('Provided user identifer is not configured in test data. ' + useridentifier);
    }

    const userIdamID = testUserIdamId.idamId;

    const rolesIdentifiersArr = roleIdentifiers.split(',');
    const roleidentifersForRoleType = userRolesConfig[roleType.toLowerCase()];
    if (!roleidentifersForRoleType){
      throw new Error(`Role type not recognized ${roleType}`);
    }

    for (const roleIdentifier of rolesIdentifiersArr){
      const rolesForIdentifier = roleidentifersForRoleType[roleIdentifier];
      if (!rolesForIdentifier) {
        throw new Error(`Role identifer not recognized ${roleType} ${roleIdentifier}`);
      }
      roles.push(...rolesForIdentifier);
    }
    const userDetails = nodeAppMock.setUserDetailsWithRolesAndIdamId(roles, userIdamID);
    if (userUtil.getUserRoleType(roles) === 'LEGAL_OPS') {
      workallocationMockData.addCaseworkerWithIdamId(userIdamID, 'IA');
    }
  });

  Then('I validate primary navigation tabs for user {string} in release {string}', async function(userType, release){
    await BrowserUtil.stepWithRetry(async () => {
      const softAssert = new SoftAssert(this);
      const tabsExpected = testData.appFeatures.primaryTabs[userType][release];
      const tabsActual = await headerPage.getPrimaryTabsDisplayed();
      for (let i = 0; i < tabsExpected.length; i++) {
        let tabExpected = tabsExpected[i];
        softAssert.setScenario('Is tab displayed ' + tabExpected);
        await softAssert.assert(async () => expect(tabsActual.includes(tabExpected), `${tabExpected} is not displayed for ${userType} in release ${release} : Actual ${tabsActual}`).to.be.true);
      }

      await softAssert.assert(async () => expect(tabsActual.length, `Expected and actuals tabs dsplayed does not match:\n expected${tabsExpected}\n actual ${tabsActual} `).to.equal(tabsExpected.length));
      softAssert.finally();
    });
  });

  Then('I validate primary navigation main items for user {string} in release {string}', async function (userType, release) {
    await BrowserUtil.stepWithRetry(async () => {
      const softAssert = new SoftAssert(this);
      const tabsExpected = testData.appFeatures.primaryTabsMainItems[userType][release];
      const tabsActual = await headerPage.getPrimaryTabsDisplayed();
      for (let i = 0; i < tabsExpected.length; i++) {
        let tabExpected = tabsExpected[i];
        softAssert.setScenario('Is tab displayed ' + tabExpected);
        await softAssert.assert(async () => expect(tabsActual.includes(tabExpected), `${tabExpected} is not displayed for ${userType} in release ${release} : Actual ${tabsActual}`).to.be.true);
      }

      await softAssert.assert(async () => expect(tabsActual.length, `Expected and actuals tabs dsplayed does not match:\n expected${tabsExpected}\n actual ${tabsActual} `).to.equal(tabsExpected.length));
      softAssert.finally();
    });
  });

  Then('I validate primary navigation right side items for user {string} in release {string}', async function (userType, release) {
    await BrowserUtil.stepWithRetry(async () => {
      const softAssert = new SoftAssert(this);
      const tabsExpected = testData.appFeatures.primaryTabsRightSideItems[userType][release];
      const tabsActual = await headerPage.getPrimaryTabsDisplayed();
      for (let i = 0; i < tabsExpected.length; i++) {
        let tabExpected = tabsExpected[i];
        softAssert.setScenario('Is tab displayed ' + tabExpected);
        await softAssert.assert(async () => expect(tabsActual.includes(tabExpected), `${tabExpected} is not displayed for ${userType} in release ${release} : Actual ${tabsActual}`).to.be.true);
      }

      await softAssert.assert(async () => expect(tabsActual.length, `Expected and actuals tabs dsplayed does not match:\n expected${tabsExpected}\n actual ${tabsActual} `).to.equal(tabsExpected.length));
      softAssert.finally();
    });
  });

  Then('I validate task list column displayed for user {string} in release {string}', async function(user, release){
    await BrowserWaits.waitForSeconds(20);
    await BrowserUtil.stepWithRetry(async () => {
      const softAssert = new SoftAssert(this);
      const taskListColumnsExpected = testData.appFeatures.taskListColumns.myTasks[release];
      const taskListColumnsActual = await taskListTable.getColumnHeaderNames();

      for (let i = 0; i < taskListColumnsExpected.length; i++) {
        let columnExpected = taskListColumnsExpected[i];
        softAssert.setScenario('Is column displayed ' + columnExpected);
        await softAssert.assert(async () => expect(taskListColumnsActual.includes(columnExpected), `${columnExpected} is not displayed for ${user} in release ${release} : Actual ${taskListColumnsActual}`).to.be.true);
      }
      softAssert.setScenario('Columns displayed ');
      await softAssert.assert(async () => expect(taskListColumnsActual.length, `for ${user} in release ${release} \n Expected and actuals column dsplayed does not match:\n expected${taskListColumnsExpected}\n actual ${taskListColumnsActual} `).to.equal(taskListColumnsExpected.length));

      softAssert.finally();
      await CucumberReporter.AddScreenshot();
    });
  });

  Then('I validate available task list column displayed for user {string} in release {string}', async function (userType, release) {
    await BrowserUtil.stepWithRetry(async () => {
      const softAssert = new SoftAssert(this);
      const taskListColumnsExpected = testData.appFeatures.taskListColumns.availableTasks[release];
      const taskListColumnsActual = await taskListTable.getColumnHeaderNames();

      for (let i = 0; i < taskListColumnsExpected.length; i++) {
        let columnExpected = taskListColumnsExpected[i];
        softAssert.setScenario('Is column displayed ' + columnExpected);
        await softAssert.assert(async () => expect(taskListColumnsActual.includes(columnExpected), `${columnExpected} is not displayed for ${userType} in release ${release} : Actual ${taskListColumnsActual}`).to.be.true);
      }

      await softAssert.assert(async () => expect(taskListColumnsActual.length, `Expected and actuals column dsplayed does not match:\n expected${taskListColumnsExpected}\n actual ${taskListColumnsActual} `).to.equal(taskListColumnsExpected.length));
      softAssert.finally();
    });
  });

  Then('I validate task request body in reference {string} has locations set', async function(reference, locationsDatatable){
    const reqBody = global.scenarioData[reference];
    return 'Pending';
  });

  Given('I clear all MOCK location', function(){
    workallocationMockData.locationsByServices = [];
  });

  Given('I set MOCK locations with names in service {string}', async function(service, locationNamesDatatable){
    const locationNamesHashes = locationNamesDatatable.hashes();
    const locationNames = [];
    for (const locationNameHash of locationNamesHashes){
      locationNames.push({ locationName: locationNameHash.locationName, id: locationNameHash.id });
    }

    const locationsArray = workallocationMockData.getLocationsWithNames(locationNames);

    let locationForThisService = { service: service, locations: [] };
    locationForThisService.locations.push(...locationsArray);
    workallocationMockData.locationsByServices.push(locationForThisService);
  });

  Given('I set MOCK person with user {string} and roles {string}', async function(userIdentifier, roles, datatable){
    const rolesArr = roles.split(',');
    const testUserIdamId = testData.users[testData.testEnv].filter((testUser) => testUser.userIdentifier === userIdentifier)[0];

    const datatablehashes = datatable.hashes();
    const locationId = datatablehashes[0].locationId;
    const locationName = datatablehashes[0].locationName;

    const roleCategory = userUtil.getUserRoleType(rolesArr);
    let person = null;
    if (roleCategory === 'LEGAL_OPS'){
      person = workallocationMockData.addCaseworkerWithIdamId(testUserIdamId.idamId, 'IA');
      person.location.id = locationId;
      person.location.locationName = locationName;
    } else if (roleCategory === 'JUDICIAL'){
      person = workallocationMockData.addJudgeUsers(testUserIdamId.idamId, 'testMockUserFN', 'test', 'testjudge@hmcts.net');
      person.appointments[0].location_id = locationId;
      person.appointments[0].base_location_id = locationId;
      person.appointments[0].court_name = locationName;
    }
    CucumberReporter.AddMessage(`For roles "${roles}" Person of type "${roleCategory} is added"`);
    CucumberReporter.AddJson(person);
  });
});

