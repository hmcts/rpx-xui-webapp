import { expect, test } from '@playwright/test';
import { redactHeaders, redactEntry } from './fixtures';
import type { ApiLogEntry } from '@hmcts/playwright-common';

test.describe('API log redaction', () => {
  test('redacts sensitive headers', () => {
    const headers = {
      Authorization: 'Bearer secret',
      ServiceAuthorization: 'Bearer service-secret',
      cookie: 'session=abc',
      'X-XSRF-TOKEN': 'token',
      'Content-Type': 'application/json'
    };
    const redacted = redactHeaders(headers);
    expect(redacted?.Authorization).toBe('<redacted>');
    expect(redacted?.ServiceAuthorization).toBe('<redacted>');
    expect(redacted?.cookie).toBe('<redacted>');
    expect(redacted?.['X-XSRF-TOKEN']).toBe('<redacted>');
    expect(redacted?.['Content-Type']).toBe('application/json');
  });

  test('redacts headers inside ApiLogEntry', () => {
    const entry: ApiLogEntry = {
      id: '1',
      method: 'GET',
      url: 'http://example.com',
      status: 200,
      ok: true,
      timestamp: '',
      durationMs: 1,
      request: { headers: { Authorization: 'secret' } },
      response: { headers: { cookie: 'abc' } }
    };
    const redacted = redactEntry(entry);
    expect((redacted.request?.headers as any)?.Authorization).toBe('<redacted>');
    expect((redacted.response?.headers as any)?.cookie).toBe('<redacted>');
  });

  test('returns original when headers are undefined', () => {
    expect(redactHeaders(undefined)).toBeUndefined();
  });

  test('redacts raw request/response headers', () => {
    const entry: any = {
      id: '2',
      method: 'POST',
      url: 'http://example.com',
      status: 201,
      ok: true,
      timestamp: '',
      durationMs: 1,
      rawRequest: { headers: { Authorization: 'top-secret' } },
      rawResponse: { headers: { cookie: 'abc' } }
    };
    const redacted = redactEntry(entry as any);
    expect((redacted.rawRequest?.headers as any)?.Authorization).toBe('<redacted>');
    expect((redacted.rawResponse?.headers as any)?.cookie).toBe('<redacted>');
  });
});
