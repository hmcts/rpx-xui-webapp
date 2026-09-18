import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as amendedJurisdictions from './amendedJurisdictions';
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

  it('routes case searches to the Data Store API', () => {
    initProxy({} as any);

    const configs = applyProxyStub.getCalls().map((call) => call.args[1]);

    expect(configs.find((config) => config.source === '/data/internal/searchCases')).to.include({
      source: '/data/internal/searchCases',
      target: SERVICES_CCD_DATA_STORE_API_PATH,
    });
  });

  it('rewrites case-search URLs for the Data Store API', () => {
    initProxy({} as any);

    const configs = applyProxyStub.getCalls().map((call) => call.args[1]);
    const searchCasesConfig = configs.find((config) => config.source === '/data/internal/searchCases');

    expect(searchCasesConfig.rewriteUrl('/?ctid=PCS&use_case=WORKBASKET&page=1')).to.equal(
      '/internal/searchCases?ctid=PCS&use_case=WORKBASKET&page=1'
    );
  });

  it('routes Data Store paths to the Data Store API with URL rewriting', () => {
    initProxy({} as any);

    const configs = applyProxyStub.getCalls().map((call) => call.args[1]);

    expect(configs.find((config) => config.source === '/data')).to.include({
      target: SERVICES_CCD_DATA_STORE_API_PATH,
      rewrite: true,
    });
  });

  it('excludes case searches from the generic Data Store proxy', () => {
    initProxy({} as any);

    const configs = applyProxyStub.getCalls().map((call) => call.args[1]);

    expect(configs.find((config) => config.source === '/data').filter).to.eql(['!/data/internal/searchCases']);
  });

  it('routes aggregated data to the Data Store API without URL rewriting', () => {
    initProxy({} as any);

    const configs = applyProxyStub.getCalls().map((call) => call.args[1]);

    expect(configs.find((config) => config.source === '/aggregated')).to.include({
      source: '/aggregated',
      target: SERVICES_CCD_DATA_STORE_API_PATH,
      rewrite: false,
    });
  });

  it('rewrites the caseworker UID before checking cached aggregated jurisdictions', () => {
    const rewriteCaseworkerUidStub = sandbox.stub(amendedJurisdictions, 'rewriteCaseworkerUid');
    const checkCachedJurisdictionsStub = sandbox.stub(amendedJurisdictions, 'checkCachedJurisdictions');
    const proxyRequest = {};
    const request = {};

    initProxy({} as any);

    const configs = applyProxyStub.getCalls().map((call) => call.args[1]);
    const aggregatedConfig = configs.find((config) => config.source === '/aggregated');

    aggregatedConfig.onReq(proxyRequest, request);

    expect(rewriteCaseworkerUidStub.calledOnceWithExactly(proxyRequest, request)).to.be.true;
    expect(checkCachedJurisdictionsStub.calledOnceWithExactly(proxyRequest, request)).to.be.true;
    expect(rewriteCaseworkerUidStub.calledBefore(checkCachedJurisdictionsStub)).to.be.true;
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
