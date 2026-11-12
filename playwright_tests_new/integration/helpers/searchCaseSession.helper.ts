import type { Page, TestInfo } from '@playwright/test';
import { applySessionCookiesFromPool } from '../../common/sessionCapture';
import { resolveSearchCaseSessionUsers } from './integrationSessionUsers.helper';

const probateFindCaseSessionUsers = ['PROBATE_CASEWORKER'] as const;

export { resolveIntegrationSessionUsers, resolveSearchCaseSessionUsers } from './integrationSessionUsers.helper';

export function resolveSearchCaseUserIdentifier(
  testInfo: Pick<TestInfo, 'parallelIndex'>,
  env: NodeJS.ProcessEnv = process.env
): string {
  const users = resolveSearchCaseSessionUsers(env);
  return users[testInfo.parallelIndex % users.length];
}

export function resolveProbateSearchCaseUserIdentifier(testInfo: Pick<TestInfo, 'parallelIndex'>): string {
  return probateFindCaseSessionUsers[testInfo.parallelIndex % probateFindCaseSessionUsers.length];
}

export async function applySearchCaseSessionCookies(
  page: Page,
  testInfo: Pick<TestInfo, 'parallelIndex' | 'annotations'>,
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

export async function applyProbateSearchCaseSessionCookies(
  page: Page,
  testInfo: Pick<TestInfo, 'parallelIndex' | 'annotations'>,
  applyFromPool: typeof applySessionCookiesFromPool = applySessionCookiesFromPool
): Promise<string> {
  const userIdentifier = resolveProbateSearchCaseUserIdentifier(testInfo);
  const session = await applyFromPool(page, [userIdentifier]);

  testInfo.annotations.push({ type: 'session-user', description: session.userIdentifier });
  return session.userIdentifier;
}
