import { expect, test, type Page, type Route } from '@playwright/test';
import { setupStaffAdministrationMockRoutes } from '../../integration/helpers/staffAdministrationMockRoutes.helper';
import { secondStaffUser, staffUser, staffUserId } from '../../integration/mocks/staffAdministration.mock';

async function mockPage() {
  const handlers = new Map<string, (route: Route) => unknown>();
  const page = {
    addInitScript: async () => {},
    route: async (pattern: string | RegExp, handler: (route: Route) => unknown) => {
      handlers.set(String(pattern), handler);
    },
  } as unknown as Page;
  async function request(endpoint: string, body?: unknown, query = '', headers: Record<string, string> = {}) {
    let response: { status: number; json: unknown } | undefined;
    const handler = handlers.get(`**/api/staff-ref-data/${endpoint}*`);
    if (!handler) throw new Error(`Missing route: ${endpoint}`);
    await handler({
      request: () => ({
        url: () => `http://localhost/api/staff-ref-data/${endpoint}${query}`,
        postDataJSON: () => body,
        headers: () => headers,
      }),
      fulfill: async (value: typeof response) => {
        response = value;
      },
    } as unknown as Route);
    return response!;
  }
  return { page, request };
}

test.describe('staff HTTP mocks', { tag: '@svc-internal' }, () => {
  test('failed add and partial search do not create a user', async () => {
    const { page, request } = await mockPage();
    const captured = await setupStaffAdministrationMockRoutes(page, { addStatus: 400, searchStatus: 400 });
    expect((await request('getUsersByPartialName', undefined, '?search=Jane')).status).toBe(400);
    expect((await request('addNewUser', { ...staffUser, first_name: 'Alex' })).status).toBe(400);
    expect(captured.addRequests).toHaveLength(1);
    expect((await request('fetchSingleUserById', undefined, '?id=staff-added-001')).status).toBe(404);
  });

  test('filtered pages return different fixed users', async () => {
    const { page, request } = await mockPage();
    await setupStaffAdministrationMockRoutes(page);
    const first = await request('getFilteredUsers', undefined, '?userType=Legal%20operations', { 'page-number': '1' });
    const second = await request('getFilteredUsers', undefined, '?userType=Legal%20operations', { 'page-number': '2' });
    expect(first.json).toMatchObject({ pageNumber: 1, pageSize: 15, totalItems: 16 });
    expect(second.json).toMatchObject({ pageNumber: 2, items: [secondStaffUser], totalItems: 16 });
    expect((first.json as { items: unknown[] }).items).toHaveLength(15);
  });

  test('held update records the request before release, then updates only the selected user', async () => {
    const { page, request } = await mockPage();
    let release!: () => void;
    let signalStarted!: () => void;
    const updateGate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const updateStarted = new Promise<void>((resolve) => {
      signalStarted = resolve;
    });
    const captured = await setupStaffAdministrationMockRoutes(page, { updateGate, onUpdate: signalStarted });
    const pending = request('updateUser', { ...staffUser, suspended: true });
    await updateStarted;
    expect(captured.updateRequests).toHaveLength(1);
    expect((await request('fetchSingleUserById', undefined, `?id=${staffUserId}`)).json).toMatchObject({ suspended: false });
    release();
    await pending;
    expect((await request('fetchSingleUserById', undefined, `?id=${staffUserId}`)).json).toMatchObject({ suspended: true });
    expect((await request('fetchSingleUserById', undefined, `?id=${secondStaffUser.case_worker_id}`)).json).toEqual(
      secondStaffUser
    );
    expect(captured.detailsRequests).toEqual([staffUserId, staffUserId, secondStaffUser.case_worker_id]);
  });

  test('holds the post-update refetch until released without hiding the requested identity', async () => {
    const { page, request } = await mockPage();
    let release!: () => void;
    let signalStarted!: () => void;
    const refetchGate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const refetchStarted = new Promise<void>((resolve) => {
      signalStarted = resolve;
    });
    const captured = await setupStaffAdministrationMockRoutes(page, { refetchGate, onRefetch: signalStarted });
    await request('fetchSingleUserById', undefined, `?id=${staffUserId}`);
    await request('updateUser', { ...staffUser, suspended: true });
    let fulfilled = false;
    const pending = request('fetchSingleUserById', undefined, `?id=${staffUserId}`).then((response) => {
      fulfilled = true;
      return response;
    });
    await refetchStarted;
    expect(fulfilled).toBe(false);
    expect(captured.detailsRequests).toEqual([staffUserId, staffUserId]);
    release();
    expect((await pending).json).toMatchObject({ case_worker_id: staffUserId, suspended: true });
  });
});
