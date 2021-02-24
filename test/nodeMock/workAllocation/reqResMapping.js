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
            res.status(200).send(workAllocationMockData.getTaskDetails());
        },
        '/workallocation/caseworker': (req, res) => {
            res.send(workAllocationMockData.getCaseworkersList(20));
        },
        '/workallocation/caseworker/location/:locId': (req, res) => {
            res.send(workAllocationMockData.getCaseworkersList(10));
        }
    },
    post: {
        '/workallocation/task/' : (req,res) => {
            res.send(workAllocationMockData.getAvailableTasks(10));
        },
        '/workallocation/task/:taskId/assign':  (req,res) => {
            res.send();
        },
        '/workallocation/task/:taskId/claim' : (req,res) => {
            res.send();
        }
    } 
}
