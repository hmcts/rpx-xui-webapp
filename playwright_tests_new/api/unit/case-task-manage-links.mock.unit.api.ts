import { expect, test } from '@playwright/test';
import {
  buildCaseTaskManageLinksCaseworkers,
  buildCaseTaskManageLinksRows,
} from '../../integration/mocks/caseTaskManageLinks.mock.js';

test.describe('case task manage-links mocks', { tag: '@svc-internal' }, () => {
  test('builds the three caseworker identities used by the task manage-links flows', () => {
    const people = buildCaseTaskManageLinksCaseworkers('current-user-1');

    expect(people.currentUser.idamId).toBe('current-user-1');
    expect(people.existingAssignee.idamId).toBe('existing-caseworker-1');
    expect(people.replacementAssignee.idamId).toBe('replacement-caseworker-1');
    expect(people.all.map((person) => person.idamId)).toEqual([
      'replacement-caseworker-1',
      'current-user-1',
      'existing-caseworker-1',
    ]);
  });

  test('builds a claimable row and a separately managed assigned row from the shared state', () => {
    const rows = buildCaseTaskManageLinksRows({
      caseId: '1617708245335311',
      claimTaskId: 'claim-task',
      managedTaskId: 'managed-task',
      claimTaskTitle: 'Assign to me from case details',
      managedTaskTitle: 'Reassign and unassign from case details',
      taskDueDate: '2030-05-20T12:00:00.000Z',
      state: {
        managedTaskAssigneeId: 'existing-caseworker-1',
      },
    });

    expect(rows[0]).toEqual(
      expect.objectContaining({
        id: 'claim-task',
        state: 'unassigned',
        assignee: '',
        actions: [{ id: 'claim', title: 'Assign to me' }],
      })
    );
    expect(rows[1]).toEqual(
      expect.objectContaining({
        id: 'managed-task',
        state: 'assigned',
        assignee: 'existing-caseworker-1',
        actions: [
          { id: 'reassign', title: 'Reassign task' },
          { id: 'unclaim', title: 'Unassign task' },
        ],
      })
    );
  });
});
