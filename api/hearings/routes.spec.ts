import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import * as hmcIndex from './hmc.index';
import * as servicesIndex from './services.index';
import { router } from './routes';

chai.use(sinonChai);

describe('Hearings Routes', () => {
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

    it('should register authInterceptor middleware', () => {
      require('./routes');
      expect(mockRouter.use).to.have.been.calledWith(authInterceptor);
    });

    it('should register all hearings routes with correct handlers and middleware', () => {
      require('./routes');
      expect(mockRouter.post).to.have.been.calledWith(
        '/loadServiceHearingValues',
        hmcIndex.injectHearingsHeaders,
        servicesIndex.loadServiceHearingValues
      );
      expect(mockRouter.get).to.have.been.calledWith(
        '/getHearings',
        hmcIndex.injectHearingsHeaders,
        hmcIndex.getHearings
      );
      expect(mockRouter.get).to.have.been.calledWith(
        '/getHearing',
        hmcIndex.injectHearingsHeaders,
        hmcIndex.getHearing
      );
      expect(mockRouter.post).to.have.been.calledWith(
        '/submitHearingRequest',
        hmcIndex.injectHearingsHeaders,
        hmcIndex.submitHearingRequest
      );
      expect(mockRouter.put).to.have.been.calledWith(
        '/updateHearingRequest',
        hmcIndex.injectHearingsHeaders,
        hmcIndex.updateHearingRequest
      );
      expect(mockRouter.delete).to.have.been.calledWith(
        '/cancelHearings',
        hmcIndex.injectHearingsHeaders,
        hmcIndex.cancelHearingRequest
      );
      expect(mockRouter.get).to.have.been.calledWith(
        '/hearingActuals/:hearingId',
        hmcIndex.injectHearingsHeaders,
        hmcIndex.getHearingActuals
      );
      expect(mockRouter.put).to.have.been.calledWith(
        '/hearingActuals',
        hmcIndex.injectHearingsHeaders,
        hmcIndex.updateHearingActuals
      );
      expect(mockRouter.post).to.have.been.calledWith(
        '/hearingActualsCompletion/:hearingId',
        hmcIndex.injectHearingsHeaders,
        hmcIndex.submitHearingActuals
      );
      expect(mockRouter.post).to.have.been.calledWith(
        '/loadServiceLinkedCases',
        servicesIndex.loadServiceLinkedCases
      );
      expect(mockRouter.post).to.have.been.calledWith(
        '/loadLinkedCasesWithHearings',
        servicesIndex.loadLinkedCasesWithHearings
      );
      expect(mockRouter.get).to.have.been.calledWith(
        '/getLinkedHearingGroup',
        hmcIndex.getLinkedHearingGroup
      );
      expect(mockRouter.post).to.have.been.calledWith(
        '/postLinkedHearingGroup',
        hmcIndex.postLinkedHearingGroup
      );
      expect(mockRouter.put).to.have.been.calledWith(
        '/putLinkedHearingGroup',
        hmcIndex.putLinkedHearingGroup
      );
      expect(mockRouter.delete).to.have.been.calledWith(
        '/deleteLinkedHearingGroup',
        hmcIndex.deleteLinkedHearingGroup
      );
    });

    it('should export the router', () => {
      delete require.cache[require.resolve('./routes')];
      const routes = require('./routes');
      expect(routes.router).to.equal(mockRouter);
    });
  });

  describe('Handler Function References', () => {
    it('should use the correct handler functions', () => {
      expect(hmcIndex.cancelHearingRequest).to.be.a('function');
      expect(hmcIndex.deleteLinkedHearingGroup).to.be.a('function');
      expect(hmcIndex.getHearing).to.be.a('function');
      expect(hmcIndex.getHearingActuals).to.be.a('function');
      expect(hmcIndex.getHearings).to.be.a('function');
      expect(hmcIndex.getLinkedHearingGroup).to.be.a('function');
      expect(hmcIndex.injectHearingsHeaders).to.be.a('function');
      expect(hmcIndex.postLinkedHearingGroup).to.be.a('function');
      expect(hmcIndex.putLinkedHearingGroup).to.be.a('function');
      expect(hmcIndex.submitHearingActuals).to.be.a('function');
      expect(hmcIndex.submitHearingRequest).to.be.a('function');
      expect(hmcIndex.updateHearingActuals).to.be.a('function');
      expect(hmcIndex.updateHearingRequest).to.be.a('function');
      expect(servicesIndex.loadLinkedCasesWithHearings).to.be.a('function');
      expect(servicesIndex.loadServiceHearingValues).to.be.a('function');
      expect(servicesIndex.loadServiceLinkedCases).to.be.a('function');
    });
  });

  describe('Router Configuration', () => {
    it('should not register any unexpected middleware', () => {
      require('./routes');
      expect(mockRouter.use).to.have.been.calledOnceWith(authInterceptor);
    });

    it('should not register any extra routes', () => {
      require('./routes');
      const allowedGetRoutes = [
        '/getHearings',
        '/getHearing',
        '/hearingActuals/:hearingId',
        '/getLinkedHearingGroup'
      ];
      const allowedPostRoutes = [
        '/loadServiceHearingValues',
        '/submitHearingRequest',
        '/hearingActualsCompletion/:hearingId',
        '/loadServiceLinkedCases',
        '/loadLinkedCasesWithHearings',
        '/postLinkedHearingGroup'
      ];
      const allowedPutRoutes = [
        '/updateHearingRequest',
        '/hearingActuals',
        '/putLinkedHearingGroup'
      ];
      const allowedDeleteRoutes = [
        '/cancelHearings',
        '/deleteLinkedHearingGroup'
      ];
      mockRouter.get.getCalls().forEach((call) => {
        expect(allowedGetRoutes).to.include(call.args[0]);
      });
      mockRouter.post.getCalls().forEach((call) => {
        expect(allowedPostRoutes).to.include(call.args[0]);
      });
      mockRouter.put.getCalls().forEach((call) => {
        expect(allowedPutRoutes).to.include(call.args[0]);
      });
      mockRouter.delete.getCalls().forEach((call) => {
        expect(allowedDeleteRoutes).to.include(call.args[0]);
      });
    });
  });
});
