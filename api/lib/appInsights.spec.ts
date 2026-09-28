import * as http from 'http';

import { SpanStatusCode } from '@opentelemetry/api';
import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import { addRequestIdentity, markFailedServerSpanStatus } from './appInsights';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('appInsights', () => {
  describe('addRequestIdentity', () => {
    it('adds configured user and session cookie IDs to the request span', () => {
      const setAttribute = sinon.stub();
      const request = Object.create(http.IncomingMessage.prototype);
      request.headers = {
        cookie: '__userid__=user-id%40123; __sessionId__=session-id%7C123%7C456',
      };

      addRequestIdentity({ setAttribute } as any, request);

      expect(setAttribute).to.have.been.calledWith('enduser.pseudo.id', 'user-id@123');
      expect(setAttribute).to.have.been.calledWith('session.id', 'session-id|123|456');
    });

    it('does not add identity attributes when the request has no AI cookies', () => {
      const setAttribute = sinon.stub();
      const request = Object.create(http.IncomingMessage.prototype);
      request.headers = { cookie: '__userid__=user-id' };

      addRequestIdentity({ setAttribute } as any, request);

      expect(setAttribute).to.have.been.calledOnceWith('enduser.pseudo.id', 'user-id');
    });

    it('ignores non-HTTP request objects', () => {
      const setAttribute = sinon.stub();

      addRequestIdentity({ setAttribute } as any, {});

      expect(setAttribute).not.to.have.been.called;
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
