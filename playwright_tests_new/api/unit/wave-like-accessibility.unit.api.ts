import { expect, test, type Page, type TestInfo } from '@playwright/test';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

import {
  attachWaveLikeAccessibilityEvidence,
  includesWaveLikeA11y,
  WAVE_LIKE_A11Y_TAG,
} from '../../E2E/utils/accessibility/waveLikeAccessibility';

test.describe('WAVE-like accessibility tag contract', { tag: '@svc-internal' }, () => {
  test('uses the PR-actionable WAVE-like accessibility tag', () => {
    expect(WAVE_LIKE_A11Y_TAG).toBe('@wave-a11y');
  });

  test('keeps WAVE-like accessibility off by default', () => {
    expect(includesWaveLikeA11y({})).toBe(false);
  });

  test('allows parameterized WAVE-like accessibility runs by tag or switch', () => {
    expect(includesWaveLikeA11y({ E2E_PW_INCLUDE_TAGS: '@wave-a11y' })).toBe(true);
    expect(includesWaveLikeA11y({ PLAYWRIGHT_TAGS: '@wave-a11y' })).toBe(true);
    expect(includesWaveLikeA11y({ PLAYWRIGHT_INCLUDE_WAVE_A11Y: 'true' })).toBe(true);
  });

  test('adds developer advice and code-location hints to WAVE-like evidence', async () => {
    const evidenceDir = await fs.mkdtemp(path.join(os.tmpdir(), 'webapp-wave-advice-'));
    const previousEvidenceDir = process.env.PW_A11Y_EVIDENCE_DIR;
    const attachments: Array<{ name: string; body: Buffer | string | undefined }> = [];
    let evaluateCalls = 0;

    process.env.PW_A11Y_EVIDENCE_DIR = evidenceDir;

    const page = {
      evaluate: async () => {
        evaluateCalls += 1;
        return evaluateCalls === 1
          ? {
              title: 'Issue page',
              headings: [],
              landmarks: [],
              order: [],
            }
          : undefined;
      },
      screenshot: async () => Buffer.from('screenshot'),
      url: () => 'https://manage-case.example.test/issue',
    } as unknown as Page;
    const testInfo = {
      title: 'issue state',
      attach: async (name: string, attachment: { body?: Buffer | string }) => attachments.push({ name, body: attachment.body }),
    } as unknown as TestInfo;

    try {
      await attachWaveLikeAccessibilityEvidence(
        page,
        testInfo,
        [
          {
            rule: 'accessible-name',
            message: 'Interactive controls and links should expose an accessible name.',
            selector: '#continue',
            html: '<button id="continue" class="govuk-button"></button>',
            codeLocation: {
              tag: 'button',
              id: 'continue',
              classes: 'govuk-button',
              nearestHeading: 'h1: Case details',
            },
          },
        ],
        'wave-accessibility-issues'
      );
    } finally {
      if (previousEvidenceDir === undefined) {
        delete process.env.PW_A11Y_EVIDENCE_DIR;
      } else {
        process.env.PW_A11Y_EVIDENCE_DIR = previousEvidenceDir;
      }
    }

    const htmlAttachment = attachments.find((attachment) => attachment.name === 'wave-accessibility-issues.html');
    expect(htmlAttachment?.body?.toString()).toContain('Developer advice');
    expect(htmlAttachment?.body?.toString()).toContain('What to fix');
    expect(htmlAttachment?.body?.toString()).toContain('class: govuk-button');
    expect(htmlAttachment?.body?.toString()).toContain(
      'Add visible text, a label, aria-label, or aria-labelledby so the control has an accessible name.'
    );

    const json = await fs.readFile(path.join(evidenceDir, 'issue-state-wave-accessibility-issues.json'), 'utf8');
    expect(json).toContain('"classes": "govuk-button"');
    expect(json).toContain(
      '"advice": "Add visible text, a label, aria-label, or aria-labelledby so the control has an accessible name."'
    );
  });
});
