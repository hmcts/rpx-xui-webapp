import { expect } from 'chai';
import * as sinon from 'sinon';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as csrf from 'csurf';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { createApp } from './application';
import * as config from './configuration';
import * as log4jui from './lib/log4jui';
import * as tunnel from './lib/tunnel';
import * as health from './health';
import * as auth from './auth';
import * as proxyConfig from './proxy.config';
import * as idamCheck from './idamCheck';
import * as workAllocation from './workAllocation';

describe('Application', () => {
  let sandbox: sinon.SinonSandbox;
  let mockApp: any;
  let mockLogger: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    
    // Mock Express app
    mockApp = {
      use: sandbox.stub(),
      get: sandbox.stub(),
      disable: sandbox.stub()
    };
    sandbox.stub(express, 'default').returns(mockApp);
    
    // Mock logger
    mockLogger = {
      info: sandbox.stub(),
      error: sandbox.stub(),
      debug: sandbox.stub()
    };
    sandbox.stub(log4jui, 'getLogger').returns(mockLogger);
    
    // Mock configuration
    sandbox.stub(config, 'showFeature').returns(true);
    sandbox.stub(config, 'getConfigValue').returns('test-value');
    
    // Mock external dependencies
    sandbox.stub(helmet, 'default').returns(sandbox.stub());
    sandbox.stub(helmet, 'noSniff').returns(sandbox.stub());
    sandbox.stub(helmet, 'frameguard').returns(sandbox.stub());
    sandbox.stub(helmet, 'referrerPolicy').returns(sandbox.stub());
    sandbox.stub(helmet, 'hidePoweredBy').returns(sandbox.stub());
    sandbox.stub(helmet, 'hsts').returns(sandbox.stub());
    sandbox.stub(helmet, 'xssFilter').returns(sandbox.stub());
    
    sandbox.stub(compression, 'default').returns(sandbox.stub());
    sandbox.stub(cookieParser, 'default').returns(sandbox.stub());
    sandbox.stub(bodyParser, 'json').returns(sandbox.stub());
    sandbox.stub(bodyParser, 'urlencoded').returns(sandbox.stub());
    sandbox.stub(csrf, 'default').returns(sandbox.stub());
    
    // Mock other modules
    sandbox.stub(tunnel, 'init');
    sandbox.stub(health, 'addReformHealthCheck');
    sandbox.stub(auth, 'getXuiNodeMiddleware').resolves(sandbox.stub());
    sandbox.stub(proxyConfig, 'initProxy');
    sandbox.stub(idamCheck, 'idamCheck').resolves();
    sandbox.stub(workAllocation, 'getNewUsersByServiceName').resolves();
    
    // Mock rpx-xui-node-lib
    const mockContentSecurityPolicy = sandbox.stub();
    sandbox.stub(require('@hmcts/rpx-xui-node-lib'), 'getContentSecurityPolicy').returns(mockContentSecurityPolicy);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('createApp', () => {
    it('should create Express app successfully', async () => {
      // Act
      const app = await createApp();
      
      // Assert
      expect(app).to.equal(mockApp);
      expect(express.default).to.have.been.calledOnce;
    });

    it('should initialize logger with correct name', async () => {
      // Act
      await createApp();
      
      // Assert
      expect(log4jui.getLogger).to.have.been.calledWith('Application');
    });

    it('should apply helmet middleware when feature enabled', async () => {
      // Arrange
      sandbox.stub(config, 'showFeature').withArgs('FEATURE_HELMET_ENABLED').returns(true);
      
      // Act
      await createApp();
      
      // Assert
      expect(helmet.default).to.have.been.called;
      expect(helmet.noSniff).to.have.been.called;
      expect(helmet.frameguard).to.have.been.calledWith({ action: 'deny' });
      expect(helmet.referrerPolicy).to.have.been.calledWith({ policy: ['origin'] });
      expect(helmet.hidePoweredBy).to.have.been.called;
      expect(helmet.hsts).to.have.been.calledWith({ maxAge: 28800000 });
      expect(helmet.xssFilter).to.have.been.called;
    });

    it('should not apply helmet middleware when feature disabled', async () => {
      // Arrange
      sandbox.stub(config, 'showFeature').withArgs('FEATURE_HELMET_ENABLED').returns(false);
      
      // Act
      await createApp();
      
      // Assert
      expect(helmet.default).not.to.have.been.called;
    });

    it('should apply compression when feature enabled', async () => {
      // Arrange
      sandbox.stub(config, 'showFeature').withArgs('FEATURE_COMPRESSION_ENABLED').returns(true);
      
      // Act
      await createApp();
      
      // Assert
      expect(compression.default).to.have.been.called;
      expect(mockApp.use).to.have.been.calledWith(compression.default());
    });

    it('should not apply compression when feature disabled', async () => {
      // Arrange
      sandbox.stub(config, 'showFeature').returns(false);
      
      // Act
      await createApp();
      
      // Assert
      expect(compression.default).not.to.have.been.called;
    });

    it('should configure cookie parser with session secret', async () => {
      // Arrange
      const sessionSecret = 'test-session-secret';
      sandbox.stub(config, 'getConfigValue').withArgs('SESSION_SECRET').returns(sessionSecret);
      
      // Act
      await createApp();
      
      // Assert
      expect(cookieParser.default).to.have.been.calledWith(sessionSecret);
    });

    it('should initialize tunnel', async () => {
      // Act
      await createApp();
      
      // Assert
      expect(tunnel.init).to.have.been.called;
    });

    it('should add health checks', async () => {
      // Act
      await createApp();
      
      // Assert
      expect(health.addReformHealthCheck).to.have.been.calledWith(mockApp);
    });

    it('should apply XUI node middleware', async () => {
      // Arrange
      const mockMiddleware = sandbox.stub();
      sandbox.stub(auth, 'getXuiNodeMiddleware').resolves(mockMiddleware);
      
      // Act
      await createApp();
      
      // Assert
      expect(auth.getXuiNodeMiddleware).to.have.been.called;
      expect(mockApp.use).to.have.been.calledWith(mockMiddleware);
    });

    it('should initialize proxy before body parser', async () => {
      // Act
      await createApp();
      
      // Assert
      expect(proxyConfig.initProxy).to.have.been.calledWith(mockApp);
      expect(proxyConfig.initProxy).to.have.been.calledBefore(bodyParser.json);
    });

    it('should configure body parser with correct limits', async () => {
      // Act
      await createApp();
      
      // Assert
      expect(bodyParser.json).to.have.been.calledWith({ limit: '5mb' });
      expect(bodyParser.urlencoded).to.have.been.calledWith({ limit: '5mb', extended: true });
    });

    it('should configure CSRF protection', async () => {
      // Act
      await createApp();
      
      // Assert
      expect(csrf.default).to.have.been.calledWith({
        cookie: { key: 'XSRF-TOKEN', httpOnly: false, secure: true },
        ignoreMethods: ['GET']
      });
    });

    it('should setup robots.txt route when helmet enabled', async () => {
      // Arrange
      sandbox.stub(config, 'showFeature').withArgs('FEATURE_HELMET_ENABLED').returns(true);
      const mockRes = { type: sandbox.stub(), send: sandbox.stub() };
      
      // Act
      await createApp();
      
      // Assert
      expect(mockApp.get).to.have.been.calledWith('/robots.txt', sinon.match.func);
      
      // Test the robots.txt handler
      const robotsHandler = mockApp.get.getCalls().find(call => call.args[0] === '/robots.txt').args[1];
      robotsHandler({}, mockRes);
      
      expect(mockRes.type).to.have.been.calledWith('text/plain');
      expect(mockRes.send).to.have.been.calledWith('User-agent: *\nDisallow: /');
    });

    it('should setup sitemap.xml route when helmet enabled', async () => {
      // Arrange
      sandbox.stub(config, 'showFeature').withArgs('FEATURE_HELMET_ENABLED').returns(true);
      const mockRes = { type: sandbox.stub(), send: sandbox.stub() };
      
      // Act
      await createApp();
      
      // Assert
      expect(mockApp.get).to.have.been.calledWith('/sitemap.xml', sinon.match.func);
      
      // Test the sitemap.xml handler
      const sitemapHandler = mockApp.get.getCalls().find(call => call.args[0] === '/sitemap.xml').args[1];
      sitemapHandler({}, mockRes);
      
      expect(mockRes.type).to.have.been.calledWith('text/xml');
      expect(mockRes.send).to.have.been.calledWith('User-agent: *\nDisallow: /');
    });

    it('should disable x-powered-by headers when helmet enabled', async () => {
      // Arrange
      sandbox.stub(config, 'showFeature').withArgs('FEATURE_HELMET_ENABLED').returns(true);
      
      // Act
      await createApp();
      
      // Assert
      expect(mockApp.disable).to.have.been.calledWith('x-powered-by');
      expect(mockApp.disable).to.have.been.calledWith('X-Powered-By');
    });

    it('should log startup protocol', async () => {
      // Arrange
      const protocol = 'https';
      sandbox.stub(config, 'getConfigValue').withArgs('PROTOCOL').returns(protocol);
      
      // Act
      await createApp();
      
      // Assert
      expect(mockLogger.info).to.have.been.calledWith(`Started up using ${protocol}`);
    });

    it('should initiate IDAM check', async () => {
      // Act
      await createApp();
      
      // Assert
      expect(idamCheck.idamCheck).to.have.been.called;
    });

    it('should load caseworkers', async () => {
      // Act
      await createApp();
      
      // Assert
      expect(workAllocation.getNewUsersByServiceName).to.have.been.called;
    });

    it('should handle IDAM check failure gracefully', async () => {
      // Arrange
      sandbox.stub(idamCheck, 'idamCheck').rejects(new Error('IDAM error'));
      
      // Act & Assert - should not throw
      const app = await createApp();
      expect(app).to.equal(mockApp);
    });

    it('should handle caseworker loading failure gracefully', async () => {
      // Arrange
      sandbox.stub(workAllocation, 'getNewUsersByServiceName').rejects(new Error('Caseworker error'));
      
      // Act & Assert - should not throw
      const app = await createApp();
      expect(app).to.equal(mockApp);
    });

    it('should apply custom headers middleware when helmet enabled', async () => {
      // Arrange
      sandbox.stub(config, 'showFeature').withArgs('FEATURE_HELMET_ENABLED').returns(true);
      const mockReq = {};
      const mockRes = {
        header: sandbox.stub(),
        setHeader: sandbox.stub()
      };
      const mockNext = sandbox.stub();
      
      // Act
      await createApp();
      
      // Assert - find the custom headers middleware
      const customHeadersCall = mockApp.use.getCalls().find(call => 
        typeof call.args[0] === 'function' && call.args[0].length === 3
      );
      
      expect(customHeadersCall).to.exist;
      
      // Test the custom headers middleware
      const customHeadersMiddleware = customHeadersCall.args[0];
      customHeadersMiddleware(mockReq, mockRes, mockNext);
      
      expect(mockRes.header).to.have.been.calledWith('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      expect(mockRes.header).to.have.been.calledWith('Access-Control-Allow-Credentials', 'true');
      expect(mockRes.header).to.have.been.calledWith('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      expect(mockRes.setHeader).to.have.been.calledWith('X-Robots-Tag', 'noindex');
      expect(mockRes.setHeader).to.have.been.calledWith('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, proxy-revalidate');
      expect(mockNext).to.have.been.called;
    });
  });
});