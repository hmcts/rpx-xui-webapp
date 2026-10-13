import { Inject, Injectable } from '@angular/core';
import { MonitoringService } from '../../app/services/logger/monitoring.service';
import { HEARINGS_OPERATIONS, HearingsOperation } from './hearings-exception-telemetry';

export type HearingsJourneyType =
  'browse' | 'request' | 'amend' | 'view' | 'cancel' | 'link' | 'manage-links' | 'actuals' | 'error';
export type HearingsTelemetryAction = 'continue' | 'back' | 'change' | 'submit' | 'cancel';
export type HearingsValidationCategory = 'form' | 'case-context-mismatch';
export type HearingsJourneyEndReason =
  'confirmation' | 'left-hearings' | 'context-changed' | 'returned-to-list' | 'pagehide' | 'destroyed';

export interface HearingsJourneyState {
  readonly journeyType: HearingsJourneyType;
  readonly journeyId: string;
  readonly currentStep: string;
  readonly actionCount: number;
}

// Compared in memory only. Never spread this context into telemetry properties.
export interface HearingsJourneyContext {
  caseId?: string;
  hearingId?: string;
}

interface ActiveJourney extends HearingsJourneyState {
  enteredAt: number;
  startPage: string;
  context: HearingsJourneyContext;
  pageCount: number;
}

// Explicit templates prevent callers from submitting URLs, form values or identifiers as steps.
const STEP_TYPES = new Map<string, HearingsJourneyType>([
  ...[
    '',
    'hearing-requirements',
    'hearing-facilities',
    'hearing-stage',
    'hearing-attendance',
    'hearing-venue',
    'hearing-welsh',
    'hearing-judge',
    'hearing-panel',
    'hearing-timing',
    'hearing-link',
    'hearing-additional-instructions',
    'hearing-create-edit-summary',
    'hearing-confirmation',
  ].map((step) => [`/hearings/request${step ? `/${step}` : ''}`, 'request'] as const),
  ...['hearing-view-edit-summary', 'hearing-edit-summary', 'hearing-change-reason'].map(
    (step) => [`/hearings/request/${step}`, 'amend'] as const
  ),
  ['/hearings/request/hearing-view-summary', 'view'],
  ...[
    '',
    'hearing-cancellation-summary',
    'hearing-cancelled-summary/:id',
    'hearing-completed-summary/:id',
    'hearing-adjourned-summary/:id',
    'hearing-view-actuals-summary/:id',
    'hearing-request-failed-summary/:id',
    'hearing-view-summary',
  ].map((step) => [`/hearings/view${step ? `/${step}` : ''}`, 'view'] as const),
  ['/hearings/cancel/:hearingId', 'cancel'],
  ...['', 'group-selection', 'check-your-answers', 'final-confirmation'].map(
    (step) => [`/hearings/link/:caseId/:hearingId${step ? `/${step}` : ''}`, 'link'] as const
  ),
  ...['', 'selected-hearings', 'group-selection', 'check-your-answers', 'final-confirmation'].map(
    (step) =>
      [`/hearings/manage-links/:caseId/:hearingGroupRequestId/:hearingId${step ? `/${step}` : ''}`, 'manage-links'] as const
  ),
  ...[
    '',
    'hearing-actual-add-edit-summary',
    'hearing-actual-edit-summary',
    'hearing-timing/:hearingDate',
    'hearing-stage-result',
    'hearing-actuals-confirmation',
    'actuals-parties/:hearingDate',
  ].map((step) => [`/hearings/actuals/:id${step ? `/${step}` : ''}`, 'actuals'] as const),
  ['/hearings/error', 'error'],
  ['/cases/case-details/:cid/hearings', 'browse'],
  ['/cases/case-details/:jurisdiction/:caseType/:cid/hearings', 'browse'],
]);

const ACTIONS: readonly HearingsTelemetryAction[] = ['continue', 'back', 'change', 'submit', 'cancel'];

@Injectable({ providedIn: 'root' })
export class HearingsTelemetryService {
  private journey?: ActiveJourney;

  constructor(
    private readonly monitoring: MonitoringService,
    @Inject(Window) private readonly browser: Window
  ) {}

  public get currentJourney(): HearingsJourneyState | null {
    if (!this.journey) {
      return null;
    }
    const { journeyType, journeyId, currentStep, actionCount } = this.journey;
    return { journeyType, journeyId, currentStep, actionCount };
  }

  public hasContextChanged(next: HearingsJourneyContext): boolean {
    const previous = this.journey?.context;
    return !!(
      previous &&
      ((previous.caseId && next.caseId && previous.caseId !== next.caseId) ||
        (previous.hearingId && next.hearingId && previous.hearingId !== next.hearingId))
    );
  }

  public enterStep(
    step: string,
    context: HearingsJourneyContext = {},
    now = this.browser.performance.now()
  ): HearingsJourneyState | null {
    const type = STEP_TYPES.get(step);
    if (!type) {
      return null;
    }
    if (this.hasContextChanged(context)) {
      this.endJourney('context-changed', now);
    }
    if (!this.journey) {
      this.journey = {
        journeyId: Array.from(this.browser.crypto.getRandomValues(new Uint32Array(4)), (value) =>
          value.toString(16).padStart(8, '0')
        ).join(''),
        journeyType: type,
        currentStep: step,
        actionCount: 0,
        enteredAt: now,
        startPage: step,
        context: { ...context },
        pageCount: 1,
      };
      this.monitoring.logEvent('Hearings.JourneyStarted', this.properties());
    } else {
      const journeyType =
        (type === 'request' && this.journey.journeyType === 'amend') || type === 'error' ? this.journey.journeyType : type;
      this.journey = {
        ...this.journey,
        journeyType,
        currentStep: step,
        context: { ...this.journey.context, ...context },
        pageCount: this.journey.pageCount + 1,
      };
    }
    return this.currentJourney;
  }

  public recordAction(action: HearingsTelemetryAction): void {
    if (!this.journey || !ACTIONS.includes(action)) {
      return;
    }
    this.journey = { ...this.journey, actionCount: this.journey.actionCount + 1 };
    this.monitoring.logEvent('Hearings.Action', { ...this.properties(), action }, { actionCount: this.journey.actionCount });
  }

  public recordValidationFailure(category: HearingsValidationCategory, errorCount = 1): void {
    if (
      !this.journey ||
      !['form', 'case-context-mismatch'].includes(category) ||
      !Number.isSafeInteger(errorCount) ||
      errorCount < 1
    ) {
      return;
    }
    this.monitoring.logEvent('Hearings.ValidationFailed', { ...this.properties(), category }, { errorCount });
  }

  public captureException(operation: HearingsOperation): (error: unknown) => void {
    if (!HEARINGS_OPERATIONS.includes(operation)) {
      return () => {};
    }
    // Snapshot the initiating journey, not whichever case/page is active when a slow request fails.
    const context = {
      telemetryArea: 'Hearings',
      operation,
      ...this.monitoring.captureOperationContext?.(),
      ...(this.journey ? this.properties() : { page: 'Hearings' }),
    };
    return (error: unknown) => {
      try {
        const detail =
          error && typeof error === 'object'
            ? (error as { name?: string; message?: string; stack?: string; status?: number })
            : {};
        const status =
          Number.isInteger(detail.status) && detail.status >= 0 && detail.status <= 599 ? { httpStatus: detail.status } : {};
        // HTTP errors are not native Errors. Project only diagnostic fields; exclude bodies, headers and URLs.
        const exception: Error =
          error instanceof Error
            ? error
            : {
                name: typeof detail.name === 'string' ? detail.name : 'Error',
                message: typeof detail.message === 'string' ? detail.message : `${operation} failed`,
                stack: typeof detail.stack === 'string' ? detail.stack : undefined,
              };
        this.monitoring.logException(exception, { ...context, ...status });
      } catch {
        // Error reporting must never replace or swallow the original application failure.
      }
    };
  }

  public endJourney(reason: HearingsJourneyEndReason, now = this.browser.performance.now(), endPage?: string): void {
    if (!this.journey) {
      return;
    }
    const journey = this.journey;
    const properties = this.properties();
    this.journey = undefined;
    this.monitoring.logEvent(
      'Hearings.JourneyDuration',
      {
        ...properties,
        page: endPage && STEP_TYPES.has(endPage) ? endPage : journey.currentStep,
        startPage: journey.startPage,
        endReason: reason,
      },
      { durationMs: Math.max(0, now - journey.enteredAt), pageCount: journey.pageCount, actionCount: journey.actionCount }
    );
  }

  private properties(): Record<string, string> {
    return {
      journeyId: this.journey.journeyId,
      journeyType: this.journey.journeyType,
      step: this.journey.currentStep,
      page: this.journey.currentStep,
    };
  }
}
