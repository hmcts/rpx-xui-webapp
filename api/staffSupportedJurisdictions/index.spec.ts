import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { getConfigValue } from '../configuration';
import { STAFF_SUPPORTED_JURISDICTIONS } from '../configuration/references';
import * as staffSupportedJurisdictions from './index';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Staff Supported Jurisdictions', () => {
  let sandbox;
  let res;
  let req;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = mockRes();
    req = mockReq({});
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should get supported jurisdictions', async() => {
    await staffSupportedJurisdictions.getStaffSupportedJurisdictions(req, res, null);
    // note: CMC not included for caseworker errors
    const response = getConfigValue<string>(STAFF_SUPPORTED_JURISDICTIONS)
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    expect(res.send).to.have.been.calledWith(sinon.match(response));
  });

  it('should get only the list of supported jurisdictions', async() => {
    const jurisdictionList = staffSupportedJurisdictions.getStaffSupportedJurisdictionsList();
    const expected = getConfigValue<string>(STAFF_SUPPORTED_JURISDICTIONS)
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    expect(jurisdictionList).to.deep.equal(expected);
  });
});
