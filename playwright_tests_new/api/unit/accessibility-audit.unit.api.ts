import * as fs from 'node:fs';
import { JSDOM } from 'jsdom';
import * as os from 'node:os';
import * as path from 'node:path';
import { expect, test, type Page, type TestInfo } from '@playwright/test';

import {
  auditAccessibilityPage,
  isAccessibilityStrictMode,
  resolveAccessibilityEngines,
  type AccessibilityEngine,
} from '../../E2E/utils/accessibility/accessibilityAudit';

import {
  attachAccessibilityPageSummaryEvidence,
  collectScreenReaderLikeAccessibilityViolations,
} from '../../E2E/utils/accessibility/screenReaderLikeAccessibility';

const defaultEngines: AccessibilityEngine[] = ['axe', 'wave-like', 'screen-reader', 'lighthouse'];

test.describe('Unified accessibility audit contract', { tag: '@svc-internal' }, () => {
  const previousEngines = process.env.A11Y_ENGINES;
  const previousPlaywrightEngines = process.env.PLAYWRIGHT_A11Y_ENGINES;
  const previousStrict = process.env.A11Y_STRICT;

  test.afterEach(() => {
    restoreEnv('A11Y_ENGINES', previousEngines);
    restoreEnv('PLAYWRIGHT_A11Y_ENGINES', previousPlaywrightEngines);
    restoreEnv('A11Y_STRICT', previousStrict);
  });

  test('skips an unselected engine lane without publishing clean coverage', async () => {
    process.env.A11Y_ENGINES = 'lighthouse';
    let reason = '';
    const info = {
      skip: (_condition: boolean, description: string) => {
        reason = description;
        throw new Error('skipped');
      },
      attach: async () => {
        throw new Error('must not publish');
      },
    } as unknown as TestInfo;
    await expect(
      auditAccessibilityPage({} as Page, info, { defaultEngines: ['axe'], feature: 'query', pageState: 'form' })
    ).rejects.toThrow('skipped');
    expect(reason).toContain('No accessibility engines selected');
  });

  test('recognises Welsh skip links and rejects missing or unrelated targets', async () => {
    for (const [link, target, expected] of [
      ['<a class="govuk-skip-link" href="#main">Neidio i’r prif gynnwys</a>', '<main id="main"><h1>Hafan</h1></main>', []],
      [
        '<a class="govuk-skip-link" href="#missing">Neidio i’r prif gynnwys</a>',
        '<main><h1>Hafan</h1></main>',
        ['skip-link-target'],
      ],
      ['<a href="#aside">Help</a>', '<main><h1>Hafan</h1></main><aside id="aside">Help</aside>', ['skip-link']],
      ['<a href="#%">Help</a><a href="#main">Neidio i’r prif gynnwys</a>', '<main id="main"><h1>Hafan</h1></main>', []],
      ['<a class="govuk-skip-link" href="#%">Neidio i’r prif gynnwys</a>', '<main><h1>Hafan</h1></main>', ['skip-link-target']],
    ] as const) {
      const dom = new JSDOM(
        `<html lang="cy"><head><title>Hafan</title></head><body class="govuk-template__body">${link}${target}</body></html>`,
        { runScripts: 'outside-only' }
      );
      dom.window.HTMLElement.prototype.getClientRects = () => [{ width: 100, height: 20 }] as unknown as DOMRectList;
      const page = {
        url: () => 'http://localhost/',
        evaluate: async (callback: () => unknown) => dom.window.eval(`(${callback.toString()})()`),
      } as unknown as Page;
      try {
        const evidence = await collectScreenReaderLikeAccessibilityViolations(page);
        expect(evidence.violations.filter((item) => item.rule.startsWith('skip-link')).map((item) => item.rule)).toEqual(
          expected
        );
      } finally {
        dom.window.close();
      }
    }
  });

  test('publishes known findings separately from a clean page', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'a11y-known-'));
    const previousDir = process.env.PW_A11Y_EVIDENCE_DIR;
    process.env.PW_A11Y_EVIDENCE_DIR = dir;
    const info = { title: 'known page', attach: async () => undefined } as unknown as TestInfo;
    const page = {
      url: () => 'http://localhost/state',
      evaluate: async () => {
        throw new Error('no DOM');
      },
      screenshot: async () => Buffer.from('png'),
    } as unknown as Page;
    try {
      await attachAccessibilityPageSummaryEvidence(page, info, {
        feature: 'header',
        pageState: 'known',
        strict: false,
        url: page.url(),
        context: { scenarioId: 'header', language: 'cy' },
        outcomes: [
          {
            engine: 'axe',
            status: 'known-findings',
            issueCount: 2,
            knownIssueCount: 2,
            unexpectedIssueCount: 0,
            rules: ['label'],
          },
        ],
      });
      const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
      expect(manifest[0]).toMatchObject({ status: 'known-findings', violationCount: 2 });
      expect(manifest[0].summary).toContain('2 known issue(s), 0 unexpected issue(s)');
      await attachAccessibilityPageSummaryEvidence(page, info, {
        feature: 'header',
        pageState: 'failed-focus',
        strict: false,
        url: page.url(),
        outcomes: [{ engine: 'axe', status: 'passed', issueCount: 0, rules: [] }],
        checks: [{ name: 'focus restoration', status: 'failed', message: 'Focus lost' }],
      });
      const updatedManifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
      expect(updatedManifest.find((entry: { pageState: string }) => entry.pageState === 'failed-focus')).toMatchObject({
        status: 'issues-found',
        rules: ['behavior:focus restoration'],
      });
    } finally {
      restoreEnv('PW_A11Y_EVIDENCE_DIR', previousDir);
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  test('publishes engine errors and behavioral failures before rejecting the audit', async () => {
    delete process.env.A11Y_ENGINES;
    delete process.env.PLAYWRIGHT_A11Y_ENGINES;
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'a11y-audit-'));
    const previousDir = process.env.PW_A11Y_EVIDENCE_DIR;
    process.env.PW_A11Y_EVIDENCE_DIR = dir;
    const attachments = new Map<string, string>();
    const info = {
      title: 'broken audit',
      attach: async (name: string, attachment: { body: string | Buffer }) => {
        attachments.set(name, String(attachment.body));
      },
    } as unknown as TestInfo;
    const page = {
      url: () => 'http://localhost/state',
      evaluate: async () => {
        throw new Error('scanner unavailable');
      },
      screenshot: async () => Buffer.from('png'),
    } as unknown as Page;
    try {
      await expect(
        auditAccessibilityPage(page, info, {
          defaultEngines: ['wave-like', 'lighthouse'],
          feature: 'header',
          pageState: 'dialog',
          context: { scenarioId: 'dialog', language: 'cy' },
          checks: [
            {
              name: 'focus returns',
              run: async () => {
                throw new Error('focus stayed in dialog');
              },
            },
          ],
        })
      ).rejects.toThrow();
      const summary = JSON.parse(attachments.get('accessibility-audit-summary.json')!);
      expect(summary.outcomes).toHaveLength(2);
      expect(summary.outcomes.every((outcome: { status: string }) => outcome.status === 'error')).toBe(true);
      expect(summary.checks).toEqual([{ name: 'focus returns', status: 'failed', message: 'focus stayed in dialog' }]);
      expect(summary.context).toEqual({ scenarioId: 'dialog', language: 'cy' });
      const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
      expect(manifest[0]).toMatchObject({ status: 'error', context: summary.context });
      await expect(
        auditAccessibilityPage(page, info, {
          defaultEngines: ['lighthouse'],
          feature: 'header',
          pageState: 'dialog',
          runLighthouse: async () => {
            throw new Error('Lighthouse unavailable');
          },
        })
      ).rejects.toThrow();
      expect(JSON.parse(attachments.get('accessibility-audit-summary.json')!).outcomes[0]).toMatchObject({
        engine: 'lighthouse',
        status: 'error',
        rules: ['engine-execution'],
        message: 'Lighthouse unavailable',
      });
    } finally {
      restoreEnv('PW_A11Y_EVIDENCE_DIR', previousDir);
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  test('uses all default engines when no override is provided', () => {
    delete process.env.A11Y_ENGINES;
    delete process.env.PLAYWRIGHT_A11Y_ENGINES;

    expect(resolveAccessibilityEngines(defaultEngines)).toEqual(defaultEngines);
  });

  test('supports all, aliases, and duplicate engine requests', () => {
    process.env.A11Y_ENGINES = 'wave,axe,wave-like';

    expect(resolveAccessibilityEngines(defaultEngines)).toEqual(['wave-like', 'axe']);

    process.env.A11Y_ENGINES = 'all';
    expect(resolveAccessibilityEngines(defaultEngines)).toEqual(defaultEngines);

    process.env.A11Y_ENGINES = 'jaws,nvda,screenreader';
    expect(resolveAccessibilityEngines(defaultEngines)).toEqual(['screen-reader']);
  });

  test('filters requested engines to the page-state engines', () => {
    process.env.A11Y_ENGINES = 'axe,wave-like,screen-reader';
    expect(resolveAccessibilityEngines(['lighthouse'])).toEqual([]);

    process.env.A11Y_ENGINES = 'lighthouse';
    expect(resolveAccessibilityEngines(['axe', 'wave-like', 'screen-reader'])).toEqual([]);
    expect(resolveAccessibilityEngines(['lighthouse'])).toEqual(['lighthouse']);
  });

  test('rejects unknown engine names instead of silently running no audits', () => {
    process.env.A11Y_ENGINES = 'axe,unknown-engine';

    expect(() => resolveAccessibilityEngines(defaultEngines)).toThrow(/Unsupported accessibility engine\(s\): unknown-engine/);
  });

  test('uses report-only mode unless strict mode is explicitly enabled', () => {
    process.env.A11Y_STRICT = 'false';
    expect(isAccessibilityStrictMode()).toBe(false);

    process.env.A11Y_STRICT = 'true';
    expect(isAccessibilityStrictMode()).toBe(true);
  });
});

function restoreEnv(key: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[key];
    return;
  }

  process.env[key] = value;
}
