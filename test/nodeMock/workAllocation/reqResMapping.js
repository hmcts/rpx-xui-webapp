const workAllocationMockData = require('./mockData');
const bookingsMockData = require('./bookingsData');
const rolesAccessMockData = require('./rolesAccess');
const CucumberReporter = require('../../e2e/support/reportLogger');
const MockApp = require('../app');

module.exports = {
    mockServiceResetCallbacks: [() => workAllocationMockData.setDefaultData()],
    get: {
        
        '/workallocation/task/types-of-work': (req, res) => {
            const typeOfWorks = workAllocationMockData.getTypeOfWorks();
            res.send(typeOfWorks);
        },
        '/workallocation/location': (req, res) => {
            res.send(workAllocationMockData.getLocationList(20));
        },
        '/workallocation/location': (req, res) => {
            res.send(workAllocationMockData.getLocationList(20));
        },
        '/workallocation/location/:locationId': (req, res) => {
            res.send(workAllocationMockData.getLocation(req.params.locationId));
        },
        '/workallocation/task/:taskId': (req, res) => {
            res.status(200).send(workAllocationMockData.getTaskDetails());
        },
        '/workallocation/task/:taskId': (req, res) => {
            const body = workAllocationMockData.taskDetails
            res.status(200).send(body);
        },
        '/workallocation/caseworker': (req, res) => {
            res.send(workAllocationMockData.getCaseworkersList(20));
        },
        '/workallocation/caseworker': (req, res) => {
            res.send(workAllocationMockData.getCaseworkersList(20));
        },
        '/workallocation/caseworker/location/:locId': (req, res) => {
            res.send(workAllocationMockData.getCaseworkersList(10));
        },
        '/workallocation/exclusion/rolesCategory': (req, res)=>{
            res.send(workAllocationMockData.getExclusionRoleCategories());
        },
       
        '/workallocation/roles/:caseId' : (req,res) => { 
            res.send(workAllocationMockData.caseRoles);
        },
        '/api/role-access/exclusions/get' : (req,res) => { 
            res.send(workAllocationMockData.exclusions);
        },
        '/workallocation/case/task/:caseid': (req,res) => {
            
            res.send(workAllocationMockData.getCaseTasksForCaseId(req.params.caseid));
        },
        '/workallocation/judicialworker' : (req,res) => {
            res.send(workAllocationMockData.judgeUsers);
        },
        '/api/wa-supported-jurisdiction/get': (req,res) => {
            res.send(['IA']);
        },
        '/workallocation/task/:taskId/roles' : (req,res) => {
            res.send(workAllocationMockData.getTaskRoles());
        },
        '/api/wa-supported-jurisdiction/get' : (req,res) => {
            res.send(workAllocationMockData.waSupportedJusridictions);
        },
        '/api/locations/getLocationsById' : (req,res) => {
            res.send(workAllocationMockData.getLocationById(req.query.ids));
        },
        '/api/locations/getLocations': (req, res) => {
            res.send(workAllocationMockData.searchLocations(req.query.serviceIds, req.query.searchTerm));
        },
        '/workallocation/case/tasks/:caseId/event/:eventId/caseType/:caseType/jurisdiction/:service': (req, res) => {
            res.send(workAllocationMockData.caseEventTasks);
        },
        '/workallocation/full-location':(req,res) => {
            res.send(bookingsMockData.getAllLocationDetails());
        },
        '/api/role-access/roles/getNewCasesCount':(req,res) =>{
            res.send({count:0})
        },
        '/api/role-access/roles/getSpecificAccessApproved':(req,res) => {
            res.send({count:0});
        }
    },
    post: {
        '/workallocation/my-cases': (req, res) => {

            const requestedView = req.body.view.toLowerCase();
            const pageNum = requestedView === "mycases" ? 1 : req.body.searchRequest.pagination_parameters.page_number;
            const pageSize = requestedView === "mycases" ? 125 : req.body.searchRequest.pagination_parameters.page_size;

            let cases = [];
            if (requestedView === "mycases" || requestedView === "allworkcases") {
                cases = global.scenarioData && global.scenarioData[`workallocation.${requestedView}`] ? global.scenarioData[`workallocation.${requestedView}`] : workAllocationMockData.getMyCases(pageSize ? pageSize * 5 : 125);
            } else {
                throw new Error("Unrecognised case list view : " + requestedView);
            }
            try {
                const thisPageCases = [];



                const startIndexForPage = ((pageNum - 1 ) * pageSize) ;
                const endIndexForPage = (startIndexForPage + pageSize) < cases.total_records ? startIndexForPage + pageSize - 1 : cases.total_records - 1;
                for (let i = startIndexForPage; i <= endIndexForPage; i++) {
                    thisPageCases.push(cases.cases[i]);
                }
                const responseData = { cases: thisPageCases, total_records: cases.total_records };
                res.send(responseData);
            } catch (e) {
                res.status(500).send({ error: 'mock error occured', stack: e });
            }
        },
        '/workallocation/my-work/cases': (req, res) => {
            res.send(workAllocationMockData.myCases);

        },
        '/workallocation/all-work/cases': (req, res) => {
            const pageNum = req.body.searchRequest.pagination_parameters.page_number;
            const pageSize = req.body.searchRequest.pagination_parameters.page_size;
            try {
                res.send(getCasePageRecords(workAllocationMockData.allWorkCases, pageNum, pageSize));

            } catch (e) {
                res.status(500).send({ error: 'mock error occured', stack: e.stack });
            }
        },
       
        '/workallocation/task': (req, res) => {

            if (req.body.view === "MyTasks"){
                res.send(workAllocationMockData.getMyTasks(10));
            } else if (req.body.view === "AvailableTasks") {
                res.send(workAllocationMockData.getAvailableTasks(10));
            } else if (req.body.view === "TaskManager") {
                res.send(workAllocationMockData.getTaskManagerTasks(10));
            }else{
                throw new Error("Unrecognised task list view : "+req.body.view);
            }
        },
        '/workallocation/task': (req, res) => {
           
            const requestedView = req.body.view;
            let tasks = [];
            if (requestedView === "MyTasks") {
                
                tasks = workAllocationMockData.myWorkMyTasks;
            } else if (requestedView === "AvailableTasks") {
                tasks = workAllocationMockData.myWorkAvailableTasks;
            } else if (requestedView === "AllWork") {
                tasks = workAllocationMockData.allWorkTasks;
            } else {
                throw new Error("Unrecognised task list view : " + requestedView);
            }
            try {
                if (req.body.searchRequest.pagination_parameters) {
                    const pageNum = req.body.searchRequest.pagination_parameters.page_number;
                    const pageSize = req.body.searchRequest.pagination_parameters.page_size;
                    res.send(getTaskPageRecords(tasks, pageNum, pageSize));
                } else {
                    res.send(tasks);
                }

            } catch (e) {
                res.status(500).send({ error: 'mock error occured', stack: e.stack });
            }
        },
        
        '/workallocation/taskWithPagination': (req, res) => {
            

            const requestedView = req.body.view;
            let tasks = [];
            if (requestedView === "MyTasks") {
                tasks = global.scenarioData && global.scenarioData['workallocation1.mytasks'] ? global.scenarioData['workallocation1.mytasks'] : workAllocationMockData.getMyTasks(200);
            } else if (requestedView === "AvailableTasks") {
                tasks = global.scenarioData && global.scenarioData['workallocation1.availabletasks'] ? global.scenarioData['workallocation1.availabletasks'] : workAllocationMockData.getAvailableTasks(200);
            } else if (requestedView === "TaskManager" ) {
                tasks = global.scenarioData && global.scenarioData['workallocation1.taskmanager'] ? global.scenarioData['workallocation1.taskmanager'] : workAllocationMockData.getTaskManagerTasks(200);
            } else {
                throw new Error("Unrecognised task list view : " + requestedView);
            }
            try {
                if (req.body.searchRequest.pagination_parameters){
                    const pageNum = req.body.searchRequest.pagination_parameters.page_number;
                    const pageSize = req.body.searchRequest.pagination_parameters.page_size;
                    res.send(getTaskPageRecords(tasks, pageNum, pageSize));
                }else{
                    res.send(tasks); 
                }

            } catch (e) {
                res.status(500).send({ error: 'mock error occured', stack: e.stack });
            }
        },
        '/workallocation/taskWithPagination': (req, res) => {
            

            const requestedView = req.body.view;
            let tasks = [];
            if (requestedView === "MyTasks") {
                tasks = global.scenarioData && global.scenarioData['workallocation.mytasks'] ? global.scenarioData['workallocation.mytasks'] : workAllocationMockData.getMyWorkMyTasks(pageSize * 5);
                // global.scenarioData['workallocation.mytasks'] = tasks;
            } else if (requestedView === "AvailableTasks") {
                tasks = global.scenarioData && global.scenarioData['workallocation.availabletasks'] ? global.scenarioData['workallocation.availabletasks'] : workAllocationMockData.getMyWorkAvailableTasks(pageSize * 5);
                // global.scenarioData['workallocation.availabletasks'] = tasks;

            } else if (requestedView === "TaskManager" || requestedView.includes("AllWork")) {
                tasks = global.scenarioData && global.scenarioData['workallocation.allwork'] ? global.scenarioData['workallocation.allwork'] : workAllocationMockData.getAllWorkTasks(pageSize * 5);
                // global.scenarioData['workallocation.allwork'] = tasks;

            } else {
                throw new Error("Unrecognised task list view : " + requestedView);
            }
            
            try { 
                if (req.body.searchRequest.pagination_parameters) {
                    const pageNum = req.body.searchRequest.pagination_parameters.page_number;
                    const pageSize = req.body.searchRequest.pagination_parameters.page_size;
                    res.send(getTaskPageRecords(tasks, pageNum, pageSize));
                } else {
                    res.send(tasks);
                }

            } catch (e) {
                res.status(500).send({ error: 'mock error occured', stack: e.stack });
            }
        },
        '/workallocation/task/:taskId/assign': (req, res) => {
            res.send();
        },
        '/workallocation/task/:taskId/assign': (req, res) => {
            res.send(204);
        },
        '/workallocation/task/:taskId/claim' : (req,res) => {
            res.send();
        },
        '/workallocation/task/:taskId/claim': (req, res) => {
            res.status(204).send('success');
        },
        '/workallocation/task/:taskId/unclaim': (req, res) => {
            res.status(204).send('success');
        },
        '/workallocation/task/:taskId/unclaim': (req, res) => {
            res.status(204).send('success');
        },
        '/workallocation/task/:taskId/complete': (req, res) => {
            res.status(204).send();
        },
        '/workallocation/task/:taskId/claim': (req, res) => {
            res.status(204).send();
        }, 
        '/workallocation/task/:taskId/unclaim': (req, res) => {
            res.status(204).send();
        },   
        '/workallocation/task/:taskId/cancel': (req, res) => {
            res.status(204).send();
        },
        '/workallocation/findPerson': (req, res) => {
            const response = workAllocationMockData.findPersonResponse(req.body.searchOptions);
            CucumberReporter.AddJson(response);
            res.send(response);
        
            
        },
        '/api/user/exclusions/confirm' : (req,res)=>{
            res.send({});
        },
        '/api/role-access/allocate-role/confirm': (req, res) => {
            res.send({});
        },
        '/api/role-access/allocate-role/reallocate': (req, res) => {
            res.send({});
        },
        '/api/role-access/exclusions/confirm' : (req,res) => {
            res.send({});

        },
        '/api/role-access/allocate-role/delete' : (req,res) => {
            res.status(204).send({});

        },
        '/api/role-access/exclusions/post' : (req,res) => {
            
            res.send(workAllocationMockData.exclusions);
        },
        '/api/role-access/roles/post': (req, res) => {
            const caseRolesAssignment = []; 
            if(Object.keys(req.body).includes('assignmentId')){
                const reqAssignmentId = req.body.assignmentId;
            
                const caseRole = workAllocationMockData.caseRoles[0];
                caseRole.id = reqAssignmentId;
                caseRolesAssignment.push(caseRole);
            
                res.send(caseRolesAssignment);

            }else{
                res.send(workAllocationMockData.caseRoles);
            }
        },
        '/api/role-access/exclusions/delete' : (req,res) => {
            res.status(204).send();
        },
        '/workallocation/getJudicialUsers':(req,res) => {
            const allJudicialUsers = workAllocationMockData.judgeUsers;
            const services = req.body.services;
            const userids = req.body.userIds;

            const returnUsers = [];
            for (const userid of userids) {
                for (const mockedUser of allJudicialUsers) {
                    if (mockedUser.sidam_id === userid) {
                        returnUsers.push(mockedUser);
                    }
                }
            }
            if (returnUsers.length === 0) {
                let i = 0;
                for (const userid of userids) {
                    i++;
                    returnUsers.push(workAllocationMockData.addJudgeUsers(userid, 'someJudgefn_' + i, 'judicialln_' + i, i + '_judicial_test@hmcts.net'));
                }
            }
            res.send(returnUsers);
        },
        '/api/role-access/roles/getJudicialUsers': (req,res) => {
            const allJudicialUsers = workAllocationMockData.judgeUsers;
            const services = req.body.services;
            const userids = req.body.userIds;

            const returnUsers = [];
            for (const userid of userids){
                for (const mockedUser of allJudicialUsers){
                    if (mockedUser.sidam_id === userid){
                        returnUsers.push(mockedUser);
                    }
                }
            }
            if (returnUsers.length === 0){
                let i = 0;
                for (const userid of userids) {
                    i++;
                    returnUsers.push(workAllocationMockData.addJudgeUsers(userid,'someJudgefn_'+i, 'judicialln_'+i,i+'_judicial_test@hmcts.net')); 
                }
            }
            res.send(returnUsers);
        },
        '/workallocation/retrieveCaseWorkersForServices' : (req,res) => {
            res.send(workAllocationMockData.retrieveCaseWorkersForServices(req.body.serviceIds, req.body.fullServices))
        } ,
        '/api/role-access/allocate-role/valid-roles': (req, res) => {
            res.send(workAllocationMockData.getRoles(req.body.serviceIds));
        },
        '/api/locations/getLocationsById': (req, res) => {
            res.send(workAllocationMockData.getLocationsByIds(req.body.locations));
        },

        '/api/locations/getLocations':(req,res) => {
            res.send(workAllocationMockData.getLocations(req.body)); 
        },
        '/am/getBookings': (req, res) => {
            res.send(bookingsMockData.getBookings());
        },
        '/api/role-access/roles/access-get': (req, res) => {
            res.send(workAllocationMockData.caseRoles);
        },
        '/api/am/specific-access-approval':(req,res) =>{
            res.send({});
        }
    }
   
}

function getTaskPageRecords(totalRecords, pageNum, pageSize) {
    let responseData = null;
    const thisPageTasks = [];

    const startIndexForPage = pageNum === 1 ? 0 : ((pageNum - 1) * pageSize) - 1;
    const endIndexForPage = (startIndexForPage + pageSize) < totalRecords.total_records ? startIndexForPage + pageSize - 1 : totalRecords.total_records - 1;
    for (let i = startIndexForPage; i <= endIndexForPage; i++) {
        thisPageTasks.push(totalRecords.tasks[i]);
    }
    responseData = { tasks: thisPageTasks, total_records: totalRecords.total_records };
    return responseData;
}

function getCasePageRecords(totalRecords, pageNum, pageSize) {
    let responseData = null;
    const thisPageTasks = [];

    const startIndexForPage = pageNum === 1 ? 0 : ((pageNum - 1) * pageSize) - 1;
    const endIndexForPage = (startIndexForPage + pageSize) < totalRecords.total_records ? startIndexForPage + pageSize - 1 : totalRecords.total_records - 1;
    for (let i = startIndexForPage; i <= endIndexForPage; i++) {
        thisPageTasks.push(totalRecords.cases[i]);
    }
    responseData = { cases: thisPageTasks, total_records: totalRecords.total_records };
    return responseData;
}

