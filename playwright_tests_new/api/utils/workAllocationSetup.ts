import type { UserDetailsResponse } from './types';
import { resolveLocationId, resolveUserId } from './workAllocationUtils';

type SetupClient = {
  get: (path: string, options: { throwOnError: false; timeoutMs: number }) => Promise<{ status: number; data?: unknown }>;
};

export async function requireWorkAllocationUserId(client: SetupClient): Promise<string> {
  const response = await client.get('api/user/details', { throwOnError: false, timeoutMs: 10_000 });
  const id = resolveUserId(response.data as UserDetailsResponse | undefined);
  if (response.status !== 200 || !id?.trim()) {
    throw new Error(`Work Allocation requires user details with a user id (HTTP ${response.status}).`);
  }
  return id;
}

export async function requireWorkAllocationLocation(client: SetupClient, serviceCodes: string[]): Promise<string> {
  const response = await client.get(`workallocation/location?serviceCodes=${encodeURIComponent(serviceCodes.join(','))}`, {
    throwOnError: false,
    timeoutMs: 10_000,
  });
  const id = resolveLocationId(response.status, response.data as Array<{ id?: string }> | undefined);
  if (!id?.trim()) {
    throw new Error(`Work Allocation requires a location id from the locations list (HTTP ${response.status}).`);
  }
  return id;
}
