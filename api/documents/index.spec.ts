import axios from 'axios';
import { expect, use } from 'chai';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { handleRequest, handleResponse, validateLegacyDocumentAccess } from './index';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
use(sinonChai);

describe('Documents Uploading', () => {
  let sandbox;
  let res;
  let req;
  let proxyRes;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    proxyRes = mockRes();
    req = mockReq();
    res = {
      session: {
        lastUploadTime: 1705066299756,
        nextTimeout: 10000,
      },
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should handle request and return true if not rate-limited', () => {
    const result = handleRequest(req, res, proxyRes);

    expect(result).to.deep.equal(true);
  });

  it('should handle request and return false if rate-limited', () => {
    const nextTimeout = Date.now() + 5;
    const rateLimitedReq = {
      method: 'POST',
      session: {
        lastUploadTime: Date.now(),
        nextTimeout: nextTimeout,
      },
    };

    const result = handleRequest(req, rateLimitedReq, proxyRes);
    expect(result).to.deep.equal(false);
  });

  it('should use the configured initial period when the session has no nextTimeout', () => {
    const initialPeriod = 10000;

    const justInside = { method: 'POST', session: { lastUploadTime: Date.now() - initialPeriod + 500 } };
    const justOutside = { method: 'POST', session: { lastUploadTime: Date.now() - initialPeriod - 500 } };

    expect(handleRequest(req, justInside, proxyRes)).to.deep.equal(false);
    expect(handleRequest(req, justOutside, proxyRes)).to.deep.equal(true);
  });

  it('should handle request and delete the cookie from the header', () => {
    const nextTimeout = Date.now() + 5;
    const mainReq = {
      method: 'POST',
      session: {
        lastUploadTime: Date.now(),
        nextTimeout: nextTimeout,
      },
      headers: { cookie: 'test1' },
    };
    handleRequest(req, mainReq, proxyRes);
    expect(mainReq?.headers?.cookie).to.be.an('undefined');
  });

  it('should apply route-scoped CSP for HTML legacy binary document responses', () => {
    const upstreamResponse = {
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    };
    const request = {
      method: 'GET',
      originalUrl: '/documents/abc-123/binary',
    };
    const response = {
      setHeader: sandbox.stub(),
      removeHeader: sandbox.stub(),
    };

    handleResponse(upstreamResponse, request, response);

    expect(response.setHeader).to.have.been.calledWith(
      'Content-Security-Policy',
      "default-src 'none'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'none'; connect-src 'none'; img-src 'self' data: blob:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'none'; media-src 'self' data: blob:"
    );
    expect(response.removeHeader).to.have.been.calledWith('Content-Security-Policy-Report-Only');
    expect(response.removeHeader).to.have.been.calledWith('X-Content-Security-Policy');
    expect(response.removeHeader).to.have.been.calledWith('X-WebKit-CSP');
  });

  it('should keep CSP headers unchanged for non-HTML legacy binary responses', () => {
    const upstreamResponse = {
      headers: {
        'content-type': 'application/pdf',
      },
    };
    const request = {
      method: 'GET',
      originalUrl: '/documents/abc-123/binary',
    };
    const response = {
      setHeader: sandbox.stub(),
      removeHeader: sandbox.stub(),
    };

    handleResponse(upstreamResponse, request, response);

    expect(response.setHeader).to.not.have.been.called;
    expect(response.removeHeader).to.not.have.been.called;
  });

  it('should keep CSP headers unchanged for unrelated routes', () => {
    const upstreamResponse = {
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    };
    const request = {
      method: 'GET',
      originalUrl: '/data/internal/cases/1713376274978432',
    };
    const response = {
      setHeader: sandbox.stub(),
      removeHeader: sandbox.stub(),
    };

    handleResponse(upstreamResponse, request, response);

    expect(response.setHeader).to.not.have.been.called;
    expect(response.removeHeader).to.not.have.been.called;
  });

  describe('validateLegacyDocumentAccess', () => {
    it('should deny legacy binary document requests without case context', async () => {
      const request = {
        method: 'GET',
        originalUrl: '/documents/doc-123/binary',
        query: {},
        url: '/doc-123/binary',
      };
      const response = {
        status: sandbox.stub().returnsThis(),
        send: sandbox.stub(),
      };
      const next = sandbox.stub();

      await validateLegacyDocumentAccess(request as any, response, next);

      expect(response.status).to.have.been.calledWith(403);
      expect(response.send).to.have.been.calledWith({ message: 'Forbidden' });
      expect(next).to.not.have.been.called;
    });

    it('should allow legacy binary document requests when CCD confirms document belongs to the case', async () => {
      const getStub = sandbox.stub(axios, 'get').resolves({
        data: {
          categories: [
            {
              documents: [
                {
                  document_binary_url: 'http://dm-store/documents/doc-123/binary',
                },
              ],
            },
          ],
        },
      });
      const request = {
        method: 'GET',
        headers: {},
        originalUrl: '/documents/doc-123/binary?caseId=case-123',
        query: { caseId: 'case-123' },
        url: '/doc-123/binary?caseId=case-123',
      };
      const response = {
        status: sandbox.stub().returnsThis(),
        send: sandbox.stub(),
      };
      const next = sandbox.stub();

      await validateLegacyDocumentAccess(request as any, response, next);

      expect(getStub).to.have.been.calledWith(sinon.match('/categoriesAndDocuments/case-123'));
      expect(request.url).to.equal('/doc-123/binary');
      expect(next).to.have.been.calledOnce;
      expect(response.status).to.not.have.been.called;
    });

    it('should allow legacy binary document requests with same-origin case-details referrer', async () => {
      const getStub = sandbox.stub(axios, 'get').resolves({
        data: {
          categories: [
            {
              documents: [
                {
                  document_binary_url: '/documents/doc-123/binary',
                },
              ],
            },
          ],
        },
      });
      const request = {
        method: 'GET',
        protocol: 'https',
        headers: {
          host: 'manage-case.hmcts.net',
          referer: 'https://manage-case.hmcts.net/cases/case-details/IA/Asylum/case-123',
        },
        originalUrl: '/documents/doc-123/binary',
        query: {},
        url: '/doc-123/binary',
      };
      const response = {
        status: sandbox.stub().returnsThis(),
        send: sandbox.stub(),
      };
      const next = sandbox.stub();

      await validateLegacyDocumentAccess(request as any, response, next);

      expect(getStub).to.have.been.calledWith(sinon.match('/categoriesAndDocuments/case-123'));
      expect(next).to.have.been.calledOnce;
      expect(response.status).to.not.have.been.called;
    });

    it('should deny legacy binary document requests when the document is not in the case document list', async () => {
      sandbox.stub(axios, 'get').resolves({
        data: {
          categories: [
            {
              documents: [
                {
                  document_binary_url: 'http://dm-store/documents/another-doc/binary',
                },
              ],
            },
          ],
        },
      });
      const request = {
        method: 'GET',
        headers: {},
        originalUrl: '/documents/doc-123/binary?caseId=case-123',
        query: { caseId: 'case-123' },
        url: '/doc-123/binary?caseId=case-123',
      };
      const response = {
        status: sandbox.stub().returnsThis(),
        send: sandbox.stub(),
      };
      const next = sandbox.stub();

      await validateLegacyDocumentAccess(request as any, response, next);

      expect(response.status).to.have.been.calledWith(403);
      expect(response.send).to.have.been.calledWith({ message: 'Forbidden' });
      expect(next).to.not.have.been.called;
    });
  });
});
