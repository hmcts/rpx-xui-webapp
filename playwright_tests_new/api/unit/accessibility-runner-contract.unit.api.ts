import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const accessibilityRunner = require('../../../scripts/run-playwright-accessibility.cjs') as {
  buildAccessibilityEnvironment: (
    sourceEnv: Record<string, string | undefined>,
    args: string[]
  ) => Record<string, string | undefined>;
};
const a11yRunner = require('../../../scripts/run-playwright-a11y.cjs') as {
  configureA11yEnvironment: (sourceEnv: Record<string, string | undefined>) => Record<string, string | undefined>;
};
const waveA11yRunner = require('../../../scripts/run-playwright-wave-a11y.cjs') as {
  configureWaveA11yEnvironment: (sourceEnv: Record<string, string | undefined>) => Record<string, string | undefined>;
};

test.describe('accessibility runner contracts', { tag: '@svc-internal' }, () => {
  test('uses dedicated diagnostics output directories and preserves explicit overrides', () => {
    expect(accessibilityRunner.buildAccessibilityEnvironment({}, []).PLAYWRIGHT_OUTPUT_DIR).toBe(
      'functional-output/tests/playwright-accessibility/test-results'
    );
    expect(a11yRunner.configureA11yEnvironment({}).PLAYWRIGHT_OUTPUT_DIR).toBe(
      'functional-output/tests/playwright-a11y/test-results'
    );
    expect(waveA11yRunner.configureWaveA11yEnvironment({}).PLAYWRIGHT_OUTPUT_DIR).toBe(
      'functional-output/tests/playwright-wave-a11y/test-results'
    );

    const explicitOutput = { PLAYWRIGHT_OUTPUT_DIR: 'custom/test-results' };
    expect(accessibilityRunner.buildAccessibilityEnvironment(explicitOutput, []).PLAYWRIGHT_OUTPUT_DIR).toBe(
      'custom/test-results'
    );
    expect(a11yRunner.configureA11yEnvironment({ ...explicitOutput }).PLAYWRIGHT_OUTPUT_DIR).toBe('custom/test-results');
    expect(waveA11yRunner.configureWaveA11yEnvironment({ ...explicitOutput }).PLAYWRIGHT_OUTPUT_DIR).toBe('custom/test-results');
  });
});
