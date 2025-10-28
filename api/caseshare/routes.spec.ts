import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as express from 'express';
import { handleGetOrganisationsRoute } from '../organisations/index';
import * as restAPI from './index';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Case Share Routes', () => {
  let sandbox: sinon.SinonSandbox;
  let mockRouter: any;
  let expressStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    mockRouter = {
      get: sandbox.stub(),
      post: sandbox.stub(),
      put: sandbox.stub(),
      delete: sandbox.stub(),
      use: sandbox.stub()
    };

    expressStub = sandbox.stub(express, 'Router').returns(mockRouter);

    delete require.cache[require.resolve('./routes')];
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Route Registration', () => {
    it('should create router with mergeParams option', () => {
      require('./routes');

      expect(expressStub).to.have.been.calledWith({ mergeParams: true });
    });

    it('should register GET /orgs route with organisations handler', () => {
      require('./routes');

      const getCalls = mockRouter.get.getCalls();
      const orgsCall = getCalls.find((call) => call.args[0] === '/orgs');
      expect(orgsCall).to.exist;
      expect(orgsCall.args[1].name).to.equal('handleGetOrganisationsRoute');
    });

    it('should register GET /users route with getUsers handler', () => {
      require('./routes');

      const getCalls = mockRouter.get.getCalls();
      const usersCall = getCalls.find((call) => call.args[0] === '/users');
      expect(usersCall).to.exist;
      expect(usersCall.args[1].name).to.equal('getUsers');
    });

    it('should register GET /cases route with getCases handler', () => {
      require('./routes');

      const getCalls = mockRouter.get.getCalls();
      const casesCall = getCalls.find((call) => call.args[0] === '/cases');
      expect(casesCall).to.exist;
      expect(casesCall.args[1].name).to.equal('getCases');
    });

    it('should register POST /case-assignments route with assignCasesToUsers handler', () => {
      require('./routes');

      const postCalls = mockRouter.post.getCalls();
      const caseAssignmentsCall = postCalls.find((call) => call.args[0] === '/case-assignments');
      expect(caseAssignmentsCall).to.exist;
      expect(caseAssignmentsCall.args[1].name).to.equal('assignCasesToUsers');
    });

    it('should register GET /case-assignments route with getCases handler', () => {
      require('./routes');

      const getCalls = mockRouter.get.getCalls();
      const caseAssignmentsCall = getCalls.find((call) => call.args[0] === '/case-assignments');
      expect(caseAssignmentsCall).to.exist;
      expect(caseAssignmentsCall.args[1].name).to.equal('getCases');
    });

    it('should register all routes in correct order', () => {
      require('./routes');

      const getCalls = mockRouter.get.getCalls();
      const postCalls = mockRouter.post.getCalls();

      expect(getCalls).to.have.lengthOf(4);
      expect(getCalls[0].args[0]).to.equal('/orgs');
      expect(getCalls[0].args[1].name).to.equal('handleGetOrganisationsRoute');

      expect(getCalls[1].args[0]).to.equal('/users');
      expect(getCalls[1].args[1].name).to.equal('getUsers');

      expect(getCalls[2].args[0]).to.equal('/cases');
      expect(getCalls[2].args[1].name).to.equal('getCases');

      expect(getCalls[3].args[0]).to.equal('/case-assignments');
      expect(getCalls[3].args[1].name).to.equal('getCases');

      expect(postCalls).to.have.lengthOf(1);
      expect(postCalls[0].args[0]).to.equal('/case-assignments');
      expect(postCalls[0].args[1].name).to.equal('assignCasesToUsers');
    });

    it('should export the router', () => {
      delete require.cache[require.resolve('./routes')];
      const routes = require('./routes');

      expect(routes.router).to.equal(mockRouter);
    });
  });

  describe('Handler Function References', () => {
    it('should use the correct handler functions', () => {
      expect(handleGetOrganisationsRoute).to.be.a('function');
      expect(restAPI.getUsers).to.be.a('function');
      expect(restAPI.getCases).to.be.a('function');
      expect(restAPI.assignCasesToUsers).to.be.a('function');
    });
  });

  describe('Router Configuration', () => {
    it('should not register any middleware', () => {
      require('./routes');

      expect(mockRouter.use).to.not.have.been.called;
    });

    it('should not register PUT or DELETE routes', () => {
      require('./routes');

      expect(mockRouter.put).to.not.have.been.called;
      expect(mockRouter.delete).to.not.have.been.called;
    });
  });
});
