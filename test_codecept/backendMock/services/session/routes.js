

const express = require('express')

const router = express.Router({ mergeParams: true });
const sessionService = require('./index')
const userApiData = require('../userApiData')

router.get('/session/files', (req, res) => {
    res.send(sessionService.getSessionFiles())
});

router.get('/session/default', (req, res) => {
    res.send(sessionService.setDefaultSession(req.query.session))
});

router.get('/updateroles',async (req,res) =>{

});


router.post('/session/user/roles',async (req,res) => {
    await sessionService.updateAuthSessionWithRoles(req.body.auth, req.body.roles)
    res.send({status: 'success'})
})



router.post('/session/user/roleAssignments', async (req, res) => {
    const newRoleAssignmentsInSession = await sessionService.updateAuthSessionWithRoleAssignments(req.body.auth, req.body.roleAssignments)
    res.send(newRoleAssignmentsInSession)
})


router.post('/session/userApiData', async (req, res) => {
    await userApiData.setUserData(req.body.auth, req.body.apiMethod, req.body.apiResponse)
    res.send({ status: 'success' })
})


router.post('/session/getUserRolesAndRoleAssignments', async (req, res) => {
    const data = await sessionService.getSessionRolesAndRoleAssignments(req.body.auth)
    res.send(data)
})





module.exports = router;