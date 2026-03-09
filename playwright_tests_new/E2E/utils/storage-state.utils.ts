import path from 'node:path';

const baseStorageDir = path.join(process.cwd(), 'test-results', 'storage-states', 'ui');

const toStorageName = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-');

export const resolveUiStoragePathForUser = (userIdentifier: string): string =>
  path.join(baseStorageDir, `${toStorageName(userIdentifier)}.json`);
