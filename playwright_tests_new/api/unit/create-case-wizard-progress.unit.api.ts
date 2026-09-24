import { expect, test } from '@playwright/test';

import { CreateCasePage } from '../../E2E/page-objects/pages/exui/createCase.po.js';
import { buildTestAppUrl } from './testAppUrls.js';

function wizard(
  options: {
    missingButton?: boolean;
    stalled?: boolean;
    wrongRoute?: string;
    failedValidation?: boolean;
    delayedFailure?: boolean;
    missingDestination?: boolean;
    missingIntermediate?: boolean;
  } = {}
) {
  let currentUrl = buildTestAppUrl('/cases/1/trigger/update/page1');
  let clicks = 0;
  const actions: string[] = [];
  const calls = [{ method: 'POST', status: 502, url: buildTestAppUrl('/data/case-types/old/validate') }];
  const button = {
    filter: (options: { visible: boolean }) => {
      expect(options).toEqual({ visible: true });
      return button;
    },
    first() {
      return this;
    },
    waitFor: async () => {
      if (options.missingIntermediate) throw new Error('Next Continue missing');
      actions.push('ready');
    },
  };
  const subject = Object.assign(Object.create(CreateCasePage.prototype), {
    page: {
      url: () => currentUrl,
      waitForURL: async (predicate: (url: URL) => boolean) => {
        actions.push('wait');
        if (options.delayedFailure)
          calls.push({ method: 'POST', status: 502, url: buildTestAppUrl('/data/case-types/current/validate') });
        if (!options.stalled) {
          currentUrl = buildTestAppUrl(options.wrongRoute ?? `/cases/1/trigger/update/page${clicks + 1}`);
        }
        if (!predicate(new URL(currentUrl))) throw new Error('Wizard did not advance');
      },
    },
    continueButton: button,
    getApiCalls: () => calls,
    getVisibleActionButton: async () => (options.missingButton ? null : button),
    clickContinueAndWait: async () => {
      clicks += 1;
      actions.push('click');
      if (options.failedValidation)
        calls.push({ method: 'POST', status: 502, url: buildTestAppUrl('/data/case-types/current/validate') });
    },
  });
  const destination = {
    waitFor: async () => {
      if (options.missingDestination) throw new Error('Destination input missing');
      actions.push('destination');
    },
  };
  return { subject, destination, actions, clicks: () => clicks };
}

test.describe('Counted create case wizard navigation', { tag: '@svc-internal' }, () => {
  test('waits for each next usable wizard page before counting another click, ignoring stale failures', async () => {
    const { subject, destination, actions, clicks } = wizard();
    await subject.clickContinueMultipleTimes(3, destination);
    expect(clicks()).toBe(3);
    expect(actions).toEqual(['click', 'wait', 'ready', 'click', 'wait', 'ready', 'click', 'wait', 'destination']);
  });

  test('fails when the requested Continue button is missing', async () => {
    const { subject, destination, clicks } = wizard({ missingButton: true });
    await expect(subject.clickContinueMultipleTimes(3, destination)).rejects.toThrow('Continue button not visible');
    expect(clicks()).toBe(0);
  });

  for (const options of [
    { stalled: true },
    { wrongRoute: '/not-authorised' },
    { wrongRoute: '/cases/2/trigger/update/page2' },
    { wrongRoute: '/cases/1/trigger/other/page2' },
  ]) {
    test(`does not replay Continue or succeed on ${options.stalled ? 'a stalled wizard' : options.wrongRoute}`, async () => {
      const { subject, destination, clicks } = wizard(options);
      await expect(subject.clickContinueMultipleTimes(3, destination)).rejects.toThrow('Wizard did not advance');
      expect(clicks()).toBe(1);
    });
  }

  for (const delayedFailure of [false, true]) {
    test(`reports ${delayedFailure ? 'delayed' : 'immediate'} validation failure instead of waiting for a later upload input`, async () => {
      const { subject, destination, clicks } = wizard({ stalled: true, failedValidation: !delayedFailure, delayedFailure });
      await expect(subject.clickContinueMultipleTimes(3, destination)).rejects.toThrow(/current\/validate returned HTTP 502/);
      expect(clicks()).toBe(1);
    });
  }

  test('fails if the final wizard page does not contain the required input', async () => {
    const { subject, destination, clicks } = wizard({ missingDestination: true });
    await expect(subject.clickContinueMultipleTimes(3, destination)).rejects.toThrow('Destination input missing');
    expect(clicks()).toBe(3);
  });

  test('stops before another click when the intermediate page has no visible Continue', async () => {
    const { subject, destination, actions, clicks } = wizard({ missingIntermediate: true });
    await expect(subject.clickContinueMultipleTimes(3, destination)).rejects.toThrow('Next Continue missing');
    expect(clicks()).toBe(1);
    expect(actions).not.toContain('destination');
  });
});
