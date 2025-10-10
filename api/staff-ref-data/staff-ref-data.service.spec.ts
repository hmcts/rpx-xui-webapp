import { expect } from 'chai';

import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { RealStaffRefDataAPI } from './real-staff-ref-data-api';

const StaffRefDataService = require('./staff-ref-data.service');

describe('StaffRefDataService', () => {
  let sandbox: sinon.SinonSandbox;
  let service: any;
  let mockRealStaffRefDataAPI: sinon.SinonStubbedInstance<RealStaffRefDataAPI>;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    mockRealStaffRefDataAPI = {
      getFilteredUsers: sandbox.stub(),
      getUserTypes: sandbox.stub(),
      getJobTitles: sandbox.stub(),
      getServices: sandbox.stub(),
      getSkills: sandbox.stub(),
      getUsersByPartialName: sandbox.stub(),
      addNewUser: sandbox.stub(),
      fetchUsersById: sandbox.stub(),
      fetchSingleUserById: sandbox.stub(),
      updateUser: sandbox.stub()
    } as any;

    service = new StaffRefDataService(mockRealStaffRefDataAPI);

    req = mockReq();
    res = mockRes();
    next = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getFilteredUsers', () => {
    it('should delegate to the service getFilteredUsers method', async () => {
      mockRealStaffRefDataAPI.getFilteredUsers.resolves();

      await service.getFilteredUsers(req, res, next);

      expect(mockRealStaffRefDataAPI.getFilteredUsers).to.have.been.calledOnceWith(req, res, next);
    });

    it('should pass through the correct parameters', async () => {
      const customReq = { query: { test: 'value' } };
      const customRes = { send: sandbox.stub() };
      const customNext = sandbox.stub();

      mockRealStaffRefDataAPI.getFilteredUsers.resolves();

      await service.getFilteredUsers(customReq, customRes, customNext);

      expect(mockRealStaffRefDataAPI.getFilteredUsers).to.have.been.calledOnceWith(
        customReq,
        customRes,
        customNext
      );
    });
  });

  describe('getUserTypes', () => {
    it('should delegate to the service getUserTypes method', async () => {
      mockRealStaffRefDataAPI.getUserTypes.resolves();

      await service.getUserTypes(req, res, next);

      expect(mockRealStaffRefDataAPI.getUserTypes).to.have.been.calledOnceWith(req, res, next);
    });

    it('should handle promise resolution correctly', async () => {
      mockRealStaffRefDataAPI.getUserTypes.resolves();

      await service.getUserTypes(req, res, next);

      expect(mockRealStaffRefDataAPI.getUserTypes).to.have.been.calledOnceWith(req, res, next);
      expect(next).to.not.have.been.called;
    });
  });

  describe('getJobTitles', () => {
    it('should delegate to the service getJobTitles method', async () => {
      mockRealStaffRefDataAPI.getJobTitles.resolves();

      await service.getJobTitles(req, res, next);

      expect(mockRealStaffRefDataAPI.getJobTitles).to.have.been.calledOnceWith(req, res, next);
    });

    it('should return the result from the delegated service', async () => {
      mockRealStaffRefDataAPI.getJobTitles.resolves();

      await service.getJobTitles(req, res, next);

      expect(mockRealStaffRefDataAPI.getJobTitles).to.have.been.calledOnceWith(req, res, next);
      expect(next).to.not.have.been.called;
    });
  });

  describe('getServices', () => {
    it('should delegate to the service getServices method', async () => {
      mockRealStaffRefDataAPI.getServices.resolves();

      await service.getServices(req, res, next);

      expect(mockRealStaffRefDataAPI.getServices).to.have.been.calledOnceWith(req, res, next);
    });

    it('should maintain async behavior', async () => {
      mockRealStaffRefDataAPI.getServices.returns(Promise.resolve());

      await service.getServices(req, res, next);

      expect(mockRealStaffRefDataAPI.getServices).to.have.been.called;
    });
  });

  describe('getSkills', () => {
    it('should delegate to the service getSkills method', async () => {
      mockRealStaffRefDataAPI.getSkills.resolves();

      await service.getSkills(req, res, next);

      expect(mockRealStaffRefDataAPI.getSkills).to.have.been.calledOnceWith(req, res, next);
    });

    it('should properly handle errors from delegated service', async () => {
      const error = new Error('Service error');
      mockRealStaffRefDataAPI.getSkills.rejects(error);

      try {
        await service.getSkills(req, res, next);
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err).to.equal(error);
      }
    });
  });

  describe('getUsersByPartialName', () => {
    it('should delegate to the service getUsersByPartialName method', async () => {
      mockRealStaffRefDataAPI.getUsersByPartialName.resolves();

      await service.getUsersByPartialName(req, res, next);

      expect(mockRealStaffRefDataAPI.getUsersByPartialName).to.have.been.calledOnceWith(req, res, next);
    });

    it('should pass request with search query correctly', async () => {
      const reqWithSearch = mockReq({ query: { search: 'John' } });
      mockRealStaffRefDataAPI.getUsersByPartialName.resolves();

      await service.getUsersByPartialName(reqWithSearch, res, next);

      expect(mockRealStaffRefDataAPI.getUsersByPartialName).to.have.been.calledOnceWith(
        reqWithSearch,
        res,
        next
      );
    });
  });

  describe('addNewUser', () => {
    it('should delegate to the service addNewUser method', async () => {
      mockRealStaffRefDataAPI.addNewUser.resolves();

      await service.addNewUser(req, res, next);

      expect(mockRealStaffRefDataAPI.addNewUser).to.have.been.calledOnceWith(req, res, next);
    });

    it('should pass request body correctly', async () => {
      const reqWithBody = mockReq({
        body: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com'
        }
      });
      mockRealStaffRefDataAPI.addNewUser.resolves();

      await service.addNewUser(reqWithBody, res, next);

      expect(mockRealStaffRefDataAPI.addNewUser).to.have.been.calledOnceWith(
        reqWithBody,
        res,
        next
      );
    });
  });

  describe('fetchUsersById', () => {
    it('should delegate to the service fetchUsersById method', async () => {
      mockRealStaffRefDataAPI.fetchUsersById.resolves();

      await service.fetchUsersById(req, res, next);

      expect(mockRealStaffRefDataAPI.fetchUsersById).to.have.been.calledOnceWith(req, res, next);
    });

    it('should handle array of user IDs in request body', async () => {
      const reqWithIds = mockReq({
        body: ['user1', 'user2', 'user3']
      });
      mockRealStaffRefDataAPI.fetchUsersById.resolves();

      await service.fetchUsersById(reqWithIds, res, next);

      expect(mockRealStaffRefDataAPI.fetchUsersById).to.have.been.calledOnceWith(
        reqWithIds,
        res,
        next
      );
    });
  });

  describe('fetchSingleUserById', () => {
    it('should delegate to the service fetchSingleUserById method', async () => {
      mockRealStaffRefDataAPI.fetchSingleUserById.resolves();

      await service.fetchSingleUserById(req, res, next);

      expect(mockRealStaffRefDataAPI.fetchSingleUserById).to.have.been.calledOnceWith(req, res, next);
    });

    it('should pass query parameter with user ID', async () => {
      const reqWithId = mockReq({
        query: { id: 'user123' }
      });
      mockRealStaffRefDataAPI.fetchSingleUserById.resolves();

      await service.fetchSingleUserById(reqWithId, res, next);

      expect(mockRealStaffRefDataAPI.fetchSingleUserById).to.have.been.calledOnceWith(
        reqWithId,
        res,
        next
      );
    });
  });

  describe('updateUser', () => {
    it('should delegate to the service updateUser method', async () => {
      mockRealStaffRefDataAPI.updateUser.resolves();

      await service.updateUser(req, res, next);

      expect(mockRealStaffRefDataAPI.updateUser).to.have.been.calledOnceWith(req, res, next);
    });

    it('should handle update user request with body', async () => {
      const reqWithUpdate = mockReq({
        body: {
          id: 'user123',
          firstName: 'Updated',
          lastName: 'Name',
          suspended: true
        }
      });
      mockRealStaffRefDataAPI.updateUser.resolves();

      await service.updateUser(reqWithUpdate, res, next);

      expect(mockRealStaffRefDataAPI.updateUser).to.have.been.calledOnceWith(
        reqWithUpdate,
        res,
        next
      );
    });

    it('should propagate rejected promises', async () => {
      const updateError = new Error('Update failed');
      mockRealStaffRefDataAPI.updateUser.rejects(updateError);

      try {
        await service.updateUser(req, res, next);
        expect.fail('Should have propagated the error');
      } catch (err) {
        expect(err).to.equal(updateError);
      }
    });
  });

  describe('constructor', () => {
    it('should create instance with RealStaffRefDataAPI dependency', () => {
      const realAPI = new RealStaffRefDataAPI();
      const serviceWithRealAPI = new StaffRefDataService(realAPI);

      expect(serviceWithRealAPI).to.be.an.instanceof(StaffRefDataService);
      expect(serviceWithRealAPI.service).to.equal(realAPI);
    });
  });

  describe('Edge cases and error scenarios', () => {
    it('should handle null request object', async () => {
      mockRealStaffRefDataAPI.getFilteredUsers.resolves();

      await service.getFilteredUsers(null, res, next);

      expect(mockRealStaffRefDataAPI.getFilteredUsers).to.have.been.calledOnceWith(null, res, next);
    });

    it('should handle undefined response object', async () => {
      mockRealStaffRefDataAPI.getUserTypes.resolves();

      await service.getUserTypes(req, undefined, next);

      expect(mockRealStaffRefDataAPI.getUserTypes).to.have.been.calledOnceWith(req, undefined, next);
    });

    it('should handle missing next function', async () => {
      mockRealStaffRefDataAPI.getServices.resolves();

      await service.getServices(req, res, undefined);

      expect(mockRealStaffRefDataAPI.getServices).to.have.been.calledOnceWith(req, res, undefined);
    });

    it('should handle all parameters being undefined', async () => {
      mockRealStaffRefDataAPI.getSkills.resolves();

      await service.getSkills(undefined, undefined, undefined);

      expect(mockRealStaffRefDataAPI.getSkills).to.have.been.calledOnceWith(
        undefined,
        undefined,
        undefined
      );
    });
  });
});
