import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';

chai.use(sinonChai);

describe('NoC Routes', () => {
  let sandbox: sinon.SinonSandbox;
  let mockRouter: any;
  let expressStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    mockRouter = {
      use: sandbox.stub(),
      get: sandbox.stub(),
      post: sandbox.stub(),
      put: sandbox.stub(),
      delete: sandbox.stub(),
      patch: sandbox.stub()
    };

    expressStub = sandbox.stub(express, 'Router').returns(mockRouter);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Route Registration', () => {
    it('should create router with mergeParams option', () => {
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(expressStub).to.have.been.calledWith({ mergeParams: true });
    });

    it('should register authInterceptor middleware', () => {
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.use).to.have.been.calledWith(authInterceptor);
      expect(mockRouter.use).to.have.been.calledBefore(mockRouter.get);
      expect(mockRouter.use).to.have.been.calledBefore(mockRouter.post);
    });

    it('should register GET /nocQuestions route', () => {
      delete require.cache[require.resolve('./routes')];
      const routes = require('./routes');
      const index = require('.');

      expect(mockRouter.get).to.have.been.calledWith('/nocQuestions', index.getNoCQuestions);
    });

    it('should register POST /validateNoCQuestions route', () => {
      delete require.cache[require.resolve('./routes')];
      const routes = require('./routes');
      const index = require('.');

      expect(mockRouter.post).to.have.been.calledWith('/validateNoCQuestions', index.validateNoCQuestions);
    });

    it('should register POST /submitNocEvents route', () => {
      delete require.cache[require.resolve('./routes')];
      const routes = require('./routes');
      const index = require('.');

      expect(mockRouter.post).to.have.been.calledWith('/submitNocEvents', index.submitNoCEvents);
    });

    it('should register all routes in correct order', () => {
      delete require.cache[require.resolve('./routes')];
      const routes = require('./routes');
      const index = require('.');

      expect(mockRouter.use.firstCall).to.have.been.calledWith(authInterceptor);

      const getCalls = mockRouter.get.getCalls();
      expect(getCalls).to.have.lengthOf(1);
      expect(getCalls[0].args[0]).to.equal('/nocQuestions');
      expect(getCalls[0].args[1]).to.equal(index.getNoCQuestions);

      const postCalls = mockRouter.post.getCalls();
      expect(postCalls).to.have.lengthOf(2);

      expect(postCalls[0].args[0]).to.equal('/validateNoCQuestions');
      expect(postCalls[0].args[1]).to.equal(index.validateNoCQuestions);

      expect(postCalls[1].args[0]).to.equal('/submitNocEvents');
      expect(postCalls[1].args[1]).to.equal(index.submitNoCEvents);
    });

    it('should export the router', () => {
      delete require.cache[require.resolve('./routes')];
      const routes = require('./routes');

      expect(routes.router).to.equal(mockRouter);
    });
  });

  describe('Handler Function References', () => {
    it('should use the correct handler functions from index module', () => {
      const index = require('.');
      expect(index.getNoCQuestions).to.be.a('function');
      expect(index.validateNoCQuestions).to.be.a('function');
      expect(index.submitNoCEvents).to.be.a('function');
    });

    it('should register handlers as direct references not wrapped functions', () => {
      delete require.cache[require.resolve('./routes')];
      const routes = require('./routes');
      const index = require('.');

      const getNoCQuestionsHandler = mockRouter.get.getCall(0).args[1];
      const validateNoCQuestionsHandler = mockRouter.post.getCall(0).args[1];
      const submitNoCEventsHandler = mockRouter.post.getCall(1).args[1];

      expect(getNoCQuestionsHandler).to.equal(index.getNoCQuestions);
      expect(validateNoCQuestionsHandler).to.equal(index.validateNoCQuestions);
      expect(submitNoCEventsHandler).to.equal(index.submitNoCEvents);
    });
  });

  describe('Router Configuration', () => {
    it('should register one GET route and two POST routes', () => {
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.get).to.have.been.calledOnce;
      expect(mockRouter.post).to.have.been.calledTwice;
      expect(mockRouter.put).to.not.have.been.called;
      expect(mockRouter.delete).to.not.have.been.called;
      expect(mockRouter.patch).to.not.have.been.called;
    });

    it('should apply authInterceptor to all routes', () => {
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.use).to.have.been.calledBefore(mockRouter.get);
      expect(mockRouter.use).to.have.been.calledBefore(mockRouter.post);
      expect(mockRouter.use.firstCall.args[0]).to.equal(authInterceptor);
    });

    it('should handle require cache properly for multiple imports', () => {
      delete require.cache[require.resolve('./routes')];
      const routes1 = require('./routes');

      mockRouter.use.resetHistory();
      mockRouter.get.resetHistory();
      mockRouter.post.resetHistory();

      const routes2 = require('./routes');

      expect(routes1).to.equal(routes2);

      expect(mockRouter.use).to.not.have.been.called;
      expect(mockRouter.get).to.not.have.been.called;
      expect(mockRouter.post).to.not.have.been.called;
    });
  });
});
