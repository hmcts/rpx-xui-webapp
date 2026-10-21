import { Inject, Injectable, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import {
  hearingTelemetryIdentifiers,
  HearingsTelemetryIdentifiers,
  mergeHearingsIdentifiers,
} from '../../../common/hearings/telemetry-correlation';
import { HearingValuesCaseContext } from '../models/hearingValuesStateData';
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

export type HearingsJourneyContext = HearingsTelemetryIdentifiers;

export interface HearingsTelemetryStoreState {
  hearings?: {
    hearingValues?: { caseInfo?: HearingValuesCaseContext | null };
    hearingRequest?: {
      hearingRequestMainModel?: {
        caseDetails?: { caseRef?: string; hearingID?: string };
        requestDetails?: { hearingRequestID?: string };
      };
    };
  };
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
  private pendingRequestContext?:
    ({ journeyId: string; journeyType: HearingsJourneyType; step: string; page: string } & HearingsTelemetryIdentifiers) | null;

  constructor(
    private readonly monitoring: MonitoringService,
    @Inject(Window) private readonly browser: Window,
    @Optional() private readonly store?: Store<HearingsTelemetryStoreState>
  ) {}

  public get currentJourney(): HearingsJourneyState | null {
    if (!this.journey) {
      return null;
    }
    const { journeyType, journeyId, currentStep, actionCount } = this.journey;
    return { journeyType, journeyId, currentStep, actionCount };
  }

  public get requestJourneyId(): string | null {
    return this.pendingRequestContext !== undefined
      ? this.pendingRequestContext?.journeyId || null
      : this.journey?.journeyId || null;
  }

  public get requestIdentifiers(): HearingsTelemetryIdentifiers {
    return this.pendingRequestContext !== undefined
      ? this.pendingRequestContext
        ? this.resolveIdentifiers(this.pendingRequestContext, this.pendingRequestContext.step)
        : {}
      : this.currentIdentifiers;
  }

  public get currentIdentifiers(): HearingsTelemetryIdentifiers {
    if (!this.journey) {
      return {};
    }
    const identifiers = this.resolveIdentifiers(this.journey.context, this.journey.currentStep);
    // Retain identifiers learned during this page for its eventual duration event,
    // even if the store starts loading another case before NavigationEnd.
    this.journey.context = { ...identifiers };
    return identifiers;
  }

  /** Prepare correlation before guards/resolvers run, without recording an unvisited page. */
  public prepareNavigation(step: string | null, context: HearingsJourneyContext = {}): void {
    const type = STEP_TYPES.get(step);
    if (!type) {
      this.pendingRequestContext = null;
      return;
    }
    context = this.resolveIdentifiers(context, step);
    const startsNewJourney =
      !this.journey ||
      this.hasContextChanged(context) ||
      (this.journey.currentStep.startsWith('/hearings/') && step.startsWith('/cases/'));
    const journeyType =
      this.journey && ((type === 'request' && this.journey.journeyType === 'amend') || type === 'error')
        ? this.journey.journeyType
        : type;
    this.pendingRequestContext = {
      journeyId: startsNewJourney ? this.newJourneyId() : this.journey.journeyId,
      journeyType,
      step,
      page: step,
      ...context,
    };
  }

  public clearPendingNavigation(): void {
    this.pendingRequestContext = undefined;
  }

  public hasContextChanged(next: HearingsJourneyContext): boolean {
    next = this.resolveIdentifiers(next, this.pendingRequestContext?.step || this.journey?.currentStep);
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
    context = this.resolveIdentifiers(context, step);
    if (this.hasContextChanged(context)) {
      this.endJourney('context-changed', now);
    }
    if (!this.journey) {
      this.journey = {
        journeyId: this.pendingRequestContext?.step === step ? this.pendingRequestContext.journeyId : this.newJourneyId(),
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
    this.clearPendingNavigation();
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

  public captureException(
    operation: HearingsOperation,
    requestIdentifiers?: HearingsTelemetryIdentifiers
  ): (error: unknown) => void {
    if (!HEARINGS_OPERATIONS.includes(operation)) {
      return () => {};
    }
    // Snapshot the initiating journey, not whichever case/page is active when a slow request fails.
    const context: Record<string, string> = {
      telemetryArea: 'Hearings',
      operation,
      ...this.monitoring.captureOperationContext?.(),
      ...(this.pendingRequestContext !== undefined
        ? this.pendingRequestContext
          ? { ...this.pendingRequestContext, ...this.requestIdentifiers }
          : { page: 'Hearings' }
        : this.journey
          ? this.properties()
          : { page: 'Hearings' }),
    };
    const supplied = hearingTelemetryIdentifiers(requestIdentifiers);
    const identifiers = mergeHearingsIdentifiers(
      hearingTelemetryIdentifiers(context),
      Object.keys(supplied).length ? this.resolveIdentifiers(supplied, context.step) : {}
    );
    for (const key of ['caseId', 'hearingId', 'jurisdiction']) {
      delete context[key];
    }
    Object.assign(context, identifiers);
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
      ...this.currentIdentifiers,
    };
  }

  private newJourneyId(): string {
    return Array.from(this.browser.crypto.getRandomValues(new Uint32Array(4)), (value) =>
      value.toString(16).padStart(8, '0')
    ).join('');
  }

  private resolveIdentifiers(context: HearingsJourneyContext, step?: string): HearingsTelemetryIdentifiers {
    const route = hearingTelemetryIdentifiers(context);
    let caseInfo: HearingValuesCaseContext | null | undefined;
    let requestCaseId: string | undefined;
    let requestHearingId: string | undefined;
    try {
      this.store
        ?.select((state) => ({
          caseInfo: state?.hearings?.hearingValues?.caseInfo,
          requestCaseId: state?.hearings?.hearingRequest?.hearingRequestMainModel?.caseDetails?.caseRef,
          requestHearingId:
            state?.hearings?.hearingRequest?.hearingRequestMainModel?.requestDetails?.hearingRequestID ||
            state?.hearings?.hearingRequest?.hearingRequestMainModel?.caseDetails?.hearingID,
        }))
        .pipe(take(1))
        .subscribe({
          next: (value) => {
            caseInfo = value.caseInfo;
            requestCaseId = value.requestCaseId;
            requestHearingId = value.requestHearingId;
          },
          error: () => {},
        });
    } catch {
      // Telemetry must not require the lazy Hearings feature or change application state.
    }
    const stored = hearingTelemetryIdentifiers({
      caseId: caseInfo?.caseReference,
      hearingId: caseInfo?.hearingId,
      jurisdiction: caseInfo?.jurisdictionId,
    });
    const type = STEP_TYPES.get(step);
    const existingHearing =
      type && ((type !== 'request' && type !== 'browse') || (type === 'request' && this.journey?.journeyType === 'amend'));
    if (!existingHearing && !route.hearingId) {
      delete stored.hearingId;
    }
    if (
      existingHearing &&
      requestCaseId === (route.caseId || stored.caseId) &&
      (!route.hearingId || route.hearingId === requestHearingId)
    ) {
      stored.hearingId = hearingTelemetryIdentifiers({ hearingId: requestHearingId }).hearingId || stored.hearingId;
    }
    if (
      !stored.caseId ||
      (route.caseId && route.caseId !== stored.caseId) ||
      (route.hearingId && stored.hearingId && route.hearingId !== stored.hearingId) ||
      (route.hearingId && !route.caseId && route.hearingId !== stored.hearingId)
    ) {
      return route;
    }
    return { ...stored, ...route };
  }
}
