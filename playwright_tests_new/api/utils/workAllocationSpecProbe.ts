import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { expect } from '@playwright/test';
import * as apiTestUtils from './apiTestUtils';
import * as workAllocationUtils from './workAllocationUtils';

type ApiClient = { get: (url: string, options: unknown) => Promise<{ status: number; data: unknown }> };
type CaseCallback = (fixtures: { apiClient: ApiClient }) => Promise<void>;
type DashboardCallback = (fixtures: {
  apiClientFor: (
    role: string
  ) => Promise<{ post: (url: string, options: unknown) => Promise<{ status: number; data: unknown }> }>;
}) => Promise<void>;

/** Execute a registered API test with fake transport and real assertions. */
function loadRegisteredTest(name: string): unknown {
  let callback: unknown;
  const register = (registeredName: string, optionsOrCallback: unknown, optionalCallback?: unknown) => {
    const handler = optionalCallback ?? optionsOrCallback;
    if (registeredName === name) {
      callback = handler;
    }
  };
  const fakeTest = Object.assign(register, {
    describe: (_name: string, optionsOrCallback: unknown, optionalCallback?: unknown) => {
      const describeCallback = optionalCallback ?? optionsOrCallback;
      (describeCallback as () => void)();
    },
    setTimeout: () => undefined,
  });
  const source = fs.readFileSync(path.resolve('playwright_tests_new/api/work-allocation.api.ts'), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
  vm.runInNewContext(outputText, {
    exports: {},
    require: (specifier: string) => {
      if (specifier === './fixtures') return { test: fakeTest, expect };
      if (specifier === './utils/apiTestUtils')
        return {
          ...apiTestUtils,
          withXsrf: async (_role: string, run: (headers: Record<string, string>) => Promise<unknown>) => run({}),
        };
      if (specifier === './utils/workAllocationUtils') return workAllocationUtils;
      if (specifier === './utils/work-allocation') return { buildCaseSearchRequest: () => ({}) };
      return {};
    },
    Array,
    Number,
    Object,
    Promise,
    String,
  });
  if (!callback) throw new Error(`${name} was not registered`);
  return callback;
}

export function loadTaskNamesTest(): CaseCallback {
  return loadRegisteredTest('GET /workallocation/taskNames returns catalogue of available task type names') as CaseCallback;
}

export function loadMyWorkTest(endpoint: string): DashboardCallback {
  return loadRegisteredTest(`${endpoint} returns data or guarded status`) as DashboardCallback;
}
