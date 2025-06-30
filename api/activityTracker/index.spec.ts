import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as log4jui from '../lib/log4jui';

chai.use(sinonChai);

describe('Activity Tracker', () => {
  let sandbox: sinon.SinonSandbox;
  let loggerStub: any;
  let req: any;
  let res: any;
  let proxyReq: any;
  let activityTrackerProxyRequest: any;
  let activityTrackerProxyResponse: any;

  before(() => {
    sandbox = sinon.createSandbox();
    loggerStub = {
      info: sandbox.stub(),
      error: sandbox.stub(),
      warn: sandbox.stub(),
      debug: sandbox.stub()
    };
    sandbox.stub(log4jui, 'getLogger').returns(loggerStub);
    
    const activityTracker = require('./index');
    activityTrackerProxyRequest = activityTracker.activityTrackerProxyRequest;
    activityTrackerProxyResponse = activityTracker.activityTrackerProxyResponse;
  });

  after(() => {
    sandbox.restore();
    delete require.cache[require.resolve('./index')];
  });

  beforeEach(() => {
    loggerStub.info.resetHistory();
    loggerStub.error.resetHistory();
    loggerStub.warn.resetHistory();
    loggerStub.debug.resetHistory();
    
    proxyReq = {};
    
    res = mockRes();
  });

  describe('activityTrackerProxyRequest', () => {
    it('should log user information when user and userinfo exist', async () => {
      req = mockReq({
        user: {
          userinfo: {
            id: 'test-user-123',
            forename: 'John',
            surname: 'Doe'
          }
        }
      });

      await activityTrackerProxyRequest(proxyReq, req);

      expect(loggerStub.info).to.have.been.calledOnce;
      expect(loggerStub.info).to.have.been.calledWith(
        'ActivityTrackerRequest => ',
        'id:test-user-123 forename:John surname:Doe'
      );
    });

    it('should not log when user does not exist', async () => {
      req = mockReq({});

      await activityTrackerProxyRequest(proxyReq, req);

      expect(loggerStub.info).to.not.have.been.called;
    });

    it('should not log when userinfo does not exist', async () => {
      req = mockReq({
        user: {}
      });

      await activityTrackerProxyRequest(proxyReq, req);

      expect(loggerStub.info).to.not.have.been.called;
    });

    it('should handle missing user properties gracefully', async () => {
      req = mockReq({
        user: {
          userinfo: {
            id: 'test-user-456'
            // forename and surname are undefined
          }
        }
      });

      await activityTrackerProxyRequest(proxyReq, req);

      expect(loggerStub.info).to.have.been.calledOnce;
      expect(loggerStub.info).to.have.been.calledWith(
        'ActivityTrackerRequest => ',
        'id:test-user-456 forename:undefined surname:undefined'
      );
    });

    it('should handle null userinfo gracefully', async () => {
      req = mockReq({
        user: {
          userinfo: null
        }
      });

      await activityTrackerProxyRequest(proxyReq, req);

      expect(loggerStub.info).to.not.have.been.called;
    });

    it('should use the correct logger name', async () => {
      req = mockReq({
        user: {
          userinfo: {
            id: 'test',
            forename: 'Test',
            surname: 'User'
          }
        }
      });

      await activityTrackerProxyRequest(proxyReq, req);

      expect(log4jui.getLogger).to.have.been.calledWith('proxy');
    });
  });

  describe('activityTrackerProxyResponse', () => {
    const mockJson = { data: 'test response data' };

    it('should log user information and return json when user and userinfo exist', async () => {
      req = mockReq({
        user: {
          userinfo: {
            id: 'test-user-789',
            forename: 'Jane',
            surname: 'Smith'
          }
        }
      });

      const result = await activityTrackerProxyResponse(proxyReq, req, res, mockJson);

      expect(loggerStub.info).to.have.been.calledOnce;
      expect(loggerStub.info).to.have.been.calledWith(
        'ActivityTrackerResponse => ',
        'id: test-user-789 forename:Jane surname:Smith'
      );
      expect(result).to.equal(mockJson);
    });

    it('should not log when user does not exist but still return json', async () => {
      req = mockReq({});

      const result = await activityTrackerProxyResponse(proxyReq, req, res, mockJson);

      expect(loggerStub.info).to.not.have.been.called;
      expect(result).to.equal(mockJson);
    });

    it('should not log when userinfo does not exist but still return json', async () => {
      req = mockReq({
        user: {}
      });

      const result = await activityTrackerProxyResponse(proxyReq, req, res, mockJson);

      expect(loggerStub.info).to.not.have.been.called;
      expect(result).to.equal(mockJson);
    });

    it('should handle missing user properties gracefully and return json', async () => {
      req = mockReq({
        user: {
          userinfo: {
            id: 'test-user-999'
            // forename and surname are undefined
          }
        }
      });

      const result = await activityTrackerProxyResponse(proxyReq, req, res, mockJson);

      expect(loggerStub.info).to.have.been.calledOnce;
      expect(loggerStub.info).to.have.been.calledWith(
        'ActivityTrackerResponse => ',
        'id: test-user-999 forename:undefined surname:undefined'
      );
      expect(result).to.equal(mockJson);
    });

    it('should handle null userinfo gracefully and return json', async () => {
      req = mockReq({
        user: {
          userinfo: null
        }
      });

      const result = await activityTrackerProxyResponse(proxyReq, req, res, mockJson);

      expect(loggerStub.info).to.not.have.been.called;
      expect(result).to.equal(mockJson);
    });

    it('should return the json parameter unchanged', async () => {
      req = mockReq({});
      const complexJson = { 
        nested: { 
          data: 'value',
          array: [1, 2, 3] 
        },
        status: 'success'
      };

      const result = await activityTrackerProxyResponse(proxyReq, req, res, complexJson);

      expect(result).to.deep.equal(complexJson);
      expect(result).to.equal(complexJson);
    });

    it('should handle null json parameter', async () => {
      req = mockReq({
        user: {
          userinfo: {
            id: 'test',
            forename: 'Test',
            surname: 'User'
          }
        }
      });

      const result = await activityTrackerProxyResponse(proxyReq, req, res, null);

      expect(loggerStub.info).to.have.been.called;
      expect(result).to.be.null;
    });

    it('should handle undefined json parameter', async () => {
      req = mockReq({
        user: {
          userinfo: {
            id: 'test',
            forename: 'Test',
            surname: 'User'
          }
        }
      });

      const result = await activityTrackerProxyResponse(proxyReq, req, res, undefined);

      expect(loggerStub.info).to.have.been.called;
      expect(result).to.be.undefined;
    });

    it('should use the correct logger name', async () => {
      req = mockReq({
        user: {
          userinfo: {
            id: 'test',
            forename: 'Test',
            surname: 'User'
          }
        }
      });

      await activityTrackerProxyResponse(proxyReq, req, res, mockJson);

      expect(log4jui.getLogger).to.have.been.calledWith('proxy');
    });
  });

  describe('Edge Cases and Error Scenarios', () => {
    it('should handle proxyReq being null', async () => {
      req = mockReq({
        user: {
          userinfo: {
            id: 'test',
            forename: 'Test',
            surname: 'User'
          }
        }
      });

      // Should not throw
      await expect(activityTrackerProxyRequest(null, req)).to.be.fulfilled;
      await expect(activityTrackerProxyResponse(null, req, res, {})).to.be.fulfilled;

      expect(loggerStub.info).to.have.been.calledTwice;
    });

    it('should handle res being null in activityTrackerProxyResponse', async () => {
      req = mockReq({
        user: {
          userinfo: {
            id: 'test',
            forename: 'Test',
            surname: 'User'
          }
        }
      });

      const result = await activityTrackerProxyResponse(proxyReq, req, null, { data: 'test' });

      expect(loggerStub.info).to.have.been.called;
      expect(result).to.deep.equal({ data: 'test' });
    });
  });

  describe('Logger Creation', () => {
    it('should create logger only once (module-level)', () => {
      // The logger should have been created when we imported the module in the before hook
      expect(log4jui.getLogger).to.have.been.calledWith('proxy');
      
      // Verify it was called only once despite multiple tests
      const getLoggerStub = log4jui.getLogger as sinon.SinonStub;
      expect(getLoggerStub.calledOnce).to.be.true;
    });
  });
});