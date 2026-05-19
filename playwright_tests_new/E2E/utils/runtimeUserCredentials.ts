export type RuntimeUserCredentials = {
  email: string;
  password: string;
};

type RuntimeUserCredentialEnvMapping = {
  username: string;
  password: string;
};

export const RuntimeUserAlias = {
  DIVORCE_SOLICITOR: 'DIVORCE_SOLICITOR',
  SEARCH_EMPLOYMENT_CASE: 'SEARCH_EMPLOYMENT_CASE',
} as const;

export type RuntimeUserAlias = (typeof RuntimeUserAlias)[keyof typeof RuntimeUserAlias];

export type PublishedRuntimeUserCredentialEnvState = RuntimeUserCredentialEnvMapping & {
  previousUsername?: string;
  previousPassword?: string;
};

const runtimeUserCredentials = new Map<string, RuntimeUserCredentials>();
const dynamicUserEnvMap: Record<string, RuntimeUserCredentialEnvMapping> = {
  SOLICITOR: {
    username: 'WA_SOLICITOR_USERNAME',
    password: 'WA_SOLICITOR_PASSWORD',
  },
  DIVORCE_SOLICITOR: {
    username: 'DIVORCE_SOLICITOR_USERNAME',
    password: 'DIVORCE_SOLICITOR_PASSWORD',
  },
  PROD_LIKE: {
    username: 'PROD_LIKE_USERNAME',
    password: 'PROD_LIKE_PASSWORD',
  },
  SEARCH_EMPLOYMENT_CASE: {
    username: 'SEARCH_EMPLOYMENT_CASE_USERNAME',
    password: 'SEARCH_EMPLOYMENT_CASE_PASSWORD',
  },
  EMPLOYMENT_DYNAMIC_CASEWORKER: {
    username: 'EMPLOYMENT_DYNAMIC_CASEWORKER_USERNAME',
    password: 'EMPLOYMENT_DYNAMIC_CASEWORKER_PASSWORD',
  },
  EMPLOYMENT_DYNAMIC_SOLICITOR: {
    username: 'EMPLOYMENT_DYNAMIC_SOLICITOR_USERNAME',
    password: 'EMPLOYMENT_DYNAMIC_SOLICITOR_PASSWORD',
  },
  USER_WITH_FLAGS: {
    username: 'USER_WITH_FLAGS_USERNAME',
    password: 'USER_WITH_FLAGS_PASSWORD',
  },
  'BOOKING_UI-FT-ON': {
    username: 'BOOKING_UI_FT_ON_USERNAME',
    password: 'BOOKING_UI_FT_ON_PASSWORD',
  },
  'BOOKING_UI-FT-ON-1': {
    username: 'BOOKING_UI_FT_ON_1_USERNAME',
    password: 'BOOKING_UI_FT_ON_1_PASSWORD',
  },
  'BOOKING_UI-FT-ON-2': {
    username: 'BOOKING_UI_FT_ON_2_USERNAME',
    password: 'BOOKING_UI_FT_ON_2_PASSWORD',
  },
  'BOOKING_UI-FT-ON-3': {
    username: 'BOOKING_UI_FT_ON_3_USERNAME',
    password: 'BOOKING_UI_FT_ON_3_PASSWORD',
  },
  'BOOKING_UI-FT-ON-4': {
    username: 'BOOKING_UI_FT_ON_4_USERNAME',
    password: 'BOOKING_UI_FT_ON_4_PASSWORD',
  },
  STAFF_ADMIN: {
    username: 'STAFF_ADMIN_USERNAME',
    password: 'STAFF_ADMIN_PASSWORD',
  },
  'STAFF_ADMIN-1': {
    username: 'STAFF_ADMIN_1_USERNAME',
    password: 'STAFF_ADMIN_1_PASSWORD',
  },
  'STAFF_ADMIN-2': {
    username: 'STAFF_ADMIN_2_USERNAME',
    password: 'STAFF_ADMIN_2_PASSWORD',
  },
  'STAFF_ADMIN-3': {
    username: 'STAFF_ADMIN_3_USERNAME',
    password: 'STAFF_ADMIN_3_PASSWORD',
  },
  'STAFF_ADMIN-4': {
    username: 'STAFF_ADMIN_4_USERNAME',
    password: 'STAFF_ADMIN_4_PASSWORD',
  },
  HEARING_MANAGER_CR84_OFF: {
    username: 'HEARING_MANAGER_CR84_OFF_USERNAME',
    password: 'HEARING_MANAGER_CR84_OFF_PASSWORD',
  },
  'HEARING_MANAGER_CR84_OFF-1': {
    username: 'HEARING_MANAGER_CR84_OFF_1_USERNAME',
    password: 'HEARING_MANAGER_CR84_OFF_1_PASSWORD',
  },
  'HEARING_MANAGER_CR84_OFF-2': {
    username: 'HEARING_MANAGER_CR84_OFF_2_USERNAME',
    password: 'HEARING_MANAGER_CR84_OFF_2_PASSWORD',
  },
  'HEARING_MANAGER_CR84_OFF-3': {
    username: 'HEARING_MANAGER_CR84_OFF_3_USERNAME',
    password: 'HEARING_MANAGER_CR84_OFF_3_PASSWORD',
  },
  'HEARING_MANAGER_CR84_OFF-4': {
    username: 'HEARING_MANAGER_CR84_OFF_4_USERNAME',
    password: 'HEARING_MANAGER_CR84_OFF_4_PASSWORD',
  },
  HEARING_MANAGER_CR84_ON: {
    username: 'HEARING_MANAGER_CR84_ON_USERNAME',
    password: 'HEARING_MANAGER_CR84_ON_PASSWORD',
  },
  'HEARING_MANAGER_CR84_ON-1': {
    username: 'HEARING_MANAGER_CR84_ON_1_USERNAME',
    password: 'HEARING_MANAGER_CR84_ON_1_PASSWORD',
  },
  'HEARING_MANAGER_CR84_ON-2': {
    username: 'HEARING_MANAGER_CR84_ON_2_USERNAME',
    password: 'HEARING_MANAGER_CR84_ON_2_PASSWORD',
  },
  'HEARING_MANAGER_CR84_ON-3': {
    username: 'HEARING_MANAGER_CR84_ON_3_USERNAME',
    password: 'HEARING_MANAGER_CR84_ON_3_PASSWORD',
  },
  'HEARING_MANAGER_CR84_ON-4': {
    username: 'HEARING_MANAGER_CR84_ON_4_USERNAME',
    password: 'HEARING_MANAGER_CR84_ON_4_PASSWORD',
  },
  RESTRICTED_CASE_FILE_VIEW_ON: {
    username: 'RESTRICTED_CASE_FILE_VIEW_V1_1_ON_USERNAME',
    password: 'RESTRICTED_CASE_FILE_VIEW_V1_1_ON_PASSWORD',
  },
  ORG_USER_ASSIGNMENT: {
    username: 'ORG_USER_ASSIGNMENT_USERNAME',
    password: 'ORG_USER_ASSIGNMENT_PASSWORD',
  },
  IAC_JUDGE_WA_R1: {
    username: 'PW_IAC_JUDGE_WA_R1_EMAIL',
    password: 'PW_IAC_JUDGE_WA_R1_PASSWORD',
  },
  IAC_CASEOFFICER_R1: {
    username: 'PW_IAC_CASEOFFICER_R1_EMAIL',
    password: 'PW_IAC_CASEOFFICER_R1_PASSWORD',
  },
  IAC_CASEOFFICER_R2: {
    username: 'PW_IAC_CASEOFFICER_R2_EMAIL',
    password: 'PW_IAC_CASEOFFICER_R2_PASSWORD',
  },
  FPL_GLOBAL_SEARCH: {
    username: 'FPL_GLOBAL_SEARCH_USERNAME',
    password: 'FPL_GLOBAL_SEARCH_PASSWORD',
  },
  NOC_SOLICITOR: {
    username: 'NOC_SOLICITOR_USERNAME',
    password: 'NOC_SOLICITOR_PASSWORD',
  },
  PRL_SOLICITOR: {
    username: 'PRL_SOLICITOR_USERNAME',
    password: 'PRL_SOLICITOR_PASSWORD',
  },
};

const staffAdminPoolIdentifiers = ['STAFF_ADMIN-1', 'STAFF_ADMIN-2', 'STAFF_ADMIN-3', 'STAFF_ADMIN-4'] as const;

const runtimeUserIdentifierFallbacks: Record<string, string[] | ((env: NodeJS.ProcessEnv) => string[])> = {
  STAFF_ADMIN: (env) => {
    if (env.STAFF_ADMIN_POOL_ENABLED !== 'true') {
      return [];
    }

    const envIndex = Number(env.TEST_PARALLEL_INDEX ?? env.TEST_WORKER_INDEX);
    const startIndex = Number.isInteger(envIndex) && envIndex >= 0 ? envIndex % staffAdminPoolIdentifiers.length : 0;
    return staffAdminPoolIdentifiers.map(
      (_, offset) => staffAdminPoolIdentifiers[(startIndex + offset) % staffAdminPoolIdentifiers.length]
    );
  },
  FPL_GLOBAL_SEARCH: [],
  USER_WITH_FLAGS: [],
  IAC_JUDGE_WA_R1: ['IAC_CASEOFFICER_R1', 'IAC_CASEOFFICER_R2'],
  IAC_CASEOFFICER_R2: ['IAC_CASEOFFICER_R1'],
  IAC_CASEOFFICER_R1: [],
};

function normalizeUserIdentifier(userIdentifier: string): string {
  return userIdentifier.trim().toUpperCase();
}

export function getRuntimeUserCredentialEnvMapping(userIdentifier: string): RuntimeUserCredentialEnvMapping | undefined {
  return dynamicUserEnvMap[normalizeUserIdentifier(userIdentifier)];
}

export function getRuntimeUserCredentials(userIdentifier: string): RuntimeUserCredentials | undefined {
  return runtimeUserCredentials.get(normalizeUserIdentifier(userIdentifier));
}

export function resolveRuntimeUserCredentialsFromEnv(
  mapping: RuntimeUserCredentialEnvMapping
): RuntimeUserCredentials | undefined {
  const email = process.env[mapping.username]?.trim();
  const password = process.env[mapping.password];
  if (!email || !password) {
    return undefined;
  }

  return { email, password };
}

function resolveRuntimeUserCredentialsForIdentifierInternal(
  userIdentifier: string,
  env: NodeJS.ProcessEnv,
  visited: Set<string>
): RuntimeUserCredentials | undefined {
  const normalizedIdentifier = normalizeUserIdentifier(userIdentifier);
  if (visited.has(normalizedIdentifier)) {
    return undefined;
  }
  visited.add(normalizedIdentifier);

  const runtimeCredentials = runtimeUserCredentials.get(normalizedIdentifier);
  if (runtimeCredentials) {
    return runtimeCredentials;
  }

  const mapping = dynamicUserEnvMap[normalizedIdentifier];
  if (mapping) {
    const email = env[mapping.username]?.trim();
    const password = env[mapping.password];
    if (email && password) {
      return { email, password };
    }
  }

  const fallbackEntry = runtimeUserIdentifierFallbacks[normalizedIdentifier];
  let fallbackIdentifiers: string[] = [];
  if (typeof fallbackEntry === 'function') {
    fallbackIdentifiers = fallbackEntry(env);
  } else if (Array.isArray(fallbackEntry)) {
    fallbackIdentifiers = fallbackEntry;
  }

  for (const fallbackIdentifier of fallbackIdentifiers) {
    const resolved = resolveRuntimeUserCredentialsForIdentifierInternal(fallbackIdentifier, env, visited);
    if (resolved) {
      return resolved;
    }
  }

  return undefined;
}

export function resolveRuntimeUserCredentialsForIdentifier(
  userIdentifier: string,
  env: NodeJS.ProcessEnv = process.env
): RuntimeUserCredentials | undefined {
  return resolveRuntimeUserCredentialsForIdentifierInternal(userIdentifier, env, new Set<string>());
}

export function setRuntimeUserCredentials(userIdentifier: string, credentials: RuntimeUserCredentials): void {
  runtimeUserCredentials.set(normalizeUserIdentifier(userIdentifier), credentials);
}

export function clearRuntimeUserCredentials(userIdentifier: string): void {
  runtimeUserCredentials.delete(normalizeUserIdentifier(userIdentifier));
}

export function publishRuntimeUserCredentialsToEnv(
  userIdentifier: string,
  credentials: RuntimeUserCredentials
): PublishedRuntimeUserCredentialEnvState | undefined {
  const mapping = getRuntimeUserCredentialEnvMapping(userIdentifier);
  if (!mapping) {
    return undefined;
  }

  const publishedState: PublishedRuntimeUserCredentialEnvState = {
    ...mapping,
    previousUsername: process.env[mapping.username],
    previousPassword: process.env[mapping.password],
  };

  process.env[mapping.username] = credentials.email;
  process.env[mapping.password] = credentials.password;

  return publishedState;
}

export function restoreRuntimeUserCredentialsInEnv(publishedState: PublishedRuntimeUserCredentialEnvState | undefined): void {
  if (!publishedState) {
    return;
  }

  if (typeof publishedState.previousUsername === 'string') {
    process.env[publishedState.username] = publishedState.previousUsername;
  } else {
    delete process.env[publishedState.username];
  }

  if (typeof publishedState.previousPassword === 'string') {
    process.env[publishedState.password] = publishedState.previousPassword;
  } else {
    delete process.env[publishedState.password];
  }
}
