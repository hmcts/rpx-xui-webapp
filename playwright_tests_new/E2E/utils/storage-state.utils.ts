import fs from 'node:fs';
import path from 'node:path';

import { UserUtils } from './user.utils.js';

const baseStorageDir = path.join(process.cwd(), 'test-results', 'storage-states', 'ui');

export type UiStorageStateMetadata = {
  userIdentifier: string;
  email: string;
  updatedAt: string;
};

type ResolveUiStoragePathOptions = {
  email?: string;
  userUtils?: UserUtils;
};

const toStorageName = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-');

const normalizeEmail = (value: string): string => value.trim().toLowerCase();

const resolveUserEmail = (userIdentifier: string, options: ResolveUiStoragePathOptions = {}): string => {
  const configuredEmail = options.email?.trim();
  if (configuredEmail) {
    return normalizeEmail(configuredEmail);
  }
  const userUtils = options.userUtils ?? new UserUtils();
  return normalizeEmail(userUtils.getUserCredentials(userIdentifier).email);
};

export const resolveUiStoragePathForUser = (userIdentifier: string, options: ResolveUiStoragePathOptions = {}): string => {
  const email = resolveUserEmail(userIdentifier, options);
  return path.join(baseStorageDir, `${toStorageName(`${userIdentifier}-${email}`)}.json`);
};

export const resolveUiStorageMetadataPath = (storagePath: string): string => storagePath.replace(/\.json$/, '.meta.json');

export function readUiStorageMetadata(storagePath: string): UiStorageStateMetadata | undefined {
  const metadataPath = resolveUiStorageMetadataPath(storagePath);
  try {
    const parsed = JSON.parse(fs.readFileSync(metadataPath, 'utf8')) as Partial<UiStorageStateMetadata>;
    const userIdentifier = typeof parsed.userIdentifier === 'string' ? parsed.userIdentifier.trim() : '';
    const email = typeof parsed.email === 'string' ? normalizeEmail(parsed.email) : '';
    const updatedAt = typeof parsed.updatedAt === 'string' ? parsed.updatedAt.trim() : '';
    if (!userIdentifier || !email || !updatedAt) {
      return undefined;
    }
    return { userIdentifier, email, updatedAt };
  } catch {
    return undefined;
  }
}

export function writeUiStorageMetadata(storagePath: string, metadata: { userIdentifier: string; email: string }): void {
  const metadataPath = resolveUiStorageMetadataPath(storagePath);
  fs.mkdirSync(path.dirname(metadataPath), { recursive: true });
  fs.writeFileSync(
    metadataPath,
    JSON.stringify(
      {
        userIdentifier: metadata.userIdentifier.trim(),
        email: normalizeEmail(metadata.email),
        updatedAt: new Date().toISOString(),
      } satisfies UiStorageStateMetadata,
      null,
      2
    )
  );
}
