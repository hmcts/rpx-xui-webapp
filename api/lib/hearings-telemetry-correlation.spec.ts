import { expect } from 'chai';
import type { Contracts } from 'applicationinsights';
import type { Request, Response } from 'express';
import { HEARINGS_JOURNEY_HEADER } from '../../common/hearings/telemetry-correlation';
import { addHearingsJourneyToTelemetry, hearingsTelemetryCorrelation } from './hearings-telemetry-correlation';

describe('Hearings server telemetry correlation', () => {
  const journeyA = 'a'.repeat(32);
  const journeyB = 'b'.repeat(32);

  function request(value: unknown = journeyA, url = '/api/hearings/getHearing?hearingId=private-hearing'): Request {
    return { url, headers: { [HEARINGS_JOURNEY_HEADER]: value } } as unknown as Request;
  }

  function envelope(baseType = 'RequestData'): Contracts.EnvelopeTelemetry {
    return {
      tags: { 'ai.operation.id': 'existing-operation', 'ai.operation.parentId': 'existing-parent' },
      data: { baseType, baseData: { properties: { existing: 'property' } } },
    } as unknown as Contracts.EnvelopeTelemetry;
  }

  ['RequestData', 'RemoteDependencyData', 'ExceptionData', 'MessageData', 'EventData'].forEach((baseType) => {
    it(`adds only a journey property to request-scoped ${baseType}`, () => {
      const item = envelope(baseType);
      hearingsTelemetryCorrelation(request(), {} as Response, () => {
        expect(addHearingsJourneyToTelemetry(item)).to.equal(true);
      });
      expect(item.data.baseData.properties).to.deep.equal({ existing: 'property', journeyId: journeyA });
      expect(item.tags).to.deep.equal({ 'ai.operation.id': 'existing-operation', 'ai.operation.parentId': 'existing-parent' });
      expect(JSON.stringify(item)).not.to.contain('private-');
    });
  });

  it('correlates finalized request telemetry outside the middleware async context using the SDK request object', () => {
    const item = envelope();
    addHearingsJourneyToTelemetry(item, { 'http.ServerRequest': request() });
    expect(item.data.baseData.properties.journeyId).to.equal(journeyA);
  });

  it('retains the original request ID when Express rewrites URLs inside mounted routers', () => {
    const req = request();
    hearingsTelemetryCorrelation(req, {} as Response, () => {});
    req.url = '/getHearing';
    req.headers[HEARINGS_JOURNEY_HEADER] = journeyB;
    const item = envelope();
    addHearingsJourneyToTelemetry(item, { 'http.ServerRequest': req });
    expect(item.data.baseData.properties.journeyId).to.equal(journeyA);
  });

  [
    undefined,
    null,
    '',
    'private-person',
    '1234567890123456',
    'a'.repeat(33),
    'a'.repeat(31),
    ['a'.repeat(32)],
    `${journeyA},${journeyB}`,
    `${journeyA}\r\nprivate-header`,
    `${journeyA}\n`,
  ].forEach((value) => {
    it(`ignores missing or malformed incoming IDs: ${JSON.stringify(value)}`, () => {
      const req = request(value);
      if (value === undefined) {
        delete req.headers[HEARINGS_JOURNEY_HEADER];
      }
      const item = envelope();
      let called = 0;
      hearingsTelemetryCorrelation(req, {} as Response, () => {
        called++;
        addHearingsJourneyToTelemetry(item);
      });
      expect(called).to.equal(1);
      expect(item.data.baseData.properties).to.deep.equal({ existing: 'property' });
      addHearingsJourneyToTelemetry(item, { 'http.ServerRequest': req });
      expect(item.data.baseData.properties).to.deep.equal({ existing: 'property' });
    });
  });

  ['/api/cases', '/api/monitoring-tools', '/assets/config.json', '/api/hearings-other'].forEach((url) => {
    it(`ignores the header on unrelated requests: ${url}`, () => {
      const item = envelope();
      hearingsTelemetryCorrelation(request(journeyA, url), {} as Response, () => addHearingsJourneyToTelemetry(item));
      expect(item.data.baseData.properties).to.deep.equal({ existing: 'property' });
    });
  });

  it('isolates concurrent users and retains the initiating journey when a slow response finishes last', async () => {
    const results: Contracts.EnvelopeTelemetry[] = [];
    let finishFirst: () => void;
    const first = new Promise<void>((resolve) => {
      hearingsTelemetryCorrelation(request(journeyA), {} as Response, () => {
        const pending = new Promise<void>((done) => {
          finishFirst = done;
        });
        pending.then(() => {
          const item = envelope('RemoteDependencyData');
          addHearingsJourneyToTelemetry(item);
          results.push(item);
          resolve();
        });
      });
    });
    const second = new Promise<void>((resolve) => {
      hearingsTelemetryCorrelation(request(journeyB), {} as Response, () => {
        Promise.resolve().then(() => {
          const item = envelope('ExceptionData');
          addHearingsJourneyToTelemetry(item);
          results.push(item);
          resolve();
        });
      });
    });
    await second;
    finishFirst();
    await first;
    expect(results.map((item) => item.data.baseData.properties.journeyId)).to.deep.equal([journeyB, journeyA]);
    const outside = envelope();
    addHearingsJourneyToTelemetry(outside);
    expect(outside.data.baseData.properties.journeyId).to.equal(undefined);
  });

  it('does not inherit a journey for nested requests without a valid header', () => {
    const item = envelope();
    hearingsTelemetryCorrelation(request(), {} as Response, () => {
      hearingsTelemetryCorrelation(request('', '/api/cases'), {} as Response, () => addHearingsJourneyToTelemetry(item));
      addHearingsJourneyToTelemetry(item, { 'http.ServerRequest': request('', '/api/cases') });
    });
    expect(item.data.baseData.properties.journeyId).to.equal(undefined);
  });

  it('does not swallow or repeat application failures from the next middleware', () => {
    const original = new Error('Original route error');
    let called = 0;
    expect(() =>
      hearingsTelemetryCorrelation(request(), {} as Response, () => {
        called++;
        throw original;
      })
    ).to.throw(original);
    expect(called).to.equal(1);
  });

  it('leaves original telemetry untouched when its optional context has an unexpected shape', () => {
    const item = envelope();
    expect(addHearingsJourneyToTelemetry(item, { 'http.ServerRequest': {} })).to.equal(true);
    expect(item.data.baseData.properties).to.deep.equal({ existing: 'property' });
  });
});
