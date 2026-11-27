import { once } from 'node:events';
import { access } from 'node:fs/promises';
import type { AddressInfo } from 'node:net';
import { resolve } from 'node:path';
import express from 'express';

export const migrationDocumentPath =
  /^\/(?:$|(?:cases(?:\/(?:case-details|case-create|case-search)(?:\/[^.]*)?)?|work(?:\/[^.]*)?|noc|staff(?:\/user-details\/[^/.]+)?|booking|refunds|cookies|service-down|not-authorised)\/?$)/;

export async function startMigrationAppServer(buildDirectory: string) {
  const index = resolve(buildDirectory, 'index.html');
  try {
    await access(index);
  } catch (cause) {
    throw new Error(`Manage Cases browser build missing at ${index}. Run yarn build:ng:dev first.`, { cause });
  }

  const app = express();
  app.use(express.static(buildDirectory));
  app.get(migrationDocumentPath, (_request, response) => response.sendFile(index));

  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  return {
    origin: `http://127.0.0.1:${(server.address() as AddressInfo).port}`,
    close: () => new Promise<void>((done, reject) => server.close((error) => (error ? reject(error) : done()))),
  };
}
