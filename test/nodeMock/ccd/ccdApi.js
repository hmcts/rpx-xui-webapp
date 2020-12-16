
const caseworkerJurisdictions  = require("./caseworkerJurisdictions");
const {divorce, probate, ia, publicLaw} = require('./workBasketInputs');

const divorceCreateCaseConfig = require('./solicitorCreate/divorceCaseCreateConfig');
const frConsentedCreaCaseConfig = require('./solicitorCreate/frConsentedConfig');
const frContestedCreaCaseConfig = require('./solicitorCreate/frContestedConfig');

const probateGrantOfRepresentationConfig = require('./solicitorCreate/probateGrantOfRepresentationConfig');
const probateCreateCaveatConfig = require('./solicitorCreate/probateCreateCaveatConfig');

const iaCreateConfig = require('./solicitorCreate/iaCreateConfig');

const fplTribunalConfig = require('./solicitorCreate/fplTribunalCreateConfig');

const fplCareSupervisionConfig = require('./solicitorCreate/fplCareSupervision');

const exuiTestCaseType = require('./solicitorCreate/exuiTestCaseType');
const { isArray } = require("core-js/fn/array");
const CCDCaseConfig = require('./ccdCaseConfig/caseCreateConfigGenerator');




class CCDApi{

    getJurisdictions(){
        return caseworkerJurisdictions; 
    }

    getWorkbasketInputs(jurisdiction){
        let workbasketInputs = publicLaw;
        switch (jurisdiction){
            case 'DIVORCE':
                workbasketInputs = divorce;
                break;
            case 'GrantOfRepresentation':
                workbasketInputs = probate;
                break;
            case 'Asylum':
                workbasketInputs = ia;
                break
            case 'TRIB_MVP_3_TYPE':
                workbasketInputs = publicLaw;
                break;
        }
        return workbasketInputs;
    }

    getSolicitorCreateCaseConfig(caseType,event){
        if (caseType === 'DIVORCE'){
            return divorceCreateCaseConfig; 
       } 
        if (caseType === 'FinancialRemedyMVP2' && event === 'FR_solicitorCreate'){
            return frConsentedCreaCaseConfig; 
       }
        if (caseType === 'FinancialRemedyContested' && event === 'FR_solicitorCreate') {
            return frContestedCreaCaseConfig;
        }

        if (caseType === 'GrantOfRepresentation' && event === 'solicitorCreateApplication') {
            return probateGrantOfRepresentationConfig;
        }

        if (caseType === 'Caveat' && event === 'solicitorCreateCaveat') {
            return probateCreateCaveatConfig;
        }

        if (caseType === 'Asylum' && event === 'startAppeal') {
            return iaCreateConfig;
        }



        if (caseType === 'TRIB_MVP_3_TYPE' && event === 'initiateCase') {
            return fplTribunalConfig;
        }

        if (caseType === 'CARE_SUPERVISION_EPO' && event === 'openCase') {
            return fplCareSupervisionConfig;
        }

        if (caseType === 'casetype_1' ) {
            return exuiTestCaseType;
        }
    }

    get(){
        return {
            '/aggregated/caseworkers/:uid/jurisdictions': (req, res) => {
                res.send(this.getJurisdictions());
            },
            '/data/internal/case-types/:jurisdiction/work-basket-inputs': (req, res) => {
                res.send(this.getWorkbasketInputs(req.params.jurisdiction));
            },
            '/data/internal/case-types/:jurisdiction/event-triggers/:caseType': (req, res) => {
                res.send(this.getSolicitorCreateCaseConfig(req.params.jurisdiction, req.params.caseType));
            },
            '/data/internal/cases/:caseid/event-triggers/:eventId': (req, res) => {
                res.send(getSingleFieldCaseEventConfig(req.params.eventId));
            }
        }
    }

    post(){
        return {
            '/api/inviteUser': (req, res) => {
                res.send({ "userIdentifier": "97ecc487-cdeb-42a8-b794-84840a4testc", "idamStatus": null });
            },
            '/data/case-types/:caseType/validate': (req, res) => {
                const responseBody = {
                    data: req.body.data,
                    "_links": { "self": { "href": "http://ccd-data-store-api-demo.service.core-compute-demo.internal" + req.path + "?pageId=" + req.query.pageId } }
                }
                res.send(responseBody)
            },
            '/data/case-types/:caseType/cases': (req, res) => {
                const responseBody = {
                    id: Date.now(),
                    data: req.body.data,
                    "_links": { "self": { "href": "http://ccd-data-store-api-demo.service.core-compute-demo.internal" + req.path + "?ignore-warning=false" } }
                }
                res.send(responseBody)
            },
            '/data/cases/:caseid/events': (req, res) => {
                const responseBody = {
                    id: Date.now(),
                    data: req.body.data,
                    "_links": { "self": { "href": "http://ccd-data-store-api-demo.service.core-compute-demo.internal" + req.path + "?ignore-warning=false" } }
                }
                res.send(responseBody);
            }, 
        }
    }
}

module.exports = new CCDApi();



function getSingleFieldCaseEventConfig(eventId){
    const caseConfigGenerator =  new CCDCaseConfig();
    const eventConfig = {
        eventId: eventId,
        pages:[
            {
                pageId: eventId+'_1',
                fields:[]
            }
        ]
    }

    switch (eventId){
        case "text":
            eventConfig.pages[0].fields.push({ type: "Text" , id: "simpletext",value:"Sample test text value ABC"});
            break;
        case "dynamicList":
            const listItems = [
                {"code": "item1","label": "Item 1"},
                { "code": "item2", "label": "Item 2" },
                { "code": "item3", "label": "Item 3" },               
            ]
            eventConfig.pages[0].fields.push({
                type: "DynamicList", id: "dynamicListField", value: {"value": listItems[2],"list_items": listItems} 
            });
            eventConfig.pages[0].fields.push({
                type: "Complex", id: "dynamicListInComplexField", complexFields : [
                    { type: "DynamicList", id: "dynamicListField", label: "Field Dynamic list"}
                ] 
                , value: { "dynamicListField" : {  "value": listItems[2], "list_items": listItems }}
            });
            break;
    }

    return caseConfigGenerator.getCaseConfig(eventConfig);
}



