export type RuntimeUserCredentials = {
  email: string;
  password: string;
};

type RuntimeUserCredentialEnvMapping = {
  username: string;
  password: string;
};

export type PublishedRuntimeUserCredentialEnvState = RuntimeUserCredentialEnvMapping & {
  previousUsername?: string;
  previousPassword?: string;
};

const runtimeUserCredentials = new Map<string, RuntimeUserCredentials>();
const dynamicUserEnvMap: Record<string, RuntimeUserCredentialEnvMapping> = {
  SOLICITOR: {
    username: 'SOLICITOR_USERNAME',
    password: 'SOLICITOR_PASSWORD',
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
  RESTRICTED_CASE_FILE_VIEW_ON: {
    username: 'RESTRICTED_CASE_FILE_VIEW_V1_1_ON_USERNAME',
    password: 'RESTRICTED_CASE_FILE_VIEW_V1_1_ON_PASSWORD',
  },
  RESTRICTED_CASE_FILE_VIEW_OFF: {
    username: 'RESTRICTED_CASE_FILE_VIEW_V1_1_OFF_USERNAME',
    password: 'RESTRICTED_CASE_FILE_VIEW_V1_1_OFF_PASSWORD',
  },
  ORG_USER_ASSIGNMENT: {
    username: 'ORG_USER_ASSIGNMENT_USERNAME',
    password: 'ORG_USER_ASSIGNMENT_PASSWORD',
  },
  IAC_JUDGE_WA_R1: {
    username: 'PW_IAC_JUDGE_WA_R1_EMAIL',
    password: 'PW_IAC_JUDGE_WA_R1_PASSWORD',
  },
  IAC_CASEOFFICER_R2: {
    username: 'PW_IAC_CASEOFFICER_R2_EMAIL',
    password: 'PW_IAC_CASEOFFICER_R2_PASSWORD',
  },
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
