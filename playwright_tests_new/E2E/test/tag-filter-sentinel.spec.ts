import { expect, test } from '@playwright/test';

test('E2E tag-filter sentinel stays inside the normal tagged suite', { tag: ['@e2e'] }, () => {
  expect(true).toBe(true);
});
