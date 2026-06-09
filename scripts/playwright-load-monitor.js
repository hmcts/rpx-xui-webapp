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

function parseArgs(argv) {
  const separatorIndex = argv.indexOf('--');
  const hasWrapperOptions = argv[0]?.startsWith('--');
  const optionArgs = separatorIndex >= 0 ? argv.slice(0, separatorIndex) : hasWrapperOptions ? argv : [];
  const commandArgs = separatorIndex >= 0 ? argv.slice(separatorIndex + 1) : hasWrapperOptions ? [] : argv;
  const defaultReportFolder = process.env.PLAYWRIGHT_REPORT_FOLDER ?? DEFAULT_REPORT_FOLDER;
  const options = {
    outputFolder: process.env.PW_LOAD_PROFILE_OUTPUT ?? DEFAULT_OUTPUT_FOLDER,
    reportFolder: defaultReportFolder,
    sampleIntervalMs: parsePositiveInteger(process.env.PW_LOAD_PROFILE_INTERVAL_MS, DEFAULT_SAMPLE_INTERVAL_MS),
    childIdleTimeoutMs: parseNonNegativeInteger(process.env.PW_LOAD_PROFILE_CHILD_IDLE_TIMEOUT_MS, DEFAULT_CHILD_IDLE_TIMEOUT_MS),
    childCloseGraceMs: parseNonNegativeInteger(process.env.PW_LOAD_PROFILE_CHILD_CLOSE_GRACE_MS, DEFAULT_CHILD_CLOSE_GRACE_MS),
    childTerminateGraceMs: parseNonNegativeInteger(
      process.env.PW_LOAD_PROFILE_CHILD_TERMINATE_GRACE_MS,
      DEFAULT_CHILD_TERMINATE_GRACE_MS
    ),
    label: process.env.PW_LOAD_PROFILE_LABEL ?? '',
    eventsFile: process.env.PW_LOAD_PROFILE_EVENTS_FILE ?? '',
    stopFile: process.env.PW_LOAD_PROFILE_STOP_FILE ?? '',
  };

  for (let index = 0; index < optionArgs.length; index += 1) {
    const arg = optionArgs[index];
    const next = optionArgs[index + 1];
    if (arg === '--output-folder' && next) {
      options.outputFolder = next;
      index += 1;
    } else if (arg === '--report-folder' && next) {
      options.reportFolder = next;
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

function buildLoadProfileHtml(summary, samples) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Playwright load profile</title>
  <style>
    :root {
      --ink: #102a43;
      --muted: #52667a;
      --panel: #ffffff;
      --page: #f4f7fb;
      --line: #d8e3ef;
      --soft-line: #e8eef6;
      --shadow: 0 10px 30px rgba(16, 42, 67, 0.08);
    }
    body { font-family: Arial, sans-serif; margin: 0; padding: 28px; color: var(--ink); background: var(--page); }
    h1 { margin: 0 0 12px; color: #0b1f3f; font-size: 32px; line-height: 1.15; }
    h2 { margin: 0 0 12px; color: #0b1f3f; font-size: 20px; line-height: 1.25; }
    .recommendation { margin: 0 0 18px; color: #0b1f3f; font-size: 16px; font-weight: 700; }
    table { border-collapse: collapse; width: 100%; max-width: 1160px; margin-top: 18px; background: var(--panel); box-shadow: var(--shadow); }
    th, td { border: 1px solid var(--line); padding: 9px 10px; text-align: left; }
    th { background: #eef4fb; }
    details summary { cursor: pointer; color: #1d70b8; font-weight: 700; }
    .chart { max-width: 1160px; margin-top: 18px; padding: 18px; border: 1px solid var(--line); border-radius: 10px; background: var(--panel); box-shadow: var(--shadow); }
    .stage-timeline { max-width: 1160px; margin: 18px 0 12px; padding: 18px; border: 1px solid var(--line); border-radius: 10px; background: var(--panel); box-shadow: var(--shadow); }
    .stage-row { display: grid; grid-template-columns: 230px minmax(320px, 1fr) 292px; gap: 16px; align-items: center; min-height: 42px; border-top: 1px solid var(--soft-line); }
    .stage-row:first-of-type { border-top: 0; }
    .stage-name { font-size: 13px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .stage-lane { position: relative; height: 26px; }
    .stage-lane::before { content: ""; position: absolute; left: 0; right: 0; top: 12px; height: 2px; background: #e3ebf4; border-radius: 999px; }
    .stage-bar { position: absolute; top: 10px; height: 6px; min-width: 6px; border-radius: 999px; box-shadow: 0 2px 6px rgba(16, 42, 67, 0.16); }
    .stage-dot { position: absolute; top: 6px; width: 14px; height: 14px; border-radius: 50%; transform: translateX(-50%); background: currentColor; box-shadow: 0 0 0 3px #fff, 0 1px 5px rgba(16, 42, 67, 0.24); }
    .stage-times { color: var(--muted); font-size: 11px; font-weight: 800; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
    .stage-time { padding: 5px 6px; border: 1px solid var(--line); border-radius: 999px; background: #f8fbff; text-align: center; white-space: nowrap; }
    .stage-axis { display: grid; grid-template-columns: 230px minmax(320px, 1fr) 292px; gap: 16px; margin-top: 12px; color: var(--muted); font-size: 12px; font-weight: 800; }
    .stage-axis-line { display: flex; justify-content: space-between; border-top: 1px solid #b8c7d9; padding-top: 8px; }
    @media (max-width: 760px) {
      .stage-row, .stage-axis { grid-template-columns: 1fr; gap: 4px; }
      .stage-times { grid-template-columns: 1fr 1fr; }
    }
  </style>
</head>
<body>
  <h1>Playwright load profile</h1>
  <p class="recommendation">${escapeHtml(summary.recommendation)}</p>
  ${buildTimelineOverview(summary.timelineEvents, summary.durationMs)}
  <div class="chart">${buildInlineSvgChart(samples, summary.timelineEvents)}</div>
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
  return `<details><summary>${events.length} raw timeline events</summary><ul class="mb-0 ps-3">${items}</ul></details>`;
}

function buildTimelineOverview(events = [], durationMs = 0) {
  const phases = buildTimelinePhases(events);
  if (!phases.length) {
    return '';
  }

  const maxElapsed = Math.max(durationMs, ...phases.map((phase) => phase.endElapsedMs), 1);
  const rows = phases
    .map((phase) => {
      const startPercent = round((phase.startElapsedMs / maxElapsed) * 100);
      const endPercent = round((phase.endElapsedMs / maxElapsed) * 100);
      const widthPercent = Math.max(0.5, endPercent - startPercent);
      return `<div class="stage-row">
        <div class="stage-name" style="color:${phase.color}" title="${escapeHtml(phase.label)}">${escapeHtml(phase.label)}</div>
        <div class="stage-lane" aria-label="${escapeHtml(phase.label)} from ${escapeHtml(
          formatDuration(phase.startElapsedMs)
        )} to ${escapeHtml(formatDuration(phase.endElapsedMs))}">
          <span class="stage-bar" style="left:${startPercent}%;width:${widthPercent}%;background:${phase.color}"></span>
          <span class="stage-dot" style="left:${startPercent}%;color:${phase.color}" title="start ${escapeHtml(
            formatDuration(phase.startElapsedMs)
          )}"></span>
          <span class="stage-dot" style="left:${endPercent}%;color:${phase.color}" title="end ${escapeHtml(
            formatDuration(phase.endElapsedMs)
          )}"></span>
        </div>
        <div class="stage-times">
          <span class="stage-time">Start ${escapeHtml(formatDuration(phase.startElapsedMs))}</span>
          <span class="stage-time">End ${escapeHtml(formatDuration(phase.endElapsedMs))}</span>
          <span class="stage-time">${escapeHtml(formatDuration(phase.durationMs))}</span>
        </div>
      </div>`;
    })
    .join('\n');

  return `<section class="stage-timeline" aria-label="CI stage timeline">
    <h2>CI stage timeline</h2>
    ${rows}
    <div class="stage-axis" aria-hidden="true">
      <span></span>
      <div class="stage-axis-line"><span>0m 0s</span><span>${escapeHtml(formatDuration(maxElapsed))}</span></div>
      <span></span>
    </div>
  </section>`;
}

function isSafeInlineHtml(value) {
  return (
    String(value).startsWith('<a ') ||
    String(value).startsWith('<ul ') ||
    String(value).startsWith('<div ') ||
    String(value).startsWith('<details>')
  );
}

function buildInlineSvgChart(samples, timelineEvents = []) {
  const width = 900;
  const height = 300;
  const padding = { top: 20, right: 24, bottom: 36, left: 52 };
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

  const gridMidY = round(toY(50));

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="CPU memory and load profile" style="width:100%;max-height:${height}px;background:#fff;">
    <rect x="0" y="0" width="${width}" height="${height}" fill="#fff"></rect>
    <rect x="${padding.left}" y="${padding.top}" width="${plotWidth}" height="${plotHeight}" fill="#fbfdff" rx="6"></rect>
    <line x1="${padding.left}" y1="${gridMidY}" x2="${width - padding.right}" y2="${gridMidY}" stroke="#e8eef6"></line>
    <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="#d8e3ef"></line>
    <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="#d8e3ef"></line>
    <line x1="${padding.left}" y1="${toY(85)}" x2="${width - padding.right}" y2="${toY(85)}" stroke="#d4351c" stroke-dasharray="4 4" opacity="0.65"></line>
    <text x="6" y="${toY(100) + 4}" font-size="11" fill="#53657d">100%</text>
    <text x="12" y="${toY(85) + 4}" font-size="11" fill="#d4351c">85%</text>
    <text x="18" y="${gridMidY + 4}" font-size="11" fill="#53657d">50%</text>
    <text x="18" y="${toY(0) + 4}" font-size="11" fill="#53657d">0%</text>
    <polyline points="${cpuPoints}" fill="none" stroke="#1d70b8" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"></polyline>
    <polyline points="${memoryPoints}" fill="none" stroke="#00703c" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"></polyline>
    <polyline points="${loadPoints}" fill="none" stroke="#f47738" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"></polyline>
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
