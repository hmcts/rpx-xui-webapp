import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { SubNavigation } from '@hmcts/rpx-xui-common-lib';

import { AppUtils } from './../../../app/app-utils';
import { Task, TaskSortField } from './../../models/tasks';

@Component({
  selector: 'exui-task-home',
  templateUrl: 'task-home.component.html'
})
export class TaskHomeComponent implements OnInit {

  /**
   * Take in the Router so we can navigate when actions are clicked and
   * to identify which sub-navigation item to highlight.
   */
  public tasks: Task[] = [
    {
      id: '12345678901123456',
      caseReference: '1234 5678 9012 3456',
      caseName: 'Kili Muso',
      caseCategory: 'Protection',
      location: 'Taylor House',
      taskName: 'Review respondent evidence',
      dueDate: new Date(1604938789000),
      actions: [
        {
          id: 'actionId',
          title: 'Reassign task',
        },
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '2345678901234567',
      caseReference: '2345 6789 0123 4567',
      caseName: 'Mankai Lit',
      caseCategory: 'Revocation',
      location: 'Taylor House',
      taskName: 'Review appellant case',
      dueDate: new Date(1604506789000),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '3456789012345678',
      caseReference: '3456 7890 1234 5678',
      caseName: 'Bob Cratchit',
      caseCategory: 'Protection',
      location: 'Taylor Swift',
      taskName: 'Review respondent evidence',
      dueDate: new Date(),
      actions: [
        {
          id: 'actionId',
          title: 'Reassign task',
        },
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '4567890123456789',
      caseReference: '4567 8901 2345 6789',
      caseName: 'Ebenezer Scrooge',
      caseCategory: 'Revocation',
      location: 'Bleak House',
      taskName: 'Review appellant case',
      dueDate: new Date(),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '5678901234567890',
      caseReference: '5678 9012 3456 7890',
      caseName: 'Oliver Twist',
      caseCategory: 'Protection',
      location: 'Orphanage',
      taskName: 'Give more gruel',
      dueDate: new Date(new Date().getTime() + (86400 * 5000)),
      actions: [
        {
          id: 'actionId',
          title: 'Reassign task',
        },
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '6789012345678901',
      caseReference: '6789 0123 4567 8901',
      caseName: 'David Copperfield',
      caseCategory: 'Revocation',
      location: 'Taylor House',
      taskName: 'Review appellant case',
      dueDate: new Date(1604506789000),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '6789012345678902',
      caseReference: '6789 0123 4567 8901',
      caseName: 'David Copperfield',
      caseCategory: 'Revocation',
      location: 'Taylor House',
      taskName: 'Review appellant case',
      dueDate: new Date(1604506789000),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '6789012345678903',
      caseReference: '6789 0123 4567 8901',
      caseName: 'David Copperfield',
      caseCategory: 'Revocation',
      location: 'Taylor House',
      taskName: 'Review appellant case',
      dueDate: new Date(1604506789000),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '6789012345678904',
      caseReference: '6789 0123 4567 8901',
      caseName: 'David Copperfield',
      caseCategory: 'Revocation',
      location: 'Taylor House',
      taskName: 'Review appellant case',
      dueDate: new Date(1604506789000),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '6789012345678905',
      caseReference: '6789 0123 4567 8901',
      caseName: 'David Copperfield',
      caseCategory: 'Revocation',
      location: 'Taylor House',
      taskName: 'Review appellant case',
      dueDate: new Date(1604506789000),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '67890123456789066',
      caseReference: '6789 0123 4567 8901',
      caseName: 'David Copperfield',
      caseCategory: 'Revocation',
      location: 'Taylor House',
      taskName: 'Review appellant case',
      dueDate: new Date(1604506789000),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '6789012345678907',
      caseReference: '6789 0123 4567 8901',
      caseName: 'David Copperfield',
      caseCategory: 'Revocation',
      location: 'Taylor House',
      taskName: 'Review appellant case',
      dueDate: new Date(1604506789000),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '6789012345678908',
      caseReference: '6789 0123 4567 8901',
      caseName: 'David Copperfield',
      caseCategory: 'Revocation',
      location: 'Taylor House',
      taskName: 'Review appellant case',
      dueDate: new Date(1604506789000),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '6789012345678909',
      caseReference: '6789 0123 4567 8901',
      caseName: 'David Copperfield',
      caseCategory: 'Revocation',
      location: 'Taylor House',
      taskName: 'Review appellant case',
      dueDate: new Date(1604506789000),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
  ];

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

  constructor(private readonly router: Router) {}

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
