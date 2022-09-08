import { Component, OnInit } from '@angular/core';
import { FilterConfig } from '@hmcts/rpx-xui-common-lib/lib/models';

@Component({
  selector: 'exui-staff-search',
  templateUrl: './staff-search.component.html',
  styleUrls: ['./staff-search.component.scss']
})
export class StaffSearchComponent implements OnInit {
  public filterConfig: FilterConfig = {
    persistence: 'session',
    id: 'staff-filters',
    fields: [{
      name: 'find-service',
      title: 'Services',
      options: [],
      minSelected: 0,
      maxSelected: 0,
      type: 'find-service',
      enableAddButton: true
    }],
    cancelButtonText: '',
    applyButtonText: 'Search',
    cancelSetting: null,
    showCancelFilterButton: false
  };

  constructor() { }

  public ngOnInit() {
  }
}
