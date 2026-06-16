import { Observable, throwError } from 'rxjs';

interface WarnLogger {
  warn(message: string, error?: unknown): void;
}

export function getErrorStatus(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as Record<string, unknown>).status;
    return status !== undefined && status !== null ? String(status) : 'unknown';
  }
  return 'unknown';
}

export function logAndRethrow(logger: WarnLogger | undefined, context: string, error: unknown): Observable<never> {
  logger?.warn(`${context}; status=${getErrorStatus(error)}`, error);
  return throwError(() => error);
}
