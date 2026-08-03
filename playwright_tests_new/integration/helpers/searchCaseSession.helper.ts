import type { Page, TestInfo } from '@playwright/test';
import { applySessionCookiesFromPool } from '../../common/sessionCapture';
import { resolveSearchCaseSessionUsers } from './integrationSessionUsers.helper';

export { resolveIntegrationSessionUsers, resolveSearchCaseSessionUsers } from './integrationSessionUsers.helper';

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
  env: NodeJS.ProcessEnv = process.env,
  applyFromPool: typeof applySessionCookiesFromPool = applySessionCookiesFromPool
): Promise<string> {
  const users = resolveSearchCaseSessionUsers(env);
  const selectedUserIdentifier = resolveSearchCaseUserIdentifier(testInfo, env);
  const candidates = [selectedUserIdentifier, ...users.filter((userIdentifier) => userIdentifier !== selectedUserIdentifier)];
  const { userIdentifier } = await applyFromPool(page, candidates);

  testInfo.annotations.push({ type: 'session-user', description: userIdentifier });
  return userIdentifier;
}
