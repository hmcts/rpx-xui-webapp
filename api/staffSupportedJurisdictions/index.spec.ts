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
  const expectedJurisdictions = () => getConfigValue(STAFF_SUPPORTED_JURISDICTIONS).split(',');

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = mockRes();
    req = mockReq({});
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should get supported jurisdictions', async () => {
    await staffSupportedJurisdictions.getStaffSupportedJurisdictions(req, res, null);
    expect(res.send).to.have.been.calledWith(sinon.match(expectedJurisdictions()));
  });

  it('should get only the list of supported jurisdictions', async () => {
    const jurisdictionList = staffSupportedJurisdictions.getStaffSupportedJurisdictionsList();
    expect(jurisdictionList).to.deep.equal(expectedJurisdictions());
  });
});
