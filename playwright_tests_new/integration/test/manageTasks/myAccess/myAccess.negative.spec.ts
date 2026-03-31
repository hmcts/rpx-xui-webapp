import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookies, myAccessRoutePattern, setupManageTasksBaseRoutes, setupMyAccessRoutes } from '../../../helpers';

const userIdentifier = 'STAFF_ADMIN';
const serviceDownStatuses = [400, 500];
const notAuthorisedStatuses = [401, 403];

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`My Access as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  serviceDownStatuses.forEach((errorStatus) => {
    test(`User sees the service down page on My access when the api returns ${errorStatus}`, async ({ taskListPage, page }) => {
      await test.step('Setup route mocks for My access failure', async () => {
        await setupMyAccessRoutes(page, { message: `forced error ${errorStatus}` }, { status: errorStatus, newCount: 0 });
      });

      await test.step('Navigate to My access', async () => {
        await taskListPage.gotoMyAccess();
      });

      await test.step('Verify the service down page is shown', async () => {
        await page.waitForURL(/\/service-down$/);
        await expect(taskListPage.exuiBodyComponent.serviceDownError).toBeVisible();
        await expect(taskListPage.serviceDownHeading).toBeVisible();
      });
    });
  });

  notAuthorisedStatuses.forEach((errorStatus) => {
    test(`User sees the not authorised page on My access when the api returns ${errorStatus}`, async ({ taskListPage, page }) => {
      await test.step('Setup route mocks for My access authorisation failure', async () => {
        await setupMyAccessRoutes(page, { message: `forced error ${errorStatus}` }, { status: errorStatus, newCount: 0 });
      });

      await test.step('Navigate to My access', async () => {
        await page.goto('/work/my-work/my-access', { waitUntil: 'domcontentloaded' });
      });

      await test.step('Verify the not authorised page is shown', async () => {
        await page.waitForURL(/\/not-authorised$/);
        await expect(taskListPage.notAuthorisedHeading).toBeVisible();
      });
    });
  });

  test(`User sees the service down page on My access if the api times out`, async ({ taskListPage, page }) => {
    await test.step('Setup route mocks for a My access timeout', async () => {
      await setupManageTasksBaseRoutes(page);
      await page.route('**/api/role-access/roles/get-my-access-new-count*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ count: 0 }),
        });
      });
      await page.route(myAccessRoutePattern, async (route) => {
        await route.abort('timedout');
      });
    });

    await test.step('Navigate to My access', async () => {
      await taskListPage.gotoMyAccess();
    });

    await test.step('Verify the service down page is shown', async () => {
      await page.waitForURL(/\/service-down$/);
      await expect(taskListPage.exuiBodyComponent.serviceDownError).toBeVisible();
      await expect(taskListPage.serviceDownHeading).toBeVisible();
    });
  });
});
