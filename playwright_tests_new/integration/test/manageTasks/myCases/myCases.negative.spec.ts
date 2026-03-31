import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookies, myCasesRoutePattern, setupManageTasksBaseRoutes, setupMyCasesRoutes } from '../../../helpers';

const userIdentifier = 'STAFF_ADMIN';
const serviceDownStatuses = [400, 500];
const notAuthorisedStatuses = [401, 403];

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`My Cases as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  serviceDownStatuses.forEach((errorStatus) => {
    test(`User sees the service down page on My cases when the api returns ${errorStatus}`, async ({ taskListPage, page }) => {
      await test.step('Setup route mocks for My cases failure', async () => {
        await setupMyCasesRoutes(page, { message: `forced error ${errorStatus}` }, { status: errorStatus });
      });

      await test.step('Navigate to My cases', async () => {
        await taskListPage.gotoMyCases();
      });

      await test.step('Verify the service down page is shown', async () => {
        await page.waitForURL(/\/service-down$/);
        await expect(taskListPage.exuiBodyComponent.serviceDownError).toBeVisible();
        await expect(taskListPage.serviceDownHeading).toBeVisible();
      });
    });
  });

  notAuthorisedStatuses.forEach((errorStatus) => {
    test(`User sees the not authorised page on My cases when the api returns ${errorStatus}`, async ({ taskListPage, page }) => {
      await test.step('Setup route mocks for My cases authorisation failure', async () => {
        await setupMyCasesRoutes(page, { message: `forced error ${errorStatus}` }, { status: errorStatus });
      });

      await test.step('Navigate to My cases', async () => {
        await page.goto('/work/my-work/my-cases', { waitUntil: 'domcontentloaded' });
      });

      await test.step('Verify the not authorised page is shown', async () => {
        await page.waitForURL(/\/not-authorised$/);
        await expect(taskListPage.notAuthorisedHeading).toBeVisible();
      });
    });
  });

  test(`User ${userIdentifier} sees the service down page on My cases if the api times out`, async ({ taskListPage, page }) => {
    await test.step('Setup route mocks for a My cases timeout', async () => {
      await setupManageTasksBaseRoutes(page);
      await page.route(myCasesRoutePattern, async (route) => {
        await route.abort('timedout');
      });
    });

    await test.step('Navigate to My cases', async () => {
      await taskListPage.gotoMyCases();
    });

    await test.step('Verify the service down page is shown', async () => {
      await page.waitForURL(/\/service-down$/);
      await expect(taskListPage.exuiBodyComponent.serviceDownError).toBeVisible();
      await expect(taskListPage.serviceDownHeading).toBeVisible();
    });
  });
});
