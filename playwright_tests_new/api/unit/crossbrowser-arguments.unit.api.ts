import { expect, test } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const { scripts } = JSON.parse(readFileSync(new URL('../../../package.json', import.meta.url), 'utf8'));

test('cross-browser raw command forwards Playwright arguments intact', { tag: '@svc-internal' }, () => {
  const temp = mkdtempSync(path.join(tmpdir(), 'crossbrowser-args-'));
  try {
    const output = path.join(temp, 'arguments.json');
    writeFileSync(
      path.join(temp, 'npx'),
      '#!/bin/sh\nexec "$NODE_BIN" -e \'require("fs").writeFileSync(process.env.ARG_OUTPUT, JSON.stringify(process.argv.slice(1)))\' "$@"\n',
      { mode: 0o755 }
    );
    for (const prefix of [[], ['--']]) {
      const args = ['--project=firefox', '--workers=1', 'folder with spaces/example.spec.ts'];
      const result = spawnSync('sh', ['-c', `${scripts['test:crossbrowser:raw']} "$@"`, 'test', ...prefix, ...args], {
        env: {
          ...process.env,
          PATH: `${temp}:${process.env.PATH}`,
          PLAYWRIGHT_SKIP_INSTALL: 'true',
          NODE_BIN: process.execPath,
          ARG_OUTPUT: output,
        },
        encoding: 'utf8',
      });
      expect(result.status, result.stderr).toBe(0);
      expect(JSON.parse(readFileSync(output, 'utf8'))).toEqual([
        'playwright',
        'test',
        '-c',
        'playwright-nightly.config.ts',
        ...args,
      ]);
    }
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});
