import {generateAPIRequest, timeout} from '../utils';
const should = require('chai').should();

suite('\'Hearings -> Get Case Flags\'', function() {
  this.timeout(timeout);
  test('GET Case Flags ', () => generateAPIRequest ('GET', '/api/prd/caseFlag/getCaseFlagRefData?serviceId=BBA3')
     // console.log('response', response.headers.get('cache-control'))
        .then(response => {
          response.status.should.be.eql(200);
        }));

  test('GET location by epimms', () => generateAPIRequest ('GET', '/api/prd/location/getLocationById?epimms_id=196538')
  // console.log('response', response.headers.get('cache-control'))
    .then(response => {
      response.status.should.be.eql(200);
      console.log(response.data)
    }));
});
