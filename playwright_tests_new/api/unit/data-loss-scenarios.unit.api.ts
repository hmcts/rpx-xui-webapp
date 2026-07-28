import { expect, test } from '@playwright/test';

import {
  getDataLossScenarioMatrix,
  getDataLossScenariosNeedingFollowUp,
  getDataLossScenariosReadyForAutomation,
} from '../../E2E/utils/test-setup/dataLossScenarioMatrix.js';

test.describe('Data loss scenario coverage map', { tag: '@svc-internal' }, () => {
  test('maps every historical data-loss ticket into a coverage contract', () => {
    const scenarios = getDataLossScenarioMatrix();

    expect(scenarios.map((scenario) => scenario.id)).toEqual(['EXUI-848', 'EXUI-811', 'EXUI-433', 'EXUI-942', 'EXUI-702']);

    for (const scenario of scenarios) {
      expect.soft(scenario.caseType, `${scenario.id} must declare its case type`).not.toBe('');
      expect.soft(scenario.protectedTabs.length, `${scenario.id} must declare protected tabs`).toBeGreaterThan(0);
      expect.soft(scenario.protectedFields.length, `${scenario.id} must declare protected fields`).toBeGreaterThan(0);
      expect
        .soft(scenario.setupRoute, `${scenario.id} must declare setup route`)
        .toMatch(/api-required|e2e-create-case|integration-mock/);
      expect
        .soft(scenario.assertionLayer, `${scenario.id} must declare assertion layer`)
        .toMatch(/e2e-tab-assertion|integration-tab-contract|api-support-contract/);
    }
  });

  test('separates implemented create-case coverage from NoC follow-up work', () => {
    expect(getDataLossScenariosReadyForAutomation().map((scenario) => scenario.id)).toEqual([
      'EXUI-848',
      'EXUI-811',
      'EXUI-433',
      'EXUI-942',
    ]);

    expect(getDataLossScenariosNeedingFollowUp()).toEqual([
      expect.objectContaining({
        id: 'EXUI-702',
        setupRoute: 'api-required',
        assertionLayer: 'integration-tab-contract',
      }),
    ]);
  });

  test('keeps executable rows tied to runnable Playwright feature tags', () => {
    for (const scenario of getDataLossScenariosReadyForAutomation()) {
      expect(scenario.runnableTags, `${scenario.id} must declare runnable tag coverage`).toEqual(
        expect.arrayContaining(['@e2e-data-loss', '@integration-data-loss'])
      );
    }
  });
});
