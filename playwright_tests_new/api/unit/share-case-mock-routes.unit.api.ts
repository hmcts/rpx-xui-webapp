import { expect, test } from '@playwright/test';
import { hasExpectedShareCaseIds, parseShareCaseIds } from '../../integration/helpers/shareCaseMockRoutes.helper.js';

test.describe('share case mock routes helper', { tag: '@svc-internal' }, () => {
  test('parses trimmed case ids from the share-case query string', () => {
    const searchParams = new URLSearchParams({
      case_ids: ' 1234567890123456, 2345678901234567 ,,3456789012345678 ',
    });

    expect(parseShareCaseIds(searchParams)).toEqual(['1234567890123456', '2345678901234567', '3456789012345678']);
  });

  test('returns an empty list when the share-case query is absent', () => {
    expect(parseShareCaseIds(new URLSearchParams())).toEqual([]);
  });

  test('matches the exact selected case set without allowing extras', () => {
    const searchParams = new URLSearchParams({
      case_ids: '2345678901234567,1234567890123456',
    });

    expect(hasExpectedShareCaseIds(searchParams, ['1234567890123456', '2345678901234567'])).toBe(true);
    expect(hasExpectedShareCaseIds(searchParams, ['1234567890123456'])).toBe(false);
    expect(hasExpectedShareCaseIds(searchParams, ['1234567890123456', '2345678901234567', '3456789012345678'])).toBe(false);
  });
});
