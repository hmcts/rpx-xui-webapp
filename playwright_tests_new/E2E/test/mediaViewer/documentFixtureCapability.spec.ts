import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test, expect } from '../../fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { createCaseBoundDocument, documentXsrfHeaders } from '../../utils/test-setup/documentAccessFixtures';

const content = readFileSync(
  path.resolve('playwright_tests_new/integration/testData/documents/case-file-view-document-delivery.pdf')
);

test.describe('Document fixture capability', { tag: ['@e2e', '@e2e-media-viewer', '@nightly'] }, () => {
  test.describe.configure({ timeout: 5 * 60_000 });

  for (const gateway of ['legacy', 'v2'] as const) {
    test(`${gateway} upload is saved on a case and delivers the known PDF`, async ({
      page,
      createCasePage,
      caseDetailsPage,
      identityLease,
    }, testInfo) => {
      const lease = await identityLease.acquire({ pool: 'DIVORCE_SOLICITOR' });
      await applySessionCookies(page, lease.identity.userIdentifier);
      const document = await createCaseBoundDocument({
        page,
        createCasePage,
        caseDetailsPage,
        testInfo,
        gateway,
        fileName: `document-capability-${gateway}-${Date.now()}-${testInfo.workerIndex}.pdf`,
        mimeType: 'application/pdf',
        content,
      });
      expect(document.savedDocument).toMatchObject({
        document_url: document.document.document_url,
        document_binary_url: document.document.document_binary_url,
        document_filename: document.document.document_filename,
      });
      const response = await page.request.get(document.binaryPath, {
        headers: await documentXsrfHeaders(page),
        failOnStatusCode: false,
        maxRedirects: 0,
      });
      const url = new URL(response.url());
      expect(url.pathname).toBe(`/${gateway === 'legacy' ? 'documents' : 'documentsv2'}/${document.documentId}/binary`);
      expect(url.searchParams.get('caseId')).toBe(document.caseId);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']?.split(';')[0].trim()).toBe('application/pdf');
      expect(await response.body()).toEqual(content);
      await testInfo.attach('document-fixture-capability', {
        body: JSON.stringify({
          gateway,
          jurisdiction: document.jurisdictionId,
          caseType: document.caseTypeId,
          event: 'createCase',
          field: 'DocumentUrl',
          identity: 'U1',
          savedMembership: true,
          status: response.status(),
          byteLength: content.length,
        }),
        contentType: 'application/json',
      });
    });
  }
});
