import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as amendedJurisdictions from './index';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
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
        id: 'CIVIL',
        name: 'Civil',
        caseTypes: [
          {
            id: 'GENERALAPPLICATION',
            name: 'Civil General Application',
            description: 'General application for civil cases',
            events: [
              { id: 'submitApplication', name: 'Submit Application' },
              { id: 'issueApplication', name: 'Issue Application' }
            ],
            states: [
              {
                id: 'PENDING_APPLICATION_ISSUED',
                name: 'General Application Issue Pending',
                description: 'Application is pending issuance',
                order: 1
              },
              {
                id: 'AWAITING_RESPONDENT_RESPONSE',
                name: 'Awaiting Respondent Response',
                description: 'Waiting for respondent to respond',
                order: 2
              },
              {
                id: 'APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION',
                name: 'Application Submitted - Awaiting Judicial Decision',
                description: 'Waiting for judicial decision',
                order: 3
              }
            ]
          },
          {
            id: 'CIVIL',
            name: 'Civil',
            description: 'Standard civil case',
            events: [
              { id: 'submitClaim', name: 'Submit Claim' },
              { id: 'issueClaim', name: 'Issue Claim' }
            ],
            states: [
              {
                id: 'PENDING_CASE_ISSUED',
                name: 'Claim Issue Pending',
                description: 'Claim is pending issuance',
                order: 1
              },
              {
                id: 'CASE_ISSUED',
                name: 'Awaiting Claim Notification',
                description: 'Claim has been issued',
                order: 2
              },
              {
                id: 'AWAITING_CASE_DETAILS_NOTIFICATION',
                name: 'Awaiting Claim Details Notification',
                description: 'Waiting for claim details notification',
                order: 3
              }
            ]
          }
        ]
      },
      {
        id: 'RANDOM',
        description: 'This jurisdiction should be filtered out'
      }
    ];
    req.url = 'aggregated/caseworkers/:uid/jurisdictions?access=read';
    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, data);
    // Unknown jurisdiction should be filtered
    // Expected result should only contain the fields that are mapped in the getJurisdictions function
    const expected = [
      {
        id: 'CIVIL',
        name: 'Civil',
        description: '',
        caseTypes: [
          {
            id: 'GENERALAPPLICATION',
            name: 'Civil General Application',
            description: 'General application for civil cases',
            events: [
              { id: 'submitApplication', name: 'Submit Application' },
              { id: 'issueApplication', name: 'Issue Application' }
            ],
            states: [
              {
                id: 'PENDING_APPLICATION_ISSUED',
                name: 'General Application Issue Pending',
                description: 'Application is pending issuance'
              },
              {
                id: 'AWAITING_RESPONDENT_RESPONSE',
                name: 'Awaiting Respondent Response',
                description: 'Waiting for respondent to respond'
              },
              {
                id: 'APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION',
                name: 'Application Submitted - Awaiting Judicial Decision',
                description: 'Waiting for judicial decision'
              }
            ]
          },
          {
            id: 'CIVIL',
            name: 'Civil',
            description: 'Standard civil case',
            events: [
              { id: 'submitClaim', name: 'Submit Claim' },
              { id: 'issueClaim', name: 'Issue Claim' }
            ],
            states: [
              {
                id: 'PENDING_CASE_ISSUED',
                name: 'Claim Issue Pending',
                description: 'Claim is pending issuance'
              },
              {
                id: 'CASE_ISSUED',
                name: 'Awaiting Claim Notification',
                description: 'Claim has been issued'
              },
              {
                id: 'AWAITING_CASE_DETAILS_NOTIFICATION',
                name: 'Awaiting Claim Details Notification',
                description: 'Waiting for claim details notification'
              }
            ]
          }
        ]
      }
    ];
    expect(response).to.eql(expected);
  });

  it('should filter jurisdictions for access=create endpoint', () => {
    const data = [
      {
        id: 'CIVIL',
        name: 'Civil',
        caseTypes: [
          {
            id: 'GENERALAPPLICATION',
            name: 'Civil General Application'
          }
        ]
      },
      {
        id: 'RANDOM',
        description: 'This jurisdiction should be filtered out'
      }
    ];
    req.url = 'aggregated/caseworkers/:uid/jurisdictions?access=create';
    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, data);

    const expected = [
      {
        id: 'CIVIL',
        name: 'Civil',
        description: '',
        caseTypes: [
          {
            id: 'GENERALAPPLICATION',
            name: 'Civil General Application',
            description: '',
            events: [],
            states: []
          }
        ]
      }
    ];
    expect(response).to.eql(expected);
    expect(req.session.createJurisdictions).to.eql(expected);
  });

  it('should filter jurisdictions with no access parameter', () => {
    const data = [
      {
        id: 'CIVIL',
        name: 'Civil',
        caseTypes: [
          {
            id: 'GENERALAPPLICATION',
            name: 'Civil General Application'
          }
        ]
      },
      {
        id: 'RANDOM',
        description: 'This jurisdiction should be filtered out'
      }
    ];
    req.url = 'aggregated/caseworkers/:uid/jurisdictions?';
    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, data);

    const expected = [
      {
        id: 'CIVIL',
        name: 'Civil',
        description: '',
        caseTypes: [
          {
            id: 'GENERALAPPLICATION',
            name: 'Civil General Application',
            description: '',
            events: [],
            states: []
          }
        ]
      }
    ];
    expect(response).to.eql(expected);
    expect(req.session.jurisdictions).to.eql(expected);
  });

  it('should not filter jurisdictions for non-jurisdictions endpoint', () => {
    const expected = [
      {
        id: 'CIVIL',
        name: 'Civil',
        caseTypes: [
          {
            id: 'GENERALAPPLICATION',
            name: 'Civil General Application',
            description: 'General application for civil cases',
            events: [
              { id: 'submitApplication', name: 'Submit Application' }
            ],
            states: [
              {
                id: 'PENDING_APPLICATION_ISSUED',
                name: 'General Application Issue Pending',
                description: 'Application is pending issuance',
                order: 1
              }
            ]
          }
        ]
      },
      {
        id: 'RANDOM',
        name: 'Random Jurisdiction',
        description: 'Random jurisdiction for testing',
        caseTypes: [
          {
            id: 'RANDOMCASE',
            name: 'Random Case Type',
            description: 'Random case type for testing',
            events: [
              { id: 'randomEvent', name: 'Random Event' }
            ],
            states: [
              {
                id: 'RANDOM_STATE',
                name: 'Random State',
                description: 'Random state for testing',
                order: 1
              }
            ]
          }
        ]
      }
    ];
    req.url = '/aggregated/some/other/url';

    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, expected);
    expect(response).to.eql(expected);
  });

  it('should handle empty jurisdictions array correctly', () => {
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
      { id: 'PROBATE', description: '' },
      { id: 'DIVORCE', description: '' }
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
