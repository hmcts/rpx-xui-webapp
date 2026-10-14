import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const contextModule = require('../../common/reporters/failure-context.cjs') as {
  buildFailureContext: (input: Record<string, unknown>) => Record<string, unknown>;
  redactText: (value: unknown) => string;
  redactUrl: (value: string) => string;
  redactValue: (value: unknown) => unknown;
};

test.describe('failure context', { tag: '@svc-internal' }, () => {
  test('redacts query strings, credentials, case-like path segments and sensitive values', () => {
    expect(contextModule.redactUrl('https://xui.example/cases/1791906281904747?token=SECRET')).toBe(
      'https://xui.example/cases/:id'
    );
    expect(
      contextModule.redactValue({
        url: 'https://xui.example/cases/1791906281904747?case=SECRET',
        authorization: 'Bearer SECRET',
        body: 'restricted file content',
      })
    ).toEqual({ url: 'https://xui.example/cases/:id', authorization: '[redacted]', body: '[redacted]' });
  });

  test('keeps observed facts separate from hypotheses and provides bounded next checks', () => {
    const context = contextModule.buildFailureContext({
      testInfo: {
        title: 'Upload case 1791906281904747',
        file: '/opt/jenkins/workspace/PR/playwright_tests_new/E2E/test/documentUpload/documentUpload.positive.spec.ts',
        line: 240,
        column: 9,
      },
      status: 'timedOut',
      retry: 1,
      project: 'chromium',
      worker: 2,
      branch: 'PR-5365',
      commit: 'abc123def456',
      annotations: [
        { type: 'Failure type', description: 'GLOBAL_TIMEOUT_UI_STALL' },
        { type: 'Failure source', description: 'Test/application behaviour' },
      ],
      failureLocation: 'caseDetails.po.ts:748:15',
      actionableError: 'locator.click timeout',
      executionSignals: { lastMainFrameUrl: 'https://xui.example/cases/1791906281904747?token=SECRET' },
      likelyRootCause: 'The visible control was covered by a loading overlay',
    });

    expect(context).toMatchObject({
      status: 'timedOut',
      retry: 1,
      project: 'chromium',
      build: { branch: 'PR-5365', commit: 'abc123def456' },
      classification: 'GLOBAL_TIMEOUT_UI_STALL',
      confidence: 'observed',
      facts: { failureSource: 'Test/application behaviour' },
      hypotheses: ['The visible control was covered by a loading overlay'],
    });
    expect(JSON.stringify(context)).not.toContain('1791906281904747');
    expect(JSON.stringify(context)).not.toContain('SECRET');
    expect((context.nextChecks as string[])[0]).toContain('trace');
  });

  test('preserves safe primitive telemetry while redacting nested request data', () => {
    const redacted = contextModule.redactValue({
      requests: [{ url: 'https://xui.example/cases/1791906281904747?token=SECRET', duration: 1234 }],
      backendRequestsObserved: 2,
      timedOut: false,
    }) as Record<string, unknown>;

    expect(redacted).toEqual({
      requests: [{ url: 'https://xui.example/cases/:id', duration: 1234 }],
      backendRequestsObserved: 2,
      timedOut: false,
    });
  });

  test('redacts emails, UUIDs, case references and quoted secrets from diagnostic text', () => {
    const redacted = contextModule.redactText(
      'alice@example.com 550e8400-e29b-41d4-a716-446655440000 C1234567 {"token":"SECRET"} Authorization: Bearer TOPSECRET'
    );

    expect(redacted).toBe('[redacted-email] :id :case-ref {"token":"[redacted]"} Authorization: [redacted]');
    expect(redacted).not.toContain('alice@example.com');
    expect(redacted).not.toContain('550e8400-e29b-41d4-a716-446655440000');
    expect(redacted).not.toContain('C1234567');
    expect(redacted).not.toContain('SECRET');
  });
});
