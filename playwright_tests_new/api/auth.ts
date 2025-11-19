import { chromium } from '@playwright/test';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { config } from '../../test_codecept/integration/tests/config/config';

type UsersConfig = typeof config.users[keyof typeof config.users];
export type ApiUserRole = keyof UsersConfig;

const chromeArgs = [
  '--disable-gpu',
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-crash-reporter',
  '--use-mock-keychain',
  '--no-default-browser-check',
  '--disable-component-update'
];

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

async function createStorageState(role: ApiUserRole): Promise<string> {
  const storagePath = path.join(storageRoot, config.testEnv, `${role}.json`);
  await fs.mkdir(path.dirname(storagePath), { recursive: true });

  const credentials = getCredentials(role);
  const browser = await chromium.launch({
    headless: true,
    args: chromeArgs,
    ignoreHTTPSErrors: true,
    channel: 'chrome'
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true
  });

  try {
    const page = await context.newPage();
    const baseUrl = config.baseUrl;
    const manageCaseHost = new URL(baseUrl).host;

    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForURL('**/login**', { timeout: 60_000 });
    await page.waitForSelector('#username', { timeout: 60_000 });

    await page.fill('#username', credentials.username);
    await page.fill('#password', credentials.password);
    await page.click('.button');

    await page.waitForURL(`**${manageCaseHost}**`, { timeout: 120_000 });
    await page.waitForSelector('.hmcts-primary-navigation', { timeout: 120_000 });
    await context.storageState({ path: storagePath });
  } catch (error) {
    throw new Error(`Failed to login as ${role}: ${(error as Error).message}`);
  } finally {
    await browser.close();
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
