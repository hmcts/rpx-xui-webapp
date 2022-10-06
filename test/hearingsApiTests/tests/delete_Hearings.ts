import {generateDeleteRequest,generateApiHearingIdValue,timeout} from '../utils';
import {generateAPIRequest} from "../utils/generateAPI";
import {generatePOSTAPIRequest} from "../utils/generatePOSTAPIRequest";
const should = require('chai').should();

var hearingID; var count=0;
const payload = {"cancellationReasonCodes":["exclusio"]};

suite('\'Hearings -> DELETE Hearing details\'', function() {
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

  test('Delete Hearing Request', () => generateDeleteRequest('DELETE', '/api/hearings/cancelHearings?hearingId='+hearingID, payload)
      //console.log('response', response.headers.get('cache-control'))
        .then(response => {
          if(! response.status.should.be.eql(200))
          { console.log("NO HEARINGS TO CANCEL");
           // assert.fail()
          }
        }));
    });

