import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { Response } from 'express';
import axios from 'axios';
import { AUTH, xuiNode } from '@hmcts/rpx-xui-node-lib';
import { EnhancedRequest } from '../lib/models';
import * as log4jui from '../lib/log4jui';
import * as configuration from '../configuration';

chai.use(sinonChai);

describe('Auth Module', () => {
  let sandbox: sinon.SinonSandbox;
  let req: EnhancedRequest;
  let res: Response;
  let next: sinon.SinonStub;
  let loggerStub: any;
  let getConfigValueStub: sinon.SinonStub;
  let showFeatureStub: sinon.SinonStub;
  let xuiNodeConfigureStub: sinon.SinonStub;
  let xuiNodeOnStub: sinon.SinonStub;
  let axiosPostStub: sinon.SinonStub;
  let axiosGetStub: sinon.SinonStub;
  let clientStub: any;
  let getLoggerStub: sinon.SinonStub;

  let successCallback: any;
  let failureCallback: any;
  let getXuiNodeMiddleware: any;

  before(() => {
    delete require.cache[require.resolve('./index')];
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq() as EnhancedRequest;
    res = mockRes();
    next = sandbox.stub() as any;

    loggerStub = {
      info: sandbox.stub(),
      warn: sandbox.stub(),
      error: sandbox.stub(),
      _logger: {
        info: sandbox.stub()
      }
    };
    getLoggerStub = sandbox.stub(log4jui, 'getLogger').returns(loggerStub);

    getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    showFeatureStub = sandbox.stub(configuration, 'showFeature');
    xuiNodeConfigureStub = sandbox.stub(xuiNode, 'configure');
    xuiNodeOnStub = sandbox.stub(xuiNode, 'on');
    axiosPostStub = sandbox.stub(axios, 'post');
    axiosGetStub = sandbox.stub(axios, 'get');

    clientStub = {
      trackEvent: sandbox.stub()
    };
    sandbox.stub(require('../lib/appInsights'), 'client').value(clientStub);

    const authModule = require('./index');
    successCallback = authModule.successCallback;
    failureCallback = authModule.failureCallback;
    getXuiNodeMiddleware = authModule.getXuiNodeMiddleware;
  });

  afterEach(() => {
    sandbox.restore();
    delete require.cache[require.resolve('./index')];
  });

  describe('successCallback', () => {
    beforeEach(() => {
      req.session = {
        passport: {
          user: {
            userinfo: {
              uid: 'test-user-id'
            },
            tokenset: {
              accessToken: 'test-access-token'
            }
          }
        }
      };
      getConfigValueStub.withArgs('cookies.token').returns('xui-mo-webapp-token');
      getConfigValueStub.withArgs('cookies.userId').returns('xui-mo-webapp-userId');
    });

    it('should set session and cookies successfully', () => {
      successCallback(req, res, next);

      expect(loggerStub.info).to.have.been.calledWith('Setting session and cookies');
      expect(res.cookie).to.have.been.calledTwice;
      expect(res.cookie).to.have.been.calledWith('xui-mo-webapp-userId', 'test-user-id', { sameSite: 'strict' });
      expect(res.cookie).to.have.been.calledWith('xui-mo-webapp-token', 'test-access-token', { sameSite: 'strict' });
    });

    it('should redirect to root when not refresh', () => {
      req.isRefresh = false;

      successCallback(req, res, next);

      expect(res.redirect).to.have.been.calledWith('/');
      expect(next).to.not.have.been.called;
    });

    it('should call next when isRefresh is true', () => {
      req.isRefresh = true;

      successCallback(req, res, next);

      expect(res.redirect).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });

    it('should handle missing user info gracefully', () => {
      req.session.passport.user.userinfo = {};
      req.session.passport.user.tokenset = {};

      successCallback(req, res, next);

      expect(res.cookie).to.have.been.calledWith('xui-mo-webapp-userId', undefined, { sameSite: 'strict' });
      expect(res.cookie).to.have.been.calledWith('xui-mo-webapp-token', undefined, { sameSite: 'strict' });
    });
  });

  describe('failureCallback', () => {
    beforeEach(() => {
      res.locals = {
        message: 'Authentication failed'
      };
    });

    it('should log warning with error message', () => {
      failureCallback(req, res);

      expect(loggerStub.warn).to.have.been.calledWith('Auth Error: Authentication failed');
    });

    it('should track event when client is available', () => {
      failureCallback(req, res);

      expect(clientStub.trackEvent).to.have.been.calledWith({ name: 'Auth Error: Authentication failed' });
    });

    it('should not track event when client is not available', () => {
      sandbox.stub(require('../lib/appInsights'), 'client').value(null);

      failureCallback(req, res);

      expect(clientStub.trackEvent).to.not.have.been.called;
    });

    it('should handle missing error message', () => {
      res.locals.message = undefined;

      failureCallback(req, res);

      expect(loggerStub.warn).to.have.been.calledWith('Auth Error: undefined');
    });
  });

  describe('getXuiNodeMiddleware', () => {
    const mockConfig = {
      idamWebUrl: 'https://idam-web.test.com',
      secret: 'test-secret',
      idamClient: 'test-client-id',
      issuerUrl: 'https://idam-iss.test.com',
      idamApiPath: 'https://idam-api.test.com',
      s2sSecret: 'test-s2s-secret',
      userName: 'system-user',
      password: 'system-password',
      sessionSecret: 'session-secret',
      redisCloudUrl: 'redis://test',
      redisKeyPrefix: 'xui:',
      redisTtl: 3600,
      microservice: 'xui_webapp',
      s2sPath: 'https://s2s.test.com',
      oauthCallbackUrl: 'https://xui.test.com/oauth2/callback',
      loginRoleMatcher: 'caseworker|judiciary',
      idamServiceOverride: 'override-service'
    };

    // Helper functions to reduce duplication
    const assertAuthConfiguration = (configArg: any, authType: 'oidc' | 'oauth2') => {
      expect(configArg.auth[authType]).to.be.an('object');
      expect(configArg.auth[authType].clientID).to.equal(mockConfig.idamClient);
      expect(configArg.auth[authType].clientSecret).to.equal(mockConfig.secret);
      expect(configArg.auth[authType].authorizationURL).to.equal(`${mockConfig.idamWebUrl}/login`);
      expect(configArg.auth[authType].callbackURL).to.equal(mockConfig.oauthCallbackUrl);
      expect(configArg.auth[authType].scope).to.equal('profile openid roles manage-user create-user search-user');
    };

    const assertBaseSessionConfiguration = (sessionConfig: any) => {
      expect(sessionConfig.name).to.equal('xui-webapp');
      expect(sessionConfig.resave).to.be.false;
      expect(sessionConfig.saveUninitialized).to.be.false;
      expect(sessionConfig.secret).to.equal(mockConfig.sessionSecret);
    };

    const assertCookieConfiguration = (cookieConfig: any) => {
      expect(cookieConfig).to.be.an('object');
      expect(cookieConfig.httpOnly).to.be.true;
      expect(cookieConfig.sameSite).to.equal('Lax');
      expect(cookieConfig.secure).to.be.true;
    };

    const assertRedisStoreConfiguration = (configArg: any) => {
      expect(configArg.session.redisStore).to.be.an('object');
      assertBaseSessionConfiguration(configArg.session.redisStore);
      assertCookieConfiguration(configArg.session.redisStore.cookie);
      expect(configArg.session.redisStore.redisStoreOptions).to.be.an('object');
      expect(configArg.session.redisStore.redisStoreOptions.redisCloudUrl).to.equal(mockConfig.redisCloudUrl);
      expect(configArg.session.redisStore.redisStoreOptions.redisKeyPrefix).to.equal(mockConfig.redisKeyPrefix);
      expect(configArg.session.redisStore.redisStoreOptions.redisTtl).to.equal(mockConfig.redisTtl);
      expect(configArg.session.fileStore).to.be.undefined;
    };

    const assertFileStoreConfiguration = (configArg: any, expectedPath: string) => {
      expect(configArg.session.fileStore).to.be.an('object');
      assertBaseSessionConfiguration(configArg.session.fileStore);
      assertCookieConfiguration(configArg.session.fileStore.cookie);
      expect(configArg.session.fileStore.fileStoreOptions).to.be.an('object');
      expect(configArg.session.fileStore.fileStoreOptions.filePath).to.equal(expectedPath);
      expect(configArg.session.redisStore).to.be.undefined;
    };

    const assertStubCalledOnceAndGetConfig = async (middleware: any) => {
      const result = await middleware();
      expect(xuiNodeConfigureStub).to.have.been.calledOnce;
      const configArg = xuiNodeConfigureStub.firstCall.args[0];
      expect(result).to.equal('configured');
      return configArg;
    };

    beforeEach(() => {
      getConfigValueStub.withArgs('services.idam.idamLoginUrl').returns(mockConfig.idamWebUrl);
      getConfigValueStub.withArgs('secrets.rpx.mc-idam-client-secret').returns(mockConfig.secret);
      getConfigValueStub.withArgs('services.idam.idamClientID').returns(mockConfig.idamClient);
      getConfigValueStub.withArgs('services.idam.iss').returns(mockConfig.issuerUrl);
      getConfigValueStub.withArgs('services.idam.idamApiUrl').returns(mockConfig.idamApiPath);
      getConfigValueStub.withArgs('secrets.rpx.mc-s2s-client-secret').returns(mockConfig.s2sSecret);
      getConfigValueStub.withArgs('secrets.rpx.system-user-name').returns(mockConfig.userName);
      getConfigValueStub.withArgs('secrets.rpx.system-user-password').returns(mockConfig.password);
      getConfigValueStub.withArgs('sessionSecret').returns(mockConfig.sessionSecret);
      getConfigValueStub.withArgs('secrets.rpx.webapp-redis-connection-string').returns(mockConfig.redisCloudUrl);
      getConfigValueStub.withArgs('redis.prefix').returns(mockConfig.redisKeyPrefix);
      getConfigValueStub.withArgs('redis.ttl').returns(mockConfig.redisTtl);
      getConfigValueStub.withArgs('microservice').returns(mockConfig.microservice);
      getConfigValueStub.withArgs('services.s2s').returns(mockConfig.s2sPath);
      getConfigValueStub.withArgs('services.idam.oauthCallbackUrl').returns(mockConfig.oauthCallbackUrl);
      getConfigValueStub.withArgs('loginRoleMatcher').returns(mockConfig.loginRoleMatcher);
      getConfigValueStub.withArgs('services.idam.serviceOverride').returns(mockConfig.idamServiceOverride);
      getConfigValueStub.withArgs('now').returns(false);

      showFeatureStub.withArgs('secureCookieEnabled').returns(true);
      showFeatureStub.withArgs('redisEnabled').returns(false);
      showFeatureStub.withArgs('oidcEnabled').returns(true);
      showFeatureStub.withArgs('queryIdamServiceOverride').returns(false);

      xuiNodeConfigureStub.resolves('configured');
    });

    it('should configure xuiNode with correct options for OIDC', async () => {
      const configArg = await assertStubCalledOnceAndGetConfig(getXuiNodeMiddleware);

      assertAuthConfiguration(configArg, 'oidc');
      expect(configArg.auth.oauth2).to.be.undefined;
    });

    it('should configure oauth2 when OIDC is disabled', async () => {
      showFeatureStub.withArgs('oidcEnabled').returns(false);

      const configArg = await assertStubCalledOnceAndGetConfig(getXuiNodeMiddleware);

      assertAuthConfiguration(configArg, 'oauth2');
      expect(configArg.auth.oidc).to.be.undefined;
    });

    it('should use redis store when redis is enabled', async () => {
      showFeatureStub.withArgs('redisEnabled').returns(true);

      const configArg = await assertStubCalledOnceAndGetConfig(getXuiNodeMiddleware);

      assertRedisStoreConfiguration(configArg);
    });

    it('should use file store when redis is disabled', async () => {
      showFeatureStub.withArgs('redisEnabled').returns(false);

      const configArg = await assertStubCalledOnceAndGetConfig(getXuiNodeMiddleware);

      assertFileStoreConfiguration(configArg, '.sessions');
    });

    it('should use /tmp/sessions path when NOW is true', async () => {
      getConfigValueStub.withArgs('now').returns(true);
      showFeatureStub.withArgs('redisEnabled').returns(false);

      const configArg = await assertStubCalledOnceAndGetConfig(getXuiNodeMiddleware);

      assertFileStoreConfiguration(configArg, '/tmp/sessions');
    });

    it('should configure route credentials correctly', async () => {
      await getXuiNodeMiddleware();

      const configArg = xuiNodeConfigureStub.firstCall.args[0];
      const routeCredential = configArg.auth.oidc.routeCredential;

      expect(routeCredential.userName).to.equal(mockConfig.userName);
      expect(routeCredential.password).to.equal(mockConfig.password);
      expect(routeCredential.scope).to.equal('openid profile roles manage-user create-user search-user');
      expect(routeCredential.routes).to.be.an('array').with.length(6);
      expect(routeCredential.routes).to.include('/workallocation/caseworker');
      expect(routeCredential.routes).to.include('/api/role-access/roles/getJudicialUsers');
    });

    it('should configure s2s authentication correctly', async () => {
      await getXuiNodeMiddleware();

      const configArg = xuiNodeConfigureStub.firstCall.args[0];
      const s2sConfig = configArg.auth.s2s;

      expect(s2sConfig.microservice).to.equal(mockConfig.microservice);
      expect(s2sConfig.s2sEndpointUrl).to.equal(`${mockConfig.s2sPath}/lease`);
      expect(s2sConfig.s2sSecret).to.equal(mockConfig.s2sSecret);
    });

    it('should trim s2s secret', async () => {
      getConfigValueStub.withArgs('secrets.rpx.mc-s2s-client-secret').returns('  test-s2s-secret  ');

      await getXuiNodeMiddleware();

      const configArg = xuiNodeConfigureStub.firstCall.args[0];
      expect(configArg.auth.s2s.s2sSecret).to.equal('test-s2s-secret');
    });

    it('should query IDAM service override when feature is enabled', async () => {
      showFeatureStub.withArgs('queryIdamServiceOverride').returns(true);
      const mockToken = 'test-token';
      const mockServiceOverride = 'dynamic-override';

      axiosPostStub.resolves({
        data: { access_token: mockToken }
      });
      axiosGetStub.resolves({
        data: { oauth2: { issuerOverride: mockServiceOverride } }
      });

      await getXuiNodeMiddleware();

      expect(loggerStub.info).to.have.been.calledWith('Querying IDAM service override');
      expect(axiosPostStub).to.have.been.calledOnce;
      expect(axiosGetStub).to.have.been.calledOnce;

      const configArg = xuiNodeConfigureStub.firstCall.args[0];
      expect(configArg.auth.oidc.serviceOverride).to.equal(mockServiceOverride);
    });

    it('should fallback to config value when IDAM service override query fails', async () => {
      showFeatureStub.withArgs('queryIdamServiceOverride').returns(true);

      axiosPostStub.resolves({
        data: { access_token: 'test-token' }
      });
      axiosGetStub.rejects(new Error('API Error'));

      await getXuiNodeMiddleware();

      expect(loggerStub.error).to.have.been.calledWith(
        'Error retrieving service override from API, falling back to config value',
        sinon.match.instanceOf(Error)
      );

      const configArg = xuiNodeConfigureStub.firstCall.args[0];
      expect(configArg.auth.oidc.serviceOverride).to.equal(mockConfig.idamServiceOverride);
    });

    it('should handle token fetch failure when querying service override', async () => {
      showFeatureStub.withArgs('queryIdamServiceOverride').returns(true);

      axiosPostStub.rejects(new Error('Token fetch failed'));

      await getXuiNodeMiddleware();

      expect(loggerStub.error).to.have.been.calledWith('Error fetching token:', sinon.match.instanceOf(Error));
      expect(loggerStub.error).to.have.been.calledWith(
        'Error retrieving service override from API, falling back to config value',
        sinon.match.instanceOf(Error)
      );
    });

    it('should handle missing access token in response', async () => {
      showFeatureStub.withArgs('queryIdamServiceOverride').returns(true);

      axiosPostStub.resolves({
        data: {} // No access_token
      });

      await getXuiNodeMiddleware();

      expect(loggerStub.error).to.have.been.calledWith(
        'Error retrieving service override from API, falling back to config value',
        sinon.match.instanceOf(Error)
      );
    });

    it('should configure session cookie settings correctly', async () => {
      await getXuiNodeMiddleware();

      const configArg = xuiNodeConfigureStub.firstCall.args[0];
      const cookieSettings = configArg.session.fileStore.cookie;

      expect(cookieSettings.httpOnly).to.be.true;
      expect(cookieSettings.sameSite).to.equal('Lax');
      expect(cookieSettings.secure).to.be.true; // secure cookies enabled
    });

    it('should disable secure cookies when feature is disabled', async () => {
      showFeatureStub.withArgs('secureCookieEnabled').returns(false);

      await getXuiNodeMiddleware();

      const configArg = xuiNodeConfigureStub.firstCall.args[0];
      const cookieSettings = configArg.session.fileStore.cookie;
      expect(cookieSettings.secure).to.be.false;
    });

    it('should log configuration setup', async () => {
      await getXuiNodeMiddleware();

      expect(loggerStub._logger.info).to.have.been.calledWith('Setting XuiNodeLib options');
    });

    it('should handle xuiNode configuration error', async () => {
      const configError = new Error('Configuration failed');
      xuiNodeConfigureStub.rejects(configError);

      try {
        await getXuiNodeMiddleware();
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).to.equal(configError);
      }
    });

    describe('Token Fetching', () => {
      beforeEach(() => {
        showFeatureStub.withArgs('queryIdamServiceOverride').returns(true);
      });

      it('should make correct token request', async () => {
        axiosPostStub.resolves({
          data: { access_token: 'test-token' }
        });
        axiosGetStub.resolves({
          data: { oauth2: { issuerOverride: 'override' } }
        });

        await getXuiNodeMiddleware();

        expect(axiosPostStub).to.have.been.calledWith(
          `${mockConfig.idamApiPath}/oauth2/token`,
          'grant_type=client_credentials&client_id=test-client-id&client_secret=test-secret&scope=profile%20roles%20view-service-provider',
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
      });

      it('should make correct service details request', async () => {
        const mockToken = 'test-token';
        axiosPostStub.resolves({
          data: { access_token: mockToken }
        });
        axiosGetStub.resolves({
          data: { oauth2: { issuerOverride: 'override' } }
        });

        await getXuiNodeMiddleware();

        expect(axiosGetStub).to.have.been.calledWith(
          `${mockConfig.idamApiPath}/api/v2/services/${mockConfig.idamClient}`,
          {
            headers: {
              'Authorization': `Bearer ${mockToken}`
            }
          }
        );
      });

      it('should log successful service override retrieval', async () => {
        axiosPostStub.resolves({
          data: { access_token: 'test-token' }
        });
        axiosGetStub.resolves({
          data: { oauth2: { issuerOverride: 'override' } }
        });

        await getXuiNodeMiddleware();

        expect(loggerStub.info).to.have.been.calledWith('Successfully retrieved service override from API');
      });
    });
  });

  describe('Event Listeners', () => {
    it('should register success callback for authenticate success event', () => {
      // This test verifies that the event listeners are registered when the module is imported
      expect(xuiNodeOnStub).to.have.been.calledWith(AUTH.EVENT.AUTHENTICATE_SUCCESS, successCallback);
    });

    it('should register failure callback for authenticate failure event', () => {
      expect(xuiNodeOnStub).to.have.been.calledWith(AUTH.EVENT.AUTHENTICATE_FAILURE, failureCallback);
    });
  });
});
