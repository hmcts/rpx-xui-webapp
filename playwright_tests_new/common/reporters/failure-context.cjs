/* global URL, module, process, require */

'use strict';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('node:path');

const MAX_TEXT_LENGTH = 320;
const MAX_ARRAY_ITEMS = 12;
const SENSITIVE_KEY = /authorization|cookie|set-cookie|token|password|secret|body|content|file/i;
const URL_KEY = /^(?:url|route|href|initiatedFrom|lastMainFrameUrl)$/i;
const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const UUID_PATTERN = /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi;
const CASE_REFERENCE_PATTERN = /\b(?:[A-Z]{1,8}\d{6,}|[A-Z]{1,8}[-/]\d{4,}(?:[-/]\d{2,})+)\b/g;
const UUID_SEGMENT_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CASE_REFERENCE_SEGMENT_PATTERN = /^(?:[A-Z]{1,8}\d{6,}|[A-Z]{1,8}[-/]\d{4,}(?:[-/]\d{2,})+)$/i;
const QUOTED_SECRET_PATTERN =
  /(["']?(?:authorization|cookie|set-cookie|x-api-key|token|password|secret|body|content|file)["']?\s*[:=]\s*["']?)((?:Bearer|Basic)\s+[^"'\s,;}]+|[^"'\s,;}]+)(["']?)/gi;

function redactUrl(value) {
  const raw = String(value ?? '');
  try {
    const url = new URL(raw);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return redactText(raw);
    }
    url.username = '';
    url.password = '';
    url.search = '';
    url.hash = '';
    url.pathname = url.pathname
      .split('/')
      .map((segment) =>
        /^\d{4,}$/.test(segment) ||
        /^[a-f\d]{16,}$/i.test(segment) ||
        UUID_SEGMENT_PATTERN.test(segment) ||
        CASE_REFERENCE_SEGMENT_PATTERN.test(segment)
          ? ':id'
          : segment
      )
      .join('/');
    return url.toString();
  } catch {
    return raw
      .replace(/[?#].*$/, '')
      .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[redacted-email]')
      .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi, ':id')
      .replace(/\b(?:[A-Z]{1,8}\d{6,}|[A-Z]{1,8}[-/]\d{4,}(?:[-/]\d{2,})+)\b/g, ':case-ref')
      .replace(/\b\d{4,}\/\d{4,}\b/g, ':case-ref')
      .replace(/\b\d{8,}\b/g, ':id')
      .slice(0, MAX_TEXT_LENGTH);
  }
}

function redactText(value) {
  let text = String(value ?? '');
  text = text.replace(QUOTED_SECRET_PATTERN, '$1[redacted]$3');
  text = text.replace(EMAIL_PATTERN, '[redacted-email]');
  text = text.replace(UUID_PATTERN, ':id');
  text = text.replace(CASE_REFERENCE_PATTERN, ':case-ref');
  text = text.replace(/https?:\/\/[^\s"'<>]+/gi, (url) => redactUrl(url));
  text = text.replace(/\b\d{4,}\/\d{4,}\b/g, ':case-ref');
  text = text.replace(/\b\d{8,}\b/g, ':id');
  EMAIL_PATTERN.lastIndex = 0;
  UUID_PATTERN.lastIndex = 0;
  CASE_REFERENCE_PATTERN.lastIndex = 0;
  QUOTED_SECRET_PATTERN.lastIndex = 0;
  return text.length > MAX_TEXT_LENGTH ? `${text.slice(0, MAX_TEXT_LENGTH - 3)}...` : text;
}

function redactValue(value, key = '') {
  if (SENSITIVE_KEY.test(key)) {
    return '[redacted]';
  }
  if (Array.isArray(value)) {
    return value.slice(0, MAX_ARRAY_ITEMS).map((item) => redactValue(item, key));
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .slice(0, MAX_ARRAY_ITEMS)
        .map(([entryKey, entryValue]) => [entryKey, redactValue(entryValue, entryKey)])
    );
  }
  if (value === null || typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }
  if (URL_KEY.test(key)) {
    return redactUrl(value);
  }
  return redactText(value);
}

function annotationValue(annotations, type) {
  return annotations?.find((annotation) => annotation?.type === type)?.description ?? '';
}

function safeSourceFile(file) {
  const normalized = String(file ?? '').replace(/\\/g, '/');
  const marker = normalized.indexOf('playwright_tests_new/');
  return redactText(marker >= 0 ? normalized.slice(marker) : path.basename(normalized));
}

function nextChecksFor(classification) {
  const checks = {
    AUTHENTICATION_SESSION_UNAVAILABLE: ['Check session/bootstrap logs and the configured environment authentication surface.'],
    DOWNSTREAM_API_4XX: [
      'Inspect the captured route/status and confirm the seeded request contract before changing the UI test.',
    ],
    DOWNSTREAM_API_5XX: ['Inspect the captured route/status and service logs before changing the locator or retry policy.'],
    GLOBAL_TIMEOUT_UI_STALL: [
      'Open the trace at the failing action and inspect the blocking element, rendered route, and readiness state.',
    ],
    UI_ELEMENT_MISSING: [
      'Open the trace at the first missing element and confirm the intended route and accessible locator contract.',
    ],
    NETWORK_TIMEOUT: ['Inspect the bounded failed-request list and service timing before changing test timeouts.'],
    SLOW_API_RESPONSE: ['Inspect the slow-call summary and compare service latency with the test timeout budget.'],
    ASSERTION_FAILURE: [
      'Compare the expected and observed values in the test step and check whether the fixture data is deterministic.',
    ],
    TIMEOUT_NO_API_ACTIVITY: ['Open the trace and setup markers to identify the first wait with no backend activity.'],
  };
  return (
    checks[classification] ?? [
      'Open the trace and raw Playwright error, then classify the first failing step before changing the test.',
    ]
  );
}

function buildFailureContext({
  testInfo,
  status,
  retry,
  project,
  worker,
  annotations = [],
  failureLocation = '',
  actionableError = '',
  executionSignals = {},
  likelyRootCause = '',
  branch = process.env.BRANCH_NAME || process.env.GIT_BRANCH || 'unknown',
  commit = process.env.GIT_COMMIT || process.env.GIT_COMMIT_SHA || 'unknown',
}) {
  const classification = annotationValue(annotations, 'Failure type') || 'UNKNOWN';
  const facts = {
    failureSource: redactText(annotationValue(annotations, 'Failure source')),
    phaseMarker: redactText(annotationValue(annotations, 'Phase marker')),
    setupMarker: redactText(annotationValue(annotations, 'Setup marker')),
    backendWait: redactText(annotationValue(annotations, 'Backend wait')),
    failureLocation: redactText(failureLocation),
    actionableError: redactText(actionableError),
    executionSignals: redactValue(executionSignals),
  };

  return {
    schemaVersion: 1,
    status: redactText(status),
    retry: Number.isInteger(Number(retry)) ? Number(retry) : 0,
    project: redactText(project || 'unknown'),
    worker: redactText(worker || 'unknown'),
    build: {
      branch: redactText(branch),
      commit: redactText(commit),
    },
    test: {
      title: redactText(testInfo?.title),
      file: safeSourceFile(testInfo?.file),
      location: {
        line: Number.isInteger(testInfo?.line) ? testInfo.line : null,
        column: Number.isInteger(testInfo?.column) ? testInfo.column : null,
      },
    },
    classification: redactText(classification),
    confidence: 'observed',
    facts,
    hypotheses: likelyRootCause ? [redactText(likelyRootCause)] : [],
    nextChecks: nextChecksFor(classification),
  };
}

module.exports = {
  MAX_TEXT_LENGTH,
  buildFailureContext,
  nextChecksFor,
  redactText,
  redactUrl,
  redactValue,
  safeSourceFile,
};
