import type { Page } from '@playwright/test';
import config from '../config.utils.js';
import { acceptAccessCookiesIfPresent } from '../../../common/sessionCapture.js';

type UploadDocumentViaApiOptions = {
  page: Page;
  jurisdictionId: string;
  caseTypeId: string;
  fileName: string;
  mimeType: string;
  fileContent: string;
  classification?: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED';
};

type DocumentsV2Response = {
  documents?: Array<{
    originalDocumentName?: string;
    hashToken?: string;
    _links?: {
      self?: { href?: string };
      binary?: { href?: string };
    };
  }>;
};

export type CcdDocumentValue = {
  document_url: string;
  document_binary_url: string;
  document_filename: string;
  document_hash?: string;
};

const XSRF_COOKIE_WAIT_TIMEOUT_MS = 5000;
const XSRF_COOKIE_WAIT_INTERVAL_MS = 250;
const XSRF_COOKIE_AUTH_TOUCH_INTERVAL_ATTEMPTS = 4;
const XSRF_COOKIE_MAX_AUTH_TOUCH_ATTEMPTS = 2;

async function touchAuthEndpointsToMintXsrf(page: Page, baseUrl: string): Promise<void> {
  const requestContext = page.request;
  const authLoginUrl = new URL('/auth/login', baseUrl).toString();
  const authCheckUrl = new URL('/auth/isAuthenticated', baseUrl).toString();
  const appRootUrl = new URL('/', baseUrl).toString();

  await requestContext.get(authLoginUrl, { failOnStatusCode: false }).catch(() => undefined);
  await requestContext.get(authCheckUrl, { failOnStatusCode: false }).catch(() => undefined);
  await requestContext.get(appRootUrl, { failOnStatusCode: false }).catch(() => undefined);
}

async function waitForXsrfToken(page: Page, baseUrl: string): Promise<string> {
  const deadline = Date.now() + XSRF_COOKIE_WAIT_TIMEOUT_MS;
  let pollAttempts = 0;
  let authTouchAttempts = 0;

  while (Date.now() <= deadline) {
    await acceptAccessCookiesIfPresent(page);
    const cookies = await page
      .context()
      .cookies(baseUrl)
      .catch(() => []);
    const xsrf = cookies.find((cookie) => cookie.name === 'XSRF-TOKEN')?.value?.trim();
    if (xsrf) {
      return xsrf;
    }
    pollAttempts += 1;
    if (
      authTouchAttempts < XSRF_COOKIE_MAX_AUTH_TOUCH_ATTEMPTS &&
      pollAttempts % XSRF_COOKIE_AUTH_TOUCH_INTERVAL_ATTEMPTS === 0
    ) {
      authTouchAttempts += 1;
      await touchAuthEndpointsToMintXsrf(page, baseUrl);
      continue;
    }
    await page.waitForTimeout(XSRF_COOKIE_WAIT_INTERVAL_MS);
  }

  throw new Error(`Document upload setup failed: XSRF-TOKEN cookie was not available within ${XSRF_COOKIE_WAIT_TIMEOUT_MS}ms`);
}

export async function uploadDocumentViaApi(options: UploadDocumentViaApiOptions): Promise<CcdDocumentValue> {
  const baseUrl = config.urls.baseURL ?? config.urls.exuiDefaultUrl;
  const xsrf = await waitForXsrfToken(options.page, baseUrl);
  const headers = { 'X-XSRF-TOKEN': xsrf };
  const response = await options.page.request.post(new URL('/documentsv2', baseUrl).toString(), {
    multipart: {
      classification: options.classification ?? 'PUBLIC',
      jurisdictionId: options.jurisdictionId,
      caseTypeId: options.caseTypeId,
      files: {
        name: options.fileName,
        mimeType: options.mimeType,
        buffer: Buffer.from(options.fileContent),
      },
    },
    headers,
    failOnStatusCode: false,
  });

  const bodyText = await response.text();
  if (!response.ok()) {
    throw new Error(`Document upload API failed with HTTP ${response.status()}: ${bodyText.slice(0, 500)}`);
  }

  const payload = JSON.parse(bodyText) as DocumentsV2Response;
  const uploaded = payload.documents?.[0];
  const documentUrl = uploaded?._links?.self?.href?.trim();
  const documentBinaryUrl = uploaded?._links?.binary?.href?.trim();
  const documentFilename = uploaded?.originalDocumentName?.trim();

  if (!documentUrl || !documentBinaryUrl || !documentFilename) {
    throw new Error(`Document upload API response missing CCD document fields: ${bodyText.slice(0, 500)}`);
  }

  return {
    document_url: documentUrl,
    document_binary_url: documentBinaryUrl,
    document_filename: documentFilename,
    ...(uploaded?.hashToken ? { document_hash: uploaded.hashToken } : {}),
  };
}
