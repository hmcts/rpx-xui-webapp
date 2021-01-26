const workAllocationMockData = require('./mockData');

module.exports = {

    get: {
        '/workallocation/location': (req, res) => {
            res.send(workAllocationMockData.getLocationList(20));
        },
        '/workallocation/location/:locationId': (req, res) => {
            res.send(workAllocationMockData.getLocation(req.params.locationId));
        },
        '/workallocation/task/:taskId': (req, res) => {
            res.send(workAllocationMockData.getTaskDetails());
        },
        '/workallocation/caseworker': (req, res) => {
            res.send(workAllocationMockData.getCaseworkersList(20));
        }
    },
    post: {
        '/workallocation/task/' : (req,res) => {
            res.send(workAllocationMockData.getAvailableTasks(1));
        },
        '/workallocation/task/:taskId/assign':  (req,res) => {
            res.send();
        },
        '/workallocation/task/:taskId/claim' : (req,res) => {
            res.status(404).send();
        },
        '/workallocation/task/:ccdId/complete': (req,res) => {
            res.send();
        }

       s 
    } 
}
