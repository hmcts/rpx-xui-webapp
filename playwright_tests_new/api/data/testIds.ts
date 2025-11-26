import { loadTestManifestSync } from './test-manifest';

const DEFAULT_UNASSIGNED_TASK_ID = '29e16124-cad0-11f0-be47-66ba1a42d2a4';
const DEFAULT_ASSIGNED_TASK_ID = 'a575896a-a1c4-11ef-9a7c-8a0f9dc6c291';
const DEFAULT_CASE_ID = '1764168436873524';
const DEFAULT_ROLE_ASSIGNEE_ID = process.env.DEFAULT_ASSIGNEE_ID ?? '14dd3aff-02da-46e6-acb3-a2c8756b0bd3';
const DEFAULT_ROLE_ASSIGNEE_ALT = '4beb9cfb-1178-4a2f-aaa3-ddf1dc6bb9de';

function pickString(...candidates: Array<string | null | undefined>): string | undefined {
  return candidates.find((value) => typeof value === 'string' && value.trim().length > 0);
}

function requireValue(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Required test id "${key}" is not configured. Update playright_tests_new/api/data/test-manifest.json or env var.`);
  }
  return value;
}
// Exported for targeted unit coverage.
export const __requireValueForTest = requireValue;

const manifest = loadTestManifestSync();

export const WA_SAMPLE_TASK_ID = requireValue(
  pickString(process.env.WA_SAMPLE_TASK_ID, manifest.wa?.unassignedTaskId ?? undefined, DEFAULT_UNASSIGNED_TASK_ID),
  'WA_SAMPLE_TASK_ID'
);
export const WA_SAMPLE_ASSIGNED_TASK_ID = requireValue(
  pickString(process.env.WA_SAMPLE_ASSIGNED_TASK_ID, manifest.wa?.assignedTaskId ?? undefined, DEFAULT_ASSIGNED_TASK_ID),
  'WA_SAMPLE_ASSIGNED_TASK_ID'
);
export const ROLE_ACCESS_CASE_ID = requireValue(
  pickString(process.env.ROLE_ACCESS_CASE_ID, manifest.roleAccess?.caseId ?? undefined, DEFAULT_CASE_ID),
  'ROLE_ACCESS_CASE_ID'
);
export const EM_DOC_ID = pickString(process.env.EM_DOC_ID, manifest.evidenceManager?.docId ?? undefined);
export const ROLE_ASSIGNEE_ID = requireValue(
  pickString(process.env.DEFAULT_ASSIGNEE_ID, manifest.roleAccess?.assigneeId ?? undefined, DEFAULT_ROLE_ASSIGNEE_ID),
  'ROLE_ASSIGNEE_ID'
);
export const ROLE_ASSIGNEE_ALT_ID = requireValue(
  pickString(manifest.roleAccess?.assigneeAltId ?? undefined, DEFAULT_ROLE_ASSIGNEE_ALT),
  'ROLE_ASSIGNEE_ALT_ID'
);
