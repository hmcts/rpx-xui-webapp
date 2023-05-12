
const { v4 } = require('uuid');


class GlobalSearch{


    getDefaultResponse(){
       console.log( '~~~~~~~~~~~~~~~~   inside of the getDefaultResponse() method call  ')
       return this.getGlobalSearchResponseTemplate()
    }


    getGlobalSearchResponseTemplate(){

      console.log( '~~~~~~~~~~~~~~~~   inside NEWWWWWW  the getGlobalSearchResponseTemplate() method call  ')

      const globalSearchResponse =
        {"resultInfo":{
            "casesReturned":1,
            "caseStartRecord":1,
            "moreResulsToGo":false
          },
        "results":[
            {
              "stateId": "JUDICIAL_REFERRAL",
              "processForAccess": "NONE",
              "caseReference": "1681990487528503",
              "otherReferences": [
                "011DC837"
              ],
              "caseNameHmctsInternal": "Test Inc v Sir John Doe",
              "baseLocationId": "229786",
              "baseLocationName": "Barnet Civil and Family Courts Centre",
              "caseManagementCategoryId": "Civil",
              "caseManagementCategoryName": "Civil",
              "regionId": "1",
              "regionName": "London",
              "CCDJurisdictionId": "CIVIL",
              "CCDJurisdictionName": "Civil",
              "HMCTSServiceId": "AAA7",
              "HMCTSServiceShortDescription": "Damages",
              "CCDCaseTypeId": "CIVIL",
              "CCDCaseTypeName": "Civil"
            }
        ]};
      return globalSearchResponse;
    }


    getCaseDataWithRowCountOf(count){
      let caseResultRows = new Array();

      // populate the results[] with the caseData
      for (let i = 0; i <  count ; i++){
        caseResultRows.push(this.getCaseResult())
      }
      console.log(`.....~~~~~~~~~ Number of Rows in the caseResult is  === ${caseResultRows}  `);

      const globalSearchResponse =
      {
        "resultInfo":{
          "casesReturned":count,
          "caseStartRecord":1,
          "moreResulsToGo":false
      },
        "results":caseResultRows
      };

      return globalSearchResponse;
    }


    getCaseResult(){
      const oneCaseResult =
      {
        "stateId": "JUDICIAL_REFERRAL",
        "processForAccess": "NONE",
        "caseReference": "1681990487528503",
        "otherReferences": [
        "011DC837"
      ],
        "caseNameHmctsInternal": "Test Inc v Sir John Doe",
        "baseLocationId": "229786",
        "baseLocationName": "Barnet Civil and Family Courts Centre",
        "caseManagementCategoryId": "Civil",
        "caseManagementCategoryName": "Civil",
        "regionId": "1",
        "regionName": "London",
        "CCDJurisdictionId": "CIVIL",
        "CCDJurisdictionName": "Civil",
        "HMCTSServiceId": "AAA7",
        "HMCTSServiceShortDescription": "Damages",
        "CCDCaseTypeId": "CIVIL",
        "CCDCaseTypeName": "Civil"
      }
      return oneCaseResult;

    }
}

module.exports = new GlobalSearch();
