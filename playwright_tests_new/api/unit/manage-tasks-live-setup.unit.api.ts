import { expect, test } from '@playwright/test';

import { __test__ as manageTasksLiveSetupTest } from '../../E2E/utils/test-setup/manageTasksLiveSetup.js';

type FakeResponse = {
  status: () => number;
  json: () => Promise<unknown>;
  text: () => Promise<string>;
};

function response(status: number, payload: unknown): FakeResponse {
  return {
    status: () => status,
    json: async () => payload,
    text: async () => JSON.stringify(payload),
  };
}

test.describe('Manage Tasks live setup unit tests', { tag: '@svc-internal' }, () => {
  test('normalizes task payloads from case task search responses', () => {
    const normalized = manageTasksLiveSetupTest.normalizeTask({
      id: 'task-123',
      case_id: '1234567890123456',
      case_name: 'Dynamic Employment Case',
      task_title: 'Review the claim',
      task_state: 'unassigned',
      actions: [{ id: 'claim' }, { id: 'claim-and-go' }],
    });

    expect(normalized).toEqual({
      id: 'task-123',
      caseId: '1234567890123456',
      caseName: 'Dynamic Employment Case',
      taskTitle: 'Review the claim',
      state: 'unassigned',
      actions: ['claim', 'claim-and-go'],
    });
  });

  test('cancels the created WA task during cleanup with the current XSRF token', async () => {
    const attachments: Array<{ name: string; body: string }> = [];
    const posts: Array<{ url: string; data?: unknown; headers?: Record<string, string> }> = [];
    const fakePage = {
      url: () => 'https://xui-webapp.example.test/work/my-work/list',
      context: () => ({
        cookies: async (url?: string) => (url ? [{ name: 'XSRF-TOKEN', value: 'xsrf-token-123' }] : []),
      }),
      request: {
        post: async (url: string, options: { data?: unknown; headers?: Record<string, string> }) => {
          posts.push({ url, data: options.data, headers: options.headers });
          return response(204, '');
        },
      },
    };

    await manageTasksLiveSetupTest.cleanupWaTaskForManageTasksCase({
      page: fakePage as never,
      taskId: 'task-123',
      testInfo: {
        attach: async (name: string, payload: { body: string | Buffer }) => {
          attachments.push({ name, body: String(payload.body) });
        },
      } as never,
    });

    expect(posts).toEqual([
      {
        url: 'workallocation/task/task-123/cancel',
        data: { hasNoAssigneeOnComplete: false },
        headers: { 'X-XSRF-TOKEN': 'xsrf-token-123' },
      },
    ]);
    expect(attachments[0].name).toBe('manage-tasks-wa-task-cleanup.json');
    expect(attachments[0].body).toContain('"ok": true');
    expect(attachments[0].body).toContain('"hasXsrfToken": true');
    expect(attachments[0].body).not.toContain('xsrf-token-123');
    expect(attachments[0].body).toContain('"taskId": "task-123"');
  });

  test('fails cleanup when task cancellation is rejected by auth or downstream services', async () => {
    const attachments: Array<{ name: string; body: string }> = [];
    const fakePage = {
      url: () => 'https://xui-webapp.example.test/work/my-work/list',
      context: () => ({
        cookies: async () => [{ name: 'XSRF-TOKEN', value: 'xsrf-token-123' }],
      }),
      request: {
        post: async () => response(403, { error: 'forbidden' }),
      },
    };

    await expect(
      manageTasksLiveSetupTest.cleanupWaTaskForManageTasksCase({
        page: fakePage as never,
        taskId: 'task-123',
        testInfo: {
          attach: async (name: string, payload: { body: string | Buffer }) => {
            attachments.push({ name, body: String(payload.body) });
          },
        } as never,
      })
    ).rejects.toThrow(/WA task cleanup failed for task-123: cancel returned HTTP 403/);

    expect(attachments[0].name).toBe('manage-tasks-wa-task-cleanup.json');
    expect(attachments[0].body).toContain('"status": 403');
    expect(attachments[0].body).toContain('"ok": false');
  });

  test('runs every cleanup step before reporting cleanup failures', async () => {
    const completedSteps: string[] = [];

    await expect(
      manageTasksLiveSetupTest.runManageTasksCleanupSteps([
        {
          name: 'wa-task-cancel',
          action: async () => {
            completedSteps.push('wa-task-cancel');
            throw new Error('cancel returned HTTP 403');
          },
        },
        {
          name: 'wa-role-assignment-delete',
          action: async () => {
            completedSteps.push('wa-role-assignment-delete');
          },
        },
      ])
    ).rejects.toThrow(/wa-task-cancel: cancel returned HTTP 403/);

    expect(completedSteps).toEqual(['wa-task-cancel', 'wa-role-assignment-delete']);
  });

  test('keeps the original setup failure visible when cleanup also fails', () => {
    const setupError = new Error('Created Employment case 1234567890123456 did not produce a claimable WA task');
    const cleanupError = new Error('WA task cleanup failed for task-123: cancel returned HTTP 403');

    const combinedError = manageTasksLiveSetupTest.buildSetupFailureWithCleanupFailure(setupError, cleanupError);

    expect(combinedError.message).toContain('Setup failure: Created Employment case 1234567890123456');
    expect(combinedError.message).toContain('Cleanup failure: WA task cleanup failed for task-123');
    expect(combinedError.cause).toBe(setupError);
  });

  test('attaches role access diagnostics when no claimable task appears', async () => {
    const envSnapshot = {
      PW_E2E_MANAGE_TASKS_TASK_READY_TIMEOUT_MS: process.env.PW_E2E_MANAGE_TASKS_TASK_READY_TIMEOUT_MS,
      PW_E2E_MANAGE_TASKS_TASK_READY_POLL_INTERVAL_MS: process.env.PW_E2E_MANAGE_TASKS_TASK_READY_POLL_INTERVAL_MS,
    };
    process.env.PW_E2E_MANAGE_TASKS_TASK_READY_TIMEOUT_MS = '1';
    process.env.PW_E2E_MANAGE_TASKS_TASK_READY_POLL_INTERVAL_MS = '1';

    try {
      const attachments: Array<{ name: string; body: string }> = [];
      const postedUrls: string[] = [];
      const fakePage = {
        request: {
          post: async (url: string) => {
            postedUrls.push(url);
            if (url === 'api/role-access/roles/access-get-by-caseId') {
              return response(200, [
                {
                  id: 'role-1',
                  actorId: 'dynamic-user-id',
                  roleName: 'case-manager',
                  roleCategory: 'LEGAL_OPERATIONS',
                  email: 'redacted-by-helper@example.test',
                  name: 'Redacted By Helper',
                },
              ]);
            }
            return response(200, []);
          },
        },
        waitForTimeout: async () => undefined,
      };

      await expect(
        manageTasksLiveSetupTest.waitForClaimableTaskForCase({
          page: fakePage as never,
          caseNumber: '1234567890123456',
          testInfo: {
            attach: async (name: string, payload: { body: string | Buffer }) => {
              attachments.push({ name, body: String(payload.body) });
            },
          } as never,
        })
      ).rejects.toThrow(/Role access status: 200, roles visible: 1/);

      const roleAccessAttachment = attachments.find((attachment) => attachment.name === 'manage-tasks-live-role-access.json');
      expect(roleAccessAttachment?.body).toContain('"roleName": "case-manager"');
      expect(roleAccessAttachment?.body).not.toContain('redacted-by-helper@example.test');
      expect(roleAccessAttachment?.body).not.toContain('Redacted By Helper');
      expect(postedUrls).toContain('workallocation/case/task/1234567890123456');
      expect(postedUrls).toContain('api/role-access/roles/access-get-by-caseId');
    } finally {
      if (envSnapshot.PW_E2E_MANAGE_TASKS_TASK_READY_TIMEOUT_MS === undefined) {
        delete process.env.PW_E2E_MANAGE_TASKS_TASK_READY_TIMEOUT_MS;
      } else {
        process.env.PW_E2E_MANAGE_TASKS_TASK_READY_TIMEOUT_MS = envSnapshot.PW_E2E_MANAGE_TASKS_TASK_READY_TIMEOUT_MS;
      }
      if (envSnapshot.PW_E2E_MANAGE_TASKS_TASK_READY_POLL_INTERVAL_MS === undefined) {
        delete process.env.PW_E2E_MANAGE_TASKS_TASK_READY_POLL_INTERVAL_MS;
      } else {
        process.env.PW_E2E_MANAGE_TASKS_TASK_READY_POLL_INTERVAL_MS = envSnapshot.PW_E2E_MANAGE_TASKS_TASK_READY_POLL_INTERVAL_MS;
      }
    }
  });
});
