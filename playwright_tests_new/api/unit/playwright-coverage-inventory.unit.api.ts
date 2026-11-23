import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const inventory = require('../../../scripts/playwright-coverage-inventory.cjs') as {
  summarize: (discovery: Record<string, unknown>) => Record<string, unknown>;
  revisionMetadata: (git: (_command: string, arguments_: string[]) => string) => Record<string, unknown>;
};

test('coverage inventory marks a dirty worktree beside its base revision', { tag: '@svc-internal' }, () => {
  const git = (_command: string, arguments_: string[]) =>
    arguments_[0] === 'rev-parse' ? '74e5ed9\n' : ' M playwright_tests_new/README.md\n';
  expect(inventory.revisionMetadata(git)).toEqual({ revision: '74e5ed9', workingTreeDirty: true });
  expect(inventory.revisionMetadata((_command, arguments_) => (arguments_[0] === 'rev-parse' ? '74e5ed9\n' : ''))).toEqual({
    revision: '74e5ed9',
    workingTreeDirty: false,
  });
});

test(
  'coverage inventory separates service checks, support checks, default exclusions and advisory accessibility',
  {
    tag: '@svc-internal',
  },
  () => {
    const spec = (id: string, file: string, tags: string[] = []) => ({ id, file, line: 1, title: id, tags });
    const summary = inventory.summarize({
      api: [
        spec('api', 'playwright_tests_new/api/contracts.api.ts'),
        spec('unit', 'playwright_tests_new/api/unit/helper.unit.api.ts'),
        spec('internal', 'playwright_tests_new/api/coverage-helpers.api.ts', ['svc-internal']),
        spec('contract', 'playwright_tests_new/api/contract-tests.api.ts', ['svc-work-allocation']),
      ],
      integration: [spec('active', 'playwright_tests_new/integration/test/active.spec.ts')],
      integrationAll: [
        spec('active', 'playwright_tests_new/integration/test/active.spec.ts'),
        spec('excluded', 'playwright_tests_new/integration/test/excluded.spec.ts', ['blocked-exui-5591']),
      ],
      e2e: [spec('live', 'playwright_tests_new/E2E/test/live.spec.ts')],
      e2eA11y: [
        spec('live', 'playwright_tests_new/E2E/test/live.spec.ts'),
        spec('a11y', 'playwright_tests_new/E2E/test/a11y.a11y.spec.ts', ['accessibility']),
      ],
    });

    expect(summary).toMatchObject({
      api: { serviceOrContract: 2, supportUnit: 2 },
      integration: { runnable: 1, discovered: 2, defaultExcluded: 1 },
      e2e: { runnable: 1 },
      accessibility: { advisoryDiscovered: 1 },
    });
    expect(summary.integration).toHaveProperty('excluded', [
      { file: 'playwright_tests_new/integration/test/excluded.spec.ts', line: 1, title: 'excluded', tags: ['blocked-exui-5591'] },
    ]);
  }
);
