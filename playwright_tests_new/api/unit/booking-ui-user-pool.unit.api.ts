import { expect, test } from '@playwright/test';

import { setupBookableBookingUiRoutesForTest } from '../../integration/helpers/bookingUiMockRoutes.helper.js';
import {
  BOOKING_UI_LEGACY_USER_IDENTIFIER,
  getConfiguredBookingUiUserIdentifiers,
  resolveBookingUiSessionCandidates,
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
  BOOKING_UI_FT_ON_5_USERNAME: 'booking-ui-5@example.test',
  BOOKING_UI_FT_ON_5_PASSWORD: 'secret-5',
  BOOKING_UI_FT_ON_6_USERNAME: 'booking-ui-6@example.test',
  BOOKING_UI_FT_ON_6_PASSWORD: 'secret-6',
  BOOKING_UI_FT_ON_7_USERNAME: 'booking-ui-7@example.test',
  BOOKING_UI_FT_ON_7_PASSWORD: 'secret-7',
  BOOKING_UI_FT_ON_8_USERNAME: 'booking-ui-8@example.test',
  BOOKING_UI_FT_ON_8_PASSWORD: 'secret-8',
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

  test('distributes configured users by parallel index', () => {
    expect(resolveBookingUiUserIdentifier({ parallelIndex: 0 }, configuredEnv)).toBe('BOOKING_UI-FT-ON-1');
    expect(resolveBookingUiUserIdentifier({ parallelIndex: 1 }, configuredEnv)).toBe('BOOKING_UI-FT-ON-2');
    expect(resolveBookingUiUserIdentifier({ parallelIndex: 4 }, configuredEnv)).toBe('BOOKING_UI-FT-ON-5');
    expect(resolveBookingUiUserIdentifier({ parallelIndex: 7 }, configuredEnv)).toBe('BOOKING_UI-FT-ON-8');
    expect(resolveBookingUiUserIdentifier({ parallelIndex: 8 }, configuredEnv)).toBe('BOOKING_UI-FT-ON-1');
  });

  test('orders fallback candidates after the worker-selected identity', () => {
    expect(resolveBookingUiSessionCandidates({ parallelIndex: 1 }, configuredEnv)).toEqual([
      'BOOKING_UI-FT-ON-2',
      'BOOKING_UI-FT-ON-1',
      'BOOKING_UI-FT-ON-3',
      'BOOKING_UI-FT-ON-4',
      'BOOKING_UI-FT-ON-5',
      'BOOKING_UI-FT-ON-6',
      'BOOKING_UI-FT-ON-7',
      'BOOKING_UI-FT-ON-8',
    ]);
  });

  test('uses the deadline-aware Booking UI pool once and annotates its selected identity', async () => {
    const envOverrides = configuredEnv;
    const previousValues = Object.fromEntries(Object.keys(envOverrides).map((key) => [key, process.env[key]]));
    const poolCalls: string[][] = [];
    const testInfo = { parallelIndex: 0, annotations: [] as Array<{ type: string; description?: string }> };
    const page = {
      addInitScript: async () => undefined,
      route: async () => undefined,
    } as never;

    try {
      Object.assign(process.env, envOverrides);
      const routeState = await setupBookableBookingUiRoutesForTest(page, testInfo, {}, async (_page, candidates) => {
        poolCalls.push(candidates.map((candidate) => (typeof candidate === 'string' ? candidate : candidate.userIdentifier)));
        return {
          userIdentifier: 'BOOKING_UI-FT-ON-2',
          session: {
            cookies: [{ name: '__userid__', value: 'fallback-booking-user-id' }],
          },
        };
      });

      expect(poolCalls).toEqual([
        [
          'BOOKING_UI-FT-ON-1',
          'BOOKING_UI-FT-ON-2',
          'BOOKING_UI-FT-ON-3',
          'BOOKING_UI-FT-ON-4',
          'BOOKING_UI-FT-ON-5',
          'BOOKING_UI-FT-ON-6',
          'BOOKING_UI-FT-ON-7',
          'BOOKING_UI-FT-ON-8',
        ],
      ]);
      expect(routeState.sessionUserIdentifier).toBe('BOOKING_UI-FT-ON-2');
      expect(routeState.sessionUserId).toBe('fallback-booking-user-id');
      expect(testInfo.annotations).toEqual([{ type: 'session-user', description: 'BOOKING_UI-FT-ON-2' }]);
    } finally {
      for (const [key, value] of Object.entries(previousValues)) {
        if (value === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = value;
        }
      }
    }
  });
});
