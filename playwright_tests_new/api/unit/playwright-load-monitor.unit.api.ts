import { expect, test } from '@playwright/test';
import childProcess from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

interface PressureSignals {
  cpuSaturated: boolean;
  loadSaturated: boolean;
  memoryPressure: boolean;
  memoryPressureThresholdPercent: number;
  cpuSaturatedSamplePercent: number;
}

interface Summary {
  cpu: { max: number };
  memory: { average: number };
  workers: string;
  timelineEvents?: Array<{ label: string; type: string; inRange: boolean }>;
}

const loadMonitor = require('../../../scripts/playwright-load-monitor.js') as {
  buildInlineSvgChart: (samples: unknown[], timelineEvents?: unknown[]) => string;
  buildPressureSignals: (samples: unknown[]) => PressureSignals;
  buildRecommendation: (signals: { cpuSaturated: boolean; loadSaturated: boolean; memoryPressure: boolean }) => string;
  buildSummary: (metadata: Record<string, unknown>, samples: unknown[], exitCode: number, timelineEvents?: unknown[]) => Summary;
  injectLoadProfileIntoOdhin: (
    reportFolder: string,
    summary: Summary,
    samples: unknown[],
    relativeProfilePath: string,
    options?: { odhinTab?: boolean }
  ) => void;
  parseArgs: (argv: string[]) => {
    options: {
      outputFolder: string;
      reportFolder: string;
      reportFolders: string[];
      sampleIntervalMs: number;
      label: string;
      injectOdhin: boolean;
      odhinTab: boolean;
      eventsFile: string;
    };
    commandArgs: string[];
  };
};

test.describe('Playwright load monitor script', { tag: '@svc-internal' }, () => {
  test('parses wrapper options and preserves Playwright command arguments', () => {
    const parsed = loadMonitor.parseArgs([
      '--sample-interval-ms',
      '1000',
      '--report-folder',
      'custom-report',
      '--output-folder',
      'custom-load',
      '--label',
      'workers-10',
      '--',
      'yarn',
      'test:playwright:integration',
      '--workers=10',
      '--shard=1/2',
    ]);

    expect(parsed.options).toMatchObject({
      sampleIntervalMs: 1000,
      reportFolder: 'custom-report',
      reportFolders: ['custom-report'],
      outputFolder: 'custom-load',
      label: 'workers-10',
      injectOdhin: true,
      odhinTab: true,
    });
    expect(parsed.commandArgs).toEqual(['yarn', 'test:playwright:integration', '--workers=10', '--shard=1/2']);
  });

  test('supports injecting the same load profile into multiple Odhín report folders', () => {
    const parsed = loadMonitor.parseArgs([
      '--report-folder',
      'functional-output/tests/api_functional/odhin-report',
      '--report-folder',
      'functional-output/tests/playwright-api/odhin-report',
      '--',
      'yarn',
      'test:api:pw:raw',
    ]);

    expect(parsed.options.reportFolder).toBe('functional-output/tests/api_functional/odhin-report');
    expect(parsed.options.reportFolders).toEqual([
      'functional-output/tests/api_functional/odhin-report',
      'functional-output/tests/playwright-api/odhin-report',
    ]);
    expect(parsed.commandArgs).toEqual(['yarn', 'test:api:pw:raw']);
  });

  test('parses Odhín tab and timeline event controls', () => {
    const parsed = loadMonitor.parseArgs([
      '--no-odhin-tab',
      '--events-file',
      'functional-output/stage-events.jsonl',
      '--',
      'yarn',
      'test:playwright:integration',
    ]);

    expect(parsed.options.odhinTab).toBe(false);
    expect(parsed.options.eventsFile).toBe('functional-output/stage-events.jsonl');
    expect(parsed.commandArgs).toEqual(['yarn', 'test:playwright:integration']);
  });

  test('builds pressure signals and recommendations from sampled load', () => {
    const samples = [
      sample({ cpuPercent: 91, load1PerCore: 1.8, memoryUsedPercent: 62 }),
      sample({ cpuPercent: 92, load1PerCore: 1.7, memoryUsedPercent: 63 }),
      sample({ cpuPercent: 25, load1PerCore: 0.4, memoryUsedPercent: 61 }),
    ];

    const signals = loadMonitor.buildPressureSignals(samples);

    expect(signals.cpuSaturated).toBe(true);
    expect(signals.loadSaturated).toBe(true);
    expect(signals.memoryPressure).toBe(false);
    expect(signals.cpuSaturatedSamplePercent).toBe(66.67);
    expect(loadMonitor.buildRecommendation(signals)).toContain('CPU/load saturation');
  });

  test('uses a stricter host-memory pressure threshold than cgroup memory pressure', () => {
    const hostSignals = loadMonitor.buildPressureSignals([
      sample({ memoryUsedPercent: 99, memoryPressureThresholdPercent: 99.5 }),
      sample({ memoryUsedPercent: 99, memoryPressureThresholdPercent: 99.5 }),
    ]);
    const cgroupSignals = loadMonitor.buildPressureSignals([
      sample({ memoryUsedPercent: 90, memoryPressureThresholdPercent: 85 }),
      sample({ memoryUsedPercent: 90, memoryPressureThresholdPercent: 85 }),
    ]);

    expect(hostSignals.memoryPressure).toBe(false);
    expect(hostSignals.memoryPressureThresholdPercent).toBe(99.5);
    expect(cgroupSignals.memoryPressure).toBe(true);
    expect(cgroupSignals.memoryPressureThresholdPercent).toBe(85);
  });

  test('summarizes samples and renders an inline chart for Odhín', () => {
    const startEpochMs = Date.now() - 10_000;
    const summary = loadMonitor.buildSummary(
      {
        command: ['yarn', 'test:playwright:integration', '--workers=10'],
        startEpochMs,
        sampleIntervalMs: 1000,
        effectiveCpuCount: 8,
        totalMemoryBytes: 16 * 1024 ** 3,
        workers: '10',
        shard: '',
      },
      [
        sample({ elapsedMs: 0, cpuPercent: 10, load1PerCore: 0.5, memoryUsedPercent: 40 }),
        sample({ elapsedMs: 5000, cpuPercent: 70, load1PerCore: 0.9, memoryUsedPercent: 55 }),
        sample({ elapsedMs: 10000, cpuPercent: 90, load1PerCore: 1.6, memoryUsedPercent: 70 }),
      ],
      0,
      [{ label: 'API', type: 'start', epochMs: startEpochMs + 5000 }]
    );

    expect(summary.cpu.max).toBe(90);
    expect(summary.memory.average).toBe(55);
    expect(summary.workers).toBe('10');
    expect(summary.timelineEvents).toEqual(
      expect.arrayContaining([expect.objectContaining({ label: 'API', type: 'start', inRange: true })])
    );
    expect(loadMonitor.buildInlineSvgChart([sample({ cpuPercent: 10 })], summary.timelineEvents)).toContain('API start');
  });

  test('injects the System Load tab after Tests without adding content to the dashboard', () => {
    const reportFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'odhin-load-profile-'));
    const reportPath = path.join(reportFolder, 'xui-playwright-integration.html');
    fs.writeFileSync(
      reportPath,
      `
      <!doctype html>
      <html>
        <body>
          <div id="TabDashboard">
            <div class="row ms-3 me-3">
              <div class="col-12"><div class="dashboard-block"><div class="info-box-header">Run info</div></div></div>
            </div>
          </div>
          <button class="main-tablinks" onclick="openMainTab(event, 'TabDashboard')">Dashboard</button>
          <button class="main-tablinks" onclick="openMainTab(event, 'TabTests')">Tests</button>
          <div id="TabTests" class="main-tabcontent"></div>
        </body>
      </html>`
    );

    const summary = loadMonitor.buildSummary(
      {
        command: ['yarn', 'test:playwright:integration'],
        startEpochMs: Date.now() - 1000,
        sampleIntervalMs: 1000,
        effectiveCpuCount: 4,
        totalMemoryBytes: 8 * 1024 ** 3,
        workers: 'config-default',
        shard: '',
      },
      [sample({ cpuPercent: 20, load1PerCore: 0.2, memoryUsedPercent: 30 })],
      0
    );

    loadMonitor.injectLoadProfileIntoOdhin(
      reportFolder,
      summary,
      [sample({ cpuPercent: 20 })],
      '../load-profile/load-profile.html'
    );

    const html = fs.readFileSync(reportPath, 'utf8');
    expect(html).toContain('System Load Profile');
    expect(html).toContain("openMainTab(event, 'TabSystemLoad')");
    expect(html).toContain('id="TabSystemLoad"');
    expect(html).toContain('Standalone profile');
    expect(html).toContain('../load-profile/load-profile.html');
    expect(html).not.toContain('id="odhin-system-load-profile"');
    expect(html.indexOf("openMainTab(event, 'TabTests')")).toBeLessThan(html.indexOf("openMainTab(event, 'TabSystemLoad')"));
  });

  test('can skip the Odhín System Load tab and dashboard injection', () => {
    const reportFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'odhin-load-profile-no-tab-'));
    const reportPath = path.join(reportFolder, 'xui-playwright-integration.html');
    fs.writeFileSync(
      reportPath,
      `
      <!doctype html>
      <html>
        <body>
          <div id="TabDashboard">
            <div class="row ms-3 me-3">
              <div class="col-12"><div class="dashboard-block"><div class="info-box-header">Run info</div></div></div>
            </div>
          </div>
          <button class="main-tablinks" onclick="openMainTab(event, 'TabTests')">Tests</button>
          <div id="TabTests" class="main-tabcontent"></div>
        </body>
      </html>`
    );

    const summary = loadMonitor.buildSummary(
      {
        command: ['yarn', 'test:playwright:integration'],
        startEpochMs: Date.now() - 1000,
        sampleIntervalMs: 1000,
        effectiveCpuCount: 4,
        totalMemoryBytes: 8 * 1024 ** 3,
        workers: 'config-default',
        shard: '',
      },
      [sample({ cpuPercent: 20, load1PerCore: 0.2, memoryUsedPercent: 30 })],
      0
    );

    loadMonitor.injectLoadProfileIntoOdhin(
      reportFolder,
      summary,
      [sample({ cpuPercent: 20 })],
      '../load-profile/load-profile.html',
      { odhinTab: false }
    );

    const html = fs.readFileSync(reportPath, 'utf8');
    expect(html).not.toContain('TabSystemLoad');
    expect(html).not.toContain('System Load Profile');
    expect(html).not.toContain('odhin-system-load-profile');
  });

  test('writes timeline event JSONL records for Jenkins stage markers', () => {
    const outputFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'load-profile-events-'));
    const eventsFile = path.join(outputFolder, 'stage-events.jsonl');

    childProcess.execFileSync('node', [path.join(process.cwd(), 'scripts/playwright-load-event.js'), eventsFile, 'API', 'start']);

    const [line] = fs.readFileSync(eventsFile, 'utf8').trim().split('\n');
    const event = JSON.parse(line);
    expect(event).toMatchObject({ label: 'API', type: 'start', source: 'jenkins' });
    expect(Number.isFinite(event.epochMs)).toBe(true);
  });
});

function sample(overrides: Record<string, unknown>) {
  return {
    timestamp: new Date().toISOString(),
    elapsedMs: 0,
    cpuPercent: 0,
    load1: 0,
    load5: 0,
    load15: 0,
    load1PerCore: 0,
    memoryUsedPercent: 0,
    memoryUsedBytes: 0,
    memoryTotalBytes: 1024,
    processCounts: {
      node: 1,
      chrome: 0,
      playwright: 0,
      total: 10,
    },
    ...overrides,
  };
}
