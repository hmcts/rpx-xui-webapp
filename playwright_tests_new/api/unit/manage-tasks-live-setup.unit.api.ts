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
