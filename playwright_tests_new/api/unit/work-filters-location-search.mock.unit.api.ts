import { expect, test } from '@playwright/test';
import {
  buildWorkFiltersFullLocationResponses,
  buildWorkFiltersLocationSearchRequest,
  buildWorkFiltersLocationSearchResponse,
  workFiltersIaSearchLocation,
  workFiltersSscsSearchLocation,
  workFiltersSscsSearchLocationSecondary,
} from '../../integration/mocks/workFiltersLocationSearch.mock.js';

test.describe('work filters location search mocks', { tag: '@svc-internal' }, () => {
  test('normalises the location search request into sorted service and scope lists', () => {
    const request = buildWorkFiltersLocationSearchRequest({
      searchTerm: 'Court',
      serviceIds: 'SSCS, IA',
      userLocations: [
        { serviceCode: 'SSCS', locations: [{ regionId: '2' }] },
        { service: 'IA', locations: [{ locationId: '20001' }] },
      ],
    });

    expect(request).toEqual({
      searchTerm: 'Court',
      serviceIds: ['IA', 'SSCS'],
      userLocations: [
        { serviceCode: 'SSCS', locations: [{ regionId: '2' }] },
        { service: 'IA', locations: [{ locationId: '20001' }] },
      ],
      userLocationServices: ['IA', 'SSCS'],
    });
  });

  test('filters location search results by requested services, scope, and search term', () => {
    const response = buildWorkFiltersLocationSearchResponse({
      searchTerm: 'Court',
      serviceIds: 'SSCS,IA',
      userLocations: [
        { serviceCode: 'IA', locations: [{ locationId: '20001' }] },
        { serviceCode: 'SSCS', locations: [{ regionId: '2' }] },
      ],
    });

    expect(response).toEqual([
      workFiltersIaSearchLocation,
      workFiltersSscsSearchLocation,
      workFiltersSscsSearchLocationSecondary,
    ]);
  });

  test('drops service results when the requested scope is present but empty', () => {
    const response = buildWorkFiltersLocationSearchResponse({
      searchTerm: 'Court',
      serviceIds: 'IA',
      userLocations: [{ serviceCode: 'IA', locations: [] }],
    });

    expect(response).toEqual([]);
  });

  test('returns the full-location lookup map keyed by service code combinations', () => {
    expect(buildWorkFiltersFullLocationResponses()).toEqual({
      IA: [workFiltersIaSearchLocation],
      SSCS: [workFiltersSscsSearchLocation],
      'IA,SSCS': [workFiltersIaSearchLocation, workFiltersSscsSearchLocation],
    });
  });
});
