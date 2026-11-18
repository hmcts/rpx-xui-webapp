import type { APIRequestContext, Page, TestInfo } from '@playwright/test';
import type { CaseDetailsPage } from '../../page-objects/pages/exui/caseDetails.po';
import type { CreateCasePage } from '../../page-objects/pages/exui/createCase.po';
import { setupCaseForJourney } from './caseSetup';
import { buildCasePayloadFromTemplate } from './payloads/registry';
import { uploadDocumentViaApi, type CcdDocumentValue } from './uploadDocumentViaApi';

export type DocumentGateway = 'legacy' | 'v2';
export type DocumentUploadInput = { page: Page; fileName: string; mimeType: string; content: Buffer };
export type CaseBoundDocument = {
  caseId: string;
  jurisdictionId: string;
  caseTypeId: string;
  document: CcdDocumentValue;
  savedDocument: CcdDocumentValue;
  documentId: string;
  gateway: DocumentGateway;
  binaryPath: string;
  expectedContent: Buffer;
  expectedContentType: string;
};

export function documentIdFromMetadata(document: CcdDocumentValue): string {
  const source = new URL(document.document_url);
  const binary = new URL(document.document_binary_url);
  const match = source.pathname.match(/^\/documents\/([^/]+)\/?$/);
  if (!match || binary.origin !== source.origin || binary.pathname !== `/documents/${match[1]}/binary`) {
    throw new Error('Document fixture upload did not return matching genuine document and binary links.');
  }
  return match[1];
}

export function legacyDocumentFromUpload(payload: unknown): CcdDocumentValue {
  const body = payload as {
    documents?: Array<{ originalDocumentName?: string; _links?: { self?: { href?: string }; binary?: { href?: string } } }>;
    _embedded?: {
      documents?: Array<{ originalDocumentName?: string; _links?: { self?: { href?: string }; binary?: { href?: string } } }>;
    };
  } | null;
  const uploaded = body?._embedded?.documents?.[0] ?? body?.documents?.[0];
  const document: CcdDocumentValue = {
    document_url: uploaded?._links?.self?.href ?? '',
    document_binary_url: uploaded?._links?.binary?.href ?? '',
    document_filename: uploaded?.originalDocumentName ?? '',
  };
  if (!document.document_url || !document.document_binary_url || !document.document_filename) {
    throw new Error('Legacy document upload response is missing genuine CCD document metadata.');
  }
  documentIdFromMetadata(document);
  return document;
}

export async function documentXsrfHeaders(page: Page, applicationUrl = page.url()): Promise<Record<string, string>> {
  const cookies = await page.context().cookies(new URL(applicationUrl).origin);
  const token = cookies.find((cookie) => cookie.name === 'XSRF-TOKEN')?.value;
  if (!token) throw new Error('Document fixture requires an authenticated application session with an XSRF cookie.');
  return { 'X-XSRF-TOKEN': token };
}

export async function uploadLegacyDocument(options: DocumentUploadInput): Promise<CcdDocumentValue> {
  if (options.page.url() === 'about:blank') await options.page.goto('/cases');
  const response = await options.page.request.post(new URL('/documents', options.page.url()).toString(), {
    headers: await documentXsrfHeaders(options.page),
    multipart: {
      classification: 'PUBLIC',
      files: { name: options.fileName, mimeType: options.mimeType, buffer: options.content },
    },
    failOnStatusCode: false,
  });
  if (!response.ok()) throw new Error(`Legacy document fixture upload failed with HTTP ${response.status()}.`);
  return legacyDocumentFromUpload(await response.json());
}

export async function readDocumentCase(request: APIRequestContext, caseId: string) {
  return request.get(`/data/internal/cases/${encodeURIComponent(caseId)}`, {
    headers: {
      experimental: 'true',
      Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-case-view.v2+json;charset=UTF-8',
    },
    failOnStatusCode: false,
    maxRedirects: 0,
  });
}

export function caseFieldValuesFromReadback(payload: unknown, caseId: string): Record<string, unknown> {
  const body = payload as { case_id?: string | number; tabs?: Array<{ fields?: Array<{ id: string; value: unknown }> }> };
  if (String(body?.case_id) !== caseId || !Array.isArray(body.tabs)) {
    throw new Error('Document fixture readback did not return the requested CCD case view.');
  }
  return Object.fromEntries(body.tabs.flatMap((tab) => tab.fields ?? []).map((field) => [field.id, field.value]));
}

export function savedDocumentFromCase(payload: unknown, caseId: string, expected: CcdDocumentValue): CcdDocumentValue {
  const saved = caseFieldValuesFromReadback(payload, caseId).DocumentUrl as CcdDocumentValue | undefined;
  if (
    !saved ||
    saved.document_url !== expected.document_url ||
    saved.document_binary_url !== expected.document_binary_url ||
    saved.document_filename !== expected.document_filename
  ) {
    throw new Error('Document fixture case readback did not preserve the uploaded DocumentUrl membership.');
  }
  return saved;
}

type CaseDocumentInput = DocumentUploadInput & {
  gateway: DocumentGateway;
  createCasePage: CreateCasePage;
  caseDetailsPage: CaseDetailsPage;
  testInfo?: TestInfo;
};

export async function createCaseBoundDocument(
  options: CaseDocumentInput,
  dependencies = {
    uploadLegacyDocument,
    uploadDocumentViaApi,
    setupCaseForJourney,
  }
): Promise<CaseBoundDocument> {
  if (!options.content.length) throw new Error('Document fixture content must not be empty.');
  const jurisdictionId = 'DIVORCE';
  const caseTypeId = 'xuiTestCaseType';
  const document =
    options.gateway === 'legacy'
      ? await dependencies.uploadLegacyDocument(options)
      : await dependencies.uploadDocumentViaApi({
          page: options.page,
          jurisdictionId,
          caseTypeId,
          fileName: options.fileName,
          mimeType: options.mimeType,
          fileContent: options.content,
        });
  const documentId = documentIdFromMetadata(document);
  const { caseNumber: caseId } = await dependencies.setupCaseForJourney({
    scenario: `document-access-${options.gateway}`,
    jurisdiction: jurisdictionId,
    caseType: caseTypeId,
    apiEventId: 'createCase',
    mode: 'api-required',
    apiPayload: buildCasePayloadFromTemplate('divorce.xui-test-case-type.create-case', {
      overrides: { TextField: options.fileName, DocumentUrl: document },
    }),
    page: options.page,
    createCasePage: options.createCasePage,
    caseDetailsPage: options.caseDetailsPage,
    testInfo: options.testInfo,
  });
  const response = await readDocumentCase(options.page.request, caseId);
  if (response.status() !== 200) throw new Error(`Document fixture case readback failed with HTTP ${response.status()}.`);
  const savedDocument = savedDocumentFromCase(await response.json(), caseId, document);
  const gatewayPath = options.gateway === 'legacy' ? 'documents' : 'documentsv2';
  return {
    caseId,
    jurisdictionId,
    caseTypeId,
    document,
    savedDocument,
    documentId,
    gateway: options.gateway,
    binaryPath: `/${gatewayPath}/${encodeURIComponent(documentId)}/binary?caseId=${encodeURIComponent(caseId)}`,
    expectedContent: options.content,
    expectedContentType: options.mimeType,
  };
}

export async function resolveDocumentUserId(request: APIRequestContext): Promise<string> {
  const response = await request.get('/api/user/details', { failOnStatusCode: false, maxRedirects: 0 });
  if (response.status() !== 200) throw new Error(`Document fixture identity lookup failed with HTTP ${response.status()}.`);
  const body = await response.json();
  const id = body?.userInfo?.uid ?? body?.userInfo?.id;
  if (typeof id !== 'string' || !id.trim()) throw new Error('Document fixture identity lookup returned no resolved user ID.');
  return id;
}

export function assignmentIncludesUser(payload: unknown, caseId: string, userId: string): boolean {
  if (!Array.isArray(payload)) return false;
  return payload.some(
    (entry) =>
      String(entry?.caseId) === caseId &&
      Array.isArray(entry.sharedWith) &&
      entry.sharedWith.some((user: { idamId?: string }) => user.idamId === userId) &&
      (!entry.pendingShares || entry.pendingShares.length === 0)
  );
}

export async function shareDocumentCase(page: Page, fixture: CaseBoundDocument, userId: string): Promise<void> {
  const headers = await documentXsrfHeaders(page);
  const users = await page.request.get('/api/caseshare/users', { headers, failOnStatusCode: false });
  const assignableUsers = users.status() === 200 ? await users.json() : undefined;
  if (!Array.isArray(assignableUsers) || !assignableUsers.some((user: { idamId?: string }) => user.idamId === userId)) {
    throw new Error('Document access fixture blocked: U2 is not an assignable professional in U1 organisation.');
  }
  const response = await page.request.post('/api/caseshare/case-assignments', {
    headers,
    failOnStatusCode: false,
    data: {
      sharedCases: [
        {
          caseId: fixture.caseId,
          caseTypeId: fixture.caseTypeId,
          sharedWith: [],
          pendingShares: [{ idamId: userId }],
          pendingUnshares: [],
        },
      ],
    },
  });
  if (response.status() !== 201 || !assignmentIncludesUser(await response.json(), fixture.caseId, userId)) {
    throw new Error(`Document access fixture case assignment failed or remained pending (HTTP ${response.status()}).`);
  }
  const readback = await page.request.get(`/api/caseshare/case-assignments?case_ids=${encodeURIComponent(fixture.caseId)}`, {
    headers,
    failOnStatusCode: false,
  });
  if (readback.status() !== 200 || !assignmentIncludesUser(await readback.json(), fixture.caseId, userId)) {
    throw new Error('Document access fixture assignment readback did not confirm U2 access to case B.');
  }
}

function assignmentExcludesUser(payload: unknown, caseId: string, userId: string): boolean {
  if (!Array.isArray(payload)) return false;
  return payload.some(
    (entry) =>
      String(entry?.caseId) === caseId &&
      Array.isArray(entry.sharedWith) &&
      !entry.sharedWith.some((user: { idamId?: string }) => user.idamId === userId) &&
      (entry.pendingUnshares === undefined || (Array.isArray(entry.pendingUnshares) && entry.pendingUnshares.length === 0))
  );
}

export async function revokeDocumentCase(page: Page, fixture: CaseBoundDocument, userId: string): Promise<void> {
  const headers = await documentXsrfHeaders(page);
  const assignmentPath = `/api/caseshare/case-assignments?case_ids=${encodeURIComponent(fixture.caseId)}`;
  const requestOptions = { headers, failOnStatusCode: false, maxRedirects: 0 };
  const current = await page.request.get(assignmentPath, requestOptions);
  const assignments: Array<{ caseId: string; sharedWith: Array<{ idamId: string; caseRoles?: string[] }> }> =
    current.status() === 200 ? await current.json() : [];
  const assignment = Array.isArray(assignments)
    ? assignments.find((entry) => String(entry?.caseId) === fixture.caseId)
    : undefined;
  if (!assignment || !assignmentIncludesUser([assignment], fixture.caseId, userId)) {
    throw new Error('Document access fixture revocation requires a confirmed current U2 case assignment.');
  }
  const user = assignment.sharedWith.find((entry) => entry.idamId === userId);
  if (
    !Array.isArray(user?.caseRoles) ||
    !user.caseRoles.length ||
    user.caseRoles.some((role) => typeof role !== 'string' || !role.trim())
  ) {
    throw new Error('Document access fixture revocation requires the saved U2 case roles.');
  }
  const response = await page.request.post('/api/caseshare/case-assignments', {
    ...requestOptions,
    data: {
      sharedCases: [
        {
          caseId: fixture.caseId,
          caseTypeId: fixture.caseTypeId,
          sharedWith: assignment.sharedWith,
          pendingShares: [],
          pendingUnshares: [{ idamId: userId, caseRoles: user.caseRoles }],
        },
      ],
    },
  });
  if (response.status() !== 201 || !assignmentExcludesUser(await response.json(), fixture.caseId, userId)) {
    throw new Error(`Document access fixture removal failed or remained pending (HTTP ${response.status()}).`);
  }
  const readback = await page.request.get(assignmentPath, requestOptions);
  if (readback.status() !== 200 || !assignmentExcludesUser(await readback.json(), fixture.caseId, userId)) {
    throw new Error('Document access fixture revocation readback did not confirm U2 removal from case B.');
  }
}
