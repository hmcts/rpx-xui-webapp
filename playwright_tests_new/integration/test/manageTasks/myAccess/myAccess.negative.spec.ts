import { expect, test } from '../../../../E2E/fixtures';
import { applyPrewarmedSessionCookies, setupTaskListBootstrapRoutes, taskListRoutePattern } from '../../../helpers';

const userIdentifier = 'STAFF_ADMIN';
const myAccessRoutePattern = /\/workallocation\/my-work\/myaccess(?:\?.*)?$/;
const serviceDownStatuses = [400, 500];
const notAuthorisedStatuses = [401, 403];

test.beforeEach(async ({ page }) => {
  await applyPrewarmedSessionCookies(page, userIdentifier);
});

test.describe(`My Access as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  serviceDownStatuses.forEach((errorStatus) => {
    test(`User sees the service down page on My access when the api returns ${errorStatus}`, async ({ taskListPage, page }) => {
      await test.step('Setup route mocks for My access failure', async () => {
        await setupTaskListBootstrapRoutes(page);
        await page.route('**/api/role-access/roles/get-my-access-new-count*', async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ count: 0 }),
          });
        });
        await page.route(taskListRoutePattern, async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ tasks: [], total_records: 0 }),
          });
        });
        await page.route(myAccessRoutePattern, async (route) => {
          await route.fulfill({
            status: errorStatus,
            contentType: 'application/json',
            body: JSON.stringify({ message: `forced error ${errorStatus}` }),
          });
        });
      });

      await test.step('Navigate to My access', async () => {
        await taskListPage.goto();
        await taskListPage.taskTableTabs.filter({ hasText: 'My access' }).first().click();
      });

      await test.step('Verify the service down page is shown', async () => {
        await page.waitForURL(/\/service-down$/);
        await expect(taskListPage.exuiBodyComponent.serviceDownError).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Sorry, there is a problem with the service' })).toBeVisible();
      });
    });
  });

  notAuthorisedStatuses.forEach((errorStatus) => {
    test(`User sees the not authorised page on My access when the api returns ${errorStatus}`, async ({ taskListPage, page }) => {
      await test.step('Setup route mocks for My access authorisation failure', async () => {
        await setupTaskListBootstrapRoutes(page);
        await page.route('**/api/role-access/roles/get-my-access-new-count*', async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ count: 0 }),
          });
        });
        await page.route(taskListRoutePattern, async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ tasks: [], total_records: 0 }),
          });
        });
        await page.route(myAccessRoutePattern, async (route) => {
          await route.fulfill({
            status: errorStatus,
            contentType: 'application/json',
            body: JSON.stringify({ message: `forced error ${errorStatus}` }),
          });
        });
      });

      await test.step('Navigate to My access', async () => {
        await taskListPage.goto();
        await taskListPage.taskTableTabs.filter({ hasText: 'My access' }).first().click();
      });

      await test.step('Verify the not authorised page is shown', async () => {
        await page.waitForURL(/\/not-authorised$/);
        await expect(page.getByRole('heading', { name: "Sorry, you're not authorised to perform this action" })).toBeVisible();
      });
    });
  });

  test(`User ${userIdentifier} sees the service down page on My access if the api times out`, async ({ taskListPage, page }) => {
    await test.step('Setup route mocks for a My access timeout', async () => {
      await setupTaskListBootstrapRoutes(page);
      await page.route('**/api/role-access/roles/get-my-access-new-count*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ count: 0 }),
        });
      });
      await page.route(taskListRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ tasks: [], total_records: 0 }),
        });
      });
      await page.route(myAccessRoutePattern, async (route) => {
        await route.abort('timedout');
      });
    });

    await test.step('Navigate to My access', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'My access' }).first().click();
    });

    await test.step('Verify the service down page is shown', async () => {
      await page.waitForURL(/\/service-down$/);
      await expect(taskListPage.exuiBodyComponent.serviceDownError).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Sorry, there is a problem with the service' })).toBeVisible();
    });
  });
});
