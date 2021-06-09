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
        '/workallocation/task/:taskId/assign': (req, res) => {
            res.send();
        },
        '/workallocation/task/:taskId/claim' : (req,res) => {
            res.send();
        },
        '/workallocation/task/:taskId/unclaim': (req, res) => {
            res.send();
        },

        '/workallocation/task/:taskId/complete': (req, res) => {
            res.send();
        },
        '/workallocation/task/:taskId/cancel': (req, res) => {
            res.send();
        }
    }
}

