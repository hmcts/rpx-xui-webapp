import axios from 'axios';
import { expect, use } from 'chai';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { getConfigValue } from '../configuration';
import { DOCUMENT_UPLOAD_THROTTLE_INITIAL_MS, SERVICES_DOCUMENTS_API_PATH } from '../configuration/references';
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
    const initialPeriod = getConfigValue<number>(DOCUMENT_UPLOAD_THROTTLE_INITIAL_MS);

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
    for (const method of ['PATCH', 'PUT', 'DELETE']) {
      it(`should reject unsupported legacy ${method} mutations before proxying`, async () => {
        const get = sandbox.stub(axios, 'get');
        const response = { status: sandbox.stub().returnsThis(), send: sandbox.stub(), setHeader: sandbox.stub() };
        const next = sandbox.stub();

        await validateLegacyDocumentAccess({ method, originalUrl: '/documents' } as any, response, next);

        expect(response.status).to.have.been.calledWith(405);
        expect(response.setHeader).to.have.been.calledWith('Allow', 'GET, HEAD, POST');
        expect(next).not.to.have.been.called;
        expect(get).not.to.have.been.called;
      });
    }

    it('should not expose legacy version uploads through the browser proxy', async () => {
      const response = { status: sandbox.stub().returnsThis(), send: sandbox.stub(), setHeader: sandbox.stub() };
      const next = sandbox.stub();
      await validateLegacyDocumentAccess({ method: 'POST', originalUrl: '/documents/doc-123' } as any, response, next);
      expect(response.status).to.have.been.calledWith(405);
      expect(next).not.to.have.been.called;
    });

    for (const path of [
      '/documents/doc-123/%62inary',
      '/documents/doc-123/%2562inary',
      '/documents/doc-123/binary;download',
      '/documents/%/binary',
      '/documents/doc-123\\binary',
      '/documents//doc-123/binary',
      '/documents/other/../doc-123/binary',
      '/documents/./doc-123/binary',
      '/Documents/doc-123/binary',
    ]) {
      it(`should reject unsupported legacy read path ${path} before proxying`, async () => {
        const getStub = sandbox.stub(axios, 'get');
        const response = { status: sandbox.stub().returnsThis(), send: sandbox.stub() };
        const next = sandbox.stub();

        await validateLegacyDocumentAccess({ method: 'GET', originalUrl: path } as any, response, next);

        expect(response.status).to.have.been.calledWith(400);
        expect(next).to.not.have.been.called;
        expect(getStub).to.not.have.been.called;
      });
    }

    for (const scenario of ['valid GET', 'valid HEAD', 'wrong parent', 'missing parent', 'metadata denied']) {
      it(`should verify the authoritative version parent: ${scenario}`, async () => {
        const getStub = sandbox.stub(axios, 'get');
        getStub.onFirstCall().resolves({
          data: { documents: [{ document_binary_url: '/documents/doc-123/versions/version-123/binary' }] },
        });
        if (scenario === 'metadata denied') {
          getStub.onSecondCall().rejects({ response: { status: 403 } });
        } else {
          getStub.onSecondCall().resolves({
            data:
              scenario === 'missing parent'
                ? {}
                : {
                    _links: {
                      document: { href: `http://dm-store/documents/${scenario === 'wrong parent' ? 'other-doc' : 'doc-123'}` },
                    },
                  },
          });
        }
        const request = {
          method: scenario === 'valid HEAD' ? 'HEAD' : 'GET',
          originalUrl: '/documents/doc-123/versions/version-123/binary?caseId=case-123',
          url: '/doc-123/versions/version-123/binary?caseId=case-123',
          query: { caseId: 'case-123' },
          headers: {},
        };
        const response = { status: sandbox.stub().returnsThis(), send: sandbox.stub() };
        const next = sandbox.stub();

        await validateLegacyDocumentAccess(request as any, response, next);

        expect(getStub).to.have.been.calledTwice;
        expect(getStub.secondCall.args[0]).to.equal(
          `${getConfigValue(SERVICES_DOCUMENTS_API_PATH)}/documents/doc-123/versions/version-123`
        );
        if (scenario.startsWith('valid')) {
          expect(next).to.have.been.calledOnce;
          expect(request.url).to.equal('/doc-123/versions/version-123/binary');
          const cspResponse = { setHeader: sandbox.stub(), removeHeader: sandbox.stub() };
          handleResponse({ headers: { 'content-type': 'text/html' } }, request, cspResponse);
          expect(cspResponse.setHeader).to.have.been.calledWith('Content-Security-Policy', sinon.match("script-src 'none'"));
        } else {
          expect(response.status).to.have.been.calledWith(403);
          expect(next).to.not.have.been.called;
        }
      });
    }

    for (const allowed of [true, false]) {
      it(`should ${allowed ? 'allow' : 'deny'} HEAD using the same case membership check as GET`, async () => {
        const getStub = sandbox.stub(axios, 'get').resolves({
          data: { documents: [{ document_binary_url: `/documents/${allowed ? 'doc-123' : 'other-doc'}/binary` }] },
        });
        const request = {
          method: 'HEAD',
          originalUrl: '/documents/doc-123/binary?caseId=case-123&name=a%20b',
          url: '/doc-123/binary?caseId=case-123&name=a%20b',
          query: { caseId: 'case-123' },
          headers: {},
        };
        const response = { status: sandbox.stub().returnsThis(), send: sandbox.stub() };
        const next = sandbox.stub();

        await validateLegacyDocumentAccess(request as any, response, next);

        expect(getStub).to.have.been.calledOnce;
        if (allowed) {
          expect(next).to.have.been.calledOnce;
          expect(request.url).to.equal('/doc-123/binary?name=a+b');
        } else {
          expect(response.status).to.have.been.calledWith(403);
          expect(next).to.not.have.been.called;
        }
      });
    }

    it('should not look up version metadata when CCD denies case access', async () => {
      const getStub = sandbox.stub(axios, 'get').rejects({ response: { status: 403 } });
      const response = { status: sandbox.stub().returnsThis(), send: sandbox.stub() };
      const next = sandbox.stub();

      await validateLegacyDocumentAccess(
        {
          method: 'HEAD',
          originalUrl: '/documents/doc-123/versions/version-123/binary?caseId=case-123',
          query: { caseId: 'case-123' },
          headers: {},
        } as any,
        response,
        next
      );

      expect(getStub).to.have.been.calledOnce;
      expect(response.status).to.have.been.calledWith(403);
      expect(next).to.not.have.been.called;
    });

    for (const method of ['GET', 'HEAD']) {
      for (const suffix of ['', '/versions', '/versions/version-123', '/auditEntries']) {
        it(`should reject controlled legacy metadata ${method} ${suffix || 'document'}`, async () => {
          const getStub = sandbox.stub(axios, 'get');
          if (suffix === '/versions/version-123') {
            getStub.onFirstCall().resolves({
              data: { _links: { document: { href: 'http://dm-store/documents/doc-123' } } },
            });
            getStub.onSecondCall().resolves({ data: { metadata: { pending_access_controlled: 'true' } } });
          } else {
            getStub.resolves({ data: { metadata: { pending_access_controlled: 'true' } } });
          }
          const response = { status: sandbox.stub().returnsThis(), send: sandbox.stub() };
          const next = sandbox.stub();
          await validateLegacyDocumentAccess(
            {
              method,
              originalUrl: `/documents/doc-123${suffix}?pendingAccess=false`,
            } as any,
            response,
            next
          );
          expect(response.status).to.have.been.calledWith(403);
          expect(next).to.not.have.been.called;
        });

        it(`should preserve unmarked historical metadata ${method} ${suffix || 'document'}`, async () => {
          const getStub = sandbox.stub(axios, 'get');
          if (suffix === '/versions/version-123') {
            getStub.onFirstCall().resolves({
              data: { _links: { document: { href: 'http://dm-store/documents/doc-123' } } },
            });
            getStub.onSecondCall().resolves({ data: { metadata: {} } });
          } else {
            getStub.resolves({ data: { metadata: {} } });
          }
          const response = { status: sandbox.stub().returnsThis(), send: sandbox.stub() };
          const next = sandbox.stub();
          await validateLegacyDocumentAccess({ method, originalUrl: `/documents/doc-123${suffix}` } as any, response, next);
          expect(next).to.have.been.calledOnce;
          expect(response.status).to.not.have.been.called;
          expect(getStub.lastCall.args[0]).to.equal(`${getConfigValue(SERVICES_DOCUMENTS_API_PATH)}/documents/doc-123`);
        });
      }
    }

    it('should classify version metadata by its actual parent using only the configured DM origin', async () => {
      const getStub = sandbox.stub(axios, 'get');
      getStub.onFirstCall().resolves({
        data: { _links: { document: { href: 'https://untrusted.example/documents/actual-parent' } } },
      });
      getStub.onSecondCall().resolves({ data: { metadata: { pending_access_controlled: 'true' } } });
      const response = { status: sandbox.stub().returnsThis(), send: sandbox.stub() };
      const next = sandbox.stub();
      await validateLegacyDocumentAccess(
        {
          method: 'GET',
          originalUrl: '/documents/wrong-parent/versions/version-123',
        } as any,
        response,
        next
      );
      expect(response.status).to.have.been.calledWith(403);
      expect(next).to.not.have.been.called;
      expect(getStub.secondCall.args[0]).to.equal(`${getConfigValue(SERVICES_DOCUMENTS_API_PATH)}/documents/actual-parent`);
    });

    for (const path of [
      '/documents',
      '/documents/doc-123/metadata',
      '/documents/doc-123/unknown',
      '/documents/doc-123/versions/version-123/auditEntries',
    ]) {
      it(`should reject unknown legacy metadata routes ${path}`, async () => {
        const getStub = sandbox.stub(axios, 'get');
        const response = { status: sandbox.stub().returnsThis(), send: sandbox.stub() };
        const next = sandbox.stub();
        await validateLegacyDocumentAccess({ method: 'GET', originalUrl: path } as any, response, next);
        expect(response.status).to.have.been.calledWith(400);
        expect(next).to.not.have.been.called;
        expect(getStub).to.not.have.been.called;
      });
    }

    for (const scenario of ['missing parent', 'encoded parent', 'lookup denied', 'lookup missing', 'invalid metadata']) {
      it(`should fail closed when legacy metadata classification fails: ${scenario}`, async () => {
        const getStub = sandbox.stub(axios, 'get');
        let path = '/documents/doc-123';
        if (scenario === 'missing parent' || scenario === 'encoded parent') {
          path += '/versions/version-123';
          getStub.resolves({
            data: { _links: { document: { href: scenario === 'encoded parent' ? '/documents/%64oc-123' : undefined } } },
          });
        } else if (scenario === 'invalid metadata') {
          getStub.resolves({ data: '<html>not document metadata</html>' });
        } else {
          getStub.rejects({ response: { status: scenario === 'lookup missing' ? 404 : 403 } });
        }
        const response = { status: sandbox.stub().returnsThis(), send: sandbox.stub() };
        const next = sandbox.stub();
        await validateLegacyDocumentAccess({ method: 'GET', originalUrl: path } as any, response, next);
        expect(response.status).to.have.been.calledWith(scenario === 'lookup missing' ? 404 : 403);
        expect(next).to.not.have.been.called;
        expect(getStub).to.have.been.calledOnce;
      });
    }

    it('should preserve root uploads and CDAM neighbours without legacy classification', async () => {
      const getStub = sandbox.stub(axios, 'get');
      for (const [method, originalUrl] of [
        ['POST', '/documents'],
        ['GET', '/documentsv2/doc-123/binary'],
      ]) {
        const next = sandbox.stub();
        const response = { status: sandbox.stub().returnsThis(), send: sandbox.stub() };
        await validateLegacyDocumentAccess({ method, originalUrl } as any, response, next);
        expect(next, `${method} ${originalUrl}`).to.have.been.calledOnce;
        expect(response.status).to.not.have.been.called;
      }
      expect(getStub).to.not.have.been.called;
    });

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
