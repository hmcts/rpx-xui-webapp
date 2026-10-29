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

function createRenderedStateHarness() {
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
});
