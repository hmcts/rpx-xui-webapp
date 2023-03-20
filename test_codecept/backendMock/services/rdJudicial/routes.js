

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')



router.post('/users/search', (req, res) => {
    throw new Error('judicial ref data  /refdata/judicial/users/search not implemented')
    res.send(locations)
    // userApiData.sendResponse(req, res, "onSearchLocations", () => service.searchLocations(searchTerm, serviceIds ))

});

module.exports = router;