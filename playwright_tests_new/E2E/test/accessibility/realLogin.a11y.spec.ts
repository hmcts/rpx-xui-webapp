import { expect, test } from '@playwright/test';
import { resolveAccessibilityEngines } from '../../utils/accessibility/accessibilityAudit';
import { UserUtils } from '../../utils/user.utils';
import { publishLoginAccessibilityEvidence, summariseLoginAudit } from '../../utils/accessibility/loginAccessibilityEvidence';
import { runIsolatedRealLogin } from '../../utils/test-setup/realLoginAccessibility.cjs';

test.use({ trace: 'off', screenshot: 'off', video: 'off' });

test('real IDAM login accessibility and authenticated handoff @accessibility @a11y', async ({ baseURL }, testInfo) => {
  test.setTimeout(120_000);
  test.skip(!resolveAccessibilityEngines(['axe']).includes('axe'), 'IDAM audit requires the axe engine.');
  let credentials: { email: string; password: string } | undefined;
  try {
    credentials = new UserUtils().getUserCredentials('COURT_ADMIN');
  } catch {
    // The unauthenticated entry audit remains useful when credentials are absent.
    credentials = undefined;
  }
  const result = (await runIsolatedRealLogin({ baseURL, ...credentials })) as {
    receipts: Array<{ stage: string; status: 'passed' | 'issues-found'; rules: ReturnType<typeof summariseLoginAudit> }>;
    failureStage?: string;
    failureStatus?: 'blocked' | 'error';
  };
  for (const receipt of result.receipts) {
    await publishLoginAccessibilityEvidence(testInfo, receipt.stage, receipt.status, receipt.rules);
  }
  if (result.failureStage) {
    await publishLoginAccessibilityEvidence(testInfo, result.failureStage, result.failureStatus ?? 'blocked');
  }
  const failureMessage =
    result.failureStage === 'credential-configuration'
      ? 'COURT_ADMIN credentials are unavailable. Populate COURT_ADMIN_USERNAME and COURT_ADMIN_PASSWORD from Azure Key Vault.'
      : 'Login audit could not complete; see sanitized stage receipt.';
  expect(result.failureStage, failureMessage).toBeUndefined();
  expect(
    result.receipts.flatMap(({ rules }) => rules),
    'IDAM has accessibility findings; see sanitized rule counts.'
  ).toEqual([]);
});
