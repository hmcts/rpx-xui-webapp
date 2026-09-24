import { expect, test } from '@playwright/test';
import { reachQueryAccessibilityState } from '../../E2E/utils/test-setup/accessibilityJourneyStates.js';

test('query accessibility validation never submits, while confirmation completes the same form', async () => {
  const actions: string[] = [];
  const query = {
    continueButton: {
      click: async () => {
        actions.push('continue');
      },
    },
    chooseRaiseAQueryJourney: async () => {
      actions.push('choose');
    },
    enterQueryDetailsAndContinue: async () => {
      actions.push('details');
    },
    submitQuery: async () => {
      actions.push('submit');
    },
  };
  await reachQueryAccessibilityState(query as never, 'details validation');
  expect(actions).toEqual(['choose', 'continue']);
  actions.length = 0;
  await reachQueryAccessibilityState(query as never, 'confirmation');
  expect(actions).toEqual(['choose', 'details', 'submit']);
});
