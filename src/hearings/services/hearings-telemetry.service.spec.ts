import { HearingsTelemetryAction, HearingsTelemetryService, HearingsValidationCategory } from './hearings-telemetry.service';
import { MonitoringService } from '../../app/services/logger/monitoring.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('Hearings telemetry service', () => {
  let service: HearingsTelemetryService;
  let monitoring: jasmine.SpyObj<MonitoringService>;

  beforeEach(() => {
    monitoring = jasmine.createSpyObj('MonitoringService', ['logEvent', 'logException', 'captureOperationContext']);
    monitoring.captureOperationContext.and.returnValue({});
    service = new HearingsTelemetryService(monitoring, window);
  });

  [
    ['/cases/case-details/:cid/hearings', 'browse'],
    ['/hearings/request/hearing-requirements', 'request'],
    ['/hearings/request/hearing-view-edit-summary', 'amend'],
    ['/hearings/request/hearing-view-summary', 'view'],
    ['/hearings/view/hearing-completed-summary/:id', 'view'],
    ['/hearings/cancel/:hearingId', 'cancel'],
    ['/hearings/link/:caseId/:hearingId/check-your-answers', 'link'],
    ['/hearings/manage-links/:caseId/:hearingGroupRequestId/:hearingId', 'manage-links'],
    ['/hearings/actuals/:id/hearing-timing/:hearingDate', 'actuals'],
    ['/hearings/error', 'error'],
  ].forEach(([step, type]) => {
    it(`should recognize ${type} journeys on direct entry`, () => {
      const state = service.enterStep(step, {}, 0);
      expect(state.journeyType).toBe(type);
      expect(state.currentStep).toBe(step);
      expect(state.actionCount).toBe(0);
      expect(state.journeyId).toMatch(/^[0-9a-f]{32}$/);
      expect(monitoring.logEvent).toHaveBeenCalledTimes(1);
    });
  });

  it('should preserve one anonymous ID while updating type and step from browsing to a request', () => {
    const first = service.enterStep('/cases/case-details/:cid/hearings', { caseId: 'private-case' }, 0);
    service.enterStep('/hearings/request/hearing-stage', {}, 1000);
    expect(service.currentJourney).toEqual({
      journeyId: first.journeyId,
      journeyType: 'request',
      currentStep: '/hearings/request/hearing-stage',
      actionCount: 0,
    });
    expect(monitoring.logEvent).toHaveBeenCalledTimes(1);
  });

  it('should retain the amendment type across shared request steps and the error page', () => {
    service.enterStep('/hearings/request/hearing-view-edit-summary', {}, 0);
    service.enterStep('/hearings/request/hearing-timing', {}, 1000);
    expect(service.currentJourney.journeyType).toBe('amend');
    service.enterStep('/hearings/error', {}, 2000);
    expect(service.currentJourney.journeyType).toBe('amend');
  });

  it('should count only explicitly recorded actions and attach current safe journey metadata', () => {
    const state = service.enterStep('/hearings/request/hearing-stage', {}, 0);
    ['continue', 'back', 'change', 'submit', 'cancel'].forEach((action: HearingsTelemetryAction) => service.recordAction(action));
    expect(service.currentJourney.actionCount).toBe(5);
    expect(monitoring.logEvent.calls.mostRecent().args).toEqual([
      'Hearings.Action',
      { journeyId: state.journeyId, journeyType: 'request', step: state.currentStep, page: state.currentStep, action: 'cancel' },
      { actionCount: 5 },
    ]);
  });

  it('should not count page navigation as an action or accept free-form action values', () => {
    service.enterStep('/hearings/request', {}, 0);
    service.enterStep('/hearings/request/hearing-stage', {}, 1000);
    service.recordAction('private-form-value' as HearingsTelemetryAction);
    expect(service.currentJourney.actionCount).toBe(0);
    expect(monitoring.logEvent.calls.allArgs().filter(([name]) => name === 'Hearings.Action').length).toBe(0);
  });

  it('should reset the ID and action count on a case change without sending context', () => {
    const old = service.enterStep('/cases/case-details/:cid/hearings', { caseId: 'private-case-a' }, 0);
    service.recordAction('continue');
    service.enterStep('/cases/case-details/:cid/hearings', { caseId: 'private-case-b' }, 4000);
    expect(service.currentJourney.journeyId).not.toBe(old.journeyId);
    expect(service.currentJourney.actionCount).toBe(0);
    const duration = monitoring.logEvent.calls.allArgs().find(([name]) => name === 'Hearings.JourneyDuration');
    expect(duration[2]).toEqual({ durationMs: 4000, pageCount: 1, actionCount: 1 });
    expect(JSON.stringify(monitoring.logEvent.calls.allArgs())).not.toContain('private-');
  });

  it('should reset the ID and action count on a hearing change', () => {
    const old = service.enterStep('/hearings/cancel/:hearingId', { hearingId: 'private-hearing-a' }, 0);
    service.recordAction('cancel');
    service.enterStep('/hearings/cancel/:hearingId', { hearingId: 'private-hearing-b' }, 2000);
    expect(service.currentJourney.journeyId).not.toBe(old.journeyId);
    expect(service.currentJourney.actionCount).toBe(0);
    expect(JSON.stringify(monitoring.logEvent.calls.allArgs())).not.toContain('private-');
  });

  it('should clear state at journey end and ignore later actions and duplicate ends', () => {
    service.enterStep('/hearings/request', {}, 0);
    service.recordAction('submit');
    service.endJourney('confirmation', 6000);
    expect(service.currentJourney).toBeNull();
    service.recordAction('continue');
    service.endJourney('destroyed', 7000);
    expect(monitoring.logEvent).toHaveBeenCalledTimes(3);
    expect(monitoring.logEvent.calls.mostRecent().args[2]).toEqual({ durationMs: 6000, pageCount: 1, actionCount: 1 });
  });

  it('should expose a copy without internal case context or mutable service state', () => {
    const context = { caseId: 'private-case' };
    service.enterStep('/hearings/request', context, 0);
    context.caseId = 'changed-externally';
    const snapshot = service.currentJourney;
    Object.assign(snapshot, { actionCount: 100 });
    expect(service.currentJourney.actionCount).toBe(0);
    expect(service.hasContextChanged({ caseId: 'private-case' })).toBeFalse();
    expect(JSON.stringify(snapshot)).not.toContain('private-case');
  });

  it('should reject raw URLs, identifiers, query strings and unknown steps without logging them', () => {
    [
      '/hearings/cancel/private-id',
      '/hearings/request?caseId=private-case',
      'https://example.com/hearings/request',
      '/hearings/private-form-value',
    ].forEach((step) => {
      expect(service.enterStep(step, {}, 0)).toBeNull();
    });
    expect(service.currentJourney).toBeNull();
    expect(monitoring.logEvent).not.toHaveBeenCalled();
  });

  it('should record validation failures with only the current safe journey metadata and numeric count', () => {
    const state = service.enterStep(
      '/hearings/request/hearing-stage',
      { caseId: 'private-case', hearingId: 'private-hearing' },
      0
    );
    service.recordAction('continue');
    service.recordValidationFailure('form', 2);
    expect(monitoring.logEvent.calls.mostRecent().args).toEqual([
      'Hearings.ValidationFailed',
      { journeyId: state.journeyId, journeyType: 'request', step: state.currentStep, page: state.currentStep, category: 'form' },
      { errorCount: 2 },
    ]);
    expect(service.currentJourney.actionCount).toBe(1);
    expect(JSON.stringify(monitoring.logEvent.calls.allArgs())).not.toContain('private-');
  });

  it('should ignore invalid validation categories/counts and validation after journey end', () => {
    service.enterStep('/hearings/request', {}, 0);
    monitoring.logEvent.calls.reset();
    service.recordValidationFailure('private-error-message' as HearingsValidationCategory, 1);
    [0, -1, NaN, Infinity, 1.5].forEach((count) => service.recordValidationFailure('form', count));
    expect(monitoring.logEvent).not.toHaveBeenCalled();
    service.endJourney('left-hearings', 1000);
    monitoring.logEvent.calls.reset();
    service.recordValidationFailure('form');
    expect(monitoring.logEvent).not.toHaveBeenCalled();
  });

  it('should retain the original Error and stack and snapshot the initiating operation context', () => {
    const first = service.enterStep('/hearings/cancel/:hearingId', { hearingId: 'private-a' }, 0);
    const report = service.captureException('cancelHearingRequest');
    const error = new TypeError('private-message');
    const stack = error.stack;
    service.enterStep('/hearings/cancel/:hearingId', { hearingId: 'private-b' }, 1000);
    report(error);
    expect(monitoring.logException.calls.first().args[0]).toBe(error);
    expect(error.stack).toBe(stack);
    expect(monitoring.logException.calls.first().args[1]).toEqual({
      telemetryArea: 'Hearings',
      operation: 'cancelHearingRequest',
      journeyId: first.journeyId,
      journeyType: 'cancel',
      step: '/hearings/cancel/:hearingId',
      page: '/hearings/cancel/:hearingId',
    });
  });

  it('should preserve HTTP status without copying the downstream body, headers or URL', () => {
    const error = new HttpErrorResponse({
      status: 503,
      url: '/api/hearings/private-id',
      error: { privateName: 'private-person' },
    });
    service.captureException('loadHearingRequest')(error);
    const [exception, properties] = monitoring.logException.calls.first().args;
    expect(exception.name).toBe('HttpErrorResponse');
    expect(exception.stack).toBeUndefined();
    expect(properties.httpStatus).toBe(503);
    expect(properties.operation).toBe('loadHearingRequest');
    expect(exception['error']).toBeUndefined();
    expect(exception['url']).toBeUndefined();
    expect(error.error).toEqual({ privateName: 'private-person' });
  });

  it('should retain status zero for network errors and safely handle unknown failures', () => {
    service.captureException('getAllHearings')(new HttpErrorResponse({ status: 0 }));
    expect(monitoring.logException.calls.first().args[1].httpStatus).toBe(0);
    expect(() => service.captureException('navigate')('private-server-response')).not.toThrow();
    expect(monitoring.logException.calls.mostRecent().args[0].message).toBe('navigate failed');
    expect(monitoring.logException.calls.mostRecent().args[0].stack).toBeUndefined();
  });

  it('should retain the native operation IDs captured before a slow failure', () => {
    monitoring.captureOperationContext.and.returnValue({ operationId: 'a'.repeat(32), operationParentId: 'b'.repeat(16) });
    const report = service.captureException('loadHearingRequest');
    monitoring.captureOperationContext.and.returnValue({ operationId: 'c'.repeat(32), operationParentId: 'd'.repeat(16) });
    report(new Error('original'));
    expect(monitoring.logException.calls.first().args[1]).toEqual(
      jasmine.objectContaining({ operationId: 'a'.repeat(32), operationParentId: 'b'.repeat(16) })
    );
  });
});
