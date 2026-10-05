import { expect, test } from '@playwright/test';
import { requireWorkAllocationLocation, requireWorkAllocationUserId } from '../utils/workAllocationSetup';

test.describe('Work Allocation consuming scenario setup', { tag: '@svc-internal' }, () => {
  test('resolves the selected client identity without location or task searches', async () => {
    const paths: string[] = [];
    const client = {
      get: async (path: string) => {
        paths.push(path);
        return { status: 200, data: { userInfo: { id: 'selected-user' } } };
      },
    };
    expect(await requireWorkAllocationUserId(client)).toBe('selected-user');
    expect(paths).toEqual(['api/user/details']);
  });

  test('fails on unsuccessful or missing identity instead of passing a user-details fallback', async () => {
    for (const response of [
      { status: 503 },
      { status: 200, data: { userInfo: {} } },
      { status: 200, data: { userInfo: { id: ' ' } } },
    ]) {
      await expect(requireWorkAllocationUserId({ get: async () => response })).rejects.toThrow(
        /requires user details with a user id/
      );
    }
  });

  test('resolves a location only from a successful populated response', async () => {
    const paths: string[] = [];
    const client = {
      get: async (path: string) => {
        paths.push(path);
        return { status: 200, data: [{ id: 'location-1' }] };
      },
    };
    expect(await requireWorkAllocationLocation(client, ['IA', 'CIVIL'])).toBe('location-1');
    expect(paths).toEqual(['workallocation/location?serviceCodes=IA%2CCIVIL']);
    for (const response of [
      { status: 500, data: [{ id: 'location-1' }] },
      { status: 200, data: [] },
    ]) {
      await expect(requireWorkAllocationLocation({ get: async () => response }, ['IA'])).rejects.toThrow(
        /requires a location id/
      );
    }
  });
});
