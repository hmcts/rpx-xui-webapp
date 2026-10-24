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
            {
              path: 'hearing-facilities',
              component: TestPageComponent,
              resolve: {
                failure: () => {
                  throw new Error('private-resolver-error');
                },
              },
            },
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
    monitoring = jasmine.createSpyObj('MonitoringService', [
      'logPageView',
      'logEvent',
      'logMetric',
      'logException',
      'captureOperationContext',
    ]);
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

  [
    ['/hearings/request', '/hearings/request'],
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
  ].forEach(([url, path]) => {
    it(`records one immediate normalized page view for ${path}`, async () => {
      await router.navigateByUrl(url);
      expect(monitoring.logPageView).toHaveBeenCalledOnceWith(
        `Hearings: ${path}`,
        path,
        jasmine.objectContaining({ journeyId: jasmine.any(String), pageVisitId: jasmine.any(String), page: path, step: path })
      );
      expect(monitoring.logMetric).not.toHaveBeenCalled();
      await router.navigateByUrl('/work');
      expect(monitoring.logPageView).toHaveBeenCalledTimes(1);
      expect(monitoring.logMetric).toHaveBeenCalledOnceWith('Hearings.PageDuration', 0, jasmine.objectContaining({ page: path }));
      expect(JSON.stringify(monitoring.logPageView.calls.allArgs())).not.toContain('private-name');
      expect(JSON.stringify(monitoring.logPageView.calls.allArgs())).not.toContain('private-type');
      expect(JSON.stringify(monitoring.logPageView.calls.allArgs())).not.toContain('2026-10-09');
    });
  });

  it('records only the final redirect destination and skips rejected/wildcard/non-Hearings routes', async () => {
    await router.navigateByUrl('/work');
    await router.navigateByUrl('/hearings/blocked');
    await router.navigateByUrl('/hearings/private-unknown-path');
    expect(monitoring.logPageView).not.toHaveBeenCalled();
    await router.navigateByUrl('/legacy/private-hearing');
    expect(monitoring.logPageView).toHaveBeenCalledOnceWith(
      'Hearings: /hearings/cancel/:hearingId',
      '/hearings/cancel/:hearingId',
      jasmine.any(Object)
    );
  });

  it('prepares the same journey ID for direct-entry resolvers and page views', async () => {
    await router.navigateByUrl('/hearings/cancel/hearing-a');
    const first = resolverJourneyId;
    expect(monitoring.logPageView.calls.first().args[2].journeyId).toBe(first);
    await router.navigateByUrl('/hearings/cancel/hearing-b');
    expect(resolverJourneyId).not.toBe(first);
    expect(monitoring.logPageView.calls.mostRecent().args[2].journeyId).toBe(resolverJourneyId);
  });

  it('records each successful query/fragment navigation without logging their values', async () => {
    await router.navigateByUrl('/hearings/request');
    clock.and.returnValue(2000);
    await router.navigateByUrl('/hearings/request?formValue=private-value#private-name');
    await router.navigateByUrl('/hearings/blocked');
    expect(monitoring.logPageView).toHaveBeenCalledTimes(2);
    expect(monitoring.logMetric.calls.first().args[1]).toBe(2000);
    expect(monitoring.logPageView.calls.first().args[2].pageVisitId).not.toBe(
      monitoring.logPageView.calls.mostRecent().args[2].pageVisitId
    );
    expect(JSON.stringify(monitoring.logPageView.calls.allArgs())).not.toContain('private-');
  });

  it('records native page metrics and one outcome/duration pair with the shared journey ID', async () => {
    await router.navigateByUrl('/hearings/request');
    clock.and.returnValue(5000);
    await router.navigateByUrl('/hearings/request/hearing-stage');
    clock.and.returnValue(9000);
    await router.navigateByUrl('/work');
    const journeyId = monitoring.logPageView.calls.first().args[2].journeyId;
    expect(monitoring.logMetric.calls.allArgs().map((args) => args[1])).toEqual([5000, 4000]);
    monitoring.logMetric.calls.allArgs().forEach((args, index) => {
      expect(args[2].journeyId).toBe(journeyId);
      expect(args[2].pageVisitId).toBe(monitoring.logPageView.calls.argsFor(index)[2].pageVisitId);
    });
    const outcomes = monitoring.logEvent.calls.allArgs().filter(([name]) => name === 'Hearings.JourneyAbandoned');
    expect(outcomes.length).toBe(1);
    expect(outcomes[0][1].endReason).toBe('left-hearings');
    expect(outcomes[0][2]).toEqual({ durationMs: 9000, pageCount: 2, actionCount: 0 });
  });

  it('marks confirmation completed once and measures the confirmation-page duration', async () => {
    await router.navigateByUrl('/hearings/request');
    clock.and.returnValue(7000);
    await router.navigateByUrl('/hearings/request/hearing-confirmation');
    expect(monitoring.logEvent.calls.allArgs().filter(([name]) => name === 'Hearings.JourneyCompleted').length).toBe(1);
    clock.and.returnValue(10000);
    await router.navigateByUrl('/work');
    expect(monitoring.logMetric.calls.mostRecent().args[1]).toBe(3000);
    expect(monitoring.logEvent.calls.allArgs().filter(([name]) => name === 'Hearings.JourneyAbandoned').length).toBe(0);
  });

  it('preserves the departing case identifiers when the store switches to another case', async () => {
    const store = TestBed.inject(MockStore);
    store.setState({ hearings: { hearingValues: { caseInfo: { caseReference: 'case-a', jurisdictionId: 'SSCS' } } } });
    await router.navigateByUrl('/cases/case-details/case-a/hearings');
    store.setState({ hearings: { hearingValues: { caseInfo: { caseReference: 'case-b', jurisdictionId: 'CIVIL' } } } });
    await router.navigateByUrl('/cases/case-details/case-b/hearings');
    await router.navigateByUrl('/work');
    expect(monitoring.logMetric.calls.first().args[2]).toEqual(
      jasmine.objectContaining({ caseId: 'case-a', jurisdiction: 'SSCS' })
    );
    expect(monitoring.logMetric.calls.mostRecent().args[2]).toEqual(
      jasmine.objectContaining({ caseId: 'case-b', jurisdiction: 'CIVIL' })
    );
    expect(monitoring.logPageView.calls.first().args[2].journeyId).not.toBe(
      monitoring.logPageView.calls.mostRecent().args[2].journeyId
    );
  });

  it('does not duplicate subscriptions, outcomes or duration metrics on pagehide/destruction', async () => {
    service.start();
    service.start();
    await router.navigateByUrl('/hearings/request');
    clock.and.returnValue(3500);
    window.dispatchEvent(new Event('pagehide'));
    window.dispatchEvent(new Event('pagehide'));
    service.ngOnDestroy();
    expect(monitoring.logPageView).toHaveBeenCalledTimes(1);
    expect(monitoring.logMetric).toHaveBeenCalledOnceWith('Hearings.PageDuration', 3500, jasmine.any(Object));
    expect(monitoring.logEvent.calls.allArgs().filter(([name]) => name === 'Hearings.JourneyAbandoned').length).toBe(1);
    await router.navigateByUrl('/hearings/request/hearing-stage');
    expect(monitoring.logPageView).toHaveBeenCalledTimes(1);
  });

  it('starts a fresh visit and journey on restoration from the browser cache', async () => {
    await router.navigateByUrl('/hearings/request');
    window.dispatchEvent(new Event('pagehide'));
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
    expect(monitoring.logPageView).toHaveBeenCalledTimes(2);
    expect(monitoring.logPageView.calls.first().args[2].journeyId).not.toBe(
      monitoring.logPageView.calls.mostRecent().args[2].journeyId
    );
  });

  it('tracks entry when started after navigation has already completed', async () => {
    service.ngOnDestroy();
    await router.navigateByUrl('/hearings/request');
    const late = new HearingsPageTrackingService(router, monitoring, window, TestBed.inject(HearingsTelemetryService));
    late.start();
    late.start();
    expect(monitoring.logPageView).toHaveBeenCalledTimes(1);
    late.ngOnDestroy();
  });

  it('captures a non-HTTP resolver failure without counting an unsuccessful page visit', async () => {
    await router.navigateByUrl('/hearings/request');
    const journeyId = TestBed.inject(HearingsTelemetryService).currentJourney.journeyId;
    await expectAsync(router.navigateByUrl('/hearings/request/hearing-facilities')).toBeRejectedWithError(
      'private-resolver-error'
    );
    expect(monitoring.logPageView).toHaveBeenCalledTimes(1);
    expect(monitoring.logException).toHaveBeenCalledOnceWith(
      jasmine.any(Error),
      jasmine.objectContaining({
        operation: 'navigate',
        journeyId,
        step: '/hearings/request/hearing-facilities',
      })
    );
    expect(TestBed.inject(HearingsTelemetryService).currentJourney.currentStep).toBe('/hearings/request');
  });
});
