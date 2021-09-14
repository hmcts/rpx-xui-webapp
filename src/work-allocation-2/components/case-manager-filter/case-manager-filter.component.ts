import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FilterService } from '@hmcts/rpx-xui-common-lib';
import { FilterConfig, FilterFieldConfig, FilterSetting } from '@hmcts/rpx-xui-common-lib/lib/models/filter.model';
import { filter } from 'rxjs/operators';
import { Location } from '../../models/dtos';

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
    persistence: 'session',
    enableDisabledButton: true,
    id: CaseManagerFilterComponent.FILTER_NAME,
    fields: [],
    cancelButtonText: 'Reset to default',
    applyButtonText: 'Apply',
    cancelSetting: {
      id: CaseManagerFilterComponent.FILTER_NAME,
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
      title: 'Role type',
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
      CaseManagerFilterComponent.initServiceFilter(),
      CaseManagerFilterComponent.initCaseLocationFilter(this.locations),
      CaseManagerFilterComponent.initRoleTypeFilter(),
      CaseManagerFilterComponent.initPersonFilter(),
      CaseManagerFilterComponent.findPersonFilter()
    ];
    this.filterService.getStream(CaseManagerFilterComponent.FILTER_NAME)
      .pipe(
        filter((f: FilterSetting) => f && f.hasOwnProperty('fields'))
      ).subscribe((f: FilterSetting) => {
      console.log(f);
    });
  }
}
