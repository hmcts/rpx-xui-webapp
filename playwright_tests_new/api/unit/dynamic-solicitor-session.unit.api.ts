import { expect, test } from '@playwright/test';

import { __test__ as dynamicSessionTest } from '../../E2E/utils/test-setup/dynamicSolicitorSession.js';
import { DynamicProvisioningError } from '../../E2E/utils/test-setup/dynamicProvisioningFlow.js';

test.describe.configure({ mode: 'serial' });

test.describe('Dynamic solicitor session unit tests', { tag: '@svc-internal' }, () => {
  test('waitForExuiUserPropagation keeps polling until the expected jurisdiction is available', async () => {
    const attachedBodies: string[] = [];
    let attempt = 0;

    await dynamicSessionTest.waitForExuiUserPropagation(
      {
        alias: 'SOLICITOR',
        user: {
          email: 'dynamic@example.test',
          password: 'secret',
          forename: 'Dynamic',
          surname: 'User',
          roleNames: ['caseworker'],
          organisationAssignment: {
            status: 201,
            organisationId: 'test-org',
            userIdentifier: 'user-123',
            roles: ['caseworker'],
            mode: 'external',
            requestedMode: 'auto',
            attemptedModes: ['external'],
          },
        },
        sessionIdentity: {
          userIdentifier: 'SOLICITOR',
          email: 'dynamic@example.test',
          password: 'secret',
          sessionKey: 'dynamic-solicitor-user-123',
        },
        roleContext: {
          jurisdiction: 'employment',
        },
        testInfo: {
          attach: async (_name: string, payload: { body: string | Buffer }) => {
            attachedBodies.push(String(payload.body));
          },
        } as never,
      },
      {
        resolveTimeoutMs: () => 5_000,
        resolvePollIntervalMs: () => 1,
        resolveBaseUrl: () => 'https://manage-case.aat.platform.hmcts.net',
        ensureSessionCookies: async () => ({
          email: 'test@example.com',
          cookies: [{ name: 'session' }] as never,
          storageFile: '/tmp/storage.json',
        }),
        createApiContext: async () => {
          attempt += 1;
          return {
            get: async (url: string) => {
              if (url === '/api/user/details') {
                return {
                  status: () => 200,
                  json: async () => ({ userInfo: { uid: 'user-123' } }),
                  text: async () => '',
                };
              }
              return {
                status: () => 200,
                json: async () => (attempt === 1 ? [] : [{ id: 'employment' }]),
                text: async () => '',
              };
            },
            dispose: async () => undefined,
          } as never;
        },
        attachAttempts: async (_info, _alias, attempts) => {
          attachedBodies.push(JSON.stringify(attempts));
        },
        sleep: async () => undefined,
        info: () => undefined,
      }
    );

    expect(attempt).toBe(2);
    expect(attachedBodies[attachedBodies.length - 1]).toContain('"ready":true');
  });

  test('provisionDynamicSolicitorForAliasFlow returns explicit session identity and runs readiness checks without global runtime mutation', async () => {
    const originalOrganisationId = process.env.TEST_SOLICITOR_ORGANISATION_ID;
    process.env.TEST_SOLICITOR_ORGANISATION_ID = 'org-123';

    const attachmentNames: string[] = [];
    const observedCallOrder: string[] = [];

    try {
      const handle = await dynamicSessionTest.provisionDynamicSolicitorForAliasFlow(
        {
          alias: 'SOLICITOR',
          professionalUserUtils: {
            createSolicitorUserForOrganisation: async () => {
              throw new Error('should be stubbed via provisionUserWithRetries');
            },
          } as never,
          roleContext: {
            jurisdiction: 'employment',
          },
          testInfo: {
            attach: async (name: string) => {
              attachmentNames.push(name);
            },
          } as never,
        },
        {
          shouldRunEmploymentAssignmentPreflight: () => false,
          runEmploymentAssignmentPreflight: async () => {
            observedCallOrder.push('preflight');
          },
          provisionUserWithRetries: async (args) => {
            observedCallOrder.push('provision');
            expect(args.alias).toBe('SOLICITOR');
            expect(args.organisationId).toBe('org-123');
            return {
              user: {
                id: 'user-123',
                email: 'dynamic@example.test',
                password: 'secret',
                forename: 'Dynamic',
                surname: 'User',
                roleNames: ['caseworker', 'pui-case-manager'],
                organisationAssignment: {
                  status: 201,
                  organisationId: 'org-123',
                  userIdentifier: 'user-123',
                  roles: ['caseworker', 'pui-case-manager'],
                  mode: 'external',
                  requestedMode: 'auto',
                  attemptedModes: ['external'],
                },
              },
              attempts: [{ attempt: 1, durationMs: 5, outcome: 'success' }],
            };
          },
          resolveProvisionTimeoutMs: () => 5_000,
          resolveProvisionMaxAttempts: () => 2,
          resolveProvisionRetryDelayMs: () => 1,
          withTimeout: async (operation) => operation,
          shouldRetryDynamicProvision: () => false,
          describeUnknownError: (error) => (error instanceof Error ? error.message : String(error)),
          sleep: async () => undefined,
          now: () => 100,
          outputCreatedUserData: false,
          attachProvisionAttempts: async (testInfo, alias) => {
            observedCallOrder.push(`attach-provision:${alias}`);
            await testInfo.attach(`${alias.toLowerCase()}-attempts.json`, {
              body: '{}',
              contentType: 'application/json',
            });
          },
          assertDynamicUserRoleContract: () => {
            observedCallOrder.push('assert-contract');
          },
          waitForExuiUserPropagation: async ({ sessionIdentity }) => {
            observedCallOrder.push('wait-exui');
            expect(sessionIdentity).toEqual({
              userIdentifier: 'SOLICITOR',
              email: 'dynamic@example.test',
              password: 'secret',
              sessionKey: 'dynamic-solicitor-user-123',
            });
          },
          attachDynamicUser: async (testInfo, alias) => {
            observedCallOrder.push(`attach-user:${alias}`);
            await testInfo.attach(`${alias.toLowerCase()}-dynamic-user.json`, {
              body: '{}',
              contentType: 'application/json',
            });
          },
          info: () => undefined,
          warn: () => undefined,
        }
      );

      expect(handle.sessionIdentity).toEqual({
        userIdentifier: 'SOLICITOR',
        email: 'dynamic@example.test',
        password: 'secret',
        sessionKey: 'dynamic-solicitor-user-123',
      });

      expect(observedCallOrder).toEqual([
        'provision',
        'attach-provision:SOLICITOR',
        'assert-contract',
        'wait-exui',
        'attach-user:SOLICITOR',
      ]);
      expect(attachmentNames).toEqual(['solicitor-attempts.json', 'solicitor-dynamic-user.json']);
    } finally {
      if (typeof originalOrganisationId === 'string') {
        process.env.TEST_SOLICITOR_ORGANISATION_ID = originalOrganisationId;
      } else {
        delete process.env.TEST_SOLICITOR_ORGANISATION_ID;
      }
    }
  });

  test('provisionDynamicSolicitorForAliasFlow attaches failed provisioning attempts before rethrowing', async () => {
    const originalOrganisationId = process.env.TEST_SOLICITOR_ORGANISATION_ID;
    process.env.TEST_SOLICITOR_ORGANISATION_ID = 'org-123';

    const attachmentNames: string[] = [];
    const observedCallOrder: string[] = [];

    try {
      await expect(
        dynamicSessionTest.provisionDynamicSolicitorForAliasFlow(
          {
            alias: 'SOLICITOR',
            professionalUserUtils: {
              createSolicitorUserForOrganisation: async () => {
                throw new Error('should be stubbed via provisionUserWithRetries');
              },
            } as never,
            roleContext: {
              jurisdiction: 'employment',
            },
            testInfo: {
              attach: async (name: string) => {
                attachmentNames.push(name);
              },
            } as never,
          },
          {
            shouldRunEmploymentAssignmentPreflight: () => false,
            runEmploymentAssignmentPreflight: async () => undefined,
            provisionUserWithRetries: async () => {
              observedCallOrder.push('provision');
              throw new DynamicProvisioningError(
                "Dynamic user provisioning failed for alias 'SOLICITOR' after 2 attempt(s).",
                [
                  { attempt: 1, durationMs: 5, outcome: 'failed', error: 'HTTP 503' },
                  { attempt: 2, durationMs: 7, outcome: 'failed', error: 'HTTP 503' },
                ],
                new Error('HTTP 503')
              );
            },
            resolveProvisionTimeoutMs: () => 5_000,
            resolveProvisionMaxAttempts: () => 2,
            resolveProvisionRetryDelayMs: () => 1,
            withTimeout: async (operation) => operation,
            shouldRetryDynamicProvision: () => true,
            describeUnknownError: (error) => (error instanceof Error ? error.message : String(error)),
            sleep: async () => undefined,
            now: () => 100,
            outputCreatedUserData: false,
            attachProvisionAttempts: async (testInfo, alias) => {
              observedCallOrder.push(`attach-provision:${alias}`);
              await testInfo.attach(`${alias.toLowerCase()}-attempts.json`, {
                body: '{}',
                contentType: 'application/json',
              });
            },
            assertDynamicUserRoleContract: () => {
              observedCallOrder.push('assert-contract');
            },
            waitForExuiUserPropagation: async () => {
              observedCallOrder.push('wait-exui');
            },
            attachDynamicUser: async (testInfo, alias) => {
              observedCallOrder.push(`attach-user:${alias}`);
              await testInfo.attach(`${alias.toLowerCase()}-dynamic-user.json`, {
                body: '{}',
                contentType: 'application/json',
              });
            },
            info: () => undefined,
            warn: () => undefined,
          }
        )
      ).rejects.toThrow(/Dynamic user provisioning failed/);

      expect(observedCallOrder).toEqual(['provision', 'attach-provision:SOLICITOR']);
      expect(attachmentNames).toEqual(['solicitor-attempts.json']);
    } finally {
      if (typeof originalOrganisationId === 'string') {
        process.env.TEST_SOLICITOR_ORGANISATION_ID = originalOrganisationId;
      } else {
        delete process.env.TEST_SOLICITOR_ORGANISATION_ID;
      }
    }
  });

  test('assertDynamicUserRoleContract rejects filtered employment assignment roles', () => {
    expect(() =>
      dynamicSessionTest.assertDynamicUserRoleContract({
        alias: 'EMPLOYMENT_DYNAMIC_SOLICITOR',
        roleContext: {
          jurisdiction: 'employment',
          testType: 'document-upload',
        },
        resolvedRoleNames: ['caseworker-employment', 'caseworker-employment-legalrep-solicitor', 'pui-case-manager'],
        user: {
          id: 'user-123',
          email: 'dynamic@example.test',
          password: 'secret',
          forename: 'Dynamic',
          surname: 'User',
          roleNames: ['caseworker-employment', 'caseworker-employment-legalrep-solicitor', 'pui-case-manager'],
          organisationAssignment: {
            status: 201,
            organisationId: 'test-org',
            userIdentifier: 'user-123',
            roles: [
              'caseworker',
              'caseworker-employment',
              'caseworker-employment-api',
              'caseworker-employment-legalrep-solicitor',
              'pui-case-manager',
            ],
            mode: 'external',
            requestedMode: 'auto',
            attemptedModes: ['external'],
          },
        },
      })
    ).toThrow(/filtered role 'caseworker-employment-api' was present/i);
  });

  test('assertDynamicUserRoleContract enforces baseline solicitor roles after filtering disallowed IDAM roles', () => {
    expect(() =>
      dynamicSessionTest.assertDynamicUserRoleContract({
        alias: 'EMPLOYMENT_DYNAMIC_SOLICITOR',
        roleContext: {
          jurisdiction: 'employment',
          testType: 'document-upload',
        },
        resolvedRoleNames: ['caseworker-employment', 'pui-case-manager', 'pui-user-manager'],
        user: {
          id: 'user-123',
          email: 'dynamic@example.test',
          password: 'secret',
          forename: 'Dynamic',
          surname: 'User',
          roleNames: ['caseworker-employment', 'pui-case-manager'],
          organisationAssignment: {
            status: 201,
            organisationId: 'test-org',
            userIdentifier: 'user-123',
            roles: ['caseworker-employment', 'pui-case-manager'],
            mode: 'external',
            requestedMode: 'auto',
            attemptedModes: ['external'],
          },
        },
      })
    ).toThrow(/baseline IDAM role contract mismatch/i);
  });
});
