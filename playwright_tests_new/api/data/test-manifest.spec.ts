import { expect, test } from '@playwright/test';
import { loadTestManifestSync } from './test-manifest';

test.describe('test-manifest loader', () => {
  test('loads manifest and returns object', async () => {
    const manifest = loadTestManifestSync();
    expect(manifest).toBeTruthy();
    expect(typeof manifest).toBe('object');
    expect(manifest.wa?.unassignedTaskId).toBeTruthy();
    expect(manifest.roleAccess?.caseId).toBeTruthy();
  });
});
