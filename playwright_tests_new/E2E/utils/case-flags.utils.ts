import { resolveCcdCaseStateId, type CcdCaseDetails } from './test-setup/journeys/civilCaseJourneys';

type JsonRecord = Record<string, unknown>;

export function isPageClosingError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('Target page, context or browser has been closed') ||
    message.includes('Execution context was destroyed') ||
    message.includes('Test ended')
  );
}

function normalizeCellValue(value: string): string {
  return value.replaceAll(/\s+/g, ' ').trim().toLowerCase();
}

export function rowMatchesExpected(row: Record<string, string>, expected: Record<string, string>): boolean {
  return Object.entries(expected).every(([key, value]) => {
    return normalizeCellValue(row[key] ?? '') === normalizeCellValue(value);
  });
}

export function resolveCaseNumberFromPayload(payload: CcdCaseDetails): string | undefined {
  const candidate = payload.caseReference ?? payload.case_reference ?? payload.case_id ?? payload.id;
  return typeof candidate === 'string' || typeof candidate === 'number' ? String(candidate).replace(/\D/g, '') : undefined;
}

export function normaliseCaseDataForDataLossComparison(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((entry) => normaliseCaseDataForDataLossComparison(entry)).filter((entry) => entry !== undefined);
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  const record = value as JsonRecord;
  if (objectLooksCaseFlagRelated(record) || objectLooksVolatileCaseViewField(record)) {
    return undefined;
  }

  const normalised: JsonRecord = {};
  for (const [key, entryValue] of Object.entries(record)) {
    if (isVolatileCaseMetadataKey(key) || isCaseFlagRelatedKey(key)) {
      continue;
    }

    const cleanedValue = normaliseCaseDataForDataLossComparison(entryValue);
    if (cleanedValue !== undefined) {
      normalised[key] = cleanedValue;
    }
  }

  return normalised;
}

export function buildDataLossComparisonReport(options: {
  baselineCaseDetails: CcdCaseDetails;
  caseNumber: string;
  normalisedBaseline: unknown;
  normalisedUpdated: unknown;
  updatedCaseDetails: CcdCaseDetails;
}): string {
  const baselineDataKeys = Object.keys(resolveCaseDataPayload(options.baselineCaseDetails)).sort((a, b) => a.localeCompare(b));
  const updatedDataKeys = Object.keys(resolveCaseDataPayload(options.updatedCaseDetails)).sort((a, b) => a.localeCompare(b));
  const changedPaths = collectChangedPaths(options.normalisedBaseline, options.normalisedUpdated);
  const normalisedMatch = changedPaths.length === 0;

  return [
    '# Civil Create Case Flags Data Loss Report',
    '',
    `Case number: ${options.caseNumber}`,
    '',
    '## Before Create Case Flags',
    '',
    `State: ${resolveCcdCaseStateId(options.baselineCaseDetails) ?? 'unknown'}`,
    `Top-level case data keys: ${baselineDataKeys.length}`,
    '',
    '## After Create Case Flags',
    '',
    `State: ${resolveCcdCaseStateId(options.updatedCaseDetails) ?? 'unknown'}`,
    `Top-level case data keys: ${updatedDataKeys.length}`,
    '',
    '## Comparison',
    '',
    `Normalised case data match: ${normalisedMatch ? 'Yes' : 'No'}`,
    '',
    'Ignored expected changes:',
    '- Case flag fields added by CREATE_CASE_FLAGS',
    '- CCD event history / case history entries',
    '- CCD last modified timestamps and trigger/action metadata',
    '',
    'Changed normalised paths:',
    ...(changedPaths.length > 0 ? changedPaths.map((change) => `- ${change}`) : ['- None']),
    '',
    'Raw and normalised JSON snapshots are attached to this test result.',
    '',
  ].join('\n');
}

function isCaseFlagRelatedKey(key: string): boolean {
  return /flag/i.test(key);
}

function isVolatileCaseMetadataKey(key: string): boolean {
  return [
    'actions',
    'case_history',
    'caseHistory',
    'created_date',
    'events',
    'event_history',
    'eventHistory',
    'last_modified',
    'last_state_modified_date',
    'modified_date',
    'security_classification',
    'supplementary_data',
    'triggers',
  ].includes(key);
}

function objectLooksVolatileCaseViewField(value: JsonRecord): boolean {
  const fieldType = value.field_type as JsonRecord | undefined;
  const fieldTypeName = typeof fieldType?.type === 'string' ? fieldType.type : undefined;
  if (fieldTypeName === 'CaseHistoryViewer') {
    return true;
  }

  const fieldIdentifier = [value.id, value.label]
    .filter((candidate): candidate is string => typeof candidate === 'string')
    .join(' ');
  return /case\s*history|event\s*history|last\s*modified|lastModified|modified_date|last_state_modified_date/i.test(
    fieldIdentifier
  );
}

function objectLooksCaseFlagRelated(value: JsonRecord): boolean {
  return ['id', 'label', 'name', 'display_context_parameter'].some((key) => {
    const candidate = value[key];
    return typeof candidate === 'string' && /flag/i.test(candidate);
  });
}

function resolveCaseDataPayload(caseDetails: CcdCaseDetails): JsonRecord {
  const data = caseDetails.data ?? caseDetails.case_data;
  return data && typeof data === 'object' ? data : {};
}

function formatReportValue(value: unknown): string {
  if (value === undefined) {
    return 'undefined';
  }

  const serialised = typeof value === 'string' ? value : JSON.stringify(value);
  return serialised.length > 120 ? `${serialised.slice(0, 117)}...` : serialised;
}

function collectChangedPaths(before: unknown, after: unknown, path = '$', changes: string[] = []): string[] {
  if (changes.length >= 50 || Object.is(before, after)) {
    return changes;
  }

  if (Array.isArray(before) || Array.isArray(after)) {
    if (!Array.isArray(before) || !Array.isArray(after)) {
      changes.push(`${path}: ${formatReportValue(before)} => ${formatReportValue(after)}`);
      return changes;
    }
    if (before.length !== after.length) {
      changes.push(`${path}.length: ${before.length} => ${after.length}`);
    }
    for (let index = 0; index < Math.max(before.length, after.length); index += 1) {
      collectChangedPaths(before[index], after[index], `${path}[${index}]`, changes);
    }
    return changes;
  }

  if (before && after && typeof before === 'object' && typeof after === 'object') {
    const beforeRecord = before as JsonRecord;
    const afterRecord = after as JsonRecord;
    const keys = new Set([...Object.keys(beforeRecord), ...Object.keys(afterRecord)]);
    for (const key of keys) {
      collectChangedPaths(beforeRecord[key], afterRecord[key], `${path}.${key}`, changes);
    }
    return changes;
  }

  changes.push(`${path}: ${formatReportValue(before)} => ${formatReportValue(after)}`);
  return changes;
}
