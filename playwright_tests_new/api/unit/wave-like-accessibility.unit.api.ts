import { expect, test, type Page, type TestInfo } from '@playwright/test';
import fs from 'fs/promises';
import { JSDOM } from 'jsdom';
import os from 'os';
import path from 'path';

import {
  attachWaveLikeAccessibilityEvidence,
  collectWaveLikeAccessibilityViolations,
  includesWaveLikeA11y,
  WAVE_LIKE_A11Y_TAG,
} from '../../E2E/utils/accessibility/waveLikeAccessibility';

type DomGlobals = typeof globalThis & {
  window?: Window & typeof globalThis;
  document?: Document;
  Element?: typeof Element;
  HTMLElement?: typeof HTMLElement;
  HTMLInputElement?: typeof HTMLInputElement;
  HTMLSelectElement?: typeof HTMLSelectElement;
  HTMLTextAreaElement?: typeof HTMLTextAreaElement;
  HTMLButtonElement?: typeof HTMLButtonElement;
  HTMLOutputElement?: typeof HTMLOutputElement;
  Node?: typeof Node;
  CSS?: typeof CSS;
};

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

  test('adds developer advice and DOM hints to WAVE-like evidence', async () => {
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
    expect(htmlAttachment?.body?.toString()).toContain('DOM hints');
    expect(htmlAttachment?.body?.toString()).toContain('search selector #continue');
    expect(htmlAttachment?.body?.toString()).toContain('class: govuk-button');
    expect(htmlAttachment?.body?.toString()).toContain(
      'Fix the template first: add visible text, a govukLabel/label for the control, aria-label, or aria-labelledby.'
    );

    const json = await fs.readFile(path.join(evidenceDir, 'issue-state-wave-accessibility-issues.json'), 'utf8');
    expect(json).toContain('"classes": "govuk-button"');
    expect(json).toContain('"advice": "Fix the template first: add visible text, a govukLabel/label for the control');
  });

  test('derives DOM hints from the rendered page before publishing WAVE-like evidence', async () => {
    const dom = new JSDOM(`
      <!doctype html>
      <html>
        <head><title>Issue page</title></head>
        <body>
          <main class="govuk-main-wrapper">
            <h1>Case details</h1>
            <button id="continue" class="govuk-button" _ngcontent-c0></button>
          </main>
        </body>
      </html>
    `);
    const globalScope = globalThis as DomGlobals;
    const previousGlobals: Partial<DomGlobals> = {
      window: globalScope.window,
      document: globalScope.document,
      Element: globalScope.Element,
      HTMLElement: globalScope.HTMLElement,
      HTMLInputElement: globalScope.HTMLInputElement,
      HTMLSelectElement: globalScope.HTMLSelectElement,
      HTMLTextAreaElement: globalScope.HTMLTextAreaElement,
      HTMLButtonElement: globalScope.HTMLButtonElement,
      HTMLOutputElement: globalScope.HTMLOutputElement,
      Node: globalScope.Node,
      CSS: globalScope.CSS,
    };

    const page = {
      evaluate: async <T>(callback: () => T) => {
        globalScope.window = dom.window as Window & typeof globalThis;
        globalScope.document = dom.window.document;
        globalScope.Element = dom.window.Element;
        globalScope.HTMLElement = dom.window.HTMLElement;
        globalScope.HTMLInputElement = dom.window.HTMLInputElement;
        globalScope.HTMLSelectElement = dom.window.HTMLSelectElement;
        globalScope.HTMLTextAreaElement = dom.window.HTMLTextAreaElement;
        globalScope.HTMLButtonElement = dom.window.HTMLButtonElement;
        globalScope.HTMLOutputElement = dom.window.HTMLOutputElement;
        globalScope.Node = dom.window.Node;
        globalScope.CSS = dom.window.CSS;
        dom.window.HTMLElement.prototype.getClientRects = () => [{ width: 100, height: 20 }] as DOMRectList;

        try {
          return callback();
        } finally {
          Object.assign(globalScope, previousGlobals);
        }
      },
    } as unknown as Page;

    const violations = await collectWaveLikeAccessibilityViolations(page);
    const accessibleNameViolation = violations.find((violation) => violation.rule === 'accessible-name');

    expect(accessibleNameViolation?.selector).toBe('#continue');
    expect(accessibleNameViolation?.codeLocation).toMatchObject({
      tag: 'button',
      id: 'continue',
      classes: 'govuk-button',
      nearestHeading: 'h1: Case details',
      nearestLandmark: 'main .govuk-main-wrapper',
    });
    expect(accessibleNameViolation?.codeLocation?.angularAttrs).toBe('_ngcontent-c0');
  });
});
