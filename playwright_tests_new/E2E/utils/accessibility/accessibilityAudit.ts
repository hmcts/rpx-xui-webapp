import { expect, type Page, type TestInfo } from '@playwright/test';
import { attachAccessibilityEvidence, runAxeAudit } from './axeEvidence';
import {
  findUnexpectedAxeViolations,
  summarizeAxeViolations,
  type AxeViolationSummary,
  type KnownAxeViolation,
} from './axeKnownViolations';
import type { LighthouseAuditEvidence } from './lighthouseEvidence';
import { attachWaveLikeAccessibilityEvidence, collectWaveLikeAccessibilityViolations } from './waveLikeAccessibility';

export type AccessibilityEngine = 'axe' | 'wave-like' | 'lighthouse';

export interface AccessibilityAuditOptions {
  defaultEngines: AccessibilityEngine[];
  feature: string;
  pageState: string;
  axeKnownViolations?: KnownAxeViolation[];
  runLighthouse?: () => Promise<LighthouseAuditEvidence | void>;
  strict?: boolean;
}

type EngineOutcome = {
  engine: AccessibilityEngine;
  status: 'passed' | 'issues-found' | 'error';
  issueCount: number;
  knownIssueCount?: number;
  unexpectedIssueCount?: number;
  message?: string;
  evidenceFiles?: string[];
  rules: string[];
};

const engineAliases: Record<string, AccessibilityEngine> = {
  axe: 'axe',
  ax: 'axe',
  'wave-like': 'wave-like',
  wave: 'wave-like',
  waveLike: 'wave-like',
  lighthouse: 'lighthouse',
};

export function resolveAccessibilityEngines(defaultEngines: AccessibilityEngine[]): AccessibilityEngine[] {
  const rawEngines = process.env.A11Y_ENGINES ?? process.env.PLAYWRIGHT_A11Y_ENGINES;
  if (!rawEngines?.trim()) {
    return defaultEngines;
  }

  const requested = rawEngines
    .split(',')
    .map((engine) => engine.trim())
    .filter(Boolean);

  if (requested.includes('all')) {
    return defaultEngines;
  }

  return Array.from(new Set(requested.map((engine) => engineAliases[engine]).filter(Boolean)));
}

export function isAccessibilityStrictMode(): boolean {
  return ['1', 'true', 'yes', 'on'].includes((process.env.A11Y_STRICT ?? '').trim().toLowerCase());
}

export async function auditAccessibilityPage(page: Page, testInfo: TestInfo, options: AccessibilityAuditOptions): Promise<void> {
  const engines = resolveAccessibilityEngines(options.defaultEngines);
  const strict = options.strict ?? isAccessibilityStrictMode();
  const outcomes: EngineOutcome[] = [];

  if (engines.includes('axe')) {
    outcomes.push(await runAxeEngine(page, testInfo, options));
  }

  if (engines.includes('wave-like')) {
    outcomes.push(await runWaveLikeEngine(page, testInfo, options));
  }

  if (engines.includes('lighthouse') && options.runLighthouse) {
    outcomes.push(await runLighthouseEngine(options.runLighthouse));
  }

  await attachAccessibilityAuditSummary(testInfo, {
    feature: options.feature,
    pageState: options.pageState,
    strict,
    url: page.url(),
    outcomes,
  });

  const unexpectedIssues = outcomes.filter(
    (outcome) => outcome.status !== 'passed' && (outcome.unexpectedIssueCount ?? outcome.issueCount) > 0
  );
  if (strict) {
    expect(
      unexpectedIssues,
      [
        `Strict accessibility mode found issue(s) for ${options.feature}: ${options.pageState}.`,
        `Current URL: ${page.url()}`,
        JSON.stringify(outcomes, null, 2),
      ].join('\n')
    ).toEqual([]);
  }
}

async function runAxeEngine(page: Page, testInfo: TestInfo, options: AccessibilityAuditOptions): Promise<EngineOutcome> {
  const results = await runAxeAudit(page);
  await attachAccessibilityEvidence(page, testInfo, results, `${evidencePrefix(options)}-axe`);
  const summary = summarizeAxeViolations(results.violations);
  const unexpected = findUnexpectedAxeViolations(summary, options.axeKnownViolations ?? []);
  const knownIssueCount = countKnownAxeIssues(summary, unexpected);

  return {
    engine: 'axe',
    status: unexpected.length > 0 ? 'issues-found' : 'passed',
    issueCount: summary.reduce((count, violation) => count + violation.nodeCount, 0),
    knownIssueCount,
    unexpectedIssueCount: unexpected.reduce((count, violation) => count + violation.nodeCount, 0),
    rules: summary.map((violation) => violation.id),
  };
}

async function runWaveLikeEngine(page: Page, testInfo: TestInfo, options: AccessibilityAuditOptions): Promise<EngineOutcome> {
  const violations = await collectWaveLikeAccessibilityViolations(page);
  await attachWaveLikeAccessibilityEvidence(page, testInfo, violations, `${evidencePrefix(options)}-wave-like`);

  return {
    engine: 'wave-like',
    status: violations.length > 0 ? 'issues-found' : 'passed',
    issueCount: violations.length,
    unexpectedIssueCount: violations.length,
    rules: Array.from(new Set(violations.map((violation) => violation.rule))),
  };
}

async function runLighthouseEngine(runLighthouse: () => Promise<LighthouseAuditEvidence | void>): Promise<EngineOutcome> {
  try {
    const evidence = await runLighthouse();
    return {
      engine: 'lighthouse',
      status: 'passed',
      issueCount: 0,
      unexpectedIssueCount: 0,
      message: evidence?.message,
      evidenceFiles: evidence?.evidenceFiles,
      rules: ['accessibility-threshold'],
    };
  } catch (error) {
    return {
      engine: 'lighthouse',
      status: 'error',
      issueCount: 1,
      unexpectedIssueCount: 1,
      message: error instanceof Error ? error.message : String(error),
      rules: ['accessibility-threshold'],
    };
  }
}

function countKnownAxeIssues(summary: AxeViolationSummary[], unexpected: AxeViolationSummary[]): number {
  const unexpectedKeys = new Set(unexpected.map((violation) => `${violation.id}|${violation.description}`));
  return summary
    .filter((violation) => !unexpectedKeys.has(`${violation.id}|${violation.description}`))
    .reduce((count, violation) => count + violation.nodeCount, 0);
}

function evidencePrefix(options: AccessibilityAuditOptions): string {
  return `${sanitiseFileName(options.feature)}-${sanitiseFileName(options.pageState)}`;
}

async function attachAccessibilityAuditSummary(
  testInfo: TestInfo,
  summary: {
    feature: string;
    pageState: string;
    strict: boolean;
    url: string;
    outcomes: EngineOutcome[];
  }
): Promise<void> {
  await testInfo.attach('accessibility-audit-summary.json', {
    body: JSON.stringify(summary, null, 2),
    contentType: 'application/json',
  });

  await testInfo.attach('accessibility-audit-summary.html', {
    body: buildSummaryHtml(summary),
    contentType: 'text/html',
  });
}

function buildSummaryHtml(summary: {
  feature: string;
  pageState: string;
  strict: boolean;
  url: string;
  outcomes: EngineOutcome[];
}): string {
  const rows = summary.outcomes
    .map((outcome) => {
      const className = outcome.status === 'passed' ? 'passed' : 'issues';
      return `
        <tr class="${className}">
          <td>${escapeHtml(outcome.engine)}</td>
          <td>${escapeHtml(outcome.status)}</td>
          <td>${outcome.issueCount}</td>
          <td>${outcome.knownIssueCount ?? 0}</td>
          <td>${outcome.unexpectedIssueCount ?? outcome.issueCount}</td>
          <td>${escapeHtml(outcome.rules.join(', ') || 'none')}</td>
          <td>${formatEvidenceLinks(outcome.evidenceFiles)}</td>
          <td>${escapeHtml(outcome.message ?? '')}</td>
        </tr>
      `;
    })
    .join('');

  return `
    <html>
      <head>
        <title>Accessibility Audit Summary</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 24px; color: #0b0c0c; }
          .banner { background: #1d70b8; color: #fff; padding: 16px; margin-bottom: 24px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #b1b4b6; padding: 8px; text-align: left; vertical-align: top; }
          th { background: #f3f2f1; }
          .passed td:first-child { border-left: 6px solid #00703c; }
          .issues td:first-child { border-left: 6px solid #d4351c; }
          code { background: #f3f2f1; padding: 2px 4px; }
        </style>
      </head>
      <body>
        <div class="banner">
          <h1>Accessibility Audit Summary</h1>
          <p>${escapeHtml(summary.feature)} / ${escapeHtml(summary.pageState)}</p>
        </div>
        <p><strong>URL:</strong> <code>${escapeHtml(summary.url)}</code></p>
        <p><strong>Strict mode:</strong> ${summary.strict ? 'on' : 'off'}</p>
        <table>
          <thead>
            <tr>
              <th>Engine</th>
              <th>Status</th>
              <th>Total issues</th>
              <th>Known issues</th>
              <th>Unexpected issues</th>
              <th>Rules</th>
              <th>Evidence</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </body>
    </html>
  `;
}

function formatEvidenceLinks(fileNames: string[] | undefined): string {
  if (!fileNames || fileNames.length === 0) {
    return '';
  }

  return fileNames
    .map((fileName) => `<a href="./accessibility-evidence/${escapeAttribute(fileName)}">${escapeHtml(fileName)}</a>`)
    .join('<br />');
}

function sanitiseFileName(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'accessibility'
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replaceAll('`', '&#96;');
}
