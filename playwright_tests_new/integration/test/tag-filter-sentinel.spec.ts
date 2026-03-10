import { expect, test } from '@playwright/test';

test('Integration tag-filter sentinel stays inside the normal tagged suite', { tag: ['@integration'] }, () => {
  expect(true).toBe(true);
});
