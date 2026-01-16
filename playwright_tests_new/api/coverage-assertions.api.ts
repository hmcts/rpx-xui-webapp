
import { test, expect } from '@playwright/test';

import {
  expectTaskList,
  expectRoleAssignmentShape,
  expectBookmarkShape,
  expectAnnotationShape,
  expectCaseShareShape,
  expectAddressLookupShape
} from './utils/assertions';
import { extractCaseShareEntries, isTaskList } from './utils/types';
import nodeAppDataModels from './data/nodeAppDataModels';

test.describe('Assertion shape validators', () => {
  test('expectTaskList covers empty and populated tasks', () => {
    expectTaskList({ tasks: [], total_records: 0 });
    expectTaskList({
      tasks: [{ id: 'task-1', task_state: 'assigned' }],
      total_records: 1
    });
  });

  test('expectRoleAssignmentShape covers optional fields', () => {
    expectRoleAssignmentShape({
      roleCategory: 'LEGAL',
      roleName: 'caseworker',
      actorId: 'user-1',
      actions: ['read']
    });
    expectRoleAssignmentShape({
      roleCategory: 'LEGAL',
      roleName: 'caseworker'
    });
  });

  test('expectBookmarkShape and expectAnnotationShape accept minimal payloads', () => {
    expectBookmarkShape({ id: 'bookmark-1', name: 'Bookmark', documentId: 'doc-1' });
    expectAnnotationShape({ id: 'anno-1', documentId: 'doc-1', annotationSetId: 'set-1' });
  });

  test('expectCaseShareShape handles property variants', () => {
    expectCaseShareShape(
      { organisations: [{ organisationIdentifier: 'org-1', name: 'Org' }] },
      'organisations'
    );
    expectCaseShareShape(
      { users: [{ userIdentifier: 'user-1', email: 'user@example.com' }] },
      'users'
    );
    expectCaseShareShape(
      { cases: [{ caseId: 'case-1', sharedWith: [] }] },
      'cases'
    );
    expectCaseShareShape(
      { sharedCases: [{ caseId: 'case-2', sharedWith: [] }] },
      'sharedCases'
    );
    expectCaseShareShape({ payload: {} }, 'unknown');
  });

  test('expectAddressLookupShape handles empty and populated responses', () => {
    expectAddressLookupShape({ results: [], header: {} });
    expectAddressLookupShape({
      results: [
        {
          DPA: {
            POSTCODE: 'E1 1AA',
            ADDRESS: '1 Example Street',
            POST_TOWN: 'London'
          }
        }
      ],
      header: {}
    });
  });

  test('extractCaseShareEntries and isTaskList cover variants', () => {
    expect(isTaskList({ tasks: [] })).toBe(true);
    expect(isTaskList({})).toBe(false);

    const direct = extractCaseShareEntries({ cases: [{ caseId: 'case-1' }] }, 'cases');
    const nested = extractCaseShareEntries({ payload: { cases: [{ caseId: 'case-2' }] } }, 'cases');
    const missing = extractCaseShareEntries({ foo: 'bar' } as any, 'cases');
    const empty = extractCaseShareEntries(null as any, 'cases');
    expect(direct).toHaveLength(1);
    expect(nested).toHaveLength(1);
    expect(missing).toEqual([]);
    expect(empty).toEqual([]);
  });

  test('nodeApp data models cover oauth and oidc variants', () => {
    const oidc = nodeAppDataModels.getUserDetails_oidc();
    expect(oidc.userInfo.uid).toBeDefined();
    expect(Array.isArray(oidc.roleAssignmentInfo)).toBe(true);

    const oauth = nodeAppDataModels.getUserDetails_oauth();
    expect(oauth.userInfo.id).toBeDefined();
    expect(oauth.userInfo.active).toBe(true);

    const originalRandom = Math.random;
    Math.random = () => 0;
    const location = nodeAppDataModels.getUserDetailsLocationInfo();
    expect(location.jurisdiction).toBe('IA');
    Math.random = () => 1;
    nodeAppDataModels.getUserDetailsLocationInfo();
    Math.random = originalRandom;
  });
});
