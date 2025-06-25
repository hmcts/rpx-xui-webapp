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
    
    // Create a mock router with all the methods we need
    mockRouter = {
      use: sandbox.stub(),
      get: sandbox.stub(),
      post: sandbox.stub(),
      put: sandbox.stub(),
      delete: sandbox.stub(),
      patch: sandbox.stub()
    };

    // Stub express.Router to return our mock router
    expressStub = sandbox.stub(express, 'Router').returns(mockRouter);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Route Registration', () => {
    it('should create router with mergeParams option', () => {
      // Re-require the routes module to trigger registration
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(expressStub).to.have.been.calledWith({ mergeParams: true });
    });

    it('should register authInterceptor middleware', () => {
      // Re-require the routes module to trigger registration
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.use).to.have.been.calledWith(authInterceptor);
      expect(mockRouter.use).to.have.been.calledBefore(mockRouter.post);
    });

    it('should register POST /createBooking route', () => {
      // Re-require the routes module to trigger registration
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.post).to.have.been.calledWith('/createBooking', index.createBooking);
    });

    it('should register POST /getBookings route', () => {
      // Re-require the routes module to trigger registration
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.post).to.have.been.calledWith('/getBookings', index.getBookings);
    });

    it('should register POST /role-mapping/judicial/refresh route', () => {
      // Re-require the routes module to trigger registration
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.post).to.have.been.calledWith('/role-mapping/judicial/refresh', index.refreshRoleAssignments);
    });

    it('should register POST /specific-access-approval route', () => {
      // Re-require the routes module to trigger registration
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      expect(mockRouter.post).to.have.been.calledWith('/specific-access-approval', index.approveSpecificAccessRequest);
    });

    it('should register all routes in correct order', () => {
      // Re-require the routes module to trigger registration
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      // Verify middleware is registered first
      expect(mockRouter.use.firstCall).to.have.been.calledWith(authInterceptor);

      // Verify all routes are registered
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
      // Re-require the routes module
      delete require.cache[require.resolve('./routes')];
      const routes = require('./routes');

      expect(routes.default).to.equal(mockRouter);
    });
  });

  describe('Handler Function References', () => {
    it('should use the correct handler functions from index module', () => {
      // Verify that the imported functions exist
      expect(index.createBooking).to.be.a('function');
      expect(index.getBookings).to.be.a('function');
      expect(index.refreshRoleAssignments).to.be.a('function');
      expect(index.approveSpecificAccessRequest).to.be.a('function');
    });

    it('should register handlers as direct references not wrapped functions', () => {
      // Re-require the routes module to trigger registration
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      // Get the registered handlers
      const createBookingHandler = mockRouter.post.getCall(0).args[1];
      const getBookingsHandler = mockRouter.post.getCall(1).args[1];
      const refreshRoleHandler = mockRouter.post.getCall(2).args[1];
      const approveAccessHandler = mockRouter.post.getCall(3).args[1];

      // Verify they are the exact same function references
      expect(createBookingHandler).to.equal(index.createBooking);
      expect(getBookingsHandler).to.equal(index.getBookings);
      expect(refreshRoleHandler).to.equal(index.refreshRoleAssignments);
      expect(approveAccessHandler).to.equal(index.approveSpecificAccessRequest);
    });
  });

  describe('Router Configuration', () => {
    it('should only register POST routes', () => {
      // Re-require the routes module to trigger registration
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      // Verify no other HTTP methods are used
      expect(mockRouter.get).to.not.have.been.called;
      expect(mockRouter.put).to.not.have.been.called;
      expect(mockRouter.delete).to.not.have.been.called;
      expect(mockRouter.patch).to.not.have.been.called;
      
      // Verify POST is used
      expect(mockRouter.post).to.have.been.called;
      expect(mockRouter.post.callCount).to.equal(4);
    });

    it('should apply authInterceptor to all routes', () => {
      // Re-require the routes module to trigger registration
      delete require.cache[require.resolve('./routes')];
      require('./routes');

      // authInterceptor should be registered before any routes
      expect(mockRouter.use).to.have.been.calledBefore(mockRouter.post);
      expect(mockRouter.use.firstCall.args[0]).to.equal(authInterceptor);
    });

    it('should handle require cache properly for multiple imports', () => {
      // First import
      delete require.cache[require.resolve('./routes')];
      const routes1 = require('./routes');

      // Reset stubs to track new calls
      mockRouter.use.resetHistory();
      mockRouter.post.resetHistory();

      // Second import (should use cache, no new registrations)
      const routes2 = require('./routes');

      // Should return same instance
      expect(routes1).to.equal(routes2);
      
      // Should not re-register routes
      expect(mockRouter.use).to.not.have.been.called;
      expect(mockRouter.post).to.not.have.been.called;
    });
  });
});