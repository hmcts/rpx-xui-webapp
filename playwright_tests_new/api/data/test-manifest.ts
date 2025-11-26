import { promises as fs } from 'node:fs';
import path from 'node:path';

type WaData = {
  unassignedTaskId?: string | null;
  assignedTaskId?: string | null;
};

type RoleAccessData = {
  caseId?: string | null;
  assigneeId?: string | null;
  assigneeAltId?: string | null;
};

type EvidenceManagerData = {
  docId?: string | null;
};

export type TestManifest = {
  wa?: WaData;
  roleAccess?: RoleAccessData;
  evidenceManager?: EvidenceManagerData;
};

let cachedManifest: TestManifest | undefined;

export async function loadTestManifest(): Promise<TestManifest> {
  if (cachedManifest) {
    return cachedManifest;
  }
  const manifestPath = path.resolve(process.cwd(), 'playwright_tests_new', 'api', 'data', 'test-manifest.json');
  const raw = await fs.readFile(manifestPath, 'utf8');
  cachedManifest = JSON.parse(raw) as TestManifest;
  return cachedManifest;
}

export function loadTestManifestSync(): TestManifest {
  if (cachedManifest) {
    return cachedManifest;
  }
  const manifestPath = path.resolve(process.cwd(), 'playwright_tests_new', 'api', 'data', 'test-manifest.json');
  const raw = require('fs').readFileSync(manifestPath, 'utf8');
  cachedManifest = JSON.parse(raw) as TestManifest;
  return cachedManifest;
}
