import { expect, test } from '@playwright/test';

import { Base } from '../../E2E/page-objects/base.js';

type Handler = (value: unknown) => void;

class FakePage {
  readonly handlers = new Map<string, Handler[]>();

  locator(): unknown {
    return createLocatorStub();
  }

  getByTitle(): unknown {
    return createLocatorStub();
  }

  getByRole(): unknown {
    return createLocatorStub();
  }

  on(eventName: string, handler: Handler): void {
    const handlers = this.handlers.get(eventName) ?? [];
    handlers.push(handler);
    this.handlers.set(eventName, handlers);
  }

  emit(eventName: string, value: unknown): void {
    for (const handler of this.handlers.get(eventName) ?? []) {
      handler(value);
    }
  }
}

function createLocatorStub(): unknown {
  return new Proxy(
    {},
    {
      get: () => createLocatorStub,
    }
  );
}

class TestBasePage extends Base {}

function buildResponse(url: string, status: number) {
  return {
    request: () => ({
      method: () => 'GET',
      timing: () => ({ responseEnd: 25 }),
      url: () => url,
    }),
    status: () => status,
  };
}

test.describe('Base API monitor unit tests', { tag: '@svc-internal' }, () => {
  test('shares backend API calls across page objects for the same Playwright page', () => {
    const page = new FakePage();
    const firstPageObject = new TestBasePage(page as never);
    const secondPageObject = new TestBasePage(page as never);

    page.emit(
      'response',
      buildResponse(
        'https://xui-webapp-pr-5113.preview.platform.hmcts.net/aggregated/caseworkers/123/jurisdictions?access=read',
        500
      )
    );

    expect(firstPageObject.getApiCalls()).toEqual(secondPageObject.getApiCalls());
    expect(secondPageObject.getApiCalls()).toMatchObject([
      {
        method: 'GET',
        status: 500,
        url: 'https://xui-webapp-pr-5113.preview.platform.hmcts.net/aggregated/caseworkers/123/jurisdictions',
      },
    ]);
  });

  test('does not register duplicate API response monitors for repeated page objects', () => {
    const page = new FakePage();

    new TestBasePage(page as never);
    new TestBasePage(page as never);

    expect(page.handlers.get('response')).toHaveLength(1);
  });
});
