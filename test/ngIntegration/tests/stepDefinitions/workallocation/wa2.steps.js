
var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../../nodeMock/app');
const workAllocationMockData = require('../../../../nodeMock/workAllocation/mockData');
const workAllocationDataModel = require("../../../../dataModels/workAllocation");

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
const nodeAppMockData = require('../../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../../e2e/support/reportLogger');

const headerpage = require('../../../../e2e/features/pageObjects/headerPage');
const taskActionPage = require('../../../../e2e/features/pageObjects/workAllocation/taskActionPage');

const myWorkPage = require('../../../../e2e/features/pageObjects/workAllocation/myWorkPage');

defineSupportCode(function ({ And, But, Given, Then, When }) {

    const caseListPage = new CaseListPage();

    Given('I set MOCK locations for WA release 2', async function(locationsDatatable){
        const locationsHashes = locationsDatatable.hashes();
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
        const personshashes = personsDatatable.hashes();
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


    Given('I set MOCK tasks with permissions for view {string} and assigned state {string}', async function (view,assignedState ,taskPermissionsTable) {
        const taskPermissionHashes = taskPermissionsTable.hashes(); 
        const tasks = [];
        view = view.split(" ").join("");
        view = view.toLowerCase();
        for (let i = 0; i < taskPermissionHashes.length; i++){
            let taskCount = 0;
            if (taskPermissionHashes[i].hasOwnProperty('Count')){
                taskCount = parseInt(taskPermissionHashes[i]['Count']);
            }else{
                taskCount = 1;
            }

            for (let j = 0; j < taskCount;j++){
                tasks.push(workAllocationMockData.getRelease2TaskWithPermissions(taskPermissionHashes[i]['Permissions'].split(","), view, assignedState));
            }
            
        }
        global.scenarioData[`workallocation2.${view}`] = {tasks : tasks, total_records:tasks.length} ;
        
    });

    Given('I set MOCK workallocation cases with permissions for view {string} and assigned state {string}', async function (view, assignedState, casePermissionsTable) {
        const casePermissionHashes = casePermissionsTable.hashes();
        const cases = [];
        view = view.split(" ").join("");
        view = view.toLowerCase();
        for (let i = 0; i < casePermissionHashes.length; i++) {
            let taskCount = 0;
            if (casePermissionHashes[i].hasOwnProperty('Count')) {
                taskCount = parseInt(casePermissionHashes[i]['Count']);
            } else {
                taskCount = 1;
            }

            for (let j = 0; j < taskCount; j++) {
                cases.push(workAllocationMockData.getRelease2CaseWithPermission(casePermissionHashes[i]['Permissions'].split(","), view, assignedState));
            }

        }
        global.scenarioData[`workallocation2.${view}`] = { cases: cases, total_records: cases.length };

    });


    Given('I set MOCK tasks with attributes for view {string}', async function (forView, attributesDatatable) {
        const tasksHashes = attributesDatatable.hashes();
        let tasksObj = {};
        let view = forView.toLowerCase();
        view = view.split(" ").join("");
        if(!global.scenarioData[`workallocation2.${view}`] ){
            let tasks = [];
            if(view.includes("mytasks")){
                tasks = workAllocationMockData.getMyWorkMyTasks(150);
            } else if (view.includes("available")) {
                tasks = workAllocationMockData.getMyWorkAvailableTasks(200);
            }else if (view.includes("allwork")) {
                tasks = workAllocationMockData.getAllWorkTasks(400);
            }else{
                throw new Error("Unrecognised task view " + forView);
            }
            global.scenarioData[`workallocation2.${view}`] = tasks;
        }
        tasksObj = global.scenarioData[`workallocation2.${view}`];
        await ArrayUtil.forEach(tasksHashes, async  (taskHash) => {
            let task = tasksObj.tasks[taskHash.index];

            let taskHashKeys = Object.keys(taskHash);
            await ArrayUtil.forEach(taskHashKeys, key => {
                if(key.toLowerCase() === "index"){
                    //ignore index;
                } else if (key.toLowerCase() === "permissions"){
                    task.permissions = taskHash[key].split(",");
                    task.actions = workAllocationDataModel.getRelease2TaskActions(task.permissions, view, taskHash.assignee ? "assigned": "unassigned")
                } else if (key.toLowerCase() === "assignee") {
                    if (taskHash[key] === ""){
                        delete task[key];
                    } else if (key.toLowerCase().includes("date")) {
                        task[key] = getDateValueForDays(taskHash[key]);
                    }else{
                        task[key] = taskHash[key];
                    }
                    
                }else{
                    task[key] = taskHash[key];
                }

            });
            CucumberReporter.AddMessage(`Mock Task at index  ${taskHash.index}  `);
            CucumberReporter.AddJson(task);
        })
       
    });


    Then('I validate {string} tasks columns sorting with taskRequest url {string} on page {int}', async function (waPage,taskRequesturl,onPage ,datatable) {
        const softAssert = new SoftAssert();
        const datatableHashes = datatable.hashes();
        const pageUndertest = waPage.toLowerCase() === "my work" ? myWorkPage : null;

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
            const headerName = datatableHashes[i]['Header'];
            const sortColumnId = datatableHashes[i]['FieldId'];

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

    Given('I set MOCK find persons database with persons', async function(datatable){
        const findPersonsData = await workAllocationMockData.getFindPersonsDataFrom(datatable.hashes());

        MockApp.onPost("/workallocation2/findPerson",(req,res) =>{
            workAllocationMockData.findPersonResponse(req.body.searchOptions.searchTerm, findPersonsData).then((response) => {
                res.send(response);
            });
        });
    });

    Given('I set MOCK task details for WA release2', async function(taskDetailsDatatable){
        const relese2TaskDetails = workAllocationDataModel.getRelease2Task();
        const taskDetails = taskDetailsDatatable.hashes()[0];
        const taskKeys = Object.keys(taskDetails);

        await ArrayUtil.forEach(taskKeys,async(key) => {
            if(key.toLowerCase().includes("date")){
                relese2TaskDetails[key] = getDateValueForDays(taskDetails[key]);
            }else{
                relese2TaskDetails[key] = taskDetails[key];
            }
            
        })

        MockApp.onGet('/workallocation2/task/:taskId', (req,res) => {
            res.send({data:relese2TaskDetails});
        })

    });

    function getDateValueForDays(days){
        const daysNum = parseInt(days);
        let date = new Date();
        date.setDate(date.getDate()+daysNum);
        return date.toISOString().replace("Z","+0100")
        
        
    }

}) ;
