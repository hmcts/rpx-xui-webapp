import { expect, test } from '@playwright/test';

test('API tag-filter sentinel stays inside the normal tagged suite', { tag: ['@api'] }, () => {
  expect(true).toBe(true);
});
