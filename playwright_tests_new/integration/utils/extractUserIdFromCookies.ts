/**
 * Extracts the __userid__ value from a cookies array.
 * @param {Array} cookies - Array of cookie objects (from session).
 * @returns {string|null} The __userid__ value, or null if not found.
 */
export function extractUserIdFromCookies(cookies: any[]): string | null {
    if (!Array.isArray(cookies)) return null;
    const userIdCookie = cookies.find(c => c.name === '__userid__');
    return userIdCookie ? userIdCookie.value : null;
}
