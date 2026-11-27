import type { ConsoleMessage } from '@playwright/test';
import { test as migrationTest } from './migrationTest.fixture';

export const test = migrationTest.extend<{ paymentDiagnostic: void }>({
  paymentDiagnostic: [
    async ({ page }, use, testInfo) => {
      let source: 'console' | 'pageerror' | undefined;
      const onConsole = (message: ConsoleMessage) => {
        if (message.type() === 'error' && /\bNG0201\b/.test(message.text())) source ??= 'console';
      };
      const onPageError = (error: Error) => {
        if (/\bNG0201\b/.test(error.message)) source ??= 'pageerror';
      };

      page.on('console', onConsole);
      page.on('pageerror', onPageError);
      try {
        await use();
      } finally {
        page.off('console', onConsole);
        page.off('pageerror', onPageError);
      }

      if (source && testInfo.status !== testInfo.expectedStatus) {
        await testInfo.attach('payment-initialization-error', {
          body: JSON.stringify({ code: 'NG0201', message: 'Angular could not resolve a provider.', source }),
          contentType: 'application/json',
        });
      }
    },
    { auto: true },
  ],
});
