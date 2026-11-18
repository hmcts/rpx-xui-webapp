import { expect, test } from '@playwright/test';
import { ExuiHeaderComponent } from '../../E2E/page-objects/components/exui/exui-header.component.js';

function createHeaderHarness({ toggleText = 'Cymraeg' } = {}) {
  const events: string[] = [];
  const header = Object.assign(Object.create(ExuiHeaderComponent.prototype), {
    languageToggle: {
      async waitFor() {
        events.push('wait-for-toggle');
      },
      async textContent() {
        return toggleText;
      },
      async click() {
        events.push('click');
      },
    },
    page: {
      async waitForLoadState(state: string) {
        events.push(`load:${state}`);
      },
    },
    async waitForRenderedLanguageState(_language: string, beforeWait?: () => Promise<void>) {
      events.push('rendered-language-listeners');
      await beforeWait?.();
      events.push('rendered-language-state');
    },
    async waitForLanguageContext() {
      events.push('language-context');
    },
  }) as ExuiHeaderComponent;

  return { events, header };
}

function createRenderedStateHarness(waitForState?: (listeners: Map<string, (value: unknown) => void>) => void) {
  const events: string[] = [];
  const listeners = new Map<string, (value: unknown) => void>();
  const header = Object.assign(Object.create(ExuiHeaderComponent.prototype), {
    languageToggle: {
      async waitFor() {
        events.push('wait-for-toggle');
      },
      async textContent() {
        return 'Cymraeg';
      },
      async click() {
        events.push('click');
        events.push('translation-request');
        listeners.get('request')?.({ url: () => '/api/translation/cy' });
      },
    },
    page: {
      on(event: string, listener: (value: unknown) => void) {
        listeners.set(event, listener);
        events.push(`on:${event}`);
      },
      off(event: string) {
        listeners.delete(event);
        events.push(`off:${event}`);
      },
      async waitForLoadState(state: string) {
        events.push(`load:${state}`);
      },
      async waitForFunction() {
        events.push('rendered-language-state');
        waitForState?.(listeners);
      },
    },
  }) as ExuiHeaderComponent;

  return { events, header };
}

test.describe('EXUI header language switch', { tag: '@svc-internal' }, () => {
  test('clicks and waits for navigation before starting the translated-state wait', async () => {
    const { events, header } = createHeaderHarness();

    await header.switchLanguage('Cymraeg');

    expect(events).toEqual([
      'wait-for-toggle',
      'rendered-language-listeners',
      'click',
      'load:domcontentloaded',
      'rendered-language-state',
    ]);
  });

  test('waits for language context when translated content is not required', async () => {
    const { events, header } = createHeaderHarness();

    await header.switchLanguage('Cymraeg', { waitForTranslatedContent: false });

    expect(events).toEqual(['wait-for-toggle', 'click', 'load:domcontentloaded', 'language-context']);
  });

  test('keeps the already-selected branch without clicking the toggle', async () => {
    const { events, header } = createHeaderHarness();

    await header.switchLanguage('English');

    expect(events).toEqual(['wait-for-toggle', 'rendered-language-listeners', 'rendered-language-state']);
  });

  test('arms translation request observation before the click', async () => {
    const { events, header } = createRenderedStateHarness();

    await header.switchLanguage('Cymraeg');

    expect(events).toEqual([
      'wait-for-toggle',
      'on:request',
      'on:response',
      'on:requestfailed',
      'click',
      'translation-request',
      'load:domcontentloaded',
      'rendered-language-state',
      'off:request',
      'off:response',
      'off:requestfailed',
    ]);
  });

  test('continues waiting while a translation request started during the click remains pending', async () => {
    const originalNow = Date.now;
    let now = 0;
    let attempts = 0;
    Date.now = () => now;
    const { events, header } = createRenderedStateHarness(() => {
      if (++attempts === 1) {
        now = 20_000;
        const timeout = new Error('rendered language timed out');
        timeout.name = 'TimeoutError';
        throw timeout;
      }
    });

    try {
      await header.switchLanguage('Cymraeg');
      expect(attempts).toBe(2);
      expect(events.slice(-3)).toEqual(['off:request', 'off:response', 'off:requestfailed']);
    } finally {
      Date.now = originalNow;
    }
  });

  test('stops on a failed translation request and removes its listeners', async () => {
    let attempts = 0;
    const timeout = new Error('rendered language timed out');
    timeout.name = 'TimeoutError';
    const { events, header } = createRenderedStateHarness((listeners) => {
      attempts++;
      listeners.get('requestfailed')?.({ url: () => '/api/translation/cy' });
      throw timeout;
    });

    await expect(header.switchLanguage('Cymraeg')).rejects.toBe(timeout);
    expect(attempts).toBe(1);
    expect(events.slice(-3)).toEqual(['off:request', 'off:response', 'off:requestfailed']);
  });

  test('stops at the deadline even if a translation request is still pending', async () => {
    const originalNow = Date.now;
    let now = 0;
    let attempts = 0;
    Date.now = () => now;
    const timeout = new Error('rendered language timed out');
    timeout.name = 'TimeoutError';
    const { events, header } = createRenderedStateHarness(() => {
      attempts++;
      now = 60_000;
      throw timeout;
    });

    try {
      await expect(header.switchLanguage('Cymraeg')).rejects.toBe(timeout);
      expect(attempts).toBe(1);
      expect(events.slice(-3)).toEqual(['off:request', 'off:response', 'off:requestfailed']);
    } finally {
      Date.now = originalNow;
    }
  });

  test('does not start an unbounded wait if the deadline expires between attempts', async () => {
    const originalNow = Date.now;
    let now = 0;
    let attempts = 0;
    Date.now = () => (now === 59_999 ? now++ : now);
    const timeout = new Error('rendered language timed out');
    timeout.name = 'TimeoutError';
    const { header } = createRenderedStateHarness(() => {
      attempts++;
      if (attempts === 1) {
        now = 59_999;
        throw timeout;
      }
      throw new Error('started another wait after the deadline');
    });

    try {
      await expect(header.switchLanguage('Cymraeg')).rejects.toBe(timeout);
      expect(attempts).toBe(1);
    } finally {
      Date.now = originalNow;
    }
  });

  test('removes listeners if the language switch fails before waiting', async () => {
    const { events, header } = createRenderedStateHarness();
    const error = new Error('click failed');

    await expect(
      header.waitForRenderedLanguageState('Cymraeg', async () => {
        throw error;
      })
    ).rejects.toBe(error);
    expect(events.slice(-3)).toEqual(['off:request', 'off:response', 'off:requestfailed']);
    expect(events).not.toContain('rendered-language-state');
  });
});
