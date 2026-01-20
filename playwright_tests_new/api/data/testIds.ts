export const WA_SAMPLE_TASK_ID = process.env.WA_SAMPLE_TASK_ID;
export const WA_SAMPLE_ASSIGNED_TASK_ID = process.env.WA_SAMPLE_ASSIGNED_TASK_ID;
export const EM_DOC_ID = process.env.EM_DOC_ID;

export function resolveRoleAccessCaseId(value?: string): string {
  return value ?? '1234567890123456';
}

export const ROLE_ACCESS_CASE_ID = process.env.ROLE_ACCESS_CASE_ID;
