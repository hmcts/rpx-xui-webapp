import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const publishApiCoverage = require('../../../scripts/publish-api-coverage.cjs').publishApiCoverage as (
  reportFolder: string,
  coverageRoot: string
) => void;

test.describe('publish API coverage script', { tag: '@svc-internal' }, () => {
  test('publishes coverage when the Odhín report is an HTML fragment without a body', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'publish-api-coverage-'));
    const reportFolder = path.join(root, 'report');
    const coverageRoot = path.join(root, 'coverage');
    fs.mkdirSync(reportFolder, { recursive: true });
    fs.mkdirSync(coverageRoot, { recursive: true });
    fs.writeFileSync(path.join(reportFolder, 'xui-playwright-api.html'), '<div class="tab"></div><main>report</main>');
    fs.writeFileSync(path.join(coverageRoot, 'index.html'), '<html>coverage</html>');

    try {
      publishApiCoverage(reportFolder, coverageRoot);

      const report = fs.readFileSync(path.join(reportFolder, 'xui-playwright-api.html'), 'utf8');
      expect(report).toContain('onclick="openMainTab(event, \'TabCoverage\')"');
      expect(report).toContain('<div id="TabCoverage"');
      expect(report).toContain('coverage/index.html');
      expect(fs.existsSync(path.join(reportFolder, 'coverage', 'index.html'))).toBe(true);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
