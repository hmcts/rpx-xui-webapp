import { expect, test } from '@playwright/test';
import { spawnSync } from 'node:child_process';

test('Playwright version verifier passes its Node contract suite', () => {
  const result = spawnSync(process.execPath, ['--test', 'playwright_tests_new/common/playwright-version.test.cjs'], {
    encoding: 'utf8',
  });

  expect(result.error).toBeUndefined();
  expect(result.status, `${result.stdout}\n${result.stderr}`).toBe(0);
});
