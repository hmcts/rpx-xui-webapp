

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')


router.get('/actors/:actorId', (req, res) => {
   
    res.send(service.getActorRoles(req.params.actorId))

});

module.exports = router;