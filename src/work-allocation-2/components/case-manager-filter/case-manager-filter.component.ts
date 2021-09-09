import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FilterConfig, FilterFieldConfig, FilterSetting } from '@hmcts/rpx-xui-common-lib/lib/models/filter.model';

@Component({
  selector: 'exui-case-manager-filter',
  templateUrl: './case-manager-filter.component.html',
  styleUrls: ['./case-manager-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CaseManagerFilterComponent implements OnInit {

  private static FILTER_NAME: string = 'cases';

  @Input() public locations: Location[] = [];

  public fieldsConfig: FilterConfig = {
    persistence: 'local',
    id: CaseManagerFilterComponent.FILTER_NAME,
    fields: [],
    cancelButtonText: 'Reset to default',
    applyButtonText: 'Apply',
    cancelSetting: null
  };

  public fieldsSettings: FilterSetting = {
    id: CaseManagerFilterComponent.FILTER_NAME,
    fields: [],
  };

  private static initServiceFilter(): FilterFieldConfig {
    return {
      name: CaseManagerFilterComponent.FILTER_NAME,
      options: [
        {
          key: 'IA',
          label: 'Immigration and Asylum'
        }
      ],
      minSelected: 1,
      maxSelected: null,
      minSelectedError: 'You must select a service',
      maxSelectedError: null,
      title: 'Service',
      type: 'select'
    };
  }

  private static initCaseLocationFilter(): FilterFieldConfig {
    return {
      name: CaseManagerFilterComponent.FILTER_NAME,
      options: [
        {
          key: 'Taylor House',
          label: 'Taylor House'
        }
      ],
      minSelected: 1,
      maxSelected: null,
      minSelectedError: 'You must select a location',
      maxSelectedError: null,
      title: 'Case Location',
      type: 'select'
    };
  }

  private static initRoleTypeFilter(): FilterFieldConfig {
    return {
      name: CaseManagerFilterComponent.FILTER_NAME,
      options: [
        {
          key: 'Judicial',
          label: 'Judicial'
        },
        {
          key: 'Legal Ops',
          label: 'Legal Ops'
        }
      ],
      minSelected: 1,
      maxSelected: null,
      minSelectedError: 'You must select a role type',
      maxSelectedError: null,
      title: 'Role type',
      type: 'select'
    };
  }

  private static initPersonFilter(): FilterFieldConfig {
    return {
      name: CaseManagerFilterComponent.FILTER_NAME,
      options: [
        {
          key: 'All',
          label: 'All'
        },
        {
          key: 'Specific person',
          label: 'Specific person'
        }
      ],
      minSelected: 1,
      maxSelected: null,
      minSelectedError: 'You must select a person',
      maxSelectedError: null,
      title: 'Role type',
      type: 'radio'
    };
  }

  public ngOnInit(): void {
    this.fieldsConfig.fields = [
      CaseManagerFilterComponent.initServiceFilter(),
      CaseManagerFilterComponent.initCaseLocationFilter(),
      CaseManagerFilterComponent.initRoleTypeFilter(),
      CaseManagerFilterComponent.initPersonFilter()
    ];
  }
}
