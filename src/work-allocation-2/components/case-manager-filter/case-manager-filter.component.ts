import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FilterService } from '@hmcts/rpx-xui-common-lib';
import { FilterConfig, FilterFieldConfig, FilterSetting } from '@hmcts/rpx-xui-common-lib/lib/models/filter.model';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PersonRole } from '../../../../api/workAllocation2/interfaces/person';
import { AppUtils } from '../../../app/app-utils';
import { SERVICE_OPTIONS_LIST } from '../../../app/app.constants';
import * as fromAppStore from '../../../app/store';
import { Location } from '../../models/dtos';

@Component({
  selector: 'exui-case-manager-filter',
  templateUrl: './case-manager-filter.component.html',
  styleUrls: ['./case-manager-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CaseManagerFilterComponent implements OnInit, OnDestroy {

  private static FILTER_NAME: string = 'cases';
  @Input() public locations: Location[] = [];
  @Output() public selectChanged: EventEmitter<any> = new EventEmitter<any>();
  public filterConfig: FilterConfig = {
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
          name: 'jurisdiction',
          value: ['IA']
        },
        {
          name: 'location_id',
          value: ['all']
        },
        {
          name: 'actorId',
          value: [PersonRole.ALL]
        }
      ]
    }
  };
  private sub: Subscription;
  public appStoreSub: Subscription;

  constructor(private readonly filterService: FilterService, private readonly appStore: Store<fromAppStore.State>) {

  }

  private static initServiceFilter(): FilterFieldConfig {
    return {
      name: 'jurisdiction',
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
      name: 'location_id',
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
      domain: 'All',
      findPersonField: 'person',
      lineBreakBefore: true,
      minSelectedError: 'You must select a role type',
      maxSelectedError: null,
      title: 'Role type',
      type: 'select'
    };
  }

  private static initPersonFilter(): FilterFieldConfig {
    return {
      name: 'actorId',
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
      lineBreakBefore: true,
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
      enableCondition: 'actorId=Specific person',
      type: 'find-person'
    };
  }

  public ngOnInit(): void {
    this.appStoreSub = this.appStore.pipe(select(fromAppStore.getUserDetails)).subscribe(
      userDetails => {
        const isLegalOpsOrJudicialRole = AppUtils.isLegalOpsOrJudicial(userDetails.userInfo.roles);
        const roleType = AppUtils.convertDomainToLabel(isLegalOpsOrJudicialRole);
        this.filterConfig.cancelSetting.fields.push({
            name: 'role',
            value: [roleType]
          },
        );
      }
    );
    this.filterConfig.fields = [
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
    this.sub = this.filterService.getStream(CaseManagerFilterComponent.FILTER_NAME)
      .pipe(
        map((f: FilterSetting) => {
          if (f === null) {
            f = {
              id: CaseManagerFilterComponent.FILTER_NAME,
              fields: this.filterConfig.cancelSetting.fields
            };
            return f;
          }
          return f;
        }),
        filter((f: FilterSetting) => f && f.hasOwnProperty('fields') && f.id === CaseManagerFilterComponent.FILTER_NAME),
      ).subscribe((f: FilterSetting) => {
        const fields = f.fields.reduce((acc, field: { name: string, value: string[] }) => {
          return {...acc, [field.name]: field.value[0]};
        }, {});
        this.selectChanged.emit(fields);
      });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
