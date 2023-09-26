


const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')



router.get('/', (req, res) => {
    const caseIds = req.query['case_ids'];
    res.send(service.getCaseAssignments())
    // userApiData.sendResponse(req, res, "onSearchLocations", () => service.searchLocations(searchTerm, serviceIds ))

});

router.post('/', (req, res) => {
    res.status(201).send({
        "status_message": "Role [Defendant] from the organisation policy successfully assigned to the assignee."
    })
    // userApiData.sendResponse(req, res, "onSearchLocations", () => service.searchLocations(searchTerm, serviceIds ))

});

module.exports = router;