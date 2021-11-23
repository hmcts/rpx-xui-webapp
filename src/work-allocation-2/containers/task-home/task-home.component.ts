import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { FilterPersistence, SubNavigation } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUtils } from '../../../app/app-utils';
import { ErrorMessage } from '../../../app/models';
import * as fromRoot from '../../../app/store';
import { SortField } from '../../models/common';

@Component({
  selector: 'exui-task-home',
  templateUrl: 'task-home.component.html',
  styleUrls: ['task-home.component.scss']
})
export class TaskHomeComponent implements OnInit, OnDestroy {
  public persistence$: Observable<FilterPersistence>;
  public sortedBy: SortField;
  public pageTitle: string;
  public error: ErrorMessage = null;
  /**
   * Take in the Router so we can navigate when actions are clicked and
   * to identify which sub-navigation item to highlight.
   */
  private readonly MY_TASKS: SubNavigation = {text: 'My tasks', href: '/work/my-work/list', active: true};
  /**
   * The sub-navigation items.
   */
  public subNavigationItems: SubNavigation[] = [
    this.MY_TASKS,
    {text: 'Available tasks', href: '/work/my-work/available', active: false},
    {text: 'My cases', href: '/work/my-work/my-cases', active: false}
  ];

  private routeSubscription: Subscription;

  constructor(
    private readonly store: Store<fromRoot.State>,
    private readonly router: Router
  ) {
  }

  public ngOnInit(): void {
    this.persistence$ = this.store.pipe(select(fromRoot.getUserDetails)).pipe(
      map(AppUtils.getFilterPersistenceByRoleType)
    );
    this.routeSubscription = this.router.events.subscribe(event => {
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

  public errorChangedHandler(error: ErrorMessage) {
    this.error = error;
  }
}
