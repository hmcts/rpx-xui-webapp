/* eslint-disable @typescript-eslint/no-require-imports */
/* global Buffer, clearInterval, module, process, require, setInterval, URL */

const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const SCHEMA_VERSION = 'xui-playwright-evidence/v1';
const REPORT_FILE = 'xui-ci-evidence.json';
const MAX_TEXT_LENGTH = 2000;
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const MAX_LOAD_SAMPLES = 600;
const MAX_RETAINED_LOAD_SAMPLES = 20_000;
const MAX_RUN_DURATION_MS = 24 * 60 * 60 * 1000;
const SAFE_METHODS = new Set(['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT']);
const FORBIDDEN_TEXT = [
  /\b(?:authorization|proxy-authorization|cookie|set-cookie|password|passwd|client[_ -]?secret|access[_ -]?token|refresh[_ -]?token|api[_ -]?key|x?[-_]?xsrf[-_]?token|x?[-_]?csrf[-_]?token|token)\s*[:=]/i,
  /\bbearer\s+[a-z0-9._~+/=-]+/i,
  /\beyJ[a-zA-Z0-9_-]{8,}\.[a-zA-Z0-9_-]{8,}\.[a-zA-Z0-9_-]{8,}\b/,
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
];
const FORBIDDEN_KEYS = new Set([
  'authorization',
  'body',
  'command',
  'cookie',
  'cookies',
  'form',
  'header',
  'headers',
  'hostname',
  'osrelease',
  'password',
  'pid',
  'platform',
  'query',
  'rawrequest',
  'rawresponse',
  'request',
  'response',
  'stack',
  'stderr',
  'stdout',
]);

const round = (value) => Math.round(value * 100) / 100;

const finiteNumber = (value, minimum = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= minimum ? parsed : undefined;
};

const integer = (value, minimum = 0) => {
  const parsed = finiteNumber(value, minimum);
  return parsed === undefined ? undefined : Math.floor(parsed);
};

const boundedNumber = (value, minimum, maximum) => {
  const parsed = finiteNumber(value, minimum);
  return parsed !== undefined && parsed <= maximum ? parsed : undefined;
};

const sanitizeDiagnostic = (value) => {
  if (typeof value !== 'string') return undefined;
  const compact = value.replace(/\s+/g, ' ').trim();
  if (!compact || FORBIDDEN_TEXT.some((pattern) => pattern.test(compact))) return undefined;
  return compact
    .replaceAll(process.cwd(), '[workspace]')
    .replace(/\/Users\/[^/\s]+/g, '/Users/:user')
    .replace(/\b[0-9a-f]{8}-[0-9a-f-]{27,}\b/gi, ':id')
    .replace(/\b\d{8,}\b/g, ':id')
    .slice(0, MAX_TEXT_LENGTH);
};

const sanitizeLabel = (value, maxLength = 200) => {
  const safe = sanitizeDiagnostic(value);
  return safe?.slice(0, maxLength);
};

const sanitizeUrl = (value) => {
  if (typeof value !== 'string') return undefined;
  try {
    const parsed = new URL(value);
    if (!['http:', 'https:'].includes(parsed.protocol)) return undefined;
    const segments = parsed.pathname.split('/').map((segment) => {
      const decoded = decodeURIComponent(segment);
      if (
        /^\d{8,}$/.test(decoded) ||
        /^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(decoded) ||
        /^[a-z0-9_-]{24,}$/i.test(decoded) ||
        /@/.test(decoded)
      ) {
        return ':id';
      }
      return encodeURIComponent(decoded).replace(/%3A/gi, ':');
    });
    return { host: parsed.hostname.toLowerCase(), path: segments.join('/') || '/' };
  } catch {
    return undefined;
  }
};

const repositoryPath = (value) => {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  const trimmed = value.trim();
  const workspaceIndex = trimmed.indexOf(process.cwd());
  if (workspaceIndex >= 0)
    return trimmed
      .slice(workspaceIndex + process.cwd().length + 1)
      .replaceAll(path.sep, '/')
      .slice(0, 500);
  const marker = ['/playwright_tests_new/', '/playwright_tests/', '/src/', '/test/'].find((part) => trimmed.includes(part));
  if (marker)
    return trimmed
      .slice(trimmed.indexOf(marker) + 1)
      .replaceAll(path.sep, '/')
      .slice(0, 500);
  const relative = path.relative(process.cwd(), trimmed);
  const candidate =
    !path.isAbsolute(trimmed) || (!relative.startsWith('..') && !path.isAbsolute(relative))
      ? path.isAbsolute(trimmed)
        ? relative
        : trimmed
      : path.basename(trimmed);
  if (/\/(?:Users|home)\//.test(candidate)) return path.basename(candidate);
  return candidate.replaceAll(path.sep, '/').replace(/^\.\//, '').slice(0, 500);
};

const statusName = (status) =>
  ({
    passed: 'passed',
    failed: 'failed',
    timedOut: 'timed_out',
    interrupted: 'interrupted',
    skipped: 'skipped',
  })[status] ?? 'interrupted';

const stableHash = (value) => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');

const assertSafeEvidence = (value) => {
  const pending = [value];
  while (pending.length) {
    const current = pending.pop();
    if (!current || typeof current !== 'object') continue;
    for (const [key, child] of Object.entries(current)) {
      if (FORBIDDEN_KEYS.has(key.replace(/[-_]/g, '').toLowerCase())) {
        throw new Error('CI evidence rejected by xui-ci-allowlist/v1');
      }
      if (child && typeof child === 'object') pending.push(child);
    }
  }
  const serialized = JSON.stringify(value);
  if (FORBIDDEN_TEXT.some((pattern) => pattern.test(serialized))) {
    throw new Error('CI evidence rejected by xui-ci-allowlist/v1');
  }
};

const projectApiEntries = (entries) => {
  if (!Array.isArray(entries)) return [];
  return entries.flatMap((entry, eventOrder) => {
    if (!entry || typeof entry !== 'object') return [];
    const method = String(entry.method ?? '').toUpperCase();
    const target = sanitizeUrl(entry.url);
    if (!SAFE_METHODS.has(method) || !target) return [];
    const status = integer(entry.status);
    const duration = finiteNumber(entry.durationMs ?? entry.duration);
    const transportError = sanitizeLabel(entry.error ?? entry.errorText, 300);
    const signal = {
      type: 'network',
      method,
      host: target.host,
      path: target.path,
      ...(status === undefined ? {} : { status }),
      ...(duration === undefined ? {} : { duration_ms: duration }),
      ...(transportError ? { transport_error: transportError } : {}),
    };
    return [{ ...signal, signal_id: stableHash(signal), event_order: eventOrder }];
  });
};

const projectFailureData = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
  const data = value;
  const signals = [];
  const category = sanitizeLabel(data.failureType ?? data.failure_type, 100);
  const phase = sanitizeLabel(data.phaseMarker ?? data.phase ?? data.failurePhase, 100);
  const setup = sanitizeLabel(data.setupMarker ?? data.setup_marker, 100);
  const backendWait = ['yes', 'no'].includes(data.backendWait) ? data.backendWait : undefined;
  const location = repositoryPath(data.failureLocation ?? data.failure_location);
  const execution =
    data.executionSignals && typeof data.executionSignals === 'object'
      ? {
          main_frame: sanitizeUrl(data.executionSignals.lastMainFrameUrl),
          main_frame_navigation_count: integer(data.executionSignals.mainFrameNavigationCount),
          total_requests_observed: integer(data.executionSignals.totalRequestsObserved),
          backend_requests_observed: integer(data.executionSignals.backendRequestsObserved),
        }
      : undefined;
  if (category || phase || setup || backendWait || location || execution) {
    const signal = {
      type: 'source_assessment',
      producer: 'xui-ci-evidence-reporter',
      producer_version: '1',
      source_attachment: 'failure-data.json',
      ...(category ? { category } : {}),
      ...(phase ? { phase } : {}),
      ...(setup ? { setup } : {}),
      ...(backendWait ? { backend_wait: backendWait } : {}),
      ...(location ? { location } : {}),
      ...(execution ? { execution } : {}),
      ...(data.networkTimeout === true ? { network_timeout: true } : {}),
    };
    signals.push(signal);
  }

  for (const key of ['serverErrors', 'clientErrors', 'slowCalls', 'failedRequests', 'apiErrors']) {
    signals.push(...projectApiEntries(data[key]));
  }
  return signals.map((signal, eventOrder) => ({
    ...signal,
    signal_id: signal.signal_id ?? stableHash(signal),
    event_order: eventOrder,
  }));
};

const readAttachmentJson = (attachment) => {
  try {
    if (attachment.body) {
      const body = Buffer.isBuffer(attachment.body) ? attachment.body : Buffer.from(String(attachment.body));
      if (body.length > MAX_ATTACHMENT_BYTES) return undefined;
      return JSON.parse(body.toString('utf8'));
    }
    if (attachment.path) {
      const stats = fs.statSync(attachment.path);
      if (!stats.isFile() || stats.size > MAX_ATTACHMENT_BYTES) return undefined;
      return JSON.parse(fs.readFileSync(attachment.path, 'utf8'));
    }
  } catch {
    return undefined;
  }
  return undefined;
};

const extractSignals = (attachments) => {
  if (!Array.isArray(attachments)) return [];
  const signals = [];
  for (const attachment of attachments) {
    const name = path.basename(String(attachment?.name ?? attachment?.path ?? '')).toLowerCase();
    if (name === 'node-api-calls.json' || name === 'api-calls.json') {
      signals.push(...projectApiEntries(readAttachmentJson(attachment)));
    } else if (name === 'failure-data.json') {
      const data = readAttachmentJson(attachment);
      for (const item of Array.isArray(data) ? data : [data]) {
        signals.push(...projectFailureData(item));
      }
    }
  }
  const seen = new Set();
  return signals
    .filter((signal) => {
      const key = stableHash(signal);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((signal, eventOrder) => ({ ...signal, event_order: eventOrder }));
};

const projectError = (error) => {
  if (!error || typeof error !== 'object') return undefined;
  const diagnostic = String(error.message ?? error.value ?? error.name ?? '');
  const category = /\b(?:timeout|timed out|etimedout)\b/i.test(diagnostic)
    ? 'timeout'
    : /(?:\bexpect\b|\bexpected\b|\bexpectation\b|\bassert\b|\bassertion\b|expect\s*\()/i.test(diagnostic)
      ? 'assertion'
      : /\b(?:target page|browser|context) (?:has been )?closed\b/i.test(diagnostic)
        ? 'browser_closed'
        : /\b(?:worker (?:exited|crashed)|heap out of memory|out of memory)\b/i.test(diagnostic)
          ? 'worker_failure'
          : /\b(?:session capture|sessioncaptureerror|identity lease|storage state|idam login)\b/i.test(diagnostic)
            ? 'session_acquisition'
            : 'other';
  const location =
    error.location && typeof error.location === 'object'
      ? {
          file: repositoryPath(error.location.file),
          line: integer(error.location.line, 1),
          column: integer(error.location.column, 1),
        }
      : undefined;
  return {
    category,
    ...(location?.file ? { location } : {}),
  };
};

const deriveResultSignals = (result, errors) => {
  const diagnostic = errors.map((error) => `${error?.name ?? ''} ${error?.message ?? error?.value ?? ''}`).join(' ');
  const signals = [];
  if (result.status === 'timedOut') signals.push({ type: 'runner', category: 'test_timeout' });
  if (/(?:\bexpect\b|\bexpected\b|\bexpectation\b|\bassert\b|\bassertion\b|expect\s*\()/i.test(diagnostic)) {
    signals.push({ type: 'assertion', category: 'expectation_mismatch' });
  }
  if (/\b(?:target page|browser|context) (?:has been )?closed\b/i.test(diagnostic)) {
    signals.push({ type: 'runner', category: 'browser_closed' });
  }
  if (/\b(?:worker (?:exited|crashed)|heap out of memory|out of memory)\b/i.test(diagnostic)) {
    signals.push({ type: 'runner', category: 'worker_failure' });
  }
  if (/\b(?:session capture|sessioncaptureerror|identity lease|storage state|idam login)\b/i.test(diagnostic)) {
    signals.push({ type: 'session', category: 'session_acquisition' });
  }
  return signals;
};

const mergeSignals = (...groups) => {
  const seen = new Set();
  return groups.flat().flatMap((signal) => {
    if (!signal || typeof signal !== 'object') return [];
    const fact = { ...signal };
    delete fact.event_order;
    delete fact.signal_id;
    const signalId = signal.signal_id ?? stableHash(fact);
    if (seen.has(signalId)) return [];
    seen.add(signalId);
    return [{ ...fact, signal_id: signalId, event_order: seen.size - 1 }];
  });
};

const collectFailedSteps = (steps, output = []) => {
  if (!Array.isArray(steps)) return output;
  for (const step of steps) {
    if (!step || typeof step !== 'object') continue;
    if (step.error) {
      const title = sanitizeLabel(step.title, 300);
      const category = sanitizeLabel(step.category, 100);
      const error = projectError(step.error);
      output.push({
        ...(title ? { title } : {}),
        ...(category ? { category } : {}),
        ...(finiteNumber(step.duration) === undefined ? {} : { duration_ms: finiteNumber(step.duration) }),
        ...(error ? { error } : {}),
      });
    }
    collectFailedSteps(step.steps, output);
  }
  return output.slice(0, 50);
};

const projectAttempt = (result) => {
  const rawErrors = [...(Array.isArray(result.errors) ? result.errors : []), ...(result.error ? [result.error] : [])];
  const errors = rawErrors.map(projectError).filter(Boolean).slice(0, 10);
  return {
    retry: integer(result.retry) ?? 0,
    status: statusName(result.status),
    duration_ms: finiteNumber(result.duration) ?? 0,
    ...(result.startTime instanceof Date && Number.isFinite(result.startTime.getTime())
      ? { started_at: result.startTime.toISOString() }
      : {}),
    ...(errors.length ? { errors } : {}),
    failed_steps: collectFailedSteps(result.steps),
    signals: mergeSignals(extractSignals(result.attachments), deriveResultSignals(result, rawErrors)),
  };
};

const normalizeSummary = (value, maximum) => {
  if (!value || typeof value !== 'object') return { min: 0, average: 0, p95: 0, max: 0 };
  return {
    min: round(boundedNumber(value.min, 0, maximum) ?? 0),
    average: round(boundedNumber(value.average, 0, maximum) ?? 0),
    p95: round(boundedNumber(value.p95, 0, maximum) ?? 0),
    max: round(boundedNumber(value.max, 0, maximum) ?? 0),
  };
};

const downsample = (values, limit = MAX_LOAD_SAMPLES) => {
  if (!Array.isArray(values) || values.length <= limit) return Array.isArray(values) ? values : [];
  return Array.from({ length: limit }, (_, index) => values[Math.round((index * (values.length - 1)) / (limit - 1))]);
};

const summarizeValues = (values) => {
  const sorted = values.filter(Number.isFinite).sort((left, right) => left - right);
  return {
    min: round(sorted[0] ?? 0),
    average: round(sorted.reduce((sum, value) => sum + value, 0) / Math.max(1, sorted.length)),
    p95: round(sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))] ?? 0),
    max: round(sorted.at(-1) ?? 0),
  };
};

const readFirstExistingFile = (filePaths) => {
  for (const filePath of filePaths) {
    try {
      if (fs.existsSync(filePath)) return fs.readFileSync(filePath, 'utf8').trim();
    } catch {
      // Best-effort telemetry only.
    }
  }
  return undefined;
};

const resolveLoadMetadata = () => {
  const logicalCpuCount = os.cpus().length || 1;
  const cpuMax = readFirstExistingFile(['/sys/fs/cgroup/cpu.max']);
  const [quotaRaw, periodRaw] = cpuMax?.split(/\s+/) ?? [];
  const quota = Number(quotaRaw);
  const period = Number(periodRaw);
  const cgroupCpuLimit = quotaRaw !== 'max' && quota > 0 && period > 0 ? quota / period : undefined;
  const rawMemoryLimit = readFirstExistingFile(['/sys/fs/cgroup/memory.max', '/sys/fs/cgroup/memory/memory.limit_in_bytes']);
  const parsedMemoryLimit = Number(rawMemoryLimit);
  const cgroupMemoryLimit =
    rawMemoryLimit !== 'max' && parsedMemoryLimit > 0 && parsedMemoryLimit <= os.totalmem() * 2 ? parsedMemoryLimit : undefined;
  return {
    effectiveCpuCount: round(cgroupCpuLimit ? Math.max(1, Math.min(logicalCpuCount, cgroupCpuLimit)) : logicalCpuCount),
    memoryLimitBytes: cgroupMemoryLimit ?? os.totalmem(),
    memoryLimitSource: cgroupMemoryLimit ? 'cgroup' : 'host',
  };
};

const getCpuTimes = () =>
  os.cpus().reduce(
    (total, cpu) => ({
      idle: total.idle + cpu.times.idle,
      all: total.all + cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq,
    }),
    { idle: 0, all: 0 }
  );

const createSystemSampler = (metadata) => {
  let previousCpuTimes;
  return (elapsedMs) => {
    const currentCpuTimes = getCpuTimes();
    const idleDelta = previousCpuTimes ? currentCpuTimes.idle - previousCpuTimes.idle : 0;
    const totalDelta = previousCpuTimes ? currentCpuTimes.all - previousCpuTimes.all : 0;
    previousCpuTimes = currentCpuTimes;
    const cpuPercent = totalDelta > 0 ? Math.min(100, Math.max(0, ((totalDelta - idleDelta) / totalDelta) * 100)) : 0;
    const rawMemoryCurrent =
      metadata.memoryLimitSource === 'cgroup'
        ? readFirstExistingFile(['/sys/fs/cgroup/memory.current', '/sys/fs/cgroup/memory/memory.usage_in_bytes'])
        : undefined;
    const parsedMemoryCurrent = Number(rawMemoryCurrent);
    const usedMemory =
      Number.isFinite(parsedMemoryCurrent) && parsedMemoryCurrent >= 0 ? parsedMemoryCurrent : os.totalmem() - os.freemem();
    return {
      elapsedMs,
      cpuPercent: round(cpuPercent),
      memoryUsedPercent: round(Math.min(100, Math.max(0, (usedMemory / metadata.memoryLimitBytes) * 100))),
      load1PerCore: round(os.loadavg()[0] / metadata.effectiveCpuCount),
    };
  };
};

const buildSampledLoadProfile = (metadata, samples, sampleIntervalMs, durationMs, workers) => {
  const memoryThreshold = metadata.memoryLimitSource === 'cgroup' ? 85 : 99.5;
  const ratio = (count) => count / Math.max(1, samples.length);
  return buildSafeLoadProfile(
    {
      sampleIntervalMs,
      durationMs,
      sampleCount: samples.length,
      truncated: samples.length >= MAX_RETAINED_LOAD_SAMPLES,
      effectiveCpuCount: metadata.effectiveCpuCount,
      cgroupMemoryLimitBytes: metadata.memoryLimitBytes,
      workers,
      cpu: summarizeValues(samples.map((sample) => sample.cpuPercent)),
      memory: summarizeValues(samples.map((sample) => sample.memoryUsedPercent)),
      load1PerCore: summarizeValues(samples.map((sample) => sample.load1PerCore)),
      pressureSignals: {
        cpuSaturated: ratio(samples.filter((sample) => sample.cpuPercent >= 85).length) >= 0.2,
        loadSaturated: ratio(samples.filter((sample) => sample.load1PerCore >= 1.5).length) >= 0.2,
        memoryPressure: ratio(samples.filter((sample) => sample.memoryUsedPercent >= memoryThreshold).length) >= 0.2,
      },
    },
    samples
  );
};

const buildSafeLoadProfile = (summary, samples) => {
  const timeline = downsample(
    (Array.isArray(samples) ? samples : []).slice(0, MAX_RETAINED_LOAD_SAMPLES).map((sample, seq) => ({ sample, seq }))
  ).flatMap(({ sample, seq }) => {
    if (!sample || typeof sample !== 'object') return [];
    const elapsed = integer(sample.elapsedMs);
    const cpu = boundedNumber(sample.cpuPercent, 0, 100);
    const memory = boundedNumber(sample.memoryUsedPercent, 0, 100);
    const load = boundedNumber(sample.load1PerCore, 0, 64);
    if ([elapsed, cpu, memory, load].some((value) => value === undefined)) return [];
    return [
      {
        seq,
        elapsed_ms: elapsed,
        cpu_percent: round(cpu),
        memory_percent: round(memory),
        load1_per_core: round(load),
      },
    ];
  });
  const pressure = summary.pressureSignals && typeof summary.pressureSignals === 'object' ? summary.pressureSignals : {};
  return {
    sample_interval_ms: boundedNumber(summary.sampleIntervalMs, 250, 60_000) ?? 2000,
    duration_ms: boundedNumber(summary.durationMs, 0, MAX_RUN_DURATION_MS) ?? 0,
    sample_count: Math.min(
      MAX_RETAINED_LOAD_SAMPLES,
      integer(summary.sampleCount) ?? (Array.isArray(samples) ? samples.length : 0)
    ),
    truncated: summary.truncated === true || (integer(summary.sampleCount) ?? 0) > MAX_RETAINED_LOAD_SAMPLES,
    worker_count: integer(summary.workers, 1) ?? null,
    summary: {
      cpu_percent: normalizeSummary(summary.cpu, 100),
      memory_percent: normalizeSummary(summary.memory, 100),
      load1_per_core: normalizeSummary(summary.load1PerCore, 64),
    },
    pressure: {
      cpu_saturated: pressure.cpuSaturated === true,
      load_saturated: pressure.loadSaturated === true,
      memory_pressure: pressure.memoryPressure === true,
    },
    timeline,
  };
};

const applyContentHash = (document) => {
  delete document.document.content_sha256;
  document.document.content_sha256 = stableHash(document);
  return document;
};

const writeJsonAtomic = (filePath, value) => {
  assertSafeEvidence(value);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporary = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, { encoding: 'utf8', mode: 0o600 });
  fs.renameSync(temporary, filePath);
};

const projectName = (testCase) => {
  try {
    return sanitizeLabel(testCase.parent?.project?.().name, 200) ?? 'unknown';
  } catch {
    return 'unknown';
  }
};

const inferSuite = (outputFolder) => {
  const normalized = String(outputFolder).toLowerCase();
  if (normalized.includes('integration-nightly')) return 'integration-nightly';
  if (normalized.includes('integration')) return 'integration';
  if (/(?:^|[/_-])api(?:[/_-]|$)/.test(normalized)) return 'api';
  if (/(?:^|[/_-])(?:playwright-)?(?:e2e|ui)(?:[/_-]|$)/.test(normalized)) return 'e2e';
  return 'playwright';
};

const resolveRepository = (options, env) => {
  const configured = options.repository ?? env.GITHUB_REPOSITORY?.split('/').pop() ?? env.REPOSITORY_NAME;
  return sanitizeLabel(configured, 200) ?? path.basename(process.cwd());
};

const resolveCorrelation = (repository, env) => {
  const branch = sanitizeLabel(env.GIT_BRANCH ?? env.BRANCH_NAME ?? env.GITHUB_HEAD_REF, 300);
  const sha = /^[a-f0-9]{7,64}$/i.test(String(env.GIT_COMMIT ?? env.GITHUB_SHA ?? ''))
    ? String(env.GIT_COMMIT ?? env.GITHUB_SHA).toLowerCase()
    : undefined;
  let controllerHost;
  try {
    controllerHost = env.JENKINS_URL ? new URL(env.JENKINS_URL).hostname.toLowerCase() : undefined;
  } catch {
    controllerHost = undefined;
  }
  const job = sanitizeLabel(env.JOB_NAME, 500);
  const build = integer(env.BUILD_NUMBER, 1);
  return {
    repository,
    ...(branch ? { branch } : {}),
    ...(sha ? { commit_sha: sha } : {}),
    ...(controllerHost || job || build
      ? {
          jenkins: {
            ...(controllerHost ? { controller_host: controllerHost } : {}),
            ...(job ? { job_full_name: job } : {}),
            ...(build ? { build_number: build } : {}),
          },
        }
      : {}),
  };
};

class CiEvidenceReporter {
  constructor(options = {}) {
    this.options = options;
    this.env = options.env ?? process.env;
    this.now = options.now ?? (() => new Date());
    this.outputFolder =
      options.outputFolder ?? this.env.PLAYWRIGHT_REPORT_FOLDER ?? this.env.PW_ODHIN_OUTPUT ?? 'test-results/odhin-report';
    this.repository = resolveRepository(options, this.env);
    this.suite = sanitizeLabel(options.suite, 200) ?? inferSuite(this.outputFolder);
    this.sampleIntervalMs = integer(options.sampleIntervalMs ?? this.env.PW_CI_EVIDENCE_LOAD_INTERVAL_MS, 250) ?? 2000;
    this.loadMetadata = options.loadMetadata ?? resolveLoadMetadata();
    this.sample = options.sample ?? createSystemSampler(this.loadMetadata);
    this.loadSamples = [];
    this.tests = new Map();
    this.openAttempts = new Map();
    this.callbackCounts = { begin: 0, testBegin: 0, testEnd: 0, globalErrors: 0 };
  }

  onBegin(config, suite) {
    this.callbackCounts.begin += 1;
    this.startedAt = this.now();
    this.config = config ?? {};
    this.discoveredTests = typeof suite?.allTests === 'function' ? suite.allTests().length : undefined;
    try {
      fs.unlinkSync(path.join(this.outputFolder, REPORT_FILE));
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
    this.captureLoadSample();
    this.loadTimer = setInterval(() => this.captureLoadSample(), this.sampleIntervalMs);
    this.loadTimer.unref?.();
  }

  onError() {
    this.callbackCounts.globalErrors += 1;
  }

  onTestBegin(testCase, result) {
    this.callbackCounts.testBegin += 1;
    const { record, testId } = this.resolveTest(testCase);
    const retry = integer(result?.retry) ?? 0;
    const startedAt =
      result?.startTime instanceof Date && Number.isFinite(result.startTime.getTime()) ? result.startTime : this.now();
    this.openAttempts.set(`${testId}:${retry}`, { record, retry, startedAt });
  }

  onTestEnd(testCase, result) {
    this.callbackCounts.testEnd += 1;
    const { record, testId } = this.resolveTest(testCase);
    record.attempts.push(projectAttempt(result));
    this.openAttempts.delete(`${testId}:${integer(result.retry) ?? 0}`);
  }

  onEnd(result = {}) {
    if (this.loadTimer) clearInterval(this.loadTimer);
    const createdAt = this.now();
    this.captureLoadSample(createdAt);
    const fallbackStart = this.startedAt instanceof Date ? this.startedAt : createdAt;
    const startedAt =
      result.startTime instanceof Date && Number.isFinite(result.startTime.getTime()) ? result.startTime : fallbackStart;
    const durationMs = finiteNumber(result.duration) ?? Math.max(0, createdAt.getTime() - startedAt.getTime());
    const endedAt = new Date(startedAt.getTime() + durationMs);
    const openAttemptCount = this.openAttempts.size;
    for (const { record, retry, startedAt } of this.openAttempts.values()) {
      record.attempts.push({
        retry,
        status: 'interrupted',
        duration_ms: Math.max(0, endedAt.getTime() - startedAt.getTime()),
        started_at: startedAt.toISOString(),
        errors: [{ category: 'missing_test_end_callback' }],
        failed_steps: [],
        signals: [
          {
            type: 'runner',
            category: 'missing_test_end_callback',
            signal_id: stableHash(['runner', 'missing_test_end_callback']),
            event_order: 0,
          },
        ],
      });
    }
    this.openAttempts.clear();
    const missingTestResults = this.discoveredTests === undefined ? 0 : Math.max(0, this.discoveredTests - this.tests.size);
    const collectionIsPartial = openAttemptCount > 0 || missingTestResults > 0;
    const counts = { total: this.tests.size, passed: 0, flaky: 0, failed: 0, timed_out: 0, interrupted: 0, skipped: 0 };
    const exceptionalTests = [];
    for (const record of this.tests.values()) {
      record.attempts.sort((left, right) => left.retry - right.retry);
      const finalAttempt = record.attempts.at(-1);
      const finalOutcome =
        record.playwright_outcome === 'expected'
          ? 'passed'
          : record.playwright_outcome === 'skipped'
            ? 'skipped'
            : record.playwright_outcome === 'flaky'
              ? 'flaky'
              : record.playwright_outcome === 'unexpected' && finalAttempt?.status === 'passed'
                ? 'failed'
                : finalAttempt?.status === 'passed' && record.attempts.some((attempt) => attempt.status !== 'passed')
                  ? 'flaky'
                  : (finalAttempt?.status ?? 'interrupted');
      counts[finalOutcome] = (counts[finalOutcome] ?? 0) + 1;
      if (!['passed', 'skipped'].includes(finalOutcome)) {
        exceptionalTests.push({ ...record, final_outcome: finalOutcome });
      }
    }
    const playwrightStatus = String(result.status ?? 'unknown').toLowerCase();
    const outcome =
      this.callbackCounts.globalErrors || ['failed', 'timedout', 'interrupted'].includes(playwrightStatus)
        ? 'FAILED'
        : counts.total === 0
          ? 'NOT_RUN'
          : counts.failed || counts.timed_out || counts.interrupted
            ? 'FAILED'
            : counts.flaky
              ? 'PASSED_WITH_FLAKES'
              : 'CLEAN_PASS';
    const correlation = resolveCorrelation(this.repository, this.env);
    const projects = [...new Set([...this.tests.values()].map((record) => record.project))].sort();
    const shard =
      this.config?.shard && typeof this.config.shard === 'object'
        ? { current: integer(this.config.shard.current, 1), total: integer(this.config.shard.total, 1) }
        : null;
    const documentId = stableHash([
      SCHEMA_VERSION,
      correlation,
      this.suite,
      startedAt.toISOString(),
      projects,
      shard,
      [...this.tests.keys()].sort(),
    ]);
    const evidence = {
      schema_version: SCHEMA_VERSION,
      document: {
        document_id: documentId,
        created_at: createdAt.toISOString(),
        producer: { name: 'xui-ci-evidence-reporter', version: '1' },
        redaction_policy: 'xui-ci-allowlist/v1',
      },
      correlation,
      run: {
        suite: this.suite,
        projects,
        discovered_tests: this.discoveredTests ?? this.tests.size,
        attempt_count: [...this.tests.values()].reduce((sum, record) => sum + record.attempts.length, 0),
        retry_attempt_count: [...this.tests.values()].reduce(
          (sum, record) => sum + record.attempts.filter((attempt) => attempt.retry > 0).length,
          0
        ),
        transient_failure_count: exceptionalTests
          .filter((record) => record.final_outcome === 'flaky')
          .reduce((sum, record) => sum + record.attempts.filter((attempt) => attempt.status !== 'passed').length, 0),
        workers: integer(this.config?.workers, 1) ?? null,
        configured_retries: Math.max(0, ...[...this.tests.values()].map((record) => record.configured_retries)),
        shard,
        started_at: startedAt.toISOString(),
        ended_at: endedAt.toISOString(),
        duration_ms: durationMs,
        playwright_status: playwrightStatus,
        outcome,
        collection_outcome: collectionIsPartial ? 'PARTIAL' : 'COMPLETE',
        counts,
      },
      capture: {
        begin_callbacks: this.callbackCounts.begin,
        test_begin_callbacks: this.callbackCounts.testBegin,
        test_end_callbacks: this.callbackCounts.testEnd,
        global_errors: this.callbackCounts.globalErrors,
        open_attempts: openAttemptCount,
        missing_test_results: missingTestResults,
        reconciliation: collectionIsPartial ? 'PARTIAL' : 'COMPLETE',
      },
      exceptional_tests: exceptionalTests,
      system_load: buildSampledLoadProfile(
        this.loadMetadata,
        this.loadSamples,
        this.sampleIntervalMs,
        durationMs,
        this.config?.workers
      ),
    };
    writeJsonAtomic(path.join(this.outputFolder, REPORT_FILE), applyContentHash(evidence));
  }

  captureLoadSample(at = this.now()) {
    try {
      const startedAt = this.startedAt instanceof Date ? this.startedAt : at;
      const sample = this.sample(Math.max(0, at.getTime() - startedAt.getTime()));
      if (sample && typeof sample === 'object' && this.loadSamples.length < MAX_RETAINED_LOAD_SAMPLES) {
        this.loadSamples.push(sample);
      }
    } catch {
      // Evidence remains usable when host telemetry is unavailable.
    }
  }

  printsToStdio() {
    return false;
  }

  resolveTest(testCase) {
    const project = projectName(testCase);
    const titlePath = (typeof testCase.titlePath === 'function' ? testCase.titlePath() : [testCase.title])
      .map((part) => sanitizeLabel(part, 500))
      .filter(Boolean);
    const location = {
      file: repositoryPath(testCase.location?.file) ?? 'unknown',
      line: integer(testCase.location?.line, 1) ?? 1,
      column: integer(testCase.location?.column, 1) ?? 1,
    };
    const testId = stableHash([this.repository, location.file, project, titlePath]);
    const repeatEachIndex = integer(testCase.repeatEachIndex) ?? 0;
    const executionId = stableHash([testCase.id ?? testId, repeatEachIndex]);
    const playwrightOutcome = typeof testCase.outcome === 'function' ? testCase.outcome() : undefined;
    const record = this.tests.get(executionId) ?? {
      test_id: testId,
      execution_id: executionId,
      repeat_each_index: repeatEachIndex,
      title_path: titlePath,
      project,
      location,
      annotations: (Array.isArray(testCase.annotations) ? testCase.annotations : []).flatMap((annotation) => {
        const type = sanitizeLabel(annotation?.type, 100);
        const description = sanitizeLabel(annotation?.description, 300);
        return type ? [{ type, ...(description ? { description } : {}) }] : [];
      }),
      configured_retries: integer(testCase.retries) ?? 0,
      expected_status: statusName(testCase.expectedStatus),
      playwright_outcome: ['expected', 'unexpected', 'flaky', 'skipped'].includes(playwrightOutcome)
        ? playwrightOutcome
        : undefined,
      attempts: [],
    };
    if (['expected', 'unexpected', 'flaky', 'skipped'].includes(playwrightOutcome)) {
      record.playwright_outcome = playwrightOutcome;
    }
    this.tests.set(executionId, record);
    return { record, testId: executionId };
  }
}

module.exports = CiEvidenceReporter;
module.exports.__test__ = {
  applyContentHash,
  assertSafeEvidence,
  buildSafeLoadProfile,
  buildSampledLoadProfile,
  createSystemSampler,
  extractSignals,
  projectApiEntries,
  projectFailureData,
  sanitizeDiagnostic,
  sanitizeUrl,
};
