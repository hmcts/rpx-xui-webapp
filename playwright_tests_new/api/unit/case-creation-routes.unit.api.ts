import { expect, test } from '@playwright/test';

import { resolveCcdDataStoreUrl } from '../../integration/utils/caseCreationRoutes.js';

test.describe('case creation integration route helpers', { tag: '@svc-internal' }, () => {
  test('uses configured CCD data store URL when supplied', () => {
    expect(
      resolveCcdDataStoreUrl({
        CCD_DATA_STORE_URL: 'https://ccd-data-store.demo.platform.hmcts.net/',
        TEST_URL: 'https://manage-case.aat.platform.hmcts.net',
      })
    ).toBe('https://ccd-data-store.demo.platform.hmcts.net');
  });

  test('derives the CCD gateway URL from AAT and demo manage-case URLs', () => {
    expect(resolveCcdDataStoreUrl({ TEST_URL: 'https://manage-case.aat.platform.hmcts.net' })).toBe(
      'https://gateway-ccd.aat.platform.hmcts.net'
    );
    expect(resolveCcdDataStoreUrl({ TEST_URL: 'https://manage-case.demo.platform.hmcts.net' })).toBe(
      'https://gateway-ccd.demo.platform.hmcts.net'
    );
  });

  test('derives the production CCD gateway URL from the production manage-case URL', () => {
    expect(resolveCcdDataStoreUrl({ TEST_URL: 'https://manage-case.platform.hmcts.net' })).toBe(
      'https://gateway-ccd.platform.hmcts.net'
    );
  });

  test('uses TEST_ENV when TEST_URL is local or a preview URL', () => {
    expect(resolveCcdDataStoreUrl({ TEST_ENV: 'demo', TEST_URL: 'http://localhost:3000' })).toBe(
      'http://gateway-ccd.demo.platform.hmcts.net'
    );
    expect(resolveCcdDataStoreUrl({ TEST_ENV: 'demo', TEST_URL: 'https://xui-webapp-pr-5207.preview.platform.hmcts.net' })).toBe(
      'http://gateway-ccd.demo.platform.hmcts.net'
    );
  });

  test('keeps the AAT default when the environment cannot be inferred', () => {
    expect(resolveCcdDataStoreUrl({ TEST_URL: 'http://localhost:3000' })).toBe('http://gateway-ccd.aat.platform.hmcts.net');
    expect(resolveCcdDataStoreUrl({ TEST_URL: 'https://xui-webapp-pr-5207.preview.platform.hmcts.net' })).toBe(
      'http://gateway-ccd.aat.platform.hmcts.net'
    );
    expect(resolveCcdDataStoreUrl({ TEST_URL: 'not a url' })).toBe('http://gateway-ccd.aat.platform.hmcts.net');
  });
});
