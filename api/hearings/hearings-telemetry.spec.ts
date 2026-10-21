import { expect } from 'chai';
import { AxiosHeaders } from 'axios';
import * as sinon from 'sinon';
import type { Response } from 'express';
import type { Contracts } from 'applicationinsights';
import * as appInsights from '../lib/appInsights';
import * as crud from '../common/crudService';
import * as configuration from '../configuration';
import { EnhancedRequest } from '../lib/models';
import { addHearingsJourneyToTelemetry, hearingsTelemetryCorrelation } from '../lib/hearings-telemetry-correlation';
import { HEARINGS_JOURNEY_HEADER } from '../../common/hearings/telemetry-correlation';
import * as hmc from './hmc.index';
import * as services from './services.index';
import { HearingsTraceOperation, traceHearingsDiagnostic } from './hearings-telemetry';

describe('Structured Hearings traces', () => {
  let sandbox: sinon.SinonSandbox;
  let trackTrace: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    trackTrace = sandbox.stub();
    sandbox.stub(appInsights, 'client').value({ trackTrace });
  });

  afterEach(() => sandbox.restore());

  it('uses native traces and records only a static operation, outcome and numeric HTTP status', () => {
    const data = { caseName: 'private-person' };
    data['circular'] = data;
    const error = Object.assign(new Error('private-error-message'), {
      status: 503,
      statusText: 'private-status',
      data,
      errors: data,
      config: { url: '/private-case/private-hearing', data: 'private-form' },
    });
    traceHearingsDiagnostic('getHearing', 'failed', error);
    expect(trackTrace.firstCall.args).to.deep.equal([
      {
        message: 'Hearings.OperationFailed',
        severity: 3,
        properties: { telemetryArea: 'Hearings', operation: 'getHearing', outcome: 'failed', httpStatus: 503 },
      },
    ]);
    expect(JSON.stringify(trackTrace.firstCall.args)).not.to.contain('private-');
    expect(error.data).to.equal(data);
  });

  it('gives informational start traces and warning-level configuration diagnostics static messages', () => {
    traceHearingsDiagnostic('loadLinkedCasesWithHearings', 'started');
    traceHearingsDiagnostic('getServicePath', 'service-not-configured');
    expect(trackTrace.firstCall.args[0]).to.deep.equal({
      message: 'Hearings.OperationStarted',
      severity: 1,
      properties: { telemetryArea: 'Hearings', operation: 'loadLinkedCasesWithHearings', outcome: 'started' },
    });
    expect(trackTrace.secondCall.args[0]).to.deep.equal({
      message: 'Hearings.ServiceNotConfigured',
      severity: 2,
      properties: { telemetryArea: 'Hearings', operation: 'getServicePath', outcome: 'service-not-configured' },
    });
  });

  [
    undefined,
    null,
    new Error('private-message'),
    { status: 'private-status' },
    { status: 600 },
    { status: -1 },
    { status: 503.5 },
  ].forEach((error) => {
    it(`omits invalid HTTP status without serializing error details: ${typeof error}`, () => {
      traceHearingsDiagnostic('getHearings', 'failed', error);
      expect(trackTrace.firstCall.args[0].properties).to.deep.equal({
        telemetryArea: 'Hearings',
        operation: 'getHearings',
        outcome: 'failed',
      });
    });
  });

  it('rejects runtime operation/outcome values outside the closed schema', () => {
    traceHearingsDiagnostic('private-case' as HearingsTraceOperation, 'failed');
    traceHearingsDiagnostic('getHearing', 'private-form' as 'failed');
    expect(trackTrace.called).to.equal(false);
  });

  it('safely does nothing when telemetry is disabled or tracking fails', () => {
    trackTrace.throws(new Error('SDK unavailable'));
    expect(() => traceHearingsDiagnostic('getHearing', 'failed')).not.to.throw();
    sandbox.restore();
    sandbox.stub(appInsights, 'client').value(null);
    expect(() => traceHearingsDiagnostic('getHearing', 'failed')).not.to.throw();
  });

  it('does not let unexpected error metadata getters replace the application failure', () => {
    const error = {
      get status() {
        throw new Error('Metadata failure');
      },
    };
    expect(() => traceHearingsDiagnostic('getHearing', 'failed', error)).not.to.throw();
  });

  it('receives the anonymous journey ID from the existing request-scoped telemetry processor', () => {
    const journeyId = 'a'.repeat(32);
    const req = {
      url: '/api/hearings/getHearing?hearingId=private-hearing',
      headers: { [HEARINGS_JOURNEY_HEADER]: journeyId },
    } as unknown as EnhancedRequest;
    let properties: unknown;
    trackTrace.callsFake((trace) => {
      const envelope = { data: { baseType: 'MessageData', baseData: trace } } as unknown as Contracts.EnvelopeTelemetry;
      addHearingsJourneyToTelemetry(envelope);
      properties = envelope.data.baseData.properties;
    });
    hearingsTelemetryCorrelation(req, {} as Response, () => traceHearingsDiagnostic('getHearing', 'failed', { status: 500 }));
    expect(properties).to.deep.equal({
      telemetryArea: 'Hearings',
      operation: 'getHearing',
      outcome: 'failed',
      httpStatus: 500,
      journeyId,
      hearingId: 'private-hearing',
    });
  });

  describe('existing controller behaviour', () => {
    let req: EnhancedRequest;
    let res: Response;
    let next: sinon.SinonStub;

    beforeEach(() => {
      req = {
        query: {
          caseId: 'private-case',
          caseRef: 'private-case',
          hearingId: 'private-hearing',
          groupId: 'private-group',
          hearingGroupId: 'private-group',
        },
        params: { hearingId: 'private-hearing' },
        body: { caseDetails: { caseDeepLink: '/case-details/1234567890123456' }, privateForm: 'private-form' },
        headers: {},
        session: {},
      } as unknown as EnhancedRequest;
      res = { status: sandbox.stub().returnsThis(), send: sandbox.stub() } as unknown as Response;
      next = sandbox.stub();
    });

    const operations = [
      ['getHearings', 'handleGet'],
      ['getHearing', 'handleGet'],
      ['submitHearingRequest', 'handlePost'],
      ['cancelHearingRequest', 'handleDelete'],
      ['updateHearingRequest', 'handlePut'],
      ['getHearingActuals', 'handleGet'],
      ['updateHearingActuals', 'sendPut'],
      ['submitHearingActuals', 'handlePost'],
      ['getLinkedHearingGroup', 'handleGet'],
      ['postLinkedHearingGroup', 'handlePost'],
      ['putLinkedHearingGroup', 'handlePut'],
      ['deleteLinkedHearingGroup', 'handleDelete'],
    ] as const;

    operations.forEach(([operation, method]) => {
      it(`preserves the original error and next(error) for ${operation}`, async () => {
        const error = Object.assign(new Error('private-original-error'), {
          status: 503,
          statusText: 'private-status',
          data: { person: 'private-person' },
        });
        sandbox.stub(crud, method).rejects(error);
        await hmc[operation](req, res, next);
        expect(next.calledOnceWithExactly(error)).to.equal(true);
        expect((res.send as sinon.SinonStub).called).to.equal(false);
        const failure = trackTrace.lastCall.args[0];
        expect(failure.properties).to.deep.equal({ telemetryArea: 'Hearings', operation, outcome: 'failed', httpStatus: 503 });
        expect(JSON.stringify(trackTrace.args)).not.to.contain('private-');
      });

      it(`preserves the downstream response and status for ${operation}`, async () => {
        const data = { caseHearings: [], privateResponse: 'private-response' };
        sandbox
          .stub(crud, method)
          .resolves({ status: 201, data, statusText: 'Created', headers: {}, config: { headers: new AxiosHeaders() } });
        await hmc[operation](req, res, next);
        expect((res.status as sinon.SinonStub).calledOnceWithExactly(201)).to.equal(true);
        expect((res.send as sinon.SinonStub).calledOnceWithExactly(operation === 'submitHearingActuals' ? null : data)).to.equal(
          true
        );
        expect(next.called).to.equal(false);
        expect(JSON.stringify(trackTrace.args)).not.to.contain('private-');
      });
    });

    it('still calls next(error) if the trace SDK throws', async () => {
      const error = Object.assign(new Error('Original error'), { status: 503 });
      sandbox.stub(crud, 'handleGet').rejects(error);
      trackTrace.throws(new Error('SDK failure'));
      await hmc.getHearing(req, res, next);
      expect(next.calledOnceWithExactly(error)).to.equal(true);
    });

    it('retains the service error fallback and does not include response bodies in traces', async () => {
      const error = { status: 503, data: { person: 'private-person' } };
      const config = sandbox.stub(configuration, 'getConfigValue');
      config.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS']);
      req.query.jurisdictionId = 'SSCS';
      sandbox.stub(crud, 'sendPost').rejects(error);
      await services.loadServiceHearingValues(req, res, next);
      expect(next.calledOnceWithExactly(error)).to.equal(true);
      expect(trackTrace.lastCall.args[0].properties.operation).to.equal('loadServiceHearingValues');
      expect(JSON.stringify(trackTrace.args)).not.to.contain('private-');
    });

    it('replaces the linked-case console message without changing its downstream payload or empty-list response', async () => {
      const config = sandbox.stub(configuration, 'getConfigValue');
      config.withArgs('services.hearings.hearingsJurisdictions').returns(['SSCS']);
      config.withArgs('services.hearings.sscs.serviceApi').returns('http://service-api');
      req.query.jurisdictionId = 'SSCS';
      const send = sandbox
        .stub(crud, 'sendPost')
        .resolves({ status: 200, data: [], statusText: 'OK', headers: {}, config: { headers: new AxiosHeaders() } });
      await services.loadLinkedCasesWithHearings(req, res, next);
      expect(send.calledOnceWithExactly('http://service-api/serviceLinkedCases', req.body, req, next)).to.equal(true);
      expect((res.status as sinon.SinonStub).calledOnceWithExactly(200)).to.equal(true);
      expect((res.send as sinon.SinonStub).firstCall.args).to.deep.equal([[]]);
      expect(next.called).to.equal(false);
      expect(trackTrace.calledOnce).to.equal(true);
      expect(trackTrace.firstCall.args[0].properties).to.deep.equal({
        telemetryArea: 'Hearings',
        operation: 'loadLinkedCasesWithHearings',
        outcome: 'started',
      });
    });

    it('preserves the unsupported-service fallback without logging a raw jurisdiction value', () => {
      sandbox.stub(configuration, 'getConfigValue').returns([]);
      expect(services.getServicePath('private-jurisdiction')).to.equal('');
      expect(trackTrace.calledOnce).to.equal(true);
      expect(trackTrace.firstCall.args[0].message).to.equal('Hearings.ServiceNotConfigured');
      expect(JSON.stringify(trackTrace.args)).not.to.contain('private-');
    });

    it('rethrows the original linked-case hearing failure even if telemetry fails', async () => {
      const original = Object.assign(new Error('private-error'), { status: 503 });
      sandbox.stub(crud, 'sendGet').rejects(original);
      trackTrace.throws(new Error('SDK failure'));
      try {
        await services.getHearings('private-case', req);
        expect.fail('Expected original API error');
      } catch (error) {
        expect(error).to.equal(original);
      }
    });
  });
});
