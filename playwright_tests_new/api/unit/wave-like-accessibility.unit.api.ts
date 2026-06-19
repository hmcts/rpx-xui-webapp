import { expect, test } from '@playwright/test';

import { includesWaveLikeA11y, WAVE_LIKE_A11Y_TAG } from '../../E2E/utils/accessibility/waveLikeAccessibility';

test.describe('WAVE-like accessibility tag contract', { tag: '@svc-internal' }, () => {
  test('uses the PR-actionable WAVE-like accessibility tag', () => {
    expect(WAVE_LIKE_A11Y_TAG).toBe('@wave-a11y');
  });

  test('keeps WAVE-like accessibility off by default', () => {
    expect(includesWaveLikeA11y({})).toBe(false);
  });

  test('allows parameterized WAVE-like accessibility runs by tag or switch', () => {
    expect(includesWaveLikeA11y({ E2E_PW_INCLUDE_TAGS: '@wave-a11y' })).toBe(true);
    expect(includesWaveLikeA11y({ PLAYWRIGHT_TAGS: '@wave-a11y' })).toBe(true);
    expect(includesWaveLikeA11y({ PLAYWRIGHT_INCLUDE_WAVE_A11Y: 'true' })).toBe(true);
  });
});
