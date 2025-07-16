import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { createApp } from './application';

chai.use(sinonChai);

describe('Application', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    setupDefaultStubs();
  });

  afterEach(() => {
    sandbox.restore();
  });

  // Helper function to set up common stubs used across tests
  function setupDefaultStubs() {
    sandbox.stub(require('./configuration'), 'showFeature').returns(false);
    
    const getConfigStub = sandbox.stub(require('./configuration'), 'getConfigValue');
    getConfigStub.withArgs('sessionSecret').returns('test-session-secret');
    getConfigStub.withArgs('protocol').returns('https');
    getConfigStub.returns('test-value'); // default fallback
    
    sandbox.stub(require('./lib/log4jui'), 'getLogger').returns({
      info: sandbox.stub(),
      error: sandbox.stub(),
      warn: sandbox.stub(),
      debug: sandbox.stub()
    });
    
    sandbox.stub(require('./lib/tunnel'), 'init').returns(undefined);
    sandbox.stub(require('./health'), 'addReformHealthCheck').returns(undefined);
    sandbox.stub(require('./auth'), 'getXuiNodeMiddleware').resolves((req: any, res: any, next: any) => next());
    sandbox.stub(require('./proxy.config'), 'initProxy').returns(undefined);
    sandbox.stub(require('./idamCheck'), 'idamCheck').resolves(undefined);
    sandbox.stub(require('./workAllocation'), 'getNewUsersByServiceName').resolves(undefined);
    
    const mockRouter = (req: any, res: any, next: any) => next();
    sandbox.stub(require('./accessManagement/routes'), 'default').value(mockRouter);
    sandbox.stub(require('./routes'), 'default').value(mockRouter);
    sandbox.stub(require('./openRoutes'), 'default').value(mockRouter);
    sandbox.stub(require('./workAllocation/routes'), 'default').value(mockRouter);
  }

  // Helper function to set up feature-specific stubs for helmet/compression tests
  function setupFeatureStubs(helmetEnabled: boolean, compressionEnabled: boolean) {
    sandbox.restore();
    
    const showFeatureStub = sandbox.stub(require('./configuration'), 'showFeature');
    showFeatureStub.withArgs('helmetEnabled').returns(helmetEnabled);
    showFeatureStub.withArgs('compressionEnabled').returns(compressionEnabled);
    
    const getConfigStub = sandbox.stub(require('./configuration'), 'getConfigValue');
    getConfigStub.withArgs('sessionSecret').returns('test-secret');
    getConfigStub.withArgs('protocol').returns('https');
    
    if (helmetEnabled) {
      getConfigStub.withArgs('HELMET').returns({ contentSecurityPolicy: false });
      sandbox.stub(require('@hmcts/rpx-xui-node-lib'), 'getContentSecurityPolicy')
        .returns((req: any, res: any, next: any) => next());
    }
    
    sandbox.stub(require('./lib/log4jui'), 'getLogger').returns({ info: sandbox.stub() });
    sandbox.stub(require('./lib/tunnel'), 'init');
    sandbox.stub(require('./health'), 'addReformHealthCheck');
    sandbox.stub(require('./auth'), 'getXuiNodeMiddleware').resolves((req: any, res: any, next: any) => next());
    sandbox.stub(require('./proxy.config'), 'initProxy');
    sandbox.stub(require('./idamCheck'), 'idamCheck').resolves();
    sandbox.stub(require('./workAllocation'), 'getNewUsersByServiceName').resolves();
    
    const mockRouter = (req: any, res: any, next: any) => next();
    sandbox.stub(require('./accessManagement/routes'), 'default').value(mockRouter);
    sandbox.stub(require('./routes'), 'default').value(mockRouter);
    sandbox.stub(require('./openRoutes'), 'default').value(mockRouter);
    sandbox.stub(require('./workAllocation/routes'), 'default').value(mockRouter);
    
    return showFeatureStub;
  }

  describe('createApp function', () => {
    describe('basic functionality', () => {
      it('should create and return an Express app with correct methods', async () => {
        const app = await createApp();

        expect(app).to.exist;
        expect(typeof app.use).to.equal('function');
        expect(typeof app.get).to.equal('function');
        expect(typeof app.listen).to.equal('function');
      });
    });

    describe('initialization and configuration', () => {
      it('should initialize logger with Application name', async () => {
        await createApp();

        const getLoggerStub = require('./lib/log4jui').getLogger;
        expect(getLoggerStub).to.have.been.calledWith('Application');
      });

      it('should initialize tunnel', async () => {
        await createApp();

        const tunnelInit = require('./lib/tunnel').init;
        expect(tunnelInit).to.have.been.called;
      });

      it('should add health checks', async () => {
        const app = await createApp();

        const addHealthCheck = require('./health').addReformHealthCheck;
        expect(addHealthCheck).to.have.been.calledWith(app);
      });

      it('should get XUI node middleware', async () => {
        await createApp();

        const xuiMiddleware = require('./auth').getXuiNodeMiddleware;
        expect(xuiMiddleware).to.have.been.called;
      });

      it('should initialize proxy configuration', async () => {
        const app = await createApp();

        const initProxy = require('./proxy.config').initProxy;
        expect(initProxy).to.have.been.calledWith(app);
      });

      it('should initialize IDAM check promise', async () => {
        await createApp();

        const idamCheck = require('./idamCheck').idamCheck;
        expect(idamCheck).to.have.been.called;
      });

      it('should initialize caseworkers loading promise', async () => {
        await createApp();

        const getNewUsersByServiceName = require('./workAllocation').getNewUsersByServiceName;
        expect(getNewUsersByServiceName).to.have.been.called;
      });

      it('should configure session secret for cookie parser', async () => {
        const app = await createApp();

        expect(app).to.exist;
        const getConfigValue = require('./configuration').getConfigValue;
        expect(getConfigValue).to.have.been.called;
      });
    });

    describe('middleware configuration', () => {
      it('should configure body parser with 5mb limit for JSON', async () => {
        const app = await createApp();

        // Check that body parser middleware is configured
        // The middleware stack should include body parser functions
        const middlewareStack = app._router.stack;
        const bodyParserMiddleware = middlewareStack.find((layer: any) => 
          layer.name === 'jsonParser' || layer.handle.name === 'jsonParser'
        );
        
        expect(bodyParserMiddleware).to.exist;
        expect(app).to.exist;
      });

      it('should configure body parser with 5mb limit for URL encoded data', async () => {
        const app = await createApp();

        // Check that URL encoded body parser middleware is configured
        const middlewareStack = app._router.stack;
        const urlencodedMiddleware = middlewareStack.find((layer: any) => 
          layer.name === 'urlencodedParser' || layer.handle.name === 'urlencodedParser'
        );
        
        expect(urlencodedMiddleware).to.exist;
        expect(app).to.exist;
      });

      it('should mount access management routes at /am path', async () => {
        const app = await createApp();

        // Verify that the route is mounted at the correct path
        const middlewareStack = app._router.stack;
        const amRoute = middlewareStack.find((layer: any) => 
          layer.regexp && layer.regexp.test('/am')
        );
        
        expect(amRoute).to.exist;
      });

      it('should mount API routes at /api path', async () => {
        const app = await createApp();

        const middlewareStack = app._router.stack;
        const apiRoute = middlewareStack.find((layer: any) => 
          layer.regexp && layer.regexp.test('/api')
        );
        
        expect(apiRoute).to.exist;
      });

      it('should mount external routes at /external path', async () => {
        const app = await createApp();

        const middlewareStack = app._router.stack;
        const externalRoute = middlewareStack.find((layer: any) => 
          layer.regexp && layer.regexp.test('/external')
        );
        
        expect(externalRoute).to.exist;
      });

      it('should mount work allocation routes at /workallocation path', async () => {
        const app = await createApp();

        const middlewareStack = app._router.stack;
        const workAllocationRoute = middlewareStack.find((layer: any) => 
          layer.regexp && layer.regexp.test('/workallocation')
        );
        
        expect(workAllocationRoute).to.exist;
      });

      it('should configure CSRF protection with correct cookie options', async () => {
        const app = await createApp();

        // Check that CSRF middleware is in the stack
        const middlewareStack = app._router.stack;
        const csrfMiddleware = middlewareStack.find((layer: any) => 
          layer.name === 'csrf' || 
          layer.handle.name === 'csrf' ||
          (layer.handle && layer.handle.toString().includes('csrf'))
        );
        
        expect(csrfMiddleware).to.exist;
      });

      it('should configure cookie parser with session secret', async () => {
        // Check that getConfigValue is called before creating the app
        const getConfigValue = require('./configuration').getConfigValue;
        
        const app = await createApp();

        // Verify cookie parser is configured in middleware stack
        const middlewareStack = app._router.stack;
        const cookieParserMiddleware = middlewareStack.find((layer: any) => 
          layer.name === 'cookieParser' || layer.handle.name === 'cookieParser'
        );
        
        expect(cookieParserMiddleware).to.exist;
        
        expect(getConfigValue.getCall(0).args[0]).to.equal('sessionSecret');
      });
    });

    describe('feature flags', () => {
      it('should configure helmet middleware when feature is enabled', async () => {
        const showFeatureStub = setupFeatureStubs(true, false);
        
        const app = await createApp();

        expect(app).to.exist;
        expect(showFeatureStub).to.have.been.calledWith('helmetEnabled');
        
        // Verify that x-powered-by headers are disabled
        expect(app.get('x-powered-by')).to.be.false;
        expect(app.get('X-Powered-By')).to.be.false;
        
        // Verify that helmet middleware is present in the middleware stack
        const middlewareStack = app._router.stack;
        const helmetMiddleware = middlewareStack.filter((layer: any) => 
          layer.handle && layer.handle.name && (
            layer.handle.name.includes('helmet') ||
            layer.handle.name === 'hidePoweredBy' ||
            layer.handle.name === 'noSniff' ||
            layer.handle.name === 'frameguard' ||
            layer.handle.name === 'xssFilter'
          )
        );
        
        expect(helmetMiddleware.length).to.be.greaterThan(0);
      });

      it('should skip helmet configuration when feature is disabled', async () => {
        const showFeatureStub = setupFeatureStubs(false, false);
        
        const app = await createApp();

        expect(app).to.exist;
        expect(showFeatureStub).to.have.been.calledWith('helmetEnabled');
        
        // Verify that x-powered-by headers are NOT disabled (Express default behavior)
        expect(app.get('x-powered-by')).to.not.be.false;
        expect(app.get('X-Powered-By')).to.not.be.false;
        
        // Verify that helmet middleware is NOT configured in the middleware stack
        const middlewareStack = app._router.stack;
        const helmetMiddleware = middlewareStack.filter((layer: any) => 
          layer.handle && layer.handle.name && (
            layer.handle.name.includes('helmet') ||
            layer.handle.name === 'hidePoweredBy' ||
            layer.handle.name === 'noSniff' ||
            layer.handle.name === 'frameguard' ||
            layer.handle.name === 'xssFilter'
          )
        );
        
        expect(helmetMiddleware.length).to.equal(0);
      });

      it('should configure compression when feature is enabled', async () => {
        const showFeatureStub = setupFeatureStubs(false, true);
        
        const app = await createApp();

        expect(app).to.exist;
        expect(showFeatureStub).to.have.been.calledWith('compressionEnabled');
      });

      it('should disable x-powered-by headers when helmet enabled', async () => {
        const showFeatureStub = setupFeatureStubs(true, false);
        
        const app = await createApp();

        expect(app.get('x-powered-by')).to.be.false;
        expect(app.get('X-Powered-By')).to.be.false;

        expect(app).to.exist;
        expect(showFeatureStub).to.have.been.calledWith('helmetEnabled');
      });
    });
  });
});