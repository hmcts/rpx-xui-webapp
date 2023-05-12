

const express = require('express')


const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')

const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {

    // res.status(200).send(service.getDefaulstResponse());
  // req.params.key1 = 'nanme';
  // req.params.key2 = 'kasi';

   // this is for 1 Row
    // userApiData.sendResponse(req, res, "GlobalSearchResults", () => service.getDefaultResponse())

   // this is for 25 rows of caseData
   userApiData.sendResponse(req,res,"GlobalSearchResults",() => service.getCaseDataWithRowCountOf(25));
});


module.exports =  router;
