#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { createHash } = require('node:crypto');

function checkCriticalScenarios(report, required, invocation) {
  if (
    !Number.isFinite(invocation.startedAt) ||
    !Number.isFinite(invocation.finishedAt) ||
    invocation.startedAt > invocation.finishedAt ||
    !Number.isInteger(invocation.exitCode) ||
    typeof invocation.repositoryRoot !== 'string'
  )
    throw new Error('Invalid invocation provenance');
  const started = Date.parse(report.stats?.startTime);
  const duration = report.stats?.duration;
  if (
    !Array.isArray(report.suites) ||
    !Array.isArray(report.errors) ||
    typeof report.config?.rootDir !== 'string' ||
    !Number.isFinite(started) ||
    !Number.isFinite(duration) ||
    duration < 0
  )
    throw new Error('Invalid Playwright JSON report');
  if (started < invocation.startedAt || started + duration > invocation.finishedAt) {
    throw new Error('Report does not belong to this invocation');
  }
  if (
    !Array.isArray(required) ||
    !required.length ||
    required.some((item) => !['project', 'spec', 'title'].every((key) => typeof item?.[key] === 'string' && item[key].trim()))
  )
    throw new Error('Required scenarios must be a nonempty list of project/spec/title identities');

  const key = ({ project, spec, title }) => JSON.stringify([project, spec, title]);
  if (new Set(required.map(key)).size !== required.length) throw new Error('Duplicate required scenario');
  const tests = new Map();
  const pending = report.suites.map((suite) => ({ suite, titles: [] }));
  while (pending.length) {
    const { suite, titles } = pending.pop();
    if (!Array.isArray(suite.specs) || (suite.suites !== undefined && !Array.isArray(suite.suites))) {
      throw new Error('Invalid report suite');
    }
    pending.push(...(suite.suites ?? []).map((child) => ({ suite: child, titles: [...titles, child.title] })));
    for (const spec of suite.specs) {
      if (typeof spec.file !== 'string' || typeof spec.title !== 'string' || !Array.isArray(spec.tests)) {
        throw new Error('Invalid report spec');
      }
      const file = path
        .relative(invocation.repositoryRoot, path.resolve(report.config.rootDir, spec.file))
        .split(path.sep)
        .join('/');
      for (const test of spec.tests) {
        const id = key({ project: test.projectName, spec: file, title: [...titles, spec.title].join(' › ') });
        const matches = tests.get(id) ?? [];
        matches.push(test);
        tests.set(id, matches);
      }
    }
  }

  const scenarios = required.map((identity) => {
    const matches = tests.get(key(identity)) ?? [];
    if (matches.length !== 1) return { ...identity, status: matches.length ? 'ambiguous' : 'absent', attempts: [] };
    const test = matches[0];
    if (
      !Array.isArray(test.results) ||
      test.results.some(
        (result) =>
          !['passed', 'failed', 'timedOut', 'skipped', 'interrupted'].includes(result.status) ||
          !Number.isInteger(result.retry) ||
          result.retry < 0
      )
    )
      throw new Error('Invalid report attempts');
    const attempts = test.results.map(({ status, retry }) => ({ status, retry }));
    const final = attempts.at(-1);
    let status = 'failed';
    if (test.expectedStatus !== 'passed') status = 'expected-failure-or-skip';
    else if (!final) status = 'not-run';
    else if (attempts.some((attempt) => ['skipped', 'interrupted'].includes(attempt.status))) status = 'skipped-or-interrupted';
    else if (final.status === 'passed' && ['expected', 'flaky'].includes(test.status)) {
      status = attempts.length > 1 || final.retry > 0 || test.status === 'flaky' ? 'passed-on-retry' : 'passed';
    }
    return { ...identity, status, attempts };
  });
  return {
    passed:
      invocation.exitCode === 0 &&
      report.errors.length === 0 &&
      scenarios.every(({ status }) => ['passed', 'passed-on-retry'].includes(status)),
    runnerExitCode: invocation.exitCode,
    runnerErrors: report.errors.length,
    scenarios,
  };
}

function runCriticalScenarioReceipt(reportFile, manifestFile, lane, command) {
  const reportPath = path.resolve(reportFile);
  if (fs.existsSync(reportPath)) throw new Error('Refusing an existing report; use a fresh invocation path');
  const required = JSON.parse(fs.readFileSync(manifestFile, 'utf8'))[lane];
  if (!Array.isArray(required) || !required.length || !command.length)
    throw new Error('A nonempty manifest lane and runner command are required');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  const startedAt = Date.now();
  const result = spawnSync(command[0], command.slice(1), {
    stdio: 'inherit',
    shell: false,
    env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT: reportPath, PLAYWRIGHT_JSON_OUTPUT_FILE: reportPath },
  });
  const invocation = { startedAt, finishedAt: Date.now(), repositoryRoot: process.cwd(), exitCode: result.status ?? 1 };
  if (result.error) throw result.error;
  const reportBytes = fs.readFileSync(reportPath);
  const receipt = {
    lane,
    command,
    invocation,
    reportSha256: createHash('sha256').update(reportBytes).digest('hex'),
    ...checkCriticalScenarios(JSON.parse(reportBytes.toString('utf8')), required, invocation),
  };
  fs.writeFileSync(`${reportPath}.receipt.json`, `${JSON.stringify(receipt, null, 2)}\n`);
  return receipt;
}

if (require.main === module) {
  const [reportFile, manifestFile, lane, separator, ...command] = process.argv.slice(2);
  try {
    if (!reportFile || !manifestFile || !lane || separator !== '--') {
      throw new Error(
        'Usage: critical-scenario-receipt.cjs REPORT MANIFEST LANE -- RUNNER [ARGS including --reporter=list,json]'
      );
    }
    const receipt = runCriticalScenarioReceipt(reportFile, manifestFile, lane, command);
    process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
    process.exitCode = receipt.runnerExitCode || (receipt.passed ? 0 : 1);
  } catch (error) {
    process.stderr.write(`Critical-scenario receipt failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = { checkCriticalScenarios, runCriticalScenarioReceipt };
