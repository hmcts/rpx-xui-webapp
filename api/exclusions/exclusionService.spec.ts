import 'mocha';

import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';

import { http } from '../lib/http';
import { confirmUserExclusion, deleteUserExclusion, getUserExclusions } from './exclusionService';

chai.use(sinonChai);
describe('exclusions.exclusionService', () => {

  let sandbox: sinon.SinonSandbox;
  let spy: any;
  let res: any;
  let next: any;
  const SUCCESS_RESPONSE = { status: {}, data: 'ok' };
  const exampleRoleExclusion = {
    added: Date.UTC(2021, 7, 1),
    name: 'Judge Birch',
    notes: 'this case been remitted from Upper Tribunal and required different judge',
    type: 'Other',
    userType: 'Judicial',
  };
  const confirmRoleExclusion = {
    added: Date.UTC(2021, 7, 1),
    name: 'Judge ABCDE',
    notes: 'this case been remitted from Upper Tribunal and required different judge',
    type: 'Other',
    userType: 'Judicial'
  }

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.spy();
    res = mockRes(SUCCESS_RESPONSE);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getUserExclusions', () => {

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
      let response = mockRes();
      await getUserExclusions(req, response, next);

      // Should have received the HTTP response. The get simply returns the data.
      expect(response.send).to.have.been.calledWith(sinon.match([exampleRoleExclusion]));

      const nonJudgeReq = mockReq({
        session: {
          passport: {
            user: {
              userinfo: {
                roles: [
                  'caseworker'
                ]
              }
            }
          }
        }
      });
      response = mockRes();
      await getUserExclusions(nonJudgeReq, response, next);
      // Should have received the HTTP response. The get simply returns the data.
      expect(response.send).to.have.been.calledWith(sinon.match([]));
    });

  });

  describe('confirmUserExclusion', () => {

    it('should confirm succesfully', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const req = mockReq({});
      let response = mockRes();
      await confirmUserExclusion(req, response, next);

      // Should have received the HTTP response. The confirm simply sends the data
      expect(response.send).to.have.been.calledWith(sinon.match([confirmRoleExclusion]));

      const nonJudgeReq = mockReq({
        body: {
          roleExclusion: exampleRoleExclusion,
          exclusionDescription: '400'
        }
      });
      response = mockRes();
      await confirmUserExclusion(nonJudgeReq, response, next);
      // The confirm simply returns the error data.
      expect(response.send).to.have.been.calledWith(sinon.match('error: {status: 400}'));
    });

  });

  describe('deleteUserExclusion', () => {

    it('should delete succesfully', async () => {
      spy = sandbox.stub(http, 'delete').resolves(res);
      const req = mockReq({
        body: {roleExclusion: exampleRoleExclusion}
      });
      let response = mockRes();
      await deleteUserExclusion(req, response, next);

      // Should have received the HTTP response. The delete simply sends the data
      expect(response.send).to.have.been.calledWith(sinon.match(exampleRoleExclusion));

      const nonJudgeReq = mockReq({
        body: {
          roleExclusion: exampleRoleExclusion,
          exclusionDescription: '400'
        }
      });
      response = mockRes();
      await deleteUserExclusion(nonJudgeReq, response, next);
      // The delete simply returns the error data.
      expect(response.send).to.have.been.calledWith(sinon.match('error: {status: 400}'));
    });

  });

});
