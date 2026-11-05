import { diag, trace } from '@opentelemetry/api';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { enableTelemetryDiagnostics, probeRequestTelemetry } from './telemetryDiagnostics';

describe('telemetry diagnostics', () => {
  const sandbox = sinon.createSandbox();
  afterEach(() => sandbox.restore());

  it('does not install a logger or write output by default', () => {
    sandbox.stub(process, 'env').value({});
    const logger = sandbox.stub(diag, 'setLogger');
    const output = sandbox.stub(process.stderr, 'write').returns(true);
    expect(enableTelemetryDiagnostics()).to.equal(undefined);
    expect(logger.called).to.equal(false);
    expect(output.called).to.equal(false);
  });

  it('does not create probe spans when disabled', () => {
    sandbox.stub(process, 'env').value({});
    const tracer = sandbox.stub(trace, 'getTracer');
    probeRequestTelemetry('incoming', true);
    expect(tracer.called).to.equal(false);
  });

  it('reports probe recording state without request data and caps probe output', () => {
    sandbox.stub(process, 'env').value({ XUI_TELEMETRY_DIAGNOSTICS: 'true' });
    const end = sandbox.stub();
    sandbox.stub(trace, 'getTracer').returns({ startSpan: () => ({ isRecording: () => false, end }) } as any);
    const output = sandbox.stub(process.stderr, 'write').returns(true);
    for (let index = 0; index < 15; index++) {
      probeRequestTelemetry('outbound', true);
    }
    expect(output.callCount).to.equal(10);
    expect(end.callCount).to.equal(10);
    expect(JSON.parse(String(output.firstCall.args[0]))).to.deep.equal({
      source: 'xui-telemetry-diagnostics',
      event: 'request-probe',
      origin: 'outbound',
      clientAvailable: true,
      suppressed: false,
      recording: false,
    });
  });

  it('reports bounded counters without SDK messages or span contents', () => {
    sandbox.stub(process, 'env').value({ XUI_TELEMETRY_DIAGNOSTICS: 'true' });
    const logger = sandbox.stub(diag, 'setLogger');
    const output = sandbox.stub(process.stderr, 'write').returns(true);
    const processor = enableTelemetryDiagnostics()!;
    const diagnosticLogger = logger.firstCall.args[0] as any;
    diagnosticLogger.error('secret connection string');
    diagnosticLogger.warn('secret header');
    for (let index = 0; index < 60; index++) {
      processor.onStart({ name: 'secret identity' } as any, {} as any);
      processor.onEnd({ name: 'secret URL' } as any);
    }
    expect(output.callCount).to.equal(50);
    const records = output.args.map(([line]) => JSON.parse(String(line)));
    expect(records.some((record) => record.event === 'span-end')).to.equal(true);
    expect(records.some((record) => record.errors === 1 && record.warnings === 1)).to.equal(true);
    expect(JSON.stringify(records)).not.to.contain('secret');
  });
});
