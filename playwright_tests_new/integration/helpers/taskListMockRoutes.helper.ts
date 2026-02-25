import type { Page } from '@playwright/test';

/**
 * Sets up mock API routes for Task List tests.
 *
 * Mocks the health-check and work-allocation task endpoints so tests run
 * without a live backend, preventing flakiness from downstream service
 * unavailability.
 *
 * @param page            - Playwright Page object
 * @param taskListResponse - The mock task list payload to return from the task endpoint
 *
 * @example
 * ```typescript
 * await setupTaskListMockRoutes(page, buildMyTaskListMock(userId, 160));
 * ```
 */
export async function setupTaskListMockRoutes(page: Page, taskListResponse: unknown): Promise<void> {
  await page.route('**/api/healthCheck*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ healthState: true }),
    });
  });

  await page.route('**/workallocation/task*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(taskListResponse),
    });
  });
}
