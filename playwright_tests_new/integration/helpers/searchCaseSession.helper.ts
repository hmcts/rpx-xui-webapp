import type { Page, TestInfo } from '@playwright/test';
import type { SessionIdentityInput } from '../../common/sessionIdentity';
import { applySessionCookies, loadSessionCookies } from '../../common/sessionCapture';
import {
  HEARING_MANAGER_CR84_OFF_USER,
  HEARING_MANAGER_CR84_ON_USER,
  getConfiguredHearingManagerUserIdentifiers,
} from './hearingManagerUserPool.helper';
import { BOOKING_UI_LEGACY_USER_IDENTIFIER, getConfiguredBookingUiUserIdentifiers } from './bookingUiUserPool.helper';
import { resolveWelshLanguageSessionUsers } from './welshLanguageSession.helper';

const defaultSearchCaseSessionUsers = ['FPL_GLOBAL_SEARCH'] as const;
const defaultIntegrationWarmupUsers = ['FPL_GLOBAL_SEARCH', 'SOLICITOR', 'STAFF_ADMIN'] as const;
const integrationSuiteTag = '@integration';
const caseFileViewIntegrationTag = '@integration-case-file-view';
const caseFileViewUser = 'RESTRICTED_CASE_FILE_VIEW_ON';

type IntegrationTagSelection = {
  includeTags: string[];
  excludedTags: string[];
  availableTags: string[];
  suiteTag?: string;
};

type IntegrationWarmupResolver = (env: NodeJS.ProcessEnv) => SessionIdentityInput[];

const integrationWarmupUsersByTag: Record<string, IntegrationWarmupResolver> = {
  '@integration-access-requests': () => ['STAFF_ADMIN'],
  '@integration-booking-ui': (env) => {
    const configuredUsers = getConfiguredBookingUiUserIdentifiers(env);
    return configuredUsers.length > 0 ? [...configuredUsers] : [BOOKING_UI_LEGACY_USER_IDENTIFIER];
  },
  '@integration-case-details': () => ['STAFF_ADMIN'],
  [caseFileViewIntegrationTag]: () => [caseFileViewUser],
  '@integration-case-linking': () => ['STAFF_ADMIN', 'IAC_Judge_WA_R1'],
  '@integration-case-list': () => ['SOLICITOR'],
  '@integration-create-case': () => ['SOLICITOR'],
  '@integration-hearings': (env) => {
    const onUsers = getConfiguredHearingManagerUserIdentifiers(HEARING_MANAGER_CR84_ON_USER, env);
    const offUsers = getConfiguredHearingManagerUserIdentifiers(HEARING_MANAGER_CR84_OFF_USER, env);
    return [
      ...(onUsers.length > 0 ? onUsers : [HEARING_MANAGER_CR84_ON_USER]),
      ...(offUsers.length > 0 ? offUsers : [HEARING_MANAGER_CR84_OFF_USER]),
    ];
  },
  '@integration-manage-tasks': () => ['STAFF_ADMIN', 'IAC_CaseOfficer_R2', 'IAC_Judge_WA_R1'],
  '@integration-restricted-case': () => ['FPL_GLOBAL_SEARCH'],
  '@integration-search-case': (env) => resolveSearchCaseSessionUsers(env),
  '@integration-welsh-language': (env) => resolveWelshLanguageSessionUsers(env),
};

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

function sessionIdentityKey(identity: SessionIdentityInput): string {
  return typeof identity === 'string' ? identity : (identity.email ?? identity.userIdentifier);
}

function uniqueSessionIdentities(identities: SessionIdentityInput[]): SessionIdentityInput[] {
  const seen = new Set<string>();
  const unique: SessionIdentityInput[] = [];
  for (const identity of identities) {
    const key = sessionIdentityKey(identity).toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(identity);
  }
  return unique;
}

function resolveSelectedIntegrationTags(selection: IntegrationTagSelection): string[] {
  const suiteTag = selection.suiteTag ?? integrationSuiteTag;
  const requestedFeatureTags = selection.includeTags.filter((tag) => tag !== suiteTag);

  return requestedFeatureTags.filter((tag) => !selection.excludedTags.includes(tag));
}

function isFullIntegrationRun(selection: IntegrationTagSelection): boolean {
  const suiteTag = selection.suiteTag ?? integrationSuiteTag;
  return selection.includeTags.length === 0 || (selection.includeTags.length === 1 && selection.includeTags[0] === suiteTag);
}

export function resolveSearchCaseSessionUsers(env: NodeJS.ProcessEnv = process.env): string[] {
  const configured = parseUserList(env.PW_SEARCH_CASE_SESSION_USERS);
  return configured.length > 0 ? configured : [...defaultSearchCaseSessionUsers];
}

export function resolveIntegrationSessionWarmupUsers(
  env: NodeJS.ProcessEnv = process.env,
  tagSelection?: IntegrationTagSelection
): SessionIdentityInput[] {
  const configured = parseUserList(env.PW_INTEGRATION_SESSION_WARMUP_USERS);
  if (configured.includes('@none')) {
    return [];
  }

  if (configured.length > 0) {
    const explicitUsers = configured.filter((userIdentifier) => userIdentifier !== '@default');
    if (configured.includes('@default')) {
      return uniqueSessionIdentities([...defaultIntegrationWarmupUsers, ...resolveSearchCaseSessionUsers(env), ...explicitUsers]);
    }
    return uniqueSessionIdentities(explicitUsers);
  }

  if (!tagSelection) {
    return [];
  }

  if (isFullIntegrationRun(tagSelection)) {
    return uniqueSessionIdentities([
      ...defaultIntegrationWarmupUsers,
      ...(tagSelection.excludedTags.includes(caseFileViewIntegrationTag) ? [] : [caseFileViewUser]),
      ...resolveSearchCaseSessionUsers(env),
    ]);
  }

  return uniqueSessionIdentities(
    resolveSelectedIntegrationTags(tagSelection).flatMap((tag) => integrationWarmupUsersByTag[tag]?.(env) ?? [])
  );
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
