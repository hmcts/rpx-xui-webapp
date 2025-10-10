import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { SubNavigation } from '@hmcts/rpx-xui-common-lib';
import { Subscription } from 'rxjs';
import { AppUtils } from '../../../app/app-utils';

@Component({
  standalone: false,

  selector: 'exui-all-work-home',
  templateUrl: 'all-work-home.component.html',
  styleUrls: ['all-work-home.component.scss']

})
export class AllWorkHomeComponent implements OnInit, OnDestroy {
  public pageTitle: string;

  public subNavigationItems: SubNavigation[] = [
    { text: 'Tasks', href: '/work/all-work/tasks', active: true },
    { text: 'Cases', href: '/work/all-work/cases', active: false }
  ];

  private routeSubscription: Subscription;

  constructor(
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Set up the active navigation item.
        this.setupActiveSubNavigationItem(this.router.url);
      }
      if (event instanceof RoutesRecognized) {
        // Set up the page data.
        this.setupPageData(event.state.root);
      }
    });
    // Set up the active navigation item.
    this.setupActiveSubNavigationItem(this.router.url);

    // Set up the page data.
    this.setupPageData(this.router.routerState.root.snapshot);
  }

  public ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  /**
   * Set the active sub-navigation item, based on the supplied active url.
   * @param activeUrl The URL considered active.
   */
  public setupActiveSubNavigationItem(activeUrl: string): void {
    if (this.subNavigationItems) {
      for (const item of this.subNavigationItems) {
        item.active = this.isActiveUrl(item.href, activeUrl);
      }
    }
  }

  /**
   * Sets up the page data (the title) for the activated route.
   * @param activatedRoute The activated (parent) route to start with.
   */
  public setupPageData(activatedRoute: ActivatedRouteSnapshot): void {
    const data = AppUtils.getRouteData(activatedRoute);
    this.pageTitle = data ? data.subTitle : 'Task list';
  }

  public isActiveUrl(url: string, currentUrl: string): boolean {
    if (url && currentUrl) {
      return currentUrl.indexOf(url) === 0;
    }
    return false;
  }
}
