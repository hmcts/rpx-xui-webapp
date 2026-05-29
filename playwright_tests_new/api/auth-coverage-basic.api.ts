/**
 * @file auth-coverage-basic.api.ts
 * @description Coverage tests for basic auth helper functions (string utils, cache, credentials)
 * @security-note Tests basic utility functions with no real credentials
 */

import { test, expect } from '@playwright/test';

import { config } from '../common/apiTestConfig';
import { __test__ as authTest } from './utils/auth';

test.describe.configure({ mode: 'serial' });

test.describe('Auth helper coverage - basic utilities', { tag: '@svc-auth' }, () => {
  test('extractCsrf parses token and returns undefined when missing', () => {
    expect(authTest.extractCsrf('<input name="_csrf" value="token">')).toBe('token');
    expect(authTest.extractCsrf('<html></html>')).toBeUndefined();
  });

  test('stripTrailingSlash removes trailing slashes', () => {
    expect(authTest.stripTrailingSlash('https://example.com///')).toBe('https://example.com');
  });

  test('getCacheKey includes test environment', () => {
    expect(authTest.getCacheKey('solicitor')).toBe(`${config.testEnv}-solicitor`);
  });

  test('getCredentials returns configured users and errors on unknown roles', () => {
    const creds = authTest.getCredentials('solicitor');
    expect(creds.username).toContain('@');
    expect(creds.password).toBeTruthy();
    expect(() => authTest.getCredentials('unknown' as any)).toThrow('No credentials configured');
  });
});
