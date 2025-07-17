import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as HealthCheck from '@hmcts/nodejs-healthcheck';
import { SESSION, xuiNode } from '@hmcts/rpx-xui-node-lib';
import * as configuration from '../configuration';
import * as log4jui from '../lib/log4jui';
import {
  checkServiceHealth
} from './index';
import {
  FEATURE_REDIS_ENABLED,
  FEATURE_TERMS_AND_CONDITIONS_ENABLED,
  FEATURE_WORKALLOCATION_ENABLED,
  SERVICES_CASE_CASEWORKER_REF_PATH,
  SERVICES_CASE_JUDICIAL_REF_PATH,
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_CCD_DATA_STORE_API_PATH,
  SERVICES_DOCUMENTS_API_PATH,
  SERVICES_DOCUMENTS_API_PATH_V2,
  SERVICES_EM_ANNO_API_URL,
  SERVICES_EM_DOCASSEMBLY_API_URL,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_ROLE_ASSIGNMENT_API_PATH,
  SERVICES_ROLE_ASSIGNMENT_MAPPING_API_PATH,
  SERVICES_TERMS_AND_CONDITIONS_URL,
  SERVICES_WORK_ALLOCATION_TASK_API_PATH,
  SERVICE_S2S_PATH
} from '../configuration/references';

chai.use(sinonChai);

describe('Health Check', (): void => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let mockApp: any;
  let getConfigValueStub: sinon.SinonStub;
  let showFeatureStub: sinon.SinonStub;
  let healthCheckWebStub: sinon.SinonStub;
  let healthCheckAddToStub: sinon.SinonStub;
  let healthCheckRawStub: sinon.SinonStub;
  let healthCheckUpStub: sinon.SinonStub;
  let healthCheckDownStub: sinon.SinonStub;
  let xuiNodeOnStub: sinon.SinonStub;
  let loggerInfoStub: sinon.SinonStub;
  let loggerErrorStub: sinon.SinonStub;
  let getLoggerStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq();
    res = mockRes();
    mockApp = {
      use: sandbox.stub(),
      get: sandbox.stub(),
      post: sandbox.stub()
    };

    getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    showFeatureStub = sandbox.stub(configuration, 'showFeature');

    healthCheckWebStub = sandbox.stub(HealthCheck, 'web');
    healthCheckAddToStub = sandbox.stub(HealthCheck, 'addTo');
    healthCheckRawStub = sandbox.stub(HealthCheck, 'raw');
    healthCheckUpStub = sandbox.stub(HealthCheck, 'up');
    healthCheckDownStub = sandbox.stub(HealthCheck, 'down');

    xuiNodeOnStub = sandbox.stub(xuiNode, 'on');

    loggerInfoStub = sandbox.stub();
    loggerErrorStub = sandbox.stub();
    const mockLogger = {
      _logger: {} as any,
      debug: sandbox.stub(),
      error: loggerErrorStub,
      info: loggerInfoStub,
      trackRequest: sandbox.stub(),
      warn: sandbox.stub()
    };
    getLoggerStub = sandbox.stub(log4jui, 'getLogger').returns(mockLogger);

    // Set up default config values
    getConfigValueStub.withArgs(SERVICES_CCD_COMPONENT_API_PATH).returns('http://ccd-component-api');
    getConfigValueStub.withArgs(SERVICES_CCD_DATA_STORE_API_PATH).returns('http://ccd-data-store-api');
    getConfigValueStub.withArgs(SERVICES_EM_DOCASSEMBLY_API_URL).returns('http://docassembly-api');
    getConfigValueStub.withArgs(SERVICES_DOCUMENTS_API_PATH).returns('http://documents-api');
    getConfigValueStub.withArgs(SERVICES_DOCUMENTS_API_PATH_V2).returns('http://documents-api-v2');
    getConfigValueStub.withArgs(SERVICES_EM_ANNO_API_URL).returns('http://emmo-api');
    getConfigValueStub.withArgs(SERVICES_IDAM_LOGIN_URL).returns('http://idam-login');
    getConfigValueStub.withArgs(SERVICES_IDAM_API_URL).returns('http://idam-api');
    getConfigValueStub.withArgs(SERVICE_S2S_PATH).returns('http://s2s');
    getConfigValueStub.withArgs(SERVICES_WORK_ALLOCATION_TASK_API_PATH).returns('http://work-allocation-api');
    getConfigValueStub.withArgs(SERVICES_CASE_CASEWORKER_REF_PATH).returns('http://caseworker-ref-api');
    getConfigValueStub.withArgs(SERVICES_ROLE_ASSIGNMENT_API_PATH).returns('http://role-assignment-api');
    getConfigValueStub.withArgs(SERVICES_ROLE_ASSIGNMENT_MAPPING_API_PATH).returns('http://role-mapping-api');
    getConfigValueStub.withArgs(SERVICES_CASE_JUDICIAL_REF_PATH).returns('http://judicial-ref-api');
    getConfigValueStub.withArgs(SERVICES_TERMS_AND_CONDITIONS_URL).returns('http://terms-conditions');

    // Set up default feature flags
    showFeatureStub.withArgs(FEATURE_WORKALLOCATION_ENABLED).returns(false);
    showFeatureStub.withArgs(FEATURE_TERMS_AND_CONDITIONS_ENABLED).returns(false);
    showFeatureStub.withArgs(FEATURE_REDIS_ENABLED).returns(false);

    healthCheckWebStub.returns('mockHealthCheck');
    healthCheckUpStub.returns('up');
    healthCheckDownStub.returns('down');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('checkServiceHealth', () => {
    it('should create a health check with correct service URL and options', () => {
      const serviceUrl = 'http://test-service';
      const expectedUrl = `${serviceUrl}/health`;
      const expectedOptions = {
        deadline: 6000,
        timeout: 6000
      };

      const result = checkServiceHealth(serviceUrl);

      expect(healthCheckWebStub).to.have.been.calledOnceWith(expectedUrl, expectedOptions);
      expect(result).to.equal('mockHealthCheck');
    });
  });

  describe('config object initialization', () => {
    it('should initialize with all required health checks when work allocation is disabled', () => {
      // Re-import to test initial config creation
      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');

      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_CCD_COMPONENT_API_PATH);
      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_CCD_DATA_STORE_API_PATH);
      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_EM_DOCASSEMBLY_API_URL);
      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_DOCUMENTS_API_PATH);
      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_DOCUMENTS_API_PATH_V2);
      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_EM_ANNO_API_URL);
      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_IDAM_LOGIN_URL);
      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_IDAM_API_URL);
      expect(getConfigValueStub).to.have.been.calledWith(SERVICE_S2S_PATH);
      expect(showFeatureStub).to.have.been.calledWith(FEATURE_WORKALLOCATION_ENABLED);
    });

    it('should add work allocation health checks when feature is enabled', () => {
      showFeatureStub.withArgs(FEATURE_WORKALLOCATION_ENABLED).returns(true);

      // Re-import to test config with work allocation enabled
      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');

      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_WORK_ALLOCATION_TASK_API_PATH);
      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_CASE_CASEWORKER_REF_PATH);
      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_ROLE_ASSIGNMENT_API_PATH);
      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_ROLE_ASSIGNMENT_MAPPING_API_PATH);
      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_CASE_JUDICIAL_REF_PATH);
    });
  });

  describe('addReformHealthCheck', () => {
    beforeEach(() => {
      delete require.cache[require.resolve('./index')];
    });

    it('should add health check to app without optional features', () => {
      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      expect(loggerInfoStub).to.have.been.calledWith('config', sinon.match.object);
      expect(healthCheckAddToStub).to.have.been.calledOnceWith(mockApp, sinon.match.object);
    });

    it('should add terms and conditions health check when feature is enabled', () => {
      showFeatureStub.withArgs(FEATURE_TERMS_AND_CONDITIONS_ENABLED).returns(true);

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_TERMS_AND_CONDITIONS_URL);
      expect(healthCheckWebStub).to.have.been.calledWith('http://terms-conditions/health', {
        deadline: 6000,
        timeout: 6000
      });
      expect(healthCheckAddToStub).to.have.been.calledOnceWith(mockApp, sinon.match.object);
    });

    it('should not add terms and conditions health check when feature is disabled', () => {
      showFeatureStub.withArgs(FEATURE_TERMS_AND_CONDITIONS_ENABLED).returns(false);

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      expect(getConfigValueStub).not.to.have.been.calledWith(SERVICES_TERMS_AND_CONDITIONS_URL);
    });

    it('should setup Redis event listeners when Redis feature is enabled', () => {
      showFeatureStub.withArgs(FEATURE_REDIS_ENABLED).returns(true);

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      expect(xuiNodeOnStub).to.have.been.calledTwice;
      expect(xuiNodeOnStub.firstCall).to.have.been.calledWith(SESSION.EVENT.REDIS_CLIENT_READY, sinon.match.func);
      expect(xuiNodeOnStub.secondCall).to.have.been.calledWith(SESSION.EVENT.REDIS_CLIENT_ERROR, sinon.match.func);
    });

    it('should not setup Redis event listeners when Redis feature is disabled', () => {
      showFeatureStub.withArgs(FEATURE_REDIS_ENABLED).returns(false);

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      expect(xuiNodeOnStub).not.to.have.been.called;
    });

    it('should handle Redis client ready event with connected client', () => {
      showFeatureStub.withArgs(FEATURE_REDIS_ENABLED).returns(true);
      const mockRedisClient = { connected: true };
      let redisReadyCallback: (client: any) => void;

      xuiNodeOnStub.withArgs(SESSION.EVENT.REDIS_CLIENT_READY, sinon.match.func).callsFake((event, callback) => {
        redisReadyCallback = callback;
      });

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      redisReadyCallback(mockRedisClient);

      expect(loggerInfoStub).to.have.been.calledWith('REDIS EVENT FIRED!!');
      expect(healthCheckRawStub).to.have.been.calledOnce;
    });

    it('should handle Redis client ready event with disconnected client', () => {
      showFeatureStub.withArgs(FEATURE_REDIS_ENABLED).returns(true);
      const mockRedisClient = { connected: false };
      let redisReadyCallback: (client: any) => void;

      xuiNodeOnStub.withArgs(SESSION.EVENT.REDIS_CLIENT_READY, sinon.match.func).callsFake((event, callback) => {
        redisReadyCallback = callback;
      });

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      let rawHealthCheckFunction: () => any;
      healthCheckRawStub.callsFake((func) => {
        rawHealthCheckFunction = func;
        return 'rawHealthCheckResult';
      });

      redisReadyCallback(mockRedisClient);

      const result = rawHealthCheckFunction();

      expect(healthCheckDownStub).to.have.been.calledOnce;
      expect(result).to.equal('down');
    });

    it('should handle Redis client ready event and return up status for connected client', () => {
      showFeatureStub.withArgs(FEATURE_REDIS_ENABLED).returns(true);
      const mockRedisClient = { connected: true };
      let redisReadyCallback: (client: any) => void;

      xuiNodeOnStub.withArgs(SESSION.EVENT.REDIS_CLIENT_READY, sinon.match.func).callsFake((event, callback) => {
        redisReadyCallback = callback;
      });

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      let rawHealthCheckFunction: () => any;
      healthCheckRawStub.callsFake((func) => {
        rawHealthCheckFunction = func;
        return 'rawHealthCheckResult';
      });

      redisReadyCallback(mockRedisClient);

      const result = rawHealthCheckFunction();

      expect(healthCheckUpStub).to.have.been.calledOnce;
      expect(result).to.equal('up');
    });

    it('should handle Redis client error event', () => {
      showFeatureStub.withArgs(FEATURE_REDIS_ENABLED).returns(true);
      const mockError = new Error('Redis connection failed');
      let redisErrorCallback: (error: any) => void;

      xuiNodeOnStub.withArgs(SESSION.EVENT.REDIS_CLIENT_ERROR, sinon.match.func).callsFake((event, callback) => {
        redisErrorCallback = callback;
      });

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      redisErrorCallback(mockError);

      expect(loggerErrorStub).to.have.been.calledWith('redis Client error is', mockError);
    });

    it('should handle both terms and conditions and Redis features enabled', () => {
      showFeatureStub.withArgs(FEATURE_TERMS_AND_CONDITIONS_ENABLED).returns(true);
      showFeatureStub.withArgs(FEATURE_REDIS_ENABLED).returns(true);

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_TERMS_AND_CONDITIONS_URL);
      expect(xuiNodeOnStub).to.have.been.calledTwice;
      expect(healthCheckAddToStub).to.have.been.calledOnceWith(mockApp, sinon.match.object);
    });


    it('should log config object before adding to app', () => {
      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      expect(loggerInfoStub).to.have.been.calledWith('config', sinon.match.object);
      expect(loggerInfoStub).to.have.been.calledBefore(healthCheckAddToStub);
    });
  });

  describe('Redis health check function', () => {
    it('should throw error when Redis client is null', () => {
      showFeatureStub.withArgs(FEATURE_REDIS_ENABLED).returns(true);
      let redisReadyCallback: (client: any) => void;

      xuiNodeOnStub.withArgs(SESSION.EVENT.REDIS_CLIENT_READY, sinon.match.func).callsFake((event, callback) => {
        redisReadyCallback = callback;
      });

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      let rawHealthCheckFunction: () => any;
      healthCheckRawStub.callsFake((func) => {
        rawHealthCheckFunction = func;
        return 'rawHealthCheckResult';
      });

      redisReadyCallback(null);
      
      // The actual implementation throws an error when trying to access .connected on null
      expect(() => rawHealthCheckFunction()).to.throw();
    });

    it('should throw error when Redis client is undefined', () => {
      showFeatureStub.withArgs(FEATURE_REDIS_ENABLED).returns(true);
      let redisReadyCallback: (client: any) => void;

      xuiNodeOnStub.withArgs(SESSION.EVENT.REDIS_CLIENT_READY, sinon.match.func).callsFake((event, callback) => {
        redisReadyCallback = callback;
      });

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      let rawHealthCheckFunction: () => any;
      healthCheckRawStub.callsFake((func) => {
        rawHealthCheckFunction = func;
        return 'rawHealthCheckResult';
      });

      redisReadyCallback(undefined);
      
      // The actual implementation throws an error when trying to access .connected on undefined
      expect(() => rawHealthCheckFunction()).to.throw();
    });

    it('should return down status when Redis client has no connected property', () => {
      showFeatureStub.withArgs(FEATURE_REDIS_ENABLED).returns(true);
      const mockRedisClient = {};
      let redisReadyCallback: (client: any) => void;

      xuiNodeOnStub.withArgs(SESSION.EVENT.REDIS_CLIENT_READY, sinon.match.func).callsFake((event, callback) => {
        redisReadyCallback = callback;
      });

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');
      
      healthModule.addReformHealthCheck(mockApp);

      let rawHealthCheckFunction: () => any;
      healthCheckRawStub.callsFake((func) => {
        rawHealthCheckFunction = func;
        return 'rawHealthCheckResult';
      });

      redisReadyCallback(mockRedisClient);
      const result = rawHealthCheckFunction();

      expect(healthCheckDownStub).to.have.been.calledOnce;
      expect(result).to.equal('down');
    });
  });

  describe('error handling', () => {
    it('should handle configuration errors gracefully', () => {
      getConfigValueStub.restore();
      getConfigValueStub = sandbox.stub(configuration, 'getConfigValue').throws(new Error('Configuration error'));

      expect(() => {
        delete require.cache[require.resolve('./index')];
        require('./index');
      }).to.throw('Configuration error');
    });

    it('should handle showFeature errors gracefully', () => {
      showFeatureStub.restore();
      showFeatureStub = sandbox.stub(configuration, 'showFeature').throws(new Error('Feature flag error'));

      expect(() => {
        delete require.cache[require.resolve('./index')];
        require('./index');
      }).to.throw('Feature flag error');
    });

    it('should handle HealthCheck.web errors gracefully', () => {
      healthCheckWebStub.throws(new Error('HealthCheck web error'));

      expect(() => checkServiceHealth('http://test-service')).to.throw('HealthCheck web error');
    });

    it('should handle HealthCheck.addTo errors gracefully', () => {
      healthCheckAddToStub.throws(new Error('HealthCheck addTo error'));

      expect(() => {
        delete require.cache[require.resolve('./index')];
        const healthModule = require('./index');
        healthModule.addReformHealthCheck(mockApp);
      }).to.throw('HealthCheck addTo error');
    });

    it('should handle logger errors gracefully', () => {
      loggerInfoStub.throws(new Error('Logger error'));

      expect(() => {
        delete require.cache[require.resolve('./index')];
        const healthModule = require('./index');
        healthModule.addReformHealthCheck(mockApp);
      }).to.throw('Logger error');
    });
  });

  describe('integration scenarios', () => {
    it('should work with all features enabled and work allocation enabled', () => {
      showFeatureStub.withArgs(FEATURE_WORKALLOCATION_ENABLED).returns(true);
      showFeatureStub.withArgs(FEATURE_TERMS_AND_CONDITIONS_ENABLED).returns(true);
      showFeatureStub.withArgs(FEATURE_REDIS_ENABLED).returns(true);

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');

      healthModule.addReformHealthCheck(mockApp);

      // Verify all config values were requested
      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_WORK_ALLOCATION_TASK_API_PATH);
      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_TERMS_AND_CONDITIONS_URL);

      // Verify Redis events were set up
      expect(xuiNodeOnStub).to.have.been.calledTwice;

      // Verify health check was added to app
      expect(healthCheckAddToStub).to.have.been.calledOnceWith(mockApp, sinon.match.object);
    });

    it('should work with no optional features enabled', () => {
      showFeatureStub.returns(false);

      delete require.cache[require.resolve('./index')];
      const healthModule = require('./index');

      healthModule.addReformHealthCheck(mockApp);

      // Verify optional config values were not requested
      expect(getConfigValueStub).not.to.have.been.calledWith(SERVICES_WORK_ALLOCATION_TASK_API_PATH);
      expect(getConfigValueStub).not.to.have.been.calledWith(SERVICES_TERMS_AND_CONDITIONS_URL);

      // Verify Redis events were not set up
      expect(xuiNodeOnStub).not.to.have.been.called;

      // Verify health check was still added to app
      expect(healthCheckAddToStub).to.have.been.calledOnceWith(mockApp, sinon.match.object);
    });
  });
});
