

const express = require('express')
const minimist = require('minimist');

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')


router.get('/actors/:actorId', (req, res) => {
    // res.send(service.getActorRoles(req.params.actorId))
    // userApiData.sendResponse(req, res, "OnUserRoleAssignments", () => service.getActorRoles(req.params.actorId));
    
    let roleAssignmentsDefault = service.getActorRoles(req.params.actorId);
    const args = minimist(process.argv)
    if (!args.standalone) {
        roleAssignmentsDefault = { roleAssignmentResponse :[]}
    }
    userApiData.sendResponse(req, res, "OnUserRoleAssignments", () => { return roleAssignmentsDefault });


});

router.get('/roles', (req,res) => {
    res.send(service.getRoleAssignmentsRoles())
})


router.post('/query' , (req,res) => {
    const reqProps = Object.keys(req.body);
    if (reqProps.includes('queryRequests')){
        const serviceUsers = service.getQueryResults(req.body.queryRequests);
        res.send({ roleAssignmentResponse: serviceUsers });
    } else if (reqProps.includes('roleName') && reqProps.includes('roleType')){
        res.send({roleAssignmentResponse: service.getServiceUsersRolesAssignments(req.body)})
    } else if (reqProps.includes('searchRequest')){

    }


})

router.delete('/:id', (req,res) => {
    res.send(req.body)
})


router.post('/', (req, res) => {
    res.status(201).send(service.addRoleAssignmentResponse(req))
})

module.exports = router;