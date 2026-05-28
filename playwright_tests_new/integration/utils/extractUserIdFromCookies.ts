import { logger } from '../../E2E/utils/logger.utils';

/**
 * Extracts the __userid__ value from a cookies array.
 * @param {Array} cookies - Array of cookie objects (from session).
 * @returns {string|null} The __userid__ value, or null if not found.
 */
export function extractUserIdFromCookies(cookies: any[]): string | null {
  if (!Array.isArray(cookies)) {
    logger.info('extractUserIdFromCookies received a non-array cookies value', { hasUserId: false });
    return null;
  }
  const userIdCookie = cookies.find((c) => c.name === '__userid__');
  const userId = userIdCookie ? userIdCookie.value : null;

  logger.info('extractUserIdFromCookies evaluated session cookies', {
    hasUserId: Boolean(userId),
    userIdLength: userId?.length ?? 0,
    cookieCount: cookies.length,
  });

  return userId;
}
