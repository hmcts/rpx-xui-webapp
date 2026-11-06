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

export async function createPrlDocumentCase(
  options: PrlDocumentInput,
  dependencies = {
    setupCaseForJourney,
    uploadLegacyDocument,
  }
): Promise<CaseBoundDocument & { savedPaths: string[] }> {
  const jurisdictionId = 'PRIVATELAW';
  const caseTypeId = 'PRLAPPS';
  const response = await options.page.request.get('/api/organisation', { failOnStatusCode: false, maxRedirects: 0 });
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
  const creation = await options.page.request.get(
    '/data/internal/case-types/PRLAPPS/event-triggers/solicitorCreate?ignore-warning=false',
    {
      failOnStatusCode: false,
      maxRedirects: 0,
      headers: {
        experimental: 'true',
        Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8',
      },
    }
  );
  if (creation.status() !== 200) throw new Error(`PRL normal creation event trigger failed with HTTP ${creation.status()}.`);
  const trigger = (await creation.json()) as {
    id?: string;
    case_fields?: Array<{
      id: string;
      value?: { OrgPolicyCaseAssignedRole?: string };
      field_type?: { id: string; complex_fields?: Array<{ id: string; value?: string }> };
    }>;
  };
  const fields = Array.isArray(trigger.case_fields) ? trigger.case_fields : [];
  const policy = fields.find((field) => field.id === 'applicantOrganisationPolicy');
  // Match the toolkit's prepareValue: a supplied complex value takes precedence over its child defaults.
  const role = policy?.value
    ? policy.value.OrgPolicyCaseAssignedRole
    : policy?.field_type?.complex_fields?.find((field) => field.id === 'OrgPolicyCaseAssignedRole')?.value;
  if (
    trigger.id !== 'solicitorCreate' ||
    policy?.field_type?.id !== 'OrganisationPolicy' ||
    role !== '[APPLICANTSOLICITOR]' ||
    !fields.some((field) => field.id === 'caseTypeOfApplication') ||
    !fields.some((field) => field.id === 'c100ConfidentialityStatementDisclaimer')
  ) {
    throw new Error('PRL normal creation event did not declare the supported C100 fields and organisation policy role.');
  }
  const organisationPolicy = {
    Organisation: { OrganisationID: organisation.organisationIdentifier, OrganisationName: organisation.name },
    OrgPolicyCaseAssignedRole: role,
  };
  const { caseNumber: caseId } = await dependencies.setupCaseForJourney({
    scenario: 'document-access-prl',
    jurisdiction: jurisdictionId,
    caseType: caseTypeId,
    apiEventId: 'solicitorCreate',
    mode: 'api-required',
    apiPayload: {
      fieldValues: {
        caseTypeOfApplication: 'C100',
        c100ConfidentialityStatementDisclaimer: ['confidentialityStatementUnderstood'],
        applicantOrganisationPolicy: organisationPolicy,
      },
    },
    page: options.page,
    createCasePage: options.createCasePage,
    caseDetailsPage: options.caseDetailsPage,
    testInfo: options.testInfo,
  });
  const policyReadback = await options.page.request.get(`/data/cases/${encodeURIComponent(caseId)}`, {
    failOnStatusCode: false,
    maxRedirects: 0,
    headers: {
      experimental: 'true',
      Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.case.v2+json;charset=UTF-8',
    },
  });
  if (policyReadback.status() !== 200) {
    throw new Error(`PRL organisation policy readback failed with HTTP ${policyReadback.status()}.`);
  }
  const saved = await policyReadback.json();
  const savedPolicy = saved?.data?.applicantOrganisationPolicy;
  if (
    String(saved?.id) !== caseId ||
    saved?.data?.caseTypeOfApplication !== 'C100' ||
    savedPolicy?.Organisation?.OrganisationID !== organisationPolicy.Organisation.OrganisationID ||
    savedPolicy?.Organisation?.OrganisationName !== organisationPolicy.Organisation.OrganisationName ||
    savedPolicy?.OrgPolicyCaseAssignedRole !== role
  ) {
    throw new Error(
      'PRL organisation policy readback did not confirm the C100 case, authenticated organisation and declared role.'
    );
  }
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
