/**
 * Custom error types for HMCTS EXUI API testing
 * Provides rich context for debugging and monitoring
 */

import type { ApiUserRole } from './auth';

/**
 * Base class for all EXUI API test errors
 * Provides structured context for error tracking and debugging
 */
export abstract class ExuiTestError extends Error {
  constructor(
    message: string,
    public readonly context: Record<string, unknown> = {},
    public readonly cause?: Error
  ) {
    super(message);
    this.name = this.constructor.name;

    // Maintain proper stack trace in V8 engines
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      context: this.context,
      stack: this.stack,
      cause: this.cause ? {
        name: this.cause.name,
        message: this.cause.message
      } : undefined
    };
  }
}

/**
 * Authentication failures during IDAM token acquisition or session creation
 */
export class AuthenticationError extends ExuiTestError {
  constructor(
    message: string,
    public readonly role: ApiUserRole,
    context: Record<string, unknown> = {},
    cause?: Error
  ) {
    super(message, { role, ...context }, cause);
  }
}

/**
 * Session storage file corruption or invalid format
 */
export class StorageStateCorruptedError extends ExuiTestError {
  constructor(
    message: string,
    public readonly storagePath: string,
    context: Record<string, unknown> = {},
    cause?: Error
  ) {
    super(message, { storagePath, ...context }, cause);
  }
}

/**
 * API retry limit exceeded after multiple attempts
 */
export class ApiRetryExhaustedError extends ExuiTestError {
  constructor(
    message: string,
    public readonly endpoint: string,
    public readonly attempts: number,
    context: Record<string, unknown> = {},
    cause?: Error
  ) {
    super(message, { endpoint, attempts, ...context }, cause);
  }
}

/**
 * Missing or invalid configuration values
 */
export class ConfigurationError extends ExuiTestError {
  constructor(
    message: string,
    public readonly configKey: string,
    context: Record<string, unknown> = {},
    cause?: Error
  ) {
    super(message, { configKey, ...context }, cause);
  }
}

/**
 * Session capture failures during global setup
 */
export class SessionCaptureError extends ExuiTestError {
  constructor(
    message: string,
    public readonly userIdentifier: string,
    context: Record<string, unknown> = {},
    cause?: Error
  ) {
    super(message, { userIdentifier, ...context }, cause);
  }
}
