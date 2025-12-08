import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as configIndex from './index';
import * as menuConfigs from './menuConfigs/configs';
import * as hearingConfigs from './hearingConfigs/configs';
import { router } from './uiConfigRouter';
import * as chaiAsPromised from 'chai-as-promised';

// Access the module to clear cache
const uiConfigModule = require('./uiConfigRouter');

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('uiConfigRouter', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;
  let showFeatureStub: sinon.SinonStub;
  let setupMenuConfigStub: sinon.SinonStub;
  let setupHearingConfigsStub: sinon.SinonStub;

  const mockMenuConfig = { menu: 'test-menu' };
  const mockHearingConfig = { jurisdictions: ['test-jurisdiction'] };

  let originalPreviewId: string | undefined;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq();
    res = mockRes();
    next = sandbox.stub();

    // Store original env
    originalPreviewId = process.env.PREVIEW_DEPLOYMENT_ID;

    // Clear module cache to reset cached configs before each test
    delete require.cache[require.resolve('./uiConfigRouter')];

    getConfigValueStub = sandbox.stub(configIndex, 'getConfigValue');
    showFeatureStub = sandbox.stub(configIndex, 'showFeature');
    setupMenuConfigStub = sandbox.stub(menuConfigs, 'setupMenuConfig');
    setupHearingConfigsStub = sandbox.stub(hearingConfigs, 'setupHearingConfigs');

    setupMenuConfigStub.returns(mockMenuConfig);
    setupHearingConfigsStub.returns(mockHearingConfig);
  });

  afterEach(() => {
    sandbox.restore();
    // Restore original env
    if (originalPreviewId === undefined) {
      delete process.env.PREVIEW_DEPLOYMENT_ID;
    } else {
      process.env.PREVIEW_DEPLOYMENT_ID = originalPreviewId;
    }
  });

  describe('router', () => {
    it('should be an Express router', () => {
      expect(router).to.exist;
      expect(router.get).to.be.a('function');
    });

    it('should register GET / route', () => {
      const routes = router.stack
        .filter((layer) => layer.route)
        .map((layer) => layer.route.path);
      expect(routes).to.include('/');
    });
  });

  describe('uiConfigurationRouter', () => {
    let routeHandler: any;

    beforeEach(() => {
      // Get the fresh route handler after cache clear
      const freshRouter = require('./uiConfigRouter').router;
      routeHandler = freshRouter.stack[0].route.stack[0].handle;
    });

    it('should return configuration with all required fields', async () => {
      // Setup stubs - set default return value first
      getConfigValueStub.returns('default-value');
      showFeatureStub.returns(false);

      // Configure stubs to return mock URLs and values for testing
      getConfigValueStub.withArgs('services.idam.idamLoginUrl').returns('https://prod.idam.com');
      getConfigValueStub.withArgs('services.ccd.componentApi').returns('https://ccd.api.com');
      getConfigValueStub.withArgs('services.idam.idamClientID').returns('test-client-id');
      getConfigValueStub.withArgs('secrets.rpx.launch-darkly-client-id').returns('test-ld-client');
      getConfigValueStub.withArgs('services.idam.oauthCallbackUrl').returns('https://callback.url');
      getConfigValueStub.withArgs('protocol').returns('https');
      getConfigValueStub.withArgs('services.payment_return_url').returns('https://payment.return.url');
      getConfigValueStub.withArgs('services.waWorkflowApi').returns('https://wa.workflow.api');
      getConfigValueStub.withArgs('services.judicialBookingApi').returns('https://judicial.booking.api');

      showFeatureStub.withArgs('accessManagementEnabled').returns(true);
      showFeatureStub.withArgs('oidcEnabled').returns(false);
      showFeatureStub.withArgs('substantiveRoleEnabled').returns(true);

      await routeHandler(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith({
        accessManagementEnabled: true,
        ccdGatewayUrl: 'https://ccd.api.com',
        clientId: 'test-client-id',
        idamWeb: 'https://prod.idam.com',
        launchDarklyClientId: 'test-ld-client',
        oAuthCallback: 'https://callback.url',
        oidcEnabled: false,
        protocol: 'https',
        substantiveEnabled: true,
        paymentReturnUrl: 'https://payment.return.url',
        waWorkflowApi: 'https://wa.workflow.api',
        judicialBookingApi: 'https://judicial.booking.api',
        headerConfig: mockMenuConfig,
        hearingJurisdictionConfig: mockHearingConfig
      });
    });

    it('should handle missing config values gracefully', async () => {
      // All config values return undefined except idamLoginUrl which is required for environment detection
      getConfigValueStub.returns(undefined);
      getConfigValueStub.withArgs('services.idam.idamLoginUrl').returns('https://prod.idam.com');
      showFeatureStub.returns(undefined);

      await routeHandler(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      const responseData = res.send.firstCall.args[0];
      expect(responseData).to.have.property('accessManagementEnabled', undefined);
      expect(responseData).to.have.property('ccdGatewayUrl', undefined);
      expect(responseData).to.have.property('clientId', undefined);
      expect(responseData).to.have.property('idamWeb', 'https://prod.idam.com');
      expect(responseData).to.have.property('launchDarklyClientId', undefined);
      expect(responseData).to.have.property('oAuthCallback', undefined);
      expect(responseData).to.have.property('oidcEnabled', undefined);
      expect(responseData).to.have.property('protocol', undefined);
      expect(responseData).to.have.property('substantiveEnabled', undefined);
      expect(responseData).to.have.property('paymentReturnUrl', undefined);
      expect(responseData).to.have.property('waWorkflowApi', undefined);
      expect(responseData).to.have.property('judicialBookingApi', undefined);
      expect(responseData).to.have.property('headerConfig', mockMenuConfig);
      expect(responseData).to.have.property('hearingJurisdictionConfig', mockHearingConfig);
    });

    it('should handle errors in setupMenuConfig', async () => {
      getConfigValueStub.returns('default-value');
      getConfigValueStub.withArgs('services.idam.idamLoginUrl').returns('https://prod.idam.com');

      // Reset the stub to ensure it throws
      setupMenuConfigStub.resetBehavior();
      setupMenuConfigStub.throws(new Error('Menu config error'));

      await expect(routeHandler(req, res, next))
        .to.be.rejectedWith('Menu config error');
    });

    it('should handle errors in setupHearingConfigs', async () => {
      getConfigValueStub.returns('default-value');
      getConfigValueStub.withArgs('services.idam.idamLoginUrl').returns('https://prod.idam.com');

      setupHearingConfigsStub.resetBehavior();
      setupHearingConfigsStub.throws(new Error('Hearing config error'));

      await expect(routeHandler(req, res, next))
        .to.be.rejectedWith('Hearing config error');
    });
  });

  describe('environment detection', () => {
    let routeHandler: any;

    beforeEach(() => {
      const freshRouter = require('./uiConfigRouter').router;
      routeHandler = freshRouter.stack[0].route.stack[0].handle;
    });

    it('should detect preview environment when PREVIEW_DEPLOYMENT_ID is set', async () => {
      process.env.PREVIEW_DEPLOYMENT_ID = 'test-preview-id';
      getConfigValueStub.returns('default-value');
      getConfigValueStub.withArgs('services.idam.idamLoginUrl').returns('https://test.idam.com');

      await routeHandler(req, res, next);

      expect(setupMenuConfigStub).to.have.been.calledWith('preview');
      expect(setupHearingConfigsStub).to.have.been.calledWith('preview');
    });

    it('should detect aat environment when URL contains .aat.', async () => {
      delete process.env.PREVIEW_DEPLOYMENT_ID;
      getConfigValueStub.returns('default-value');
      getConfigValueStub.withArgs('services.idam.idamLoginUrl').returns('https://test.aat.example.com');

      await routeHandler(req, res, next);

      expect(setupMenuConfigStub).to.have.been.calledWith('aat');
      expect(setupHearingConfigsStub).to.have.been.calledWith('aat');
    });

    it('should detect aat environment when URL contains .demo.', async () => {
      delete process.env.PREVIEW_DEPLOYMENT_ID;
      getConfigValueStub.returns('default-value');
      getConfigValueStub.withArgs('services.idam.idamLoginUrl').returns('https://test.demo.example.com');

      await routeHandler(req, res, next);

      expect(setupMenuConfigStub).to.have.been.calledWith('aat');
      expect(setupHearingConfigsStub).to.have.been.calledWith('aat');
    });

    it('should detect aat environment when URL contains .perftest.', async () => {
      delete process.env.PREVIEW_DEPLOYMENT_ID;
      getConfigValueStub.returns('default-value');
      getConfigValueStub.withArgs('services.idam.idamLoginUrl').returns('https://test.perftest.example.com');

      await routeHandler(req, res, next);

      expect(setupMenuConfigStub).to.have.been.calledWith('aat');
      expect(setupHearingConfigsStub).to.have.been.calledWith('aat');
    });

    it('should detect aat environment when URL contains .ithc.', async () => {
      delete process.env.PREVIEW_DEPLOYMENT_ID;
      getConfigValueStub.returns('default-value');
      getConfigValueStub.withArgs('services.idam.idamLoginUrl').returns('https://test.ithc.example.com');

      await routeHandler(req, res, next);

      expect(setupMenuConfigStub).to.have.been.calledWith('aat');
      expect(setupHearingConfigsStub).to.have.been.calledWith('aat');
    });

    it('should detect prod environment when URL does not contain AAT config envs', async () => {
      delete process.env.PREVIEW_DEPLOYMENT_ID;
      getConfigValueStub.returns('default-value');
      getConfigValueStub.withArgs('services.idam.idamLoginUrl').returns('https://prod.example.com');

      await routeHandler(req, res, next);

      expect(setupMenuConfigStub).to.have.been.calledWith('prod');
      expect(setupHearingConfigsStub).to.have.been.calledWith('prod');
    });

    it('should prioritize preview environment over URL-based detection', async () => {
      process.env.PREVIEW_DEPLOYMENT_ID = 'test-preview-id';
      getConfigValueStub.returns('default-value');
      getConfigValueStub.withArgs('services.idam.idamLoginUrl').returns('https://test.aat.example.com');

      await routeHandler(req, res, next);

      expect(setupMenuConfigStub).to.have.been.calledWith('preview');
      expect(setupHearingConfigsStub).to.have.been.calledWith('preview');
    });
  });

  describe('caching behavior', () => {
    it('should cache menu and hearing configs after first call', async () => {
      const freshRouter = require('./uiConfigRouter').router;
      const routeHandler = freshRouter.stack[0].route.stack[0].handle;

      delete process.env.PREVIEW_DEPLOYMENT_ID;
      getConfigValueStub.returns('default-value');
      getConfigValueStub.withArgs('services.idam.idamLoginUrl').returns('https://prod.example.com');

      // First call - should call setup functions
      await routeHandler(req, res, next);
      expect(setupMenuConfigStub).to.have.been.calledOnce;
      expect(setupHearingConfigsStub).to.have.been.calledOnce;

      // Change return values to verify caching
      setupMenuConfigStub.returns({ menu: 'new-menu' });
      setupHearingConfigsStub.returns({ jurisdictions: ['new-jurisdiction'] });

      res = mockRes();

      // Second call - should use cached values
      await routeHandler(req, res, next);

      // Setup functions should still only be called once
      expect(setupMenuConfigStub).to.have.been.calledOnce;
      expect(setupHearingConfigsStub).to.have.been.calledOnce;

      // Response should contain original cached values
      const responseData = res.send.firstCall.args[0];
      expect(responseData.headerConfig).to.deep.equal(mockMenuConfig);
      expect(responseData.hearingJurisdictionConfig).to.deep.equal(mockHearingConfig);
    });
  });
});
