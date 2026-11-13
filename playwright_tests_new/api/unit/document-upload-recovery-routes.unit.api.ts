import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { expect, test as base, type Page, type Request, type Route } from '@playwright/test';
import ts from 'typescript';
import * as documentMocks from '../../integration/mocks/documentUploadRecovery.mock';

type UploadScenario = 'recovery' | 'first-attempt-success' | 'repeated-rejection';
type CapturedRequests = { uploadRequests: Request[]; createCaseRequests: Request[] };
type RouteResponse = { status: number; contentType: string; body: string };
type JourneyHarness = {
  open: (scenario?: UploadScenario) => Promise<CapturedRequests>;
  upload: (filename: string) => Promise<RouteResponse>;
  request: (method: string, url: string) => void;
};

const test = base.extend<{ journeyHarness: JourneyHarness }>({
  journeyHarness: async ({}, use) => {
    const routes = new Map<string | RegExp, (route: Route) => Promise<void>>();
    let requestListener: (request: Request) => void;
    const page = {
      on: (_event: string, listener: (request: Request) => void) => {
        requestListener = listener;
      },
      route: async (pattern: string | RegExp, handler: (route: Route) => Promise<void>) => {
        routes.set(pattern, handler);
      },
    } as unknown as Page;
    const exports: {
      openDocumentUploadRecoveryJourney?: (page: Page, scenario?: UploadScenario) => Promise<CapturedRequests>;
    } = {};
    const source = fs.readFileSync(
      path.resolve('playwright_tests_new/integration/helpers/documentUploadRecoveryMockRoutes.helper.ts'),
      'utf8'
    );
    vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, {
      exports,
      URL,
      require: (specifier: string) => {
        if (specifier.endsWith('/caseworkerJurisdictionMockRoutes.helper')) {
          return { setupCaseworkerJurisdictionsRoute: async () => undefined };
        }
        if (specifier.endsWith('/dynamicFieldConfigMockRoutes.helper')) {
          return { openDynamicFieldConfigJourney: async () => undefined };
        }
        if (specifier.endsWith('/xuiAppShellMockRoutes.helper')) {
          return { setupXuiAppShellBaseRoutes: async () => undefined };
        }
        if (specifier.endsWith('/hearings.mock')) return { buildHearingsUserDetailsMock: () => ({}) };
        if (specifier.endsWith('/documentUploadRecovery.mock')) return documentMocks;
        throw new Error(`Unexpected route helper dependency: ${specifier}`);
      },
    });
    await use({
      open: (scenario) => exports.openDocumentUploadRecoveryJourney!(page, scenario),
      upload: async (filename) => {
        const responses: RouteResponse[] = [];
        const request = { postData: () => `filename="${filename}"` } as Request;
        await routes.get('**/documentsv2')!({
          request: () => request,
          fulfill: async (response: RouteResponse) => {
            responses.push(response);
          },
        } as unknown as Route);
        return responses[0];
      },
      request: (method, url) => requestListener({ method: () => method, url: () => url } as Request),
    });
  },
});

test.describe('Document upload recovery mock routes', { tag: '@svc-internal' }, () => {
  test('preserves default rejection then accepts only the expected replacement', async ({ journeyHarness }) => {
    const requests = await journeyHarness.open();
    const rejected = await journeyHarness.upload(documentMocks.DOCUMENT_UPLOAD_RECOVERY_FILE);
    const originalRetry = await journeyHarness.upload(documentMocks.DOCUMENT_UPLOAD_RECOVERY_FILE);
    const replacement = await journeyHarness.upload(documentMocks.DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE);

    expect([rejected.status, originalRetry.status, replacement.status]).toEqual([502, 400, 200]);
    expect(JSON.parse(replacement.body)).toEqual(documentMocks.successfulDocumentUploadResponse());
    expect(requests.uploadRequests).toHaveLength(3);
  });

  test('accepts the expected replacement on the first attempt in the success scenario', async ({ journeyHarness }) => {
    const requests = await journeyHarness.open('first-attempt-success');
    const response = await journeyHarness.upload(documentMocks.DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE);

    expect(response.status).toBe(200);
    expect(JSON.parse(response.body)).toEqual(documentMocks.successfulDocumentUploadResponse());
    expect(requests.uploadRequests).toHaveLength(1);
  });

  test('keeps both attempts rejected in the repeated-rejection scenario', async ({ journeyHarness }) => {
    const requests = await journeyHarness.open('repeated-rejection');
    const first = await journeyHarness.upload(documentMocks.DOCUMENT_UPLOAD_RECOVERY_FILE);
    const second = await journeyHarness.upload(documentMocks.DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE);

    expect([first.status, second.status]).toEqual([422, 422]);
    expect(first.contentType).toBe('text/plain');
    expect(first.body).toBe(documentMocks.DOCUMENT_UPLOAD_REJECTION_BODY);
    expect(second).toEqual(first);
    expect(requests.uploadRequests).toHaveLength(2);
  });

  test('does not accept an unexpected filename in the first-attempt success scenario', async ({ journeyHarness }) => {
    await journeyHarness.open('first-attempt-success');
    const response = await journeyHarness.upload(documentMocks.DOCUMENT_UPLOAD_RECOVERY_FILE);

    expect(response.status).toBe(400);
  });

  test('counts only case-creation POSTs independently of query strings', async ({ journeyHarness }) => {
    const requests = await journeyHarness.open();
    const caseUrl = 'http://example.invalid/data/case-types/xuiTestJurisdiction/cases';
    journeyHarness.request('POST', `${caseUrl}?unexpected=true`);
    journeyHarness.request('POST', caseUrl);
    journeyHarness.request('GET', `${caseUrl}?ignore-warning=false`);
    journeyHarness.request('POST', `${caseUrl}/validate`);

    expect(requests.createCaseRequests).toHaveLength(2);
  });

  test('starts each journey with its own upload counter', async ({ journeyHarness }) => {
    const firstJourney = await journeyHarness.open();
    await journeyHarness.upload(documentMocks.DOCUMENT_UPLOAD_RECOVERY_FILE);
    const secondJourney = await journeyHarness.open();
    const response = await journeyHarness.upload(documentMocks.DOCUMENT_UPLOAD_RECOVERY_FILE);

    expect(response.status).toBe(502);
    expect(firstJourney.uploadRequests).toHaveLength(1);
    expect(secondJourney.uploadRequests).toHaveLength(1);
    expect(firstJourney.uploadRequests).not.toBe(secondJourney.uploadRequests);
  });
});
