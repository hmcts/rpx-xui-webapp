import * as http from 'http';

import { SpanStatusCode, trace } from '@opentelemetry/api';
import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import { appInsights, createIncomingRequestTelemetry, markFailedServerSpanStatus } from './appInsights';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('appInsights', () => {
  describe('request identity', () => {
    let getActiveSpanStub: sinon.SinonStub;
    let setAttribute: sinon.SinonStub;
    let next: sinon.SinonStub;

    beforeEach(() => {
      setAttribute = sinon.stub();
      next = sinon.stub();

      getActiveSpanStub = sinon.stub(trace, 'getActiveSpan').returns({
        setAttribute,
      } as any);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('adds configured user and session cookie IDs to the active request span', () => {
      const request = {
        headers: {
          cookie: '__userid__=user-id%40123; __sessionId__=session-id%7C123%7C456',
        },
      };

      appInsights(request as any, { once: sinon.stub() } as any, next);

      expect(setAttribute).to.have.been.calledWith('enduser.pseudo.id', 'user-id@123');
      expect(setAttribute).to.have.been.calledWith('session.id', 'session-id|123|456');
      expect(next).to.have.been.calledOnce;
    });

    it('only adds the user identity when the request has no session cookie', () => {
      const request = {
        headers: {
          cookie: '__userid__=user-id',
        },
      };

      appInsights(request as any, { once: sinon.stub() } as any, next);

      expect(setAttribute).to.have.been.calledOnceWith('enduser.pseudo.id', 'user-id');
      expect(next).to.have.been.calledOnce;
    });

    it('does not add identity attributes when the request has no identity cookies', () => {
      const request = {
        headers: {
          cookie: 'some-other-cookie=value',
        },
      };

      appInsights(request as any, { once: sinon.stub() } as any, next);

      expect(setAttribute).not.to.have.been.called;
      expect(next).to.have.been.calledOnce;
    });

    it('does not add identity attributes when there is no active span', () => {
      getActiveSpanStub.returns(undefined);

      const request = {
        headers: {
          cookie: '__userid__=user-id; __sessionId__=session-id',
        },
      };

      appInsights(request as any, { once: sinon.stub() } as any, next);

      expect(setAttribute).not.to.have.been.called;
      expect(next).to.have.been.calledOnce;
    });
  });

  describe('createIncomingRequestTelemetry', () => {
    it('builds a request record with route, response, timing, and identity context', () => {
      const startedAt = new Date('2026-11-04T10:00:00.000Z');
      const completedAt = new Date('2026-11-04T10:00:00.125Z');
      const request = {
        headers: {
          cookie: '__userid__=user%40123; __sessionId__=session%7C123',
        },
        method: 'GET',
        path: '/cases/123',
        protocol: 'https',
        route: { path: '/cases/:caseId' },
        get: () => 'manage-case.example.test',
      };

      const telemetry = createIncomingRequestTelemetry(request as any, { statusCode: 403 }, startedAt, completedAt);

      expect(telemetry).to.deep.equal({
        duration: 125,
        name: 'GET /cases/:caseId',
        properties: {
          'enduser.pseudo.id': 'user@123',
          'http.method': 'GET',
          'session.id': 'session|123',
        },
        resultCode: '403',
        success: false,
        time: startedAt,
        url: 'https://manage-case.example.test/cases/123',
      });
    });
  });

  describe('markFailedServerSpanStatus', () => {
    let setStatus: sinon.SinonStub;
    let span: any;

    beforeEach(() => {
      setStatus = sinon.stub();
      span = { setStatus };
    });

    it('marks a 4xx server response as ERROR (matches classic Application Insights failed-request rule)', () => {
      const response = Object.create(http.ServerResponse.prototype);
      response.statusCode = 404;

      markFailedServerSpanStatus(span, {} as http.IncomingMessage, response);

      expect(setStatus).to.have.been.calledOnce;
      expect(setStatus).to.have.been.calledWith({ code: SpanStatusCode.ERROR });
    });

    it('marks a 5xx server response as ERROR', () => {
      const response = Object.create(http.ServerResponse.prototype);
      response.statusCode = 503;

      markFailedServerSpanStatus(span, {} as http.IncomingMessage, response);

      expect(setStatus).to.have.been.calledOnce;
      expect(setStatus).to.have.been.calledWith({ code: SpanStatusCode.ERROR });
    });

    it('does not mark a 2xx server response as ERROR', () => {
      const response = Object.create(http.ServerResponse.prototype);
      response.statusCode = 200;

      markFailedServerSpanStatus(span, {} as http.IncomingMessage, response);

      expect(setStatus).not.to.have.been.called;
    });

    it('does not mark a 3xx server response as ERROR', () => {
      const response = Object.create(http.ServerResponse.prototype);
      response.statusCode = 302;

      markFailedServerSpanStatus(span, {} as http.IncomingMessage, response);

      expect(setStatus).not.to.have.been.called;
    });

    it('ignores outgoing (client) responses, which are plain IncomingMessage instances', () => {
      const response = Object.create(http.IncomingMessage.prototype);
      response.statusCode = 500;

      markFailedServerSpanStatus(span, {} as http.ClientRequest, response);

      expect(setStatus).not.to.have.been.called;
    });
  });
});
