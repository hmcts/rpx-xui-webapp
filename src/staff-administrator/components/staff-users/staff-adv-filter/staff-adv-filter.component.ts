import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterConfig, FilterService, GenericFilterComponent } from '@hmcts/rpx-xui-common-lib';
import { Subscription } from 'rxjs';
import { StaffAdvancedSearchFilters } from '../../../models/staff-search-filters.model';
import { StaffDataFilterService } from '../services/staff-data-filter/staff-data-filter.service';

@Component({
  selector: 'exui-staff-adv-filter',
  templateUrl: './staff-adv-filter.component.html',
  styleUrls: ['./staff-adv-filter.component.scss']
})
export class StaffAdvFilterComponent implements OnInit, OnDestroy {
  public readonly FILTER_NAME = 'staff-advanced-filters';
  private readonly ERROR_MESSAGE_MIN_ONE_CRITERIA = 'Provide at least one search criteria';

  public filterConfig: FilterConfig;
  private filterSub: Subscription;
  private filterErrorsSub: Subscription;

  @ViewChild('genericFilterComponent', { static: true }) public genericFilterComponent: GenericFilterComponent;

  constructor(
    private route: ActivatedRoute,
    private staffDataFilterService: StaffDataFilterService,
    private filterService: FilterService) { }

  public ngOnInit(): void {
    const staffFilters = {
      userTypes: this.route.snapshot.data.userTypes,
      jobTitles: this.route.snapshot.data.jobTitles,
      skills: this.route.snapshot.data.skills,
      services: this.route.snapshot.data.services
    };
    const defaultOption = { key: 'All', label: 'All', selectAll: true };

    this.filterConfig = {
      id: this.FILTER_NAME,
      fields: [{
        name: 'user-services',
        title: 'Service',
        subTitle: 'Search for a service by name',
        options: [
          defaultOption,
          ...staffFilters.services
        ],
        minSelected: 0,
        maxSelected: 0,
        type: 'find-service',
        enableAddButton: true,
        displayMinSelectedError: true,
        minSelectedError: 'Click the Add button to add the service to your search criteria'
      },
      {
        name: 'user-location',
        title: 'Search by location',
        subTitle: 'Enter a location name',
        options: [],
        servicesField: 'user-services',
        propertyNameFilter: 'venue_name',
        minSelected: 0,
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
          { label: 'Case allocator', key: 'case allocator' },
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
      .subscribe((filterConfig) => {
        if (filterConfig) {
          const advancedSearchFilters = {} as StaffAdvancedSearchFilters;

          const jobTitle = filterConfig.fields.find((item) => item.name === 'user-job-title').value[0];
          const userType = filterConfig.fields.find((item) => item.name === 'user-type').value[0];
          const services = (filterConfig.fields.find((item) => item.name === 'user-services').value).map((s) => s.key);
          const locations = (filterConfig.fields.find((item) => item.name === 'user-location').value).map((l) => l.epimms_id);
          const roles = filterConfig.fields.find((item) => item.name === 'user-role').value;
          const skills = filterConfig.fields.find((item) => item.name === 'user-skills').value;

          if (services && services.length > 0) {
            advancedSearchFilters.serviceCode = services;
          }

          if (locations && locations.length > 0) {
            advancedSearchFilters.location = locations;
          }

          if (roles && roles.length > 0) {
            advancedSearchFilters.role = roles;
          }

          if (skills && skills.some((s) => s !== 'All')) {
            advancedSearchFilters.skill = skills;
          }

          if (userType && userType !== 'All') {
            advancedSearchFilters.userType = userType;
          }

          if (jobTitle && jobTitle !== 'All') {
            advancedSearchFilters.jobTitle = jobTitle;
          }

          if (Object.keys(advancedSearchFilters)?.length > 0) {
            this.staffDataFilterService.search({
              advancedSearchFilters,
              pageNumber: 1,
              pageSize: StaffDataFilterService.PAGE_SIZE
            });
            // This makes sure that the error are set only on pressing the search button
          } else if (this.genericFilterComponent.submitted) {
            this.staffDataFilterService.setErrors(
              [{ name: this.FILTER_NAME, error: this.ERROR_MESSAGE_MIN_ONE_CRITERIA }]
            );
          }

          window.scrollTo(0, 0);
        }
      });

    this.filterErrorsSub = this.filterService.givenErrors.subscribe((filterErrors) => {
      const errors = filterErrors ? [...filterErrors] : [];
      this.staffDataFilterService.setErrors([...errors]);
    });
  }

  public ngOnDestroy(): void {
    if (this.filterSub && !this.filterSub.closed) {
      this.filterSub.unsubscribe();
    }

    this.filterErrorsSub?.unsubscribe();
  }
}
