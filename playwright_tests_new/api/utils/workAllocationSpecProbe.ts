import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import * as apiTestUtils from './apiTestUtils';
import * as workAllocationUtils from './workAllocationUtils';

type ApiClient = { get: (url: string, options: unknown) => Promise<{ status: number; data: unknown }> };
type CaseCallback = (fixtures: { apiClient: ApiClient }) => Promise<void>;

/** Execute the registered catalogue test with a fake client but its real status and response checks. */
export function loadTaskNamesTest(): CaseCallback {
  let callback: CaseCallback | undefined;
  const register = (name: string, optionsOrCallback: unknown, optionalCallback?: unknown) => {
    const handler = optionalCallback ?? optionsOrCallback;
    if (name === 'GET /workallocation/taskNames returns catalogue of available task type names') {
      callback = handler as CaseCallback;
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
      if (specifier === './fixtures') return { test: fakeTest };
      if (specifier === './utils/apiTestUtils') return apiTestUtils;
      if (specifier === './utils/workAllocationUtils') return workAllocationUtils;
      return {};
    },
  });
  if (!callback) throw new Error('Task names test was not registered');
  return callback;
}
