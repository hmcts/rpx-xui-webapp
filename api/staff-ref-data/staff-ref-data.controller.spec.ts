import { expect } from 'chai';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as controller from './staff-ref-data.controller';

const StaffRefDataService = require('./staff-ref-data.service');

describe('staff-ref-data.controller', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;
  let serviceStub: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq();
    res = mockRes();
    next = sandbox.stub();

    serviceStub = {
      getFilteredUsers: sandbox.stub(),
      getUserTypes: sandbox.stub(),
      getJobTitles: sandbox.stub(),
      getServices: sandbox.stub(),
      getSkills: sandbox.stub(),
      getUsersByPartialName: sandbox.stub(),
      addNewUser: sandbox.stub(),
      fetchSingleUserById: sandbox.stub(),
      fetchUsersById: sandbox.stub(),
      updateUser: sandbox.stub()
    };

    // Stub the service constructor to return our mocked service
    sandbox.stub(StaffRefDataService.prototype, 'getFilteredUsers').callsFake(function(req, res, next) {
      return serviceStub.getFilteredUsers(req, res, next);
    });
    sandbox.stub(StaffRefDataService.prototype, 'getUserTypes').callsFake(function(req, res, next) {
      return serviceStub.getUserTypes(req, res, next);
    });
    sandbox.stub(StaffRefDataService.prototype, 'getJobTitles').callsFake(function(req, res, next) {
      return serviceStub.getJobTitles(req, res, next);
    });
    sandbox.stub(StaffRefDataService.prototype, 'getServices').callsFake(function(req, res, next) {
      return serviceStub.getServices(req, res, next);
    });
    sandbox.stub(StaffRefDataService.prototype, 'getSkills').callsFake(function(req, res, next) {
      return serviceStub.getSkills(req, res, next);
    });
    sandbox.stub(StaffRefDataService.prototype, 'getUsersByPartialName').callsFake(function(req, res, next) {
      return serviceStub.getUsersByPartialName(req, res, next);
    });
    sandbox.stub(StaffRefDataService.prototype, 'addNewUser').callsFake(function(req, res, next) {
      return serviceStub.addNewUser(req, res, next);
    });
    sandbox.stub(StaffRefDataService.prototype, 'fetchSingleUserById').callsFake(function(req, res, next) {
      return serviceStub.fetchSingleUserById(req, res, next);
    });
    sandbox.stub(StaffRefDataService.prototype, 'fetchUsersById').callsFake(function(req, res, next) {
      return serviceStub.fetchUsersById(req, res, next);
    });
    sandbox.stub(StaffRefDataService.prototype, 'updateUser').callsFake(function(req, res, next) {
      return serviceStub.updateUser(req, res, next);
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getFilteredUsers', () => {
    it('should call staffRefDataService.getFilteredUsers with correct parameters', async () => {
      req.query = { services: 'service1,service2', userType: 'caseworker' };
      serviceStub.getFilteredUsers.resolves();

      await controller.getFilteredUsers(req, res, next);

      expect(serviceStub.getFilteredUsers).to.have.been.calledOnce;
      expect(serviceStub.getFilteredUsers).to.have.been.calledWith(req, res, next);
    });

    it('should handle service method with undefined parameters', async () => {
      serviceStub.getFilteredUsers.resolves();

      await controller.getFilteredUsers(undefined, res, next);

      expect(serviceStub.getFilteredUsers).to.have.been.calledOnce;
      expect(serviceStub.getFilteredUsers).to.have.been.calledWith(undefined, res, next);
    });
  });

  describe('getUserTypes', () => {
    it('should call staffRefDataService.getUserTypes with correct parameters', async () => {
      serviceStub.getUserTypes.resolves();

      await controller.getUserTypes(req, res, next);

      expect(serviceStub.getUserTypes).to.have.been.calledOnce;
      expect(serviceStub.getUserTypes).to.have.been.calledWith(req, res, next);
    });

    it('should handle null request object', async () => {
      serviceStub.getUserTypes.resolves();

      await controller.getUserTypes(null, res, next);

      expect(serviceStub.getUserTypes).to.have.been.calledOnce;
      expect(serviceStub.getUserTypes).to.have.been.calledWith(null, res, next);
    });
  });

  describe('getJobTitles', () => {
    it('should call staffRefDataService.getJobTitles with correct parameters', async () => {
      req.query = { search: 'manager' };
      serviceStub.getJobTitles.resolves();

      await controller.getJobTitles(req, res, next);

      expect(serviceStub.getJobTitles).to.have.been.calledOnce;
      expect(serviceStub.getJobTitles).to.have.been.calledWith(req, res, next);
    });

    it('should handle empty query parameters', async () => {
      req.query = {};
      serviceStub.getJobTitles.resolves();

      await controller.getJobTitles(req, res, next);

      expect(serviceStub.getJobTitles).to.have.been.calledOnce;
      expect(serviceStub.getJobTitles).to.have.been.calledWith(req, res, next);
    });

    it('should propagate errors from service', async () => {
      const error = new Error('getJobTitles error');
      serviceStub.getJobTitles.rejects(error);

      try {
        await controller.getJobTitles(req, res, next);
      } catch (err) {
        expect(err).to.equal(error);
      }
    });
  });

  describe('getServices', () => {
    it('should call staffRefDataService.getServices with correct parameters', async () => {
      serviceStub.getServices.resolves();

      await controller.getServices(req, res, next);

      expect(serviceStub.getServices).to.have.been.calledOnce;
      expect(serviceStub.getServices).to.have.been.calledWith(req, res, next);
    });

    it('should handle request with headers', async () => {
      req.headers = { authorization: 'Bearer token' };
      serviceStub.getServices.resolves();

      await controller.getServices(req, res, next);

      expect(serviceStub.getServices).to.have.been.calledOnce;
      expect(serviceStub.getServices).to.have.been.calledWith(req, res, next);
    });
  });

  describe('getSkills', () => {
    it('should call staffRefDataService.getSkills with correct parameters', async () => {
      req.query = { category: 'technical' };
      serviceStub.getSkills.resolves();

      await controller.getSkills(req, res, next);

      expect(serviceStub.getSkills).to.have.been.calledOnce;
      expect(serviceStub.getSkills).to.have.been.calledWith(req, res, next);
    });

    it('should handle request with params', async () => {
      req.params = { skillId: '123' };
      serviceStub.getSkills.resolves();

      await controller.getSkills(req, res, next);

      expect(serviceStub.getSkills).to.have.been.calledOnce;
      expect(serviceStub.getSkills).to.have.been.calledWith(req, res, next);
    });
  });

  describe('getUsersByPartialName', () => {
    it('should call staffRefDataService.getUsersByPartialName with correct parameters', async () => {
      req.query = { name: 'john' };
      serviceStub.getUsersByPartialName.resolves();

      await controller.getUsersByPartialName(req, res, next);

      expect(serviceStub.getUsersByPartialName).to.have.been.calledOnce;
      expect(serviceStub.getUsersByPartialName).to.have.been.calledWith(req, res, next);
    });

    it('should handle request with empty name', async () => {
      req.query = { name: '' };
      serviceStub.getUsersByPartialName.resolves();

      await controller.getUsersByPartialName(req, res, next);

      expect(serviceStub.getUsersByPartialName).to.have.been.calledOnce;
      expect(serviceStub.getUsersByPartialName).to.have.been.calledWith(req, res, next);
    });
  });

  describe('addNewUser', () => {
    it('should call staffRefDataService.addNewUser with correct parameters', async () => {
      req.body = { 
        firstName: 'John', 
        lastName: 'Doe', 
        email: 'john.doe@example.com',
        userType: 'caseworker'
      };
      serviceStub.addNewUser.resolves();

      await controller.addNewUser(req, res, next);

      expect(serviceStub.addNewUser).to.have.been.calledOnce;
      expect(serviceStub.addNewUser).to.have.been.calledWith(req, res, next);
    });

    it('should handle request with empty body', async () => {
      req.body = {};
      serviceStub.addNewUser.resolves();

      await controller.addNewUser(req, res, next);

      expect(serviceStub.addNewUser).to.have.been.calledOnce;
      expect(serviceStub.addNewUser).to.have.been.calledWith(req, res, next);
    });

    it('should handle request with null body', async () => {
      req.body = null;
      serviceStub.addNewUser.resolves();

      await controller.addNewUser(req, res, next);

      expect(serviceStub.addNewUser).to.have.been.calledOnce;
      expect(serviceStub.addNewUser).to.have.been.calledWith(req, res, next);
    });
  });

  describe('fetchSingleUserById', () => {
    it('should call staffRefDataService.fetchSingleUserById with correct parameters', async () => {
      req.params = { id: 'user123' };
      serviceStub.fetchSingleUserById.resolves();

      await controller.fetchSingleUserById(req, res, next);

      expect(serviceStub.fetchSingleUserById).to.have.been.calledOnce;
      expect(serviceStub.fetchSingleUserById).to.have.been.calledWith(req, res, next);
    });

    it('should handle request with undefined params', async () => {
      req.params = undefined;
      serviceStub.fetchSingleUserById.resolves();

      await controller.fetchSingleUserById(req, res, next);

      expect(serviceStub.fetchSingleUserById).to.have.been.calledOnce;
      expect(serviceStub.fetchSingleUserById).to.have.been.calledWith(req, res, next);
    });
  });

  describe('fetchUsersById', () => {
    it('should call staffRefDataService.fetchUsersById with correct parameters', async () => {
      req.body = { userIds: ['user1', 'user2', 'user3'] };
      serviceStub.fetchUsersById.resolves();

      await controller.fetchUsersById(req, res, next);

      expect(serviceStub.fetchUsersById).to.have.been.calledOnce;
      expect(serviceStub.fetchUsersById).to.have.been.calledWith(req, res, next);
    });

    it('should handle request with empty array', async () => {
      req.body = { userIds: [] };
      serviceStub.fetchUsersById.resolves();

      await controller.fetchUsersById(req, res, next);

      expect(serviceStub.fetchUsersById).to.have.been.calledOnce;
      expect(serviceStub.fetchUsersById).to.have.been.calledWith(req, res, next);
    });

    it('should handle request with undefined body', async () => {
      req.body = undefined;
      serviceStub.fetchUsersById.resolves();

      await controller.fetchUsersById(req, res, next);

      expect(serviceStub.fetchUsersById).to.have.been.calledOnce;
      expect(serviceStub.fetchUsersById).to.have.been.calledWith(req, res, next);
    });
  });

  describe('updateUser', () => {
    it('should call staffRefDataService.updateUser with correct parameters', async () => {
      req.params = { id: 'user123' };
      req.body = { 
        firstName: 'Jane', 
        lastName: 'Smith',
        skills: ['skill1', 'skill2']
      };
      serviceStub.updateUser.resolves();

      await controller.updateUser(req, res, next);

      expect(serviceStub.updateUser).to.have.been.calledOnce;
      expect(serviceStub.updateUser).to.have.been.calledWith(req, res, next);
    });

    it('should handle request with partial update data', async () => {
      req.params = { id: 'user123' };
      req.body = { firstName: 'Jane' };
      serviceStub.updateUser.resolves();

      await controller.updateUser(req, res, next);

      expect(serviceStub.updateUser).to.have.been.calledOnce;
      expect(serviceStub.updateUser).to.have.been.calledWith(req, res, next);
    });

    it('should handle request with missing params', async () => {
      req.params = {};
      req.body = { firstName: 'Jane' };
      serviceStub.updateUser.resolves();

      await controller.updateUser(req, res, next);

      expect(serviceStub.updateUser).to.have.been.calledOnce;
      expect(serviceStub.updateUser).to.have.been.calledWith(req, res, next);
    });
  });
});