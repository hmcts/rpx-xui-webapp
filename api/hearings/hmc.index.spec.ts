import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { Response } from 'express';
import { EnhancedRequest } from '../lib/models';
import * as crudService from '../common/crudService';
import * as configuration from '../configuration';
import * as appInsights from '../lib/appInsights';
import * as hmcIndex from './hmc.index';

import { HEARINGS_LIST, EMPTY_HEARINGS_LIST } from './data/hearingLists.mock.data';
import { HEARING_REQUEST_RESULTS } from './data/hearingRequests.mock.data';
import { HEARING_ACTUAL_COMPLETED } from './data/hearing-actuals.mock.data';
import { LINKED_HEARING_GROUP } from './data/linkHearings.mock.data';

import { LinkedHearingGroupResponseModel } from './models/linkHearings.model';
import { HMCStatus } from './models/hearings.enum';

// Using the actual HMC URL that is set at module level
const HMC_API_URL = 'http://hmc-cft-hearing-service-prod.service.core-compute-prod.internal';

describe('HMC Hearings API', () => {
  let sandbox: sinon.SinonSandbox;
  let req: EnhancedRequest;
  let res: Response;
  let next: sinon.SinonStub;
  let handleGetStub: sinon.SinonStub;
  let handlePostStub: sinon.SinonStub;
  let handlePutStub: sinon.SinonStub;
  let handleDeleteStub: sinon.SinonStub;
  let sendPutStub: sinon.SinonStub;
  let trackTraceStub: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    getConfigValueStub.withArgs('services.hearings.hmcApi').returns(HMC_API_URL);

    req = {
      query: {},
      params: {},
      body: {},
      headers: {},
      session: {}
    } as EnhancedRequest;

    res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    } as unknown as Response;

    next = sandbox.stub();

    handleGetStub = sandbox.stub(crudService, 'handleGet');
    handlePostStub = sandbox.stub(crudService, 'handlePost');
    handlePutStub = sandbox.stub(crudService, 'handlePut');
    handleDeleteStub = sandbox.stub(crudService, 'handleDelete');
    sendPutStub = sandbox.stub(crudService, 'sendPut');
    trackTraceStub = sandbox.stub(appInsights, 'trackTrace');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getHearings', () => {
    it('should get hearings successfully and map statuses', async () => {
      req.query = { caseId: '1584618195804035' };

      const mockResponse = {
        status: 200,
        data: { ...HEARINGS_LIST }
      };

      handleGetStub.resolves(mockResponse);

      await hmcIndex.getHearings(req, res, next);

      expect(handleGetStub).to.have.been.calledWith(
        `${HMC_API_URL}/hearings/1584618195804035`,
        req,
        next
      );

      // Verify that the status mapping was applied
      const sentData = (res.send as sinon.SinonStub).firstCall.args[0];
      const listedHearing = sentData.caseHearings.find((h) => h.hmcStatus === HMCStatus.LISTED);
      expect(listedHearing.exuiSectionStatus).to.equal('Current and upcoming');
      expect(listedHearing.exuiDisplayStatus).to.equal('LISTED');

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(sentData);
    });

    it('should handle empty hearings list', async () => {
      req.query = { caseId: '1584618195804035' };

      const mockResponse = {
        status: 200,
        data: { ...EMPTY_HEARINGS_LIST }
      };

      handleGetStub.resolves(mockResponse);

      await hmcIndex.getHearings(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
    });

    it('should handle getHearings error', async () => {
      req.query = { caseId: '1584618195804035' };
      const error = new Error('API failure');

      handleGetStub.rejects(error);

      await hmcIndex.getHearings(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });
  });

  describe('getHearing', () => {
    it('should get a single hearing successfully', async () => {
      req.query = { hearingId: 'h100001' };

      const mockResponse = {
        status: 200,
        data: { ...HEARING_REQUEST_RESULTS[0] }
      };

      handleGetStub.resolves(mockResponse);

      await hmcIndex.getHearing(req, res, next);

      expect(handleGetStub).to.have.been.calledWith(
        `${HMC_API_URL}/hearing/h100001`,
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
    });

    it('should handle getHearing error', async () => {
      req.query = { hearingId: 'h100001' };
      const error = new Error('Hearing not found');

      handleGetStub.rejects(error);

      await hmcIndex.getHearing(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('submitHearingRequest', () => {
    it('should submit hearing request successfully', async () => {
      req.body = { ...HEARING_REQUEST_RESULTS[0] };

      const mockResponse = {
        status: 201,
        data: { hearingRequestId: 'h100001', status: 'HEARING_REQUESTED' }
      };

      handlePostStub.resolves(mockResponse);

      await hmcIndex.submitHearingRequest(req, res, next);

      expect(trackTraceStub).to.have.been.calledWith('submitting hearing request');
      expect(handlePostStub).to.have.been.calledWith(
        `${HMC_API_URL}/hearing`,
        req.body,
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
    });

    it('should handle submitHearingRequest validation error', async () => {
      req.body = { invalid: 'data' };
      const error = { status: 400, message: 'Invalid request' };

      handlePostStub.rejects(error);

      await hmcIndex.submitHearingRequest(req, res, next);

      expect(trackTraceStub).to.have.been.calledWith('SubmitHearingRequest error:', error);
      expect(next).to.have.been.calledWith(error);
    });

    it('should handle submitHearingRequest server error', async () => {
      req.body = { ...HEARING_REQUEST_RESULTS[0] };
      const error = { status: 500, message: 'Server error' };

      handlePostStub.rejects(error);

      await hmcIndex.submitHearingRequest(req, res, next);

      expect(trackTraceStub).to.have.been.calledWith('SubmitHearingRequest error:', error);
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('cancelHearingRequest', () => {
    it('should cancel hearing request successfully', async () => {
      req.query = { hearingId: 'h100001' };
      req.body = { cancellationReason: 'No longer required' };

      const mockResponse = {
        status: 200,
        data: { message: 'Hearing cancelled' }
      };

      handleDeleteStub.resolves(mockResponse);

      await hmcIndex.cancelHearingRequest(req, res, next);

      expect(handleDeleteStub).to.have.been.calledWith(
        `${HMC_API_URL}/hearing/h100001`,
        req.body,
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
    });

    it('should handle cancelHearingRequest error', async () => {
      req.query = { hearingId: 'h100001' };
      const error = new Error('Cannot cancel hearing');

      handleDeleteStub.rejects(error);

      await hmcIndex.cancelHearingRequest(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('updateHearingRequest', () => {
    it('should update hearing request successfully', async () => {
      req.query = { hearingId: 'h100001' };
      req.body = { duration: 60 };

      const mockResponse = {
        status: 200,
        data: { message: 'Hearing updated' }
      };

      handlePutStub.resolves(mockResponse);

      await hmcIndex.updateHearingRequest(req, res, next);

      expect(handlePutStub).to.have.been.calledWith(
        `${HMC_API_URL}/hearing/h100001`,
        req.body,
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
    });

    it('should handle updateHearingRequest error', async () => {
      req.query = { hearingId: 'h100001' };
      const error = new Error('Update failed');

      handlePutStub.rejects(error);

      await hmcIndex.updateHearingRequest(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getHearingActuals', () => {
    it('should get hearing actuals successfully', async () => {
      req.params = { hearingId: 'h100001' };

      const mockResponse = {
        status: 200,
        data: { ...HEARING_ACTUAL_COMPLETED }
      };

      handleGetStub.resolves(mockResponse);

      await hmcIndex.getHearingActuals(req, res, next);

      expect(handleGetStub).to.have.been.calledWith(
        `${HMC_API_URL}/hearingActuals/h100001`,
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
    });

    it('should handle getHearingActuals error', async () => {
      req.params = { hearingId: 'h100001' };
      const error = new Error('Actuals not found');

      handleGetStub.rejects(error);

      await hmcIndex.getHearingActuals(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('updateHearingActuals', () => {
    it('should update hearing actuals successfully', async () => {
      req.query = { hearingId: 'h100001' };
      req.body = { actualHearingDays: [] };

      const mockResponse = {
        status: 200,
        data: { message: 'Actuals updated' }
      };

      sendPutStub.resolves(mockResponse);

      await hmcIndex.updateHearingActuals(req, res, next);

      expect(sendPutStub).to.have.been.calledWith(
        `${HMC_API_URL}/hearingActuals/h100001`,
        req.body,
        req
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
    });

    it('should handle updateHearingActuals error', async () => {
      req.query = { hearingId: 'h100001' };
      const error = new Error('Update failed');

      sendPutStub.rejects(error);

      await hmcIndex.updateHearingActuals(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('submitHearingActuals', () => {
    it('should submit hearing actuals completion successfully', async () => {
      req.params = { hearingId: 'h100001' };

      const mockResponse = { status: 204 };

      handlePostStub.resolves(mockResponse);

      await hmcIndex.submitHearingActuals(req, res, next);

      expect(handlePostStub).to.have.been.calledWith(
        `${HMC_API_URL}/hearingActualsCompletion/h100001`,
        null,
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(204);
      expect(res.send).to.have.been.calledWith(null);
    });

    it('should handle submitHearingActuals error', async () => {
      req.params = { hearingId: 'h100001' };
      const error = new Error('Submission failed');

      handlePostStub.rejects(error);

      await hmcIndex.submitHearingActuals(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getLinkedHearingGroup', () => {
    it('should get linked hearing group successfully', async () => {
      req.query = { groupId: 'g1000000' };

      const mockResponse = {
        status: 200,
        data: { ...LINKED_HEARING_GROUP }
      };

      handleGetStub.resolves(mockResponse);

      await hmcIndex.getLinkedHearingGroup(req, res, next);

      expect(handleGetStub).to.have.been.calledWith(
        `${HMC_API_URL}/linkedHearingGroup/g1000000`,
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
    });

    it('should handle getLinkedHearingGroup error', async () => {
      req.query = { groupId: 'g1000000' };
      const error = new Error('Group not found');

      handleGetStub.rejects(error);

      await hmcIndex.getLinkedHearingGroup(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('postLinkedHearingGroup', () => {
    it('should create linked hearing group successfully', async () => {
      req.body = { ...LINKED_HEARING_GROUP };

      const mockResponse: { status: number; data: LinkedHearingGroupResponseModel } = {
        status: 201,
        data: { hearingGroupRequestId: 'g1000001' }
      };

      handlePostStub.resolves(mockResponse);

      await hmcIndex.postLinkedHearingGroup(req, res, next);

      expect(handlePostStub).to.have.been.calledWith(
        `${HMC_API_URL}/linkedHearingGroup`,
        req.body,
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
    });

    it('should handle postLinkedHearingGroup error', async () => {
      req.body = { ...LINKED_HEARING_GROUP };
      const error = new Error('Creation failed');

      handlePostStub.rejects(error);

      await hmcIndex.postLinkedHearingGroup(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('putLinkedHearingGroup', () => {
    it('should update linked hearing group successfully', async () => {
      req.query = { groupId: 'g1000000' };
      req.body = { hearingsInGroup: ['h100001', 'h100002'] };

      const mockResponse: { status: number; data: LinkedHearingGroupResponseModel } = {
        status: 200,
        data: { hearingGroupRequestId: 'g1000000' }
      };

      handlePutStub.resolves(mockResponse);

      await hmcIndex.putLinkedHearingGroup(req, res, next);

      expect(handlePutStub).to.have.been.calledWith(
        `${HMC_API_URL}/linkedHearingGroup?id=g1000000`,
        req.body,
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
    });

    it('should handle putLinkedHearingGroup error', async () => {
      req.query = { groupId: 'g1000000' };
      const error = new Error('Update failed');

      handlePutStub.rejects(error);

      await hmcIndex.putLinkedHearingGroup(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('deleteLinkedHearingGroup', () => {
    it('should delete linked hearing group successfully', async () => {
      req.query = { hearingGroupId: 'g1000000' };
      req.body = { reason: 'No longer needed' };

      const mockResponse: { status: number; data: LinkedHearingGroupResponseModel } = {
        status: 200,
        data: { hearingGroupRequestId: 'g1000000' }
      };

      handleDeleteStub.resolves(mockResponse);

      await hmcIndex.deleteLinkedHearingGroup(req, res, next);

      expect(handleDeleteStub).to.have.been.calledWith(
        `${HMC_API_URL}/linkedHearingGroup/g1000000`,
        req.body,
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
    });

    it('should handle deleteLinkedHearingGroup error', async () => {
      req.query = { hearingGroupId: 'g1000000' };
      const error = new Error('Deletion failed');

      handleDeleteStub.rejects(error);

      await hmcIndex.deleteLinkedHearingGroup(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('injectHearingsHeaders', () => {
    it('should inject headers when feature is enabled', () => {
      getConfigValueStub.withArgs('services.hearings.enableHearingDataSourceHeaders').returns('true');
      getConfigValueStub.withArgs('services.role_assignment.roleApi').returns('http://role-assignment-api');
      getConfigValueStub.withArgs('services.ccd.dataApi').returns('http://ccd-data-api');

      req.headers = {};

      hmcIndex.injectHearingsHeaders(req, res, next);

      expect(req.headers['Role-Assignment-Url']).to.equal('http://role-assignment-api');
      expect(req.headers['Data-Store-Url']).to.equal('http://ccd-data-api');
      expect(next).to.have.been.called;
    });

    it('should not inject headers when feature is disabled', () => {
      getConfigValueStub.withArgs('services.hearings.enableHearingDataSourceHeaders').returns('false');

      req.headers = {};

      hmcIndex.injectHearingsHeaders(req, res, next);

      expect(req.headers['Role-Assignment-Url']).to.be.undefined;
      expect(req.headers['Data-Store-Url']).to.be.undefined;
      expect(next).to.have.been.called;
    });

    it('should handle missing configuration gracefully', () => {
      getConfigValueStub.withArgs('services.hearings.enableHearingDataSourceHeaders').returns(undefined);

      req.headers = {};

      hmcIndex.injectHearingsHeaders(req, res, next);

      expect(req.headers['Role-Assignment-Url']).to.be.undefined;
      expect(req.headers['Data-Store-Url']).to.be.undefined;
      expect(next).to.have.been.called;
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing query parameters gracefully', async () => {
      req.query = {};

      await hmcIndex.getHearings(req, res, next);

      expect(handleGetStub).to.have.been.calledWith(
        `${HMC_API_URL}/hearings/undefined`,
        req,
        next
      );
    });

    it('should handle null response data gracefully', async () => {
      req.query = { caseId: '1584618195804035' };

      const mockResponse = {
        status: 200,
        data: null
      };

      handleGetStub.resolves(mockResponse);

      try {
        await hmcIndex.getHearings(req, res, next);
      } catch (error) {
        // This would throw an error when trying to access data.caseHearings
        expect(next).to.have.been.called;
      }
    });

    it('should handle empty request body gracefully', async () => {
      req.body = {};

      const mockResponse = {
        status: 201,
        data: { hearingRequestId: 'h100001' }
      };

      handlePostStub.resolves(mockResponse);

      await hmcIndex.submitHearingRequest(req, res, next);

      expect(handlePostStub).to.have.been.calledWith(
        `${HMC_API_URL}/hearing`,
        {},
        req,
        next
      );
    });
  });
});
