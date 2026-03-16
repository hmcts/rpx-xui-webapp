const BLOCKED_STATIC_USERNAMES = new Set(
  (process.env.BLOCKED_STATIC_USERNAMES ?? '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
);

const normalize = (value: string): string => value.trim().toLowerCase();

export const isBlockedStaticUsername = (value?: string): boolean => {
  if (!value) {
    return false;
  }
  return BLOCKED_STATIC_USERNAMES.has(normalize(value));
};

export const firstAllowedNonEmpty = (...values: Array<string | undefined>): string | undefined =>
  values.find((value) => {
    if (!value || value.trim().length === 0) {
      return false;
    }
    return !isBlockedStaticUsername(value);
  });
