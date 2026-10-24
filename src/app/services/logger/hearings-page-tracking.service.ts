import { Inject, Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  PRIMARY_OUTLET,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { MonitoringService } from './monitoring.service';
import { HearingsTelemetryIdentifiers } from '../../../../common/hearings/telemetry-correlation';
import {
  HearingsJourneyContext,
  HearingsJourneyEndReason,
  HearingsTelemetryService,
} from '../../../hearings/services/hearings-telemetry.service';

interface HearingsPage {
  path: string;
  key: string;
  context: HearingsJourneyContext;
}

interface TimedPage extends HearingsPage {
  enteredAt: number;
  journeyId: string;
  identifiers: HearingsTelemetryIdentifiers;
  journeyType: string;
  pageVisitId: string;
}

export function initializeHearingsPageTracking(service: HearingsPageTrackingService): () => void {
  return () => service.start();
}

@Injectable({ providedIn: 'root' })
export class HearingsPageTrackingService implements OnDestroy {
  private subscription?: Subscription;
  private page?: TimedPage;
  private visitCount = 0;

  constructor(
    private readonly router: Router,
    private readonly monitoring: MonitoringService,
    @Inject(Window) private readonly browser: Window,
    private readonly telemetry: HearingsTelemetryService
  ) {}

  public start(): void {
    if (this.subscription) {
      return;
    }
    this.subscription = new Subscription();
    this.subscription.add(
      this.router.events.subscribe((event) => {
        if (event instanceof RoutesRecognized) {
          const destination = this.hearingsPage(event.state.root);
          try {
            this.telemetry.prepareNavigation(destination?.path || null, destination?.context);
          } catch {
            this.telemetry.clearPendingNavigation();
          }
        } else if (event instanceof NavigationCancel || event instanceof NavigationError) {
          if (event instanceof NavigationError && event.target && this.hearingsPage(event.target.root)) {
            try {
              this.telemetry.captureException('navigate')(event.error);
            } catch {
              // Reporting must not alter Angular's existing navigation error handling.
            }
          }
          this.telemetry.clearPendingNavigation();
        } else if (event instanceof NavigationEnd) {
          this.trackPage();
          this.telemetry.clearPendingNavigation();
        }
      })
    );
    this.subscription.add(fromEvent(this.browser, 'pagehide').subscribe(() => this.finish('pagehide')));
    this.subscription.add(
      fromEvent<PageTransitionEvent>(this.browser, 'pageshow').subscribe((event) => {
        if (event.persisted) {
          this.trackPage();
        }
      })
    );
    // Also support starting the tracker after initial navigation has completed.
    if (this.router.navigated) {
      this.trackPage();
    }
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.telemetry.clearPendingNavigation();
    this.finish('destroyed');
  }

  private trackPage(): void {
    const next = this.hearingsPage(this.router.routerState.snapshot.root);
    const now = this.browser.performance.now();
    const previousPath = this.page?.path;
    this.finishPage(now);
    if (!next) {
      this.telemetry.endJourney('left-hearings', now, previousPath);
      return;
    }
    if (this.telemetry.hasContextChanged(next.context)) {
      this.telemetry.endJourney('context-changed', now, previousPath);
    } else if (previousPath?.startsWith('/hearings/') && next.path.startsWith('/cases/')) {
      this.telemetry.endJourney('returned-to-list', now, previousPath);
    }
    const journey = this.telemetry.enterStep(next.path, next.context, now);
    if (!journey) {
      return;
    }
    this.page = {
      ...next,
      enteredAt: now,
      journeyId: journey.journeyId,
      journeyType: journey.journeyType,
      identifiers: this.telemetry.currentIdentifiers,
      pageVisitId: `${journey.journeyId}-${++this.visitCount}`,
    };
    this.monitoring.logPageView(`Hearings: ${next.path}`, next.path, this.pageProperties(this.page));
    if (this.isConfirmation(next.path)) {
      this.telemetry.endJourney('confirmation', now, next.path);
    }
  }

  private finish(reason: HearingsJourneyEndReason): void {
    const now = this.browser.performance.now();
    const path = this.page?.path;
    this.finishPage(now);
    this.telemetry.endJourney(reason, now, path);
    this.telemetry.clearPendingNavigation();
  }

  private finishPage(now: number): void {
    if (this.page) {
      const page = this.page;
      this.page = undefined;
      this.monitoring.logMetric('Hearings.PageDuration', Math.max(0, now - page.enteredAt), this.pageProperties(page));
    }
  }

  private pageProperties(page: TimedPage): Record<string, string> {
    return {
      journeyId: page.journeyId,
      journeyType: page.journeyType,
      pageVisitId: page.pageVisitId,
      page: page.path,
      step: page.path,
      ...(this.telemetry.currentJourney?.journeyId === page.journeyId ? this.telemetry.currentIdentifiers : page.identifiers),
    };
  }

  private isConfirmation(path: string): boolean {
    return (
      path === '/hearings/request/hearing-confirmation' ||
      path === '/hearings/actuals/:id/hearing-actuals-confirmation' ||
      path === '/hearings/link/:caseId/:hearingId/final-confirmation' ||
      path === '/hearings/manage-links/:caseId/:hearingGroupRequestId/:hearingId/final-confirmation'
    );
  }

  private hearingsPage(root: ActivatedRouteSnapshot): HearingsPage | null {
    const segments: string[] = [];
    const actualSegments: string[] = [];
    // Read only approved identifier fields; never include arbitrary route/navigation state.
    const context: HearingsJourneyContext = {};
    let route = root.children.find((child) => child.outlet === PRIMARY_OUTLET);
    while (route) {
      const path = route.routeConfig?.path;
      // Fail closed for matchers/wildcards; never fall back to actual URL segments or parameters.
      if (path === undefined || path.includes('*')) {
        return null;
      }
      segments.push(...path.split('/').filter(Boolean));
      actualSegments.push(...route.url.map((segment) => segment.path));
      const caseId = route.params.cid || route.params.caseId;
      const hearingId = route.params.hearingId || (segments[0] === 'hearings' ? route.params.id : undefined);
      if (caseId) {
        context.caseId = caseId;
      }
      if (hearingId) {
        context.hearingId = hearingId;
      }
      if (route.params.jurisdiction || route.params.jurisdictionId) {
        context.jurisdiction = route.params.jurisdiction || route.params.jurisdictionId;
      }
      const queryCaseId = route.queryParams.caseId || route.queryParams.caseRef || route.queryParams.caseReference;
      if (!context.caseId && typeof queryCaseId === 'string') {
        context.caseId = queryCaseId;
      }
      const jurisdiction = route.queryParams.jurisdictionId || route.queryParams.jurisdiction;
      if (!context.jurisdiction && typeof jurisdiction === 'string') {
        context.jurisdiction = jurisdiction;
      }
      route = route.children.find((child) => child.outlet === PRIMARY_OUTLET);
    }
    const isHearingsJourney = segments[0] === 'hearings';
    const isCaseHearingsTab =
      segments[0] === 'cases' && segments[1] === 'case-details' && segments[segments.length - 1] === 'hearings';
    return isHearingsJourney || isCaseHearingsTab
      ? { path: `/${segments.join('/')}`, key: actualSegments.join('/'), context }
      : null;
  }
}
