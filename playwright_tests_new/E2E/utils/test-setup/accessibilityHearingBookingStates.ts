import type { JourneyAccessibilityState } from './accessibilityJourneyTypes';
import { setupAccessibilityMockSession } from '../accessibility/accessibilityMockSession';
import {
  buildBookingUiBootstrapUser,
  caseDetailsUrl,
  continueHearingsFlow,
  hearingManagerRoles,
  selectOrderedLinkedHearings,
  setupBookingUiMockRoutes,
  setupHearingsMockRoutes,
  setupTaskListMockRoutes,
} from '../../../integration/helpers';
import type { HearingsMockRoutesConfig } from '../../../integration/helpers/hearingsMockRoutes.helper';
import { HEARINGS_LISTED_HEARING_ID, LISTED_HEARING_SCENARIO } from '../../../integration/mocks/hearings.mock';
import { buildExistingBookingsMock, singleLocationMock } from '../../../integration/mocks/bookingUI.mock';
import { buildMyTaskListMock } from '../../../integration/mocks/taskList.mock';

type Fixtures = Parameters<JourneyAccessibilityState['setup']>[0];

async function openMockHearings(fixtures: Fixtures, overrides: Partial<HearingsMockRoutesConfig> = {}) {
  const { page, caseDetailsPage } = fixtures;
  const userRoles = overrides.userRoles ?? hearingManagerRoles;
  await setupAccessibilityMockSession(page, {
    userDetails: { userId: 'a11y-hearing-manager', roles: userRoles, roleCategory: 'LEGAL_OPERATIONS' },
  });
  await setupHearingsMockRoutes(page, {
    userRoles,
    hearings: [LISTED_HEARING_SCENARIO],
    ...overrides,
  });
  await page.goto(caseDetailsUrl());
  await caseDetailsPage.selectCaseDetailsTab('Hearings');
}

const hearingStates: JourneyAccessibilityState[] = [
  {
    feature: 'hearings',
    title: 'request hearing requirements',
    persona: 'hearing manager',
    setup: async (fixtures) => {
      await openMockHearings(fixtures);
      await fixtures.hearingsTabPage.openRequestHearing();
      return {
        url: /\/hearings\/request\/hearing-requirements$/,
        ready: [fixtures.page.getByRole('heading', { name: /hearing requirements/i })],
      };
    },
  },
  {
    feature: 'hearings',
    title: 'empty hearings list',
    persona: 'hearing manager',
    setup: async (fixtures) => {
      await openMockHearings(fixtures, { hearings: [] });
      return {
        url: /\/cases\/case-details\/.*#Hearings$/,
        ready: [fixtures.hearingsTabPage.emptyState, fixtures.hearingsTabPage.requestHearingButton],
      };
    },
  },
  {
    feature: 'hearings',
    title: 'hearings retrieval error with reload',
    persona: 'hearing manager',
    setup: async (fixtures) => {
      await openMockHearings(fixtures, {
        hearingsApiOverrides: { getHearings: { status: 500, body: { message: 'Hearings temporarily unavailable' } } },
      });
      return {
        url: /\/cases\/case-details\/.*#Hearings$/,
        ready: [fixtures.hearingsTabPage.container, fixtures.hearingsTabPage.reloadButton],
      };
    },
  },
  ...(['manager', 'viewer'] as const).map((role): JourneyAccessibilityState => ({
    feature: 'hearings',
    title: `listed hearing ${role === 'manager' ? 'amendable' : 'read-only'} summary`,
    persona: `hearing ${role}`,
    setup: async (fixtures) => {
      const roles =
        role === 'manager'
          ? hearingManagerRoles
          : hearingManagerRoles.filter((r) => r !== 'hearing-manager').concat('listed-hearing-viewer');
      await openMockHearings(fixtures, { userRoles: roles });
      await fixtures.hearingsTabPage.openViewDetails(HEARINGS_LISTED_HEARING_ID);
      return {
        url: role === 'manager' ? /\/hearings\/request\/hearing-view-summary$/ : /\/hearings\/view\/hearing-view-summary$/,
        ready: [
          fixtures.page.getByRole('heading', { name: /hearing details|view hearing/i }),
          fixtures.page.getByText('LISTED', { exact: true }).first(),
        ],
      };
    },
  })),
  ...(['selection', 'group order', 'check answers', 'confirmation', 'submission error'] as const).map(
    (state): JourneyAccessibilityState => ({
      feature: 'linked hearings',
      title: `linked hearings ${state}`,
      persona: 'hearing manager',
      setup: async (fixtures) => {
        const { page, hearingsTabPage } = fixtures;
        await openMockHearings(fixtures, {
          hearings: [{ ...LISTED_HEARING_SCENARIO, hearingIsLinkedFlag: true }],
          ...(state === 'submission error'
            ? {
                hearingsApiOverrides: {
                  postLinkedHearingGroup: { status: 500, body: { message: 'linked-hearing-submit-failed' } },
                },
              }
            : {}),
        });
        await hearingsTabPage.openLinkHearing(HEARINGS_LISTED_HEARING_ID);
        if (state === 'selection')
          return {
            url: /\/hearings\/link\/[^/]+\/[^/]+$/,
            ready: [page.getByRole('heading', { name: /which hearings should be linked\?/i })],
          };
        await selectOrderedLinkedHearings(page);
        if (state === 'group order')
          return {
            url: /\/hearings\/link\/.*\/group-selection$/,
            ready: [page.getByRole('heading', { name: /how should these linked hearings be heard\?/i })],
          };
        await continueHearingsFlow(page);
        const summary = page.getByRole('heading', { name: /check your answers/i });
        if (state === 'check answers')
          return {
            url: /\/hearings\/link\/.*\/check-your-answers$/,
            ready: [summary, page.getByRole('button', { name: /link hearings/i })],
          };
        await page.getByRole('button', { name: /link hearings/i }).click();
        if (state === 'submission error')
          return {
            url: /\/hearings\/link\/.*\/check-your-answers$/,
            ready: [
              summary,
              page.getByText('There was a system error and your request could not be processed. Please try again.', {
                exact: true,
              }),
            ],
          };
        return {
          url: /\/hearings\/link\/.*\/final-confirmation$/,
          ready: [page.getByRole('heading', { name: /(hearing is now linked|hearings are now linked)/i })],
        };
      },
    })
  ),
  ...(['details', 'check answers', 'stage and result'] as const).map((state): JourneyAccessibilityState => ({
    feature: 'hearing actuals',
    title: `hearing actuals ${state}`,
    persona: 'hearing manager',
    setup: async (fixtures) => {
      const { page, hearingsTabPage } = fixtures;
      await openMockHearings(fixtures, { hearings: [{ ...LISTED_HEARING_SCENARIO, hmcStatus: 'AWAITING_ACTUALS' }] });
      await hearingsTabPage.addOrEditButton(HEARINGS_LISTED_HEARING_ID).click();
      if (state === 'details')
        return {
          url: /\/hearings\/actuals\/[^/]+\/hearing-actual-add-edit-summary$/,
          ready: [page.getByRole('heading', { name: /hearing details/i }), page.locator('#hearing-stage-result-update-link')],
        };
      if (state === 'stage and result') {
        await page.locator('#hearing-stage-result-update-link').click();
        return {
          url: /\/hearings\/actuals\/[^/]+\/hearing-stage-result$/,
          ready: [page.getByRole('heading', { name: /hearing stage and result/i }), page.locator('#hearing-stage')],
        };
      }
      await continueHearingsFlow(page);
      return {
        url: /\/hearings\/actuals\/[^/]+\/hearing-actual-edit-summary$/,
        ready: [page.getByRole('heading', { name: /check your answers/i })],
      };
    },
  })),
];

const bookingStates = [
  'existing bookings',
  'location',
  'location suggestions',
  'location validation',
  'duration',
  'date range',
  'date validation',
  'check answers',
] as const;

export const hearingBookingAccessibilityStates: JourneyAccessibilityState[] = [
  ...hearingStates,
  ...bookingStates.map((state): JourneyAccessibilityState => ({
    feature: 'booking',
    title: `work access ${state}`,
    persona: 'fee-paid judicial',
    setup: async ({ page, bookingUiPage }) => {
      const userId = 'a11y-booking-user';
      await setupAccessibilityMockSession(page);
      await setupTaskListMockRoutes(page, buildMyTaskListMock(userId, 3), { bootstrapUser: buildBookingUiBootstrapUser(userId) });
      await setupBookingUiMockRoutes(page, {
        locationResponseBody: singleLocationMock,
        getBookingsResponseBody: buildExistingBookingsMock(userId),
      });
      await page.goto('/booking');
      const url = /\/booking$/;
      if (state === 'existing bookings') {
        await bookingUiPage.selectOption('Choose an existing booking');
        return { url, ready: [bookingUiPage.heading, bookingUiPage.existingBookingButton(0)] };
      }
      await bookingUiPage.selectOption('Create a new booking');
      await bookingUiPage.continue();
      const locationReady = [bookingUiPage.locationStepHeading, bookingUiPage.locationSearch];
      if (state === 'location') return { url, ready: locationReady };
      if (state === 'location suggestions') {
        await bookingUiPage.locationSearch.fill('Lon');
        return { url, ready: [...locationReady, bookingUiPage.locationAutocompleteOptions.first()] };
      }
      if (state === 'location validation') {
        await bookingUiPage.continue();
        return {
          url,
          ready: [...locationReady, bookingUiPage.exuiHeader.errorHeader.filter({ hasText: 'Enter a valid location' })],
        };
      }
      await bookingUiPage.selectFirstLocationFromSearch('Lon');
      await bookingUiPage.continue();
      const durationReady = page.getByLabel('Today only (ends at midnight)', { exact: true });
      if (state === 'duration') return { url, ready: [durationReady] };
      if (state === 'date range' || state === 'date validation') {
        await bookingUiPage.chooseDateRangeBooking();
        const ready = [durationReady, page.locator('#conditional-date-0')];
        if (state === 'date validation') {
          await bookingUiPage.continue();
          ready.push(bookingUiPage.exuiHeader.errorHeader.filter({ hasText: 'Enter a booking start date' }));
        }
        return { url, ready };
      }
      await bookingUiPage.chooseTodayOnlyBooking();
      await bookingUiPage.continue();
      return {
        url,
        ready: [
          page.getByRole('heading', { name: /check your new booking/i }),
          bookingUiPage.summaryList(),
          bookingUiPage.bookingButton,
        ],
      };
    },
  })),
];
