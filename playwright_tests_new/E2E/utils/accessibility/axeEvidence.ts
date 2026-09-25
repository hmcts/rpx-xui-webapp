import { AxeBuilder } from '@axe-core/playwright';
import { expect, type Page, type TestInfo } from '@playwright/test';
import type { AxeResults, Result } from 'axe-core';
import { createHtmlReport } from 'axe-html-reporter';
import { escapeAttribute, escapeHtml, publishAccessibilityEvidence } from './accessibilityEvidencePublisher';

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

interface PublishedEvidenceMetadata {
  engine: 'axe';
  feature: string;
  pageState: string;
  status?: 'issues-found' | 'known-findings' | 'needs-review' | 'passed' | 'error';
}

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
        <!doctype html><html lang="en">
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
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
  attachmentPrefix = 'accessibility-issues',
  metadata?: PublishedEvidenceMetadata
): Promise<void> {
  if (!testInfo || (results.violations.length === 0 && (results.incomplete ?? []).length === 0)) {
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

  const cleanup = await markViolationsOnPage(page, [...results.violations, ...(results.incomplete ?? [])]);
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

  await writePublishedEvidence(testInfo, results, screenshot, attachmentPrefix, metadata);
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
    reviewCount: (results.incomplete ?? []).reduce((count, result) => count + result.nodes.length, 0),
    incomplete: results.incomplete ?? [],
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
  const reportHref = `../${escapeAttribute(process.env.PLAYWRIGHT_REPORT_INDEX_FILENAME || 'xui-playwright-a11y.html')}`;
  const findings = [...results.violations, ...(results.incomplete ?? [])];
  const cards = findings
    .map((result, index) => {
      const needsReview = index >= results.violations.length;
      const criteria = result.tags
        .filter((tag) => /^wcag[1-4][1-9]\d+$/.test(tag))
        .map((tag) => {
          const digits = tag.slice(4);
          return `${digits[0]}.${digits[1]}.${digits.slice(2)}`;
        });
      const nodes = result.nodes
        .map(
          (node, nodeIndex) => `
      <li>
        <dl><dt>Screenshot marker</dt><dd>${index + 1}.${nodeIndex + 1}</dd>
          <dt>Where to look</dt><dd><code>${escapeHtml(node.target.join(', '))}</code></dd>
          <dt>${needsReview ? 'What needs checking' : 'What failed'}</dt><dd>${escapeHtml(node.failureSummary ?? 'See the check details below.')}</dd></dl>
        <ul>${[...(node.any ?? []), ...(node.all ?? []), ...(node.none ?? [])].map((check) => `<li>${escapeHtml(check.message)}</li>`).join('')}</ul>
        <details><summary>Rendered HTML excerpt</summary><pre>${escapeHtml(node.html)}</pre></details>
      </li>`
        )
        .join('');
      return `<section class="issue ${needsReview ? 'review' : ''}" id="issue-${index + 1}" tabindex="-1">
      <h2>${index + 1}. ${escapeHtml(result.help)}</h2>
      <p><strong>${needsReview ? 'Needs investigation — not a confirmed failure' : 'Automatically detected violation'}</strong> · ${escapeHtml(result.impact ?? 'impact not supplied')}</p>
      <p>${escapeHtml(result.description)}</p>
      <p><strong>Rule:</strong> ${escapeHtml(result.id)}. <strong>WCAG criterion number(s):</strong> ${escapeHtml(criteria.join(', ') || 'Not supplied by engine')}. <strong>Engine version/level tags:</strong> ${escapeHtml(
        result.tags
          .filter((tag) => /^wcag(?:2|21|22)a{1,3}$/.test(tag))
          .map((tag) =>
            tag.replace(
              /^wcag(2|21|22)(a+)$/,
              (_match, version: string, level: string) =>
                `WCAG ${version === '2' ? '2.0' : version === '21' ? '2.1' : '2.2'} ${level.toUpperCase()}`
            )
          )
          .join(', ') || 'Not supplied'
      )}</p>
      <p><strong>Potential solution:</strong> ${needsReview ? 'Determine whether the reported condition is a failure before changing the page. Use the check details and rule-specific examples.' : 'Use the failing check details and rule-specific examples to correct the affected markup, styles or interaction.'}
        <a href="${escapeAttribute(result.helpUrl)}">${escapeHtml(result.id)}: explanation and remediation examples</a></p>
      <p><strong>Verify:</strong> Recheck this element in the same page state, rerun the audit, and check the relevant keyboard or assistive-technology behaviour. An empty automated result does not establish full accessibility.</p>
      <ol>${nodes}</ol>
    </section>`;
    })
    .join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Axe accessibility evidence</title><style>
      * { box-sizing: border-box; } body { font: 16px/1.5 Arial, sans-serif; margin: 0; color: #0b0c0c; overflow-wrap: anywhere; }
      main { max-width: 76rem; margin: auto; padding: 1rem; } header { background: #0b0c0c; color: white; padding: 1rem; }
      .issue { border: 2px solid #d4351c; padding: 1rem; margin: 1rem 0; } .review { border-color: #b58800; }
      h2 { margin-top: 0; } dt { font-weight: bold; } dd { margin: 0 0 .6rem; }
      code, pre { font-size: .95rem; background: #f3f2f1; white-space: pre-wrap; overflow-wrap: anywhere; }
      pre { padding: .75rem; } a { color: #1d70b8; } :focus-visible { outline: 3px solid #ffdd00; box-shadow: 0 0 0 5px #0b0c0c; }
      .skip-link { position: absolute; left: -10000px; } .skip-link:focus { position: static; }
      summary { cursor: pointer; } li { margin-bottom: .75rem; }
    </style></head><body><a class="skip-link" href="#evidence-content">Skip to evidence</a>
    <header><h1>Axe accessibility evidence</h1><p>${results.violations.length} violated rule(s); ${(results.incomplete ?? []).length} rule(s) need investigation.</p></header>
    <main id="evidence-content" tabindex="-1"><p><a href="${reportHref}">Back to Odhín report</a></p>
      <p><strong>Page:</strong> ${escapeHtml(results.url)}</p><p>Automated checks cover part of WCAG 2.2 A/AA, including retained WCAG 2.0 and 2.1 criteria. This is not a conformance verdict. DOM targets are evidence clues, not verified source-file locations.</p>
      <nav aria-label="Findings"><ul>${findings.map((result, index) => `<li><a href="#issue-${index + 1}">${index + 1}. ${escapeHtml(result.help)}</a></li>`).join('')}</ul></nav>
      ${cards}<p><a href="${reportHref}">Back to Odhín report</a></p>
    </main></body></html>`;
}

async function writePublishedEvidence(
  testInfo: TestInfo,
  results: AxeResults,
  screenshot: Buffer,
  attachmentPrefix: string,
  metadata?: PublishedEvidenceMetadata
): Promise<void> {
  await publishAccessibilityEvidence(testInfo, {
    attachmentPrefix,
    entry: {
      engine: 'axe',
      status: metadata?.status ?? (results.violations.length > 0 ? 'issues-found' : 'needs-review'),
      reviewCount: (results.incomplete ?? []).reduce((count, result) => count + result.nodes.length, 0),
      reviewRules: (results.incomplete ?? []).map((result) => result.id),
      feature: metadata?.feature,
      pageState: metadata?.pageState,
      violationCount: results.violations.length,
      rules: results.violations.map((violation) => violation.id),
      targets: [...results.violations, ...(results.incomplete ?? [])].flatMap((violation) =>
        violation.nodes.flatMap((node) =>
          node.target.map((target) => (typeof target === 'string' ? target : JSON.stringify(target)))
        )
      ),
    },
    html: buildIssueSummaryHtml(results),
    json: toEvidenceSummary(results),
    screenshot,
    screenshotSuffix: '-highlighted-screenshot.png',
  });
}

async function markViolationsOnPage(page: Page, violations: Result[]): Promise<() => Promise<void>> {
  const markers = violations.flatMap((violation, violationIndex) =>
    violation.nodes.flatMap((node, nodeIndex) =>
      node.target.map((target) => ({
        // Nested frame/shadow selectors remain unresolved instead of marking an unrelated top-level element.
        target: typeof target === 'string' ? target : JSON.stringify(target),
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

    const unresolved: Array<{ label: string; rule: string; target: string }> = [];

    for (const item of items) {
      let element: Element | null = null;
      try {
        element = document.querySelector(item.target);
      } catch {
        element = null;
      }

      if (!element) {
        unresolved.push(item);
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

    if (unresolved.length > 0) {
      const banner = document.createElement('div');
      banner.style.position = 'absolute';
      banner.style.left = `${window.scrollX + 16}px`;
      banner.style.top = `${window.scrollY + 16}px`;
      banner.style.maxWidth = '760px';
      banner.style.background = '#d4351c';
      banner.style.color = '#fff';
      banner.style.border = '6px solid #ffdd00';
      banner.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.35)';
      banner.style.font = 'bold 18px Arial, sans-serif';
      banner.style.padding = '12px 16px';
      banner.textContent = `Page-level axe finding(s): ${unresolved
        .slice(0, 5)
        .map((item) => `${item.label} ${item.rule} (${item.target})`)
        .join('; ')}${unresolved.length > 5 ? '; ...' : ''}`;
      overlayRoot.appendChild(banner);
    }
  }, markers);

  return async () => {
    await page.evaluate(() => {
      document.querySelector('[data-testid="axe-violation-overlays"]')?.remove();
    });
  };
}
