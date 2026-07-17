#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_REPORT_FILE = 'xui-playwright-integration.html';

function parseArgs(argv) {
  const options = {
    reportDir: process.env.PLAYWRIGHT_REPORT_FOLDER || '',
    reportFile: process.env.PLAYWRIGHT_REPORT_INDEX_FILENAME || DEFAULT_REPORT_FILE,
    suiteName: process.env.PW_ODHIN_FALLBACK_SUITE_NAME || 'Playwright Integration Test',
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === '--report-dir' && next) {
      options.reportDir = next;
      index += 1;
    } else if (arg === '--report-file' && next) {
      options.reportFile = next;
      index += 1;
    } else if (arg === '--suite-name' && next) {
      options.suiteName = next;
      index += 1;
    }
  }

  return options;
}

function ensureOdhinReport(options) {
  if (!options.reportDir) {
    throw new Error('Missing report directory. Pass --report-dir or set PLAYWRIGHT_REPORT_FOLDER.');
  }

  const reportPath = path.join(options.reportDir, options.reportFile || DEFAULT_REPORT_FILE);
  if (fs.existsSync(reportPath)) {
    return { created: false, reportPath };
  }

  fs.mkdirSync(options.reportDir, { recursive: true });
  fs.writeFileSync(reportPath, buildFallbackReportHtml(options), 'utf8');
  return { created: true, reportPath };
}

function buildFallbackReportHtml(options) {
  const generatedAt = new Date().toISOString();
  const reportDir = options.reportDir || '';
  const reportFiles = listFiles(reportDir);
  const diagnostics = collectDiagnostics();

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(options.suiteName)} - Odhín report unavailable</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 2rem; color: #0b0c0c; }
      h1 { margin-bottom: 0.5rem; }
      code, pre { background: #f3f2f1; padding: 0.2rem 0.4rem; }
      pre { padding: 1rem; overflow: auto; }
      .warning { border-left: 6px solid #d4351c; padding: 1rem; background: #fef7f7; }
      .meta { margin-top: 1.5rem; }
    </style>
  </head>
  <body>
    <h1>${escapeHtml(options.suiteName)}</h1>
    <div class="warning">
      <strong>Odhín HTML report was not generated before Jenkins publishing.</strong>
      <p>The Playwright integration command failed or was interrupted before the Odhín reporter wrote
      <code>${escapeHtml(options.reportFile || DEFAULT_REPORT_FILE)}</code>. Jenkins generated this fallback so the build
      always exposes a report artifact for failed integration runs.</p>
    </div>
    <div class="meta">
      <p><strong>Generated:</strong> ${escapeHtml(generatedAt)}</p>
      <p><strong>Report directory:</strong> <code>${escapeHtml(reportDir)}</code></p>
    </div>
    <h2>Files present in report directory</h2>
    <pre>${escapeHtml(reportFiles.length ? reportFiles.join('\n') : 'No files were present.')}</pre>
    <h2>Diagnostics</h2>
    <pre>${escapeHtml(diagnostics.length ? diagnostics.join('\n') : 'No diagnostic files were found.')}</pre>
  </body>
</html>
`;
}

function listFiles(directory) {
  if (!directory || !fs.existsSync(directory)) {
    return [];
  }
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .map((entry) => `${entry.isDirectory() ? 'dir ' : 'file'} ${entry.name}`)
    .sort();
}

function collectDiagnostics() {
  const candidates = [
    'functional-output/tests/playwright-diagnostics/failure-data',
    'functional-output/tests/playwright-integration/load-profile',
    'test-results',
  ];

  return candidates.flatMap((candidate) => listInterestingFiles(candidate).map((file) => `${candidate}/${file}`));
}

function listInterestingFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }
  const found = [];
  const visit = (current, relativeBase = '') => {
    fs.readdirSync(current, { withFileTypes: true }).forEach((entry) => {
      const relativePath = path.join(relativeBase, entry.name);
      const absolutePath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.playwright-artifacts-')) {
          visit(absolutePath, relativePath);
        }
        return;
      }
      if (/(failure-data\.json|error-context\.md|trace\.zip|summary\.json|load-profile\.html)$/i.test(entry.name)) {
        found.push(relativePath);
      }
    });
  };
  visit(directory);
  return found.sort().slice(0, 200);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

if (require.main === module) {
  try {
    const result = ensureOdhinReport(parseArgs(process.argv.slice(2)));
    if (result.created) {
      console.warn(`ensure-odhin-report: created fallback report at ${result.reportPath}`);
    } else {
      console.log(`ensure-odhin-report: report exists at ${result.reportPath}`);
    }
  } catch (error) {
    console.error(`ensure-odhin-report: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  buildFallbackReportHtml,
  ensureOdhinReport,
  parseArgs,
};
