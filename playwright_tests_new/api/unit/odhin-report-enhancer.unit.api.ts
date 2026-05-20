import { expect, test } from '@playwright/test';
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
});
