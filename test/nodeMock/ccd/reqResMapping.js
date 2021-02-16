
const ccdMockData = require('./ccdApi');
module.exports = {
    get: {
            '/aggregated/caseworkers/:uid/jurisdictions': (req, res) => {
            res.send(ccdMockData.getJurisdictions());
            },
            '/data/internal/case-types/:jurisdiction/work-basket-inputs': (req, res) => {
                res.send(ccdMockData.getWorkbasketInputs(req.params.jurisdiction));
            },
            '/data/internal/case-types/:jurisdiction/event-triggers/:caseType': (req, res) => {
                res.send(ccdMockData.getSolicitorCreateCaseConfig(req.params.jurisdiction, req.params.caseType));
            },
            '/data/internal/cases/:caseid/event-triggers/:eventId': (req, res) => {
                res.send(ccdMockData.getSingleFieldCaseEventConfig(req.params.eventId));
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
        
        }
}
