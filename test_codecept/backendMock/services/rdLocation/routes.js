

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')


router.get('/court-venues', (req, res) => {
  console.log('!!!!!!!!!!!! in rdLocation, routesJs -- /court-venues');
    const locationId = req.query['epimms_id'];
    const locations = service.getLocationById(locationId);
    console.log('court-venues locations -> ', locations);
    console.log('court-venues epimms_id -> ', locationId);
    // res.send(locations)
    userApiData.sendResponse(req, res, "onSearchLocationById", () => locations)

});

router.get('/court-venues/venue-search?', (req, res) => {
  console.log('!!!!!!!!!!!! in rdLocation, routesJs -- /court-venues/venue-search?');
    const serviceIds = req.query['court-type-id'].split(',');
    const locationType = req.query.locationType;
    const searchTerm = req.query['search-string'];

    const locations = service.searchLocations(searchTerm, serviceIds);
    // res.send(locations)
    userApiData.sendResponse(req, res, "onSearchLocations", () => locations)

});

router.get('/court-venues/services', (req, res) => {
  console.log('!!!!!!!!!!!! in rdLocation, routesJs -- /court-venues/services');
    const service_code = req.query.service_code
    userApiData.sendResponse(req, res, "onServiceLocations", () => service.getServiceLocations(service_code))


});


module.exports = router;
