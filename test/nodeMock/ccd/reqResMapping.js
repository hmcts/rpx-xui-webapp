
const ccdMockData = require('./ccdApi');
module.exports = {
    get: {
            '/aggregated/caseworkers/:uid/jurisdictions': (req, res) => {
            res.send(ccdMockData.getJurisdictions());
            },
            '/data/internal/case-types/:jurisdiction/work-basket-inputs': (req, res) => {
                res.send(ccdMockData.getWorkbasketInputs(req.params.jurisdiction));
            },
            '/data/internal/case-types/:jurisdiction/search-inputs': (req, res) => {
                res.send(ccdMockData.getsearchCaseInputs(req.params.jurisdiction));
            },
            '/data/internal/case-types/:jurisdiction/event-triggers/:caseType': (req, res) => {
                res.send(ccdMockData.getSolicitorCreateCaseConfig(req.params.jurisdiction, req.params.caseType));
            },
            '/data/internal/cases/:caseid/event-triggers/:eventId': (req, res) => {
                res.send(ccdMockData.getSingleFieldCaseEventConfig(req.params.eventId));
            },
            '/data/caseworkers/:uid/jurisdictions/:jurisdiction/case-types/:casetype/cases/pagination_metadata': (req, res) => {
                res.send(ccdMockData.getWorkbasketCases());
            },
            '/api/addresses' : (req,res) =>{
                const address = {
                    "header": {
                        "uri": "https://api.ordnancesurvey.co.uk/places/v1/addresses/postcode?postcode=SW1",
                        "query": "postcode=SW1",
                        "offset": 0,
                        "totalresults": 254579,
                        "format": "JSON",
                        "dataset": "DPA",
                        "lr": "EN,CY",
                        "maxresults": 100,
                        "epoch": "81",
                        "output_srs": "EPSG:27700"
                    },
                    results : []
                }

                for(let i = 0 ;i< 10; i++){
                    address.results.push({
                        "DPA": {
                            "UPRN": "12101281"+i,
                            "UDPRN": "2392690"+i,
                            "ADDRESS":`${i}, ALTHORPE MEWS, LONDON, SW1 ${i}PD`,
                            "BUILDING_NUMBER": i,
                            "THOROUGHFARE_NAME": "ALTHORPE MEWS",
                            "POST_TOWN": "LONDON",
                            "POSTCODE": `SW11 ${i}PD`,
                            "RPC": "2",
                            "X_COORDINATE": 526874.0+i,
                            "Y_COORDINATE": 176714.0+i,
                            "STATUS": "APPROVED",
                            "LOGICAL_STATUS_CODE": "1",
                            "CLASSIFICATION_CODE": "RD08",
                            "CLASSIFICATION_CODE_DESCRIPTION": "Sheltered Accommodation",
                            "LOCAL_CUSTODIAN_CODE": 5960,
                            "LOCAL_CUSTODIAN_CODE_DESCRIPTION": "WANDSWORTH",
                            "POSTAL_ADDRESS_CODE": "D",
                            "POSTAL_ADDRESS_CODE_DESCRIPTION": "A record which is linked to PAF",
                            "BLPU_STATE_CODE": null,
                            "BLPU_STATE_CODE_DESCRIPTION": "Unknown/Not applicable",
                            "TOPOGRAPHY_LAYER_TOID": "osgb1000042165547",
                            "LAST_UPDATE_DATE": "13/02/2019",
                            "ENTRY_DATE": "19/03/2002",
                            "LANGUAGE": "EN",
                            "MATCH": 1.0,
                            "MATCH_DESCRIPTION": "EXACT"
                        }
                    });
                }
                res.send(address);
            }
        },
    post: {
            
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
            '/data/internal/searchCases': (req, res) => {
                res.send(ccdMockData.getWorkbasketCases());
            },
        
        }
}
