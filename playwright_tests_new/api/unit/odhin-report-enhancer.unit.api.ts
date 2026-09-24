import { expect, test } from '@playwright/test';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const enhancerModule = require('../../common/reporters/odhin-report-enhancer.cjs');
const { parse } = require('node-html-parser');

const createEmptyFeatureStat = enhancerModule.createEmptyFeatureStat as (name: string) => {
  name: string;
  totalTests: number;
  durationMs: number;
  passed: number;
  failed: number;
  timedOut: number;
  skipped: number;
  interrupted: number;
  flaky: number;
};
const deriveFeatureName = enhancerModule.deriveFeatureName as (
  filePath: string,
  annotations?: Array<{ type: string; description?: string }>
) => string;

const enhancerTest = enhancerModule.__test__ as {
  enhanceDashboardHtml: (
    html: string,
    featureStats: unknown,
    evidenceEntries?: unknown,
    perfettoFiles?: string[],
    perfettoHrefPrefix?: string,
    testMetadata?: unknown[]
  ) => string;
  formatDuration: (durationMs: number) => string;
  buildFeatureOverviewBlock: (featureStats: unknown) => string;
  buildAccessibilityEvidenceBlock: (entries: unknown) => string;
  buildIssueSummaryBlock: (entries: unknown) => string;
  defaultTestListRowsPerPage: (html: string) => string;
  normalizeFeatureStats: (featureStats: unknown) => Array<{
    name: string;
    totalTests: number;
    durationMs: number;
    passed: number;
    failed: number;
    timedOut: number;
    skipped: number;
    interrupted: number;
    flaky: number;
  }>;
  normalizeEvidenceEntries: (entries: unknown) => Array<{
    testTitle: string;
    htmlFileName: string;
    jsonFileName: string;
    screenshotFileName: string;
    reportFileName: string;
    violationCount: number;
    status: string;
    summary: string;
    rules: string[];
    targets: string[];
  }>;
  readAccessibilityEvidenceEntries: (outputFolder: string) => unknown[];
  enhanceGeneratedReport: (outputFolder: string, featureStats: unknown) => void;
};

test.describe('odhin report enhancer', { tag: '@svc-internal' }, () => {
  test('matches metadata by retry target and preserves report panels when enhanced twice', () => {
    const html = `<html><head><meta name="viewport" content="width=1200"></head><body>
      <div class="tab"><button class="main-tablinks" onclick="openMainTab(event, 'TabCoverage')">Coverage</button></div>
      <div id="TabCoverage"><a href="coverage/index.html">Open coverage report</a></div>
      <div id="TabRunInfo">RPX XUI Webapp | aat | workers=4 | branch=feature/report</div>
      <div id="TabLoadProfile"><a href="load-profile/load-profile.html">Load profile</a></div>
      <table id="test-list-table"><thead><tr><th>Title</th><th>Status</th><th>Duration</th></tr></thead>
      <tbody><tr data-bs-target="#test-1"><td>Shared title</td><td>passed</td><td>1s</td></tr>
      <tr data-bs-target="#test-0"><td>Shared title</td><td>failed</td><td>2s</td></tr></tbody>
      <tfoot><tr><th>Title</th><th>Status</th><th>Duration</th></tr></tfoot></table>
      <div id="test-0"><a href="attachments/trace.zip">Trace</a></div></body></html>`;
    const metadata = [
      {
        target: '#test-0',
        feature: '<img src=x onerror=alert(1)>',
        tags: ['@a&b', '<script>bad()</script>'],
        retry: 0,
        durationMs: 2000,
      },
      { target: '#test-1', feature: 'hearings', tags: ['@integration'], retry: 1, durationMs: 1000 },
    ];
    const once = enhancerTest.enhanceDashboardHtml(html, [], [], ['perfetto.json'], '../test-results', metadata);
    const twice = enhancerTest.enhanceDashboardHtml(once, [], [], ['perfetto.json'], '../test-results', metadata);
    const root = parse(twice);
    const rows = root.querySelectorAll('#test-list-table tbody tr');
    expect(rows[0].querySelectorAll('[data-report-metadata]').map((cell: { text: string }) => cell.text)).toEqual([
      'hearings',
      '@integration',
      '2',
    ]);
    expect(rows[1].getAttribute('data-duration-ms')).toBe('2000');
    expect(rows[1].querySelector('img, script')).toBeNull();
    expect(twice).toContain('&lt;script&gt;bad()&lt;/script&gt;');
    expect(root.querySelectorAll('#webapp-report-theme')).toHaveLength(1);
    expect(root.querySelectorAll('#webapp-report-ui')).toHaveLength(1);
    expect(root.querySelectorAll('#test-list-table thead th')).toHaveLength(6);
    expect(root.querySelectorAll('#test-list-table tfoot th')).toHaveLength(6);
    expect(root.querySelectorAll('#TabPerfetto')).toHaveLength(1);
    expect(root.querySelector('#TabPerfetto a').getAttribute('href')).toBe('../test-results/perfetto.json');
    expect(root.querySelector('#TabCoverage a').getAttribute('href')).toBe('coverage/index.html');
    expect(root.querySelector('#TabLoadProfile a').getAttribute('href')).toBe('load-profile/load-profile.html');
    expect(root.querySelector('#test-0 a').getAttribute('href')).toBe('attachments/trace.zip');
    expect(root.querySelector('#TabRunInfo').text).toContain('RPX XUI Webapp | aat | workers=4 | branch=feature/report');
    expect(root.querySelector('meta[name="viewport"]').getAttribute('content')).toBe('width=device-width, initial-scale=1');
  });

  test('derives feature names from Playwright file paths', () => {
    expect(
      deriveFeatureName(
        '/opt/jenkins/workspace/PR/playwright_tests_new/integration/test/caseFileView/caseFileView.positive.spec.ts'
      )
    ).toBe('caseFileView');
    expect(
      deriveFeatureName(
        '/opt/jenkins/workspace/PR/playwright_tests_new/integration/test/hearings/hearingDetails.cr84.positive.spec.ts'
      )
    ).toBe('hearings');
  });

  test('uses declared product features without guessing accessibility titles or changing other suites', () => {
    const file = '/tmp/playwright_tests_new/E2E/test/accessibility/webapp.a11y.spec.ts';
    expect(deriveFeatureName(file, [{ type: 'feature', description: 'Case details' }])).toBe('Case details');
    expect(deriveFeatureName(file, [{ type: 'page-state', description: 'Overview' }])).toBe('Unattributed accessibility');
    expect(
      deriveFeatureName(file, [
        { type: 'feature', description: 'One' },
        { type: 'feature', description: 'Two' },
      ])
    ).toBe('Unattributed accessibility');
    expect(deriveFeatureName('/tmp/playwright_tests_new/integration/test/hearings/example.spec.ts')).toBe('hearings');
  });

  test('attributes skipped and timed-out accessibility executions without evidence and preserves retry totals', async () => {
    const Reporter = require('../../common/reporters/odhin-adaptive.reporter.cjs');
    const reporter = new Reporter({ createInnerReporter: () => ({ onTestEnd() {} }), lightweight: true });
    const testCase = {
      id: 'case-details',
      retries: 1,
      tags: ['@a11y'],
      location: { file: '/tmp/playwright_tests_new/E2E/test/accessibility/webapp.a11y.spec.ts' },
      annotations: [
        { type: 'feature', description: 'Case details' },
        { type: 'page-state', description: 'Overview' },
      ],
    };
    await reporter.onTestEnd(testCase, { status: 'failed', retry: 0, duration: 100 });
    await reporter.onTestEnd(testCase, { status: 'passed', retry: 1, duration: 200 });
    await reporter.onTestEnd({ ...testCase, id: 'skipped' }, { status: 'skipped', retry: 0, duration: 0 });
    await reporter.onTestEnd(
      { ...testCase, id: 'timeout', retries: 0, annotations: [{ type: 'feature', description: 'Hearings' }] },
      { status: 'timedOut', retry: 0, duration: 300 }
    );
    expect(reporter.featureStats.get('Case details')).toMatchObject({
      totalTests: 2,
      flaky: 1,
      skipped: 1,
      failed: 0,
      durationMs: 200,
    });
    expect(reporter.featureStats.get('Hearings')).toMatchObject({ totalTests: 1, timedOut: 1, durationMs: 300 });
    expect(reporter.testMetadata.map((item: { feature: string }) => item.feature)).toEqual([
      'Case details',
      'Case details',
      'Case details',
      'Hearings',
    ]);
    expect(enhancerTest.normalizeFeatureStats(reporter.featureStats).reduce((sum, stat) => sum + stat.totalTests, 0)).toBe(3);
  });

  for (const resultsLocation of ['test-results', '../test-results', '../../test-results']) {
    test(`publishes same-origin Perfetto copies from ${resultsLocation} under Jenkins`, () => {
      const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'odhin-perfetto-publication-'));
      const reportFolder = path.join(temporaryRoot, 'odhin-report', 'preview-workers-7');
      const resultsFolder = path.resolve(reportFolder, resultsLocation);
      const reportFile = path.join(reportFolder, 'xui-playwright-integration.html');
      const originalBuildUrl = process.env.BUILD_URL;
      const originalArtifactUrl = process.env.PLAYWRIGHT_PERFETTO_ARTIFACT_BASE_URL;
      const timelines = new Map([
        ['perfetto.json', Buffer.from('{"traceEvents":[]}\n')],
        ['perfetto-worker #1&2.json', Buffer.from('{"traceEvents":[{"name":"worker one"}]}\n')],
      ]);
      fs.mkdirSync(reportFolder, { recursive: true });
      fs.mkdirSync(resultsFolder, { recursive: true });
      fs.writeFileSync(reportFile, '<html><head></head><body><div class="tab"></div></body></html>');
      timelines.forEach((bytes, name) => fs.writeFileSync(path.join(resultsFolder, name), bytes));
      process.env.BUILD_URL = 'https://build.hmcts.net/job/example/12/';
      process.env.PLAYWRIGHT_PERFETTO_ARTIFACT_BASE_URL = 'https://build.hmcts.net/job/other/99/';
      try {
        enhancerModule.enhanceGeneratedReport(reportFolder, []);
        enhancerModule.enhanceGeneratedReport(reportFolder, []);
        const report = parse(fs.readFileSync(reportFile, 'utf8'));
        const downloads = report.querySelectorAll('#TabPerfetto a[download]');
        expect(report.querySelectorAll('#TabPerfetto')).toHaveLength(1);
        expect(downloads).toHaveLength(timelines.size);
        for (const link of downloads) {
          const name = link.getAttribute('download');
          expect(link.getAttribute('href')).toBe(`perfetto/${encodeURIComponent(name)}`);
          const hostedUrl = new URL(
            link.getAttribute('href'),
            'https://static-build.hmcts.net/resource/report/xui-playwright-integration.html'
          );
          expect(hostedUrl.origin).toBe('https://static-build.hmcts.net');
          expect(fs.readFileSync(path.join(reportFolder, 'perfetto', name))).toEqual(timelines.get(name));
          expect(fs.readFileSync(path.join(resultsFolder, name))).toEqual(timelines.get(name));
        }
      } finally {
        if (originalBuildUrl === undefined) delete process.env.BUILD_URL;
        else process.env.BUILD_URL = originalBuildUrl;
        if (originalArtifactUrl === undefined) delete process.env.PLAYWRIGHT_PERFETTO_ARTIFACT_BASE_URL;
        else process.env.PLAYWRIGHT_PERFETTO_ARTIFACT_BASE_URL = originalArtifactUrl;
        fs.rmSync(temporaryRoot, { recursive: true, force: true });
      }
    });
  }

  test('normalizes and sorts grouped feature stats', () => {
    const stats = enhancerTest.normalizeFeatureStats([
      { name: 'caseLinking', totalTests: 4, durationMs: 1500, passed: 4 },
      { name: 'caseFileView', totalTests: 9, durationMs: 3200, passed: 8, failed: 1 },
    ]);

    expect(stats.map((feature) => feature.name)).toEqual(['caseFileView', 'caseLinking']);
    expect(enhancerTest.formatDuration(stats[0].durationMs)).toBe('0h 0m 3s 200ms');
  });

  test('replaces raw file summary blocks with inline grouped feature blocks', () => {
    const baseHtml = `
      <!DOCTYPE html>
      <html>
        <body>
          <div id="TabDashboard">
            <div class="row ms-3 me-3">
              <div class="col-12 col-xl-6">
                <div class="mt-3 mb-3 odhin-thin-border dashboard-block">
                  <div class="info-box-header">Run info</div>
                  <div class="odhin-table">run info body</div>
                </div>
              </div>
              <div class="col-12 col-xl-6">
                <div class="mt-3 mb-3 odhin-thin-border dashboard-block">
                  <div class="info-box-header">Global Summary</div>
                  <div class="odhin-table">status body</div>
                </div>
              </div>
              <div class="col-12 col-xl-6">
                <div class="mt-3 mb-3 odhin-thin-border dashboard-block">
                  <div class="info-box-header">Files Summary</div>
                  <div class="odhin-table">files body</div>
                </div>
              </div>
              <div class="col-12 col-xl-6">
                <div class="mt-3 mb-3 odhin-thin-border dashboard-block">
                  <div class="info-box-header">Status by feature</div>
                  <div class="odhin-table">feature status body</div>
                </div>
              </div>
              <div class="col-12 col-xl-6">
                <div class="mt-3 mb-3 odhin-thin-border dashboard-block">
                  <div class="info-box-header">Projects Summary</div>
                  <div class="odhin-table">projects body</div>
                </div>
              </div>
              <div class="col-12">
                <div class="mt-3 mb-3 odhin-thin-border dashboard-block">
                  <div class="info-box-header">Status by test file</div>
                  <div class="odhin-table">status by file body</div>
                </div>
              </div>
            </div>
          </div>
          <script>
            let ctxStatus = document.getElementById('chart-status').getContext('2d');
            let chartStatus = new Chart(ctxStatus, { data: { labels: ['passed (6)'] } });
            let ctxFile = document.getElementById('chart-file').getContext('2d');
            let chartFile = new Chart(ctxFile, { data: { labels: ['raw file (6)'] } });
            let ctxProject = document.getElementById('chart-project').getContext('2d');
            let chartProject = new Chart(ctxProject, { data: { labels: ['chromium (10)'] } });
          </script>
        </body>
      </html>`;

    const caseFileView = createEmptyFeatureStat('caseFileView');
    caseFileView.totalTests = 6;
    caseFileView.durationMs = 3200;
    caseFileView.passed = 5;
    caseFileView.failed = 1;

    const caseLinking = createEmptyFeatureStat('caseLinking');
    caseLinking.totalTests = 4;
    caseLinking.durationMs = 1800;
    caseLinking.passed = 4;

    const nextHtml = enhancerTest.enhanceDashboardHtml(baseHtml, [caseFileView, caseLinking]);

    expect(nextHtml).toContain('Feature Overview');
    expect(nextHtml).toContain('caseFileView');
    expect(nextHtml).toContain('caseLinking');
    expect(nextHtml).toContain('Largest feature');
    expect(nextHtml).toContain('Features</div>');
    expect(nextHtml).toContain('Execution Time');
    expect(nextHtml).toContain('Passed');
    expect(nextHtml).toContain('Status by test file');
    expect(nextHtml).not.toContain('Status by feature');
    expect(parse(nextHtml).querySelector('.odhin-dashboard-stack')).toBeNull();
    expect(parse(nextHtml).querySelectorAll('#TabDashboard .row > div > .dashboard-block')).toHaveLength(5);
    expect(nextHtml.indexOf('Run info')).toBeLessThan(nextHtml.indexOf('Feature Overview'));
    expect(nextHtml.indexOf('Global Summary')).toBeLessThan(nextHtml.indexOf('Projects Summary'));
    expect(nextHtml).toContain("document.getElementById('chart-project').getContext('2d');");
    expect(nextHtml).toContain("document.getElementById('chart-status').getContext('2d');");
    expect(nextHtml).not.toContain('id="chart-file"');
    expect(nextHtml).not.toContain("document.getElementById('chart-file').getContext('2d');");
  });

  test('renders compact feature summary cards when only one feature is present', () => {
    const baseHtml = `
      <!DOCTYPE html>
      <html>
        <body>
          <div class="dashboard-block">
            <div class="info-box-header">Run info</div>
          </div>
          <div class="dashboard-block">
            <div class="info-box-header">Files Summary</div>
          </div>
          <div class="dashboard-block">
            <div class="info-box-header">Status by test file</div>
          </div>
        </body>
      </html>`;

    const accessRequests = createEmptyFeatureStat('accessRequests');
    accessRequests.totalTests = 21;
    accessRequests.durationMs = 40000;
    accessRequests.passed = 21;

    const nextHtml = enhancerTest.enhanceDashboardHtml(baseHtml, [accessRequests]);

    expect(nextHtml).toContain('Largest feature');
    expect(nextHtml).toContain('Features</div>');
    expect(nextHtml).toContain('Feature Overview');
    expect(nextHtml).toContain('odhin-feature-overview-layout-compact');
    expect(nextHtml).not.toContain('id="chart-file"');
  });

  test('feature overview block keeps feature distribution and outcome columns together', () => {
    const manageTasks = createEmptyFeatureStat('manageTasks');
    manageTasks.totalTests = 76;
    manageTasks.durationMs = 767140;
    manageTasks.passed = 69;
    manageTasks.skipped = 7;

    const html = enhancerTest.buildFeatureOverviewBlock([manageTasks]);

    expect(html).toContain('Feature Overview');
    expect(html).toContain('Largest feature');
    expect(html).toContain('Execution Time');
    expect(html).toContain('Skipped');
    expect(html).toContain('100.00%');
    expect(html).toContain('odhin-feature-overview-layout-compact');
  });

  test('feature overview uses balanced layout for medium feature counts', () => {
    const featureStats = ['manageTasks', 'hearings', 'searchCase', 'accessRequests'].map((name, index) => {
      const stat = createEmptyFeatureStat(name);
      stat.totalTests = 10 - index;
      stat.durationMs = 1000 * (index + 1);
      stat.passed = stat.totalTests;
      return stat;
    });

    const html = enhancerTest.buildFeatureOverviewBlock(featureStats);

    expect(html).toContain('odhin-feature-overview-layout-balanced');
    expect(html).not.toContain('odhin-feature-overview-layout-dense');
  });

  test('defaults generated Odhín test table to 100 visible rows', () => {
    const html = `
      <html>
        <body>
          <table id="test-list-table"></table>
          <script>
            $(document).ready(function(){var table=$("#test-list-table").DataTable({}),filter=$("#status-filter");});
          </script>
        </body>
      </html>`;

    const nextHtml = enhancerTest.defaultTestListRowsPerPage(html);

    expect(nextHtml).toContain('DataTable({pageLength:100,lengthMenu:[10,25,50,100],stateSave:true,stateDuration:-1})');
    expect(nextHtml).not.toContain('DataTable({})');
  });

  test('defaults generated Odhín test table to 100 visible rows when feature stats are empty', () => {
    const html = `
      <html>
        <body>
          <table id="test-list-table"></table>
          <script>
            $(document).ready(function(){var table=$("#test-list-table").DataTable({}),filter=$("#status-filter");});
          </script>
        </body>
      </html>`;

    const nextHtml = enhancerTest.enhanceDashboardHtml(html, []);

    expect(nextHtml).toContain('DataTable({pageLength:100,lengthMenu:[10,25,50,100],stateSave:true,stateDuration:-1})');
    expect(nextHtml).not.toContain('DataTable({})');
  });

  test('adds saved table state when re-enhancing an older Odhín report', () => {
    const html = `
      <html>
        <body>
          <table id="test-list-table"></table>
          <script>
            $(document).ready(function(){var table=$("#test-list-table").DataTable({pageLength:100,lengthMenu:[10,25,50,100]}),filter=$("#status-filter");});
          </script>
        </body>
      </html>`;

    const nextHtml = enhancerTest.defaultTestListRowsPerPage(html);

    expect(nextHtml).toContain('DataTable({pageLength:100,lengthMenu:[10,25,50,100],stateSave:true,stateDuration:-1})');
  });

  test('keeps accessibility evidence off the generated Odhín dashboard', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div id="TabDashboard">
            <div class="row"></div>
          </div>
        </body>
      </html>`;

    const nextHtml = enhancerTest.enhanceDashboardHtml(
      html,
      [],
      [
        {
          engine: 'axe',
          feature: 'static pages',
          pageState: 'privacy policy',
          testTitle: 'privacy policy page has no automatically detectable accessibility violations',
          htmlFileName: 'privacy-policy-accessibility-issues.html',
          jsonFileName: 'privacy-policy-accessibility-issues.json',
          screenshotFileName: 'privacy-policy-highlighted-screenshot.png',
          violationCount: 1,
          rules: ['link-name'],
          targets: ['.hmcts-header__link'],
        },
      ]
    );

    expect(nextHtml).not.toContain('Accessibility Evidence');
    expect(nextHtml).not.toContain('odhin-accessibility-evidence');
    expect(nextHtml).not.toContain('odhin-a11y-evidence-grid');
    expect(parse(nextHtml).querySelector('#TabDashboard').innerHTML).not.toContain('./accessibility-evidence/');
    expect(parse(nextHtml).querySelector('#TabAccessibility').innerHTML).toContain('privacy-policy-highlighted-screenshot.png');
  });

  test('removes previously injected accessibility evidence from the generated Odhín dashboard', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div id="TabDashboard">
            <div class="row">
              <div class="col-12">
                <div class="dashboard-block" id="odhin-accessibility-evidence">
                  <div class="info-box-header">Accessibility Evidence</div>
                  <div class="odhin-a11y-evidence-grid">old cards</div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>`;

    const nextHtml = enhancerTest.enhanceDashboardHtml(html, []);

    expect(nextHtml).not.toContain('Accessibility Evidence');
    expect(nextHtml).not.toContain('odhin-accessibility-evidence');
    expect(nextHtml).not.toContain('old cards');
  });

  test('injects accessibility evidence into the matching generated Odhín test modal', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div id="TabDashboard"><div class="row"></div></div>
          <table id="test-list-table">
            <thead>
              <tr><th>Title</th><th>Status</th><th>Duration</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>privacy policy page has no automatically detectable accessibility violations</td>
                <td>failed</td>
                <td>1s</td>
              </tr>
              <tr>
                <td>passed accessibility smoke</td>
                <td>passed</td>
                <td>1s</td>
              </tr>
            </tbody>
            <tfoot><tr><th>Title</th><th>Status</th><th>Duration</th></tr></tfoot>
          </table>
          <div class="modal-content">
            <div class="modal-header result-header">
              <div class="header-col-center">
                privacy policy page has no automatically detectable accessibility violations
              </div>
            </div>
            <div class="modal-body odhin-bg-2">
              <div id="TabRunInfo">run info</div>
            </div>
          </div>
        </body>
      </html>`;

    const nextHtml = enhancerTest.enhanceDashboardHtml(
      html,
      [],
      [
        {
          engine: 'summary',
          testTitle: 'privacy policy page has no automatically detectable accessibility violations',
          htmlFileName: 'privacy-policy-summary.html',
          jsonFileName: 'privacy-policy-summary.json',
          violationCount: 1,
          rules: ['screen-reader:skip-link', 'behavior:focus returns', 'axe:engine-execution'],
          status: 'error',
          context: { scenarioId: 'privacy', language: 'cy', persona: '<staff>' },
          targets: [],
        },
        {
          engine: 'screen-reader',
          testTitle: 'privacy policy page has no automatically detectable accessibility violations',
          htmlFileName: 'privacy-policy-screen-reader.html',
          jsonFileName: 'privacy-policy-screen-reader.json',
          screenshotFileName: 'privacy-policy-screen-reader.png',
          violationCount: 2,
          rules: ['skip-link', 'main-landmark'],
          targets: ['#content'],
        },
        {
          engine: 'wave-like',
          testTitle: 'privacy policy page has no automatically detectable accessibility violations',
          htmlFileName: 'privacy-policy-wave-like.html',
          jsonFileName: 'privacy-policy-wave-like.json',
          screenshotFileName: 'privacy-policy-wave-like.png',
          violationCount: 1,
          rules: ['link-name'],
          targets: ['.hmcts-header__link'],
        },
      ]
    );

    const table = parse(nextHtml).querySelector('#test-list-table');
    expect(table.querySelectorAll('thead th')).toHaveLength(5);
    expect(table.querySelectorAll('tfoot th')).toHaveLength(5);
    expect(table.querySelectorAll('tbody tr')[0].querySelectorAll('td')).toHaveLength(5);

    expect(nextHtml).toContain(
      'data-a11y-test-evidence-link="privacy-policy-summary.html|privacy-policy-wave-like.html|privacy-policy-screen-reader.html"'
    );
    expect(nextHtml).toContain('Accessibility findings for this test');
    expect(nextHtml.match(/data-a11y-test-evidence-link=/g)).toHaveLength(1);
    expect(nextHtml).toContain('Back to test list');
    expect(nextHtml).toContain('Previous finding');
    expect(nextHtml).toContain('Next finding');
    expect(nextHtml).toContain('1 of 1 accessibility findings');
    expect(nextHtml).toContain('id="odhin-a11y-modal-nav-script"');
    expect(nextHtml).toContain('data-odhin-a11y-back-title=');
    expect(nextHtml).toContain('Unique issue groups');
    expect(nextHtml).toContain('language: cy');
    expect(nextHtml).toContain('persona: &lt;staff&gt;');
    expect(nextHtml).toContain('behavior:focus returns');
    expect(nextHtml).toContain('axe:engine-execution');
    expect(nextHtml).not.toContain('unexpected issue(s) across engines');
    expect(nextHtml).toContain('2 Screen-reader heuristics issue(s):</strong> skip-link, main-landmark');
    expect(nextHtml).toContain('1 WAVE-like issue(s):</strong> link-name');
    expect(nextHtml).toContain('<th class="odhin-a11y-issues-header">Issue groups</th>');
    expect(nextHtml).toContain('<th class="odhin-a11y-issues-header">Fix hint</th>');
    expect(nextHtml).toContain('Issue Summary');
    const disclosure = parse(nextHtml).querySelector('details.odhin-a11y-summary-disclosure');
    expect(disclosure).not.toBeNull();
    expect(disclosure.hasAttribute('open')).toBe(false);
    expect(disclosure.querySelector('.odhin-a11y-issue-summary')).not.toBeNull();
    expect(nextHtml).toContain('<th>Fix scope</th>');
    expect(nextHtml).toContain('Likely page-specific fix');
    expect(nextHtml).toContain('Quick filters:');
    expect(nextHtml).toContain('data-a11y-issue-filter="skip-link"');
    expect(nextHtml).toContain('data-a11y-issue-filter="main-landmark"');
    expect(nextHtml).toContain('table.column(issueColumnIndex).search(value).draw();');
    expect(nextHtml).toContain('<strong>WAVE-like:</strong> link-name (1)');
    expect(nextHtml).toContain('<strong>Screen-reader heuristics:</strong> skip-link (1), main-landmark (1)');
    expect(nextHtml).toContain('Also: main-landmark, link-name, focus returns, engine-execution.');
    expect(nextHtml).toContain('Developer hints');
    expect(nextHtml).toContain('Check the app shell skip link target exists on this route');
    expect(nextHtml).toContain('Check the route template renders exactly one usable &lt;main&gt; or role=&quot;main&quot;');
    expect(nextHtml).toContain(
      'Playwright can mark this test red, but the accessibility wrapper exits successfully unless <code>A11Y_STRICT</code> is enabled'
    );
    expect(nextHtml).toContain('Open highlighted issue report');
    expect(nextHtml).toContain(
      '<a href="./accessibility-evidence/privacy-policy-wave-like.html" target="_blank" rel="noopener noreferrer">Open highlighted issue report</a>'
    );
    expect(nextHtml).toContain('Open screenshot');
    expect(nextHtml).toContain('Open screen-reader JSON');
    expect(nextHtml).toContain('Open DOM and WAVE-like JSON');
    expect(nextHtml.indexOf('Accessibility findings for this test')).toBeLessThan(nextHtml.indexOf('run info'));
  });

  test('keeps every unique accessibility issue group in the dashboard summary', () => {
    const entries = Array.from({ length: 13 }, (_, index) => ({
      engine: 'wave-like',
      testTitle: `screen ${index + 1}`,
      htmlFileName: `issue-${index + 1}.html`,
      violationCount: 1,
      rules: [`custom-rule-${index + 1}`],
      targets: ['main'],
    }));

    const summaryHtml = enhancerTest.buildIssueSummaryBlock(entries);

    expect(summaryHtml).toContain('custom-rule-1');
    expect(summaryHtml).toContain('custom-rule-13');
    expect(summaryHtml.match(/custom-rule-/g)).toHaveLength(13);
  });

  test('preserves and escapes scenario metadata and finding status in rendered evidence', () => {
    const context = { scenarioId: 'header', persona: '<staff>', language: 'cy', authentication: 'mocked', dataMode: 'mocked' };
    const entries = [
      {
        engine: 'summary',
        testTitle: 'Welsh header',
        htmlFileName: 'header.html',
        violationCount: 1,
        status: 'known-findings',
        context,
        rules: ['axe:label'],
        targets: [],
      },
    ];
    expect(enhancerTest.normalizeEvidenceEntries(entries)[0]).toMatchObject({ context });
    const html = enhancerTest.buildAccessibilityEvidenceBlock(entries);
    expect(html).toContain('persona: &lt;staff&gt;');
    expect(html).toContain('language: cy');
    expect(html).toContain('known-findings');
    expect(html).toContain('1 reported issue(s)');
    expect(html).not.toContain('unexpected issue(s)');
  });

  test('normalizes accessibility evidence entries and drops incomplete records', () => {
    const entries = enhancerTest.normalizeEvidenceEntries([
      {
        engine: 'screen-reader',
        feature: 'case list',
        pageState: 'results',
        testTitle: 'valid a11y evidence',
        htmlFileName: 'issue.html',
        jsonFileName: 'issue.json',
        screenshotFileName: 'issue.png',
        violationCount: '2',
        rules: ['label'],
        targets: ['#reason'],
      },
      {
        testTitle: 'missing html file',
        jsonFileName: 'issue.json',
        violationCount: 1,
      },
    ]);

    expect(entries).toHaveLength(1);
    expect(entries[0]).toEqual({
      engine: 'screen-reader',
      feature: 'case list',
      pageState: 'results',
      testTitle: 'valid a11y evidence',
      htmlFileName: 'issue.html',
      jsonFileName: 'issue.json',
      screenshotFileName: 'issue.png',
      reportFileName: '',
      violationCount: 2,
      status: '',
      summary: '',
      rules: ['label'],
      targets: ['#reason'],
    });
  });

  test('reads accessibility evidence from per-test manifest entries when aggregate manifest is missing', () => {
    const outputFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'odhin-a11y-evidence-'));
    const evidenceDir = path.join(outputFolder, 'accessibility-evidence');
    fs.mkdirSync(evidenceDir, { recursive: true });
    fs.writeFileSync(
      path.join(evidenceDir, 'manifest-entry-case-list-accessibility-issues.json'),
      JSON.stringify({
        engine: 'wave-like',
        feature: 'case list',
        pageState: 'search results',
        testTitle: 'case list page has no automatically detectable accessibility violations',
        htmlFileName: 'case-list-accessibility-issues.html',
        jsonFileName: 'case-list-accessibility-issues.json',
        screenshotFileName: 'case-list-accessibility-issues.png',
        violationCount: 1,
        rules: ['label'],
        targets: ['#case-reference'],
      })
    );

    const entries = enhancerTest.readAccessibilityEvidenceEntries(outputFolder);

    expect(entries).toEqual([
      {
        engine: 'wave-like',
        feature: 'case list',
        pageState: 'search results',
        testTitle: 'case list page has no automatically detectable accessibility violations',
        htmlFileName: 'case-list-accessibility-issues.html',
        jsonFileName: 'case-list-accessibility-issues.json',
        screenshotFileName: 'case-list-accessibility-issues.png',
        reportFileName: '',
        violationCount: 1,
        status: '',
        summary: '',
        rules: ['label'],
        targets: ['#case-reference'],
      },
    ]);
  });
});
