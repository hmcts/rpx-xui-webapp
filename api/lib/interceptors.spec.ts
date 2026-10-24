import * as chai from 'chai';
import { expect } from 'chai';
import * as log4js from 'log4js';
import 'mocha';
import * as sinon from 'sinon';
import { errorInterceptor, requestInterceptor, successInterceptor } from './interceptors';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('interceptors', () => {
  const response = {
    config: {
      data: JSON.stringify({
        caseId: 'case-123',
        jurisdiction: 'IA',
        taskId: 'task-456',
      }),
      metadata: {
        startTime: new Date(),
      },
      method: 'POST',
      url: 'http://test2.com',
    },
    status: 200,
  };
  const request = {
    data: JSON.stringify({
      processVariables: {
        jurisdiction: { value: 'SSCS' },
      },
    }),
    method: 'GET',
    url: 'http://test.com/task/task-123?caseId=case-999',
  };
  const error = {
    config: {
      data: {
        authenticated: false,
      },
      metadata: {},
      method: 'GET',
      response: {
        status: 500,
      },
      url: 'http://test.com',
    },
    request: {},
    response: {
      data: {
        details: {
          error: true,
        },
      },
    },
  };

  describe('requestInterceptor', () => {
    it('Should log outbound request', () => {
      const spy = sinon.spy();
      const getLoggerStub = sinon.stub(log4js, 'getLogger');
      getLoggerStub.returns({ info: spy, addContext: sinon.spy(), level: 'debug' } as unknown as log4js.Logger);
      requestInterceptor(request);
      expect(spy.firstCall.args[0]).to.contain('GET to http://test.com/task/task-123?caseId=case-999');
      expect(spy.firstCall.args[0]).to.contain('event=request');
      expect(spy.firstCall.args[0]).to.contain('datetime=');
      expect(spy.firstCall.args[0]).to.contain('outboundId=');
      expect(spy.firstCall.args[0]).to.contain('service=test');
      expect(spy.firstCall.args[0]).to.contain('host=test.com');
      expect(spy.firstCall.args[0]).to.contain('jurisdiction=SSCS');
      expect(spy.firstCall.args[0]).to.contain('taskId=task-123');
      expect(spy.firstCall.args[0]).to.contain('caseId=case-999');
      getLoggerStub.restore();
    });

    it('Should return request unmutilated', () => {
      const getLoggerStub = sinon.stub(log4js, 'getLogger');
      getLoggerStub.returns({ info: sinon.spy(), addContext: sinon.spy(), level: 'debug' } as unknown as log4js.Logger);
      const result = requestInterceptor(request);
      expect(result).to.be.equal(request);
      getLoggerStub.restore();
    });
  });

  describe('successInterceptor', () => {
    it('Should log returned response', () => {
      const spy = sinon.spy();
      const getLoggerStub = sinon.stub(log4js, 'getLogger');
      getLoggerStub.returns({ info: spy, addContext: sinon.spy(), level: 'debug' } as unknown as log4js.Logger);
      successInterceptor(response);

      expect(spy.firstCall.args[0]).to.contain('Success on POST to http://test2.com');
      expect(spy.firstCall.args[0]).to.contain('event=response');
      expect(spy.firstCall.args[0]).to.contain('datetime=');
      expect(spy.firstCall.args[0]).to.contain('outboundId=');
      expect(spy.firstCall.args[0]).to.contain('method=POST');
      expect(spy.firstCall.args[0]).to.contain('status=');
      expect(spy.firstCall.args[0]).to.contain('durationMs=');
      expect(spy.firstCall.args[0]).to.contain('service=test2');
      expect(spy.firstCall.args[0]).to.contain('host=test2.com');
      expect(spy.firstCall.args[0]).to.contain('jurisdiction=IA');
      expect(spy.firstCall.args[0]).to.contain('taskId=task-456');
      expect(spy.firstCall.args[0]).to.contain('caseId=case-123');
      getLoggerStub.restore();
    });

    it('Should return response unmutilated', () => {
      const getLoggerStub = sinon.stub(log4js, 'getLogger');
      getLoggerStub.returns({ info: sinon.spy(), addContext: sinon.spy(), level: 'debug' } as unknown as log4js.Logger);
      const result = successInterceptor(response);
      expect(result).to.be.equal(response);
      getLoggerStub.restore();
    });
  });

  describe('errorInterceptor', () => {
    it('Should log returned response', () => {
      const spy = sinon.spy();
      const getLoggerStub = sinon.stub(log4js, 'getLogger');
      getLoggerStub.returns({ error: spy, addContext: sinon.spy(), level: 'debug' } as unknown as log4js.Logger);
      errorInterceptor(error).catch(() => {
        expect(spy).to.be.called;
        expect(spy.firstCall.args[0]).to.contain('event=error');
        expect(spy.firstCall.args[0]).to.contain('datetime=');
        expect(spy.firstCall.args[0]).to.contain('outboundId=');
        expect(spy.firstCall.args[0]).to.contain('durationMs=');
        getLoggerStub.restore();
      });
    });
  });
});
