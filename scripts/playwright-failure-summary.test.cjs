'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { spawnSync } = require('node:child_process');
const { summarize } = require('./playwright-failure-summary.cjs');

function workspace(t) {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'pw-summary-')));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}
function report(root, name, tests, errors = []) {
  fs.writeFileSync(path.join(root, name), JSON.stringify({ suites: [{ specs: [{ tests }] }], errors }));
  return name;
}
function result(status, attachments = [], message = 'expect(value).toBe(expected)') {
  return { status, attachments, errors: [{ message }] };
}
function execution(status, results, expectedStatus = 'passed') {
  return { status, results, expectedStatus, title: 'SECRET <!channel> case 123' };
}
function evidence(data, name = 'failure-data.json') {
  return { name, body: Buffer.from(JSON.stringify(data)).toString('base64') };
}

test('final outcomes count executions, not attempts; expected failures and skips excluded', (t) => {
  const root = workspace(t);
  const file = report(root, 'report.json', [
    execution('unexpected', [result('failed'), result('failed')]),
    execution('flaky', [result('failed'), result('passed')]),
    execution('expected', [result('failed')], 'failed'),
    execution('skipped', [result('skipped')], 'skipped'),
  ]);
  const text = summarize([['E2E', file]], root);
  assert.match(text, /E2E: 1 failed, 1 passed on retry/);
  assert.match(text, /1: assertion failed; cause unconfirmed/);
  assert.doesNotMatch(text, /SECRET|channel|123/);
  report(root, file, [execution('flaky', [result('failed'), result('passed')])]);
  assert.equal(summarize([['E2E', file]], root), '');
});

test('only final attempt request evidence names allowlisted direct E2E services', (t) => {
  const root = workspace(t);
  const ccd = evidence({
    apiErrors: [
      { url: 'http://ccd-data-store-api-aat.service.core-compute-aat.internal/cases/SECRET?token=private', status: 503 },
    ],
  });
  const idam = evidence({ apiErrors: [{ url: 'https://idam-api.platform.hmcts.net/private', status: 500 }] });
  const file = report(root, 'report.json', [execution('unexpected', [result('failed', [idam]), result('failed', [ccd])])]);
  const text = summarize([['E2E', file]], root);
  assert.match(text, /CCD: HTTP 503 observed; cause unconfirmed/);
  assert.doesNotMatch(text, /IDAM|SECRET|token|private|http:/);
  for (const label of ['API', 'Integration']) {
    const mocked = summarize([[label, file]], root);
    assert.doesNotMatch(mocked, /CCD/);
    assert.match(mocked, /may include mocked responses/);
  }
});

test('proxy routes, hostile hosts and diagnosis text cannot supply service attribution', (t) => {
  const root = workspace(t);
  const file = report(root, 'report.json', [
    execution('unexpected', [
      result(
        'failed',
        [
          evidence({
            failureType: 'DOWNSTREAM_API_5XX',
            likelyRootCause: 'CCD <!channel> SECRET',
            apiErrors: [
              { url: 'https://manage-case.aat.platform.hmcts.net/ccd-data-store-api', status: 503 },
              { url: 'https://idam-api.platform.hmcts.net.evil.test/token', status: 503 },
            ],
          }),
        ],
        'CCD is down SECRET'
      ),
    ]),
  ]);
  const text = summarize([['E2E', file]], root);
  assert.match(text, /HTTP 503 observed/);
  assert.doesNotMatch(text, /CCD|IDAM|SECRET|channel|evil/);
});

test('API call logs are observed symptoms and transport errors remain qualified', (t) => {
  const root = workspace(t);
  const api = report(root, 'api.json', [
    execution('unexpected', [
      result('failed', [evidence([{ url: 'https://idam-api.platform.hmcts.net', status: 503 }], 'node-api-calls.json')]),
    ]),
  ]);
  const e2e = report(root, 'e2e.json', [
    execution('unexpected', [
      result('timedOut', [
        evidence({ failedRequests: [{ url: 'https://idam-api.platform.hmcts.net', errorText: 'ETIMEDOUT SECRET' }] }),
      ]),
    ]),
  ]);
  const text = summarize(
    [
      ['API', api],
      ['E2E', e2e],
    ],
    root
  );
  assert.match(text, /API: 1 failed\n- 1: HTTP 503 observed/);
  assert.match(text, /IDAM: request timeout observed; cause unconfirmed/);
  assert.doesNotMatch(text, /SECRET/);
});

test('runner errors, interrupted executions, not-run tests and unexpected passes remain honest', (t) => {
  const root = workspace(t);
  const file = report(
    root,
    'report.json',
    [
      execution('unexpected', [result('interrupted')]),
      execution('skipped', []),
      execution('unexpected', [result('passed')], 'failed'),
    ],
    [{ message: 'SECRET' }]
  );
  const text = summarize([['E2E', file]], root);
  assert.match(text, /1 failed, 1 interrupted, 1 not run, 1 runner error/);
  assert.match(text, /unexpected pass \(expected failure\)/);
  assert.doesNotMatch(text, /SECRET/);
});

test('missing, malformed, empty, oversized and external reports never look successful', (t) => {
  const root = workspace(t);
  fs.writeFileSync(path.join(root, 'broken.json'), '{');
  fs.writeFileSync(path.join(root, 'large.json'), ' '.repeat(20 * 1024 * 1024 + 1));
  fs.writeFileSync(path.join(root, 'shape.json'), '{}');
  for (const file of ['missing.json', 'broken.json', 'large.json', 'shape.json', '../outside.json']) {
    assert.match(summarize([['API', file]], root), /report unavailable or invalid/);
  }
  assert.match(summarize([['API', report(root, 'empty.json', [])]], root), /no test results/);
  for (const invalid of [execution('expected', []), execution('expected', [result('unknown')])]) {
    assert.match(summarize([['API', report(root, 'invalid-result.json', [invalid])]], root), /report unavailable or invalid/);
  }
});

test('attachment traversal and symlinks are ignored; safe local attachments work', (t) => {
  const root = workspace(t);
  const diagnostic = path.join(root, 'diagnostic.json');
  fs.writeFileSync(diagnostic, JSON.stringify({ apiErrors: [{ url: 'https://idam-api.platform.hmcts.net', status: 503 }] }));
  fs.symlinkSync(diagnostic, path.join(root, 'link.json'));
  const file = report(root, 'report.json', [
    execution('unexpected', [result('failed', [{ name: 'failure-data.json', path: diagnostic }])]),
  ]);
  assert.match(summarize([['E2E', file]], root), /IDAM/);
  for (const unsafe of ['link.json', '../diagnostic.json']) {
    report(root, file, [execution('unexpected', [result('failed', [{ name: 'failure-data.json', path: unsafe }])])]);
    assert.doesNotMatch(summarize([['E2E', file]], root), /IDAM/);
  }
  fs.symlinkSync(path.join(root, file), path.join(root, 'report-link.json'));
  assert.match(summarize([['E2E', 'report-link.json']], root), /report unavailable or invalid/);
});

test('matrix runs remain labelled, output bounded and CLI contract matches module', (t) => {
  const root = workspace(t);
  const file = report(root, 'report.json', [execution('unexpected', [result('timedOut')])]);
  const text = summarize(
    [
      ['Integration', file],
      ['Integration', file],
    ],
    root
  );
  assert.match(text, /Integration run 1: 1 failed/);
  assert.match(text, /Integration run 2: 1 failed/);
  assert.ok(
    summarize(
      Array.from({ length: 24 }, () => ['Integration', file]),
      root
    ).length <= 2801
  );
  assert.match(summarize([['<!channel>', file]], root), /invalid suite configuration/);
  const cli = spawnSync(process.execPath, [path.join(__dirname, 'playwright-failure-summary.cjs'), '--suite', 'API', file], {
    cwd: root,
    encoding: 'utf8',
  });
  assert.equal(cli.status, 0);
  assert.equal(cli.stdout, summarize([['API', file]], root));
});

test('real Playwright JSON preserves failures and flakes and becomes silent after correction', (t) => {
  const root = workspace(t);
  const playwright = require.resolve('@playwright/test');
  const cli = require.resolve('@playwright/test/cli');
  fs.writeFileSync(
    path.join(root, 'playwright.config.cjs'),
    `module.exports = { testDir: '.', workers: 1, retries: 1, reporter: [['json', { outputFile: 'report.json' }]] };`
  );
  const spec = path.join(root, 'summary.spec.cjs');
  const fixture = (broken) => `
    const { test, expect } = require(${JSON.stringify(playwright)});
    test('synthetic final failure SECRET', async ({}, info) => {
      await info.attach('failure-data.json', { body: JSON.stringify({ apiErrors: [{ url: 'https://idam-api.platform.hmcts.net/private', status: 503 }] }), contentType: 'application/json' });
      expect(${broken}).toBe(false);
    });
    test('synthetic flake', async ({}, info) => { expect(info.retry).toBe(1); });
    test('expected failure', async () => { test.fail(); expect(true).toBe(false); });
    test('flaky expected failure', async ({}, info) => { test.fail(); expect(info.retry).toBe(0); });
    test.skip('intentional skip', async () => {});
  `;
  const run = () =>
    spawnSync(process.execPath, [cli, 'test', '--config=playwright.config.cjs'], {
      cwd: root,
      encoding: 'utf8',
      timeout: 60_000,
      env: { ...process.env, CI: '1' },
    });
  fs.writeFileSync(spec, fixture(true));
  const failed = run();
  assert.equal(failed.status, 1, failed.stderr);
  const text = summarize([['E2E', 'report.json']], root);
  assert.match(text, /E2E: 1 failed, 1 passed on retry/);
  assert.match(text, /1 expected outcome on retry/);
  assert.doesNotMatch(text, /2 passed on retry/);
  assert.match(text, /IDAM: HTTP 503 observed; cause unconfirmed/);
  assert.doesNotMatch(text, /SECRET|private/);
  fs.writeFileSync(spec, fixture(false));
  const fixed = run();
  assert.equal(fixed.status, 0, fixed.stderr);
  assert.equal(summarize([['E2E', 'report.json']], root), '');
});

test('API status-zero transport errors use the installed error field without leaking raw messages', (t) => {
  const root = workspace(t);
  for (const [error, expected] of [
    ['connect ECONNREFUSED private-service SECRET', 'connection refused'],
    ['request timed out token=SECRET', 'request timeout'],
    ['unexpected SECRET <!channel>', 'request failed'],
  ]) {
    const file = report(root, 'api.json', [
      execution('unexpected', [
        result('failed', [
          evidence([{ status: 0, error, url: 'https://idam-api.platform.hmcts.net/private' }], 'node-api-calls.json'),
        ]),
      ]),
    ]);
    const text = summarize([['API', file]], root);
    assert.ok(text.includes(`${expected} observed; cause unconfirmed (may include mocked responses)`));
    assert.doesNotMatch(text, /SECRET|channel|private|IDAM/);
  }
});

test('exact CCD case creation producer identifies the operation without claiming a service outage', (t) => {
  const root = workspace(t);
  const message =
    "Direct CCD case create failed with HTTP 504 for 'SECRET-scenario'. Route='POST /data/caseworkers/:uid/jurisdictions/:jurisdiction/case-types/:caseType/cases?ignore-warning=false'. The gateway did not provide a usable CCD API response.";
  const proxy = evidence({ apiErrors: [{ url: 'https://manage-case.aat.platform.hmcts.net/data/cases', status: 504 }] });
  for (const prefix of ['', 'Error: ']) {
    const file = report(root, 'report.json', [execution('unexpected', [result('failed', [proxy], prefix + message)])]);
    const text = summarize([['E2E', file]], root);
    assert.match(text, /CCD case creation reported HTTP 504; cause unconfirmed/);
    assert.doesNotMatch(text, /SECRET|scenario|Route|gateway|outage/);
    for (const label of ['API', 'Integration']) {
      assert.doesNotMatch(summarize([[label, file]], root), /CCD case creation/);
    }
  }
  for (const nearMatch of [
    'Test title: ' + message,
    'Some other error\n' + message,
    message.replace('HTTP 504', 'HTTP 5040'),
    message.replace('HTTP 504', 'HTTP 604'),
    message.replace('case create', 'case validate'),
    message.replace("for 'SECRET-scenario'. ", 'for arbitrary text '),
  ]) {
    const file = report(root, 'report.json', [execution('unexpected', [result('failed', [], nearMatch)])]);
    assert.doesNotMatch(summarize([['E2E', file]], root), /CCD case creation/);
  }
  const stackOnly = result('failed', [], 'unrelated error');
  stackOnly.errors[0].stack = message;
  assert.doesNotMatch(
    summarize([['E2E', report(root, 'stack.json', [execution('unexpected', [stackOnly])])]], root),
    /CCD case creation/
  );
});

test('known environment-qualified public service hosts are attributed without matching unknown hosts', (t) => {
  const root = workspace(t);
  for (const [host, service] of [
    ['idam-api.aat.platform.hmcts.net', 'IDAM'],
    ['rd-professional-api.demo.platform.hmcts.net', 'PRD'],
    ['ccd-data-store-api.aat.platform.hmcts.net', 'CCD'],
    ['wa-task-management-api.perftest.platform.hmcts.net', 'Work Allocation'],
  ]) {
    const file = report(root, 'report.json', [
      execution('unexpected', [result('failed', [evidence({ apiErrors: [{ url: `https://${host}/SECRET`, status: 503 }] })])]),
    ]);
    assert.ok(summarize([['E2E', file]], root).includes(`${service}: HTTP 503 observed`));
  }
  for (const host of [
    'idam-api.aat.platform.hmcts.net.evil.test',
    'idam-api.unknown.platform.hmcts.net',
    'unknown-api.aat.platform.hmcts.net',
    'idam-apiXaat.platform.hmcts.net',
  ]) {
    const file = report(root, 'report.json', [
      execution('unexpected', [result('failed', [evidence({ apiErrors: [{ url: `https://${host}/SECRET`, status: 503 }] })])]),
    ]);
    const text = summarize([['E2E', file]], root);
    assert.match(text, /HTTP 503 observed/);
    assert.doesNotMatch(text, /IDAM|CCD|PRD|Work Allocation|SECRET/);
  }
});
