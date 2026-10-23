import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as configuration from '../configuration';
import { SERVICES_WORK_ALLOCATION_TASK_API_PATH } from '../configuration/references';
import { http } from './http';
import * as log4jui from './log4jui';
import * as errorHandler from './error.handler';
import { propsExist } from './objectUtilities';
import * as proxy from './proxy';
import { handleTaskSearch } from '../workAllocation/taskService';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('errorHandler', () => {
  let next;
  let sandbox;
  let req;
  let res;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.spy();
    res = mockRes();
    req = mockReq({
      cookies: [],
      headers: [],
      session: {
        save: (fun) => {
          fun();
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should empty headers if it exists', () => {
    const err = {
      config: {
        headers: {},
      },
    };
    errorHandler.default(err, req, res, next);

    expect(propsExist(err, ['config', 'headers'])).to.be.false;
  });

  it('should return default response', () => {
    const err = {};
    errorHandler.default(err, req, res, next);
    expect(res.status).to.have.been.calledWith(500);
    expect(res.send).to.have.been.calledWith({ message: 'Internal Server Error' });
  });

  it('should return status and content if it exists', () => {
    const err = {
      status: 404,
      data: {
        test: 'dummy',
      },
    };
    errorHandler.default(err, req, res, next);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.send).to.have.been.calledWith({ test: 'dummy' });
  });

  it('should empty _header if it exists', () => {
    const err = {
      request: {
        _header: {},
      },
    };
    errorHandler.default(err, req, res, next);

    expect(propsExist(err, ['request', '_header'])).to.be.false;
  });

  it('does not log task identifiers echoed in a task-service error response', () => {
    const stdoutWrite = sandbox.spy(process.stdout, 'write');
    const stderrWrite = sandbox.spy(process.stderr, 'write');
    const taskId = 'PRIVATE_TASK_ID';
    const err = {
      config: { url: `https://wa.example/task/${taskId}/complete` },
      data: { details: `Task ${taskId} could not be completed`, taskId },
      status: 500,
    };

    errorHandler.default(err, req, res, next);

    const emittedLogs = JSON.stringify([...stdoutWrite.args, ...stderrWrite.args]);
    expect(emittedLogs).to.contain('Work Allocation task request failed status=500');
    expect(emittedLogs).not.to.contain(taskId);
    expect(res.send).to.have.been.calledWith(err.data);
  });

  it('does not log task-search response data while preserving the Axios response to the caller', () => {
    const stdoutWrite = sandbox.spy(process.stdout, 'write');
    const stderrWrite = sandbox.spy(process.stderr, 'write');
    const caseId = 'CASE-SEARCH-CANARY';
    const requestToken = 'REQUEST-TOKEN-CANARY';
    const taskApiBases = [
      'https://wa.example.test/context/api',
      'https://wa.example.test/context/api/',
      'https://wa.example.test',
    ];
    const upstreamBody = { details: `Sensitive ${caseId}`, task: 'TASK-SEARCH-CANARY' };
    const getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    let configuredTaskApiBase = taskApiBases[0];
    getConfigValueStub.withArgs(SERVICES_WORK_ALLOCATION_TASK_API_PATH).callsFake(() => configuredTaskApiBase);

    for (const taskApiBase of taskApiBases) {
      configuredTaskApiBase = taskApiBase;
      const err = {
        config: {
          method: 'post',
          url: `${taskApiBase}/task?case_id=${caseId}&access_token=${requestToken}`,
        },
        data: upstreamBody,
        status: 503,
      };

      errorHandler.default(err, req, res, next);

      expect(err.data).to.deep.equal({ details: `Sensitive ${caseId}`, task: 'TASK-SEARCH-CANARY' });
    }

    const emittedLogs = JSON.stringify([...stdoutWrite.args, ...stderrWrite.args]);
    expect(emittedLogs).to.contain('Work Allocation task request failed status=503');
    for (const sensitiveValue of [caseId, requestToken, 'TASK-SEARCH-CANARY', 'Sensitive']) {
      expect(emittedLogs).not.to.contain(sensitiveValue);
    }
    expect(res.status.callCount).to.equal(taskApiBases.length);
    expect(res.status.args).to.deep.equal(taskApiBases.map(() => [503]));
    expect(res.send.callCount).to.equal(taskApiBases.length);
    expect(res.send.args).to.deep.equal(taskApiBases.map(() => [upstreamBody]));
  });

  it('does not classify an unrelated API URL ending in /task as Work Allocation search', () => {
    const responseBody = { details: 'UNRELATED-TASK-BODY-CANARY' };
    const getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    getConfigValueStub.withArgs(SERVICES_WORK_ALLOCATION_TASK_API_PATH).returns('https://wa.example.test/context/api');
    const err = {
      config: { method: 'post', url: 'https://wa.example.test/other-api/task' },
      data: responseBody,
      status: 503,
    };

    errorHandler.default(err, req, res, next);

    expect(res.status).to.have.been.calledWith(503);
    expect(res.send).to.have.been.calledWithExactly(responseBody);
  });

  it('emits one safe diagnostic for a task-search failure and preserves the response', async () => {
    const caseId = 'CASE-LOG-ONCE-CANARY';
    const requestToken = 'TASK-LOG-ONCE-TOKEN';
    const requestBody = { caseId, taskId: 'TASK-LOG-ONCE-CANARY' };
    const upstreamBody = { details: `Failure for ${caseId}`, personId: 'PERSON-LOG-ONCE-CANARY' };
    const taskApiBase = 'https://wa.example.test/context/api';
    const stdoutWrite = sandbox.spy(process.stdout, 'write');
    const stderrWrite = sandbox.spy(process.stderr, 'write');
    const loggerCalls: string[] = [];
    const getLoggerStub = sandbox.stub(log4jui, 'getLogger').callsFake(
      () =>
        ({
          error: (...args: unknown[]) => loggerCalls.push(args.join(' ')),
          info: (...args: unknown[]) => loggerCalls.push(args.join(' ')),
          trackRequest: sandbox.spy(),
        }) as any
    );
    const getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    getConfigValueStub.withArgs(SERVICES_WORK_ALLOCATION_TASK_API_PATH).returns(taskApiBase);
    sandbox.stub(proxy, 'setHeaders').returns({ Authorization: `Bearer ${requestToken}` });
    const originalAdapter = http.defaults.adapter;
    http.defaults.adapter = async (config) => {
      throw Object.assign(new Error(`upstream error ${JSON.stringify(upstreamBody)}`), {
        config,
        response: {
          config,
          data: upstreamBody,
          headers: {},
          status: 503,
          statusText: 'Service Unavailable',
        },
      });
    };

    try {
      let dependencyResponse;
      try {
        await handleTaskSearch(`${taskApiBase}/task?case_id=${caseId}&access_token=${requestToken}`, requestBody, req);
        expect.fail('Expected the Work Allocation dependency failure to reject');
      } catch (error) {
        dependencyResponse = error;
      }

      errorHandler.default(dependencyResponse, req, res, next);

      const emitted = [...loggerCalls, ...stdoutWrite.args, ...stderrWrite.args].join(' ');
      const diagnosticCount = emitted.match(/Work Allocation task request failed/g)?.length ?? 0;
      expect(diagnosticCount).to.equal(1);
      expect(getLoggerStub).to.have.been.calledWith('return');
      expect(emitted).not.to.contain('Work Allocation dependency failure');
      expect(emitted).to.contain('status=503');
      expect(emitted).to.contain('outboundId=');
      for (const sensitiveValue of [caseId, requestToken, requestBody.taskId, upstreamBody.details, upstreamBody.personId]) {
        expect(emitted).not.to.contain(sensitiveValue);
      }
      expect(res.status).to.have.been.calledWith(503);
      expect(res.send).to.have.been.calledWith(upstreamBody);
    } finally {
      http.defaults.adapter = originalAdapter;
    }
  });

  it('does not log a Work Allocation response again after its safe interceptor diagnostic', () => {
    const stdoutWrite = sandbox.spy(process.stdout, 'write');
    const stderrWrite = sandbox.spy(process.stderr, 'write');
    const caseId = 'STATIC-WA-CASE-ID-CANARY';
    const taskId = 'STATIC-WA-TASK-ID-CANARY';
    const upstreamDetail = 'PRIVATE-UPSTREAM-DETAIL-CANARY';
    const errorData = { caseId, taskId, details: upstreamDetail };
    const taskApiBase = 'https://wa.example.test/context/api';
    sandbox.stub(configuration, 'getConfigValue').withArgs(SERVICES_WORK_ALLOCATION_TASK_API_PATH).returns(taskApiBase);
    const err = {
      config: {
        method: 'POST',
        url: `${taskApiBase}/task`,
        metadata: { logContext: { outboundId: 'request-1' } },
      },
      data: errorData,
      status: 502,
    };

    errorHandler.default(err, req, res, next);

    const emittedLogs = JSON.stringify([...stdoutWrite.args, ...stderrWrite.args]);
    expect(emittedLogs).not.to.contain(caseId);
    expect(emittedLogs).not.to.contain(taskId);
    expect(emittedLogs).not.to.contain(upstreamDetail);
    expect(res.status).to.have.been.calledWith(502);
    expect(res.send).to.have.been.calledWithExactly(errorData);
  });

  it('preserves interceptor context when a task-search request fails before receiving a response', async () => {
    const caseId = 'CASE-NETWORK-FAILURE-CANARY';
    const requestToken = 'NETWORK-FAILURE-TOKEN-CANARY';
    const taskApiBase = 'https://wa.example.test/context/api';
    const loggerCalls: string[] = [];
    const getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    getConfigValueStub.withArgs(SERVICES_WORK_ALLOCATION_TASK_API_PATH).returns(taskApiBase);
    sandbox.stub(proxy, 'setHeaders').returns({ Authorization: `Bearer ${requestToken}` });
    const getLoggerStub = sandbox.stub(log4jui, 'getLogger').callsFake(
      () =>
        ({
          error: (...args: unknown[]) => loggerCalls.push(args.join(' ')),
          info: (...args: unknown[]) => loggerCalls.push(args.join(' ')),
          trackRequest: sandbox.spy(),
        }) as any
    );
    const originalAdapter = http.defaults.adapter;
    http.defaults.adapter = async (config) => {
      throw Object.assign(new Error('WORK-ALLOCATION-NETWORK-FAILURE'), { config });
    };

    try {
      let dependencyError;
      try {
        await handleTaskSearch(`${taskApiBase}/task`, { caseId }, req);
        expect.fail('Expected the network error to reject');
      } catch (error) {
        dependencyError = error;
      }

      expect(dependencyError).to.be.instanceOf(Error);
      expect(dependencyError.config.metadata.logContext.outboundId).to.match(/^outbound-\d+-\d+$/);
      errorHandler.default(dependencyError, req, res, next);

      const emitted = loggerCalls.join(' ');
      expect(emitted.match(/Work Allocation task request failed/g)).to.have.length(1);
      expect(emitted).to.contain('status=unavailable');
      for (const sensitiveValue of [caseId, requestToken, 'WORK-ALLOCATION-NETWORK-FAILURE']) {
        expect(emitted).not.to.contain(sensitiveValue);
      }
      expect(res.status).to.have.been.calledWith(500);
      expect(res.send).to.have.been.calledWith({ message: 'Internal Server Error' });
    } finally {
      http.defaults.adapter = originalAdapter;
      getLoggerStub.restore();
      getConfigValueStub.restore();
    }
  });
});
