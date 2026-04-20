import type { Page, TestInfo } from '@playwright/test';
import { applySessionCookies, loadSessionCookies } from '../../common/sessionCapture';

const defaultSearchCaseSessionUsers = ['FPL_GLOBAL_SEARCH'] as const;
const defaultIntegrationWarmupUsers = ['FPL_GLOBAL_SEARCH', 'SOLICITOR', 'STAFF_ADMIN'] as const;

function parseUserList(rawValue?: string): string[] {
  return Array.from(
    new Set(
      (rawValue ?? '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
    )
  );
}

export function resolveSearchCaseSessionUsers(env: NodeJS.ProcessEnv = process.env): string[] {
  const configured = parseUserList(env.PW_SEARCH_CASE_SESSION_USERS);
  return configured.length > 0 ? configured : [...defaultSearchCaseSessionUsers];
}

export function resolveIntegrationSessionWarmupUsers(env: NodeJS.ProcessEnv = process.env): string[] {
  const configured = parseUserList(env.PW_INTEGRATION_SESSION_WARMUP_USERS);
  if (configured.length > 0) {
    return configured;
  }
  return Array.from(new Set([...defaultIntegrationWarmupUsers, ...resolveSearchCaseSessionUsers(env)]));
}

export function resolveSearchCaseUserIdentifier(
  testInfo: Pick<TestInfo, 'workerIndex'>,
  env: NodeJS.ProcessEnv = process.env
): string {
  const users = resolveSearchCaseSessionUsers(env);
  return users[testInfo.workerIndex % users.length];
}

export async function applySearchCaseSessionCookies(
  page: Page,
  testInfo: Pick<TestInfo, 'workerIndex' | 'annotations'>,
  env: NodeJS.ProcessEnv = process.env
): Promise<string> {
  const userIdentifier = resolveSearchCaseUserIdentifier(testInfo, env);

  try {
    const session = loadSessionCookies(userIdentifier);
    if (session.cookies.length > 0) {
      await page.context().addCookies(session.cookies);
    }
  } catch {
    await applySessionCookies(page, userIdentifier);
  }

  testInfo.annotations.push({ type: 'session-user', description: userIdentifier });
  return userIdentifier;
}
