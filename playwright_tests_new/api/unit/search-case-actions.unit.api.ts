import { expect, test } from '@playwright/test';

import { buildSearch, CASE_DETAILS_PATH, CASE_REFERENCE } from './search-case-actions.fixture';

test.describe('Search case action helper unit tests', { tag: '@svc-internal' }, () => {
  for (const [name, state] of [
    ['fast case navigation', {}],
    ['delayed case navigation', { delayed: true }],
    ['searching the current case again', { initialPath: CASE_DETAILS_PATH }],
    ['the dedicated no-results page', { destination: '/search/noresults', noResults: true }],
    ['a repeated no-results search', { initialPath: '/search/noresults', destination: '/search/noresults', noResults: true }],
    ['a read-only case without event actions', { readOnly: true }],
  ] as const) {
    test(`waits for ${name} after submitting once`, async () => {
      const search = buildSearch(state);
      await search.subject.searchWith16DigitCaseId(CASE_REFERENCE);
      expect(search.clicks()).toBe(1);
      expect(search.hiddenSpinnerWaits()).toBe(1);
    });
  }

  for (const [name, state] of [
    ['no search outcome', { destination: '/cases' }],
    ['an unchanged case-list no-cases message', { destination: '/cases', noCases: true }],
    ['a service-down route', { destination: '/service-down' }],
    ['a login route', { destination: '/login' }],
    ['a different case', { destination: '/cases/case-details/9999888877776666' }],
    ['case details without usable controls', { detailsReady: false }],
    ['a stuck spinner', { stuckSpinner: true }],
  ] as const) {
    test(`fails for ${name} without resubmitting`, async () => {
      const search = buildSearch(state);
      await expect(search.subject.searchWith16DigitCaseId(CASE_REFERENCE)).rejects.toThrow();
      expect(search.clicks()).toBe(1);
    });
  }

  for (const [name, state] of [
    ['case-list message', { noCases: true }],
    ['dedicated no-results view', { initialPath: '/search/noresults', noResults: true }],
  ] as const) {
    test(`does not accept a stale ${name} while the searched case is loading`, async () => {
      const search = buildSearch({ ...state, delayed: true, holdNavigation: true });
      let completed = false;
      const pending = search.subject.searchWith16DigitCaseId(CASE_REFERENCE).then(() => {
        completed = true;
      });
      await new Promise<void>((resolve) => setImmediate(resolve));
      expect(completed).toBe(false);
      search.completeNavigation();
      await pending;
      expect(completed).toBe(true);
      expect(search.clicks()).toBe(1);
    });
  }

  test('preserves action failures without resubmitting', async () => {
    const search = buildSearch({ clickError: 'Browser has been closed' });
    await expect(search.subject.searchWith16DigitCaseId(CASE_REFERENCE)).rejects.toThrow('Browser has been closed');
    expect(search.clicks()).toBe(1);
  });
});
