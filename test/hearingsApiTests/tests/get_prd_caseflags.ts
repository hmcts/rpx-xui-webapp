import {generateAPIRequest,generatePOSTAPIRequest, timeout} from '../utils';
const should = require('chai').should();
const payload = {
  searchString:'pra',
  serviceCode:'BBA3'
};

const payload1 = {"personal_code":["4923393"]};

suite('\'Hearings -> Get Case Flags\'', function() {
  this.timeout(timeout);
  test('GET Case Flags ', () => generateAPIRequest ('GET', '/api/prd/caseFlag/getCaseFlagRefData?serviceId=BBA3')
        .then(response => {
          response.status.should.be.eql(200);
        }));

  test('GET location by epimms', () => generateAPIRequest ('GET', '/api/prd/location/getLocationById?epimms_id=372653')
    .then(response => {
      response.status.should.be.eql(200);
      console.log(response.data)
    }));


  test('GET participants hearing details', () => generateAPIRequest ('GET', '/api/prd/lov/getLovRefData?category=HearingChannel&service=BBA3&isChildRequired=N')
    .then(response => {
      response.status.should.be.eql(200);
    }));

  test('GET Panel Member details', () => generateAPIRequest ('GET', '/api/prd/lov/getLovRefData?category=PanelMemberType&service=BBA3&isChildRequired=Y')
    .then(response => {
      response.status.should.be.eql(200);
    }));

  test('POST Judicial Search', () => generatePOSTAPIRequest ('POST', '/api/prd/judicial/getJudicialUsersSearch', payload)
    .then(response => {
      response.status.should.be.eql(200);
    }));

  test('GET participants hearing details', () => generateAPIRequest ('GET', '/api/prd/lov/getLovRefData?category=PanelMemberType&service=BBA3&isChildRequired=Y')
    .then(response => {
      response.status.should.be.eql(200);
    }));

  test('GET participants hearing details', () => generateAPIRequest ('GET', '/api/prd/lov/getLovRefData?category=HearingPriority&service=BBA3&isChildRequired=N')
    .then(response => {
      response.status.should.be.eql(200);
    }));

  test('POST search Judicial by personal codes', () => generatePOSTAPIRequest ('POST', '/api/prd/judicial/searchJudicialUserByPersonalCodes', payload1)
    .then(response => {
      response.status.should.be.eql(200);
    }));

});
