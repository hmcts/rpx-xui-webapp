const workAllocationMockData = require('./mockData');

module.exports = {

    get: {
        '/workallocation/location': (req, res) => {
            res.send(workAllocationMockData.getLocationList(20));
        },
        '/workallocation2/location': (req, res) => {
            res.send(workAllocationMockData.getLocationList(20));
        },
        '/workallocation/location/:locationId': (req, res) => {
            res.send(workAllocationMockData.getLocation(req.params.locationId));
        },
        '/workallocation/task/:taskId': (req, res) => {
            res.status(200).send(workAllocationMockData.getTaskDetails());
        },
        '/workallocation2/task/:taskId': (req, res) => {
            const body = { data: workAllocationMockData.getRelease2TaskDetails() }
            res.status(200).send(body);
        },
        '/workallocation/caseworker': (req, res) => {
            res.send(workAllocationMockData.getCaseworkersList(20));
        },
        '/workallocation2/caseworker': (req, res) => {
            res.send(workAllocationMockData.getCaseworkersList(20));
        },
        '/workallocation/caseworker/location/:locId': (req, res) => {
            res.send(workAllocationMockData.getCaseworkersList(10));
        }
    },
    post: {
        '/workallocation2/caseWithPagination/': (req, res) => {
            const pageNum = req.body.searchRequest.pagination_parameters.page_number;
            const pageSize = req.body.searchRequest.pagination_parameters.page_size;

            const requestedView = req.body.view.toLowerCase();
            let cases = [];
            if (requestedView === "mycases") {
                cases = global.scenarioData && global.scenarioData['workallocation2.mycases'] ? global.scenarioData['workallocation2.mycases'] : workAllocationMockData.getMyCases(pageSize * 5);
            }  else {
                throw new Error("Unrecognised cSe list view : " + requestedView);
            }
            try {
                const thisPageCases = [];

                const startIndexForPage = pageNum === 1 ? 0 : ((pageNum - 1) * pageSize) - 1;
                const endIndexForPage = (startIndexForPage + pageSize) < cases.total_records ? startIndexForPage + pageSize - 1 : cases.total_records - 1;
                for (let i = startIndexForPage; i <= endIndexForPage; i++) {
                    thisPageCases.push(cases.cases[i]);
                }
                const responseData = { cases: thisPageCases, total_records: cases.total_records };
                res.send(responseData);
            } catch (e) {
                res.status(500).send({ error: 'mock error occured', stack: e.stack });
            }
        },
        '/workallocation/task/': (req, res) => {

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
        '/workallocation2/task/': (req, res) => {
            const tasks = [];
            const permissions = [['Read'], ['Read', 'Manage'], ['Read', 'Manage', 'Execute'], ['Read', 'Manage', 'Execute', 'Cancel']]
            if (req.body.view === "MyTasks") {
                for (let i = 0; i < permissions.length; i++){
                    tasks.push(workAllocationMockData.getRelease2TaskWithPermissions(permissions[i],'MyTasks',null));
                }
                
            } else if (req.body.view === "AvailableTasks") {
                for (let i = 0; i < permissions.length; i++) {
                    tasks.push(workAllocationMockData.getRelease2TaskWithPermissions(permissions[i], 'AvailableTasks', null));
                }
                
            } else if (req.body.view === "TaskManager") {
                for (let i = 0; i < permissions.length; i++) {
                    tasks.push(workAllocationMockData.getRelease2TaskWithPermissions(permissions[i], 'AvailableTasks', 'Unassigned'));
                }

                for (let i = 0; i < permissions.length; i++) {
                    tasks.push(workAllocationMockData.getRelease2TaskWithPermissions(permissions[i], 'AvailableTasks', 'assigned'));
                }
                
            } else {
                throw new Error("Unrecognised task list view : " + req.body.view);
            }
            res.send({ tasks: tasks, total_records: tasks.length});
        },
        '/workallocation/taskWithPagination/': (req, res) => {
            const pageNum = req.body.searchRequest.pagination_parameters.page_number;
            const pageSize = req.body.searchRequest.pagination_parameters.page_size;

            const requestedView = req.body.view;
            let tasks = [];
            if (requestedView === "MyTasks") {
                tasks = global.scenarioData && global.scenarioData['workallocation1.mytasks'] ? global.scenarioData['workallocation1.mytasks'] : workAllocationMockData.getMyTasks(pageSize * 5);
            } else if (requestedView === "AvailableTasks") {
                tasks = global.scenarioData && global.scenarioData['workallocation1.availabletasks'] ? global.scenarioData['workallocation1.availabletasks'] : workAllocationMockData.getAvailableTasks(pageSize * 5);
            } else if (requestedView === "TaskManager" ) {
                tasks = global.scenarioData && global.scenarioData['workallocation1.taskmanager'] ? global.scenarioData['workallocation1.taskmanager'] : workAllocationMockData.getTaskManagerTasks(pageSize * 5);
            } else {
                throw new Error("Unrecognised task list view : " + requestedView);
            }
            try {
                res.send(getTaskPageRecords(tasks, pageNum, pageSize));

            } catch (e) {
                res.status(500).send({ error: 'mock error occured', stack: e.stack });
            }
        },
        '/workallocation2/taskWithPagination/': (req, res) => {
            const pageNum = req.body.searchRequest.pagination_parameters.page_number;
            const pageSize = req.body.searchRequest.pagination_parameters.page_size;

            const requestedView = req.body.view;
            let tasks = [];
            if (requestedView === "MyTasks") {
                tasks = global.scenarioData && global.scenarioData['workallocation2.mytasks'] ? global.scenarioData['workallocation2.mytasks'] : workAllocationMockData.getMyWorkMyTasks(pageSize * 5);
            } else if (requestedView === "AvailableTasks") {
                tasks = global.scenarioData && global.scenarioData['workallocation2.availabletasks'] ? global.scenarioData['workallocation2.availabletasks'] : workAllocationMockData.getMyWorkAvailableTasks(pageSize * 5);
            } else if (requestedView === "TaskManager" || requestedView.includes("AllWork")) {
                tasks = global.scenarioData && global.scenarioData['workallocation2.allwork'] ? global.scenarioData['workallocation2.allwork'] : workAllocationMockData.getAllWorkTasks(pageSize * 5);
            } else {
                throw new Error("Unrecognised task list view : " + requestedView);

            }
            
            try { 
                res.send(getTaskPageRecords(tasks,pageNum,pageSize));
            } catch (e) {
                res.status(500).send({ error: 'mock error occured', stack: e.stack });
            }

        },
        '/workallocation/task/:taskId/assign': (req, res) => {
            res.send();
        },
        '/workallocation2/task/:taskId/assign': (req, res) => {
            res.send();
        },
        '/workallocation/task/:taskId/claim' : (req,res) => {
            res.send();
        },
        '/workallocation2/task/:taskId/claim': (req, res) => {
            res.send();
        },
        '/workallocation/task/:taskId/unclaim': (req, res) => {
            res.send();
        },
        '/workallocation2/task/:taskId/unclaim': (req, res) => {
            res.send();
        },
        '/workallocation/task/:taskId/complete': (req, res) => {
            res.send();
        },
        '/workallocation2/task/:taskId/complete': (req, res) => {
            res.send();
        },
        '/workallocation/task/:taskId/cancel': (req, res) => {
            res.send();
        },
        '/workallocation2/task/:taskId/cancel': (req, res) => {
            res.send();
        },
        '/workallocation2/findPerson': (req, res) => {
            workAllocationMockData.findPersonResponse(req.body.searchOptions.searchTerm, null).then((response) =>{
                res.send(response);
            });
            
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

