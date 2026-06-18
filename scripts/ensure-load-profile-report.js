#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_REPORT_FILE = 'load-profile.html';

function parseArgs(argv) {
  const options = {
    reportDir: process.env.PW_LOAD_PROFILE_REPORT_DIR || '',
    reportFile: process.env.PW_LOAD_PROFILE_REPORT_FILE || DEFAULT_REPORT_FILE,
    reportName: process.env.PW_LOAD_PROFILE_REPORT_NAME || 'Playwright System Load',
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
    } else if (arg === '--report-name' && next) {
      options.reportName = next;
      index += 1;
    }
  }

  return options;
}

function ensureLoadProfileReport(options) {
  if (!options.reportDir) {
    throw new Error('Missing report directory. Pass --report-dir or set PW_LOAD_PROFILE_REPORT_DIR.');
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
  const monitorLog = readFile(path.join(reportDir, 'monitor.log'));

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(options.reportName)} - load profile unavailable</title>
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
    <h1>${escapeHtml(options.reportName)}</h1>
    <div class="warning">
      <strong>System load profile was not generated before Jenkins publishing.</strong>
      <p>The monitor was interrupted or did not flush <code>${escapeHtml(options.reportFile || DEFAULT_REPORT_FILE)}</code>
      before Jenkins reached the publishing step. Jenkins generated this fallback so failed runs still expose a
      System Load artifact.</p>
    </div>
    <div class="meta">
      <p><strong>Generated:</strong> ${escapeHtml(generatedAt)}</p>
      <p><strong>Report directory:</strong> <code>${escapeHtml(reportDir)}</code></p>
    </div>
    <h2>Files present in report directory</h2>
    <pre>${escapeHtml(reportFiles.length ? reportFiles.join('\n') : 'No files were present.')}</pre>
    <h2>Monitor log</h2>
    <pre>${escapeHtml(monitorLog || 'No monitor.log was present.')}</pre>
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

function readFile(filePath) {
  try {
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  } catch {
    return '';
  }
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
    const result = ensureLoadProfileReport(parseArgs(process.argv.slice(2)));
    if (result.created) {
      console.warn(`ensure-load-profile-report: created fallback report at ${result.reportPath}`);
    } else {
      console.log(`ensure-load-profile-report: report exists at ${result.reportPath}`);
    }
  } catch (error) {
    console.error(`ensure-load-profile-report: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  buildFallbackReportHtml,
  ensureLoadProfileReport,
  parseArgs,
};
