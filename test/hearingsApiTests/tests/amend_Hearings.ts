import {
  generateAPIRequest,
  timeout,
  generatePUTAPIRequest
} from '../utils';

const should = require('chai').should();
var hearingID; var count=0;
const payload = {
  "requestDetails": {
  "status": "AWAITING_LISTING",
    "timestamp": "2022-10-03T15:21:51.26347",
    "versionNumber": 1,
    "hearingRequestID": hearingID
},
  "hearingDetails": {
  "hearingType": "BBA3-SUB",
    "hearingWindow": {
    "dateRangeStart": "2022-10-20T00:00:00.000Z",
      "dateRangeEnd": null
  },
  "duration": 120,
    "hearingPriorityType": "Standard",
    "numberOfPhysicalAttendees": 2,
    "hearingInWelshFlag": false,
    "hearingLocations": [
    {
      "locationType": "court",
      "locationId": "372653"
    }
  ],
    "privateHearingRequiredFlag": false,
    "panelRequirements": {
    "roleType": [
      "58"
    ],
      "authorisationTypes": [],
      "authorisationSubType": [],
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
  "hearingIsLinkedFlag": true,
    "hearingChannels": [
    "INTER"
  ],
    "autolistFlag": false,
    "amendReasonCodes": [
    "judgereq"
  ]
},
  "caseDetails": {
  "hmctsServiceCode": "BBA3",
    "caseRef": "1656073414018376",
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
    "individualDetails": {
      "title": null,
      "firstName": "Tlzfgpip",
      "lastName": "Iohispip",
      "preferredHearingChannel": "INTER",
      "interpreterLanguage": null,
      "reasonableAdjustments": [],
      "vulnerableFlag": null,
      "vulnerabilityDetails": null,
      "hearingChannelEmail": [],
      "hearingChannelPhone": [],
      "relatedParties": [],
      "custodyStatus": null,
      "otherReasonableAdjustmentDetails": null
    }
  },
  {
    "partyID": "3",
    "partyType": "IND",
    "partyRole": "RPTT",
    "individualDetails": {
      "title": null,
      "firstName": "test",
      "lastName": "org",
      "preferredHearingChannel": "INTER",
      "interpreterLanguage": null,
      "reasonableAdjustments": [],
      "vulnerableFlag": null,
      "vulnerabilityDetails": null,
      "hearingChannelEmail": [],
      "hearingChannelPhone": [],
      "relatedParties": [
        {
          "relatedPartyID": "1",
          "relationshipType": "11"
        }
      ],
      "custodyStatus": null,
      "otherReasonableAdjustmentDetails": null
    }
  }
],
  "hearingResponse": {}
};


suite('\'Hearings -> AMEND Hearing details\'', function() {
  this.timeout(timeout);

  test('GET Hearing details', () => generateAPIRequest ('GET', '/api/hearings/getHearings?caseId=1656073414018376')
  // console.log('response', response.headers.get('cache-control'))
    .then(response => {
      const len= response.data.caseHearings.length;
      for (let optionCounter = 0; optionCounter < len; optionCounter++) {
        if( response.data.caseHearings[optionCounter].exuiDisplayStatus == 'WAITING TO BE LISTED')
        {  console.log(response.data.caseHearings[optionCounter].exuiDisplayStatus);
          hearingID = response.data.caseHearings[optionCounter].hearingID;
          count ++  }
        else if (count==0) {(console.log("NO HEARINGS TO CANCEL"));
          hearingID=''}
      }
      console.log(hearingID);
      console.log('Count'+ count);
    }));

  test('Amend Hearing Request', () => generatePUTAPIRequest('PUT', '/api/hearings/updateHearingRequest?hearingId='+hearingID, payload)
  //console.log('response', response.headers.get('cache-control'))
    .then(response => {
      if(! response.status.should.be.eql(201))
      { console.log("NO HEARINGS TO CANCEL");}
    }));
});
