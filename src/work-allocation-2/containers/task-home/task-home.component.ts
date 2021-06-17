import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
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
  private static FILTER_NAME = 'locations';
  public toggleFilter = false;
  public showFilteredText = false;
  public sortedBy: TaskSortField;
  public pageTitle: string;
  public fieldsConfig: FilterConfig = {
    persistence: 'session',
    id: TaskHomeComponent.FILTER_NAME,
    fields: [],
    cancelButtonText: 'Reset to default',
    applyButtonText: 'Apply'
  };
  public defaultLocations: string[] = [];
  public fieldsSettings: FilterSetting = {
    fields: [],
    id: TaskHomeComponent.FILTER_NAME,
  };
  public selectedLocations: string[] = [];
  public jurisdiction: string = 'Immigration & Asylum';
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
    private readonly route: ActivatedRoute,
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

    this.locationSubscription = this.locationService.getLocations()
      .subscribe((locations: Location[]) => {
        this.setUpLocationFilter(locations);
      });

    this.selectedLocationsSubscription = this.filterService.getStream(TaskHomeComponent.FILTER_NAME)
      .pipe(
        filter((f: FilterSetting) => f && f.hasOwnProperty('fields'))
      )
      .subscribe((f: FilterSetting) => {
        this.showFilteredText = this.hasBeenFiltered(f, this.defaultLocations);
        this.toggleFilter = false;
        this.selectedLocations = f.fields.find((field) => field.name === TaskHomeComponent.FILTER_NAME).value;
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

  private hasBeenFiltered(f: FilterSetting, defaultLocations: string[]): boolean {
    const selectedFields = f.fields.find(field => field.name === TaskHomeComponent.FILTER_NAME);
    return selectedFields.value.filter((v: string) => defaultLocations.indexOf(v) === -1).length > 0;
  }

  private setUpLocationFilter(locations: Location[]): void {
    const field: FilterFieldConfig = {
      name: TaskHomeComponent.FILTER_NAME,
      options: locations.map((location) => ({
        key: location.id,
        label: location.locationName
      })),
      minSelected: 1,
      maxSelected: 10,
      minSelectedError: 'At least one location is required',
      maxSelectedError: 'Maximum locations selected',
      subTitle: 'Shows tasks and cases for the selected locations:',
      type: 'checkbox'
    };

    if (this.route.snapshot.data && this.route.snapshot.data.location) {
      const location: Location = this.route.snapshot.data.location;
      this.defaultLocations = [`${location.id}`];
      this.fieldsSettings.fields = [...this.fieldsSettings.fields, {
        name: TaskHomeComponent.FILTER_NAME,
        value: [`${location.id}`]
      }];
      // this.fieldsConfig.cancelSetting = JSON.parse(JSON.stringify(this.fieldsSettings));
    }
    this.fieldsConfig.fields.push(field);
  }
}
