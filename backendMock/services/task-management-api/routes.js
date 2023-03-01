

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')


router.post('/', (req, res) => {
    userApiData.sendResponse(req, res, "onSearchTasks", () => service.getSearchTasks(25))
});

module.exports =  router;