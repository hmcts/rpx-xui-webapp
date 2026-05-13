import { resolveCcdCaseStateId, type CcdCaseDetails } from './test-setup/journeys/civilCaseJourneys';

type JsonRecord = Record<string, unknown>;
type DataLossNormalisationOptions = {
  ignoredFlagComment?: string;
};
const CASE_FLAG_CONTAINER_METADATA_KEYS = new Set(['partyName', 'roleOnCase']);

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

export function normaliseCaseDataForDataLossComparison(value: unknown, options: DataLossNormalisationOptions = {}): unknown {
  if (Array.isArray(value)) {
    return value.map((entry) => normaliseCaseDataForDataLossComparison(entry, options)).filter((entry) => entry !== undefined);
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  const record = value as JsonRecord;
  if (objectIsIgnoredCreatedFlag(record, options.ignoredFlagComment) || objectLooksVolatileCaseViewField(record)) {
    return undefined;
  }

  const normalised: JsonRecord = {};
  for (const [key, entryValue] of Object.entries(record)) {
    if (isVolatileCaseMetadataKey(key)) {
      continue;
    }

    const cleanedValue = normaliseCaseDataForDataLossComparison(entryValue, options);
    if (cleanedValue !== undefined) {
      normalised[key] = cleanedValue;
    }
  }

  if (objectIsEmptyIgnoredFlagContainer(record, normalised, options.ignoredFlagComment)) {
    return undefined;
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
    '- Case flag entry created by this test',
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

function objectIsIgnoredCreatedFlag(value: JsonRecord, ignoredFlagComment: string | undefined): boolean {
  if (!ignoredFlagComment) {
    return false;
  }

  if (objectHasDirectStringValue(value, ignoredFlagComment)) {
    return true;
  }

  const collectionValue = value.value;
  return (
    collectionValue !== null &&
    typeof collectionValue === 'object' &&
    objectHasDirectStringValue(collectionValue as JsonRecord, ignoredFlagComment)
  );
}

function objectHasDirectStringValue(value: JsonRecord, expectedText: string): boolean {
  return Object.values(value).some((candidate) => typeof candidate === 'string' && candidate.includes(expectedText));
}

function objectIsEmptyIgnoredFlagContainer(
  originalValue: JsonRecord,
  normalisedValue: JsonRecord,
  ignoredFlagComment: string | undefined
): boolean {
  if (!ignoredFlagComment) {
    return false;
  }

  return (
    objectContainsStringValue(originalValue, ignoredFlagComment) &&
    objectLooksCaseFlagContainer(originalValue) &&
    objectHasNoRemainingFlagEntries(normalisedValue)
  );
}

function objectLooksCaseFlagContainer(value: JsonRecord): boolean {
  const keys = Object.keys(value);
  return (
    keys.some((key) => /^(details|flagDetails|flags)$/i.test(key) || /^flag/i.test(key)) ||
    (typeof value.partyName === 'string' && typeof value.roleOnCase === 'string' && 'details' in value)
  );
}

function objectHasNoRemainingFlagEntries(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (!value || typeof value !== 'object') {
    return value === '' || value === null || value === undefined;
  }

  return Object.entries(value as JsonRecord).every(([key, entryValue]) => {
    return CASE_FLAG_CONTAINER_METADATA_KEYS.has(key) || objectHasNoRemainingFlagEntries(entryValue);
  });
}

function objectContainsStringValue(value: unknown, expectedText: string): boolean {
  if (typeof value === 'string') {
    return value.includes(expectedText);
  }

  if (Array.isArray(value)) {
    return value.some((entry) => objectContainsStringValue(entry, expectedText));
  }

  if (!value || typeof value !== 'object') {
    return false;
  }

  return Object.values(value as JsonRecord).some((entryValue) => objectContainsStringValue(entryValue, expectedText));
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
