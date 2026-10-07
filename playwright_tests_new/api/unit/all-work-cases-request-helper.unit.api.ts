import { expect, test } from '@playwright/test';
import {
  parseAllWorkCasesRequest,
  waitForAllWorkCasesPageRequest,
  waitForFilteredAllWorkCasesRequest,
  type AllWorkCasesRequestBody,
} from '../../integration/helpers/allWorkCasesRequest.helper.js';

type FakeRequest = {
  method: () => string;
  postDataJSON: () => unknown;
  url: () => string;
};

function buildRequest(overrides: Partial<FakeRequest> = {}): FakeRequest {
  return {
    method: () => 'POST',
    postDataJSON: () => ({}),
    url: () => 'https://manage-case.aat.platform.hmcts.net/workallocation/all-work/cases',
    ...overrides,
  };
}

async function runWaitForRequestPredicate<T>(
  helper: (page: { waitForRequest: (predicate: (request: FakeRequest) => boolean) => Promise<FakeRequest> }) => Promise<T>,
  requests: FakeRequest[]
) {
  return helper({
    waitForRequest: async (predicate) => {
      const matchingRequest = requests.find((request) => predicate(request));
      if (!matchingRequest) {
        throw new Error('No matching request');
      }
      return matchingRequest;
    },
  });
}

test.describe('all work cases request helper', { tag: '@svc-internal' }, () => {
  test('parses the posted all-work cases request body', () => {
    const requestBody: AllWorkCasesRequestBody = {
      searchRequest: {
        search_parameters: [{ key: 'actorId', values: 'abc-123' }],
        pagination_parameters: { page_number: 2, page_size: 25 },
      },
      view: 'ALL_WORK_CASES',
    };

    expect(
      parseAllWorkCasesRequest({
        postDataJSON: () => requestBody,
      } as never)
    ).toEqual(requestBody);
  });

  test('waits for the filtered all-work cases request with the expected actorId', async () => {
    const nonMatchingMethodRequest = buildRequest({ method: () => 'GET' });
    const nonMatchingActorRequest = buildRequest({
      postDataJSON: () => ({
        searchRequest: {
          search_parameters: [{ key: 'actorId', values: 'different-user' }],
        },
      }),
    });
    const matchingRequest = buildRequest({
      postDataJSON: () => ({
        searchRequest: {
          search_parameters: [{ key: 'actorId', values: 'target-user' }],
        },
      }),
    });

    const request = await runWaitForRequestPredicate(
      (page) => waitForFilteredAllWorkCasesRequest(page as never, 'target-user'),
      [nonMatchingMethodRequest, nonMatchingActorRequest, matchingRequest]
    );

    expect(request).toBe(matchingRequest);
  });

  test('waits for the requested all-work cases pagination page number', async () => {
    const nonMatchingRouteRequest = buildRequest({
      url: () => 'https://manage-case.aat.platform.hmcts.net/workallocation/my-work/cases',
    });
    const nonMatchingPageRequest = buildRequest({
      postDataJSON: () => ({
        searchRequest: {
          pagination_parameters: { page_number: 2, page_size: 25 },
        },
      }),
    });
    const matchingRequest = buildRequest({
      postDataJSON: () => ({
        searchRequest: {
          pagination_parameters: { page_number: 3, page_size: 25 },
        },
      }),
    });

    const request = await runWaitForRequestPredicate(
      (page) => waitForAllWorkCasesPageRequest(page as never, 3),
      [nonMatchingRouteRequest, nonMatchingPageRequest, matchingRequest]
    );

    expect(request).toBe(matchingRequest);
  });
});
