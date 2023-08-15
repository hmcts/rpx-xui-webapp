const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')



router.get('/users', (req, res) => {
    res.send(service.getUsers())
    // userApiData.sendResponse(req, res, "onSearchLocations", () => service.searchLocations(searchTerm, serviceIds ))

});

module.exports = router;
