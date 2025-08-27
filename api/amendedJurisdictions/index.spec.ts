import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as amendedJurisdictions from './index';

chai.use(sinonChai);

describe('Amended Jurisdiction', () => {
  let sandbox;
  let res;
  let req;
  let proxyRes;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    proxyRes = {};
    res = mockRes();
    req = mockReq({
      baseUrl: '/api/documents/',
      cookies: [],
      headers: {
        accept: '*/*',
        'content-type': 'text/test',
        experimental: 'experiment/test'
      },
      session: {
        save: (fun) => {
          fun();
        }
      },
      url: 'fdafu4543543/binary'
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should filter jurisdictions for the jurisdictions endpoint', () => {
    const data = [
      {
        id: 'PROBATE'
      },
      {
        id: 'RANDOM'
      }
    ];
    req.url = 'aggregated/caseworkers/:uid/jurisdictions?access=read';
    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, data);
    // Unknown jurisdiction should be filtered
    const expected = [
      {
        id: 'PROBATE'
      }
    ];
    expect(response).to.eql(expected);
  });

  it('should not filter jurisdictions for non-jurisdictions endpoint', () => {
    const expected = [
      {
        id: 'PROBATE'
      },
      {
        id: 'RANDOM'
      }
    ];
    req.url = '/aggregated/some/other/url';

    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, expected);
    expect(response).to.eql(expected);
  });

  it('should send empty array', () => {
    const expected = [];

    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, expected);
    expect(response).to.eql(expected);
  });

  it('should return data unchanged when data is not an array', () => {
    const data = 'not an array';
    req.url = 'aggregated/caseworkers/:uid/jurisdictions?access=read';

    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, data as any);
    expect(response).to.equal(data);
  });

  it('should return null when data is null', () => {
    const data = null;
    req.url = 'aggregated/caseworkers/:uid/jurisdictions?access=read';

    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, data);
    expect(response).to.equal(null);
  });

  it('should return undefined when data is undefined', () => {
    const data = undefined;
    req.url = 'aggregated/caseworkers/:uid/jurisdictions?access=read';

    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, data);
    expect(response).to.equal(undefined);
  });

  it('should store filtered jurisdictions in session', () => {
    const data = [
      { id: 'PROBATE' },
      { id: 'DIVORCE' },
      { id: 'UNKNOWN' }
    ];
    const sessionKey = 'readJurisdictions';
    req.url = 'aggregated/caseworkers/:uid/jurisdictions?access=read';

    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, data);

    expect(req.session[sessionKey]).to.deep.equal([
      { id: 'PROBATE' },
      { id: 'DIVORCE' }
    ]);
    expect(response).to.equal(req.session[sessionKey]);
  });

  describe('checkCachedJurisdictions', () => {
    let proxyReq;

    beforeEach(() => {
      proxyReq = {
        end: sinon.stub()
      };
    });

    it('should send cached jurisdictions and end proxy request when jurisdictions are cached', () => {
      req.url = 'aggregated/caseworkers/:uid/jurisdictions?access=read';
      req.session.jurisdictions = [
        { id: 'PROBATE' },
        { id: 'DIVORCE' }
      ];

      amendedJurisdictions.checkCachedJurisdictions(proxyReq, req, res);
      expect(res.json).to.have.been.calledWith([{ id: "PROBATE" }, { id: "DIVORCE" }]);
      expect(proxyReq.end.called).to.be.true;
    });

    it('should not send response when no jurisdictions are cached', () => {
      req.url = 'aggregated/caseworkers/:uid/jurisdictions?access=read';
      // No jurisdictions in session

      amendedJurisdictions.checkCachedJurisdictions(proxyReq, req, res);

      expect(res.send).to.not.have.been.called;
      expect(proxyReq.end).to.not.have.been.called;
    });

    it('should not send response when URL does not match jurisdictions pattern', () => {
      req.url = '/some/other/endpoint';
      const sessionKey = 'jurisdictions';
      req.session[sessionKey] = [
        { id: 'PROBATE' },
        { id: 'DIVORCE' }
      ];

      amendedJurisdictions.checkCachedJurisdictions(proxyReq, req, res);

      expect(res.send).to.not.have.been.called;
      expect(proxyReq.end).to.not.have.been.called;
    });

    it('should handle jurisdictions URL with different patterns', () => {
      const sessionKey = 'jurisdictions';
      req.session[sessionKey] = [{ id: 'PROBATE' }];

      // Test various jurisdiction URL patterns
      const jurisdictionUrls = [
        'aggregated/judges/456/jurisdictions?filter=active',
        'aggregated/users/abc/jurisdictions?'
      ];

      jurisdictionUrls.forEach((url) => {
        req.url = url;
        res.send.resetHistory();
        proxyReq.end.resetHistory();

        amendedJurisdictions.checkCachedJurisdictions(proxyReq, req, res);

        expect(res.send).to.have.been.calledWith([{ id: 'PROBATE' }]);
        expect(proxyReq.end).to.have.been.called;
      });
    });

    it('should not match URLs without jurisdictions pattern', () => {
      req.session.jurisdictions = [{ id: 'PROBATE' }];

      // Test URLs that should not match
      const nonJurisdictionUrls = [
        'aggregated/caseworkers/123/jurisdictions', // No ? at the end
        'api/jurisdictions?access=read', // No aggregated prefix
        'aggregated/jurisdictions', // Missing path before jurisdictions
        'aggregated/users/jurisdiction?' // Wrong word (jurisdiction vs jurisdictions)
      ];

      nonJurisdictionUrls.forEach((url) => {
        req.url = url;
        res.send.resetHistory();
        proxyReq.end.resetHistory();

        amendedJurisdictions.checkCachedJurisdictions(proxyReq, req, res);

        expect(res.send).to.not.have.been.called;
        expect(proxyReq.end).to.not.have.been.called;
      });
    });
  });
});
