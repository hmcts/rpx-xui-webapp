import { expect, test } from '@playwright/test';
import {
  cleanupOwnedActionTask,
  provisionOwnedActionTask,
  requireAatUrl,
  requireExuiUrl,
  requireActionCourt,
  requireAssignmentTarget,
  requireOwnedActionTask,
  resolveActionWorkflowUrl,
} from '../utils/workAllocationActionFixture';
import type { Task } from '../utils/types';

const caseReference = '1234567890123456';
function ownedTask(name: string): Task {
  return {
    id: 'owned-task',
    case_id: caseReference,
    name,
    type: 'newCaseTransferredToCourt',
    task_state: 'unassigned',
    assignee: null,
    permissions: { values: ['read', 'own', 'claim', 'unclaim', 'assign', 'unassign', 'complete', 'cancel'] },
  };
}

test.describe('Owned WA action fixture', { tag: '@svc-internal' }, () => {
  test('assignment target is a different configured court admin at the same court', () => {
    const details = {
      userInfo: { uid: 'assignee', roles: ['caseworker-privatelaw-courtadmin'] },
      roleAssignmentInfo: [
        { jurisdiction: 'PRIVATELAW', roleName: 'hearing-centre-admin', primaryLocation: '234946', substantive: 'Y' },
      ],
    };
    expect(requireAssignmentTarget(details, '234946', 'operator')).toBe('assignee');
    expect(() => requireAssignmentTarget(details, 'different-court', 'operator')).toThrow('same PRL court');
    expect(() => requireAssignmentTarget(details, '234946', 'assignee')).toThrow('different');
    expect(() =>
      requireAssignmentTarget({ ...details, userInfo: { roles: details.userInfo.roles } }, '234946', 'operator')
    ).toThrow('identified');
  });
  test('selects explicit workflow URL or authenticated configuration and fails closed', async () => {
    const configuredUrl = 'http://wa-workflow-api-aat.service.core-compute-aat.internal';
    const explicitUrl = 'https://wa-workflow-api.aat.platform.hmcts.net';
    expect(
      await resolveActionWorkflowUrl(explicitUrl, async () => {
        throw new Error('Unexpected configuration lookup');
      })
    ).toBe(explicitUrl);
    expect(await resolveActionWorkflowUrl(undefined, async () => ({ status: 200, data: { waWorkflowApi: configuredUrl } }))).toBe(
      configuredUrl
    );
    await expect(resolveActionWorkflowUrl(undefined, async () => ({ status: 503, data: {} }))).rejects.toThrow('HTTP 503');
    await expect(resolveActionWorkflowUrl(undefined, async () => ({ status: 200, data: {} }))).rejects.toThrow('no workflow URL');
    await expect(
      resolveActionWorkflowUrl(undefined, async () => ({
        status: 200,
        data: { waWorkflowApi: 'https://manage-case.platform.hmcts.net' },
      }))
    ).rejects.toThrow('approved AAT');
  });
  test('cleanup cancels only its verified owned task and proves the final state', async () => {
    for (const initialState of ['unassigned', 'completed', 'cancelled', 'wrong-case']) {
      let cancels = 0;
      const client = {
        get: async () => ({
          status: 200,
          data: {
            task: {
              ...ownedTask('owned'),
              case_id: initialState === 'wrong-case' ? '9999999999999999' : caseReference,
              task_state: cancels ? 'cancelled' : initialState,
            },
          },
        }),
        post: async () => {
          cancels++;
          return { status: 204 };
        },
      };
      const cleanup = cleanupOwnedActionTask(client as never, { taskId: 'owned-task', caseReference });
      if (initialState === 'wrong-case') await expect(cleanup).rejects.toThrow('could not verify');
      else await cleanup;
      expect(cancels).toBe(initialState === 'unassigned' ? 1 : 0);
    }
  });
  test('allows public HTTPS AAT and internal HTTP AAT service hosts only', () => {
    expect(requireAatUrl('https://manage-case.aat.platform.hmcts.net/', 'EXUI')).toBe(
      'https://manage-case.aat.platform.hmcts.net'
    );
    expect(requireAatUrl('http://ccd-data-store-api-aat.service.core-compute-aat.internal/cases', 'CCD')).toBe(
      'http://ccd-data-store-api-aat.service.core-compute-aat.internal'
    );
    for (const url of [
      'https://manage-case.platform.hmcts.net',
      'http://manage-case.aat.platform.hmcts.net',
      'https://evil.aat.platform.hmcts.net.example.com',
      'http://ccd-data-store-api-prod.service.core-compute-prod.internal',
      'http://ccd-data-store-api.service.core-compute-aat.internal',
      'http://ccd-data-store-api-aat.service.core-compute-aat.internal.example.com',
      'https://user:password@manage-case.aat.platform.hmcts.net',
      'http://user:password@ccd-data-store-api-aat.service.core-compute-aat.internal',
    ]) {
      expect(() => requireAatUrl(url, 'EXUI')).toThrow('approved AAT');
    }
  });

  test('allows only approved HTTPS EXUI preview targets while upstream services remain AAT', () => {
    const preview = 'https://xui-webapp-pr-5491.preview.platform.hmcts.net';
    expect(requireExuiUrl(preview)).toBe(preview);
    expect(() => requireAatUrl(preview, 'workflow')).toThrow('approved AAT');
    for (const url of [
      'http://xui-webapp-pr-5491.preview.platform.hmcts.net',
      'https://other.preview.platform.hmcts.net',
      'https://xui-webapp-pr-5491.preview.platform.hmcts.net.example.com',
      'https://user:password@xui-webapp-pr-5491.preview.platform.hmcts.net',
    ])
      expect(() => requireExuiUrl(url)).toThrow('approved AAT');
  });

  test('requires matching court-admin and supervisor access without rejecting derived supervisor roles', () => {
    const roles = [
      { jurisdiction: 'PRIVATELAW', roleName: 'hearing-centre-admin', primaryLocation: '234946', substantive: 'Y' },
      { jurisdiction: 'PRIVATELAW', roleName: 'task-supervisor', primaryLocation: '234946', substantive: 'N' },
    ];
    const userInfo = { roles: ['caseworker-privatelaw-courtadmin'] };
    expect(requireActionCourt({ userInfo, roleAssignmentInfo: roles })).toBe('234946');
    for (const roleAssignmentInfo of [
      [],
      roles.slice(0, 1),
      [roles[0], { ...roles[1], primaryLocation: 'different' }],
      [...roles, { ...roles[0], primaryLocation: 'different' }],
      [{ ...roles[0], substantive: 'N' }, roles[1]],
    ])
      expect(() => requireActionCourt({ userInfo, roleAssignmentInfo })).toThrow();
    expect(() => requireActionCourt({ userInfo: { roles: [] }, roleAssignmentInfo: roles })).toThrow();
  });

  test('rejects wrong ownership, initial state and missing advertised permission', () => {
    expect(requireOwnedActionTask(ownedTask('owned'), caseReference, 'owned')).toBe('owned-task');
    for (const change of [
      { case_id: '9999999999999999' },
      { name: 'shared' },
      { type: 'different' },
      { task_state: 'assigned' },
      { assignee: 'another-actor' },
      { permissions: { values: ['Read'] } },
    ]) {
      expect(() => requireOwnedActionTask({ ...ownedTask('owned'), ...change }, caseReference, 'owned')).toThrow();
    }
  });

  test('waits only for a uniquely named task on its freshly created case', async () => {
    let taskName = '';
    let key = '';
    let reads = 0;
    const result = await provisionOwnedActionTask({
      createCase: async () => ({ caseReference }),
      sendMessage: async (body) => {
        const message = body as { messageName: string; processVariables: Record<string, { value: string }> };
        expect(message.messageName).toBe('createTaskMessage');
        expect(message.processVariables.caseId.value).toBe(caseReference);
        expect(message.processVariables.taskId?.value).toBe('newCaseTransferredToCourt');
        expect(message.processVariables.taskType).toBeUndefined();
        expect(message.processVariables.roleCategory?.value).toBe('ADMIN');
        expect(Number.isNaN(Date.parse(message.processVariables.delayUntil?.value))).toBe(false);
        taskName = message.processVariables.name.value;
        key = message.processVariables.idempotencyKey.value;
        return 204;
      },
      readTasks: async (id) => {
        expect(id).toBe(caseReference);
        return reads++ === 0 ? [ownedTask('unrelated')] : [ownedTask(taskName)];
      },
      wait: async () => {},
      now: () => 0,
    });
    expect(result).toEqual({ caseReference, taskId: 'owned-task', idempotencyKey: key });
    expect(reads).toBe(2);
  });

  test('workflow errors fail without retrying or searching tasks', async () => {
    let sends = 0;
    await expect(
      provisionOwnedActionTask({
        createCase: async () => ({ caseReference }),
        sendMessage: async () => {
          sends++;
          return 500;
        },
        readTasks: async () => {
          throw new Error('Unexpected task lookup');
        },
        wait: async () => {},
        now: () => 0,
      })
    ).rejects.toThrow('HTTP 500');
    expect(sends).toBe(1);
  });

  test('does not retry a failed task lookup or accept duplicate owned tasks', async () => {
    for (const duplicate of [false, true]) {
      let taskName = '';
      let reads = 0;
      await expect(
        provisionOwnedActionTask({
          createCase: async () => ({ caseReference }),
          sendMessage: async (body) => {
            taskName = (body as any).processVariables.name.value;
            return 204;
          },
          readTasks: async () => {
            reads++;
            if (!duplicate) throw new Error('HTTP 503');
            return [ownedTask(taskName), ownedTask(taskName)];
          },
          wait: async () => {},
          now: () => 0,
        })
      ).rejects.toThrow(duplicate ? 'multiple tasks' : 'HTTP 503');
      expect(reads).toBe(1);
    }
  });

  test('missing task reaches the bounded initiation deadline', async () => {
    let now = 0;
    await expect(
      provisionOwnedActionTask({
        createCase: async () => ({ caseReference }),
        sendMessage: async () => 204,
        readTasks: async () => [],
        wait: async () => {
          now += 60_000;
        },
        now: () => now,
      })
    ).rejects.toThrow('within three minutes');
  });
});
