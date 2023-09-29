

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')
const hearingTypeCategories = require('./hearingType_Categories')


router.get('/lov/categories/:category', (req, res) => {
    res.send({ list_of_values: service.categoryTypes[req.params.category].value})
    // if (req.params.category === 'HearingType'){
    //     res.send(hearingTypeCategories)
    // } else if (req.params.category === 'CaseLinkingReasonCode'){
    //     res.send({ list_of_values  : []})
    // } else if (req.params.category === 'HearingChannel') {
    //     res.send(hearingTypeCategories)
    // } else if (req.params.category === 'PanelMemberType') {
    //     res.send({ list_of_values: [] })

    // } else if (req.params.category === 'HearingPriority') {
    //     res.send({ list_of_values: [] })

    // } else if (req.params.category === 'HearingSubChannel') {
    //     res.send({ list_of_values: [] })

    // }
    // else {
    //     throw new Error(`unknown category: ${req.params.category}`)
    // }
});

router.get('/caseflags/:service-id=ABA5', (req,res) => {
  
    res.send(service.caseFlags)
})



module.exports =  router;

