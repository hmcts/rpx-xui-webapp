import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as crudService from '../common/crudService';
import * as config from '../configuration';
import { SERVICES_CASE_CASEWORKER_REF_PATH, SERVICE_REF_DATA_MAPPING } from '../configuration/references';
import { StaffUser } from './models/staff-data-user.model';
import { GroupOption, Service, StaffFilterOption } from './models/staff-filter-option.model';
import { RealStaffRefDataAPI } from './real-staff-ref-data-api';

chai.use(sinonChai);

describe('RealStaffRefDataAPI', () => {
  let sandbox: sinon.SinonSandbox;
  let realStaffRefDataAPI: RealStaffRefDataAPI;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;
  let sendGetStub: sinon.SinonStub;
  let sendPostStub: sinon.SinonStub;
  let sendPutStub: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;

  const mockBaseUrl = 'http://test-caseworker-ref.com';
  const mockServiceRefData: Service[] = [
    { service: 'Family', serviceCodes: ['AA1', 'AA2'] },
    { service: 'Civil', serviceCodes: ['BB1', 'BB2'] },
    { service: 'Criminal', serviceCodes: ['CC1', 'CC2'] }
  ];

  const mockStaffUser: StaffUser = {
    email_id: 'test@test.com',
    first_name: 'John',
    last_name: 'Doe',
    suspended: false,
    user_type: 'legal',
    task_supervisor: true,
    case_allocator: false,
    staff_admin: false,
    idam_roles: ['caseworker'],
    up_idam_status: 'ACTIVE',
    roles: [{
      role_id: '1',
      role: 'Senior Legal Caseworker',
      is_primary: true
    }],
    skills: [{
      skill_id: 1,
      description: 'Family Law'
    }],
    services: [{
      service: 'Family',
      service_code: 'AA1'
    }],
    base_locations: [{
      location_id: 123,
      location: 'Birmingham',
      is_primary: true
    }],
    region: 'Midlands',
    region_id: 1
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq();
    res = mockRes();
    next = sandbox.stub();
    sendGetStub = sandbox.stub(crudService, 'sendGet');
    sendPostStub = sandbox.stub(crudService, 'sendPost');
    sendPutStub = sandbox.stub(crudService, 'sendPut');
    getConfigValueStub = sandbox.stub(config, 'getConfigValue');

    getConfigValueStub.withArgs(SERVICES_CASE_CASEWORKER_REF_PATH).returns(mockBaseUrl);
    getConfigValueStub.withArgs(SERVICE_REF_DATA_MAPPING).returns(mockServiceRefData);

    // Create instance after stubbing config
    realStaffRefDataAPI = new RealStaffRefDataAPI();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getFilteredUsers', () => {
    it('should successfully get filtered users with pagination', async () => {
      const mockUsers: StaffUser[] = [mockStaffUser];
      const mockHeaders = { 'total-records': '50' };

      req.query = { service: 'Family', location: 'Birmingham' };
      req.headers = { 'page-size': '10', 'page-number': '2' };

      sendGetStub.resolves({
        status: 200,
        data: mockUsers,
        headers: mockHeaders
      });

      await realStaffRefDataAPI.getFilteredUsers(req, res, next);

      expect(sendGetStub).to.have.been.calledOnce;
      expect(sendGetStub).to.have.been.calledWith(
        `${mockBaseUrl}/refdata/case-worker/profile/search?service=Family&location=Birmingham`,
        req,
        {
          'page-number': '2',
          'page-size': '10'
        }
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith({
        items: mockUsers,
        pageSize: 10,
        pageNumber: 2,
        totalItems: 50
      });
      expect(next).to.not.have.been.called;
    });

    it('should use default pagination values when headers are not provided', async () => {
      const mockUsers: StaffUser[] = [mockStaffUser];
      const mockHeaders = { 'total-records': '100' };

      req.query = {};
      req.headers = {};

      sendGetStub.resolves({
        status: 200,
        data: mockUsers,
        headers: mockHeaders
      });

      await realStaffRefDataAPI.getFilteredUsers(req, res, next);

      expect(sendGetStub).to.have.been.calledWith(
        `${mockBaseUrl}/refdata/case-worker/profile/search?`,
        req,
        {
          'page-number': 1,
          'page-size': 20
        }
      );
      expect(res.send).to.have.been.calledWith({
        items: mockUsers,
        pageSize: 20,
        pageNumber: 1,
        totalItems: 100
      });
    });

    it('should handle errors and call next', async () => {
      const error = new Error('API Error');
      req.query = {};
      req.headers = {};
      sendGetStub.rejects(error);

      await realStaffRefDataAPI.getFilteredUsers(req, res, next);

      expect(next).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });
  });

  describe('getUserTypes', () => {
    it('should successfully get and transform user types', async () => {
      const mockResponse = {
        user_type: [
          { id: 'type1', code: 'Legal Officer' },
          { id: 'type2', code: 'Admin Staff' },
          { id: 'type3', code: 'Case Worker' }
        ]
      };

      sendGetStub.resolves({
        status: 200,
        data: mockResponse
      });

      await realStaffRefDataAPI.getUserTypes(req, res, next);

      expect(sendGetStub).to.have.been.calledOnce;
      expect(sendGetStub).to.have.been.calledWith(
        `${mockBaseUrl}/refdata/case-worker/user-type`,
        req
      );
      expect(res.status).to.have.been.calledWith(200);

      const sentData = res.send.firstCall.args[0];
      expect(sentData).to.be.an('array');
      expect(sentData).to.have.lengthOf(3);
      expect(sentData[0]).to.deep.equal({ key: 'type2', label: 'Admin Staff' });
      expect(sentData[1]).to.deep.equal({ key: 'type3', label: 'Case Worker' });
      expect(sentData[2]).to.deep.equal({ key: 'type1', label: 'Legal Officer' });
    });

    it('should handle empty user types', async () => {
      const mockResponse = { user_type: [] };

      sendGetStub.resolves({
        status: 200,
        data: mockResponse
      });

      await realStaffRefDataAPI.getUserTypes(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
    });

    it('should handle errors and call next', async () => {
      const error = new Error('API Error');
      sendGetStub.rejects(error);

      await realStaffRefDataAPI.getUserTypes(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
    });
  });

  describe('getJobTitles', () => {
    it('should successfully get and transform job titles', async () => {
      const mockResponse = {
        job_title: [
          { role_id: 1, role_description: 'Senior Legal Caseworker' },
          { role_id: 2, role_description: 'Legal Caseworker' },
          { role_id: 3, role_description: 'Admin Officer' }
        ]
      };

      sendGetStub.resolves({
        status: 200,
        data: mockResponse
      });

      await realStaffRefDataAPI.getJobTitles(req, res, next);

      expect(sendGetStub).to.have.been.calledWith(
        `${mockBaseUrl}/refdata/case-worker/job-title`,
        req
      );
      expect(res.status).to.have.been.calledWith(200);

      const sentData = res.send.firstCall.args[0];
      expect(sentData).to.be.an('array');
      expect(sentData).to.have.lengthOf(3);
      expect(sentData[0]).to.deep.equal({ key: '3', label: 'Admin Officer' });
      expect(sentData[1]).to.deep.equal({ key: '2', label: 'Legal Caseworker' });
      expect(sentData[2]).to.deep.equal({ key: '1', label: 'Senior Legal Caseworker' });
    });

    it('should handle errors and call next', async () => {
      const error = new Error('API Error');
      sendGetStub.rejects(error);

      await realStaffRefDataAPI.getJobTitles(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getServices', () => {
    it('should successfully map services with service codes', async () => {
      const mockResponse = {
        service_skill: [
          { id: 'AA1', description: 'Family Service 1' },
          { id: 'BB1', description: 'Civil Service 1' },
          { id: 'CC1', description: 'Criminal Service 1' },
          { id: 'DD1', description: 'Unknown Service' }
        ]
      };

      sendGetStub.resolves({
        status: 200,
        data: mockResponse
      });

      await realStaffRefDataAPI.getServices(req, res, next);

      expect(sendGetStub).to.have.been.calledWith(
        `${mockBaseUrl}/refdata/case-worker/skill`,
        req
      );
      expect(res.status).to.have.been.calledWith(200);

      const sentData = res.send.firstCall.args[0];
      expect(sentData).to.be.an('array');
      expect(sentData).to.have.lengthOf(3);
      expect(sentData).to.deep.include({ key: 'AA1', label: 'Family' });
      expect(sentData).to.deep.include({ key: 'BB1', label: 'Civil' });
      expect(sentData).to.deep.include({ key: 'CC1', label: 'Criminal' });
    });

    it('should handle empty service skills', async () => {
      const mockResponse = { service_skill: [] };

      sendGetStub.resolves({
        status: 200,
        data: mockResponse
      });

      await realStaffRefDataAPI.getServices(req, res, next);

      expect(res.send).to.have.been.calledWith([]);
    });

    it('should handle errors and call next', async () => {
      const error = new Error('API Error');
      sendGetStub.rejects(error);

      await realStaffRefDataAPI.getServices(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getSkills', () => {
    it('should successfully group skills by service', async () => {
      const mockResponse = {
        service_skill: [
          {
            id: 'family-service',
            skills: [
              { id: 'skill1', description: 'Family Law' },
              { id: 'skill2', description: 'Child Protection' }
            ]
          },
          {
            id: 'civil-service',
            skills: [
              { id: 'skill3', description: 'Civil Litigation' }
            ]
          }
        ]
      };

      sendGetStub.resolves({
        status: 200,
        data: mockResponse
      });

      await realStaffRefDataAPI.getSkills(req, res, next);

      expect(sendGetStub).to.have.been.calledWith(
        `${mockBaseUrl}/refdata/case-worker/skill`,
        req
      );
      expect(res.status).to.have.been.calledWith(200);

      const sentData = res.send.firstCall.args[0];
      expect(sentData).to.be.an('array');
      expect(sentData).to.have.lengthOf(2);
      expect(sentData[0]).to.deep.equal({
        group: 'family-service',
        options: [
          { key: 'skill1', label: 'Family Law' },
          { key: 'skill2', label: 'Child Protection' }
        ]
      });
      expect(sentData[1]).to.deep.equal({
        group: 'civil-service',
        options: [
          { key: 'skill3', label: 'Civil Litigation' }
        ]
      });
    });

    it('should handle empty skills', async () => {
      const mockResponse = { service_skill: [] };

      sendGetStub.resolves({
        status: 200,
        data: mockResponse
      });

      await realStaffRefDataAPI.getSkills(req, res, next);

      expect(res.send).to.have.been.calledWith([]);
    });

    it('should handle errors and call next', async () => {
      const error = new Error('API Error');
      sendGetStub.rejects(error);

      await realStaffRefDataAPI.getSkills(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getUsersByPartialName', () => {
    it('should successfully search users by partial name', async () => {
      const mockUsers: StaffUser[] = [mockStaffUser];
      const mockHeaders = { 'total-records': '25' };

      req.query = { search: 'John' };
      req.headers = { 'page-size': '15', 'page-number': '3' };

      sendGetStub.resolves({
        status: 200,
        data: mockUsers,
        headers: mockHeaders
      });

      await realStaffRefDataAPI.getUsersByPartialName(req, res, next);

      expect(sendGetStub).to.have.been.calledWith(
        `${mockBaseUrl}/refdata/case-worker/profile/search-by-name?search=John`,
        req,
        {
          'page-number': '3',
          'page-size': '15'
        }
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith({
        items: mockUsers,
        pageSize: 15,
        pageNumber: 3,
        totalItems: 25
      });
    });

    it('should handle empty search parameter', async () => {
      const mockUsers: StaffUser[] = [];
      const mockHeaders = { 'total-records': '0' };

      req.query = {};
      req.headers = {};

      sendGetStub.resolves({
        status: 200,
        data: mockUsers,
        headers: mockHeaders
      });

      await realStaffRefDataAPI.getUsersByPartialName(req, res, next);

      expect(sendGetStub).to.have.been.calledWith(
        `${mockBaseUrl}/refdata/case-worker/profile/search-by-name?search=`,
        req,
        {
          'page-number': 1,
          'page-size': 20
        }
      );
    });

    it('should handle errors and call next', async () => {
      const error = new Error('API Error');
      req.query = { search: 'test' };
      req.headers = {};
      sendGetStub.rejects(error);

      await realStaffRefDataAPI.getUsersByPartialName(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('sortArray', () => {
    it('should sort array alphabetically by label', () => {
      const unsortedArray: StaffFilterOption[] = [
        { key: '3', label: 'Zebra' },
        { key: '1', label: 'Apple' },
        { key: '2', label: 'Banana' }
      ];

      const result = realStaffRefDataAPI.sortArray(unsortedArray);

      expect(result).to.deep.equal([
        { key: '1', label: 'Apple' },
        { key: '2', label: 'Banana' },
        { key: '3', label: 'Zebra' }
      ]);
    });

    it('should handle empty array', () => {
      const result = realStaffRefDataAPI.sortArray([]);
      expect(result).to.deep.equal([]);
    });

    it('should handle single item array', () => {
      const singleItem: StaffFilterOption[] = [{ key: '1', label: 'Only Item' }];
      const result = realStaffRefDataAPI.sortArray(singleItem);
      expect(result).to.deep.equal(singleItem);
    });

    it('should handle case-insensitive sorting', () => {
      const mixedCaseArray: StaffFilterOption[] = [
        { key: '1', label: 'apple' },
        { key: '2', label: 'Banana' },
        { key: '3', label: 'CHERRY' }
      ];

      const result = realStaffRefDataAPI.sortArray(mixedCaseArray);

      expect(result[0].label).to.equal('apple');
      expect(result[1].label).to.equal('Banana');
      expect(result[2].label).to.equal('CHERRY');
    });
  });

  describe('addNewUser', () => {
    it('should successfully add a new user', async () => {
      const newUser = {
        email_id: 'newuser@test.com',
        first_name: 'Jane',
        last_name: 'Smith'
      };

      req.body = newUser;

      sendPostStub.resolves({
        status: 201,
        data: { ...newUser, id: '123' }
      });

      await realStaffRefDataAPI.addNewUser(req, res, next);

      expect(sendPostStub).to.have.been.calledOnce;
      expect(sendPostStub).to.have.been.calledWith(
        `${mockBaseUrl}/refdata/case-worker/profile`,
        newUser,
        req
      );
      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith({ ...newUser, id: '123' });
    });

    it('should handle errors when adding user', async () => {
      const error = new Error('Failed to add user');
      req.body = { email_id: 'test@test.com' };
      sendPostStub.rejects(error);

      await realStaffRefDataAPI.addNewUser(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
    });
  });

  describe('fetchUsersById', () => {
    it('should successfully fetch users by ID', async () => {
      const userIds = ['user1', 'user2', 'user3'];
      const mockUsers: StaffUser[] = [mockStaffUser];

      req.body = userIds;

      sendPostStub.resolves({
        status: 200,
        data: mockUsers
      });

      await realStaffRefDataAPI.fetchUsersById(req, res, next);

      expect(sendPostStub).to.have.been.calledWith(
        `${mockBaseUrl}/refdata/case-worker/users/fetchUsersById`,
        userIds,
        req
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockUsers);
    });

    it('should handle empty body', async () => {
      req.body = [];

      sendPostStub.resolves({
        status: 200,
        data: []
      });

      await realStaffRefDataAPI.fetchUsersById(req, res, next);

      expect(res.send).to.have.been.calledWith([]);
    });

    it('should handle errors', async () => {
      const error = new Error('API Error');
      req.body = ['user1'];
      sendPostStub.rejects(error);

      await realStaffRefDataAPI.fetchUsersById(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('fetchSingleUserById', () => {
    it('should successfully fetch a single user by ID', async () => {
      req.query = { id: 'user123' };

      sendGetStub.resolves({
        status: 200,
        data: mockStaffUser
      });

      await realStaffRefDataAPI.fetchSingleUserById(req, res, next);

      expect(sendGetStub).to.have.been.calledWith(
        `${mockBaseUrl}/refdata/case-worker/profile/search-by-id?id=user123`,
        req
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockStaffUser);
    });

    it('should handle missing ID parameter', async () => {
      req.query = {};

      sendGetStub.resolves({
        status: 404,
        data: null
      });

      await realStaffRefDataAPI.fetchSingleUserById(req, res, next);

      expect(sendGetStub).to.have.been.calledWith(
        `${mockBaseUrl}/refdata/case-worker/profile/search-by-id?id=undefined`,
        req
      );
    });

    it('should handle errors', async () => {
      const error = new Error('User not found');
      req.query = { id: 'nonexistent' };
      sendGetStub.rejects(error);

      await realStaffRefDataAPI.fetchSingleUserById(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('updateUser', () => {
    it('should successfully update a user', async () => {
      const updatedUser = {
        ...mockStaffUser,
        first_name: 'Updated'
      };

      req.body = updatedUser;

      sendPutStub.resolves({
        status: 200,
        data: updatedUser
      });

      await realStaffRefDataAPI.updateUser(req, res, next);

      expect(sendPutStub).to.have.been.calledWith(
        `${mockBaseUrl}/refdata/case-worker/profile`,
        updatedUser,
        req
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(updatedUser);
    });

    it('should handle validation errors', async () => {
      const error = new Error('Validation failed');
      req.body = { invalid: 'data' };
      sendPutStub.rejects(error);

      await realStaffRefDataAPI.updateUser(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
    });
  });
});

