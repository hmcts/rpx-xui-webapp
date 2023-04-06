

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')


router.get('/actors/:actorId', (req, res) => {
   
    res.send(service.getActorRoles(req.params.actorId))

});

router.get('/roles', (req,res) => {
    res.send(service.getRoleAssignmentsRoles())
})


router.post('/query' , (req,res) => {
    // console.log(`am query ${JSON.stringify(req.body)}`)
    const reqProps = Object.keys(req.body);
    if (reqProps.includes('queryRequests')){
        const serviceUsers = service.getQueryResults(req.body.queryRequests);
        res.send({ roleAssignmentResponse: serviceUsers });
    } else if (reqProps.includes('roleName') && reqProps.includes('roleTy[pe')){
        res.send(service.getServiceUsersRolesAssignments(req.body))
    }


})

router.delete('/:id', (req,res) => {
    res.send(req.body)
})


router.post('/', (req, res) => {
    res.status(201).send(service.addRoleAssignmentResponse(req))
})

module.exports = router;