import { expect, test } from '@playwright/test';

import {
  __test__ as waLiveTaskProvisioningTest,
  provisionWaTaskForManageTasksCaseWithDeps,
} from '../../E2E/utils/test-setup/waLiveTaskProvisioning.js';

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

test.describe('WA live task provisioning', { tag: '@svc-internal' }, () => {
  test('builds the workflow message with WA-visible case and permission variables', () => {
    const payload = waLiveTaskProvisioningTest.buildWaCreateTaskMessage({
      taskId: 'task-123',
      caseNumber: '1781628830476801',
      jurisdiction: 'EMPLOYMENT',
      caseType: 'ET_EnglandWales',
      taskName: 'Review dynamic Manage Tasks case',
      taskType: 'reviewDynamicManageTasksCase',
      dueDate: '2026-06-18T00:00:00.000Z',
    });

    expect(payload.messageName).toBe('createTaskMessage');
    expect(payload.caseId).toBe('1781628830476801');
    expect(payload.processVariables.caseId.value).toBe('1781628830476801');
    expect(payload.processVariables.jurisdiction.value).toBe('EMPLOYMENT');
    expect(payload.processVariables.caseTypeId.value).toBe('ET_EnglandWales');
    expect(payload.processVariables.location.value).toBe('765324');
    expect(payload.processVariables['tribunal-caseworker'].value).toBe('Read,Refer,Own,Manage,Cancel');
    expect(payload.processVariables['task-supervisor'].value).toBe('Read,Refer,Manage,Cancel');
  });

  test('builds legal-ops organisational role assignments for WA task visibility', () => {
    const payload = waLiveTaskProvisioningTest.buildWaRoleAssignmentRequest({
      actorId: 'dynamic-user-id',
      jurisdiction: 'EMPLOYMENT',
      caseType: 'ET_EnglandWales',
      beginTime: '2026-06-16T10:00:00.000Z',
      reference: 'playwright-manage-tasks-1781628830476801',
    });

    expect(payload.roleRequest).toEqual({
      assignerId: 'dynamic-user-id',
      process: 'playwright-manage-tasks-live-setup',
      reference: 'playwright-manage-tasks-1781628830476801',
      replaceExisting: false,
    });
    expect(payload.requestedRoles.map((role) => role.roleName)).toEqual(['tribunal-caseworker', 'task-supervisor']);
    expect(payload.requestedRoles[0]).toMatchObject({
      actorId: 'dynamic-user-id',
      actorIdType: 'IDAM',
      classification: 'PUBLIC',
      grantType: 'STANDARD',
      roleCategory: 'LEGAL_OPERATIONS',
      roleType: 'ORGANISATION',
      attributes: {
        jurisdiction: 'EMPLOYMENT',
        caseType: 'ET_EnglandWales',
        primaryLocation: '765324',
        baseLocation: '765324',
      },
    });
  });

  test('attaches missing prerequisite diagnostics without calling live services', async () => {
    const attachments: Array<{ name: string; body: string }> = [];
    const result = await provisionWaTaskForManageTasksCaseWithDeps(
      {
        user: {
          id: 'dynamic-user-id',
          email: 'dynamic@example.test',
          password: 'password',
        },
        caseNumber: '1781628830476801',
        jurisdiction: 'EMPLOYMENT',
        caseType: 'ET_EnglandWales',
        testInfo: {
          attach: async (name: string, payload: { body: string | Buffer }) => {
            attachments.push({ name, body: String(payload.body) });
          },
        } as never,
      },
      {
        env: {
          PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'auto',
        },
      }
    );

    expect(result.attempted).toBe(false);
    expect(result.diagnostics.missing).toEqual([
      'SERVICES_WA_WORKFLOW_API_URL',
      'SERVICES_ROLE_ASSIGNMENT_API',
      'ORG_USER_ASSIGNMENT_BEARER_TOKEN or PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN',
    ]);
    expect(attachments[0].name).toBe('manage-tasks-wa-provisioning.json');
    expect(attachments[0].body).toContain('WA task provisioning prerequisites missing');
  });

  test('reports readiness before dynamic user and case setup consume live resources', () => {
    expect(
      waLiveTaskProvisioningTest.resolveWaTaskProvisioningReadiness({
        PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'auto',
        PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN: 'admin-token',
      })
    ).toEqual({
      ready: false,
      mode: 'auto',
      missing: ['SERVICES_WA_WORKFLOW_API_URL', 'SERVICES_ROLE_ASSIGNMENT_API'],
      skipped: 'WA task provisioning prerequisites missing: SERVICES_WA_WORKFLOW_API_URL, SERVICES_ROLE_ASSIGNMENT_API.',
    });

    expect(
      waLiveTaskProvisioningTest.resolveWaTaskProvisioningReadiness({
        PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'workflow',
        SERVICES_WA_WORKFLOW_API_URL: 'http://wa-workflow.test',
        SERVICES_ROLE_ASSIGNMENT_API: 'http://am-role-assignment.test',
        PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN: 'admin-token',
      })
    ).toEqual({
      ready: true,
      mode: 'workflow',
      missing: [],
    });
  });

  test('allows early setup preflight to defer bearer token validation until token hydration has run', () => {
    expect(
      waLiveTaskProvisioningTest.resolveWaTaskProvisioningReadiness(
        {
          PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'workflow',
          SERVICES_WA_WORKFLOW_API_URL: 'http://wa-workflow.test',
          SERVICES_ROLE_ASSIGNMENT_API: 'http://am-role-assignment.test',
        },
        { requireBearerToken: false }
      )
    ).toEqual({
      ready: true,
      mode: 'workflow',
      missing: [],
    });
  });

  test('fails early when workflow mode is required but live prerequisites are missing', async () => {
    const attachments: Array<{ name: string; body: string }> = [];

    await expect(
      provisionWaTaskForManageTasksCaseWithDeps(
        {
          user: {
            id: 'dynamic-user-id',
            email: 'dynamic@example.test',
            password: 'password',
          },
          caseNumber: '1781628830476801',
          jurisdiction: 'EMPLOYMENT',
          caseType: 'ET_EnglandWales',
          testInfo: {
            attach: async (name: string, payload: { body: string | Buffer }) => {
              attachments.push({ name, body: String(payload.body) });
            },
          } as never,
        },
        {
          env: {
            PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'workflow',
          },
        }
      )
    ).rejects.toThrow(/WA task provisioning is required.*prerequisites are missing/);

    expect(attachments[0].name).toBe('manage-tasks-wa-provisioning.json');
    expect(attachments[0].body).toContain('WA task provisioning prerequisites missing');
  });

  test('creates role assignments before sending the workflow message', async () => {
    const calls: Array<{ baseURL: string; url: string; data: unknown }> = [];
    const contexts: Array<{ disposed: boolean }> = [];
    const attachments: Array<{ name: string; body: string }> = [];

    const result = await provisionWaTaskForManageTasksCaseWithDeps(
      {
        user: {
          id: 'dynamic-user-id',
          email: 'dynamic@example.test',
          password: 'password',
        },
        caseNumber: '1781628830476801',
        jurisdiction: 'EMPLOYMENT',
        caseType: 'ET_EnglandWales',
        testInfo: {
          attach: async (name: string, payload: { body: string | Buffer }) => {
            attachments.push({ name, body: String(payload.body) });
          },
        } as never,
      },
      {
        env: {
          PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'workflow',
          SERVICES_WA_WORKFLOW_API_URL: 'http://wa-workflow.test',
          SERVICES_ROLE_ASSIGNMENT_API: 'http://am-role-assignment.test',
          PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN: 'admin-token',
          S2S_TOKEN: 's2s-token',
          PW_E2E_MANAGE_TASKS_IDAM_SECRET: 'idam-secret',
          PW_E2E_MANAGE_TASKS_IDAM_CLIENT_ID: 'xuiwebapp',
        },
        idamUtils: {
          generateIdamToken: async () => 'dynamic-user-token',
        },
        serviceAuthUtils: {
          retrieveToken: async () => 'unused',
        },
        now: () => new Date('2026-06-16T10:00:00.000Z'),
        uuid: () => 'task-123',
        newContext: (async ({ baseURL }: { baseURL?: string }) => {
          const contextState = { disposed: false };
          contexts.push(contextState);
          return {
            post: async (url: string, options: { data?: unknown }) => {
              calls.push({ baseURL: baseURL ?? '', url, data: options.data });
              if (url === '/am/role-assignments') {
                return response(201, {
                  roleAssignmentResponse: {
                    requestedRoles: [{ id: 'assignment-1' }, { id: 'assignment-2' }],
                  },
                });
              }
              return response(204, '');
            },
            dispose: async () => {
              contextState.disposed = true;
            },
          };
        }) as never,
      }
    );

    expect(result).toMatchObject({
      attempted: true,
      taskId: 'task-123',
      roleAssignmentIds: ['assignment-1', 'assignment-2'],
      roleAssignmentReference: 'playwright-manage-tasks-1781628830476801',
      diagnostics: {
        roleAssignmentStatus: 201,
        workflowStatus: 204,
      },
    });
    expect(calls.map((call) => call.url)).toEqual(['/am/role-assignments', '/workflow/message']);
    expect(calls[0].baseURL).toBe('http://am-role-assignment.test');
    expect(calls[1].baseURL).toBe('http://wa-workflow.test');
    expect(contexts.every((context) => context.disposed)).toBe(true);
    expect(attachments[0].body).toContain('"taskId": "task-123"');
  });

  test('cleans up created role assignments when workflow message creation fails', async () => {
    const calls: Array<{ method: string; baseURL: string; url: string }> = [];
    const attachments: Array<{ name: string; body: string }> = [];

    await expect(
      provisionWaTaskForManageTasksCaseWithDeps(
        {
          user: {
            id: 'dynamic-user-id',
            email: 'dynamic@example.test',
            password: 'password',
          },
          caseNumber: '1781628830476801',
          jurisdiction: 'EMPLOYMENT',
          caseType: 'ET_EnglandWales',
          testInfo: {
            attach: async (name: string, payload: { body: string | Buffer }) => {
              attachments.push({ name, body: String(payload.body) });
            },
          } as never,
        },
        {
          env: {
            PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'workflow',
            SERVICES_WA_WORKFLOW_API_URL: 'http://wa-workflow.test',
            SERVICES_ROLE_ASSIGNMENT_API: 'http://am-role-assignment.test',
            PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN: 'admin-token',
            S2S_TOKEN: 's2s-token',
            PW_E2E_MANAGE_TASKS_IDAM_SECRET: 'idam-secret',
          },
          idamUtils: {
            generateIdamToken: async () => 'dynamic-user-token',
          },
          now: () => new Date('2026-06-16T10:00:00.000Z'),
          uuid: () => 'task-123',
          newContext: (async ({ baseURL }: { baseURL?: string }) => {
            return {
              post: async (url: string) => {
                calls.push({ method: 'POST', baseURL: baseURL ?? '', url });
                if (url === '/am/role-assignments') {
                  return response(201, {
                    roleAssignmentResponse: {
                      requestedRoles: [{ id: 'assignment-1' }, { id: 'assignment-2' }],
                    },
                  });
                }
                return response(500, { error: 'workflow unavailable' });
              },
              delete: async (url: string) => {
                calls.push({ method: 'DELETE', baseURL: baseURL ?? '', url });
                return response(204, '');
              },
              dispose: async () => undefined,
            };
          }) as never,
        }
      )
    ).rejects.toThrow(/WA workflow task creation failed with HTTP 500/);

    expect(calls).toEqual([
      { method: 'POST', baseURL: 'http://am-role-assignment.test', url: '/am/role-assignments' },
      { method: 'POST', baseURL: 'http://wa-workflow.test', url: '/workflow/message' },
      {
        method: 'DELETE',
        baseURL: 'http://am-role-assignment.test',
        url: '/am/role-assignments?process=playwright-manage-tasks-live-setup&reference=playwright-manage-tasks-1781628830476801',
      },
    ]);
    expect(attachments.find((attachment) => attachment.name === 'manage-tasks-wa-role-assignment-cleanup.json')?.body).toContain(
      '"reference": "playwright-manage-tasks-1781628830476801"'
    );
  });

  test('prefers role-assignment reference cleanup when a reference is available', async () => {
    const calls: string[] = [];
    const cleanup = await waLiveTaskProvisioningTest.deleteRoleAssignments(
      {
        delete: async (url: string) => {
          calls.push(url);
          return response(204, '');
        },
      } as never,
      [],
      'playwright-manage-tasks-1781628830476801'
    );

    expect(calls).toEqual([
      '/am/role-assignments?process=playwright-manage-tasks-live-setup&reference=playwright-manage-tasks-1781628830476801',
    ]);
    expect(cleanup).toEqual([
      {
        reference: 'playwright-manage-tasks-1781628830476801',
        status: 204,
        ok: true,
        note: undefined,
      },
    ]);
  });

  test('deletes role assignments by idempotent assignment id cleanup', async () => {
    const calls: string[] = [];
    const cleanup = await waLiveTaskProvisioningTest.deleteRoleAssignments(
      {
        delete: async (url: string) => {
          calls.push(url);
          return response(url.endsWith('assignment-2') ? 404 : 204, '');
        },
      } as never,
      ['assignment-1', 'assignment-2', 'assignment-1']
    );

    expect(calls).toEqual(['/am/role-assignments/assignment-1', '/am/role-assignments/assignment-2']);
    expect(cleanup).toEqual([
      {
        assignmentId: 'assignment-1',
        status: 204,
        ok: true,
        note: undefined,
      },
      {
        assignmentId: 'assignment-2',
        status: 404,
        ok: true,
        note: 'already absent',
      },
    ]);
  });
});
