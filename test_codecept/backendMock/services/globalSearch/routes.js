

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')

const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {

    // res.status(200).send(service.getDefaulstResponse());
    userApiData.sendResponse(req, res, "GlobalSearchResults", () => service.getDefaultResponse())
});


module.exports =  router;