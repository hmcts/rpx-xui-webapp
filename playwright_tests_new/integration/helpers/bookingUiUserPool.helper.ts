import { getRuntimeUserCredentialEnvMapping } from '../../E2E/utils/runtimeUserCredentials';

export const BOOKING_UI_LEGACY_USER_IDENTIFIER = 'BOOKING_UI-FT-ON' as const;

export const BOOKING_UI_POOLED_USER_IDENTIFIERS = [
  'BOOKING_UI-FT-ON-1',
  'BOOKING_UI-FT-ON-2',
  'BOOKING_UI-FT-ON-3',
  'BOOKING_UI-FT-ON-4',
] as const;

export type BookingUiUserIdentifier =
  | typeof BOOKING_UI_LEGACY_USER_IDENTIFIER
  | (typeof BOOKING_UI_POOLED_USER_IDENTIFIERS)[number];

type ParallelIndexSource = {
  parallelIndex: number;
};

type EnvMap = Record<string, string | undefined>;

function hasConfiguredCredentials(userIdentifier: BookingUiUserIdentifier, env: EnvMap): boolean {
  const mapping = getRuntimeUserCredentialEnvMapping(userIdentifier);
  if (!mapping) {
    return false;
  }

  return Boolean(env[mapping.username]?.trim() && env[mapping.password]);
}

export function getConfiguredBookingUiUserIdentifiers(env: EnvMap = process.env): BookingUiUserIdentifier[] {
  return BOOKING_UI_POOLED_USER_IDENTIFIERS.filter((userIdentifier) => hasConfiguredCredentials(userIdentifier, env));
}

export function resolveBookingUiUserIdentifier(
  testInfo: ParallelIndexSource,
  env: EnvMap = process.env
): BookingUiUserIdentifier {
  const configuredUserIdentifiers = getConfiguredBookingUiUserIdentifiers(env);
  if (configuredUserIdentifiers.length === 0) {
    return BOOKING_UI_LEGACY_USER_IDENTIFIER;
  }

  const parallelIndex = Number.isInteger(testInfo.parallelIndex) && testInfo.parallelIndex > 0 ? testInfo.parallelIndex : 0;
  return configuredUserIdentifiers[parallelIndex % configuredUserIdentifiers.length];
}
