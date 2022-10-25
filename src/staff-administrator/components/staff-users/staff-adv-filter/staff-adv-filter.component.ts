import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterConfig } from '@hmcts/rpx-xui-common-lib';

@Component({
  selector: 'exui-staff-adv-filter',
  templateUrl: './staff-adv-filter.component.html',
  styleUrls: ['./staff-adv-filter.component.scss']
})
export class StaffAdvFilterComponent implements OnInit {
  public filterConfig: FilterConfig;

  constructor(private route: ActivatedRoute) {
    const staffFilters = {
      userTypes: this.route.snapshot.data.userTypes,
      jobTitles: this.route.snapshot.data.jobTitles,
      skills: this.route.snapshot.data.skills,
      services: this.route.snapshot.data.services,
  };

    this.filterConfig = {
      id: 'staff-advanced-filters',
      fields: [{
        name: 'user-services',
        title: 'Services',
        subTitle: 'Search for a service by name',
        options: [...staffFilters.services],
        minSelected: 1,
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
        enableAddButton: true
      },
      {
        name: 'user-type',
        title: 'User Type',
        options: [...staffFilters.userTypes],
        minSelected: 0,
        maxSelected: 0,
        type: 'select',
        lineBreakBefore: true
      },
      {
        name: 'user-job-title',
        title: 'Job title',
        options: [...staffFilters.jobTitles],
        minSelected: 0,
        maxSelected: 0,
        type: 'select',
        lineBreakBefore: true
      },
      {
        name: 'user-skills',
        title: 'Skills',
        options: [...staffFilters.skills],
        minSelected: 0,
        maxSelected: 0,
        type: 'select',
        lineBreakBefore: true
      },
      {
        name: 'user-role',
        title: 'Role',
        options: [
          {label: 'Case Allocator', key: 'case-allocator'},
          {label: 'Task supervisor', key: 'task-supervisor'},
          {label: 'Staff administrator', key: 'Staff administrator'}
        ],
        minSelected: 0,
        maxSelected: 3,
        type: 'checkbox',
        lineBreakBefore: true
      }
      ],
      persistence: 'session',
      applyButtonText: 'Search',
      cancelButtonText: '',
      enableDisabledButton: false,
      showCancelFilterButton: false
  };
}

  public ngOnInit() {
  }

}
