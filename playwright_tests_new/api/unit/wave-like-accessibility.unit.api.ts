import { expect, test } from '@playwright/test';

import { WAVE_LIKE_A11Y_TAG } from '../../E2E/utils/accessibility/waveLikeAccessibility';

test.describe('WAVE-like accessibility tag contract', { tag: '@svc-internal' }, () => {
  test('uses the PR-actionable WAVE-like accessibility tag', () => {
    expect(WAVE_LIKE_A11Y_TAG).toBe('@wave-a11y');
  });
});
