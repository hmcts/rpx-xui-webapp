import 'mocha';

import * as chai from 'chai'
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock';

import { http } from '../lib/http';
import { handleLocationGet } from './locationService';

chai.use(sinonChai);
describe('Location Service', () => {

  let sandbox: sinon.SinonSandbox;
  let spy: any;
  const res = mockRes({ status: 200, data: 'ok' });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('handleLocationGet()', () => {

    it('should make a get request', async () => {

      spy = sandbox.stub(http, 'get').resolves(res);
      const path = '/location';
      const req = mockReq();

      await handleLocationGet(path, req);

      const args = spy.getCall(0).args;

      expect(args[0]).to.equal(path);
    });
  });

});
