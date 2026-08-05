import { expect, test, type TestInfo } from '@playwright/test';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { publishAccessibilityEvidence } from '../../E2E/utils/accessibility/accessibilityEvidencePublisher';

test.describe('accessibility evidence publisher', { tag: '@svc-internal' }, () => {
  const previousEvidenceDir = process.env.PW_A11Y_EVIDENCE_DIR;

  test.afterEach(() => {
    if (previousEvidenceDir === undefined) {
      delete process.env.PW_A11Y_EVIDENCE_DIR;
      return;
    }
    process.env.PW_A11Y_EVIDENCE_DIR = previousEvidenceDir;
  });

  test('writes files, manifest entry, and browseable index', async () => {
    const evidenceDir = fs.mkdtempSync(path.join(os.tmpdir(), 'a11y-evidence-'));
    process.env.PW_A11Y_EVIDENCE_DIR = evidenceDir;

    await publishAccessibilityEvidence(fakeTestInfo('Case details smoke'), {
      attachmentPrefix: 'case-details-axe',
      entry: {
        engine: 'axe',
        feature: 'case details',
        pageState: 'summary tab',
        violationCount: 1,
        rules: ['html-has-lang'],
        targets: ['html'],
      },
      html: '<html><body>issue</body></html>',
      json: { ok: false },
      screenshot: Buffer.from('png'),
      screenshotSuffix: '-highlighted-screenshot.png',
    });

    const manifest = JSON.parse(fs.readFileSync(path.join(evidenceDir, 'manifest.json'), 'utf8'));
    expect(manifest).toHaveLength(1);
    expect(manifest[0]).toMatchObject({
      engine: 'axe',
      testTitle: 'Case details smoke',
      htmlFileName: 'case-details-smoke-case-details-axe.html',
      jsonFileName: 'case-details-smoke-case-details-axe.json',
      screenshotFileName: 'case-details-smoke-case-details-axe-highlighted-screenshot.png',
    });
    expect(fs.existsSync(path.join(evidenceDir, 'manifest-entry-case-details-smoke-case-details-axe.json'))).toBe(true);
    expect(fs.readFileSync(path.join(evidenceDir, 'index.html'), 'utf8')).toContain('Case details smoke');

    fs.rmSync(evidenceDir, { recursive: true, force: true });
  });
});

function fakeTestInfo(title: string): TestInfo {
  return {
    title,
    attach: async () => undefined,
  } as unknown as TestInfo;
}
