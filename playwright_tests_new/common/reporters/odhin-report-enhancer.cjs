/* global require, module */

const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');

function deriveFeatureName(filePath) {
  const normalized = String(filePath ?? '')
    .replace(/\\/g, '/')
    .trim();

  if (!normalized) {
    return 'unknown';
  }

  const rootedPatterns = [
    /\/playwright_tests_new\/integration\/test\/([^/]+)\//i,
    /\/playwright_tests_new\/E2E\/tests?\/([^/]+)\//i,
    /\/playwright_tests_new\/e2e\/tests?\/([^/]+)\//i,
    /\/playwright_tests_new\/api\/([^/]+)\//i,
    /\/tests?\/([^/]+)\//i,
  ];

  for (const pattern of rootedPatterns) {
    const match = normalized.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  const baseName = normalized.split('/').pop() ?? normalized;
  return baseName.replace(/\.[^.]+$/, '');
}

function createEmptyFeatureStat(name) {
  return {
    name,
    totalTests: 0,
    durationMs: 0,
    passed: 0,
    failed: 0,
    timedOut: 0,
    skipped: 0,
    interrupted: 0,
    flaky: 0,
  };
}

function normalizeFeatureStats(featureStats) {
  const source =
    featureStats instanceof Map
      ? Array.from(featureStats.values())
      : Array.isArray(featureStats)
        ? featureStats
        : Object.values(featureStats ?? {});

  return source
    .map((entry) => ({
      ...createEmptyFeatureStat(String(entry?.name ?? 'unknown')),
      ...entry,
      totalTests: Number(entry?.totalTests ?? 0),
      durationMs: Number(entry?.durationMs ?? 0),
      passed: Number(entry?.passed ?? 0),
      failed: Number(entry?.failed ?? 0),
      timedOut: Number(entry?.timedOut ?? 0),
      skipped: Number(entry?.skipped ?? 0),
      interrupted: Number(entry?.interrupted ?? 0),
      flaky: Number(entry?.flaky ?? 0),
    }))
    .sort((left, right) => {
      if (right.totalTests !== left.totalTests) {
        return right.totalTests - left.totalTests;
      }
      return left.name.localeCompare(right.name);
    });
}

function colorForFeature(name) {
  let hash = 0;
  for (const char of String(name)) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  const hue = hash % 360;
  return `hsl(${hue} 68% 52%)`;
}

function percentOf(total, value) {
  if (!total) {
    return '0.00';
  }
  return ((value / total) * 100).toFixed(2);
}

function formatDuration(durationMs) {
  const safeDuration = Math.max(0, Math.round(Number(durationMs) || 0));
  const hours = Math.floor(safeDuration / 3600000);
  const minutes = Math.floor((safeDuration % 3600000) / 60000);
  const seconds = Math.floor((safeDuration % 60000) / 1000);
  const milliseconds = safeDuration % 1000;
  return `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function injectEnhancerStyles(root) {
  const head = root.querySelector('head');
  if (!head) {
    return;
  }

  root.querySelectorAll('#odhin-enhancer-styles').forEach((node) => node.remove());
  head.appendChild(
    parse(`
<style id="odhin-enhancer-styles">
  .odhin-dashboard-stack {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 0;
    align-self: stretch;
    height: 100%;
  }

  .odhin-dashboard-stack > .dashboard-block {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .odhin-dashboard-stack > .dashboard-block .odhin-table {
    flex: 1 1 auto;
  }

  #odhin-feature-summary .odhin-feature-overview-layout {
    display: grid;
    grid-template-columns: clamp(220px, 26%, 340px) minmax(0, 1fr);
    gap: clamp(12px, 1.6vw, 20px);
    align-items: stretch;
    padding: clamp(12px, 1.2vw, 18px);
    min-height: 100%;
  }

  #odhin-feature-summary .odhin-feature-overview-layout.odhin-feature-overview-layout-compact {
    grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  }

  #odhin-feature-summary .odhin-feature-overview-layout.odhin-feature-overview-layout-balanced {
    grid-template-columns: minmax(240px, 300px) minmax(0, 1fr);
  }

  #odhin-feature-summary .odhin-feature-overview-sidebar {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    gap: 12px;
    min-width: 0;
  }

  #odhin-feature-summary .odhin-feature-overview-title {
    text-align: center;
    margin-bottom: 4px;
  }

  #odhin-feature-summary .odhin-feature-overview-cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: clamp(10px, 1vw, 14px);
  }

  #odhin-feature-summary .odhin-feature-overview-layout.odhin-feature-overview-layout-compact .odhin-feature-overview-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  #odhin-feature-summary .odhin-feature-overview-card {
    border: 1px solid #d8e3ef;
    border-radius: 12px;
    background: #f8fbfe;
    color: #16324f;
    padding: 14px 10px;
    text-align: center;
  }

  #odhin-feature-summary .odhin-feature-overview-card-value {
    font-size: 34px;
    line-height: 1;
    font-weight: 700;
  }

  #odhin-feature-summary .odhin-feature-overview-card-label {
    margin-top: 8px;
    font-size: 13px;
    font-weight: 600;
  }

  .odhin-a11y-test-evidence {
    background: #fff4f4;
    border-left: 10px solid #d4351c;
    border-top: 4px solid #ffdd00;
    color: #0b0c0c;
    font-family: Arial, sans-serif;
    margin: 0 0 16px;
    padding: 14px;
  }

  .odhin-a11y-test-evidence h2 {
    color: #0b0c0c;
    font-size: 22px;
    margin: 0 0 8px;
  }

  .odhin-a11y-test-evidence p {
    margin: 0 0 8px;
  }

  .odhin-a11y-test-evidence code {
    background: #f3f2f1;
    color: #0b0c0c;
    padding: 2px 4px;
  }

  .odhin-a11y-test-evidence a {
    color: #0b0c0c;
    display: inline-block;
    font-weight: bold;
    margin: 4px 8px 0 0;
    padding: 8px 12px;
  }

  .odhin-a11y-test-evidence a:first-of-type {
    background: #d4351c;
    color: #ffffff;
  }

  .odhin-a11y-test-evidence a:nth-of-type(2) {
    background: #ffdd00;
  }

  .odhin-a11y-test-evidence a:nth-of-type(3) {
    background: #f3f2f1;
  }

  #odhin-feature-summary .odhin-feature-overview-largest {
    width: 100%;
    border: 1px solid #d8e3ef;
    border-radius: 12px;
    background: #ffffff;
    padding: 12px 14px;
    color: #16324f;
  }

  #odhin-feature-summary .odhin-feature-overview-largest-title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #53657d;
  }

  #odhin-feature-summary .odhin-feature-overview-largest-feature {
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  #odhin-feature-summary .odhin-feature-overview-largest-note {
    margin-top: 8px;
    font-size: 13px;
    color: #53657d;
  }

  #odhin-feature-summary .odhin-feature-overview-table {
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  #odhin-feature-summary .odhin-feature-overview-table .tableFixHead {
    margin-left: 0 !important;
    height: auto;
    flex: 1 1 auto;
  }

  #odhin-feature-summary .odhin-feature-overview-table table {
    width: 100%;
  }

  #odhin-feature-summary .odhin-feature-overview-table th,
  #odhin-feature-summary .odhin-feature-overview-table td {
    vertical-align: middle;
    white-space: nowrap;
  }

  #odhin-feature-summary .odhin-feature-overview-table td:first-child,
  #odhin-feature-summary .odhin-feature-overview-table th:first-child {
    white-space: normal;
  }

  @media (max-width: 1399px) {
    #odhin-feature-summary .odhin-feature-overview-layout {
      grid-template-columns: 1fr;
    }

    #odhin-feature-summary .odhin-feature-overview-sidebar {
      justify-content: flex-start;
    }
  }
</style>`)
  );
}

function dashboardBlockTitle(column) {
  return column.querySelector('.info-box-header')?.text.trim() ?? '';
}

function rebalanceTopDashboardColumns(root) {
  const columns = root.querySelectorAll('.col-12.col-xl-6');
  const runInfoColumn = columns.find((column) => dashboardBlockTitle(column) === 'Run info');
  const globalSummaryColumn = columns.find((column) => dashboardBlockTitle(column) === 'Global Summary');
  const featureOverviewColumn = columns.find((column) => dashboardBlockTitle(column) === 'Feature Overview');
  const projectsSummaryColumn = columns.find((column) => dashboardBlockTitle(column) === 'Projects Summary');

  if (!runInfoColumn || !globalSummaryColumn || !featureOverviewColumn || !projectsSummaryColumn) {
    return;
  }

  const parent = runInfoColumn.parentNode;
  if (
    !parent ||
    parent !== globalSummaryColumn.parentNode ||
    parent !== featureOverviewColumn.parentNode ||
    parent !== projectsSummaryColumn.parentNode
  ) {
    return;
  }

  const leftStack = parse(
    `<div class="col-12 col-xl-6 odhin-dashboard-stack">${runInfoColumn.innerHTML}${featureOverviewColumn.innerHTML}</div>`
  );
  const rightStack = parse(
    `<div class="col-12 col-xl-6 odhin-dashboard-stack">${globalSummaryColumn.innerHTML}${projectsSummaryColumn.innerHTML}</div>`
  );

  runInfoColumn.replaceWith(leftStack);
  globalSummaryColumn.replaceWith(rightStack);
  featureOverviewColumn.remove();
  projectsSummaryColumn.remove();
}

function buildFeatureOverviewBlock(featureStats) {
  const totalTests = featureStats.reduce((sum, feature) => sum + feature.totalTests, 0);
  const topFeature = featureStats[0];
  const summaryLabel = featureStats.length > 1 ? 'Distribution' : 'Summary';
  const layoutDensityClass =
    featureStats.length <= 3
      ? 'odhin-feature-overview-layout-compact'
      : featureStats.length <= 6
        ? 'odhin-feature-overview-layout-balanced'
        : 'odhin-feature-overview-layout-dense';
  const tableViewportPx = Math.min(520, Math.max(156, 72 + featureStats.length * 40));
  const rows = featureStats
    .map((feature) => {
      const color = colorForFeature(feature.name);
      return `
                <tr>
                  <td class="text-start fs-6 text-secondary-emphasis summary-row-left-column" style="border-left: 8px solid ${color};">
                    ${escapeHtml(feature.name)}
                  </td>
                  <td class="text-secondary-emphasis">${feature.totalTests}</td>
                  <td class="text-secondary-emphasis">${formatDuration(feature.durationMs)}</td>
                  <td class="result-status-passed">${feature.passed} (<label class="fst-italic">${percentOf(feature.totalTests, feature.passed)}%</label>)</td>
                  <td class="result-status-failed">${feature.failed} (<label class="fst-italic">${percentOf(feature.totalTests, feature.failed)}%</label>)</td>
                  <td class="result-status-timedOut">${feature.timedOut} (<label class="fst-italic">${percentOf(feature.totalTests, feature.timedOut)}%</label>)</td>
                  <td class="result-status-skipped">${feature.skipped} (<label class="fst-italic">${percentOf(feature.totalTests, feature.skipped)}%</label>)</td>
                  <td class="result-status-interrupted">${feature.interrupted} (<label class="fst-italic">${percentOf(feature.totalTests, feature.interrupted)}%</label>)</td>
                  <td class="result-status-flaky">${feature.flaky} (<label class="fst-italic">${percentOf(feature.totalTests, feature.flaky)}%</label>)</td>
                  <td class="text-secondary-emphasis">${percentOf(totalTests, feature.totalTests)}%</td>
                </tr>`;
    })
    .join('\n');

  return `
<div class="mt-3 mb-3 odhin-thin-border dashboard-block" id="odhin-feature-summary">
  <div class="info-box-header">
    Feature Overview
  </div>
  <div class="odhin-table">
    <div class="odhin-feature-overview-layout ${layoutDensityClass}">
      <div class="odhin-feature-overview-sidebar">
        <div class="odhin-text-2 odhin-feature-overview-title">${summaryLabel}</div>
        <div class="odhin-feature-overview-cards">
          <div class="odhin-feature-overview-card">
            <div class="odhin-feature-overview-card-value">${totalTests}</div>
            <div class="odhin-feature-overview-card-label">Tests</div>
          </div>
          <div class="odhin-feature-overview-card">
            <div class="odhin-feature-overview-card-value">${featureStats.length}</div>
            <div class="odhin-feature-overview-card-label">Features</div>
          </div>
        </div>
        <div class="odhin-feature-overview-largest">
          <div class="odhin-feature-overview-largest-title">Largest feature</div>
          <div class="odhin-feature-overview-largest-feature">
            <span style="display:inline-block;width:12px;height:12px;border-radius:999px;background:${colorForFeature(topFeature.name)};"></span>
            <span style="font-size:16px;font-weight:700;">${escapeHtml(topFeature.name)}</span>
          </div>
          <div class="odhin-feature-overview-largest-note">
            ${topFeature.totalTests} tests (${percentOf(totalTests, topFeature.totalTests)}% of this run)
          </div>
        </div>
      </div>
      <div class="odhin-feature-overview-table">
          <div class="table-responsive tableFixHead" style="max-height:${tableViewportPx}px;">
            <table class="table table-sm mb-0">
              <thead>
                <tr>
                  <th class="odhin-text-2 px-2">Feature</th>
                  <th class="odhin-text-2 px-2">Tests</th>
                  <th class="odhin-text-2 px-2">Execution Time</th>
                  <th class="odhin-text-2 px-2">Passed</th>
                  <th class="odhin-text-2 px-2">Failed</th>
                  <th class="odhin-text-2 px-2">Timed Out</th>
                  <th class="odhin-text-2 px-2">Skipped</th>
                  <th class="odhin-text-2 px-2">Interrupted</th>
                  <th class="odhin-text-2 px-2">Flaky</th>
                  <th class="odhin-text-2 px-2">Percentage</th>
                </tr>
              </thead>
              <tbody>
                ${rows || '<tr><td colspan="10" class="text-secondary-emphasis text-start">No grouped features found</td></tr>'}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  </div>
</div>`;
}

function normalizeEvidenceEntries(entries) {
  return (Array.isArray(entries) ? entries : [])
    .filter(
      (entry) =>
        entry &&
        typeof entry.testTitle === 'string' &&
        typeof entry.htmlFileName === 'string' &&
        Number.isFinite(Number(entry.violationCount))
    )
    .map((entry) => ({
      engine: typeof entry.engine === 'string' ? entry.engine : inferEvidenceEngine(entry),
      feature: typeof entry.feature === 'string' ? entry.feature : '',
      pageState: typeof entry.pageState === 'string' ? entry.pageState : '',
      testTitle: entry.testTitle,
      htmlFileName: entry.htmlFileName,
      jsonFileName: typeof entry.jsonFileName === 'string' ? entry.jsonFileName : '',
      screenshotFileName: typeof entry.screenshotFileName === 'string' ? entry.screenshotFileName : '',
      reportFileName: typeof entry.reportFileName === 'string' ? entry.reportFileName : '',
      violationCount: Number(entry.violationCount),
      status: typeof entry.status === 'string' ? entry.status : '',
      summary: typeof entry.summary === 'string' ? entry.summary : '',
      rules: Array.isArray(entry.rules) ? entry.rules.map(String) : [],
      targets: Array.isArray(entry.targets) ? entry.targets.map(String) : [],
    }))
    .sort(
      (left, right) =>
        left.feature.localeCompare(right.feature) ||
        left.pageState.localeCompare(right.pageState) ||
        engineSortOrder(left.engine) - engineSortOrder(right.engine) ||
        left.testTitle.localeCompare(right.testTitle)
    );
}

function inferEvidenceEngine(entry) {
  const value = `${entry?.attachmentPrefix ?? ''} ${entry?.htmlFileName ?? ''}`.toLowerCase();
  if (value.includes('wave')) {
    return 'wave-like';
  }
  if (value.includes('screen-reader')) {
    return 'screen-reader';
  }
  if (value.includes('lighthouse')) {
    return 'lighthouse';
  }
  if (value.includes('page-summary')) {
    return 'summary';
  }
  return 'axe';
}

function engineSortOrder(engine) {
  return ['summary', 'axe', 'wave-like', 'screen-reader', 'lighthouse'].indexOf(engine) >= 0
    ? ['summary', 'axe', 'wave-like', 'screen-reader', 'lighthouse'].indexOf(engine)
    : 99;
}

function engineLabel(engine) {
  return (
    {
      summary: 'Page summary',
      axe: 'axe',
      'wave-like': 'WAVE-like',
      'screen-reader': 'Screen-reader',
      lighthouse: 'Lighthouse',
    }[engine] ?? engine
  );
}

function jsonLinkLabel(engine) {
  return (
    {
      summary: 'summary JSON',
      axe: 'DOM and axe JSON',
      'wave-like': 'DOM and WAVE JSON',
      'screen-reader': 'screen-reader JSON',
      lighthouse: 'Lighthouse JSON',
    }[engine] ?? 'evidence JSON'
  );
}

function issueLabel(engine, count) {
  if (engine === 'summary') {
    return `${count} unexpected issue(s) across engines`;
  }
  if (engine === 'lighthouse') {
    return count === 0 ? 'Accessibility threshold passed' : `${count} Lighthouse issue(s)`;
  }
  return `${count} ${engineLabel(engine)} issue(s)`;
}

function buildAccessibilityEvidenceBlock(entries) {
  const normalizedEntries = normalizeEvidenceEntries(entries);
  if (!normalizedEntries.length) {
    return '';
  }

  const cards = normalizedEntries
    .map((entry) => {
      const screenshotPath = entry.screenshotFileName ? `./accessibility-evidence/${entry.screenshotFileName}` : '';
      const evidenceLinks = [
        `<a href="${escapeAttribute(`./accessibility-evidence/${entry.htmlFileName}`)}">${entry.engine === 'summary' ? 'open page summary' : 'issue detail'}</a>`,
        entry.reportFileName
          ? `<a href="${escapeAttribute(`./accessibility-evidence/${entry.reportFileName}`)}">native Lighthouse HTML</a>`
          : '',
        screenshotPath ? `<a href="${escapeAttribute(screenshotPath)}">screenshot</a>` : '',
        entry.jsonFileName
          ? `<a href="${escapeAttribute(`./accessibility-evidence/${entry.jsonFileName}`)}">${jsonLinkLabel(entry.engine)}</a>`
          : '',
      ]
        .filter(Boolean)
        .join('\n');
      return `
        <article class="odhin-a11y-evidence-card" data-engine="${escapeAttribute(entry.engine)}">
          <div class="odhin-a11y-evidence-card-body">
            <span class="odhin-a11y-evidence-engine">${escapeHtml(engineLabel(entry.engine))}</span>
            <div class="odhin-a11y-evidence-title">${escapeHtml(entry.testTitle)}</div>
            <p class="odhin-a11y-evidence-meta">
              ${escapeHtml(issueLabel(entry.engine, entry.violationCount))}: ${escapeHtml(entry.rules.join(', ') || entry.summary || 'no rule recorded')}
            </p>
            ${
              entry.feature || entry.pageState
                ? `<p class="odhin-a11y-evidence-meta">${escapeHtml([entry.feature, entry.pageState].filter(Boolean).join(' / '))}</p>`
                : ''
            }
            <p class="odhin-a11y-evidence-meta">
              Targets: ${escapeHtml(entry.targets.join(', ') || 'no target recorded')}
            </p>
            <div class="odhin-a11y-evidence-links">
              ${evidenceLinks}
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  return `
    <div class="col-12">
      <div class="mt-3 mb-3 odhin-thin-border dashboard-block" id="odhin-accessibility-evidence">
        <div class="info-box-header">Accessibility Evidence</div>
        <div class="odhin-table">
          <div class="odhin-a11y-evidence-grid">${cards}</div>
        </div>
      </div>
    </div>
  `;
}

function injectAccessibilityEvidence(root, evidenceEntries) {
  const evidenceHtml = buildAccessibilityEvidenceBlock(evidenceEntries);
  if (!evidenceHtml || root.querySelector('#odhin-accessibility-evidence')) {
    return false;
  }

  const dashboardRow =
    root.querySelector('#TabDashboard .row') ?? root.querySelector('#TabDashboard') ?? root.querySelector('body');
  if (!dashboardRow) {
    return false;
  }

  dashboardRow.appendChild(parse(evidenceHtml));
  return true;
}

function removeDashboardAccessibilityEvidence(root) {
  root.querySelectorAll('#odhin-accessibility-evidence').forEach((node) => node.remove());
}

function buildTestEvidencePanel(entry) {
  const ruleSummary = entry.rules.length > 0 ? entry.rules.join(', ') : entry.summary || `${engineLabel(entry.engine)} evidence`;
  const targetSummary = entry.targets.length > 0 ? entry.targets.slice(0, 6).join(', ') : 'No DOM target recorded';
  const screenshotLink = entry.screenshotFileName
    ? `<a href="${escapeAttribute(`./accessibility-evidence/${entry.screenshotFileName}`)}">Open screenshot</a>`
    : '';
  const jsonLink = entry.jsonFileName
    ? `<a href="${escapeAttribute(`./accessibility-evidence/${entry.jsonFileName}`)}">Open ${escapeHtml(jsonLinkLabel(entry.engine))}</a>`
    : '';
  const nativeReportLink = entry.reportFileName
    ? `<a href="${escapeAttribute(`./accessibility-evidence/${entry.reportFileName}`)}">Open native Lighthouse HTML</a>`
    : '';

  return `
    <div class="odhin-a11y-test-evidence" data-a11y-test-evidence-link="${escapeAttribute(entry.htmlFileName)}">
      <h2>${escapeHtml(engineLabel(entry.engine))} accessibility findings for this test</h2>
      <p><strong>Pipeline non-blocking:</strong> Playwright can mark this test red, but the accessibility wrapper exits successfully unless <code>A11Y_STRICT</code> is enabled.</p>
      <p><strong>${escapeHtml(issueLabel(entry.engine, entry.violationCount))}:</strong> ${escapeHtml(ruleSummary)}</p>
      <p><strong>DOM target(s):</strong> <code>${escapeHtml(targetSummary)}</code></p>
      <a href="${escapeAttribute(`./accessibility-evidence/${entry.htmlFileName}`)}">Open highlighted issue report</a>
      ${nativeReportLink}
      ${screenshotLink}
      ${jsonLink}
    </div>
  `;
}

function injectAccessibilityEvidenceIntoTestModals(root, evidenceEntries) {
  const normalizedEntries = normalizeEvidenceEntries(evidenceEntries);
  if (!normalizedEntries.length) {
    return 0;
  }

  let injectedCount = 0;
  const modalContents = root.querySelectorAll('.modal-content');
  normalizedEntries.forEach((entry) => {
    const marker = `[data-a11y-test-evidence-link="${entry.htmlFileName.replace(/"/g, '\\"')}"]`;
    root.querySelectorAll(marker).forEach((node) => node.remove());

    const matchingModal = modalContents.find(
      (modalContent) => modalContent.querySelector('.header-col-center')?.text.trim() === entry.testTitle
    );
    const modalBody = matchingModal?.querySelector('.modal-body.odhin-bg-2');
    if (!modalBody) {
      return;
    }

    modalBody.insertAdjacentHTML('afterbegin', buildTestEvidencePanel(entry));
    injectedCount += 1;
  });

  return injectedCount;
}

function replaceDashboardBlock(root, title, replacementHtml) {
  const block = root
    .querySelectorAll('.dashboard-block')
    .find((candidate) => candidate.querySelector('.info-box-header')?.text.trim() === title);

  if (!block) {
    return false;
  }

  block.replaceWith(parse(replacementHtml));
  return true;
}

function removeDuplicateFeatureStatusBlock(root) {
  const featureStatusBlocks = root
    .querySelectorAll('.dashboard-block')
    .filter((candidate) => candidate.querySelector('.info-box-header')?.text.trim() === 'Status by feature');

  featureStatusBlocks.forEach((candidate) => candidate.remove());
}

function removeLegacyFileChartInitializer(scriptContent) {
  return String(scriptContent)
    .replace(
      /\s*(?:let|const|var)\s+ctxFile\s*=\s*document\.getElementById\('chart-file'\)\.getContext\('2d'\);\s*(?:let|const|var)\s+chartFile\s*=\s*new\s+Chart\(ctxFile,\s*\{[\s\S]*?\}\s*\);\s*/g,
      '\n'
    )
    .replace(/\n{3,}/g, '\n\n');
}

function stripLegacyFileChartArtifacts(root) {
  root.querySelectorAll('#chart-file').forEach((node) => node.remove());
  root.querySelectorAll('script').forEach((scriptNode) => {
    const currentContent = scriptNode.innerHTML;
    const nextContent = removeLegacyFileChartInitializer(currentContent);
    if (nextContent !== currentContent) {
      scriptNode.set_content(nextContent);
    }
  });
}

function defaultTestListRowsPerPage(html) {
  return String(html)
    .replace(
      /\$\("#test-list-table"\)\.DataTable\(\{\}\)/g,
      '$("#test-list-table").DataTable({pageLength:100,lengthMenu:[10,25,50,100]})'
    )
    .replace(
      /\$\('#test-list-table'\)\.DataTable\(\{\}\)/g,
      "$('#test-list-table').DataTable({pageLength:100,lengthMenu:[10,25,50,100]})"
    );
}

function enhanceDashboardHtml(html, featureStats, evidenceEntries = []) {
  const htmlWithDefaultTestRows = defaultTestListRowsPerPage(html);
  const normalizedStats = normalizeFeatureStats(featureStats);
  const normalizedEvidenceEntries = normalizeEvidenceEntries(evidenceEntries);
  const hasDashboardAccessibilityEvidence = htmlWithDefaultTestRows.includes('id="odhin-accessibility-evidence"');
  if (!normalizedStats.length && !normalizedEvidenceEntries.length && !hasDashboardAccessibilityEvidence) {
    return htmlWithDefaultTestRows;
  }

  const root = parse(htmlWithDefaultTestRows);
  injectEnhancerStyles(root);
  removeDashboardAccessibilityEvidence(root);

  if (normalizedStats.length) {
    replaceDashboardBlock(root, 'Files Summary', buildFeatureOverviewBlock(normalizedStats));
    removeDuplicateFeatureStatusBlock(root);
    rebalanceTopDashboardColumns(root);
    stripLegacyFileChartArtifacts(root);
  }

  injectAccessibilityEvidenceIntoTestModals(root, normalizedEvidenceEntries);

  return root.toString();
}

function readAccessibilityEvidenceEntries(outputFolder) {
  const evidenceDir = path.join(outputFolder, 'accessibility-evidence');
  if (!fs.existsSync(evidenceDir)) {
    return [];
  }

  const entriesByKey = new Map();

  try {
    const manifest = JSON.parse(fs.readFileSync(path.join(evidenceDir, 'manifest.json'), 'utf8'));
    normalizeEvidenceEntries(manifest).forEach((entry) => {
      entriesByKey.set(`${entry.testTitle}\u0000${entry.htmlFileName}`, entry);
    });
  } catch {
    // Per-test entry files below are the source of truth when parallel workers race on the aggregate manifest.
  }

  fs.readdirSync(evidenceDir)
    .filter((fileName) => fileName.startsWith('manifest-entry-') && fileName.endsWith('.json'))
    .forEach((fileName) => {
      try {
        normalizeEvidenceEntries([JSON.parse(fs.readFileSync(path.join(evidenceDir, fileName), 'utf8'))]).forEach((entry) => {
          entriesByKey.set(`${entry.testTitle}\u0000${entry.htmlFileName}`, entry);
        });
      } catch {
        // Ignore corrupt per-test evidence so one bad entry cannot suppress the full report.
      }
    });

  return Array.from(entriesByKey.values());
}

function enhanceGeneratedReport(outputFolder, featureStats) {
  if (!outputFolder || !fs.existsSync(outputFolder)) {
    return;
  }

  const normalizedStats = normalizeFeatureStats(featureStats);
  const evidenceEntries = readAccessibilityEvidenceEntries(outputFolder);
  if (!normalizedStats.length && !normalizeEvidenceEntries(evidenceEntries).length) {
    return;
  }

  const reportFiles = fs.readdirSync(outputFolder).filter((fileName) => fileName.toLowerCase().endsWith('.html'));

  reportFiles.forEach((fileName) => {
    const filePath = path.join(outputFolder, fileName);
    const currentHtml = fs.readFileSync(filePath, 'utf8');
    const nextHtml = enhanceDashboardHtml(currentHtml, normalizedStats, evidenceEntries);
    fs.writeFileSync(filePath, nextHtml, 'utf8');
  });
}

module.exports = {
  createEmptyFeatureStat,
  deriveFeatureName,
  enhanceDashboardHtml,
  enhanceGeneratedReport,
  formatDuration,
  normalizeFeatureStats,
  percentOf,
  __test__: {
    buildFeatureOverviewBlock,
    buildAccessibilityEvidenceBlock,
    createEmptyFeatureStat,
    defaultTestListRowsPerPage,
    deriveFeatureName,
    enhanceDashboardHtml,
    formatDuration,
    normalizeEvidenceEntries,
    readAccessibilityEvidenceEntries,
    removeLegacyFileChartInitializer,
    normalizeFeatureStats,
    percentOf,
  },
};
