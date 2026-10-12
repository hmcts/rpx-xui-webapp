import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MonitoringService } from './monitoring.service';
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
}

export function initializeHearingsPageTracking(service: HearingsPageTrackingService): () => void {
  return () => service.start();
}

@Injectable({ providedIn: 'root' })
export class HearingsPageTrackingService implements OnDestroy {
  private subscription?: Subscription;
  private page?: TimedPage;

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
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
        this.trackPage();
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
    this.finish('destroyed');
  }

  private trackPage(): void {
    const next = this.hearingsPage(this.router.routerState.snapshot.root);
    if (next && this.page?.key === next.key) {
      return;
    }
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
    this.page = { ...next, enteredAt: now, journeyId: journey.journeyId };
    if (this.isConfirmation(next.path)) {
      this.telemetry.endJourney('confirmation', now, next.path);
    }
  }

  private finish(reason: HearingsJourneyEndReason): void {
    const now = this.browser.performance.now();
    const path = this.page?.path;
    this.finishPage(now);
    this.telemetry.endJourney(reason, now, path);
  }

  private finishPage(now: number): void {
    if (this.page) {
      const page = this.page;
      this.page = undefined;
      this.monitoring.logPageView(
        `Hearings: ${page.path}`,
        page.path,
        { journeyId: page.journeyId },
        undefined,
        Math.max(0, now - page.enteredAt)
      );
    }
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
    // Context is compared only in memory; it must never be attached to telemetry.
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
