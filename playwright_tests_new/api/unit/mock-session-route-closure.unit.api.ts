import { expect, test, type Route } from '@playwright/test';
import {
  installSameOriginApiRouteClosure,
  describeUnexpectedSameOriginApiRequest,
} from '../../integration/helpers/mockSessionRouteClosure.helper.js';

test.describe('same-origin mock-session route closure', { tag: '@svc-internal' }, () => {
  test('describes same-origin HTTP and HTTPS XHR/fetch and redacts identifiers and query values', () => {
    expect(
      describeUnexpectedSameOriginApiRequest(
        'https://xui.example/data/internal/cases/1234567890123456?token=secret',
        'https://xui.example/cases/case-details/1234567890123456',
        'xhr',
        'post'
      )
    ).toEqual({
      method: 'POST',
      route: 'https://xui.example/data/internal/cases/:id',
    });
    expect(
      describeUnexpectedSameOriginApiRequest(
        'http://xui.example/data/internal/cases/1234567890123456?token=secret',
        'http://xui.example/cases/case-details/1234567890123456',
        'xhr',
        'post'
      )
    ).toEqual({
      method: 'POST',
      route: 'http://xui.example/data/internal/cases/:id',
    });
    expect(
      describeUnexpectedSameOriginApiRequest('https://api.example.test/cases', 'https://xui.example/cases', 'fetch', 'GET')
    ).toBeUndefined();
    expect(
      describeUnexpectedSameOriginApiRequest(
        'https://xui.example/assets/case-file-view.pdf',
        'https://xui.example/cases',
        'document',
        'GET'
      )
    ).toBeUndefined();
    expect(
      describeUnexpectedSameOriginApiRequest('https://xui.example/rb_bf24054dsx', 'https://xui.example/cases', 'xhr', 'POST')
    ).toBeUndefined();
    expect(
      describeUnexpectedSameOriginApiRequest('https://xui.example/rb_bf24054dsx', 'https://xui.example/cases', 'xhr', 'GET')
    ).toEqual({ method: 'GET', route: 'https://xui.example/rb_bf24054dsx' });
  });

  test('does not classify requests with opaque origins as same-origin', () => {
    for (const [requestUrl, initiatorUrl] of [
      ['data:text/plain,request', 'file:///tmp/app.html'],
      ['file:///tmp/request', 'data:text/html,app'],
      ['custom:request', 'custom:app'],
    ]) {
      expect(describeUnexpectedSameOriginApiRequest(requestUrl, initiatorUrl, 'fetch', 'GET')).toBeUndefined();
    }
  });

  test('aborts and collects an unmatched same-origin API request but falls back for unrelated traffic', async () => {
    let routeHandler: ((route: Route) => Promise<void>) | undefined;
    const fakePage = {
      route: async (_pattern: string, handler: (route: Route) => Promise<void>) => {
        routeHandler = handler;
      },
    };
    const closure = await installSameOriginApiRouteClosure(fakePage as never);
    let aborted = false;
    let fellBack = false;

    for (const [requestUrl, initiatorUrl] of [
      ['https://xui.example/api/cases/1234567890123456?token=secret', 'https://xui.example/cases/case-details/1234567890123456'],
      ['http://xui.example/api/cases/1234567890123456?token=secret', 'http://xui.example/cases/case-details/1234567890123456'],
    ]) {
      aborted = false;
      fellBack = false;
      await routeHandler?.({
        request: () =>
          ({
            url: () => requestUrl,
            frame: () => ({ url: () => initiatorUrl }),
            resourceType: () => 'fetch',
            method: () => 'GET',
          }) as never,
        abort: async () => {
          aborted = true;
        },
        fallback: async () => {
          fellBack = true;
        },
      } as unknown as Route);

      expect(aborted).toBe(true);
      expect(fellBack).toBe(false);
    }

    expect(closure.getUnexpectedRequests()).toEqual([
      { method: 'GET', route: 'https://xui.example/api/cases/:id' },
      { method: 'GET', route: 'http://xui.example/api/cases/:id' },
    ]);

    aborted = false;
    fellBack = false;
    await routeHandler?.({
      request: () =>
        ({
          url: () => 'https://flags.example.test/sdk/eval',
          frame: () => ({ url: () => 'https://xui.example/cases' }),
          resourceType: () => 'fetch',
          method: () => 'GET',
        }) as never,
      abort: async () => {
        aborted = true;
      },
      fallback: async () => {
        fellBack = true;
      },
    } as unknown as Route);

    expect(aborted).toBe(false);
    expect(fellBack).toBe(true);

    aborted = false;
    fellBack = false;
    await routeHandler?.({
      request: () =>
        ({
          url: () => 'https://xui.example/rb_bf24054dsx',
          frame: () => ({ url: () => 'https://xui.example/cases' }),
          resourceType: () => 'xhr',
          method: () => 'POST',
        }) as never,
      abort: async () => {
        aborted = true;
      },
      fallback: async () => {
        fellBack = true;
      },
    } as unknown as Route);

    expect(aborted).toBe(false);
    expect(fellBack).toBe(true);
    expect(closure.getUnexpectedRequests()).toHaveLength(2);
  });
});
