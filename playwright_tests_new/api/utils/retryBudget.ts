/**
 * Retry budget and circuit breaker implementation for API testing
 * Prevents retry storms and detects systemic failures
 *
 * @hmcts-audit-metadata
 * {
 *   "agent_name": "HMCTS-AI-Assistant",
 *   "version": "v1.0",
 *   "audit_reference": "EXUI-4031",
 *   "reviewer": "pending",
 *   "last_audit": "2026-01-12"
 * }
 */

import { createLogger } from '@hmcts/playwright-common';

const logger = createLogger({ serviceName: 'retry-budget', format: 'pretty' });

/**
 * Tracks failure rate over a sliding time window
 * Prevents unlimited retries during outages
 */
export class RetryBudget {
  private failureCount = 0;
  private readonly windowMs: number;
  private windowStart: number;
  private readonly maxFailures: number;

  constructor(windowMs = 60000, maxFailures = 10) {
    this.windowMs = windowMs;
    this.maxFailures = maxFailures;
    this.windowStart = Date.now();
  }

  /**
   * Check if retry budget allows another attempt
   */
  canRetry(): boolean {
    this.resetIfWindowExpired();
    return this.failureCount < this.maxFailures;
  }

  /**
   * Record a failed attempt
   */
  recordFailure(endpoint?: string): void {
    this.resetIfWindowExpired();
    this.failureCount++;

    if (this.failureCount >= this.maxFailures) {
      logger.error('Retry budget exhausted - possible systemic issue', {
        failureCount: this.failureCount,
        windowMs: this.windowMs,
        endpoint,
        operation: 'retry-budget'
      });
    }
  }

  /**
   * Record a successful attempt
   */
  recordSuccess(): void {
    // Success doesn't reset the window, but we track it for monitoring
    this.resetIfWindowExpired();
  }

  /**
   * Get current budget status
   */
  getStatus(): { failureCount: number; remainingAttempts: number; windowStart: number } {
    this.resetIfWindowExpired();
    return {
      failureCount: this.failureCount,
      remainingAttempts: Math.max(0, this.maxFailures - this.failureCount),
      windowStart: this.windowStart
    };
  }

  /**
   * Reset the failure counter if time window has expired
   */
  private resetIfWindowExpired(): void {
    const now = Date.now();
    if (now - this.windowStart > this.windowMs) {
      if (this.failureCount > 0) {
        logger.info('Retry budget window expired, resetting counters', {
          previousFailures: this.failureCount,
          windowDurationMs: now - this.windowStart,
          operation: 'retry-budget'
        });
      }
      this.failureCount = 0;
      this.windowStart = now;
    }
  }
}

// Global retry budget shared across all API calls
// Prevents cascading failures across the entire test suite
const globalRetryBudget = new RetryBudget();

/**
 * Get the global retry budget instance
 */
export function getGlobalRetryBudget(): RetryBudget {
  return globalRetryBudget;
}

/**
 * Create a scoped retry budget for specific endpoint or test
 */
export function createScopedRetryBudget(windowMs?: number, maxFailures?: number): RetryBudget {
  return new RetryBudget(windowMs, maxFailures);
}
