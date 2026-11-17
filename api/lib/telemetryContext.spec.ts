import { context } from '@opentelemetry/api';
import { isTracingSuppressed, suppressTracing } from '@opentelemetry/core';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { withTracingUnsuppressed } from './telemetryContext';

describe('telemetry context', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => sandbox.restore());

  it('removes tracing suppression while the callback runs', () => {
    const suppressedContext = suppressTracing(context.active());
    sandbox.stub(context, 'active').returns(suppressedContext);
    const contextWith = sandbox.stub(context, 'with').callsFake((_context, callback) => callback());

    withTracingUnsuppressed(() => undefined);

    expect(isTracingSuppressed(suppressedContext)).to.equal(true);
    expect(isTracingSuppressed(contextWith.firstCall.args[0])).to.equal(false);
  });

  it('returns the callback result', () => {
    expect(withTracingUnsuppressed(() => 'tracked')).to.equal('tracked');
  });
});
