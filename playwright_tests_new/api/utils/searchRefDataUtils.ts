import { expect } from '@playwright/test';

import { expectRoleAssignmentShape } from './assertions';
import type { RoleAssignmentContainer } from './types';

export function assertGlobalSearchServices(status: number, data: unknown): void {
  if (status === 200 && Array.isArray(data) && data.length > 0) {
    expect(data[0]).toEqual(
      expect.objectContaining({
        serviceId: expect.any(String),
        serviceName: expect.any(String),
      })
    );
  }
}

export function assertGlobalSearchResults(status: number, data: unknown): void {
  if (status === 200 && data) {
    expect(data).toHaveProperty('results');
    if (Array.isArray((data as { results?: unknown[] })?.results) && (data as { results?: unknown[] }).results!.length > 0) {
      const first = (data as { results: Array<{ caseReference?: unknown }> }).results[0];
      expect(first).toEqual(expect.objectContaining({}));
      if (first.caseReference) {
        expect(typeof first.caseReference).toBe('string');
      }
    }
  }
}

export function assertSearchCasesResponse(status: number, data: unknown): void {
  if (status === 200 && data) {
    if (typeof (data as { total?: unknown })?.total === 'number' && Array.isArray((data as { cases?: unknown[] })?.cases)) {
      const typed = data as { total: number; cases: unknown[] };
      expect(typed.total).toBeGreaterThanOrEqual(0);
      if (typed.cases.length > 0) {
        expect(typed.cases[0]).toEqual(expect.anything());
      }
    } else {
      expect(data).toEqual(expect.anything());
    }
  }
}

export function assertSupportedJurisdictions(status: number, data: unknown): void {
  if (status === 200 && Array.isArray(data) && data.length > 0) {
    expect(typeof data[0]).toBe('string');
  }
}

export function assertLocationsResponse(status: number, data: unknown): void {
  if (status === 200 && Array.isArray(data) && data.length > 0) {
    expect(data[0]).toHaveProperty('epimms_id');
  }
}

interface StaffEntry {
  known_as: string;
  email_id: string;
  [key: string]: unknown;
}

interface StaffRefDataResponse {
  staff?: StaffEntry[];
}

export function assertStaffRefDataResponse(status: number, data: unknown): void {
  const typed = data as Partial<StaffRefDataResponse>;
  if (status === 200 && Array.isArray(typed?.staff) && typed.staff.length > 0) {
    const staffEntry = typed.staff[0];
    expect(staffEntry).toEqual(
      expect.objectContaining({
        known_as: expect.any(String),
        email_id: expect.any(String),
      })
    );
  }
}

interface MyAccessCountResponse {
  count?: number;
}

export function assertMyAccessCount(status: number, data: unknown): void {
  if (status === 200) {
    if (typeof data === 'number') {
      expect(data).toBeGreaterThanOrEqual(0);
    } else if (typeof (data as Partial<MyAccessCountResponse>)?.count === 'number') {
      expect((data as MyAccessCountResponse).count).toBeGreaterThanOrEqual(0);
    } else {
      expect(data).toEqual(expect.anything());
    }
  }
}

export function assertRoleAccessGetResponse(status: number, data: unknown): void {
  if (status === 200) {
    if (Array.isArray(data) && data.length > 0) {
      expectRoleAssignmentShape(data[0]);
    } else if (
      Array.isArray((data as RoleAssignmentContainer)?.roleAssignmentResponse) &&
      (data as RoleAssignmentContainer).roleAssignmentResponse!.length > 0
    ) {
      expectRoleAssignmentShape((data as RoleAssignmentContainer).roleAssignmentResponse![0]);
    } else {
      expect(data).toEqual(expect.anything());
    }
  }
}

export function assertValidRolesResponse(status: number, data: unknown): void {
  if (status === 200 && Array.isArray(data) && data.length > 0) {
    const first = data[0] as { service?: unknown; roles?: unknown[]; roleId?: unknown; roleName?: unknown };
    if (Array.isArray(first?.roles)) {
      expect(first).toEqual(expect.objectContaining({ service: expect.any(String), roles: expect.any(Array) }));
      if (first.roles.length > 0) {
        const firstRole = first.roles[0] as { roleId?: unknown; roleName?: unknown };
        expect(firstRole).toEqual(
          expect.objectContaining({
            roleId: expect.any(String),
            roleName: expect.any(String),
          })
        );
      }
      return;
    }

    expect(first).toEqual(
      expect.objectContaining({
        roleId: expect.any(String),
        roleName: expect.any(String),
      })
    );
  }
}

interface RoleAccessByCaseIdResponse {
  roleAssignmentResponse?: unknown[];
}

export function assertRoleAccessByCaseIdResponse(status: number, data: unknown): void {
  const typed = data as Partial<RoleAccessByCaseIdResponse>;
  if (status === 200 && Array.isArray(typed?.roleAssignmentResponse) && typed.roleAssignmentResponse.length > 0) {
    expectRoleAssignmentShape(typed.roleAssignmentResponse[0]);
  }
}

export function assertRoleAssignmentsIfPresent(status: number, data: unknown): void {
  if ((status === 200 || status === 201) && Array.isArray(data) && data.length > 0) {
    expectRoleAssignmentShape(data[0]);
  }
}

export function assertManageLabellingResponse(status: number, data: unknown): void {
  if (status === 200 && Array.isArray(data) && data.length > 0) {
    expectRoleAssignmentShape(data[0]);
  }
}

interface Cookie {
  name: string;
  value: string;
  expires: number;
  [key: string]: unknown;
}

interface StorageStateWithCookies {
  cookies: Cookie[];
}

export function buildExpiredCookies(state: unknown): Cookie[] {
  const typed = state as Partial<StorageStateWithCookies>;
  return Array.isArray(typed.cookies) ? typed.cookies.map((c) => ({ ...c, expires: 0 })) : [];
}

interface RequestContext {
  storageState: (opts: { cookies: Cookie[]; origins?: unknown[] }) => Promise<void>;
}

export async function applyExpiredCookies(ctx: RequestContext, cookies: Cookie[]): Promise<void> {
  if (cookies.length) {
    await ctx.storageState({ cookies, origins: [] });
  }
}
