import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { expect, test } from '@playwright/test';
import ts from 'typescript';

// Load the actual helper with scoped dependency fakes: no captured sessions, network or browser.
test.describe('dynamic field mock session selection', { tag: '@svc-internal' }, () => {
  for (const skipSessionCookies of [false, true]) {
    test(`${skipSessionCookies ? 'explicit mock session skips' : 'default preserves'} cookie bootstrap and installs the journey`, async () => {
      const calls: string[] = [];
      const routes = new Map<string, (route: unknown) => Promise<void>>();
      const userDetails = { userInfo: { id: 'synthetic-solicitor' } };
      const trigger = { id: 'synthetic-create-case-trigger' };
      const exports: Record<string, (...args: unknown[]) => Promise<void>> = {};
      const source = fs.readFileSync(
        path.resolve('playwright_tests_new/integration/helpers/dynamicFieldConfigMockRoutes.helper.ts'),
        'utf8'
      );
      const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
      vm.runInNewContext(outputText, {
        exports,
        require: (specifier: string) => {
          if (specifier.endsWith('/sessionCapture')) {
            return { applySessionCookies: async (_page: unknown, user: string) => calls.push(`cookies:${user}`) };
          }
          if (specifier.endsWith('/hearings.mock')) return { buildHearingsUserDetailsMock: () => userDetails };
          if (specifier.endsWith('/dynamicFieldConfig.mock')) return { dynamicFieldConfigCaseData: () => trigger };
          throw new Error(`Unexpected helper dependency: ${specifier}`);
        },
      });
      const page = {
        addInitScript: async (_callback: unknown, userInfo: unknown) => {
          expect(userInfo).toEqual(userDetails.userInfo);
          calls.push('seed-user');
        },
        route: async (pattern: string, handler: (route: unknown) => Promise<void>) => routes.set(pattern, handler),
        goto: async (url: string) => calls.push(`goto:${url}`),
      };
      await exports.openDynamicFieldConfigJourney(...(skipSessionCookies ? [page, { skipSessionCookies: true }] : [page]));
      expect(calls).toEqual([
        ...(skipSessionCookies ? [] : ['cookies:SOLICITOR']),
        'seed-user',
        'goto:/cases/case-create/DIVORCE/xuiTestJurisdiction/createCase/',
      ]);
      expect([...routes.keys()]).toEqual([
        '**/api/user/details*',
        '**/data/internal/case-types/xuiTestJurisdiction/event-triggers/createCase*',
        '**/data/case-types/xuiTestJurisdiction/validate*',
      ]);
      const responses: Array<{ status: number; body: string }> = [];
      for (const handler of routes.values()) {
        await handler({
          request: () => ({ postDataJSON: () => ({ data: { CaseTitle: 'Retained value' } }), url: () => '/validate' }),
          fulfill: async (response: { status: number; body: string }) => responses.push(response),
        });
      }
      expect(responses.map((response) => response.status)).toEqual([200, 200, 200]);
      expect(responses.map((response) => JSON.parse(response.body))).toEqual([
        userDetails,
        trigger,
        { data: { CaseTitle: 'Retained value' }, _links: { self: { href: '/validate' } } },
      ]);
    });
  }
});
