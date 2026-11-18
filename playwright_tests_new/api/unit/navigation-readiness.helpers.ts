import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po.js';
import { TaskListPage } from '../../E2E/page-objects/pages/exui/taskList.po.js';

export function createReadinessHarness() {
  let now = 0;
  const originalNow = Date.now;
  Date.now = () => now;
  const timedCalls: Array<{ name: string; timeout?: number }> = [];
  const visible = {
    first() {
      return this;
    },
    isVisible: async () => true,
    waitFor: async (options: { timeout?: number }) => {
      timedCalls.push({ name: 'visible', timeout: options.timeout });
    },
    evaluateAll: async () => 1,
  };
  const hidden = { ...visible, isVisible: async () => false };
  const page = {
    url: () => 'https://example.test/work/my-work/list',
    waitForURL: async (_matcher: unknown, options: { timeout?: number }) => {
      timedCalls.push({ name: 'url', timeout: options.timeout });
    },
    waitForFunction: async (_fn: unknown, _arg: unknown, options: { timeout?: number }) => {
      timedCalls.push({ name: 'spinner', timeout: options.timeout });
    },
    waitForTimeout: async (duration: number) => {
      now += duration;
    },
    locator: () => ({
      waitFor: async (options: { timeout?: number }) => {
        timedCalls.push({ name: 'spinner', timeout: options.timeout });
      },
      first() {
        return this;
      },
      textContent: async () => {
        now += 100;
        return '';
      },
      evaluateAll: async () => '',
    }),
  };
  const taskList = Object.assign(Object.create(TaskListPage.prototype), {
    page,
    myWorkHeading: visible,
    taskTableTabs: visible,
    myWorkFilterToggle: visible,
    taskListTable: visible,
    taskTableHeader: visible,
    taskTableFooter: visible,
    taskListResultsAmount: visible,
    errorPageHeading: hidden,
    serviceDownError: hidden,
  });
  const caseDetails = Object.assign(Object.create(CaseDetailsPage.prototype), {
    page,
    container: visible,
    tabList: visible,
    tablist2: visible,
  });
  return {
    page,
    taskList,
    caseDetails,
    timedCalls,
    hidden,
    visible,
    advance: (duration: number) => {
      now += duration;
    },
    elapsed: () => now,
    restore: () => {
      Date.now = originalNow;
    },
  };
}

export function createCaseActionHarness(options: { eventError?: boolean; controlsRemoved?: boolean } = {}) {
  let goClicks = 0;
  let spinnerVisible = false;
  const spinner = {
    first() {
      return this;
    },
    isVisible: async () => spinnerVisible,
    waitFor: async () => {
      spinnerVisible = false;
    },
  };
  const controls = {
    waitFor: async () => undefined,
    locator: () => ({ evaluateAll: async () => [{ label: 'Upload Document', value: 'uploadDocument' }] }),
    selectOption: async () => {
      if (options.controlsRemoved && goClicks > 0) throw new Error('controls removed');
    },
    click: async () => {
      goClicks += 1;
    },
  };
  const caseDetails = Object.assign(Object.create(CaseDetailsPage.prototype), {
    caseActionGoButton: controls,
    caseActionsDropdown: controls,
    eventCreationErrorHeading: { isVisible: async () => options.eventError ?? false },
    logger: { warn: () => undefined },
    page: {
      url: () => 'https://example.test/case',
      locator: () => spinner,
      waitForLoadState: async () => undefined,
      waitForURL: async () => {
        throw new Error('wrong destination');
      },
    },
  });
  return { caseDetails, goClicks: () => goClicks };
}
