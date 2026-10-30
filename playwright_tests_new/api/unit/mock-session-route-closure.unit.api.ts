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
  });

  test('allows root RUM beacon POSTs for HTTP and HTTPS fetch/XHR requests', () => {
    for (const [protocol, resourceType, method, query] of [
      ['https:', 'fetch', 'POST', ''],
      ['https:', 'xhr', 'post', '?type=js3&session=test'],
      ['http:', 'fetch', 'POST', '?type=js3&session=test'],
      ['http:', 'xhr', 'post', ''],
    ]) {
      expect(
        describeUnexpectedSameOriginApiRequest(
          `${protocol}//xui.example/rb_bf24054dsx${query}`,
          `${protocol}//xui.example/cases`,
          resourceType,
          method
        )
      ).toBeUndefined();
    }
  });

  test('still describes GET beacons and nested or near-match POST paths', () => {
    for (const [pathname, method] of [
      ['/rb_bf24054dsx', 'GET'],
      ['/api/rb_bf24054dsx', 'POST'],
      ['/nested/rb_bf24054dsx', 'POST'],
      ['/rb_', 'POST'],
      ['/rb_id/', 'POST'],
      ['/rb_id-extra', 'POST'],
      ['/prefix_rb_id', 'POST'],
    ]) {
      expect(
        describeUnexpectedSameOriginApiRequest(`https://xui.example${pathname}`, 'https://xui.example/cases', 'fetch', method)
      ).toEqual({ method, route: `https://xui.example${pathname}` });
    }
  });

  test('does not classify requests with opaque origins as same-origin', () => {
    for (const [requestUrl, initiatorUrl] of [
      ['data:text/plain,request', 'file:///tmp/app.html'],
      ['file:///tmp/request', 'data:text/html,app'],
      ['custom:request', 'custom:app'],
      ['custom://xui.example/rb_id', 'custom://xui.example/cases'],
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

    for (const [protocol, pathname, method, resourceType, shouldAbort] of [
      ['https', '/api/cases/1234567890123456?token=secret', 'GET', 'fetch', true],
      ['http', '/api/cases/1234567890123456?token=secret', 'GET', 'fetch', true],
      ['https', '/rb_bf24054dsx', 'POST', 'fetch', false],
      ['https', '/rb_bf24054dsx?type=js3&session=test', 'post', 'xhr', false],
      ['http', '/rb_bf24054dsx?type=js3&session=test', 'POST', 'fetch', false],
      ['http', '/rb_bf24054dsx', 'post', 'xhr', false],
      ['https', '/rb_bf24054dsx', 'GET', 'fetch', true],
      ['https', '/nested/rb_bf24054dsx', 'POST', 'fetch', true],
      ['https', '/rb_', 'POST', 'fetch', true],
      ['https', '/rb_id/', 'POST', 'fetch', true],
      ['https', '/rb_id-extra', 'POST', 'fetch', true],
      ['https', '/prefix_rb_id', 'POST', 'fetch', true],
      ['https', '/api/cases/1234567890123456?token=secret', 'POST', 'fetch', true],
      ['https', '/rb_id', 'POST', 'document', false],
      ['custom', '/rb_id', 'POST', 'fetch', false],
    ] as const) {
      aborted = false;
      fellBack = false;
      await routeHandler?.({
        request: () =>
          ({
            url: () => `${protocol}://xui.example${pathname}`,
            frame: () => ({ url: () => `${protocol}://xui.example/cases/case-details/1234567890123456` }),
            resourceType: () => resourceType,
            method: () => method,
          }) as never,
        abort: async () => {
          aborted = true;
        },
        fallback: async () => {
          fellBack = true;
        },
      } as unknown as Route);

      expect(aborted).toBe(shouldAbort);
      expect(fellBack).toBe(!shouldAbort);
    }

    expect(closure.getUnexpectedRequests()).toEqual([
      { method: 'GET', route: 'https://xui.example/api/cases/:id' },
      { method: 'GET', route: 'http://xui.example/api/cases/:id' },
      { method: 'GET', route: 'https://xui.example/rb_bf24054dsx' },
      { method: 'POST', route: 'https://xui.example/nested/rb_bf24054dsx' },
      { method: 'POST', route: 'https://xui.example/rb_' },
      { method: 'POST', route: 'https://xui.example/rb_id/' },
      { method: 'POST', route: 'https://xui.example/rb_id-extra' },
      { method: 'POST', route: 'https://xui.example/prefix_rb_id' },
      { method: 'POST', route: 'https://xui.example/api/cases/:id' },
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
  });
});
