import { resolve } from 'node:path';
import { test as base } from '@playwright/test';
import { migrationDocumentPath, startMigrationAppServer } from './migrationAppServer.helper';

const testAssetPath = /^\/(?:assets\/|media\/|[^/]+\.(?:css|ico|js|mjs|png|svg|webmanifest|woff2?)$)/;

export const expect = base.expect.configure({ timeout: 12_000 });

export const test = base.extend<Record<never, never>, { migrationBuildDirectory: string; migrationOrigin: string }>({
  migrationBuildDirectory: [resolve(process.env.MIGRATION_BUILD_DIRECTORY || 'dist/rpx-exui/browser'), { scope: 'worker' }],
  migrationOrigin: [
    async ({ migrationBuildDirectory }, use) => {
      const app = await startMigrationAppServer(migrationBuildDirectory);
      try {
        await use(app.origin);
      } finally {
        await app.close();
      }
    },
    { scope: 'worker' },
  ],
  baseURL: async ({ migrationOrigin }, use) => use(migrationOrigin),
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  locale: 'en-GB',
  colorScheme: 'light',
  reducedMotion: 'reduce',
  serviceWorkers: 'block',
  page: async ({ page, migrationOrigin }, use, testInfo) => {
    testInfo.setTimeout(Math.min(testInfo.timeout || 45_000, 45_000));
    const unexpected = new Set<string>();
    await page.route('**/*', (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const isDocument = request.isNavigationRequest() && migrationDocumentPath.test(url.pathname);
      const isAsset = testAssetPath.test(url.pathname);
      if (url.origin === migrationOrigin && request.method() === 'GET' && (isDocument || isAsset)) {
        return route.fallback();
      }

      unexpected.add(`${request.method()} ${url.origin}${url.pathname} (${request.resourceType()})`);
      return route.abort('blockedbyclient');
    });

    // These synthetic sessions do not run production analytics.
    await page.route('https://www.googletagmanager.com/gtm.js?*', (route) =>
      route.request().method() === 'GET' ? route.fulfill({ contentType: 'application/javascript', body: '' }) : route.fallback()
    );

    await use(page);
    if (unexpected.size > 0) {
      throw new Error(`Unmocked migration requests:\n${[...unexpected].join('\n')}`);
    }
  },
});
