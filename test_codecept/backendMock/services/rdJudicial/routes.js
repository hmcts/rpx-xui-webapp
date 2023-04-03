

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')



router.post('/users/search', (req, res) => {
    // throw new Error('judicial ref data  /refdata/judicial/users/search not implemented')
    // res.send(locations)
    console.log('')
    userApiData.sendResponse(req, res, service.methods.OnFindperson, () => service.findPerson(req.body))

});

module.exports = router;