import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FilterService } from '@hmcts/rpx-xui-common-lib';
import { FilterConfig, FilterFieldConfig, FilterSetting } from '@hmcts/rpx-xui-common-lib/lib/models';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AppUtils } from '../../../app/app-utils';
import { UserRole } from '../../../app/models';
import * as fromAppStore from '../../../app/store';
import { Location } from '../../models/dtos';

@Component({
  selector: 'exui-task-manager-filter',
  templateUrl: './task-manager-filter.component.html',
  styleUrls: ['./task-manager-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskManagerFilterComponent implements OnInit, OnDestroy {

  private static readonly FILTER_NAME: string = 'all-tasks';

  @Input() public locations: Location[] = [];
  @Input() public jurisdictions: string[] = [];
  @Output() public selectionChanged: EventEmitter<any> = new EventEmitter<any>();

  public appStoreSub: Subscription;
  public filterSub: Subscription;
  public roleType: string;
  public isLegalOpsOrJudicialRole: UserRole;

  public ALL_LOCATIONS: Location[] = [{
    id: '**ALL_LOCATIONS**',
    locationName: 'All locations',
    services: []
  }];

  public fieldsConfig: FilterConfig = {
    persistence: 'local',
    enableDisabledButton: true,
    id: TaskManagerFilterComponent.FILTER_NAME,
    fields: [],
    cancelButtonText: 'Reset to default',
    applyButtonText: 'Apply',
    cancelSetting: {
      id: TaskManagerFilterComponent.FILTER_NAME,
      fields: [
        {
          name: 'service',
          value: ['IA']
        },
        {
          name: 'location',
          value: ['**ALL_LOCATIONS**']
        },
        {
          name: 'selectPerson',
          value: ['All']
        },
        // Note: judicial users can have pirority cancel setting without needing it
        {
          name: 'priority',
          value: ['All']
        }
      ]
    }
  };

  constructor(private readonly filterService: FilterService,
              private readonly appStore: Store<fromAppStore.State>) {
  }

  private static initServiceFilter(jurisdictions: string[]): FilterFieldConfig {
    return {
      name: 'service',
      options: jurisdictions.map(service => ({key: service, label: service})),
      minSelected: 1,
      maxSelected: 1,
      minSelectedError: 'You must select a service',
      maxSelectedError: null,
      title: 'Service',
      type: 'select'
    };
  }

  private static initCaseLocationFilter(locations: Location[]): FilterFieldConfig {
    if (!locations) {
      locations = [];
    }
    return {
      name: 'location',
      options: locations.map(loc => ({key: loc.id, label: loc.locationName})),
      minSelected: 1,
      maxSelected: 1,
      minSelectedError: 'You must select a location',
      maxSelectedError: null,
      title: 'Case Location',
      type: 'select'
    };
  }

  private static initPersonFilter(): FilterFieldConfig {
    return {
      name: 'selectPerson',
      options: [
        {
          key: 'All',
          label: 'All'
        },
        {
          key: 'None / Available tasks',
          label: 'None / Available tasks'
        },
        {
          key: 'Specific person',
          label: 'Specific person'
        }
      ],
      minSelected: 1,
      maxSelected: 1,
      minSelectedError: 'You must select a person',
      maxSelectedError: null,
      lineBreakBefore: true,
      findPersonField: 'person',
      title: 'Person',
      type: 'radio'
    };
  }

  private static initRoleTypeFilter(): FilterFieldConfig {
    return {
      name: 'role',
      options: [
        {
          key: 'Judicial',
          label: 'Judicial'
        },
        {
          key: 'Legal Ops',
          label: 'Legal Ops'
        },
        {
          key: 'Admin',
          label: 'Admin'
        }
      ],
      minSelected: 1,
      maxSelected: 1,
      minSelectedError: 'You must select a role type',
      maxSelectedError: null,
      enableCondition: 'selectPerson=Specific person',
      findPersonField: 'person',
      disabledText: 'Select a role type',
      type: 'select'
    };
  }

  private static findPersonFilter(): FilterFieldConfig {
    return {
      name: 'person',
      options: [],
      minSelected: 0,
      maxSelected: 0,
      minSelectedError: 'You must select a person',
      maxSelectedError: null,
      enableCondition: 'selectPerson=Specific person',
      type: 'find-person'
    };
  }

  private static initTaskTypeFilter(): FilterFieldConfig {
    return {
      name: 'taskType',
      options: [
        {
          key: 'All',
          label: 'All'
        },
        {
          key: 'Judicial',
          label: 'Judicial'
        },
        {
          key: 'Legal Ops',
          label: 'Legal Ops'
        },
        {
          key: 'Admin',
          label: 'Admin'
        }
      ],
      minSelected: 1,
      maxSelected: 1,
      minSelectedError: 'You must select a task type',
      maxSelectedError: null,
      lineBreakBefore: true,
      title: 'Task type',
      type: 'select'
    };
  }

  private static initPriorityFilter(): FilterFieldConfig {
    return {
      name: 'priority',
      options: [
        {
          key: 'All',
          label: 'All'
        },
        {
          key: 'High',
          label: 'High'
        },
        {
          key: 'Medium',
          label: 'Medium'
        },
        {
          key: 'Low',
          label: 'Low'
        }
      ],
      minSelected: 1,
      maxSelected: 1,
      minSelectedError: 'You must select a priority',
      maxSelectedError: null,
      lineBreakBefore: true,
      title: 'Priority',
      type: 'select'
    };
  }

  public ngOnInit(): void {
    this.appStoreSub = this.appStore.pipe(select(fromAppStore.getUserDetails)).subscribe(
      userDetails => {
        this.isLegalOpsOrJudicialRole = userDetails.userInfo && userDetails.userInfo.roles ? AppUtils.isLegalOpsOrJudicial(userDetails.userInfo.roles) : null;
        this.roleType = AppUtils.convertDomainToLabel(this.isLegalOpsOrJudicialRole);
        this.fieldsConfig.cancelSetting.fields.push({
          name: 'taskType',
          value: [this.roleType]
        },
        {
          name: 'role',
          value: [this.roleType]
        },
        );
      }
    );
    this.fieldsConfig.fields = [
      TaskManagerFilterComponent.initServiceFilter(this.jurisdictions),
      TaskManagerFilterComponent.initCaseLocationFilter(this.ALL_LOCATIONS.concat(this.locations)),
      TaskManagerFilterComponent.initPersonFilter(),
      TaskManagerFilterComponent.initRoleTypeFilter(),
      TaskManagerFilterComponent.findPersonFilter(),
      TaskManagerFilterComponent.initTaskTypeFilter(),
      TaskManagerFilterComponent.initPriorityFilter()
    ];
    this.fieldsConfig.fields = this.isLegalOpsOrJudicialRole === UserRole.Judicial ?
      this.fieldsConfig.fields.slice(0, -1) : this.fieldsConfig.fields;
    this.filterSub = this.filterService.getStream(TaskManagerFilterComponent.FILTER_NAME)
    .pipe(
      map((f: FilterSetting) => {
        if (f === null) {
          f = {
            id: TaskManagerFilterComponent.FILTER_NAME,
            reset: false,
            fields: this.fieldsConfig.cancelSetting.fields
          };
          return f;
        }
        return f;
      }),
      filter((f: FilterSetting) => f && f.hasOwnProperty('fields')),
      filter((f: FilterSetting) => !f.reset),
      ).subscribe((f: FilterSetting) => {
        const fields = f.fields.reduce((acc, field: { name: string, value: string[] }) => {
          return {...acc, [field.name]: field.value[0]};
        }, {});
        this.selectionChanged.emit(fields);
    });
  }

  public ngOnDestroy(): void {
    if (this.appStoreSub) {
      this.appStoreSub.unsubscribe();
    }
    if (this.filterSub) {
      this.filterSub.unsubscribe();
    }
  }
}
