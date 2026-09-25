import * as http from 'http';

import { SpanStatusCode } from '@opentelemetry/api';
import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import { markFailedServerSpanStatus } from './appInsights';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('appInsights', () => {
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
