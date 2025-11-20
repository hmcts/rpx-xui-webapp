import { test, expect, buildApiAttachment } from './fixtures';
import { config as testConfig } from '../../test_codecept/integration/tests/config/config';

const nodeAppDataModels = require('../../test_codecept/dataModels/nodeApp');

test.describe('Node app endpoints', () => {
  test('serves external configuration without authentication', async ({ anonymousClient }) => {
    const response = await anonymousClient.get<Record<string, unknown>>('external/configuration-ui');
    expect(response.status).toBe(200);
    const expectedKeys = testConfig.configuratioUi[testConfig.testEnv];
    expect(Object.keys(response.data)).toEqual(expect.arrayContaining(expectedKeys));
    expect(response.data['clientId']).toBe('xuiwebapp');
    expect(response.data).toEqual(
      expect.objectContaining({
        protocol: expect.any(String),
        oAuthCallback: expect.any(String)
      })
    );
  });

  test('auth/isAuthenticated returns true for authenticated sessions', async ({ apiClient }) => {
    const response = await apiClient.get<boolean>('auth/isAuthenticated');
    expect(response.status).toBe(200);
    expect(response.data).toBe(true);
  });

  test('auth/isAuthenticated returns false without session', async ({ anonymousClient }) => {
    const response = await anonymousClient.get<boolean>('auth/isAuthenticated');
    expect(response.status).toBe(200);
    expect(response.data).toBe(false);
  });

  test('returns enriched user details for solicitor session', async ({ apiClient }, testInfo) => {
    const response = await apiClient.get<any>('api/user/details');

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      userInfo: expect.objectContaining({
        uid: expect.any(String),
        roles: expect.arrayContaining([expect.any(String)]),
        email: expect.any(String),
        given_name: expect.any(String),
        family_name: expect.any(String)
      }),
      roleAssignmentInfo: expect.any(Array),
      canShareCases: expect.any(Boolean),
      sessionTimeout: expect.objectContaining({
        idleModalDisplayTime: expect.any(Number),
        pattern: expect.any(String)
      })
    });

    const expected = nodeAppDataModels.getUserDetails_oidc();
    const expectedKeys = Object.keys(expected);
    expect(Object.keys(response.data)).toEqual(expect.arrayContaining(expectedKeys));

    if (Array.isArray(response.data.roleAssignmentInfo) && response.data.roleAssignmentInfo.length > 0) {
      const expectedRoleKeys = Object.keys(expected.roleAssignmentInfo[0]);
      expect(Object.keys(response.data.roleAssignmentInfo[0])).toEqual(expect.arrayContaining(expectedRoleKeys));
    }

    const attachment = buildApiAttachment(response.logEntry, {
      includeRaw: process.env.PLAYWRIGHT_DEBUG_API === '1'
    });
    await testInfo.attach(attachment.name, {
      body: attachment.body,
      contentType: attachment.contentType
    });
  });

  test('rejects unauthenticated calls to user details', async ({ anonymousClient }) => {
    const response = await anonymousClient.get('api/user/details', {
      throwOnError: false
    });

    expect(response.status).toBe(401);
  });

  test('returns configuration value for feature flag query', async ({ apiClient }) => {
    const response = await apiClient.get('api/configuration?configurationKey=termsAndConditionsEnabled');
    expect(response.status).toBe(200);
    expect(JSON.stringify(response.data).length).toBeLessThan(6);
  });
});
