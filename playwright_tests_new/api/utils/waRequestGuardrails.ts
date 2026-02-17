import { randomUUID } from 'node:crypto';

import type { TestInfo } from '@playwright/test';
import { z } from 'zod';

const CCD_CASE_REFERENCE_REGEX = /^\d{16}$/;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const nonEmptyString = z.string().trim().min(1);

const baseRoleAccessSchema = z.object({
  caseId: nonEmptyString,
  roleCategory: nonEmptyString,
  workTypeResource: nonEmptyString,
  region: nonEmptyString,
  location: nonEmptyString,
});

const roleAllocationSchema = baseRoleAccessSchema.extend({
  caseType: nonEmptyString,
  jurisdiction: nonEmptyString,
  assigneeId: nonEmptyString,
});

const specificAccessApprovalSchema = baseRoleAccessSchema.extend({
  assignerId: nonEmptyString,
  specificAccessReason: nonEmptyString,
});

type RoleAllocationRequest = z.infer<typeof roleAllocationSchema>;
type SpecificAccessApprovalRequest = z.infer<typeof specificAccessApprovalSchema>;

export function ensureCcdCaseReference(caseId: string, context: string): string {
  const trimmed = caseId.trim();
  if (!trimmed) {
    throw new Error(`[TEST_DATA_INVALID] ${context}: caseId is required.`);
  }
  if (UUID_REGEX.test(trimmed) || !CCD_CASE_REFERENCE_REGEX.test(trimmed)) {
    throw new Error(
      `[TEST_DATA_INVALID] ${context}: caseId must be a 16-digit CCD reference (numeric), received "${trimmed}".`
    );
  }
  return trimmed;
}

export function buildRoleAllocationRequest(
  caseId: string,
  overrides: Partial<RoleAllocationRequest> = {}
): RoleAllocationRequest {
  const payload: RoleAllocationRequest = {
    caseId: ensureCcdCaseReference(caseId, 'allocate-role payload'),
    caseType: process.env.WA_CASE_TYPE ?? 'xuiTestCaseType',
    jurisdiction: process.env.WA_JURISDICTION ?? 'DIVORCE',
    roleCategory: process.env.WA_ROLE_CATEGORY ?? 'LEGAL_OPERATIONS',
    workTypeResource: process.env.WA_WORK_TYPE_RESOURCE ?? 'hearing-work',
    region: process.env.WA_REGION ?? '1',
    location: process.env.WA_LOCATION ?? '765324',
    assigneeId: process.env.WA_ASSIGNEE_ID ?? 'test-user',
    ...overrides,
  };

  return roleAllocationSchema.parse(payload);
}

export function buildSpecificAccessApprovalRequest(
  caseId: string,
  overrides: Partial<SpecificAccessApprovalRequest> = {}
): SpecificAccessApprovalRequest {
  const payload: SpecificAccessApprovalRequest = {
    caseId: ensureCcdCaseReference(caseId, 'specific-access-approval payload'),
    assignerId: process.env.WA_ASSIGNER_ID ?? 'test-assigner',
    specificAccessReason: process.env.WA_SPECIFIC_ACCESS_REASON ?? 'test',
    roleCategory: process.env.WA_ROLE_CATEGORY ?? 'LEGAL_OPERATIONS',
    workTypeResource: process.env.WA_WORK_TYPE_RESOURCE ?? 'hearing-work',
    region: process.env.WA_REGION ?? '1',
    location: process.env.WA_LOCATION ?? '765324',
    ...overrides,
  };

  return specificAccessApprovalSchema.parse(payload);
}

export function buildCaseIdListPayload(caseId: string): { caseIds: string[] } {
  return { caseIds: [ensureCcdCaseReference(caseId, 'role-access caseIds payload')] };
}

export function buildCaseIdPayload(caseId: string): { caseId: string } {
  return { caseId: ensureCcdCaseReference(caseId, 'role-access caseId payload') };
}

function summarizePayload(payload: unknown): string {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return JSON.stringify(payload);
  }

  const record = payload as Record<string, unknown>;
  const summary = {
    caseId: record.caseId,
    caseIds: record.caseIds,
    roleCategory: record.roleCategory,
    workTypeResource: record.workTypeResource,
    region: record.region,
    location: record.location,
    caseType: record.caseType,
    jurisdiction: record.jurisdiction,
    assigneeId: record.assigneeId,
  };

  return JSON.stringify(summary);
}

export async function postWaWithDiagnostics<TResponse = unknown>(
  apiClient: { post: (path: string, options: unknown) => Promise<{ status: number; data?: TResponse }> },
  args: {
    endpoint: string;
    payload: Record<string, unknown>;
    headers?: Record<string, string>;
    allowedStatuses: ReadonlyArray<number>;
    testInfo: TestInfo;
  }
): Promise<{ status: number; data?: TResponse; correlationId: string }> {
  const correlationId = randomUUID();
  const response = await apiClient.post(args.endpoint, {
    data: args.payload,
    headers: {
      ...(args.headers ?? {}),
      'X-Correlation-Id': correlationId,
    },
    throwOnError: false,
  });

  if (!args.allowedStatuses.includes(response.status)) {
    const payloadSummary = summarizePayload(args.payload);
    args.testInfo.annotations.push({
      type: 'classification',
      description: 'SERVICE_REGRESSION',
    });
    args.testInfo.annotations.push({
      type: 'wa-diagnostic',
      description: `${args.endpoint} status=${response.status} correlationId=${correlationId}`,
    });
    await args.testInfo.attach(`wa-failure-${Date.now()}.txt`, {
      body: [
        `endpoint: ${args.endpoint}`,
        `status: ${response.status}`,
        `allowedStatuses: ${args.allowedStatuses.join(',')}`,
        `correlationId: ${correlationId}`,
        `payloadSummary: ${payloadSummary}`,
      ].join('\n'),
      contentType: 'text/plain',
    });
  }

  return { ...response, correlationId };
}
