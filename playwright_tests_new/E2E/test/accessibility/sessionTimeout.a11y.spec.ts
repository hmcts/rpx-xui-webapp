import { expect } from '@playwright/test';
import { test } from '../../fixtures';
import {
  auditAccessibilityPage,
  isAccessibilityStrictMode,
  resolveAccessibilityEngines,
} from '../../utils/accessibility/accessibilityAudit';
import { attachAccessibilityReachabilityFailureEvidence } from '../../utils/accessibility/screenReaderLikeAccessibility';
import { setupSessionTimeoutAccessibility } from '../../utils/test-setup/sessionTimeoutAccessibility';

test('Session timeout - focus entry, keyboard containment and restoration @accessibility @a11y', async ({ page }, testInfo) => {
  test.skip(
    resolveAccessibilityEngines(['axe', 'wave-like', 'screen-reader']).length === 0,
    'No applicable accessibility engines selected.'
  );
  const feature = 'Session timeout';
  const pageState = 'Idle warning dialog';
  const context = {
    scenarioId: 'session-timeout.keyboard.en',
    persona: 'staff',
    language: 'en',
    authentication: 'mocked',
    dataMode: 'synthetic',
  };
  const dialog = page.getByRole('dialog');
  const priorFocus = page.getByRole('link', { name: /^Immigration and Asylum$/i });
  const staySignedIn = dialog.getByRole('button', { name: 'Stay signed in', exact: true });
  const signOut = dialog.getByRole('button', { name: 'Sign out', exact: true });

  try {
    await setupSessionTimeoutAccessibility(page);
    await page.goto('/accessibility');
    await expect(page).toHaveURL(/\/accessibility$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Accessibility');
    await expect(priorFocus).toBeVisible();
    await priorFocus.focus();
    await expect(priorFocus).toBeFocused();
    // The mock config gives one minute of inactivity, then five minutes to respond.
    await page.clock.fastForward(65_000);
    await page.clock.runFor(1_000);
    await expect(dialog).toBeVisible();
    await expect(staySignedIn).toBeVisible();
    await expect(signOut).toBeVisible();
  } catch (error) {
    await attachAccessibilityReachabilityFailureEvidence(page, testInfo, {
      feature,
      pageState,
      context,
      strict: isAccessibilityStrictMode(),
      error,
    });
    throw error;
  }

  const focusEnteredDialog = await dialog.evaluate((element) => element.contains(document.activeElement));

  await auditAccessibilityPage(page, testInfo, {
    feature,
    pageState,
    context,
    defaultEngines: ['axe', 'wave-like', 'screen-reader'],
    checks: [
      {
        name: 'Timeout automatically moves focus into the dialog',
        run: async () => {
          expect(focusEnteredDialog).toBe(true);
        },
      },
      {
        name: 'Tab wraps from the final dialog button without reaching the background',
        run: async () => {
          await signOut.focus();
          await page.keyboard.press('Tab');
          await expect.poll(() => dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
        },
      },
      {
        name: 'Shift+Tab wraps from the dialog boundary without reaching the background',
        run: async () => {
          await dialog.focus();
          await page.keyboard.press('Shift+Tab');
          await expect(signOut).toBeFocused();
        },
      },
      {
        name: 'Stay signed in works with Enter and restores the previous focus',
        run: async () => {
          await staySignedIn.focus();
          await page.keyboard.press('Enter');
          await expect(dialog).toBeHidden();
          await expect(page).toHaveURL(/\/accessibility$/);
          await expect(priorFocus).toBeFocused();
        },
      },
    ],
  });
});
