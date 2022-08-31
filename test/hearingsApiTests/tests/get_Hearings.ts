import {generateAPIRequest,generatePOSTAPIRequest, timeout} from '../utils';
const should = require('chai').should();

suite('\'Hearings -> Get Hearing details\'', function() {
  this.timeout(timeout);
  test('GET Hearing details', () => generateAPIRequest ('GET', '/api/hearings/getHearings?caseId=1546517036278754')
     // console.log('response', response.headers.get('cache-control'))
        .then(response => {
          response.status.should.be.eql(200);
        }));

  test('GET Hearing details', () => generateAPIRequest ('GET', '/api/hearings/getHearing?hearingId=2000000019')
  // console.log('response', response.headers.get('cache-control'))
    .then(response => {
      response.status.should.be.eql(200);
    }));


  // test('GET Linked Cases', () => generateAPIRequest ('POST', '/api/hearings/loadServiceLinkedCases')
  // // console.log('response', response.headers.get('cache-control'))
  //   .then(response => {
  //     response.status.should.be.eql(200);
  //   }));
  //
  // test('POST Submit Hearing Request', () => generateAPIRequest ('POST', '/api/hearings/submitHearingRequest')
  // // console.log('response', response.headers.get('cache-control'))
  //   .then(response => {
  //     response.status.should.be.eql(200);
  //   }));
});
