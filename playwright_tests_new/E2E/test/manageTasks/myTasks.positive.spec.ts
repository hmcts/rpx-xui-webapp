import type { Page } from '@playwright/test';
import type { SessionIdentityInput } from '../../../common/sessionIdentity';
import type { TaskListPage } from '../../page-objects/pages/exui/taskList.po';
import { ensureSessionCookies } from '../../../common/sessionCapture';
import { expect, test } from '../../fixtures';

const DEFAULT_WORK_ALLOCATION_USER = 'IAC_CASEOFFICER_R1';
const LOCAL_INTERNAL_WA_EMAIL = 'xui_auto_co_r1@justice.gov.uk';
const LOCAL_INTERNAL_WA_SESSION_KEY = 'xui_auto_co_r1-justice.gov.uk';

function resolveWorkAllocationUser(): SessionIdentityInput {
  const explicitEmail = process.env.PW_E2E_MANAGE_TASKS_EMAIL?.trim();
  const explicitPassword = process.env.PW_E2E_MANAGE_TASKS_PASSWORD;
  if (explicitEmail || explicitPassword) {
    if (!explicitEmail || !explicitPassword) {
      throw new Error('PW_E2E_MANAGE_TASKS_EMAIL and PW_E2E_MANAGE_TASKS_PASSWORD must be set together.');
    }

    return {
      userIdentifier: 'PW_E2E_MANAGE_TASKS',
      email: explicitEmail,
      password: explicitPassword,
      sessionKey: explicitEmail,
    };
  }

  const configuredUser = process.env.PW_E2E_MANAGE_TASKS_USER?.trim();
  if (configuredUser) {
    return configuredUser;
  }

  if (process.env.PW_IAC_CASEOFFICER_R1_EMAIL?.trim() && process.env.PW_IAC_CASEOFFICER_R1_PASSWORD) {
    return DEFAULT_WORK_ALLOCATION_USER;
  }

  return {
    userIdentifier: DEFAULT_WORK_ALLOCATION_USER,
    email: LOCAL_INTERNAL_WA_EMAIL,
    password: process.env.PW_IAC_CASEOFFICER_R1_PASSWORD ?? '',
    sessionKey: LOCAL_INTERNAL_WA_SESSION_KEY,
  };
}

const workAllocationUser = resolveWorkAllocationUser();

function describeWorkAllocationUser(identity: SessionIdentityInput): string {
  if (typeof identity === 'string') {
    return identity;
  }

  return `${identity.userIdentifier} (${identity.email})`;
}

async function bootstrapWorkAllocationShell({ page, taskListPage }: { page: Page; taskListPage: TaskListPage }) {
  const { cookies } = await ensureSessionCookies(workAllocationUser);
  if (cookies.length) {
    await page.context().addCookies(cookies);
  }

  await taskListPage.goto();

  const hasMyWorkNavigation = await page
    .getByRole('navigation', { name: /primary navigation/i })
    .getByRole('link', { name: 'My work', exact: true })
    .isVisible()
    .catch(() => false);
  if (!hasMyWorkNavigation) {
    const heading = await page
      .locator('h1')
      .first()
      .textContent({ timeout: 1_000 })
      .catch(() => '');
    throw new Error(
      `Work Allocation shell did not expose My work navigation for ${describeWorkAllocationUser(
        workAllocationUser
      )}. url=${page.url()} heading=${heading?.trim() || 'unknown'}`
    );
  }

  await taskListPage.waitForTaskListShellReady('work allocation shell bootstrap');
}

test.describe('Verify live available tasks actions appear as expected', { tag: ['@e2e', '@e2e-manage-tasks'] }, () => {
  test.beforeEach(async ({ page, taskListPage }) => {
    await bootstrapWorkAllocationShell({ page, taskListPage });
  });

  test('Verify Available tasks actions appear as expected', async ({ taskListPage, tableUtils }) => {
    await test.step('Open Available tasks and wait for live task data', async () => {
      taskListPage.clearApiCalls();
      await taskListPage.clickTaskTabAndWaitForView('Available tasks', 'AvailableTasks', 'opening live available tasks', {
        timeoutMs: 60_000,
      });
      await taskListPage.waitForTaskRowReady('live available tasks', { timeoutMs: 60_000 });
    });

    await test.step('Check available tasks has data in the table', async () => {
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(table.length).toBeGreaterThan(0);
    });

    await test.step('Verify tasks actions are shown as expected', async () => {
      await taskListPage.openManageActionsForRow(0, 'live available tasks actions');
      await expect(taskListPage.getTaskActionsRow(0)).toBeVisible();
      await expect(taskListPage.getTaskActionForRow(0, 'claim')).toBeVisible();
      await expect(taskListPage.getTaskActionForRow(0, 'claim-and-go')).toBeVisible();
    });
  });
});

test.describe('Verify live assigned my tasks actions appear as expected', { tag: ['@e2e', '@e2e-manage-tasks-assigned'] }, () => {
  test.skip(
    true,
    'Requires a seeded assigned Work Allocation task. Local AAT probes found WA-capable users but 0 assigned My Tasks.'
  );

  test.beforeEach(async ({ page, taskListPage }) => {
    const { cookies } = await ensureSessionCookies(workAllocationUser);
    if (cookies.length) {
      await page.context().addCookies(cookies);
    }
    await taskListPage.goto();
    // Prefer UI readiness over brittle network waits; fall back to response when available.
    await Promise.race([
      page.waitForResponse((res) => res.url().includes('/workallocation/task') && res.ok(), { timeout: 60000 }),
      taskListPage.taskListTable.waitFor({ state: 'visible', timeout: 60000 }),
    ]).catch(async () => {
      // If neither completes, surface clearer error context by awaiting table visibility.
      await taskListPage.taskListTable.waitFor({ state: 'visible', timeout: 60000 });
    });
  });

  test('Verify My tasks actions appear as expected', async ({ taskListPage, tableUtils }) => {
    await test.step('Navigate to the task list page', async () => {
      await expect(taskListPage.taskListTable).toBeVisible();
      taskListPage.clearApiCalls();
      await taskListPage.waitForManageButton('my tasks tab', { timeoutMs: 60_000 });
    });

    await test.step('Check my available tasks has data in the table', async () => {
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(table.length).toBeGreaterThan(0);
    });

    await test.step('Verify tasks actions are shown as expected', async () => {
      await taskListPage.manageCaseButtons.nth(0).click();
      await expect(taskListPage.taskActionsRow).toBeVisible();
      await expect(taskListPage.taskActionCancel).toBeVisible();
      await expect(taskListPage.taskActionGoTo).toBeVisible();
      await expect(taskListPage.taskActionMarkAsDone).toBeVisible();
      await expect(taskListPage.taskActionReassign).toBeVisible();
      await expect(taskListPage.taskActionUnassign).toBeVisible();
    });
  });
});
