import { expect, test } from '@playwright/test';

import { __test__ as dynamicSessionTest } from '../../E2E/utils/test-setup/dynamicSolicitorSession.js';

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

  test('provisionDynamicSolicitorForAliasFlow runs the extracted orchestration and restores runtime credentials', async () => {
    const originalOrganisationId = process.env.TEST_SOLICITOR_ORGANISATION_ID;
    process.env.TEST_SOLICITOR_ORGANISATION_ID = 'org-123';

    const runtimeCredentials = new Map<string, { email: string; password: string }>();
    runtimeCredentials.set('SOLICITOR', {
      email: 'original@example.test',
      password: 'original-secret',
    });

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
          provisionUserWithRetries: async (args, _deps) => {
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
          withPublishedRuntimeUserCredentials: async (alias, user, action) => {
            observedCallOrder.push(`publish-temp:${alias}`);
            const previous = runtimeCredentials.get(alias);
            runtimeCredentials.set(alias, {
              email: user.email,
              password: user.password,
            });
            try {
              return await action();
            } finally {
              if (previous) {
                runtimeCredentials.set(alias, previous);
              } else {
                runtimeCredentials.delete(alias);
              }
            }
          },
          waitForExuiUserPropagation: async () => {
            observedCallOrder.push('wait-exui');
            expect(runtimeCredentials.get('SOLICITOR')).toEqual({
              email: 'dynamic@example.test',
              password: 'secret',
            });
          },
          attachDynamicUser: async (testInfo, alias) => {
            observedCallOrder.push(`attach-user:${alias}`);
            await testInfo.attach(`${alias.toLowerCase()}-dynamic-user.json`, {
              body: '{}',
              contentType: 'application/json',
            });
          },
          getRuntimeUserCredentials: (alias) => runtimeCredentials.get(alias),
          setRuntimeUserCredentials: (alias, credentials) => {
            runtimeCredentials.set(alias, credentials);
          },
          clearRuntimeUserCredentials: (alias) => {
            runtimeCredentials.delete(alias);
          },
          info: () => undefined,
          warn: () => undefined,
        }
      );

      expect(runtimeCredentials.get('SOLICITOR')).toEqual({
        email: 'original@example.test',
        password: 'original-secret',
      });

      handle.publishSessionCredentials();
      expect(runtimeCredentials.get('SOLICITOR')).toEqual({
        email: 'dynamic@example.test',
        password: 'secret',
      });

      await handle.cleanup();
      expect(runtimeCredentials.get('SOLICITOR')).toEqual({
        email: 'original@example.test',
        password: 'original-secret',
      });

      expect(observedCallOrder).toEqual([
        'provision',
        'attach-provision:SOLICITOR',
        'assert-contract',
        'publish-temp:SOLICITOR',
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
