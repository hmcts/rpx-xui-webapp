import { expect, test } from '@playwright/test';
import { summariseLoginAudit } from '../../E2E/utils/accessibility/loginAccessibilityEvidence';

test('login evidence contains rule counts but excludes credential-bearing DOM and OAuth URLs', { tag: '@svc-internal' }, () => {
  const summary = summariseLoginAudit([
    { id: 'label', impact: 'critical', nodes: [{ html: '<input value="private@example.test">', target: ['#secret'] }] },
  ]);
  expect(summary).toEqual([{ rule: 'label', impact: 'critical', count: 1 }]);
  expect(JSON.stringify(summary)).not.toContain('private@example.test');
});

test('login blocked receipt publishes context without screenshot or raw failure data', { tag: '@svc-internal' }, async () => {
  const fs = await import('node:fs/promises');
  const os = await import('node:os');
  const path = await import('node:path');
  const { publishLoginAccessibilityEvidence } = await import('../../E2E/utils/accessibility/loginAccessibilityEvidence');
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'a11y-login-'));
  const previous = process.env.PW_A11Y_EVIDENCE_DIR;
  process.env.PW_A11Y_EVIDENCE_DIR = directory;
  try {
    await publishLoginAccessibilityEvidence(
      { title: 'Login', attach: async () => undefined } as never,
      'credential-configuration',
      'blocked'
    );
    const [entry] = JSON.parse(await fs.readFile(path.join(directory, 'manifest.json'), 'utf8'));
    expect(entry).toMatchObject({
      status: 'blocked',
      screenshotFileName: '',
      context: {
        scenarioId: 'login-credential-configuration',
        persona: 'COURT_ADMIN',
        authentication: 'real-interactive',
        dataMode: 'live',
      },
    });
  } finally {
    if (previous === undefined) delete process.env.PW_A11Y_EVIDENCE_DIR;
    else process.env.PW_A11Y_EVIDENCE_DIR = previous;
    await fs.rm(directory, { recursive: true, force: true });
  }
});
