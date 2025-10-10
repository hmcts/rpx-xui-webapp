
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';

import * as crudService from '../../common/crudService';
import * as configuration from '../../configuration';
import { getLovRefData } from './index';
import { LovRefDataByServiceModel } from './models/lovRefData.model';
import {
  DEFAULT_JUDGE_TYPES_REF,
  DEFAULT_STAGES_REF,
  DEFAULT_PRIORITIES_REF,
  DEFAULT_PARTYCHANNEL_REF,
  ALL_REF_DATA
} from './data/lov.mock.data';

chai.use(sinonChai);

describe('LOV Service', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;
  let sendGetStub: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.stub();
    res = mockRes();

    getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');

    sendGetStub = sandbox.stub(crudService, 'sendGet');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getLovRefData', () => {
    it('should successfully retrieve LOV reference data with all parameters', async () => {
      req = mockReq({
        query: {
          serviceId: 'BBA3',
          categoryId: 'JudgeType',
          isChildRequired: 'Y'
        }
      });

      const mockResponseData: LovRefDataByServiceModel = {
        list_of_values: DEFAULT_JUDGE_TYPES_REF
      };

      sendGetStub.resolves({
        status: 200,
        data: mockResponseData
      });

      await getLovRefData(req, res, next);

      expect(sendGetStub).to.have.been.calledOnce;
      const actualCallArgs = sendGetStub.getCall(0).args;
      expect(actualCallArgs[0]).to.include('/refdata/commondata/lov/categories/JudgeType?serviceId=BBA3&isChildRequired=Y');
      expect(actualCallArgs[1]).to.equal(req);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(DEFAULT_JUDGE_TYPES_REF);
      expect(next).to.not.have.been.called;
    });

    it('should handle HearingType category with nested child nodes', async () => {
      req = mockReq({
        query: {
          serviceId: 'BBA3',
          categoryId: 'HearingChannel',
          isChildRequired: 'Y'
        }
      });

      const mockResponseData: LovRefDataByServiceModel = {
        list_of_values: DEFAULT_PARTYCHANNEL_REF
      };

      sendGetStub.resolves({
        status: 200,
        data: mockResponseData
      });

      await getLovRefData(req, res, next);

      const actualCallArgs = sendGetStub.getCall(0).args;
      expect(actualCallArgs[0]).to.include('/refdata/commondata/lov/categories/HearingChannel?serviceId=BBA3&isChildRequired=Y');
      expect(actualCallArgs[1]).to.equal(req);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(DEFAULT_PARTYCHANNEL_REF);
      // Verify that child nodes are present
      const sentData = res.send.getCall(0).args[0];
      expect(sentData[1].child_nodes).to.be.an('array').that.has.lengthOf(4);
      expect(sentData[1].child_nodes[0]).to.have.property('key');
    });

    it('should handle request without child nodes when isChildRequired is not Y', async () => {
      req = mockReq({
        query: {
          serviceId: 'BBA3',
          categoryId: 'HearingPriority',
          isChildRequired: 'N'
        }
      });

      const mockResponseData: LovRefDataByServiceModel = {
        list_of_values: DEFAULT_PRIORITIES_REF
      };

      sendGetStub.resolves({
        status: 200,
        data: mockResponseData
      });

      await getLovRefData(req, res, next);

      const actualCallArgs = sendGetStub.getCall(0).args;
      expect(actualCallArgs[0]).to.include('/refdata/commondata/lov/categories/HearingPriority?serviceId=BBA3&isChildRequired=N');
      expect(actualCallArgs[1]).to.equal(req);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(DEFAULT_PRIORITIES_REF);
    });

    it('should handle empty list_of_values array', async () => {
      req = mockReq({
        query: {
          serviceId: 'TEST',
          categoryId: 'EmptyCategory',
          isChildRequired: 'Y'
        }
      });

      const mockResponseData: LovRefDataByServiceModel = {
        list_of_values: []
      };

      sendGetStub.resolves({
        status: 200,
        data: mockResponseData
      });

      await getLovRefData(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
    });

    it('should handle 404 not found response', async () => {
      req = mockReq({
        query: {
          serviceId: 'INVALID',
          categoryId: 'InvalidCategory',
          isChildRequired: 'Y'
        }
      });

      const error = new Error('Not Found') as Error & { status: number };
      error.status = 404;
      sendGetStub.rejects(error);

      await getLovRefData(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should handle different status codes correctly', async () => {
      req = mockReq({
        query: {
          serviceId: 'BBA3',
          categoryId: 'TestCategory',
          isChildRequired: 'Y'
        }
      });

      const mockResponseData: LovRefDataByServiceModel = {
        list_of_values: [
          {
            category_key: 'TestCategory',
            key: 'test',
            value_en: 'Test Value',
            value_cy: '',
            hint_text_en: 'Test Hint',
            hint_text_cy: '',
            lov_order: 1,
            parent_category: '',
            parent_key: '',
            active_flag: 'Y',
            child_nodes: null
          }
        ]
      };

      sendGetStub.resolves({
        status: 201,
        data: mockResponseData
      });

      await getLovRefData(req, res, next);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith(mockResponseData.list_of_values);
    });

    it('should handle errors and call next', async () => {
      req = mockReq({
        query: {
          serviceId: 'BBA3',
          categoryId: 'JudgeType',
          isChildRequired: 'Y'
        }
      });

      const error = new Error('API Error');
      sendGetStub.rejects(error);

      await getLovRefData(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should handle network errors', async () => {
      req = mockReq({
        query: {
          serviceId: 'BBA3',
          categoryId: 'JudgeType',
          isChildRequired: 'Y'
        }
      });

      const networkError = new Error('ECONNREFUSED');
      sendGetStub.rejects(networkError);

      await getLovRefData(req, res, next);

      expect(next).to.have.been.calledWith(networkError);
    });

    it('should handle missing data property in response', async () => {
      req = mockReq({
        query: {
          serviceId: 'BBA3',
          categoryId: 'JudgeType',
          isChildRequired: 'Y'
        }
      });

      sendGetStub.resolves({
        status: 200,
        data: null
      });

      await getLovRefData(req, res, next);

      // When data is null, accessing data.list_of_values throws an error
      expect(next).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
      const error = next.getCall(0).args[0];
      expect(error).to.be.an('error');
      expect(error.message).to.include('Cannot read');
    });

    it('should handle missing list_of_values property in data', async () => {
      req = mockReq({
        query: {
          serviceId: 'BBA3',
          categoryId: 'JudgeType',
          isChildRequired: 'Y'
        }
      });

      sendGetStub.resolves({
        status: 200,
        data: {} // data exists but no list_of_values property
      });

      await getLovRefData(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(undefined);
    });

    it('should construct URL with special characters properly', async () => {
      req = mockReq({
        query: {
          serviceId: 'Service With Spaces',
          categoryId: 'Category&Special',
          isChildRequired: 'Y'
        }
      });

      const mockResponseData: LovRefDataByServiceModel = {
        list_of_values: []
      };

      sendGetStub.resolves({
        status: 200,
        data: mockResponseData
      });

      await getLovRefData(req, res, next);

      // URLSearchParams should properly encode special characters
      const actualCallArgs = sendGetStub.getCall(0).args;
      expect(actualCallArgs[0]).to.include('/refdata/commondata/lov/categories/Category&Special?serviceId=Service+With+Spaces&isChildRequired=Y');
      expect(actualCallArgs[1]).to.equal(req);
    });

    it('should handle timeout errors', async () => {
      req = mockReq({
        query: {
          serviceId: 'BBA3',
          categoryId: 'JudgeType',
          isChildRequired: 'Y'
        }
      });

      const timeoutError = new Error('Request timeout');
      timeoutError.name = 'TimeoutError';
      sendGetStub.rejects(timeoutError);

      await getLovRefData(req, res, next);

      expect(next).to.have.been.calledWith(timeoutError);
    });
  });
});
