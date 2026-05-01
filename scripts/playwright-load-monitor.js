#!/usr/bin/env node
/* eslint-disable no-console */

const childProcess = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const DEFAULT_SAMPLE_INTERVAL_MS = 2000;
const DEFAULT_CHILD_IDLE_TIMEOUT_MS = isCiLikeEnvironment(process.env) ? 120_000 : 0;
const DEFAULT_CHILD_CLOSE_GRACE_MS = isCiLikeEnvironment(process.env) ? 5_000 : 0;
const DEFAULT_CHILD_TERMINATE_GRACE_MS = 10_000;
const DEFAULT_OUTPUT_FOLDER = 'functional-output/tests/playwright-load-profile';
const DEFAULT_REPORT_FOLDER = 'functional-output/tests/playwright-integration/odhin-report';
const SUMMARY_FILE = 'summary.json';
const SAMPLES_FILE = 'samples.json';
const REPORT_FILE = 'load-profile.html';
const ODHIN_LOAD_TAB_ID = 'TabSystemLoad';

function parseArgs(argv) {
  const separatorIndex = argv.indexOf('--');
  const optionArgs = separatorIndex >= 0 ? argv.slice(0, separatorIndex) : [];
  const commandArgs = separatorIndex >= 0 ? argv.slice(separatorIndex + 1) : argv;
  const defaultReportFolder = process.env.PLAYWRIGHT_REPORT_FOLDER ?? DEFAULT_REPORT_FOLDER;
  const options = {
    outputFolder: process.env.PW_LOAD_PROFILE_OUTPUT ?? DEFAULT_OUTPUT_FOLDER,
    reportFolder: defaultReportFolder,
    reportFolders: [defaultReportFolder],
    sampleIntervalMs: parsePositiveInteger(process.env.PW_LOAD_PROFILE_INTERVAL_MS, DEFAULT_SAMPLE_INTERVAL_MS),
    childIdleTimeoutMs: parseNonNegativeInteger(process.env.PW_LOAD_PROFILE_CHILD_IDLE_TIMEOUT_MS, DEFAULT_CHILD_IDLE_TIMEOUT_MS),
    childCloseGraceMs: parseNonNegativeInteger(process.env.PW_LOAD_PROFILE_CHILD_CLOSE_GRACE_MS, DEFAULT_CHILD_CLOSE_GRACE_MS),
    childTerminateGraceMs: parseNonNegativeInteger(
      process.env.PW_LOAD_PROFILE_CHILD_TERMINATE_GRACE_MS,
      DEFAULT_CHILD_TERMINATE_GRACE_MS
    ),
    label: process.env.PW_LOAD_PROFILE_LABEL ?? '',
    injectOdhin: process.env.PW_LOAD_PROFILE_INJECT_ODHIN === 'true',
    odhinTab: process.env.PW_LOAD_PROFILE_ODHIN_TAB !== 'false',
    eventsFile: process.env.PW_LOAD_PROFILE_EVENTS_FILE ?? '',
    stopFile: process.env.PW_LOAD_PROFILE_STOP_FILE ?? '',
  };
  let explicitReportFolderSeen = false;

  for (let index = 0; index < optionArgs.length; index += 1) {
    const arg = optionArgs[index];
    const next = optionArgs[index + 1];
    if (arg === '--output-folder' && next) {
      options.outputFolder = next;
      index += 1;
    } else if (arg === '--report-folder' && next) {
      if (!explicitReportFolderSeen) {
        options.reportFolders = [];
        options.reportFolder = next;
        explicitReportFolderSeen = true;
      }
      options.reportFolders.push(next);
      index += 1;
    } else if (arg === '--sample-interval-ms' && next) {
      options.sampleIntervalMs = parsePositiveInteger(next, DEFAULT_SAMPLE_INTERVAL_MS);
      index += 1;
    } else if (arg === '--child-idle-timeout-ms' && next) {
      options.childIdleTimeoutMs = parseNonNegativeInteger(next, DEFAULT_CHILD_IDLE_TIMEOUT_MS);
      index += 1;
    } else if (arg === '--child-close-grace-ms' && next) {
      options.childCloseGraceMs = parseNonNegativeInteger(next, DEFAULT_CHILD_CLOSE_GRACE_MS);
      index += 1;
    } else if (arg === '--child-terminate-grace-ms' && next) {
      options.childTerminateGraceMs = parseNonNegativeInteger(next, DEFAULT_CHILD_TERMINATE_GRACE_MS);
      index += 1;
    } else if (arg === '--label' && next) {
      options.label = next;
      index += 1;
    } else if (arg === '--no-odhin-inject') {
      options.injectOdhin = false;
    } else if (arg === '--no-odhin-tab') {
      options.odhinTab = false;
    } else if (arg === '--events-file' && next) {
      options.eventsFile = next;
      index += 1;
    } else if (arg === '--stop-file' && next) {
      options.stopFile = next;
      index += 1;
    }
  }

  return { options, commandArgs };
}

function normalizeReportFolders(options) {
  const folders = options.reportFolders?.length ? options.reportFolders : [options.reportFolder];
  return Array.from(new Set(folders.filter(Boolean)));
}

function parsePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseNonNegativeInteger(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function isCiLikeEnvironment(env) {
  return Boolean(env.CI || env.JENKINS_URL || env.BUILD_NUMBER);
}

function readFirstExistingFile(filePaths) {
  for (const filePath of filePaths) {
    try {
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8').trim();
      }
    } catch {
      // best effort only
    }
  }
  return undefined;
}

function resolveCgroupCpuLimit() {
  const cpuMax = readFirstExistingFile(['/sys/fs/cgroup/cpu.max']);
  if (cpuMax) {
    const [quotaRaw, periodRaw] = cpuMax.split(/\s+/);
    const quota = Number.parseInt(quotaRaw, 10);
    const period = Number.parseInt(periodRaw, 10);
    if (Number.isFinite(quota) && Number.isFinite(period) && quota > 0 && period > 0) {
      return quota / period;
    }
  }

  const quota = Number.parseInt(
    readFirstExistingFile(['/sys/fs/cgroup/cpu/cpu.cfs_quota_us', '/sys/fs/cgroup/cpu,cpuacct/cpu.cfs_quota_us']) ?? '',
    10
  );
  const period = Number.parseInt(
    readFirstExistingFile(['/sys/fs/cgroup/cpu/cpu.cfs_period_us', '/sys/fs/cgroup/cpu,cpuacct/cpu.cfs_period_us']) ?? '',
    10
  );

  if (Number.isFinite(quota) && Number.isFinite(period) && quota > 0 && period > 0) {
    return quota / period;
  }
  return undefined;
}

function resolveCgroupMemoryLimitBytes() {
  const raw = readFirstExistingFile(['/sys/fs/cgroup/memory.max', '/sys/fs/cgroup/memory/memory.limit_in_bytes']);
  if (!raw || raw === 'max') {
    return undefined;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > Number.MAX_SAFE_INTEGER) {
    return undefined;
  }
  return parsed;
}

function resolveCgroupMemoryCurrentBytes() {
  const raw = readFirstExistingFile(['/sys/fs/cgroup/memory.current', '/sys/fs/cgroup/memory/memory.usage_in_bytes']);
  const parsed = Number.parseInt(raw ?? '', 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function getCpuTimes() {
  return os.cpus().reduce(
    (acc, cpu) => {
      const times = cpu.times;
      acc.idle += times.idle;
      acc.total += times.user + times.nice + times.sys + times.idle + times.irq;
      return acc;
    },
    { idle: 0, total: 0 }
  );
}

function calculateCpuUsage(previousCpuTimes, currentCpuTimes) {
  if (!previousCpuTimes) {
    return 0;
  }
  const idleDelta = currentCpuTimes.idle - previousCpuTimes.idle;
  const totalDelta = currentCpuTimes.total - previousCpuTimes.total;
  if (totalDelta <= 0) {
    return 0;
  }
  return clamp(((totalDelta - idleDelta) / totalDelta) * 100, 0, 100);
}

function getProcessCounts() {
  const psArgs = process.platform === 'darwin' ? ['-axo', 'comm='] : ['-eo', 'comm='];
  try {
    const output = childProcess.execFileSync('ps', psArgs, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 1000,
    });
    const commands = output
      .split('\n')
      .map((entry) => path.basename(entry.trim()).toLowerCase())
      .filter(Boolean);
    return {
      node: commands.filter((command) => command.includes('node')).length,
      chrome: commands.filter((command) => command.includes('chrome') || command.includes('chromium')).length,
      playwright: commands.filter((command) => command.includes('playwright')).length,
      total: commands.length,
    };
  } catch {
    return {
      node: undefined,
      chrome: undefined,
      playwright: undefined,
      total: undefined,
    };
  }
}

function createSampler(metadata) {
  let previousCpuTimes;
  const logicalCpuCount = os.cpus().length || 1;
  const effectiveCpuCount = metadata.cgroupCpuLimit
    ? Math.max(1, Math.min(logicalCpuCount, metadata.cgroupCpuLimit))
    : logicalCpuCount;
  const memoryPressureThresholdPercent = metadata.memoryLimitSource === 'cgroup' ? 85 : 99.5;

  return () => {
    const currentCpuTimes = getCpuTimes();
    const cpuPercent = calculateCpuUsage(previousCpuTimes, currentCpuTimes);
    previousCpuTimes = currentCpuTimes;

    const totalMemoryBytes = metadata.cgroupMemoryLimitBytes ?? os.totalmem();
    const cgroupCurrentBytes = metadata.cgroupMemoryLimitBytes ? resolveCgroupMemoryCurrentBytes() : undefined;
    const usedMemoryBytes = cgroupCurrentBytes ?? totalMemoryBytes - os.freemem();
    const memoryUsedPercent = totalMemoryBytes > 0 ? clamp((usedMemoryBytes / totalMemoryBytes) * 100, 0, 100) : 0;
    const loadAverage = os.loadavg();

    return {
      timestamp: new Date().toISOString(),
      elapsedMs: Date.now() - metadata.startEpochMs,
      cpuPercent: round(cpuPercent),
      load1: round(loadAverage[0]),
      load5: round(loadAverage[1]),
      load15: round(loadAverage[2]),
      load1PerCore: round(loadAverage[0] / effectiveCpuCount),
      memoryUsedPercent: round(memoryUsedPercent),
      memoryUsedBytes: usedMemoryBytes,
      memoryTotalBytes: totalMemoryBytes,
      memoryLimitSource: metadata.memoryLimitSource,
      memoryPressureThresholdPercent,
      processCounts: getProcessCounts(),
    };
  };
}

async function runMonitoredCommand(commandArgs, options) {
  if (!commandArgs.length) {
    throw new Error('No command supplied. Use: node scripts/playwright-load-monitor.js -- <command> [args...]');
  }

  const metadata = buildMetadata(commandArgs, options);
  const samples = [];
  const sample = createSampler(metadata);
  samples.push(sample());
  const timer = setInterval(() => samples.push(sample()), options.sampleIntervalMs);

  const exitCode = await new Promise((resolve) => {
    const spawnProcess = options.spawnProcess ?? childProcess.spawn;
    const monitorChildOutput = Boolean(options.childIdleTimeoutMs);
    let child;
    let settled = false;
    let idleTimer;
    let closeGraceTimer;
    let terminateTimer;

    const clearWatchdogs = () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = undefined;
      }
      if (closeGraceTimer) {
        clearTimeout(closeGraceTimer);
        closeGraceTimer = undefined;
      }
      if (terminateTimer) {
        clearTimeout(terminateTimer);
        terminateTimer = undefined;
      }
    };
    const finish = (code) => {
      if (settled) {
        return;
      }
      settled = true;
      clearWatchdogs();
      resolve(code);
    };
    const signalChild = (signal) => {
      if (process.platform !== 'win32' && child.pid) {
        try {
          process.kill(-child.pid, signal);
          return;
        } catch (error) {
          if (error?.code !== 'ESRCH') {
            console.error(`[load-profile] failed to signal child process group with ${signal}: ${error.message}`);
          }
        }
      }
      child.kill?.(signal);
    };
    const terminateStuckChild = () => {
      if (settled) {
        return;
      }
      console.error(
        `[load-profile] command produced no output for ${options.childIdleTimeoutMs}ms; terminating stuck child process`
      );
      signalChild('SIGTERM');
      terminateTimer = setTimeout(() => {
        if (settled) {
          return;
        }
        console.error(`[load-profile] command did not exit ${options.childTerminateGraceMs}ms after SIGTERM; forcing failure`);
        signalChild('SIGKILL');
        finish(1);
      }, options.childTerminateGraceMs);
      terminateTimer.unref?.();
    };
    const resetIdleTimer = () => {
      if (!options.childIdleTimeoutMs || settled) {
        return;
      }
      if (idleTimer) {
        clearTimeout(idleTimer);
      }
      idleTimer = setTimeout(terminateStuckChild, options.childIdleTimeoutMs);
      idleTimer.unref?.();
    };
    const pipeChildOutput = (stream, destination) => {
      stream?.on('data', (chunk) => {
        resetIdleTimer();
        destination.write(chunk);
      });
    };

    child = spawnProcess(commandArgs[0], commandArgs.slice(1), {
      env: {
        ...process.env,
        PLAYWRIGHT_REPORT_FOLDER: options.reportFolder,
      },
      detached: process.platform !== 'win32' && monitorChildOutput,
      shell: process.platform === 'win32',
      stdio: monitorChildOutput ? ['inherit', 'pipe', 'pipe'] : 'inherit',
    });
    resetIdleTimer();
    if (monitorChildOutput) {
      pipeChildOutput(child.stdout, process.stdout);
      pipeChildOutput(child.stderr, process.stderr);
    }
    child.on('error', (error) => {
      console.error(`[load-profile] failed to start command: ${error.message}`);
      finish(1);
    });
    child.on('exit', (code, signal) => {
      if (settled || signal || !options.childCloseGraceMs) {
        return;
      }
      closeGraceTimer = setTimeout(() => {
        if (settled) {
          return;
        }
        console.error(
          `[load-profile] command exited with code ${code ?? 1} but stdio did not close within ${
            options.childCloseGraceMs
          }ms; continuing`
        );
        finish(code ?? 1);
      }, options.childCloseGraceMs);
      closeGraceTimer.unref?.();
    });
    child.on('close', (code, signal) => {
      if (signal) {
        console.error(`[load-profile] command terminated by signal ${signal}`);
        finish(1);
      } else {
        finish(code ?? 1);
      }
    });
  });

  clearInterval(timer);
  samples.push(sample());
  const summary = buildSummary(metadata, samples, exitCode, readTimelineEvents(options.eventsFile));
  writeProfileArtifacts(options.outputFolder, summary, samples);

  if (options.injectOdhin) {
    normalizeReportFolders(options).forEach((reportFolder) => {
      injectLoadProfileIntoOdhin(
        reportFolder,
        summary,
        samples,
        path.relative(reportFolder, path.join(options.outputFolder, REPORT_FILE)),
        { odhinTab: options.odhinTab }
      );
    });
  }

  return exitCode;
}

async function runUntilStopFile(options) {
  if (!options.stopFile) {
    throw new Error('No command supplied. Use: node scripts/playwright-load-monitor.js -- <command> [args...]');
  }

  const metadata = buildMetadata(['jenkins-functional-stages'], options);
  const samples = [];
  const sample = createSampler(metadata);
  samples.push(sample());

  const exitCode = await new Promise((resolve) => {
    let settled = false;
    const finish = (code) => {
      if (settled) {
        return;
      }
      settled = true;
      clearInterval(sampleTimer);
      clearInterval(stopTimer);
      resolve(code);
    };
    const sampleTimer = setInterval(() => samples.push(sample()), options.sampleIntervalMs);
    const stopTimer = setInterval(
      () => {
        if (fs.existsSync(options.stopFile)) {
          finish(0);
        }
      },
      Math.min(options.sampleIntervalMs, 1000)
    );

    const stopOnSignal = () => finish(0);
    process.once('SIGTERM', stopOnSignal);
    process.once('SIGINT', stopOnSignal);
  });

  samples.push(sample());
  const summary = buildSummary(metadata, samples, exitCode, readTimelineEvents(options.eventsFile));
  writeProfileArtifacts(options.outputFolder, summary, samples);
  return exitCode;
}

function buildMetadata(commandArgs, options) {
  const cgroupCpuLimit = resolveCgroupCpuLimit();
  const cgroupMemoryLimitBytes = resolveCgroupMemoryLimitBytes();
  const logicalCpuCount = os.cpus().length || 1;
  const effectiveCpuCount = cgroupCpuLimit ? Math.max(1, Math.min(logicalCpuCount, cgroupCpuLimit)) : logicalCpuCount;
  return {
    command: commandArgs,
    label: options.label,
    hostname: os.hostname(),
    platform: `${process.platform} ${os.release()}`,
    pid: process.pid,
    startTime: new Date().toISOString(),
    startEpochMs: Date.now(),
    sampleIntervalMs: options.sampleIntervalMs,
    childIdleTimeoutMs: options.childIdleTimeoutMs,
    childTerminateGraceMs: options.childTerminateGraceMs,
    logicalCpuCount,
    effectiveCpuCount: round(effectiveCpuCount),
    totalMemoryBytes: os.totalmem(),
    cgroupCpuLimit: cgroupCpuLimit ? round(cgroupCpuLimit) : undefined,
    cgroupMemoryLimitBytes,
    memoryLimitSource: cgroupMemoryLimitBytes ? 'cgroup' : 'host',
    ci: Boolean(process.env.CI),
    workers:
      process.env.FUNCTIONAL_TESTS_WORKERS ??
      commandArgs.find((arg) => arg.startsWith('--workers='))?.replace('--workers=', '') ??
      'config-default',
    shard: commandArgs.find((arg) => arg.startsWith('--shard='))?.replace('--shard=', '') ?? process.env.PLAYWRIGHT_SHARD ?? '',
  };
}

function buildSummary(metadata, samples, exitCode, externalEvents = []) {
  const endEpochMs = Date.now();
  const durationMs = Math.max(0, endEpochMs - metadata.startEpochMs);
  const cpuValues = samples.map((sample) => sample.cpuPercent);
  const memoryValues = samples.map((sample) => sample.memoryUsedPercent);
  const loadPerCoreValues = samples.map((sample) => sample.load1PerCore);
  const pressureSignals = buildPressureSignals(samples);
  const timelineEvents = normalizeTimelineEvents(
    [...buildRunBoundaryEvents(metadata, endEpochMs), ...externalEvents],
    metadata.startEpochMs,
    endEpochMs
  );

  return {
    ...metadata,
    endTime: new Date(endEpochMs).toISOString(),
    endEpochMs,
    durationMs,
    exitCode,
    sampleCount: samples.length,
    cpu: summarizeValues(cpuValues),
    memory: summarizeValues(memoryValues),
    load1PerCore: summarizeValues(loadPerCoreValues),
    pressureSignals,
    timelineEvents,
    recommendation: buildRecommendation(pressureSignals),
  };
}

function buildRunBoundaryEvents(metadata, endEpochMs) {
  const label = metadata.label || 'Playwright run';
  return [
    {
      label,
      type: 'start',
      epochMs: metadata.startEpochMs,
      timestamp: new Date(metadata.startEpochMs).toISOString(),
      source: 'load-profile',
    },
    {
      label,
      type: 'finish',
      epochMs: endEpochMs,
      timestamp: new Date(endEpochMs).toISOString(),
      source: 'load-profile',
    },
  ];
}

function readTimelineEvents(eventsFile) {
  if (!eventsFile || !fs.existsSync(eventsFile)) {
    return [];
  }

  try {
    const content = fs.readFileSync(eventsFile, 'utf8').trim();
    if (!content) {
      return [];
    }

    if (content.startsWith('[')) {
      return JSON.parse(content);
    }

    return content
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch (error) {
    console.warn(`[load-profile] failed to read timeline events from ${eventsFile}: ${error.message}`);
    return [];
  }
}

function normalizeTimelineEvents(events, startEpochMs, endEpochMs) {
  return events
    .map((event) => {
      const epochMs = resolveEventEpochMs(event);
      return {
        label: String(event.label ?? event.name ?? 'event'),
        type: String(event.type ?? event.phase ?? 'mark'),
        timestamp: Number.isFinite(epochMs) ? new Date(epochMs).toISOString() : '',
        epochMs,
        elapsedMs: Number.isFinite(epochMs) ? epochMs - startEpochMs : undefined,
        inRange: Number.isFinite(epochMs) && epochMs >= startEpochMs && epochMs <= endEpochMs,
        source: event.source ? String(event.source) : undefined,
      };
    })
    .filter((event) => Number.isFinite(event.epochMs))
    .sort((left, right) => left.epochMs - right.epochMs);
}

function resolveEventEpochMs(event) {
  const epochMs = Number(event.epochMs ?? event.timeMs ?? event.timestampMs);
  if (Number.isFinite(epochMs)) {
    return epochMs;
  }

  const parsedTimestamp = Date.parse(event.timestamp ?? event.time ?? '');
  return Number.isFinite(parsedTimestamp) ? parsedTimestamp : undefined;
}

function buildPressureSignals(samples) {
  const memoryPressureThresholdPercent =
    samples.find((sample) => Number.isFinite(sample.memoryPressureThresholdPercent))?.memoryPressureThresholdPercent ?? 85;
  const sustainedCpuSamples = samples.filter((sample) => sample.cpuPercent >= 85).length;
  const sustainedLoadSamples = samples.filter((sample) => sample.load1PerCore >= 1.5).length;
  const sustainedMemorySamples = samples.filter((sample) => sample.memoryUsedPercent >= memoryPressureThresholdPercent).length;
  const ratio = (count) => (samples.length ? count / samples.length : 0);
  return {
    cpuSaturated: ratio(sustainedCpuSamples) >= 0.2,
    loadSaturated: ratio(sustainedLoadSamples) >= 0.2,
    memoryPressure: ratio(sustainedMemorySamples) >= 0.2,
    memoryPressureThresholdPercent,
    cpuSaturatedSamplePercent: round(ratio(sustainedCpuSamples) * 100),
    loadSaturatedSamplePercent: round(ratio(sustainedLoadSamples) * 100),
    memoryPressureSamplePercent: round(ratio(sustainedMemorySamples) * 100),
  };
}

function buildRecommendation(pressureSignals) {
  if (pressureSignals.memoryPressure) {
    return 'Memory pressure detected. Reduce workers or shard before increasing parallelism.';
  }
  if (pressureSignals.cpuSaturated || pressureSignals.loadSaturated) {
    return 'CPU/load saturation detected. Current worker count is at or beyond this agent capacity.';
  }
  return 'No sustained host saturation detected. Failures in this run are less likely to be caused by local agent capacity.';
}

function summarizeValues(values) {
  const sorted = [...values].sort((left, right) => left - right);
  return {
    min: round(sorted[0] ?? 0),
    max: round(sorted[sorted.length - 1] ?? 0),
    average: round(sorted.reduce((sum, value) => sum + value, 0) / Math.max(1, sorted.length)),
    p95: round(sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))] ?? 0),
  };
}

function writeProfileArtifacts(outputFolder, summary, samples) {
  fs.mkdirSync(outputFolder, { recursive: true });
  fs.writeFileSync(path.join(outputFolder, SUMMARY_FILE), `${JSON.stringify(summary, null, 2)}\n`);
  fs.writeFileSync(path.join(outputFolder, SAMPLES_FILE), `${JSON.stringify(samples, null, 2)}\n`);
  fs.writeFileSync(path.join(outputFolder, REPORT_FILE), buildLoadProfileHtml(summary, samples));
}

function injectLoadProfileIntoOdhin(reportFolder, summary, samples, relativeProfilePath, options = {}) {
  if (!reportFolder || !fs.existsSync(reportFolder)) {
    console.warn(`[load-profile] Odhín report folder not found: ${reportFolder}`);
    return;
  }

  const files = fs.readdirSync(reportFolder).filter((fileName) => fileName.toLowerCase().endsWith('.html'));
  files.forEach((fileName) => {
    const filePath = path.join(reportFolder, fileName);
    let html = fs.readFileSync(filePath, 'utf8');
    if (!html.includes('id="TabDashboard"')) {
      return;
    }
    html = html.replace(
      /<div class="row ms-3 me-3">\s*<div class="col-12[^>]*>\s*<div class="mt-3 mb-3 odhin-thin-border dashboard-block" id="odhin-system-load-profile">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/m,
      ''
    );
    if (options.odhinTab !== false) {
      html = injectLoadProfileTab(html, summary, samples, relativeProfilePath);
    } else {
      html = removeLoadProfileTab(html);
    }
    fs.writeFileSync(filePath, html, 'utf8');
  });
}

function injectLoadProfileTab(html, summary, samples, relativeProfilePath) {
  let updatedHtml = removeLoadProfileTab(html);
  const button = `
      <button
        class="main-tablinks"
        onclick="openMainTab(event, '${ODHIN_LOAD_TAB_ID}')"
      >
        System Load
      </button>`;
  const testsButtonPattern = /(\s*<button\b[\s\S]*?onclick="openMainTab\(event,\s*'TabTests'\)"[\s\S]*?<\/button>)/m;
  if (testsButtonPattern.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(testsButtonPattern, `$1${button}`);
  }

  const systemLoadTab = buildOdhinLoadTab(summary, samples, relativeProfilePath);
  const bodyEndPattern = /(\s*<\/body>)/m;
  if (bodyEndPattern.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(bodyEndPattern, `${systemLoadTab}$1`);
  } else {
    updatedHtml += systemLoadTab;
  }
  return updatedHtml;
}

function removeLoadProfileTab(html) {
  return html
    .replace(/\s*<button\b[\s\S]*?onclick="openMainTab\(event,\s*'TabSystemLoad'\)"[\s\S]*?<\/button>/m, '')
    .replace(/\s*<!-- odhin-system-load-tab:start -->[\s\S]*?<!-- odhin-system-load-tab:end -->/m, '');
}

function buildOdhinLoadTab(summary, samples, relativeProfilePath) {
  return `
          <!-- odhin-system-load-tab:start -->
          <div id="${ODHIN_LOAD_TAB_ID}" style="display: none" class="main-tabcontent">
            <div class="row ms-3 me-3">
              <div class="col-12">
                <div class="mt-3 mb-3 odhin-thin-border dashboard-block" id="odhin-system-load-profile-tab">
                  <div class="info-box-header">System Load Profile</div>
                  <p class="text-secondary-emphasis small mb-2 ps-2">
                    ${escapeHtml(summary.recommendation)}
                  </p>
                  <div class="odhin-table">
                    ${buildInlineSvgChart(samples, summary.timelineEvents)}
                    ${buildTimelinePhaseTimingTable(summary.timelineEvents)}
                    ${buildSummaryTable(summary, relativeProfilePath)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- odhin-system-load-tab:end -->`;
}

function buildLoadProfileHtml(summary, samples) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Playwright load profile</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; color: #172b4d; }
    table { border-collapse: collapse; width: 100%; margin-top: 16px; }
    th, td { border: 1px solid #d8e3ef; padding: 8px; text-align: left; }
    th { background: #f4f7fb; }
    .chart { max-width: 1100px; }
  </style>
</head>
<body>
  <h1>Playwright load profile</h1>
  <p>${escapeHtml(summary.recommendation)}</p>
  <div class="chart">${buildInlineSvgChart(samples, summary.timelineEvents)}</div>
  ${buildTimelinePhaseTimingTable(summary.timelineEvents)}
  ${buildSummaryTable(summary, '')}
</body>
</html>`;
}

function buildSummaryTable(summary, relativeProfilePath) {
  const rows = [
    ['Command', summary.command.join(' ')],
    ['Workers', summary.workers],
    ['Shard', summary.shard || 'none'],
    ['Duration', formatDuration(summary.durationMs)],
    ['CPU avg / p95 / max', `${summary.cpu.average}% / ${summary.cpu.p95}% / ${summary.cpu.max}%`],
    ['Load/core avg / p95 / max', `${summary.load1PerCore.average} / ${summary.load1PerCore.p95} / ${summary.load1PerCore.max}`],
    ['Memory avg / p95 / max', `${summary.memory.average}% / ${summary.memory.p95}% / ${summary.memory.max}%`],
    ['Effective CPU cores', summary.effectiveCpuCount],
    ['Memory limit', formatBytes(summary.cgroupMemoryLimitBytes ?? summary.totalMemoryBytes)],
    ['Samples', summary.sampleCount],
  ];

  if (relativeProfilePath) {
    rows.push(['Standalone profile', `<a href="${escapeHtml(relativeProfilePath)}">open load-profile.html</a>`]);
  }
  if (summary.timelineEvents?.length) {
    rows.push(['Timeline events', buildTimelineEventList(summary.timelineEvents)]);
  }

  return `<div class="table-responsive">
    <table class="table table-sm mb-0 testcase-run-info-table">
      <tbody>
        ${rows
          .map(
            ([label, value]) => `<tr>
              <td class="fs-6 text-secondary-emphasis text-start summary-row-left-column">${escapeHtml(label)}</td>
              <td class="text-secondary-emphasis">${isSafeInlineHtml(value) ? value : escapeHtml(value)}</td>
            </tr>`
          )
          .join('\n')}
      </tbody>
    </table>
  </div>`;
}

function buildTimelineEventList(events) {
  const items = events
    .map((event) => {
      const rangeLabel = event.inRange ? formatDuration(event.elapsedMs) : 'outside profile window';
      return `<li>${escapeHtml(event.label)} ${escapeHtml(event.type)} (${escapeHtml(rangeLabel)})</li>`;
    })
    .join('');
  return `<ul class="mb-0 ps-3">${items}</ul>`;
}

function buildTimelinePhaseTimingTable(events = []) {
  const phases = buildTimelinePhases(events);
  if (!phases.length) {
    return '';
  }

  const rows = phases
    .map(
      (phase) => `<tr>
        <td><span style="display:inline-block;width:10px;height:10px;background:${phase.color};margin-right:6px"></span>${escapeHtml(phase.label)}</td>
        <td>${escapeHtml(formatDuration(phase.startElapsedMs))}</td>
        <td>${escapeHtml(formatDuration(phase.endElapsedMs))}</td>
        <td>${escapeHtml(formatDuration(phase.durationMs))}</td>
      </tr>`
    )
    .join('\n');

  return `<div class="table-responsive">
    <table class="table table-sm testcase-run-info-table" style="margin-top:12px">
      <thead>
        <tr>
          <th>Phase</th>
          <th>Start</th>
          <th>End</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

function isSafeInlineHtml(value) {
  return String(value).startsWith('<a ') || String(value).startsWith('<ul ') || String(value).startsWith('<div ');
}

function buildInlineSvgChart(samples, timelineEvents = []) {
  const width = 900;
  const phases = buildTimelinePhases(timelineEvents);
  const markerBandHeight = phases.length ? 22 + phases.length * 24 : 48;
  const height = 242 + markerBandHeight;
  const padding = { top: markerBandHeight + 18, right: 24, bottom: 36, left: phases.length ? 92 : 44 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxElapsed = Math.max(...samples.map((sample) => sample.elapsedMs), 1);
  const toX = (elapsedMs) => padding.left + (elapsedMs / maxElapsed) * plotWidth;
  const toY = (value) => padding.top + (1 - clamp(value, 0, 100) / 100) * plotHeight;
  const points = (selector) =>
    samples
      .map((sample) => {
        const value = selector(sample);
        return `${round(toX(sample.elapsedMs))},${round(toY(value))}`;
      })
      .join(' ');
  const loadPoints = points((sample) => sample.load1PerCore * 100);
  const cpuPoints = points((sample) => sample.cpuPercent);
  const memoryPoints = points((sample) => sample.memoryUsedPercent);
  const eventMarkers = buildSvgEventMarkers(timelineEvents, maxElapsed, padding, plotWidth, plotHeight);
  const phaseLanes = buildSvgPhaseLanes(phases, maxElapsed, padding, plotWidth);

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="CPU memory and load profile" style="width:100%;max-height:${height}px;">
    <rect x="0" y="0" width="${width}" height="${height}" fill="#fff"></rect>
    <rect x="0" y="0" width="${width}" height="${markerBandHeight}" fill="#f4f8fb"></rect>
    <line x1="${padding.left}" y1="${markerBandHeight}" x2="${width - padding.right}" y2="${markerBandHeight}" stroke="#d8e3ef"></line>
    ${phaseLanes}
    <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="#d8e3ef"></line>
    <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="#d8e3ef"></line>
    <line x1="${padding.left}" y1="${toY(85)}" x2="${width - padding.right}" y2="${toY(85)}" stroke="#d4351c" stroke-dasharray="4 4" opacity="0.65"></line>
    <text x="6" y="${toY(100) + 4}" font-size="11" fill="#53657d">100%</text>
    <text x="12" y="${toY(85) + 4}" font-size="11" fill="#d4351c">85%</text>
    <text x="18" y="${toY(0) + 4}" font-size="11" fill="#53657d">0%</text>
    <polyline points="${cpuPoints}" fill="none" stroke="#1d70b8" stroke-width="2.5"></polyline>
    <polyline points="${memoryPoints}" fill="none" stroke="#00703c" stroke-width="2.5"></polyline>
    <polyline points="${loadPoints}" fill="none" stroke="#f47738" stroke-width="2.5"></polyline>
    ${eventMarkers}
    <g font-size="12" fill="#172b4d">
      <rect x="${padding.left}" y="${height - 24}" width="12" height="4" fill="#1d70b8"></rect><text x="${padding.left + 18}" y="${height - 19}">CPU %</text>
      <rect x="${padding.left + 90}" y="${height - 24}" width="12" height="4" fill="#00703c"></rect><text x="${padding.left + 108}" y="${height - 19}">Memory %</text>
      <rect x="${padding.left + 205}" y="${height - 24}" width="12" height="4" fill="#f47738"></rect><text x="${padding.left + 223}" y="${height - 19}">Load/core %</text>
    </g>
  </svg>`;
}

function buildTimelinePhases(events = []) {
  const usableEvents = events.filter(
    (event) => event.inRange && Number.isFinite(event.elapsedMs) && event.source !== 'load-profile'
  );
  const labels = [...new Set(usableEvents.map((event) => event.label))];

  return labels
    .map((label, index) => {
      const labelEvents = usableEvents.filter((event) => event.label === label);
      const startEvent = labelEvents.find((event) => event.type === 'start') ?? labelEvents[0];
      const endEvent =
        labelEvents.find((event) => ['finish', 'end', 'stop'].includes(event.type)) ?? labelEvents[labelEvents.length - 1];
      const startElapsedMs = startEvent.elapsedMs;
      const endElapsedMs = Math.max(startElapsedMs, endEvent.elapsedMs);
      return {
        label,
        startElapsedMs,
        endElapsedMs,
        durationMs: endElapsedMs - startElapsedMs,
        color: timelineEventColor(label, index),
      };
    })
    .filter((phase) => Number.isFinite(phase.startElapsedMs) && Number.isFinite(phase.endElapsedMs));
}

function buildSvgPhaseLanes(phases, maxElapsed, padding, plotWidth) {
  if (!phases.length) {
    return '';
  }

  return phases
    .map((phase, index) => {
      const y = 22 + index * 24;
      const startX = round(padding.left + (phase.startElapsedMs / maxElapsed) * plotWidth);
      const endX = round(padding.left + (phase.endElapsedMs / maxElapsed) * plotWidth);
      return `<g>
        <text x="6" y="${y + 4}" font-size="12" font-weight="700" fill="${phase.color}">${escapeHtml(phase.label)}</text>
        <line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" stroke="${phase.color}" stroke-width="4" stroke-linecap="round"></line>
        <circle cx="${startX}" cy="${y}" r="4" fill="${phase.color}"></circle>
        <circle cx="${endX}" cy="${y}" r="4" fill="${phase.color}"></circle>
        <text x="${startX + 6}" y="${y - 6}" font-size="11" font-weight="700" fill="${phase.color}">start</text>
        <text x="${endX + 6}" y="${y + 14}" font-size="11" font-weight="700" fill="${phase.color}">end</text>
      </g>`;
    })
    .join('\n');
}

function buildSvgEventMarkers(events, maxElapsed, padding, plotWidth, plotHeight) {
  const inRangeEvents = events.filter(
    (event) => event.inRange && Number.isFinite(event.elapsedMs) && event.source !== 'load-profile'
  );
  if (!inRangeEvents.length) {
    return '';
  }
  return inRangeEvents
    .map((event, index) => {
      const x = round(padding.left + (event.elapsedMs / maxElapsed) * plotWidth);
      const color = timelineEventColor(event.label, index);
      const label = `${event.label} ${formatTimelineEventType(event.type)}`;
      return `<g>
        <line x1="${x}" y1="${padding.top}" x2="${x}" y2="${padding.top + plotHeight}" stroke="${color}" stroke-dasharray="3 3" opacity="0.8"></line>
        <title>${escapeHtml(label)} at ${escapeHtml(formatDuration(event.elapsedMs))}</title>
      </g>`;
    })
    .join('\n');
}

function formatTimelineEventType(type) {
  return type === 'finish' ? 'end' : type;
}

function timelineEventColor(label, index = 0) {
  const knownColors = {
    api: '#005ea5',
    integration: '#00703c',
    e2e: '#d4351c',
  };
  const fallbackColors = ['#4c2c92', '#f47738', '#28a197', '#b58840'];
  return knownColors[String(label).toLowerCase()] ?? fallbackColors[index % fallbackColors.length];
}

function formatDuration(durationMs) {
  const safeDuration = Math.max(0, Math.round(Number(durationMs) || 0));
  const minutes = Math.floor(safeDuration / 60000);
  const seconds = Math.floor((safeDuration % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) {
    return 'unknown';
  }
  const gib = bytes / 1024 ** 3;
  return `${round(gib)} GiB`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function round(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

if (require.main === module) {
  const { options, commandArgs } = parseArgs(process.argv.slice(2));
  const exitAfterFlush = (exitCode) => {
    process.exitCode = exitCode;
    setImmediate(() => process.exit(exitCode));
  };

  const runProfile = commandArgs.length ? runMonitoredCommand(commandArgs, options) : runUntilStopFile(options);

  runProfile
    .then((exitCode) => {
      console.log(`[load-profile] completed with exit code ${exitCode}`);
      exitAfterFlush(exitCode);
    })
    .catch((error) => {
      console.error(`[load-profile] ${error.message}`);
      exitAfterFlush(1);
    });
}

module.exports = {
  buildInlineSvgChart,
  buildLoadProfileHtml,
  buildMetadata,
  buildPressureSignals,
  buildRecommendation,
  buildSummary,
  formatBytes,
  injectLoadProfileIntoOdhin,
  parseArgs,
  summarizeValues,
  __test__: {
    buildSummaryTable,
    calculateCpuUsage,
    isCiLikeEnvironment,
    parsePositiveInteger,
    parseNonNegativeInteger,
    runMonitoredCommand,
    runUntilStopFile,
  },
};
