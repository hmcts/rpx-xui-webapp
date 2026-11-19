import { IdamPage } from '@hmcts/playwright-common';
import { expect, test } from '@playwright/test';

/**
 * Session-capture unit tests drive production code with hand-built fake pages. Production code constructs the real
 * `IdamPage` from @hmcts/playwright-common against those fakes, so a library bump that calls a new Locator method in
 * the constructor (for example `.filter` in 1.1.7) breaks every fake at once. This contract fails first, with the
 * missing method named, instead of surfacing as a `x is not a function` inside unrelated session tests.
 */
const FAKE_LOCATOR_METHODS = ['first', 'filter', 'isVisible'] as const;

function strictFakeLocator(calls: string[]) {
  const locator: Record<string, unknown> = {};
  for (const method of FAKE_LOCATOR_METHODS) {
    locator[method] = (...args: unknown[]) => {
      calls.push(method);
      return method === 'isVisible' ? Promise.resolve(false) : (args, locator);
    };
  }
  return new Proxy(locator, {
    get(target, property) {
      if (typeof property === 'string' && !(property in target) && property !== 'then') {
        throw new Error(`Fake locator does not implement "${property}", required by the installed @hmcts/playwright-common`);
      }
      return Reflect.get(target, property);
    },
  });
}

test.describe('IdamPage fake contract', { tag: ['@svc-internal'] }, () => {
  test('IdamPage can be constructed against the shared fake locator surface', () => {
    const calls: string[] = [];
    const page = { locator: () => strictFakeLocator(calls), getByRole: () => strictFakeLocator(calls) };

    expect(() => new IdamPage(page as never)).not.toThrow();
    expect(calls.length).toBeGreaterThan(0);
  });
});
