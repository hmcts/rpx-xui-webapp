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
import { filter } from 'rxjs/operators';
import { ErrorMessage } from '../../../app/models';
import { Location } from '../../models/dtos';
import { WASupportedJurisdictionsService } from '../../services';
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
  public defaultLocations: any[] = [];
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
  private sub: Subscription;

  /**
   * Accept the SessionStorageService for adding to and retrieving from sessionStorage.
   */
  constructor(private readonly route: ActivatedRoute,
              private readonly filterService: FilterService,
              private readonly service: WASupportedJurisdictionsService,
              private readonly taskTypesService: TaskTypesService) {
  }

  public ngOnInit(): void {
    this.fieldsConfig.persistence = this.persistence || 'session';
    this.subscription = combineLatest([this.taskTypesService.getTypesOfWork(), this.service.getWASupportedJurisdictions()])
      .subscribe(([typesOfWork, services]: [any[], string[]]) => {
        this.setUpServicesFilter(services);
        this.setUpLocationFilter();
        this.setUpTypesOfWorkFilter(typesOfWork);
        this.persistFirstSetting();
        this.subscribeToSelectedLocationsAndTypesOfWork();
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

  public subscribeToSelectedLocationsAndTypesOfWork(): void {
    this.sub = this.filterService.getStream(TaskListFilterComponent.FILTER_NAME)
      .pipe(
        filter((f: FilterSetting) => f && f.hasOwnProperty('fields'))
      )
      .subscribe((f: FilterSetting) => {
        const selectedLocations = f.fields.find((field) => field.name === TaskListFilterComponent.FILTER_NAME);
        this.selectedLocations = selectedLocations ? selectedLocations.value : [];
        const typesOfWork = f.fields.find((field) => field.name === 'types-of-work');
        this.selectedTypesOfWork = typesOfWork ? typesOfWork.value : [];
        this.showFilteredText = this.hasBeenFiltered(f, this.getDefaultLocations(), this.getDefaultTypesOfWork());
        this.toggleFilter = false;
      });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.sub) {
      this.sub.unsubscribe();
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
      minSelected: 1,
      maxSelected: null,
      lineBreakBefore: true,
      findPersonField: 'services',
      displayMinSelectedError: true,
      minSelectedError: 'Enter a location',
      type: 'find-location'
    };
    if (this.route.snapshot.data && this.route.snapshot.data.location) {
      const location: Location = this.route.snapshot.data.location;
      this.defaultLocations = [location];
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
        ...services.map(service => {
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

  private hasBeenFiltered(f: FilterSetting, defaultLocations: string[], defaultTypesOfWork: string[]): boolean {
    const selectedFields = f.fields.find(field => field.name === TaskListFilterComponent.FILTER_NAME);
    const selectedTypeOfWorksFields = f.fields.find(field => field.name === 'types-of-work');
    // check if selected fields are the same as cancelled filter settings
    const containsNonDefaultFields = selectedFields.value
      .map((location: any) => location.epims_id)
      .filter((v: string) => defaultLocations
        .map((location: any) => location.epims_id)
        .indexOf(v) === -1).length > 0;
    const containsNonDefaultTypeOfWorkFields = selectedTypeOfWorksFields ?
      selectedTypeOfWorksFields.value.filter((v: string) => defaultTypesOfWork.indexOf(v) === -1).length > 0
      : false;
    // check if the amount of fields selected is the same as the amount in the cancel settings
    const notSameSize = !(defaultLocations.length === selectedFields.value.length)
      || (selectedTypeOfWorksFields && !(defaultTypesOfWork.length === selectedTypeOfWorksFields.value.length));
    if (!defaultTypesOfWork.length) {
      return (containsNonDefaultFields || notSameSize || containsNonDefaultTypeOfWorkFields) && (defaultLocations.length !== 0);
    }
    return (containsNonDefaultFields || notSameSize || containsNonDefaultTypeOfWorkFields) && (defaultLocations.length !== 0) && (defaultTypesOfWork.length !== 0);
  }

}
