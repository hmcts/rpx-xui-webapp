/**
 * E2E Test Logger Utility
 *
 * Provides centralized winston logger for E2E tests with HMCTS standards:
 * - Structured logging with redaction support
 * - Configurable log levels via LOG_LEVEL env var
 * - Pretty format for local development, JSON for CI
 * - Service-specific metadata tagging
 *
 * Usage:
 * ```typescript
 * import { logger } from '../../utils/logger.utils';
 *
 * logger.info('Navigating to case list page');
 * logger.debug('Case reference extracted', { caseRef: '1234567890123456' });
 * logger.warn('Unexpected element state', { selector: '.banner' });
 * logger.error('Test step failed', { error: err.message });
 * ```
 *
 * Environment Configuration:
 * - LOG_LEVEL: trace|debug|info|warn|error (default: info)
 * - LOG_FORMAT: json|pretty (default: pretty for local, json for CI)
 * - LOG_REDACTION: on|off (default: on)
 */

import { createLogger } from '@hmcts/playwright-common';

/**
 * Singleton logger instance for E2E tests
 *
 * Configured with:
 * - Service name: 'exui-e2e-tests'
 * - Format: pretty (colorized console output for readability)
 * - Level: info (or LOG_LEVEL env var)
 * - Redaction: enabled (sensitive data automatically redacted)
 */
export const logger = createLogger({
  serviceName: 'exui-e2e-tests',
  format: process.env.CI ? 'json' : 'pretty',
  level: process.env.LOG_LEVEL ?? 'info',
  enableRedaction: true,
});

/**
 * Create a child logger with additional context metadata
 *
 * Useful for grouping logs by test file, page object, or scenario.
 *
 * @example
 * ```typescript
 * const caseListLogger = createContextLogger({ component: 'CaseListPage' });
 * caseListLogger.info('Selecting first case from results');
 * // Output: [exui-e2e-tests] [CaseListPage] Selecting first case from results
 * ```
 */
export function createContextLogger(meta: Record<string, unknown>) {
  return logger.child(meta);
}

/**
 * Log timing information for performance tracking
 *
 * @example
 * ```typescript
 * const start = Date.now();
 * await someAsyncOperation();
 * logTiming('Case creation', start);
 * // Output: Case creation took 2345ms
 * ```
 */
export function logTiming(operation: string, startTime: number): void {
  const duration = Date.now() - startTime;
  logger.debug(`${operation} took ${duration}ms`, { operation, duration });
}

/**
 * Log page object method entry (debug level)
 *
 * Useful for tracing test execution flow in verbose mode.
 *
 * @example
 * ```typescript
 * logMethodEntry('CaseListPage.getRandomCaseReferenceFromResults', { selection: 'first' });
 * ```
 */
export function logMethodEntry(method: string, params?: Record<string, unknown>): void {
  logger.debug(`→ ${method}`, { method, params });
}

/**
 * Log page object method exit (debug level)
 *
 * @example
 * ```typescript
 * logMethodExit('CaseListPage.getRandomCaseReferenceFromResults', { caseRef: '1234567890123456' });
 * ```
 */
export function logMethodExit(method: string, result?: Record<string, unknown>): void {
  logger.debug(`← ${method}`, { method, result });
}
