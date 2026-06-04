import { expect, test } from '@playwright/test';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const enhancerModule = require('../../common/reporters/odhin-report-enhancer.cjs');

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
const deriveFeatureName = enhancerModule.deriveFeatureName as (filePath: string) => string;

const enhancerTest = enhancerModule.__test__ as {
  enhanceDashboardHtml: (html: string, featureStats: unknown) => string;
  formatDuration: (durationMs: number) => string;
  buildFeatureOverviewBlock: (featureStats: unknown) => string;
  buildAccessibilityEvidenceBlock: (entries: unknown) => string;
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
    violationCount: number;
    rules: string[];
    targets: string[];
  }>;
  readAccessibilityEvidenceEntries: (outputFolder: string) => unknown[];
};

test.describe('odhin report enhancer', { tag: '@svc-internal' }, () => {
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
    expect(nextHtml).toContain('odhin-dashboard-stack');
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

    expect(nextHtml).toContain('DataTable({pageLength:100,lengthMenu:[10,25,50,100]})');
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

    expect(nextHtml).toContain('DataTable({pageLength:100,lengthMenu:[10,25,50,100]})');
    expect(nextHtml).not.toContain('DataTable({})');
  });

  test('injects accessibility evidence screenshots into generated Odhín dashboard', () => {
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

    expect(nextHtml).toContain('Accessibility Evidence');
    expect(nextHtml).toContain('odhin-accessibility-evidence');
    expect(nextHtml).toContain('./accessibility-evidence/privacy-policy-highlighted-screenshot.png');
    expect(nextHtml).toContain('issue detail');
    expect(nextHtml).toContain('DOM and axe JSON');
    expect(nextHtml).toContain('link-name');
    expect(nextHtml).toContain('.hmcts-header__link');
  });

  test('injects accessibility evidence into the matching generated Odhín test modal', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div id="TabDashboard"><div class="row"></div></div>
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

    expect(nextHtml).toContain('data-a11y-test-evidence-link="privacy-policy-accessibility-issues.html"');
    expect(nextHtml).toContain('Accessibility evidence for this test');
    expect(nextHtml).toContain('Open highlighted issue report');
    expect(nextHtml).toContain('Open screenshot');
    expect(nextHtml).toContain('Open DOM JSON');
    expect(nextHtml.indexOf('Accessibility evidence for this test')).toBeLessThan(nextHtml.indexOf('run info'));
  });

  test('normalizes accessibility evidence entries and drops incomplete records', () => {
    const entries = enhancerTest.normalizeEvidenceEntries([
      {
        testTitle: 'valid a11y evidence',
        htmlFileName: 'issue.html',
        jsonFileName: 'issue.json',
        screenshotFileName: 'issue.png',
        violationCount: '2',
        rules: ['label'],
        targets: ['#reason'],
      },
      {
        testTitle: 'missing screenshot',
        htmlFileName: 'issue.html',
        jsonFileName: 'issue.json',
        violationCount: 1,
      },
    ]);

    expect(entries).toHaveLength(1);
    expect(entries[0]).toEqual({
      testTitle: 'valid a11y evidence',
      htmlFileName: 'issue.html',
      jsonFileName: 'issue.json',
      screenshotFileName: 'issue.png',
      violationCount: 2,
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
        testTitle: 'case list page has no automatically detectable accessibility violations',
        htmlFileName: 'case-list-accessibility-issues.html',
        jsonFileName: 'case-list-accessibility-issues.json',
        screenshotFileName: 'case-list-accessibility-issues.png',
        violationCount: 1,
        rules: ['label'],
        targets: ['#case-reference'],
      },
    ]);
  });
});
