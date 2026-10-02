#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const LABELS = new Set(['API', 'E2E', 'Integration']);
const MAX_REPORT_BYTES = 20 * 1024 * 1024;
const MAX_ATTACHMENT_BYTES = 1024 * 1024;
const MAX_MESSAGE_LENGTH = 2800;
const SERVICES = {
  'ccd-data-store-api': 'CCD',
  'idam-api': 'IDAM',
  'rd-professional-api': 'PRD',
  'wa-task-management-api': 'Work Allocation',
};

function readJson(file, root, limit) {
  const base = fs.realpathSync(root);
  const relative = path.relative(path.resolve(root), path.resolve(root, file));
  if (relative.startsWith(`..${path.sep}`) || relative === '..' || path.isAbsolute(relative)) throw new Error('path');
  const resolved = path.join(base, relative);
  if (fs.realpathSync(resolved) !== resolved) throw new Error('symlink');
  const stat = fs.statSync(resolved);
  if (!stat.isFile() || stat.size > limit) throw new Error('size');
  return JSON.parse(fs.readFileSync(resolved, 'utf8'));
}

function attachmentData(attachment, root) {
  if (typeof attachment.body === 'string') {
    if (attachment.body.length > MAX_ATTACHMENT_BYTES * 1.4) throw new Error('size');
    return JSON.parse(Buffer.from(attachment.body, 'base64').toString('utf8'));
  }
  if (typeof attachment.path === 'string') return readJson(attachment.path, root, MAX_ATTACHMENT_BYTES);
  throw new Error('attachment');
}

function serviceName(url) {
  try {
    const host = new URL(url).hostname;
    for (const [prefix, name] of Object.entries(SERVICES)) {
      if (
        host === `${prefix}.platform.hmcts.net` ||
        new RegExp(`^${prefix}\\.(aat|demo|ithc|perftest|prod)\\.platform\\.hmcts\\.net$`).test(host) ||
        new RegExp(`^${prefix}-(aat|demo|ithc|perftest|prod)\\.service\\.core-compute-\\1\\.internal$`).test(host)
      )
        return name;
    }
  } catch {
    // Only known direct service hosts can supply a display name.
  }
  return undefined;
}

function problem(result, label, root) {
  const errors = result.errors || (result.error ? [result.error] : []);
  if (label === 'E2E') {
    // This producer describes a gateway operation, not a confirmed downstream outage.
    for (const error of errors) {
      const operation = /^(?:Error: )?Direct CCD case create failed with HTTP ([45]\d{2}) for '[^'\r\n]+'\. /.exec(
        error.message || ''
      );
      if (operation) return `CCD case creation reported HTTP ${operation[1]}; cause unconfirmed`;
    }
  }
  const observations = new Set();
  for (const attachment of result.attachments || []) {
    if (!['failure-data.json', 'node-api-calls.json'].includes(attachment.name)) continue;
    try {
      const data = attachmentData(attachment, root);
      const requests =
        attachment.name === 'node-api-calls.json' ? data : [...(data.apiErrors || []), ...(data.failedRequests || [])];
      for (const request of requests) {
        let outcome;
        const transportError = typeof request.errorText === 'string' ? request.errorText : request.error;
        if (Number.isInteger(request.status) && request.status >= 400 && request.status <= 599) {
          outcome = `HTTP ${request.status}`;
        } else if (typeof transportError === 'string') {
          if (/ERR_CONNECTION_REFUSED|ECONNREFUSED/.test(transportError)) outcome = 'connection refused';
          else if (/ERR_TIMED_OUT|ETIMEDOUT|timed out|timeout/i.test(transportError)) outcome = 'request timeout';
          else outcome = 'request failed';
        }
        if (!outcome) continue;
        const service = label === 'E2E' ? serviceName(request.url) : undefined;
        observations.add(`${service ? `${service}: ` : ''}${outcome}`);
      }
    } catch {
      // A missing diagnostic must not hide the final test failure.
    }
  }
  if (observations.size) {
    const details = [...observations].sort().slice(0, 3).join(', ');
    return `${details} observed${observations.size > 3 ? ', further request errors' : ''}; cause unconfirmed${label !== 'E2E' ? ' (may include mocked responses)' : ''}`;
  }
  if (result.status === 'timedOut') return 'test timed out; cause unconfirmed';
  if (errors.some((error) => /expect\(|AssertionError|Expected:|Received:/.test(error.message || ''))) {
    return 'assertion failed; cause unconfirmed';
  }
  return 'test failed; cause unconfirmed';
}

function suiteSummary(label, file, root) {
  try {
    const report = readJson(file, root, MAX_REPORT_BYTES);
    if (!Array.isArray(report.suites) || !Array.isArray(report.errors)) throw new Error('report');
    const groups = new Map();
    let failed = 0;
    let flaky = 0;
    let expectedOnRetry = 0;
    let interrupted = 0;
    let notRun = 0;
    let tests = 0;
    const pending = [...report.suites];
    while (pending.length) {
      const suite = pending.pop();
      if (!Array.isArray(suite.specs) || (suite.suites !== undefined && !Array.isArray(suite.suites))) throw new Error('suite');
      pending.push(...(suite.suites || []));
      for (const spec of suite.specs) {
        if (!Array.isArray(spec.tests)) throw new Error('tests');
        for (const test of spec.tests) {
          tests++;
          if (!Array.isArray(test.results) || !['expected', 'unexpected', 'flaky', 'skipped'].includes(test.status)) {
            throw new Error('test');
          }
          if (
            test.results.some((result) => !['passed', 'failed', 'timedOut', 'skipped', 'interrupted'].includes(result?.status))
          ) {
            throw new Error('result');
          }
          const final = test.results.at(-1);
          if (!final && ['expected', 'flaky'].includes(test.status)) throw new Error('missing result');
          if (final?.status === 'interrupted') interrupted++;
          else if (test.status === 'flaky') {
            if (final.status === 'passed') flaky++;
            else expectedOnRetry++;
          } else if (test.status === 'unexpected') {
            failed++;
            const description =
              final?.status === 'passed'
                ? 'unexpected pass (expected failure)'
                : final
                  ? problem(final, label, root)
                  : 'result unavailable; cause unconfirmed';
            groups.set(description, (groups.get(description) || 0) + 1);
          } else if (test.status === 'skipped' && test.expectedStatus !== 'skipped') notRun++;
        }
      }
    }
    const issues = [];
    if (failed) issues.push(`${failed} failed`);
    if (interrupted) issues.push(`${interrupted} interrupted`);
    if (notRun) issues.push(`${notRun} not run`);
    if (report.errors.length) issues.push(`${report.errors.length} runner error(s)`);
    if (!tests && !report.errors.length) issues.push('no test results');
    if (flaky) issues.push(`${flaky} passed on retry`);
    if (expectedOnRetry) issues.push(`${expectedOnRetry} expected outcome on retry`);
    const actionable = failed + interrupted + notRun + report.errors.length > 0 || !tests;
    return {
      actionable,
      lines: [issues.join(', ') || 'no final failures', ...[...groups].map(([reason, count]) => `- ${count}: ${reason}`)],
    };
  } catch {
    return { actionable: true, lines: ['report unavailable or invalid; test outcome unconfirmed'] };
  }
}

function summarize(suites, root = process.cwd()) {
  if (!suites.length || suites.length > 24 || suites.some(([label]) => !LABELS.has(label))) {
    return 'Playwright summary unavailable: invalid suite configuration.\n';
  }
  const summaries = suites.map(([label, file]) => ({ label, ...suiteSummary(label, file, root) }));
  if (!summaries.some((suite) => suite.actionable)) return '';
  const lines = ['Playwright test summary'];
  const runs = new Map();
  for (const suite of summaries) {
    const run = (runs.get(suite.label) || 0) + 1;
    runs.set(suite.label, run);
    const label = summaries.filter((item) => item.label === suite.label).length > 1 ? `${suite.label} run ${run}` : suite.label;
    lines.push(`${label}: ${suite.lines[0]}`, ...suite.lines.slice(1));
  }
  const text = lines.join('\n');
  const suffix = '\nFurther details omitted; see test reports.';
  return `${text.length > MAX_MESSAGE_LENGTH ? text.slice(0, MAX_MESSAGE_LENGTH - suffix.length) + suffix : text}\n`;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const suites = [];
  for (let i = 0; i < args.length; i += 3) {
    if (args[i] !== '--suite' || !args[i + 2]) {
      suites.length = 0;
      break;
    }
    suites.push([args[i + 1], args[i + 2]]);
  }
  process.stdout.write(summarize(suites));
}

module.exports = { summarize };
