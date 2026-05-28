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
