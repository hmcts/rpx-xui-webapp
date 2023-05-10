

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')



router.post('/users/fetchUsersById', (req, res) => {
    // throw new Error('/users/fetchUsersById not implemented')
    res.send(service.getUsersById(req.body.userIds))
    // userApiData.sendResponse(req, res, "onSearchLocations", () => service.searchLocations(searchTerm, serviceIds ))

});

module.exports = router;