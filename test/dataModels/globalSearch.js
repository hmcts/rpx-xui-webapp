const { v4 } = require('uuid');

class GlobalSearchDataModel{
    getResults(){
        const resultResponse = {
                resultInfo : {
                caseStartRecord : 1,
                casesReturned : 25,
                moreResultsToGo: true
            },
            results :[]
        }

        for (let i = 0; i <  25 ; i++){
            resultResponse.results.push(this.getCaseResult())
        }
        return resultResponse;
    }

    getCaseResult(){
        return{
                "stateId": "CaseCreated",
                "processForAccess": null,
                "caseReference": v4(),
                "otherReferences": [
                    "FirstNameValue"
                ],
                "caseNameHmctsInternal": "Name Internal",
                "baseLocationId": "123",
                "baseLocationName": null,
                "caseManagementCategoryId": "987",
                "caseManagementCategoryName": "Category label",
                "regionId": "1",
                "regionName": null,
                "CCDJurisdictionId": "BEFTA_MASTER",
                "CCDJurisdictionName": "BEFTA Master",
                "HMCTSServiceId": null,
                "HMCTSServiceShortDescription": null,
                "CCDCaseTypeId": "FT_GlobalSearch",
                "CCDCaseTypeName": "Global Search"
                }
    }
}

module.exports = new GlobalSearchDataModel();

