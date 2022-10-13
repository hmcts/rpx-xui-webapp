import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterConfig } from '@hmcts/rpx-xui-common-lib/lib/models';
import { CaseUserSearchErrorMessage } from '../../../cases/models/case.enum';
import { StaffDataFilterService } from '../../../staff-administrator/services/staff-data-filter.service';



@Component({
  selector: 'exui-staff-adv-filter',
  templateUrl: './staff-adv-filter.component.html',
  styleUrls: ['./staff-adv-filter.component.scss'],
})
export class StaffAdvFilterComponent {
  public filterConfig: FilterConfig;

  constructor(private route: ActivatedRoute,public staffDataFilterService: StaffDataFilterService) {
    const staffFilters = {
      userTypes: this.route.snapshot.data.staffFilters.userTypes,
      jobTitles: this.route.snapshot.data.staffFilters.jobTitles,
      skills: this.route.snapshot.data.staffFilters.skills,
    };

    this.filterConfig = {
      id: 'staff-advanced-filters',
      fields: [
        {
          name: 'user-services',
          title: '',
          subTitle: '',
          options: [
            {
              key: '1',
              label: '1-label',
            },
            {
              key: '2',
              label: '2-label',
            },
            {
              key: '3',
              label: '3-label',
            }
          ],
          minSelected: 0,
          maxSelected: 0,
          type: 'find-service',
          enableAddButton: true,
        },
        {
          name: 'user-location',
          title: 'Search by location',
          subTitle: 'Enter a location name',
          options: [],
          minSelected: 0,
          maxSelected: 0,
          type: 'find-location',
          enableAddButton: true,
          lineBreakBefore: true,
        },
        {
          name: 'user-type',
          title: 'User Type',
          options: [...staffFilters.userTypes],
          minSelected: 0,
          maxSelected: 0,
          type: 'select',
          lineBreakBefore: true,
        },
        {
          name: 'user-job-title',
          title: 'Job title',
          options: [...staffFilters.jobTitles],
          minSelected: 0,
          maxSelected: 0,
          type: 'select',
          lineBreakBefore: true,
        },
        {
          name: 'user-skills',
          title: 'Skills',
          options: [...staffFilters.skills],
          minSelected: 0,
          maxSelected: 0,
          type: 'select',
          lineBreakBefore: true,
        },
        {
          name: 'user-role',
          title: 'Role',
          options: [
            { label: 'Case Allocator', key: 'case-allocator' },
            { label: 'Task supervisor', key: 'task-supervisor' },
            { label: 'Staff administrator', key: 'Staff administrator' },
          ],
          minSelected: 0,
          maxSelected: 3,
          type: 'checkbox',
          lineBreakBefore: true,
        },
      ],
      persistence: 'session',
      applyButtonText: 'Search',
      cancelButtonText: '',
      enableDisabledButton: false,
      showCancelFilterButton: false,
    };
  }

  public setError(): void {
    this.staffDataFilterService.setErrors([{
      error: CaseUserSearchErrorMessage.SELECT_A_SERVICE,
      name: CaseUserSearchErrorMessage.SELECT_A_NAME
    }])
  }
}
