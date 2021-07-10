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
            const pageSize = req.body.searchRequest.pagination_parameters.page_size;
            if (req.body.view === "MyCases") {
                res.send(workAllocationMockData.getMyCases());
            } else {
                throw new Error("Unrecognised task list view : " + req.body.view);
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
            res.send({ tasks: tasks});
        },
        '/workallocation/taskWithPagination/': (req, res) => {
            const pageSize = req.body.searchRequest.pagination_parameters.page_size;
            if (req.body.view === "MyTasks") {
                res.send(workAllocationMockData.getMyTasks(pageSize));
            } else if (req.body.view === "AvailableTasks") {
                res.send(workAllocationMockData.getAvailableTasks(pageSize));
            } else if (req.body.view === "TaskManager") {
                res.send(workAllocationMockData.getTaskManagerTasks(pageSize));
            } else {
                throw new Error("Unrecognised task list view : " + req.body.view);
            }
        },
        '/workallocation2/taskWithPagination/': (req, res) => {
            const pageNum = req.body.searchRequest.pagination_parameters.page_number;
            const pageSize = req.body.searchRequest.pagination_parameters.page_size;

            const requestedView = req.body.view;
            let tasks = [];
            if (requestedView === "MyTasks") {
                tasks = global.scenarioData && global.scenarioData['workallocation2.mytasks'] ? global.scenarioData['workallocation2.mytasks'] : workAllocationMockData.getMyWorkMyTasks(pageSize*5);
            } else if (requestedView === "AvailableTasks") {
                tasks = global.scenarioData && global.scenarioData['workallocation2.availabletasks'] ? global.scenarioData['workallocation2.availabletasks'] : workAllocationMockData.getMyWorkAvailableTasks(pageSize*5);
            } else if (requestedView === "TaskManager" || requestedView.includes("AllWork")) {
                tasks = global.scenarioData && global.scenarioData['workallocation2.allwork'] ? global.scenarioData['workallocation2.allwork'] : workAllocationMockData.getAllWorkTasks(pageSize*5);
            } else {
                throw new Error("Unrecognised task list view : " + requestedView);
            }
            try {
                const thisPageTasks = [];
              
                const startIndexForPage = pageNum === 1 ? 0 : ((pageNum - 1) * pageSize) - 1;
                const endIndexForPage = (startIndexForPage + pageSize) < tasks.total_records ? startIndexForPage + pageSize - 1 : tasks.total_records - 1;
                for (let i = startIndexForPage; i <= endIndexForPage; i++) {
                    thisPageTasks.push(tasks.tasks[i]);
                }
                const responseData = { tasks: thisPageTasks, total_records: tasks.total_records };
                res.send(responseData);
            } catch (e) {
                res.status(500).send({ error: 'mock error occured',stack:e.stack });
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

