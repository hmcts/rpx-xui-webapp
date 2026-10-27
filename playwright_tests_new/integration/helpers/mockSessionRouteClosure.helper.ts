import type { Page, Route } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { redactUrl } = require('../../common/reporters/failure-context.cjs') as {
  redactUrl: (value: string) => string;
};

const apiResourceTypes = new Set(['fetch', 'xhr']);
const webProtocols = new Set(['http:', 'https:']);

export interface UnexpectedSameOriginRequest {
  method: string;
  route: string;
}

export function describeUnexpectedSameOriginApiRequest(
  requestUrl: string,
  initiatorUrl: string,
  resourceType: string,
  method: string
): UnexpectedSameOriginRequest | undefined {
  if (!apiResourceTypes.has(resourceType)) {
    return undefined;
  }

  try {
    const request = new URL(requestUrl);
    const initiator = new URL(initiatorUrl);
    if (!webProtocols.has(request.protocol) || !webProtocols.has(initiator.protocol) || request.origin !== initiator.origin) {
      return undefined;
    }
    // Dynatrace RUM uses same-origin /rb_... POSTs; allow its beacons through to the monitoring endpoint.
    if (method.toUpperCase() === 'POST' && /^\/rb_[^/]+$/.test(request.pathname)) {
      return undefined;
    }
  } catch {
    return undefined;
  }

  return {
    method: method.toUpperCase(),
    route: redactUrl(requestUrl),
  };
}

export async function installSameOriginApiRouteClosure(page: Page): Promise<{
  getUnexpectedRequests: () => UnexpectedSameOriginRequest[];
}> {
  const unexpectedRequests: UnexpectedSameOriginRequest[] = [];

  // Register before feature routes. Later, narrower routes handle expected requests;
  // this fallback blocks any unmatched same-origin browser API request.
  await page.route('**/*', async (route: Route) => {
    const request = route.request();
    let initiatorUrl = '';
    try {
      initiatorUrl = request.frame().url();
    } catch {
      // Requests without a live page frame are outside this browser API closure.
    }

    const unexpected = describeUnexpectedSameOriginApiRequest(
      request.url(),
      initiatorUrl,
      request.resourceType(),
      request.method()
    );
    if (unexpected) {
      unexpectedRequests.push(unexpected);
      await route.abort();
      return;
    }

    await route.fallback();
  });

  return {
    getUnexpectedRequests: () => [...unexpectedRequests],
  };
}
