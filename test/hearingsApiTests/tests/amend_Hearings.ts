import {generateAPIRequest,generatePOSTAPIRequest,generateApiHearingIdValue,timeout} from '../utils';

const should = require('chai').should();
const payload = {
  "hearingDetails": {
    "duration": 60,
    "hearingType": "BBA3-SUB",
    "hearingLocations": [
      {
        "locationType": "court",
        "locationId": "372653",
        "locationName": "CARDIFF SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL",
        "region": "Wales"
      }
    ],
    "hearingIsLinkedFlag": true,
    "hearingWindow": {
      "dateRangeStart": "2022-10-20T00:00:00.000Z",
      "dateRangeEnd": null
    },
    "privateHearingRequiredFlag": false,
    "panelRequirements": {
      "roleType": [
        "58"
      ],
      "panelPreferences": [
        {
          "memberID": "4923393",
          "memberType": "JUDGE",
          "requirementType": "MUSTINC"
        }
      ],
      "panelSpecialisms": [
        "3"
      ]
    },
    "autolistFlag": false,
    "hearingPriorityType": "Standard",
    "numberOfPhysicalAttendees": 2,
    "hearingInWelshFlag": false,
    "facilitiesRequired": [],
    "listingComments": null,
    "hearingRequester": null,
    "leadJudgeContractType": null,
    "amendReasonCodes": null,
    "hearingChannels": [
      "INTER"
    ],
    "listingAutoChangeReasonCode": null
  },
  "caseDetails": {
    "hmctsServiceCode": "BBA3",
    "caseRef": "1656073414018376",
    "requestTimeStamp": null,
    "hearingID": null,
    "caseDeepLink": "https://manage-case.demo.platform.hmcts.net/cases/case-details/1656073414018376",
    "hmctsInternalCaseName": "Tlzfgpip Iohispip",
    "publicCaseName": "Tlzfgpip Iohispip",
    "caseAdditionalSecurityFlag": false,
    "caseInterpreterRequiredFlag": false,
    "caseCategories": [
      {
        "categoryType": "caseType",
        "categoryValue": "BBA3-002"
      },
      {
        "categoryType": "caseSubType",
        "categoryValue": "BBA3-002CE",
        "categoryParent": "BBA3-002"
      }
    ],
    "caseManagementLocationCode": "372653",
    "caserestrictedFlag": false,
    "caseSLAStartDate": "2022-06-22"
  },
  "partyDetails": [
    {
      "partyID": "1",
      "partyType": "IND",
      "partyRole": "APEL",
      "partyName": "Tlzfgpip Iohispip",
      "individualDetails": {
        "firstName": "Tlzfgpip",
        "lastName": "Iohispip",
        "preferredHearingChannel": "INTER",
        "interpreterLanguage": null,
        "reasonableAdjustments": [],
        "relatedParties": [],
        "title": null,
        "vulnerabilityDetails": null
      },
      "unavailabilityDOW": [],
      "unavailabilityRanges": []
    },
    {
      "partyID": "3",
      "partyType": "IND",
      "partyRole": "RPTT",
      "partyName": "test org",
      "individualDetails": {
        "firstName": "test",
        "lastName": "org",
        "preferredHearingChannel": "INTER",
        "interpreterLanguage": null,
        "reasonableAdjustments": [],
        "relatedParties": [
          {
            "relationshipType": "11",
            "relatedPartyID": "1"
          }
        ],
        "title": null,
        "vulnerabilityDetails": null
      },
      "unavailabilityDOW": [],
      "unavailabilityRanges": []
    }
  ]
}

suite('\'Hearings -> Get Hearing details\'', function() {
  this.timeout(timeout);
  // test('GET Hearing details', () => generateAPIRequest ('GET', '/api/hearings/getHearings?caseId=1656073414018376')
  //    // console.log('response', response.headers.get('cache-control'))
  //       .then(response => {
  //         response.status.should.be.eql(200);
  //       }));


  test('PUT Update Hearing Request', () => generateApiHearingIdValue ())
  // console.log('response', response.headers.get('cache-control'))
  //   .then(response => {
  //     response.status.should.be.eql(201);
  //   }));
});
