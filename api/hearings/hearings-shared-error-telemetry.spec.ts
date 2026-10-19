import { expect } from 'chai';
import * as sinon from 'sinon';
import * as log4js from 'log4js';
import type { Response } from 'express';
import * as appInsights from '../lib/appInsights';
import * as log4jui from '../lib/log4jui';
import * as proxy from '../lib/proxy';
import { http } from '../lib/http';
import * as crud from '../common/crudService';
import errorHandler from '../lib/error.handler';
import { errorInterceptor } from '../lib/interceptors';
import { EnhancedRequest } from '../lib/models';
import { hearingsTelemetryCorrelation, isHearingsTelemetryRequest } from '../lib/hearings-telemetry-correlation';

describe('Hearings shared server error telemetry', () => {
  let sandbox: sinon.SinonSandbox;
  let trace: sinon.SinonStub;
  let rawError: sinon.SinonStub;
  let req: EnhancedRequest;
  let res: Response;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    trace = sandbox.stub();
    sandbox.stub(appInsights, 'client').value({ trackTrace: trace });
    sandbox.stub(proxy, 'setHeaders').returns({ accept: 'application/json' });
    sandbox.stub(crud.logger, 'info');
    rawError = sandbox.stub(crud.logger, 'error');
    req = {
      url: '/api/hearings/getHearing?hearingId=private-hearing',
      headers: {},
      body: { caseName: 'private-name' },
      query: {},
      session: {},
    } as unknown as EnhancedRequest;
    res = { status: sandbox.stub().returnsThis(), send: sandbox.stub() } as unknown as Response;
  });

  afterEach(() => sandbox.restore());

  function failure() {
    const data = { person: 'private-person' };
    data['circular'] = data;
    return Object.assign(new Error('private-message'), { status: 503, statusText: 'private-status', data });
  }

  function expectSafeTrace(operation: string) {
    expect(trace.calledOnce).to.equal(true);
    expect(trace.firstCall.args[0]).to.deep.equal({
      message: 'Hearings.OperationFailed',
      severity: 3,
      properties: { telemetryArea: 'Hearings', operation, outcome: 'failed', httpStatus: 503 },
    });
    expect(JSON.stringify(trace.args)).not.to.contain('private-');
  }

  async function expectOriginalFailure(work: () => Promise<unknown>, original: unknown) {
    try {
      await work();
      expect.fail('Expected original downstream failure');
    } catch (error) {
      expect(error).to.equal(original);
    }
  }

  function inScope<T>(work: () => Promise<T>, request = req): Promise<T> {
    return new Promise((resolve, reject) => {
      hearingsTelemetryCorrelation(request, res, () => {
        work().then(resolve, reject);
      });
    });
  }

  [
    ['sendGet', 'get'],
    ['sendPost', 'post'],
    ['sendPut', 'put'],
    ['sendDelete', 'delete'],
  ].forEach(([operation, method]) => {
    it(`uses structured properties and rethrows the identical error for ${operation}`, async () => {
      const original = failure();
      sandbox.stub(http, method as 'get').rejects(original);
      const call = () =>
        operation === 'sendGet'
          ? crud.sendGet('http://downstream/private-case', req)
          : crud[operation]('http://downstream/private-case', req.body, req);
      await expectOriginalFailure(call, original);
      expect(rawError.called).to.equal(false);
      expectSafeTrace(operation);
    });
  });

  it('preserves sendPost next(error) behaviour without serializing a circular downstream response', async () => {
    const original = failure();
    sandbox.stub(http, 'post').rejects(original);
    const next = sandbox.stub();
    const result = await crud.sendPost('http://downstream/private-case', req.body, req, next);
    expect(result).to.equal(undefined);
    expect(next.calledOnceWithExactly(original)).to.equal(true);
    expect(rawError.called).to.equal(false);
    expectSafeTrace('sendPost');
  });

  it('preserves the original successful response and request body', async () => {
    const response = { status: 201, data: { privateResponse: 'private-data' } };
    const post = sandbox.stub(http, 'post').resolves(response);
    expect(await crud.sendPost('http://downstream/private-case', req.body, req)).to.equal(response);
    expect(
      post.calledOnceWithExactly('http://downstream/private-case', req.body, { headers: { accept: 'application/json' } })
    ).to.equal(true);
    expect(trace.called).to.equal(false);
  });

  it('recognizes mounted Hearings routes without a browser journey header', async () => {
    const original = failure();
    sandbox.stub(http, 'get').rejects(original);
    await inScope(async () => {
      req.url = '/getHearing';
      expect(isHearingsTelemetryRequest(req)).to.equal(true);
      await expectOriginalFailure(() => crud.sendGet('http://downstream/private-case', req), original);
    });
    expectSafeTrace('sendGet');
    expect(isHearingsTelemetryRequest()).to.equal(false);
  });

  it('leaves non-Hearings CRUD logging and rejection unchanged', async () => {
    req.url = '/api/cases';
    const original = { status: 503, statusText: 'Unavailable', data: { message: 'failure' } };
    sandbox.stub(http, 'get').rejects(original);
    await expectOriginalFailure(() => crud.sendGet('http://downstream/cases', req), original);
    expect(
      rawError.calledOnceWithExactly('sendGet: 503 http://downstream/cases', 'Unavailable', JSON.stringify(original.data))
    ).to.equal(true);
    expect(trace.called).to.equal(false);
  });

  it('does not let a trace failure replace a CRUD rejection', async () => {
    const original = failure();
    sandbox.stub(http, 'get').rejects(original);
    trace.throws(new Error('SDK failure'));
    await expectOriginalFailure(() => crud.sendGet('http://downstream/private-case', req), original);
    expect(rawError.called).to.equal(false);
  });

  it('replaces concatenated outbound errors without reading body/context or changing the rejected response', async () => {
    const logger = { error: sandbox.stub(), trackRequest: sandbox.stub() };
    sandbox.stub(log4jui, 'getLogger').returns(logger as unknown as ReturnType<typeof log4jui.getLogger>);
    const response = { status: 503, data: failure().data };
    const error = {
      config: {
        method: 'get',
        url: 'http://downstream/private-case',
        metadata: { startTime: new Date() },
        get data() {
          throw new Error('Request bodies must not be inspected for error logging');
        },
      },
      response,
      toString() {
        throw new Error('Raw errors must not be formatted');
      },
    };
    await inScope(() => expectOriginalFailure(() => errorInterceptor(error), response));
    expectSafeTrace('outboundRequest');
    expect(logger.error.called).to.equal(false);
    // The SDK's existing native dependency collection remains enabled; no duplicate custom request with raw IDs.
    expect(logger.trackRequest.called).to.equal(false);
    expect(error['duration']).to.be.a('number');
  });

  it('keeps the final Hearings response status and body while replacing raw server error logs', () => {
    const log = sandbox.stub(log4js.getLogger('errorHandler'), 'error');
    const original = failure();
    errorHandler(original, req, res, () => {});
    expect(log.called).to.equal(false);
    expect((res.status as sinon.SinonStub).calledOnceWithExactly(503)).to.equal(true);
    expect((res.send as sinon.SinonStub).calledOnceWithExactly(original.data)).to.equal(true);
    expectSafeTrace('serverRequest');
  });

  it('still sends the original error response if final error telemetry fails', () => {
    sandbox.stub(log4js.getLogger('errorHandler'), 'error');
    trace.throws(new Error('SDK failure'));
    const original = failure();
    errorHandler(original, req, res, () => {});
    expect((res.send as sinon.SinonStub).calledOnceWithExactly(original.data)).to.equal(true);
  });

  it('isolates Hearings logging scope from concurrent unrelated requests', async () => {
    let finish: () => void;
    const first = inScope(async () => {
      await new Promise<void>((resolve) => {
        finish = resolve;
      });
      expect(isHearingsTelemetryRequest()).to.equal(true);
    });
    const other = { ...req, url: '/api/cases' } as EnhancedRequest;
    await inScope(async () => {
      expect(isHearingsTelemetryRequest()).to.equal(false);
    }, other);
    finish();
    await first;
    expect(isHearingsTelemetryRequest()).to.equal(false);
  });
});
