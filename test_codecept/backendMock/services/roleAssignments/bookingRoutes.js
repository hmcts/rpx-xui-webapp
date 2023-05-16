

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')


router.post('/query', (req, res) => {

    res.send(service.getBookings(req.body))

});

module.exports = router;