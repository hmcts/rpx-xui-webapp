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
const applicants = [
  {
    id: 'applicant-a',
    value: {
      firstName: 'Synthetic',
      representativeFirstName: 'Test',
      representativeLastName: 'Solicitor',
      solicitorOrg: { OrganisationID: 'CANNED', OrganisationName: 'Canned organisation' },
    },
  },
  {
    id: 'applicant-b',
    value: {
      firstName: 'Other synthetic applicant',
      representativeFirstName: 'Other',
      representativeLastName: 'Solicitor',
      solicitorOrg: { OrganisationID: 'OTHER', OrganisationName: 'Other organisation' },
    },
  },
];
const boundApplicants = [{ ...applicants[0], value: { ...applicants[0].value, solicitorOrg: organisation } }, applicants[1]];
const applicantEvent = {
  case_id: 'case-a',
  event_token: 'applicants-token',
  case_fields: [
    { id: 'applicants', value: applicants },
    { id: 'caseTypeOfApplication', value: 'C100' },
  ],
};
const caseReadback = {
  id: 'case-a',
  data: {
    applicants: boundApplicants,
  },
};

type Reply = { status: number; body: unknown };
function fixtureHarness(
  overrides: Partial<Record<'organisation' | 'applicants' | 'applicantSubmit' | 'persistedCase' | 'attachment', Reply>> = {}
) {
  const replies = {
    organisation: { status: 200, body: { organisationIdentifier: 'ACTUAL-ORG', name: 'Synthetic organisation' } },
    applicants: { status: 200, body: applicantEvent },
    applicantSubmit: { status: 201, body: caseReadback },
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
        if (url.includes('event-triggers/applicantsDetails')) return response(replies.applicants);
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
        return response(options.data.event.id === 'applicantsDetails' ? replies.applicantSubmit : { status: 201, body: {} });
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
        expect(options.apiEventId).toBe('testingSupportDummySolicitorCreate');
        expect(options.apiPayload).toEqual({ fieldValues: { caseTypeOfApplication: 'C100', applicantCaseName: 'known.pdf' } });
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
      'create',
      '/api/organisation',
      '/data/internal/cases/case-a/event-triggers/applicantsDetails?ignore-warning=false',
      'applicantsDetails',
      '/data/cases/case-a',
      'upload',
      '/data/internal/cases/case-a/event-triggers/otherProceedings?ignore-warning=false',
      'otherProceedings',
      '/data/internal/cases/case-a',
    ]);
    expect(harness.submissions[0]).toEqual({
      data: { caseTypeOfApplication: 'C100', applicants: boundApplicants },
      event: { id: 'applicantsDetails', summary: 'Bind synthetic applicant to the authenticated organisation' },
      event_token: 'applicants-token',
      ignore_warning: false,
    });
    expect(harness.submissions[1]).toMatchObject({
      data: {
        previousOrOngoingProceedingsForChildren: 'yes',
        existingProceedings: [{ value: { uploadRelevantOrder: document } }],
      },
      event: { id: 'otherProceedings' },
      event_token: 'document-token',
    });
    expect(applicants[0].value.solicitorOrg.OrganisationID).toBe('CANNED');
    expect(fixture.savedPaths).toEqual(['existingProceedings', 'existingProceedingsWithDoc']);
    expect(fixture.binaryPath).toBe('/documents/doc-a/binary?caseId=case-a');
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
      name: 'applicant event unavailable',
      replies: { applicants: { status: 403, body: {} } },
      error: 'applicant details event trigger failed with HTTP 403',
    },
    {
      name: 'applicant event token absent',
      replies: { applicants: { status: 200, body: { ...applicantEvent, event_token: '' } } },
      error: 'applicant details event token is missing',
    },
    {
      name: 'applicant records absent',
      replies: { applicants: { status: 200, body: { ...applicantEvent, case_fields: [] } } },
      error: 'applicant details event did not return the saved C100 applicants',
    },
    {
      name: 'applicant submission failed',
      replies: { applicantSubmit: { status: 422, body: {} } },
      error: 'applicant details submission failed with HTTP 422',
    },
    {
      name: 'applicant readback failed',
      replies: { persistedCase: { status: 403, body: {} } },
      error: 'applicant organisation readback failed with HTTP 403',
    },
    {
      name: 'wrong case read back',
      replies: { persistedCase: { status: 200, body: { ...caseReadback, id: 'other-case' } } },
      error: 'applicant organisation readback did not confirm',
    },
    {
      name: 'saved applicant absent',
      replies: { persistedCase: { status: 200, body: { id: 'case-a', data: {} } } },
      error: 'applicant organisation readback did not confirm',
    },
    {
      name: 'wrong applicant read back',
      replies: {
        persistedCase: {
          status: 200,
          body: { id: 'case-a', data: { applicants: [{ ...boundApplicants[0], id: 'different-applicant' }] } },
        },
      },
      error: 'applicant organisation readback did not confirm',
    },
    {
      name: 'organisation name not persisted',
      replies: {
        persistedCase: {
          status: 200,
          body: {
            id: 'case-a',
            data: {
              applicants: [
                {
                  ...boundApplicants[0],
                  value: {
                    ...boundApplicants[0].value,
                    solicitorOrg: { ...organisation, OrganisationName: 'Wrong organisation' },
                  },
                },
              ],
            },
          },
        },
      },
      error: 'applicant organisation readback did not confirm',
    },
    {
      name: 'applicant organisation not persisted',
      replies: { persistedCase: { status: 200, body: { id: 'case-a', data: { ...caseReadback.data, applicants } } } },
      error: 'applicant organisation readback did not confirm',
    },
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
