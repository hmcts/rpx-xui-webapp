import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { AxiosResponse } from 'axios';
import { http } from '../lib/http';
import * as proxy from '../lib/proxy';
import * as roleAccess from '../roleAccess';
import * as workAllocation from '../workAllocation';
import * as locationService from '../workAllocation/locationService';
import * as lau from '../services/lau';
import { mockLocations } from '../locations/locationTestData.spec';
import { bookings, bookingResponse } from './data/booking.mock.data'
import {
  getBookings,
  createBooking,
  refreshRoleAssignments,
  approveSpecificAccessRequest,
  deleteSpecificAccessRoles,
  restoreDeletedRole,
  removeAcceptHeader
} from './';

chai.use(sinonChai);

describe('Access Management', (): void => {
  let sandbox: sinon.SinonSandbox;
  let res;
  let req;
  let next: sinon.SinonStub;
  let httpPostStub: sinon.SinonStub;
  let setHeadersStub: sinon.SinonStub;
  
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.stub();
    httpPostStub = sandbox.stub(http, 'post');
    setHeadersStub = sandbox.stub(proxy, 'setHeaders');
  });
  
  afterEach(() => {
    sandbox.restore();
  });

  describe('getBookings', () => {
    let getFullLocationsStub: sinon.SinonStub;

    beforeEach(() => {
      req = mockReq({
        body: {
          userId: '21334a2b-79ce-44eb-9168-2d49a744be9c',
          bookableServices: ['service-1', 'service-2']
        }
      });
      res = mockRes();
      getFullLocationsStub = sandbox.stub(locationService, 'getFullLocationsForServices');
      setHeadersStub.returns({ 'content-type': 'application/json' });
    });

    it('should return empty arrray when bookableServices is empty', async () => {
      req.body.bookableServices = [];

      await getBookings(req, res, next);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
      expect(httpPostStub).to.not.have.been.called;
      expect(next).to.not.have.been.called;
  });

  it('should fetch bookings and enrich with location names', async () => {
    // Note: The external API returns 'base_location_id' but we need to map it to 'LocationId'
    // for the enrichment logic to work correctly.
    const mockBookings = {
      status: 200,
      data: {
        bookings: [
          { ...bookings.bookings[0], locationId: bookings.bookings[0].base_location_id },
          { ...bookings.bookings[1], locationId: bookings.bookings[1].base_location_id },
          { ...bookings.bookings[2], locationId: bookings.bookings[2].base_location_id }
        ]
      }
    };

    httpPostStub.resolves(mockBookings);
    getFullLocationsStub.resolves(mockLocations);

    await getBookings(req, res, next);

    expect(httpPostStub).to.have.been.calledOnce;
    expect(httpPostStub.firstCall.args[1]).to.deep.equal({
      queryRequest: { userIds: ['21334a2b-79ce-44eb-9168-2d49a744be9c'] }
    });
    expect(setHeadersStub).to.have.been.calledWith(req);
    expect(getFullLocationsStub).to.have.been.calledWith(req);
    expect(res.status).to.have.been.calledWith(200);

    // Verify the enriched bookings
    const sentData = res.send.getCall(0).args[0];
    expect(sentData).to.be.an('array').that.has.lengthOf(3);
    expect(sentData[0]).to.deep.include({
      locationId: '765324',
      locationName: null, // not found in mockLocations
    });
    expect(sentData[1]).to.deep.include({
      locationId: '231596',
      locationName: 'Glasgow New Central Court', // found in mockLocations
    });
    expect(sentData[2]).to.deep.include({
      locationId: '512401',
      locationName: null // not found in mockLocations
    });
    expect(next).to.not.have.been.called;
});

it('should handle errors and call next', async () => {
      const error = new Error('API Error');
      httpPostStub.rejects(error);

      await getBookings(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should remove accept header from headers', async () => {
      const headers = { 'accept': 'application/json', 'content-type': 'application/json' };
      setHeadersStub.returns(headers);
      httpPostStub.resolves({ status: 200, data: { bookings: [] } });
      getFullLocationsStub.resolves([]);

      await getBookings(req, res, next);

      expect(headers).to.not.have.property('accept');
    });
  });

  describe('createBooking', () => {
    beforeEach(() => {
      const now = new Date();
      req = mockReq({
        body: {
          userId: '21334a2b-79ce-44eb-9168-2d49a744be9c',
          locationId: '366796',
          regionId: '104',
          beginDate: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(now.getTime() + 25 * 60 * 60 * 1000).toISOString()
        }
      });
      res = mockRes();
      setHeadersStub.returns({ 'content-type': 'application/json' });
    });

    it('should create a booking successfully', async () => {
      const mockResponse = {
        status: 201,
        data: bookingResponse
      };
      httpPostStub.resolves(mockResponse);

      await createBooking(req, res, next);

      expect(httpPostStub).to.have.been.calledOnce;
      expect(httpPostStub.firstCall.args[1]).to.deep.equal({
        bookingRequest: req.body
      });
      expect(setHeadersStub).to.have.been.calledWith(req);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith(bookingResponse);
      expect(next).to.not.have.been.called;
    });

    it('should handle errors and call next', async () => {
      const error = new Error('Booking failed');
      httpPostStub.rejects(error);

      await createBooking(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should remove accept header from headers', async () => {
      const headers = { 'accept': 'application/json', 'content-type': 'application/json' };
      setHeadersStub.returns(headers);
      httpPostStub.resolves({ status: 201, data: {} });

      await createBooking(req, res, next);

      expect(headers).to.not.have.property('accept');
    });
  });

  describe('refreshRoleAssignments', () => {
    let handlePostStub: sinon.SinonStub;

    beforeEach(() => {
      req = mockReq({
        body: {
          userId: '21334a2b-79ce-44eb-9168-2d49a744be9c'
        }
      });
      res = mockRes();
      handlePostStub = sandbox.stub();
      // Replace the handlePost import
      const crudService = require('../common/crudService');
      sandbox.stub(crudService, 'handlePost').callsFake(handlePostStub);
    });

    it('should refresh role assignments successfully', async () => {
      const mockResponse = {
        status: 200,
        data: { refreshed: true }
      };
      handlePostStub.resolves(mockResponse);

      await refreshRoleAssignments(req, res, next);

      expect(handlePostStub).to.have.been.calledOnce;
      expect(handlePostStub.firstCall.args[1]).to.deep.equal({
        refreshRequest: { userIds: ['21334a2b-79ce-44eb-9168-2d49a744be9c'] }
      });
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith({ refreshed: true });
      expect(next).to.not.have.been.called;
    });

    it('should handle errors and call next', async () => {
      const error = new Error('Refresh failed');
      handlePostStub.rejects(error);

      await refreshRoleAssignments(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });
  });

  describe('approveSpecificAccessRequest', () => {
    let createSpecificAccessApprovalRoleStub: sinon.SinonStub;
    let deleteRoleByAssignmentIdStub: sinon.SinonStub;
    let postTaskCompletionStub: sinon.SinonStub;
    let logAccessRequestStub: sinon.SinonStub;

    beforeEach(() => {
      req = mockReq({
        body: {
          specificAccessStateData: {
            requestId: 'request-123'
          }
        }
      });
      res = mockRes();
      createSpecificAccessApprovalRoleStub = sandbox.stub(roleAccess, 'createSpecificAccessApprovalRole');
      deleteRoleByAssignmentIdStub = sandbox.stub(roleAccess, 'deleteRoleByAssignmentId');
      postTaskCompletionStub = sandbox.stub(workAllocation, 'postTaskCompletionForAccess');
      logAccessRequestStub = sandbox.stub(lau, 'logAccessRequest');
    });

    it('should successfully approve specific access request', async () => {
      const mockFirstRoleResponse: AxiosResponse = {
        status: 201,
        data: {
          roleAssignmentResponse: {
            requestedRoles: [
              { id: 'role-1', name: 'Role 1' },
              { id: 'role-2', name: 'Role 2' }
            ]
          }
        },
        statusText: 'Created',
        headers: {},
        config: {} as any
      };

      const mockDeletionResponse: AxiosResponse = {
        status: 204,
        data: null,
        statusText: 'No Content',
        headers: {},
        config: {} as any
      };

      const mockTaskResponse: AxiosResponse = {
        status: 204,
        data: null,
        statusText: 'No Content',
        headers: {},
        config: {} as any
      };

      createSpecificAccessApprovalRoleStub.resolves(mockFirstRoleResponse);
      deleteRoleByAssignmentIdStub.resolves(mockDeletionResponse);
      postTaskCompletionStub.resolves(mockTaskResponse);

      await approveSpecificAccessRequest(req, res, next);

      expect(createSpecificAccessApprovalRoleStub).to.have.been.calledOnce;
      expect(deleteRoleByAssignmentIdStub).to.have.been.calledWith(req, res, next, 'request-123');
      expect(postTaskCompletionStub).to.have.been.calledOnce;
      expect(logAccessRequestStub).to.have.been.calledWith(req, false);
      expect(res.send).to.have.been.calledWith(null);
      expect(res.status).to.have.been.calledWith(204);
      expect(next).to.not.have.been.called;
    });

    it('should handle failure in creating specific access approval role', async () => {
      const mockResponse: AxiosResponse = {
        status: 400,
        data: { error: 'Bad Request' },
        statusText: 'Bad Request',
        headers: {},
        config: {} as any
      };

      createSpecificAccessApprovalRoleStub.resolves(mockResponse);

      await approveSpecificAccessRequest(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(deleteRoleByAssignmentIdStub).to.not.have.been.called;
      expect(postTaskCompletionStub).to.not.have.been.called;
      expect(next).to.not.have.been.called;
    });

    it('should handle null response from createSpecificAccessApprovalRole', async () => {
      createSpecificAccessApprovalRoleStub.resolves(null);

      await approveSpecificAccessRequest(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(deleteRoleByAssignmentIdStub).to.not.have.been.called;
      expect(postTaskCompletionStub).to.not.have.been.called;
      expect(next).to.not.have.been.called;
    });

    it('should handle deletion failure and attempt to delete created roles', async () => {
      const mockFirstRoleResponse: AxiosResponse = {
        status: 201,
        data: {
          roleAssignmentResponse: {
            requestedRoles: [
              { id: 'role-1', name: 'Role 1' },
              { id: 'role-2', name: 'Role 2' }
            ]
          }
        },
        statusText: 'Created',
        headers: {},
        config: {} as any
      };

      const mockDeletionFailure: AxiosResponse = {
        status: 500,
        data: { error: 'Internal Server Error' },
        statusText: 'Internal Server Error',
        headers: {},
        config: {} as any
      };

      createSpecificAccessApprovalRoleStub.resolves(mockFirstRoleResponse);
      deleteRoleByAssignmentIdStub.onFirstCall().resolves(mockDeletionFailure);

      // Mock deleteSpecificAccessRoles behavior
      deleteRoleByAssignmentIdStub.onSecondCall().resolves({ status: 204, data: null, statusText: 'No Content', headers: {}, config: {} as any });
      deleteRoleByAssignmentIdStub.onThirdCall().resolves({ status: 204, data: null, statusText: 'No Content', headers: {}, config: {} as any });

      await approveSpecificAccessRequest(req, res, next);

      expect(createSpecificAccessApprovalRoleStub).to.have.been.calledOnce;
      expect(deleteRoleByAssignmentIdStub).to.have.been.called;
      expect(postTaskCompletionStub).to.not.have.been.called;
      expect(res.status).to.have.been.calledWith(500);
    });

    it('should handle task completion failure and restore deleted role', async () => {
      const mockFirstRoleResponse: AxiosResponse = {
        status: 201,
        data: {
          roleAssignmentResponse: {
            requestedRoles: [
              { id: 'role-1', name: 'Role 1' },
              { id: 'role-2', name: 'Role 2' }
            ]
          }
        },
        statusText: 'Created',
        headers: {},
        config: {} as any
      };

      const mockDeletionResponse: AxiosResponse = {
        status: 204,
        data: null,
        statusText: 'No Content',
        headers: {},
        config: {} as any
      };

      const mockTaskFailure: AxiosResponse = {
        status: 500,
        data: { error: 'Task failed' },
        statusText: 'Internal Server Error',
        headers: {},
        config: {} as any
      };

      createSpecificAccessApprovalRoleStub.resolves(mockFirstRoleResponse);
      deleteRoleByAssignmentIdStub.onFirstCall().resolves(mockDeletionResponse);
      postTaskCompletionStub.resolves(mockTaskFailure);

      // Mock restore behavior
      const restoreStub = sandbox.stub(roleAccess, 'restoreSpecificAccessRequestRole');
      restoreStub.resolves({ status: 201, data: {}, statusText: 'Created', headers: {}, config: {} as any });
      deleteRoleByAssignmentIdStub.onSecondCall().resolves({ status: 204, data: null, statusText: 'No Content', headers: {}, config: {} as any });
      deleteRoleByAssignmentIdStub.onThirdCall().resolves({ status: 204, data: null, statusText: 'No Content', headers: {}, config: {} as any });

      await approveSpecificAccessRequest(req, res, next);

      expect(createSpecificAccessApprovalRoleStub).to.have.been.calledOnce;
      expect(deleteRoleByAssignmentIdStub.firstCall).to.have.been.calledWith(req, res, next, 'request-123');
      expect(postTaskCompletionStub).to.have.been.calledOnce;
      expect(restoreStub).to.have.been.calledOnce;
      expect(res.status).to.have.been.calledWith(500);
    });

    it('should handle errors and call next', async () => {
      const error = { status: 500, message: 'Server error' };
      createSpecificAccessApprovalRoleStub.rejects(error);

      await approveSpecificAccessRequest(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.have.been.calledWith(500);
      expect(res.send).to.have.been.calledWith(error);
    });
  });

  describe('deleteSpecificAccessRoles', () => {
    let deleteRoleByAssignmentIdStub: sinon.SinonStub;
    const previousResponse: AxiosResponse = {
      status: 400,
      data: { error: 'Previous error' },
      statusText: 'Bad Request',
      headers: {},
      config: {} as any
    };
    const rolesToDelete = [
      { id: 'role-1', name: 'Role 1' },
      { id: 'role-2', name: 'Role 2' }
    ];

    beforeEach(() => {
      req = mockReq({});
      res = mockRes();
      deleteRoleByAssignmentIdStub = sandbox.stub(roleAccess, 'deleteRoleByAssignmentId');
    });

    it('should successfully delete both roles', async () => {
      const mockDeletionResponse: AxiosResponse = {
        status: 204,
        data: null,
        statusText: 'No Content',
        headers: {},
        config: {} as any
      };

      deleteRoleByAssignmentIdStub.resolves(mockDeletionResponse);

      await deleteSpecificAccessRoles(req, res, next, previousResponse, rolesToDelete as any);

      expect(deleteRoleByAssignmentIdStub).to.have.been.calledTwice;
      expect(deleteRoleByAssignmentIdStub.firstCall).to.have.been.calledWith(req, res, next, 'role-2');
      expect(deleteRoleByAssignmentIdStub.secondCall).to.have.been.calledWith(req, res, next, 'role-1');
      expect(res.status).to.have.been.calledWith(400);
      expect(next).to.not.have.been.called;
    });

    it('should handle failure in first deletion', async () => {
      const mockFailure: AxiosResponse = {
        status: 500,
        data: { error: 'Deletion failed' },
        statusText: 'Internal Server Error',
        headers: {},
        config: {} as any
      };

      deleteRoleByAssignmentIdStub.resolves(mockFailure);

      await deleteSpecificAccessRoles(req, res, next, previousResponse, rolesToDelete as any);

      expect(deleteRoleByAssignmentIdStub).to.have.been.calledOnce;
      expect(res.status).to.have.been.calledWith(400);
      expect(next).to.not.have.been.called;
    });

    it('should handle null response in deletion', async () => {
      deleteRoleByAssignmentIdStub.resolves(null);

      await deleteSpecificAccessRoles(req, res, next, previousResponse, rolesToDelete as any);

      expect(deleteRoleByAssignmentIdStub).to.have.been.calledOnce;
      expect(res.status).to.have.been.calledWith(400);
      expect(next).to.not.have.been.called;
    });

    it('should handle failure in second deletion', async () => {
      const mockSuccess: AxiosResponse = {
        status: 204,
        data: null,
        statusText: 'No Content',
        headers: {},
        config: {} as any
      };
      const mockFailure: AxiosResponse = {
        status: 500,
        data: { error: 'Deletion failed' },
        statusText: 'Internal Server Error',
        headers: {},
        config: {} as any
      };

      deleteRoleByAssignmentIdStub.onFirstCall().resolves(mockSuccess);
      deleteRoleByAssignmentIdStub.onSecondCall().resolves(mockFailure);

      await deleteSpecificAccessRoles(req, res, next, previousResponse, rolesToDelete as any);

      expect(deleteRoleByAssignmentIdStub).to.have.been.calledTwice;
      expect(res.status).to.have.been.calledWith(400);
      expect(next).to.not.have.been.called;
    });

    it('should handle null previousResponse', async () => {
      await deleteSpecificAccessRoles(req, res, next, null, rolesToDelete as any);

      expect(res.status).to.have.been.calledWith(400);
      expect(next).to.not.have.been.called;
    });

    it('should handle errors and call next', async () => {
      const error = { status: 500, message: 'Server error' };
      deleteRoleByAssignmentIdStub.rejects(error);

      await deleteSpecificAccessRoles(req, res, next, previousResponse, rolesToDelete as any);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.have.been.calledWith(500);
      expect(res.send).to.have.been.calledWith(error);
    });
  });

  describe('restoreDeletedRole', () => {
    let restoreSpecificAccessRequestRoleStub: sinon.SinonStub;
    let deleteRoleByAssignmentIdStub: sinon.SinonStub;
    const previousResponse: AxiosResponse = {
      status: 500,
      data: { error: 'Previous error' },
      statusText: 'Internal Server Error',
      headers: {},
      config: {} as any
    };
    const rolesToDelete = [
      { id: 'role-1', name: 'Role 1' },
      { id: 'role-2', name: 'Role 2' }
    ];

    beforeEach(() => {
      req = mockReq({});
      res = mockRes();
      restoreSpecificAccessRequestRoleStub = sandbox.stub(roleAccess, 'restoreSpecificAccessRequestRole');
      deleteRoleByAssignmentIdStub = sandbox.stub(roleAccess, 'deleteRoleByAssignmentId');
    });

    it('should successfully restore role and delete created roles', async () => {
      const mockRestoreResponse: AxiosResponse = {
        status: 201,
        data: { restored: true },
        statusText: 'Created',
        headers: {},
        config: {} as any
      };
      const mockDeletionResponse: AxiosResponse = {
        status: 204,
        data: null,
        statusText: 'No Content',
        headers: {},
        config: {} as any
      };

      restoreSpecificAccessRequestRoleStub.resolves(mockRestoreResponse);
      deleteRoleByAssignmentIdStub.resolves(mockDeletionResponse);

      await restoreDeletedRole(req, res, next, previousResponse, rolesToDelete as any);

      expect(restoreSpecificAccessRequestRoleStub).to.have.been.calledOnce;
      expect(deleteRoleByAssignmentIdStub).to.have.been.calledTwice;
      expect(res.status).to.have.been.calledWith(500);
      expect(next).to.not.have.been.called;
    });

    it('should handle restore failure', async () => {
      const mockRestoreFailure: AxiosResponse = {
        status: 400,
        data: { error: 'Restore failed' },
        statusText: 'Bad Request',
        headers: {},
        config: {} as any
      };

      restoreSpecificAccessRequestRoleStub.resolves(mockRestoreFailure);

      await restoreDeletedRole(req, res, next, previousResponse, rolesToDelete as any);

      expect(restoreSpecificAccessRequestRoleStub).to.have.been.calledOnce;
      expect(deleteRoleByAssignmentIdStub).to.not.have.been.called;
      expect(res.status).to.have.been.calledWith(500);
      expect(next).to.not.have.been.called;
    });

    it('should handle null restore response', async () => {
      restoreSpecificAccessRequestRoleStub.resolves(null);

      await restoreDeletedRole(req, res, next, previousResponse, rolesToDelete as any);

      expect(restoreSpecificAccessRequestRoleStub).to.have.been.calledOnce;
      expect(deleteRoleByAssignmentIdStub).to.not.have.been.called;
      expect(res.status).to.have.been.calledWith(500);
      expect(next).to.not.have.been.called;
    });

    it('should handle null previousResponse', async () => {
      const mockRestoreResponse: AxiosResponse = {
        status: 201,
        data: { restored: true },
        statusText: 'Created',
        headers: {},
        config: {} as any
      };

      restoreSpecificAccessRequestRoleStub.resolves(mockRestoreResponse);
      deleteRoleByAssignmentIdStub.resolves({ status: 204, data: null, statusText: 'No Content', headers: {}, config: {} as any });

      await restoreDeletedRole(req, res, next, null, rolesToDelete as any);

      expect(res.status).to.have.been.calledWith(400);
      expect(next).to.not.have.been.called;
    });

    it('should handle errors and call next', async () => {
      const error = { status: 500, message: 'Server error' };
      restoreSpecificAccessRequestRoleStub.rejects(error);

      await restoreDeletedRole(req, res, next, previousResponse, rolesToDelete as any);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.have.been.calledWith(500);
      expect(res.send).to.have.been.calledWith(error);
    });
  });

  describe('removeAcceptHeader', () => {
    it('should remove accept header from proxy request', () => {
      const proxyReq = {
        removeHeader: sandbox.stub()
      };

      removeAcceptHeader(proxyReq);

      expect(proxyReq.removeHeader).to.have.been.calledWith('accept');
    });
  });
});

