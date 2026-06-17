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
      dueDate: '2026-06-18T00:00:00.000+0000',
    });

    expect(payload.messageName).toBe('createTaskMessage');
    expect(payload.caseId).toBe('1781628830476801');
    expect(payload.processVariables.caseId.value).toBe('1781628830476801');
    expect(payload.processVariables.jurisdiction.value).toBe('EMPLOYMENT');
    expect(payload.processVariables.caseTypeId.value).toBe('ET_EnglandWales');
    expect(payload.processVariables.location.value).toBe('765324');
    expect(payload.processVariables.roleCategory.value).toBe('LEGAL_OPERATIONS');
    expect(payload.processVariables['tribunal-caseworker'].value).toBe('Read,Refer,Own,Manage,Cancel');
    expect(payload.processVariables['task-supervisor'].value).toBe('Read,Refer,Manage,Cancel');
  });

  test('builds legal-ops organisational role assignments for WA task visibility', () => {
    const payload = waLiveTaskProvisioningTest.buildWaRoleAssignmentRequest({
      actorId: 'dynamic-user-id',
      jurisdiction: 'EMPLOYMENT',
      caseType: 'ET_EnglandWales',
      beginTime: '2026-06-16T10:00:00.000Z',
      reference: '1781628830476801/tribunal-caseworker/dynamic-manage-tasks',
    });

    expect(payload.roleRequest).toEqual({
      assignerId: 'dynamic-user-id',
      process: 'staff-organisational-role-mapping',
      reference: '1781628830476801/tribunal-caseworker/dynamic-manage-tasks',
      replaceExisting: true,
    });
    expect(payload.requestedRoles.map((role) => role.roleName)).toEqual(['tribunal-caseworker']);
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
        region: '1',
        primaryLocation: '765324',
        baseLocation: '765324',
      },
      authorisations: [],
    });
  });

  test('builds the WA direct initiation payload for the generated task id', () => {
    const payload = waLiveTaskProvisioningTest.buildWaTaskInitiationRequest({
      taskId: 'task-123',
      caseNumber: '1781628830476801',
      jurisdiction: 'EMPLOYMENT',
      caseType: 'ET_EnglandWales',
      taskName: 'Review dynamic Manage Tasks case',
      taskType: 'reviewDynamicManageTasksCase',
      dueDate: '2026-06-18T00:00:00.000+0000',
    });

    expect(payload.operation).toBe('INITIATION');
    expect(payload.task_attributes).toMatchObject({
      taskType: 'reviewDynamicManageTasksCase',
      name: 'Review dynamic Manage Tasks case',
      caseId: '1781628830476801',
      caseTypeId: 'ET_EnglandWales',
      jurisdiction: 'EMPLOYMENT',
      location: '765324',
      locationName: 'Taylor House',
      dueDate: '2026-06-18T00:00:00.000+0000',
      roleCategory: 'LEGAL_OPERATIONS',
      workType: 'hearing_work',
      'tribunal-caseworker': 'Read,Refer,Own,Manage,Cancel',
    });
  });

  test('extracts configured WA task types and supports explicit task type overrides', () => {
    expect(
      waLiveTaskProvisioningTest.extractConfiguredTaskTypes({
        task_types: [
          {
            task_type_id: 'reviewTheCase',
            task_type_name: 'Review the case',
          },
          {
            taskTypeId: 'processApplication',
            taskTypeName: 'Process Application',
          },
          {
            task_type_id: '',
            task_type_name: 'Invalid',
          },
        ],
      })
    ).toEqual([
      {
        taskType: 'reviewTheCase',
        taskName: 'Review the case',
      },
      {
        taskType: 'processApplication',
        taskName: 'Process Application',
      },
    ]);

    expect(
      waLiveTaskProvisioningTest.resolveConfiguredTaskTypeOverride({
        PW_E2E_MANAGE_TASKS_TASK_TYPE: 'processApplication',
        PW_E2E_MANAGE_TASKS_TASK_NAME: 'Process Application',
      })
    ).toEqual({
      taskType: 'processApplication',
      taskName: 'Process Application',
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
      'ORG_USER_ASSIGNMENT_BEARER_TOKEN or PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN or ORG_USER_ASSIGNMENT_USERNAME/ORG_USER_ASSIGNMENT_PASSWORD with IDAM client secret',
    ]);
    expect(result.diagnostics.workflowApiUrl).toBe('http://wa-workflow-api-aat.service.core-compute-aat.internal');
    expect(result.diagnostics.taskManagementApiUrl).toBe('http://wa-task-management-api-aat.service.core-compute-aat.internal');
    expect(result.diagnostics.roleAssignmentApiUrl).toBe(
      'http://am-role-assignment-service-aat.service.core-compute-aat.internal'
    );
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
      ready: true,
      mode: 'auto',
      missing: [],
    });

    expect(
      waLiveTaskProvisioningTest.resolveWaTaskProvisioningReadiness({
        PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'workflow',
        SERVICES_WA_WORKFLOW_API_URL: 'http://wa-workflow.test',
        SERVICES_WORK_ALLOCATION_TASK_API: 'http://wa-task-management.test',
        SERVICES_ROLE_ASSIGNMENT_API: 'http://am-role-assignment.test',
        PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN: 'admin-token',
      })
    ).toEqual({
      ready: true,
      mode: 'workflow',
      missing: [],
    });
  });

  test('derives preview service URLs and accepts hydratable assignment credentials', () => {
    expect(
      waLiveTaskProvisioningTest.resolveWorkflowApiUrl({
        TEST_URL: 'https://xui-webapp-pr-5217.preview.platform.hmcts.net',
      })
    ).toBe('http://wa-workflow-api-aat.service.core-compute-aat.internal');
    expect(
      waLiveTaskProvisioningTest.resolveRoleAssignmentApiUrl({
        TEST_ENV: 'demo',
        TEST_URL: 'https://xui-webapp-pr-5217.preview.platform.hmcts.net',
      })
    ).toBe('http://am-role-assignment-service-demo.service.core-compute-demo.internal');
    expect(
      waLiveTaskProvisioningTest.resolveTaskManagementApiUrl({
        TEST_URL: 'https://xui-webapp-pr-5217.preview.platform.hmcts.net',
      })
    ).toBe('http://wa-task-management-api-aat.service.core-compute-aat.internal');
    expect(
      waLiveTaskProvisioningTest.resolveHmctsEnvironment({
        TEST_URL: 'https://manage-case.platform.hmcts.net',
      })
    ).toBe('prod');

    expect(
      waLiveTaskProvisioningTest.resolveWaTaskProvisioningReadiness({
        PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'workflow',
        TEST_URL: 'https://xui-webapp-pr-5217.preview.platform.hmcts.net',
        ORG_USER_ASSIGNMENT_USERNAME: 'assignment@example.test',
        ORG_USER_ASSIGNMENT_PASSWORD: 'password',
        ORG_USER_ASSIGNMENT_CLIENT_SECRET: 'secret',
      })
    ).toEqual({
      ready: true,
      mode: 'workflow',
      missing: [],
    });
  });

  test('reports missing admin token source before dynamic user and case setup consume live resources', () => {
    expect(
      waLiveTaskProvisioningTest.resolveWaTaskProvisioningReadiness({
        PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'workflow',
        SERVICES_WA_WORKFLOW_API_URL: 'http://wa-workflow.test',
        SERVICES_WORK_ALLOCATION_TASK_API: 'http://wa-task-management.test',
        SERVICES_ROLE_ASSIGNMENT_API: 'http://am-role-assignment.test',
      })
    ).toEqual({
      ready: false,
      mode: 'workflow',
      missing: [
        'ORG_USER_ASSIGNMENT_BEARER_TOKEN or PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN or ORG_USER_ASSIGNMENT_USERNAME/ORG_USER_ASSIGNMENT_PASSWORD with IDAM client secret',
      ],
      skipped:
        'WA task provisioning prerequisites missing: ORG_USER_ASSIGNMENT_BEARER_TOKEN or PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN or ORG_USER_ASSIGNMENT_USERNAME/ORG_USER_ASSIGNMENT_PASSWORD with IDAM client secret.',
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

  test('hydrates the role-assignment admin token when Jenkins provides credentials but no bearer token', async () => {
    const contexts: Array<{ accept?: string; baseURL: string; authorization?: string; serviceAuthorization?: string }> = [];
    const generatedTokenRequests: Array<{ username?: string; scope: string }> = [];
    const serviceTokenRequests: string[] = [];

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
          attach: async () => undefined,
        } as never,
      },
      {
        env: {
          PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'workflow',
          TEST_URL: 'https://xui-webapp-pr-5217.preview.platform.hmcts.net',
          ORG_USER_ASSIGNMENT_USERNAME: 'assignment@example.test',
          ORG_USER_ASSIGNMENT_PASSWORD: 'assignment-password',
          ORG_USER_ASSIGNMENT_CLIENT_SECRET: 'idam-secret',
        },
        idamUtils: {
          generateIdamToken: async ({ username, scope }) => {
            generatedTokenRequests.push({ username, scope });
            return username === 'assignment@example.test' ? 'generated-admin-token' : 'dynamic-user-token';
          },
        },
        serviceAuthUtils: {
          retrieveToken: async ({ microservice }: { microservice: string }) => {
            serviceTokenRequests.push(microservice);
            return `${microservice}-token`;
          },
        },
        now: () => new Date('2026-06-16T10:00:00.000Z'),
        uuid: () => 'task-123',
        newContext: (async ({ baseURL, extraHTTPHeaders }: { baseURL?: string; extraHTTPHeaders?: Record<string, string> }) => {
          contexts.push({
            accept: extraHTTPHeaders?.Accept,
            baseURL: baseURL ?? '',
            authorization: extraHTTPHeaders?.Authorization,
            serviceAuthorization: extraHTTPHeaders?.ServiceAuthorization,
          });
          return {
            post: async (url: string) => {
              if (url === '/am/role-assignments') {
                return response(201, {
                  roleAssignmentResponse: {
                    requestedRoles: [{ id: 'assignment-1' }],
                  },
                });
              }
              return response(204, '');
            },
            get: async (url: string) => {
              if (url.startsWith('/task/task-types')) {
                return response(200, {
                  task_types: [{ task_type_id: 'reviewTheCase', task_type_name: 'Review the case' }],
                });
              }
              return response(200, {
                roleAssignmentResponse: [{ id: 'assignment-1', roleName: 'tribunal-caseworker' }],
              });
            },
            dispose: async () => undefined,
          };
        }) as never,
      }
    );

    expect(result.attempted).toBe(true);
    expect(generatedTokenRequests).toEqual([
      { username: 'dynamic@example.test', scope: 'openid profile roles manage-user search-user' },
      { username: 'assignment@example.test', scope: 'openid profile roles' },
    ]);
    expect(serviceTokenRequests).toEqual(['xui_webapp', 'wa_task_management_api']);
    expect(contexts).toEqual([
      {
        accept: undefined,
        baseURL: 'http://am-role-assignment-service-aat.service.core-compute-aat.internal',
        authorization: 'Bearer generated-admin-token',
        serviceAuthorization: 'Bearer xui_webapp-token',
      },
      {
        accept: 'application/json',
        baseURL: 'http://wa-workflow-api-aat.service.core-compute-aat.internal',
        authorization: 'Bearer dynamic-user-token',
        serviceAuthorization: 'Bearer xui_webapp-token',
      },
      {
        accept: 'application/json',
        baseURL: 'http://wa-task-management-api-aat.service.core-compute-aat.internal',
        authorization: 'Bearer dynamic-user-token',
        serviceAuthorization: 'Bearer xui_webapp-token',
      },
      {
        accept: 'application/json',
        baseURL: 'http://wa-task-management-api-aat.service.core-compute-aat.internal',
        authorization: undefined,
        serviceAuthorization: 'Bearer wa_task_management_api-token',
      },
    ]);
  });

  test('uses an exclusive WA S2S identity for direct task initiation', () => {
    expect(waLiveTaskProvisioningTest.resolveTaskInitiationS2sMicroservice({})).toBe('wa_task_management_api');
    expect(
      waLiveTaskProvisioningTest.resolveTaskInitiationS2sMicroservice({
        PW_E2E_MANAGE_TASKS_TASK_INITIATION_S2S_MICROSERVICE: 'wa_workflow_api',
        S2S_MICROSERVICE_NAME: 'xui_webapp',
      })
    ).toBe('wa_workflow_api');
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
          SERVICES_WORK_ALLOCATION_TASK_API: 'http://wa-task-management.test',
          SERVICES_ROLE_ASSIGNMENT_API: 'http://am-role-assignment.test',
          PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN: 'admin-token',
          S2S_TOKEN: 's2s-token',
          PW_E2E_MANAGE_TASKS_TASK_INITIATION_S2S_TOKEN: 'wa-exclusive-s2s-token',
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
            get: async (url: string) => {
              calls.push({ baseURL: baseURL ?? '', url, data: undefined });
              if (url.startsWith('/task/task-types')) {
                return response(200, {
                  task_types: [{ task_type_id: 'reviewTheCase', task_type_name: 'Review the case' }],
                });
              }
              return response(200, {
                roleAssignmentResponse: [
                  { id: 'assignment-1', roleName: 'tribunal-caseworker' },
                  { id: 'assignment-2', roleName: 'tribunal-caseworker' },
                ],
              });
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
      roleAssignmentReference: '1781628830476801/tribunal-caseworker/dynamic-manage-tasks',
      diagnostics: {
        roleAssignmentStatus: 201,
        roleAssignmentVisibilityStatus: 200,
        workflowStatus: 204,
        taskInitiationStatus: 204,
      },
    });
    expect(calls.map((call) => call.url)).toEqual([
      '/am/role-assignments',
      '/am/role-assignments/actors/dynamic-user-id',
      '/task/task-types?jurisdiction=EMPLOYMENT',
      '/workflow/message',
      '/task/task-123/initiation',
    ]);
    expect(calls[0].baseURL).toBe('http://am-role-assignment.test');
    expect(calls[1].baseURL).toBe('http://am-role-assignment.test');
    expect(calls[2].baseURL).toBe('http://wa-task-management.test');
    expect(calls[3].baseURL).toBe('http://wa-workflow.test');
    expect(calls[4].baseURL).toBe('http://wa-task-management.test');
    expect(contexts.every((context) => context.disposed)).toBe(true);
    expect(attachments.find((attachment) => attachment.name === 'manage-tasks-wa-provisioning.json')?.body).toContain(
      '"taskId": "task-123"'
    );
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
            SERVICES_WORK_ALLOCATION_TASK_API: 'http://wa-task-management.test',
            SERVICES_ROLE_ASSIGNMENT_API: 'http://am-role-assignment.test',
            PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_BEARER_TOKEN: 'admin-token',
            S2S_TOKEN: 's2s-token',
            PW_E2E_MANAGE_TASKS_TASK_INITIATION_S2S_TOKEN: 'wa-exclusive-s2s-token',
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
              get: async (url: string) => {
                calls.push({ method: 'GET', baseURL: baseURL ?? '', url });
                if (url.startsWith('/task/task-types')) {
                  return response(200, {
                    task_types: [{ task_type_id: 'reviewTheCase', task_type_name: 'Review the case' }],
                  });
                }
                return response(200, {
                  roleAssignmentResponse: [
                    { id: 'assignment-1', roleName: 'tribunal-caseworker' },
                    { id: 'assignment-2', roleName: 'tribunal-caseworker' },
                  ],
                });
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
      { method: 'GET', baseURL: 'http://am-role-assignment.test', url: '/am/role-assignments/actors/dynamic-user-id' },
      { method: 'GET', baseURL: 'http://wa-task-management.test', url: '/task/task-types?jurisdiction=EMPLOYMENT' },
      { method: 'POST', baseURL: 'http://wa-workflow.test', url: '/workflow/message' },
      { method: 'DELETE', baseURL: 'http://am-role-assignment.test', url: '/am/role-assignments/assignment-1' },
      { method: 'DELETE', baseURL: 'http://am-role-assignment.test', url: '/am/role-assignments/assignment-2' },
    ]);
    expect(attachments.find((attachment) => attachment.name === 'manage-tasks-wa-role-assignment-cleanup.json')?.body).toContain(
      '"assignmentId": "assignment-1"'
    );
  });

  test('reports unsupported cleanup when AM does not return assignment ids', async () => {
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

    expect(calls).toEqual([]);
    expect(cleanup).toEqual([
      {
        reference: 'playwright-manage-tasks-1781628830476801',
        status: 0,
        ok: false,
        note: 'No role assignment ids were returned by AM; cleanup by reference is not a supported AM delete contract',
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
