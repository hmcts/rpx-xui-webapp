import { expect, test } from '@playwright/test';

import {
  createExclusionSessionActorHarness,
  missingIdentityCases,
  roleAssignmentUrl,
  selfIdentityCases,
} from './exclusion-session-actor.mock.js';

test.describe('Exclusion handler session actor', { tag: '@svc-internal' }, () => {
  let harness: ReturnType<typeof createExclusionSessionActorHarness>;

  test.afterEach(() => harness?.restore());

  for (const { name, userinfo, expectedActor } of selfIdentityCases) {
    test(`self-exclusion uses the session identity: ${name}`, async () => {
      harness = createExclusionSessionActorHarness(userinfo);

      await harness.confirm();

      expect(harness.next.called).toBe(false);
      expect(harness.post.callCount).toBe(1);
      expect(harness.post.firstCall.args[0]).toBe(roleAssignmentUrl);
      expect(harness.post.firstCall.args[1]).toEqual({
        roleRequest: { assignerId: expectedActor, replaceExisting: false },
        requestedRoles: [
          {
            roleType: 'CASE',
            grantType: 'EXCLUDED',
            classification: 'RESTRICTED',
            attributes: {
              caseId: '1234567890123456',
              jurisdiction: 'IA',
              notes: 'Synthetic conflict of interest',
            },
            roleCategory: 'ADMIN',
            roleName: 'conflict-of-interest',
            actorIdType: 'IDAM',
            actorId: expectedActor,
          },
        ],
      });
      expect(harness.response.status.calledOnceWithExactly(201)).toBe(true);
      expect(harness.response.send.calledOnceWithExactly(harness.downstream.data)).toBe(true);
    });
  }

  test('self-exclusion ignores conflicting actor identities in the request body', async () => {
    harness = createExclusionSessionActorHarness({ id: 'session-id', uid: 'session-uid' });
    Object.assign(harness.req.body, {
      id: 'body-id',
      uid: 'body-uid',
      currentUserId: 'body-current-user',
      actorId: 'body-actor',
      assignerId: 'body-assigner',
      person: { id: 'body-person', domain: 'Judicial' },
    });

    await harness.confirm();

    expect(harness.next.called).toBe(false);
    expect(harness.post.callCount).toBe(1);
    expect(harness.post.firstCall.args[0]).toBe(roleAssignmentUrl);
    expect(harness.post.firstCall.args[1]).toMatchObject({
      roleRequest: { assignerId: 'session-id' },
      requestedRoles: [{ actorId: 'session-id', roleCategory: 'ADMIN', attributes: { caseId: '1234567890123456' } }],
    });
  });

  for (const { name, userinfo } of missingIdentityCases) {
    test(`self-exclusion fails closed with ${name}`, async () => {
      harness = createExclusionSessionActorHarness(userinfo);
      harness.req.body.person = { id: 'body-person', domain: 'Judicial' };
      harness.req.body.actorId = 'body-actor';

      await harness.confirm();

      expect(harness.post.called).toBe(false);
      expect(harness.response.status.called).toBe(false);
      expect(harness.response.send.called).toBe(false);
      expect(harness.next.callCount).toBe(1);
      expect(harness.next.firstCall.args[0]).toBeInstanceOf(Error);
      expect(harness.next.firstCall.args[0].message).toBe('Current user ID is not available in the session');
    });
  }

  test('excluding another person preserves the selected person and session assigner', async () => {
    harness = createExclusionSessionActorHarness({ id: 'session-id', uid: 'session-uid' });
    harness.req.body.exclusionOption = 'Exclude another person';
    harness.req.body.person = { id: 'selected-person', domain: 'Judicial' };

    await harness.confirm();

    expect(harness.next.called).toBe(false);
    expect(harness.post.callCount).toBe(1);
    expect(harness.post.firstCall.args[0]).toBe(roleAssignmentUrl);
    expect(harness.post.firstCall.args[1]).toMatchObject({
      roleRequest: { assignerId: 'session-id', replaceExisting: false },
      requestedRoles: [{ actorId: 'selected-person', roleCategory: 'JUDICIAL', attributes: { caseId: '1234567890123456' } }],
    });
    expect(harness.response.status.calledOnceWithExactly(201)).toBe(true);
    expect(harness.response.send.calledOnceWithExactly(harness.downstream.data)).toBe(true);
  });
});
