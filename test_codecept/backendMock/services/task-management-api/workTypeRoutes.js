

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')


router.get('/', (req, res) => {
    userApiData.sendResponse(req, res, "onWorkTypes", () => service.getWorkTypes())
});

module.exports = router;