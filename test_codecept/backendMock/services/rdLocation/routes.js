

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')


router.get('/court-venues', (req, res) => {
    const serviceIds = req.query.serviceIds;
    const locationType = req.query.locationType;
    const searchTerm = req.query.searchTerm;

    const service_code = req.query.service_code
    if (service_code){
        userApiData.sendResponse(req, res, "onServiceLocations", () => service.getServiceLocations(service_code))
    } else if (serviceIds){
        userApiData.sendResponse(req, res, "onServiceLocations", () => service.searchLocations(serviceIds, searchTerm))

    }

});

router.get('/court-venues/services', (req, res) => {
    
    const service_code = req.query.service_code
    userApiData.sendResponse(req, res, "onServiceLocations", () => service.getServiceLocations(service_code))

   
});

module.exports = router;