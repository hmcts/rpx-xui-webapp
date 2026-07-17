/**
 * Base fixture values — shared between domain-specific aliases below.
 * Change these two values to globally update test references across all suites.
 */
const FIXTURE_VALID = '1111222233334444';
const FIXTURE_NON_EXISTENT = '9999888877776666';

/**
 * Test case references for integration tests.
 *
 * Use these constants instead of hardcoding case references in test files.
 * This ensures consistency and makes it easy to update test data globally.
 */
export const TEST_CASE_REFERENCES = {
  /**
   * Existing case reference for Find Case tests.
   * Intentionally distinct from FIXTURE_VALID — uses a realistic-format reference
   * to exercise the CCD workbasket filter path that validates the reference pattern.
   */
  FIND_CASE_EXISTING: '1670165807353529',

  /** Non-existent case reference that returns empty search results */
  FIND_CASE_NON_EXISTENT: '9999999999999999',

  /** Valid case reference for global search tests */
  GLOBAL_SEARCH_VALID: FIXTURE_VALID,

  /** Non-existent case reference for global search tests */
  GLOBAL_SEARCH_NON_EXISTENT: FIXTURE_NON_EXISTENT,

  /** Valid case reference for quick search tests */
  QUICK_SEARCH_VALID: FIXTURE_VALID,

  /** Invalid case reference for quick search tests */
  QUICK_SEARCH_INVALID: FIXTURE_NON_EXISTENT,
} as const;

/**
 * Test user identifiers for session management.
 *
 * These correspond to user profiles configured in the test environment.
 */
export const TEST_USERS = {
  FPL_GLOBAL_SEARCH: 'FPL_GLOBAL_SEARCH',
  /** Reserved for future solicitor-facing test suites */
  SOLICITOR: 'SOLICITOR',
  /** Reserved for future caseworker-facing test suites */
  CASEWORKER: 'CASEWORKER',
} as const;
