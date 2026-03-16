import type { Page } from '@playwright/test';

export const taskListRoutePattern = /\/workallocation\/task(?:\?.*)?$/;
const defaultSupportedJurisdictionsMock = ['IA', 'SSCS'];

export async function setupTaskListBootstrapRoutes(
  page: Page,
  supportedJurisdictions: string[] = defaultSupportedJurisdictionsMock
): Promise<void> {
  await page.route('**/api/wa-supported-jurisdiction/get*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(supportedJurisdictions),
    });
  });

  await page.route('**/workallocation/task/types-of-work*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { key: 'applications', label: 'Applications' },
        { key: 'hearing_work', label: 'Hearing work' },
        { key: 'routine_work', label: 'Routine work' },
      ]),
    });
  });

  await page.route('**/api/healthCheck*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ healthState: true }),
    });
  });

  await page.route('**/workallocation/region-location*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/workallocation/full-location*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });
}

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
  await setupTaskListBootstrapRoutes(page);

  await page.route(taskListRoutePattern, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(taskListResponse),
    });
  });
}
