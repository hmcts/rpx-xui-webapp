import { expect } from 'chai';
import * as sinon from 'sinon';
import { xuiNode } from '@hmcts/rpx-xui-node-lib';
import * as configuration from '../configuration';
import { FEATURE_REDIS_ENABLED, NOW, REDIS_CLOUD_URL, REDIS_KEY_PREFIX, REDIS_TTL } from '../configuration/references';
import { getXuiNodeMiddleware } from './index';

describe('Auth session store selection', () => {
  let sandbox: sinon.SinonSandbox;
  let config: sinon.SinonStub;
  let feature: sinon.SinonStub;
  let configure: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    config = sandbox.stub(configuration, 'getConfigValue').returns('test-value');
    config.withArgs(NOW).returns(false);
    feature = sandbox.stub(configuration, 'showFeature').returns(false);
    configure = sandbox.stub(xuiNode, 'configure').resolves([]);
  });

  afterEach(() => sandbox.restore());

  it('uses local file sessions instead of configured Redis sessions when Redis is disabled', async () => {
    // Store options are built before the Redis feature flag selects the session store.
    config.withArgs(REDIS_CLOUD_URL).returns('redis://test-only');
    config.withArgs(REDIS_KEY_PREFIX).returns('test-prefix');
    config.withArgs(REDIS_TTL).returns(3600);
    await getXuiNodeMiddleware();
    const options = configure.firstCall.args[0];
    expect(options.session.redisStore).to.equal(undefined);
    expect(options.session.fileStore.fileStoreOptions).to.deep.equal({ filePath: '.sessions' });
    expect(options.session.fileStore.cookie.httpOnly).to.equal(true);
    expect(options.session.fileStore.cookie.sameSite).to.equal('Lax');
    expect(options.session.fileStore.saveUninitialized).to.equal(false);
  });

  it('preserves the existing temporary file-store location when NOW is enabled', async () => {
    config.withArgs(NOW).returns(true);
    await getXuiNodeMiddleware();
    expect(configure.firstCall.args[0].session.fileStore.fileStoreOptions).to.deep.equal({ filePath: '/tmp/sessions' });
  });

  it('preserves configured Redis session options when Redis is enabled', async () => {
    feature.withArgs(FEATURE_REDIS_ENABLED).returns(true);
    config.withArgs(REDIS_CLOUD_URL).returns('redis://test-only');
    config.withArgs(REDIS_KEY_PREFIX).returns('test-prefix');
    config.withArgs(REDIS_TTL).returns(3600);
    await getXuiNodeMiddleware();
    const options = configure.firstCall.args[0];
    expect(options.session.fileStore).to.equal(undefined);
    expect(options.session.redisStore.redisStoreOptions).to.deep.equal({
      redisCloudUrl: 'redis://test-only',
      redisKeyPrefix: 'test-prefix',
      redisTtl: 3600,
    });
    expect(options.session.redisStore.cookie.httpOnly).to.equal(true);
    expect(options.session.redisStore.saveUninitialized).to.equal(false);
  });

  it('still fails clearly for a missing secret when Redis is explicitly enabled', () => {
    feature.withArgs(FEATURE_REDIS_ENABLED).returns(true);
    const original = new Error('Redis secret is not configured');
    config.withArgs(REDIS_CLOUD_URL).throws(original);
    expect(() => getXuiNodeMiddleware()).to.throw(original);
    expect(configure.called).to.equal(false);
  });
});
