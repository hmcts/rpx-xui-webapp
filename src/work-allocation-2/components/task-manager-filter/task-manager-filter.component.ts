import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FilterService } from '@hmcts/rpx-xui-common-lib';
import { FilterConfig, FilterFieldConfig, FilterSetting } from '@hmcts/rpx-xui-common-lib/lib/models';
import { Location } from '../../models/dtos';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'exui-task-manager-filter',
  templateUrl: './task-manager-filter.component.html',
  styleUrls: ['./task-manager-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskManagerFilterComponent implements OnInit {
  
  private static FILTER_NAME: string = 'all-tasks';

  @Input() public locations: Location[] = [];

  public fieldsConfig: FilterConfig = {
    persistence: 'session',
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
        }
      ]
    }
  };

  constructor(private readonly filterService: FilterService) {
  }

  private static initServiceFilter(): FilterFieldConfig {
    return {
      name: 'service',
      options: [
        {
          key: 'IA',
          label: 'Immigration and Asylum'
        }
      ],
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
      showCondition: 'selectPerson=Specific person',
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
      title: 'Person',
      type: 'radio'
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
      showCondition: 'selectPerson=Specific person',
      type: 'find-person'
    };
  }

  public ngOnInit(): void {
    this.fieldsConfig.fields = [
      TaskManagerFilterComponent.initServiceFilter(),
      TaskManagerFilterComponent.initCaseLocationFilter(this.locations),
      TaskManagerFilterComponent.initPersonFilter(),
      TaskManagerFilterComponent.initRoleTypeFilter(),
      TaskManagerFilterComponent.findPersonFilter()
    ];
    this.filterService.getStream(TaskManagerFilterComponent.FILTER_NAME)
      .pipe(
        filter((f: FilterSetting) => f && f.hasOwnProperty('fields'))
      ).subscribe((f: FilterSetting) => {
      console.log(f);
    });
  }
}
