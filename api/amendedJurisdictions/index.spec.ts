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
});
