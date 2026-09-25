import type { TestInfo } from '@playwright/test';
import { escapeHtml, publishAccessibilityEvidence } from './accessibilityEvidencePublisher';

import { summariseLoginAudit } from '../test-setup/realLoginAccessibility.cjs';
export { summariseLoginAudit };

// IDAM pages can contain OAuth parameters and entered credentials. Publish rule counts only.
export async function publishLoginAccessibilityEvidence(
  testInfo: TestInfo,
  stage: string,
  status: 'passed' | 'issues-found' | 'error' | 'blocked',
  rules: ReturnType<typeof summariseLoginAudit> = []
): Promise<void> {
  const context = { scenarioId: `login-${stage}`, authentication: 'real-interactive', dataMode: 'live', persona: 'COURT_ADMIN' };
  const receipt = { stage, status, rules, context };
  await publishAccessibilityEvidence(testInfo, {
    attachmentPrefix: `login-${stage}`,
    entry: {
      context,
      engine: stage.startsWith('idam-') ? 'axe' : 'summary',
      feature: 'Authentication',
      pageState: stage,
      status,
      violationCount: rules.reduce((count, rule) => count + rule.count, 0),
      rules: rules.map(({ rule }) => rule),
      targets: [],
      summary: 'Real interactive login; sanitized evidence, no DOM, URL, screenshot or credentials retained.',
    },
    json: receipt,
    html: `<h1>Login accessibility: ${escapeHtml(stage)}</h1><pre>${escapeHtml(JSON.stringify(receipt, null, 2))}</pre>`,
  });
  await testInfo.attach(`login-${stage}.json`, { body: JSON.stringify(receipt), contentType: 'application/json' });
}
