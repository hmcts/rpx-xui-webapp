import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { getUsers, getCases, assignCases } from './stub-api';

chai.use(sinonChai);

describe('Case Share Stub API', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = mockRes();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getUsers', () => {
    it('should return all users when empty search text is provided', () => {
      req = mockReq({
        query: { q: '' }
      });

      getUsers(req, res);

      expect(res.send).to.have.been.calledOnce;
      const users = res.send.getCall(0).args[0];
      expect(users).to.be.an('array');
      expect(users).to.have.lengthOf(4);
      // Empty string matches all users since indexOf('') >= 0 for any string
    });

    it('should filter users by idamId', () => {
      req = mockReq({
        query: { q: 'u111111' }
      });

      getUsers(req, res);

      expect(res.send).to.have.been.calledOnce;
      const users = res.send.getCall(0).args[0];
      expect(users).to.have.lengthOf(1);
      expect(users[0]).to.have.property('idamId', 'u111111');
    });

    it('should filter users by firstName (case insensitive)', () => {
      req = mockReq({
        query: { q: 'steve' }
      });

      getUsers(req, res);

      expect(res.send).to.have.been.calledOnce;
      const users = res.send.getCall(0).args[0];
      expect(users).to.have.lengthOf(1);
      expect(users[0]).to.have.property('firstName', 'Steve');
    });

    it('should filter users by lastName (case insensitive)', () => {
      req = mockReq({
        query: { q: 'ELLIOTT' }
      });

      getUsers(req, res);

      expect(res.send).to.have.been.calledOnce;
      const users = res.send.getCall(0).args[0];
      expect(users).to.have.lengthOf(1);
      expect(users[0]).to.have.property('lastName', 'Elliott');
    });

    it('should filter users by email', () => {
      req = mockReq({
        query: { q: '@woodford.com' }
      });

      getUsers(req, res);

      expect(res.send).to.have.been.calledOnce;
      const users = res.send.getCall(0).args[0];
      expect(users).to.have.lengthOf(4);
      users.forEach((user: any) => {
        expect(user.email).to.include('@woodford.com');
      });
    });

    it('should return 404 when no users match search criteria', () => {
      req = mockReq({
        query: { q: 'nonexistent' }
      });

      getUsers(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.send).to.have.been.calledWith('{"errorMessage": "User is not found}"');
    });

    it('should handle partial matches in search', () => {
      req = mockReq({
        query: { q: 'har' }
      });

      getUsers(req, res);

      expect(res.send).to.have.been.calledOnce;
      const users = res.send.getCall(0).args[0];
      expect(users).to.have.lengthOf(1);
      expect(users[0]).to.have.property('lastName', 'Harrison');
    });
  });

  describe('getCases', () => {
    it('should return all shared cases', () => {
      req = mockReq({});

      getCases(req, res);

      expect(res.send).to.have.been.calledOnce;
      const cases = res.send.getCall(0).args[0];
      expect(cases).to.be.an('array');
      expect(cases.length).to.be.greaterThan(0);
      expect(cases[0]).to.have.property('caseId');
      expect(cases[0]).to.have.property('caseTitle');
      expect(cases[0]).to.have.property('sharedWith');
    });
  });

  describe('assignCases', () => {
    it('should successfully assign case to user u222222', () => {
      req = mockReq({
        body: {
          sharedCases: [
            {
              caseId: 'case-123',
              caseTitle: 'Test Case',
              sharedWith: [],
              pendingShares: [
                {
                  idamId: 'u222222',
                  firstName: 'Steve',
                  lastName: 'Harrison',
                  email: 'steve@test.com'
                }
              ]
            }
          ]
        }
      });

      assignCases(req, res);

      expect(res.send).to.have.been.calledOnce;
      const updatedCases = res.send.getCall(0).args[0];
      expect(updatedCases).to.have.lengthOf(1);
      expect(updatedCases[0].sharedWith).to.have.lengthOf(1);
      expect(updatedCases[0].sharedWith[0]).to.have.property('idamId', 'u222222');
      expect(updatedCases[0].pendingShares).to.have.lengthOf(0);
    });

    it('should keep user u333333 in pending shares', () => {
      req = mockReq({
        body: {
          sharedCases: [
            {
              caseId: 'case-123',
              caseTitle: 'Test Case',
              sharedWith: [],
              pendingShares: [
                {
                  idamId: 'u333333',
                  firstName: 'James',
                  lastName: 'Priest',
                  email: 'james@test.com'
                }
              ]
            }
          ]
        }
      });

      assignCases(req, res);

      expect(res.send).to.have.been.calledOnce;
      const updatedCases = res.send.getCall(0).args[0];
      expect(updatedCases).to.have.lengthOf(1);
      expect(updatedCases[0].sharedWith).to.have.lengthOf(0);
      expect(updatedCases[0].pendingShares).to.have.lengthOf(1);
      expect(updatedCases[0].pendingShares[0]).to.have.property('idamId', 'u333333');
    });

    it('should return 500 for any other user ID', () => {
      req = mockReq({
        body: {
          sharedCases: [
            {
              caseId: 'case-123',
              caseTitle: 'Test Case',
              sharedWith: [],
              pendingShares: [
                {
                  idamId: 'u999999',
                  firstName: 'Unknown',
                  lastName: 'User',
                  email: 'unknown@test.com'
                }
              ]
            }
          ]
        }
      });

      assignCases(req, res);

      expect(res.sendStatus).to.have.been.calledWith(500);
      expect(res.send).to.not.have.been.called;
    });

    it('should handle multiple cases with mixed user IDs', () => {
      req = mockReq({
        body: {
          sharedCases: [
            {
              caseId: 'case-123',
              caseTitle: 'Test Case 1',
              sharedWith: [],
              pendingShares: [
                {
                  idamId: 'u222222',
                  firstName: 'Steve',
                  lastName: 'Harrison'
                }
              ]
            },
            {
              caseId: 'case-456',
              caseTitle: 'Test Case 2',
              sharedWith: [],
              pendingShares: [
                {
                  idamId: 'u333333',
                  firstName: 'James',
                  lastName: 'Priest'
                }
              ]
            }
          ]
        }
      });

      assignCases(req, res);

      expect(res.send).to.have.been.calledOnce;
      const updatedCases = res.send.getCall(0).args[0];
      expect(updatedCases).to.have.lengthOf(2);

      // First case should have u222222 moved to sharedWith
      expect(updatedCases[0].sharedWith).to.have.lengthOf(1);
      expect(updatedCases[0].pendingShares).to.have.lengthOf(0);

      // Second case should keep u333333 in pendingShares
      expect(updatedCases[1].sharedWith).to.have.lengthOf(0);
      expect(updatedCases[1].pendingShares).to.have.lengthOf(1);
    });

    it('should preserve existing sharedWith users', () => {
      req = mockReq({
        body: {
          sharedCases: [
            {
              caseId: 'case-123',
              caseTitle: 'Test Case',
              sharedWith: [
                {
                  idamId: 'u111111',
                  firstName: 'Joe',
                  lastName: 'Elliott'
                }
              ],
              pendingShares: [
                {
                  idamId: 'u222222',
                  firstName: 'Steve',
                  lastName: 'Harrison'
                }
              ]
            }
          ]
        }
      });

      assignCases(req, res);

      expect(res.send).to.have.been.calledOnce;
      const updatedCases = res.send.getCall(0).args[0];
      expect(updatedCases[0].sharedWith).to.have.lengthOf(2);
      expect(updatedCases[0].sharedWith[0]).to.have.property('idamId', 'u111111');
      expect(updatedCases[0].sharedWith[1]).to.have.property('idamId', 'u222222');
    });

    it('should handle empty pendingShares array', () => {
      req = mockReq({
        body: {
          sharedCases: [
            {
              caseId: 'case-123',
              caseTitle: 'Test Case',
              sharedWith: [],
              pendingShares: []
            }
          ]
        }
      });

      assignCases(req, res);

      expect(res.send).to.have.been.calledOnce;
      const updatedCases = res.send.getCall(0).args[0];
      expect(updatedCases).to.have.lengthOf(1);
      expect(updatedCases[0].sharedWith).to.have.lengthOf(0);
      expect(updatedCases[0].pendingShares).to.have.lengthOf(0);
    });

    it('should preserve other properties in shared cases', () => {
      req = mockReq({
        body: {
          sharedCases: [
            {
              caseId: 'case-123',
              caseTitle: 'Test Case',
              customProperty: 'custom value',
              sharedWith: [],
              pendingShares: [
                {
                  idamId: 'u222222',
                  firstName: 'Steve',
                  lastName: 'Harrison'
                }
              ]
            }
          ]
        }
      });

      assignCases(req, res);

      expect(res.send).to.have.been.calledOnce;
      const updatedCases = res.send.getCall(0).args[0];
      expect(updatedCases[0]).to.have.property('customProperty', 'custom value');
    });
  });
});
