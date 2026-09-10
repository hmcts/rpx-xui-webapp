import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as configuration from './configuration';
import * as middlewareProxy from './lib/middleware/proxy';
import { initProxy } from './proxy.config';
import { SERVICES_CCD_COMPONENT_API_PATH, SERVICES_CCD_DATA_STORE_API_PATH } from './configuration/references';

describe('proxy configuration', () => {
  let sandbox: sinon.SinonSandbox;
  let applyProxyStub: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    applyProxyStub = sandbox.stub(middlewareProxy, 'applyProxy');
    getConfigValueStub = sandbox.stub(configuration, 'getConfigValue').callsFake((reference: string) => reference);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('routes Data Store-backed CCD paths directly to the Data Store API', () => {
    initProxy({} as any);

    const configs = applyProxyStub.getCalls().map((call) => call.args[1]);

    expect(configs.find((config) => config.source === '/data/internal/searchCases')).to.include({
      source: '/data/internal/searchCases',
      target: SERVICES_CCD_DATA_STORE_API_PATH,
      rewrite: false,
    });
    expect(configs.find((config) => config.source === '/data')).to.include({
      target: SERVICES_CCD_DATA_STORE_API_PATH,
      rewrite: false,
    });
    expect(configs.find((config) => config.source === '/aggregated')).to.include({
      source: '/aggregated',
      target: SERVICES_CCD_DATA_STORE_API_PATH,
      rewrite: false,
    });
  });

  it('keeps non-Data Store CCD proxy paths on the component gateway', () => {
    initProxy({} as any);

    const configs = applyProxyStub.getCalls().map((call) => call.args[1]);

    expect(configs.find((config) => config.source === '/print')).to.include({
      target: SERVICES_CCD_COMPONENT_API_PATH,
    });
    expect(configs.find((config) => Array.isArray(config.source) && config.source.includes('/activity'))).to.include({
      target: SERVICES_CCD_COMPONENT_API_PATH,
    });
    expect(configs.find((config) => config.source === '/api/addresses')).to.include({
      target: SERVICES_CCD_COMPONENT_API_PATH,
    });
  });
});
