/**
 * Test case references for integration tests.
 *
 * Use these constants instead of hardcoding case references in test files.
 * This ensures consistency and makes it easy to update test data globally.
 */
export const TEST_CASE_REFERENCES = {
  /** Existing case reference that returns search results */
  FIND_CASE_EXISTING: '1670165807353529',

  /** Non-existent case reference that returns empty search results */
  FIND_CASE_NON_EXISTENT: '9999999999999999',

  /** Valid case reference for global search tests */
  GLOBAL_SEARCH_VALID: '1111222233334444',

  /** Non-existent case reference for global search tests */
  GLOBAL_SEARCH_NON_EXISTENT: '9999888877776666',

  /** Valid case reference for quick search tests */
  QUICK_SEARCH_VALID: '1111222233334444',

  /** Invalid case reference for quick search tests */
  QUICK_SEARCH_INVALID: '9999888877776666',
} as const;

/**
 * Test user identifiers for session management.
 *
 * These correspond to user profiles configured in the test environment.
 */
export const TEST_USERS = {
  FPL_GLOBAL_SEARCH: 'FPL_GLOBAL_SEARCH',
  SOLICITOR: 'SOLICITOR',
  CASEWORKER: 'CASEWORKER',
} as const;
