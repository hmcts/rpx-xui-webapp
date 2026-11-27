import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { startMigrationAppServer } from '../../integration/helpers/migrationAppServer.helper';

test('the migration server serves only the built app and never proxies service calls', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'xui-migration-server-test-'));
  try {
    await writeFile(join(directory, 'index.html'), '<h1>Migration app fixture</h1>');
    await writeFile(join(directory, 'chunk.js'), 'const fixture = true;');
    const app = await startMigrationAppServer(directory);
    try {
      const document = await fetch(new URL('/cases/case-details/fixture', app.origin));
      expect(document.status).toBe(200);
      expect(await document.text()).toContain('Migration app fixture');
      const script = await fetch(new URL('/chunk.js', app.origin));
      expect(script.headers.get('content-type')).toContain('javascript');
      expect((await fetch(new URL('/documents/unmocked', app.origin))).status).toBe(404);
      expect((await fetch(new URL('/cases/fixture/paymentgroups', app.origin))).status).toBe(404);
      expect((await fetch(new URL('/cases', app.origin), { method: 'POST' })).status).toBe(404);
    } finally {
      await app.close();
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
