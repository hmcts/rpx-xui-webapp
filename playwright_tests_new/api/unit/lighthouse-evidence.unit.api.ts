import { expect, test, type TestInfo } from '@playwright/test';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { runLighthouseAuditWithEvidence } from '../../E2E/utils/accessibility/lighthouseEvidence';

test.describe('Lighthouse accessibility evidence', { tag: '@svc-internal' }, () => {
  const previousEvidenceDir = process.env.PW_A11Y_EVIDENCE_DIR;

  test.afterEach(() => {
    restoreEnv('PW_A11Y_EVIDENCE_DIR', previousEvidenceDir);
  });

  test('fails with report evidence when Lighthouse does not generate native HTML', async () => {
    const evidenceDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lighthouse-evidence-'));
    process.env.PW_A11Y_EVIDENCE_DIR = evidenceDir;

    await expect(
      runLighthouseAuditWithEvidence(fakeTestInfo('Authenticated case list lighthouse'), async () => undefined, {
        feature: 'case list',
        pageState: 'authenticated',
        url: 'https://manage-case.example.test/cases',
      })
    ).rejects.toThrow('no generated Lighthouse HTML report');

    const manifest = JSON.parse(fs.readFileSync(path.join(evidenceDir, 'manifest.json'), 'utf8'));
    expect(manifest[0]).toMatchObject({
      engine: 'lighthouse',
      violationCount: 1,
      rules: ['lighthouse-report-missing'],
    });

    fs.rmSync(evidenceDir, { recursive: true, force: true });
  });
});

function restoreEnv(key: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[key];
    return;
  }

  process.env[key] = value;
}

function fakeTestInfo(title: string): TestInfo {
  return {
    title,
    attach: async () => undefined,
  } as unknown as TestInfo;
}
