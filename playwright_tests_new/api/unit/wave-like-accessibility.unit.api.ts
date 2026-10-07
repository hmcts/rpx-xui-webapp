import { expect, test, type Page, type TestInfo } from '@playwright/test';
import fs from 'fs/promises';
import { JSDOM } from 'jsdom';
import os from 'os';
import path from 'path';
import { guidanceForRule } from '../../E2E/utils/accessibility/waveLikeGuidance';

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
  test('maps guidance to relevant criteria without turning conventions into conformance failures', () => {
    expect(guidanceForRule('document-language').criteria).toContain('3.1.1');
    expect(guidanceForRule('text-spacing-clipping').criteria).toContain('1.4.12');
    expect(guidanceForRule('duplicate-id').criteria).not.toContain('4.1.1');
    expect(guidanceForRule('h1-count').criteria).toContain('not a standalone WCAG failure');
    expect(guidanceForRule('unknown').criteria).toContain('No verified criterion mapping');
  });
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
    const previousReportIndexFilename = process.env.PLAYWRIGHT_REPORT_INDEX_FILENAME;
    const attachments: Array<{ name: string; body: Buffer | string | undefined }> = [];
    let evaluateCalls = 0;

    process.env.PW_A11Y_EVIDENCE_DIR = evidenceDir;
    process.env.PLAYWRIGHT_REPORT_INDEX_FILENAME = 'xui-playwright-a11y.html';

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
          { rule: 'h1-count', message: 'Found 3 h1 elements.' },
          { rule: 'fieldset-legend', message: 'Fieldset has no legend containing text.', selector: 'fieldset' },
          {
            rule: 'custom-rule',
            message: '<script>alert(1)</script>',
            advice: 'Keep this custom advice <safe>',
            selector: `#${'long'.repeat(150)}`,
            codeLocation: { tag: '<img src=x onerror=alert(1)>', accessibleName: '<script>bad()</script>' },
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
      if (previousReportIndexFilename === undefined) {
        delete process.env.PLAYWRIGHT_REPORT_INDEX_FILENAME;
      } else {
        process.env.PLAYWRIGHT_REPORT_INDEX_FILENAME = previousReportIndexFilename;
      }
    }

    const htmlAttachment = attachments.find((attachment) => attachment.name === 'wave-accessibility-issues.html');
    expect(htmlAttachment?.body?.toString()).toContain('Developer advice');
    const report = new JSDOM(htmlAttachment?.body?.toString()).window.document;
    expect(report.documentElement.lang).toBe('en');
    expect(report.querySelectorAll('h1')).toHaveLength(1);
    expect(report.querySelector('a[href="#issue-1"]')).not.toBeNull();
    expect(report.querySelector('#issue-1')).not.toBeNull();
    expect(report.querySelector('.location dt')?.textContent).toBe('Page');
    expect(report.querySelector('.location')?.textContent).toContain('Case details');
    expect(report.body.textContent).toContain('How to verify');
    expect(report.querySelectorAll('script, [onerror]')).toHaveLength(0);
    expect(report.querySelectorAll('.issue')).toHaveLength(4);
    expect(report.querySelector('#issue-2')?.textContent).toContain(
      'Multiple h1 elements alone do not establish a WCAG failure.'
    );
    expect(report.querySelector('#issue-2')?.textContent).toContain('No element context was captured');
    expect(report.querySelector('#issue-3')?.textContent).toContain('a visually hidden legend can be valid');
    expect(report.querySelector('#issue-4')?.textContent).toContain('Keep this custom advice <safe>');
    expect(report.querySelector('#issue-4 .location')?.textContent).toContain('long'.repeat(150));
    for (const link of report.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      expect(report.getElementById(link.hash.slice(1))).not.toBeNull();
    }
    expect(report.querySelector('#order[open]')).toBeNull();
    expect(report.querySelector('meta[name="viewport"]')).not.toBeNull();
    expect(htmlAttachment?.body?.toString()).toContain('<a href="../xui-playwright-a11y.html">Back to Odhín report</a>');
    expect(htmlAttachment?.body?.toString()).toContain('What to fix');
    expect(htmlAttachment?.body?.toString()).toContain('DOM hints');
    expect(htmlAttachment?.body?.toString()).toContain('search selector #continue');
    expect(report.querySelector('pre')?.textContent).toContain('govuk-button');
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
            <fieldset><legend class="govuk-visually-hidden">Choose a response</legend></fieldset>
            <fieldset><legend> </legend></fieldset>
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
        globalScope.window = dom.window as unknown as Window & typeof globalThis;
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
        dom.window.HTMLElement.prototype.getClientRects = () => [{ width: 100, height: 20 }] as unknown as DOMRectList;

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
    expect(violations.filter((violation) => violation.rule === 'fieldset-legend')).toEqual([
      expect.objectContaining({
        selector: 'fieldset',
        message: 'Fieldset has no legend containing text.',
        html: '<fieldset><legend> </legend></fieldset>',
      }),
    ]);
  });
});
