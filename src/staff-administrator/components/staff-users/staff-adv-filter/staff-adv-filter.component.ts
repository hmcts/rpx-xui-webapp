import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterConfig, FilterService } from '@hmcts/rpx-xui-common-lib';
import { Subscription } from 'rxjs';
import { StaffSearchFilters } from '../../../../staff-administrator/models/staff-search-filters.model';
import { StaffDataFilterService } from '../services/staff-data-filter/staff-data-filter.service';

@Component({
  selector: 'exui-staff-adv-filter',
  templateUrl: './staff-adv-filter.component.html',
  styleUrls: ['./staff-adv-filter.component.scss']
})
export class StaffAdvFilterComponent implements OnInit, OnDestroy {
  public filterConfig: FilterConfig;
  private readonly FILTER_NAME = 'staff-advanced-filters';
  private filterSub: Subscription;
  private filterErrorsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private staffDataFilterService: StaffDataFilterService,
    private filterService: FilterService) {
    const staffFilters = {
      userTypes: this.route.snapshot.data.userTypes,
      jobTitles: this.route.snapshot.data.jobTitles,
      skills: this.route.snapshot.data.skills,
      services: this.route.snapshot.data.services,
    };
    const defaultOption = { key: 'All', label: 'All' };
    const staffServices = staffFilters.services;
    staffServices.unshift(defaultOption)
    this.filterConfig = {
      id: this.FILTER_NAME,
      fields: [{
        name: 'user-services',
        title: 'Services',
        subTitle: 'Search for a service by name',
        options: staffServices,
        minSelected: 1,
        maxSelected: 0,
        type: 'find-service',
        enableAddButton: true,
        displayMinSelectedError: true,
        minSelectedError : 'Click the Add button to add the service to your search criteria',
      },
      {
        name: 'user-location',
        title: 'Search by location',
        subTitle: 'Enter a location name',
        options: [],
        minSelected: 1,
        maxSelected: 0,
        type: 'find-location',
        enableAddButton: true,
        displayMinSelectedError: true,
        minSelectedError: 'Click the Add button to add the location to your search criteria'
      },
      {
        name: 'user-type',
        title: 'User Type',
        options: [...staffFilters.userTypes],
        minSelected: 0,
        maxSelected: 0,
        type: 'select',
        lineBreakBefore: true,
        defaultOption
      },
      {
        name: 'user-job-title',
        title: 'Job title',
        options: [...staffFilters.jobTitles],
        minSelected: 0,
        maxSelected: 0,
        type: 'select',
        lineBreakBefore: true,
        defaultOption
      },
      {
        name: 'user-skills',
        title: 'Skills',
        options: [],
        groupOptions: staffFilters.skills,
        minSelected: 0,
        maxSelected: 0,
        type: 'group-select',
        lineBreakBefore: true,
        defaultOption
      },
      {
        name: 'user-role',
        title: 'Role',
        options: [
          { label: 'Case Allocator', key: 'case allocator' },
          { label: 'Task supervisor', key: 'task supervisor' },
          { label: 'Staff administrator', key: 'staff administrator' }
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
      showCancelFilterButton: false,
      cancelSetting: {
        id: this.FILTER_NAME,
        fields: [
          {
            name: 'user-job-title',
            value: ['All']
          },
          {
            name: 'user-type',
            value: ['All']
          },
          {
            name: 'user-skills',
            value: ['All']
          }
        ]
      }
    };

    this.filterSub = this.filterService.getStream(this.FILTER_NAME)
      .subscribe(filterConfig => {
        if (filterConfig) {
          const searchFilters: StaffSearchFilters = {};
          const jobTitle = filterConfig.fields.find(item => item.name === 'user-job-title').value[0];
          const userType = filterConfig.fields.find(item => item.name === 'user-type').value[0];
          const services = (filterConfig.fields.find(item => item.name === 'user-services').value).map(s => s.key);
          const locations = (filterConfig.fields.find(item => item.name === 'user-location').value).map(l => l.epimms_id);
          const roles = filterConfig.fields.find(item => item.name === 'user-role').value;
          const skills = filterConfig.fields.find(item => item.name === 'user-skills').value;

          if (services && services.length > 0) {
            searchFilters.serviceCode = services.toString();
          }
          if (locations && locations.length > 0) {
            searchFilters.location = locations.toString();
          }
          if (roles && roles.length > 0) {
            searchFilters.role = roles.toString();
          }
          if (skills && skills.some(s => s !== 'All')) {
            searchFilters.skill = skills.toString();
          }
          if (userType && userType !== 'All') {
            searchFilters.userType = userType;
          }
          if (jobTitle && jobTitle !== 'All') {
            searchFilters.jobTitle = jobTitle;
          }

          if (Object.keys(searchFilters).length !== 0) {
            this.staffDataFilterService.filterByAdvancedSearch(searchFilters).subscribe();
          } else {
            this.staffDataFilterService.resetSearch();
          }
        }
      });

    this.filterErrorsSub = this.filterService.givenErrors.subscribe((filterErrors) => {
      if (filterErrors && filterErrors.length) {
        this.staffDataFilterService.setErrors([...filterErrors]);
      }
    });
  }

  public ngOnInit() {
  }

  public ngOnDestroy(): void {
    if (this.filterSub && !this.filterSub.closed) {
      this.filterSub.unsubscribe();
    }
  }

}
