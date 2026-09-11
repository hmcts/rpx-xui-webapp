import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const flowInterruptedException = 'org.jenkinsci.plugins.workflow.steps.FlowInterruptedException';
const signalAbortGuard = '/(exit code|status)\\s+(129|137|143)/';

type ProtectedCatch = {
  message: string;
  nonBlockingMarker?: string;
  variable: 'e' | 'publishException';
};

const protectedCatches: Record<string, ProtectedCatch[]> = {
  Jenkinsfile_CNP: [
    {
      message: '[playwright-accessibility] Report publish failed;',
      nonBlockingMarker: "currentBuild.result = 'UNSTABLE'",
      variable: 'e',
    },
    {
      message: '[playwright-load-profile] Report publication failed; marking build unstable:',
      nonBlockingMarker: "currentBuild.result = 'UNSTABLE'",
      variable: 'publishException',
    },
    {
      message: '[parallel-report-gathering] Playwright Accessibility failed;',
      nonBlockingMarker: "currentBuild.result = 'UNSTABLE'",
      variable: 'e',
    },
    {
      message: '[playwright-accessibility] Report publish wrapper failed but is non-blocking:',
      variable: 'publishException',
    },
  ],
  Jenkinsfile_nightly: [
    {
      message: '[playwright-accessibility] Report publish failed but is non-blocking:',
      variable: 'e',
    },
    {
      message: '[playwright-load-profile] Report publication failed; marking build unstable:',
      nonBlockingMarker: "currentBuild.result = 'UNSTABLE'",
      variable: 'publishException',
    },
    {
      message: '[parallel-report-gathering] Playwright Accessibility failed but is non-blocking:',
      variable: 'e',
    },
    {
      message: '[playwright-accessibility] Report publish wrapper failed but is non-blocking:',
      variable: 'publishException',
    },
  ],
  Jenkinsfile_parameterized: [
    {
      message: '[playwright-accessibility] Accessibility failed but is non-blocking:',
      variable: 'e',
    },
    {
      message: '[playwright-accessibility] Report/evidence publish failed but is non-blocking:',
      variable: 'publishException',
    },
  ],
};

function occurrences(source: string, value: string): number[] {
  const positions: number[] = [];
  let position = source.indexOf(value);
  while (position !== -1) {
    positions.push(position);
    position = source.indexOf(value, position + value.length);
  }
  return positions;
}

function catchBlockBefore(source: string, boundaryPosition: number): string {
  const catchPosition = source.lastIndexOf('catch (Exception ', boundaryPosition);
  expect(catchPosition, 'non-blocking accessibility message must remain inside an exception catch').toBeGreaterThanOrEqual(0);
  return source.slice(catchPosition, boundaryPosition);
}

function expectCancellationGuard(catchBlock: string, variable: ProtectedCatch['variable'] = 'e'): void {
  const normalized = catchBlock.replace(/\s+/g, ' ');
  const flowGuard = `if (${variable} instanceof ${flowInterruptedException}) { throw ${variable} }`;
  const signalAbortGuardBlock = `if (${variable} instanceof hudson.AbortException && ((${variable}.getMessage() ?: '') =~ ${signalAbortGuard}).find()) { throw ${variable} }`;

  expect(normalized).toContain(flowGuard);
  expect(normalized).toContain(signalAbortGuardBlock);
  expect(normalized.indexOf(flowGuard)).toBeLessThan(normalized.indexOf(signalAbortGuardBlock));
}

test.describe('Jenkins accessibility cancellation contract', { tag: '@svc-internal' }, () => {
  for (const fileName of ['Jenkinsfile_CNP', 'Jenkinsfile_nightly']) {
    test(`${fileName} scopes CI load-profile output to the Jenkins build`, () => {
      const source = fs.readFileSync(path.join(repositoryRoot, fileName), 'utf8');

      expect(source).toContain(
        'def ciLoadProfileDir = "functional-output/tests/playwright-integration/load-profile/ci-${env.BUILD_NUMBER ?: \'local\'}"'
      );
      expect(source).toContain('def ciLoadProfileEventsFile = "${ciLoadProfileDir}/stage-events.jsonl"');
      expect(source).toContain("echo \\$! > '${reportDir}/monitor.pid'");
      expect(source).toContain("touch '${reportDir}/stop'");
      expect(source).toContain('kill -KILL "\\$monitorPid"');
    });

    test(`${fileName} archives retained Playwright traces with failure diagnostics`, () => {
      const source = fs.readFileSync(path.join(repositoryRoot, fileName), 'utf8');

      expect(source).toContain('functional-output/tests/**/test-results/**/trace.zip');
    });
  }

  for (const [fileName, catches] of Object.entries(protectedCatches)) {
    test(`${fileName} rethrows Jenkins cancellation before non-blocking accessibility handling`, () => {
      const source = fs.readFileSync(path.join(repositoryRoot, fileName), 'utf8');

      for (const expectedCatch of catches) {
        const matchingMessages = occurrences(source, expectedCatch.message);
        expect(matchingMessages, `${fileName} must retain the expected accessibility catch`).not.toHaveLength(0);

        for (const messagePosition of matchingMessages) {
          const nonBlockingPosition = source.lastIndexOf(
            expectedCatch.nonBlockingMarker ?? expectedCatch.message,
            messagePosition
          );
          expect(nonBlockingPosition, `${fileName} must retain the non-blocking side effect`).toBeGreaterThanOrEqual(0);
          const catchBlock = catchBlockBefore(source, nonBlockingPosition);
          expectCancellationGuard(catchBlock, expectedCatch.variable);
        }
      }
    });
  }

  for (const fileName of ['Jenkinsfile_CNP', 'Jenkinsfile_nightly']) {
    test(`${fileName} rethrows cancellation from load-profile event recording`, () => {
      const source = fs.readFileSync(path.join(repositoryRoot, fileName), 'utf8');
      const loadProfileFailure = '[load-profile] failed to record ${label} ${eventType}:';
      const messagePosition = source.indexOf(loadProfileFailure);

      expect(messagePosition, `${fileName} must retain the load-profile recorder failure message`).toBeGreaterThanOrEqual(0);
      expectCancellationGuard(catchBlockBefore(source, messagePosition));
    });
  }

  test('fails when an interruption rethrow is removed before an unstable transition', () => {
    const source = fs.readFileSync(path.join(repositoryRoot, 'Jenkinsfile_CNP'), 'utf8');
    const failureMessage = '[playwright-accessibility] Report publish failed;';
    const messagePosition = source.indexOf(failureMessage);
    const unstablePosition = source.lastIndexOf("currentBuild.result = 'UNSTABLE'", messagePosition);
    const mutation = /if \(e instanceof org\.jenkinsci\.plugins\.workflow\.steps\.FlowInterruptedException\) \{\s*throw e\s*\}/;
    const mutatedCatchBlock = catchBlockBefore(source, unstablePosition).replace(mutation, '');

    expect(() => expectCancellationGuard(mutatedCatchBlock)).toThrow();
  });

  test('fails when cancellation guards move after an unstable transition', () => {
    const source = fs.readFileSync(path.join(repositoryRoot, 'Jenkinsfile_CNP'), 'utf8');
    const failureMessage = '[playwright-accessibility] Report publish failed;';
    const messagePosition = source.indexOf(failureMessage);
    const unstablePosition = source.lastIndexOf("currentBuild.result = 'UNSTABLE'", messagePosition);
    const catchBlock = catchBlockBefore(source, unstablePosition);
    const guards = catchBlock.slice(catchBlock.indexOf('if (e instanceof'));
    const mutatedCatchBlock = `${catchBlock.slice(0, catchBlock.indexOf('if (e instanceof'))}currentBuild.result = 'UNSTABLE'\n${guards}`;

    expect(() =>
      expectCancellationGuard(catchBlockBefore(mutatedCatchBlock, mutatedCatchBlock.indexOf("currentBuild.result = 'UNSTABLE'")))
    ).toThrow();
  });
});
