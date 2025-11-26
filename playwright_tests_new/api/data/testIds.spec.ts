import { expect, test } from '@playwright/test';
import { __requireValueForTest as requireValue } from './testIds';

test.describe('testIds requireValue', () => {
  test('throws when value is missing', () => {
    expect(() => requireValue(undefined, 'MISSING_ID')).toThrow(/MISSING_ID/);
  });

  test('returns value when present', () => {
    expect(requireValue('abc', 'PRESENT')).toBe('abc');
  });
});
