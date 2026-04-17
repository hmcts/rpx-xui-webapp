import { expect, test } from '@playwright/test';
import { buildCaseDetailsTasksMock } from '../../integration/mocks/caseDetailsTasks.builder.js';
import { buildMyTaskListMock } from '../../integration/mocks/taskList.mock.js';
import {
  assertValidWorkAllocationCaseTaskMock,
  assertValidWorkAllocationTaskListMock,
} from '../../integration/helpers/workAllocationMockValidation.helper.js';

test.describe('work allocation mock validation helper', { tag: '@svc-internal' }, () => {
  test('accepts valid task-list and case-task mocks', () => {
    expect(() => assertValidWorkAllocationTaskListMock(buildMyTaskListMock('test-user', 1))).not.toThrow();
    expect(() => assertValidWorkAllocationCaseTaskMock(buildCaseDetailsTasksMock({ caseId: '1234567890123456' }))).not.toThrow();
  });

  test('reports missing and malformed mandatory task-list attributes with ticket field names', () => {
    const validTaskList = buildMyTaskListMock('test-user', 1);
    const invalidTaskList = {
      ...validTaskList,
      tasks: [
        {
          ...validTaskList.tasks[0],
          id: '',
          type: '   ',
          due_date: 'Thu, 15 Jan 2026 10:00:00 GMT',
          major_priority: Number.NaN,
          work_type_id: '',
        },
      ],
    };

    try {
      assertValidWorkAllocationTaskListMock(invalidTaskList);
      throw new Error('Expected the invalid task-list mock to throw.');
    } catch (error) {
      const message = (error as Error).message;

      expect(message).toContain('tasks[0].id must be a non-empty string for task_id.');
      expect(message).toContain('tasks[0].type must be a non-empty string for task_type.');
      expect(message).toContain('tasks[0].due_date must be an ISO date-time string for due_date_time.');
      expect(message).toContain('tasks[0].major_priority must be a finite number for priorities.major_priority.');
      expect(message).toContain('tasks[0].work_type_id must be a non-empty string for work_type.id.');
    }
  });

  test('reports missing case-task attributes using caseTasks field paths', () => {
    const validCaseTasks = buildCaseDetailsTasksMock({ caseId: '1234567890123456' });
    const invalidCaseTasks = [
      {
        ...validCaseTasks[0],
        name: '',
        task_title: null,
        priority_date: 'Fri, 16 Jan 2026 10:00:00 GMT',
        role_category: '',
      },
    ];

    try {
      assertValidWorkAllocationCaseTaskMock(invalidCaseTasks);
      throw new Error('Expected the invalid case-task mock to throw.');
    } catch (error) {
      const message = (error as Error).message;

      expect(message).toContain('caseTasks[0].name must be a non-empty string for task_name.');
      expect(message).toContain('caseTasks[0].task_title must be a non-empty string for title.');
      expect(message).toContain('caseTasks[0].priority_date must be an ISO date-time string for priorities.priority_date.');
      expect(message).toContain('caseTasks[0].role_category must be a non-empty string for role_attributes.role_category.');
    }
  });
});
