import { diag} from '@opentelemetry/api';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { enableTelemetryDiagnostics } from './telemetryDiagnostics';

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
