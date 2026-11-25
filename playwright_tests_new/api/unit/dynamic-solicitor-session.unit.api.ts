import { expect, test } from '@playwright/test';
import path from 'node:path';

import { __test__ as dynamicSessionTest } from '../../E2E/utils/test-setup/dynamicSolicitorSession.js';
import { DynamicProvisioningError } from '../../E2E/utils/test-setup/dynamicProvisioningFlow.js';
import { TEST_APP_BASE_URL } from './testAppUrls.js';
import { __test__ as sessionCaptureTest, loadSessionCookies, type LoadedSession } from '../../common/sessionCapture.js';
import { resolveSessionStorageKey } from '../../common/sessionIdentity.js';
import { storageStateFingerprint } from '../../common/sessionStorageState.js';
import { createSessionCacheHarness, syntheticSessionIdentity, syntheticSessionState } from './session-cache.mock.js';

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
        resolveBaseUrl: () => TEST_APP_BASE_URL,
        ensureSessionCookies: async () => ({
          email: 'test@example.com',
          cookies: [{ name: 'session' }] as never,
          storageFile: '/tmp/storage.json',
          storageStateFingerprint: 'test-session-fingerprint',
        }),
        recaptureSession: async () => undefined,
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

  for (const newerReplacement of [false, true]) {
    test(`waitForExuiUserPropagation ${newerReplacement ? 'preserves a newer replacement' : 'recaptures the rejected state'} after unauthorized user details`, async () => {
      const attachedBodies: string[] = [];
      const seenSessionCookieValues: string[] = [];
      let attempt = 0;
      let recaptureCount = 0;
      let loginCount = 0;
      const loadedSessions: LoadedSession[] = [];
      const harness = createSessionCacheHarness();
      const sessionIdentity = syntheticSessionIdentity('dynamic@example.test', 'shared-session', 'EMPLOYMENT_DYNAMIC_SOLICITOR');
      const otherIdentity = syntheticSessionIdentity('other@example.test', 'shared-session', 'OTHER_ACCOUNT');
      const storageFile = path.join(process.cwd(), '.sessions', `${resolveSessionStorageKey(sessionIdentity)}.storage.json`);
      const otherFile = path.join(process.cwd(), '.sessions', `${resolveSessionStorageKey(otherIdentity)}.storage.json`);
      const lockFile = path.join(process.cwd(), '.sessions', `${resolveSessionStorageKey(sessionIdentity)}.lock`);
      const otherState = syntheticSessionState('b-v1');
      harness.files.set(storageFile, syntheticSessionState('a-v1'));
      harness.files.set(otherFile, otherState);

      try {
        await dynamicSessionTest.waitForExuiUserPropagation(
          {
            alias: 'EMPLOYMENT_DYNAMIC_SOLICITOR',
            user: {
              email: 'dynamic@example.test',
              password: 'secret',
              forename: 'Dynamic',
              surname: 'User',
              roleNames: ['caseworker', 'caseworker-employment', 'caseworker-employment-legalrep-solicitor', 'pui-case-manager'],
            },
            sessionIdentity,
            roleContext: {
              jurisdiction: 'employment',
              testType: 'case-create',
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
            resolveBaseUrl: () => TEST_APP_BASE_URL,
            ensureSessionCookies: async (identity) => {
              expect(identity).toBe(sessionIdentity);
              const loaded = loadSessionCookies(identity);
              loadedSessions.push(loaded);
              return loaded;
            },
            recaptureSession: async (identity, rejectedSession) => {
              expect(identity).toBe(sessionIdentity);
              expect(rejectedSession).toBe(loadedSessions[0]);
              expect(rejectedSession.storageFile).toBe(storageFile);
              recaptureCount += 1;
              if (newerReplacement) harness.files.set(storageFile, syntheticSessionState('a-v2'));
              await sessionCaptureTest.sessionCaptureWith([identity], {
                ...harness.captureDeps,
                force: true,
                expectedStaleSession: rejectedSession,
                loginAndPersistSession: async ({ sessionPath }) => {
                  expect(harness.files.has(sessionPath)).toBe(false);
                  loginCount += 1;
                  harness.captureDeps.fs!.writeFileSync(sessionPath, syntheticSessionState('a-v2'));
                },
              });
            },
            createApiContext: async ({ storageState }) => {
              attempt += 1;
              const sessionCookieValue = storageState.cookies.find((cookie) => cookie.name === '__auth__')?.value;
              if (!sessionCookieValue) {
                throw new Error('expected loaded session cookie snapshot');
              }
              seenSessionCookieValues.push(sessionCookieValue);
              return {
                get: async (url: string) => {
                  if (url === '/api/user/details') {
                    if (sessionCookieValue === 'a-v1') {
                      return {
                        status: () => 401,
                        json: async () => ({}),
                        text: async () => '',
                      };
                    }
                    return {
                      status: () => 200,
                      json: async () => ({ userInfo: { uid: 'user-123' } }),
                      text: async () => '',
                    };
                  }
                  return {
                    status: () => 200,
                    json: async () => [{ id: 'employment' }],
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

        expect(recaptureCount).toBe(1);
        expect(attempt).toBe(2);
        expect(seenSessionCookieValues).toEqual(['a-v1', 'a-v2']);
        expect(loadedSessions.map((session) => session.storageFile)).toEqual([storageFile, storageFile]);
        expect(loadedSessions.map((session) => session.storageStateFingerprint)).toEqual([
          storageStateFingerprint(syntheticSessionState('a-v1')),
          storageStateFingerprint(syntheticSessionState('a-v2')),
        ]);
        expect(harness.files.get(otherFile)).toBe(otherState);
        expect(loadSessionCookies(otherIdentity).cookies.map((cookie) => cookie.value)).toEqual(['b-v1', 'b-v1']);
        expect(loginCount).toBe(newerReplacement ? 0 : 1);
        expect(harness.events).toEqual([
          { operation: 'write', path: lockFile },
          { operation: 'lock', path: lockFile },
          ...(newerReplacement
            ? []
            : [
                { operation: 'delete', path: storageFile },
                { operation: 'write', path: storageFile },
              ]),
          { operation: 'release', path: lockFile },
        ]);
        expect(attachedBodies[attachedBodies.length - 1]).toContain('"userDetailsStatus":200');
      } finally {
        harness.dispose();
      }
    });
  }

  test('provisionDynamicSolicitorForAliasFlow returns explicit session identity and runs readiness checks without global runtime mutation', async () => {
    const attachmentNames: string[] = [];
    const observedCallOrder: string[] = [];

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
          expect(args.mode).toBe('internal');
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
        resolveOrganisationId: async () => {
          observedCallOrder.push('resolve-org');
          return {
            source: 'dynamic',
            organisationId: 'org-123',
            name: 'PW Dynamic Org unit',
            status: 'ACTIVE',
            superUser: {
              email: 'dynamic-org-admin@example.test',
              firstName: 'Playwright',
              lastName: 'Dynamic',
            },
            mode: 'dynamic',
            cacheKey: 'unit',
            reusedFromCache: false,
          };
        },
        resolveAssignmentAdmin: async ({ organisationResolution }) => {
          observedCallOrder.push(`resolve-assignment-admin:${organisationResolution.organisationId}`);
          return {
            email: 'assignment-principal@example.test',
            mode: 'internal',
            principalSource: 'configured-assignment-principal',
          };
        },
        outputCreatedUserData: false,
        attachOrganisationResolution: async (testInfo, alias) => {
          observedCallOrder.push(`attach-org:${alias}`);
          await testInfo.attach(`${alias.toLowerCase()}-dynamic-organisation.json`, {
            body: '{}',
            contentType: 'application/json',
          });
        },
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
      'resolve-org',
      'attach-org:SOLICITOR',
      'resolve-assignment-admin:org-123',
      'provision',
      'attach-provision:SOLICITOR',
      'assert-contract',
      'wait-exui',
      'attach-user:SOLICITOR',
    ]);
    expect(attachmentNames).toEqual([
      'solicitor-dynamic-organisation.json',
      'solicitor-attempts.json',
      'solicitor-dynamic-user.json',
    ]);
  });

  test('provisionDynamicSolicitorForAliasFlow attaches failed provisioning attempts before rethrowing', async () => {
    const attachmentNames: string[] = [];
    const observedCallOrder: string[] = [];

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
              'HTTP 503'
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
          resolveOrganisationId: async () => {
            observedCallOrder.push('resolve-org');
            return {
              source: 'dynamic',
              organisationId: 'org-123',
              name: 'PW Dynamic Org unit',
              status: 'ACTIVE',
              superUser: {
                email: 'dynamic-org-admin@example.test',
                firstName: 'Playwright',
                lastName: 'Dynamic',
              },
              mode: 'dynamic',
              cacheKey: 'unit',
              reusedFromCache: false,
            };
          },
          resolveAssignmentAdmin: async ({ organisationResolution }) => {
            observedCallOrder.push(`resolve-assignment-admin:${organisationResolution.organisationId}`);
            return {
              email: 'dynamic-org-admin@example.test',
              assignmentBearerToken: 'dynamic-org-admin-token',
              principalSource: 'dynamic-super-user',
              storageState: '/tmp/dynamic-org-admin.storage.json',
            };
          },
          outputCreatedUserData: false,
          attachOrganisationResolution: async (testInfo, alias) => {
            observedCallOrder.push(`attach-org:${alias}`);
            await testInfo.attach(`${alias.toLowerCase()}-dynamic-organisation.json`, {
              body: '{}',
              contentType: 'application/json',
            });
          },
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

    expect(observedCallOrder).toEqual([
      'resolve-org',
      'attach-org:SOLICITOR',
      'resolve-assignment-admin:org-123',
      'provision',
      'attach-provision:SOLICITOR',
    ]);
    expect(attachmentNames).toEqual(['solicitor-dynamic-organisation.json', 'solicitor-attempts.json']);
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
