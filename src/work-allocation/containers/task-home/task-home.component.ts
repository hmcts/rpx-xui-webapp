import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { SubNavigation } from '@hmcts/rpx-xui-common-lib';

import { AppUtils } from '../../../app/app-utils';
import { InfoMessage, InfoMessageType } from '../../enums';
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
  public infoMessageType: InfoMessageType;
  public infoMessage: InfoMessage;

  constructor(
    private readonly router: Router,
    private readonly infoMessageCommService: InfoMessageCommService
  ) {}

  public ngOnInit(): void {
    this.router.events.subscribe(event => {
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

    this.subscribeToInfoMessageCommService();
  }

  /**
   * TODO: Unit test
   */
  public subscribeToInfoMessageCommService(): void {

    this.infoMessageCommService.infoMessageChangeEmitted$.subscribe(message => {

      this.infoMessageType = message.type;
      this.infoMessage = message.message;
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
        item.active = item.href === activeUrl;
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
}
