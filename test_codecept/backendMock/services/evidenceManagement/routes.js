

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')


router.get('/:documentId/binary', (req, res) => {
    console.log(req.params)
    res.download('./dummy.pdf')
});


module.exports = router;
