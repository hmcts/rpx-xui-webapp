import { expect, test } from '@playwright/test';
import { uploadDocumentViaApi } from '../../E2E/utils/test-setup/uploadDocumentViaApi';
import { uploadEmploymentDraftDocumentViaApi } from '../../E2E/utils/test-setup/journeys/employmentJourneys';
import { TEST_CASES_URL } from './testAppUrls';

const sensitiveBody = 'private-response-sentinel';

test.describe('Document setup error diagnostics', { tag: '@svc-internal' }, () => {
  for (const failure of [
    'upload',
    'missing-fields',
    'invalid-json',
    'event-trigger',
    'event-trigger-json',
    'event-submit',
  ] as const) {
    test(`keeps useful ${failure} diagnostics without exposing response bodies`, async () => {
      const uploadBody =
        failure === 'invalid-json'
          ? sensitiveBody
          : JSON.stringify({
              privateData: sensitiveBody,
              documents:
                failure === 'missing-fields'
                  ? []
                  : [{ originalDocumentName: 'seed.pdf', _links: { self: { href: '/document' }, binary: { href: '/binary' } } }],
            });
      const consent = { first: () => consent, isVisible: async () => false };
      const page = {
        context: () => ({ cookies: async () => [{ name: 'XSRF-TOKEN', value: 'synthetic-xsrf' }] }),
        getByRole: () => consent,
        isClosed: () => false,
        url: () => TEST_CASES_URL,
        request: {
          fetch: async () => ({
            ok: () => failure !== 'upload',
            status: () => (failure === 'upload' ? 500 : 200),
            text: async () => uploadBody,
          }),
          get: async () => ({
            ok: () => failure !== 'event-trigger',
            status: () => (failure === 'event-trigger' ? 503 : 200),
            text: async () => sensitiveBody,
            json: async () => {
              if (failure === 'event-trigger-json') return JSON.parse(sensitiveBody);
              return { event_token: 'synthetic-event-token' };
            },
          }),
          post: async () => ({ ok: () => false, status: () => 503, text: async () => sensitiveBody }),
        },
      };
      const options = {
        page: page as never,
        caseNumber: '1234567890123456',
        jurisdictionId: 'EMPLOYMENT',
        caseTypeId: 'ET_EnglandWales',
        fileName: 'seed.pdf',
        mimeType: 'application/pdf',
        fileContent: '%PDF-1.4\n%%EOF',
      };
      const action = failure.startsWith('event-') ? uploadEmploymentDraftDocumentViaApi(options) : uploadDocumentViaApi(options);
      const error = await action.then(
        () => undefined,
        (reason: Error) => reason
      );

      expect(error).toBeInstanceOf(Error);
      expect(error!.message).not.toContain(sensitiveBody);
      const expected = {
        upload: /Document upload API failed with HTTP 500/,
        'missing-fields': /missing CCD document fields/,
        'invalid-json': /Document upload API returned invalid JSON/,
        'event-trigger': /failed to fetch event trigger \(HTTP 503\)/,
        'event-trigger-json': /event trigger returned invalid JSON \(HTTP 200\)/,
        'event-submit': /submit failed \(HTTP 503\)/,
      };
      expect(error!.message).toMatch(expected[failure]);
    });
  }
});
