import * as chai from 'chai';
import { expect } from 'chai';
import * as log4js from 'log4js';
import * as log4jui from './log4jui';
import 'mocha';
import * as sinon from 'sinon';
import { http } from './http';
import { errorInterceptor, requestInterceptor, successInterceptor } from './interceptors';
import * as configuration from '../configuration';
import { SERVICES_WORK_ALLOCATION_TASK_API_PATH } from '../configuration/references';

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
      method: 'POST',
      response: {
        status: 500,
      },
      url: 'http://test.com/unrelated',
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
      expect(spy.firstCall.args[0]).to.contain('GET to http://test.com/task/[REDACTED]?caseId=[REDACTED]');
      expect(spy.firstCall.args[0]).to.contain('event=request');
      expect(spy.firstCall.args[0]).to.contain('datetime=');
      expect(spy.firstCall.args[0]).to.contain('outboundId=');
      expect(spy.firstCall.args[0]).to.contain('service=test');
      expect(spy.firstCall.args[0]).to.contain('host=test.com');
      expect(spy.firstCall.args[0]).to.contain('jurisdiction=SSCS');
      expect(spy.firstCall.args[0]).not.to.contain('task-123');
      expect(spy.firstCall.args[0]).not.to.contain('case-999');
      getLoggerStub.restore();
    });

    it('Should return request unmutilated', () => {
      const getLoggerStub = sinon.stub(log4js, 'getLogger');
      getLoggerStub.returns({ info: sinon.spy(), addContext: sinon.spy(), level: 'debug' } as unknown as log4js.Logger);
      const result = requestInterceptor(request);
      expect(result).to.be.equal(request);
      getLoggerStub.restore();
    });

    it('redacts linked hearing group identifiers from shared request logs', () => {
      const groupId = 'PRIVATE_HEARING_GROUP_ID';
      const messages: string[] = [];
      const getLoggerStub = sinon.stub(log4jui, 'getLogger').returns({
        info: (...args: unknown[]) => messages.push(args.join(' ')),
        addContext: sinon.spy(),
      } as unknown as ReturnType<typeof log4jui.getLogger>);

      try {
        requestInterceptor({ method: 'GET', url: `https://hmc.example/linkedHearingGroup/${groupId}` });

        const emittedLogs = messages.join('\n');
        expect(emittedLogs).not.to.contain(groupId);
        expect(emittedLogs).to.contain('/linkedHearingGroup/[REDACTED]');
      } finally {
        getLoggerStub.restore();
      }
    });

    it('redacts plural case_ids from the logged case-assignment request URL', () => {
      const caseIds = 'PRIVATE_CASE_IDS_CANARY';
      const messages: string[] = [];
      const getLoggerStub = sinon.stub(log4jui, 'getLogger').returns({
        info: (...args: unknown[]) => messages.push(args.join(' ')),
        addContext: sinon.spy(),
      } as unknown as ReturnType<typeof log4jui.getLogger>);

      try {
        requestInterceptor({
          method: 'GET',
          url: `https://ccd.example/case-assignments?CASE_IDS=${caseIds}&jurisdiction=IA`,
        });

        expect(messages.join('\n')).to.contain('/case-assignments?CASE_IDS=[REDACTED]&jurisdiction=IA');
        expect(messages.join('\n')).not.to.contain(caseIds);
      } finally {
        getLoggerStub.restore();
      }
    });

    it('redacts IDAM actor identifiers through the HTTP diagnostics path without changing the request URL', async () => {
      const actorId = 'PRIVATE-IDAM-ACTOR-ID-CANARY';
      const requestedUrl = `https://role-assignment.example/am/role-assignments/actors/${actorId}`;
      const messages: string[] = [];
      const actualUrls: string[] = [];
      const trackRequest = sinon.spy();
      const getLoggerStub = sinon.stub(log4jui, 'getLogger').returns({
        info: (...args: unknown[]) => messages.push(args.join(' ')),
        trackRequest,
      } as unknown as ReturnType<typeof log4jui.getLogger>);

      try {
        await http.get(requestedUrl, {
          adapter: async (config) => {
            actualUrls.push(config.url);
            return { config, data: [], headers: {}, status: 200, statusText: 'OK' };
          },
        });

        const diagnostics = JSON.stringify({ messages, telemetry: trackRequest.args });
        expect(actualUrls).to.deep.equal([requestedUrl]);
        expect(diagnostics).not.to.contain(actorId);
        expect(messages.join('\n')).to.contain('/am/role-assignments/actors/[REDACTED]');
        expect(trackRequest.firstCall.args[0].url).to.equal(
          'https://role-assignment.example/am/role-assignments/actors/[REDACTED]'
        );
        expect(trackRequest.firstCall.args[0].success).to.equal(true);
      } finally {
        getLoggerStub.restore();
      }
    });
  });

  describe('successInterceptor', () => {
    it('Should log returned response', () => {
      const spy = sinon.spy();
      const trackRequest = sinon.spy();
      const getLoggerStub = sinon.stub(log4jui, 'getLogger');
      getLoggerStub.returns({ info: spy, trackRequest, addContext: sinon.spy() } as unknown as ReturnType<
        typeof log4jui.getLogger
      >);
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
      expect(spy.firstCall.args[0]).not.to.contain('task-456');
      expect(spy.firstCall.args[0]).not.to.contain('case-123');
      expect(JSON.stringify(trackRequest.firstCall.args)).not.to.contain('case-123');
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
    it('does not log response details for a static Work Allocation task route', async () => {
      const caseId = 'STATIC-CASE-ID-CANARY';
      const taskId = 'STATIC-TASK-ID-CANARY';
      const upstreamBody = { details: { caseId, taskId, message: 'PRIVATE-UPSTREAM-DETAIL' } };
      const messages: string[] = [];
      const trackRequest = sinon.spy();
      const getLoggerStub = sinon.stub(log4jui, 'getLogger').returns({
        error: (...args: unknown[]) => messages.push(args.join(' ')),
        trackRequest,
      } as unknown as ReturnType<typeof log4jui.getLogger>);
      const failedRequest = {
        config: { data: '{}', metadata: {}, method: 'POST', url: 'https://wa.example/task/search-for-completable' },
        message: 'Request failed with status code 503',
        response: { data: upstreamBody, status: 503 },
      };

      try {
        await errorInterceptor(failedRequest).catch(() => undefined);

        const emitted = JSON.stringify({ messages, telemetry: trackRequest.args });
        expect(emitted).not.to.contain(caseId);
        expect(emitted).not.to.contain(taskId);
        expect(emitted).not.to.contain('PRIVATE-UPSTREAM-DETAIL');
        expect(emitted).to.contain('status=503');
        expect(emitted).to.contain('outboundId=');
        expect(trackRequest).to.have.been.calledOnce;
      } finally {
        getLoggerStub.restore();
      }
    });

    it('Should log returned response', async () => {
      const spy = sinon.spy();
      const getLoggerStub = sinon.stub(log4js, 'getLogger');
      getLoggerStub.returns({ error: spy, addContext: sinon.spy(), level: 'debug' } as unknown as log4js.Logger);
      await errorInterceptor(error).catch(() => {
        expect(spy).to.be.called;
        expect(spy.firstCall.args[0]).to.contain('event=error');
        expect(spy.firstCall.args[0]).to.contain('datetime=');
        expect(spy.firstCall.args[0]).to.contain('outboundId=');
        expect(spy.firstCall.args[0]).to.contain('durationMs=');
        expect(spy.firstCall.args[0]).not.to.contain('{"error":true}');
        expect(spy.firstCall.args[0]).to.contain('request failed');
        getLoggerStub.restore();
      });
    });

    it('keeps task-search logging body-safe for configured API bases with and without trailing slashes', async () => {
      const caseId = 'CASE-CANARY';
      const personId = 'PERSON-CANARY';
      const taskId = 'TASK-CANARY';
      const requestToken = 'AUTH-TOKEN-CANARY';
      const queryToken = 'QUERY-TOKEN-CANARY';
      const upstreamBody = 'UPSTREAM-BODY-CANARY';
      const requestBody = JSON.stringify({ caseId, personId, taskId });
      const taskApiBase = 'https://workallocation.example.test/context/api';
      const taskApiBases = [taskApiBase, `${taskApiBase}/`, 'https://workallocation.example.test'];
      const messages: string[] = [];
      const requestedUrls: string[] = [];
      const trackRequest = sinon.spy();
      const getConfigValueStub = sinon.stub(configuration, 'getConfigValue');
      const getLoggerStub = sinon.stub(log4jui, 'getLogger').callsFake(
        () =>
          ({
            info: (...args: unknown[]) => messages.push(args.join(' ')),
            error: (...args: unknown[]) => messages.push(args.join(' ')),
            trackRequest,
          }) as unknown as ReturnType<typeof log4jui.getLogger>
      );
      try {
        for (const configuredTaskApiBase of taskApiBases) {
          getConfigValueStub.withArgs(SERVICES_WORK_ALLOCATION_TASK_API_PATH).returns(configuredTaskApiBase);
          const urls = [
            `${configuredTaskApiBase}/task?first_result=0`,
            `${configuredTaskApiBase}/task?first_result=0&case_id=${caseId}&person_id=${personId}&task_id=${taskId}&access_token=${queryToken}`,
          ];

          for (const url of urls) {
            await http
              .post(url, requestBody, {
                headers: { Authorization: `Bearer ${requestToken}` },
                adapter: async (config) => {
                  requestedUrls.push(config.url);
                  const response = {
                    config,
                    data: { details: { message: upstreamBody, caseId, personId, taskId } },
                    headers: {},
                    status: 503,
                    statusText: 'Service Unavailable',
                  };
                  throw Object.assign(new Error(`upstream failure ${upstreamBody}`), { config, response });
                },
              })
              .catch(() => undefined);
          }
        }

        const emitted = JSON.stringify({ messages, telemetry: trackRequest.args });
        for (const sensitiveValue of [caseId, personId, taskId, requestToken, queryToken, upstreamBody, requestBody]) {
          expect(emitted).not.to.contain(sensitiveValue);
        }
        expect(messages.join('\n')).to.contain('POST to /workallocation/task');
        expect(messages.join('\n')).to.contain('event=error');
        expect(messages.join('\n')).to.contain('status=503');
        expect(messages.join('\n')).to.contain('outboundId=');
        expect(requestedUrls).to.deep.equal(
          taskApiBases.flatMap((configuredTaskApiBase) => [
            `${configuredTaskApiBase}/task?first_result=0`,
            `${configuredTaskApiBase}/task?first_result=0&case_id=${caseId}&person_id=${personId}&task_id=${taskId}&access_token=${queryToken}`,
          ])
        );
        expect(trackRequest.callCount).to.equal(taskApiBases.length * 2);
        for (const [telemetry] of trackRequest.args) {
          expect(telemetry).to.include({ resultCode: 503, success: false });
          expect(telemetry.url).to.match(/\/workallocation\/task$/);
        }
      } finally {
        getLoggerStub.restore();
        getConfigValueStub.restore();
      }
    });

    it('records an unavailable status when a task-search request has no HTTP response', async () => {
      const messages: string[] = [];
      const trackRequest = sinon.spy();
      const taskApiBase = 'https://workallocation.example.test/context/api';
      const getConfigValueStub = sinon.stub(configuration, 'getConfigValue');
      getConfigValueStub.withArgs(SERVICES_WORK_ALLOCATION_TASK_API_PATH).returns(taskApiBase);
      const getLoggerStub = sinon.stub(log4jui, 'getLogger').returns({
        error: (...args: unknown[]) => messages.push(args.join(' ')),
        trackRequest,
      } as unknown as ReturnType<typeof log4jui.getLogger>);

      try {
        await errorInterceptor({
          config: { data: '{}', metadata: {}, method: 'POST', url: `${taskApiBase}/task` },
          message: 'network failure',
        }).catch(() => undefined);

        expect(messages.join('\n')).to.contain('status=unavailable');
        expect(trackRequest.firstCall.args[0]).to.include({ success: false, url: '/workallocation/task' });
        expect(trackRequest.firstCall.args[0].resultCode).to.equal(undefined);
      } finally {
        getLoggerStub.restore();
        getConfigValueStub.restore();
      }
    });

    it('does not classify another API URL ending in /task as Work Allocation search', async () => {
      const taskApiBase = 'https://workallocation.example.test/context/api';
      const responseBody = 'UNRELATED-API-BODY-CANARY';
      const messages: string[] = [];
      const getConfigValueStub = sinon.stub(configuration, 'getConfigValue');
      getConfigValueStub.withArgs(SERVICES_WORK_ALLOCATION_TASK_API_PATH).returns(taskApiBase);
      const getLoggerStub = sinon.stub(log4jui, 'getLogger').callsFake(
        () =>
          ({
            error: (...args: unknown[]) => messages.push(args.join(' ')),
            trackRequest: sinon.spy(),
          }) as unknown as ReturnType<typeof log4jui.getLogger>
      );
      const failedRequest = {
        config: { data: '{}', metadata: {}, method: 'POST', url: 'https://workallocation.example.test/other-api/task' },
        message: `Request failed ${responseBody}`,
        response: { data: { details: responseBody }, status: 503 },
      };

      try {
        await errorInterceptor(failedRequest).catch(() => undefined);
        expect(messages.join('\n')).not.to.contain('Work Allocation task request failed');
        expect(messages.join('\n')).not.to.contain(responseBody);
        expect(messages.join('\n')).to.contain('request failed');
      } finally {
        getLoggerStub.restore();
        getConfigValueStub.restore();
      }
    });

    it('keeps completable-task logging body-safe for the configured Work Allocation API', async () => {
      const caseId = 'CASE-COMPLETABLE-CANARY';
      const eventId = 'EVENT-COMPLETABLE-CANARY';
      const caseType = 'CASE-TYPE-COMPLETABLE-CANARY';
      const requestToken = 'AUTH-COMPLETABLE-CANARY';
      const upstreamBody = 'UPSTREAM-COMPLETABLE-CANARY';
      const requestBody = JSON.stringify({ case_id: caseId, event_id: eventId, case_jurisdiction: 'IA', case_type: caseType });
      const taskApiBase = 'https://workallocation.example.test/context/api';
      const messages: string[] = [];
      const trackRequest = sinon.spy();
      const getConfigValueStub = sinon.stub(configuration, 'getConfigValue');
      getConfigValueStub.withArgs(SERVICES_WORK_ALLOCATION_TASK_API_PATH).returns(taskApiBase);
      const getLoggerStub = sinon.stub(log4jui, 'getLogger').callsFake(
        () =>
          ({
            info: (...args: unknown[]) => messages.push(args.join(' ')),
            error: (...args: unknown[]) => messages.push(args.join(' ')),
            trackRequest,
          }) as unknown as ReturnType<typeof log4jui.getLogger>
      );

      try {
        await http
          .post(`${taskApiBase}/task/search-for-completable`, requestBody, {
            headers: { Authorization: `Bearer ${requestToken}` },
            adapter: async (config) => {
              const response = {
                config,
                data: { details: { message: upstreamBody, caseId, eventId, caseType } },
                headers: {},
                status: 503,
                statusText: 'Service Unavailable',
              };
              throw Object.assign(new Error(`upstream failure ${upstreamBody}`), { config, response });
            },
          })
          .catch(() => undefined);

        const emitted = JSON.stringify({ messages, telemetry: trackRequest.args });
        for (const sensitiveValue of [caseId, eventId, caseType, requestToken, upstreamBody, requestBody]) {
          expect(emitted).not.to.contain(sensitiveValue);
        }
        expect(messages.join('\n')).to.contain('POST to /workallocation/task');
        expect(messages.join('\n')).to.contain('Work Allocation task request failed');
        expect(messages.join('\n')).to.contain('status=503');
        expect(trackRequest).to.have.been.calledOnce;
        expect(trackRequest.firstCall.args[0]).to.include({ resultCode: 503, success: false, url: '/workallocation/task' });
      } finally {
        getLoggerStub.restore();
        getConfigValueStub.restore();
      }
    });

    it('keeps unrelated identifier-redacted failures accurately labelled with their safe URL', async () => {
      const taskId = 'UNRELATED-TASK-CANARY';
      const responseBody = { details: 'UPSTREAM-BODY-CANARY' };
      const messages: string[] = [];
      const trackRequest = sinon.spy();
      const getLoggerStub = sinon.stub(log4jui, 'getLogger').callsFake(
        () =>
          ({
            error: (...args: unknown[]) => messages.push(args.join(' ')),
            trackRequest,
          }) as unknown as ReturnType<typeof log4jui.getLogger>
      );
      const failedRequest = {
        config: { data: '{}', metadata: {}, method: 'GET', url: `/api/task/${taskId}` },
        message: `Request failed for ${taskId}`,
        response: { data: responseBody, status: 503 },
      };

      try {
        await errorInterceptor(failedRequest).catch(() => undefined);

        const emitted = JSON.stringify({ messages, telemetry: trackRequest.args });
        expect(messages.join('\n')).to.contain('Error on GET to /api/task/[REDACTED]');
        expect(messages.join('\n')).not.to.contain('Work Allocation task request failed');
        for (const sensitiveValue of [taskId, 'UPSTREAM-BODY-CANARY']) {
          expect(emitted).not.to.contain(sensitiveValue);
        }
        expect(trackRequest.firstCall.args[0].url).to.equal('/api/task/[REDACTED]');
      } finally {
        getLoggerStub.restore();
      }
    });
  });
});
