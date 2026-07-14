import type { Page, TestInfo } from '@playwright/test';
import type { SessionIdentityInput } from '../../common/sessionIdentity';
import { applySessionCookiesFromPool } from '../../common/sessionCapture';
import { getConfiguredStaffAdminUserIdentifiers } from '../../common/staffAdminUserPool';
import {
  HEARING_MANAGER_CR84_OFF_USER,
  HEARING_MANAGER_CR84_ON_USER,
  getConfiguredHearingManagerUserIdentifiers,
} from './hearingManagerUserPool.helper';
import { BOOKING_UI_LEGACY_USER_IDENTIFIER, getConfiguredBookingUiUserIdentifiers } from './bookingUiUserPool.helper';
import { resolveWelshLanguageSessionUsers } from './welshLanguageSession.helper';

const defaultSearchCaseSessionUsers = ['FPL_GLOBAL_SEARCH'] as const;
const integrationSuiteTag = '@integration';
const caseFileViewIntegrationTag = '@integration-case-file-view';
const caseFileViewUser = 'RESTRICTED_CASE_FILE_VIEW_ON';

type IntegrationTagSelection = {
  includeTags: string[];
  excludedTags: string[];
  availableTags: string[];
  suiteTag?: string;
};

type IntegrationSessionResolver = (env: NodeJS.ProcessEnv) => SessionIdentityInput[];

const integrationSessionUsersByTag: Record<string, IntegrationSessionResolver> = {
  '@integration-access-requests': (env) => resolveStaffAdminSessionUsers(env),
  '@integration-booking-ui': (env) => {
    const configuredUsers = getConfiguredBookingUiUserIdentifiers(env);
    return configuredUsers.length > 0 ? [...configuredUsers] : [BOOKING_UI_LEGACY_USER_IDENTIFIER];
  },
  '@integration-case-details': (env) => resolveStaffAdminSessionUsers(env),
  [caseFileViewIntegrationTag]: () => [caseFileViewUser],
  '@integration-case-linking': (env) => [...resolveStaffAdminSessionUsers(env), 'IAC_Judge_WA_R1'],
  '@integration-case-list': () => ['SOLICITOR'],
  '@integration-ccd-toolkit': () => ['SOLICITOR'],
  '@integration-create-case': () => ['SOLICITOR'],
  '@integration-data-loss': () => ['SOLICITOR'],
  '@integration-hearings': (env) => {
    const onUsers = getConfiguredHearingManagerUserIdentifiers(HEARING_MANAGER_CR84_ON_USER, env);
    const offUsers = getConfiguredHearingManagerUserIdentifiers(HEARING_MANAGER_CR84_OFF_USER, env);
    return [
      ...(onUsers.length > 0 ? onUsers : [HEARING_MANAGER_CR84_ON_USER]),
      ...(offUsers.length > 0 ? offUsers : [HEARING_MANAGER_CR84_OFF_USER]),
    ];
  },
  '@integration-manage-tasks': (env) => [...resolveStaffAdminSessionUsers(env), 'IAC_CaseOfficer_R2', 'IAC_Judge_WA_R1'],
  // Authentication and user details are route-mocked by this suite.
  '@integration-platform-services': () => [],
  '@integration-query-management': (env) => ['SOLICITOR', ...resolveStaffAdminSessionUsers(env)],
  '@integration-restricted-case': () => ['FPL_GLOBAL_SEARCH'],
  '@integration-search-case': (env) => resolveSearchCaseSessionUsers(env),
  '@integration-share-case': () => ['SOLICITOR'],
  '@integration-welsh-language': (env) => resolveWelshLanguageSessionUsers(env),
};

function resolveStaffAdminSessionUsers(env: NodeJS.ProcessEnv): SessionIdentityInput[] {
  const configuredUsers = getConfiguredStaffAdminUserIdentifiers(env);
  return configuredUsers.length > 0 ? configuredUsers : ['STAFF_ADMIN'];
}

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

function assertIntegrationSessionMappings(tags: string[]): void {
  const missingTags = tags.filter((tag) => !Object.prototype.hasOwnProperty.call(integrationSessionUsersByTag, tag));
  if (missingTags.length > 0) {
    throw new Error(`Integration session mappings missing for: ${missingTags.join(', ')}`);
  }
}

export function resolveSearchCaseSessionUsers(env: NodeJS.ProcessEnv = process.env): string[] {
  const configured = parseUserList(env.PW_SEARCH_CASE_SESSION_USERS);
  return configured.length > 0 ? configured : [...defaultSearchCaseSessionUsers];
}

export function resolveIntegrationSessionUsers(
  env: NodeJS.ProcessEnv = process.env,
  tagSelection?: IntegrationTagSelection
): SessionIdentityInput[] {
  const selectedTags = tagSelection
    ? isFullIntegrationRun(tagSelection)
      ? tagSelection.availableTags.filter(
          (tag) => tag !== (tagSelection.suiteTag ?? integrationSuiteTag) && !tagSelection.excludedTags.includes(tag)
        )
      : resolveSelectedIntegrationTags(tagSelection)
    : [];
  assertIntegrationSessionMappings(selectedTags);
  const selectedTagUsers = tagSelection
    ? uniqueSessionIdentities(selectedTags.flatMap((tag) => integrationSessionUsersByTag[tag](env)))
    : [];

  if (!tagSelection) {
    return [];
  }

  return selectedTagUsers;
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
  const users = resolveSearchCaseSessionUsers(env);
  const selectedUserIdentifier = resolveSearchCaseUserIdentifier(testInfo, env);
  const candidates = [selectedUserIdentifier, ...users.filter((userIdentifier) => userIdentifier !== selectedUserIdentifier)];
  const { userIdentifier } = await applySessionCookiesFromPool(page, candidates);

  testInfo.annotations.push({ type: 'session-user', description: userIdentifier });
  return userIdentifier;
}
