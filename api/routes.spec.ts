import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configuration from './configuration';
import {
  APP_INSIGHTS_CONNECTION_STRING,
  APP_INSIGHTS_SAMPLING_PERCENTAGE,
  FEATURE_DOCS_ENABLED,
} from './configuration/references';
import { getMonitoringConfig, isDocsEnabled } from './routes';

describe('routes docs feature', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('returns true when docs feature is enabled', () => {
    sandbox.stub(configuration, 'showFeature').callsFake((feature: string) => feature === FEATURE_DOCS_ENABLED);

    expect(isDocsEnabled()).to.equal(true);
  });

  it('returns false when feature is disabled', () => {
    sandbox.stub(configuration, 'showFeature').returns(false);

    expect(isDocsEnabled()).to.equal(false);
  });

  it('omits telemetry configuration when App Insights is disabled', () => {
    sandbox.stub(configuration, 'showFeature').returns(false);
    const getConfig = sandbox.stub(configuration, 'getConfigValue');
    expect(getMonitoringConfig()).to.deep.equal({ enabled: false });
    expect(getConfig.called).to.equal(false);
  });

  it('exposes enabled state and configured sampling to the browser', () => {
    sandbox.stub(configuration, 'showFeature').returns(true);
    const getConfig = sandbox.stub(configuration, 'getConfigValue');
    getConfig.withArgs(APP_INSIGHTS_CONNECTION_STRING).returns('InstrumentationKey=example');
    getConfig.withArgs(APP_INSIGHTS_SAMPLING_PERCENTAGE).returns(25);
    expect(getMonitoringConfig()).to.include({
      enabled: true,
      connectionString: 'InstrumentationKey=example',
      samplingPercentage: 25,
    });
  });
});
