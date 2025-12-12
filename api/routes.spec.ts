import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configuration from './configuration';
import { FEATURE_DOCS_ENABLED } from './configuration/references';
import { isDocsEnabled } from './routes';

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
});
