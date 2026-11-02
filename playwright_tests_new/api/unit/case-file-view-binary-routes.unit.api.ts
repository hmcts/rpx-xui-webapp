import { expect, test, type Page } from '@playwright/test';

import {
  setupCaseFileViewDocumentBinaryMockRoutes,
  setupCaseFileViewMockRoutes,
} from '../../integration/helpers/caseFileViewMockRoutes.helper';
import { CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF } from '../../integration/mocks/caseFileView.mock';

test.describe('Case file view binary mock routes', { tag: '@svc-internal' }, () => {
  for (const exclusionList of ['PRLAPPS', '']) {
    test(`aligns fixture document URLs with gateway configuration for exclusions ${exclusionList || '(none)'}`, async () => {
      const registrations: Array<{ pattern: unknown; handler: (route: unknown) => Promise<void> }> = [];
      const page = {
        route: async (pattern: unknown, handler: (route: unknown) => Promise<void>) => {
          registrations.push({ pattern, handler });
        },
      } as unknown as Page;
      await setupCaseFileViewMockRoutes(page, '1690807693531270', { cdamExclusionList: exclusionList });
      const configRoute = registrations.find(({ pattern }) => pattern === '**/assets/config/config.json*');
      expect(configRoute).toBeDefined();
      const appConfig = { caseEditorConfig: { remote_document_management_url: 'https://different-ci-store/documents' } };
      let fulfilledConfig: unknown;
      await configRoute!.handler({
        fetch: async () => ({ json: async () => appConfig }),
        fulfill: async (response: { json: unknown }) => {
          fulfilledConfig = response.json;
        },
      });
      expect(fulfilledConfig).toEqual({
        caseEditorConfig: {
          remote_document_management_url: 'http://localhost:3000/documents',
          document_management_url: '/documents',
          document_management_url_v2: '/documentsv2',
          documentSecureModeCaseTypeExclusions: exclusionList,
          mc_cdam_exclusion_list: exclusionList,
        },
      });
    });
  }

  for (const gateway of ['documents', 'documentsv2']) {
    for (const query of ['', '?case_id=1690807693531270', '?caseId=1690807693531270&download=true']) {
      test(`records and fulfills ${gateway} binary requests with query ${query || '(none)'}`, async () => {
        const registrations: Array<{ pattern: RegExp; handler: (route: unknown) => Promise<void> }> = [];
        const page = {
          route: async (pattern: RegExp, handler: (route: unknown) => Promise<void>) => {
            registrations.push({ pattern, handler });
          },
        } as unknown as Page;
        const observedRequests: string[] = [];
        await setupCaseFileViewDocumentBinaryMockRoutes(page, (url) => observedRequests.push(url));

        const url = `https://exui.test/${gateway}/33333333-3333-3333-3333-333333333333/binary${query}`;
        const matches = registrations.filter(({ pattern }) => pattern.test(url));
        expect(matches).toHaveLength(1);

        const fulfilledResponses: unknown[] = [];
        await matches[0].handler({
          request: () => ({ url: () => url }),
          fulfill: async (response: unknown) => {
            fulfilledResponses.push(response);
          },
        });
        expect(observedRequests).toEqual([url]);
        expect(fulfilledResponses).toEqual([
          {
            status: 200,
            contentType: 'application/pdf',
            body: CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF,
          },
        ]);
        expect(registrations.some(({ pattern }) => pattern.test(`${url.split('?')[0]}/other`))).toBe(false);
        expect(registrations.some(({ pattern }) => pattern.test(`${url.split('?')[0]}-extra`))).toBe(false);
      });
    }
  }
});
