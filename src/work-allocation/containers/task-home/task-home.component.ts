import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { SubNavigation } from '@hmcts/rpx-xui-common-lib';

import { AppUtils } from '../../../app/app-utils';
import { InformationMessage } from '../../models/comms';
import { TaskSortField } from '../../models/tasks';
import { InfoMessageCommService } from '../../services';

@Component({
  selector: 'exui-task-home',
  templateUrl: 'task-home.component.html'
})
export class TaskHomeComponent implements OnInit {

  /**
   * Take in the Router so we can navigate when actions are clicked and
   * to identify which sub-navigation item to highlight.
   */
  private readonly MY_TASKS: SubNavigation = { text: 'My tasks', href: '/tasks/list', active: true };
  /**
   * The sub-navigation items.
   */
  public subNavigationItems: SubNavigation[] = [
    this.MY_TASKS,
    { text: 'Available tasks', href: '/tasks/available', active: false }
  ];

  public sortedBy: TaskSortField;
  public pageTitle: string;

  public showInfoMessage: boolean = false;

  public infoMessages: InformationMessage[];

  /**
   * Flag to indicate whether or not messages should be retained at
   * this point, having been set on another route. The flag is passed
   * through the router and so is held in window.history.state.
   */
  private get retainMessages(): boolean {
    if (window && window.history && window.history.state) {
      return !!window.history.state.retainMessages;
    }
    return false;
  }

  constructor(
    private readonly router: Router,
    private readonly infoMessageCommService: InfoMessageCommService
  ) {}

  public ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Set up the active navigation item.
        this.setupActiveSubNavigationItem(this.router.url);
        this.resetMessages();
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

    this.subscribeToInfoMessageCommService();
  }

  public subscribeToInfoMessageCommService(): void {

    this.infoMessageCommService.infoMessageChangeEmitted$.subscribe(messages => {
      this.infoMessages = messages;
      this.showInfoMessage = true;
    });
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

  public resetMessages(): void {
    // Remove all the messages unless they've been specifically flagged
    // to be retained this one time.
    if (!this.retainMessages) {
      this.infoMessageCommService.removeAllMessages();
    }
  }

  public isActiveUrl(url: string, currentUrl: string): boolean {
    if (url && currentUrl) {
      return currentUrl.indexOf(url) === 0;
    }
    return false;
  }
}
