

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')


router.get('/lov/categories/:categoryid', (req, res) => {
 
    res.send({ list_of_values: service.categoryTypes[req.params.categoryid].value })
});

router.get('/caseflags/:service-id=ABA5', (req,res) => {
  
    res.send(service.caseFlags)
})



module.exports =  router;


const lovRefData = [
    {
        "category_key": "HearingType",
        "key": "ABA5-BRE",
        "value_en": "Breach",
        "value_cy": "Torri Amodau",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 4,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-FOF",
        "value_en": "Finding of Fact",
        "value_cy": "Canfod y Ffeithiau",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 12,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-FRF",
        "value_en": "Financial remedy first appointment",
        "value_cy": "Apwyntiad cyntaf rhwymedi ariannol",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": null,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-FRD",
        "value_en": "Financial remedy directions",
        "value_cy": "Cyfarwyddiadau rhwymedi ariannol",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": null,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-FRI",
        "value_en": "Financial remedy interim order",
        "value_cy": "Gorchymyn interim rhwymedi ariannol",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": null,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-FRR",
        "value_en": "Financial remedy financial dispute resolution",
        "value_cy": "Rhwymedi ariannol datrys anghydfod ariannol",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": null,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-FHD",
        "value_en": "First Hearing Dispute Resolution Appointment (FHDRA)",
        "value_cy": "Apwyntiad Datrys Anghydfod Gwrandawiad Cyntaf (FHDRA)",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 26,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-FHR",
        "value_en": "First Hearing",
        "value_cy": "Gwrandawiad Cyntaf",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 13,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-FFH",
        "value_en": "Full/Final hearing",
        "value_cy": "Gwrandawiad Llawn/Terfynol",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 14,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-SGA",
        "value_en": "Safeguarding Gatekeeping Appointment",
        "value_cy": "Apwyntiad Neilltuo Diogelwch",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 24,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-SCF",
        "value_en": "Settlement Conference",
        "value_cy": "Cynhadledd Setlo",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 25,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-JMT",
        "value_en": "Judgment",
        "value_cy": "Dyfarniad",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 19,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-FCM",
        "value_en": "Further Case Management Hearing",
        "value_cy": "Gwrandawiad Rheoli Achos Pellach",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 15,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-ALL",
        "value_en": "Allocation",
        "value_cy": "Dyrannu",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 1,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-APP",
        "value_en": "Application",
        "value_cy": "Cais",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 3,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-APL",
        "value_en": "Appeal",
        "value_cy": "Apêl",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 2,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-REV",
        "value_en": "Review",
        "value_cy": "Adolygiad",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 23,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-NEH",
        "value_en": "Neutral Evaluation Hearing",
        "value_cy": "Gwrandawiad Gwerthusiad Niwtral",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 20,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-IRH",
        "value_en": "Issues Resolution Hearing",
        "value_cy": "Gwrandawiad Datrys Materion",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": null,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-ISO",
        "value_en": "Interim Supervision Order",
        "value_cy": "Gorchymyn Goruchwylio Interim",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": null,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-ICO",
        "value_en": "Interim Care Order",
        "value_cy": "Gorchymyn Gofal Interim",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": null,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-HRA",
        "value_en": "Human Rights Act Application",
        "value_cy": "Cais dan y Ddeddf Hawliau Dynol",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 18,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-DRA",
        "value_en": "Dispute Resolution Appointment",
        "value_cy": "Apwyntiad Datrys Anghydfod",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 11,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-DIR",
        "value_en": "Directions (First/Further)",
        "value_cy": "Cyfarwyddiadau (Cyntaf/Pellach)",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 10,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-PRE",
        "value_en": "Preliminary (REMO)",
        "value_cy": "Rhagarweiniol (REMO)",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": null,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-GRH",
        "value_en": "Ground Rules Hearing",
        "value_cy": "Gwrandawiad rheolau sylfaenol",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 17,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-CHR",
        "value_en": "Celebration hearing",
        "value_cy": "Gwrandawiad Dathlu",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": null,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-2GA",
        "value_en": "2nd Gatekeeping Appointment",
        "value_cy": "2il Apwyntiad Neilltuo",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 16,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-PHR",
        "value_en": "Pre Hearing Review",
        "value_cy": "Adolygiad Cyn Gwrandawiad",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 22,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-COM",
        "value_en": "Committal",
        "value_cy": "Traddodi",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 7,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-CON",
        "value_en": "Conciliation",
        "value_cy": "Cymodi",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 8,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-COS",
        "value_en": "Costs",
        "value_cy": "Costau",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 9,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-PER",
        "value_en": "Permission Hearing",
        "value_cy": "Gwrandawiad Caniatâd",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 21,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-CMC",
        "value_en": "Case Management Conference",
        "value_cy": "Cynhadledd Rheoli Achos",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 5,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    },
    {
        "category_key": "HearingType",
        "key": "ABA5-CMH",
        "value_en": "Case Management Hearing",
        "value_cy": "Gwrandawiad Rheoli Achos",
        "hint_text_en": "",
        "hint_text_cy": "",
        "lov_order": 6,
        "parent_category": "",
        "parent_key": "",
        "active_flag": "Y",
        "child_nodes": null
    }
]
