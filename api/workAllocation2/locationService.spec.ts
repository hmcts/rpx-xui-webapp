import * as chai from 'chai';
import {expect} from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import {mockReq, mockRes} from 'sinon-express-mock';
import {ALL_LOCATIONS} from './constants/locations';
import {handleLocationGet} from './locationService';

chai.use(sinonChai);
describe('Location Service', () => {

  let sandbox: sinon.SinonSandbox;
  const res = mockRes({status: 200, data: ALL_LOCATIONS});

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('handleLocationGet()', () => {

    it('should make a get request', async () => {
      const path = '/location';
      const req = mockReq();

      const {data} = await handleLocationGet(path, req);
      expect(data).to.equal(ALL_LOCATIONS);
    });
  });

});
