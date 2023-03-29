

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

    const reqProps = Object.keys(req.body);
    if (reqProps.includes('roleName') && reqProps.includes('roleType') && reqProps.includes('attributes')){
        const serviceUsers = service.getServiceUsersRoleAssignments(req.body);
        res.send({ roleAssignmentResponse: serviceUsers });
    }

})

module.exports = router;