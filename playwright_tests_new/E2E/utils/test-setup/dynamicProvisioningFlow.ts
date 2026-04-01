import type { ProvisionedProfessionalUser } from '../professional-user/types.js';
import type { SolicitorRoleContext } from '../professional-user/roleStrategy.js';

export type DynamicProvisionAttempt = {
  attempt: number;
  durationMs: number;
  outcome: 'success' | 'failed';
  error?: string;
};

export class DynamicProvisioningError extends Error {
  readonly attempts: DynamicProvisionAttempt[];
  readonly cause: unknown;

  constructor(message: string, attempts: DynamicProvisionAttempt[], cause: unknown) {
    super(message);
    this.name = 'DynamicProvisioningError';
    this.attempts = [...attempts];
    this.cause = cause;
  }
}

export class DynamicProvisionTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DynamicProvisionTimeoutError';
  }
}

type ProvisionDynamicUserFlowArgs = {
  alias: string;
  organisationId: string;
  roleContext?: SolicitorRoleContext;
  roleNames?: readonly string[];
  mode: 'internal' | 'external' | 'auto';
  timeoutMs: number;
  maxAttempts: number;
  retryDelayMs: number;
};

type ProvisionDynamicUserFlowDeps = {
  createSolicitorUserForOrganisation: (args: {
    organisationId: string;
    roleContext?: SolicitorRoleContext;
    roleNames?: readonly string[];
    mode: 'internal' | 'external' | 'auto';
    resendInvite: boolean;
    outputCreatedUserData: boolean;
  }) => Promise<ProvisionedProfessionalUser>;
  withTimeout: <T>(action: Promise<T>, timeoutMs: number, message: string) => Promise<T>;
  shouldRetry: (error: unknown) => boolean;
  describeError: (error: unknown) => string;
  sleep: (ms: number) => Promise<void>;
  now: () => number;
  info: (message: string, meta: Record<string, unknown>) => void;
  warn: (message: string, meta: Record<string, unknown>) => void;
  outputCreatedUserData: boolean;
};

export async function provisionUserWithRetries(
  args: ProvisionDynamicUserFlowArgs,
  deps: ProvisionDynamicUserFlowDeps
): Promise<{ user: ProvisionedProfessionalUser; attempts: DynamicProvisionAttempt[] }> {
  const attempts: DynamicProvisionAttempt[] = [];
  let user: ProvisionedProfessionalUser | undefined;
  let lastProvisionError: unknown;

  for (let attempt = 1; attempt <= args.maxAttempts; attempt += 1) {
    const startedAt = deps.now();
    try {
      deps.info('Provisioning dynamic solicitor user', {
        alias: args.alias,
        attempt,
        maxAttempts: args.maxAttempts,
        timeoutMs: args.timeoutMs,
        roleContext: args.roleContext,
        roleNames: args.roleNames,
        mode: args.mode,
      });

      user = await deps.withTimeout(
        deps.createSolicitorUserForOrganisation({
          organisationId: args.organisationId,
          roleContext: args.roleContext,
          roleNames: args.roleNames,
          mode: args.mode,
          resendInvite: false,
          outputCreatedUserData: deps.outputCreatedUserData,
        }),
        args.timeoutMs,
        `Dynamic user provisioning timed out after ${args.timeoutMs}ms for alias '${args.alias}' on attempt ${attempt}/${args.maxAttempts}.`
      );

      attempts.push({
        attempt,
        durationMs: deps.now() - startedAt,
        outcome: 'success',
      });
      return { user, attempts };
    } catch (error) {
      const errorMessage = deps.describeError(error);
      const retryable = deps.shouldRetry(error);
      attempts.push({
        attempt,
        durationMs: deps.now() - startedAt,
        outcome: 'failed',
        error: errorMessage,
      });
      lastProvisionError = error;
      deps.warn('Dynamic solicitor provisioning attempt failed', {
        alias: args.alias,
        attempt,
        maxAttempts: args.maxAttempts,
        retryable,
        retryDelayMs: args.retryDelayMs,
        error: errorMessage,
      });
      if (attempt === args.maxAttempts || !retryable) {
        break;
      }
      await deps.sleep(args.retryDelayMs);
    }
  }

  const lastErrorMessage = deps.describeError(lastProvisionError);
  throw new DynamicProvisioningError(
    `Dynamic user provisioning failed for alias '${args.alias}' after ${attempts.length} attempt(s). Last error: ${lastErrorMessage}`,
    attempts,
    lastProvisionError
  );
}
