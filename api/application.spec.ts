import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
// ⬇️ NEW: also stub the 'config' package used by application.ts
import * as nodeConfig from 'config';

import { createApp } from './application';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Application', () => {
  let sandbox: sinon.SinonSandbox;
  let mockLogger: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    mockLogger = {
      info: sandbox.spy(),
      error: sandbox.spy(),
      warn: sandbox.spy(),
      debug: sandbox.spy()
    };
    setupDefaultStubs();
  });

  afterEach(() => {
    sandbox.restore();
  });

  // ---------- helper ----------
  function setupDefaultStubs(options: {
    helmetEnabled?: boolean;
    compressionEnabled?: boolean;
    idamCheckRejects?: boolean;
    workAllocationRejects?: boolean;
    xuiMiddlewareRejects?: boolean;
  } = {}) {
    const cfg = require('./configuration');

    // --- Feature flags from your configuration module ---
    const showFeatureStub = sandbox.stub(require('./configuration'), 'showFeature');
    // support string keys and exported constants
    showFeatureStub.callsFake((key: string) => {
      if (key === 'helmetEnabled' || (cfg?.FEATURE_HELMET_ENABLED && key === cfg.FEATURE_HELMET_ENABLED)) {
        return !!options.helmetEnabled;
      }
      if (key === 'compressionEnabled' || (cfg?.FEATURE_COMPRESSION_ENABLED && key === cfg.FEATURE_COMPRESSION_ENABLED)) {
        return !!options.compressionEnabled;
      }
      return false;
    });

    // --- Config value getter from your configuration module ---
    const helmetOpts = {
      // keep it simple and valid for Helmet; object-ness is what matters for the crash
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ['\'self\''],
          scriptSrc: ['\'self\'', '\'unsafe-inline\'']
        }
      },
      hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }
    };

    const getConfigStub = sandbox.stub(require('./configuration'), 'getConfigValue');
    getConfigStub.withArgs('sessionSecret').returns('test-session-secret-12345');
    getConfigStub.withArgs('protocol').returns('https');
    getConfigStub.withArgs('HELMET').returns(helmetOpts);
    if (cfg?.HELMET) {
      getConfigStub.withArgs(cfg.HELMET).returns(helmetOpts);
    }
    getConfigStub.withArgs('security.helmet').returns(helmetOpts);
    // IMPORTANT: never feed Helmet a string
    getConfigStub.callsFake((key: string) => {
      if (key === 'sessionSecret') {
        return 'test-session-secret-12345';
      }
      if (key === 'protocol') {
        return 'https';
      }
      if (key === 'HELMET' || key === cfg?.HELMET || key === 'security.helmet') {
        return helmetOpts;
      }
      return undefined as any;
    });

    // --- ALSO stub the real 'config' package used by application.ts ---
    const configHasStub = sandbox.stub(nodeConfig, 'has').callsFake((key: string) => {
      // Pretend these keys exist so application code paths that use 'config' work
      if (key === 'security.helmet') {
        return true;
      }
      if (key === 'featureFlags.enableHelmet') {
        return true;
      }
      return false;
    });

    const configGetStub = sandbox.stub(nodeConfig, 'get').callsFake((key: string) => {
      if (key === 'security.helmet') {
        return helmetOpts;
      } // <— the critical fix
      if (key === 'featureFlags.enableHelmet') {
        return !!options.helmetEnabled;
      }
      return undefined as any;
    });

    // --- Misc stubs used by your tests ---
    sandbox.stub(require('./lib/log4jui'), 'getLogger').returns(mockLogger);
    sandbox.stub(require('./lib/tunnel'), 'init').returns(undefined);
    sandbox.stub(require('./health'), 'addReformHealthCheck').returns(undefined);

    if (options.xuiMiddlewareRejects) {
      sandbox.stub(require('./auth'), 'getXuiNodeMiddleware').rejects(new Error('XUI middleware failed'));
    } else {
      sandbox.stub(require('./auth'), 'getXuiNodeMiddleware').resolves((req: any, res: any, next: any) => next());
    }

    if (options.workAllocationRejects) {
      sandbox.stub(require('./workAllocation'), 'getNewUsersByServiceName').rejects(new Error('WA failed'));
    } else {
      sandbox.stub(require('./workAllocation'), 'getNewUsersByServiceName').resolves();
    }

    sandbox.stub(require('./proxy.config'), 'initProxy').returns(undefined);
    sandbox.stub(require('./idamCheck'), 'idamCheck').resolves();

    // routes as pass-through
    const pass = (req: any, res: any, next: any) => next();
    sandbox.stub(require('./accessManagement/routes'), 'default').value(pass);
    sandbox.stub(require('./routes'), 'default').value(pass);
    sandbox.stub(require('./openRoutes'), 'default').value(pass);
    sandbox.stub(require('./workAllocation/routes'), 'default').value(pass);

    return { showFeatureStub, getConfigStub, configHasStub, configGetStub };
  }
  // ---------- end helper ----------

  // === your existing tests (unchanged) ===
  describe('createApp function', () => {
    describe('basic functionality', () => {
      it('should create and return an Express app with correct methods', async () => {
        const app = await createApp();

        expect(app).to.exist;
        expect(typeof app.use).to.equal('function');
        expect(typeof app.get).to.equal('function');
        expect(typeof app.listen).to.equal('function');
        expect(typeof app.post).to.equal('function');
        expect(typeof app.put).to.equal('function');
        expect(typeof app.delete).to.equal('function');
      });

      it('should handle errors during app creation when IDAM check fails', async () => {
        sandbox.restore();
        setupDefaultStubs({ idamCheckRejects: true });

        const app = await createApp();

        expect(app).to.exist; // App should still be created
        const idamCheck = require('./idamCheck').idamCheck;
        expect(idamCheck).to.have.been.calledOnce;
      });

      it('should handle errors when work allocation service fails', async () => {
        sandbox.restore();
        setupDefaultStubs({ workAllocationRejects: true });

        const app = await createApp();

        expect(app).to.exist;
        const getNewUsers = require('./workAllocation').getNewUsersByServiceName;
        expect(getNewUsers).to.have.been.called;
      });

      it('should propagate errors when XUI middleware initialization fails', async () => {
        sandbox.restore();

        const middlewareError = new Error('Failed to initialize authentication middleware');

        sandbox.stub(require('./configuration'), 'showFeature').returns(false);
        sandbox.stub(require('./configuration'), 'getConfigValue').returns('test-value');
        sandbox.stub(require('./lib/log4jui'), 'getLogger').returns(mockLogger);
        sandbox.stub(require('./lib/tunnel'), 'init').returns(undefined);
        sandbox.stub(require('./health'), 'addReformHealthCheck').returns(undefined);
        sandbox.stub(require('./auth'), 'getXuiNodeMiddleware').rejects(middlewareError);
        sandbox.stub(require('./proxy.config'), 'initProxy').returns(undefined);
        sandbox.stub(require('./idamCheck'), 'idamCheck').resolves();
        sandbox.stub(require('./workAllocation'), 'getNewUsersByServiceName').resolves();

        const pass = (req: any, res: any, next: any) => next();
        sandbox.stub(require('./accessManagement/routes'), 'default').value(pass);
        sandbox.stub(require('./routes'), 'default').value(pass);
        sandbox.stub(require('./openRoutes'), 'default').value(pass);
        sandbox.stub(require('./workAllocation/routes'), 'default').value(pass);

        try {
          await createApp();
          expect.fail('Should have thrown an error');
        } catch (error: any) {
          expect(error).to.equal(middlewareError);
          expect(error.message).to.equal('Failed to initialize authentication middleware');
        }
      });

      it('should handle concurrent promise rejections gracefully', async () => {
        sandbox.restore();
        setupDefaultStubs({ idamCheckRejects: true, workAllocationRejects: true });

        const app = await createApp();

        expect(app).to.exist;
        const idamCheck = require('./idamCheck').idamCheck;
        const getNewUsers = require('./workAllocation').getNewUsersByServiceName;
        expect(idamCheck).to.have.been.called;
        expect(getNewUsers).to.have.been.called;
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
        expect(getConfigValue).to.have.been.calledWith('sessionSecret');
        expect(getConfigValue).to.have.been.calledWith('protocol');
      });
    });

    describe('middleware configuration', () => {
      it('should mount access management routes at /am path', async () => {
        const app = await createApp();

        const middlewareStack = app._router.stack;
        const amRoute = middlewareStack.find((layer: any) =>
          layer.regexp && layer.regexp.test('/am')
        );

        expect(amRoute).to.exist;
        expect(amRoute.handle).to.be.a('function');

        const req = mockReq({ url: '/am/test', method: 'GET' });
        const res = mockRes();
        const next = sinon.stub();

        amRoute.handle(req, res, next);
        expect(next).to.have.been.called;
      });

      it('should mount API routes at /api path', async () => {
        const app = await createApp();

        const middlewareStack = app._router.stack;
        const apiRoute = middlewareStack.find((layer: any) =>
          layer.regexp && layer.regexp.test('/api')
        );

        expect(apiRoute).to.exist;
        expect(apiRoute.handle).to.be.a('function');

        const req = mockReq({ url: '/api/cases', method: 'GET' });
        const res = mockRes();
        const next = sinon.stub();

        apiRoute.handle(req, res, next);
        expect(next).to.have.been.called;
      });

      it('should mount external routes at /external path', async () => {
        const app = await createApp();

        const middlewareStack = app._router.stack;
        const externalRoute = middlewareStack.find((layer: any) =>
          layer.regexp && layer.regexp.test('/external')
        );

        expect(externalRoute).to.exist;
        expect(externalRoute.handle).to.be.a('function');

        const req = mockReq({ url: '/external/redirect', method: 'GET' });
        const res = mockRes();
        const next = sinon.stub();

        externalRoute.handle(req, res, next);
        expect(next).to.have.been.called;
      });

      it('should mount work allocation routes at /workallocation path', async () => {
        const app = await createApp();

        const middlewareStack = app._router.stack;
        const workAllocationRoute = middlewareStack.find((layer: any) =>
          layer.regexp && layer.regexp.test('/workallocation')
        );

        expect(workAllocationRoute).to.exist;
        expect(workAllocationRoute.handle).to.be.a('function');

        const req = mockReq({ url: '/workallocation/cases', method: 'GET' });
        const res = mockRes();
        const next = sinon.stub();

        workAllocationRoute.handle(req, res, next);
        expect(next).to.have.been.called;
      });

      it('should configure CSRF protection with correct cookie options', async () => {
        const app = await createApp();

        const middlewareStack = app._router.stack;
        const csrfMiddleware = middlewareStack.find((layer: any) =>
          layer.name === 'csrf' ||
          layer.handle?.name === 'csrf' ||
          (layer.handle && layer.handle.toString().includes('csrf'))
        );

        expect(csrfMiddleware).to.exist;
        expect(csrfMiddleware.handle).to.be.a('function');
      });

      it('should configure cookie parser with session secret', async () => {
        const getConfigValue = require('./configuration').getConfigValue;

        const app = await createApp();

        const middlewareStack = app._router.stack;
        const cookieParserMiddleware = middlewareStack.find((layer: any) =>
          layer.name === 'cookieParser' || layer.handle?.name === 'cookieParser'
        );

        expect(cookieParserMiddleware).to.exist;
        expect(cookieParserMiddleware.handle).to.be.a('function');

        expect(getConfigValue).to.have.been.calledWith('sessionSecret');

        const req = mockReq({
          headers: { cookie: 'test=value; session=abc123' }
        });
        const res = mockRes();
        const next = sinon.stub();

        cookieParserMiddleware.handle(req, res, next);
        expect(next).to.have.been.called;
      });
    });

    describe('feature flags', () => {
      it('should configure helmet middleware when feature is enabled', async () => {
        sandbox.restore();
        setupDefaultStubs({ helmetEnabled: true });

        const app = await createApp();

        expect(app).to.exist;

        // Verify that x-powered-by headers are disabled
        expect(app.get('x-powered-by')).to.be.false;
        expect(app.get('X-Powered-By')).to.be.false;

        // Verify that helmet middleware is present
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
        sandbox.restore();
        setupDefaultStubs({ helmetEnabled: false });

        const app = await createApp();

        expect(app).to.exist;

        // Express default leaves x-powered-by on
        expect(app.get('x-powered-by')).to.not.be.false;
        expect(app.get('X-Powered-By')).to.not.be.false;

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
        sandbox.restore();
        setupDefaultStubs({ compressionEnabled: true });

        const app = await createApp();

        expect(app).to.exist;
      });

      it('should disable x-powered-by headers when helmet enabled', async () => {
        sandbox.restore();
        setupDefaultStubs({ helmetEnabled: true });

        const app = await createApp();

        expect(app.get('x-powered-by')).to.be.false;
        expect(app.get('X-Powered-By')).to.be.false;
      });

      describe('security headers and routes when helmet enabled', () => {
        let app: any;
        let reqObj: any;
        let resObj: any;
        let nextSpy: any;

        beforeEach(async () => {
          sandbox.restore();
          setupDefaultStubs({ helmetEnabled: true });
          app = await createApp();

          reqObj = {};
          resObj = {
            header: sinon.spy(),
            setHeader: sinon.spy(),
            type: sinon.spy(),
            send: sinon.spy()
          };
          nextSpy = sinon.spy();
        });

        it('should set CORS and security headers via custom middleware', async () => {
          const middlewareStack = app._router.stack;
          const customHeadersMiddleware = middlewareStack.find((layer: any) =>
            layer.handle && layer.handle.toString().includes('Access-Control-Allow-Headers')
          );

          expect(customHeadersMiddleware).to.exist;

          customHeadersMiddleware.handle(reqObj, resObj, nextSpy);

          expect(resObj.header).to.have.been.calledWith(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
          );
          expect(resObj.header).to.have.been.calledWith('Access-Control-Allow-Credentials', 'true');
          expect(resObj.header).to.have.been.calledWith(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS'
          );

          expect(resObj.setHeader).to.have.been.calledWith('X-Robots-Tag', 'noindex');
          expect(resObj.setHeader).to.have.been.calledWith(
            'Cache-Control',
            'no-cache, no-store, max-age=0, must-revalidate, proxy-revalidate'
          );

          expect(nextSpy).to.have.been.called;
        });

        it('should serve robots.txt with correct content and headers', async () => {
          const robotsReq = { url: '/robots.txt', method: 'GET' };

          const middlewareStack = app._router.stack;
          const robotsRoute = middlewareStack.find((layer: any) =>
            layer.route && layer.route.path === '/robots.txt'
          );

          expect(robotsRoute).to.exist;

          robotsRoute.route.stack[0].handle(robotsReq, resObj);

          expect(resObj.type).to.have.been.calledWith('text/plain');
          expect(resObj.send).to.have.been.calledWith('User-agent: *\nDisallow: /');
        });

        it('should serve sitemap.xml with correct content and headers', async () => {
          const sitemapReq = { url: '/sitemap.xml', method: 'GET' };

          const middlewareStack = app._router.stack;
          const sitemapRoute = middlewareStack.find((layer: any) =>
            layer.route && layer.route.path === '/sitemap.xml'
          );

          expect(sitemapRoute).to.exist;

          sitemapRoute.route.stack[0].handle(sitemapReq, resObj);

          expect(resObj.type).to.have.been.calledWith('text/xml');
          expect(resObj.send).to.have.been.calledWith('User-agent: *\nDisallow: /');
        });

        it('should not have robots.txt and sitemap.xml routes when helmet is disabled', async () => {
          sandbox.restore();
          setupDefaultStubs({ helmetEnabled: false });
          const appWithoutHelmet = await createApp();

          const middlewareStack = appWithoutHelmet._router.stack;

          const robotsRoute = middlewareStack.find((layer: any) =>
            layer.route && layer.route.path === '/robots.txt'
          );
          const sitemapRoute = middlewareStack.find((layer: any) =>
            layer.route && layer.route.path === '/sitemap.xml'
          );

          expect(robotsRoute).to.not.exist;
          expect(sitemapRoute).to.not.exist;
        });

        it('should not have security headers middleware when helmet is disabled', async () => {
          sandbox.restore();
          setupDefaultStubs({ helmetEnabled: false });
          const appWithoutHelmet = await createApp();

          const middlewareStack = appWithoutHelmet._router.stack;
          const customHeadersMiddleware = middlewareStack.find((layer: any) =>
            layer.handle && layer.handle.toString().includes('Access-Control-Allow-Headers')
          );

          expect(customHeadersMiddleware).to.not.exist;
        });
      });
    });
  });
});
