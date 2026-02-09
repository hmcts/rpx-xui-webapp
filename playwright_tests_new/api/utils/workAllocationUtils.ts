import { expect } from '@playwright/test';
import type { ApiClient } from '@hmcts/playwright-common';

import { expectStatus, withRetry, withXsrf } from './apiTestUtils';
import { expectTaskList } from './assertions';
import type { Task, TaskListResponse, UserDetailsResponse } from './types';
import { buildTaskSearchRequest, type SeededTaskResult } from './work-allocation';
import type { ApiUserRole } from './auth';

export function toArray<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }
  const obj = payload as Partial<{ task_names: T[]; taskNames: T[]; typesOfWork: T[] }>;
  if (obj && Array.isArray(obj.task_names)) {
    return obj.task_names;
  }
  if (obj && Array.isArray(obj.taskNames)) {
    return obj.taskNames;
  }
  if (obj && Array.isArray(obj.typesOfWork)) {
    return obj.typesOfWork;
  }
  return [];
}

export function assertLocationsListResponse(status: number, data: unknown): void {
  if (status !== 200) {
    return;
  }
  if (!Array.isArray(data)) {
    expect(Array.isArray(data)).toBe(true);
    return;
  }
  if (data.length > 0) {
    expect(data[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        locationName: expect.any(String),
      })
    );
  }
}

export function assertTaskNamesResponse(status: number, data: unknown): void {
  if (status !== 200) {
    return;
  }
  const names = toArray<string>(data);
  expect(Array.isArray(names)).toBe(true);
  if (names.length > 0) {
    expect(typeof names[0]).toBe('string');
  }
}

export function assertTypesOfWorkResponse(status: number, data: unknown): void {
  if (status !== 200) {
    return;
  }
  const types = toArray(data);
  expect(Array.isArray(types)).toBe(true);
  if (types.length > 0 && typeof types[0] === 'object' && types[0] !== null) {
    expect(types[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    );
  }
}

export function assertTaskSearchResponse(status: number, data: unknown): void {
  if (status === 200) {
    expectTaskList(data);
  }
}

export function assertAvailableTasksResponse(status: number, data: unknown): void {
  if (status !== 200) {
    return;
  }
  expectTaskList(data);
}

export function assertAllWorkResponse(status: number, data: unknown): void {
  if (status !== 200) {
    expect(status).toBeGreaterThanOrEqual(400);
    return;
  }
  expectTaskList(data);
}

export function extractMyWorkCases(data: unknown): unknown[] {
  if (Array.isArray(data)) {
    return data;
  }
  if (typeof data === 'object' && data !== null && 'cases' in data) {
    const cases = (data as { cases?: unknown }).cases;
    if (Array.isArray(cases)) {
      return cases;
    }
  }
  return [];
}

export function assertMyWorkDashboardResponse(status: number, data: unknown): void {
  if (status === 200 && data) {
    const cases = extractMyWorkCases(data);
    expect(Array.isArray(cases)).toBe(true);
  }
}

interface MyWorkTotalsResponse {
  total_records?: number;
  cases?: unknown[];
}

export function assertMyWorkTotalsResponse(status: number, data: unknown): void {
  if (status !== 200 || !data) {
    return;
  }
  const typed = data as Partial<MyWorkTotalsResponse>;
  if (typeof typed.total_records === 'number') {
    expect(typed.total_records).toBeGreaterThanOrEqual(0);
  }
  if (Array.isArray(typed.cases)) {
    expect(typed.cases.length).toBeGreaterThanOrEqual(0);
  }
}

export function assertCaseworkerListResponse(status: number, data: unknown): void {
  if (status === 200 && Array.isArray(data) && data.length > 0) {
    expect(data[0]).toEqual(
      expect.objectContaining({
        firstName: expect.any(String),
        lastName: expect.any(String),
        idamId: expect.any(String),
      })
    );
  }
}

type WorkAllocationApiClient = Pick<ApiClient, 'post' | 'get'>;

export async function fetchFirstTask(
  apiClient: WorkAllocationApiClient,
  locationId?: string,
  states: string[] = ['assigned', 'unassigned'],
  view: 'AllWork' | 'MyTasks' = 'AllWork'
): Promise<Task | undefined> {
  const body = buildTaskSearchRequest(view, {
    locations: toLocationList(locationId),
    states,
    searchBy: 'caseworker',
    pageSize: 5,
  });

  const response = (await withRetry(
    () =>
      apiClient.post('workallocation/task', {
        data: body,
        throwOnError: false,
      }),
    { retries: 1, retryStatuses: [502, 504] }
  )) as { data: TaskListResponse | undefined; status: number };
  const tasks = Array.isArray(response.data?.tasks) ? response.data.tasks : [];
  if (response.status !== 200 || tasks.length === 0) {
    return undefined;
  }
  return tasks[0];
}

type TaskDetails = {
  data?: { task?: TaskState; [key: string]: unknown };
  status: number;
  task?: TaskState;
};

export async function fetchTaskById(apiClient: WorkAllocationApiClient, id: string): Promise<TaskDetails> {
  if (!apiClient.get) {
    throw new Error('apiClient.get is required to fetch task by id');
  }
  return apiClient.get(`workallocation/task/${id}`, { throwOnError: false }) as Promise<TaskDetails>;
}

type TaskState = {
  assignee?: string;
  assigned_to?: string;
  task_state?: string;
  state?: string;
};

export function assertStateTransition(action: string, before?: TaskState, after?: TaskState): void {
  if (!after) {
    return;
  }
  const prevAssignee = before?.assignee ?? before?.assigned_to;
  const assignee = after.assignee ?? after.assigned_to;
  const newState = (after.task_state ?? after.state ?? '').toLowerCase();
  if (['claim', 'assign'].includes(action)) {
    expect(assignee ?? '').not.toEqual('');
    if (prevAssignee) {
      expect(assignee).not.toEqual('');
    }
    if (newState) {
      expect(newState).not.toContain('unassigned');
    }
  }
  if (['unclaim', 'unassign', 'cancel'].includes(action)) {
    if (prevAssignee) {
      expect(assignee ?? '').toBe('');
    }
    if (newState) {
      expect(newState).toMatch(/unassigned|cancel|unclaim/);
    }
  }
  if (action === 'complete') {
    expect(newState).toMatch(/complete|done|closed/);
  }
}

export function resolveUserId(data?: UserDetailsResponse): string | undefined {
  const userInfo = data?.userInfo;
  return userInfo?.id ?? userInfo?.uid;
}

export function resolveLocationId(status: number, data?: Array<{ id?: string }>): string | undefined {
  if (status !== 200 || !Array.isArray(data) || data.length === 0) {
    return undefined;
  }
  return data[0]?.id;
}

export function resolveSeededTaskIds(seeded?: SeededTaskResult): { sampleTaskId?: string; sampleMyTaskId?: string } {
  if (!seeded?.id) {
    return {};
  }
  return seeded.type === 'assigned' ? { sampleMyTaskId: seeded.id } : { sampleTaskId: seeded.id };
}

export function toLocationList(locationId?: string): string[] {
  return locationId ? [locationId] : [];
}

export function selectTaskId(candidates: Array<string | undefined>, fallback: string): string {
  for (const candidate of candidates) {
    if (candidate !== undefined) {
      return candidate;
    }
  }
  return fallback;
}

type SeededActionDeps = {
  apiClient: WorkAllocationApiClient;
  envTaskId?: string;
  envAssignedTaskId?: string;
  hasSeededEnvTasksFn?: typeof hasSeededEnvTasks;
  withXsrfFn?: (role: ApiUserRole, fn: (headers: Record<string, string>) => Promise<void>) => Promise<void>;
};

export async function runSeededAction(action: string, getId: () => string, deps: SeededActionDeps): Promise<boolean> {
  const withXsrfFn = deps.withXsrfFn ?? withXsrf;
  const taskId = getId();

  // Skip only if no valid task ID available (neither env nor dynamic)
  if (!taskId || taskId === '00000000-0000-0000-0000-000000000000') {
    return false;
  }

  await withXsrfFn('solicitor', async (headers) => {
    const res = await deps.apiClient.post(`workallocation/task/${taskId}/${action}`, {
      data: {},
      headers,
      throwOnError: false,
    });
    expectStatus(res.status, [200, 204]);
  });
  return true;
}

export function maybeAssertStateTransition(
  action: string,
  before: TaskState | undefined,
  after: TaskState | undefined,
  status: number
): boolean {
  if (isActionSuccessStatus(status)) {
    assertStateTransition(action, before, after);
    return true;
  }
  return false;
}

export function hasSeededEnvTasks(envTaskId?: string, envAssignedTaskId?: string): boolean {
  return Boolean(envTaskId || envAssignedTaskId);
}

export function isActionSuccessStatus(status: number): boolean {
  return status === 200 || status === 204;
}
