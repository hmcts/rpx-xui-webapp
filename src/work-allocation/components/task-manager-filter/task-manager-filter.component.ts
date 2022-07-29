import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { BookingCheckType, FilterService, PersonRole } from '@hmcts/rpx-xui-common-lib';
import { FilterConfig, FilterFieldConfig, FilterSetting } from '@hmcts/rpx-xui-common-lib/lib/models';
import { LocationByEPIMMSModel } from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AppUtils } from '../../../app/app-utils';
import { UserRole } from '../../../app/models';
import * as fromAppStore from '../../../app/store';
import { getRoleCategory } from '../../utils';

@Component({
  selector: 'exui-task-manager-filter',
  templateUrl: './task-manager-filter.component.html',
  styleUrls: ['./task-manager-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskManagerFilterComponent implements OnInit, OnDestroy {
  private static readonly FILTER_NAME: string = 'all-work-tasks-filter';
  @Input() public jurisdictions: string[] = [];
  @Output() public selectionChanged: EventEmitter<any> = new EventEmitter<any>();

  public appStoreSub: Subscription;
  public filterSub: Subscription;
  public roleType: string;
  public isLegalOpsOrJudicialRole: UserRole;

  public fieldsConfig: FilterConfig = {
    persistence: 'local',
    enableDisabledButton: true,
    id: TaskManagerFilterComponent.FILTER_NAME,
    fields: [],
    cancelButtonText: 'Reset to default',
    applyButtonText: 'Apply',
    showCancelFilterButton: true,
    cancelSetting: {
      id: TaskManagerFilterComponent.FILTER_NAME,
      fields: [
        {
          name: 'service',
          value: ['IA']
        },
        {
          name: 'selectLocation',
          value: ['location_all']
        },
        {
          name: 'selectPerson',
          value: ['All']
        },
      ]
    }
  };

  constructor(private readonly filterService: FilterService,
              private readonly appStore: Store<fromAppStore.State>) {
  }

  private static initServiceFilter(jurisdictions: string[]): FilterFieldConfig {
    return {
      name: 'service',
      options: jurisdictions.map(service => ({ key: service, label: service })),
      minSelected: 1,
      maxSelected: 1,
      minSelectedError: 'You must select a service',
      maxSelectedError: null,
      changeResetFields: ['selectLocation', 'selectPerson', 'role', 'person', 'findPersonControl', 'taskType'],
      title: 'Service',
      type: 'select'
    };
  }

  private static initLocationFilter(): FilterFieldConfig {

    return {
      name: 'location',
      options: [],
      minSelected: 1,
      maxSelected: 1,
      findLocationField: 'service',
      enableCondition: 'selectLocation=search',
      minSelectedError: 'You must select a location',
      maxSelectedError: null,
      enableAddLocationButton: false,
      type: 'find-location',
      radioSelectionChange: 'selectLocation=search',
      bookingCheckType: BookingCheckType.NO_CHECK
    };
  }

  private static initSelectLocationFilter(): FilterFieldConfig {
    return {
      name: 'selectLocation',
      options: [
        { key: 'location_all', label: 'All' },
        { key: 'search', label: 'Search for a location' }
      ],
      minSelected: 1,
      maxSelected: 1,
      minSelectedError: 'You must select a location',
      maxSelectedError: null,
      title: 'Location',
      type: 'radio'
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
      changeResetFields: ['person', 'findPersonControl'],
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
          key: PersonRole.JUDICIAL,
          label: PersonRole.JUDICIAL
        },
        {
          key: PersonRole.CASEWORKER,
          label: PersonRole.CASEWORKER
        },
        {
          key: PersonRole.ADMIN,
          label: PersonRole.ADMIN
        }
      ],
      minSelected: 1,
      maxSelected: 1,
      changeResetFields: ['person', 'findPersonControl'],
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
      domainField: 'role',
      enableCondition: 'selectPerson=Specific person',
      type: 'find-person',
      radioSelectionChange: 'selectPerson=Specific person'
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
          key: 'JUDICIAL',
          label: 'Judicial'
        },
        {
          key: 'LEGAL_OPERATIONS',
          label: 'Legal Ops'
        },
        {
          key: 'ADMIN',
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

  public ngOnInit(): void {
    this.appStoreSub = this.appStore.pipe(select(fromAppStore.getUserDetails)).subscribe(
      userDetails => {
        this.isLegalOpsOrJudicialRole = userDetails.userInfo && userDetails.userInfo.roles ? AppUtils.isLegalOpsOrJudicial(userDetails.userInfo.roles) : null;
        this.roleType = AppUtils.convertDomainToLabel(this.isLegalOpsOrJudicialRole);
        this.fieldsConfig.cancelSetting.fields.push({
          name: 'taskType',
          value: [getRoleCategory(this.roleType)]
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
      TaskManagerFilterComponent.initSelectLocationFilter(),
      TaskManagerFilterComponent.initLocationFilter(),
      TaskManagerFilterComponent.initPersonFilter(),
      TaskManagerFilterComponent.initRoleTypeFilter(),
      TaskManagerFilterComponent.findPersonFilter(),
      TaskManagerFilterComponent.initTaskTypeFilter()
    ];
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
          if (field.name === 'location') {
            const value: any = field.value && field.value.length > 0 ? (field.value[0] as unknown as LocationByEPIMMSModel).epimms_id : '';
            return { ...acc, [field.name]: value };
          }
          return { ...acc, [field.name]: field.value[0] };
        }, {});
        this.selectionChanged.emit(fields);
      });
  }

  public ngOnDestroy(): void {
    if (this.appStoreSub && !this.appStoreSub.closed) {
      this.appStoreSub.unsubscribe();
    }
    if (this.filterSub && !this.filterSub.closed) {
      this.filterSub.unsubscribe();
    }
  }
}
