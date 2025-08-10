import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as httpProxyMiddleware from 'http-proxy-middleware';
import * as configModule from '../../configuration';
import * as log4jui from '../log4jui';
import authInterceptor from './auth';

chai.use(sinonChai);

describe('Proxy Middleware', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;
  let mockApp: any;
  let loggerStub: any;
  let onProxyError: any;
  let applyProxy: any;
  let proxyMiddlewareStub: sinon.SinonStub;

  before(() => {
    delete require.cache[require.resolve('./proxy')];
    delete require.cache[require.resolve('http-proxy-middleware')];
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq();
    res = mockRes();
    next = sandbox.stub();

    loggerStub = {
      error: sandbox.stub(),
      info: sandbox.stub(),
      debug: sandbox.stub(),
      warn: sandbox.stub()
    };
    sandbox.stub(log4jui, 'getLogger').returns(loggerStub);

    mockApp = {
      use: sandbox.stub()
    };

    sandbox.stub(configModule, 'getConfigValue').returns('info');

    const mockProxyMiddleware = () => {};
    proxyMiddlewareStub = sandbox.stub(httpProxyMiddleware, 'legacyCreateProxyMiddleware').returns(mockProxyMiddleware as any);

    const proxyModule = require('./proxy');
    onProxyError = proxyModule.onProxyError;
    applyProxy = proxyModule.applyProxy;
  });

  afterEach(() => {
    sandbox.restore();
    delete require.cache[require.resolve('./proxy')];
    delete require.cache[require.resolve('http-proxy-middleware')];
  });

  describe('onProxyError', () => {
    let error: Error;

    beforeEach(() => {
      error = new Error('Proxy connection failed');
      res.headersSent = false;
    });

    it('should log the error', () => {
      onProxyError(error, req, res);

      expect(loggerStub.error).to.have.been.calledWith(error);
    });

    it('should send 500 error response when headers not sent', () => {
      onProxyError(error, req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.send).to.have.been.calledWith({
        error: 'Error when connecting to remote server',
        status: 504
      });
    });

    it('should not send response when headers already sent', () => {
      res.headersSent = true;

      onProxyError(error, req, res);

      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should log activity tracker info when baseUrl is /activity and user exists', () => {
      req.baseUrl = '/activity';
      req.user = {
        userinfo: {
          id: 'user123',
          forename: 'John',
          surname: 'Doe'
        }
      };

      onProxyError(error, req, res);

      expect(loggerStub.info).to.have.been.calledWith(
        'ActivityTrackerResponseFailed => ',
        'id: user123 forename:John surname:Doe'
      );
    });

    it('should not log activity tracker info when baseUrl is not /activity', () => {
      req.baseUrl = '/other';
      req.user = {
        userinfo: {
          id: 'user123',
          forename: 'John',
          surname: 'Doe'
        }
      };

      onProxyError(error, req, res);

      expect(loggerStub.info).to.not.have.been.calledWith(
        'ActivityTrackerResponseFailed => ',
        sinon.match.string
      );
    });

    it('should not log activity tracker info when user is not present', () => {
      req.baseUrl = '/activity';
      req.user = undefined;

      onProxyError(error, req, res);

      expect(loggerStub.info).to.not.have.been.calledWith(
        'ActivityTrackerResponseFailed => ',
        sinon.match.string
      );
    });

    it('should not log activity tracker info when userinfo is not present', () => {
      req.baseUrl = '/activity';
      req.user = {};

      onProxyError(error, req, res);

      expect(loggerStub.info).to.not.have.been.calledWith(
        'ActivityTrackerResponseFailed => ',
        sinon.match.string
      );
    });
  });

  describe('applyProxy', () => {
    let config: any;

    beforeEach(() => {
      config = {
        source: '/api/test',
        target: 'http://localhost:3000',
        rewriteUrl: '/test'
      };
    });

    it('should create proxy with basic configuration', () => {
      applyProxy(mockApp, config);

      // Verify that app.use was called with correct parameters
      expect(mockApp.use).to.have.been.calledWith(
        '/api/test',
        [authInterceptor],
        sinon.match.func
      );

      // Verify the proxy middleware has the expected properties
      const proxyMiddleware = mockApp.use.firstCall.args[2];
      expect(proxyMiddleware).to.be.a('function');
      expect(proxyMiddleware).to.have.property('upgrade');
      expect(proxyMiddleware).to.have.property('__LEGACY_HTTP_PROXY_MIDDLEWARE__', true);
    });

    it('should include authInterceptor in middleware array', () => {
      applyProxy(mockApp, config);

      const middlewares = mockApp.use.firstCall.args[1];
      expect(middlewares).to.include(authInterceptor);
    });

    it('should add custom middlewares to default middlewares', () => {
      const customMiddleware1 = sandbox.stub();
      const customMiddleware2 = sandbox.stub();
      config.middlewares = [customMiddleware1, customMiddleware2];

      applyProxy(mockApp, config);

      expect(mockApp.use).to.have.been.calledWith(
        '/api/test',
        [authInterceptor, customMiddleware1, customMiddleware2],
        sinon.match.func
      );
    });

    it('should register with different source paths', () => {
      config.source = '/api/different';
      
      applyProxy(mockApp, config);

      expect(mockApp.use).to.have.been.calledWith(
        '/api/different',
        [authInterceptor],
        sinon.match.func
      );
    });

    it('should work with config.rewrite = false', () => {
      config.rewrite = false;

      applyProxy(mockApp, config);

      // Should still register the middleware
      expect(mockApp.use).to.have.been.calledOnce;
    });

    it('should work with config.ws = true', () => {
      config.ws = true;

      applyProxy(mockApp, config);

      expect(mockApp.use).to.have.been.calledOnce;
    });

    it('should work with config.filter provided', () => {
      const filterFunction = sandbox.stub();
      config.filter = filterFunction;

      applyProxy(mockApp, config);

      expect(mockApp.use).to.have.been.calledWith(
        '/api/test',
        [authInterceptor],
        sinon.match.func
      );
    });

    it('should work with config.onRes provided', () => {
      const onResMock = sandbox.stub();
      config.onRes = onResMock;

      applyProxy(mockApp, config);

      expect(mockApp.use).to.have.been.calledOnce;
    });

    it('should work with complex configuration', () => {
      const onReqMock = sandbox.stub();
      const onResMock = sandbox.stub();
      const filterMock = sandbox.stub();
      const customMiddleware = sandbox.stub();

      const complexConfig = {
        source: '/api/complex',
        target: 'http://example.com:8080',
        onReq: onReqMock,
        onRes: onResMock,
        filter: filterMock,
        middlewares: [customMiddleware],
        ws: true,
        rewriteUrl: '/complex-path'
      };

      applyProxy(mockApp, complexConfig);

      expect(mockApp.use).to.have.been.calledWith(
        '/api/complex',
        [authInterceptor, customMiddleware],
        sinon.match.func
      );
    });

    it('should work without config.rewriteUrl', () => {
      delete config.rewriteUrl;

      applyProxy(mockApp, config);

      expect(mockApp.use).to.have.been.calledOnce;
    });

    it('should work with function rewriteUrl', () => {
      const rewriteFunction = sandbox.stub();
      config.rewriteUrl = rewriteFunction;

      applyProxy(mockApp, config);

      expect(mockApp.use).to.have.been.calledOnce;
    });

    it('should handle different targets', () => {
      config.target = 'http://different.example.com';

      applyProxy(mockApp, config);

      expect(mockApp.use).to.have.been.calledOnce;
    });

    it('should work with modifyBody parameter', () => {
      const onResMock = sandbox.stub();
      config.onRes = onResMock;

      applyProxy(mockApp, config, false);

      expect(mockApp.use).to.have.been.calledOnce;
    });
  });
});