import { faker } from '@faker-js/faker';
import { Page, Response } from '@playwright/test';
import { expect, test } from '../../fixtures';
import { acceptAccessCookiesIfPresent, applySessionCookies, ensureSession } from '../../../common/sessionCapture';
import { CaseFileViewPage } from '../../page-objects/pages/exui/caseFileView.po';
import { buildCasePayloadFromTemplate } from '../../utils/test-setup/payloads/registry';
import { setupCaseForJourney } from '../../utils/test-setup/caseSetup';
import { uploadDocumentViaApi } from '../../utils/test-setup/uploadDocumentViaApi';
import { RuntimeUserAlias } from '../../utils/runtimeUserCredentials';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const JURISDICTION = 'DIVORCE';
const CASE_TYPE = 'xuiTestCaseType';
const MEDIA_VIEWER_ROUTE_PATTERN = /\/media-viewer(?:\?|$)/;
const DOCUMENT_BINARY_ROUTE_PATTERN = /\/documents(?:v2)?\/[^/]+\/binary$/;
const MEDIA_VIEWER_FIXTURE_PATH = path.resolve(
  process.cwd(),
  'playwright_tests_new/integration/testData/documents/case-file-view-document-delivery.pdf'
);
const MEDIA_VIEWER_FIXTURE_CONTENT = readFileSync(MEDIA_VIEWER_FIXTURE_PATH, 'latin1');
const MEDIA_VIEWER_TEST_TIMEOUT_MS = Number.parseInt(process.env.PW_MEDIA_VIEWER_TEST_TIMEOUT_MS ?? '', 10) || 180_000;
const SESSION_BOOTSTRAP_TIMEOUT_MS =
  Number.parseInt(process.env.PW_MEDIA_VIEWER_SESSION_BOOTSTRAP_TIMEOUT_MS ?? '', 10) || 300_000;
const DOCUMENT_BINARY_WAIT_TIMEOUT_MS = 30_000;
const CRITICAL_BACKEND_ROUTE_PATTERNS = [
  DOCUMENT_BINARY_ROUTE_PATTERN,
  /\/data\/internal\/cases\/[^/]+$/,
  /\/aggregated\/caseworkers\/[^/]+\/jurisdictions(?:\/|$)/,
];

function isCriticalMediaViewerBackendResponse(response: Response): boolean {
  if (response.request().method() !== 'GET') {
    return false;
  }

  const pathname = new URL(response.url()).pathname;
  return CRITICAL_BACKEND_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname));
}

function recordCriticalBackendFailure(response: Response, blockingFailures: string[]): void {
  if (response.status() < 500 || !isCriticalMediaViewerBackendResponse(response)) {
    return;
  }

  const failure = `${response.status()} ${response.url()}`;
  if (!blockingFailures.includes(failure)) {
    blockingFailures.push(failure);
  }
}

function failIfCriticalBackendFailure(stage: string, blockingFailures: string[]): void {
  if (blockingFailures.length === 0) {
    return;
  }

  throw new Error(`Media Viewer ${stage} hit a downstream 5xx before the document could be opened: ${blockingFailures[0]}`);
}

async function waitForDocumentBinaryResponse(page: Page, binaryResponses: string[], blockingFailures: string[]): Promise<void> {
  const deadline = Date.now() + DOCUMENT_BINARY_WAIT_TIMEOUT_MS;

  while (Date.now() < deadline) {
    failIfCriticalBackendFailure('load', blockingFailures);

    if (binaryResponses.length > 0) {
      return;
    }

    await page.waitForTimeout(250);
  }

  throw new Error(
    `Media Viewer did not request the uploaded document binary within ${DOCUMENT_BINARY_WAIT_TIMEOUT_MS}ms. ` +
      `Observed blocking failures: ${blockingFailures.join(' | ') || 'none'}`
  );
}

test.describe('Media Viewer happy path', { tag: ['@e2e', '@e2e-media-viewer'] }, () => {
  test.describe.configure({ timeout: MEDIA_VIEWER_TEST_TIMEOUT_MS });

  test.beforeAll(async ({}, testInfo) => {
    testInfo.setTimeout(SESSION_BOOTSTRAP_TIMEOUT_MS);
    await ensureSession(RuntimeUserAlias.DIVORCE_SOLICITOR);
  });

  test('Opens uploaded document in the Media Viewer end-to-end', async ({ page, createCasePage, caseDetailsPage }, testInfo) => {
    faker.seed(testInfo.retry + 1);
    const uniqueSuffix = `${Date.now()}-w${testInfo.workerIndex}-r${testInfo.retry}`;
    const documentFileName = `media-viewer-${uniqueSuffix}.pdf`;
    const caseMarker = `media-viewer-${faker.string.alphanumeric(8)}-${uniqueSuffix}`;
    const binaryResponses: string[] = [];
    const blockingFailures: string[] = [];
    const onResponse = (response: Response) => {
      recordCriticalBackendFailure(response, blockingFailures);

      if (DOCUMENT_BINARY_ROUTE_PATTERN.test(new URL(response.url()).pathname)) {
        binaryResponses.push(response.url());
      }
    };
    let mediaPage: Page | undefined;

    page.context().on('response', onResponse);
    try {
      await test.step('Apply solicitor session and open the app shell', async () => {
        await applySessionCookies(page, RuntimeUserAlias.DIVORCE_SOLICITOR);
        await page.goto('/');
        await acceptAccessCookiesIfPresent(page);
        await expect(caseDetailsPage.exuiHeader.header).toBeVisible();
        failIfCriticalBackendFailure('app-shell setup', blockingFailures);
      });

      await test.step('Create a case with a document for this test run', async () => {
        const uploadedDocument = await uploadDocumentViaApi({
          page,
          jurisdictionId: JURISDICTION,
          caseTypeId: CASE_TYPE,
          fileName: documentFileName,
          mimeType: 'application/pdf',
          fileContent: MEDIA_VIEWER_FIXTURE_CONTENT,
        });

        await setupCaseForJourney({
          scenario: 'media-viewer-divorce',
          jurisdiction: JURISDICTION,
          caseType: CASE_TYPE,
          apiEventId: 'createCase',
          mode: 'api-required',
          apiPayload: buildCasePayloadFromTemplate('divorce.xui-test-case-type.create-case', {
            overrides: {
              TextField: caseMarker,
              DocumentUrl: uploadedDocument,
            },
          }),
          page,
          createCasePage,
          caseDetailsPage,
          testInfo,
        });
        failIfCriticalBackendFailure('case setup', blockingFailures);
      });

      await test.step('Open the uploaded document from the case details tab', async () => {
        await caseDetailsPage.waitForDocumentOneRowToContain(documentFileName);
        failIfCriticalBackendFailure('case-details setup', blockingFailures);
        await expect(caseDetailsPage.caseViewerTable).toBeVisible();
        await expect(caseDetailsPage.documentOneAction).toBeVisible();
      });

      await test.step('Validate the Media Viewer end-to-end happy path', async () => {
        mediaPage = await caseDetailsPage.openDocumentOneInMediaViewer();
        await mediaPage.waitForLoadState('domcontentloaded').catch(() => undefined);

        await waitForDocumentBinaryResponse(mediaPage, binaryResponses, blockingFailures);
        await expect.poll(() => binaryResponses.at(-1) ?? '').toMatch(DOCUMENT_BINARY_ROUTE_PATTERN);

        const resolvedMediaViewerPage = new CaseFileViewPage(mediaPage);
        await expect(mediaPage).toHaveURL(MEDIA_VIEWER_ROUTE_PATTERN);
        await expect.poll(async () => mediaPage.title()).toContain(`${documentFileName} - View Document`);
        await expect(resolvedMediaViewerPage.standaloneMediaViewerContainer).toBeVisible();
        await expect(resolvedMediaViewerPage.standaloneMediaViewerToolbar).toBeVisible();
        await expect(resolvedMediaViewerPage.standaloneMediaViewPanel).toBeVisible();
      });
    } finally {
      page.context().off('response', onResponse);
      if (mediaPage && !mediaPage.isClosed()) {
        if (mediaPage === page) {
          await mediaPage.goto('about:blank').catch(() => undefined);
        } else {
          await mediaPage.close().catch(() => undefined);
        }
      }
    }
  });
});
