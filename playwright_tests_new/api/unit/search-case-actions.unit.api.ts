import { expect, test } from '@playwright/test';

import { buildSearch, CASE_DETAILS_PATH, CASE_REFERENCE } from './search-case-actions.fixture';

test.describe('Search case action helper unit tests', { tag: '@svc-internal' }, () => {
  for (const [name, state] of [
    ['fast case navigation', {}],
    ['delayed case navigation', { delayed: true }],
    ['searching the current case again', { initialPath: CASE_DETAILS_PATH }],
    ['the dedicated no-results page', { destination: '/search/noresults', noResults: true }],
    ['a repeated no-results search', { initialPath: '/search/noresults', destination: '/search/noresults', noResults: true }],
    [
      'a restricted case after a forbidden case lookup',
      {
        destination: `/cases/restricted-case-access/${CASE_REFERENCE}`,
        restrictedAccess: true,
      },
    ],
    ['a read-only case without event actions', { readOnly: true }],
  ] as const) {
    test(`waits for ${name} after submitting once`, async () => {
      const search = buildSearch(state);
      await search.subject.searchWith16DigitCaseId(CASE_REFERENCE);
      expect(search.clicks()).toBe(1);
      expect(search.hiddenSpinnerWaits()).toBe(1);
    });
  }

  test('waits for the empty case-list result after a missing case lookup', async () => {
    const search = buildSearch({ destination: '/cases', caseLookupStatus: 404, noCases: true });
    await search.subject.searchWith16DigitCaseId(CASE_REFERENCE);
    expect(search.clicks()).toBe(1);
  });

  test('waits for the empty case-list result after a malformed successful lookup', async () => {
    const search = buildSearch({ destination: '/cases', caseLookupStatus: 200, malformedLookup: true, noCases: true });
    await search.subject.searchWith16DigitCaseId(CASE_REFERENCE);
    expect(search.clicks()).toBe(1);
  });

  for (const status of [401, 500, 503]) {
    test(`returns after a case lookup responds with HTTP ${status}`, async () => {
      const search = buildSearch({ destination: '/cases', caseLookupStatus: status });
      await search.subject.searchWith16DigitCaseId(CASE_REFERENCE);
      expect(search.clicks()).toBe(1);
    });
  }

  test('returns after the case lookup request fails', async () => {
    const search = buildSearch({ destination: '/cases', requestFailed: true });
    await search.subject.searchWith16DigitCaseId(CASE_REFERENCE);
    expect(search.clicks()).toBe(1);
  });

  for (const [name, state] of [
    ['no search outcome', { destination: '/cases' }],
    ['an unchanged case-list no-cases message', { destination: '/cases', noCases: true }],
    ['a service-down route', { destination: '/service-down' }],
    ['a login route', { destination: '/login' }],
    ['a forbidden response without the restricted-access shell', { destination: '/cases', caseLookupStatus: 403 }],
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

  for (const [name, state, lookup, inner] of [
    [
      'a forbidden lookup without the restricted shell',
      { destination: '/cases', caseLookupStatus: 403 },
      'caseLookup=HTTP 403',
      'Destination did not match',
    ],
    [
      'a matching case lookup that never navigates',
      { destination: '/cases' },
      'caseLookup=HTTP 200',
      'Destination did not match',
    ],
    ['an unanswered lookup', { destination: '/cases', noLookupResponse: true }, 'caseLookup=no response', ''],
  ] as const) {
    test(`reports the lookup status and first inner error for ${name}`, async () => {
      const search = buildSearch(state);
      const error = await search.subject.searchWith16DigitCaseId(CASE_REFERENCE).catch((caught: unknown) => caught);
      expect(error).toBeInstanceOf(Error);
      const message = (error as Error).message;
      expect(message).toContain('Header quick-search did not reach');
      expect(message).toContain(lookup);
      expect(message).toMatch(/firstError=\S/);
      if (inner) expect(message).toContain(inner);
      expect((error as Error).cause).toBeInstanceOf(AggregateError);
    });
  }

  test('preserves action failures without resubmitting', async () => {
    const search = buildSearch({ clickError: 'Browser has been closed' });
    await expect(search.subject.searchWith16DigitCaseId(CASE_REFERENCE)).rejects.toThrow('Browser has been closed');
    expect(search.clicks()).toBe(1);
  });
});
