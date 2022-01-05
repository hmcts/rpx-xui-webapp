import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterPersistence, FilterService } from '@hmcts/rpx-xui-common-lib';
import { FilterConfig, FilterFieldConfig, FilterSetting } from '@hmcts/rpx-xui-common-lib/lib/models/filter.model';
import { forkJoin, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ErrorMessage } from '../../../app/models';
import { Location } from '../../models/dtos';
import { LocationDataService } from '../../services';
import { TaskTypesService } from '../../services/task-types.service';

export const LOCATION_ERROR: ErrorMessage = {
  title: 'There is a problem',
  description: 'At least one location is required',
  fieldId: 'task_assignment_caseworker'
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
  public error: ErrorMessage;
  public fieldsConfig: FilterConfig = {
    persistence: 'session',
    id: TaskListFilterComponent.FILTER_NAME,
    fields: [],
    cancelButtonText: 'Reset to default',
    applyButtonText: 'Apply',
    cancelSetting: null
  };
  public allLocations: string[] = [];
  public defaultLocations: string[] = [];
  public defaultTypesOfWork: string[] = [];
  public fieldsSettings: FilterSetting = {
    id: TaskListFilterComponent.FILTER_NAME,
    fields: [],
  };
  public selectedLocations: string[] = [];
  public selectedTypesOfWork: string[] = [];
  public toggleFilter = false;
  public errorSubscription: Subscription;
  private subscription: Subscription;
  private selectedLocationsSubscription: Subscription;

  /**
   * Accept the SessionStorageService for adding to and retrieving from sessionStorage.
   */
  constructor(private readonly route: ActivatedRoute,
              private readonly filterService: FilterService,
              private readonly taskTypesService: TaskTypesService,
              private readonly locationDataService: LocationDataService) {
  }

  public ngOnInit(): void {
    this.fieldsConfig.persistence = this.persistence || 'session';
    this.subscription = forkJoin([this.locationDataService.getLocations(), this.taskTypesService.getTypesOfWork()])
      .subscribe(([locations, typesOfWork]: [Location[], any[]]) => {
        this.allLocations = locations.map((location) => location.id.toString());
        this.setUpLocationFilter(locations);
        this.setUpTypesOfWorkFilter(typesOfWork);
        this.persistFirstSetting();
        this.subscribeToSelectedLocations();
      });
    this.setErrors();
    this.toggleFilter = false;
  }

  // if there is no local storage available, default locations need to be reset
  public getDefaultLocations(): string[] {
    if (this.fieldsConfig && this.fieldsConfig.cancelSetting) {
      this.fieldsConfig.cancelSetting.fields.forEach(field => {
        if (field.name === 'locations') {
          this.defaultLocations = field.value;
        }
      });
    }
    return this.defaultLocations;
  }

  public getDefaultTypesOfWork(): string[] {
    if (this.fieldsConfig && this.fieldsConfig.cancelSetting) {
      this.fieldsConfig.cancelSetting.fields.forEach(field => {
        if (field.name === 'types-of-work') {
          this.defaultTypesOfWork = field.value;
        }
      });
    }
    return this.defaultTypesOfWork;
  }

  public subscribeToSelectedLocations(): void {
    this.selectedLocationsSubscription = this.filterService.getStream(TaskListFilterComponent.FILTER_NAME)
      .pipe(
        filter((f: FilterSetting) => f && f.hasOwnProperty('fields'))
      )
      .subscribe((f: FilterSetting) => {
        this.selectedLocations = f.fields.find((field) => field.name === TaskListFilterComponent.FILTER_NAME).value;
        this.selectedTypesOfWork = f.fields.find((field) => field.name === 'types-of-work').value;
        this.showFilteredText = this.hasBeenFiltered(f, this.getDefaultLocations(), this.getDefaultTypesOfWork());
        this.toggleFilter = false;
      });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.selectedLocationsSubscription) {
      this.selectedLocationsSubscription.unsubscribe();
    }

    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }

  // EUI-4408 - If stream not yet started, persist first session settings in filter service
  private persistFirstSetting(): void {
    if (!this.filterService.get(TaskListFilterComponent.FILTER_NAME)) {
      this.filterService.persist(this.fieldsSettings, this.fieldsConfig.persistence);
      this.filterService.isInitialSetting = true;
    }
  }

  private setErrors(): void {
    this.errorSubscription = this.filterService.givenErrors.subscribe(value => {
      if (value) {
        this.error = LOCATION_ERROR;
        this.error.description = value;
      } else {
        this.error = null;
      }
      this.errorChanged.emit(this.error);
    });
  }

  private setUpLocationFilter(locations: Location[]): void {
    const field: FilterFieldConfig = {
      name: TaskListFilterComponent.FILTER_NAME,
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
    } else {
      // as some judicial workers do not have a set location set their default to be all locations
      this.defaultLocations = this.allLocations;
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

  private hasBeenFiltered(f: FilterSetting, defaultLocations: string[], defaultTypesOfWork: string[]): boolean {
    const selectedFields = f.fields.find(field => field.name === TaskListFilterComponent.FILTER_NAME);
    const selectedTypeOfWorksFields = f.fields.find(field => field.name === 'types-of-work');
    // check if selected fields are the same as cancelled filter settings
    const containsNonDefaultFields = selectedFields.value.filter((v: string) => defaultLocations.indexOf(v) === -1).length > 0;
    const containsNonDefaultTypeOfWorkFields = selectedTypeOfWorksFields.value.filter((v: string) => defaultTypesOfWork.indexOf(v) === -1).length > 0;
    // check if the amount of fields selected is the same as the amount in the cancel settings
    const notSameSize = !(defaultLocations.length === selectedFields.value.length) || !(defaultTypesOfWork.length === selectedTypeOfWorksFields.value.length);
    return (containsNonDefaultFields || notSameSize || containsNonDefaultTypeOfWorkFields) && (defaultLocations.length !== 0) && (defaultTypesOfWork.length !== 0);
  }

}
