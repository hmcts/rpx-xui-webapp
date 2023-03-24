

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')


router.post('/', (req, res) => {
    const search_parameters = req.body.search_parameters;
    const caseFilter = search_parameters.find(param => param.key === 'caseId' )
    if (caseFilter){
        userApiData.sendResponse(req, res, "OnTasksByCase", () => service.getSearchTasks(25))
    }else{
        userApiData.sendResponse(req, res, service.method.searchTasks, () => service.searchTasksResponse)
    }
});

router.get('/:taskId', (req, res) => {
    userApiData.sendResponse(req, res, "OnTask", () => service.getTask())
});

router.get('/:taskId/roles', (req, res) => {
    userApiData.sendResponse(req, res, "OnTaskRoles", () => service.getTaskRoles())
});

router.post('/:taskId/:action', (req,res) => {
    res.send({})
})

module.exports =  router;