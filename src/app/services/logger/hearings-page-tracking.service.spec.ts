import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter, Router, Routes } from '@angular/router';
import { HearingsPageTrackingService, initializeHearingsPageTracking } from './hearings-page-tracking.service';
import { MonitoringService } from './monitoring.service';
import { HearingsTelemetryService } from '../../../hearings/services/hearings-telemetry.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

@Component({ template: '' })
class TestPageComponent {}

describe('Hearings page tracking', () => {
  let router: Router;
  let service: HearingsPageTrackingService;
  let monitoring: jasmine.SpyObj<MonitoringService>;
  let clock: jasmine.Spy;
  let resolverJourneyId: string | null;

  const routes: Routes = [
    { path: 'work', component: TestPageComponent },
    { path: 'legacy/:hearingId', redirectTo: 'hearings/cancel/:hearingId' },
    {
      path: 'hearings',
      loadChildren: async () => [
        {
          path: 'request',
          children: [
            { path: '', component: TestPageComponent },
            { path: 'hearing-stage', component: TestPageComponent },
            { path: 'hearing-confirmation', component: TestPageComponent },
          ],
        },
        {
          path: 'cancel/:hearingId',
          component: TestPageComponent,
          resolve: {
            correlation: () => {
              resolverJourneyId = inject(HearingsTelemetryService).requestJourneyId;
              return true;
            },
          },
        },
        { path: 'link/:caseId/:hearingId/check-your-answers', component: TestPageComponent },
        { path: 'manage-links/:caseId/:hearingGroupRequestId/:hearingId', component: TestPageComponent },
        { path: 'actuals/:id/hearing-timing/:hearingDate', component: TestPageComponent },
        { path: 'view/hearing-completed-summary/:id', component: TestPageComponent },
        { path: 'blocked', component: TestPageComponent, canActivate: [() => false] },
        { path: '**', component: TestPageComponent },
      ],
    },
    {
      path: 'cases/case-details/:cid',
      children: [
        {
          path: '',
          children: [
            { path: 'hearings', component: TestPageComponent },
            { path: 'tasks', component: TestPageComponent },
          ],
        },
      ],
    },
    { path: 'cases/case-details/:jurisdiction/:caseType/:cid/hearings', component: TestPageComponent },
  ];

  beforeEach(() => {
    monitoring = jasmine.createSpyObj('MonitoringService', ['logPageView', 'logEvent']);
    clock = spyOn(window.performance, 'now').and.returnValue(0);
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideLocationMocks(),
        provideMockStore({ initialState: {} }),
        { provide: MonitoringService, useValue: monitoring },
        { provide: Window, useValue: window },
      ],
    });
    router = TestBed.inject(Router);
    service = TestBed.inject(HearingsPageTrackingService);
    initializeHearingsPageTracking(service)();
  });

  afterEach(() => service.ngOnDestroy());

  it('adds matched typed case context to page views without retaining the previous case jurisdiction', async () => {
    const store = TestBed.inject(MockStore);
    store.setState({ hearings: { hearingValues: { caseInfo: { caseReference: 'case-a', jurisdictionId: 'SSCS' } } } });
    await router.navigateByUrl('/cases/case-details/case-a/hearings');
    store.setState({ hearings: { hearingValues: { caseInfo: { caseReference: 'case-b', jurisdictionId: 'CIVIL' } } } });
    await router.navigateByUrl('/cases/case-details/case-b/hearings');
    await router.navigateByUrl('/work');
    expect(monitoring.logPageView.calls.allArgs().map((args) => args[2])).toEqual([
      { journeyId: jasmine.any(String), caseId: 'case-a', jurisdiction: 'SSCS' },
      { journeyId: jasmine.any(String), caseId: 'case-b', jurisdiction: 'CIVIL' },
    ]);
  });

  it('prepares the destination journey for resolvers on direct entry and hearing switches', async () => {
    await router.navigateByUrl('/hearings/cancel/private-a');
    const telemetry = TestBed.inject(HearingsTelemetryService);
    const first = telemetry.currentJourney.journeyId;
    expect(resolverJourneyId).toBe(first);
    await router.navigateByUrl('/hearings/cancel/private-b');
    expect(resolverJourneyId).not.toBe(first);
    expect(resolverJourneyId).toBe(telemetry.currentJourney.journeyId);
  });

  [
    ['/hearings/request', '/hearings/request'],
    ['/hearings/request/hearing-stage', '/hearings/request/hearing-stage'],
    ['/hearings/cancel/private-hearing?caseId=private-case#private-name', '/hearings/cancel/:hearingId'],
    ['/hearings/link/private-case/private-hearing/check-your-answers', '/hearings/link/:caseId/:hearingId/check-your-answers'],
    [
      '/hearings/manage-links/private-case/private-group/private-hearing',
      '/hearings/manage-links/:caseId/:hearingGroupRequestId/:hearingId',
    ],
    ['/hearings/actuals/private-hearing/hearing-timing/2026-10-09', '/hearings/actuals/:id/hearing-timing/:hearingDate'],
    ['/hearings/view/hearing-completed-summary/private-hearing', '/hearings/view/hearing-completed-summary/:id'],
    ['/cases/case-details/private-case/hearings', '/cases/case-details/:cid/hearings'],
    [
      '/cases/case-details/private-jurisdiction/private-type/private-case/hearings',
      '/cases/case-details/:jurisdiction/:caseType/:cid/hearings',
    ],
  ].forEach(([url, normalizedPath]) => {
    it(`should track only the configured route template for ${normalizedPath}`, async () => {
      await router.navigateByUrl(url);
      expect(monitoring.logPageView).not.toHaveBeenCalled();
      await router.navigateByUrl('/work');
      expect(monitoring.logPageView).toHaveBeenCalledOnceWith(
        `Hearings: ${normalizedPath}`,
        normalizedPath,
        {
          journeyId: jasmine.any(String),
          ...(url.includes('private-case') ? { caseId: 'private-case' } : {}),
          ...(url.includes('private-hearing') ? { hearingId: 'private-hearing' } : {}),
          ...(url.includes('private-jurisdiction') ? { jurisdiction: 'private-jurisdiction' } : {}),
        },
        undefined,
        0
      );
      expect(JSON.stringify(monitoring.logPageView.calls.allArgs())).not.toContain('private-name');
      expect(JSON.stringify(monitoring.logPageView.calls.allArgs())).not.toContain('private-type');
      expect(JSON.stringify(monitoring.logPageView.calls.allArgs())).not.toContain('2026-10-09');
    });
  });

  it('should track only the final destination of redirects', async () => {
    await router.navigateByUrl('/legacy/private-hearing');
    await router.navigateByUrl('/work');
    expect(monitoring.logPageView).toHaveBeenCalledOnceWith(
      'Hearings: /hearings/cancel/:hearingId',
      '/hearings/cancel/:hearingId',
      { journeyId: jasmine.any(String), hearingId: 'private-hearing' },
      undefined,
      0
    );
  });

  it('should track separate hearing visits even when the normalized route is unchanged', async () => {
    await router.navigateByUrl('/hearings/cancel/hearing-a');
    await router.navigateByUrl('/hearings/cancel/hearing-b');
    await router.navigateByUrl('/work');
    expect(monitoring.logPageView).toHaveBeenCalledTimes(2);
    expect(monitoring.logPageView.calls.allArgs()).toEqual([
      [
        'Hearings: /hearings/cancel/:hearingId',
        '/hearings/cancel/:hearingId',
        { journeyId: jasmine.any(String), hearingId: 'hearing-a' },
        undefined,
        0,
      ],
      [
        'Hearings: /hearings/cancel/:hearingId',
        '/hearings/cancel/:hearingId',
        { journeyId: jasmine.any(String), hearingId: 'hearing-b' },
        undefined,
        0,
      ],
    ]);
  });

  it('should not track non-Hearings pages, rejected navigation, or wildcard routes', async () => {
    await router.navigateByUrl('/work');
    await router.navigateByUrl('/cases/case-details/private-case/tasks');
    await router.navigateByUrl('/hearings/blocked');
    await router.navigateByUrl('/hearings/private-unknown-path');
    expect(monitoring.logPageView).not.toHaveBeenCalled();
  });

  it('should not subscribe more than once', async () => {
    service.start();
    service.start();
    await router.navigateByUrl('/hearings/request');
    await router.navigateByUrl('/work');
    expect(monitoring.logPageView).toHaveBeenCalledTimes(1);
  });

  it('should track the current page if started after navigation', async () => {
    service.ngOnDestroy();
    await router.navigateByUrl('/hearings/request');
    const lateService = new HearingsPageTrackingService(router, monitoring, window, TestBed.inject(HearingsTelemetryService));
    lateService.start();
    lateService.start();
    await router.navigateByUrl('/work');
    expect(monitoring.logPageView).toHaveBeenCalledOnceWith(
      'Hearings: /hearings/request',
      '/hearings/request',
      { journeyId: jasmine.any(String) },
      undefined,
      0
    );
    lateService.ngOnDestroy();
  });

  it('should stop tracking after destruction', async () => {
    service.ngOnDestroy();
    await router.navigateByUrl('/hearings/request');
    expect(monitoring.logPageView).not.toHaveBeenCalled();
  });

  it('should record page durations and total elapsed journey time without double-counting visits', async () => {
    await router.navigateByUrl('/hearings/request');
    clock.and.returnValue(5000);
    await router.navigateByUrl('/hearings/request/hearing-stage');
    clock.and.returnValue(9000);
    await router.navigateByUrl('/work');
    const journeyId = monitoring.logEvent.calls.first().args[1].journeyId;
    expect(monitoring.logPageView.calls.allArgs()).toEqual([
      ['Hearings: /hearings/request', '/hearings/request', { journeyId }, undefined, 5000],
      ['Hearings: /hearings/request/hearing-stage', '/hearings/request/hearing-stage', { journeyId }, undefined, 4000],
    ]);
    expect(monitoring.logEvent.calls.mostRecent().args).toEqual([
      'Hearings.JourneyDuration',
      {
        journeyId,
        journeyType: 'request',
        step: '/hearings/request/hearing-stage',
        page: '/hearings/request/hearing-stage',
        startPage: '/hearings/request',
        endReason: 'left-hearings',
      },
      { durationMs: 9000, pageCount: 2, actionCount: 0 },
    ]);
  });

  it('should end journey timing at confirmation and still measure time on the confirmation page', async () => {
    await router.navigateByUrl('/hearings/request');
    clock.and.returnValue(7000);
    await router.navigateByUrl('/hearings/request/hearing-confirmation');
    expect(monitoring.logEvent.calls.mostRecent().args).toEqual([
      'Hearings.JourneyDuration',
      jasmine.objectContaining({ endReason: 'confirmation' }),
      { durationMs: 7000, pageCount: 2, actionCount: 0 },
    ]);
    clock.and.returnValue(10000);
    await router.navigateByUrl('/work');
    expect(monitoring.logPageView.calls.mostRecent().args[4]).toBe(3000);
    expect(monitoring.logEvent.calls.allArgs().filter(([name]) => name === 'Hearings.JourneyDuration').length).toBe(1);
  });

  it('should split case journeys without putting their context into telemetry', async () => {
    await router.navigateByUrl('/cases/case-details/private-case-a/hearings');
    clock.and.returnValue(4000);
    await router.navigateByUrl('/cases/case-details/private-case-b/hearings');
    clock.and.returnValue(7000);
    await router.navigateByUrl('/work');
    const durations = monitoring.logEvent.calls.allArgs().filter(([name]) => name === 'Hearings.JourneyDuration');
    expect(durations[0][1].endReason).toBe('context-changed');
    expect(durations[0][2].durationMs).toBe(4000);
    expect(durations[1][2].durationMs).toBe(3000);
    expect(durations[0][1].journeyId).not.toBe(durations[1][1].journeyId);
    expect(durations[0][1].caseId).toBe('private-case-a');
    expect(durations[1][1].caseId).toBe('private-case-b');
  });

  it('should split hearing journeys and preserve their individual durations', async () => {
    await router.navigateByUrl('/hearings/cancel/private-hearing-a');
    clock.and.returnValue(3000);
    await router.navigateByUrl('/hearings/cancel/private-hearing-b');
    clock.and.returnValue(8000);
    await router.navigateByUrl('/work');
    const durations = monitoring.logEvent.calls.allArgs().filter(([name]) => name === 'Hearings.JourneyDuration');
    expect(durations[0][2].durationMs).toBe(3000);
    expect(durations[1][2].durationMs).toBe(5000);
    expect(durations[0][1].journeyId).not.toBe(durations[1][1].journeyId);
    expect(durations[0][1].hearingId).toBe('private-hearing-a');
    expect(durations[1][1].hearingId).toBe('private-hearing-b');
  });

  it('should finalize on pagehide only once and start fresh when restored from browser cache', async () => {
    await router.navigateByUrl('/hearings/request');
    clock.and.returnValue(3500);
    window.dispatchEvent(new Event('pagehide'));
    window.dispatchEvent(new Event('pagehide'));
    expect(monitoring.logPageView).toHaveBeenCalledTimes(1);
    expect(monitoring.logPageView.calls.first().args[4]).toBe(3500);
    expect(monitoring.logEvent.calls.mostRecent().args[1].endReason).toBe('pagehide');
    clock.and.returnValue(6000);
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
    clock.and.returnValue(8000);
    await router.navigateByUrl('/work');
    expect(monitoring.logPageView.calls.mostRecent().args[4]).toBe(2000);
    expect(monitoring.logPageView.calls.first().args[2].journeyId).not.toBe(
      monitoring.logPageView.calls.mostRecent().args[2].journeyId
    );
  });

  it('should not reset timings for query/fragment changes or blocked navigation', async () => {
    await router.navigateByUrl('/hearings/request');
    clock.and.returnValue(2000);
    await router.navigateByUrl('/hearings/request?formValue=private-value#private-name');
    await router.navigateByUrl('/hearings/blocked');
    expect(monitoring.logPageView).not.toHaveBeenCalled();
    clock.and.returnValue(5000);
    await router.navigateByUrl('/work');
    expect(monitoring.logPageView.calls.first().args[4]).toBe(5000);
    expect(JSON.stringify(monitoring.logEvent.calls.allArgs())).not.toContain('private-');
  });

  it('should finalize active timing at destruction and remove browser listeners', async () => {
    await router.navigateByUrl('/hearings/request');
    clock.and.returnValue(2500);
    service.ngOnDestroy();
    window.dispatchEvent(new Event('pagehide'));
    service.ngOnDestroy();
    expect(monitoring.logPageView).toHaveBeenCalledTimes(1);
    expect(monitoring.logPageView.calls.first().args[4]).toBe(2500);
    expect(monitoring.logEvent.calls.mostRecent().args[1].endReason).toBe('destroyed');
  });

  it('should share journey state and explicit action counts with the Hearings telemetry service', async () => {
    const telemetry = TestBed.inject(HearingsTelemetryService);
    await router.navigateByUrl('/hearings/request');
    const journeyId = telemetry.currentJourney.journeyId;
    telemetry.recordAction('continue');
    await router.navigateByUrl('/hearings/request/hearing-stage');
    expect(telemetry.currentJourney).toEqual({
      journeyId,
      journeyType: 'request',
      currentStep: '/hearings/request/hearing-stage',
      actionCount: 1,
    });
    await router.navigateByUrl('/work');
    expect(telemetry.currentJourney).toBeNull();
    expect(monitoring.logEvent.calls.mostRecent().args[2].actionCount).toBe(1);
  });
});
