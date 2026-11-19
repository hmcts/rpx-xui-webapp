import { SearchCasePage } from '../../E2E/page-objects/pages/exui/searchCase.po.js';

export const CASE_REFERENCE = '1111222233334444';
export const CASE_DETAILS_PATH = `/cases/case-details/PUBLICLAW/CARE_SUPERVISION_EPO/${CASE_REFERENCE}`;

type SearchState = {
  initialPath?: string;
  destination?: string;
  delayed?: boolean;
  noResults?: boolean;
  restrictedAccess?: boolean;
  caseLookupStatus?: number;
  malformedLookup?: boolean;
  requestFailed?: boolean;
  noCases?: boolean;
  stuckSpinner?: boolean;
  detailsReady?: boolean;
  clickError?: string;
  holdNavigation?: boolean;
  readOnly?: boolean;
};

export function buildSearch(state: SearchState = {}) {
  let currentPath = state.initialPath ?? '/cases';
  let clicks = 0;
  let hiddenSpinnerWaits = 0;
  const destination = state.destination ?? CASE_DETAILS_PATH;
  let submitted: () => void = () => undefined;
  const submission = new Promise<void>((resolve) => {
    submitted = () => resolve();
  });
  let completeNavigation: () => void = () => undefined;
  const navigation = state.holdNavigation
    ? new Promise<void>((resolve) => {
        completeNavigation = () => resolve();
      })
    : Promise.resolve();
  const visibleLocator = (visible = true) => ({
    click: async () => undefined,
    fill: async () => undefined,
    isVisible: async () => visible,
    scrollIntoViewIfNeeded: async () => undefined,
    waitFor: async () => {
      if (!visible) throw new Error('Target is not visible');
    },
  });
  const spinner = {
    first: () => spinner,
    waitFor: async ({ state: desiredState }: { state: string }) => {
      if (desiredState === 'visible') throw new Error('No spinner appeared');
      hiddenSpinnerWaits += 1;
      if (state.stuckSpinner) throw new Error('Spinner remained visible');
    },
  };
  const findButton = {
    ...visibleLocator(),
    click: async () => {
      clicks += 1;
      submitted();
      if (state.clickError) throw new Error(state.clickError);
      if (!state.delayed) currentPath = destination;
    },
  };
  const subject: SearchCasePage = Object.assign(Object.create(SearchCasePage.prototype), {
    caseIdTextBox: visibleLocator(),
    searchCaseFindButton: findButton,
    searchCaseFindButtonFallback: findButton,
    noResultsContainer: visibleLocator(state.noResults ?? false),
    caseListNoResultsMessage: visibleLocator(state.noCases ?? false),
    restrictedCaseAccessContainer: visibleLocator(state.restrictedAccess ?? false),
    logger: { warn: () => undefined },
    page: {
      url: () => `https://example.test${currentPath}`,
      locator: (selector: string) =>
        selector === 'xuilib-loading-spinner'
          ? spinner
          : visibleLocator(selector === '#next-step' && state.readOnly ? false : (state.detailsReady ?? true)),
      getByText: () => visibleLocator(state.noCases ?? false),
      getByRole: (role: string) => visibleLocator(role === 'tablist' && (state.detailsReady ?? true)),
      waitForResponse: async (matches: (response: { url: () => string; status: () => number }) => boolean) => {
        await submission;
        if (state.delayed) await navigation;
        if (state.requestFailed) throw new Error('Request failed');
        const response = {
          url: () => `https://example.test/data/internal/cases/${CASE_REFERENCE}`,
          status: () =>
            state.caseLookupStatus ??
            (destination === '/search/noresults' ? 404 : destination.startsWith('/cases/restricted-case-access/') ? 403 : 200),
          json: async () => {
            if (state.malformedLookup) throw new Error('Malformed response');
            return { case_id: CASE_REFERENCE };
          },
        };
        if (!matches(response)) throw new Error('No matching missing-case response');
        return response;
      },
      waitForEvent: async (event: string, options: { predicate: (request: { url: () => string }) => boolean }) => {
        await submission;
        if (state.delayed) await navigation;
        const request = { url: () => `https://example.test/data/internal/cases/${CASE_REFERENCE}` };
        if (event !== 'requestfailed' || !state.requestFailed || !options.predicate(request)) {
          throw new Error('No matching failed request');
        }
        return request;
      },
      waitForURL: async (matches: (url: URL) => boolean) => {
        if (matches(new URL(`https://example.test${currentPath}`))) return;
        if (state.delayed) {
          await navigation;
          currentPath = destination;
        }
        if (!matches(new URL(`https://example.test${currentPath}`))) throw new Error('Destination did not match');
      },
    },
  });
  return { subject, clicks: () => clicks, hiddenSpinnerWaits: () => hiddenSpinnerWaits, completeNavigation };
}
