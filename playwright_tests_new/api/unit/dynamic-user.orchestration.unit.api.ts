import { expect, test } from '@playwright/test';

import {
  createUserViaSidamFirstFlow,
  createUserViaTestingSupportFlow,
} from '../../E2E/utils/professional-user/idamProvisioning.js';
import { ensureUserAccountActiveFlow, updateExistingUserFlow } from '../../E2E/utils/professional-user/idamAccountAdmin.js';
import {
  collectAssignmentFailureDiagnosticsFlow,
  reconcileExistingOrganisationAssignmentFlow,
} from '../../E2E/utils/professional-user/assignmentDiagnostics.js';
import {
  assertExpectedAssignmentPrincipalFlow,
  resolveAssignmentBearerTokenFlow,
  resolveCreateUserBearerTokenFlow,
  tryGenerateAssignmentBearerTokenFromCredentialsFlow,
} from '../../E2E/utils/professional-user/tokenHydration.js';
import { waitForUserPropagationFlow } from '../../E2E/utils/professional-user/propagationProbe.js';
import { provisionUserWithRetries } from '../../E2E/utils/test-setup/dynamicProvisioningFlow.js';

test.describe.configure({ mode: 'serial' });

test.describe('Dynamic user support unit tests: orchestration flows', { tag: '@svc-internal' }, () => {
  test('createUserViaTestingSupportFlow reconciles a 409 via updateExistingUser', async () => {
    const updatedUser = {
      id: 'updated-user-id',
      email: 'existing@example.test',
      password: 'secret',
      forename: 'Existing',
      surname: 'User',
      roleNames: ['caseworker', 'pui-case-manager'],
    };
    const emitCalls: Array<{ createPath: string; userEmail: string }> = [];

    const result = await createUserViaTestingSupportFlow(
      {
        token: 'create-token',
        password: 'secret',
        identity: {
          email: 'existing@example.test',
          forename: 'Existing',
          surname: 'User',
        },
        roleNames: ['caseworker', 'caseworker', 'pui-case-manager'],
        attempts: 2,
      },
      {
        createUser: async () => {
          throw new Error('conflict');
        },
        createUserViaSidamAccounts: async () => {
          throw new Error('should-not-fallback');
        },
        ensureUserAccountActive: async () => {
          throw new Error('should-not-activate');
        },
        updateExistingUser: async () => updatedUser,
        emitCreatedUserData: ({ createPath, user }) => {
          emitCalls.push({ createPath, userEmail: user.email });
        },
        parseStatusCode: () => 409,
        shouldFallbackToSidamAccounts: () => false,
        isRetryableStatus: () => false,
        createError: (_error, message) => new Error(message),
        sleep: async () => undefined,
        warn: () => undefined,
      }
    );

    expect(result).toEqual(updatedUser);
    expect(emitCalls).toEqual([{ createPath: 'idam-update-existing', userEmail: 'existing@example.test' }]);
  });

  test('createUserViaSidamFirstFlow regenerates identity after 409 when no create-user token is available', async () => {
    const attemptEmails: string[] = [];
    const regeneratedIdentity = {
      email: 'fresh@example.test',
      forename: 'Fresh',
      surname: 'User',
    };

    const result = await createUserViaSidamFirstFlow(
      {
        password: 'secret',
        identity: {
          email: 'clashing@example.test',
          forename: 'Clashing',
          surname: 'User',
        },
        roleNames: ['caseworker'],
        attempts: 2,
        emailPrefix: 'solicitor',
        roleSelection: {
          source: 'context-driven',
          roleProfile: 'minimal',
          roleNames: ['caseworker'],
          context: {
            jurisdiction: 'divorce',
            testType: undefined,
            caseType: undefined,
          },
        },
      },
      {
        createUserViaSidamAccounts: async ({ identity }) => {
          attemptEmails.push(identity.email);
          if (attemptEmails.length === 1) {
            throw new Error('conflict');
          }
          return {
            id: 'sidam-user-id',
            email: identity.email,
            password: 'secret',
            forename: identity.forename,
            surname: identity.surname,
            roleNames: ['caseworker'],
          };
        },
        ensureUserAccountActive: async () => {
          throw new Error('should-not-activate-without-token');
        },
        updateExistingUser: async () => {
          throw new Error('should-not-update-without-token');
        },
        emitCreatedUserData: () => undefined,
        parseStatusCode: () => 409,
        isRetryableStatus: () => false,
        createError: (_error, message) => new Error(message),
        createIdentity: () => regeneratedIdentity,
        sleep: async () => undefined,
        warn: () => undefined,
      }
    );

    expect(attemptEmails).toEqual(['clashing@example.test', 'fresh@example.test']);
    expect(result.email).toBe('fresh@example.test');
  });

  test('waitForUserPropagationFlow reports degraded success when only the IDAM API presence probe is available', async () => {
    const result = await waitForUserPropagationFlow(
      {
        email: 'solicitor@example.test',
        password: 'secret',
        forename: 'Sally',
        surname: 'Solicitor',
        roleNames: ['caseworker'],
      },
      {
        resolveCreateUserBearerToken: async () => 'create-token',
        getUserInfoByEmail: async () => undefined,
        tryGenerateUserPasswordGrantToken: async () => undefined,
        probeIdamUserInfo: async () => ({ status: 500 }),
        createError: (_error, message) => new Error(message),
        sleep: async () => undefined,
        warn: () => undefined,
      }
    );

    expect(result).toEqual({
      verified: true,
      degraded: true,
      reason: 'idam-api-only',
    });
  });

  test('provisionUserWithRetries retries retryable provisioning failures and returns the successful user plus attempt history', async () => {
    const timestamps = [100, 110, 120, 145];
    let createAttempts = 0;

    const result = await provisionUserWithRetries(
      {
        alias: 'SOLICITOR',
        organisationId: 'org-123',
        roleContext: {
          jurisdiction: 'employment',
        },
        roleNames: ['caseworker'],
        mode: 'auto',
        timeoutMs: 30_000,
        maxAttempts: 2,
        retryDelayMs: 5,
      },
      {
        createSolicitorUserForOrganisation: async () => {
          createAttempts += 1;
          if (createAttempts === 1) {
            throw new Error('HTTP 503');
          }
          return {
            id: 'created-user-id',
            email: 'dynamic@example.test',
            password: 'secret',
            forename: 'Dynamic',
            surname: 'User',
            roleNames: ['caseworker'],
            organisationAssignment: {
              status: 201,
              userIdentifier: 'created-user-id',
              roles: ['caseworker'],
              mode: 'external',
              requestedMode: 'auto',
            },
          };
        },
        withTimeout: async (action) => action,
        shouldRetry: () => true,
        describeError: (error) => (error instanceof Error ? error.message : String(error)),
        sleep: async () => undefined,
        now: () => {
          const next = timestamps.shift();
          return typeof next === 'number' ? next : 145;
        },
        info: () => undefined,
        warn: () => undefined,
        outputCreatedUserData: false,
      }
    );

    expect(result.user.email).toBe('dynamic@example.test');
    expect(result.attempts).toEqual([
      {
        attempt: 1,
        durationMs: 10,
        outcome: 'failed',
        error: 'HTTP 503',
      },
      {
        attempt: 2,
        durationMs: 25,
        outcome: 'success',
      },
    ]);
  });

  test('updateExistingUserFlow reuses the existing id and returns the updated account details', async () => {
    const updated = await updateExistingUserFlow(
      {
        token: 'create-token',
        secret: 'secret',
        identity: {
          email: 'existing@example.test',
          forename: 'Existing',
          surname: 'User',
        },
        roleNames: ['caseworker', 'pui-case-manager'],
      },
      {
        getUserInfo: async () => ({ id: 'existing-id' }) as never,
        updateUser: async () =>
          ({
            id: 'existing-id',
            email: 'existing@example.test',
          }) as never,
      } as never
    );

    expect(updated).toEqual({
      id: 'existing-id',
      email: 'existing@example.test',
      password: 'secret',
      forename: 'Existing',
      surname: 'User',
      roleNames: ['caseworker', 'pui-case-manager'],
    });
  });

  test('ensureUserAccountActiveFlow hydrates a missing id before updating the user', async () => {
    const activated = await ensureUserAccountActiveFlow(
      {
        token: 'create-token',
        user: {
          email: 'dynamic@example.test',
          password: 'secret',
          forename: 'Dynamic',
          surname: 'User',
          roleNames: ['caseworker'],
        },
        roleNames: ['caseworker', 'pui-case-manager'],
      },
      {
        getUserInfo: async () => ({ id: 'hydrated-id' }) as never,
        updateUser: async () =>
          ({
            id: 'hydrated-id',
            email: 'dynamic@example.test',
            forename: 'Dynamic',
            surname: 'User',
          }) as never,
      } as never
    );

    expect(activated).toEqual({
      id: 'hydrated-id',
      email: 'dynamic@example.test',
      password: 'secret',
      forename: 'Dynamic',
      surname: 'User',
      roleNames: ['caseworker', 'pui-case-manager'],
    });
  });

  test('collectAssignmentFailureDiagnosticsFlow includes request context plus PRD and userinfo probes', async () => {
    const diagnostics = await collectAssignmentFailureDiagnosticsFlow(
      {
        error: new Error('Status Code: 503'),
        assignmentBearerToken: 'header.payload.signature',
        serviceToken: 'service-token',
        rdProfessionalApiPath: 'https://rd-professional.example',
        endpoint: '/refdata/external/v1/organisations/users/',
        mode: 'external',
        requestedMode: 'auto',
        attemptedModes: ['external'],
        organisationId: 'org-123',
        user: {
          email: 'dynamic@example.test',
          password: 'secret',
          forename: 'Dynamic',
          surname: 'User',
          roleNames: ['caseworker'],
        },
        roles: ['caseworker'],
        headers: {
          Authorization: 'Bearer token',
        },
        assignmentUserRoles: {
          source: 'profile',
          profile: 'employment-document-upload',
          roles: ['caseworker'],
        },
      },
      {
        parseStatusCode: () => 503,
        decodeJwtPayload: () => ({ sub: 'assignment-user', roles: ['caseworker'] }),
        summarizeTokenPrincipal: (claims) => ({
          available: Boolean(claims),
          principalId: claims?.sub,
        }),
        probePrdUsersView: async () => ({
          status: 200,
          body: { count: 1 },
        }),
        probeIdamUserInfo: async () => ({
          status: 200,
          body: { uid: 'assignment-user' },
        }),
      }
    );

    expect(diagnostics).toMatchObject({
      failure: {
        statusCode: 503,
        message: 'Status Code: 503',
      },
      assignmentRequest: {
        organisationId: 'org-123',
        attemptedModes: ['external'],
      },
      assignmentPrincipalClaims: {
        available: true,
        principalId: 'assignment-user',
      },
      prdUsersReadProbe: {
        status: 200,
      },
      idamUserInfoProbe: {
        status: 200,
      },
    });
  });

  test('reconcileExistingOrganisationAssignmentFlow reactivates the account and retries after an inactive-user 403', async () => {
    const putCalls: Array<Record<string, unknown>> = [];
    const result = await reconcileExistingOrganisationAssignmentFlow(
      {
        client: {
          put: async (_endpoint: string, options: { data: Record<string, unknown> }) => {
            putCalls.push(options.data);
            if (putCalls.length === 1) {
              return {
                status: 403,
                data: { errorDescription: 'User status must be active' },
              };
            }
            return {
              status: 200,
              data: {},
            };
          },
        } as never,
        rdProfessionalApiPath: 'https://rd-professional.example',
        organisationId: 'org-123',
        user: {
          email: 'dynamic@example.test',
          password: 'secret',
          forename: 'Dynamic',
          surname: 'User',
          roleNames: ['caseworker'],
        },
        roles: ['caseworker'],
        headers: {
          Authorization: 'Bearer token',
        },
      },
      {
        resolveAssignmentUserIdentifier: async () => 'user-123',
        resolveBearerToken: async () => 'create-user-token',
        ensureUserAccountActive: async () => ({
          id: 'user-123',
          email: 'dynamic@example.test',
          password: 'secret',
          forename: 'Dynamic',
          surname: 'User',
          roleNames: ['caseworker'],
        }),
        readStringProperty: (record, key) => (typeof record?.[key] === 'string' ? String(record[key]) : undefined),
        isRecord: (value): value is Record<string, unknown> => typeof value === 'object' && value !== null,
        warn: () => undefined,
      }
    );

    expect(result).toEqual({
      status: 200,
      userIdentifier: 'user-123',
    });
    expect(putCalls).toHaveLength(2);
  });

  test('resolveCreateUserBearerTokenFlow retries transient generator failures and persists the stripped token', async () => {
    const persistedTokens: string[] = [];
    let attempts = 0;

    const token = await resolveCreateUserBearerTokenFlow(
      {
        clientId: 'xuiwebapp',
        clientSecret: 'secret',
        requestedScope: 'openid profile roles',
      },
      {
        stripBearerPrefix: (value) => value.replace(/^Bearer\s+/i, ''),
        sanitiseClientCredentialsScope: (scope) => scope.replace(/^openid\s+/i, ''),
        generateIdamToken: async () => {
          attempts += 1;
          if (attempts === 1) {
            throw new Error('Status Code: 503');
          }
          return 'Bearer hydrated-token';
        },
        persistCreateUserBearerToken: (value) => {
          persistedTokens.push(value);
        },
        shouldRetryTokenHydrationError: () => true,
        sleep: async () => undefined,
        warn: () => undefined,
        createError: (_error, message) => new Error(message),
      }
    );

    expect(token).toBe('hydrated-token');
    expect(persistedTokens).toEqual(['Bearer hydrated-token']);
    expect(attempts).toBe(2);
  });

  test('tryGenerateAssignmentBearerTokenFromCredentialsFlow retries invalid scopes and falls back to solicitor credentials', async () => {
    const warnings: string[] = [];
    const attemptedScopes: string[] = [];

    const token = await tryGenerateAssignmentBearerTokenFromCredentialsFlow(
      {
        fallbackUsername: 'solicitor@example.test',
        fallbackPassword: 'secret',
        clientId: 'xuiwebapp',
        clientSecret: 'client-secret',
        scopesToTry: ['openid profile roles', 'profile roles'],
      },
      {
        generateIdamToken: async ({ scope }) => {
          attemptedScopes.push(scope);
          if (scope === 'openid profile roles') {
            throw new Error('invalid_scope');
          }
          return 'Bearer assignment-token';
        },
        isInvalidScopeError: (message) => message.includes('invalid_scope'),
        warn: (message) => {
          warnings.push(message);
        },
      }
    );

    expect(token).toBe('Bearer assignment-token');
    expect(attemptedScopes).toEqual(['openid profile roles', 'profile roles']);
    expect(warnings).toEqual(
      expect.arrayContaining([
        expect.stringContaining('falling back to solicitor credentials'),
        expect.stringContaining('scope rejected by IDAM'),
      ])
    );
  });

  test('resolveAssignmentBearerTokenFlow persists password-grant tokens and validates the principal', async () => {
    const persistedTokens: string[] = [];
    const validatedTokens: string[] = [];

    const token = await resolveAssignmentBearerTokenFlow(
      {},
      {
        stripBearerPrefix: (value) => value.replace(/^Bearer\s+/i, ''),
        assertExpectedAssignmentPrincipal: async (value) => {
          validatedTokens.push(value);
        },
        tryGenerateAssignmentBearerTokenFromCredentials: async () => 'Bearer generated-assignment-token',
        persistAssignmentBearerToken: (value) => {
          persistedTokens.push(value);
        },
        warn: () => undefined,
      }
    );

    expect(token).toBe('generated-assignment-token');
    expect(persistedTokens).toEqual(['Bearer generated-assignment-token']);
    expect(validatedTokens).toEqual(['generated-assignment-token']);
  });

  test('assertExpectedAssignmentPrincipalFlow falls back to userinfo when the JWT has no principal email', async () => {
    await expect(
      assertExpectedAssignmentPrincipalFlow(
        {
          token: 'header.payload.signature',
          expectedEmail: 'dynamic@example.test',
        },
        {
          decodeJwtPayload: () => ({ sub: '123' }),
          resolveTokenPrincipalUsername: (claims) => (typeof claims?.email === 'string' ? claims.email : undefined),
          probeIdamUserInfo: async () => ({
            status: 200,
            body: { email: 'dynamic@example.test' },
          }),
          isRecord: (value): value is Record<string, unknown> => typeof value === 'object' && value !== null,
          warn: () => undefined,
        }
      )
    ).resolves.toBeUndefined();
  });
});
