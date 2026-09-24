import { CreateCasePage } from '../../E2E/page-objects/pages/exui/createCase.po.js';
import type { clickSubmitAndWaitFlow } from '../../E2E/page-objects/pages/exui/createCase.flow.js';
import { buildTestAppUrl } from './testAppUrls.js';

type ApiCall = { method: string; status: number; url: string };
type FlowOptions = Parameters<typeof clickSubmitAndWaitFlow>[0];

export const SUBMIT_ENDPOINT = buildTestAppUrl('/data/cases/1234567890123456/events');

export function submitFlowScenario({
  previousCalls = [],
  submitCall,
  submitCalls = [],
  errorAt,
  error = new Error('Original wizard failure'),
  validationText,
  completion,
  initialPath = '/cases/case-details/1234567890123456/trigger/updateCase',
}: {
  previousCalls?: ApiCall[];
  submitCall?: ApiCall;
  submitCalls?: ApiCall[];
  errorAt?: 'click' | 'spinner' | 'event-error';
  error?: Error;
  validationText?: string;
  initialPath?: string;
  completion?: {
    afterPolls?: number;
    path?: string;
    closed?: boolean;
    call?: ApiCall;
    validationText?: string;
    ready?: boolean;
    stalled?: boolean;
  };
} = {}): { options: FlowOptions; clicks: () => number; polls: () => number } {
  let clicks = 0;
  let polls = 0;
  let currentPath = initialPath;
  let closed = false;
  let ready = false;
  let currentValidation = validationText;
  const complete = () => {
    if (completion?.stalled) return;
    currentPath = completion?.path ?? '/cases/case-details/1234567890123456';
    closed = completion?.closed ?? false;
    ready = completion?.ready ?? true;
    currentValidation = completion?.validationText ?? validationText;
    if (completion?.call) observer.recordApiCall(completion.call);
  };
  const hiddenLocator = { isVisible: async () => false };
  const submitButton = {};
  const observer = Object.assign(Object.create(CreateCasePage.prototype), { page: {}, maxApiCallsTracked: 500 });
  for (const call of previousCalls) observer.recordApiCall(call);
  return {
    clicks: () => clicks,
    polls: () => polls,
    options: {
      page: {
        isClosed: () => closed,
        url: () => buildTestAppUrl(currentPath),
        locator: () => ({ isVisible: async () => ready }),
        waitForTimeout: async (ms: number) => {
          polls += 1;
          if (polls >= (completion?.afterPolls ?? 0)) complete();
          if (completion?.stalled || completion?.ready === false || completion?.path)
            await new Promise((resolve) => setTimeout(resolve, ms));
        },
      } as unknown as FlowOptions['page'],
      context: 'document upload submit',
      timeoutMs: 5_000,
      maxAutoAdvanceAttempts: 1,
      submitButton: submitButton as FlowOptions['submitButton'],
      continueButton: hiddenLocator as FlowOptions['continueButton'],
      somethingWentWrongHeading: hiddenLocator as FlowOptions['somethingWentWrongHeading'],
      getApiCalls: () => observer.getApiCalls(),
      getVisibleActionButton: async (locator) => (locator === submitButton ? locator : undefined),
      clickSubmitButtonWithRetry: async () => {
        clicks += 1;
        for (const call of [...submitCalls, ...(submitCall ? [submitCall] : [])]) observer.recordApiCall(call);
        if (errorAt === 'click') throw error;
        if (!completion?.afterPolls) complete();
      },
      clickContinueAndWait: async () => {
        throw new Error('Unexpected wizard auto-advance');
      },
      waitForSpinnerToComplete: async () => {
        if (errorAt === 'spinner') throw error;
      },
      assertNoEventCreationError: async () => {
        if (clicks && errorAt === 'event-error') throw error;
      },
      checkForErrorMessage: async () => Boolean(currentValidation),
      getValidationErrorText: async () => currentValidation ?? '',
      failFastOnCriticalWizardEndpointFailure: (context, baseline) =>
        observer.failFastOnCriticalWizardEndpointFailure(context, baseline),
      warn: () => undefined,
    },
  };
}
