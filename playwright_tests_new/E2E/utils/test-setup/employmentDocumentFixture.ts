import type { TestInfo } from '@playwright/test';
import type { CaseDetailsPage } from '../../page-objects/pages/exui/caseDetails.po';
import type { CreateCasePage } from '../../page-objects/pages/exui/createCase.po';
import {
  caseFieldValuesFromReadback,
  documentIdFromMetadata,
  readDocumentCase,
  uploadLegacyDocument,
  type CaseBoundDocument,
  type DocumentUploadInput,
} from './documentAccessFixtures';
import { setupCaseForJourney } from './caseSetup';
import { attachEmploymentDraftDocumentViaApi } from './journeys/employmentJourneys';
import { buildCasePayloadFromTemplate } from './payloads/registry';
import type { CcdDocumentValue } from './uploadDocumentViaApi';

type EmploymentDocumentInput = DocumentUploadInput & {
  createCasePage: CreateCasePage;
  caseDetailsPage: CaseDetailsPage;
  testInfo?: TestInfo;
};

export async function createLegacyEmploymentDocument(
  options: EmploymentDocumentInput,
  dependencies = { setupCaseForJourney, uploadLegacyDocument, attachEmploymentDraftDocumentViaApi }
): Promise<CaseBoundDocument> {
  if (!options.content.length) throw new Error('Employment document fixture content must not be empty.');
  const jurisdictionId = 'EMPLOYMENT';
  const caseTypeId = 'ET_EnglandWales';
  const { caseNumber: caseId } = await dependencies.setupCaseForJourney({
    scenario: 'document-access-legacy-employment',
    jurisdiction: jurisdictionId,
    caseType: caseTypeId,
    apiEventId: 'initiateCase',
    mode: 'api-required',
    apiPayload: buildCasePayloadFromTemplate('employment.et-england-wales.initiate-case'),
    page: options.page,
    createCasePage: options.createCasePage,
    caseDetailsPage: options.caseDetailsPage,
    testInfo: options.testInfo,
  });
  const document = await dependencies.uploadLegacyDocument(options);
  const documentId = documentIdFromMetadata(document);
  await dependencies.attachEmploymentDraftDocumentViaApi({ page: options.page, caseNumber: caseId, uploadedDocument: document });
  const response = await readDocumentCase(options.page.request, caseId);
  if (response.status() !== 200) throw new Error(`Employment document fixture readback failed with HTTP ${response.status()}.`);
  const collection = caseFieldValuesFromReadback(await response.json(), caseId).documentCollection;
  const savedDocument: CcdDocumentValue | undefined = Array.isArray(collection)
    ? collection
        .map((entry) => entry?.value?.uploadedDocument)
        .find(
          (saved) =>
            saved?.document_url === document.document_url &&
            saved?.document_binary_url === document.document_binary_url &&
            saved?.document_filename === document.document_filename
        )
    : undefined;
  if (!savedDocument) throw new Error('Employment document fixture readback did not preserve documentCollection membership.');
  await options.caseDetailsPage.reopenCaseDetails(`/cases/case-details/${jurisdictionId}/${caseTypeId}/${caseId}`);
  return {
    caseId,
    jurisdictionId,
    caseTypeId,
    document,
    savedDocument,
    documentId,
    gateway: 'legacy',
    binaryPath: `/documents/${encodeURIComponent(documentId)}/binary?caseId=${encodeURIComponent(caseId)}`,
    expectedContent: options.content,
    expectedContentType: options.mimeType,
  };
}
