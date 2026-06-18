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
  test('builds the workflow API create-task message using the WA standalone-process contract', () => {
    const booleanVariable = (value: boolean) => ({ value, type: 'Boolean' });
    const integerVariable = (value: number) => ({ value, type: 'Integer' });
    const stringVariable = (value: string) => ({ value, type: 'String' });
    const payload = waLiveTaskProvisioningTest.buildWaCreateTaskMessage({
      idempotencyKey: 'idempotency-123',
      roleAssignmentId: 'role-assignment-123',
      caseNumber: '1781628830476801',
      jurisdiction: 'EMPLOYMENT',
      caseType: 'ET_EnglandWales',
      taskName: 'Review dynamic Manage Tasks case',
      taskType: 'reviewDynamicManageTasksCase',
      dueDate: '2026-06-18T00:00:00.000+0000',
      delayUntil: '2026-06-16T00:00:00.000+0000',
    });

    expect(payload).toEqual({
      messageName: 'createTaskMessage',
      processVariables: {
        jurisdiction: stringVariable('EMPLOYMENT'),
        caseTypeId: stringVariable('ET_EnglandWales'),
        caseType: stringVariable('ET_EnglandWales'),
        region: stringVariable('1'),
        location: stringVariable('765324'),
        locationName: stringVariable('Taylor House'),
        staffLocation: stringVariable('Taylor House'),
        securityClassification: stringVariable('PUBLIC'),
        name: stringVariable('Review dynamic Manage Tasks case'),
        taskId: stringVariable('reviewDynamicManageTasksCase'),
        taskType: stringVariable('reviewDynamicManageTasksCase'),
        taskCategory: stringVariable('Case Progression'),
        taskState: stringVariable('unconfigured'),
        roleCategory: stringVariable('LEGAL_OPERATIONS'),
        workType: stringVariable('decision_making_work'),
        caseId: stringVariable('1781628830476801'),
        idempotencyKey: stringVariable('idempotency-123'),
        roleAssignmentId: stringVariable('role-assignment-123'),
        dueDate: stringVariable('2026-06-18T00:00:00.000+0000'),
        delayUntil: stringVariable('2026-06-16T00:00:00.000+0000'),
        workingDaysAllowed: integerVariable(2),
        hasWarnings: booleanVariable(false),
        warningList: stringVariable(''),
        caseManagementCategory: stringVariable('Protection'),
        description: stringVariable('Dynamic Manage Tasks E2E task for EXUI automated case 1781628830476801'),
        'task-supervisor': stringVariable('Read,Refer,Manage,Cancel'),
        'tribunal-caseworker': stringVariable('Read,Refer,Own,Manage,Cancel'),
        'senior-tribunal-caseworker': stringVariable('Read,Refer,Own,Manage,Cancel'),
      },
      correlationKeys: null,
      all: false,
    });
  });

  test('builds legal-ops organisational role assignments for WA task visibility', () => {
    const payload = waLiveTaskProvisioningTest.buildWaRoleAssignmentRequest({
      actorId: 'dynamic-user-id',
      jurisdiction: 'WA',
      beginTime: '2026-06-16T10:00:00.000Z',
      reference: '1781628830476801/tribunal-caseworker/dynamic-manage-tasks',
    });

    expect(payload.roleRequest).toEqual({
      assignerId: 'dynamic-user-id',
      process: 'staff-organisational-role-mapping',
      reference: '1781628830476801/tribunal-caseworker/dynamic-manage-tasks',
      replaceExisting: false,
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
        jurisdiction: 'WA',
        region: '1',
        primaryLocation: '765324',
        baseLocation: '765324',
        workTypes: 'decision_making_work',
      },
      authorisations: [],
    });
  });

  test('builds the WA direct initiation payload for the resolved Camunda task id', () => {
    const payload = waLiveTaskProvisioningTest.buildWaTaskInitiationRequest({
      taskId: 'camunda-task-1',
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
      taskId: 'camunda-task-1',
      caseId: '1781628830476801',
      caseTypeId: 'ET_EnglandWales',
      caseName: 'EXUI automated Manage Tasks case 1781628830476801',
      caseCategory: 'Protection',
      jurisdiction: 'EMPLOYMENT',
      region: '1',
      location: '765324',
      locationName: 'Taylor House',
      created: expect.any(String),
      dueDate: '2026-06-18T00:00:00.000+0000',
      securityClassification: 'PUBLIC',
      title: 'Review dynamic Manage Tasks case',
      roleCategory: 'LEGAL_OPERATIONS',
      workType: 'decision_making_work',
      executionType: 'Manual',
      caseManagementCategory: 'Protection',
      taskCategory: 'Case Progression',
      hasWarnings: false,
      warningList: { values: [] },
      __processCategory__Protection: true,
    });
    expect(payload.task_attributes.created).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+0000$/);
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
            task_type: {
              task_type_id: 'processApplication',
              task_type_name: 'Process Application',
            },
          },
          {
            taskTypeId: 'reviewAppeal',
            taskTypeName: 'Review appeal',
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
      {
        taskType: 'reviewAppeal',
        taskName: 'Review appeal',
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

  test('uses the built-in processApplication fallback only for the WA synthetic jurisdiction', async () => {
    const attachments: Array<{ name: string; body: string }> = [];
    const emptyTaskTypeContext = {
      get: async () => response(200, { task_types: [] }),
    };
    const testInfo = {
      attach: async (name: string, payload: { body: string | Buffer }) => {
        attachments.push({ name, body: String(payload.body) });
      },
    };

    await expect(
      waLiveTaskProvisioningTest.resolveConfiguredTaskType({
        context: emptyTaskTypeContext,
        env: {},
        jurisdiction: 'EMPLOYMENT',
        testInfo,
      })
    ).rejects.toThrow(/WA task type discovery returned no configured task types for jurisdiction EMPLOYMENT/);

    await expect(
      waLiveTaskProvisioningTest.resolveConfiguredTaskType({
        context: emptyTaskTypeContext,
        env: {},
        jurisdiction: 'WA',
        testInfo,
      })
    ).resolves.toEqual({
      taskName: 'process application',
      taskType: 'processApplication',
    });
    expect(attachments.at(-1)?.body).toContain('"source": "wa-default"');
  });

  test('skips provisioning cleanly when live WA provisioning is disabled', async () => {
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
          PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'off',
        },
      }
    );

    expect(result.attempted).toBe(false);
    expect(result.diagnostics.missing).toEqual([]);
    expect(result.diagnostics.workflowApiUrl).toBe('http://wa-workflow-api-aat.service.core-compute-aat.internal');
    expect(result.diagnostics.taskManagementApiUrl).toBe('http://wa-task-management-api-aat.service.core-compute-aat.internal');
    expect(result.diagnostics.camundaApiUrl).toBe('http://camunda-api-aat.service.core-compute-aat.internal/engine-rest/');
    expect(result.diagnostics.roleAssignmentApiUrl).toBe(
      'http://am-role-assignment-service-aat.service.core-compute-aat.internal'
    );
    expect(attachments[0].name).toBe('manage-tasks-wa-provisioning.json');
    expect(attachments[0].body).toContain('WA task provisioning disabled');
  });

  test('reports readiness before dynamic user and case setup consume live resources', () => {
    expect(
      waLiveTaskProvisioningTest.resolveWaTaskProvisioningReadiness({
        PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'auto',
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
        CAMUNDA_URL: 'http://camunda.test/engine-rest/',
        SERVICES_ROLE_ASSIGNMENT_API: 'http://am-role-assignment.test',
      })
    ).toEqual({
      ready: true,
      mode: 'workflow',
      missing: [],
    });
  });

  test('derives preview service URLs without requiring a separate role-assignment principal', () => {
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
      waLiveTaskProvisioningTest.resolveCamundaApiUrl({
        TEST_URL: 'https://xui-webapp-pr-5217.preview.platform.hmcts.net',
      })
    ).toBe('http://camunda-api-aat.service.core-compute-aat.internal/engine-rest/');
    expect(
      waLiveTaskProvisioningTest.resolveHmctsEnvironment({
        TEST_URL: 'https://manage-case.platform.hmcts.net',
      })
    ).toBe('prod');

    expect(
      waLiveTaskProvisioningTest.resolveWaTaskProvisioningReadiness({
        PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'workflow',
        TEST_URL: 'https://xui-webapp-pr-5217.preview.platform.hmcts.net',
      })
    ).toEqual({
      ready: true,
      mode: 'workflow',
      missing: [],
    });
  });

  test('normalises configured Camunda root URLs to the engine-rest API base', () => {
    expect(
      waLiveTaskProvisioningTest.resolveCamundaApiUrl({
        CAMUNDA_URL: 'http://camunda-api-aat.service.core-compute-aat.internal',
      })
    ).toBe('http://camunda-api-aat.service.core-compute-aat.internal/engine-rest/');
    expect(
      waLiveTaskProvisioningTest.resolveCamundaApiUrl({
        CAMUNDA_URL: 'http://camunda-api-aat.service.core-compute-aat.internal/',
      })
    ).toBe('http://camunda-api-aat.service.core-compute-aat.internal/engine-rest/');
    expect(
      waLiveTaskProvisioningTest.resolveCamundaApiUrl({
        CAMUNDA_URL: 'http://camunda-api-aat.service.core-compute-aat.internal/engine-rest/',
      })
    ).toBe('http://camunda-api-aat.service.core-compute-aat.internal/engine-rest/');
  });

  test('fails early when workflow mode is required but S2S cannot be resolved', async () => {
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
            attach: async () => undefined,
          } as never,
        },
        {
          env: {
            PW_E2E_MANAGE_TASKS_WA_PROVISIONING: 'workflow',
            SERVICES_WA_WORKFLOW_API_URL: 'http://wa-workflow.test',
            SERVICES_WORK_ALLOCATION_TASK_API: 'http://wa-task-management.test',
            SERVICES_ROLE_ASSIGNMENT_API: 'http://am-role-assignment.test',
          },
          serviceAuthUtils: {
            retrieveToken: async () => undefined,
          },
        }
      )
    ).rejects.toThrow(/WA task provisioning requires an S2S token/);
  });

  test('uses a WA S2S identity for role assignment without mutating workflow service auth', async () => {
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
          PW_E2E_MANAGE_TASKS_IDAM_SECRET: 'idam-secret',
        },
        idamUtils: {
          generateIdamToken: async ({ username, scope }) => {
            generatedTokenRequests.push({ username, scope });
            return 'dynamic-user-token';
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
              if (url.startsWith('task?processVariables=')) {
                return response(200, [{ id: 'camunda-task-1', name: 'Review the case' }]);
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
    ]);
    expect(serviceTokenRequests).toEqual(['xui_webapp', 'wa_task_management_api', 'wa_task_management_api']);
    expect(contexts).toEqual([
      {
        accept: undefined,
        baseURL: 'http://am-role-assignment-service-aat.service.core-compute-aat.internal',
        authorization: 'Bearer dynamic-user-token',
        serviceAuthorization: 'Bearer wa_task_management_api-token',
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
        baseURL: 'http://camunda-api-aat.service.core-compute-aat.internal/engine-rest/',
        authorization: undefined,
        serviceAuthorization: 'Bearer wa_task_management_api-token',
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
    expect(waLiveTaskProvisioningTest.resolveRoleAssignmentS2sMicroservice({})).toBe('wa_task_management_api');
    expect(
      waLiveTaskProvisioningTest.resolveRoleAssignmentS2sMicroservice({
        S2S_MICROSERVICE_NAME: 'xui_webapp',
        MICROSERVICE: 'xui_webapp',
      })
    ).toBe('wa_task_management_api');
    expect(
      waLiveTaskProvisioningTest.resolveRoleAssignmentS2sMicroservice({
        PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_S2S_MICROSERVICE: 'am_role_assignment_service',
        S2S_MICROSERVICE_NAME: 'xui_webapp',
      })
    ).toBe('am_role_assignment_service');
    expect(waLiveTaskProvisioningTest.resolveTaskInitiationS2sMicroservice({})).toBe('wa_task_management_api');
    expect(
      waLiveTaskProvisioningTest.resolveTaskInitiationS2sMicroservice({
        S2S_MICROSERVICE_NAME: 'xui_webapp',
        MICROSERVICE: 'xui_webapp',
      })
    ).toBe('wa_task_management_api');
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
              if (url.startsWith('task?processVariables=')) {
                return response(200, [{ id: 'camunda-task-1', name: 'Review the case' }]);
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
      taskId: 'camunda-task-1',
      workflowIdempotencyKey: 'task-123',
      roleAssignmentIds: ['assignment-1', 'assignment-2'],
      roleAssignmentReference: '1781628830476801/tribunal-caseworker/dynamic-manage-tasks',
      diagnostics: {
        roleAssignmentStatus: 201,
        roleAssignmentVisibilityStatus: 200,
        workflowStatus: 204,
        camundaTaskVisibilityStatus: 200,
        taskInitiationStatus: 204,
      },
    });
    expect(calls.map((call) => call.url)).toEqual([
      '/am/role-assignments',
      '/am/role-assignments/actors/dynamic-user-id',
      '/task/task-types?jurisdiction=EMPLOYMENT',
      '/workflow/message',
      'task?processVariables=caseId_eq_1781628830476801',
      '/task/camunda-task-1/initiation',
    ]);
    expect(calls[0].baseURL).toBe('http://am-role-assignment.test');
    expect(calls[1].baseURL).toBe('http://am-role-assignment.test');
    expect(calls[2].baseURL).toBe('http://wa-task-management.test');
    expect(calls[3].baseURL).toBe('http://wa-workflow.test');
    expect(calls[4].baseURL).toBe('http://camunda-api-aat.service.core-compute-aat.internal/engine-rest/');
    expect(calls[5].baseURL).toBe('http://wa-task-management.test');
    expect(contexts.every((context) => context.disposed)).toBe(true);
    expect(attachments.find((attachment) => attachment.name === 'manage-tasks-wa-provisioning.json')?.body).toContain(
      '"taskId": "camunda-task-1"'
    );
    expect(attachments.find((attachment) => attachment.name === 'manage-tasks-wa-provisioning.json')?.body).toContain(
      '"workflowIdempotencyKey": "task-123"'
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
            S2S_TOKEN: 's2s-token',
            PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_S2S_TOKEN: 'wa-role-assignment-s2s-token',
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
                if (url.startsWith('task?processVariables=')) {
                  return response(200, [{ id: 'camunda-task-1', name: 'Review the case' }]);
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

  test('attaches task initiation diagnostics and cleans up role assignments when direct initiation fails', async () => {
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
            S2S_TOKEN: 's2s-token',
            PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_S2S_TOKEN: 'wa-role-assignment-s2s-token',
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
                if (url === '/workflow/message') {
                  return response(204, '');
                }
                return response(500, { error: 'task initiation unavailable' });
              },
              get: async (url: string) => {
                calls.push({ method: 'GET', baseURL: baseURL ?? '', url });
                if (url.startsWith('/task/task-types')) {
                  return response(200, {
                    task_types: [{ task_type_id: 'reviewTheCase', task_type_name: 'Review the case' }],
                  });
                }
                if (url.startsWith('task?processVariables=')) {
                  return response(200, [{ id: 'camunda-task-1', name: 'Review the case' }]);
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
    ).rejects.toThrow(/WA task initiation failed with HTTP 500/);

    expect(calls).toEqual([
      { method: 'POST', baseURL: 'http://am-role-assignment.test', url: '/am/role-assignments' },
      { method: 'GET', baseURL: 'http://am-role-assignment.test', url: '/am/role-assignments/actors/dynamic-user-id' },
      { method: 'GET', baseURL: 'http://wa-task-management.test', url: '/task/task-types?jurisdiction=EMPLOYMENT' },
      { method: 'POST', baseURL: 'http://wa-workflow.test', url: '/workflow/message' },
      {
        method: 'GET',
        baseURL: 'http://camunda-api-aat.service.core-compute-aat.internal/engine-rest/',
        url: 'task?processVariables=caseId_eq_1781628830476801',
      },
      { method: 'POST', baseURL: 'http://wa-task-management.test', url: '/task/camunda-task-1/initiation' },
      { method: 'DELETE', baseURL: 'http://am-role-assignment.test', url: '/am/role-assignments/assignment-1' },
      { method: 'DELETE', baseURL: 'http://am-role-assignment.test', url: '/am/role-assignments/assignment-2' },
    ]);
    const initiationDiagnostics = attachments.find(
      (attachment) => attachment.name === 'manage-tasks-wa-task-initiation-failure.json'
    )?.body;
    expect(initiationDiagnostics).toContain('"taskId": "camunda-task-1"');
    expect(initiationDiagnostics).toContain('"status": 500');
    expect(initiationDiagnostics).toContain('"error": "task initiation unavailable"');
    expect(attachments.find((attachment) => attachment.name === 'manage-tasks-wa-role-assignment-cleanup.json')?.body).toContain(
      '"assignmentId": "assignment-1"'
    );
  });

  test('retries WA task initiation once when WA reports a database conflict lock', async () => {
    const calls: Array<{ method: string; baseURL: string; url: string }> = [];
    const attachments: Array<{ name: string; body: string }> = [];
    let initiationCalls = 0;

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
          PW_E2E_MANAGE_TASKS_TASK_INITIATION_RETRY_DELAY_MS: '1',
          SERVICES_WA_WORKFLOW_API_URL: 'http://wa-workflow.test',
          SERVICES_WORK_ALLOCATION_TASK_API: 'http://wa-task-management.test',
          SERVICES_ROLE_ASSIGNMENT_API: 'http://am-role-assignment.test',
          S2S_TOKEN: 's2s-token',
          PW_E2E_MANAGE_TASKS_ROLE_ASSIGNMENT_S2S_TOKEN: 'wa-role-assignment-s2s-token',
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
                    requestedRoles: [{ id: 'assignment-1' }],
                  },
                });
              }
              if (url === '/workflow/message') {
                return response(204, '');
              }
              if (url === '/task/camunda-task-1/initiation') {
                initiationCalls += 1;
                return initiationCalls === 1
                  ? response(503, {
                      type: 'https://github.com/hmcts/wa-task-management-api/problem/database-conflict',
                      title: 'Database Conflict Error',
                    })
                  : response(204, '');
              }
              return response(500, { error: 'unexpected post' });
            },
            get: async (url: string) => {
              calls.push({ method: 'GET', baseURL: baseURL ?? '', url });
              if (url.startsWith('/task/task-types')) {
                return response(200, {
                  task_types: [{ task_type_id: 'reviewTheCase', task_type_name: 'Review the case' }],
                });
              }
              if (url.startsWith('task?processVariables=')) {
                return response(200, [{ id: 'camunda-task-1', name: 'Review the case' }]);
              }
              return response(200, {
                roleAssignmentResponse: [{ id: 'assignment-1', roleName: 'tribunal-caseworker' }],
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
    );

    expect(result.taskId).toBe('camunda-task-1');
    expect(result.diagnostics.taskInitiationStatus).toBe(204);
    expect(calls.filter((call) => call.url === '/task/camunda-task-1/initiation')).toHaveLength(2);
    expect(attachments.find((attachment) => attachment.name === 'manage-tasks-wa-task-initiation-attempts.json')?.body).toContain(
      '"status": 503'
    );
    expect(attachments.find((attachment) => attachment.name === 'manage-tasks-wa-role-assignment-cleanup.json')).toBeUndefined();
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
