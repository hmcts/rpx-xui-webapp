
var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../../nodeMock/app');
const workAllocationMockData = require('../../../mockData/workAllocation/mockData');
const workAllocationDataModel = require("../../../../dataModels/workAllocation");

const backendMockClient = require('../../../../backendMock/client/index')
const taskManagementMock = require('../../../../backendMock/services/task-management-api/index')

const BrowserWaits = require('../../../../e2e/support/customWaits');
const taskListPage = require('../../../../e2e/features/pageObjects/workAllocation/taskListPage');
const taskManagerPage = require('../../../../e2e/features/pageObjects/workAllocation/taskManagerPage');
const taskAssignmentPage = require('../../../../e2e/features/pageObjects/workAllocation/taskAssignmentPage');

const caseDetailsPage = require('../../pageObjects/caseDetailsPage');

const headerPage = require('../../../../e2e/features/pageObjects/headerPage');
const CaseListPage = require('../../../../e2e/features/pageObjects/CaseListPage');
const errorPage = require('../../../../e2e/features/pageObjects/errorPage');

const SoftAssert = require('../../../util/softAssert');
const browserUtil = require('../../../util/browserUtil');
const errorMessageForResponseCode = require('../../../util/errorResonseMessage');
const ArrayUtil = require("../../../../e2e/utils/ArrayUtil");

const MockUtil = require('../../../util/mockUtil');
const WAUtil = require('../../workAllocation/utils');
// const nodeAppMockData = require('../../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../../codeceptCommon/reportLogger');

const headerpage = require('../../../../e2e/features/pageObjects/headerPage');
const taskActionPage = require('../../../../e2e/features/pageObjects/workAllocation/taskActionPage');

const myWorkPage = require('../../../../e2e/features/pageObjects/workAllocation/myWorkPage');

const taskApiMock = require('../../../../backendMock/services/task-management-api/index')
const mockClient = require('../../../../backendMock/client/index');
const reportLogger = require('../../../../codeceptCommon/reportLogger');

const taskManagementApiMock = require('../../../../backendMock/services/task-management-api/index')

    const caseListPage = new CaseListPage();

    Given('I set MOCK locations for WA release 2', async function(locationsDatatable){
        const locationsHashes = locationsdatatable.parse().hashes();
        const locationsResponseBody = [];
        for (let i = 0; i < locationsHashes.length;i++){
            let location = workAllocationDataModel.getLocation();
            locationsResponseBody.push(location);
            let locationHashKeys = Object.keys(locationsHashes[i]);
            locationHashKeys.forEach(key => {
                location[key] = locationsHashes[i][key];
            })
            
        }
        MockApp.onGet("/workallocation2/location", (req,res) => {
            res.send(locationsResponseBody);
        })
    });

    Given('I set MOCK persons end point {string} for WA release 2', async function (endpoint, personsDatatable) {
        const personshashes = personsdatatable.parse().hashes();
        const personsResponseBody = [];
        for (let i = 0; i < personshashes.length; i++) {
            let person = workAllocationDataModel.getCaseWorkerOrperson();
            personsResponseBody.push(person);
            let personHashKeys = Object.keys(personshashes[i]);
            personHashKeys.forEach(key => {
                person[key] = personshashes[i][key];
            })

        }
        MockApp.onGet(endpoint, (req, res) => {
            res.send(personsResponseBody);
        })
    });

    Given('I set MOCK judicial users end point {string} for WA release 2', async function (endpoint, personsDatatable) {
        const personshashes = personsdatatable.parse().hashes();
        const personsResponseBody = [];
        for (let i = 0; i < personshashes.length; i++) {
            let person = workAllocationDataModel.getRefDataJudge();
            personsResponseBody.push(person);
            let personHashKeys = Object.keys(personshashes[i]);
            personHashKeys.forEach(key => {
                person[key] = personshashes[i][key];
            })

        }
        MockApp.onPost(endpoint, (req, res) => {
            const reqUser = req.body.userIds;
            if (reqUser.length === 0){
                res.send(personsResponseBody);
            }else{
                const requestedUser = [];
                for (const forUserId of reqUser){
                    for (const personInMock of personsResponseBody){
                        if (personInMock.sidam_id === forUserId){
                            requestedUser.push(personInMock);
                            break; 
                        }
                   } 
                }
                res.send(requestedUser);
            } 
        })
    });

    Given('I set MOCK tasks with permissions for view {string} and assigned state {string}', async function (inputView,assignedState ,taskPermissionsTable) {
        reportLogger.reportDatatable(taskPermissionsTable)
        const taskPermissionHashes = taskPermissionsTable.parse().hashes(); 
        const tasks = [];
        let view = inputView.split(" ").join("");
        view = view.toLowerCase();
        for (let i = 0; i < taskPermissionHashes.length; i++){
            let taskCount = 0;
            if (taskPermissionHashes[i].hasOwnProperty('Count')){
                taskCount = parseInt(taskPermissionHashes[i]['Count']);
            }else{
                taskCount = 1;
            }

            for (let j = 0; j < taskCount;j++){
                tasks.push(taskManagementMock.getTaskTemplate());
            }
            
        }

        const auth = await browser.driver.manage().getCookie('__auth__')
        switch (view){
            case 'mytasks':
                workAllocationMockData.myWorkMyTasks = { tasks: tasks.slice(0, 25), total_records: tasks.length };
                await mockClient.setUserApiData(auth.value, taskManagementApiMock.method.searchTasks, { status: 200, data: workAllocationMockData.myWorkMyTasks });
                break;
            case 'availabletasks':
                workAllocationMockData.myWorkAvailableTasks = { tasks: tasks.slice(0,25), total_records: tasks.length };
                await mockClient.setUserApiData(auth.value, taskManagementApiMock.method.searchTasks, { status: 200, data: workAllocationMockData.myWorkAvailableTasks });

                break;
            case 'allwork':
                workAllocationMockData.allWorkTasks = { tasks: tasks.slice(0, 25), total_records: tasks.length };
                await mockClient.setUserApiData(auth.value, taskManagementApiMock.method.searchTasks, { status: 200, data: workAllocationMockData.allWorkTasks });

                break;

            default:
                throw new Error(`Unrecognised input view from step def "${inputView}"`);
        }
        
    });

    Given('I set MOCK workallocation cases with permissions for view {string}', async function (viewInTest, casePermissionsTable) {
        reportLogger.reportDatatable(casePermissionsTable)
        workAllocationMockData.setCasesWithPermissionsForView(viewInTest, casePermissionsTable.parse().hashes()) 
    });



    Given('I set MOCK tasks with attributes for view {string}', async function (forView, attributesDatatable) {
        CucumberReporter.reportDatatable(attributesDatatable)
        const tasksHashes = attributesDatatable.parse().hashes();
        
        let view = forView.split(" ").join("");
        view = view.toLowerCase();
        let tasksResponse = null;
        switch (view) {
            case 'mytasks':
                tasksResponse = workAllocationMockData.myWorkMyTasks 
                break;
            case 'availabletasks':
                tasksResponse = workAllocationMockData.myWorkAvailableTasks 

                break;
            case 'allwork':
                tasksResponse = workAllocationMockData.allWorkTasks 

                break;

            default:
                throw new Error(`Unrecognised input view from step def "${view}"`);
        }

        for (let i = 0; i < tasksHashes.length ; i++ ){
            const taskHash = tasksHashes[i]
            let task = tasksResponse.tasks[i]


            let taskHashKeys = Object.keys(taskHash);
            for (const key of taskHashKeys ) {
                if (key.toLowerCase() === "index") {
                    //ignore index;
                } else if (key.toLowerCase() === "permissions") {
                    task.permissions.values = taskHash[key].split(",");
                    // task.actions = workAllocationDataModel.getRelease2TaskActions(task.permissions, view, taskHash.assignee ? "assigned": "unassigned")
                } else if (key.toLowerCase() === "assignee") {
                    if (taskHash[key] === "") {
                        delete task[key];
                    } else {
                        task[key] = taskHash[key];
                    }

                } else if (key.toLowerCase().includes("date")) {
                    task[key] = getDateValueForDays(taskHash[key]);
                } else {
                    task[key] = taskHash[key];
                }
            }
              
        }

        const auth = await browser.driver.manage().getCookie('__auth__')
        await backendMockClient.setUserApiData(auth.value, taskManagementApiMock.method.searchTasks, { status: 200, data: tasksResponse })
    });


    Then('I validate {string} tasks columns sorting with taskRequest url {string} on page {int} for user type {string}', async function (waPage,taskRequesturl,onPage ,userType,datatable) {
        const softAssert = new SoftAssert();
        const datatableHashes = datatable.parse().hashes();
        let pageUndertest = null;

        switch (waPage.toLowerCase()){
            case "my work":
                pageUndertest = myWorkPage;
                break;
            case "my work cases":
                pageUndertest = myWorkPage;
                pageUndertest.clickSubNavigationTab("My cases"); 
                break; 
        }

        let sortColumnInRequestParam = null;
        MockApp.addIntercept(taskRequesturl, (req, res, next) => {
            CucumberReporter.AddJson(req.body);
            sortColumnInRequestParam = req.body;  
            next(); 
        })
        await MockApp.stopServer();
        await MockApp.startServer();

        for (let i = 0; i < datatableHashes.length; i++) {
            
            sortColumnInRequestParam = null;
            const headerName = datatableHashes[i]['ColumnHeader'];
            const sortColumnId = datatableHashes[i]['FieldId'];
            const forUserType = datatableHashes[i][userType];

            if (!forUserType.toLowerCase().includes('true') || !forUserType.toLowerCase().includes('yes')){
                continue;
            }

            const headerElement = await pageUndertest.getHeaderElementWithName(headerName);
            // const headerColId = await headerElement.getAttribute("id");
           
            softAssert.setScenario("sorting: " + headerName);
            await softAssert.assert(async () => expect(await pageUndertest.getColumnSortState(headerName)).to.equal("none"));
           
            await browserUtil.addTextToElementWithCssSelector('tbody tr:nth-of-type(1) .cdk-column-case_category exui-work-field','Sort test',true);
            await pageUndertest.clickColumnHeader(headerName); 
            await BrowserWaits.waitForConditionAsync(async () => { 
                return sortColumnInRequestParam !== null
                 });
            await BrowserWaits.waitForConditionAsync(async () => {
                const caseCatColVal = await pageUndertest.getColumnValueForTaskAt('Case category',1);
                return !caseCatColVal.includes('Sort test');
             });


            const asc_sortingParamsInReq = sortColumnInRequestParam.searchRequest.sorting_parameters;
            await softAssert.assert(async () => expect(asc_sortingParamsInReq.length > 0).to.be.true, 'Sorting param present in request');
            await softAssert.assert(async () => expect(sortColumnInRequestParam.searchRequest.pagination_parameters.page_number).to.equal(onPage), 'Sorting req on page');
            await softAssert.assert(async () => expect(asc_sortingParamsInReq[0].sort_by).to.equal(sortColumnId), 'Sorting param name in request ' + sortColumnId);
            await softAssert.assert(async () => expect(asc_sortingParamsInReq[0].sort_order).to.equal('asc'), 'Sorting param value in request asc');
            await softAssert.assert(async () => expect(await pageUndertest.getColumnSortState(headerName)).to.equal("ascending"), 'Sort column state ascending');

            
            sortColumnInRequestParam = null;
            await browserUtil.addTextToElementWithCssSelector('tbody tr:nth-of-type(1) .cdk-column-case_category exui-work-field', 'Sort test', true);
            await pageUndertest.clickColumnHeader(headerName);
           
            await BrowserWaits.waitForConditionAsync(async () => {
                return sortColumnInRequestParam !== null
            });
            await BrowserWaits.waitForConditionAsync(async () => {
                const caseCatColVal = await pageUndertest.getColumnValueForTaskAt('Case category', 1);
                return !caseCatColVal.includes('Sort test');
            });

            //  expect(headerColId).to.contains(sortColumnInRequestParam);
            const descSortingParamsInReq = sortColumnInRequestParam.searchRequest.sorting_parameters;
            await softAssert.assert(async () => expect(descSortingParamsInReq.length > 0).to.be.true, 'Sorting param present in request');
            await softAssert.assert(async () => expect(sortColumnInRequestParam.searchRequest.pagination_parameters.page_number).to.equal(onPage), 'Sorting req on page');
            await softAssert.assert(async () => expect(descSortingParamsInReq[0].sort_by).to.equal(sortColumnId), 'Sorting param name in request ' + sortColumnId);
            await softAssert.assert(async () => expect(descSortingParamsInReq[0].sort_order).to.equal('desc'), 'Sorting param value in request desc');
            await softAssert.assert(async () => expect(await pageUndertest.getColumnSortState(headerName)).to.equal("descending"), 'Sort column state descending');


        }
        softAssert.finally();

    });


    Given('I set MOCK task details for WA release2', async function(taskDetailsDatatable){
        CucumberReporter.reportDatatable(taskDetailsDatatable)
        const inputTaskDetails = taskDetailsDatatable.parse().hashes();

        const taskDetails = taskApiMock.getTask();
        const taskKeys = Object.keys(inputTaskDetails[0]);

        await ArrayUtil.forEach(taskKeys,async(key) => {
            if(key.toLowerCase().includes("date")){
                taskDetails.task[key] = getDateValueForDays(inputTaskDetails[key]);
            }else{
                taskDetails.task[key] = inputTaskDetails[key];
            } 
        })
        const auth = await browser.driver.manage().getCookie('__auth__')
        mockClient.setUserApiData(auth.value, 'OnTaskDetails', { status: 200, data: taskDetails });

    });

    Then('I validate work filter get location request body {string}, booking locations', async function (requestBodyref, datatable) {
        const body = global.scenarioData[requestBodyref];
        CucumberReporter.AddJson(body)

        const bookingLocationsActual = body.bookingLocations;

        const datatabalehashes = datatable.parse().hashes();
        let bookingLocationsExpected = [];
        for (const hash of datatabalehashes){
            const locations = hash.locations.split(",")
            bookingLocationsExpected.push(...locations)
        }
        bookingLocationsExpected = bookingLocationsExpected.filter(loc => loc !== "")
        expect(bookingLocationsActual.length).to.equal(bookingLocationsExpected.length) 
        for (const loc of bookingLocationsExpected) {
            expect(bookingLocationsActual, `booking location is not present in request body`).to.includes(loc);
        }

    });

    Then('I validate work filter get location request body {string}, user locations for service', async function(requestBodyref, datatable){
        const body = global.scenarioData[requestBodyref];
        CucumberReporter.AddJson(body)
        const userLocationsActual = body.userLocations;
        
        const userLocationsExpected = datatable.parse().hashes();
        
        for (const expectedLocationsForService of userLocationsExpected){
            const actualServiceLocations = userLocationsActual.find(actulaLocationsForService => actulaLocationsForService.service === expectedLocationsForService.service) 
            
            if (expectedLocationsForService.locations === ""){
                expect( actualServiceLocations === undefined, `Locations for service object ${expectedLocationsForService.service}   sent`).to.be.true
            }else{
                expect(actualServiceLocations !== undefined, `Locations for service ${expectedLocationsForService.service}  not sent`).to.be.true
                
                const expectedLocations = expectedLocationsForService.locations.split(",");
                expect(actualServiceLocations.locations.length).to.equal(expectedLocations.length)
                const actualLocationIds = actualServiceLocations.locations.map(location => location.locationId) 

                for (const loc of expectedLocations) {
                    expect(actualLocationIds, `user ${expectedLocationsForService.service} service location is not present in request body`).to.includes(loc);
                }
            }
            
            
        }

    });

    function getDateValueForDays(days){
        const daysNum = parseInt(days);
        let date = new Date();
        date.setDate(date.getDate()+daysNum);
        return date.toISOString().replace("Z","+0100")
        
        
    }
