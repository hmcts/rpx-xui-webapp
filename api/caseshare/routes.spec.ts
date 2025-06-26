import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as express from 'express';
import { handleGetOrganisationsRoute } from '../organisations/index';
import * as restAPI from './index';
import { router } from './routes';

chai.use(sinonChai);

describe('Case Share Routes', () => {
  let sandbox: sinon.SinonSandbox;
  let mockRouter: any;
  let expressStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    
    // Create a mock router with all the methods we need
    mockRouter = {
      get: sandbox.stub(),
      post: sandbox.stub(),
      put: sandbox.stub(),
      delete: sandbox.stub(),
      use: sandbox.stub()
    };

    // Stub express.Router to return our mock router
    expressStub = sandbox.stub(express, 'Router').returns(mockRouter);
    
    // Clear the routes module cache before each test
    delete require.cache[require.resolve('./routes')];
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Route Registration', () => {
    it('should create router with mergeParams option', () => {
      // Re-require the routes module to trigger registration
      require('./routes');

      expect(expressStub).to.have.been.calledWith({ mergeParams: true });
    });

    it('should register GET /orgs route with organisations handler', () => {
      // Re-require the routes module to trigger registration
      require('./routes');

      const getCalls = mockRouter.get.getCalls();
      const orgsCall = getCalls.find(call => call.args[0] === '/orgs');
      expect(orgsCall).to.exist;
      expect(orgsCall.args[1].name).to.equal('handleGetOrganisationsRoute');
    });

    it('should register GET /users route with getUsers handler', () => {
      // Re-require the routes module to trigger registration
      require('./routes');

      const getCalls = mockRouter.get.getCalls();
      const usersCall = getCalls.find(call => call.args[0] === '/users');
      expect(usersCall).to.exist;
      expect(usersCall.args[1].name).to.equal('getUsers');
    });

    it('should register GET /cases route with getCases handler', () => {
      // Re-require the routes module to trigger registration
      require('./routes');

      const getCalls = mockRouter.get.getCalls();
      const casesCall = getCalls.find(call => call.args[0] === '/cases');
      expect(casesCall).to.exist;
      expect(casesCall.args[1].name).to.equal('getCases');
    });

    it('should register POST /case-assignments route with assignCasesToUsers handler', () => {
      // Re-require the routes module to trigger registration
      require('./routes');

      const postCalls = mockRouter.post.getCalls();
      const caseAssignmentsCall = postCalls.find(call => call.args[0] === '/case-assignments');
      expect(caseAssignmentsCall).to.exist;
      expect(caseAssignmentsCall.args[1].name).to.equal('assignCasesToUsers');
    });

    it('should register GET /case-assignments route with getCases handler', () => {
      // Re-require the routes module to trigger registration
      require('./routes');

      const getCalls = mockRouter.get.getCalls();
      const caseAssignmentsCall = getCalls.find(call => call.args[0] === '/case-assignments');
      expect(caseAssignmentsCall).to.exist;
      expect(caseAssignmentsCall.args[1].name).to.equal('getCases');
    });

    it('should register all routes in correct order', () => {
      // Re-require the routes module to trigger registration
      require('./routes');

      const getCalls = mockRouter.get.getCalls();
      const postCalls = mockRouter.post.getCalls();
      
      // Verify GET routes
      expect(getCalls).to.have.lengthOf(4);
      expect(getCalls[0].args[0]).to.equal('/orgs');
      expect(getCalls[0].args[1].name).to.equal('handleGetOrganisationsRoute');
      
      expect(getCalls[1].args[0]).to.equal('/users');
      expect(getCalls[1].args[1].name).to.equal('getUsers');
      
      expect(getCalls[2].args[0]).to.equal('/cases');
      expect(getCalls[2].args[1].name).to.equal('getCases');
      
      expect(getCalls[3].args[0]).to.equal('/case-assignments');
      expect(getCalls[3].args[1].name).to.equal('getCases');
      
      // Verify POST routes
      expect(postCalls).to.have.lengthOf(1);
      expect(postCalls[0].args[0]).to.equal('/case-assignments');
      expect(postCalls[0].args[1].name).to.equal('assignCasesToUsers');
    });

    it('should export the router', () => {
      // Re-require the routes module
      delete require.cache[require.resolve('./routes')];
      const routes = require('./routes');

      expect(routes.router).to.equal(mockRouter);
    });
  });

  describe('Handler Function References', () => {
    it('should use the correct handler functions', () => {
      // Verify that the imported functions exist
      expect(handleGetOrganisationsRoute).to.be.a('function');
      expect(restAPI.getUsers).to.be.a('function');
      expect(restAPI.getCases).to.be.a('function');
      expect(restAPI.assignCasesToUsers).to.be.a('function');
    });
  });

  describe('Router Configuration', () => {
    it('should not register any middleware', () => {
      // Re-require the routes module to trigger registration
      require('./routes');

      expect(mockRouter.use).to.not.have.been.called;
    });

    it('should not register PUT or DELETE routes', () => {
      // Re-require the routes module to trigger registration
      require('./routes');

      expect(mockRouter.put).to.not.have.been.called;
      expect(mockRouter.delete).to.not.have.been.called;
    });
  });
});