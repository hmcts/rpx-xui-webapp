import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as express from 'express';
import * as index from '.';
import authInterceptor from '../lib/middleware/auth';

chai.use(sinonChai);

describe('Access Management Routes', () => {
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
      expect(mockRouter.use).to.have.been.calledBefore(mockRouter.post);
    });

    it('should register POST /createBooking route', () => {
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.post).to.have.been.calledWith('/createBooking', index.createBooking);
    });

    it('should register POST /getBookings route', () => {
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.post).to.have.been.calledWith('/getBookings', index.getBookings);
    });

    it('should register POST /role-mapping/judicial/refresh route', () => {
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.post).to.have.been.calledWith('/role-mapping/judicial/refresh', index.refreshRoleAssignments);
    });

    it('should register POST /specific-access-approval route', () => {
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.post).to.have.been.calledWith('/specific-access-approval', index.approveSpecificAccessRequest);
    });

    it('should register all routes in correct order', () => {
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.use.firstCall).to.have.been.calledWith(authInterceptor);

      const postCalls = mockRouter.post.getCalls();
      expect(postCalls).to.have.lengthOf(4);

      expect(postCalls[0].args[0]).to.equal('/createBooking');
      expect(postCalls[0].args[1]).to.equal(index.createBooking);

      expect(postCalls[1].args[0]).to.equal('/getBookings');
      expect(postCalls[1].args[1]).to.equal(index.getBookings);

      expect(postCalls[2].args[0]).to.equal('/role-mapping/judicial/refresh');
      expect(postCalls[2].args[1]).to.equal(index.refreshRoleAssignments);

      expect(postCalls[3].args[0]).to.equal('/specific-access-approval');
      expect(postCalls[3].args[1]).to.equal(index.approveSpecificAccessRequest);
    });

    it('should export the router as default', () => {
      delete require.cache[require.resolve('./routes')];
      const routes = require('./routes');

      expect(routes.default).to.equal(mockRouter);
    });
  });

  describe('Handler Function References', () => {
    it('should use the correct handler functions from index module', () => {
      expect(index.createBooking).to.be.a('function');
      expect(index.getBookings).to.be.a('function');
      expect(index.refreshRoleAssignments).to.be.a('function');
      expect(index.approveSpecificAccessRequest).to.be.a('function');
    });

    it('should register handlers as direct references not wrapped functions', () => {
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      const createBookingHandler = mockRouter.post.getCall(0).args[1];
      const getBookingsHandler = mockRouter.post.getCall(1).args[1];
      const refreshRoleHandler = mockRouter.post.getCall(2).args[1];
      const approveAccessHandler = mockRouter.post.getCall(3).args[1];

      expect(createBookingHandler).to.equal(index.createBooking);
      expect(getBookingsHandler).to.equal(index.getBookings);
      expect(refreshRoleHandler).to.equal(index.refreshRoleAssignments);
      expect(approveAccessHandler).to.equal(index.approveSpecificAccessRequest);
    });
  });

  describe('Router Configuration', () => {
    it('should only register POST routes', () => {
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.get).to.not.have.been.called;
      expect(mockRouter.put).to.not.have.been.called;
      expect(mockRouter.delete).to.not.have.been.called;
      expect(mockRouter.patch).to.not.have.been.called;

      expect(mockRouter.post).to.have.been.called;
      expect(mockRouter.post.callCount).to.equal(4);
    });

    it('should apply authInterceptor to all routes', () => {
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.use).to.have.been.calledBefore(mockRouter.post);
      expect(mockRouter.use.firstCall.args[0]).to.equal(authInterceptor);
    });

    it('should handle require cache properly for multiple imports', () => {
      delete require.cache[require.resolve('./routes')];
      const routes1 = require('./routes');

      mockRouter.use.resetHistory();
      mockRouter.post.resetHistory();

      const routes2 = require('./routes');

      expect(routes1).to.equal(routes2);

      expect(mockRouter.use).to.not.have.been.called;
      expect(mockRouter.post).to.not.have.been.called;
    });
  });
});
