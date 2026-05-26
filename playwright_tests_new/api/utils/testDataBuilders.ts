/**
 * Test Data Builders using Fluent API Pattern
 * Reduces boilerplate in test setup and improves test data maintainability
 */

import type { Task, TaskListResponse } from './types';

/**
 * Builder for Task test data with sensible defaults
 *
 * @example
 * const task = new TaskBuilder()
 *   .withId('task-123')
 *   .assigned()
 *   .withTitle('Review application')
 *   .build();
 */
export class TaskBuilder {
  private readonly task: Partial<Task> = {
    id: 'default-task-id',
    task_state: 'unassigned',
    task_title: 'Default Task',
    assignee: null,
    case_id: null,
    case_name: null,
    location_name: null,
    created_date: new Date().toISOString(),
    due_date: null,
  };

  /**
   * Set task ID
   */
  withId(id: string): this {
    this.task.id = id;
    return this;
  }

  /**
   * Set task title
   */
  withTitle(title: string): this {
    this.task.task_title = title;
    return this;
  }

  /**
   * Mark task as assigned to a user
   */
  assigned(assignee = 'default-user-id'): this {
    this.task.task_state = 'assigned';
    this.task.assignee = assignee;
    return this;
  }

  /**
   * Mark task as unassigned
   */
  unassigned(): this {
    this.task.task_state = 'unassigned';
    this.task.assignee = null;
    return this;
  }

  /**
   * Mark task as completed
   */
  completed(): this {
    this.task.task_state = 'completed';
    return this;
  }

  /**
   * Mark task as cancelled
   */
  cancelled(): this {
    this.task.task_state = 'cancelled';
    return this;
  }

  /**
   * Associate task with a case
   */
  withCase(caseId: string, caseName?: string): this {
    this.task.case_id = caseId;
    this.task.case_name = caseName || `Case ${caseId}`;
    return this;
  }

  /**
   * Set task location
   */
  atLocation(locationName: string): this {
    this.task.location_name = locationName;
    return this;
  }

  /**
   * Set task creation date
   */
  createdOn(date: string | Date): this {
    this.task.created_date = typeof date === 'string' ? date : date.toISOString();
    return this;
  }

  /**
   * Set task due date
   */
  dueOn(date: string | Date): this {
    this.task.due_date = typeof date === 'string' ? date : date.toISOString();
    return this;
  }

  /**
   * Set task as overdue
   */
  overdue(): this {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.task.due_date = yesterday.toISOString();
    return this;
  }

  /**
   * Build the task object
   */
  build(): Task {
    return this.task as Task;
  }

  /**
   * Build multiple tasks with incremental IDs
   */
  buildMany(count: number): Task[] {
    const tasks: Task[] = [];
    for (let i = 0; i < count; i++) {
      const taskCopy = { ...this.task };
      taskCopy.id = `${this.task.id}-${i}`;
      tasks.push(taskCopy as Task);
    }
    return tasks;
  }
}

/**
 * Builder for TaskListResponse with pagination support
 *
 * @example
 * const response = new TaskListBuilder()
 *   .withTasks([task1, task2, task3])
 *   .withTotalRecords(50)
 *   .build();
 */
export class TaskListBuilder {
  private readonly taskList: Partial<TaskListResponse> = {
    tasks: [],
    total_records: 0,
  };

  /**
   * Set tasks array
   */
  withTasks(tasks: Task[]): this {
    this.taskList.tasks = tasks;
    this.taskList.total_records = tasks.length;
    return this;
  }

  /**
   * Add a single task
   */
  addTask(task: Task): this {
    this.taskList.tasks = [...(this.taskList.tasks || []), task];
    this.taskList.total_records = this.taskList.tasks.length;
    return this;
  }

  /**
   * Set total records (for pagination)
   */
  withTotalRecords(total: number): this {
    this.taskList.total_records = total;
    return this;
  }

  /**
   * Create empty task list
   */
  empty(): this {
    this.taskList.tasks = [];
    this.taskList.total_records = 0;
    return this;
  }

  /**
   * Build the task list response
   */
  build(): TaskListResponse {
    return this.taskList as TaskListResponse;
  }
}

/**
 * Builder for task search request payloads
 *
 * @example
 * const searchRequest = new TaskSearchBuilder()
 *   .view('MyTasks')
 *   .inLocations(['loc-1', 'loc-2'])
 *   .withStates(['assigned', 'unassigned'])
 *   .build();
 */
export class TaskSearchBuilder {
  private readonly searchRequest: Record<string, unknown> = {
    view: 'MyTasks',
    searchRequest: [],
  };

  /**
   * Set search view
   */
  view(viewName: 'MyTasks' | 'AllWork' | 'AvailableTasks'): this {
    this.searchRequest.view = viewName;
    return this;
  }

  /**
   * Filter by location IDs
   */
  inLocations(locationIds: string[]): this {
    this.searchRequest.searchRequest = [
      ...(this.searchRequest.searchRequest as unknown[]),
      { key: 'location', operator: 'IN', values: locationIds },
    ];
    return this;
  }

  /**
   * Filter by task states
   */
  withStates(states: string[]): this {
    this.searchRequest.searchRequest = [
      ...(this.searchRequest.searchRequest as unknown[]),
      { key: 'state', operator: 'IN', values: states },
    ];
    return this;
  }

  /**
   * Filter by jurisdiction
   */
  forJurisdiction(jurisdiction: string): this {
    this.searchRequest.searchRequest = [
      ...(this.searchRequest.searchRequest as unknown[]),
      { key: 'jurisdiction', operator: 'EQUAL', values: [jurisdiction] },
    ];
    return this;
  }

  /**
   * Search by caseworker
   */
  searchByCaseworker(): this {
    this.searchRequest.searchBy = 'caseworker';
    return this;
  }

  /**
   * Pagination settings
   */
  paginate(first: number, pageSize: number): this {
    this.searchRequest.first = first;
    this.searchRequest.pageSize = pageSize;
    return this;
  }

  /**
   * Sort settings
   */
  sortBy(field: string, order: 'asc' | 'desc' = 'asc'): this {
    this.searchRequest.sortedBy = { field, order };
    return this;
  }

  /**
   * Build the search request
   */
  build(): Record<string, unknown> {
    return this.searchRequest;
  }
}

/**
 * Builder for Location test data
 *
 * @example
 * const location = new LocationBuilder()
 *   .withId('loc-123')
 *   .withName('Birmingham')
 *   .withServices(['IA', 'CIVIL'])
 *   .build();
 */
export class LocationBuilder {
  private readonly location: { id: string; locationName: string; services: string[] } = {
    id: 'default-location-id',
    locationName: 'Default Location',
    services: [],
  };

  /**
   * Set location ID
   */
  withId(id: string): this {
    this.location.id = id;
    return this;
  }

  /**
   * Set location name
   */
  withName(name: string): this {
    this.location.locationName = name;
    return this;
  }

  /**
   * Set supported services
   */
  withServices(services: string[]): this {
    this.location.services = services;
    return this;
  }

  /**
   * Build the location object
   */
  build(): Record<string, unknown> {
    return this.location;
  }

  /**
   * Build multiple locations with incremental IDs
   */
  buildMany(count: number): Array<Record<string, unknown>> {
    const locations: Array<Record<string, unknown>> = [];
    for (let i = 0; i < count; i++) {
      const locationCopy = { ...this.location };
      locationCopy.id = `${this.location.id}-${i}`;
      locations.push(locationCopy);
    }
    return locations;
  }
}

/**
 * Builder for UserDetails test data
 *
 * @example
 * const user = new UserDetailsBuilder()
 *   .withId('user-123')
 *   .withEmail('test@example.com')
 *   .withRoles(['solicitor', 'caseworker'])
 *   .build();
 */
export class UserDetailsBuilder {
  private readonly userDetails: Record<string, unknown> = {
    userInfo: {
      id: 'default-user-id',
      uid: 'default-user-id',
      email: 'test@example.com',
      name: 'Test User',
    },
    roleAssignmentInfo: [],
  };

  /**
   * Set user ID
   */
  withId(id: string): this {
    const userInfo = this.userDetails.userInfo as Record<string, unknown>;
    userInfo.id = id;
    userInfo.uid = id;
    return this;
  }

  /**
   * Set user email
   */
  withEmail(email: string): this {
    (this.userDetails.userInfo as Record<string, unknown>).email = email;
    return this;
  }

  /**
   * Set user name
   */
  withName(name: string): this {
    (this.userDetails.userInfo as Record<string, unknown>).name = name;
    return this;
  }

  /**
   * Set user roles
   */
  withRoles(roles: string[]): this {
    this.userDetails.roleAssignmentInfo = roles.map((role) => ({
      roleName: role,
      roleType: 'CASE',
      classification: 'PUBLIC',
    }));
    return this;
  }

  /**
   * Build the user details object
   */
  build(): Record<string, unknown> {
    return this.userDetails;
  }
}

/**
 * Quick builder functions for common test data patterns
 */
export const TestData = {
  /**
   * Create a minimal valid task
   */
  task: (): Task => {
    return new TaskBuilder().build();
  },

  /**
   * Create an assigned task
   */
  assignedTask: (assignee = 'user-1'): Task => {
    return new TaskBuilder().assigned(assignee).build();
  },

  /**
   * Create an unassigned task
   */
  unassignedTask: (): Task => {
    return new TaskBuilder().unassigned().build();
  },

  /**
   * Create a task list with N tasks
   */
  taskList: (count: number): TaskListResponse => {
    const tasks = new TaskBuilder().buildMany(count);
    return new TaskListBuilder().withTasks(tasks).build();
  },

  /**
   * Create an empty task list
   */
  emptyTaskList: (): TaskListResponse => {
    return new TaskListBuilder().empty().build();
  },

  /**
   * Create a location
   */
  location: (id: string, name: string): Record<string, unknown> => {
    return new LocationBuilder().withId(id).withName(name).build();
  },

  /**
   * Create a user
   */
  user: (id: string, email: string): Record<string, unknown> => {
    return new UserDetailsBuilder().withId(id).withEmail(email).build();
  },
};
