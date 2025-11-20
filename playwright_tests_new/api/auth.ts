import { request } from '@playwright/test';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { config } from '../../test_codecept/integration/tests/config/config';

type UsersConfig = typeof config.users[keyof typeof config.users];
export type ApiUserRole = keyof UsersConfig;

const baseUrl = stripTrailingSlash(config.baseUrl);
const storageRoot = path.resolve(
  process.cwd(),
  'functional-output',
  'tests',
  'playwright-api',
  'storage-states'
);
const storagePromises = new Map<string, Promise<string>>();

export async function ensureStorageState(role: ApiUserRole): Promise<string> {
  const cacheKey = `${config.testEnv}-${role}`;
  if (!storagePromises.has(cacheKey)) {
    storagePromises.set(cacheKey, createStorageState(role));
  }
  return storagePromises.get(cacheKey)!;
}

export async function getStoredCookie(role: ApiUserRole, cookieName: string): Promise<string | undefined> {
  const storagePath = await ensureStorageState(role);
  const raw = await fs.readFile(storagePath, 'utf8');
  const state = JSON.parse(raw);
  const cookie = Array.isArray(state?.cookies)
    ? state.cookies.find((c: { name?: string }) => c.name === cookieName)
    : undefined;
  return cookie?.value;
}

async function createStorageState(role: ApiUserRole): Promise<string> {
  const storagePath = path.join(storageRoot, config.testEnv, `${role}.json`);
  await fs.mkdir(path.dirname(storagePath), { recursive: true });

  const credentials = getCredentials(role);
  const context = await request.newContext({
    baseURL: baseUrl,
    ignoreHTTPSErrors: true,
    maxRedirects: 10
  });

  try {
    const loginPage = await context.get('auth/login');
    if (loginPage.status() >= 400) {
      throw new Error(`GET /auth/login responded with ${loginPage.status()}`);
    }

    const loginUrl = loginPage.url();
    const csrfToken = extractCsrf(await loginPage.text());
    const formPayload: Record<string, string> = {
      username: credentials.username,
      password: credentials.password,
      save: 'Sign in'
    };
    if (csrfToken) {
      formPayload._csrf = csrfToken;
    }

    const loginResponse = await context.post(loginUrl, { form: formPayload });
    if (loginResponse.status() >= 400) {
      throw new Error(`POST ${loginUrl} responded with ${loginResponse.status()}`);
    }

    // Ensure XSRF/session cookies are refreshed on the application domain
    await context.get('/');
    await context.storageState({ path: storagePath });
  } catch (error) {
    throw new Error(`Failed to login as ${role}: ${(error as Error).message}`);
  } finally {
    await context.dispose();
  }

  return storagePath;
}

function getCredentials(role: ApiUserRole): { username: string; password: string } {
  const envUsers = config.users[config.testEnv as keyof typeof config.users];
  const userConfig = envUsers?.[role];
  if (!userConfig) {
    throw new Error(`No credentials configured for role "${role}" in environment "${config.testEnv}"`);
  }

  return {
    username: userConfig.e,
    password: userConfig.sec
  };
}

function extractCsrf(html: string): string | undefined {
  const match = html.match(/name="_csrf"\s+value="([^"]+)"/i);
  return match?.[1];
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}
