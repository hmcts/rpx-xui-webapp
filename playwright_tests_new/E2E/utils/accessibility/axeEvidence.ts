import { AxeBuilder } from '@axe-core/playwright';
import { expect, type Page, type TestInfo } from '@playwright/test';
import type { AxeResults, Result } from 'axe-core';
import { createHtmlReport } from 'axe-html-reporter';
import * as fs from 'fs/promises';
import * as path from 'path';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];

interface AuditOptions {
  exclude?: string | string[];
  include?: string | string[];
  disableRules?: string | string[];
}

interface StoredAxeResults {
  url: string;
  results: AxeResults;
}

interface PublishedEvidenceEntry {
  testTitle: string;
  attachmentPrefix: string;
  htmlFileName: string;
  jsonFileName: string;
  screenshotFileName: string;
  violationCount: number;
  rules: string[];
  targets: string[];
}

const EVIDENCE_MANIFEST_FILE = 'manifest.json';
const EVIDENCE_ENTRY_PREFIX = 'manifest-entry-';

const normaliseArray = <T>(value?: T | T[]): T[] => {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

export class AxeUtils {
  private resultsList: StoredAxeResults[] = [];

  constructor(private readonly page: Page) {}

  async audit(options?: AuditOptions): Promise<void> {
    const results = await runAxeAudit(this.page, options);
    this.resultsList.push({ url: this.page.url(), results });

    expect.soft(results.violations, formatViolationMessage(results.violations)).toEqual([]);
  }

  async generateReport(testInfo: TestInfo, reportName = 'Consolidated Accessibility Report'): Promise<void> {
    if (this.resultsList.length === 0) {
      return;
    }

    for (const [index, { results }] of this.resultsList.entries()) {
      await attachAccessibilityEvidence(this.page, testInfo, results, `accessibility-issues-${index + 1}`);
    }

    const htmlSections = this.resultsList.map(({ url, results }, index) => {
      const urlEndpoint = url.split('/').slice(-3).join('/');
      const reportFileName = `${results.violations.length > 0 ? 'FAILED ' : ''}${urlEndpoint}`;
      return `
        <details open>
          <summary><strong>Page ${index + 1}: ${escapeHtml(reportFileName)}</strong></summary>
          ${createHtmlReport({
            results,
            options: {
              projectKey: urlEndpoint,
              doNotCreateReportFile: true,
            },
          })}
        </details>
      `;
    });

    await testInfo.attach(reportName, {
      body: `
        <html>
          <head>
            <title>Consolidated Accessibility Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 24px; }
              details { margin-bottom: 16px; }
              summary { cursor: pointer; font-size: 18px; }
            </style>
          </head>
          <body>
            <h1>Consolidated Accessibility Report</h1>
            ${htmlSections.join('<hr/>')}
          </body>
        </html>
      `,
      contentType: 'text/html',
    });

    this.resultsList = [];
  }
}

export async function runAxeAudit(page: Page, options?: AuditOptions): Promise<AxeResults> {
  const builder = new AxeBuilder({
    page: page as unknown as import('playwright-core').Page,
  }).withTags(WCAG_TAGS);

  for (const selector of normaliseArray(options?.exclude)) {
    builder.exclude(selector);
  }

  for (const selector of normaliseArray(options?.include)) {
    builder.include(selector);
  }

  const disabledRules = normaliseArray(options?.disableRules);
  if (disabledRules.length > 0) {
    builder.disableRules(disabledRules);
  }

  return builder.analyze();
}

export async function attachAccessibilityEvidence(
  page: Page,
  testInfo: TestInfo | undefined,
  results: AxeResults,
  attachmentPrefix = 'accessibility-issues'
): Promise<void> {
  if (!testInfo || results.violations.length === 0) {
    return;
  }

  await testInfo.attach(`${attachmentPrefix}.json`, {
    body: JSON.stringify(toEvidenceSummary(results), null, 2),
    contentType: 'application/json',
  });

  await testInfo.attach(`${attachmentPrefix}.html`, {
    body: buildIssueSummaryHtml(results),
    contentType: 'text/html',
  });

  const cleanup = await markViolationsOnPage(page, results.violations);
  let screenshot: Buffer;
  try {
    screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach(`${attachmentPrefix}-highlighted-screenshot.png`, {
      body: screenshot,
      contentType: 'image/png',
    });
  } finally {
    await cleanup();
  }

  await writePublishedEvidence(testInfo, results, screenshot, attachmentPrefix);
}

function formatViolationMessage(violations: Result[]): string {
  if (violations.length === 0) {
    return 'No automatically detectable accessibility violations';
  }

  return [
    `Found ${violations.length} accessibility rule violation(s). Open the attached accessibility-issues HTML/JSON and highlighted screenshot.`,
    ...violations.map((violation) => {
      const targets = violation.nodes.flatMap((node) => node.target).join(', ');
      return `- ${violation.id} (${violation.impact ?? 'unknown impact'}): ${violation.help}; targets: ${targets}`;
    }),
  ].join('\n');
}

function toEvidenceSummary(results: AxeResults): unknown {
  return {
    url: results.url,
    violationCount: results.violations.length,
    violations: results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      description: violation.description,
      helpUrl: violation.helpUrl,
      tags: violation.tags,
      nodes: violation.nodes.map((node) => ({
        target: node.target,
        failureSummary: node.failureSummary,
        html: node.html,
      })),
    })),
  };
}

function buildIssueSummaryHtml(results: AxeResults): string {
  const cards = results.violations
    .map((violation, violationIndex) => {
      const nodes = violation.nodes
        .map(
          (node, nodeIndex) => `
            <li>
              <p><strong>Marker:</strong> ${violationIndex + 1}.${nodeIndex + 1}</p>
              <p><strong>Selector:</strong> <code>${escapeHtml(node.target.join(', '))}</code></p>
              <p><strong>Failure:</strong> ${escapeHtml(node.failureSummary ?? 'No failure summary provided')}</p>
              <pre>${escapeHtml(node.html)}</pre>
            </li>
          `
        )
        .join('');

      return `
        <section class="issue">
          <h2>${violationIndex + 1}. ${escapeHtml(violation.id)} <span>${escapeHtml(
            violation.impact ?? 'unknown impact'
          )}</span></h2>
          <p><strong>${escapeHtml(violation.help)}</strong></p>
          <p>${escapeHtml(violation.description)}</p>
          <p><a href="${escapeAttribute(violation.helpUrl)}">${escapeHtml(violation.helpUrl)}</a></p>
          <ol>${nodes}</ol>
        </section>
      `;
    })
    .join('');

  return `
    <html>
      <head>
        <title>Accessibility Issues</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 24px; color: #0b0c0c; }
          .banner { background: #d4351c; color: #fff; padding: 16px; margin-bottom: 24px; }
          .issue { border: 4px solid #d4351c; padding: 16px; margin-bottom: 18px; }
          .issue h2 { margin-top: 0; }
          .issue h2 span { background: #ffdd00; color: #0b0c0c; font-size: 16px; padding: 4px 8px; }
          code, pre { background: #f3f2f1; padding: 4px; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="banner">
          <h1>ACCESSIBILITY ISSUES FOUND</h1>
          <p>${results.violations.length} axe rule violation(s). Match marker numbers here to the highlighted screenshot.</p>
        </div>
        ${cards}
      </body>
    </html>
  `;
}

async function writePublishedEvidence(
  testInfo: TestInfo,
  results: AxeResults,
  screenshot: Buffer,
  attachmentPrefix: string
): Promise<void> {
  const evidenceDir = path.resolve(
    process.env.PW_A11Y_EVIDENCE_DIR ||
      path.join(
        process.env.PLAYWRIGHT_REPORT_FOLDER || 'functional-output/tests/playwright-a11y/odhin-report',
        'accessibility-evidence'
      )
  );
  const safeTitle = sanitiseFileName(testInfo.title);
  const baseName = `${safeTitle}-${attachmentPrefix}`;
  const htmlFileName = `${baseName}.html`;
  const jsonFileName = `${baseName}.json`;
  const screenshotFileName = `${baseName}-highlighted-screenshot.png`;
  const entry: PublishedEvidenceEntry = {
    testTitle: testInfo.title,
    attachmentPrefix,
    htmlFileName,
    jsonFileName,
    screenshotFileName,
    violationCount: results.violations.length,
    rules: results.violations.map((violation) => violation.id),
    targets: results.violations.flatMap((violation) => violation.nodes.flatMap((node) => node.target)),
  };

  await fs.mkdir(evidenceDir, { recursive: true });
  await fs.writeFile(path.join(evidenceDir, htmlFileName), buildIssueSummaryHtml(results));
  await fs.writeFile(path.join(evidenceDir, jsonFileName), JSON.stringify(toEvidenceSummary(results), null, 2));
  await fs.writeFile(path.join(evidenceDir, screenshotFileName), screenshot);
  await writeEvidenceEntry(evidenceDir, baseName, entry);
  await writeEvidenceManifest(evidenceDir, entry);
  await writeEvidenceIndex(evidenceDir);
}

async function writeEvidenceEntry(evidenceDir: string, baseName: string, entry: PublishedEvidenceEntry): Promise<void> {
  await fs.writeFile(path.join(evidenceDir, `${EVIDENCE_ENTRY_PREFIX}${baseName}.json`), JSON.stringify(entry, null, 2));
}

async function writeEvidenceManifest(evidenceDir: string, entry: PublishedEvidenceEntry): Promise<void> {
  const manifestPath = path.join(evidenceDir, EVIDENCE_MANIFEST_FILE);
  const existingEntries = await readEvidenceManifest(evidenceDir);
  const retainedEntries = existingEntries.filter(
    (existingEntry) => existingEntry.testTitle !== entry.testTitle || existingEntry.attachmentPrefix !== entry.attachmentPrefix
  );

  await fs.writeFile(manifestPath, JSON.stringify([...retainedEntries, entry], null, 2));
}

async function readEvidenceManifest(evidenceDir: string): Promise<PublishedEvidenceEntry[]> {
  const manifestPath = path.join(evidenceDir, EVIDENCE_MANIFEST_FILE);
  const entriesByKey = new Map<string, PublishedEvidenceEntry>();

  try {
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    if (Array.isArray(manifest)) {
      for (const entry of manifest.filter(isPublishedEvidenceEntry)) {
        entriesByKey.set(evidenceEntryKey(entry), entry);
      }
    }
  } catch {
    // Missing or partially written aggregate manifests are tolerated; per-test entry files are the source of truth.
  }

  try {
    const fileNames = await fs.readdir(evidenceDir);
    await Promise.all(
      fileNames
        .filter((fileName) => fileName.startsWith(EVIDENCE_ENTRY_PREFIX) && fileName.endsWith('.json'))
        .map(async (fileName) => {
          try {
            const entry = JSON.parse(await fs.readFile(path.join(evidenceDir, fileName), 'utf8'));
            if (isPublishedEvidenceEntry(entry)) {
              entriesByKey.set(evidenceEntryKey(entry), entry);
            }
          } catch {
            // Ignore a single corrupt entry so one failed write does not break the whole report.
          }
        })
    );
  } catch {
    return Array.from(entriesByKey.values());
  }

  return Array.from(entriesByKey.values());
}

function evidenceEntryKey(entry: PublishedEvidenceEntry): string {
  return `${entry.testTitle}\u0000${entry.attachmentPrefix}`;
}

function isPublishedEvidenceEntry(value: unknown): value is PublishedEvidenceEntry {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<PublishedEvidenceEntry>;
  return (
    typeof candidate.testTitle === 'string' &&
    typeof candidate.attachmentPrefix === 'string' &&
    typeof candidate.htmlFileName === 'string' &&
    typeof candidate.jsonFileName === 'string' &&
    typeof candidate.screenshotFileName === 'string' &&
    typeof candidate.violationCount === 'number' &&
    Array.isArray(candidate.rules) &&
    Array.isArray(candidate.targets)
  );
}

async function writeEvidenceIndex(evidenceDir: string): Promise<void> {
  const manifestEntries = await readEvidenceManifest(evidenceDir);
  const rows = manifestEntries
    .sort((a, b) => a.testTitle.localeCompare(b.testTitle) || a.attachmentPrefix.localeCompare(b.attachmentPrefix))
    .map((entry) => {
      return `
        <li>
          <a class="issue-link" href="./${escapeAttribute(entry.htmlFileName)}">${escapeHtml(entry.testTitle)}</a>
          <p>${entry.violationCount} axe rule violation(s): ${escapeHtml(entry.rules.join(', '))}</p>
          <br />
          <a href="./${escapeAttribute(entry.screenshotFileName)}">highlighted screenshot</a>
          |
          <a href="./${escapeAttribute(entry.jsonFileName)}">DOM and axe JSON</a>
        </li>
      `;
    })
    .join('');

  await fs.writeFile(
    path.join(evidenceDir, 'index.html'),
    `
      <html>
        <head>
          <title>Accessibility Evidence</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 24px; color: #0b0c0c; }
            .banner { background: #d4351c; color: #fff; padding: 16px; margin-bottom: 24px; }
            .issue-link { font-weight: bold; font-size: 18px; }
            li { margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <div class="banner">
            <h1>ACCESSIBILITY EVIDENCE</h1>
            <p>Open each item for rule, impact, DOM selector, failing HTML, and a red highlighted screenshot.</p>
          </div>
          <ol>${rows}</ol>
        </body>
      </html>
    `
  );
}

async function markViolationsOnPage(page: Page, violations: Result[]): Promise<() => Promise<void>> {
  const markers = violations.flatMap((violation, violationIndex) =>
    violation.nodes.flatMap((node, nodeIndex) =>
      node.target.map((target) => ({
        target,
        label: `${violationIndex + 1}.${nodeIndex + 1}`,
        rule: violation.id,
      }))
    )
  );

  await page.evaluate((items) => {
    const overlayRoot = document.createElement('div');
    overlayRoot.setAttribute('data-testid', 'axe-violation-overlays');
    overlayRoot.style.position = 'absolute';
    overlayRoot.style.left = '0';
    overlayRoot.style.top = '0';
    overlayRoot.style.width = '0';
    overlayRoot.style.height = '0';
    overlayRoot.style.zIndex = '2147483647';
    overlayRoot.style.pointerEvents = 'none';
    document.body.appendChild(overlayRoot);

    for (const item of items) {
      let element: Element | null = null;
      try {
        element = document.querySelector(item.target);
      } catch {
        element = null;
      }

      if (!element) {
        continue;
      }

      const rect = element.getBoundingClientRect();
      const marker = document.createElement('div');
      marker.style.position = 'absolute';
      marker.style.left = `${rect.left + window.scrollX}px`;
      marker.style.top = `${rect.top + window.scrollY}px`;
      marker.style.width = `${Math.max(rect.width, 2)}px`;
      marker.style.height = `${Math.max(rect.height, 2)}px`;
      marker.style.outline = '6px solid #d4351c';
      marker.style.background = 'rgba(255, 221, 0, 0.24)';
      marker.style.boxSizing = 'border-box';

      const label = document.createElement('div');
      label.textContent = `${item.label} ${item.rule}`;
      label.style.position = 'absolute';
      label.style.left = '0';
      label.style.top = '-32px';
      label.style.background = '#d4351c';
      label.style.color = '#fff';
      label.style.font = 'bold 16px Arial, sans-serif';
      label.style.padding = '4px 8px';
      label.style.whiteSpace = 'nowrap';

      marker.appendChild(label);
      overlayRoot.appendChild(marker);
    }
  }, markers);

  return async () => {
    await page.evaluate(() => {
      document.querySelector('[data-testid="axe-violation-overlays"]')?.remove();
    });
  };
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

function sanitiseFileName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}
