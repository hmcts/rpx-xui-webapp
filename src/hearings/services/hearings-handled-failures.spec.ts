import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, throwError } from 'rxjs';
import { SessionStorageService } from '../../app/services';
import { MonitoringService } from '../../app/services/logger/monitoring.service';
import { HearingCategory } from '../models/hearings.enum';
import { CaseFlagsResolver } from '../resolvers/case-flags.resolver';
import { CourtLocationsDataResolver } from '../resolvers/court-locations-resolver.resolve';
import { JudicialUserSearchResolver } from '../resolvers/judicial-user-search-resolver.resolve';
import { JudicialUserSearchResponseResolver } from '../resolvers/judicial-user-search-response-resolver.resolve';
import { PanelMemberSearchResponseResolver } from '../resolvers/panel-member-search-response-resolver';
import { RefDataResolver } from '../resolvers/ref-data-resolver.resolve';
import * as fromHearingStore from '../store';
import { HearingListEffects } from '../store/effects/hearing-list.effects';
import { CaseFlagsRefDataService } from './case-flags-ref-data.service';
import { reportHearingsApiErrors } from './hearings-api-error-telemetry';
import { HearingsTelemetryService } from './hearings-telemetry.service';
import { HearingsService } from './hearings.service';
import { JudicialRefDataService } from './judicial-ref-data.service';
import { LocationsDataService } from './locations-data.service';
import { LovRefDataService } from './lov-ref-data.service';

describe('Handled Hearings failures', () => {
  let http: jasmine.SpyObj<HttpClient>;
  let monitoring: jasmine.SpyObj<MonitoringService>;
  let telemetry: HearingsTelemetryService;
  let store: jasmine.SpyObj<Store<fromHearingStore.State>>;
  let router: jasmine.SpyObj<Router>;
  let storage: jasmine.SpyObj<SessionStorageService>;
  let error: HttpErrorResponse;

  beforeEach(() => {
    http = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    monitoring = jasmine.createSpyObj('MonitoringService', ['logEvent', 'logException', 'captureOperationContext']);
    monitoring.captureOperationContext.and.returnValue({ operationId: 'a'.repeat(32) });
    telemetry = new HearingsTelemetryService(monitoring, window);
    telemetry.enterStep('/hearings/request/hearing-stage', { caseId: 'private-case' }, 0);
    store = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    router.navigate.and.returnValue(Promise.resolve(true));
    storage = jasmine.createSpyObj('SessionStorageService', ['getItem', 'setItem']);
    error = new HttpErrorResponse({
      status: 503,
      statusText: 'Unavailable',
      url: '/api/private-case/private-hearing',
      error: { caseName: 'private-person', requestBody: 'private-form-values' },
    });
    http.get.and.returnValue(throwError(() => error));
    http.post.and.returnValue(throwError(() => error));
  });

  function expectReported(operation: string): void {
    expect(monitoring.logException).toHaveBeenCalledTimes(1);
    const [exception, properties] = monitoring.logException.calls.first().args;
    expect(properties).toEqual(jasmine.objectContaining({ telemetryArea: 'Hearings', operation, httpStatus: 503 }));
    expect(properties.step).toBe('/hearings/request/hearing-stage');
    const diagnostics = Object.fromEntries(
      Object.entries(properties).filter(([key]) => !['caseId', 'hearingId', 'jurisdiction'].includes(key))
    );
    expect(JSON.stringify(diagnostics)).not.toContain('private-');
    expect(exception['error']).toBeUndefined();
    expect(exception['url']).toBeUndefined();
  }

  it('captures a handled NgRx API failure once and preserves its original failure action', () => {
    const actions = new Subject<fromHearingStore.LoadAllHearings>();
    const effects = new HearingListEffects(new Actions(actions), new HearingsService(http, telemetry), store);
    const received = jasmine.createSpy('received');
    const subscription = effects.loadHearingList$.subscribe(received);
    actions.next(new fromHearingStore.LoadAllHearings('private-case'));
    expect(received).toHaveBeenCalledOnceWith(new fromHearingStore.LoadAllHearingsFailure(error));
    expectReported('getAllHearings');
    subscription.unsubscribe();
  });

  it('reports reference data errors before the resolver returns null and navigates to the error page', () => {
    const resolver = new RefDataResolver(new LovRefDataService(http, telemetry), store, router, storage);
    const received = jasmine.createSpy('received');
    resolver.getReferenceData$('private-service', HearingCategory.HearingPriority, false).subscribe(received);
    expect(received).toHaveBeenCalledOnceWith(null);
    expect(router.navigate).toHaveBeenCalledOnceWith(['/hearings/error']);
    expectReported('getListOfValues');
  });

  it('reports case flag errors while preserving the navigation fallback', async () => {
    const resolver = new CaseFlagsResolver(new CaseFlagsRefDataService(http, telemetry), store, router);
    spyOn(resolver, 'getServiceId$').and.returnValue(of('private-service'));
    const received = jasmine.createSpy('received');
    resolver.resolve().subscribe(received);
    await Promise.resolve();
    expect(received).toHaveBeenCalledOnceWith(true);
    expect(router.navigate).toHaveBeenCalledOnceWith(['/hearings/error']);
    expectReported('getCaseFlagsRefData');
  });

  it('reports court location errors even when the resolver completes without emitting', () => {
    const resolver = new CourtLocationsDataResolver(new LocationsDataService(http, telemetry), store);
    const received = jasmine.createSpy('received');
    const completed = jasmine.createSpy('completed');
    resolver.getCourtLocationData$('private-location').subscribe({ next: received, complete: completed });
    expect(received).not.toHaveBeenCalled();
    expect(completed).toHaveBeenCalledTimes(1);
    expectReported('getLocationById');
  });

  [JudicialUserSearchResolver, JudicialUserSearchResponseResolver].forEach((Resolver) => {
    it(`reports ${Resolver.name} errors and preserves the failure payload and empty-array fallback`, () => {
      const resolver = new Resolver(new JudicialRefDataService(http, telemetry), store);
      const received = jasmine.createSpy('received');
      resolver.getUsersData$(['private-personal-code']).subscribe(received);
      expect(received).toHaveBeenCalledOnceWith([]);
      expect(store.dispatch).toHaveBeenCalledOnceWith(new fromHearingStore.GetHearingJudicialUsersFailure(error.error));
      expectReported('searchJudicialUserByPersonalCodes');
    });
  });

  it('reports panel member errors without changing its no-emission fallback', () => {
    const resolver = new PanelMemberSearchResponseResolver(new JudicialRefDataService(http, telemetry), store);
    const received = jasmine.createSpy('received');
    const completed = jasmine.createSpy('completed');
    resolver.getUsersData$(['private-personal-code']).subscribe({ next: received, complete: completed });
    expect(received).not.toHaveBeenCalled();
    expect(completed).toHaveBeenCalledTimes(1);
    expectReported('searchJudicialUserByPersonalCodes');
  });

  it('associates a slow resolver failure with its original journey and operation', () => {
    const response = new Subject<never>();
    http.get.and.returnValue(response);
    const journey = telemetry.currentJourney;
    const resolver = new RefDataResolver(new LovRefDataService(http, telemetry), store, router, storage);
    resolver.getReferenceData$('private-service', HearingCategory.HearingPriority, false).subscribe();
    telemetry.enterStep('/hearings/cancel/:hearingId', { caseId: 'another-case', hearingId: 'another-hearing' }, 100);
    monitoring.captureOperationContext.and.returnValue({ operationId: 'b'.repeat(32) });
    response.error(error);
    expect(monitoring.logException.calls.first().args[1]).toEqual(
      jasmine.objectContaining({ journeyId: journey.journeyId, step: journey.currentStep, operationId: 'a'.repeat(32) })
    );
  });

  it('reports each separate attempt even when the same error object is reused', () => {
    const request = new LovRefDataService(http, telemetry).getListOfValues('category', 'service');
    const received = jasmine.createSpy('received');
    request.subscribe({ error: received });
    request.subscribe({ error: received });
    expect(received).toHaveBeenCalledTimes(2);
    expect(received.calls.allArgs()).toEqual([[error], [error]]);
    expect(monitoring.logException).toHaveBeenCalledTimes(2);
  });

  it('does not log successful reference-data calls or change their result', () => {
    const result = [{ key: 'normal', value_en: 'Normal' }];
    http.get.and.returnValue(of(result));
    const received = jasmine.createSpy('received');
    new LovRefDataService(http, telemetry).getListOfValues('category', 'service').subscribe(received);
    expect(received).toHaveBeenCalledOnceWith(result);
    expect(monitoring.logException).not.toHaveBeenCalled();
  });

  it('preserves resolver recovery when telemetry initialization or reporting fails', () => {
    const capture = spyOn(telemetry, 'captureException').and.throwError('Initialization failed');
    const resolver = new RefDataResolver(new LovRefDataService(http, telemetry), store, router, storage);
    const received = jasmine.createSpy('received');
    resolver.getReferenceData$('service', HearingCategory.HearingPriority, false).subscribe(received);
    capture.and.returnValue(() => {
      throw new Error('Reporting failed');
    });
    resolver.getReferenceData$('service', HearingCategory.HearingPriority, false).subscribe(received);
    expect(received.calls.allArgs()).toEqual([[null], [null]]);
    expect(router.navigate).toHaveBeenCalledTimes(2);
  });

  it('preserves the original exception and stack and does not require telemetry', () => {
    const original = new Error('Private application failure');
    const received = jasmine.createSpy('received');
    const request: Observable<never> = throwError(() => original);
    request.pipe(reportHearingsApiErrors(telemetry, 'getListOfValues')).subscribe({ error: received });
    expect(received).toHaveBeenCalledOnceWith(original);
    expect(monitoring.logException.calls.first().args[0]).toBe(original);
    expect(monitoring.logException.calls.first().args[0].stack).toBe(original.stack);
    received.calls.reset();
    request.pipe(reportHearingsApiErrors(null, 'getListOfValues')).subscribe({ error: received });
    expect(received).toHaveBeenCalledOnceWith(original);
  });
});
