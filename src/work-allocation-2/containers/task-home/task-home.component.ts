import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { FilterService, FilterSetting, SubNavigation } from '@hmcts/rpx-xui-common-lib';
import { FilterConfig, FilterFieldConfig } from '@hmcts/rpx-xui-common-lib/lib/models/filter.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppUtils } from '../../../app/app-utils';
import { Location } from '../../models/dtos';
import { TaskSortField } from '../../models/tasks';
import { LocationDataService } from '../../services';

@Component({
  selector: 'exui-task-home',
  templateUrl: 'task-home.component.html',
  styleUrls: ['task-home.component.scss']
})
export class TaskHomeComponent implements OnInit, OnDestroy {
  public toggleFilter = false;
  public sortedBy: TaskSortField;
  public pageTitle: string;
  public fieldsConfig: FilterConfig = {
    persistence: 'session',
    id: 'locations',
    fields: [],
    cancelButtonText: 'Reset to default',
    applyButtonText: 'Apply'
  };
  public selectedLocations: string[] = [];
  /**
   * Take in the Router so we can navigate when actions are clicked and
   * to identify which sub-navigation item to highlight.
   */
  private readonly MY_TASKS: SubNavigation = {text: 'My tasks', href: '/mywork/list', active: true};
  /**
   * The sub-navigation items.
   */
  public subNavigationItems: SubNavigation[] = [
    this.MY_TASKS,
    {text: 'Available tasks', href: '/mywork/available', active: false},
    {text: 'My cases', href: '/mycases', active: false}
  ];
  private routeSubscription: Subscription;
  private locationSubscription: Subscription;
  private selectedLocationsSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly filterService: FilterService,
    private readonly locationService: LocationDataService
  ) {
  }

  public ngOnInit(): void {
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

    this.locationSubscription = this.locationService.getLocations().subscribe((locations: Location[]) => {
      this.setUpLocationFilter(locations);
    });

    this.selectedLocationsSubscription = this.filterService.getStream('locations')
      .pipe(
        filter((f: FilterSetting) => f && f.hasOwnProperty('fields'))
      )
      .subscribe((f: FilterSetting) => {
        console.log('filter', f);
        this.selectedLocations = f.fields.find((field) => field.name === 'locations').value;
      });
  }

  public ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }

    if (this.selectedLocationsSubscription) {
      this.selectedLocationsSubscription.unsubscribe();
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

  private setUpLocationFilter(locations: Location[]): void {
    const field: FilterFieldConfig = {
      name: 'locations',
      options: locations.map((location) => ({
        key: location.id,
        label: location.locationName
      })),
      minSelected: 1,
      maxSelected: 10,
      title: 'Locations',
      subTitle: 'Shows tasks and cases for selected locations:',
      type: 'checkbox'
    };
    this.fieldsConfig.fields.push(field);
  }
}
