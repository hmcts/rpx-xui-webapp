import { expect, test } from '@playwright/test';

import {
  BOOKING_UI_LEGACY_USER_IDENTIFIER,
  getConfiguredBookingUiUserIdentifiers,
  resolveBookingUiUserIdentifier,
} from '../../integration/helpers/bookingUiUserPool.helper.js';

const configuredEnv = {
  BOOKING_UI_FT_ON_1_USERNAME: 'booking-ui-1@example.test',
  BOOKING_UI_FT_ON_1_PASSWORD: 'secret-1',
  BOOKING_UI_FT_ON_2_USERNAME: 'booking-ui-2@example.test',
  BOOKING_UI_FT_ON_2_PASSWORD: 'secret-2',
  BOOKING_UI_FT_ON_3_USERNAME: 'booking-ui-3@example.test',
  BOOKING_UI_FT_ON_3_PASSWORD: 'secret-3',
  BOOKING_UI_FT_ON_4_USERNAME: 'booking-ui-4@example.test',
  BOOKING_UI_FT_ON_4_PASSWORD: 'secret-4',
};

test.describe('Booking UI user pool unit tests', { tag: '@svc-internal' }, () => {
  test('falls back to the legacy Booking UI user when no pooled users are configured', () => {
    expect(getConfiguredBookingUiUserIdentifiers({})).toEqual([]);
    expect(resolveBookingUiUserIdentifier({ parallelIndex: 3 }, {})).toBe(BOOKING_UI_LEGACY_USER_IDENTIFIER);
  });

  test('returns only fully configured pooled users', () => {
    const env = {
      BOOKING_UI_FT_ON_1_USERNAME: 'booking-ui-1@example.test',
      BOOKING_UI_FT_ON_1_PASSWORD: 'secret-1',
      BOOKING_UI_FT_ON_2_USERNAME: 'booking-ui-2@example.test',
      BOOKING_UI_FT_ON_3_PASSWORD: 'secret-3',
    };

    expect(getConfiguredBookingUiUserIdentifiers(env)).toEqual(['BOOKING_UI-FT-ON-1']);
  });

  test('selects configured pooled users by Playwright parallel index', () => {
    expect(resolveBookingUiUserIdentifier({ parallelIndex: 0 }, configuredEnv)).toBe('BOOKING_UI-FT-ON-1');
    expect(resolveBookingUiUserIdentifier({ parallelIndex: 1 }, configuredEnv)).toBe('BOOKING_UI-FT-ON-2');
    expect(resolveBookingUiUserIdentifier({ parallelIndex: 2 }, configuredEnv)).toBe('BOOKING_UI-FT-ON-3');
    expect(resolveBookingUiUserIdentifier({ parallelIndex: 3 }, configuredEnv)).toBe('BOOKING_UI-FT-ON-4');
    expect(resolveBookingUiUserIdentifier({ parallelIndex: 4 }, configuredEnv)).toBe('BOOKING_UI-FT-ON-1');
  });
});
