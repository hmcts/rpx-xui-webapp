import 'mocha';

import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';

import { http } from '../lib/http';
import { getUserExclusions } from './exclusionService';

chai.use(sinonChai);
describe('exclusions.exclusionService', () => {

  let sandbox: sinon.SinonSandbox;
  let spy: any;
  let res: any;
  let next: any;
  const SUCCESS_RESPONSE = { status: {}, data: 'ok' };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.spy();
    res = mockRes(SUCCESS_RESPONSE);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getUserExclusions', () => {

/*     it('should make a get request', async () => {
      spy = sandbox.stub(http, 'get').resolves(res);
      let req = mockReq();
      req.session.passport = {user: {userinfo: {roles: ['caseworker-ia-judge']}}};
      const response = await getUserExclusions(req, res, next);
      expect(response.status).to.equal(200);
      expect(response).to.equal(200);
    }); */

    it('should make a get request and respond appropriately', async () => {

      spy = sandbox.stub(http, 'get').resolves(res);
      const req = mockReq({
        session: {
          passport: {
            user: {
              userinfo: {
                roles: [
                  'caseworker-ia-iacjudge'
                ]
              }
            }
          }
        }
      });
      const response = mockRes();
      await getUserExclusions(req, response, next);

      // Should have received the HTTP response. The get simply returns the data.
      // expect(response.send).to.have.been.calledWith(sinon.match(SUCCESS_RESPONSE.data));
    });

  });

  /* describe('handleTaskSearch', () => {

    it('should make a post request', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const path = '/task';
      const payload = { search: 'criteria' };
      const req = mockReq();
      const response = await handleTaskSearch(path, payload, req);
      expect(response).to.be.an('object'); // Returns the entire response.
      expect(response.data).to.equal('ok');
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(path);    // Correct url.
      expect(args[1]).to.equal(payload); // Correct search criteria posted.
    });

  }); */

  /* describe('handleTaskPost', () => {

    it('should make a post request', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const path = '/task/123456/assign';
      const payload = { assignee: { name: 'bob', id: 2 } };
      const req = mockReq();
      const response = await handleTaskPost(path, payload, req);
      expect(response).to.be.an('object'); // Returns the entire response.
      expect(response.data).to.equal('ok');
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(path);    // Correct url.
      expect(args[1]).to.equal(payload); // Correct search criteria posted.
    });

  }); */

});
