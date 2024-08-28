import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { getPossibleRoles, getRoleByAssignmentId, getAllRoles } from './roleAssignmentService';
import { EnhancedRequest } from '../lib/models';
import { http } from '../lib/http';

chai.use(sinonChai);

describe('roleAssignmentService', () => {
  let sandbox: sinon.SinonSandbox;
  let req: EnhancedRequest;
  let res: any;
  let next: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq({
      body: {},
      session: {}
    });
    res = mockRes();
    next = sandbox.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getPossibleRoles', () => {
    it('should return roles by service', async () => {
      req.body.serviceIds = ['service1'];
      req.session.subStantiveRoles = [
        { roleCategory: 'category1', roleId: 'role1', roleName: 'Role 1', roleJurisdiction: { values: ['service1'] } }
      ];

      await getPossibleRoles(req, res, next);

      expect(res.send).to.have.been.calledWith([{ service: 'service1', roles: req.session.subStantiveRoles }]);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should handle invalid service IDs', async () => {
      req.body.serviceIds = ['invalid_service_id'];
      req.session.subStantiveRoles = [
        { roleCategory: 'category1', roleId: 'role1', roleName: 'Role 1', roleJurisdiction: { values: ['service1'] } }
      ];
      await getPossibleRoles(req, res, next);

      expect(res.send).to.have.been.calledWith([]);
      expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe('getRoleByAssignmentId', () => {
    it('should return the specified role by assignment ID', async () => {
      req.body.assignmentId = 'assignment1';
      const role = { id: 'assignment1', name: 'role1' };
      sandbox.stub(http, 'get').resolves({ data: [role] });

      await getRoleByAssignmentId(req, res, next);

      expect(res.send).to.have.been.calledWith(role);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should handle errors', async () => {
      req.body.assignmentId = 'assignment1';
      sandbox.stub(http, 'get').rejects(new Error('Error'));

      await getRoleByAssignmentId(req, res, next);

      expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
    });
  });

  describe('getAllRoles', () => {
    it('should return all roles', async () => {
      const roles = [{ id: 'role1', name: 'Role 1' }];
      sandbox.stub(http, 'get').resolves({ data: roles });

      const result = await getAllRoles(req);

      expect(result.data).to.deep.equal(roles);
    });

    it('should handle errors', async () => {
      sandbox.stub(http, 'get').rejects(new Error('Error'));

      try {
        await getAllRoles(req);
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
  });
});
