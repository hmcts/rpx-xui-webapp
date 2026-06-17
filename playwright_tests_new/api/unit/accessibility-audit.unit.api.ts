import { expect, test } from '@playwright/test';

import {
  isAccessibilityStrictMode,
  resolveAccessibilityEngines,
  type AccessibilityEngine,
} from '../../E2E/utils/accessibility/accessibilityAudit';

const defaultEngines: AccessibilityEngine[] = ['axe', 'wave-like', 'lighthouse'];

test.describe('Unified accessibility audit contract', { tag: '@svc-internal' }, () => {
  const previousEngines = process.env.A11Y_ENGINES;
  const previousPlaywrightEngines = process.env.PLAYWRIGHT_A11Y_ENGINES;
  const previousStrict = process.env.A11Y_STRICT;

  test.afterEach(() => {
    restoreEnv('A11Y_ENGINES', previousEngines);
    restoreEnv('PLAYWRIGHT_A11Y_ENGINES', previousPlaywrightEngines);
    restoreEnv('A11Y_STRICT', previousStrict);
  });

  test('uses all default engines when no override is provided', () => {
    delete process.env.A11Y_ENGINES;
    delete process.env.PLAYWRIGHT_A11Y_ENGINES;

    expect(resolveAccessibilityEngines(defaultEngines)).toEqual(defaultEngines);
  });

  test('supports all, aliases, and duplicate engine requests', () => {
    process.env.A11Y_ENGINES = 'wave,axe,wave-like';

    expect(resolveAccessibilityEngines(defaultEngines)).toEqual(['wave-like', 'axe']);

    process.env.A11Y_ENGINES = 'all';
    expect(resolveAccessibilityEngines(defaultEngines)).toEqual(defaultEngines);
  });

  test('uses report-only mode unless strict mode is explicitly enabled', () => {
    process.env.A11Y_STRICT = 'false';
    expect(isAccessibilityStrictMode()).toBe(false);

    process.env.A11Y_STRICT = 'true';
    expect(isAccessibilityStrictMode()).toBe(true);
  });
});

function restoreEnv(key: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[key];
    return;
  }

  process.env[key] = value;
}
