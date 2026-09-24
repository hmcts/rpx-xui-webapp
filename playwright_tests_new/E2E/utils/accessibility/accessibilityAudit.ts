import { expect, type Page, type TestInfo } from '@playwright/test';
import { attachAccessibilityEvidence, runAxeAudit } from './axeEvidence';
import {
  findUnexpectedAxeViolations,
  summarizeAxeViolations,
  type AxeViolationSummary,
  type KnownAxeViolation,
} from './axeKnownViolations';
import type { LighthouseAuditEvidence } from './lighthouseEvidence';
import {
  escapeAttribute,
  escapeHtml,
  sanitiseFileName,
  setAccessibilityEvidenceContext,
  formatAccessibilityContext,
  type AccessibilityContext,
} from './accessibilityEvidencePublisher';
import {
  attachAccessibilityPageSummaryEvidence,
  attachScreenReaderLikeAccessibilityEvidence,
  collectScreenReaderLikeAccessibilityViolations,
} from './screenReaderLikeAccessibility';
import { attachWaveLikeAccessibilityEvidence, collectWaveLikeAccessibilityViolations } from './waveLikeAccessibility';

export type AccessibilityEngine = 'axe' | 'wave-like' | 'screen-reader' | 'lighthouse';

export type AccessibilityCheckOutcome = { name: string; status: 'passed' | 'failed'; message?: string };

export interface AccessibilityAuditOptions {
  context?: AccessibilityContext;
  checks?: Array<{ name: string; run: () => Promise<void> }>;
  defaultEngines: AccessibilityEngine[];
  feature: string;
  pageState: string;
  axeKnownViolations?: KnownAxeViolation[];
  runLighthouse?: () => Promise<LighthouseAuditEvidence | void>;
  strict?: boolean;
}

type EngineOutcome = {
  engine: AccessibilityEngine;
  status: 'passed' | 'known-findings' | 'issues-found' | 'error';
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
  'screen-reader': 'screen-reader',
  screenreader: 'screen-reader',
  screenReader: 'screen-reader',
  sr: 'screen-reader',
  jaws: 'screen-reader',
  nvda: 'screen-reader',
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

  const unknownEngines = requested.filter((engine) => !engineAliases[engine]);
  if (unknownEngines.length > 0) {
    throw new Error(
      `Unsupported accessibility engine(s): ${Array.from(new Set(unknownEngines)).join(', ')}. ` +
        `Supported values: all, ${Object.keys(engineAliases).join(', ')}.`
    );
  }

  const supportedEngines = new Set(defaultEngines);
  return Array.from(
    new Set(
      requested
        .map((engine) => engineAliases[engine])
        .filter((engine): engine is AccessibilityEngine => Boolean(engine) && supportedEngines.has(engine))
    )
  );
}

export function isAccessibilityStrictMode(): boolean {
  return ['1', 'true', 'yes', 'on'].includes((process.env.A11Y_STRICT ?? '').trim().toLowerCase());
}

export async function auditAccessibilityPage(page: Page, testInfo: TestInfo, options: AccessibilityAuditOptions): Promise<void> {
  const engines = resolveAccessibilityEngines(options.defaultEngines);
  if (engines.length === 0) testInfo.skip(true, 'No accessibility engines selected for this scenario.');
  const strict = options.strict ?? isAccessibilityStrictMode();
  const outcomes: EngineOutcome[] = [];

  setAccessibilityEvidenceContext(testInfo, options.context);
  const runners: Record<AccessibilityEngine, () => Promise<EngineOutcome>> = {
    axe: () => runAxeEngine(page, testInfo, options),
    'wave-like': () => runWaveLikeEngine(page, testInfo, options),
    'screen-reader': () => runScreenReaderLikeEngine(page, testInfo, options),
    lighthouse: () => {
      if (!options.runLighthouse) throw new Error('Lighthouse was requested without an audit runner.');
      return runLighthouseEngine(options.runLighthouse);
    },
  };
  for (const engine of engines) {
    try {
      outcomes.push(await runners[engine]());
    } catch (error) {
      outcomes.push({
        engine,
        status: 'error',
        issueCount: 1,
        unexpectedIssueCount: 1,
        message: error instanceof Error ? error.message : String(error),
        rules: ['engine-execution'],
      });
    }
  }
  const checks: AccessibilityCheckOutcome[] = [];
  for (const check of options.checks ?? []) {
    try {
      await check.run();
      checks.push({ name: check.name, status: 'passed' });
    } catch (error) {
      checks.push({ name: check.name, status: 'failed', message: error instanceof Error ? error.message : String(error) });
    }
  }

  await attachAccessibilityAuditSummary(testInfo, {
    feature: options.feature,
    pageState: options.pageState,
    strict,
    url: page.url(),
    outcomes,
    context: options.context,
    checks,
  });
  await attachAccessibilityPageSummaryEvidence(page, testInfo, {
    feature: options.feature,
    pageState: options.pageState,
    strict,
    url: page.url(),
    outcomes,
    context: options.context,
    checks,
  });

  const unexpectedIssues = outcomes.filter(
    (outcome) => outcome.status !== 'passed' && (outcome.unexpectedIssueCount ?? outcome.issueCount) > 0
  );
  expect(
    [...unexpectedIssues, ...checks.filter((check) => check.status === 'failed')],
    [
      `Accessibility issue(s) found for ${options.feature}: ${options.pageState}.`,
      strict
        ? 'A11Y_STRICT is enabled, so the test and wrapper command are blocking.'
        : 'A11Y_STRICT is disabled, so Playwright marks this test red but the accessibility wrapper keeps Jenkins non-blocking.',
      `Current URL: ${page.url()}`,
      JSON.stringify(outcomes, null, 2),
    ].join('\n')
  ).toEqual([]);
}

async function runAxeEngine(page: Page, testInfo: TestInfo, options: AccessibilityAuditOptions): Promise<EngineOutcome> {
  const results = await runAxeAudit(page);
  await attachAccessibilityEvidence(page, testInfo, results, `${evidencePrefix(options)}-axe`, {
    engine: 'axe',
    feature: options.feature,
    pageState: options.pageState,
  });
  const summary = summarizeAxeViolations(results.violations);
  const unexpected = findUnexpectedAxeViolations(summary, options.axeKnownViolations ?? []);
  const knownIssueCount = countKnownAxeIssues(summary, unexpected);

  return {
    engine: 'axe',
    status: unexpected.length > 0 ? 'issues-found' : knownIssueCount > 0 ? 'known-findings' : 'passed',
    issueCount: summary.reduce((count, violation) => count + violation.nodeCount, 0),
    knownIssueCount,
    unexpectedIssueCount: unexpected.reduce((count, violation) => count + violation.nodeCount, 0),
    rules: summary.map((violation) => violation.id),
  };
}

async function runWaveLikeEngine(page: Page, testInfo: TestInfo, options: AccessibilityAuditOptions): Promise<EngineOutcome> {
  const violations = await collectWaveLikeAccessibilityViolations(page);
  await attachWaveLikeAccessibilityEvidence(page, testInfo, violations, `${evidencePrefix(options)}-wave-like`, {
    engine: 'wave-like',
    feature: options.feature,
    pageState: options.pageState,
  });

  return {
    engine: 'wave-like',
    status: violations.length > 0 ? 'issues-found' : 'passed',
    issueCount: violations.length,
    unexpectedIssueCount: violations.length,
    rules: Array.from(new Set(violations.map((violation) => violation.rule))),
  };
}

async function runScreenReaderLikeEngine(
  page: Page,
  testInfo: TestInfo,
  options: AccessibilityAuditOptions
): Promise<EngineOutcome> {
  const evidence = await collectScreenReaderLikeAccessibilityViolations(page);
  await attachScreenReaderLikeAccessibilityEvidence(page, testInfo, evidence, `${evidencePrefix(options)}-screen-reader`, {
    engine: 'screen-reader',
    feature: options.feature,
    pageState: options.pageState,
  });

  return {
    engine: 'screen-reader',
    status: evidence.violations.length > 0 ? 'issues-found' : 'passed',
    issueCount: evidence.violations.length,
    unexpectedIssueCount: evidence.violations.length,
    rules: Array.from(new Set(evidence.violations.map((violation) => violation.rule))),
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
      rules: ['engine-execution'],
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
  return `${sanitiseFileName(options.feature)}-${sanitiseFileName(options.pageState)}`.slice(0, 80);
}

async function attachAccessibilityAuditSummary(
  testInfo: TestInfo,
  summary: {
    feature: string;
    pageState: string;
    strict: boolean;
    url: string;
    outcomes: EngineOutcome[];
    context?: AccessibilityContext;
    checks?: AccessibilityCheckOutcome[];
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
  context?: AccessibilityContext;
  checks?: AccessibilityCheckOutcome[];
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
        <p>${escapeHtml(formatAccessibilityContext(summary.context))}</p>
        <h2>Behavioral checks</h2>
        <ul>${(summary.checks ?? []).map((check) => `<li>${escapeHtml(check.name)}: ${escapeHtml(check.status)} ${escapeHtml(check.message ?? '')}</li>`).join('') || '<li>No behavioral checks requested.</li>'}</ul>
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
