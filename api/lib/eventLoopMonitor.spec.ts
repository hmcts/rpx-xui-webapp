import { expect } from 'chai';
import * as express from 'express';
import 'mocha';
import * as sinon from 'sinon';

describe('eventLoopMonitor', () => {
  let sandbox: sinon.SinonSandbox;
  let getConfigValueStub: sinon.SinonStub;
  let getLoggerStub: sinon.SinonStub;
  let infoStub: sinon.SinonStub;
  let warnStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    infoStub = sandbox.stub();
    warnStub = sandbox.stub();

    getConfigValueStub = sandbox.stub(require('../configuration'), 'getConfigValue');
    getLoggerStub = sandbox.stub(require('./log4jui'), 'getLogger').returns({
      debug: sandbox.stub(),
      error: sandbox.stub(),
      info: infoStub,
      trackRequest: sandbox.stub(),
      warn: warnStub,
    });
  });

  afterEach(() => {
    sandbox.restore();
    delete require.cache[require.resolve('./eventLoopMonitor')];
  });

  function stubBaseConfig(overrides: Record<string, any> = {}) {
    const values = {
      'eventLoopMonitor.debugEnabled': false,
      'eventLoopMonitor.enabled': true,
      'eventLoopMonitor.maxTrackedRequests': 5,
      'eventLoopMonitor.resolutionMs': 20,
      'eventLoopMonitor.sampleIntervalMs': 5000,
      'eventLoopMonitor.slowRequestThresholdMs': 2000,
      'eventLoopMonitor.warnThresholdMs': 1000,
      ...overrides,
    };

    getConfigValueStub.callsFake((key: string) => values[key]);
  }

  it('should not register middleware when disabled', () => {
    stubBaseConfig({ 'eventLoopMonitor.enabled': false });
    const app = express();

    const { initialiseEventLoopMonitor } = require('./eventLoopMonitor');
    initialiseEventLoopMonitor(app);

    sinon.assert.calledWith(getLoggerStub, 'EventLoop');
    sinon.assert.notCalled(infoStub);
    expect(app._router).to.equal(undefined);
  });

  it('should register middleware and log startup when enabled', () => {
    stubBaseConfig();
    const app = express();

    const { initialiseEventLoopMonitor } = require('./eventLoopMonitor');
    initialiseEventLoopMonitor(app);

    sinon.assert.calledOnce(infoStub);
    const payload = JSON.parse(infoStub.firstCall.args[0]);
    expect(payload.event).to.equal('node_event_loop_monitor_started');
    expect(payload.sampleIntervalMs).to.equal(5000);
    expect(app._router).to.exist;
  });
});
