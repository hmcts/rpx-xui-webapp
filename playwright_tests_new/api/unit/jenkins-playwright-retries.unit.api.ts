import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const jenkinsfile = readFileSync(resolve(process.cwd(), 'Jenkinsfile_CNP'), 'utf8');

const extractStageBlock = (stageName: string): string => {
  const start = jenkinsfile.indexOf(`stage('${stageName}')`);
  if (start === -1) {
    throw new Error(`Jenkins stage "${stageName}" not found`);
  }

  const blockStart = jenkinsfile.indexOf('{', start);
  if (blockStart === -1) {
    throw new Error(`Jenkins stage "${stageName}" has no block`);
  }

  let depth = 0;
  for (let index = blockStart; index < jenkinsfile.length; index++) {
    const char = jenkinsfile[index];
    if (char === '{') {
      depth += 1;
    }
    if (char === '}') {
      depth -= 1;
    }
    if (depth === 0) {
      return jenkinsfile.slice(start, index + 1);
    }
  }

  throw new Error(`Jenkins stage "${stageName}" block did not close`);
};

test.describe('Jenkins Playwright retry policy', { tag: '@svc-internal' }, () => {
  test('preview API and E2E stages fail on first-attempt Playwright failures', () => {
    const previewFunctionalBlock = extractStageBlock('Preview Functional Tests (Parallel Report Gathering)');

    expect(previewFunctionalBlock).toContain('"PW_API_RETRIES=0"');
    expect(previewFunctionalBlock).toContain('"PW_E2E_RETRIES=0"');
  });

  test('AAT API and E2E stages fail on first-attempt Playwright failures', () => {
    const aatFunctionalBlock = extractStageBlock('AAT Functional Tests (Parallel Report Gathering)');

    expect(aatFunctionalBlock).toContain('"PW_API_RETRIES=0"');
    expect(aatFunctionalBlock).toContain('"PW_E2E_RETRIES=0"');
  });
});
