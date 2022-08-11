import { Location as AngularLocation } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FilterConfig,
  FilterError,
  FilterFieldConfig,
  FilterPersistence,
  FilterService,
  FilterSetting
} from '@hmcts/rpx-xui-common-lib';
import { combineLatest, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import * as _ from 'underscore';
import { ErrorMessage } from '../../../app/models';
import { Location } from '../../models/dtos';
import Task from '../../models/tasks/task.model';
import { WASupportedJurisdictionsService, WorkAllocationTaskService } from '../../services';
import { TaskTypesService } from '../../services/task-types.service';
import { servicesMap } from '../../utils';

export const LOCATION_ERROR: ErrorMessage = {
  title: 'There is a problem',
  description: 'At least one location is required',
  fieldId: 'locations'
};

@Component({
  selector: 'exui-task-list-filter',
  templateUrl: './task-list-filter.component.html',
  styleUrls: ['task-list-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskListFilterComponent implements OnInit, OnDestroy {
  private static readonly FILTER_NAME = 'locations';
  @Input() public persistence: FilterPersistence;
  @Output() public errorChanged: EventEmitter<ErrorMessage> = new EventEmitter();
  public showFilteredText = false;
  public noDefaultLocationMessage = 'Use the work filter to show tasks and cases based on service, work type and location';
  public error: ErrorMessage;
  public fieldsConfig: FilterConfig = {
    persistence: 'session',
    id: TaskListFilterComponent.FILTER_NAME,
    fields: [],
    cancelButtonText: 'Reset to default',
    applyButtonText: 'Apply',
    cancelSetting: null,
    showCancelFilterButton: false
  };
  public allLocations: string[] = [];
  public defaultLocations: any[] = null;
  public defaultTypesOfWork: string[] = [];
  public fieldsSettings: FilterSetting = {
    id: TaskListFilterComponent.FILTER_NAME,
    fields: [],
  };
  public toggleFilter = false;
  public errorSubscription: Subscription;
  private subscription: Subscription;
  private selectedLocationsSubscription: Subscription;

  /**
   * Accept the SessionStorageService for adding to and retrieving from sessionStorage.
   */
  constructor(private readonly route: ActivatedRoute,
              private readonly location: AngularLocation,
              private readonly filterService: FilterService,
              private readonly taskService: WorkAllocationTaskService,
              private readonly service: WASupportedJurisdictionsService,
              private readonly taskTypesService: TaskTypesService) {
  }

  private static hasBeenFiltered(f: FilterSetting, cancelSetting: FilterSetting, assignedTasks: Task[], currentTasks: Task[], pathname): boolean {
    const baseLocations = cancelSetting.fields.find(field => field.name === 'locations');
    const locations = f.fields.find(field => field.name === 'locations');
    const fieldsNoLocations = f.fields.filter(field => field.name !== 'locations');
    const cancelFieldsNoLocations = cancelSetting.fields.filter(field => field.name !== 'locations');
    if (pathname.includes('work/my-work/list')) {
      return assignedTasks.length !== currentTasks.length;
    }
    return !_.isEqual(fieldsNoLocations, cancelFieldsNoLocations) || !TaskListFilterComponent.hasBaseLocations(locations, baseLocations);
  }

  private static hasBaseLocations(locations, baseLocations): boolean {
    const result = locations.value.filter(location => baseLocations.value.find(baseLocation => _.isEqual(location, baseLocation)));
    return result.length >= baseLocations.value.length;
  }

  public ngOnInit(): void {
    this.fieldsConfig.persistence = this.persistence || 'session';
    this.subscription = combineLatest([
      this.taskTypesService.getTypesOfWork(),
      this.service.getWASupportedJurisdictions(),
      this.taskService.getUsersAssignedTasks()
    ])
      .subscribe(([typesOfWork, services, assignedTasks]: [any[], string[], Task[]]) => {
        this.setUpServicesFilter(services);
        this.setUpLocationFilter();
        this.setUpTypesOfWorkFilter(typesOfWork);
        this.persistFirstSetting();
        this.subscribeToFilters(assignedTasks);
      });
    this.setErrors();
  }

  public ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    if (this.selectedLocationsSubscription && !this.selectedLocationsSubscription.closed) {
      this.selectedLocationsSubscription.unsubscribe();
    }

    if (this.errorSubscription && !this.errorSubscription.closed) {
      this.errorSubscription.unsubscribe();
    }
  }

  private subscribeToFilters(assignedTasks: Task[]): void {
    this.selectedLocationsSubscription = combineLatest([
      this.filterService.getStream(TaskListFilterComponent.FILTER_NAME),
      this.taskService.currentTasks$
    ])
      .pipe(
        map(([f, tasks]: [FilterSetting, Task[]]) => {
          if (!f) {
            f = {
              id: TaskListFilterComponent.FILTER_NAME,
              reset: false,
              fields: this.fieldsConfig.cancelSetting.fields
            };
          }
          return [f, tasks];
        }),
        filter(([f]: [FilterSetting, Task[]]) => f && f.hasOwnProperty('fields'))
      )
      .subscribe(([f, currentTasks]: [FilterSetting, Task[]]) => {
        this.showFilteredText = TaskListFilterComponent.hasBeenFiltered(f, this.fieldsConfig.cancelSetting, assignedTasks, currentTasks, this.location.path());
        this.toggleFilter = false;
      });
  }

  private persistFirstSetting(): void {
    if (!this.filterService.get(TaskListFilterComponent.FILTER_NAME)) {
      this.filterService.persist(this.fieldsSettings, this.fieldsConfig.persistence);
      this.filterService.isInitialSetting = true;
    }
  }

  private setErrors(): void {
    this.errorSubscription = this.filterService.givenErrors.subscribe((errors: FilterError[]) => {
      if (errors) {
        this.error = LOCATION_ERROR;
        this.error.multiple = true;
        this.error.errors = errors;
      } else {
        this.error = null;
      }
      this.errorChanged.emit(this.error);
    });
  }

  private setUpLocationFilter(): void {
    const field: FilterFieldConfig = {
      name: TaskListFilterComponent.FILTER_NAME,
      options: [],
      locationTitle: 'Search for a location by name',
      minSelected: 1,
      maxSelected: null,
      lineBreakBefore: true,
      findLocationField: 'services',
      displayMinSelectedError: true,
      minSelectedError: 'Search for a location by name',
      type: 'find-location',
      enableAddLocationButton: true
    };
    if (this.route.snapshot.data && this.route.snapshot.data.location) {
      const location: Location = this.route.snapshot.data.location;
      if (location) {
        this.defaultLocations = [location];
      }
    } else {
      this.defaultLocations = [];
    }
    this.fieldsSettings.fields = [...this.fieldsSettings.fields, {
      name: TaskListFilterComponent.FILTER_NAME,
      value: this.defaultLocations
    }];
    this.fieldsConfig.cancelSetting = JSON.parse(JSON.stringify(this.fieldsSettings));
    this.fieldsConfig.fields.push(field);
  }

  private setUpTypesOfWorkFilter(typesOfWork: any[]): void {
    if (!typesOfWork.length) {
      return;
    }
    const field: FilterFieldConfig = {
      name: 'types-of-work',
      options: [
        {
          key: 'types_of_work_all',
          label: 'Select all',
          selectAll: true
        },
        ...typesOfWork
      ],
      minSelected: 1,
      maxSelected: null,
      lineBreakBefore: true,
      displayMinSelectedError: true,
      minSelectedError: 'Select a type of work',
      title: 'Types of work',
      type: 'checkbox'
    };
    const defaultFields = typesOfWork.map(typeOfWork => typeOfWork.key);
    this.fieldsSettings.fields = [...this.fieldsSettings.fields, {
      name: 'types-of-work',
      value: ['types_of_work_all', ...defaultFields]
    }];
    this.fieldsConfig.cancelSetting = JSON.parse(JSON.stringify(this.fieldsSettings));
    this.fieldsConfig.fields.push(field);
  }

  private setUpServicesFilter(services: any[]): void {
    if (!services.length) {
      return;
    }
    const field: FilterFieldConfig = {
      name: 'services',
      options: [
        {
          key: 'services_all',
          label: 'Select all',
          selectAll: true
        },
        ...services
          .sort()
          .map(service => {
            return {
              key: service,
              label: servicesMap[service] || service
            };
          })
      ],
      minSelected: 1,
      maxSelected: null,
      lineBreakBefore: false,
      displayMinSelectedError: true,
      minSelectedError: 'Select a service',
      title: 'Services',
      type: 'checkbox-large'
    };
    this.fieldsSettings.fields = [...this.fieldsSettings.fields, {
      name: 'services',
      value: ['services_all', ...services]
    }];
    this.fieldsConfig.cancelSetting = JSON.parse(JSON.stringify(this.fieldsSettings));
    this.fieldsConfig.fields.push(field);
  }

}
