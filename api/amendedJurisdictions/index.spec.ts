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
        caseTypes: [
          {
            id: 'GENERALAPPLICATION',
            name: 'Civil General Application',
            events: [
              {
                id: 'submitApplication',
                name: 'Submit Application'
              },
              {
                id: 'issueApplication',
                name: 'Issue Application'
              }
            ],
            states: [
              {
                id: 'PENDING_APPLICATION_ISSUED',
                name: 'General Application Issue Pending'
              },
              {
                id: 'AWAITING_RESPONDENT_RESPONSE',
                name: 'Awaiting Respondent Response'
              },
              {
                id: 'APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION',
                name: 'Application Submitted - Awaiting Judicial Decision'
              }
            ]
          },
          {
            id: 'CIVIL',
            name: 'Civil',
            events: [
              {
                id: 'submitClaim',
                name: 'Submit Claim'
              },
              {
                id: 'issueClaim',
                name: 'Issue Claim'
              }
            ],
            states: [
              {
                id: 'PENDING_CASE_ISSUED',
                name: 'Claim Issue Pending'
              },
              {
                id: 'CASE_ISSUED',
                name: 'Awaiting Claim Notification'
              },
              {
                id: 'AWAITING_CASE_DETAILS_NOTIFICATION',
                name: 'Awaiting Claim Details Notification'
              }
            ]
          }
        ]
      }
    ];
    expect(response).to.eql(expected);
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
    req.url = 'aggregated/caseworkers/:uid/jurisdictions?access=read';

    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, data);

    expect(req.session.jurisdictions).to.deep.equal([
      { id: 'PROBATE' },
      { id: 'DIVORCE' }
    ]);
    expect(response).to.equal(req.session.jurisdictions);
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

      expect(res.send).to.have.been.calledWith(req.session.jurisdictions);
      expect(proxyReq.end).to.have.been.called;
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
      req.session.jurisdictions = [
        { id: 'PROBATE' },
        { id: 'DIVORCE' }
      ];

      amendedJurisdictions.checkCachedJurisdictions(proxyReq, req, res);

      expect(res.send).to.not.have.been.called;
      expect(proxyReq.end).to.not.have.been.called;
    });

    it('should handle jurisdictions URL with different patterns', () => {
      req.session.jurisdictions = [{ id: 'PROBATE' }];

      // Test various jurisdiction URL patterns
      const jurisdictionUrls = [
        'aggregated/caseworkers/123/jurisdictions?access=read',
        'aggregated/judges/456/jurisdictions?filter=active',
        'aggregated/users/abc/jurisdictions?'
      ];

      jurisdictionUrls.forEach((url) => {
        req.url = url;
        res.send.resetHistory();
        proxyReq.end.resetHistory();

        amendedJurisdictions.checkCachedJurisdictions(proxyReq, req, res);

        expect(res.send).to.have.been.calledWith(req.session.jurisdictions);
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
