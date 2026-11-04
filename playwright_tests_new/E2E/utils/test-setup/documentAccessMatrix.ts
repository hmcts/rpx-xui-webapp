import { randomUUID } from 'node:crypto';
import type { Page, TestInfo } from '@playwright/test';
import type { CaseDetailsPage } from '../../page-objects/pages/exui/caseDetails.po';
import type { CreateCasePage } from '../../page-objects/pages/exui/createCase.po';
import { setupCaseForJourney } from './caseSetup';
import {
  caseFieldValuesFromReadback,
  documentIdFromMetadata,
  readDocumentCase,
  uploadLegacyDocument,
  type CaseBoundDocument,
  type DocumentUploadInput,
} from './documentAccessFixtures';
import type { CcdDocumentValue } from './uploadDocumentViaApi';

export function prlDocumentReadback(payload: unknown, caseId: string, expected: CcdDocumentValue): string[] {
  const data = caseFieldValuesFromReadback(payload, caseId);
  return ['existingProceedings', 'existingProceedingsWithDoc'].filter((field) => {
    const entries = data?.[field];
    return (
      Array.isArray(entries) &&
      entries.some((entry) => {
        const saved = entry?.value?.uploadRelevantOrder;
        return (
          saved?.document_url === expected.document_url &&
          saved?.document_binary_url === expected.document_binary_url &&
          saved?.document_filename === expected.document_filename
        );
      })
    );
  });
}

type PrlDocumentInput = DocumentUploadInput & {
  createCasePage: CreateCasePage;
  caseDetailsPage: CaseDetailsPage;
  testInfo?: TestInfo;
};

async function bindPrlApplicantOrganisation(page: Page, caseId: string): Promise<void> {
  const response = await page.request.get('/api/organisation', { failOnStatusCode: false, maxRedirects: 0 });
  if (response.status() !== 200) throw new Error(`PRL fixture organisation lookup failed with HTTP ${response.status()}.`);
  const organisation = await response.json();
  if (
    typeof organisation?.organisationIdentifier !== 'string' ||
    !organisation.organisationIdentifier.trim() ||
    typeof organisation?.name !== 'string' ||
    !organisation.name.trim()
  ) {
    throw new Error('PRL fixture organisation metadata is missing.');
  }
  const solicitorOrg = { OrganisationID: organisation.organisationIdentifier, OrganisationName: organisation.name };
  const event = await page.request.get(
    `/data/internal/cases/${encodeURIComponent(caseId)}/event-triggers/applicantsDetails?ignore-warning=false`,
    {
      failOnStatusCode: false,
      maxRedirects: 0,
      headers: { experimental: 'true', Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json' },
    }
  );
  if (event.status() !== 200) throw new Error(`PRL applicant details event trigger failed with HTTP ${event.status()}.`);
  const trigger = (await event.json()) as {
    case_id?: string | number;
    event_token?: string;
    case_fields?: Array<{ id: string; value: unknown }>;
  };
  if (typeof trigger.event_token !== 'string' || !trigger.event_token.trim()) {
    throw new Error('PRL applicant details event token is missing.');
  }
  const fields = Array.isArray(trigger.case_fields) ? trigger.case_fields : [];
  const applicants = fields.find((field) => field.id === 'applicants')?.value;
  const caseType = fields.find((field) => field.id === 'caseTypeOfApplication')?.value;
  if (
    String(trigger.case_id) !== caseId ||
    caseType !== 'C100' ||
    !Array.isArray(applicants) ||
    !applicants.length ||
    applicants.some((applicant) => typeof applicant?.id !== 'string' || !applicant.id || !applicant.value) ||
    typeof applicants[0].value.representativeFirstName !== 'string' ||
    !applicants[0].value.representativeFirstName.trim() ||
    typeof applicants[0].value.representativeLastName !== 'string' ||
    !applicants[0].value.representativeLastName.trim()
  ) {
    throw new Error('PRL applicant details event did not return the saved C100 applicants and representative names.');
  }
  // The supported callback derives organisation policies from party details; never post a fabricated case-role policy.
  const submitted = await page.request.post(`/data/cases/${encodeURIComponent(caseId)}/events`, {
    failOnStatusCode: false,
    maxRedirects: 0,
    headers: {
      experimental: 'true',
      Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json',
      'Content-Type': 'application/json',
    },
    data: {
      data: {
        caseTypeOfApplication: caseType,
        applicants: [{ ...applicants[0], value: { ...applicants[0].value, solicitorOrg } }, ...applicants.slice(1)],
      },
      event: { id: 'applicantsDetails', summary: 'Bind synthetic applicant to the authenticated organisation' },
      event_token: trigger.event_token,
      ignore_warning: false,
    },
  });
  if (!submitted.ok()) throw new Error(`PRL applicant details submission failed with HTTP ${submitted.status()}.`);
  const readback = await page.request.get(`/data/cases/${encodeURIComponent(caseId)}`, {
    failOnStatusCode: false,
    maxRedirects: 0,
    headers: {
      experimental: 'true',
      Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.case.v2+json;charset=UTF-8',
    },
  });
  if (readback.status() !== 200) {
    throw new Error(`PRL applicant organisation readback failed with HTTP ${readback.status()}.`);
  }
  const saved = await readback.json();
  // Role-restricted policies can be omitted; the real sharing and access controls prove the resulting case binding.
  const applicant = saved?.data?.applicants?.[0];
  if (
    String(saved?.id) !== caseId ||
    applicant?.id !== applicants[0].id ||
    applicant?.value?.solicitorOrg?.OrganisationID !== solicitorOrg.OrganisationID ||
    applicant?.value?.solicitorOrg?.OrganisationName !== solicitorOrg.OrganisationName
  ) {
    throw new Error('PRL applicant organisation readback did not confirm the saved applicant and authenticated organisation.');
  }
}

export async function createPrlDocumentCase(
  options: PrlDocumentInput,
  dependencies = {
    setupCaseForJourney,
    uploadLegacyDocument,
  }
): Promise<CaseBoundDocument & { savedPaths: string[] }> {
  const jurisdictionId = 'PRIVATELAW';
  const caseTypeId = 'PRLAPPS';
  const { caseNumber: caseId } = await dependencies.setupCaseForJourney({
    scenario: 'document-access-prl',
    jurisdiction: jurisdictionId,
    caseType: caseTypeId,
    apiEventId: 'testingSupportDummySolicitorCreate',
    mode: 'api-required',
    apiPayload: { fieldValues: { caseTypeOfApplication: 'C100', applicantCaseName: options.fileName } },
    page: options.page,
    createCasePage: options.createCasePage,
    caseDetailsPage: options.caseDetailsPage,
    testInfo: options.testInfo,
  });
  await bindPrlApplicantOrganisation(options.page, caseId);
  const document = await dependencies.uploadLegacyDocument(options);
  const documentId = documentIdFromMetadata(document);
  const event = await options.page.request.get(
    `/data/internal/cases/${encodeURIComponent(caseId)}/event-triggers/otherProceedings?ignore-warning=false`,
    {
      failOnStatusCode: false,
      headers: { experimental: 'true', Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json' },
    }
  );
  if (event.status() !== 200) throw new Error(`PRL document fixture event trigger failed with HTTP ${event.status()}.`);
  const eventToken = (await event.json()).event_token;
  if (typeof eventToken !== 'string' || !eventToken.trim()) throw new Error('PRL document fixture event token is missing.');
  const submit = await options.page.request.post(`/data/cases/${encodeURIComponent(caseId)}/events`, {
    failOnStatusCode: false,
    headers: {
      experimental: 'true',
      Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json',
      'Content-Type': 'application/json',
    },
    data: {
      data: {
        previousOrOngoingProceedingsForChildren: 'yes',
        existingProceedings: [{ id: randomUUID(), value: { uploadRelevantOrder: document } }],
      },
      event: {
        id: 'otherProceedings',
        summary: 'Attach synthetic document access fixture',
        description: 'Synthetic test document',
      },
      event_token: eventToken,
      ignore_warning: false,
    },
  });
  if (!submit.ok()) throw new Error(`PRL document fixture attachment failed with HTTP ${submit.status()}.`);
  const readback = await readDocumentCase(options.page.request, caseId);
  if (readback.status() !== 200) throw new Error(`PRL document fixture readback failed with HTTP ${readback.status()}.`);
  const savedPaths = prlDocumentReadback(await readback.json(), caseId, document);
  if (savedPaths.length !== 2)
    throw new Error('PRL document fixture readback did not confirm both saved nested document fields.');
  return {
    caseId,
    jurisdictionId,
    caseTypeId,
    document,
    savedDocument: document,
    savedPaths,
    documentId,
    gateway: 'legacy',
    binaryPath: `/documents/${encodeURIComponent(documentId)}/binary?caseId=${encodeURIComponent(caseId)}`,
    expectedContent: options.content,
    expectedContentType: options.mimeType,
  };
}

export async function documentAccessCaseStatuses(page: Page, caseA: string, caseB: string) {
  const [a, b] = await Promise.all([readDocumentCase(page.request, caseA), readDocumentCase(page.request, caseB)]);
  return { a: a.status(), b: b.status() };
}
