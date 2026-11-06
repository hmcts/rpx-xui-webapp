import { readFileSync } from 'node:fs';
import path from 'node:path';
import { request, type BrowserContext, type Page } from '@playwright/test';
import { test, expect } from '../../fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { resolveSessionIdentity } from '../../../common/sessionIdentity';
import { acquireDocumentAccessIdentityPair } from '../../utils/test-setup/documentAccessIdentityPair';
import {
  documentXsrfHeaders,
  readDocumentCase,
  resolveDocumentUserId,
  revokeDocumentCase,
  shareDocumentCase,
  type CaseBoundDocument,
} from '../../utils/test-setup/documentAccessFixtures';
import { createPrlDocumentCase, documentAccessCaseStatuses } from '../../utils/test-setup/documentAccessMatrix';

const pdf = readFileSync(
  path.resolve('playwright_tests_new/integration/testData/documents/case-file-view-document-delivery.pdf')
);

test.describe('Legacy document authorization', { tag: ['@e2e', '@e2e-media-viewer', '@nightly'] }, () => {
  test.describe.configure({ mode: 'default', timeout: 10 * 60_000 });
  let secondContext: BrowserContext | undefined;
  let secondPage: Page;
  let caseA: CaseBoundDocument;
  let caseB: CaseBoundDocument;
  let deniedCaseStatus: number;
  let deniedCaseBStatus: number;
  let secondUserId: string;

  test.beforeEach(async ({ page, browser, baseURL, createCasePage, caseDetailsPage, identityLease }, testInfo) => {
    const [firstLease, secondLease] = await acquireDocumentAccessIdentityPair(identityLease);
    await applySessionCookies(page, resolveSessionIdentity(firstLease.identity.userIdentifier));
    secondContext = await browser.newContext({ baseURL });
    secondPage = await secondContext.newPage();
    await applySessionCookies(secondPage, resolveSessionIdentity(secondLease.identity.userIdentifier));
    const firstId = await resolveDocumentUserId(page.request);
    secondUserId = await resolveDocumentUserId(secondPage.request);
    expect(firstId, 'U1 and U2 must resolve to separate authenticated users').not.toBe(secondUserId);

    caseA = await createPrlDocumentCase({
      page,
      createCasePage,
      caseDetailsPage,
      testInfo,
      fileName: `access-A-${Date.now()}-${testInfo.workerIndex}.pdf`,
      mimeType: 'application/pdf',
      content: Buffer.concat([pdf, Buffer.from('\n% document access fixture A\n')]),
    });
    caseB = await createPrlDocumentCase({
      page,
      createCasePage,
      caseDetailsPage,
      testInfo,
      fileName: `access-B-${Date.now()}-${testInfo.workerIndex}.pdf`,
      mimeType: 'application/pdf',
      content: Buffer.concat([pdf, Buffer.from('\n% document access fixture B\n')]),
    });
    expect(caseA.caseId).not.toBe(caseB.caseId);
    expect(caseA.documentId).not.toBe(caseB.documentId);
    expect(await documentAccessCaseStatuses(page, caseA.caseId, caseB.caseId)).toEqual({ a: 200, b: 200 });
    const deniedA = await readDocumentCase(secondPage.request, caseA.caseId);
    const deniedB = await readDocumentCase(secondPage.request, caseB.caseId);
    deniedCaseStatus = deniedA.status();
    deniedCaseBStatus = deniedB.status();
    // CCD may conceal an inaccessible case with 404; the binary middleware preserves that status.
    expect([403, 404]).toContain(deniedCaseStatus);
    expect([403, 404]).toContain(deniedCaseBStatus);
    expect(await deniedA.text()).not.toContain(caseA.document.document_url);
    expect(await deniedB.text()).not.toContain(caseB.document.document_url);
    await shareDocumentCase(page, caseB, secondUserId);
    expect(await documentAccessCaseStatuses(secondPage, caseA.caseId, caseB.caseId)).toEqual({ a: deniedCaseStatus, b: 200 });

    for (const [actor, fixture] of [
      [page, caseA],
      [page, caseB],
      [secondPage, caseB],
    ] as const) {
      const response = await actor.request.get(fixture.binaryPath, {
        headers: await documentXsrfHeaders(actor, baseURL),
        failOnStatusCode: false,
        maxRedirects: 0,
      });
      expect(response.status(), 'Each authorized control must deliver bytes before a denial can count').toBe(200);
      expect(response.headers()['content-type']?.split(';')[0].trim()).toBe('application/pdf');
      expect(await response.body()).toEqual(fixture.expectedContent);
    }
    await testInfo.attach('document-access-matrix', {
      body: JSON.stringify({
        jurisdiction: 'PRIVATELAW',
        caseType: 'PRLAPPS',
        createEvent: 'solicitorCreate',
        attachEvent: 'otherProceedings',
        gateway: 'legacy',
        distinctResolvedUsers: true,
        U1: { caseA: 200, caseB: 200 },
        U2: { caseA: deniedCaseStatus, caseB: 200 },
        positiveBinaryControls: 3,
      }),
      contentType: 'application/json',
    });
  });

  test.afterEach(async () => {
    await secondContext?.close();
    secondContext = undefined;
  });

  test('U1 reads both cases and U2 reads only the shared case', async () => {
    expect(caseA.gateway).toBe('legacy');
    expect(caseB.gateway).toBe('legacy');
  });

  test('rejects document A with case B for U1 who can access both cases', async ({ page }) => {
    const response = await page.request.get(`/documents/${caseA.documentId}/binary?caseId=${caseB.caseId}`, {
      headers: await documentXsrfHeaders(page),
      failOnStatusCode: false,
      maxRedirects: 0,
    });
    const body = await response.body();
    expect.soft(response.status()).toBe(403);
    expect.soft(response.headers()['content-type']?.split(';')[0].trim()).not.toBe('application/pdf');
    expect.soft(body.includes(Buffer.from('%PDF-'))).toBe(false);
    expect.soft(body).not.toEqual(caseA.expectedContent);
  });

  test('rejects encoded legacy binary aliases and wrong-case HEAD requests', async ({ page }) => {
    const options = {
      headers: await documentXsrfHeaders(page),
      failOnStatusCode: false,
      maxRedirects: 0,
    };
    for (const endpoint of ['%62inary', '%2562inary', 'binary;download']) {
      const response = await page.request.get(`/documents/${caseA.documentId}/${endpoint}?caseId=${caseB.caseId}`, options);
      const body = await response.body();
      // The public gateway can canonicalize an alias; either boundary must deny wrong-case access.
      expect.soft([400, 403], `Deny wrong-case access through endpoint ${endpoint}`).toContain(response.status());
      expect.soft(response.headers()['content-type']?.split(';')[0].trim()).not.toBe('application/pdf');
      expect.soft(body.includes(Buffer.from('%PDF-'))).toBe(false);
      expect.soft(body).not.toEqual(caseA.expectedContent);
    }

    const authorizedHead = await page.request.head(caseA.binaryPath, options);
    expect(authorizedHead.status(), 'An authorized HEAD must succeed before its denial can count').toBe(200);
    expect(authorizedHead.headers()['content-type']?.split(';')[0].trim()).toBe('application/pdf');
    const deniedHead = await page.request.head(`/documents/${caseA.documentId}/binary?caseId=${caseB.caseId}`, options);
    expect.soft(deniedHead.status()).toBe(403);
    expect.soft(deniedHead.headers()['content-type']?.split(';')[0].trim()).not.toBe('application/pdf');
    expect.soft(await deniedHead.body()).toHaveLength(0);
  });

  test('authorizes a version only for its actual document and accessible case', async ({ page, baseURL }, testInfo) => {
    const options = {
      headers: await documentXsrfHeaders(page),
      failOnStatusCode: false,
      maxRedirects: 0,
    };
    const metadataResponse = await page.request.get(`/documents/${caseA.documentId}`, options);
    expect(metadataResponse.status(), 'The fresh legacy document must expose its version metadata').toBe(200);
    const metadata = await metadataResponse.json();
    await testInfo.attach('persisted-legacy-document-metadata', {
      body: JSON.stringify({
        caseIdPresent: typeof metadata.metadata?.case_id === 'string' && metadata.metadata.case_id.length > 0,
        ttlPresent: metadata.ttl !== undefined && metadata.ttl !== null,
      }),
      contentType: 'application/json',
    });
    const versions = metadata._embedded?.allDocumentVersions?._embedded?.documentVersions;
    expect(Array.isArray(versions), 'DM must expose the documented documentVersions collection').toBe(true);
    expect(versions, 'The fresh upload must have exactly one original version').toHaveLength(1);
    const binaryUrl = versions[0]._links?.binary?.href;
    expect(typeof binaryUrl).toBe('string');
    const versionPath = new URL(binaryUrl).pathname;
    const versionMatch = versionPath.match(/^\/documents\/([^/]+)\/versions\/([^/]+)\/binary$/);
    expect(versionMatch, 'The version link must contain its parent and version IDs').not.toBeNull();
    const [, documentId, versionId] = versionMatch!;
    expect(documentId).toBe(caseA.documentId);
    const authorizedPath = `${versionPath}?caseId=${caseA.caseId}`;
    const authorized = await page.request.get(authorizedPath, options);
    expect(authorized.status(), 'The actual-parent version must deliver bytes before substitution is tested').toBe(200);
    expect(authorized.headers()['content-type']?.split(';')[0].trim()).toBe('application/pdf');
    expect(await authorized.body()).toEqual(caseA.expectedContent);

    const substituted = await page.request.get(
      `/documents/${caseB.documentId}/versions/${versionId}/binary?caseId=${caseB.caseId}`,
      options
    );
    const substitutedBody = await substituted.body();
    expect.soft(substituted.status()).toBe(403);
    expect.soft(substituted.headers()['content-type']?.split(';')[0].trim()).not.toBe('application/pdf');
    expect.soft(substitutedBody.includes(Buffer.from('%PDF-'))).toBe(false);
    expect.soft(substitutedBody).not.toEqual(caseA.expectedContent);

    const inaccessible = await secondPage.request.get(authorizedPath, {
      headers: await documentXsrfHeaders(secondPage, baseURL),
      failOnStatusCode: false,
      maxRedirects: 0,
    });
    const inaccessibleBody = await inaccessible.body();
    expect.soft(inaccessible.status()).toBe(deniedCaseStatus);
    expect.soft(inaccessible.headers()['content-type']?.split(';')[0].trim()).not.toBe('application/pdf');
    expect.soft(inaccessibleBody.includes(Buffer.from('%PDF-'))).toBe(false);
    expect.soft(inaccessibleBody).not.toEqual(caseA.expectedContent);
  });

  test('rejects document A with case A for U2 without case access', async ({ baseURL }) => {
    const response = await secondPage.request.get(caseA.binaryPath, {
      headers: await documentXsrfHeaders(secondPage, baseURL),
      failOnStatusCode: false,
      maxRedirects: 0,
    });
    const body = await response.body();
    expect.soft(response.status()).toBe(deniedCaseStatus);
    expect.soft(response.headers()['content-type']?.split(';')[0].trim()).not.toBe('application/pdf');
    expect.soft(body.includes(Buffer.from('%PDF-'))).toBe(false);
    expect.soft(body).not.toEqual(caseA.expectedContent);
  });

  test('rejects anonymous access to the same valid document and case', async ({ page }) => {
    const anonymous = await request.newContext({ baseURL: new URL(page.url()).origin });
    try {
      const response = await anonymous.get(caseA.binaryPath, { failOnStatusCode: false, maxRedirects: 0 });
      expect(response.status()).toBe(401);
      expect(response.headers()['content-type']?.split(';')[0].trim()).not.toBe('application/pdf');
      expect((await response.body()).includes(Buffer.from('%PDF-'))).toBe(false);
    } finally {
      await anonymous.dispose();
    }
  });

  test('rejects the same known document URL after U2 case access is revoked', async ({ page, baseURL }) => {
    const knownBinaryPath = caseB.binaryPath;
    const secondUserRequest = {
      headers: await documentXsrfHeaders(secondPage, baseURL),
      failOnStatusCode: false,
      maxRedirects: 0,
    };
    const beforeRevocation = await secondPage.request.get(knownBinaryPath, secondUserRequest);
    expect(beforeRevocation.status()).toBe(200);
    expect(beforeRevocation.headers()['content-type']?.split(';')[0].trim()).toBe('application/pdf');
    expect(await beforeRevocation.body()).toEqual(caseB.expectedContent);

    await revokeDocumentCase(page, caseB, secondUserId);
    const deniedCase = await readDocumentCase(secondPage.request, caseB.caseId);
    expect(deniedCase.status()).toBe(deniedCaseBStatus);
    expect(await deniedCase.text()).not.toContain(caseB.document.document_url);

    const afterRevocation = await secondPage.request.get(knownBinaryPath, secondUserRequest);
    const deniedBody = await afterRevocation.body();
    expect.soft(afterRevocation.status()).toBe(deniedCaseBStatus);
    expect.soft(afterRevocation.headers()['content-type']?.split(';')[0].trim()).not.toBe('application/pdf');
    expect.soft(deniedBody.includes(Buffer.from('%PDF-'))).toBe(false);
    expect.soft(deniedBody).not.toEqual(caseB.expectedContent);

    const ownerControl = await page.request.get(knownBinaryPath, {
      headers: await documentXsrfHeaders(page),
      failOnStatusCode: false,
      maxRedirects: 0,
    });
    expect(ownerControl.status(), 'U1 must retain document access after U2 is revoked').toBe(200);
    expect(ownerControl.headers()['content-type']?.split(';')[0].trim()).toBe('application/pdf');
    expect(await ownerControl.body()).toEqual(caseB.expectedContent);
  });
});
