// Time configuration
const INITIAL_TIMEOUT_PERIOD = 5000; // 5 seconds
const MAX_TIMEOUT_PERIOD = 180000; // 180 seconds

const LEGACY_BINARY_DOCUMENT_PATH = /^\/documents\/[^/]+\/binary\/?$/;
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

function isTextHtmlResponse(proxyRes): boolean {
  const rawContentType = proxyRes?.headers?.['content-type'] ?? proxyRes?.headers?.['Content-Type'];
  const contentType = Array.isArray(rawContentType) ? rawContentType[0] : rawContentType;
  return typeof contentType === 'string' && contentType.toLowerCase().startsWith('text/html');
}

function isLegacyBinaryDocumentRequest(req): boolean {
  const requestUrl =
    typeof req?.originalUrl === 'string'
      ? req.originalUrl
      : `${typeof req?.baseUrl === 'string' ? req.baseUrl : ''}${typeof req?.url === 'string' ? req.url : ''}`;
  const pathOnly = requestUrl.split('?')[0];
  return LEGACY_BINARY_DOCUMENT_PATH.test(pathOnly);
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

// Handle responses being sent back to the client
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
