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

    it('should return cached jurisdictions for access=read', () => {
      req.url = 'aggregated/caseworkers/123/jurisdictions?access=read';
      req.session.readJurisdictions = [{ id: 'PROBATE' }];
      const result = amendedJurisdictions.checkCachedJurisdictions(proxyRes, req);
      expect(result).to.eql([{ id: 'PROBATE' }]);
    });

    it('should return cached jurisdictions for access=create', () => {
      req.url = 'aggregated/caseworkers/123/jurisdictions?access=create';
      req.session.createJurisdictions = [{ id: 'DIVORCE' }];
      const result = amendedJurisdictions.checkCachedJurisdictions(proxyRes, req);
      expect(result).to.eql([{ id: 'DIVORCE' }]);
    });

    it('should return cached jurisdictions for no access param', () => {
      req.url = 'aggregated/caseworkers/123/jurisdictions?';
      req.session.jurisdictions = [{ id: 'CIVIL' }];
      const result = amendedJurisdictions.checkCachedJurisdictions(proxyRes, req);
      expect(result).to.eql([{ id: 'CIVIL' }]);
    });

    it('should return undefined if no cached jurisdictions exist', () => {
      req.url = 'aggregated/caseworkers/123/jurisdictions?access=read';
      delete req.session.readJurisdictions;
      const result = amendedJurisdictions.checkCachedJurisdictions(proxyRes, req);
      expect(result).to.be.undefined;
    });

    it('should return undefined if URL does not match jurisdictions pattern', () => {
      req.url = '/not/a/jurisdictions/url?access=read';
      req.session.readJurisdictions = [{ id: 'PROBATE' }];
      const result = amendedJurisdictions.checkCachedJurisdictions(proxyRes, req);
      expect(result).to.be.undefined;
    });

    it('should handle missing query string gracefully', () => {
      req.url = 'aggregated/caseworkers/123/jurisdictions?';
      req.session.jurisdictions = [{ id: 'CIVIL' }];
      const result = amendedJurisdictions.checkCachedJurisdictions(proxyRes, req);
      expect(result).to.eql([{ id: 'CIVIL' }]);
    });

    it('should handle undefined session object gracefully', () => {
      req.url = 'aggregated/caseworkers/123/jurisdictions?access=read';
      req.session = undefined;
      expect(() => amendedJurisdictions.checkCachedJurisdictions(proxyRes, req)).to.throw();
    });
  });
});
