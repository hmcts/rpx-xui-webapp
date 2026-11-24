import { expect, test } from '@playwright/test';
import { openDynamicFieldConfigJourney } from '../../integration/helpers/dynamicFieldConfigMockRoutes.helper';

function pageForReadiness(error?: Error) {
  const calls: string[] = [];
  const page = {
    addInitScript: async () => undefined,
    route: async () => undefined,
    goto: async () => {
      calls.push('navigate');
    },
    getByLabel: (label: string) => ({
      waitFor: async ({ state }: { state: string }) => {
        calls.push(`${label}:${state}`);
        if (error) throw error;
      },
    }),
  };
  return { page, calls };
}

test.describe('Dynamic create case readiness', { tag: '@svc-internal' }, () => {
  test('waits for the case title after navigation', async () => {
    const { page, calls } = pageForReadiness();
    await openDynamicFieldConfigJourney(page as never, { skipSessionCookies: true });
    expect(calls).toEqual(['navigate', 'Case title:visible']);
  });

  test('propagates an unavailable form without reloading', async () => {
    const { page, calls } = pageForReadiness(new Error('form unavailable'));
    await expect(openDynamicFieldConfigJourney(page as never, { skipSessionCookies: true })).rejects.toThrow('form unavailable');
    expect(calls).toEqual(['navigate', 'Case title:visible']);
  });
});
