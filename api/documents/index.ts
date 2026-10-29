import axios from 'axios';
import { getConfigValue } from '../configuration';
import {
  DOCUMENT_UPLOAD_THROTTLE_INITIAL_MS,
  DOCUMENT_UPLOAD_THROTTLE_MAX_MS,
  SERVICES_CCD_DATA_STORE_API_PATH,
} from '../configuration/references';
import { EnhancedRequest } from '../lib/models';

// Time configuration
const INITIAL_TIMEOUT_PERIOD = getConfigValue<number>(DOCUMENT_UPLOAD_THROTTLE_INITIAL_MS);
const MAX_TIMEOUT_PERIOD = getConfigValue<number>(DOCUMENT_UPLOAD_THROTTLE_MAX_MS);

const LEGACY_BINARY_DOCUMENT_PATH = /^\/documents\/[^/]+\/binary\/?$/;
const LEGACY_BINARY_DOCUMENT_PATH_WITH_ID = /^\/documents\/([^/]+)\/binary\/?$/;
const LEGACY_HTML_CSP = [
  "default-src 'none'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'none'",
  "connect-src 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'none'",
  "media-src 'self' data: blob:",
].join('; ');

const LEGACY_CSP_HEADERS_TO_REMOVE = ['Content-Security-Policy-Report-Only', 'X-Content-Security-Policy', 'X-WebKit-CSP'];

function getRequestPath(req): string {
  const requestUrl =
    typeof req?.originalUrl === 'string'
      ? req.originalUrl
      : `${typeof req?.baseUrl === 'string' ? req.baseUrl : ''}${typeof req?.url === 'string' ? req.url : ''}`;
  return requestUrl.split('?')[0];
}

function extractLegacyDocumentId(req): string | null {
  const match = getRequestPath(req).match(LEGACY_BINARY_DOCUMENT_PATH_WITH_ID);
  return match ? decodeURIComponent(match[1]) : null;
}

function getQueryValue(value: unknown): string | null {
  if (Array.isArray(value)) {
    return typeof value[0] === 'string' ? value[0] : null;
  }
  return typeof value === 'string' && value.trim() ? value : null;
}

function getCaseIdFromReferrer(req: EnhancedRequest): string | null {
  const referrer = req.headers?.referer || req.headers?.referrer;
  if (typeof referrer !== 'string') {
    return null;
  }

  try {
    const parsedReferrer = new URL(referrer, `${req.protocol}://${req.headers?.host}`);
    if (parsedReferrer.host !== req.headers?.host) {
      return null;
    }

    // Direct legacy HTML document opens do not pass through the media viewer, so use only same-origin case pages as fallback context.
    const match = parsedReferrer.pathname.match(/\/cases\/case-details\/[^/]+\/[^/]+\/([^/]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

function getValidationHeaders(req: EnhancedRequest): Record<string, string> {
  const headers: Record<string, string> = {};
  const sourceHeaders = req.headers || {};
  const forwardHeader = (targetName: string, ...sourceNames: string[]) => {
    const value = sourceNames
      .map((sourceName) => sourceHeaders[sourceName])
      .find((headerValue) => typeof headerValue === 'string');
    if (typeof value === 'string') {
      headers[targetName] = value;
    }
  };

  forwardHeader('accept', 'accept');
  forwardHeader('Authorization', 'authorization', 'Authorization');
  forwardHeader('ServiceAuthorization', 'serviceauthorization', 'ServiceAuthorization');
  forwardHeader('experimental', 'experimental');
  forwardHeader('user-roles', 'user-roles');

  return headers;
}

function removeAuthorisationQueryParams(req): void {
  const queryIndex = req.url?.indexOf('?');
  if (queryIndex < 0) {
    return;
  }

  const path = req.url.substring(0, queryIndex);
  const searchParams = new URLSearchParams(req.url.substring(queryIndex + 1));
  // The case id is for XUI's server-side check only; legacy document store should still receive the original binary path.
  searchParams.delete('caseId');
  searchParams.delete('case_id');
  searchParams.delete('caseReference');

  const query = searchParams.toString();
  req.url = query ? `${path}?${query}` : path;
}

function findDocumentBinaryUrl(node: unknown, documentId: string): boolean {
  if (!node || typeof node !== 'object') {
    return false;
  }

  const value = node as Record<string, unknown>;
  const documentBinaryUrl = value.document_binary_url;
  if (typeof documentBinaryUrl === 'string' && getDocumentIdFromBinaryUrl(documentBinaryUrl) === documentId) {
    return true;
  }

  return Object.values(value).some((child) => {
    if (Array.isArray(child)) {
      return child.some((item) => findDocumentBinaryUrl(item, documentId));
    }
    return findDocumentBinaryUrl(child, documentId);
  });
}

function getDocumentIdFromBinaryUrl(documentBinaryUrl: string): string | null {
  try {
    const path = documentBinaryUrl.startsWith('http') ? new URL(documentBinaryUrl).pathname : documentBinaryUrl.split('?')[0];
    const match = path.match(/\/documents\/([^/]+)\/binary\/?$/);
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

function isTextHtmlResponse(proxyRes): boolean {
  const rawContentType = proxyRes?.headers?.['content-type'] ?? proxyRes?.headers?.['Content-Type'];
  const contentType = Array.isArray(rawContentType) ? rawContentType[0] : rawContentType;
  return typeof contentType === 'string' && contentType.toLowerCase().startsWith('text/html');
}

function isLegacyBinaryDocumentRequest(req): boolean {
  return LEGACY_BINARY_DOCUMENT_PATH.test(getRequestPath(req));
}

function applyLegacyHtmlCsp(res): void {
  if (typeof res?.setHeader !== 'function') {
    return;
  }

  res.setHeader('Content-Security-Policy', LEGACY_HTML_CSP);

  if (typeof res?.removeHeader === 'function') {
    LEGACY_CSP_HEADERS_TO_REMOVE.forEach((headerName) => res.removeHeader(headerName));
  }
}

// Handle requests being sent to the target server
// @typescript-eslint/no-unused-vars
export function handleRequest(proxyReq, req, res) {
  if (req?.headers?.cookie) {
    delete req.headers.cookie;
  }

  if (req.method === 'POST') {
    const defaultTimeoutPeriod = INITIAL_TIMEOUT_PERIOD;

    req.session.isRequestRateLimited = false;

    // Try to retrieve the next timeout period from the session
    const nextTimeout = req.session.nextTimeout;

    // If there is no timeout period in the session, set it to the default
    const timeoutPeriod = nextTimeout || defaultTimeoutPeriod;

    // Check if the last document upload was completed within the timeout period
    const lastUploadTime = req.session.lastUploadTime || 0;
    const elapsedTime = Date.now() - lastUploadTime;

    if (elapsedTime < timeoutPeriod) {
      req.session.isRequestRateLimited = true;
      res.status(429).send({ message: 'Too many requests' });
      return false;
    }
  }
  return true;
}

export async function validateLegacyDocumentAccess(req: EnhancedRequest, res, next): Promise<void> {
  if (req.method !== 'GET' || !isLegacyBinaryDocumentRequest(req)) {
    next();
    return;
  }

  const documentId = extractLegacyDocumentId(req);
  const caseId =
    getQueryValue(req.query?.caseId) ||
    getQueryValue(req.query?.case_id) ||
    getQueryValue(req.query?.caseReference) ||
    getCaseIdFromReferrer(req);

  if (!documentId || !caseId) {
    res.status(403).send({ message: 'Forbidden' });
    return;
  }

  try {
    const path = `${getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH)}/categoriesAndDocuments/${encodeURIComponent(caseId)}`;
    const response = await axios.get(path, { headers: getValidationHeaders(req) });

    // CCD enforces case access for this user; the returned tree is then used to prove the requested document belongs to that case.
    if (!findDocumentBinaryUrl(response.data, documentId)) {
      res.status(403).send({ message: 'Forbidden' });
      return;
    }

    removeAuthorisationQueryParams(req);
    next();
  } catch (error) {
    res.status(error?.response?.status === 404 ? 404 : 403).send({ message: 'Forbidden' });
  }
}

// Handle responses being sent back to the client

export function handleResponse(proxyRes, req, res) {
  if (isLegacyBinaryDocumentRequest(req) && isTextHtmlResponse(proxyRes)) {
    applyLegacyHtmlCsp(res);
  }

  if (req.method === 'POST') {
    // Current time stored as the last time a document upload was completed
    req.session.lastUploadTime = Date.now();

    // Double the timeout period up to the maximum, if rate-limited
    if (req.session.isRequestRateLimited) {
      const nextTimeout = (req.session.nextTimeout || INITIAL_TIMEOUT_PERIOD) * 2;
      req.session.nextTimeout = Math.min(nextTimeout, MAX_TIMEOUT_PERIOD);
    } else {
      delete req.session.nextTimeout;
    }
  }
}
