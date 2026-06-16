export type DynamicOrganisationRunIdOptions = {
  explicitRunId?: string;
  env?: NodeJS.ProcessEnv;
  maxLength?: number;
  localFallback?: string;
};

const DEFAULT_MAX_RUN_ID_LENGTH = 80;
const DEFAULT_LOCAL_FALLBACK = 'local';

export function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return undefined;
}

export function sanitizeDynamicOrganisationRunId(
  value: string,
  maxLength = DEFAULT_MAX_RUN_ID_LENGTH,
  fallback = DEFAULT_LOCAL_FALLBACK
): string {
  return (
    value
      .trim()
      .replaceAll(/[^a-zA-Z0-9-]/g, '-')
      .replaceAll(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, maxLength) || fallback
  );
}

function compositeRunId(...values: Array<string | undefined>): string | undefined {
  const parts = values.map((value) => value?.trim()).filter((value): value is string => Boolean(value));
  return parts.length > 0 ? parts.join('-') : undefined;
}

function isCiEnvironment(env: NodeJS.ProcessEnv): boolean {
  return Boolean(firstNonEmpty(env.CI, env.JENKINS_URL, env.BUILD_URL, env.GITHUB_ACTIONS, env.TF_BUILD, env.GITLAB_CI));
}

export function resolveDynamicOrganisationRunId(options: DynamicOrganisationRunIdOptions = {}): string {
  const env = options.env ?? process.env;
  const rawRunId = firstNonEmpty(
    options.explicitRunId,
    env.PW_DYNAMIC_ORGANISATION_RUN_ID,
    env.GITHUB_RUN_ID,
    env.BUILD_TAG,
    compositeRunId(env.JOB_NAME, env.BUILD_NUMBER),
    compositeRunId(env.JOB_BASE_NAME, env.BUILD_NUMBER),
    env.BUILD_ID,
    env.BUILD_NUMBER,
    env.BUILD_BUILDID,
    env.BUILD_BUILDNUMBER,
    env.CI_PIPELINE_ID,
    env.PW_TEST_RUN_ID
  );

  if (rawRunId) {
    return sanitizeDynamicOrganisationRunId(rawRunId, options.maxLength, options.localFallback);
  }

  if (isCiEnvironment(env)) {
    throw new Error(
      'Dynamic organisation provisioning requires a unique run id in CI. Set PW_DYNAMIC_ORGANISATION_RUN_ID or expose a standard CI run identifier such as BUILD_TAG, BUILD_ID, BUILD_NUMBER, GITHUB_RUN_ID, or CI_PIPELINE_ID.'
    );
  }

  return sanitizeDynamicOrganisationRunId(
    options.localFallback ?? DEFAULT_LOCAL_FALLBACK,
    options.maxLength,
    DEFAULT_LOCAL_FALLBACK
  );
}
