import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FilterService } from '@hmcts/rpx-xui-common-lib';
import { FilterConfig, FilterFieldConfig, FilterSetting } from '@hmcts/rpx-xui-common-lib/lib/models/filter.model';
import { JurisdictionType } from 'api/workAllocation2/interfaces/jurisdiction';
import { filter } from 'rxjs/operators';
import { PersonRole } from '../../../../api/workAllocation2/interfaces/person';
import { SERVICE_OPTIONS_LIST } from '../../../app/app.constants';
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
          value: [JurisdictionType.IA]
        }
      ]
    }
  };

  constructor(private readonly filterService: FilterService) {

  }

  private static initServiceFilter(): FilterFieldConfig {
    return {
      name: 'service',
      options: SERVICE_OPTIONS_LIST,
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
          key: PersonRole.JUDICIAL,
          label: PersonRole.JUDICIAL
        },
        {
          key: PersonRole.CASEWORKER,
          label: PersonRole.CASEWORKER,
        },
        {
          key: PersonRole.ADMIN,
          label: PersonRole.ADMIN,
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
          key: PersonRole.ALL,
          label: PersonRole.ALL
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
      CaseManagerFilterComponent.initCaseLocationFilter([{
        id: 'all',
        locationName: 'All locations',
        services: []
      }, ...this.locations]),
      CaseManagerFilterComponent.initRoleTypeFilter(),
      CaseManagerFilterComponent.initPersonFilter(),
      CaseManagerFilterComponent.findPersonFilter()
    ];
    this.filterService.getStream(CaseManagerFilterComponent.FILTER_NAME)
      .pipe(
        filter((f: FilterSetting) => f && f.hasOwnProperty('fields'))
      ).subscribe((f: FilterSetting) => {
    });
  }
}
