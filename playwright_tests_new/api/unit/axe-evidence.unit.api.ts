import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { JSDOM } from 'jsdom';
import { test, expect, type Page, type TestInfo } from '@playwright/test';
import type { AxeResults, Result } from 'axe-core';
import { summarizeAxeOutcome } from '../../E2E/utils/accessibility/accessibilityAudit';
import { attachAccessibilityPageSummaryEvidence } from '../../E2E/utils/accessibility/screenReaderLikeAccessibility';
import { attachAccessibilityEvidence } from '../../E2E/utils/accessibility/axeEvidence';

test('preserves incomplete-only axe evidence without inventing violations', { tag: '@svc-internal' }, async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'axe-review-'));
  const previous = process.env.PW_A11Y_EVIDENCE_DIR;
  process.env.PW_A11Y_EVIDENCE_DIR = dir;
  const attachments = new Map<string, string>();
  const info = {
    title: 'review',
    attach: async (name: string, value: { body: string | Buffer }) => {
      attachments.set(name, String(value.body));
    },
  } as unknown as TestInfo;
  const page = {
    url: () => 'https://example.test/',
    evaluate: async () => undefined,
    screenshot: async () => Buffer.from('png'),
  } as unknown as Page;
  const incomplete = {
    id: 'color-contrast',
    help: 'Check contrast',
    description: 'Contrast could not be determined',
    helpUrl: 'https://dequeuniversity.com/rules/axe/4.10/color-contrast',
    tags: ['wcag2aa', 'wcag143'],
    impact: 'serious',
    nodes: [
      {
        target: ['#text'],
        html: '<p id="text">Text</p>',
        any: [{ message: 'Background image requires review' }],
        all: [],
        none: [],
      },
    ],
  } as unknown as Result;
  try {
    await attachAccessibilityEvidence(
      page,
      info,
      { url: 'https://example.test/', violations: [], incomplete: [incomplete] } as unknown as AxeResults,
      'review'
    );
    expect(attachments.has('review.json')).toBe(true);
    const data = JSON.parse(attachments.get('review.json')!);
    expect(data).toMatchObject({ violationCount: 0, reviewCount: 1 });
    expect(data.incomplete[0].nodes[0].any[0].message).toBe('Background image requires review');
    const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
    expect(manifest[0]).toMatchObject({
      status: 'needs-review',
      violationCount: 0,
      reviewCount: 1,
      reviewRules: ['color-contrast'],
    });
    const document = new JSDOM(attachments.get('review.html')).window.document;
    expect(document.documentElement.lang).toBe('en');
    expect(document.querySelector('meta[name="viewport"]')).not.toBeNull();
    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(document.querySelector('main')?.id).toBe('evidence-content');
    expect(document.body.textContent).toContain('Needs investigation');
    expect(document.body.textContent).toContain('Background image requires review');
    expect(document.body.textContent).toContain('1.4.3');
    expect(document.querySelector('a[href="../xui-playwright-a11y.html"]')).not.toBeNull();
    await attachAccessibilityPageSummaryEvidence(
      {
        ...page,
        evaluate: async () => {
          throw new Error('no DOM');
        },
      } as Page,
      info,
      {
        feature: 'review',
        pageState: 'incomplete',
        strict: true,
        url: 'https://example.test/',
        outcomes: [summarizeAxeOutcome({ violations: [], incomplete: [incomplete] } as unknown as AxeResults)],
      }
    );
    const published = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
    expect(published.find((entry: { engine: string }) => entry.engine === 'summary')).toMatchObject({
      status: 'needs-review',
      violationCount: 0,
      reviewCount: 1,
      reviewRules: ['color-contrast'],
    });
  } finally {
    if (previous === undefined) delete process.env.PW_A11Y_EVIDENCE_DIR;
    else process.env.PW_A11Y_EVIDENCE_DIR = previous;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('keeps clean, incomplete, known and unexpected axe outcomes distinct', { tag: '@svc-internal' }, () => {
  const violation = { id: 'label', description: 'Missing label', nodes: [{}] } as Result;
  const incomplete = { id: 'color-contrast', nodes: [{}, {}] } as Result;
  const known = [{ id: 'label', description: 'Missing label', maxNodes: 1 }];
  for (const [violations, pending, allowlist, status, count] of [
    [[], [], [], 'passed', 0],
    [[], [incomplete], [], 'needs-review', 0],
    [[violation], [incomplete], known, 'known-findings', 0],
    [[violation], [incomplete], [], 'issues-found', 1],
    [[], [{ ...incomplete, nodes: [] }], [], 'needs-review', 0],
  ] as const) {
    const outcome = summarizeAxeOutcome({ violations: [...violations], incomplete: [...pending] } as unknown as AxeResults, [
      ...allowlist,
    ]);
    expect(outcome.status).toBe(status);
    expect(outcome.unexpectedIssueCount).toBe(count);
    expect(outcome.issueCount).toBe(violations.length);
    expect(outcome.reviewCount).toBe((pending as readonly Result[]).reduce((total, item) => total + item.nodes.length, 0));
    expect(outcome.reviewRules).toEqual(pending.map((item) => item.id));
    expect(outcome.rules).toEqual(violations.map((item) => item.id));
  }
});

test('publishes resolved axe evidence statuses without changing diagnostic details', { tag: '@svc-internal' }, async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'axe-known-'));
  const previous = process.env.PW_A11Y_EVIDENCE_DIR;
  process.env.PW_A11Y_EVIDENCE_DIR = dir;
  const attachments = new Map<string, string>();
  const info = {
    title: 'known findings',
    attach: async (name: string, value: { body: string | Buffer }) => attachments.set(name, String(value.body)),
  } as unknown as TestInfo;
  const page = {
    url: () => 'https://example.test/',
    evaluate: async () => undefined,
    screenshot: async () => Buffer.from('png'),
  } as unknown as Page;
  const violation = {
    id: 'label',
    help: 'Missing label',
    description: 'The control has no label',
    helpUrl: 'https://dequeuniversity.com/rules/axe/label',
    tags: ['wcag2a'],
    nodes: [{ target: ['#field'], html: '<input id="field">' }],
  } as unknown as Result;
  try {
    for (const [prefix, status] of [
      ['known', 'known-findings'],
      ['unexpected', 'issues-found'],
      ['incomplete', 'needs-review'],
    ] as const) {
      await attachAccessibilityEvidence(page, info, { url: page.url(), violations: [violation] } as AxeResults, prefix, {
        engine: 'axe',
        feature: prefix,
        pageState: prefix,
        status,
      });
      const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
      expect(manifest.at(-1)).toMatchObject({ status, violationCount: 1, rules: ['label'] });
      expect(attachments.get(`${prefix}.html`)).toContain('Automatically detected violation');
    }
  } finally {
    if (previous === undefined) delete process.env.PW_A11Y_EVIDENCE_DIR;
    else process.env.PW_A11Y_EVIDENCE_DIR = previous;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
