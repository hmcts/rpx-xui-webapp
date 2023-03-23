import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { getServicesRefData } from './index';
import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_REF_API_URL } from '../configuration/references';

chai.use(sinonChai);

const baseLocationRefUrl = getConfigValue(SERVICES_LOCATION_REF_API_URL);

describe('getServicesRefData', () => {
  let req: any;
  let res: any;
  let next: any;
  let sendGetStub: sinon.SinonStub<any, any>;

  before(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.spy(),
    };
    next = sinon.spy();
    sendGetStub = sinon.stub().resolves({status: 200, data: []});
  });

  afterEach(() => {
    sinon.reset();
  });
});
