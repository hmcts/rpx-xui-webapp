import type { SolicitorJurisdiction, SolicitorRoleSelectionResolution } from './roleStrategy.js';
import type { ProfessionalUserInfo } from './types.js';

type ProvisionedIdentity = {
  email: string;
  forename: string;
  surname: string;
};

type CreatedUserDataPath = 'idam-testing-support' | 'idam-update-existing' | 'idam-api-testing-support';

type SharedIdamProvisioningArgs = {
  token?: string;
  password: string;
  roleNames: readonly string[];
  attempts: number;
  roleSelection?: SolicitorRoleSelectionResolution;
  outputCreatedUserData?: boolean;
};

export type CreateUserViaTestingSupportArgs = SharedIdamProvisioningArgs & {
  identity: ProvisionedIdentity;
};

export type CreateUserViaSidamFirstArgs = SharedIdamProvisioningArgs & {
  identity: ProvisionedIdentity;
  emailPrefix: string;
};

type CreateUserViaTestingSupportDeps = {
  createUser: (args: {
    token: string;
    password: string;
    identity: ProvisionedIdentity;
    roleNames: readonly string[];
  }) => Promise<{ id: string; email: string }>;
  createUserViaSidamAccounts: (args: {
    token?: string;
    password: string;
    identity: ProvisionedIdentity;
    roleNames: readonly string[];
  }) => Promise<ProfessionalUserInfo>;
  ensureUserAccountActive: (args: {
    token: string;
    user: ProfessionalUserInfo;
    roleNames: readonly string[];
  }) => Promise<ProfessionalUserInfo>;
  updateExistingUser: (args: {
    token: string;
    password: string;
    identity: ProvisionedIdentity;
    roleNames: readonly string[];
  }) => Promise<ProfessionalUserInfo>;
  emitCreatedUserData: (args: {
    user: ProfessionalUserInfo;
    roleSelection?: SolicitorRoleSelectionResolution;
    createPath: CreatedUserDataPath;
    outputCreatedUserData?: boolean;
  }) => void;
  parseStatusCode: (error: unknown) => number | undefined;
  shouldFallbackToSidamAccounts: (statusCode: number | undefined, error: unknown) => boolean;
  isRetryableStatus: (statusCode: number | undefined) => boolean;
  createError: (error: unknown, message: string) => Error;
  sleep: (ms: number) => Promise<void>;
  warn: (message: string, meta: Record<string, unknown>) => void;
};

type CreateUserViaSidamFirstDeps = {
  createUserViaSidamAccounts: (args: {
    token?: string;
    password: string;
    identity: ProvisionedIdentity;
    roleNames: readonly string[];
  }) => Promise<ProfessionalUserInfo>;
  ensureUserAccountActive: (args: {
    token: string;
    user: ProfessionalUserInfo;
    roleNames: readonly string[];
  }) => Promise<ProfessionalUserInfo>;
  updateExistingUser: (args: {
    token: string;
    password: string;
    identity: ProvisionedIdentity;
    roleNames: readonly string[];
  }) => Promise<ProfessionalUserInfo>;
  emitCreatedUserData: (args: {
    user: ProfessionalUserInfo;
    roleSelection?: SolicitorRoleSelectionResolution;
    createPath: CreatedUserDataPath;
    outputCreatedUserData?: boolean;
  }) => void;
  parseStatusCode: (error: unknown) => number | undefined;
  isRetryableStatus: (statusCode: number | undefined) => boolean;
  createError: (error: unknown, message: string) => Error;
  createIdentity: (emailPrefix: string, jurisdiction?: SolicitorJurisdiction) => ProvisionedIdentity;
  sleep: (ms: number) => Promise<void>;
  warn: (message: string, meta: Record<string, unknown>) => void;
};

function resolveRetryDelayMs(attempt: number): number {
  return Math.min(200 * 2 ** (attempt - 1), 2_000);
}

type TestingSupportErrorOutcome =
  | { kind: 'return'; user: ProfessionalUserInfo }
  | { kind: 'throw'; error: unknown }
  | { kind: 'retry'; waitMs: number };

async function handleSidamFallbackCreate(
  args: CreateUserViaTestingSupportArgs,
  deps: CreateUserViaTestingSupportDeps,
  roleNames: readonly string[]
): Promise<ProfessionalUserInfo> {
  const createdViaSidam = await deps.createUserViaSidamAccounts({
    token: args.token,
    password: args.password,
    identity: args.identity,
    roleNames,
  });
  const activatedViaSidam = args.token
    ? await deps.ensureUserAccountActive({ token: args.token, user: createdViaSidam, roleNames })
    : createdViaSidam;
  deps.emitCreatedUserData({
    user: activatedViaSidam,
    roleSelection: args.roleSelection,
    createPath: 'idam-api-testing-support',
    outputCreatedUserData: args.outputCreatedUserData,
  });
  return activatedViaSidam;
}

async function handleTestingSupportCreateError(
  error: unknown,
  args: CreateUserViaTestingSupportArgs,
  deps: CreateUserViaTestingSupportDeps,
  roleNames: readonly string[],
  attempt: number
): Promise<TestingSupportErrorOutcome> {
  const statusCode = deps.parseStatusCode(error);
  if (statusCode === 409 && args.token) {
    const updatedUser = await deps.updateExistingUser({
      token: args.token,
      password: args.password,
      identity: args.identity,
      roleNames,
    });
    deps.emitCreatedUserData({
      user: updatedUser,
      roleSelection: args.roleSelection,
      createPath: 'idam-update-existing',
      outputCreatedUserData: args.outputCreatedUserData,
    });
    return { kind: 'return', user: updatedUser };
  }
  if (deps.shouldFallbackToSidamAccounts(statusCode, error)) {
    deps.warn('IDAM /test/idam/users unavailable or rejected; falling back to /testing-support/accounts.', {
      email: args.identity.email,
      statusCode,
    });
    const user = await handleSidamFallbackCreate(args, deps, roleNames);
    return { kind: 'return', user };
  }
  if (!deps.isRetryableStatus(statusCode) || attempt === args.attempts) {
    return { kind: 'throw', error };
  }
  return { kind: 'retry', waitMs: resolveRetryDelayMs(attempt) };
}

export async function createUserViaTestingSupportFlow(
  args: CreateUserViaTestingSupportArgs,
  deps: CreateUserViaTestingSupportDeps
): Promise<ProfessionalUserInfo> {
  const roleNames = [...new Set(args.roleNames)];
  let lastError: unknown;

  for (let attempt = 1; attempt <= args.attempts; attempt += 1) {
    try {
      const token = args.token;
      if (!token) {
        throw new Error('Create-user bearer token is required for the testing-support create path.');
      }
      const created = await deps.createUser({ token, password: args.password, identity: args.identity, roleNames });
      const createdUser: ProfessionalUserInfo = {
        id: created.id,
        email: created.email,
        password: args.password,
        forename: args.identity.forename,
        surname: args.identity.surname,
        roleNames,
      };
      deps.emitCreatedUserData({
        user: createdUser,
        roleSelection: args.roleSelection,
        createPath: 'idam-testing-support',
        outputCreatedUserData: args.outputCreatedUserData,
      });
      return createdUser;
    } catch (error) {
      lastError = error;
      const errorOutcome = await handleTestingSupportCreateError(error, args, deps, roleNames, attempt);
      if (errorOutcome.kind === 'return') return errorOutcome.user;
      if (errorOutcome.kind === 'throw') throw errorOutcome.error;
      deps.warn('Transient IDAM create user failure; retrying', {
        email: args.identity.email,
        attempt,
        attempts: args.attempts,
        statusCode: deps.parseStatusCode(error),
        waitMs: errorOutcome.waitMs,
      });
      await deps.sleep(errorOutcome.waitMs);
    }
  }

  throw deps.createError(lastError, 'Failed to create user in IDAM');
}

type Reconcile409SidamOutcome =
  | { action: 'return'; user: ProfessionalUserInfo }
  | { action: 'continue'; newIdentity: ProvisionedIdentity };

async function reconcile409SidamFirst(
  args: CreateUserViaSidamFirstArgs,
  deps: CreateUserViaSidamFirstDeps,
  identity: ProvisionedIdentity,
  roleNames: string[],
  attempt: number,
  jurisdiction: SolicitorJurisdiction | undefined
): Promise<Reconcile409SidamOutcome> {
  if (!args.token) {
    if (attempt < args.attempts) {
      const newIdentity = deps.createIdentity(args.emailPrefix, jurisdiction);
      deps.warn('SIDAM create returned 409 without create-user bearer token; regenerating identity and retrying.', {
        attempt,
        attempts: args.attempts,
        email: newIdentity.email,
      });
      return { action: 'continue', newIdentity };
    }
    throw new Error(
      'SIDAM create returned 409 and create-user bearer token is unavailable to reconcile existing user. Provide CREATE_USER_BEARER_TOKEN/IDAM_SECRET or retry when IDAM token endpoint is healthy.'
    );
  }
  const updatedUser = await deps.updateExistingUser({
    token: args.token,
    password: args.password,
    identity,
    roleNames,
  });
  deps.emitCreatedUserData({
    user: updatedUser,
    roleSelection: args.roleSelection,
    createPath: 'idam-update-existing',
    outputCreatedUserData: args.outputCreatedUserData,
  });
  return { action: 'return', user: updatedUser };
}

export async function createUserViaSidamFirstFlow(
  args: CreateUserViaSidamFirstArgs,
  deps: CreateUserViaSidamFirstDeps
): Promise<ProfessionalUserInfo> {
  const roleNames = [...new Set(args.roleNames)];
  const jurisdiction = args.roleSelection?.context.jurisdiction;
  let identity = args.identity;
  let lastError: unknown;

  for (let attempt = 1; attempt <= args.attempts; attempt += 1) {
    try {
      const createdViaSidam = await deps.createUserViaSidamAccounts({
        token: args.token,
        password: args.password,
        identity,
        roleNames,
      });
      const activatedViaSidam = args.token
        ? await deps.ensureUserAccountActive({
            token: args.token,
            user: createdViaSidam,
            roleNames,
          })
        : createdViaSidam;
      deps.emitCreatedUserData({
        user: activatedViaSidam,
        roleSelection: args.roleSelection,
        createPath: 'idam-api-testing-support',
        outputCreatedUserData: args.outputCreatedUserData,
      });
      return activatedViaSidam;
    } catch (error) {
      lastError = error;
      const statusCode = deps.parseStatusCode(error);
      if (statusCode === 409) {
        const outcome = await reconcile409SidamFirst(args, deps, identity, roleNames, attempt, jurisdiction);
        if (outcome.action === 'return') return outcome.user;
        identity = outcome.newIdentity;
        continue;
      }
      if (!deps.isRetryableStatus(statusCode) || attempt === args.attempts) {
        throw error;
      }
      const waitMs = resolveRetryDelayMs(attempt);
      deps.warn('Transient SIDAM create user failure; retrying', {
        email: identity.email,
        attempt,
        attempts: args.attempts,
        statusCode,
        waitMs,
      });
      await deps.sleep(waitMs);
    }
  }

  throw deps.createError(lastError, 'Failed to create user via SIDAM accounts');
}
