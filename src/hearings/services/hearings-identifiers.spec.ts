import { Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { MonitoringService } from '../../app/services/logger/monitoring.service';
import { HearingsTelemetryService, HearingsTelemetryStoreState } from './hearings-telemetry.service';

describe('Hearings permitted telemetry identifiers', () => {
  let state: BehaviorSubject<HearingsTelemetryStoreState>;
  let telemetry: HearingsTelemetryService;
  let monitoring: jasmine.SpyObj<MonitoringService>;
  let store: Store<HearingsTelemetryStoreState>;

  function caseState(caseId = '1234567890123456', jurisdiction = 'SSCS', hearingId?: string): HearingsTelemetryStoreState {
    return {
      hearings: {
        hearingValues: { caseInfo: { caseReference: caseId, jurisdictionId: jurisdiction } },
        hearingRequest: {
          hearingRequestMainModel: { caseDetails: { caseRef: caseId }, requestDetails: { hearingRequestID: hearingId } },
        },
      },
    };
  }

  beforeEach(() => {
    state = new BehaviorSubject(caseState());
    store = { select: (selector) => state.pipe(map(selector)) } as unknown as Store<HearingsTelemetryStoreState>;
    monitoring = jasmine.createSpyObj('MonitoringService', ['logEvent', 'logException', 'captureOperationContext']);
    monitoring.captureOperationContext.and.returnValue({});
    telemetry = new HearingsTelemetryService(
      monitoring,
      window,
      Injector.create({ providers: [{ provide: Store, useValue: store }] })
    );
  });

  it('records case and jurisdiction on starts, actions, validation and journey-duration events', () => {
    telemetry.enterStep('/hearings/request/hearing-stage', {}, 0);
    telemetry.recordAction('continue');
    telemetry.recordValidationFailure('form', 2);
    telemetry.endJourney('left-hearings', 100);
    expect(monitoring.logEvent.calls.allArgs().map(([name]) => name)).toEqual([
      'Hearings.JourneyStarted',
      'Hearings.Action',
      'Hearings.ValidationFailed',
      'Hearings.JourneyAbandoned',
      'Hearings.JourneyDuration',
    ]);
    monitoring.logEvent.calls.allArgs().forEach(([, properties]) => {
      expect(properties.caseId).toBe('1234567890123456');
      expect(properties.jurisdiction).toBe('SSCS');
      expect(properties.hearingId).toBeUndefined();
    });
  });

  it('records the existing hearing ID for matching view/amend data only', () => {
    state.next(caseState('case-a', 'CIVIL', 'hearing-a'));
    telemetry.enterStep('/hearings/request/hearing-view-edit-summary', {}, 0);
    telemetry.recordAction('change');
    expect(monitoring.logEvent.calls.mostRecent().args[1]).toEqual(
      jasmine.objectContaining({ caseId: 'case-a', hearingId: 'hearing-a', jurisdiction: 'CIVIL' })
    );
  });

  it('does not reuse a previous hearing when starting a new request or browsing a case list', () => {
    const value = caseState('case-a', 'CIVIL', 'old-hearing');
    value.hearings.hearingValues.caseInfo.hearingId = 'old-hearing';
    state.next(value);
    telemetry.enterStep('/hearings/request/hearing-stage', {}, 0);
    expect(telemetry.requestIdentifiers.hearingId).toBeUndefined();
    telemetry.endJourney('left-hearings', 10);
    telemetry.enterStep('/cases/case-details/:cid/hearings', { caseId: 'case-a' }, 20);
    expect(telemetry.requestIdentifiers.hearingId).toBeUndefined();
  });

  it('does not include the amended hearing ID in metadata prepared for the case list', () => {
    state.next(caseState('case-a', 'CIVIL', 'hearing-a'));
    telemetry.enterStep('/hearings/request/hearing-view-edit-summary', {}, 0);
    telemetry.prepareNavigation('/cases/case-details/:cid/hearings', { caseId: 'case-a' });
    expect(telemetry.requestIdentifiers).toEqual({ caseId: 'case-a', jurisdiction: 'CIVIL' });
  });

  it('does not attach old store identifiers or jurisdiction to a different routed case/hearing', () => {
    state.next(caseState('case-a', 'SSCS', 'hearing-a'));
    telemetry.enterStep('/hearings/cancel/:hearingId', { caseId: 'case-b', hearingId: 'hearing-b' }, 0);
    expect(telemetry.currentIdentifiers).toEqual({ caseId: 'case-b', hearingId: 'hearing-b' });
  });

  it('only enriches a direct hearing entry when its loaded case/hearing match', () => {
    state.next(caseState('case-a', 'SSCS', 'hearing-a'));
    telemetry.enterStep('/hearings/cancel/:hearingId', { hearingId: 'hearing-b' }, 0);
    expect(telemetry.currentIdentifiers).toEqual({ hearingId: 'hearing-b' });
    state.next(caseState('case-b', 'CIVIL', 'hearing-b'));
    expect(telemetry.currentIdentifiers).toEqual({ caseId: 'case-b', hearingId: 'hearing-b', jurisdiction: 'CIVIL' });
  });

  it('snapshots all identifiers for slow exceptions after navigating to another case', () => {
    state.next(caseState('case-a', 'SSCS', 'hearing-a'));
    telemetry.enterStep('/hearings/request/hearing-view-summary', {}, 0);
    const report = telemetry.captureException('loadHearingRequest');
    state.next(caseState('case-b', 'CIVIL', 'hearing-b'));
    telemetry.enterStep('/hearings/request/hearing-view-summary', {}, 10);
    report(Object.assign(new Error('private-message'), { status: 503, error: { caseName: 'private-person' } }));
    expect(monitoring.logException.calls.first().args[1]).toEqual(
      jasmine.objectContaining({ caseId: 'case-a', hearingId: 'hearing-a', jurisdiction: 'SSCS', httpStatus: 503 })
    );
    expect(telemetry.currentIdentifiers).toEqual({ caseId: 'case-b', hearingId: 'hearing-b', jurisdiction: 'CIVIL' });
  });

  it('restores the original context after cancelled navigation and keeps pending request metadata separate', () => {
    telemetry.enterStep('/hearings/request/hearing-stage', {}, 0);
    state.next(caseState('case-b', 'CIVIL', 'hearing-b'));
    telemetry.prepareNavigation('/hearings/cancel/:hearingId', { caseId: 'case-b', hearingId: 'hearing-b' });
    expect(telemetry.requestIdentifiers).toEqual({ caseId: 'case-b', hearingId: 'hearing-b', jurisdiction: 'CIVIL' });
    expect(telemetry.currentIdentifiers).toEqual({ caseId: '1234567890123456', jurisdiction: 'SSCS' });
    telemetry.clearPendingNavigation();
    expect(telemetry.requestIdentifiers).toEqual({ caseId: '1234567890123456', jurisdiction: 'SSCS' });
  });

  it('uses explicit API target identifiers instead of carrying a previous case into an error', () => {
    state.next(caseState('case-a', 'SSCS', 'hearing-a'));
    telemetry.enterStep('/hearings/request/hearing-view-summary', {}, 0);
    const report = telemetry.captureException('loadHearingRequest', { caseId: 'case-b', hearingId: 'hearing-b' });
    report(new Error('private-error'));
    const properties = monitoring.logException.calls.first().args[1];
    expect(properties.caseId).toBe('case-b');
    expect(properties.hearingId).toBe('hearing-b');
    expect(properties.jurisdiction).toBeUndefined();
    expect(telemetry.currentIdentifiers).toEqual({ caseId: 'case-a', hearingId: 'hearing-a', jurisdiction: 'SSCS' });
  });

  it('adds a matching API target jurisdiction even while the previous page remains active', () => {
    state.next(caseState('case-a', 'SSCS', 'hearing-a'));
    telemetry.enterStep('/hearings/request/hearing-view-summary', {}, 0);
    state.next(caseState('case-b', 'CIVIL', 'hearing-b'));
    telemetry.captureException('loadHearingRequest', { caseId: 'case-b', hearingId: 'hearing-b' })(new Error('Failure'));
    expect(monitoring.logException.calls.first().args[1]).toEqual(
      jasmine.objectContaining({ caseId: 'case-b', hearingId: 'hearing-b', jurisdiction: 'CIVIL' })
    );
  });

  it('retains late-loaded jurisdiction for the departing case rather than reading the new case store', () => {
    state.next({});
    telemetry.enterStep('/cases/case-details/:cid/hearings', { caseId: 'case-a' }, 0);
    state.next(caseState('case-a', 'SSCS'));
    telemetry.recordAction('continue');
    state.next(caseState('case-b', 'CIVIL'));
    telemetry.endJourney('context-changed', 10);
    expect(monitoring.logEvent.calls.mostRecent().args[1]).toEqual(
      jasmine.objectContaining({ caseId: 'case-a', jurisdiction: 'SSCS' })
    );
  });

  it('filters unexpected properties and invalid identifier values without requiring the store', () => {
    const plain = new HearingsTelemetryService(monitoring, window);
    const context = {
      caseId: 'case-a',
      hearingId: 'hearing-a',
      jurisdiction: 'SSCS',
      caseName: 'private-name',
      formValue: 'private-value',
      body: { private: true },
    };
    plain.enterStep('/hearings/cancel/:hearingId', context, 0);
    expect(plain.currentIdentifiers).toEqual({ caseId: 'case-a', hearingId: 'hearing-a', jurisdiction: 'SSCS' });
    expect(JSON.stringify(monitoring.logEvent.calls.allArgs())).not.toContain('private-');
  });

  it('keeps telemetry non-blocking if the lazy store is absent or emits an error', () => {
    const unavailable = {
      select: () => throwError(() => new Error('Store unavailable')),
    } as unknown as Store<HearingsTelemetryStoreState>;
    const plain = new HearingsTelemetryService(
      monitoring,
      window,
      Injector.create({ providers: [{ provide: Store, useValue: unavailable }] })
    );
    expect(() => plain.enterStep('/hearings/cancel/:hearingId', { caseId: 'case-a', hearingId: 'hearing-a' }, 0)).not.toThrow();
    expect(plain.currentIdentifiers).toEqual({ caseId: 'case-a', hearingId: 'hearing-a' });
  });

  it('does not construct the store while constructing telemetry', () => {
    const createStore = jasmine.createSpy('createStore').and.returnValue(store);
    const injector = Injector.create({ providers: [{ provide: Store, useFactory: createStore }] });
    const plain = new HearingsTelemetryService(monitoring, window, injector);
    expect(createStore).not.toHaveBeenCalled();
    plain.enterStep('/hearings/request/hearing-stage', {}, 0);
    expect(createStore).toHaveBeenCalledTimes(1);
    expect(plain.currentIdentifiers).toEqual({ caseId: '1234567890123456', jurisdiction: 'SSCS' });
  });

  it('preserves route identifiers when the injector has no store provider', () => {
    const plain = new HearingsTelemetryService(monitoring, window, Injector.create({ providers: [] }));
    expect(() => plain.enterStep('/hearings/cancel/:hearingId', { caseId: 'case-a', hearingId: 'hearing-a' }, 0)).not.toThrow();
    expect(plain.currentIdentifiers).toEqual({ caseId: 'case-a', hearingId: 'hearing-a' });
  });

  it('keeps telemetry non-blocking if store construction fails', () => {
    const injector = Injector.create({
      providers: [
        {
          provide: Store,
          useFactory: () => {
            throw new Error('Store unavailable');
          },
        },
      ],
    });
    const plain = new HearingsTelemetryService(monitoring, window, injector);
    expect(() => plain.enterStep('/hearings/cancel/:hearingId', { caseId: 'case-a', hearingId: 'hearing-a' }, 0)).not.toThrow();
    expect(plain.currentIdentifiers).toEqual({ caseId: 'case-a', hearingId: 'hearing-a' });
  });
});
