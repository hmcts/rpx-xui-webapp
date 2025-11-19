import { test, expect, buildApiAttachment } from './fixtures';

const nodeAppDataModels = require('../../test_codecept/dataModels/nodeApp');

test.describe('Node API user profile', () => {
  test('returns enriched user details for solicitor session', async ({ apiClient }, testInfo) => {
    const response = await apiClient.get<any>('api/user/details');

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      userInfo: expect.any(Object),
      roleAssignmentInfo: expect.any(Array),
      canShareCases: expect.any(Boolean),
      sessionTimeout: expect.any(Object)
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

  test('rejects unauthenticated calls', async ({ anonymousClient }) => {
    const response = await anonymousClient.get('api/user/details', {
      throwOnError: false
    });

    expect(response.status).toBe(401);
  });
});
