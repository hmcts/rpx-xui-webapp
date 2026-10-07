export type DataLossScenario = {
  id: 'EXUI-848' | 'EXUI-811' | 'EXUI-433' | 'EXUI-942' | 'EXUI-702';
  caseType: string;
  setupRoute: 'api-required' | 'e2e-create-case' | 'integration-mock';
  assertionLayer: 'e2e-tab-assertion' | 'integration-tab-contract' | 'api-support-contract';
  protectedTabs: readonly string[];
  protectedFields: readonly string[];
  runnableTags?: readonly string[];
  negativeAssertions?: readonly string[];
  followUpRequired?: string;
};

const dataLossScenarios: readonly DataLossScenario[] = [
  {
    id: 'EXUI-848',
    caseType: 'DIVORCE / XUI Case PoC',
    setupRoute: 'e2e-create-case',
    assertionLayer: 'e2e-tab-assertion',
    protectedTabs: ['Data'],
    protectedFields: ['Text Field 0', 'Text Field 2', 'Text Field 3', 'Select your gender'],
    runnableTags: ['@e2e-data-loss', '@integration-data-loss'],
  },
  {
    id: 'EXUI-811',
    caseType: 'DIVORCE / XUI Case PoC',
    setupRoute: 'e2e-create-case',
    assertionLayer: 'e2e-tab-assertion',
    protectedTabs: ['Data'],
    protectedFields: ['Title', 'First Name', 'Last Name', 'Gender'],
    runnableTags: ['@e2e-data-loss', '@integration-data-loss'],
  },
  {
    id: 'EXUI-433',
    caseType: 'DIVORCE / XUI Case PoC',
    setupRoute: 'e2e-create-case',
    assertionLayer: 'e2e-tab-assertion',
    protectedTabs: ['Data'],
    protectedFields: ['Text Field 0'],
    runnableTags: ['@e2e-data-loss', '@integration-data-loss'],
    negativeAssertions: ['Text Field 1'],
  },
  {
    id: 'EXUI-942',
    caseType: 'DIVORCE / XUI Case PoC',
    setupRoute: 'e2e-create-case',
    assertionLayer: 'e2e-tab-assertion',
    protectedTabs: ['History'],
    protectedFields: ['Date', 'Author', 'End state', 'Event', 'Summary', 'Comment'],
    runnableTags: ['@e2e-data-loss', '@integration-data-loss'],
  },
  {
    id: 'EXUI-702',
    caseType: 'NoC affected case types',
    setupRoute: 'api-required',
    assertionLayer: 'integration-tab-contract',
    protectedTabs: ['Data', 'History'],
    protectedFields: ['case reference', 'party details', 'event details'],
    followUpRequired: 'Implement a dedicated NoC route-backed integration scenario once the owning NoC mock contract is agreed.',
  },
];

export function getDataLossScenarioMatrix(): readonly DataLossScenario[] {
  return dataLossScenarios;
}

export function getDataLossScenariosReadyForAutomation(): readonly DataLossScenario[] {
  return dataLossScenarios.filter((scenario) => !scenario.followUpRequired);
}

export function getDataLossScenariosNeedingFollowUp(): readonly DataLossScenario[] {
  return dataLossScenarios.filter((scenario) => Boolean(scenario.followUpRequired));
}
