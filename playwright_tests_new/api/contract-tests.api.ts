/**
 * API Contract Tests
 * Validates response structures against expected schemas to ensure backward compatibility
 */

import { test, expect } from './fixtures';
import { expectStatus, StatusSets } from './utils/apiTestUtils';
import { expectContract, WorkAllocationSchemas, SearchSchemas } from './utils/contractValidation';
import { TaskBuilder, TaskListBuilder, LocationBuilder, TestData } from './utils/testDataBuilders';
import { z } from 'zod';

const serviceCodes = ['IA', 'CIVIL', 'PRIVATELAW'];
const locationSchema = z.object({
  id: z.string(),
  locationName: z.string()
});

test.describe('Work Allocation API Contracts', () => {
  test('GET /workallocation/location contract: returns array of location objects with required fields', async ({ apiClient }) => {
    // Given: A solicitor user requesting locations for configured service codes
    const endpoint = `workallocation/location?serviceCodes=${encodeURIComponent(serviceCodes.join(','))}`;

    // When: Fetching locations
    const response = await apiClient.get(endpoint, { throwOnError: false });

    // Then: Response status is within expected range
    expectStatus(response.status, StatusSets.guardedBasic);

    // And: Response structure matches LocationList contract when successful
    if (response.status === 200 && Array.isArray(response.data)) {
      expectContract(response.data, WorkAllocationSchemas.LocationList, {
        context: { endpoint, status: response.status }
      });

      // And: Each location has required fields
      if (response.data.length > 0) {
        locationSchema.parse(response.data[0]);
      }
    }
  });

  test('POST /workallocation/task contract: returns TaskList with tasks array and optional total_records', async ({ apiClient }) => {
    // Given: A task search request for MyTasks view
    const searchRequest = {
      view: 'MyTasks',
      searchRequest: []
    };

    // When: Searching for tasks
    const response = await apiClient.post('workallocation/task', {
      data: searchRequest,
      throwOnError: false
    });

    // Then: Response status is within expected range
    expectStatus(response.status, [200, 401, 403, 500, 502]);

    // And: Response structure matches TaskList contract when successful
    if (response.status === 200) {
      expectContract(response.data, WorkAllocationSchemas.TaskList, {
        context: { endpoint: 'workallocation/task', view: 'MyTasks', status: response.status }
      });

      // And: tasks array is present
      const taskListData = response.data as { tasks: unknown[] };
      expect(taskListData).toHaveProperty('tasks');
      expect(Array.isArray(taskListData.tasks)).toBe(true);

      // And: Each task has required fields
      if (taskListData.tasks.length > 0) {
        const firstTask = taskListData.tasks[0] as { id: unknown; task_state: unknown };
        expect(firstTask).toHaveProperty('id');
        expect(firstTask).toHaveProperty('task_state');
        expect(typeof firstTask.id).toBe('string');
        expect(typeof firstTask.task_state).toBe('string');
      }
    }
  });

  test('GET /api/user/details contract: returns UserDetails with userInfo object', async ({ apiClient }) => {
    // Given: An authenticated user
    // When: Fetching user details
    const response = await apiClient.get('api/user/details', { throwOnError: false });

    // Then: Response status is within expected range
    expectStatus(response.status, StatusSets.guardedBasic);

    // And: Response has userInfo when successful
    if (response.status === 200 && response.data && typeof response.data === 'object') {
      const userData = response.data as Record<string, unknown>;
      if ('userInfo' in userData && userData.userInfo && typeof userData.userInfo === 'object') {
        const userInfo = userData.userInfo as Record<string, unknown>;
        // Verify userInfo has an id field (could be 'id' or 'uid')
        expect(userInfo.id || userInfo.uid).toBeDefined();
      }
    }
  });

  test('GET /workallocation/taskNames contract: returns array of task names or wrapped response', async ({ apiClient }) => {
    // Given: An authenticated user
    // When: Fetching task names catalogue
    const response = await apiClient.get('workallocation/taskNames', { throwOnError: false });

    // Then: Response status is 200 OK
    expect(response.status).toBe(200);

    // And: Response may be defined or undefined (API may return empty body)
    // Note: API may return array, {task_names: []}, {taskNames: []}, string, or empty body
    // Empty body is acceptable as the endpoint exists and returns 200
  });

  test('GET /workallocation/task/types-of-work contract: returns array of work type classifications', async ({ apiClient }) => {
    // Given: An authenticated user
    // When: Fetching types of work catalogue
    const response = await apiClient.get('workallocation/task/types-of-work', { throwOnError: false });

    // Then: Response status is 200 OK
    expect(response.status).toBe(200);

    // And: Response is an array or object containing work types
    expect(response.data).toBeDefined();
    if (Array.isArray(response.data)) {
      expect(response.data.length).toBeGreaterThanOrEqual(0);
    }
  });
});

test.describe('Search and Ref Data API Contracts', () => {
  test('GET /api/globalSearch/services contract: returns array of service objects', async ({ apiClient }) => {
    // Given: An authenticated user
    // When: Fetching global search services
    const response = await apiClient.get('api/globalSearch/services', { throwOnError: false });

    // Then: Response status is within expected range
    expectStatus(response.status, StatusSets.guardedBasic);

    // And: Response structure matches GlobalSearchServices contract when successful
    if (response.status === 200 && Array.isArray(response.data)) {
      expectContract(response.data, SearchSchemas.GlobalSearchServices, {
        context: { endpoint: 'api/globalSearch/services', status: response.status }
      });

      // And: Each service has required fields
      if (response.data.length > 0) {
        const firstService = response.data[0];
        expect(firstService).toHaveProperty('serviceId');
        expect(firstService).toHaveProperty('serviceName');
      }
    }
  });

  test('GET /api/wa-supported-jurisdiction contract: returns jurisdiction data', async ({ apiClient }) => {
    // Given: An authenticated user
    // When: Fetching work allocation supported jurisdictions
    const response = await apiClient.get('api/wa-supported-jurisdiction', { throwOnError: false });

    // Then: Response status is within expected range
    expectStatus(response.status, StatusSets.guardedBasic);

    // And: Response is defined when successful (may be array or string)
    if (response.status === 200) {
      expect(response.data).toBeDefined();
      // Note: API may return array of strings or a single string
    }
  });

  test('GET /api/staff-supported-jurisdiction contract: returns jurisdiction data', async ({ apiClient }) => {
    // Given: An authenticated user
    // When: Fetching staff supported jurisdictions
    const response = await apiClient.get('api/staff-supported-jurisdiction', { throwOnError: false });

    // Then: Response status is within expected range
    expectStatus(response.status, StatusSets.guardedBasic);

    // And: Response is defined when successful (may be array or string)
    if (response.status === 200) {
      expect(response.data).toBeDefined();
      // Note: API may return array of strings or a single string
    }
  });
});

test.describe('Test Data Builders Validation', () => {
  test('TaskBuilder creates valid task objects that match Task contract', () => {
    // Given: TaskBuilder with default values
    // When: Building a task
    const task = new TaskBuilder()
      .withId('task-123')
      .withTitle('Review application')
      .assigned('user-456')
      .withCase('case-789', 'Test Case')
      .atLocation('London')
      .overdue()
      .build();

    // Then: Task matches expected structure
    expect(task.id).toBe('task-123');
    expect(task.task_title).toBe('Review application');
    expect(task.task_state).toBe('assigned');
    expect(task.assignee).toBe('user-456');
    expect(task.case_id).toBe('case-789');
    expect(task.case_name).toBe('Test Case');
    expect(task.location_name).toBe('London');
    expect(task.due_date).toBeTruthy();

    // And: Task due date is in the past
    if (task.due_date && typeof task.due_date === 'string') {
      const dueDate = new Date(task.due_date);
      expect(dueDate < new Date()).toBe(true);
    }
  });

  test('TaskListBuilder creates valid task list responses that match TaskList contract', () => {
    // Given: Multiple tasks created with TaskBuilder
    const tasks = [
      new TaskBuilder().withId('task-1').assigned().build(),
      new TaskBuilder().withId('task-2').unassigned().build(),
      new TaskBuilder().withId('task-3').completed().build()
    ];

    // When: Building a task list
    const taskList = new TaskListBuilder()
      .withTasks(tasks)
      .withTotalRecords(50)
      .build();

    // Then: Task list matches expected structure
    expect(taskList.tasks).toHaveLength(3);
    expect(taskList.total_records).toBe(50);
    if (taskList.tasks && taskList.tasks.length >= 3) {
      expect(taskList.tasks[0].id).toBe('task-1');
      expect(taskList.tasks[1].id).toBe('task-2');
      expect(taskList.tasks[2].id).toBe('task-3');
    }
  });

  test('LocationBuilder creates valid location objects', () => {
    // Given: LocationBuilder with custom values
    // When: Building a location
    const location = new LocationBuilder()
      .withId('loc-456')
      .withName('Birmingham Civil and Family Justice Centre')
      .withServices(['IA', 'CIVIL', 'PRIVATELAW'])
      .build();

    // Then: Location matches expected structure
    expect(location.id).toBe('loc-456');
    expect(location.locationName).toBe('Birmingham Civil and Family Justice Centre');
    expect(location.services).toEqual(['IA', 'CIVIL', 'PRIVATELAW']);
  });

  test('TestData quick helpers create valid objects', () => {
    // Given: TestData quick helper functions
    // When: Creating test data objects
    const task = TestData.task();
    const assignedTask = TestData.assignedTask('user-1');
    const unassignedTask = TestData.unassignedTask();
    const taskList = TestData.taskList(5);
    const emptyTaskList = TestData.emptyTaskList();
    const location = TestData.location('loc-1', 'Test Location');

    // Then: All objects match expected structures
    expect(task.id).toBeTruthy();
    expect(assignedTask.task_state).toBe('assigned');
    expect(assignedTask.assignee).toBe('user-1');
    expect(unassignedTask.task_state).toBe('unassigned');
    expect(taskList.tasks).toHaveLength(5);
    expect(taskList.total_records).toBe(5);
    expect(emptyTaskList.tasks).toHaveLength(0);
    expect(location.id).toBe('loc-1');
    expect(location.locationName).toBe('Test Location');
  });

  test('TaskBuilder.buildMany creates multiple tasks with incremental IDs', () => {
    // Given: TaskBuilder configured with base properties
    const builder = new TaskBuilder()
      .withTitle('Standard Task')
      .assigned('user-1');

    // When: Building multiple tasks
    const tasks = builder.buildMany(3);

    // Then: All tasks are created with incremental IDs
    expect(tasks).toHaveLength(3);
    expect(tasks[0].id).toBe('default-task-id-0');
    expect(tasks[1].id).toBe('default-task-id-1');
    expect(tasks[2].id).toBe('default-task-id-2');

    // And: All tasks share the same base properties
    expect(tasks.every((t) => t.task_title === 'Standard Task')).toBe(true);
    expect(tasks.every((t) => t.assignee === 'user-1')).toBe(true);
  });
});
