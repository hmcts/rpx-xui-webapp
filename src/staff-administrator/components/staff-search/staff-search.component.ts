import { Component, OnInit } from '@angular/core';
import { FilterConfig } from '@hmcts/rpx-xui-common-lib/lib/models';

@Component({
  selector: 'exui-staff-search',
  templateUrl: './staff-search.component.html',
  styleUrls: ['./staff-search.component.scss']
})
export class StaffSearchComponent implements OnInit {
  public filterConfig: FilterConfig = {
    id: 'staff-filters',
    fields: [{
      name: 'user-type',
      title: 'Search for a user by name',
      options: [],
      minSelected: 0,
      maxSelected: 0,
      type: 'find-person'
    }],
    persistence: 'session',
    applyButtonText: 'Search',
    cancelButtonText: '',
    enableDisabledButton: false,
    showCancelFilterButton: false
  };
  constructor() { }

  public ngOnInit() {
  }
}
