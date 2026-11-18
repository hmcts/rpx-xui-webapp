import { expect, test } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

test.describe('accessibility remediation pack', { tag: '@svc-internal' }, () => {
  test('passes the browser-free generator and report integration checks', () => {
    const testFile = fileURLToPath(new URL('../../common/reporters/accessibility-remediation.test.cjs', import.meta.url));
    const result = spawnSync(process.execPath, ['--test', testFile], { encoding: 'utf8' });
    expect(result.status, result.error?.message || result.stderr + result.stdout).toBe(0);
  });
});
