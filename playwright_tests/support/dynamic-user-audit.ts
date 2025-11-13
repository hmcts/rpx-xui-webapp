import { promises as fs } from "node:fs";
import path from "node:path";

const AUDIT_RELATIVE_PATH =
  "functional-output/tests/playwright-e2e/dynamic-users.json";

export interface DynamicUserAuditEntry {
  identifier: string;
  email: string;
  forename: string;
  surname: string;
  roleNames: string[];
  createdAt: string;
}

async function readExistingEntries(
  filePath: string
): Promise<DynamicUserAuditEntry[]> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as DynamicUserAuditEntry[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function recordDynamicUser(
  entry: DynamicUserAuditEntry
): Promise<void> {
  try {
    const absolutePath = path.join(process.cwd(), AUDIT_RELATIVE_PATH);
    await fs.mkdir(path.dirname(absolutePath), { recursive: true });
    const existingEntries = await readExistingEntries(absolutePath);
    existingEntries.push(entry);
    await fs.writeFile(
      absolutePath,
      JSON.stringify(existingEntries, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.warn(
      "[dynamic-users] Failed to persist audit log entry:",
      (error as Error).message
    );
  }
}
