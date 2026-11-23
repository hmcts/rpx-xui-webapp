import { expect, test } from '@playwright/test';

import { FrameworkError } from '../../E2E/utils/frameworkError';
import {
  isWorkAllocationActorConfigError,
  memoiseActionActorReadiness,
  provisionOwnedActionTask,
  resolveActionActorReadiness,
  WA_FIXTURE_ACTOR_CONFIG_ERROR_CODE,
} from '../utils/workAllocationActionFixture';
import type { ActionActorReadiness } from '../utils/workAllocationActionFixture';

const COURT = '234946';
const actorDetails = {
  userInfo: { uid: 'actor-id', email: 'actor@example.test', roles: ['caseworker-privatelaw-courtadmin'] },
  roleAssignmentInfo: [
    { jurisdiction: 'PRIVATELAW', roleName: 'hearing-centre-admin', primaryLocation: COURT, substantive: 'Y' },
  ],
};
const readiness: ActionActorReadiness = { actorId: 'actor-id', assigneeId: 'actor-id', primaryLocation: COURT };

function readinessDeps(overrides: Partial<Parameters<typeof resolveActionActorReadiness>[0]> = {}) {
  const courtLookups: string[][] = [];
  return {
    courtLookups,
    deps: {
      actorIdentifier: 'WA_TASK_ADMIN',
      expectedEmail: 'actor@example.test',
      readActorDetails: async () => actorDetails,
      findCourt: async (courts: string[]) => {
        courtLookups.push(courts);
        return courts[0];
      },
      ...overrides,
    },
  };
}

test.describe('Owned WA action fixture actor readiness', { tag: '@svc-internal' }, () => {
  test('resolves the actor court and self-assignee from role assignments', async () => {
    const { deps, courtLookups } = readinessDeps();
    await expect(resolveActionActorReadiness(deps)).resolves.toEqual(readiness);
    expect(courtLookups).toEqual([[COURT]]);
  });

  test('reports a missing court-admin role as a deterministic actor configuration error', async () => {
    const { deps, courtLookups } = readinessDeps({
      readActorDetails: async () => ({ ...actorDetails, userInfo: { ...actorDetails.userInfo, roles: [] } }),
    });
    const error = await resolveActionActorReadiness(deps).catch((caught: unknown) => caught);
    expect(error).toBeInstanceOf(FrameworkError);
    expect((error as FrameworkError).code).toBe(WA_FIXTURE_ACTOR_CONFIG_ERROR_CODE);
    expect((error as FrameworkError).phase).toBe('setup');
    expect((error as Error).message).toContain('court-admin IDAM role');
    expect((error as Error).message).toContain('not a transient failure');
    expect(courtLookups).toEqual([]);
  });

  test('names the actor when it has no substantive PRL court', async () => {
    const { deps } = readinessDeps({
      readActorDetails: async () => ({
        ...actorDetails,
        roleAssignmentInfo: [{ ...actorDetails.roleAssignmentInfo[0], substantive: 'N' }],
      }),
    });
    const error = await resolveActionActorReadiness(deps).catch((caught: unknown) => caught);
    expect(isWorkAllocationActorConfigError(error)).toBe(true);
    expect((error as Error).message).toContain('WA_TASK_ADMIN');
  });

  test('keeps an actor lookup HTTP failure as an ordinary, re-checkable error', async () => {
    const { deps } = readinessDeps({
      readActorDetails: async () => {
        throw new Error('WA fixture actor lookup failed (HTTP 502).');
      },
    });
    const error = await resolveActionActorReadiness(deps).catch((caught: unknown) => caught);
    expect(isWorkAllocationActorConfigError(error)).toBe(false);
  });

  test('runs the readiness check once per key and caches the result', async () => {
    const cache = new Map<string, Promise<ActionActorReadiness>>();
    let calls = 0;
    const resolve = async () => {
      calls += 1;
      return readiness;
    };
    await expect(memoiseActionActorReadiness('WA_TASK_ADMIN->self', resolve, cache)).resolves.toEqual(readiness);
    await expect(memoiseActionActorReadiness('WA_TASK_ADMIN->self', resolve, cache)).resolves.toEqual(readiness);
    expect(calls).toBe(1);
    await memoiseActionActorReadiness('WA_TASK_ADMIN->assignee', resolve, cache);
    expect(calls).toBe(2);
  });

  test('keeps a configuration failure cached so later fixtures fail immediately without re-checking', async () => {
    const cache = new Map<string, Promise<ActionActorReadiness>>();
    let calls = 0;
    const resolve = async (): Promise<ActionActorReadiness> => {
      calls += 1;
      throw new FrameworkError(WA_FIXTURE_ACTOR_CONFIG_ERROR_CODE, 'setup', 'actor misconfigured');
    };
    await expect(memoiseActionActorReadiness('key', resolve, cache)).rejects.toThrow('actor misconfigured');
    await expect(memoiseActionActorReadiness('key', resolve, cache)).rejects.toThrow('actor misconfigured');
    expect(calls).toBe(1);
  });

  test('evicts a non-configuration failure so the next fixture re-checks', async () => {
    const cache = new Map<string, Promise<ActionActorReadiness>>();
    let calls = 0;
    const resolve = async (): Promise<ActionActorReadiness> => {
      calls += 1;
      if (calls === 1) throw new Error('WA fixture actor lookup failed (HTTP 502).');
      return readiness;
    };
    await expect(memoiseActionActorReadiness('key', resolve, cache)).rejects.toThrow('HTTP 502');
    await expect(memoiseActionActorReadiness('key', resolve, cache)).resolves.toEqual(readiness);
    expect(calls).toBe(2);
  });

  test('does not spend case-provisioning transient retries on an actor configuration error', async () => {
    let createCalls = 0;
    const error = await provisionOwnedActionTask({
      createCase: async () => {
        createCalls += 1;
        throw new FrameworkError(WA_FIXTURE_ACTOR_CONFIG_ERROR_CODE, 'setup', 'misconfigured (HTTP 500 mention)');
      },
      sendMessage: async () => 204,
      readTasks: async () => [],
      wait: async () => undefined,
      now: () => 0,
    }).catch((caught: unknown) => caught);
    expect(isWorkAllocationActorConfigError(error)).toBe(true);
    expect(createCalls).toBe(1);
  });
});
