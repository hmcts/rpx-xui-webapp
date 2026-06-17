import { expect, test } from '@playwright/test';

import {
  buildManageTasksLiveTaskRowFailureMessage,
  findManageTasksLiveTaskRowIndex,
  normalizeManageTasksRowText,
} from '../../E2E/utils/test-setup/manageTasksLiveTaskRows.js';
import type { ManageTasksLiveTask } from '../../E2E/utils/test-setup/manageTasksLiveSetup.js';

const task = {
  id: 'task-1',
  caseId: '1234567890123456',
  caseName: 'Bauch, Hane and Powlowski',
  taskTitle: 'Review dynamic Manage Tasks case',
  state: 'unassigned',
  actions: ['claim'],
} satisfies ManageTasksLiveTask;

test.describe('Manage Tasks live task row helpers', { tag: '@svc-internal' }, () => {
  test('matches the created task row using normalized case name and task title', () => {
    const rows = [
      {
        'Case name': 'Other case',
        Task: 'Review another case',
      },
      {
        'Case name': '  BAUCH,   HANE and POWLOWSKI  ',
        Task: 'Review dynamic Manage Tasks case',
      },
    ];

    expect(findManageTasksLiveTaskRowIndex(rows, task)).toBe(1);
  });

  test('returns -1 when the created case task is absent', () => {
    expect(
      findManageTasksLiveTaskRowIndex(
        [
          {
            'Case name': 'Bauch, Hane and Powlowski',
            Task: 'A different task',
          },
        ],
        task
      )
    ).toBe(-1);
  });

  test('builds a focused failure message with visible row diagnostics', () => {
    const message = buildManageTasksLiveTaskRowFailureMessage({
      rows: [{ 'Case name': 'Other case', Task: 'Review another case' }],
      task,
      viewName: 'Available tasks',
    });

    expect(message).toContain('Available tasks should show created case task');
    expect(message).toContain('Review dynamic Manage Tasks case');
    expect(message).toContain('Other case');
  });

  test('normalizes blank and multi-line table text', () => {
    expect(normalizeManageTasksRowText('  Review\n\tTask  ')).toBe('review task');
    expect(normalizeManageTasksRowText(undefined)).toBe('');
  });
});
