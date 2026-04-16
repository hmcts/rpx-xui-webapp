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

function resolvePositiveIntegerEnv(name: string, fallback: number): number {
  const configured = Number(process.env[name]);
  return Number.isFinite(configured) && configured > 0 ? configured : fallback;
}

const XSRF_COOKIE_WAIT_TIMEOUT_MS = resolvePositiveIntegerEnv('PW_UPLOAD_DOCUMENT_XSRF_TIMEOUT_MS', 20_000);
const XSRF_COOKIE_WAIT_INTERVAL_MS = 250;
const XSRF_COOKIE_AUTH_TOUCH_INTERVAL_ATTEMPTS = 4;
const XSRF_COOKIE_MAX_AUTH_TOUCH_ATTEMPTS = 3;

function currentPageUrl(page: Page): string {
  try {
    return typeof page.url === 'function' ? page.url() : 'unknown';
  } catch {
    return 'unknown';
  }
}

function resolveAppBaseUrl(page: Page): string {
  const pageUrl = currentPageUrl(page);

  if (pageUrl && pageUrl !== 'unknown' && pageUrl !== 'about:blank') {
    try {
      return new URL(pageUrl).origin;
    } catch {
      // Fall through to configured URLs when the current page URL is malformed.
    }
  }

  const configuredBaseUrl =
    process.env.TEST_URL?.trim() || process.env.EXUI_BASE_URL?.trim() || config.urls.baseURL || config.urls.exuiDefaultUrl;

  return new URL(configuredBaseUrl).origin;
}

type BrowserFetchResult = {
  ok: boolean;
  status: number;
  bodyText: string;
};

async function runBrowserFetchText(
  page: Page,
  params:
    | {
        url: string;
        method: 'GET';
      }
    | {
        url: string;
        method: 'POST';
        headers: Record<string, string>;
        multipart: {
          classification: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED';
          jurisdictionId: string;
          caseTypeId: string;
          fileName: string;
          mimeType: string;
          fileContentBase64: string;
        };
      }
): Promise<BrowserFetchResult> {
  return page.evaluate(async (request) => {
    if (request.method === 'GET') {
      const response = await fetch(request.url, {
        method: 'GET',
        credentials: 'same-origin',
      });
      return {
        ok: response.ok,
        status: response.status,
        bodyText: await response.text(),
      };
    }

    const binary = Uint8Array.from(atob(request.multipart.fileContentBase64), (character) => character.charCodeAt(0));
    const formData = new FormData();
    formData.append('classification', request.multipart.classification);
    formData.append('jurisdictionId', request.multipart.jurisdictionId);
    formData.append('caseTypeId', request.multipart.caseTypeId);
    formData.append('files', new File([binary], request.multipart.fileName, { type: request.multipart.mimeType }));

    const response = await fetch(request.url, {
      method: 'POST',
      body: formData,
      headers: request.headers,
      credentials: 'same-origin',
    });
    return {
      ok: response.ok,
      status: response.status,
      bodyText: await response.text(),
    };
  }, params);
}

async function touchAuthEndpointsToMintXsrf(page: Page, baseUrl: string): Promise<void> {
  const authLoginUrl = new URL('/auth/login', baseUrl).toString();
  const authCheckUrl = new URL('/auth/isAuthenticated', baseUrl).toString();
  const appRootUrl = new URL('/', baseUrl).toString();

  await runBrowserFetchText(page, { url: authLoginUrl, method: 'GET' }).catch(() => undefined);
  await runBrowserFetchText(page, { url: authCheckUrl, method: 'GET' }).catch(() => undefined);
  await runBrowserFetchText(page, { url: appRootUrl, method: 'GET' }).catch(() => undefined);
}

async function navigateShellToMintXsrf(page: Page, baseUrl: string): Promise<void> {
  const pageUrl = currentPageUrl(page);
  const navigationTarget = pageUrl.startsWith(baseUrl) && pageUrl !== 'about:blank' ? pageUrl : new URL('/', baseUrl).toString();

  await page.goto(navigationTarget, { waitUntil: 'domcontentloaded' }).catch(() => undefined);
  await acceptAccessCookiesIfPresent(page);
  await runBrowserFetchText(page, { url: new URL('/auth/isAuthenticated', baseUrl).toString(), method: 'GET' }).catch(
    () => undefined
  );
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
      await navigateShellToMintXsrf(page, baseUrl);
      continue;
    }
    await page.waitForTimeout(XSRF_COOKIE_WAIT_INTERVAL_MS);
  }

  const cookieNames = await page
    .context()
    .cookies()
    .then((cookies) => cookies.map((cookie) => cookie.name).filter(Boolean))
    .catch(() => []);
  throw new Error(
    `Document upload setup failed: XSRF-TOKEN cookie was not available within ${XSRF_COOKIE_WAIT_TIMEOUT_MS}ms (url=${currentPageUrl(
      page
    )}, cookies=${cookieNames.join(',') || 'none'})`
  );
}

export async function uploadDocumentViaApi(options: UploadDocumentViaApiOptions): Promise<CcdDocumentValue> {
  const baseUrl = resolveAppBaseUrl(options.page);
  const xsrf = await waitForXsrfToken(options.page, baseUrl);
  const headers = { 'X-XSRF-TOKEN': xsrf };
  const response = await runBrowserFetchText(options.page, {
    url: new URL('/documentsv2', baseUrl).toString(),
    method: 'POST',
    headers,
    multipart: {
      classification: options.classification ?? 'PUBLIC',
      jurisdictionId: options.jurisdictionId,
      caseTypeId: options.caseTypeId,
      fileName: options.fileName,
      mimeType: options.mimeType,
      fileContentBase64: Buffer.from(options.fileContent).toString('base64'),
    },
  });

  if (!response.ok) {
    throw new Error(`Document upload API failed with HTTP ${response.status}: ${response.bodyText.slice(0, 500)}`);
  }

  const payload = JSON.parse(response.bodyText) as DocumentsV2Response;
  const uploaded = payload.documents?.[0];
  const documentUrl = uploaded?._links?.self?.href?.trim();
  const documentBinaryUrl = uploaded?._links?.binary?.href?.trim();
  const documentFilename = uploaded?.originalDocumentName?.trim();

  if (!documentUrl || !documentBinaryUrl || !documentFilename) {
    throw new Error(`Document upload API response missing CCD document fields: ${response.bodyText.slice(0, 500)}`);
  }

  return {
    document_url: documentUrl,
    document_binary_url: documentBinaryUrl,
    document_filename: documentFilename,
    ...(uploaded?.hashToken ? { document_hash: uploaded.hashToken } : {}),
  };
}
