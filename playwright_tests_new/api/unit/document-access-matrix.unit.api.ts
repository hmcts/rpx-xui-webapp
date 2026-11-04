import { expect, test, type Page } from '@playwright/test';
import { createPrlDocumentCase, prlDocumentReadback } from '../../E2E/utils/test-setup/documentAccessMatrix';

const document = {
  document_url: 'https://dm.example.test/documents/doc-a',
  document_binary_url: 'https://dm.example.test/documents/doc-a/binary',
  document_filename: 'known.pdf',
};
const readback = {
  case_id: 'case-a',
  tabs: [
    {
      fields: ['existingProceedings', 'existingProceedingsWithDoc'].map((id) => ({
        id,
        value: [{ value: { uploadRelevantOrder: document } }],
      })),
    },
  ],
};

const organisation = { OrganisationID: 'ACTUAL-ORG', OrganisationName: 'Synthetic organisation' };
const organisationPolicy = { Organisation: organisation, OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITOR]' };
const creationEvent = {
  id: 'solicitorCreate',
  event_token: 'create-token',
  case_fields: [
    { id: 'caseTypeOfApplication' },
    { id: 'c100ConfidentialityStatementDisclaimer' },
    {
      id: 'applicantOrganisationPolicy',
      field_type: {
        id: 'OrganisationPolicy',
        complex_fields: [{ id: 'OrgPolicyCaseAssignedRole', value: '[APPLICANTSOLICITOR]' }],
      },
    },
  ],
};
const caseReadback = {
  id: 'case-a',
  data: { caseTypeOfApplication: 'C100', applicantOrganisationPolicy: organisationPolicy },
};

type Reply = { status: number; body: unknown };
function fixtureHarness(overrides: Partial<Record<'organisation' | 'creation' | 'persistedCase' | 'attachment', Reply>> = {}) {
  const replies = {
    organisation: { status: 200, body: { organisationIdentifier: 'ACTUAL-ORG', name: 'Synthetic organisation' } },
    creation: { status: 200, body: creationEvent },
    persistedCase: { status: 200, body: caseReadback },
    attachment: { status: 200, body: { event_token: 'document-token' } },
    ...overrides,
  };
  const operations: string[] = [];
  const submissions: unknown[] = [];
  const response = (reply: Reply) => ({
    status: () => reply.status,
    ok: () => reply.status >= 200 && reply.status < 300,
    json: async () => reply.body,
  });
  const page = {
    request: {
      get: async (url: string, options?: unknown) => {
        operations.push(url);
        if (url === '/api/organisation') return response(replies.organisation);
        if (url === '/data/internal/case-types/PRLAPPS/event-triggers/solicitorCreate?ignore-warning=false') {
          expect(options).toEqual({
            failOnStatusCode: false,
            maxRedirects: 0,
            headers: {
              experimental: 'true',
              Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8',
            },
          });
          return response(replies.creation);
        }
        if (url === '/data/cases/case-a') {
          expect(options).toEqual({
            failOnStatusCode: false,
            maxRedirects: 0,
            headers: {
              experimental: 'true',
              Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.case.v2+json;charset=UTF-8',
            },
          });
          return response(replies.persistedCase);
        }
        if (url.includes('event-triggers/otherProceedings')) return response(replies.attachment);
        if (url === '/data/internal/cases/case-a') return response({ status: 200, body: readback });
        throw new Error(`Unexpected fixture request: ${url}`);
      },
      post: async (url: string, options: { data: { event: { id: string } } }) => {
        expect(url).toBe('/data/cases/case-a/events');
        operations.push(options.data.event.id);
        submissions.push(options.data);
        return response({ status: 201, body: {} });
      },
    },
  } as unknown as Page;
  return {
    operations,
    submissions,
    options: {
      page,
      createCasePage: {} as never,
      caseDetailsPage: {} as never,
      fileName: 'known.pdf',
      mimeType: 'application/pdf',
      content: Buffer.from('%PDF known'),
    },
    dependencies: {
      setupCaseForJourney: async (options: { apiEventId?: string; apiPayload?: unknown; mode?: string }) => {
        operations.push('create');
        expect(options.apiEventId).toBe('solicitorCreate');
        expect(options.apiPayload).toEqual({
          fieldValues: {
            caseTypeOfApplication: 'C100',
            c100ConfidentialityStatementDisclaimer: ['confidentialityStatementUnderstood'],
            applicantOrganisationPolicy: organisationPolicy,
          },
        });
        expect(options.mode).toBe('api-required');
        return { caseNumber: 'case-a', mode: 'api' as const };
      },
      uploadLegacyDocument: async () => {
        operations.push('upload');
        return document;
      },
    },
  };
}

test.describe('PRL document access matrix fixture', { tag: '@svc-internal' }, () => {
  test('readback proves the nested document in both saved PRL fields', () => {
    expect(prlDocumentReadback(readback, 'case-a', document)).toEqual(['existingProceedings', 'existingProceedingsWithDoc']);
    expect(prlDocumentReadback(readback, 'case-a', { ...document, document_filename: 'wrong.pdf' })).toEqual([]);
    expect(() => prlDocumentReadback(readback, 'case-b', document)).toThrow('requested CCD case view');
  });

  test('creates a draft through the supported event and attaches a genuine nested document', async () => {
    const harness = fixtureHarness();
    const fixture = await createPrlDocumentCase(harness.options, harness.dependencies);
    expect(harness.operations).toEqual([
      '/api/organisation',
      '/data/internal/case-types/PRLAPPS/event-triggers/solicitorCreate?ignore-warning=false',
      'create',
      '/data/cases/case-a',
      'upload',
      '/data/internal/cases/case-a/event-triggers/otherProceedings?ignore-warning=false',
      'otherProceedings',
      '/data/internal/cases/case-a',
    ]);
    expect(harness.submissions[0]).toMatchObject({
      data: {
        previousOrOngoingProceedingsForChildren: 'yes',
        existingProceedings: [{ value: { uploadRelevantOrder: document } }],
      },
      event: { id: 'otherProceedings' },
      event_token: 'document-token',
    });
    expect(harness.submissions).toHaveLength(1);
    expect(fixture.savedPaths).toEqual(['existingProceedings', 'existingProceedingsWithDoc']);
    expect(fixture.binaryPath).toBe('/documents/doc-a/binary?caseId=case-a');
  });

  test('uses the normal creation policy value when supplied by the event metadata', async () => {
    const harness = fixtureHarness({
      creation: {
        status: 200,
        body: {
          ...creationEvent,
          case_fields: creationEvent.case_fields.map((field) =>
            field.id === 'applicantOrganisationPolicy'
              ? { ...field, value: { OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITOR]' } }
              : field
          ),
        },
      },
    });
    await createPrlDocumentCase(harness.options, harness.dependencies);
    expect(harness.operations).toContain('upload');
  });

  for (const fault of [
    {
      name: 'organisation lookup denied',
      replies: { organisation: { status: 403, body: {} } },
      error: 'organisation lookup failed with HTTP 403',
    },
    {
      name: 'organisation metadata absent',
      replies: { organisation: { status: 200, body: { name: 'Synthetic organisation' } } },
      error: 'organisation metadata is missing',
    },
    {
      name: 'normal creation event unavailable',
      replies: { creation: { status: 403, body: {} } },
      error: 'normal creation event trigger failed with HTTP 403',
    },
    {
      name: 'wrong creation event returned',
      replies: { creation: { status: 200, body: { ...creationEvent, id: 'testingSupportDummySolicitorCreate' } } },
      error: 'normal creation event did not declare',
    },
    {
      name: 'creation policy or required fields absent',
      replies: { creation: { status: 200, body: { ...creationEvent, case_fields: [] } } },
      error: 'normal creation event did not declare',
    },
    {
      name: 'creation policy role differs from the supported default',
      replies: {
        creation: {
          status: 200,
          body: {
            ...creationEvent,
            case_fields: creationEvent.case_fields.map((field) =>
              field.id === 'applicantOrganisationPolicy'
                ? { ...field, value: { OrgPolicyCaseAssignedRole: '[UNEXPECTED]' } }
                : field
            ),
          },
        },
      },
      error: 'normal creation event did not declare',
    },
    {
      name: 'policy readback failed',
      replies: { persistedCase: { status: 403, body: {} } },
      error: 'organisation policy readback failed with HTTP 403',
    },
    {
      name: 'wrong case read back',
      replies: { persistedCase: { status: 200, body: { ...caseReadback, id: 'other-case' } } },
      error: 'organisation policy readback did not confirm',
    },
    {
      name: 'wrong application type persisted',
      replies: {
        persistedCase: { status: 200, body: { ...caseReadback, data: { ...caseReadback.data, caseTypeOfApplication: 'FL401' } } },
      },
      error: 'organisation policy readback did not confirm',
    },
    {
      name: 'saved policy absent',
      replies: { persistedCase: { status: 200, body: { id: 'case-a', data: { caseTypeOfApplication: 'C100' } } } },
      error: 'organisation policy readback did not confirm',
    },
    ...[
      {
        name: 'organisation ID not persisted',
        policy: { ...organisationPolicy, Organisation: { ...organisation, OrganisationID: 'CANNED' } },
      },
      {
        name: 'organisation name not persisted',
        policy: { ...organisationPolicy, Organisation: { ...organisation, OrganisationName: 'Canned organisation' } },
      },
      {
        name: 'declared policy role not persisted',
        policy: { ...organisationPolicy, OrgPolicyCaseAssignedRole: '[UNEXPECTED]' },
      },
    ].map(({ name, policy }) => ({
      name,
      replies: {
        persistedCase: {
          status: 200,
          body: { ...caseReadback, data: { ...caseReadback.data, applicantOrganisationPolicy: policy } },
        },
      },
      error: 'organisation policy readback did not confirm',
    })),
  ]) {
    test(`stops before document upload when ${fault.name}`, async () => {
      const harness = fixtureHarness(fault.replies);
      await expect(createPrlDocumentCase(harness.options, harness.dependencies)).rejects.toThrow(fault.error);
      expect(harness.operations).not.toContain('upload');
      expect(harness.operations).not.toContain('otherProceedings');
    });
  }

  test('stops before attaching a document when the supported event is unavailable', async () => {
    const harness = fixtureHarness({ attachment: { status: 403, body: {} } });
    await expect(createPrlDocumentCase(harness.options, harness.dependencies)).rejects.toThrow(
      'event trigger failed with HTTP 403'
    );
    expect(harness.operations).not.toContain('otherProceedings');
  });
});
