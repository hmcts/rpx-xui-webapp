import type { Page } from '@playwright/test';

import type { SessionIdentityInput } from '../../../common/sessionIdentity';
import { ensureSessionCookies } from '../../../common/sessionCapture';
import type { TaskListPage } from '../../page-objects/pages/exui/taskList.po';

const DEFAULT_WORK_ALLOCATION_USER = 'IAC_CASEOFFICER_R1';
const LOCAL_INTERNAL_WA_EMAIL = 'xui_auto_co_r1@justice.gov.uk';
const LOCAL_INTERNAL_WA_SESSION_KEY = 'xui_auto_co_r1-justice.gov.uk';

export function resolveWorkAllocationUser(): SessionIdentityInput {
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

export const workAllocationUser = resolveWorkAllocationUser();

function describeWorkAllocationUser(identity: SessionIdentityInput): string {
  if (typeof identity === 'string') {
    return identity;
  }

  return `${identity.userIdentifier} (${identity.email})`;
}

export async function applyWorkAllocationSession(page: Page) {
  const { cookies } = await ensureSessionCookies(workAllocationUser);
  if (cookies.length) {
    await page.context().addCookies(cookies);
  }
}

export async function bootstrapWorkAllocationShell({ page, taskListPage }: { page: Page; taskListPage: TaskListPage }) {
  await applyWorkAllocationSession(page);
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
